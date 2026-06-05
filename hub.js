// hub.js - Logic for the Stahlgraf Hub Central

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

// Calendar widget states
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let crmCards = [];
let clientsList = [];
let crmListener = null;
let draggingCardId = null;
let isUserConfigLoaded = false;

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

// Default App Data (same structure as app.js)
let appData = {
    chemicals: [
        { id: 'default_1', name: 'DELTAMETRINA 2.5%SC (Estándar)', type: 'standard', price: 15000, size: 1000, dose: 10 },
        { id: 'default_2', name: 'CYPERMETRINA 20% (Fuerte)', type: 'standard', price: 12000, size: 1000, dose: 5 },
        { id: 'default_3', name: 'AMONIO CUATERNARIO 10% (Sanitización)', type: 'standard', price: 10000, size: 1000, dose: 20 }
    ],
    clients: [],
    margin: 40,
    correlative: 1,
    reportCorrelative: 1,
    minRate: 40000,
    hhPrice: 15000,
    hhSpeed: 50,
    baitPrice: 3750,
    loosePrice: 800,
    inspectPrice: 1500,
    snapPrice: 4500,
    sanitizePrice: 25000,
    exclusionPrice: 35000,
    mothPrepPrice: 15000,
    mothTrapPrice: 5000,
    mothChemPrice: 25000,
    asanaToken: '',
    asanaProject: '',
    crmColumns: 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos'
};

function loadData() {
    const saved = localStorage.getItem('stahlgraf_data_v4');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            appData = { ...appData, ...parsed };
        } catch(e) {
            console.error("Error parsing local data", e);
        }
    }
}

function saveData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
}

// Authentication State
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        const syncText = document.getElementById('sync-text');
        const syncIcon = document.getElementById('sync-icon');
        
        if (user) {
            syncText.innerText = user.email;
            syncIcon.innerText = '🟢';
            document.getElementById('btn-sync-login').classList.remove('btn-primary-outline');
            document.getElementById('btn-sync-login').classList.add('btn-secondary');
            
            loadDashboardStats();
            subscribeToCRM();
            loadUserClients();
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
            document.getElementById('btn-sync-login').classList.add('btn-primary-outline');
            document.getElementById('btn-sync-login').classList.remove('btn-secondary');
            
            document.getElementById('dashboard-stats').innerHTML = `
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
                    <p style="margin: 0; color: #ccc;">Inicia sesión para ver las estadísticas en la nube.</p>
                </div>
            `;
            
            if (crmListener) {
                crmListener();
                crmListener = null;
            }
            crmCards = [];
            clientsList = [];
            const grid = document.getElementById('calendar-days');
            if (grid) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: #aaa;">
                        Inicia sesión para ver tu calendario de CRM.
                    </div>
                `;
            }
        }
    });
}

// UI Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // Login Sync Button
    document.getElementById('btn-sync-login').addEventListener('click', () => {
        if (!auth) return alert("Firebase no está configurado.");
        if (currentUser) {
            if (confirm("¿Deseas cerrar sesión?")) auth.signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
    });

    // Settings Modal Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.settings-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            if (document.getElementById(targetId)) document.getElementById(targetId).classList.add('active');
        });
    });

    // Settings Modal Logic
    const modal = document.getElementById('settings-modal');
    document.getElementById('btn-settings').addEventListener('click', () => {
        updateSettingsUI();
        modal.classList.add('active');
    });
    document.getElementById('btn-close-settings').addEventListener('click', () => {
        saveSettingsFromUI();
        modal.classList.remove('active');
    });

    // Chemicals Settings Actions
    document.getElementById('btn-add-chemical').addEventListener('click', () => {
        document.getElementById('chemical-form').classList.remove('hidden');
        document.getElementById('chem-id').value = '';
        document.getElementById('chem-name').value = '';
        document.getElementById('chem-price').value = '';
        document.getElementById('chem-size').value = '1000';
        document.getElementById('chem-dose').value = '';
    });
    document.getElementById('btn-cancel-chem').addEventListener('click', () => {
        document.getElementById('chemical-form').classList.add('hidden');
    });
    document.getElementById('btn-save-chem').addEventListener('click', saveChemical);
    
    // CRM Columns
    if (document.getElementById('setting-crm-columns')) {
        document.getElementById('setting-crm-columns').addEventListener('change', (e) => {
            appData.crmColumns = e.target.value;
            saveData();
            renderCRMColumnsSelect();
        });
    }

    // Calendar Navigation Controls
    if (document.getElementById('cal-btn-prev')) {
        document.getElementById('cal-btn-prev').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    if (document.getElementById('cal-btn-next')) {
        document.getElementById('cal-btn-next').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    if (document.getElementById('cal-btn-today')) {
        document.getElementById('cal-btn-today').addEventListener('click', () => {
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            renderCalendar(currentMonth, currentYear);
        });
    }
    if (document.getElementById('cal-btn-add')) {
        document.getElementById('cal-btn-add').addEventListener('click', () => {
            const todayStr = formatDateStr(new Date());
            openCardModal(null, todayStr);
        });
    }

    // Card Modal Buttons
    if (document.getElementById('btn-close-card')) {
        document.getElementById('btn-close-card').addEventListener('click', closeCardModal);
    }
    if (document.getElementById('btn-save-card')) {
        document.getElementById('btn-save-card').addEventListener('click', saveCard);
    }
    if (document.getElementById('btn-delete-card')) {
        document.getElementById('btn-delete-card').addEventListener('click', deleteCard);
    }
    if (document.getElementById('btn-add-comment')) {
        document.getElementById('btn-add-comment').addEventListener('click', addComment);
    }

    // Clients Modal search and load
    if (document.getElementById('btn-load-client')) {
        document.getElementById('btn-load-client').addEventListener('click', () => {
            document.getElementById('clients-modal').classList.add('active');
            renderClientsSelect();
        });
    }
    if (document.getElementById('btn-close-clients')) {
        document.getElementById('btn-close-clients').addEventListener('click', () => {
            document.getElementById('clients-modal').classList.remove('active');
        });
    }
    if (document.getElementById('client-search')) {
        document.getElementById('client-search').addEventListener('input', (e) => {
            renderClientsSelect(e.target.value);
        });
    }
});

function updateSettingsUI() {
    document.getElementById('setting-margin').value = appData.margin;
    document.getElementById('setting-correlative').value = appData.correlative;
    document.getElementById('setting-report-correlative').value = appData.reportCorrelative;
    document.getElementById('setting-min-rate').value = appData.minRate;
    document.getElementById('setting-hh-price').value = appData.hhPrice;
    document.getElementById('setting-hh-speed').value = appData.hhSpeed;

    document.getElementById('setting-bait-price').value = appData.baitPrice;
    document.getElementById('setting-loose-price').value = appData.loosePrice;
    document.getElementById('setting-inspect-price').value = appData.inspectPrice;
    document.getElementById('setting-snap-price').value = appData.snapPrice;
    document.getElementById('setting-sanitize-price').value = appData.sanitizePrice;
    document.getElementById('setting-exclusion-price').value = appData.exclusionPrice;
    
    document.getElementById('setting-moth-prep-price').value = appData.mothPrepPrice;
    document.getElementById('setting-moth-trap-price').value = appData.mothTrapPrice;
    document.getElementById('setting-moth-chem-price').value = appData.mothChemPrice;

    document.getElementById('setting-asana-token').value = appData.asanaToken;
    document.getElementById('setting-asana-project').value = appData.asanaProject;
    
    if (document.getElementById('setting-crm-columns')) {
        document.getElementById('setting-crm-columns').value = appData.crmColumns || 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos';
    }

    renderChemicalsSettings();
}

function saveSettingsFromUI() {
    appData.margin = parseInt(document.getElementById('setting-margin').value) || 40;
    appData.correlative = parseInt(document.getElementById('setting-correlative').value) || 1;
    appData.reportCorrelative = parseInt(document.getElementById('setting-report-correlative').value) || 1;
    appData.minRate = parseInt(document.getElementById('setting-min-rate').value) || 40000;
    appData.hhPrice = parseInt(document.getElementById('setting-hh-price').value) || 15000;
    appData.hhSpeed = parseInt(document.getElementById('setting-hh-speed').value) || 50;

    appData.baitPrice = parseInt(document.getElementById('setting-bait-price').value) || 3750;
    appData.loosePrice = parseInt(document.getElementById('setting-loose-price').value) || 800;
    appData.inspectPrice = parseInt(document.getElementById('setting-inspect-price').value) || 1500;
    appData.snapPrice = parseInt(document.getElementById('setting-snap-price').value) || 4500;
    appData.sanitizePrice = parseInt(document.getElementById('setting-sanitize-price').value) || 25000;
    appData.exclusionPrice = parseInt(document.getElementById('setting-exclusion-price').value) || 35000;

    appData.mothPrepPrice = parseInt(document.getElementById('setting-moth-prep-price').value) || 15000;
    appData.mothTrapPrice = parseInt(document.getElementById('setting-moth-trap-price').value) || 5000;
    appData.mothChemPrice = parseInt(document.getElementById('setting-moth-chem-price').value) || 25000;

    appData.asanaToken = document.getElementById('setting-asana-token').value.trim();
    appData.asanaProject = document.getElementById('setting-asana-project').value.trim();

    if (document.getElementById('setting-crm-columns')) {
        appData.crmColumns = document.getElementById('setting-crm-columns').value;
    }
    
    saveData();
}

function saveChemical() {
    const id = document.getElementById('chem-id').value;
    const name = document.getElementById('chem-name').value;
    const type = document.getElementById('chem-type').value;
    const price = parseInt(document.getElementById('chem-price').value);
    const size = parseInt(document.getElementById('chem-size').value);
    const dose = parseFloat(document.getElementById('chem-dose').value);

    if(!name || !price || !size || !dose) return alert("Completa todos los campos");

    const newChem = { id: id || 'chem_' + Date.now(), name, type, price, size, dose };
    if(id) {
        const i = appData.chemicals.findIndex(c => c.id === id);
        if(i > -1) appData.chemicals[i] = newChem;
    } else {
        appData.chemicals.push(newChem);
    }
    saveData();
    renderChemicalsSettings();
    document.getElementById('chemical-form').classList.add('hidden');
}

function deleteChemical(id) {
    if(confirm("¿Seguro que deseas eliminar este producto?")) {
        appData.chemicals = appData.chemicals.filter(c => c.id !== id);
        saveData();
        renderChemicalsSettings();
    }
}

function renderChemicalsSettings() {
    const list = document.getElementById('db-chemicals-list');
    list.innerHTML = '';
    appData.chemicals.forEach(chem => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.innerHTML = `
            <div class="db-item-info">
                <strong>${chem.name}</strong>
                <span>Precio: $${chem.price} | Envase: ${chem.size}ml | Dosis: ${chem.dose}ml/m²</span>
            </div>
            <div class="db-item-actions">
                <button class="action-danger" onclick="deleteChemical('${chem.id}')">Eliminar</button>
            </div>
        `;
        list.appendChild(div);
    });
}

async function loadDashboardStats() {
    const statsDiv = document.getElementById('dashboard-stats');
    const chartDiv = document.getElementById('pests-chart-bars');
    if (!currentUser || !db) return;
    
    try {
        statsDiv.innerHTML = '<p>Cargando datos...</p>';
        const [quotesSnap, reportsSnap] = await Promise.all([
            db.collection('users').doc(currentUser.uid).collection('quotes').get(),
            db.collection('users').doc(currentUser.uid).collection('reports').get()
        ]);
        
        let totalQuotes = quotesSnap.size;
        let totalReports = reportsSnap.size;
        let pendingQuotes = 0;
        
        // Stats blocks
        statsDiv.innerHTML = `
            <div class="stat-card" style="background: rgba(33, 150, 243, 0.1); padding: 15px; border-radius: 10px; border-left: 4px solid #2196F3;">
                <h4 style="margin:0; color:#aaa; font-size:0.9rem;">Cotizaciones Generadas</h4>
                <p style="margin: 5px 0 0 0; font-size: 1.8rem; font-weight: 700; color: #fff;">${totalQuotes}</p>
            </div>
            <div class="stat-card" style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 10px; border-left: 4px solid #4CAF50;">
                <h4 style="margin:0; color:#aaa; font-size:0.9rem;">Informes Técnicos</h4>
                <p style="margin: 5px 0 0 0; font-size: 1.8rem; font-weight: 700; color: #fff;">${totalReports}</p>
            </div>
        `;
        
        // Pests chart based on reports
        let pestsCount = { 'Roedores': 0, 'Insectos': 0, 'Polillas': 0, 'Desinfección': 0 };
        reportsSnap.forEach(doc => {
            const data = doc.data();
            const tags = data.serviceTags || [];
            if(tags.includes('roedores')) pestsCount['Roedores']++;
            if(tags.includes('insectos')) pestsCount['Insectos']++;
            if(tags.includes('polillas')) pestsCount['Polillas']++;
            if(tags.includes('sanitizacion')) pestsCount['Desinfección']++;
        });
        
        let max = Math.max(...Object.values(pestsCount));
        if (max === 0) {
            chartDiv.innerHTML = '<p style="color:#aaa;">No hay datos suficientes de plagas.</p>';
            return;
        }
        
        chartDiv.innerHTML = Object.entries(pestsCount).map(([name, val]) => {
            let pct = (val / max) * 100;
            return `
                <div style="margin-bottom: 10px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                        <span style="font-size:0.9rem; color:#ccc;">${name}</span>
                        <span style="font-size:0.9rem; font-weight:bold;">${val}</span>
                    </div>
                    <div style="width:100%; background:rgba(255,255,255,0.1); border-radius:10px; height:8px; overflow:hidden;">
                        <div style="width:${pct}%; background:var(--primary); height:100%; border-radius:10px;"></div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (e) {
        console.error(e);
        statsDiv.innerHTML = '<p style="color:#e74c3c;">Error cargando estadísticas.</p>';
    }
}

// ==========================================
// CALENDAR & CRM LOGIC
// ==========================================

function subscribeToCRM() {
    if (!currentUser || !db) return;
    if (crmListener) crmListener();
    
    crmListener = db.collection('users').doc(currentUser.uid).collection('crm')
        .onSnapshot(snap => {
            crmCards = [];
            snap.forEach(doc => {
                crmCards.push({ id: doc.id, ...doc.data() });
            });
            renderCalendar(currentMonth, currentYear);
            renderCRMColumnsSelect();
            syncCrmClientsToDirectory();
        }, err => {
            console.error("Error subscribing to CRM: ", err);
        });
}

function loadUserClients() {
    if (!currentUser || !db) return;
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            if (cloudData.clients) {
                clientsList = cloudData.clients;
                localStorage.setItem('stahlgraf_data_v4', JSON.stringify({
                    ...JSON.parse(localStorage.getItem('stahlgraf_data_v4') || '{}'),
                    clients: clientsList
                }));
            }
        }
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    }).catch(e => {
        console.error("Error loading clients from Firestore: ", e);
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    });
}

function getCRMColumns() {
    const defaultCols = (appData.crmColumns || 'Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos')
        .split(',')
        .map(c => c.trim())
        .filter(c => c.length > 0);
        
    crmCards.forEach(card => {
        if (card.column && !defaultCols.includes(card.column)) {
            defaultCols.push(card.column);
        }
    });
    
    return defaultCols;
}

function renderCRMColumnsSelect() {
    const select = document.getElementById('card-column');
    if (!select) return;
    select.innerHTML = '';
    const cols = getCRMColumns();
    cols.forEach(col => {
        const opt = document.createElement('option');
        opt.value = col;
        opt.textContent = col;
        select.appendChild(opt);
    });
}

function renderCalendar(month, year) {
    const grid = document.getElementById('calendar-days');
    const title = document.getElementById('cal-month-title');
    if (!grid || !title) return;
    
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    title.innerText = `${monthNames[month]} ${year}`;
    grid.innerHTML = '';
    
    // First day of the month
    let firstDayIndex = new Date(year, month, 1).getDay();
    // Monday is 0, Sunday is 6
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Total days in previous month
    const prevTotalDays = new Date(year, month, 0).getDate();
    
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    // Render previous month's ending days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const d = prevTotalDays - i;
        const cellDate = new Date(year, month - 1, d);
        const cellDateStr = formatDateStr(cellDate);
        createCell(d, true, cellDateStr, grid);
    }
    
    // Render current month's days
    for (let d = 1; d <= totalDays; d++) {
        const cellDate = new Date(year, month, d);
        const isToday = (d === todayDay && month === todayMonth && year === todayYear);
        const cellDateStr = formatDateStr(cellDate);
        createCell(d, false, cellDateStr, grid, isToday);
    }
    
    // Render next month's starting days to fill 42 cells (6 rows of 7 days)
    const currentCells = firstDayIndex + totalDays;
    const extraCells = 42 - currentCells;
    for (let d = 1; d <= extraCells; d++) {
        const cellDate = new Date(year, month + 1, d);
        const cellDateStr = formatDateStr(cellDate);
        createCell(d, true, cellDateStr, grid);
    }
}

function formatDateStr(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getChipClass(column) {
    if (!column) return 'event-default';
    const normalized = column.toLowerCase().trim();
    if (normalized.includes('cotizado')) return 'event-cotizados';
    if (normalized.includes('vendido')) return 'event-vendidos';
    if (normalized.includes('pago') || normalized.includes('pendiente')) return 'event-pago-pendiente';
    if (normalized.includes('contacto') || normalized.includes('futuro')) return 'event-contacto-futuro';
    if (normalized.includes('perdido')) return 'event-perdidos';
    return 'event-default';
}

function createCell(dayNum, isOtherMonth, dateStr, container, isToday = false) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell';
    if (isOtherMonth) cell.classList.add('other-month');
    if (isToday) cell.classList.add('today-cell');
    
    cell.innerHTML = `
        <div class="day-header">
            <span class="day-number">${dayNum}</span>
        </div>
        <div class="day-events"></div>
    `;
    
    cell.addEventListener('click', (e) => {
        if (draggingCardId) return;
        openCardModal(null, dateStr);
    });

    // Drag and drop cell dropzone listeners
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        cell.classList.add('drag-over');
    });

    cell.addEventListener('dragleave', () => {
        cell.classList.remove('drag-over');
    });

    cell.addEventListener('drop', async (e) => {
        e.preventDefault();
        cell.classList.remove('drag-over');
        const cardId = e.dataTransfer.getData('text/plain') || draggingCardId;
        if (cardId) {
            await moveCardDate(cardId, dateStr);
        }
    });
    
    const dayEvents = crmCards.filter(c => c.date === dateStr);
    const eventsContainer = cell.querySelector('.day-events');
    
    dayEvents.forEach(event => {
        const chip = document.createElement('div');
        chip.className = `event-chip ${getChipClass(event.column)}`;
        chip.innerText = event.client;
        chip.title = `${event.client} (${event.column})`;
        chip.setAttribute('draggable', 'true');
        
        // Chip drag listeners
        chip.addEventListener('dragstart', (e) => {
            draggingCardId = event.id;
            chip.style.opacity = '0.5';
            e.dataTransfer.setData('text/plain', event.id);
        });

        chip.addEventListener('dragend', () => {
            chip.style.opacity = '1';
            setTimeout(() => {
                draggingCardId = null;
            }, 100);
        });

        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            openCardModal(event);
        });
        
        eventsContainer.appendChild(chip);
    });
    
    container.appendChild(cell);
}

async function moveCardDate(cardId, newDate) {
    if (!currentUser || !db) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card || card.date === newDate) return;
    
    // Optimistic UI update
    card.date = newDate;
    renderCalendar(currentMonth, currentYear);
    
    try {
        await db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId).update({
            date: newDate,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error("Error updating card date in Firebase: ", e);
        subscribeToCRM();
    }
}

function openCardModal(card = null, defaultDate = '') {
    const modal = document.getElementById('card-modal');
    if (!modal) return;
    
    modal.classList.add('active');
    renderCRMColumnsSelect();
    
    const commentsList = document.getElementById('card-comments-list');
    commentsList.innerHTML = '';
    document.getElementById('new-comment-text').value = '';
    
    const formContainer = document.getElementById('form-details-container');
    const formContent = document.getElementById('form-details-content');
    
    if (card) {
        document.getElementById('modal-card-title').innerText = 'Editar Registro CRM';
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
            
            const prefillBtn = document.getElementById('btn-prefill-quote');
            prefillBtn.onclick = () => {
                const prefillUrl = new URL(window.location.origin + '/cotizador.html');
                prefillUrl.searchParams.set('prefill', 'true');
                prefillUrl.searchParams.set('name', fd.clientName || card.client);
                prefillUrl.searchParams.set('phone', fd.clientPhone || card.phone || '');
                prefillUrl.searchParams.set('email', fd.clientEmail || card.email || '');
                prefillUrl.searchParams.set('address', fd.clientAddress || '');
                
                const constSize = fd.propertySizeConstruction || fd.propertySize || '';
                if (constSize && constSize !== '-') {
                    prefillUrl.searchParams.set('size', constSize);
                }
                
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
        document.getElementById('modal-card-title').innerText = 'Nuevo Registro CRM';
        document.getElementById('card-id').value = '';
        document.getElementById('card-client').value = '';
        document.getElementById('card-phone').value = '';
        document.getElementById('card-email').value = '';
        document.getElementById('card-column').selectedIndex = 0;
        document.getElementById('card-date').value = defaultDate;
        document.getElementById('card-desc').value = '';
        document.getElementById('btn-delete-card').style.display = 'none';
        
        formContainer.style.display = 'none';
        formContent.innerHTML = '';
        commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">Guarda la tarjeta para poder agregar comentarios.</p>';
    }
}

function closeCardModal() {
    const modal = document.getElementById('card-modal');
    if (modal) modal.classList.remove('active');
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
        
        // Auto-save client to directory
        saveClientToDirectorySilently(client, phone, email);

        closeCardModal();
    } catch (e) {
        console.error(e);
        alert("Error al guardar la tarjeta.");
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
            closeCardModal();
        } catch(e) {
            console.error(e);
            alert("Error al eliminar.");
        }
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
        const dateStr = now.toLocaleString();
        
        await db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                text: text,
                date: dateStr
            }),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        textInput.value = '';
        
        const commentsList = document.getElementById('card-comments-list');
        if (commentsList.innerHTML.includes('No hay comentarios aún')) commentsList.innerHTML = '';
        
        const cDiv = document.createElement('div');
        cDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        cDiv.style.paddingBottom = '5px';
        cDiv.style.marginBottom = '5px';
        cDiv.innerHTML = `<span style="font-size: 0.8rem; color: #aaa;">${dateStr}</span><p style="margin: 3px 0; font-size: 0.9rem; white-space: pre-wrap;">${text}</p>`;
        commentsList.appendChild(cDiv);
        commentsList.scrollTop = commentsList.scrollHeight;
    } catch(e) {
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
    
    if (currentUser && db) {
        db.collection('users').doc(currentUser.uid).set(appData, { merge: true })
            .catch(err => console.error("Error saving client directory from Hub CRM:", err));
    }
}

function syncCrmClientsToDirectory() {
    if (!currentUser || !db || !isUserConfigLoaded) return;
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
        
        db.collection('users').doc(currentUser.uid).set(appDataLocal, { merge: true })
            .then(() => {
                console.log("Client directory auto-synchronized with Hub CRM cards.");
            })
            .catch(err => console.error("Error auto-saving client directory from Hub CRM:", err));
    }
}
