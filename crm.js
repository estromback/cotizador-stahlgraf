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

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.");
    }
} else if (firebase.apps.length) {
    db = firebase.firestore();
    auth = firebase.auth();
}

let appData = { crmColumns: 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos' };
let crmCards = [];
let draggingCardId = null;
let clientsList = [];

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
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            if (cloudData.clients) {
                clientsList = cloudData.clients;
                localStorage.setItem('stahlgraf_data_v4', JSON.stringify({ ...JSON.parse(localStorage.getItem('stahlgraf_data_v4') || '{}'), clients: clientsList }));
            }
        }
    }).catch(e => console.error("Error loading clients from Firestore: ", e));
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
            const formUrl = window.location.origin + window.location.pathname.replace('crm.html', 'contacto.html') + '?uid=' + currentUser.uid;
            
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
    select.innerHTML = '';

    cols.forEach(col => {
        // Build Select Option
        const opt = document.createElement('option');
        opt.value = col;
        opt.textContent = col;
        select.appendChild(opt);

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
}

function normalizeId(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

async function loadCardsFromFirebase() {
    if (!currentUser) return;
    
    db.collection('users').doc(currentUser.uid).collection('crm')
        .onSnapshot(snap => {
            crmCards = [];
            snap.forEach(doc => {
                crmCards.push({ id: doc.id, ...doc.data() });
            });
            renderBoardSkeleton(); // Redraw board dynamically to draw any new columns
            renderCards();
            renderSidebar();
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
                    
                    dateHtml = `<div class="card-date ${dateClass}">📅 ${card.date}</div>`;
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
            <div class="card-date ${dateClass}" style="margin:0;">📅 ${label} ${diffDays < 0 || diffDays > 1 ? `(${card.date})` : ''}</div>
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
        document.getElementById('card-date').value = card.date || '';
        document.getElementById('card-desc').value = card.desc || '';
        document.getElementById('btn-delete-card').style.display = 'block';
        
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
                const prefillUrl = new URL(window.location.origin + window.location.pathname.replace('crm.html', 'cotizador.html'));
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

        if (card.comments && card.comments.length > 0) {
            card.comments.forEach(c => {
                const cDiv = document.createElement('div');
                cDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                cDiv.style.paddingBottom = '5px';
                cDiv.style.marginBottom = '5px';
                cDiv.innerHTML = `<span style="font-size: 0.8rem; color: #aaa;">${c.date}</span><p style="margin: 3px 0; font-size: 0.9rem; white-space: pre-wrap;">${c.text}</p>`;
                commentsList.appendChild(cDiv);
            });
            commentsList.scrollTop = commentsList.scrollHeight;
        } else {
            commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">No hay comentarios aún.</p>';
        }
    } else {
        document.getElementById('modal-card-title').innerText = 'Nuevo Registro';
        document.getElementById('card-id').value = '';
        document.getElementById('card-client').value = '';
        document.getElementById('card-phone').value = '';
        document.getElementById('card-email').value = '';
        document.getElementById('card-column').selectedIndex = 0;
        document.getElementById('card-date').value = '';
        document.getElementById('card-desc').value = '';
        document.getElementById('btn-delete-card').style.display = 'none';
        
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
    const date = document.getElementById('card-date').value;
    const desc = document.getElementById('card-desc').value.trim();

    if (!client) return alert("Ingresa un cliente o título.");

    const btn = document.getElementById('btn-save-card');
    btn.disabled = true;
    btn.innerText = 'Guardando...';

    try {
        const payload = {
            client, phone, email, column, date, desc,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (id) {
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(id).update(payload);
        } else {
            payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            payload.comments = [];
            await db.collection('users').doc(currentUser.uid).collection('crm').add(payload);
        }
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
    if (!currentUser) return;
    const id = document.getElementById('card-id').value;
    if (!id) return;
    
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
        try {
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(id).delete();
            document.getElementById('card-modal').classList.remove('active');
        } catch(e) {
            alert("Error al eliminar.");
        }
    }
}

async function moveCard(cardId, newCol) {
    if (!currentUser) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card || card.column === newCol) return;

    // Optimistic update
    card.column = newCol;
    renderCards();
    
    try {
        await db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId).update({
            column: newCol,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch(e) {
        console.error("Error moving card", e);
        // Revert on error
        loadCardsFromFirebase();
    }
}

async function addComment() {
    if (!currentUser) return;
    const cardId = document.getElementById('card-id').value;
    if (!cardId) {
        alert("Debes guardar el registro nuevo antes de agregar comentarios.");
        return;
    }

    const textInput = document.getElementById('new-comment-text');
    const text = textInput.value.trim();
    if (!text) return;

    const btn = document.getElementById('btn-add-comment');
    btn.disabled = true;

    try {
        const now = new Date();
        const dateStr = now.toLocaleString(); // e.g. "10/24/2023, 10:30:00 AM"

        await db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                text: text,
                date: dateStr
            }),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        textInput.value = '';
        // Automatically close/reopen or rely on loadCardsFromFirebase snapshot to update UI?
        // Let's just update the modal UI manually so it feels instant
        const commentsList = document.getElementById('card-comments-list');
        if (commentsList.innerHTML.includes('No hay comentarios aún')) commentsList.innerHTML = '';
        
        const cDiv = document.createElement('div');
        cDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        cDiv.style.paddingBottom = '5px';
        cDiv.style.marginBottom = '5px';
        cDiv.innerHTML = `<span style="font-size: 0.8rem; color: #aaa;">${dateStr}</span><p style="margin: 3px 0; font-size: 0.9rem; white-space: pre-wrap;">${text}</p>`;
        commentsList.appendChild(cDiv);
        commentsList.scrollTop = commentsList.scrollHeight;

    } catch (e) {
        console.error(e);
        alert("Error al guardar el comentario.");
    } finally {
        btn.disabled = false;
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
