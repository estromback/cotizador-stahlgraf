(function() {
    const role = localStorage.getItem('stahlgraf_user_role') || 'guest';
    if (role !== 'admin') {
        alert("⚠️ Acceso denegado: Se requiere perfil de Administrador.");
        window.location.href = 'hub.html';
    }
})();

// crm.js - Logic for the CRM Kanban Board

const firebaseConfig = {
  apiKey: "AIzaSyDxz0JQhHBMCZi5kKb4Mtp2bFyZuJ5wfbA",
  authDomain: "stahlgraf-apps.firebaseapp.com",
  projectId: "stahlgraf-apps",
  storageBucket: "stahlgraf-apps.firebasestorage.app",
  messagingSenderId: "501285299028",
  appId: "1:501285299028:web:b7adda0826e638d80a5ec1",
  measurementId: "G-X0X7E48C64"
};

let db = null;
let auth = null;
let currentUser = null;

function getActiveUid() {
    return localStorage.getItem('stahlgraf_target_uid') || (currentUser ? currentUser.uid : null);
}

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        if (typeof initFirestorePersistence === "function") initFirestorePersistence(db);
        auth = firebase.auth();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.");
    }
} else if (firebase.apps.length) {
    db = firebase.firestore();
        if (typeof initFirestorePersistence === "function") initFirestorePersistence(db);
    auth = firebase.auth();
}

let appData = { crmColumns: 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos' };
let crmCards = [];
let draggingCardId = null;
let clientsList = [];
let isUserConfigLoaded = false;
 
function loadData() {
    const saved = localStorage.getItem('stahlgraf_data_v4');
    if (saved) {
        try {
            appData = { ...appData, ...JSON.parse(saved) };
            if (appData.clients) {
                clientsList = appData.clients;
            }
        } catch(e) {}
    }
}
 
function loadUserConfig() {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    db.collection('users').doc(activeUid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            if (typeof mergeAppData === 'function') {
                appData = mergeAppData(appData, cloudData);
            } else {
                appData = { ...appData, ...cloudData };
            }
            if (cloudData.clients) {
                clientsList = cloudData.clients;
            }
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        }
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    }).catch(e => {
        console.error("Error loading config from Firestore: ", e);
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    });
}

// Authentication
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        const syncText = document.getElementById('sync-text');
        const syncIcon = document.getElementById('sync-icon');
        const copyFormBtn = document.getElementById('btn-copy-form-link');
        
        if (user) {
            if (syncText) syncText.innerText = "Conectado";
            if (syncIcon) syncIcon.innerText = "🟢";
            if (copyFormBtn) copyFormBtn.style.display = 'flex';
            loadCardsFromFirebase();
            loadUserConfig();
        } else {
            if (syncText) syncText.innerText = "Ingresar para Sync";
            if (syncIcon) syncIcon.innerText = "☁️";
            if (copyFormBtn) copyFormBtn.style.display = 'none';
            document.getElementById('kanban-board').innerHTML = '<p style="padding: 20px;">Por favor, inicia sesión para ver tu CRM.</p>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderBoardSkeleton();
    
    // Login Sync Button
    const syncBtn = document.getElementById('btn-sync-login');
    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            if (!auth) return alert("Firebase no está configurado.");
            if (currentUser) {
                if (confirm("¿Deseas cerrar sesión?")) auth.signOut();
            } else {
                const provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithPopup(provider);
            }
        });
    }
    
    // Copy Form Link Button
    const copyFormBtn = document.getElementById('btn-copy-form-link');
    if (copyFormBtn) {
        copyFormBtn.addEventListener('click', () => {
            if (!currentUser) return alert("Debes iniciar sesión primero.");
            
            // Build the URL to contacto.html
            const formUrl = window.location.origin + window.location.pathname.replace('crm.html', 'contacto.html') + '?uid=' + getActiveUid();
            
            navigator.clipboard.writeText(formUrl).then(() => {
                const oldHTML = copyFormBtn.innerHTML;
                copyFormBtn.style.background = 'rgba(16, 185, 129, 0.2)';
                copyFormBtn.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                copyFormBtn.style.color = '#10b981';
                copyFormBtn.innerHTML = '<span>✓</span> ¡Enlace Copiado!';
                
                setTimeout(() => {
                    copyFormBtn.style.background = 'rgba(59, 130, 246, 0.15)';
                    copyFormBtn.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    copyFormBtn.style.color = '#3b82f6';
                    copyFormBtn.innerHTML = oldHTML;
                }, 2000);
            }).catch(e => {
                console.error("Clipboard copy failed: ", e);
                alert("No se pudo copiar de forma automática. Aquí tienes tu enlace:\n" + formUrl);
            });
        });
    }
    
    // Modal Listeners
    const modal = document.getElementById('card-modal');
    document.getElementById('btn-add-card').addEventListener('click', () => openCardModal());
    document.getElementById('btn-close-card').addEventListener('click', () => modal.classList.remove('active'));
    document.getElementById('btn-save-card').addEventListener('click', saveCard);
    document.getElementById('btn-delete-card').addEventListener('click', deleteCard);
    
    // Select Client Modal Listeners
    const modalClients = document.getElementById('clients-modal');
    if (document.getElementById('btn-load-client')) {
        document.getElementById('btn-load-client').addEventListener('click', () => {
            modalClients.classList.add('active');
            renderClientsSelect();
        });
    }
    if (document.getElementById('btn-close-clients')) {
        document.getElementById('btn-close-clients').addEventListener('click', () => {
            modalClients.classList.remove('active');
        });
    }
    if (document.getElementById('client-search')) {
        document.getElementById('client-search').addEventListener('input', (e) => {
            renderClientsSelect(e.target.value);
        });
    }
    
    // Comments
    document.getElementById('btn-add-comment').addEventListener('click', addComment);
    const commentInput = document.getElementById('new-comment-text');
    if (commentInput) {
        commentInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addComment();
            }
        });
    }
});

function getColumns() {
    const defaultCols = (appData.crmColumns || 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos')
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0);
        
    // Also include any column names from crmCards that aren't already in the list
    crmCards.forEach(card => {
        if (card.column && !defaultCols.includes(card.column)) {
            defaultCols.push(card.column);
        }
    });
    
    return defaultCols;
}

function renderBoardSkeleton() {
    const board = document.getElementById('kanban-board');
    const cols = getColumns();
    board.innerHTML = '';
    
    const select = document.getElementById('card-column');
    const currentValue = select ? select.value : null;
    if (select) select.innerHTML = '';

    cols.forEach(col => {
        // Build Select Option
        const opt = document.createElement('option');
        opt.value = col;
        opt.textContent = col;
        if (select) select.appendChild(opt);

        // Build Kanban Column
        const colDiv = document.createElement('div');
        colDiv.className = 'kanban-column';
        colDiv.innerHTML = `
            <div class="kanban-header">
                <span>${col}</span>
                <span class="badge" id="count-${normalizeId(col)}">0</span>
            </div>
            <div class="kanban-cards" id="col-${normalizeId(col)}" data-col="${col}">
            </div>
        `;
        board.appendChild(colDiv);

        // Setup Drag & Drop Dropzone
        const dropZone = colDiv.querySelector('.kanban-cards');
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        dropZone.addEventListener('drop', async e => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            if (draggingCardId) {
                const targetCol = dropZone.getAttribute('data-col');
                await moveCard(draggingCardId, targetCol);
            }
        });
    });
    
    if (select && currentValue) {
        select.value = currentValue;
    }
}

function normalizeId(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

async function loadCardsFromFirebase() {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    
    db.collection('users').doc(activeUid).collection('crm')
        .onSnapshot(snap => {
            crmCards = [];
            snap.forEach(doc => {
                crmCards.push({ id: doc.id, ...doc.data() });
            });
            renderBoardSkeleton(); // Redraw board dynamically to draw any new columns
            renderCards();
            renderSidebar();
            syncCrmClientsToDirectory();
        });
}

function renderCards() {
    // Clear all columns
    document.querySelectorAll('.kanban-cards').forEach(el => el.innerHTML = '');
    
    let counts = {};
    const cols = getColumns();
    cols.forEach(c => counts[c] = 0);

    const today = new Date();
    today.setHours(0,0,0,0);

    crmCards.forEach(card => {
        const colId = `col-${normalizeId(card.column)}`;
        const colEl = document.getElementById(colId);
        
        if (colEl) {
            counts[card.column] = (counts[card.column] || 0) + 1;
            
            const cardEl = document.createElement('div');
            cardEl.className = 'kanban-card';
            cardEl.draggable = true;
            
            let dateHtml = '';
            if (card.date) {
                const parts = card.date.split('-');
                if(parts.length === 3) {
                    const cDate = new Date(parts[0], parts[1]-1, parts[2]);
                    let dateClass = '';
                    let diffTime = cDate.getTime() - today.getTime();
                    let diffDays = diffTime / (1000 * 3600 * 24);
                    
                    if (diffDays < 0) dateClass = 'overdue';
                    else if (diffDays === 0) dateClass = 'today';
                    
                    dateHtml = `<div class="card-date ${dateClass}">📅 ${card.date}${card.time ? ` ⏰ ${card.time}` : ''}</div>`;
                }
            }

            let badgeHtml = '';
            if (card.source === 'form' || card.formDetails) {
                badgeHtml = `<span class="badge" style="background: rgba(59, 130, 246, 0.2); color: #3b82f6; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 5px; font-weight: 500;">📝 Formulario</span>`;
            }

            cardEl.innerHTML = `
                ${badgeHtml}
                <div class="card-title">${card.client}</div>
                ${dateHtml}
                <div class="card-desc">${card.desc ? card.desc.substring(0,60) + (card.desc.length > 60 ? '...' : '') : ''}</div>
            `;

            // Drag Events
            cardEl.addEventListener('dragstart', () => {
                draggingCardId = card.id;
                setTimeout(() => cardEl.classList.add('dragging'), 0);
            });
            cardEl.addEventListener('dragend', () => {
                cardEl.classList.remove('dragging');
                draggingCardId = null;
            });
            
            // Edit Event
            cardEl.addEventListener('click', () => openCardModal(card));

            colEl.appendChild(cardEl);
        }
    });

    // Update counts
    cols.forEach(c => {
        const badge = document.getElementById(`count-${normalizeId(c)}`);
        if (badge) badge.innerText = counts[c];
    });
}

function renderSidebar() {
    const list = document.getElementById('upcoming-tasks');
    list.innerHTML = '';
    
    // Filter cards that have a date, and are not in "Perdidos" or "Vendidos" (assuming those are terminal, but let's just show all with dates)
    let datedCards = crmCards.filter(c => c.date).sort((a,b) => {
        return new Date(a.date) - new Date(b.date);
    });

    const today = new Date();
    today.setHours(0,0,0,0);

    if(datedCards.length === 0) {
        list.innerHTML = '<p style="color:#666; font-size:0.9rem;">No hay tareas agendadas.</p>';
        return;
    }

    datedCards.forEach(card => {
        const parts = card.date.split('-');
        const cDate = new Date(parts[0], parts[1]-1, parts[2]);
        let dateClass = '';
        let diffTime = cDate.getTime() - today.getTime();
        let diffDays = diffTime / (1000 * 3600 * 24);
        
        let label = card.date;
        if (diffDays < 0) { dateClass = 'overdue'; label = 'Atrasado'; }
        else if (diffDays === 0) { dateClass = 'today'; label = 'Hoy'; }
        else if (diffDays === 1) { label = 'Mañana'; }

        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.05)';
        div.style.padding = '10px';
        div.style.borderRadius = '8px';
        div.style.marginBottom = '10px';
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => openCardModal(card));

        div.innerHTML = `
            <div style="font-weight:600; font-size:0.9rem; margin-bottom:3px;">${card.client}</div>
            <div class="card-date ${dateClass}" style="margin:0;">📅 ${label}${card.time ? ` ⏰ ${card.time}` : ''} ${diffDays < 0 || diffDays > 1 ? `(${card.date})` : ''}</div>
        `;
        list.appendChild(div);
    });
}

function openCardModal(card = null) {
    document.getElementById('card-modal').classList.add('active');
    
    const commentsList = document.getElementById('card-comments-list');
    commentsList.innerHTML = '';
    document.getElementById('new-comment-text').value = '';

    const formContainer = document.getElementById('form-details-container');
    const formContent = document.getElementById('form-details-content');

    if (card) {
        document.getElementById('modal-card-title').innerText = 'Editar Registro';
        document.getElementById('card-id').value = card.id;
        document.getElementById('card-client').value = card.client;
        document.getElementById('card-phone').value = card.phone || '';
        document.getElementById('card-email').value = card.email || '';
        document.getElementById('card-column').value = card.column;
        document.getElementById('card-balance-due').value = card.balanceDue !== undefined && card.balanceDue !== null ? card.balanceDue : '';
        document.getElementById('card-date').value = card.date || '';
        document.getElementById('card-time').value = card.time || '';
        document.getElementById('card-desc').value = card.desc || '';
        document.getElementById('btn-delete-card').style.display = 'block';
        
        const btnViewHistory = document.getElementById('btn-view-history');
        btnViewHistory.style.display = 'block';
        btnViewHistory.onclick = () => {
            const baseUrl = window.location.href.split('?')[0].replace('crm.html', 'clientes.html').replace('index.html', 'clientes.html').replace('hub.html', 'clientes.html');
            const historyUrl = new URL(baseUrl);
            historyUrl.searchParams.set('historialName', card.client);
            window.location.href = historyUrl.toString();
        };
        
        if (card.formDetails) {
            formContainer.style.display = 'block';
            const fd = card.formDetails;
            let html = `
                <div><strong>Ubicación:</strong> ${fd.clientAddress || '-'}</div>
                <div><strong>Propiedad:</strong> ${fd.propertyType || '-'} (${fd.propertyFloors || '-'})</div>
                <div><strong>Construcción:</strong> ${fd.propertySizeConstruction || fd.propertySize || '-'} m²</div>
                <div><strong>Terreno:</strong> ${fd.propertySizeTerrain || '-'} m²</div>
                <div><strong>Área a tratar:</strong> ${Array.isArray(fd.treatmentArea) ? fd.treatmentArea.join(', ') : (fd.treatmentArea || '-')}</div>
                <div><strong>Plagas:</strong> ${Array.isArray(fd.plagas) ? fd.plagas.join(', ') : (fd.plagas || '-')}</div>
                <div><strong>Infestación:</strong> ${fd.infestationLevel || '-'}</div>
                <div><strong>Pob. Riesgo:</strong> ${fd.riskPopulation || '-'}</div>
                <div><strong>Comentarios:</strong> ${fd.comments || '-'}</div>
                <div style="font-size:0.75rem; color:#888; margin-top:5px;">Enviado el: ${fd.submittedAt || '-'}</div>
            `;
            formContent.innerHTML = html;
            
            // Wire Prefill button
            const prefillBtn = document.getElementById('btn-prefill-quote');
            prefillBtn.onclick = () => {
                const baseUrl = window.location.href.split('?')[0].replace('crm.html', 'cotizador.html').replace('index.html', 'cotizador.html').replace('hub.html', 'cotizador.html');
                const prefillUrl = new URL(baseUrl);
                prefillUrl.searchParams.set('prefill', 'true');
                prefillUrl.searchParams.set('name', fd.clientName || card.client);
                prefillUrl.searchParams.set('phone', fd.clientPhone || card.phone || '');
                prefillUrl.searchParams.set('email', fd.clientEmail || card.email || '');
                prefillUrl.searchParams.set('address', fd.clientAddress || '');
                
                // Pass construction size to populate property-size input in cotizador
                const constSize = fd.propertySizeConstruction || fd.propertySize || '';
                if (constSize && constSize !== '-') {
                    prefillUrl.searchParams.set('size', constSize);
                }
                
                // Calculate coverage
                let coverage = 'both';
                if (Array.isArray(fd.treatmentArea)) {
                    const hasInterior = fd.treatmentArea.includes('Interior');
                    const hasExterior = fd.treatmentArea.some(a => a && a.startsWith('Exterior'));
                    if (hasInterior && !hasExterior) {
                        coverage = 'inside';
                    } else if (!hasInterior && hasExterior) {
                        coverage = 'outside';
                    }
                }
                prefillUrl.searchParams.set('coverage', coverage);

                // Calculate rodents
                let hasRodents = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && p.includes('Roedores'))) {
                        hasRodents = 'yes';
                    }
                }
                prefillUrl.searchParams.set('rodents', hasRodents);

                // Calculate moths
                let hasMoths = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && p.includes('Polilla'))) {
                        hasMoths = 'yes';
                    }
                }
                if (hasMoths === 'no' && fd.comments) {
                    if (fd.comments.toLowerCase().includes('polilla')) {
                        hasMoths = 'yes';
                    }
                }
                prefillUrl.searchParams.set('moths', hasMoths);

                // Calculate sanitization
                let hasSani = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && (p.includes('Sanitiz') || p.includes('Desinfec')))) {
                        hasSani = 'yes';
                    }
                }
                if (hasSani === 'no' && fd.comments) {
                    const commentLower = fd.comments.toLowerCase();
                    if (commentLower.includes('sanitiz') || commentLower.includes('desinfec') || commentLower.includes('virus') || commentLower.includes('bacteria')) {
                        hasSani = 'yes';
                    }
                }
                prefillUrl.searchParams.set('sanitization', hasSani);

                // Pass client comments as observations
                if (fd.comments && fd.comments !== 'Sin comentarios adicionales.') {
                    prefillUrl.searchParams.set('comments', fd.comments);
                }
                
                // Format a robust technical description
                const areasStr = Array.isArray(fd.treatmentArea) ? fd.treatmentArea.join(', ') : fd.treatmentArea;
                const plagasStr = Array.isArray(fd.plagas) ? fd.plagas.join(', ') : fd.plagas;
                const descText = `Control de plagas (${plagasStr || 'No identificadas'}) en propiedad ${fd.propertyType || '-'}. Construcción: ${fd.propertySizeConstruction || '-'} m², Terreno: ${fd.propertySizeTerrain || '-'} m² (${fd.propertyFloors || '-'}). Áreas: ${areasStr || '-'}. Infestación: ${fd.infestationLevel || '-'}.`;
                prefillUrl.searchParams.set('desc', descText);
                
                window.open(prefillUrl.toString(), '_blank');
            };
        } else {
            formContainer.style.display = 'none';
            formContent.innerHTML = '';
        }

        renderModalComments(card);
    } else {
        document.getElementById('modal-card-title').innerText = 'Nuevo Registro';
        document.getElementById('card-id').value = '';
        document.getElementById('card-client').value = '';
        document.getElementById('card-phone').value = '';
        document.getElementById('card-email').value = '';
        document.getElementById('card-column').selectedIndex = 0;
        document.getElementById('card-balance-due').value = '';
        document.getElementById('card-date').value = '';
        document.getElementById('card-time').value = '';
        document.getElementById('card-desc').value = '';
        document.getElementById('btn-delete-card').style.display = 'none';
        document.getElementById('btn-view-history').style.display = 'none';
        
        formContainer.style.display = 'none';
        formContent.innerHTML = '';
        
        commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">Guarda la tarjeta para poder agregar comentarios.</p>';
    }
}

async function saveCard() {
    if (!currentUser) return alert("Debes iniciar sesión.");
    
    const id = document.getElementById('card-id').value;
    const client = document.getElementById('card-client').value.trim();
    const phone = document.getElementById('card-phone').value.trim();
    const email = document.getElementById('card-email').value.trim();
    const column = document.getElementById('card-column').value;
    const balanceDueInput = document.getElementById('card-balance-due').value;
    const balanceDue = balanceDueInput === '' ? null : parseFloat(balanceDueInput) || 0;
    const date = document.getElementById('card-date').value;
    const time = document.getElementById('card-time').value;
    const desc = document.getElementById('card-desc').value.trim();

    if (!client) return alert("Ingresa un cliente o título.");

    const commentInput = document.getElementById('new-comment-text');
    const pendingComment = commentInput ? commentInput.value.trim() : '';

    // If an inline comment was being edited, save it as well
    const inlineSaveBtn = document.querySelector('.save-edit-btn');
    if (inlineSaveBtn) {
        try { inlineSaveBtn.click(); } catch(e) {}
    }

    const btn = document.getElementById('btn-save-card');
    btn.disabled = true;
    btn.innerText = 'Guardando...';

    try {
        const payload = {
            client, phone, email, column, balanceDue, date, time, desc,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const activeUid = getActiveUid();
        const userInfo = typeof window.getCurrentUserInfo === 'function' ? window.getCurrentUserInfo() : { email: currentUser.email, displayName: currentUser.email.split('@')[0], role: 'tech', roleLabel: 'Técnico' };
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-CL') + ' ' + now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

        const commentObj = pendingComment ? {
            text: pendingComment,
            date: dateStr,
            timestamp: now.getTime(),
            authorEmail: userInfo.email,
            authorName: userInfo.displayName,
            authorRole: userInfo.role,
            authorRoleLabel: userInfo.roleLabel
        } : null;

        if (id) {
            const existingCard = crmCards.find(c => c.id === id);
            const oldDate = existingCard ? existingCard.date : null;
            const oldCol = existingCard ? existingCard.column : null;

            if (commentObj) {
                payload.comments = firebase.firestore.FieldValue.arrayUnion(commentObj);
            }
            await db.collection('users').doc(activeUid).collection('crm').doc(id).update(payload);

            if (existingCard) {
                Object.assign(existingCard, { client, phone, email, column, balanceDue, date, time, desc });
                if (commentObj) {
                    if (!existingCard.comments) existingCard.comments = [];
                    existingCard.comments.push(commentObj);
                }
            }

            // Track changes in Activity Log
            if (typeof window.logSystemActivity === 'function') {
                if (oldDate !== date) {
                    window.logSystemActivity({
                        actionType: 'date_changed',
                        category: 'dates',
                        summary: `Cambió la fecha de seguimiento a ${date || 'Sin fecha'} para "${client}"`,
                        details: { previousDate: oldDate || 'Sin fecha', newDate: date || 'Sin fecha' },
                        clientName: client,
                        cardId: id
                    });
                }
                if (oldCol && oldCol !== column) {
                    window.logSystemActivity({
                        actionType: 'crm_stage_changed',
                        category: 'crm',
                        summary: `Movió "${client}" de "${oldCol}" a "${column}"`,
                        details: { fromCol: oldCol, toCol: column },
                        clientName: client,
                        cardId: id
                    });
                }
                if (oldDate === date && (!oldCol || oldCol === column)) {
                    window.logSystemActivity({
                        actionType: 'crm_updated',
                        category: 'crm',
                        summary: `Actualizó datos del trato CRM para "${client}"`,
                        details: { client, column, phone, email, balanceDue, desc },
                        clientName: client,
                        cardId: id
                    });
                }
                if (commentObj) {
                    window.logSystemActivity({
                        actionType: 'comment_added',
                        category: 'comments',
                        summary: `Agregó un comentario en "${client}"`,
                        details: { textSnippet: pendingComment.substring(0, 80) },
                        clientName: client,
                        cardId: id
                    });
                }
            }
        } else {
            payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            if (commentObj) {
                payload.comments = [commentObj];
            } else {
                payload.comments = [];
            }
            const newDocRef = await db.collection('users').doc(activeUid).collection('crm').add(payload);
            payload.id = newDocRef.id;

            if (typeof window.logSystemActivity === 'function') {
                window.logSystemActivity({
                    actionType: 'crm_created',
                    category: 'crm',
                    summary: `Creó un nuevo trato CRM para "${client}" (Etapa: ${column})`,
                    details: { client, column, date, phone, email, balanceDue },
                    clientName: client,
                    cardId: payload.id
                });
                if (commentObj) {
                    window.logSystemActivity({
                        actionType: 'comment_added',
                        category: 'comments',
                        summary: `Agregó un comentario en "${client}"`,
                        details: { textSnippet: pendingComment.substring(0, 80) },
                        clientName: client,
                        cardId: payload.id
                    });
                }
            }
        }
        
        if (commentInput) {
            commentInput.value = '';
        }

        // Auto-save client to directory
        saveClientToDirectorySilently(client, phone, email);

        document.getElementById('card-modal').classList.remove('active');
    } catch (e) {
        console.error(e);
        alert("Error al guardar.");
    } finally {
        btn.disabled = false;
        btn.innerText = 'Guardar';
    }
}

async function deleteCard() {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    const id = document.getElementById('card-id').value;
    if (!id) return;
    
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
        const cardToDelete = crmCards.find(c => c.id === id);
        try {
            await db.collection('users').doc(activeUid).collection('crm').doc(id).delete();
            document.getElementById('card-modal').classList.remove('active');

            if (typeof window.logSystemActivity === 'function' && cardToDelete) {
                window.logSystemActivity({
                    actionType: 'crm_deleted',
                    category: 'crm',
                    summary: `Eliminó el trato CRM de "${cardToDelete.client}" (Etapa: ${cardToDelete.column})`,
                    details: { client: cardToDelete.client, column: cardToDelete.column, date: cardToDelete.date },
                    clientName: cardToDelete.client,
                    cardId: id
                });
            }
        } catch(e) {
            alert("Error al eliminar.");
        }
    }
}

async function moveCard(cardId, newCol) {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    const card = crmCards.find(c => c.id === cardId);
    const oldCol = card ? card.column : null;

    try {
        await db.collection('users').doc(activeUid).collection('crm').doc(cardId).update({
            column: newCol,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        if (typeof window.logSystemActivity === 'function' && card && oldCol !== newCol) {
            window.logSystemActivity({
                actionType: 'crm_stage_changed',
                category: 'crm',
                summary: `Movió "${card.client}" de "${oldCol}" a "${newCol}"`,
                details: { fromCol: oldCol, toCol: newCol },
                clientName: card.client,
                cardId: cardId
            });
        }
    } catch(e) {
        console.error("Error moving card", e);
        // Revert on error
        loadCardsFromFirebase();
    }
}

async function addComment() {
    const activeUid = getActiveUid();
    if (!activeUid) return alert("Debes iniciar sesión para agregar comentarios.");
    const textInput = document.getElementById('new-comment-text');
    const text = textInput.value.trim();
    if (!text) return;
    const cardId = document.getElementById('card-id').value;
    if (!cardId) {
        alert("Debes guardar el registro nuevo antes de agregar comentarios.");
        return;
    }

    const btn = document.getElementById('btn-add-comment');
    btn.disabled = true;

    try {
        const userInfo = typeof window.getCurrentUserInfo === 'function' ? window.getCurrentUserInfo() : { email: currentUser.email, displayName: currentUser.email.split('@')[0], role: 'tech', roleLabel: 'Técnico' };
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-CL') + ' ' + now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

        const commentObj = {
            text: text,
            date: dateStr,
            timestamp: now.getTime(),
            authorEmail: userInfo.email,
            authorName: userInfo.displayName,
            authorRole: userInfo.role,
            authorRoleLabel: userInfo.roleLabel
        };

        await db.collection('users').doc(activeUid).collection('crm').doc(cardId).update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentObj),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        textInput.value = '';
        
        const card = crmCards.find(c => c.id === cardId);
        if (card) {
            if (!card.comments) card.comments = [];
            card.comments.push(commentObj);
            renderModalComments(card);
        }

        if (typeof window.logSystemActivity === 'function') {
            window.logSystemActivity({
                actionType: 'comment_added',
                category: 'comments',
                summary: `Agregó un comentario en "${card ? card.client : 'Trato CRM'}"`,
                details: { textSnippet: text.length > 80 ? text.substring(0, 80) + '...' : text },
                clientName: card ? card.client : '',
                cardId: cardId
            });
        }
    } catch (e) {
        console.error(e);
        alert("Error al guardar el comentario.");
    } finally {
        btn.disabled = false;
    }
}

function renderModalComments(card) {
    const commentsList = document.getElementById('card-comments-list');
    commentsList.innerHTML = '';
    
    if (!card || !card.comments || card.comments.length === 0) {
        commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">No hay comentarios aún.</p>';
        return;
    }

    card.comments.forEach((c, index) => {
        const cDiv = document.createElement('div');
        cDiv.className = 'asana-comment-item';
        cDiv.style.marginBottom = '10px';

        const authorName = c.authorName || (c.authorEmail ? c.authorEmail.split('@')[0].replace(/[._\-]/g, ' ') : 'Usuario');
        const authorRole = c.authorRole || 'tech';
        const authorRoleLabel = c.authorRoleLabel || (authorRole === 'admin' ? 'Admin' : (authorRole === 'client' ? 'Cliente' : 'Técnico'));
        let initials = 'U';
        if (authorName && authorName !== 'Usuario') {
            const parts = authorName.trim().split(/\s+/);
            initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
        } else {
            initials = '💬';
        }
        const timeAgoStr = typeof window.formatTimeAgo === 'function' ? window.formatTimeAgo(c.timestamp || c.date) : (c.date || '-');

        cDiv.innerHTML = `
            <div class="asana-comment-header">
                <div class="asana-author-left">
                    <div class="user-avatar-circle ${authorRole}" style="width: 24px; height: 24px; font-size: 0.7rem;">${initials}</div>
                    <strong class="asana-author-name" style="font-size: 0.85rem;">${authorName}</strong>
                    <span class="user-role-badge ${authorRole}">${authorRoleLabel}</span>
                    <span class="asana-comment-time" title="${c.date || ''}">• ${timeAgoStr}</span>
                </div>
                <div class="asana-comment-actions">
                    <a href="#" class="edit-comment-link" style="color: #60a5fa;">Editar</a>
                    <span style="color: rgba(255,255,255,0.2);">|</span>
                    <a href="#" class="delete-comment-link" style="color: #f87171;">Borrar</a>
                </div>
            </div>
            <p class="asana-comment-body" style="padding-left: 32px; font-size: 0.88rem; color: #cbd5e1;">${(c.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        `;

        const editLink = cDiv.querySelector('.edit-comment-link');
        const deleteLink = cDiv.querySelector('.delete-comment-link');

        if (editLink) {
            editLink.onclick = (e) => {
                e.preventDefault();
                cDiv.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
                        <span style="font-size: 0.78rem; color: #aaa;">Editando comentario de ${c.date}</span>
                        <textarea class="edit-comment-textarea" style="width: 100%; min-height: 60px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 6px; padding: 8px; font-family: inherit; font-size: 0.9rem; resize: vertical; outline: none;"></textarea>
                        <div style="display: flex; gap: 8px; justify-content: flex-end;">
                            <button class="btn btn-secondary btn-sm cancel-edit-btn" style="padding: 2px 8px; font-size: 0.75rem; background: transparent; border-color: transparent; color: #aaa;">Cancelar</button>
                            <button class="btn btn-primary btn-sm save-edit-btn" style="padding: 2px 10px; font-size: 0.75rem;">Guardar</button>
                        </div>
                    </div>
                `;
                const textarea = cDiv.querySelector('.edit-comment-textarea');
                textarea.value = c.text;
                textarea.focus();

                cDiv.querySelector('.cancel-edit-btn').onclick = (ev) => {
                    ev.preventDefault();
                    renderModalComments(card);
                };

                cDiv.querySelector('.save-edit-btn').onclick = async (ev) => {
                    ev.preventDefault();
                    const newText = textarea.value.trim();
                    if (!newText) return;
                    
                    await updateComment(index, newText);
                    card.comments[index].text = newText;
                    renderModalComments(card);
                };
            };
        }

        if (deleteLink) {
            deleteLink.onclick = async (e) => {
                e.preventDefault();
                if (confirm("¿Seguro que deseas eliminar este comentario?")) {
                    await deleteComment(index);
                    card.comments.splice(index, 1);
                    renderModalComments(card);
                }
            };
        }

        commentsList.appendChild(cDiv);
    });
    commentsList.scrollTop = commentsList.scrollHeight;
}

async function updateComment(index, newText) {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    const cardId = document.getElementById('card-id').value;
    if (!cardId) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card) return;

    try {
        const updatedComments = [...(card.comments || [])];
        updatedComments[index].text = newText;

        await db.collection('users').doc(activeUid).collection('crm').doc(cardId).update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        if (typeof window.logSystemActivity === 'function') {
            window.logSystemActivity({
                actionType: 'comment_edited',
                category: 'comments',
                summary: `Editó un comentario en "${card ? card.client : 'Trato CRM'}"`,
                details: { textSnippet: newText.substring(0, 80) },
                clientName: card ? card.client : '',
                cardId: cardId
            });
        }
    } catch (e) {
        console.error(e);
        alert("Error al actualizar comentario.");
    }
}

async function deleteComment(index) {
    const activeUid = getActiveUid();
    if (!activeUid) return;
    const cardId = document.getElementById('card-id').value;
    if (!cardId) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card) return;

    try {
        const updatedComments = [...(card.comments || [])];
        const removed = updatedComments.splice(index, 1);

        await db.collection('users').doc(activeUid).collection('crm').doc(cardId).update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        if (typeof window.logSystemActivity === 'function') {
            window.logSystemActivity({
                actionType: 'comment_deleted',
                category: 'comments',
                summary: `Eliminó un comentario en "${card ? card.client : 'Trato CRM'}"`,
                details: { textSnippet: removed[0] ? (removed[0].text || '').substring(0, 80) : '' },
                clientName: card ? card.client : '',
                cardId: cardId
            });
        }
    } catch (e) {
        console.error(e);
        alert("Error al eliminar el comentario.");
    }
}

function renderClientsSelect(filter = '') {
    const listEl = document.getElementById('client-select-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    if (clientsList.length === 0) {
        listEl.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No hay clientes guardados. Guárdalos desde la Configuración del Cotizador o el Informador.</p>';
        return;
    }

    const term = filter.toLowerCase();
    const filtered = clientsList.filter(c => c.name.toLowerCase().includes(term) || (c.address && c.address.toLowerCase().includes(term)));

    if (filtered.length === 0) {
        listEl.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No se encontraron clientes.</p>';
        return;
    }

    // Sort alphabetically
    filtered.sort((a,b) => (a.name || '').localeCompare(b.name || ''));

    filtered.forEach(client => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.style.cursor = 'pointer';
        div.onclick = () => {
            loadClientToForm(client.id);
            document.getElementById('clients-modal').classList.remove('active');
        };
        div.innerHTML = `
            <div class="db-item-info">
                <strong>${client.name}</strong>
                <span style="font-size: 0.85rem; color: #888;">Tel: ${client.phone || ''} | ${client.address || ''}${client.email ? ` | Email: ${client.email}` : ''}</span>
            </div>
            <div class="db-item-actions">
                <button class="btn btn-primary btn-sm">Seleccionar</button>
            </div>
        `;
        listEl.appendChild(div);
    });
}

function loadClientToForm(id) {
    const client = clientsList.find(c => c.id === id);
    if (!client) return;

    document.getElementById('card-client').value = client.name || '';
    document.getElementById('card-phone').value = client.phone || '';
    document.getElementById('card-email').value = client.email || '';
}

function saveClientToDirectorySilently(name, phone, email) {
    if (!name) return;
    
    let appData = {};
    const savedData = localStorage.getItem('stahlgraf_data_v4');
    if (savedData) {
        try { appData = JSON.parse(savedData); } catch(e) {}
    }
    if (!appData.clients) appData.clients = [];

    const newClient = {
        id: 'cl_' + Date.now(),
        name: name,
        attention: '',
        phone: phone || '',
        email: email || '',
        address: ''
    };

    const existingIndex = appData.clients.findIndex(c => (c.name || '').toLowerCase() === name.toLowerCase());
    if (existingIndex >= 0) {
        newClient.id = appData.clients[existingIndex].id; // preserve ID
        newClient.attention = appData.clients[existingIndex].attention || '';
        newClient.address = appData.clients[existingIndex].address || '';
        if (!phone && appData.clients[existingIndex].phone) newClient.phone = appData.clients[existingIndex].phone;
        if (!email && appData.clients[existingIndex].email) newClient.email = appData.clients[existingIndex].email;
        appData.clients[existingIndex] = newClient;
    } else {
        appData.clients.push(newClient);
    }

    clientsList = appData.clients;
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    
    const activeUid = getActiveUid();
    if (activeUid && db) {
        db.collection('users').doc(activeUid).set(appData, { merge: true })
            .catch(err => console.error("Error saving client directory from CRM:", err));
    }
}

function syncCrmClientsToDirectory() {
    const activeUid = getActiveUid();
    if (!activeUid || !db || !isUserConfigLoaded) return;
    if (crmCards.length === 0) return;

    let appDataLocal = {};
    const savedData = localStorage.getItem('stahlgraf_data_v4');
    if (savedData) {
        try { appDataLocal = JSON.parse(savedData); } catch(e) {}
    }
    if (!appDataLocal.clients) appDataLocal.clients = [];

    let updated = false;

    crmCards.forEach(card => {
        const clientName = (card.client || '').trim();
        if (!clientName) return;

        const existingIndex = appDataLocal.clients.findIndex(c => (c.name || '').toLowerCase() === clientName.toLowerCase());

        let phone = (card.phone || '').trim();
        let email = (card.email || '').trim();
        let address = '';

        if (card.formDetails) {
            if (!phone && card.formDetails.clientPhone) phone = card.formDetails.clientPhone.trim();
            if (!email && card.formDetails.clientEmail) email = card.formDetails.clientEmail.trim();
            if (card.formDetails.clientAddress) address = card.formDetails.clientAddress.trim();
        }

        if (existingIndex >= 0) {
            const existing = appDataLocal.clients[existingIndex];
            let needsUpdate = false;
            if (phone && !existing.phone) {
                existing.phone = phone;
                needsUpdate = true;
            }
            if (email && !existing.email) {
                existing.email = email;
                needsUpdate = true;
            }
            if (address && !existing.address) {
                existing.address = address;
                needsUpdate = true;
            }
            if (needsUpdate) {
                appDataLocal.clients[existingIndex] = existing;
                updated = true;
            }
        } else {
            const newClient = {
                id: 'cl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: clientName,
                attention: '',
                phone: phone,
                email: email,
                address: address
            };
            appDataLocal.clients.push(newClient);
            updated = true;
        }
    });

    if (updated) {
        clientsList = appDataLocal.clients;
        localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appDataLocal));
        
        db.collection('users').doc(activeUid).set(appDataLocal, { merge: true })
            .then(() => {
                console.log("Client directory auto-synchronized with CRM cards.");
            })
            .catch(err => console.error("Error auto-saving client directory from CRM:", err));
    }
}
