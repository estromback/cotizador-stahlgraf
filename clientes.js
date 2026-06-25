(function() {
    const role = localStorage.getItem('stahlgraf_user_role') || 'guest';
    if (role !== 'admin') {
        alert("⚠️ Acceso denegado: Se requiere perfil de Administrador.");
        window.location.href = 'hub.html';
    }
})();

// clientes.js - Logic for Unified Client Directory with Cascading Deletions

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
let storage = null;
let currentUser = null;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.");
    }
} else if (firebase.apps.length) {
    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();
}

let appData = {
    clients: []
};

function loadData() {
    const saved = localStorage.getItem('stahlgraf_data_v4');
    if (saved) {
        try {
            appData = { ...appData, ...JSON.parse(saved) };
        } catch(e) {}
    }
}

function saveData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    if (currentUser && db) {
        db.collection('users').doc(currentUser.uid).set(appData, { merge: true })
            .catch(err => console.error("Error saving clients list to Firebase:", err));
    }
}

// Authentication
let userDocListener = null;
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        const syncText = document.getElementById('sync-text');
        const syncIcon = document.getElementById('sync-icon');
        
        if (user) {
            syncText.innerText = "Conectado";
            syncIcon.innerText = "🟢";
            syncFromFirebase();
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
            if (userDocListener) {
                userDocListener();
                userDocListener = null;
            }
        }
    });
}

function syncFromFirebase() {
    if (!currentUser || !db) return;
    if (userDocListener) userDocListener();
    userDocListener = db.collection('users').doc(currentUser.uid).onSnapshot(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            appData = { ...appData, ...cloudData };
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            renderClients();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderClients();

    // Check for URL parameters to auto-open history modal from CRM
    const urlParams = new URLSearchParams(window.location.search);
    const historialName = urlParams.get('historialName');
    if (historialName) {
        const norm = (str) => (str || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
        const targetNorm = norm(historialName);
        const client = appData.clients.find(c => c.name.toLowerCase() === historialName.toLowerCase() || norm(c.name) === targetNorm);
        if (client) {
            setTimeout(() => openHistoryModal(client.id), 300);
        }
    }

    // Event Listeners
    document.getElementById('client-search').addEventListener('input', renderClients);
    document.getElementById('btn-add-client').addEventListener('click', () => openModal());
    document.getElementById('btn-close-modal').addEventListener('click', closeModal);
    document.getElementById('btn-save-client').addEventListener('click', saveClient);
    document.getElementById('btn-export-emails').addEventListener('click', openEmailsModal);
    document.getElementById('btn-close-emails-modal').addEventListener('click', closeEmailsModal);
    document.getElementById('btn-copy-emails').addEventListener('click', copyEmailsToClipboard);

    // Client History Modal Event Listeners
    document.getElementById('btn-close-history-modal').addEventListener('click', closeHistoryModal);
    
    document.getElementById('role-toggle-checkbox').addEventListener('change', (e) => {
        const modal = document.getElementById('client-history-modal');
        if (e.target.checked) {
            modal.classList.add('role-client');
            // Redirect to summary tab if current active tab is admin-only
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && activeTab.classList.contains('admin-only')) {
                const summaryTab = document.querySelector('.tab-btn[data-tab="history-tab-summary"]');
                if (summaryTab) summaryTab.click();
            }
        } else {
            modal.classList.remove('role-client');
        }
    });

    document.getElementById('btn-save-service').addEventListener('click', saveRecordedService);
    if (document.getElementById('btn-cancel-edit-service')) {
        document.getElementById('btn-cancel-edit-service').addEventListener('click', () => {
            renderServicesTab();
        });
    }
    document.getElementById('btn-add-hist-comment').addEventListener('click', addHistoryCrmComment);

    // Tab buttons event listeners
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            const targetId = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            renderActiveHistoryTab();
        });
    });

    // Sync button logic
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
});

function renderClients() {
    const searchVal = document.getElementById('client-search').value.toLowerCase().trim();
    const container = document.getElementById('client-list-container');
    container.innerHTML = '';

    const list = appData.clients || [];
    document.getElementById('client-count').innerText = `${list.length} clientes en total`;

    const filtered = list.filter(c => 
        (c.name || '').toLowerCase().includes(searchVal) ||
        (c.address || '').toLowerCase().includes(searchVal) ||
        (c.phone || '').toLowerCase().includes(searchVal) ||
        (c.email || '').toLowerCase().includes(searchVal) ||
        (c.attention || '').toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px 0;">No se encontraron clientes.</p>';
        return;
    }

    // Sort alphabetically by name
    const sorted = [...filtered].sort((a,b) => (a.name || '').localeCompare(b.name || ''));

    sorted.forEach(c => {
        const div = document.createElement('div');
        div.className = 'client-card';
        div.innerHTML = `
            <div class="client-info">
                <h3>${c.name}</h3>
                <div class="info-row">
                    <span class="info-label">Contacto:</span>
                    <span>${c.attention || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Teléfono:</span>
                    <span>${c.phone || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span>${c.email || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Dirección:</span>
                    <span>${c.address || '-'}</span>
                </div>
            </div>
            <div class="client-actions">
                <button class="btn btn-secondary btn-sm" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; border-color: rgba(59, 130, 246, 0.3);" onclick="openHistoryModal('${c.id}')">🔎 Historial</button>
                <button class="btn btn-secondary btn-sm" onclick="openModal('${c.id}')">Editar</button>
                <button class="btn btn-secondary btn-sm" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border-color: rgba(231, 76, 60, 0.3);" onclick="deleteClientCascading('${c.id}')">Eliminar</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function openModal(id = null) {
    document.getElementById('client-modal').classList.add('active');
    if (id) {
        document.getElementById('modal-title').innerText = "Editar Cliente";
        const client = appData.clients.find(c => c.id === id);
        if (client) {
            document.getElementById('edit-client-id').value = client.id;
            document.getElementById('client-name').value = client.name || '';
            document.getElementById('client-attention').value = client.attention || '';
            document.getElementById('client-phone').value = client.phone || '';
            document.getElementById('client-email').value = client.email || '';
            document.getElementById('client-address').value = client.address || '';
        }
    } else {
        document.getElementById('modal-title').innerText = "Nuevo Cliente";
        document.getElementById('edit-client-id').value = '';
        document.getElementById('client-name').value = '';
        document.getElementById('client-attention').value = '';
        document.getElementById('client-phone').value = '';
        document.getElementById('client-email').value = '';
        document.getElementById('client-address').value = '';
    }
}

function closeModal() {
    document.getElementById('client-modal').classList.remove('active');
}

function saveClient() {
    const id = document.getElementById('edit-client-id').value;
    const name = document.getElementById('client-name').value.trim();
    const attention = document.getElementById('client-attention').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const address = document.getElementById('client-address').value.trim();

    if (!name || !phone || !address) {
        return alert("Por favor completa Nombre, Teléfono y Dirección.");
    }

    const payload = {
        id: id || 'cl_' + Date.now(),
        name, attention, phone, email, address
    };

    if (id) {
        const idx = appData.clients.findIndex(c => c.id === id);
        if (idx > -1) appData.clients[idx] = payload;
    } else {
        // Prevent duplicate names
        const exists = appData.clients.some(c => c.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            return alert("Ya existe un cliente con este nombre en tu directorio.");
        }
        appData.clients.push(payload);
    }

    saveData();
    renderClients();
    closeModal();
}

async function deleteClientCascading(id) {
    const client = appData.clients.find(c => c.id === id);
    if (!client) return;

    if (!confirm(`¿Estás seguro de eliminar a "${client.name}" del directorio de clientes?`)) return;

    let cascade = false;
    if (currentUser && db) {
        cascade = confirm(`¿Deseas también eliminar TODO el historial de "${client.name}" de la nube?\n\nSi confirmas, se borrarán de forma definitiva:\n- Sus cotizaciones en el Cotizador\n- Sus informes técnicos en el Informador\n- Sus tarjetas y notas de seguimiento en el CRM`);
    }

    if (cascade) {
        try {
            // Delete CRM cards
            const crmSnap = await db.collection('users').doc(currentUser.uid).collection('crm').where('client', '==', client.name).get();
            const crmBatch = db.batch();
            crmSnap.forEach(doc => crmBatch.delete(doc.ref));
            await crmBatch.commit();

            // Delete Quotes
            const quotesSnap = await db.collection('users').doc(currentUser.uid).collection('quotes').where('clientName', '==', client.name).get();
            if (storage) {
                const quoteDeletePromises = quotesSnap.docs.map(quoteDoc => {
                    return storage.ref().child(`users/${currentUser.uid}/quotes/${quoteDoc.id}.pdf`).delete()
                        .then(() => console.log(`Deleted quote PDF ${quoteDoc.id} from Storage.`))
                        .catch(err => console.log(`No Storage PDF to delete for quote ${quoteDoc.id}:`, err.message));
                });
                await Promise.all(quoteDeletePromises);
            }
            const quotesBatch = db.batch();
            quotesSnap.forEach(doc => quotesBatch.delete(doc.ref));
            await quotesBatch.commit();

            // Delete Reports
            const reportsSnap = await db.collection('users').doc(currentUser.uid).collection('reports').where('clientName', '==', client.name).get();
            if (storage) {
                const reportDeletePromises = reportsSnap.docs.map(reportDoc => {
                    return storage.ref().child(`users/${currentUser.uid}/reports/${reportDoc.id}.pdf`).delete()
                        .then(() => console.log(`Deleted report PDF ${reportDoc.id} from Storage.`))
                        .catch(err => console.log(`No Storage PDF to delete for report ${reportDoc.id}:`, err.message));
                });
                await Promise.all(reportDeletePromises);
            }
            const reportsBatch = db.batch();
            reportsSnap.forEach(doc => reportsBatch.delete(doc.ref));
            await reportsBatch.commit();

            // Delete Station Reports Sent (Cebado)
            const stationReportsSnap = await db.collection('users').doc(currentUser.uid).collection('station_reports_sent').where('clientName', '==', client.name).get();
            if (storage) {
                const stationReportDeletePromises = stationReportsSnap.docs.map(srDoc => {
                    return storage.ref().child(`users/${currentUser.uid}/station_reports/${srDoc.id}.pdf`).delete()
                        .then(() => console.log(`Deleted station report PDF ${srDoc.id} from Storage.`))
                        .catch(err => console.log(`No Storage PDF to delete for station report ${srDoc.id}:`, err.message));
                });
                await Promise.all(stationReportDeletePromises);
            }
            const stationReportsBatch = db.batch();
            stationReportsSnap.forEach(doc => stationReportsBatch.delete(doc.ref));
            await stationReportsBatch.commit();

            alert("✅ Todo el historial y registros del cliente han sido borrados de la nube exitosamente.");
        } catch(e) {
            console.error("Error committing deletions:", e);
            alert("Ocurrió un error al intentar eliminar los registros asociados de la nube.");
        }
    }

    // Always remove from client directory list
    appData.clients = appData.clients.filter(c => c.id !== id);
    
    // Remove station assignments linked to this client
    if (appData.stationAssignments) {
        appData.stationAssignments = appData.stationAssignments.filter(asg => asg.clientId !== id);
    }
    
    saveData();
    renderClients();
}

function openEmailsModal() {
    const modal = document.getElementById('emails-modal');
    const text = document.getElementById('emails-list-area');
    
    const emailList = (appData.clients || [])
        .map(c => (c.email || '').trim())
        .filter(e => e.length > 0);
        
    if (emailList.length === 0) {
        text.value = "No hay correos electrónicos registrados en tu directorio de clientes.";
    } else {
        text.value = emailList.join(', ');
    }
    
    modal.classList.add('active');
}

function closeEmailsModal() {
    document.getElementById('emails-modal').classList.remove('active');
}

function copyEmailsToClipboard() {
    const text = document.getElementById('emails-list-area').value;
    const btn = document.getElementById('btn-copy-emails');
    
    const emailCount = (appData.clients || []).filter(c => (c.email || '').trim()).length;
    if (emailCount === 0) {
        return alert("No hay correos para copiar.");
    }
    
    navigator.clipboard.writeText(text)
        .then(() => {
            const origText = btn.innerText;
            btn.innerText = "¡Copiado! ✓";
            btn.style.background = "#10b981"; // Success green accent
            setTimeout(() => {
                btn.innerText = origText;
                btn.style.background = ""; // Revert to primary
            }, 2000);
        })
        .catch(err => {
            console.error("Error copying to clipboard:", err);
            alert("Ocurrió un error al copiar al portapapeles. Por favor, cópialo manualmente.");
        });
}

// Map globally so onclick handlers work in HTML template strings
window.openModal = openModal;
window.deleteClientCascading = deleteClientCascading;
window.openEmailsModal = openEmailsModal;
window.closeEmailsModal = closeEmailsModal;
window.copyEmailsToClipboard = copyEmailsToClipboard;

// =========================================================================
// CLIENT CENTRAL HISTORY ("MASTER PANEL") LOGIC
// =========================================================================

// History Modal Variables
let historyMap = null;
let historyMapMarkerGroup = null;
let activeHistoryClientId = null;
let activeHistoryClientName = null;

let currentClientQuotes = [];
let currentClientReports = [];
let currentClientCrmCard = null;
let currentClientServices = [];
let currentClientInspections = [];
let currentClientReportsSent = [];

function openHistoryModal(clientId) {
    const modal = document.getElementById('client-history-modal');
    const client = appData.clients.find(c => c.id === clientId);
    if (!client) return alert("Cliente no encontrado.");
    
    activeHistoryClientId = clientId;
    activeHistoryClientName = client.name;
    
    // Fill client info
    document.getElementById('hist-client-attention').innerText = client.attention || '-';
    document.getElementById('hist-client-phone').innerText = client.phone || '-';
    document.getElementById('hist-client-email').innerText = client.email || '-';
    document.getElementById('hist-client-address').innerText = client.address || '-';
    document.getElementById('history-modal-title').innerText = `Historial Central: ${client.name}`;
    
    // Default Role: Admin
    document.getElementById('role-toggle-checkbox').checked = false;
    modal.classList.remove('role-client');
    
    // Set default active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="history-tab-summary"]').classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById('history-tab-summary').classList.add('active');
    
    modal.classList.add('active');
    
    loadClientHistoryFromFirebaseAndLocal(clientId, client.name);
}

function closeHistoryModal() {
    document.getElementById('client-history-modal').classList.remove('active');
}

function isStationAssignedToClient(stationName, clientId, clientName) {
    const assignments = appData.stationAssignments || [];
    const match = stationName.match(/ESTACION-(\d+)/i);
    if (!match) return false;
    const num = parseInt(match[1], 10);
    return assignments.some(asg => 
        (asg.clientId === clientId || asg.clientName === clientName) &&
        num >= parseInt(asg.start, 10) &&
        num <= parseInt(asg.end, 10)
    );
}

async function loadClientHistoryFromFirebaseAndLocal(clientId, clientName) {
    document.getElementById('history-modal-subtitle').innerText = "Cargando registros...";
    
    currentClientQuotes = [];
    currentClientReports = [];
    currentClientCrmCard = null;
    currentClientServices = [];
    currentClientInspections = [];
    currentClientReportsSent = [];
    
    // Load local cache fallbacks
    const localServices = appData.services || [];
    currentClientServices = localServices.filter(s => s.clientId === clientId || s.clientName === clientName);
    
    const localReportsSent = appData.reportsSent || [];
    currentClientReportsSent = localReportsSent.filter(rs => rs.clientId === clientId || rs.clientName === clientName);
    
    if (currentUser && db) {
        try {
            // Parallel fetches
            const [quotesSnap, reportsSnap, crmSnap, servicesSnap, reportsSentSnap, inspectionsSnap] = await Promise.all([
                db.collection('users').doc(currentUser.uid).collection('quotes').where('clientName', '==', clientName).get(),
                db.collection('users').doc(currentUser.uid).collection('reports').where('clientName', '==', clientName).get(),
                db.collection('users').doc(currentUser.uid).collection('crm').get(),
                db.collection('users').doc(currentUser.uid).collection('services').where('clientName', '==', clientName).get(),
                db.collection('users').doc(currentUser.uid).collection('station_reports_sent').where('clientName', '==', clientName).get(),
                db.collection('users').doc(currentUser.uid).collection('inspecciones').get()
            ]);
            
            quotesSnap.forEach(doc => currentClientQuotes.push({ id: doc.id, ...doc.data() }));
            reportsSnap.forEach(doc => currentClientReports.push({ id: doc.id, ...doc.data() }));
            
            const clientObj = appData.clients.find(c => c.id === clientId);
            const clientPhone = clientObj ? clientObj.phone : '';
            const clientEmail = clientObj ? clientObj.email : '';

            // Fuzzy match the CRM card from all cards
            const allCrmCards = [];
            crmSnap.forEach(doc => allCrmCards.push({ id: doc.id, ...doc.data() }));
            
            const normalize = (str) => (str || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
            const cleanPhone = (p) => (p || '').replace(/\D/g, '');
            const cleanEmail = (e) => (e || '').toLowerCase().trim();
            
            const targetNormName = normalize(clientName);
            const targetCleanPhone = cleanPhone(clientPhone);
            const targetCleanEmail = cleanEmail(clientEmail);
            
            let matchedCard = allCrmCards.find(card => normalize(card.client) === targetNormName);
            if (!matchedCard && targetCleanPhone) {
                matchedCard = allCrmCards.find(card => cleanPhone(card.phone) && cleanPhone(card.phone) === targetCleanPhone);
            }
            if (!matchedCard && targetCleanEmail) {
                matchedCard = allCrmCards.find(card => cleanEmail(card.email) && cleanEmail(card.email) === targetCleanEmail);
            }
            
            if (matchedCard) {
                currentClientCrmCard = matchedCard;
            }
            
            servicesSnap.forEach(doc => {
                const data = doc.data();
                if (!currentClientServices.some(s => s.id === doc.id)) {
                    currentClientServices.push({ id: doc.id, ...data });
                }
            });
            
            reportsSentSnap.forEach(doc => {
                const data = doc.data();
                if (!currentClientReportsSent.some(r => r.id === doc.id)) {
                    currentClientReportsSent.push({ id: doc.id, ...data });
                }
            });
            
            inspectionsSnap.forEach(doc => {
                const data = doc.data();
                if (data.station && isStationAssignedToClient(data.station, clientId, clientName)) {
                    currentClientInspections.push({ id: doc.id, ...data });
                }
            });
            
            // Sync local cache
            if (!appData.services) appData.services = [];
            currentClientServices.forEach(cs => {
                if (!appData.services.some(s => s.id === cs.id)) {
                    appData.services.push(cs);
                }
            });
            
            if (!appData.reportsSent) appData.reportsSent = [];
            currentClientReportsSent.forEach(crs => {
                if (!appData.reportsSent.some(r => r.id === crs.id)) {
                    appData.reportsSent.push(crs);
                }
            });
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            
        } catch(e) {
            console.error("Error loading client history from Firestore:", e);
        }
    }
    
    document.getElementById('history-modal-subtitle').innerText = "Historial operativo listo";
    renderActiveHistoryTab();
}

function renderActiveHistoryTab() {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (!activeBtn) return;
    const targetId = activeBtn.getAttribute('data-tab');
    
    if (targetId === 'history-tab-summary') {
        renderSummaryTab();
    } else if (targetId === 'history-tab-services') {
        renderServicesTab();
    } else if (targetId === 'history-tab-quotes') {
        renderQuotesTab();
    } else if (targetId === 'history-tab-reports') {
        renderReportsTab();
    } else if (targetId === 'history-tab-crm') {
        renderCrmTab();
    }
}

function initHistoryMap(clientId, clientName) {
    if (typeof L === 'undefined') return;
    
    if (!historyMap) {
        historyMap = L.map('history-map', {
            zoomControl: true,
            scrollWheelZoom: false
        });
        
        L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy; Google',
            maxZoom: 19,
            crossOrigin: true
        }).addTo(historyMap);
        
        historyMapMarkerGroup = L.layerGroup().addTo(historyMap);
    } else {
        historyMapMarkerGroup.clearLayers();
    }
    
    const assignments = appData.stationAssignments || [];
    const clientAsgs = assignments.filter(asg => asg.clientId === clientId || asg.clientName === clientName);
    
    const localInspections = JSON.parse(localStorage.getItem('stahlgraf_qr_inspecciones') || '[]');
    const allInspections = [...currentClientInspections];
    
    localInspections.forEach(li => {
        if (!allInspections.some(fi => fi.id === li.id)) {
            allInspections.push(li);
        }
    });
    
    const assignedStationsData = [];
    let activeAlerts = 0;
    let latestInspDate = null;
    
    clientAsgs.forEach(asg => {
        const start = parseInt(asg.start, 10);
        const end = parseInt(asg.end, 10);
        for (let i = start; i <= end; i++) {
            const stationKey = `ESTACION-${String(i).padStart(2, '0')}`;
            const stationInsps = allInspections
                .filter(ins => ins.station === stationKey)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                
            const latest = stationInsps[0];
            let coords = null;
            let consumption = 'No inspeccionada';
            let timestamp = '-';
            let alertActive = false;
            
            const withCoords = stationInsps.find(ins => ins.coords && ins.coords.lat && ins.coords.lng);
            if (withCoords) coords = withCoords.coords;
            
            if (latest) {
                consumption = latest.consumption || '0%';
                timestamp = latest.timestamp || '-';
                const highConsumption = ['50-75%', '75%', '100%', '75-100%'].includes(consumption);
                const hasEvidence = latest.evidence && latest.evidence.length > 0 && !latest.evidence.includes('Ninguna');
                alertActive = highConsumption || hasEvidence;
                if (alertActive) activeAlerts++;
                
                if (!latestInspDate || new Date(latest.timestamp) > new Date(latestInspDate)) {
                    latestInspDate = latest.timestamp;
                }
            }
            
            assignedStationsData.push({
                num: i,
                key: stationKey,
                coords: coords,
                consumption: consumption,
                timestamp: timestamp,
                alertActive: alertActive
            });
        }
    });
    
    // Update summary labels
    document.getElementById('hist-stat-stations').innerText = assignedStationsData.length;
    document.getElementById('hist-stat-alerts').innerText = activeAlerts;
    document.getElementById('hist-stat-last-date').innerText = latestInspDate ? latestInspDate.split(' ')[0] : '-';
    
    const markerCoords = [];
    assignedStationsData.forEach(st => {
        if (st.coords && st.coords.lat && st.coords.lng) {
            const lat = parseFloat(st.coords.lat);
            const lng = parseFloat(st.coords.lng);
            markerCoords.push([lat, lng]);
            
            let color = '#10b981'; // Green
            if (st.alertActive) color = '#ef4444'; // Red
            else if (st.consumption !== '0%' && st.consumption !== 'No inspeccionada') color = '#fbbf24'; // Yellow
            
            const labelIcon = L.divIcon({
                className: 'custom-station-icon',
                html: `<div style="background: ${color}; color: #fff; font-weight: bold; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; border: 2px solid rgba(255,255,255,0.8); box-shadow: 0 2px 5px rgba(0,0,0,0.5);">${String(st.num).padStart(2, '0')}</div>`,
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
            
            const marker = L.marker([lat, lng], { icon: labelIcon });
            
            const popupContent = `
                <div style="color: #333; font-family: sans-serif; font-size: 0.85rem; line-height: 1.4;">
                    <h4 style="margin: 0 0 5px 0; font-size: 0.95rem; border-bottom: 1px solid #ddd; padding-bottom: 4px;">Estación #${String(st.num).padStart(2, '0')}</h4>
                    <p style="margin: 3px 0;"><strong>Consumo:</strong> ${st.consumption}</p>
                    <p style="margin: 3px 0;"><strong>Última Insp:</strong> ${st.timestamp}</p>
                    <p style="margin: 3px 0; font-size: 0.75rem; color: #666;">Coords: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
                </div>
            `;
            marker.bindPopup(popupContent);
            historyMapMarkerGroup.addLayer(marker);
        }
    });
    
    if (markerCoords.length > 0) {
        historyMap.fitBounds(markerCoords, {
            padding: [40, 40],
            maxZoom: 19
        });
    } else {
        historyMap.setView([-37.4612, -72.3514], 14);
    }
    
    setTimeout(() => {
        if (historyMap) historyMap.invalidateSize();
    }, 100);
}

function renderSummaryTab() {
    initHistoryMap(activeHistoryClientId, activeHistoryClientName);
    
    const tbody = document.getElementById('hist-reports-sent-list');
    tbody.innerHTML = '';
    
    const sorted = [...currentClientReportsSent].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#666; padding:10px;">No hay registros de envíos.</td></tr>`;
        return;
    }
    
    sorted.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.date || '-'}</td>
            <td>${r.emails || '-'}</td>
            <td>${r.notes || '-'}</td>
            <td>${r.pdfUrl ? `<a href="#" onclick="viewPDF('${r.pdfUrl}', 'Reporte_Monitoreo_${r.id}.pdf'); return false;" class="btn btn-sm" style="padding: 3px 6px; font-size:0.75rem; background-color: #3b82f6; color: white; border: none; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap;">📥 PDF</a>` : '<span style="color:#666; font-size:0.75rem;">No disponible</span>'}</td>
            <td class="admin-only">
                <button class="btn btn-secondary btn-sm" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border-color: rgba(231, 76, 60, 0.3); padding: 3px 6px; font-size:0.75rem;" onclick="deleteReportSent('${r.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderServicesTab() {
    const tbody = document.getElementById('hist-services-list');
    tbody.innerHTML = '';
    
    document.getElementById('service-id').value = '';
    document.getElementById('service-price').value = '';
    document.getElementById('service-technician').value = '';
    document.getElementById('service-notes').value = '';
    document.getElementById('service-coverage').value = '';
    document.getElementById('service-exterior-zones').value = 'none';
    document.getElementById('service-area').value = '';
    document.getElementById('service-chemical').value = '';
    
    const formTitle = document.getElementById('service-form-title');
    if (formTitle) formTitle.innerText = "Registrar Servicio Realizado";
    const saveBtn = document.getElementById('btn-save-service');
    if (saveBtn) saveBtn.innerText = "Guardar Servicio";
    const cancelBtn = document.getElementById('btn-cancel-edit-service');
    if (cancelBtn) cancelBtn.style.display = 'none';
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('service-date').value = today;
    
    const sorted = [...currentClientServices].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#666; padding:15px;">No hay servicios registrados para este cliente.</td></tr>`;
        return;
    }
    
    sorted.forEach(s => {
        const tr = document.createElement('tr');
        
        let detailsHtml = s.notes || '-';
        if (s.coverage || s.area || s.chemical || (s.exteriorZones && s.exteriorZones !== 'none')) {
            detailsHtml += '<div style="font-size:0.8rem; color:#aaa; margin-top:5px; border-top:1px dashed rgba(255,255,255,0.1); padding-top:4px; line-height: 1.4;">';
            let parts = [];
            if (s.coverage) {
                const covMap = { 'both': 'Int. y Ext.', 'inside': 'Solo Int.', 'outside': 'Solo Ext.' };
                let covStr = `📍 <strong>CoB:</strong> ${covMap[s.coverage] || s.coverage}`;
                if (s.coverage !== 'inside' && s.exteriorZones && s.exteriorZones !== 'none') {
                    const extMap = { 'perimeter': 'Perímetro', 'full': 'Patio Completo' };
                    covStr += ` (${extMap[s.exteriorZones] || s.exteriorZones})`;
                }
                parts.push(covStr);
            }
            if (s.area) {
                parts.push(`📐 <strong>Área:</strong> ${s.area} m²`);
            }
            if (s.chemical) {
                parts.push(`🧪 <strong>Prod:</strong> ${s.chemical}`);
            }
            detailsHtml += parts.join(' | ');
            detailsHtml += '</div>';
        }
        
        tr.innerHTML = `
            <td>${s.date || '-'}</td>
            <td><span class="pill-badge pill-badge-primary">${s.type || '-'}</span></td>
            <td>${s.technician || '-'}</td>
            <td>${detailsHtml}</td>
            <td class="price-column"><strong>$${s.price ? parseInt(s.price).toLocaleString('es-CL') : '0'}</strong></td>
            <td class="admin-only" style="white-space: nowrap;">
                <button class="btn btn-secondary btn-sm" style="background: rgba(52, 152, 219, 0.2); color: #3498db; border-color: rgba(52, 152, 219, 0.3); padding: 3px 6px; font-size:0.75rem; margin-right: 5px;" onclick="editRecordedService('${s.id}')">Editar</button>
                <button class="btn btn-secondary btn-sm" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border-color: rgba(231, 76, 60, 0.3); padding: 3px 6px; font-size:0.75rem;" onclick="deleteRecordedService('${s.id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderQuotesTab() {
    const tbody = document.getElementById('hist-quotes-list');
    tbody.innerHTML = '';
    
    const sorted = [...currentClientQuotes].sort((a,b) => {
        const timeA = a.timestamp ? (a.timestamp.seconds ? a.timestamp.seconds * 1000 : new Date(a.timestamp).getTime()) : 0;
        const timeB = b.timestamp ? (b.timestamp.seconds ? b.timestamp.seconds * 1000 : new Date(b.timestamp).getTime()) : 0;
        return timeB - timeA;
    });
    
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#666; padding:15px;">No hay cotizaciones registradas para este cliente en el sistema.</td></tr>`;
        return;
    }
    
    sorted.forEach(q => {
        let badgeClass = 'pill-badge-secondary';
        let status = q.status || 'Borrador';
        if (status.toLowerCase().includes('aprob') || status.toLowerCase().includes('vend')) badgeClass = 'pill-badge-success';
        else if (status.toLowerCase().includes('pend') || status.toLowerCase().includes('envi')) badgeClass = 'pill-badge-warning';
        else if (status.toLowerCase().includes('perd')) badgeClass = 'pill-badge-danger';
        
        // Dynamic human-friendly services summary
        let services = [];
        if (q['coverage-type'] && q['coverage-type'] !== 'no') {
            let cov = q['coverage-type'];
            let covStr = cov === 'both' ? 'Int. y Ext.' : (cov === 'inside' ? 'Interior' : 'Exterior');
            services.push(`Fumigación (${covStr})`);
        }
        if (q['rodent-control'] === 'yes') {
            services.push('Control de Roedores');
        }
        if (q['moth-control'] === 'yes') {
            services.push('Control de Polillas');
        }
        if (q['sanitization-control'] === 'yes') {
            services.push('Sanitización');
        }
        if (q.generalServices && q.generalServices.length > 0) {
            q.generalServices.forEach(gs => {
                services.push(gs.name);
            });
        }
        
        let details = services.join(', ') || q.items || 'Servicios Generales';
        
        // Safe date formatting
        let dateStr = '-';
        if (q.timestamp) {
            try {
                if (q.timestamp.toDate) {
                    dateStr = q.timestamp.toDate().toLocaleDateString('es-CL');
                } else if (q.timestamp.seconds) {
                    dateStr = new Date(q.timestamp.seconds * 1000).toLocaleDateString('es-CL');
                } else {
                    dateStr = new Date(q.timestamp).toLocaleDateString('es-CL');
                }
            } catch(e) {
                dateStr = q.date || q.quoteDate || '-';
            }
        } else {
            dateStr = q.date || q.quoteDate || '-';
        }
        if (dateStr === 'Invalid Date') dateStr = q.date || q.quoteDate || '-';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dateStr}</td>
            <td><strong>#${q.correlative || '?'}</strong></td>
            <td>${details}</td>
            <td class="price-column"><strong>${q.totalStr || '-'}</strong></td>
            <td><span class="pill-badge ${badgeClass}">${status}</span></td>
            <td>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <a href="cotizador.html?id=${q.id}" class="btn btn-secondary btn-sm" style="padding: 3px 6px; font-size:0.75rem; white-space: nowrap;">Ver Cotizador</a>
                    ${q.pdfUrl ? `<a href="#" onclick="viewPDF('${q.pdfUrl}', 'Cotizacion_${q.correlative || q.id}.pdf'); return false;" class="btn btn-sm" style="padding: 3px 6px; font-size:0.75rem; background-color: #3b82f6; color: white; border: none; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap;">📥 PDF Original</a>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderReportsTab() {
    const tbody = document.getElementById('hist-reports-list');
    tbody.innerHTML = '';
    
    const sorted = [...currentClientReports].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#666; padding:15px;">No hay informes técnicos registrados para este cliente.</td></tr>`;
        return;
    }
    
    sorted.forEach(r => {
        const pests = (r.pestsDetected || []).join(', ') || 'No especificadas';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.date || '-'}</td>
            <td><code>${r.id}</code></td>
            <td>${r.technicianName || '-'}</td>
            <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <strong>Plagas:</strong> ${pests}<br>
                <span style="font-size:0.8rem; color:#aaa;">${r.recommendations || ''}</span>
            </td>
            <td>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <a href="informador.html?id=${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 6px; font-size:0.75rem; white-space: nowrap;">Ver Informe</a>
                    ${r.pdfUrl ? `<a href="#" onclick="viewPDF('${r.pdfUrl}', 'Informe_${r.id}.pdf'); return false;" class="btn btn-sm" style="padding: 3px 6px; font-size:0.75rem; background-color: #3b82f6; color: white; border: none; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap;">📥 PDF Original</a>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderCrmTab() {
    const stageLabel = document.getElementById('hist-crm-stage');
    const commentsList = document.getElementById('hist-crm-comments-list');
    commentsList.innerHTML = '';
    
    if (currentClientCrmCard) {
        stageLabel.innerText = currentClientCrmCard.column || 'Contacto';
        stageLabel.className = 'pill-badge pill-badge-primary';
        
        const comments = currentClientCrmCard.comments || [];
        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">No hay notas ni comentarios de CRM.</p>';
        } else {
            comments.forEach((c, index) => {
                const cDiv = document.createElement('div');
                cDiv.className = 'comment-item';
                cDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                cDiv.style.paddingBottom = '8px';
                cDiv.style.marginBottom = '8px';
                cDiv.style.display = 'flex';
                cDiv.style.justifyContent = 'space-between';
                cDiv.style.alignItems = 'flex-start';
                cDiv.style.gap = '10px';

                cDiv.innerHTML = `
                    <div class="comment-content-view" style="flex: 1;">
                        <div class="comment-header" style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #aaa; margin-bottom: 2px;">
                            <span style="font-weight: 600; color: #e2e8f0;">Nota Interna CRM</span>
                            <span>${c.date || '-'}</span>
                        </div>
                        <p style="margin: 3px 0 0 0; font-size: 0.85rem; color: #ccc; white-space: pre-wrap;">${c.text || ''}</p>
                    </div>
                    <div class="comment-actions admin-only" style="display: flex; gap: 8px; font-size: 0.78rem; align-items: center; padding-top: 2px;">
                        <a href="#" class="edit-comment-link" style="color: #60a5fa; text-decoration: none; font-weight: 500;">Editar</a>
                        <span style="color: rgba(255,255,255,0.2);">|</span>
                        <a href="#" class="delete-comment-link" style="color: #f87171; text-decoration: none; font-weight: 500;">Borrar</a>
                    </div>
                `;

                const editLink = cDiv.querySelector('.edit-comment-link');
                const deleteLink = cDiv.querySelector('.delete-comment-link');

                editLink.onclick = (e) => {
                    e.preventDefault();
                    cDiv.innerHTML = `
                        <div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
                            <span style="font-size: 0.78rem; color: #aaa;">Editando nota de CRM (${c.date})</span>
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
                        renderCrmTab();
                    };

                    cDiv.querySelector('.save-edit-btn').onclick = async (ev) => {
                        ev.preventDefault();
                        const newText = textarea.value.trim();
                        if (!newText) return;
                        
                        await updateHistoryCrmComment(currentClientCrmCard.id, index, newText);
                        currentClientCrmCard.comments[index].text = newText;
                        renderCrmTab();
                    };
                };

                deleteLink.onclick = async (e) => {
                    e.preventDefault();
                    if (confirm("¿Seguro que deseas eliminar esta nota de CRM?")) {
                        await deleteHistoryCrmComment(currentClientCrmCard.id, index);
                        currentClientCrmCard.comments.splice(index, 1);
                        renderCrmTab();
                    }
                };

                commentsList.appendChild(cDiv);
            });
            commentsList.scrollTop = commentsList.scrollHeight;
        }
    } else {
        stageLabel.innerText = 'Sin Tarjeta CRM';
        stageLabel.className = 'pill-badge pill-badge-secondary';
        commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">Este cliente no tiene una tarjeta en el tablero CRM.</p>';
    }
}

async function updateHistoryCrmComment(cardId, index, newText) {
    if (!currentUser || !db) return;
    try {
        const docRef = db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId);
        const updatedComments = [...currentClientCrmCard.comments];
        updatedComments[index].text = newText;

        await docRef.update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error(e);
        alert("Error al actualizar el comentario.");
    }
}

async function deleteHistoryCrmComment(cardId, index) {
    if (!currentUser || !db) return;
    try {
        const docRef = db.collection('users').doc(currentUser.uid).collection('crm').doc(cardId);
        const updatedComments = [...currentClientCrmCard.comments];
        updatedComments.splice(index, 1);

        await docRef.update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error(e);
        alert("Error al eliminar el comentario.");
    }
}

async function addHistoryCrmComment() {
    if (!currentUser) return alert("Debes iniciar sesión para agregar comentarios en la nube.");
    if (!currentClientCrmCard) {
        return alert("Este cliente no tiene una tarjeta CRM creada. Ve a la sección CRM para crearla primero.");
    }
    
    const textInput = document.getElementById('hist-crm-new-comment');
    const text = textInput.value.trim();
    if (!text) return;
    
    const btn = document.getElementById('btn-add-hist-comment');
    btn.disabled = true;
    
    try {
        const now = new Date();
        const dateStr = now.toLocaleString();
        
        await db.collection('users').doc(currentUser.uid).collection('crm').doc(currentClientCrmCard.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                text: text,
                date: dateStr
            }),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        textInput.value = '';
        
        if (!currentClientCrmCard.comments) currentClientCrmCard.comments = [];
        currentClientCrmCard.comments.push({ text: text, date: dateStr });
        renderCrmTab();
        
    } catch(e) {
        console.error("Error adding comment in central history modal:", e);
        alert("Ocurrió un error al guardar el comentario.");
    } finally {
        btn.disabled = false;
    }
}

async function saveRecordedService() {
    const serviceId = document.getElementById('service-id').value;
    const type = document.getElementById('service-type').value;
    const date = document.getElementById('service-date').value;
    const priceVal = parseFloat(document.getElementById('service-price').value) || 0;
    const technician = document.getElementById('service-technician').value.trim();
    const notes = document.getElementById('service-notes').value.trim();
    
    const coverage = document.getElementById('service-coverage').value;
    const exteriorZones = document.getElementById('service-exterior-zones').value;
    const area = parseInt(document.getElementById('service-area').value) || 0;
    const chemical = document.getElementById('service-chemical').value.trim();
    
    if (!date) {
        return alert("Por favor selecciona la fecha del servicio.");
    }
    
    let isEdit = !!serviceId;
    let finalId = serviceId || ('srv_' + Date.now());
    
    const servicePayload = {
        id: finalId,
        clientId: activeHistoryClientId,
        clientName: activeHistoryClientName,
        type,
        date,
        price: priceVal,
        technician: technician || 'No asignado',
        notes: notes || '-'
    };
    
    // Add technical details to payload if present
    if (coverage) servicePayload.coverage = coverage;
    if (exteriorZones) servicePayload.exteriorZones = exteriorZones;
    if (area) servicePayload.area = area;
    if (chemical) servicePayload.chemical = chemical;
    
    const btn = document.getElementById('btn-save-service');
    btn.disabled = true;
    btn.innerText = "Guardando...";
    
    try {
        if (!appData.services) appData.services = [];
        
        if (isEdit) {
            // Update in appData.services
            const index = appData.services.findIndex(s => s.id === finalId);
            if (index >= 0) {
                appData.services[index] = servicePayload;
            } else {
                appData.services.push(servicePayload);
            }
            
            // Update in currentClientServices
            const localIndex = currentClientServices.findIndex(s => s.id === finalId);
            if (localIndex >= 0) {
                currentClientServices[localIndex] = servicePayload;
            } else {
                currentClientServices.push(servicePayload);
            }
        } else {
            appData.services.push(servicePayload);
            currentClientServices.push(servicePayload);
        }
        
        localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        
        if (currentUser && db) {
            await db.collection('users').doc(currentUser.uid).collection('services').doc(servicePayload.id).set(servicePayload);
        }
        
        renderServicesTab();
        
        alert(isEdit ? "✅ Servicio actualizado exitosamente." : "✅ Servicio registrado exitosamente.");
    } catch(e) {
        console.error("Error saving service:", e);
        alert("Ocurrió un error al guardar el servicio.");
    } finally {
        btn.disabled = false;
        if (!isEdit) {
            btn.innerText = "Guardar Servicio";
        } else {
            btn.innerText = "💾 Guardar Cambios";
        }
    }
}

window.editRecordedService = function(id) {
    const s = currentClientServices.find(srv => srv.id === id);
    if (!s) return;
    
    document.getElementById('service-id').value = s.id;
    document.getElementById('service-type').value = s.type || 'Fumigación';
    document.getElementById('service-date').value = s.date || '';
    document.getElementById('service-price').value = s.price !== undefined ? s.price : '';
    document.getElementById('service-technician').value = s.technician || '';
    document.getElementById('service-notes').value = s.notes || '';
    
    document.getElementById('service-coverage').value = s.coverage || '';
    document.getElementById('service-exterior-zones').value = s.exteriorZones || 'none';
    document.getElementById('service-area').value = s.area || '';
    document.getElementById('service-chemical').value = s.chemical || '';
    
    const formTitle = document.getElementById('service-form-title');
    if (formTitle) formTitle.innerText = "✏️ Editar Servicio Realizado";
    const saveBtn = document.getElementById('btn-save-service');
    if (saveBtn) saveBtn.innerText = "💾 Guardar Cambios";
    const cancelBtn = document.getElementById('btn-cancel-edit-service');
    if (cancelBtn) cancelBtn.style.display = 'inline-block';
    
    const formTitleEl = document.getElementById('service-form-title');
    if (formTitleEl) formTitleEl.scrollIntoView({ behavior: 'smooth' });
};

async function deleteRecordedService(serviceId) {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro de servicio de forma permanente?")) return;
    
    try {
        if (appData.services) {
            appData.services = appData.services.filter(s => s.id !== serviceId);
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        }
        
        if (currentUser && db) {
            await db.collection('users').doc(currentUser.uid).collection('services').doc(serviceId).delete();
        }
        
        currentClientServices = currentClientServices.filter(s => s.id !== serviceId);
        renderServicesTab();
        
        alert("🗑️ Servicio eliminado correctamente.");
    } catch(e) {
        console.error("Error deleting service:", e);
        alert("Error al eliminar el registro.");
    }
}



async function deleteReportSent(reportSentId) {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro de envío?")) return;
    
    try {
        if (appData.reportsSent) {
            appData.reportsSent = appData.reportsSent.filter(r => r.id !== reportSentId);
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        }
        
        if (currentUser && db) {
            if (storage) {
                try {
                    await storage.ref().child(`users/${currentUser.uid}/station_reports/${reportSentId}.pdf`).delete();
                    console.log("Deleted station report PDF from Firebase Storage.");
                } catch (storageErr) {
                    console.log("No Storage PDF to delete or already removed:", storageErr.message);
                }
            }
            await db.collection('users').doc(currentUser.uid).collection('station_reports_sent').doc(reportSentId).delete();
        }
        
        currentClientReportsSent = currentClientReportsSent.filter(r => r.id !== reportSentId);
        renderSummaryTab();
        
        alert("🗑️ Registro de envío eliminado.");
    } catch(e) {
        console.error("Error deleting sent report:", e);
        alert("Error al eliminar.");
    }
}

// Map globally so onclick handlers work in HTML template strings
window.openModal = openModal;
window.deleteClientCascading = deleteClientCascading;
window.openEmailsModal = openEmailsModal;
window.closeEmailsModal = closeEmailsModal;
window.copyEmailsToClipboard = copyEmailsToClipboard;
window.openHistoryModal = openHistoryModal;
window.closeHistoryModal = closeHistoryModal;
window.deleteRecordedService = deleteRecordedService;
window.deleteReportSent = deleteReportSent;

window.viewPDF = function(pdfData, filename) {
    if (pdfData.startsWith('data:application/pdf;base64,')) {
        try {
            const base64Parts = pdfData.split(';base64,');
            const byteCharacters = atob(base64Parts[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(blob);
            
            const newTab = window.open();
            if (newTab) {
                newTab.document.write(`<iframe src="${fileURL}" style="width:100%; height:100%; border:none;"></iframe>`);
            } else {
                const a = document.createElement('a');
                a.href = fileURL;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } catch (err) {
            console.error("Error displaying base64 PDF:", err);
            alert("No se pudo abrir el PDF original.");
        }
    } else {
        window.open(pdfData, '_blank');
    }
};
