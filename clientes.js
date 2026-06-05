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
        }
    });
}

function syncFromFirebase() {
    if (!currentUser || !db) return;
    db.collection('users').doc(currentUser.uid).get().then(doc => {
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
        } else {
            modal.classList.remove('role-client');
        }
    });

    document.getElementById('btn-save-service').addEventListener('click', saveRecordedService);
    document.getElementById('btn-save-report-sent').addEventListener('click', saveReportSent);
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
            const quotesBatch = db.batch();
            quotesSnap.forEach(doc => quotesBatch.delete(doc.ref));
            await quotesBatch.commit();

            // Delete Reports
            const reportsSnap = await db.collection('users').doc(currentUser.uid).collection('reports').where('clientName', '==', client.name).get();
            const reportsBatch = db.batch();
            reportsSnap.forEach(doc => reportsBatch.delete(doc.ref));
            await reportsBatch.commit();

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
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#666; padding:10px;">No hay registros de envíos.</td></tr>`;
        return;
    }
    
    sorted.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.date || '-'}</td>
            <td>${r.emails || '-'}</td>
            <td>${r.notes || '-'}</td>
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
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('service-date').value = today;
    
    const sorted = [...currentClientServices].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#666; padding:15px;">No hay servicios registrados para este cliente.</td></tr>`;
        return;
    }
    
    sorted.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.date || '-'}</td>
            <td><span class="pill-badge pill-badge-primary">${s.type || '-'}</span></td>
            <td>${s.technician || '-'}</td>
            <td>${s.notes || '-'}</td>
            <td class="price-column"><strong>$${s.price ? parseInt(s.price).toLocaleString('es-CL') : '0'}</strong></td>
            <td class="admin-only">
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
        const dateA = a.date || a.quoteDate || '';
        const dateB = b.date || b.quoteDate || '';
        return dateB.localeCompare(dateA);
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
        
        let details = '';
        if (q.generalServices && q.generalServices.length > 0) {
            details = q.generalServices.map(gs => gs.name).join(', ');
        } else if (q.items) {
            details = typeof q.items === 'string' ? q.items : 'Servicios de control de plagas';
        } else {
            details = 'Servicios generales';
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${q.date || q.quoteDate || '-'}</td>
            <td><code>${q.id}</code></td>
            <td>${details}</td>
            <td class="price-column"><strong>${q.totalStr || '-'}</strong></td>
            <td><span class="pill-badge ${badgeClass}">${status}</span></td>
            <td>
                <a href="cotizador.html?id=${q.id}" class="btn btn-secondary btn-sm" style="padding: 3px 6px; font-size:0.75rem;">Ver Cotizador</a>
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
                <a href="informador.html?id=${r.id}" class="btn btn-secondary btn-sm" style="padding: 3px 6px; font-size:0.75rem;">Ver Informe</a>
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
            comments.forEach(c => {
                const cDiv = document.createElement('div');
                cDiv.className = 'comment-item';
                cDiv.innerHTML = `
                    <div class="comment-header">
                        <span style="font-weight: 600; color: #e2e8f0;">Nota Interna CRM</span>
                        <span>${c.date || '-'}</span>
                    </div>
                    <p style="margin: 3px 0; font-size: 0.85rem; color: #ccc; white-space: pre-wrap;">${c.text || ''}</p>
                `;
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
    const type = document.getElementById('service-type').value;
    const date = document.getElementById('service-date').value;
    const priceVal = parseFloat(document.getElementById('service-price').value) || 0;
    const technician = document.getElementById('service-technician').value.trim();
    const notes = document.getElementById('service-notes').value.trim();
    
    if (!date) {
        return alert("Por favor selecciona la fecha del servicio.");
    }
    
    const servicePayload = {
        id: 'srv_' + Date.now(),
        clientId: activeHistoryClientId,
        clientName: activeHistoryClientName,
        type,
        date,
        price: priceVal,
        technician: technician || 'No asignado',
        notes: notes || '-'
    };
    
    const btn = document.getElementById('btn-save-service');
    btn.disabled = true;
    btn.innerText = "Guardando...";
    
    try {
        if (!appData.services) appData.services = [];
        appData.services.push(servicePayload);
        localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        
        if (currentUser && db) {
            await db.collection('users').doc(currentUser.uid).collection('services').doc(servicePayload.id).set(servicePayload);
        }
        
        currentClientServices.push(servicePayload);
        renderServicesTab();
        
        alert("✅ Servicio registrado exitosamente.");
    } catch(e) {
        console.error("Error saving service:", e);
        alert("Ocurrió un error al guardar el servicio.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Guardar Servicio";
    }
}

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

async function saveReportSent() {
    const date = document.getElementById('report-sent-date').value;
    const emails = document.getElementById('report-sent-emails').value.trim();
    const notes = document.getElementById('report-sent-notes').value.trim();
    
    if (!date || !emails) {
        return alert("Por favor ingresa la fecha y al menos un correo de destinatario.");
    }
    
    const reportPayload = {
        id: 'rep_sent_' + Date.now(),
        clientId: activeHistoryClientId,
        clientName: activeHistoryClientName,
        date,
        emails,
        notes: notes || 'Envío de reporte de estaciones de cebado'
    };
    
    const btn = document.getElementById('btn-save-report-sent');
    btn.disabled = true;
    
    try {
        if (!appData.reportsSent) appData.reportsSent = [];
        appData.reportsSent.push(reportPayload);
        localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
        
        if (currentUser && db) {
            await db.collection('users').doc(currentUser.uid).collection('station_reports_sent').doc(reportPayload.id).set(reportPayload);
        }
        
        currentClientReportsSent.push(reportPayload);
        
        document.getElementById('report-sent-emails').value = '';
        document.getElementById('report-sent-notes').value = '';
        
        renderSummaryTab();
        
        alert("✅ Envío de reporte registrado correctamente.");
    } catch(e) {
        console.error("Error saving sent report:", e);
        alert("Error al guardar el envío.");
    } finally {
        btn.disabled = false;
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
