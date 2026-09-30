(function() {
    const role = localStorage.getItem('stahlgraf_user_role') || 'guest';
    if (role === 'client') {
        alert("⚠️ Acceso denegado: Los clientes no pueden acceder al módulo de trazabilidad.");
        window.location.href = 'hub.html';
    }
})();

// trazabilidad.js - Rodent Bait Station Offline Georeferenced Tracking System

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

function getActiveUid() {
    return localStorage.getItem('stahlgraf_target_uid') || (currentUser ? currentUser.uid : null);
}

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        if (typeof initFirestorePersistence === "function") initFirestorePersistence(db);
        auth = firebase.auth();
        storage = firebase.storage();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.");
    }
} else if (firebase.apps.length) {
    db = firebase.firestore();
        if (typeof initFirestorePersistence === "function") initFirestorePersistence(db);
    auth = firebase.auth();
    storage = firebase.storage();
}

let inspections = [];
let lastKnownGPS = null;
let leafletMap = null;
let leafletMarkerGroup = null;
let activeTileLayer = null;

let manualPlacementMode = {
    active: false,
    stationNum: null
};

let globalAppData = {
    clients: [],
    stationAssignments: []
};

// Seed mock data for demonstration if empty
function seedMockDataIfEmpty() {
    const savedGlobal = localStorage.getItem('stahlgraf_data_v4');
    const savedInspections = localStorage.getItem('stahlgraf_qr_inspecciones');
    
    let needsSeeding = false;
    let globalDataParsed = {};
    
    if (savedGlobal) {
        try {
            globalDataParsed = JSON.parse(savedGlobal);
            if (!globalDataParsed.clients || globalDataParsed.clients.length === 0) {
                needsSeeding = true;
            }
        } catch (e) {
            needsSeeding = true;
        }
    } else {
        needsSeeding = true;
    }
    
    if (needsSeeding) {
        console.log("Seeding mock clients, assignments and history for testing...");
        const mockClients = [
            { id: 'cli_1', name: 'Agropecuaria Los Ángeles', address: 'Camino Las Industrias Km 4.5, Los Ángeles' },
            { id: 'cli_2', name: 'Fundo El Roble', address: 'Ruta Q-180 Sector El Roble, Los Ángeles' }
        ];
        
        const mockAssignments = [
            { start: 1, end: 3, clientId: 'cli_1', clientName: 'Agropecuaria Los Ángeles' },
            { start: 4, end: 5, clientId: 'cli_2', clientName: 'Fundo El Roble' }
        ];
        
        const mergedGlobal = {
            ...globalDataParsed,
            clients: mockClients,
            stationAssignments: mockAssignments
        };
        
        localStorage.setItem('stahlgraf_data_v4', JSON.stringify(mergedGlobal));
        globalAppData = mergedGlobal;
        
        if (!savedInspections || savedInspections === '[]') {
            const now = new Date();
            const formatDate = (offsetDays) => {
                const d = new Date();
                d.setDate(now.getDate() - offsetDays);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                const seconds = String(d.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };
            
            const mockInspections = [
                {
                    id: 'ins_' + (Date.now() - 500000000) + '_1',
                    station: 'ESTACION-01',
                    consumption: '0%',
                    maintenance: ['Limpieza'],
                    evidence: ['Ninguna'],
                    notes: 'Estación en buen estado.',
                    timestamp: formatDate(30),
                    coords: { lat: -37.4612, lng: -72.3514 },
                    status: 'sincronizado'
                },
                {
                    id: 'ins_' + (Date.now() - 250000000) + '_2',
                    station: 'ESTACION-01',
                    consumption: '25-50%',
                    maintenance: ['Reemplazo de cebo'],
                    evidence: ['Excrementos'],
                    notes: 'Consumo parcial detectado.',
                    timestamp: formatDate(15),
                    coords: { lat: -37.4612, lng: -72.3514 },
                    status: 'sincronizado'
                },
                {
                    id: 'ins_' + (Date.now() - 100000) + '_3',
                    station: 'ESTACION-01',
                    consumption: '75%',
                    maintenance: ['Reemplazo de cebo', 'Limpieza'],
                    evidence: ['Excrementos', 'Roeduras'],
                    notes: 'Alta actividad de roedores.',
                    timestamp: formatDate(1),
                    coords: { lat: -37.4612, lng: -72.3514 },
                    status: 'pendiente'
                },
                {
                    id: 'ins_' + (Date.now() - 400000000) + '_4',
                    station: 'ESTACION-02',
                    consumption: '0%',
                    maintenance: ['Limpieza'],
                    evidence: ['Ninguna'],
                    notes: 'Sin actividad.',
                    timestamp: formatDate(20),
                    coords: { lat: -37.4621, lng: -72.3525 },
                    status: 'sincronizado'
                },
                {
                    id: 'ins_' + (Date.now() - 50000) + '_5',
                    station: 'ESTACION-02',
                    consumption: '0%',
                    maintenance: ['Limpieza'],
                    evidence: ['Ninguna'],
                    notes: 'Estación limpia.',
                    timestamp: formatDate(1),
                    coords: { lat: -37.4621, lng: -72.3525 },
                    status: 'pendiente'
                },
                {
                    id: 'ins_' + (Date.now() - 300000000) + '_6',
                    station: 'ESTACION-03',
                    consumption: '25-50%',
                    maintenance: ['Reemplazo de cebo'],
                    evidence: ['Roeduras'],
                    notes: 'Actividad baja.',
                    timestamp: formatDate(15),
                    coords: null,
                    status: 'sincronizado'
                },
                {
                    id: 'ins_' + (Date.now() - 20000) + '_7',
                    station: 'ESTACION-03',
                    consumption: '100%',
                    maintenance: ['Reemplazo de cebo', 'Reubicación'],
                    evidence: ['Excrementos', 'Huellas', 'Roeduras'],
                    notes: 'Cebo consumido completamente, estación reubicada 2 metros.',
                    timestamp: formatDate(1),
                    coords: { lat: -37.4605, lng: -72.3501 },
                    status: 'pendiente'
                },
                {
                    id: 'ins_' + (Date.now() - 600000000) + '_8',
                    station: 'ESTACION-04',
                    consumption: '0%',
                    maintenance: ['Limpieza'],
                    evidence: ['Ninguna'],
                    notes: 'Primera visita.',
                    timestamp: formatDate(40),
                    coords: { lat: -37.4635, lng: -72.3536 },
                    status: 'sincronizado'
                },
                {
                    id: 'ins_' + (Date.now() - 10000) + '_9',
                    station: 'ESTACION-04',
                    consumption: '25-50%',
                    maintenance: ['Reemplazo de cebo'],
                    evidence: ['Roeduras'],
                    notes: 'Consumo parcial.',
                    timestamp: formatDate(1),
                    coords: { lat: -37.4635, lng: -72.3536 },
                    status: 'pendiente'
                }
            ];
            
            localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(mockInspections));
            inspections = mockInspections;
        }
    }
}

// Load global configuration (clients & assignments) from LocalStorage
function loadGlobalAppData() {
    const saved = localStorage.getItem('stahlgraf_data_v4');
    if (saved) {
        try {
            globalAppData = { ...globalAppData, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Error reading global LocalStorage data", e);
        }
    }
}

// Save global configuration to LocalStorage and sync to Firestore user configuration
function saveGlobalAppData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(globalAppData));
    if (currentUser && db) {
        db.collection('users').doc(getActiveUid()).set(globalAppData, { merge: true })
            .catch(err => console.error("Error saving global configuration to Firebase:", err));
            
        // Sync station assignments to a document in the inspections collection (which clients can read)
        if (globalAppData.stationAssignments) {
            db.collection('users').doc(getActiveUid()).collection('inspecciones').doc('assignments_config').set({
                stationAssignments: globalAppData.stationAssignments
            }, { merge: true })
            .then(() => console.log("Station assignments config synced to inspections subcollection successfully."))
            .catch(err => console.error("Error syncing station assignments config to inspections subcollection:", err));
        }
    }
}

// Sync global configuration from Firebase user document
function syncGlobalDataFromFirebase() {
    if (!currentUser || !db) return;
    db.collection('users').doc(getActiveUid()).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            if (typeof mergeAppData === 'function') {
                globalAppData = mergeAppData(globalAppData, cloudData);
                // Preserve local clients added offline or pending sync
                if (cloudData.clients && Array.isArray(cloudData.clients)) {
                    const localClients = globalAppData.clients || [];
                    cloudData.clients.forEach(cc => {
                        if (!localClients.some(lc => lc.id === cc.id || lc.name === cc.name)) {
                            localClients.push(cc);
                        }
                    });
                    globalAppData.clients = localClients;
                }
            } else {
                globalAppData = { ...globalAppData, ...cloudData };
            }
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(globalAppData));
            
            // Auto-sync assignments to inspections subcollection for client portal access
            if (globalAppData.stationAssignments) {
                db.collection('users').doc(getActiveUid()).collection('inspecciones').doc('assignments_config').set({
                    stationAssignments: globalAppData.stationAssignments
                }, { merge: true })
                .then(() => console.log("Station assignments config auto-synced on load successfully."))
                .catch(err => console.error("Error auto-syncing assignments config on load:", err));
            }
            
            // Refresh views
            populateClientsDropdown();
            generateStationDropdown();
            renderAssignmentsList();
            renderMonitoreo();
            updateStationClientInfo();
        }
    }).catch(err => {
        console.error("Error syncing global configuration from Firebase:", err);
    });
}

// Initialize and Listen for Auth Changes
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
            
            const emailKey = user.email.toLowerCase();
            db.collection('user_roles').doc(emailKey).get().then(doc => {
                if (doc.exists) {
                    const roleData = doc.data();
                    localStorage.setItem('stahlgraf_user_role', roleData.role || 'tech');
                    localStorage.setItem('stahlgraf_target_uid', roleData.ownerUid || user.uid);
                    if (roleData.linkedClientId) {
                        localStorage.setItem('stahlgraf_linked_client_id', roleData.linkedClientId);
                    } else {
                        localStorage.removeItem('stahlgraf_linked_client_id');
                    }
                } else {
                    alert("⚠️ Acceso denegado: Su correo no está autorizado en esta plataforma.");
                    auth.signOut().then(() => {
                        localStorage.clear();
                        window.location.href = 'index.html';
                    });
                    return;
                }
                
                const role = localStorage.getItem('stahlgraf_user_role');
                if (role === 'client') {
                    alert("⚠️ Acceso denegado: Los clientes no pueden acceder al módulo de trazabilidad.");
                    window.location.href = 'hub.html';
                    return;
                }
                
                if (role === 'tech') {
                    sessionStorage.setItem('trazabilidad_mode', 'tech');
                    checkURLParameters();
                }
                
                // Fetch central database configuration (clients & assignments) on login
                syncGlobalDataFromFirebase();
                
                // Auto-sync when login status is detected and online
                if (navigator.onLine) {
                    syncWithCloud(true);
                }
            }).catch(err => {
                console.error("Error retrieving user role:", err);
                // Fallback (assume admin or whatever role is cached)
                syncGlobalDataFromFirebase();
                if (navigator.onLine) {
                    syncWithCloud(true);
                }
            });
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
            document.getElementById('btn-sync-login').classList.add('btn-primary-outline');
            document.getElementById('btn-sync-login').classList.remove('btn-secondary');
            
            localStorage.removeItem('stahlgraf_user_role');
            localStorage.removeItem('stahlgraf_target_uid');
            localStorage.removeItem('stahlgraf_linked_client_id');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    seedMockDataIfEmpty();
    loadGlobalAppData();
    loadLocalInspections();
    generateStationDropdown();
    checkURLParameters();
    setupTabSwitching();
    setupCheckboxMutualExclusions();
    renderMonitoreo();
    handleAuthRedirects();
    
    // Initial renders for assignments
    populateClientsDropdown();
    renderAssignmentsList();
    updateStationClientInfo();

    // Event Bindings
    document.getElementById('btn-sync-login').addEventListener('click', () => {
        if (!auth) return alert("Firebase no está configurado.");
        if (currentUser) {
            if (confirm("¿Deseas cerrar sesión?")) auth.signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            // Prioritize signInWithPopup on both desktop and mobile to bypass third-party cookie partition issues.
            // Fallback to redirect only if popup is blocked (e.g. inside webviews).
            auth.signInWithPopup(provider).catch(err => {
                console.warn("Popup blocked or failed, retrying with redirect...", err);
                auth.signInWithRedirect(provider);
            });
        }
    });

    document.getElementById('btn-save-inspection').addEventListener('click', saveInspection);
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
    document.getElementById('btn-export-json').addEventListener('click', exportJSON);
    document.getElementById('btn-clear-local').addEventListener('click', clearLocalData);
    document.getElementById('btn-sync-cloud').addEventListener('click', () => syncWithCloud(false));
    
    const btnSyncTech = document.getElementById('btn-sync-cloud-tech');
    if (btnSyncTech) {
        btnSyncTech.addEventListener('click', () => syncWithCloud(false));
    }
    
    const btnBackToClients = document.getElementById('btn-back-to-clients');
    if (btnBackToClients) {
        btnBackToClients.addEventListener('click', () => {
            const selectFilter = document.getElementById('filter-client-id');
            if (selectFilter) {
                selectFilter.value = '';
                selectFilter.dispatchEvent(new Event('change'));
            }
        });
    }
    
    const btnGeneratePdf = document.getElementById('btn-generate-pdf-report');
    if (btnGeneratePdf) {
        btnGeneratePdf.addEventListener('click', openReportConfigModal);
    }
    
    const btnManualPosition = document.getElementById('btn-manual-position');
    if (btnManualPosition) {
        btnManualPosition.addEventListener('click', () => {
            const select = document.getElementById('unpositioned-station-select');
            const stationNum = select ? select.value : '';
            if (!stationNum) {
                alert("⚠️ Selecciona una estación sin ubicación para posicionarla.");
                return;
            }
            enterManualPlacementMode(parseInt(stationNum, 10));
        });
    }
    
    // Auto-sync when connection is restored
    window.addEventListener('online', () => {
        if (currentUser) {
            syncWithCloud(true);
        }
    });
    
    // Import bindings
    const btnTriggerImport = document.getElementById('btn-trigger-import');
    const inputImportJson = document.getElementById('input-import-json');
    if (btnTriggerImport && inputImportJson) {
        btnTriggerImport.addEventListener('click', () => inputImportJson.click());
        inputImportJson.addEventListener('change', importJSON);
    }


    
    // Station dropdown change event
    const stationIdSelect = document.getElementById('station-id');
    if (stationIdSelect) {
        stationIdSelect.addEventListener('change', updateStationClientInfo);
    }
    
    // Installation Mode events
    const chkInstallMode = document.getElementById('chk-install-mode');
    const installClientContainer = document.getElementById('install-client-selector-container');
    const gpsStatusBox = document.getElementById('gps-status-box');
    if (chkInstallMode && installClientContainer) {
        chkInstallMode.addEventListener('change', () => {
            if (chkInstallMode.checked) {
                installClientContainer.style.display = 'block';
                if (gpsStatusBox) gpsStatusBox.style.display = 'flex';
                updateStationClientInfo();
                requestGPSLock();
            } else {
                installClientContainer.style.display = 'none';
                if (gpsStatusBox) gpsStatusBox.style.display = 'none';
            }
        });
    }
    
    const installClientIdSelect = document.getElementById('install-client-id');
    if (installClientIdSelect) {
        installClientIdSelect.addEventListener('change', () => {
            if (chkInstallMode && chkInstallMode.checked) {
                updateStationClientInfo();
            }
        });
    }
    
    // Save range assignment binding
    const btnSaveAssignment = document.getElementById('btn-save-assignment');
    if (btnSaveAssignment) {
        btnSaveAssignment.addEventListener('click', registerAssignment);
    }

    const assignClientIdSelect = document.getElementById('assign-client-id');
    if (assignClientIdSelect) {
        assignClientIdSelect.addEventListener('change', updateClientCurrentRangesHint);
    }
    
    // Client filter in Monitoreo
    const filterClientIdSelect = document.getElementById('filter-client-id');
    if (filterClientIdSelect) {
        filterClientIdSelect.addEventListener('change', () => {
            renderMonitoreo();
        });
    }
    
    // Reassignment Modal buttons
    const btnCancelReassign = document.getElementById('btn-cancel-reassign');
    if (btnCancelReassign) {
        btnCancelReassign.addEventListener('click', closeReassignModal);
    }
    
    const btnSaveReassign = document.getElementById('btn-save-reassign');
    if (btnSaveReassign) {
        btnSaveReassign.addEventListener('click', executeReassign);
    }
    
    // Station Details Modal buttons
    const btnCloseDetails = document.getElementById('btn-close-details');
    if (btnCloseDetails) {
        btnCloseDetails.addEventListener('click', closeStationDetails);
    }
    
    const btnDetailInspect = document.getElementById('btn-detail-inspect');
    if (btnDetailInspect) {
        btnDetailInspect.addEventListener('click', () => {
            const titleText = document.getElementById('detail-station-title').innerText;
            const stationNum = parseInt(titleText.replace('Estación #', ''), 10);
            if (!isNaN(stationNum)) {
                const stationKey = `ESTACION-${String(stationNum).padStart(2, '0')}`;
                const select = document.getElementById('station-id');
                if (select && !select.disabled) {
                    const exists = Array.from(select.options).some(opt => opt.value === stationKey);
                    if (!exists) {
                        const opt = document.createElement('option');
                        opt.value = stationKey;
                        const clientName = getClientNameForStation(stationNum);
                        opt.textContent = clientName ? `Estación #${String(stationNum).padStart(2, '0')} - ${clientName}` : `Estación #${String(stationNum).padStart(2, '0')}`;
                        select.appendChild(opt);
                    }
                    select.value = stationKey;
                    select.dispatchEvent(new Event('change'));
                }
                closeStationDetails();
                switchToTab('panel-inspeccionar');
            }
        });
    }
    
    const btnDetailReassign = document.getElementById('btn-detail-reassign');
    if (btnDetailReassign) {
        btnDetailReassign.addEventListener('click', () => {
            const titleText = document.getElementById('detail-station-title').innerText;
            const stationNum = parseInt(titleText.replace('Estación #', ''), 10);
            if (!isNaN(stationNum)) {
                closeStationDetails();
                openReassignModal(stationNum);
            }
        });
    }
    
    const btnDetailReset = document.getElementById('btn-detail-reset');
    if (btnDetailReset) {
        btnDetailReset.addEventListener('click', () => {
            const titleText = document.getElementById('detail-station-title').innerText;
            const stationNum = parseInt(titleText.replace('Estación #', ''), 10);
            if (!isNaN(stationNum)) {
                resetStationData(stationNum);
            }
        });
    }
    
    const btnDetailTransfer = document.getElementById('btn-detail-transfer');
    if (btnDetailTransfer) {
        btnDetailTransfer.addEventListener('click', () => {
            const titleText = document.getElementById('detail-station-title').innerText;
            const stationNum = parseInt(titleText.replace('Estación #', ''), 10);
            if (!isNaN(stationNum)) {
                openTransferModal(stationNum);
            }
        });
    }
    
    const btnCancelTransfer = document.getElementById('btn-cancel-transfer');
    if (btnCancelTransfer) {
        btnCancelTransfer.addEventListener('click', closeTransferModal);
    }
    
    const btnSaveTransfer = document.getElementById('btn-save-transfer');
    if (btnSaveTransfer) {
        btnSaveTransfer.addEventListener('click', executeTransfer);
    }
});

// Request GPS lock asynchronously to cache user's current location and update UI status
function requestGPSLock() {
    if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by this browser.");
        updateGPSUIStatus('error', 'El navegador no soporta geolocalización');
        return;
    }
    
    updateGPSUIStatus('searching', 'Buscando señal GPS de alta precisión...');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lastKnownGPS = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: Date.now()
            };
            console.log("GPS Lock acquired successfully:", lastKnownGPS);
            
            if (position.coords.accuracy <= 20) {
                updateGPSUIStatus('success', `GPS Listo (Precisión: ±${position.coords.accuracy.toFixed(1)} m)`);
            } else {
                updateGPSUIStatus('warning', `Precisión GPS regular (±${position.coords.accuracy.toFixed(1)} m). Espera un momento...`);
            }
        },
        (error) => {
            console.warn("Could not acquire GPS position:", error.message);
            let errMsg = 'Sin señal GPS o permisos denegados';
            if (error.code === error.PERMISSION_DENIED) errMsg = 'Permiso de ubicación denegado';
            else if (error.code === error.POSITION_UNAVAILABLE) errMsg = 'Señal de GPS no disponible';
            else if (error.code === error.TIMEOUT) errMsg = 'Tiempo de espera de GPS agotado';
            updateGPSUIStatus('error', `Error: ${errMsg}`);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5000 // Force fresh reading if older than 5 seconds
        }
    );
}

// Helper to update GPS UI indicator in the form
function updateGPSUIStatus(state, message) {
    const dot = document.getElementById('gps-status-dot');
    const txt = document.getElementById('gps-status-text');
    if (!dot || !txt) return;
    
    txt.textContent = message;
    
    // Reset keyframe animation class if any
    dot.style.animation = 'none';
    
    if (state === 'searching') {
        dot.style.background = '#3b82f6';
        dot.style.boxShadow = '0 0 8px #3b82f6';
        dot.style.animation = 'gpsPulse 1.2s infinite ease-in-out';
    } else if (state === 'success') {
        dot.style.background = '#10b981';
        dot.style.boxShadow = '0 0 8px #10b981';
    } else if (state === 'warning') {
        dot.style.background = '#fbbf24';
        dot.style.boxShadow = '0 0 8px #fbbf24';
    } else { // error or disabled
        dot.style.background = '#ef4444';
        dot.style.boxShadow = '0 0 8px #ef4444';
    }
}

// Get the latest coordinates for a station from its inspections history
function getLatestStationCoords(stationKey) {
    const stationRecords = inspections.filter(r => r.station === stationKey && r.coords && r.coords.lat && r.coords.lng);
    if (stationRecords.length === 0) return null;
    const sorted = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
    return sorted[0].coords;
}

// Initialize Leaflet satellite map and render station markers
function initOrUpdateMap() {
    if (typeof L === 'undefined') {
        console.warn("Leaflet library is not loaded.");
        return;
    }

    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    
    let filterClientName = '';
    if (filterClientId) {
        const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
        if (clientObj) filterClientName = clientObj.name;
    }

    const activeDate = window.currentVisitDate || getTodayDateStr();
    const mapStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        const clientName = getClientNameForStation(i);
        
        // Filter logic by client
        if (filterClientName && clientName !== filterClientName) {
            continue;
        }

        const visitRec = getStationVisitRecord(stationKey, activeDate);
        const isInspectedInVisit = !!visitRec;

        // Filter by visitFilterMode
        if (window.visitFilterMode === 'pending' && isInspectedInVisit) {
            continue;
        }
        if (window.visitFilterMode === 'completed' && !isInspectedInVisit) {
            continue;
        }
        
        const coords = getLatestStationCoords(stationKey);
        if (coords && coords.lat && coords.lng) {
            mapStations.push({
                num: i,
                key: stationKey,
                clientName: clientName || 'Sin Cliente',
                coords: coords,
                analytics: calculateStationAnalytics(stationKey),
                isInspectedInVisit: isInspectedInVisit,
                visitRec: visitRec
            });
        }
    }

    const placeholder = document.getElementById('monitoreo-map-placeholder');
    const mapElement = document.getElementById('monitoreo-map');

    if (mapStations.length === 0) {
        // Check if there is an active client selected
        const filterClientIdSelect = document.getElementById('filter-client-id');
        const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
        
        if (filterClientId && !manualPlacementMode.active) {
            // Show placeholder explaining they can locate manually
            if (placeholder) {
                placeholder.innerHTML = `
                    <span style="font-size: 2.2rem; margin-bottom: 10px;">📍</span>
                    <p style="margin: 0; font-size: 0.95rem; color: #fff; font-weight: 600;">Sin datos de ubicación</p>
                    <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-muted); max-width: 320px; line-height: 1.4;">
                        Este cliente no tiene estaciones ubicadas en el mapa. Selecciona una en el panel inferior y haz clic en "Posicionar en el Mapa".
                    </p>
                `;
                placeholder.style.display = 'flex';
            }
            if (mapElement) mapElement.style.opacity = '0';
            return;
        } else if (!manualPlacementMode.active) {
            if (placeholder) {
                placeholder.innerHTML = `
                    <span style="font-size: 2.2rem; margin-bottom: 10px;">📍</span>
                    <p style="margin: 0; font-size: 0.95rem; color: #fff; font-weight: 600;">Sin datos de ubicación</p>
                    <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: var(--text-muted); max-width: 320px; line-height: 1.4;">
                        Las estaciones activas no registran coordenadas GPS. Realiza una inspección para capturar la ubicación de la estación en terreno.
                    </p>
                `;
                placeholder.style.display = 'flex';
            }
            if (mapElement) mapElement.style.opacity = '0';
            return;
        }
    }
    
    if (manualPlacementMode.active) {
        if (placeholder) placeholder.style.display = 'none';
        if (mapElement) mapElement.style.opacity = '1';
    } else {
        if (placeholder) placeholder.style.display = 'none';
        if (mapElement) mapElement.style.opacity = '1';
    }

    // Initialize map if it doesn't exist
    if (!leafletMap) {
        leafletMap = L.map('monitoreo-map', {
            zoomControl: true,
            scrollWheelZoom: false
        });
        
        // Add Google Maps Hybrid (Satellite + Roads/Labels) tile layer
        activeTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy; Google',
            maxZoom: 20,
            crossOrigin: true
        }).addTo(leafletMap);
        
        leafletMarkerGroup = L.layerGroup().addTo(leafletMap);
    }

    // Force map to recalculate container size
    setTimeout(() => {
        if (leafletMap) {
            leafletMap.invalidateSize();
            
            // Clear old markers
            leafletMarkerGroup.clearLayers();

            // Scale color logic
            function getColorForAvg(avg) {
                if (avg <= 20) return '#10b981'; // Green
                if (avg <= 50) return '#fbbf24'; // Yellow
                if (avg <= 75) return '#f97316'; // Orange
                return '#ef4444'; // Red
            }

            // Draw markers
            let targetHighlightMarker = null;
            mapStations.forEach(s => {
                const avgColor = getColorForAvg(s.analytics.avg);
                const numStr = String(s.num).padStart(2, '0');
                
                let iconHtml = '';
                if (window.isGeneratingPdf) {
                    // Modo limpio para informe PDF: círculos limpios con borde blanco, sin tickets ni halos de inspección
                    iconHtml = `<div style="background-color: ${avgColor}; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.55);">${numStr}</div>`;
                } else if (s.isInspectedInVisit) {
                    iconHtml = `
                        <div style="position: relative; width: 28px; height: 28px; cursor: pointer;">
                            <div style="background-color: ${avgColor}; width: 26px; height: 26px; border-radius: 50%; border: 2.5px solid #10b981; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 11px; box-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 2px 5px rgba(0,0,0,0.5);">${numStr}</div>
                            <div style="position: absolute; top: -5px; right: -5px; background: #10b981; color: white; font-size: 9px; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1.5px solid #fff; font-weight: 900; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">✓</div>
                        </div>
                    `;
                } else {
                    iconHtml = `
                        <div style="position: relative; width: 28px; height: 28px; cursor: pointer;">
                            <div style="background-color: ${avgColor}; width: 26px; height: 26px; border-radius: 50%; border: 2.5px dashed #f59e0b; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 11px; box-shadow: 0 0 8px rgba(245, 158, 11, 0.7), 0 2px 5px rgba(0,0,0,0.5);">${numStr}</div>
                            <div style="position: absolute; top: -5px; right: -5px; background: #f59e0b; color: #1e293b; font-size: 8px; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1.5px solid #fff; font-weight: 900; box-shadow: 0 1px 3px rgba(0,0,0,0.5);">⏳</div>
                        </div>
                    `;
                }

                const customIcon = L.divIcon({
                    className: 'custom-station-icon',
                    html: iconHtml,
                    iconSize: window.isGeneratingPdf ? [22, 22] : [28, 28],
                    iconAnchor: window.isGeneratingPdf ? [11, 11] : [14, 14]
                });

                const marker = L.marker([s.coords.lat, s.coords.lng], {
                    icon: customIcon,
                    draggable: true
                });

                // Listen for drag end to allow correcting/updating the coordinates
                marker.on('dragend', function(event) {
                    const newPos = event.target.getLatLng();
                    if (confirm(`¿Deseas corregir la ubicación de la Estación #${numStr} a estas nuevas coordenadas?\n\nLatitud: ${newPos.lat.toFixed(6)}\nLongitud: ${newPos.lng.toFixed(6)}`)) {
                        updateStationCoordinates(s.key, newPos.lat, newPos.lng);
                    } else {
                        // Reset marker position if cancelled by redrawing the map
                        initOrUpdateMap();
                    }
                });

                const visitBadgeHtml = s.isInspectedInVisit
                    ? `<div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 6px; padding: 5px 8px; margin-bottom: 8px; font-weight: 700; color: #059669; font-size: 0.82rem; display: flex; align-items: center; gap: 5px;">
                        <span>✔️ Inspeccionada en esta visita (${s.visitRec.timeStr})</span>
                       </div>`
                    : `<div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px; padding: 5px 8px; margin-bottom: 8px; font-weight: 700; color: #d97706; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                        <span>⏳ PENDIENTE EN ESTA VISITA</span>
                        <button onclick="quickInspectStation('${s.key}')" style="background: #3b82f6; color: #fff; border: none; border-radius: 4px; padding: 3px 8px; font-size: 0.74rem; cursor: pointer; font-weight: 600;">⚡ Inspeccionar</button>
                       </div>`;

                const popupContent = `
                    <div style="color: #333; font-family: 'Inter', sans-serif; font-size: 0.85rem; line-height: 1.4; padding: 5px;">
                        <h4 style="margin: 0 0 5px 0; font-size: 1rem; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; cursor: pointer;" onclick="window.selectStationFromMap('${numStr}')" title="Toca para registrar inspección">
                            📍 Estación #${numStr}
                        </h4>
                        ${visitBadgeHtml}
                        <p style="margin: 4px 0;"><strong>Cliente:</strong> ${s.clientName}</p>
                        <p style="margin: 4px 0;"><strong>Último Consumo:</strong> ${s.analytics.lastVal}</p>
                        <p style="margin: 4px 0;"><strong>Promedio Histórico:</strong> ${s.analytics.avg}%</p>
                        <p style="margin: 8px 0 4px 0; font-size: 0.75rem; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-family: monospace; word-break: break-all; display: flex; justify-content: space-between; align-items: center;">
                            <span>${s.coords.lat.toFixed(6)}, ${s.coords.lng.toFixed(6)}</span>
                            <button onclick="navigator.clipboard.writeText('${s.coords.lat},${s.coords.lng}'); alert('Coordenadas copiadas');" style="margin-left: 8px; cursor: pointer; border: none; background: transparent; font-size: 0.8rem; color: #3b82f6;">📋</button>
                        </p>
                        <p style="margin: 6px 0 0 0; font-size: 0.7rem; color: #e11d48; font-weight: 500; font-style: italic; border-top: 1px solid #f1f5f9; padding-top: 5px;">
                            💡 Mantén presionado y arrastra este marcador para corregir su ubicación.
                        </p>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                marker.addTo(leafletMarkerGroup);

                if (window.highlightStationNum && s.num === window.highlightStationNum) {
                    targetHighlightMarker = marker;
                }
            });

            // Auto-fit map viewport to bounds
            if (mapStations.length > 0) {
                const bounds = mapStations.map(s => [s.coords.lat, s.coords.lng]);
                if (mapStations.length === 1) {
                    leafletMap.setView(bounds[0], 17);
                } else {
                    leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 19 });
                }
            } else {
                // Default center view if no stations positioned yet
                const centerCoords = lastKnownGPS ? [lastKnownGPS.lat, lastKnownGPS.lng] : [-37.4612, -72.3514];
                leafletMap.setView(centerCoords, 17);
            }

            if (targetHighlightMarker) {
                setTimeout(() => {
                    targetHighlightMarker.openPopup();
                }, 400);
            }
            window.highlightStationNum = null;
        }
    }, 100);
}

// Correct coordinates of a station (updates the latest inspection record with coords)
function updateStationCoordinates(stationKey, lat, lng) {
    // Find all inspections of this station
    const stationRecords = inspections.filter(r => r.station === stationKey);
    
    if (stationRecords.length > 0) {
        // Find latest record (newest first)
        const sorted = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
        const latestRecord = sorted[0];
        
        // Find it in master inspections array
        const recordIndex = inspections.findIndex(r => r.id === latestRecord.id);
        if (recordIndex !== -1) {
            inspections[recordIndex].coords = {
                lat: lat,
                lng: lng,
                accuracy: 0, // Manual correction accuracy indicator
                timestamp: Date.now()
            };
            inspections[recordIndex].status = 'pendiente'; // Set as pending so it syncs to cloud
            
            localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
            renderMonitoreo();
            alert(`✅ La ubicación de la Estación #${stationKey.replace('ESTACION-', '')} ha sido registrada.`);
            
            if (navigator.onLine && currentUser) {
                syncWithCloud(true);
            }
        }
    } else {
        // Create an initial record if no inspections exist
        const newRecord = {
            id: 'ins_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            station: stationKey,
            consumption: '0%',
            maintenance: [],
            evidence: [],
            notes: 'Posicionamiento manual inicial',
            coords: {
                lat: lat,
                lng: lng,
                accuracy: 0,
                timestamp: Date.now()
            },
            timestamp: new Date().toLocaleString('es-CL'),
            status: 'pendiente'
        };
        inspections.push(newRecord);
        localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
        
        renderMonitoreo();
        alert(`✅ La ubicación de la Estación #${stationKey.replace('ESTACION-', '')} ha sido registrada.`);
        
        if (navigator.onLine && currentUser) {
            syncWithCloud(true);
        }
    }
}

function populateUnpositionedStationsSelector(filterClientId, filterClientName) {
    const container = document.getElementById('unpositioned-stations-container');
    const select = document.getElementById('unpositioned-station-select');
    if (!container || !select) return;
    
    if (!filterClientId) {
        container.style.display = 'none';
        return;
    }
    
    const clientStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        if (getClientIdForStation(i) === filterClientId || getClientNameForStation(i) === filterClientName) {
            clientStations.push(i);
        }
    }
    
    const unpositioned = [];
    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const coords = getLatestStationCoords(stationKey);
        if (!coords || !coords.lat || !coords.lng) {
            unpositioned.push(num);
        }
    });
    
    if (unpositioned.length === 0 || manualPlacementMode.active) {
        container.style.display = 'none';
        return;
    }
    
    // Populate select
    select.innerHTML = '<option value="" style="background-color: #1e293b; color: #fff;">-- Seleccionar Estación --</option>';
    unpositioned.forEach(num => {
        const opt = document.createElement('option');
        opt.value = num;
        opt.textContent = `Estación #${String(num).padStart(2, '0')}`;
        opt.style.backgroundColor = '#1e293b';
        opt.style.color = '#fff';
        select.appendChild(opt);
    });
    
    container.style.display = 'flex';
}

function enterManualPlacementMode(stationNum) {
    manualPlacementMode.active = true;
    manualPlacementMode.stationNum = stationNum;
    
    // Hide placeholder, show map
    const placeholder = document.getElementById('monitoreo-map-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    const mapElement = document.getElementById('monitoreo-map');
    if (mapElement) mapElement.style.opacity = '1';
    
    // Ensure map is initialized
    if (!leafletMap) {
        leafletMap = L.map('monitoreo-map', {
            zoomControl: true,
            scrollWheelZoom: false
        });
        activeTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy; Google',
            maxZoom: 20,
            crossOrigin: true
        }).addTo(leafletMap);
        leafletMarkerGroup = L.layerGroup().addTo(leafletMap);
    }
    
    // Redraw map with placement state
    leafletMarkerGroup.clearLayers();
    
    // Draw existing markers
    const mapStations = [];
    const maxStations = getMaxStationNumber();
    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    let filterClientName = '';
    const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
    if (clientObj) filterClientName = clientObj.name;
    
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        const clientName = getClientNameForStation(i);
        
        if (filterClientName && clientName !== filterClientName) continue;
        
        const coords = getLatestStationCoords(stationKey);
        if (coords && coords.lat && coords.lng) {
            mapStations.push({
                num: i,
                key: stationKey,
                coords: coords,
                analytics: calculateStationAnalytics(stationKey)
            });
        }
    }
    
    function getColorForAvg(avg) {
        if (avg <= 20) return '#10b981';
        if (avg <= 50) return '#fbbf24';
        if (avg <= 75) return '#f97316';
        return '#ef4444';
    }
    
    mapStations.forEach(s => {
        const avgColor = getColorForAvg(s.analytics.avg);
        const numStr = String(s.num).padStart(2, '0');
        const customIcon = L.divIcon({
            className: 'custom-station-icon',
            html: `<div style="background-color: ${avgColor}; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.55);">${numStr}</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
        });
        const marker = L.marker([s.coords.lat, s.coords.lng], { icon: customIcon });
        marker.addTo(leafletMarkerGroup);
    });
    
    // Set view center
    if (mapStations.length > 0) {
        const bounds = mapStations.map(s => [s.coords.lat, s.coords.lng]);
        if (mapStations.length === 1) {
            leafletMap.setView(bounds[0], 17);
        } else {
            leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 19 });
        }
    } else {
        const centerCoords = lastKnownGPS ? [lastKnownGPS.lat, lastKnownGPS.lng] : [-37.4612, -72.3514];
        leafletMap.setView(centerCoords, 17);
    }
    
    leafletMap.invalidateSize();
    
    // Set crosshair cursor
    leafletMap.getContainer().style.cursor = 'crosshair';
    
    // Add instruction overlay banner inside map wrapper
    const wrapper = document.getElementById('monitoreo-map-wrapper');
    if (wrapper) {
        const oldBanner = document.getElementById('map-placement-banner');
        if (oldBanner) oldBanner.remove();
        
        const banner = document.createElement('div');
        banner.id = 'map-placement-banner';
        banner.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid var(--primary);
            padding: 12px 15px;
            border-radius: 8px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            backdrop-filter: blur(6px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.6);
            border-left: 4px solid var(--primary);
        `;
        banner.innerHTML = `
            <span style="font-size: 0.85rem; color: #fff; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                📍 Modo Posicionamiento: Haz clic en el mapa satelital para ubicar la <strong>Estación #${String(stationNum).padStart(2, '0')}</strong>.
            </span>
            <button id="btn-cancel-placement" class="btn btn-secondary btn-sm" style="margin: 0; padding: 5px 12px; font-size: 0.75rem; border-radius: 6px; height: auto; font-weight: 600; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15);">
                Cancelar
            </button>
        `;
        wrapper.appendChild(banner);
        
        document.getElementById('btn-cancel-placement').onclick = (event) => {
            event.stopPropagation();
            exitManualPlacementMode();
        };
    }
    
    leafletMap.on('click', onMapClickForPlacement);
}

function onMapClickForPlacement(e) {
    if (!manualPlacementMode.active) return;
    
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const numStr = String(manualPlacementMode.stationNum).padStart(2, '0');
    const stationKey = `ESTACION-${numStr}`;
    
    if (confirm(`¿Deseas ubicar la Estación #${numStr} en este punto del mapa?\n\nLatitud: ${lat.toFixed(6)}\nLongitud: ${lng.toFixed(6)}`)) {
        updateStationCoordinates(stationKey, lat, lng);
        exitManualPlacementMode();
    }
}

function exitManualPlacementMode() {
    manualPlacementMode.active = false;
    manualPlacementMode.stationNum = null;
    
    if (leafletMap) {
        leafletMap.off('click', onMapClickForPlacement);
        leafletMap.getContainer().style.cursor = '';
    }
    
    const banner = document.getElementById('map-placement-banner');
    if (banner) banner.remove();
    
    renderMonitoreo();
}

// Load inspections queue from LocalStorage
function loadLocalInspections() {
    const saved = localStorage.getItem('stahlgraf_qr_inspecciones');
    if (saved) {
        try {
            const raw = JSON.parse(saved);
            if (Array.isArray(raw)) {
                // Filter out invalid items, missing stations, or system config documents like assignments_config
                inspections = raw.filter(r => r && r.id && r.id !== 'assignments_config' && r.station && typeof r.station === 'string');
            } else {
                inspections = [];
            }
        } catch (e) {
            console.error("Error reading LocalStorage", e);
            inspections = [];
        }
    }
}

// Generate Station Dropdown options dynamically scaling with assignments and linking clients
function generateStationDropdown(skipInfoUpdate = false) {
    const select = document.getElementById('station-id');
    if (!select) return;
    const currentVal = select.value;
    select.innerHTML = '';
    
    // Inyectar placeholder neutro
    const optPlaceholder = document.createElement('option');
    optPlaceholder.value = '';
    optPlaceholder.textContent = '-- Seleccionar Estación --';
    select.appendChild(optPlaceholder);
    
    const activeDate = window.currentVisitDate || getTodayDateStr();
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        
        // Find if this station is assigned to a client
        const clientName = getClientNameForStation(i);
        const visitRec = getStationVisitRecord(stationKey, activeDate);
        const isInspected = !!visitRec;
        const prefix = isInspected ? `✔️ [Revisada ${visitRec.timeStr}] ` : `⏳ [Pendiente] `;
        
        const opt = document.createElement('option');
        opt.value = stationKey;
        if (clientName) {
            opt.textContent = `${prefix}Estación #${numStr} - ${clientName}`;
        } else {
            opt.textContent = `${prefix}Estación #${numStr}`;
        }
        select.appendChild(opt);
    }
    
    if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
        select.value = currentVal;
    } else {
        select.value = '';
    }
    
    // Refresh info box for the currently selected station
    if (!skipInfoUpdate) {
        updateStationClientInfo();
    }
}

// Check if URL has ?id=ESTACION-XX parameter and preserve it across redirect logins
function checkURLParameters() {
    const params = new URLSearchParams(window.location.search);
    
    // Parse mode parameter and persist in sessionStorage
    let mode = params.get('mode');
    const role = localStorage.getItem('stahlgraf_user_role') || 'guest';
    
    if (role === 'tech') {
        sessionStorage.setItem('trazabilidad_mode', 'tech');
    } else if (mode === 'tech') {
        sessionStorage.setItem('trazabilidad_mode', 'tech');
    } else if (mode === 'admin') {
        sessionStorage.setItem('trazabilidad_mode', 'admin');
    } else {
        // If direct admin link access (search is empty), clear the mode
        if (!window.location.search) {
            sessionStorage.removeItem('trazabilidad_mode');
        }
    }
    
    const activeMode = sessionStorage.getItem('trazabilidad_mode');
    if (activeMode === 'tech') {
        // Hide tabs navigation
        const tabsNav = document.querySelector('.tabs-nav');
        if (tabsNav) tabsNav.style.display = 'none';
        
        // Hide page header sync actions
        const navActions = document.querySelector('.nav-actions');
        if (navActions) navActions.style.display = 'none';
        
        // Show tech manual sync button in Ficha de Inspección
        const btnSyncTech = document.getElementById('btn-sync-cloud-tech');
        if (btnSyncTech) btnSyncTech.style.display = 'flex';
        
        // Update logo link to preserve mode=tech when returning to dashboard
        const logoLink = document.querySelector('nav.navbar a[href="hub.html"]');
        if (logoLink) {
            logoLink.href = 'hub.html?mode=tech';
        }
        
        // Force switch to Registrar tab
        switchToTab('panel-inspeccionar');
    }

    // Extract station ID parameter using robust checks
    let idParam = params.get('id');
    if (!idParam) {
        idParam = params.get('');
    }
    if (!idParam) {
        for (const key of params.keys()) {
            if (key.startsWith('ESTACION-')) {
                idParam = key;
                break;
            }
        }
    }
    
    // Save to sessionStorage if present in URL
    if (idParam) {
        sessionStorage.setItem('last_scanned_station_id', idParam);
    } else {
        // Restore from sessionStorage if URL is clean (e.g. returning from Google Redirect login)
        idParam = sessionStorage.getItem('last_scanned_station_id');
    }
    
    const select = document.getElementById('station-id');
    const badge = document.getElementById('station-locked-badge');
    
    if (idParam && idParam.startsWith('ESTACION-')) {
        // Search if this option exists
        const exists = Array.from(select.options).some(opt => opt.value === idParam);
        if (!exists) {
            // Add option dynamically in case it's a new station number (e.g. ESTACION-16+)
            const opt = document.createElement('option');
            opt.value = idParam;
            opt.textContent = `Estación #${idParam.replace('ESTACION-', '')}`;
            select.appendChild(opt);
        }
        select.value = idParam;
        select.dispatchEvent(new Event('change'));
        select.disabled = false;
        if (badge) badge.style.display = 'none';
        
        // Auto-switch to Registrar tab
        switchToTab('panel-inspeccionar');
    }
}

// Switch to a specific tab programmatically
function switchToTab(targetId) {
    document.querySelectorAll('.tab-trigger').forEach(t => {
        if (t.getAttribute('data-target') === targetId) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
        if (p.id === targetId) {
            p.classList.add('active');
        } else {
            p.classList.remove('active');
        }
    });
    if (targetId === 'panel-monitoreo') {
        renderMonitoreo();
    }
    if (targetId === 'panel-inspeccionar') {
        requestGPSLock();
    }
    if (targetId === 'panel-asignaciones') {
        renderAssignmentsList();
        updateClientCurrentRangesHint();
    }
}

// Select a station directly from the map popup and switch to the inspection tab
window.selectStationFromMap = function(stationNum) {
    const select = document.getElementById('station-id');
    const badge = document.getElementById('station-locked-badge');
    if (select) {
        const idVal = 'ESTACION-' + stationNum;
        
        // Ensure option exists
        const exists = Array.from(select.options).some(opt => opt.value === idVal);
        if (!exists) {
            const opt = document.createElement('option');
            opt.value = idVal;
            opt.textContent = `Estación #${stationNum}`;
            select.appendChild(opt);
        }
        
        select.value = idVal;
        select.dispatchEvent(new Event('change'));
        
        // Ensure field is unlocked
        select.disabled = false;
        
        updateStationClientInfo();
        
        switchToTab('panel-inspeccionar');
    }
};

// Switch tabs dynamically via event listeners
function setupTabSwitching() {
    document.querySelectorAll('.tab-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            switchToTab(targetId);
        });
    });
}

// Handle Checkbox "None" exclusions for touch convenience
function setupCheckboxMutualExclusions() {
    // Maintenance "Ninguno" vs others
    const maintNone = document.getElementById('maint-none');
    const maintChecks = document.querySelectorAll('input[name="maintenance"]');
    
    if (maintNone) {
        maintNone.addEventListener('change', () => {
            if (maintNone.checked) {
                maintChecks.forEach(cb => {
                    if (cb !== maintNone) cb.checked = false;
                });
            }
        });
        
        maintChecks.forEach(cb => {
            if (cb !== maintNone) {
                cb.addEventListener('change', () => {
                    if (cb.checked) maintNone.checked = false;
                });
            }
        });
    }

    // Evidence "Ninguna" vs others
    const evidenceNone = document.getElementById('evidence-none');
    const evidenceChecks = document.querySelectorAll('input[name="evidence"]');
    
    if (evidenceNone) {
        evidenceNone.addEventListener('change', () => {
            if (evidenceNone.checked) {
                evidenceChecks.forEach(cb => {
                    if (cb !== evidenceNone) cb.checked = false;
                });
            }
        });
        
        evidenceChecks.forEach(cb => {
            if (cb !== evidenceNone) {
                cb.addEventListener('change', () => {
                    if (cb.checked) evidenceNone.checked = false;
                });
            }
        });
    }
}

// Save inspection locally
function saveInspection() {
    const select = document.getElementById('station-id');
    const station = select.value;
    
    // Get checked radio for consumption
    const consumptionRadio = document.querySelector('input[name="bait-consumption"]:checked');
    const consumption = consumptionRadio ? consumptionRadio.value : '0%';
    
    // Get checked values for maintenance
    const maintenance = [];
    document.querySelectorAll('input[name="maintenance"]:checked').forEach(cb => {
        maintenance.push(cb.value);
    });
    
    // Get checked values for evidence
    const evidence = [];
    document.querySelectorAll('input[name="evidence"]:checked').forEach(cb => {
        evidence.push(cb.value);
    });
    
    const notes = document.getElementById('inspection-notes').value.trim();
    
    if (!station) return alert("Selecciona una estación.");
    
    // Check installation mode for GPS recording and accuracy verification
    const chkInstall = document.getElementById('chk-install-mode');
    const isInstallationMode = chkInstall ? chkInstall.checked : false;
    
    let coordsToSave = null;
    if (isInstallationMode) {
        if (!lastKnownGPS) {
            if (!confirm("⚠️ El GPS aún no ha obtenido coordenadas (señal débil o permisos denegados). ¿Deseas registrar la estación sin geolocalización?")) {
                return; // Cancel registration
            }
        } else if (lastKnownGPS.accuracy > 20) { // Precision threshold: 20 meters
            if (!confirm(`⚠️ La precisión del GPS es baja (±${lastKnownGPS.accuracy.toFixed(1)} metros). Se recomienda esperar unos segundos a que mejore la señal. ¿Deseas registrar la ubicación actual de todos modos?`)) {
                return; // Cancel registration to retry
            }
            coordsToSave = { ...lastKnownGPS };
        } else {
            coordsToSave = { ...lastKnownGPS };
        }
    }

    const newRecord = {
        id: 'ins_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        station,
        consumption,
        maintenance,
        evidence,
        notes,
        coords: coordsToSave,
        timestamp: new Date().toLocaleString('es-CL'),
        status: 'pendiente'
    };
    
    inspections.push(newRecord);
    localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
    
    // Clear session storage and reset station selection
    sessionStorage.removeItem('last_scanned_station_id');
    if (select) select.disabled = false;

    // Determine client before resetting form
    const stationNum = parseInt(station.replace('ESTACION-', ''), 10);
    let targetClientId = '';
    let targetClientName = '';
    if (!isNaN(stationNum)) {
        const asg = (globalAppData.stationAssignments || []).find(item => {
            const start = parseInt(item.start, 10);
            const end = parseInt(item.end, 10);
            return stationNum >= start && stationNum <= end;
        });
        if (asg) {
            targetClientName = asg.clientName || '';
            if (asg.clientId) {
                targetClientId = asg.clientId;
            } else if (asg.clientName) {
                const c = (globalAppData.clients || []).find(client => client.name === asg.clientName);
                if (c) targetClientId = c.id;
            }
        } else {
            targetClientName = getClientNameForStation(stationNum) || '';
            if (targetClientName) {
                const c = (globalAppData.clients || []).find(client => client.name === targetClientName);
                if (c) targetClientId = c.id;
            }
        }
    }

    // Show premium visual feedback
    alert(`✅ ¡Inspección de ${station} registrada con éxito de forma local!`);
    
    // Clear inputs (except station if locked)
    resetInspectionForm();
    
    // Ensure any open modal is closed
    const detailsModal = document.getElementById('station-details-modal');
    if (detailsModal) detailsModal.style.display = 'none';
    const scannerModal = document.getElementById('scanner-modal');
    if (scannerModal) scannerModal.style.display = 'none';
    const reassignModal = document.getElementById('reassign-modal');
    if (reassignModal) reassignModal.style.display = 'none';

    // Set filter to client if found
    const filterClientIdSelect = document.getElementById('filter-client-id');
    if (filterClientIdSelect) {
        if (targetClientId) {
            filterClientIdSelect.value = targetClientId;
        } else if (targetClientName) {
            const matchingOpt = Array.from(filterClientIdSelect.options).find(o => o.textContent.trim().toLowerCase() === targetClientName.trim().toLowerCase());
            if (matchingOpt) {
                filterClientIdSelect.value = matchingOpt.value;
            }
        }
    }
    
    // Flag station to highlight on the map
    if (!isNaN(stationNum)) {
        window.highlightStationNum = stationNum;
    }

    // Switch to Monitoreo & Mapa panel automatically
    switchToTab('panel-monitoreo');
    updateStationClientInfo();

    // Smoothly scroll to the map section
    setTimeout(() => {
        const mapSection = document.getElementById('monitoreo-map-section') || document.getElementById('monitoreo-map');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (leafletMap) {
            leafletMap.invalidateSize();
        }
    }, 250);

    // Auto-sync after saving if online and logged in
    if (navigator.onLine && currentUser) {
        syncWithCloud(true);
    }
}

function resetInspectionForm() {
    // Reset radio cards
    const defaultRadio = document.querySelector('input[name="bait-consumption"][value="0%"]');
    if (defaultRadio) defaultRadio.checked = true;
    
    // Reset checkboxes
    document.querySelectorAll('input[name="maintenance"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="evidence"]').forEach(cb => cb.checked = false);
    document.getElementById('inspection-notes').value = '';
    
    // Reset cached GPS coordinates
    lastKnownGPS = null;
    
    // Restablecer el selector de estación
    const select = document.getElementById('station-id');
    if (select && !select.disabled) {
        select.value = '';
        select.dispatchEvent(new Event('change'));
    }
}

// Render Monitoreo Panel (Heatmap and Table history)
// Calculate analytics summary per client for the overview cards
function getClientMonitoreoSummary() {
    const clientsData = [];
    
    (globalAppData.clients || []).forEach(client => {
        // Find stations assigned to this client
        const clientStations = [];
        const maxStations = getMaxStationNumber();
        for (let i = 1; i <= maxStations; i++) {
            if (getClientIdForStation(i) === client.id || getClientNameForStation(i) === client.name) {
                clientStations.push(i);
            }
        }
        
        // Skip clients with no station assignments
        if (clientStations.length === 0) return;
        
        let inspectedCount = 0;
        let sumAvgConsumption = 0;
        let sumLastConsumption = 0;
        let criticalCount = 0;
        let trendUpCount = 0;
        let trendDownCount = 0;
        
        clientStations.forEach(stationNum => {
            const stationKey = `ESTACION-${String(stationNum).padStart(2, '0')}`;
            const analytics = calculateStationAnalytics(stationKey);
            
            if (analytics.recordsCount > 0) {
                inspectedCount++;
                sumAvgConsumption += analytics.avg;
                if (analytics.latestRecord) {
                    sumLastConsumption += getConsumptionNumeric(analytics.latestRecord.consumption);
                }
                
                // A station is critical only if it has >= 5 consecutive inspections of >= 75% consumption
                if (isStationCritical(stationKey)) {
                    criticalCount++;
                }
                
                if (analytics.trend === 'up') trendUpCount++;
                else if (analytics.trend === 'down') trendDownCount++;
            }
        });
        
        const avgConsumption = inspectedCount > 0 ? Math.round(sumAvgConsumption / inspectedCount) : 0;
        const lastVisitAvgConsumption = inspectedCount > 0 ? Math.round(sumLastConsumption / inspectedCount) : 0;
        
        let overallTrend = 'stable';
        if (trendUpCount > trendDownCount) overallTrend = 'up';
        else if (trendDownCount > trendUpCount) overallTrend = 'down';
        else if (inspectedCount === 0) overallTrend = 'none';
        
        clientsData.push({
            id: client.id,
            name: client.name,
            address: client.address || 'Sin dirección registrada',
            totalStations: clientStations.length,
            inspectedStations: inspectedCount,
            avgConsumption,
            lastVisitAvgConsumption,
            criticalCount,
            trend: overallTrend
        });
    });
    
    // Sort clients alphabetically by name
    clientsData.sort((a, b) => a.name.localeCompare(b.name));
    return clientsData;
}

// Render Monitoreo Panel (Heatmap and Table history)
function renderMonitoreo() {
    loadLocalInspections();
    
    const pendingCount = inspections.filter(r => r.status === 'pendiente').length;
    document.getElementById('stat-pending-count').innerText = pendingCount;
    
    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    
    const clientsSection = document.getElementById('monitoreo-clients-section');
    const detailSection = document.getElementById('monitoreo-detail-section');
    
    if (!filterClientId) {
        // Show client overview and hide detail section
        if (clientsSection) clientsSection.style.display = 'block';
        if (detailSection) detailSection.style.display = 'none';
        
        // Render clients summary list
        const clientsList = document.getElementById('monitoreo-clients-list');
        if (clientsList) {
            clientsList.innerHTML = '';
            const summaries = getClientMonitoreoSummary();
            
            if (summaries.length === 0) {
                clientsList.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; color: #888; padding: 40px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;">
                        <span style="font-size: 2.2rem; display: block; margin-bottom: 10px;">👥</span>
                        <p style="margin: 0; font-size: 0.95rem; color: #fff; font-weight: 500;">No hay campañas de cebado activas</p>
                        <p style="margin: 5px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">Asigna estaciones a tus clientes desde la ficha o en el Modo Instalación para ver sus resúmenes aquí.</p>
                    </div>
                `;
            } else {
                summaries.forEach(c => {
                    const card = document.createElement('div');
                    card.className = 'client-summary-card glass-panel';
                    card.style.cssText = 'padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255, 255, 255, 0.02); transition: all 0.25s ease; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; min-height: 195px; height: auto; box-sizing: border-box;';
                    
                    // Hover dynamic effects
                    card.addEventListener('mouseenter', () => {
                        card.style.borderColor = 'var(--primary)';
                        card.style.background = 'rgba(59, 130, 246, 0.08)';
                        card.style.transform = 'translateY(-2px)';
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.borderColor = 'rgba(255,255,255,0.08)';
                        card.style.background = 'rgba(255, 255, 255, 0.02)';
                        card.style.transform = 'translateY(0)';
                    });
                    
                    // Set client ID on click to trigger change event
                    card.addEventListener('click', () => {
                        if (filterClientIdSelect) {
                            filterClientIdSelect.value = c.id;
                            filterClientIdSelect.dispatchEvent(new Event('change'));
                        }
                    });
                    
                    card.innerHTML = `
                        <div style="width: 100%;">
                            <h4 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c.name}">
                                👤 ${c.name}
                            </h4>
                            <p style="margin: 4px 0 12px 0; font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${c.address}">
                                📍 ${c.address}
                            </p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                                <div style="background: rgba(255,255,255,0.02); padding: 8px 4px; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.04);">
                                    <span style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Estaciones</span>
                                    <span style="font-size: 0.95rem; font-weight: 700; color: #fff;">${c.inspectedStations}/${c.totalStations}</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.02); padding: 8px 4px; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.04);">
                                    <span style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Últ. Visita</span>
                                    <span style="font-size: 0.95rem; font-weight: 700; color: ${c.lastVisitAvgConsumption > 50 ? '#ef4444' : c.lastVisitAvgConsumption > 20 ? '#fbbf24' : '#10b981'};">${c.lastVisitAvgConsumption}%</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.02); padding: 8px 4px; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.04);">
                                    <span style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Prom. Global</span>
                                    <span style="font-size: 0.95rem; font-weight: 700; color: ${c.avgConsumption > 50 ? '#ef4444' : c.avgConsumption > 20 ? '#fbbf24' : '#10b981'};">${c.avgConsumption}%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <div style="display: flex; gap: 6px; align-items: center;">
                                <span class="sync-badge" style="background: ${c.trend === 'up' ? 'rgba(239, 68, 68, 0.15)' : c.trend === 'down' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)'}; color: ${c.trend === 'up' ? '#f87171' : c.trend === 'down' ? '#34d399' : '#fff'}; font-size: 0.7rem; padding: 2px 6px; border-radius: 12px; font-weight: 600;">
                                    ${c.trend === 'up' ? '📈 Alza' : c.trend === 'down' ? '📉 Baja' : '➡️ Estable'}
                                </span>
                                ${c.criticalCount > 0 ? `<span class="sync-badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; font-size: 0.7rem; padding: 2px 6px; border-radius: 12px; font-weight: 600;">⚠️ ${c.criticalCount} Alertas</span>` : ''}
                            </div>
                            <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; gap: 4px;">Monitorear ➡️</span>
                        </div>
                    `;
                    clientsList.appendChild(card);
                });
            }
        }
        return;
    }
    
    // Show detailed view and update selected client labels
    if (clientsSection) clientsSection.style.display = 'none';
    if (detailSection) detailSection.style.display = 'block';
    
    let filterClientName = '';
    const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
    if (clientObj) filterClientName = clientObj.name;
    
    const clientNameLabel = document.getElementById('monitoreo-selected-client-name');
    if (clientNameLabel) {
        clientNameLabel.innerHTML = `👤 Cliente: <strong>${filterClientName}</strong>${clientObj && clientObj.address ? ` <span style="font-size:0.85rem; color:var(--text-muted); font-weight:400; margin-left: 10px;">(📍 ${clientObj.address})</span>` : ''}`;
    }

    const activeDate = window.currentVisitDate || getTodayDateStr();

    // 1. Gather all stations belonging to this client to compute visit progress
    const clientStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        const clientName = getClientNameForStation(i);
        if (filterClientName && clientName) {
            if (clientName.trim().toLowerCase() === filterClientName.trim().toLowerCase()) {
                clientStations.push(i);
            }
        }
    }

    let reviewedInVisitCount = 0;
    let pendingInVisitCount = 0;
    let nextPendingStationNum = null;

    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const visitRec = getStationVisitRecord(stationKey, activeDate);
        if (visitRec) {
            reviewedInVisitCount++;
        } else {
            pendingInVisitCount++;
            if (nextPendingStationNum === null) {
                nextPendingStationNum = num;
            }
        }
    });

    const totalClientStations = clientStations.length;
    const visitPct = totalClientStations > 0 ? Math.round((reviewedInVisitCount / totalClientStations) * 100) : 0;

    // 2. Render Visit Progress & Route Assistant Container
    const progressContainer = document.getElementById('monitoreo-visit-progress-container');
    if (progressContainer) {
        const todayStr = getTodayDateStr();
        const yesterdayStr = getYesterdayDateStr();
        const isToday = activeDate === todayStr;
        const isYesterday = activeDate === yesterdayStr;
        
        const dateLabel = isToday ? `Hoy (${formatDateDisplay(activeDate)})` : isYesterday ? `Ayer (${formatDateDisplay(activeDate)})` : formatDateDisplay(activeDate);
        const filterMode = window.visitFilterMode || 'all';

        let nextStationHtml = '';
        if (nextPendingStationNum !== null) {
            const nextKey = `ESTACION-${String(nextPendingStationNum).padStart(2, '0')}`;
            nextStationHtml = `
                <div style="display: flex; align-items: center; gap: 8px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); padding: 5px 12px; border-radius: 8px;">
                    <span style="font-size: 0.8rem; color: #fbbf24; font-weight: 600;">🎯 Próxima en ruta: <strong>#${nextPendingStationNum}</strong></span>
                    <button type="button" onclick="quickInspectStation('${nextKey}')" style="background: #f59e0b; color: #1e293b; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                        ⚡ Inspeccionar #${nextPendingStationNum}
                    </button>
                </div>
            `;
        } else if (totalClientStations > 0) {
            nextStationHtml = `
                <div style="display: flex; align-items: center; gap: 6px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); padding: 5px 12px; border-radius: 8px; color: #34d399; font-size: 0.82rem; font-weight: 600;">
                    🎉 ¡100% de estaciones inspeccionadas en esta visita!
                </div>
            `;
        }

        progressContainer.innerHTML = `
            <div class="glass-panel" style="padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.25); background: rgba(15, 23, 42, 0.7); box-shadow: 0 4px 16px rgba(0,0,0,0.25);">
                <!-- Top row: Title and Date Selectors -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-size: 1.15rem;">📋</span>
                        <strong style="color: #fff; font-size: 1rem;">Control de Visita en Terreno</strong>
                        <span style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; font-size: 0.78rem; padding: 2px 8px; border-radius: 6px; font-weight: 600;">
                            📅 ${dateLabel}
                        </span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                        <button type="button" class="btn-visit-filter ${isToday ? 'active-completed' : ''}" onclick="setVisitDate('${todayStr}')" style="padding: 4px 10px; font-size: 0.76rem;">
                            Hoy
                        </button>
                        <button type="button" class="btn-visit-filter ${isYesterday ? 'active-completed' : ''}" onclick="setVisitDate('${yesterdayStr}')" style="padding: 4px 10px; font-size: 0.76rem;">
                            Ayer
                        </button>
                        <input type="date" value="${activeDate}" onchange="setVisitDate(this.value)" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 0.76rem; outline: none; cursor: pointer;" title="Seleccionar fecha específica">
                    </div>
                </div>
                
                <!-- Middle row: Progress Bar -->
                <div style="margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                        <span style="color: #cbd5e1; font-weight: 500;">
                            Progreso de inspección: <strong style="color: #fff;">${reviewedInVisitCount} de ${totalClientStations}</strong> estaciones (${visitPct}%)
                        </span>
                        <span style="color: ${pendingInVisitCount > 0 ? '#fbbf24' : '#34d399'}; font-weight: 600;">
                            ${pendingInVisitCount > 0 ? `⏳ Faltan ${pendingInVisitCount} por inspeccionar` : '✔️ Visita completa'}
                        </span>
                    </div>
                    <div style="width: 100%; height: 9px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
                        <div style="width: ${visitPct}%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 6px; transition: width 0.4s ease;"></div>
                    </div>
                </div>

                <!-- Bottom row: Quick Filter Buttons & Next Recommendation -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <button type="button" class="btn-visit-filter ${filterMode === 'all' ? 'active-all' : ''}" onclick="setVisitFilterMode('all')">
                            🔘 Todas (${totalClientStations})
                        </button>
                        <button type="button" class="btn-visit-filter ${filterMode === 'pending' ? 'active-pending' : ''}" onclick="setVisitFilterMode('pending')" title="Ver solo las estaciones que faltan por inspeccionar en esta visita">
                            ⏳ Faltan por Revisar (${pendingInVisitCount})
                        </button>
                        <button type="button" class="btn-visit-filter ${filterMode === 'completed' ? 'active-completed' : ''}" onclick="setVisitFilterMode('completed')" title="Ver solo las estaciones ya inspeccionadas hoy">
                            ✔️ Listas en Visita (${reviewedInVisitCount})
                        </button>
                    </div>
                    ${nextStationHtml}
                </div>
            </div>
        `;
    }

    // 3. Update Stat KPI Cards
    const statReviewed = document.getElementById('stat-reviewed-count');
    if (statReviewed) statReviewed.innerText = `${reviewedInVisitCount} / ${totalClientStations}`;
    
    const statVisitPending = document.getElementById('stat-visit-pending-count');
    if (statVisitPending) statVisitPending.innerText = pendingInVisitCount;

    // 4. Render Grid of Stations (Heatmap)
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let criticalCount = 0;
    let renderedCellsCount = 0;
    
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        const clientName = getClientNameForStation(i);
        
        // Filter logic by client
        if (filterClientName && clientName) {
            const safeFilter = String(filterClientName).trim().toLowerCase();
            const safeClient = String(clientName).trim().toLowerCase();
            if (safeClient !== safeFilter) continue;
        } else if (filterClientName && !clientName) {
            continue;
        }

        const visitRec = getStationVisitRecord(stationKey, activeDate);
        const isInspectedInVisit = !!visitRec;

        // Filter logic by visitFilterMode
        if (window.visitFilterMode === 'pending' && isInspectedInVisit) continue;
        if (window.visitFilterMode === 'completed' && !isInspectedInVisit) continue;

        renderedCellsCount++;

        // Calculate analytics for trend and average
        const analytics = calculateStationAnalytics(stationKey);
        
        let stateClass = 'station-gray';
        let statusText = 'Pendiente';
        
        if (analytics.recordsCount > 0) {
            const consumption = analytics.lastVal;
            if (consumption === '0%') {
                stateClass = 'station-green';
            } else if (consumption === '25-50%') {
                stateClass = 'station-yellow';
            } else {
                stateClass = 'station-red';
            }
            statusText = `Último: ${consumption}<br>Prom: ${analytics.avg}%`;
            
            if (isStationCritical(stationKey)) {
                criticalCount++;
            }
        } else {
            statusText = 'Sin datos';
        }
        
        let trendIcon = '';
        if (analytics.trend === 'up') trendIcon = '📈';
        else if (analytics.trend === 'down') trendIcon = '📉';
        else if (analytics.trend === 'stable') trendIcon = '➡️';
        
        const cell = document.createElement('div');
        cell.className = `station-cell ${stateClass}`;
        if (isInspectedInVisit) {
            cell.style.borderColor = '#10b981';
            cell.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
        } else {
            cell.style.borderColor = '#f59e0b';
        }
        
        const visitBadgeHtml = isInspectedInVisit 
            ? `<div style="margin-top: 4px;"><span class="visit-badge-inspected">✔️ Hoy ${visitRec.timeStr}</span></div>`
            : `<div style="margin-top: 4px; display: flex; justify-content: center; gap: 4px; align-items: center;">
                 <span class="visit-badge-pending">⏳ PENDIENTE</span>
                 <button type="button" onclick="event.stopPropagation(); quickInspectStation('${stationKey}')" title="Inspeccionar #${numStr}" style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.5); color: #fbbf24; border-radius: 4px; padding: 1px 5px; font-size: 0.68rem; font-weight: 700; cursor: pointer;">⚡</button>
               </div>`;

        const clientLabel = clientName ? `<span style="font-size:0.65rem; color:#aaa; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top:2px; font-weight: 500;">👤 ${clientName}</span>` : '';
        
        cell.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 10px; box-sizing: border-box;">
                <span class="num">${numStr}</span>
                <span class="trend-icon" style="font-size: 0.9rem;">${trendIcon}</span>
            </div>
            <span class="status-lbl" style="font-size: 0.65rem; opacity: 0.95; line-height: 1.2; text-align: center; margin-top: 3px;">
                ${statusText}
            </span>
            ${visitBadgeHtml}
            ${clientLabel}
        `;
        
        cell.addEventListener('click', () => {
            openStationDetails(i);
        });
        
        grid.appendChild(cell);
    }

    if (renderedCellsCount === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted); background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px dashed rgba(255,255,255,0.1);">
                <span>ℹ️ No hay estaciones para mostrar con el filtro actual (${window.visitFilterMode === 'pending' ? '¡Todas ya fueron inspeccionadas en esta visita!' : 'Ninguna inspeccionada aún'}).</span>
            </div>
        `;
    }
    
    const statCriticalCount = document.getElementById('stat-critical-count');
    if (statCriticalCount) {
        statCriticalCount.innerText = criticalCount;
        const criticalCard = document.getElementById('stat-critical-card');
        if (criticalCard) {
            if (criticalCount > 0) {
                criticalCard.style.background = 'rgba(239, 68, 68, 0.08)';
                criticalCard.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                statCriticalCount.style.color = '#f87171';
            } else {
                criticalCard.style.background = 'rgba(16, 185, 129, 0.05)';
                criticalCard.style.borderColor = 'rgba(16, 185, 129, 0.15)';
                statCriticalCount.style.color = '#34d399';
            }
        }
    }
    
    // Draw Activity History List Table
    const tbody = document.getElementById('activity-list');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (inspections.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: #888; padding: 25px;">No hay inspecciones registradas localmente en este dispositivo.</td></tr>`;
        return;
    }
    
    // Show latest records first
    const sorted = [...inspections].reverse();
    let renderedRows = 0;
    
    sorted.forEach(ins => {
        if (!ins || !ins.station || typeof ins.station !== 'string') return;
        if (filterClientName) {
            const num = parseInt(ins.station.replace('ESTACION-', ''), 10);
            const instClient = getClientNameForStation(num);
            if (instClient) {
                const safeFilter = String(filterClientName).trim().toLowerCase();
                const safeClient = String(instClient).trim().toLowerCase();
                if (safeClient !== safeFilter) return;
            } else {
                return;
            }
        }
        
        renderedRows++;
        const tr = document.createElement('tr');
        
        let badge = '';
        if (ins.status === 'pendiente') {
            badge = '<span class="sync-badge pending">⏳ Pendiente</span>';
        } else {
            badge = '<span class="sync-badge synced">✅ Sincronizado</span>';
        }
        
        tr.innerHTML = `
            <td><strong>${ins.station}</strong></td>
            <td><span style="font-size:0.8rem; color:#aaa;">${ins.timestamp}</span></td>
            <td><span style="font-weight:600;">${ins.consumption}</span></td>
            <td>${badge}</td>
        `;
        tbody.appendChild(tr);
    });
    
    if (renderedRows === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: #888; padding: 25px;">No hay inspecciones registradas para el cliente seleccionado.</td></tr>`;
    }
    
    // Render unpositioned list and update map visualization
    populateUnpositionedStationsSelector(filterClientId, filterClientName);
    initOrUpdateMap();
}

// Export data as JSON file download
function exportJSON() {
    loadLocalInspections();
    if (!inspections || inspections.length === 0) return alert("No hay datos para exportar.");
    
    try {
        const jsonStr = JSON.stringify(inspections, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", url);
        downloadAnchor.setAttribute("download", `inspecciones_cebado_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
        alert("Error al exportar JSON: " + e.message);
    }
}

// Export data as CSV file download
function exportCSV() {
    if (inspections.length === 0) return alert("No hay datos para exportar.");
    
    // Excel support for Spanish locale (UTF-8 BOM)
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "ID_Inspeccion,Estacion,Fecha_Hora,Consumo_Cebo,Mantenimiento,Evidencias,Observaciones,Latitud,Longitud,Estado_Sincronizacion\n";
    
    inspections.forEach(ins => {
        const maintStr = (ins.maintenance || []).map(m => m.replace(' (Klerat)', '')).join('; ');
        const evidStr = (ins.evidence || []).join('; ');
        const notesClean = (ins.notes || '').replace(/"/g, '""');
        const lat = ins.coords ? ins.coords.lat : '';
        const lng = ins.coords ? ins.coords.lng : '';
        
        const row = [
            ins.id,
            ins.station,
            ins.timestamp,
            ins.consumption,
            `"${maintStr}"`,
            `"${evidStr}"`,
            `"${notesClean}"`,
            lat,
            lng,
            ins.status
        ].join(',');
        
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", `inspecciones_cebado_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Clear all LocalStorage data with safety confirmation
function clearLocalData() {
    if (inspections.length === 0) return alert("No hay datos locales para limpiar.");
    
    const hasPending = inspections.some(r => r.status === 'pendiente');
    let warningMsg = "¿Estás seguro de que deseas limpiar el historial local del dispositivo? Esta acción eliminará definitivamente todas las inspecciones almacenadas.";
    if (hasPending) {
        warningMsg = "⚠️ ¡ATENCIÓN! Tienes registros PENDIENTES de sincronizar con el servidor en la nube. Si limpias el historial local ahora, estos registros SE PERDERÁN de forma definitiva.\n\n" + warningMsg;
    }
    
    if (confirm(warningMsg)) {
        localStorage.removeItem('stahlgraf_qr_inspecciones');
        inspections = [];
        alert("🧹 Caché local de inspecciones vaciada correctamente.");
        renderMonitoreo();
    }
}

// Helper: Promise wrapper with timeout to prevent hanging UI
function promiseWithTimeout(promise, timeoutMs = 12000, errorMsg = "La conexión con el servidor tardó demasiado. Por favor verifica tu señal de internet e intenta nuevamente.") {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(errorMsg)), timeoutMs))
    ]);
}

// Two-way Sync (Push pending offline logs, and Pull last 100 entries from Cloud)
async function syncWithCloud(silent = false) {
    if (!currentUser || !db) {
        if (!silent) {
            alert("⚠️ Debes iniciar sesión con Google mediante el botón superior para sincronizar con la nube.");
        }
        return;
    }
    
    // Check connection
    if (!navigator.onLine) {
        if (!silent) {
            alert("⚠️ Estás desconectado. Verifica tu conexión a internet.");
        }
        return;
    }
    
    const uid = getActiveUid();
    if (!uid) {
        if (!silent) {
            alert("⚠️ No se pudo obtener la información del usuario activo. Por favor vuelve a iniciar sesión.");
        }
        return;
    }
    
    loadLocalInspections();
    const pending = inspections.filter(r => r && r.id && r.id !== 'assignments_config' && r.station && r.status === 'pendiente');
    
    const spinner = document.getElementById('sync-spinner');
    const syncBtn = document.getElementById('btn-sync-cloud');
    const syncBtnTech = document.getElementById('btn-sync-cloud-tech');
    
    const setSyncingUI = (loading, msg = 'Sincronizando...') => {
        if (spinner) spinner.style.display = loading ? 'inline-block' : 'none';
        if (syncBtn) {
            syncBtn.disabled = loading;
            syncBtn.innerText = loading ? msg : 'Sincronizar con Servidor';
        }
        if (syncBtnTech) {
            syncBtnTech.disabled = loading;
            syncBtnTech.innerText = loading ? ('⏳ ' + msg) : '☁️ Sincronizar con Servidor';
        }
    };
    
    setSyncingUI(true, 'Conectando con servidor...');
    
    try {
        let uploadedCount = 0;
        const userRef = db.collection('users').doc(uid);
        
        // 0. Sync global config (clients & station assignments)
        if (globalAppData && (globalAppData.clients || globalAppData.stationAssignments)) {
            setSyncingUI(true, 'Subiendo directorio y asignaciones...');
            try {
                await promiseWithTimeout(userRef.set(globalAppData, { merge: true }), 8000);
                if (globalAppData.stationAssignments) {
                    await promiseWithTimeout(
                        userRef.collection('inspecciones').doc('assignments_config').set({
                            stationAssignments: globalAppData.stationAssignments
                        }, { merge: true }),
                        8000
                    );
                }
            } catch (gErr) {
                console.warn("Global configuration sync warning:", gErr);
            }
        }
        
        // 1. PUSH: Upload pending local inspections to Firestore individually to avoid batch locks
        if (pending.length > 0) {
            const syncedIds = new Set();
            let pushErrors = [];
            let currentIdx = 0;
            
            for (const item of pending) {
                currentIdx++;
                if (!item.id || item.id === 'assignments_config' || !item.station) continue;
                setSyncingUI(true, `Subiendo ${currentIdx} de ${pending.length}...`);
                const docRef = userRef.collection('inspecciones').doc(item.id);
                try {
                    await promiseWithTimeout(docRef.set({
                        id: String(item.id),
                        station: String(item.station),
                        consumption: item.consumption || '0%',
                        maintenance: Array.isArray(item.maintenance) ? item.maintenance : [],
                        evidence: Array.isArray(item.evidence) ? item.evidence : [],
                        notes: item.notes || '',
                        coords: item.coords || null,
                        timestamp: item.timestamp || new Date().toLocaleString('es-CL'),
                        localTimestamp: item.timestamp || new Date().toLocaleString('es-CL'),
                        syncedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }), 10000, `Tiempo agotado al subir la estación ${item.station}`);
                    
                    syncedIds.add(item.id);
                } catch (itemErr) {
                    console.error(`Error uploading item ${item.id}:`, itemErr);
                    pushErrors.push(`${item.station}: ${itemErr.message}`);
                }
            }
            
            // Update local state to synced for succeeded items
            inspections.forEach(item => {
                if (syncedIds.has(item.id)) {
                    item.status = 'sincronizado';
                }
            });
            localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
            uploadedCount = syncedIds.size;
        }
        
        // 2. PULL: Download historical inspections from Firestore and merge
        setSyncingUI(true, 'Descargando historial...');
        const snapshot = await promiseWithTimeout(
            userRef.collection('inspecciones').get(),
            15000,
            "Error al obtener registros de la nube: Tiempo de espera agotado."
        );
        
        let pulledCount = 0;
        
        snapshot.forEach(doc => {
            if (doc.id === 'assignments_config') return;
            const data = doc.data();
            if (!data || !data.station) return;
            
            const recordId = doc.id;
            
            const pulledRecord = {
                id: recordId,
                station: data.station,
                consumption: data.consumption || '0%',
                maintenance: data.maintenance || [],
                evidence: data.evidence || [],
                notes: data.notes || '',
                coords: data.coords || null,
                timestamp: data.localTimestamp || (data.syncedAt?.seconds ? new Date(data.syncedAt.seconds * 1000).toLocaleString('es-CL') : new Date().toLocaleString('es-CL')),
                status: 'sincronizado'
            };
            
            // Check if record exists locally
            const localIndex = inspections.findIndex(item => item.id === recordId);
            if (localIndex === -1) {
                inspections.push(pulledRecord);
                pulledCount++;
            } else {
                // If it exists locally but was pending, it means it's now synced
                if (inspections[localIndex].status === 'pendiente') {
                    inspections[localIndex].status = 'sincronizado';
                }
                // Merge cloud changes to the local cached record (e.g. manually set coords from PC)
                inspections[localIndex].station = pulledRecord.station;
                inspections[localIndex].consumption = pulledRecord.consumption;
                inspections[localIndex].maintenance = pulledRecord.maintenance;
                inspections[localIndex].evidence = pulledRecord.evidence;
                inspections[localIndex].notes = pulledRecord.notes;
                inspections[localIndex].coords = pulledRecord.coords;
                inspections[localIndex].timestamp = pulledRecord.timestamp;
            }
        });
        
        // Sort chronologically (oldest to newest, as renderMonitoreo reverses it)
        inspections.sort((a, b) => getRecordTimestamp(a) - getRecordTimestamp(b));
        
        localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
        renderMonitoreo();
        
        if (!silent) {
            let msg = "¡Sincronización completada con éxito!";
            if (uploadedCount > 0 || pulledCount > 0) {
                msg += `\n- Subidos: ${uploadedCount} registros pendientes.\n- Descargados: ${pulledCount} registros históricos nuevos.`;
            } else {
                msg += "\nNo había nuevos datos locales ni remotos para transferir.";
            }
            alert(msg);
        }
        
    } catch (err) {
        console.error("Sync failed: ", err);
        if (!silent) {
            alert("Ocurrió un error al sincronizar con Firestore: " + err.message);
        }
    } finally {
        setSyncingUI(false);
    }
}

// Helper: Detect in-app browsers
function isInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (
        ua.indexOf('FBAN') > -1 || 
        ua.indexOf('FBAV') > -1 || 
        ua.indexOf('Instagram') > -1 || 
        ua.indexOf('LINE') > -1 || 
        ua.indexOf('WhatsApp') > -1 || 
        ua.indexOf('Twitter') > -1 || 
        ua.indexOf('Snapchat') > -1 || 
        ua.indexOf('MicroMessenger') > -1 || 
        ua.indexOf('Pinterest') > -1 || 
        ua.indexOf('GSA') > -1 || // Google Search App
        (ua.indexOf('wv') > -1 && ua.indexOf('Android') > -1) || // Android Webview
        (ua.indexOf('iPhone') > -1 && ua.indexOf('Safari') === -1) // iPhone WebView (not Safari)
    );
}

// Helper: Handle auth redirects and show warning banner
function handleAuthRedirects() {
    if (!auth) return;
    
    // Show in-app warning banner if browser is in-app
    const banner = document.getElementById('inapp-warning-banner');
    if (banner && isInAppBrowser()) {
        banner.style.display = 'block';
    }
    
    auth.getRedirectResult()
        .then((result) => {
            if (result.user) {
                console.log("Sesión iniciada correctamente vía redirección:", result.user.email);
            }
        })
        .catch((error) => {
            console.error("Error en redirección de login:", error);
            alert("Error al iniciar sesión vía redirección: " + error.message);
        });
}

// Helper: Import inspections from JSON file backup
function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) {
                return alert("El archivo de respaldo JSON debe ser una lista de inspecciones válida.");
            }
            
            loadLocalInspections(); // ensure latest array loaded
            
            let addedCount = 0;
            let skippedCount = 0;
            
            importedData.forEach(item => {
                if (item.station && item.consumption && item.timestamp) {
                    // Check duplicate by ID or station+timestamp
                    const exists = inspections.some(existing => existing.id === item.id || (existing.station === item.station && existing.timestamp === item.timestamp));
                    if (!exists) {
                        const newItem = { ...item };
                        if (!newItem.id) {
                            newItem.id = 'ins_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                        }
                        // Mark as pending since it comes from offline environment
                        newItem.status = 'pendiente';
                        inspections.push(newItem);
                        addedCount++;
                    } else {
                        skippedCount++;
                    }
                } else {
                    skippedCount++;
                }
            });
            
            if (addedCount > 0) {
                inspections.sort((a, b) => getRecordTimestamp(a) - getRecordTimestamp(b));
                localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
                renderMonitoreo();
                alert(`📥 Importación completada:\n- ${addedCount} inspecciones agregadas.\n- ${skippedCount} registros omitidos (duplicados o inválidos).`);
            } else {
                alert(`ℹ️ No se agregaron nuevos registros. ${skippedCount} registros omitidos por duplicidad o formato inválido.`);
            }
            
        } catch (err) {
            console.error("Error parsing JSON backup file:", err);
            alert("Error al procesar el archivo JSON. Verifica que sea un archivo de respaldo válido.");
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}



// Helper: Get chronological timestamp from record for reliable sorting/filtering
function getRecordTimestamp(record) {
    if (!record || !record.id) return 0;
    try {
        // IDs are structured as: ins_TIMESTAMP_RANDOM
        const parts = record.id.split('_');
        if (parts.length >= 2) {
            const ts = parseInt(parts[1], 10);
            if (!isNaN(ts)) return ts;
        }
    } catch (e) {}
    
    // Fallback: try to parse string timestamp
    try {
        const d = new Date(record.timestamp);
        if (!isNaN(d.getTime())) return d.getTime();
    } catch (e) {}
    
    return 0;
}

// ==========================================
// VISIT CONTROL & FIELD PROGRESS UTILITIES
// ==========================================
function getTodayDateStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getYesterdayDateStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    } catch(e) {}
    return dateStr;
}

// Active visit date (defaults to today) and visual filter ('all' | 'pending' | 'completed')
window.currentVisitDate = getTodayDateStr();
window.visitFilterMode = 'all';

function isRecordOnDate(record, dateStr) {
    const ts = getRecordTimestamp(record);
    if (!ts) return false;
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}` === dateStr;
}

function getStationVisitRecord(stationKey, targetDate = null) {
    const dateStr = targetDate || window.currentVisitDate || getTodayDateStr();
    const recs = (inspections || []).filter(r => r.station === stationKey && isRecordOnDate(r, dateStr));
    if (recs.length === 0) return null;
    const sorted = [...recs].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
    const latest = sorted[0];
    const ts = getRecordTimestamp(latest);
    const timeStr = ts ? new Date(ts).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : '';
    return {
        record: latest,
        timeStr: timeStr,
        consumption: latest.consumption
    };
}

window.setVisitDate = function(dateStr) {
    if (!dateStr) return;
    window.currentVisitDate = dateStr;
    renderMonitoreo();
    generateStationDropdown(true);
};

window.setVisitFilterMode = function(mode) {
    window.visitFilterMode = mode;
    renderMonitoreo();
};

window.quickInspectStation = function(stationKey) {
    const stationNum = parseInt(stationKey.replace('ESTACION-', ''), 10);
    const select = document.getElementById('station-id');
    if (select) {
        select.disabled = false;
        const exists = Array.from(select.options).some(o => o.value === stationKey);
        if (!exists) {
            const opt = document.createElement('option');
            opt.value = stationKey;
            const clientName = getClientNameForStation(stationNum);
            opt.textContent = clientName ? `Estación #${String(stationNum).padStart(2, '0')} - ${clientName}` : `Estación #${String(stationNum).padStart(2, '0')}`;
            select.appendChild(opt);
        }
        select.value = stationKey;
        select.dispatchEvent(new Event('change'));
        updateStationClientInfo();
        switchToTab('panel-inspeccionar');
    }
};

// Helper: Calculate max station count dynamically based on assignments & records
function getMaxStationNumber() {
    let max = 15; // default floor minimum
    
    // Check local inspections
    inspections.forEach(item => {
        const num = parseInt(item.station.replace('ESTACION-', ''), 10);
        if (!isNaN(num) && num > max) max = num;
    });
    
    // Check assignments
    const assignments = globalAppData.stationAssignments || [];
    assignments.forEach(item => {
        const startNum = parseInt(item.start, 10);
        const endNum = parseInt(item.end, 10);
        if (!isNaN(startNum) && startNum > max) max = startNum;
        if (!isNaN(endNum) && endNum > max) max = endNum;
    });
    
    return max;
}

// Helper: Find client name linked to a specific station number
function getClientNameForStation(stationNum) {
    if (!globalAppData.stationAssignments) return null;
    
    const assignment = globalAppData.stationAssignments.find(item => {
        const start = parseInt(item.start, 10);
        const end = parseInt(item.end, 10);
        return stationNum >= start && stationNum <= end;
    });
    
    return assignment ? assignment.clientName : null;
}

// Helper: Populate client selector dropdown inside the assignment form
function populateClientsDropdown() {
    const select = document.getElementById('assign-client-id');
    const selectInstall = document.getElementById('install-client-id');
    const selectFilter = document.getElementById('filter-client-id');
    const selectReassign = document.getElementById('reassign-client-select');
    if (!select && !selectInstall && !selectFilter && !selectReassign) return;
    
    const clients = globalAppData.clients || [];
    const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
    
    if (select) {
        select.innerHTML = '';
        if (clients.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = '⚠️ Sin clientes registrados (ve al Directorio de Clientes)';
            select.appendChild(opt);
        } else {
            sortedClients.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name;
                select.appendChild(opt);
            });
        }
        updateClientCurrentRangesHint();
    }
    
    if (selectInstall) {
        selectInstall.innerHTML = '';
        if (clients.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = '⚠️ Sin clientes registrados (ve al Directorio de Clientes)';
            selectInstall.appendChild(opt);
        } else {
            sortedClients.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name;
                selectInstall.appendChild(opt);
            });
        }
    }
    
    if (selectFilter) {
        const currentVal = selectFilter.value;
        selectFilter.innerHTML = '';
        
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = '📋 Mostrar Todos los Clientes';
        selectFilter.appendChild(defaultOpt);
        
        sortedClients.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            selectFilter.appendChild(opt);
        });
        
        if (currentVal && Array.from(selectFilter.options).some(o => o.value === currentVal)) {
            selectFilter.value = currentVal;
        }
    }
    
    if (selectReassign) {
        selectReassign.innerHTML = '';
        
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = '❌ Sin Cliente (Desvincular)';
        selectReassign.appendChild(defaultOpt);
        
        sortedClients.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            selectReassign.appendChild(opt);
        });
    }
}

// Helper: Calculate stations availability, gaps between assigned ranges, and next free numbers
function getStationAvailability() {
    const assignments = globalAppData.stationAssignments || [];
    
    // Collect all occupied station numbers and map station -> { clientId, clientName }
    const occupiedMap = new Map();
    let maxAssigned = 0;
    
    assignments.forEach(asg => {
        const s = parseInt(asg.start, 10);
        const e = parseInt(asg.end, 10);
        if (!isNaN(s) && !isNaN(e) && s > 0 && e >= s) {
            for (let i = s; i <= e; i++) {
                occupiedMap.set(i, {
                    clientId: asg.clientId,
                    clientName: asg.clientName
                });
            }
            if (e > maxAssigned) maxAssigned = e;
        }
    });
    
    // Also consider max station from local inspections
    let maxFromInspections = 0;
    if (typeof inspections !== 'undefined' && Array.isArray(inspections)) {
        inspections.forEach(item => {
            const num = parseInt((item.station || '').replace('ESTACION-', ''), 10);
            if (!isNaN(num) && num > maxFromInspections) maxFromInspections = num;
        });
    }
    
    const maxGlobal = Math.max(maxAssigned, maxFromInspections, maxAssigned > 0 ? maxAssigned : 15);
    
    // Identify available gaps between 1 and maxGlobal
    const availableGaps = [];
    const stripBlocks = [];
    let currentBlock = null;
    
    for (let i = 1; i <= maxGlobal; i++) {
        const occ = occupiedMap.get(i);
        const isFree = !occ;
        const blockType = isFree ? 'free' : 'assigned';
        const clientName = occ ? occ.clientName : null;
        const clientId = occ ? occ.clientId : null;
        
        if (!currentBlock) {
            currentBlock = {
                type: blockType,
                start: i,
                end: i,
                count: 1,
                clientName,
                clientId
            };
        } else {
            const sameGroup = (currentBlock.type === blockType) && 
                (blockType === 'free' || (currentBlock.clientName === clientName && currentBlock.clientId === clientId));
            
            if (sameGroup) {
                currentBlock.end = i;
                currentBlock.count++;
            } else {
                stripBlocks.push(currentBlock);
                if (currentBlock.type === 'free') {
                    availableGaps.push({ ...currentBlock });
                }
                currentBlock = {
                    type: blockType,
                    start: i,
                    end: i,
                    count: 1,
                    clientName,
                    clientId
                };
            }
        }
    }
    
    if (currentBlock) {
        stripBlocks.push(currentBlock);
        if (currentBlock.type === 'free') {
            availableGaps.push({ ...currentBlock });
        }
    }
    
    const totalAssigned = occupiedMap.size;
    const totalGaps = availableGaps.reduce((acc, g) => acc + g.count, 0);
    const nextFree = maxAssigned > 0 ? (maxAssigned + 1) : 1;
    
    return {
        maxGlobal,
        maxAssigned,
        totalAssigned,
        totalGaps,
        availableGaps,
        stripBlocks,
        nextFree,
        occupiedMap
    };
}

// Action: Render Available Ranges and Mini-Occupation Strip
function renderAvailableRanges() {
    const metricsBar = document.getElementById('availability-metrics-bar');
    const nextBanner = document.getElementById('next-station-banner');
    const container = document.getElementById('available-ranges-container');
    const stripContainer = document.getElementById('visual-occupation-container');
    if (!container) return;
    
    const availability = getStationAvailability();
    
    // 1. Render Metrics Bar
    if (metricsBar) {
        metricsBar.innerHTML = `
            <div style="background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 6px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
                <span style="color: #60a5fa; font-weight: 700; font-size: 0.95rem;">${availability.totalAssigned}</span>
                <span style="color: var(--text-muted);">Asignadas</span>
            </div>
            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 6px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
                <span style="color: #34d399; font-weight: 700; font-size: 0.95rem;">${availability.totalGaps}</span>
                <span style="color: var(--text-muted);">Libres en Huecos</span>
            </div>
            <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 6px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
                <span style="color: #fbbf24; font-weight: 700; font-size: 0.95rem;">#${availability.nextFree}+</span>
                <span style="color: var(--text-muted);">Siguiente Nueva</span>
            </div>
        `;
    }

    // 2. Render Prominent Next Station Banner
    if (nextBanner) {
        if (availability.totalAssigned > 0) {
            nextBanner.innerHTML = `
                <div class="available-gap-item" style="display: flex; justify-content: space-between; align-items: center; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 10px; padding: 12px 14px;">
                    <div>
                        <div style="font-weight: 700; color: #60a5fa; font-size: 0.95rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            <span>🚀 Próxima Estación Libre:</span>
                            <span style="color: #fff; background: rgba(59, 130, 246, 0.25); padding: 2px 8px; border-radius: 6px; font-weight: 700;">#${availability.nextFree} en adelante</span>
                        </div>
                        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 3px;">
                            Libre para iniciar nuevos lotes continuos sin colisiones
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="useNextAvailableStation(${availability.nextFree})" title="Comenzar desde la estación #${availability.nextFree}" style="padding: 6px 12px; font-size: 0.8rem; background: #3b82f6; color: #fff; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 600; white-space: nowrap;">
                        ⚡ Iniciar en #${availability.nextFree}
                    </button>
                </div>
            `;
        } else {
            nextBanner.innerHTML = '';
        }
    }
    
    // 3. Render Available Gaps List
    if (availability.totalAssigned === 0) {
        container.innerHTML = `
            <div style="padding: 14px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; margin-bottom: 10px;">
                <div style="font-weight: 600; color: #34d399; font-size: 0.92rem; margin-bottom: 4px;">
                    🟢 Todas las estaciones disponibles
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
                    Aún no hay estaciones asignadas a clientes. Puedes comenzar asignando desde la estación #1.
                </div>
                <button type="button" class="btn btn-secondary" onclick="useAvailableRange(1, 15)" style="padding: 6px 12px; font-size: 0.78rem; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; cursor: pointer;">
                    ⚡ Asignar lote inicial (1 al 15)
                </button>
            </div>
        `;
    } else if (availability.availableGaps.length === 0) {
        container.innerHTML = `
            <div style="padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; color: var(--text-muted); font-size: 0.82rem; margin-bottom: 8px; text-align: center;">
                ✨ No hay huecos libres entre estaciones asignadas (todas consecutivas del 1 al ${availability.maxAssigned}).
            </div>
        `;
    } else {
        container.innerHTML = availability.availableGaps.map(gap => `
            <div class="available-gap-item" style="display: flex; justify-content: space-between; align-items: center; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 10px 12px; margin-bottom: 8px;">
                <div>
                    <div style="font-weight: 600; color: #34d399; font-size: 0.92rem;">
                        🟢 Estaciones ${gap.start === gap.end ? '#' + gap.start : gap.start + ' al ' + gap.end}
                    </div>
                    <div style="font-size: 0.76rem; color: var(--text-muted);">
                        ${gap.count === 1 ? '1 estación libre disponible en este hueco' : gap.count + ' estaciones libres disponibles en este hueco'}
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" onclick="useAvailableRange(${gap.start}, ${gap.end})" title="Cargar este rango en el formulario" style="padding: 5px 10px; font-size: 0.78rem; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 600;">
                    ⚡ Usar Rango
                </button>
            </div>
        `).join('');
    }
    
    // 4. Render Visual Occupation Strip
    if (stripContainer && availability.stripBlocks.length > 0) {
        const stripHtml = availability.stripBlocks.map(block => {
            if (block.type === 'free') {
                return `
                    <div class="visual-strip-block" onclick="useAvailableRange(${block.start}, ${block.end})" title="Hueco Libre: Estaciones ${block.start} a ${block.end} (${block.count} est.) - Clic para usar" style="background: rgba(16, 185, 129, 0.22); border: 1px solid #10b981; color: #34d399; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; white-space: nowrap; cursor: pointer; font-weight: 600;">
                        🟢 ${block.start === block.end ? '#' + block.start : block.start + '-' + block.end} (${block.count})
                    </div>
                `;
            } else {
                const safeName = block.clientName || 'Asignado';
                const truncName = safeName.length > 12 ? safeName.substring(0, 10) + '..' : safeName;
                return `
                    <div class="visual-strip-block" title="Asignado a: ${safeName} (Estaciones ${block.start} a ${block.end}, total ${block.count} est.)" style="background: rgba(59, 130, 246, 0.22); border: 1px solid #3b82f6; color: #93c5fd; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; white-space: nowrap; cursor: default;">
                        🔵 ${block.start === block.end ? '#' + block.start : block.start + '-' + block.end} (${truncName})
                    </div>
                `;
            }
        }).join('');
        
        stripContainer.innerHTML = `
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span>🗺️ <strong>Línea de Ocupación Visual</strong> (Estaciones 1 al ${availability.maxGlobal}):</span>
                <span style="font-size: 0.72rem; color: var(--text-muted);">🟢 Libre | 🔵 Asignado</span>
            </div>
            <div class="visual-station-strip" style="display: flex; gap: 5px; overflow-x: auto; padding: 4px 0 6px 0; scrollbar-width: thin;">
                ${stripHtml}
                <div class="visual-strip-block" onclick="useNextAvailableStation(${availability.nextFree})" title="Nuevo Lote: Estación #${availability.nextFree} en adelante - Clic para iniciar" style="background: rgba(245, 158, 11, 0.15); border: 1px dashed #f59e0b; color: #fbbf24; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; white-space: nowrap; cursor: pointer; font-weight: 600;">
                    🚀 #${availability.nextFree}+
                </div>
            </div>
        `;
    } else if (stripContainer) {
        stripContainer.innerHTML = '';
    }
}

// Helper: Show currently assigned ranges for the client selected in assign-client-id
function updateClientCurrentRangesHint() {
    const select = document.getElementById('assign-client-id');
    const hintDiv = document.getElementById('assign-client-current-info');
    if (!select || !hintDiv) return;
    
    const clientId = select.value;
    const clientOption = select.options[select.selectedIndex];
    const clientName = clientOption ? clientOption.textContent : '';
    
    if (!clientId) {
        hintDiv.style.display = 'none';
        return;
    }
    
    const assignments = (globalAppData.stationAssignments || []).filter(asg => 
        (clientId && asg.clientId === clientId) || (!clientId && asg.clientName === clientName) || (asg.clientName === clientName)
    );
    
    if (assignments.length === 0) {
        hintDiv.style.display = 'block';
        hintDiv.innerHTML = `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 8px 12px; font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
                <span>ℹ️ <strong>${clientName}</strong> aún no tiene estaciones asignadas.</span>
            </div>
        `;
        return;
    }
    
    const sorted = assignments.map(a => ({
        start: parseInt(a.start, 10),
        end: parseInt(a.end, 10),
        count: Math.max(0, parseInt(a.end, 10) - parseInt(a.start, 10) + 1)
    })).filter(a => !isNaN(a.start) && !isNaN(a.end)).sort((a, b) => a.start - b.start);
    
    const totalEst = sorted.reduce((sum, r) => sum + r.count, 0);
    const rangesStr = sorted.map(r => r.start === r.end ? `#${r.start}` : `${r.start} al ${r.end}`).join(', ');
    
    hintDiv.style.display = 'block';
    hintDiv.innerHTML = `
        <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 8px; padding: 8px 12px; font-size: 0.82rem; color: #93c5fd; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
            <div>
                <strong>👤 ${clientName}</strong> tiene asignadas: 
                <span style="font-weight: 600; color: #fff;">Estaciones ${rangesStr}</span>
            </div>
            <div style="background: rgba(59, 130, 246, 0.2); padding: 2px 8px; border-radius: 10px; font-weight: 700; color: #60a5fa; font-size: 0.78rem;">
                Total: ${totalEst} est.
            </div>
        </div>
    `;
}

// Action: Quick-populate inputs from available range
function useAvailableRange(start, end) {
    const startInput = document.getElementById('assign-start');
    const endInput = document.getElementById('assign-end');
    if (startInput && endInput) {
        startInput.value = start;
        endInput.value = end;
        startInput.focus();
        startInput.style.borderColor = '#10b981';
        endInput.style.borderColor = '#10b981';
        setTimeout(() => {
            startInput.style.borderColor = '';
            endInput.style.borderColor = '';
        }, 1200);
        
        const formElem = document.getElementById('assignment-form');
        if (formElem) {
            formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Action: Quick-populate start input from next free station
function useNextAvailableStation(nextNum) {
    const startInput = document.getElementById('assign-start');
    const endInput = document.getElementById('assign-end');
    if (startInput && endInput) {
        startInput.value = nextNum;
        endInput.value = nextNum;
        endInput.focus();
        endInput.select();
        startInput.style.borderColor = '#3b82f6';
        endInput.style.borderColor = '#3b82f6';
        setTimeout(() => {
            startInput.style.borderColor = '';
            endInput.style.borderColor = '';
        }, 1200);
        
        const formElem = document.getElementById('assignment-form');
        if (formElem) {
            formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Action: Pre-select client and focus assignment form from grouped list
function prepareAssignForClient(clientId, clientNameEscaped) {
    const clientName = decodeURIComponent(clientNameEscaped);
    const clientSelect = document.getElementById('assign-client-id');
    if (clientSelect) {
        if (clientId && Array.from(clientSelect.options).some(o => o.value === clientId)) {
            clientSelect.value = clientId;
        } else {
            const opt = Array.from(clientSelect.options).find(o => o.textContent === clientName);
            if (opt) clientSelect.value = opt.value;
        }
        updateClientCurrentRangesHint();
    }
    
    // Auto-suggest first available gap or next free station
    const availability = getStationAvailability();
    const startInput = document.getElementById('assign-start');
    const endInput = document.getElementById('assign-end');
    if (startInput && endInput) {
        if (availability.availableGaps.length > 0) {
            startInput.value = availability.availableGaps[0].start;
            endInput.value = availability.availableGaps[0].end;
        } else {
            startInput.value = availability.nextFree;
            endInput.value = availability.nextFree;
        }
        startInput.focus();
    }
    
    const formElem = document.getElementById('assignment-form');
    if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Action: Merge touching/contiguous ranges for a client
function mergeClientContiguousRanges(clientId, clientNameEscaped) {
    const clientName = decodeURIComponent(clientNameEscaped);
    if (!globalAppData.stationAssignments) return;
    
    const clientAsgs = globalAppData.stationAssignments.filter(asg => 
        (clientId && asg.clientId === clientId) || (!clientId && asg.clientName === clientName) || (asg.clientName === clientName)
    );
    
    if (clientAsgs.length <= 1) return;
    
    const sorted = clientAsgs.map(a => ({
        id: a.id,
        clientId: a.clientId,
        clientName: a.clientName,
        start: parseInt(a.start, 10),
        end: parseInt(a.end, 10)
    })).filter(a => !isNaN(a.start) && !isNaN(a.end)).sort((a, b) => a.start - b.start);
    
    const merged = [];
    sorted.forEach(curr => {
        if (merged.length === 0) {
            merged.push({ ...curr });
        } else {
            const prev = merged[merged.length - 1];
            if (curr.start <= prev.end + 1) {
                prev.end = Math.max(prev.end, curr.end);
            } else {
                merged.push({ ...curr });
            }
        }
    });
    
    if (merged.length === clientAsgs.length) {
        alert("No hay rangos continuos o superpuestos para unir en este cliente.");
        return;
    }
    
    const otherAssignments = globalAppData.stationAssignments.filter(asg => 
        !((clientId && asg.clientId === clientId) || (!clientId && asg.clientName === clientName) || (asg.clientName === clientName))
    );
    
    const newClientAsgs = merged.map((m, idx) => ({
        id: 'asg_' + Date.now() + '_' + idx,
        clientId: clientId || m.clientId,
        clientName: clientName || m.clientName,
        start: m.start,
        end: m.end
    }));
    
    globalAppData.stationAssignments = [...otherAssignments, ...newClientAsgs];
    saveGlobalAppData();
    
    generateStationDropdown();
    renderAssignmentsList();
    renderMonitoreo();
    updateStationClientInfo();
    updateClientCurrentRangesHint();
    
    alert(`✅ Se unieron los rangos continuos de ${clientName} con éxito.`);
}

// Action: Delete all station assignments for a specific client
function deleteAllAssignmentsForClient(clientId, clientNameEscaped) {
    const clientName = decodeURIComponent(clientNameEscaped);
    if (!confirm(`¿Estás seguro de que deseas eliminar TODAS las asignaciones de estaciones para "${clientName}"?`)) return;
    
    if (globalAppData.stationAssignments) {
        globalAppData.stationAssignments = globalAppData.stationAssignments.filter(asg => 
            !((clientId && asg.clientId === clientId) || (!clientId && asg.clientName === clientName) || (asg.clientName === clientName))
        );
        saveGlobalAppData();
        
        generateStationDropdown();
        renderAssignmentsList();
        renderMonitoreo();
        updateStationClientInfo();
        updateClientCurrentRangesHint();
    }
}

// Action: Register new station range assignment
function registerAssignment() {
    const clientSelect = document.getElementById('assign-client-id');
    if (!clientSelect) return;
    const clientId = clientSelect.value;
    const clientOption = clientSelect.options[clientSelect.selectedIndex];
    const clientName = clientOption ? clientOption.textContent : '';
    
    const startVal = document.getElementById('assign-start').value;
    const endVal = document.getElementById('assign-end').value;
    
    if (!clientId) return alert("Por favor selecciona un cliente.");
    if (!startVal || !endVal) return alert("Por favor ingresa la estación inicial y final.");
    
    const start = parseInt(startVal, 10);
    const end = parseInt(endVal, 10);
    
    if (isNaN(start) || isNaN(end) || start <= 0 || end <= 0) {
        return alert("Los números de estación deben ser mayores a 0.");
    }
    
    if (start > end) {
        return alert("La estación inicial no puede ser mayor que la estación final.");
    }
    
    // Check overlap with existing assignments
    const assignments = globalAppData.stationAssignments || [];
    const overlap = assignments.find(item => {
        const s = parseInt(item.start, 10);
        const e = parseInt(item.end, 10);
        return (start <= e && end >= s);
    });
    
    if (overlap) {
        const isSameClient = (overlap.clientId && overlap.clientId === clientId) || 
                             (!overlap.clientId && overlap.clientName === clientName) ||
                             (overlap.clientName === clientName);
        
        if (isSameClient) {
            const mergedStart = Math.min(start, parseInt(overlap.start, 10));
            const mergedEnd = Math.max(end, parseInt(overlap.end, 10));
            const confirmMerge = confirm(
                `ℹ️ El rango ${start} - ${end} se superpone con una asignación existente de ${overlap.clientName} (Rango: ${overlap.start} al ${overlap.end}).\n\n` +
                `¿Deseas fusionar y ampliar ambos rangos automáticamente en uno solo (${mergedStart} al ${mergedEnd})?`
            );
            if (confirmMerge) {
                overlap.start = mergedStart;
                overlap.end = mergedEnd;
                saveGlobalAppData();
                
                document.getElementById('assign-start').value = '';
                document.getElementById('assign-end').value = '';
                generateStationDropdown();
                renderAssignmentsList();
                renderMonitoreo();
                updateStationClientInfo();
                updateClientCurrentRangesHint();
                
                alert(`✅ Rango ampliado con éxito a ${mergedStart} - ${mergedEnd} para ${clientName}.`);
                return;
            } else {
                return;
            }
        } else {
            if (!confirm(
                `⚠️ CONFLICTO DE ASIGNACIÓN:\n` +
                `El rango ${start} - ${end} se cruza con estaciones ya asignadas a OTRO cliente:\n` +
                `Cliente: ${overlap.clientName} (Rango: ${overlap.start} - ${overlap.end})\n\n` +
                `¿Deseas registrarla de todas formas? (Puede generar inconsistencias de duplicidad)`
            )) {
                return;
            }
        }
    }
    
    // Check if contiguous with an existing range of the same client
    const contiguous = assignments.find(item => {
        const isSame = (item.clientId && item.clientId === clientId) || 
                       (!item.clientId && item.clientName === clientName) ||
                       (item.clientName === clientName);
        if (!isSame) return false;
        const s = parseInt(item.start, 10);
        const e = parseInt(item.end, 10);
        return (start === e + 1 || end === s - 1);
    });
    
    if (contiguous) {
        const mergedStart = Math.min(start, parseInt(contiguous.start, 10));
        const mergedEnd = Math.max(end, parseInt(contiguous.end, 10));
        const confirmContiguous = confirm(
            `ℹ️ El rango ${start} - ${end} es consecutivo con el rango existente de ${clientName} (${contiguous.start} - ${contiguous.end}).\n\n` +
            `¿Deseas unir ambos rangos en uno solo continuo (${mergedStart} al ${mergedEnd})?`
        );
        if (confirmContiguous) {
            contiguous.start = mergedStart;
            contiguous.end = mergedEnd;
            saveGlobalAppData();
            
            document.getElementById('assign-start').value = '';
            document.getElementById('assign-end').value = '';
            generateStationDropdown();
            renderAssignmentsList();
            renderMonitoreo();
            updateStationClientInfo();
            updateClientCurrentRangesHint();
            
            alert(`✅ Rango de estaciones unido exitosamente (${mergedStart} al ${mergedEnd}) para ${clientName}.`);
            return;
        }
    }
    
    const newAssignment = {
        id: 'asg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        clientId,
        clientName,
        start,
        end
    };
    
    if (!globalAppData.stationAssignments) {
        globalAppData.stationAssignments = [];
    }
    
    globalAppData.stationAssignments.push(newAssignment);
    saveGlobalAppData();
    
    // Clear range inputs
    document.getElementById('assign-start').value = '';
    document.getElementById('assign-end').value = '';
    
    // Re-render views
    generateStationDropdown();
    renderAssignmentsList();
    renderMonitoreo();
    updateStationClientInfo();
    updateClientCurrentRangesHint();
    
    alert(`✅ Rango de estaciones ${start} a ${end} asignado con éxito a ${clientName}.`);
}

// Action: Render assignments list table grouped by client
function renderAssignmentsList() {
    const tbody = document.getElementById('assignments-list');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    // Refresh available ranges & client hint
    renderAvailableRanges();
    updateClientCurrentRangesHint();
    
    const assignments = globalAppData.stationAssignments || [];
    if (assignments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888; padding:30px;">No hay rangos de estaciones asignados aún. Registra el primer rango arriba.</td></tr>`;
        return;
    }
    
    const searchInput = document.getElementById('search-assignments');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    // Group assignments by client
    const clientMap = new Map();
    
    assignments.forEach(asg => {
        const start = parseInt(asg.start, 10);
        const end = parseInt(asg.end, 10);
        if (isNaN(start) || isNaN(end) || start <= 0) return;
        
        const client = (globalAppData.clients || []).find(c => c.id === asg.clientId || c.name === asg.clientName);
        const clientId = asg.clientId || (client ? client.id : '');
        const clientName = asg.clientName || (client ? client.name : 'Sin Nombre');
        const groupKey = clientId || clientName;
        
        if (!clientMap.has(groupKey)) {
            clientMap.set(groupKey, {
                clientId: clientId,
                clientName: clientName,
                address: client ? client.address : '',
                phone: client ? client.phone : '',
                ranges: []
            });
        }
        
        clientMap.get(groupKey).ranges.push({
            id: asg.id || ('asg_' + start + '_' + end),
            start: start,
            end: end,
            count: Math.max(0, end - start + 1)
        });
    });
    
    const groups = Array.from(clientMap.values());
    
    // Sort ranges inside each client group
    groups.forEach(g => {
        g.ranges.sort((a, b) => a.start - b.start);
        g.totalStations = g.ranges.reduce((acc, r) => acc + r.count, 0);
    });
    
    // Filter by search query if present
    let filteredGroups = groups;
    if (query) {
        filteredGroups = groups.filter(g => {
            const matchesName = g.clientName.toLowerCase().includes(query);
            const matchesAddr = g.address && g.address.toLowerCase().includes(query);
            const queryNum = parseInt(query, 10);
            const matchesNum = !isNaN(queryNum) && g.ranges.some(r => queryNum >= r.start && queryNum <= r.end);
            const matchesRangeText = g.ranges.some(r => String(r.start).includes(query) || String(r.end).includes(query));
            return matchesName || matchesAddr || matchesNum || matchesRangeText;
        });
    }
    
    // Sort clients alphabetically
    filteredGroups.sort((a, b) => a.clientName.localeCompare(b.clientName));
    
    if (filteredGroups.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888; padding:30px;">No se encontraron asignaciones que coincidan con la búsqueda.</td></tr>`;
        return;
    }
    
    filteredGroups.forEach(group => {
        const tr = document.createElement('tr');
        tr.style.verticalAlign = 'top';
        
        // Detect contiguous ranges to offer merge button
        let hasContiguous = false;
        for (let i = 0; i < group.ranges.length - 1; i++) {
            if (group.ranges[i].end + 1 >= group.ranges[i+1].start) {
                hasContiguous = true;
                break;
            }
        }
        
        // Badges for each range
        const rangesHtml = group.ranges.map(r => `
            <div class="range-badge" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 6px 10px; margin: 3px 4px 3px 0;">
                <span style="font-weight: 600; color: #60a5fa; font-size: 0.9rem;">
                    📍 ${r.start === r.end ? 'Estación #' + r.start : 'Estaciones ' + r.start + ' al ' + r.end}
                </span>
                <span style="background: rgba(255,255,255,0.08); color: #cbd5e1; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                    ${r.count} ${r.count === 1 ? 'est.' : 'est.'}
                </span>
                <button type="button" onclick="deleteAssignment('${r.id}')" title="Eliminar solo este rango" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.75rem; padding: 0; line-height: 1;">
                    ✕
                </button>
            </div>
        `).join('');
        
        const mergeBtnHtml = hasContiguous ? `
            <div style="margin-top: 6px;">
                <button type="button" class="btn btn-secondary" onclick="mergeClientContiguousRanges('${group.clientId || ''}', '${encodeURIComponent(group.clientName)}')" style="padding: 4px 8px; font-size: 0.72rem; background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                    🔗 Unir rangos continuos
                </button>
            </div>
        ` : '';
        
        tr.innerHTML = `
            <td style="padding: 14px 15px;">
                <div style="font-weight: 700; color: #fff; font-size: 1rem; margin-bottom: 4px;">
                    👤 ${group.clientName}
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 2px 8px; border-radius: 12px; font-weight: 600;">
                        ${group.totalStations} ${group.totalStations === 1 ? 'estación' : 'estaciones'}
                    </span>
                    <span>•</span>
                    <span>${group.ranges.length} ${group.ranges.length === 1 ? 'rango' : 'rangos'}</span>
                    ${group.address ? `<span title="${group.address}">• 📍 ${group.address.length > 25 ? group.address.substring(0,25) + '...' : group.address}</span>` : ''}
                </div>
            </td>
            <td style="padding: 14px 15px;">
                <div style="display: flex; flex-wrap: wrap; align-items: center;">
                    ${rangesHtml}
                </div>
                ${mergeBtnHtml}
            </td>
            <td style="padding: 14px 15px; text-align: right; white-space: nowrap;">
                <div style="display: inline-flex; gap: 8px; align-items: center;">
                    <button type="button" class="btn btn-secondary" onclick="prepareAssignForClient('${group.clientId || ''}', '${encodeURIComponent(group.clientName)}')" title="Agregar nuevo rango a este cliente" style="padding: 6px 10px; font-size: 0.8rem; background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;">
                        ➕ Asignar
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="deleteAllAssignmentsForClient('${group.clientId || ''}', '${encodeURIComponent(group.clientName)}')" title="Eliminar todas las estaciones de este cliente" style="padding: 6px 10px; font-size: 0.8rem; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;">
                        🗑️ Todo
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Action: Delete station range assignment
function deleteAssignment(id) {
    if (!confirm("¿Deseas eliminar este rango de estaciones?")) return;
    
    if (globalAppData.stationAssignments) {
        globalAppData.stationAssignments = globalAppData.stationAssignments.filter(item => item.id !== id);
        saveGlobalAppData();
        
        generateStationDropdown();
        renderAssignmentsList();
        renderMonitoreo();
        updateStationClientInfo();
        updateClientCurrentRangesHint();
    }
}

// Attach helpers to global window for inline onclick handlers
window.useAvailableRange = useAvailableRange;
window.useNextAvailableStation = useNextAvailableStation;
window.prepareAssignForClient = prepareAssignForClient;
window.deleteAllAssignmentsForClient = deleteAllAssignmentsForClient;
window.mergeClientContiguousRanges = mergeClientContiguousRanges;
window.deleteAssignment = deleteAssignment;

// Helper: Show/hide banner info linking selected station to its assigned client
function updateStationClientInfo() {
    const select = document.getElementById('station-id');
    const infoDiv = document.getElementById('station-client-info');
    if (!select || !infoDiv) return;
    
    const stationValue = select.value;
    if (!stationValue) {
        infoDiv.style.display = 'none';
        return;
    }
    
    const num = parseInt(stationValue.replace('ESTACION-', ''), 10);
    if (isNaN(num)) {
        infoDiv.style.display = 'none';
        return;
    }
    
    let assignment = (globalAppData.stationAssignments || []).find(item => {
        const start = parseInt(item.start, 10);
        const end = parseInt(item.end, 10);
        return num >= start && num <= end;
    });
    
    // Auto-assign in Installation Mode if it has no existing client
    const chkInstall = document.getElementById('chk-install-mode');
    if (!assignment && chkInstall && chkInstall.checked) {
        const installClientSelect = document.getElementById('install-client-id');
        const installClientId = installClientSelect ? installClientSelect.value : '';
        const installClientOption = installClientSelect ? installClientSelect.options[installClientSelect.selectedIndex] : null;
        const installClientName = installClientOption ? installClientOption.textContent : '';
        
        if (installClientId && installClientName) {
            const newAssignment = {
                id: 'asg_' + Date.now(),
                clientId: installClientId,
                clientName: installClientName,
                start: num,
                end: num
            };
            
            if (!globalAppData.stationAssignments) {
                globalAppData.stationAssignments = [];
            }
            globalAppData.stationAssignments.push(newAssignment);
            saveGlobalAppData();
            
            assignment = newAssignment;
            
            // Re-render other displays silently
            generateStationDropdown(true);
            renderAssignmentsList();
            renderMonitoreo();
            
            // Restore selection
            select.value = stationValue;
        }
    }
    
    const visitRec = getStationVisitRecord(stationValue);
    let visitStatusHtml = '';
    if (visitRec) {
        visitStatusHtml = `
            <div style="margin-top: 8px; padding: 6px 10px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; font-size: 0.78rem; color: #34d399; display: flex; align-items: center; gap: 6px;">
                <span>✔️</span>
                <span><strong>Inspeccionada hoy a las ${visitRec.timeStr}</strong> (Consumo: ${visitRec.consumption}). Puedes registrar otra inspección para actualizar sus datos.</span>
            </div>
        `;
    } else {
        visitStatusHtml = `
            <div style="margin-top: 8px; padding: 6px 10px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 6px; font-size: 0.78rem; color: #fbbf24; display: flex; align-items: center; gap: 6px;">
                <span>⏳</span>
                <span><strong>Estación pendiente de inspeccionar</strong> en la visita de hoy.</span>
            </div>
        `;
    }

    if (assignment) {
        const client = (globalAppData.clients || []).find(c => c.id === assignment.clientId || c.name === assignment.clientName);
        const addressText = client && client.address ? ` | 📍 Dirección: ${client.address}` : '';
        infoDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;">
                <div><strong>👤 Cliente:</strong> ${assignment.clientName}${addressText}</div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="openReassignModal(${num})" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px; cursor: pointer; flex-shrink: 0; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; margin: 0;">
                    ✏️ Corregir
                </button>
            </div>
            ${visitStatusHtml}
        `;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;">
                <div style="color: #fbbf24; font-weight: 500;">⚠️ Estación virgen (sin cliente asignado)</div>
                <button type="button" class="btn btn-primary btn-sm" onclick="openReassignModal(${num})" style="padding: 4px 8px; font-size: 0.75rem; border-radius: 6px; cursor: pointer; flex-shrink: 0; margin: 0; background: var(--primary); border: none; color: #fff;">
                    ➕ Vincular Cliente
                </button>
            </div>
            ${visitStatusHtml}
        `;
        infoDiv.style.display = 'block';
    }
}

// Action: Open reassignment modal for a specific station
function openReassignModal(stationNum) {
    const modal = document.getElementById('reassign-modal');
    if (!modal) return;
    
    document.getElementById('reassign-station-num').value = stationNum;
    
    const numStr = String(stationNum).padStart(2, '0');
    document.getElementById('reassign-modal-title').innerText = `✏️ Modificar Estación #${numStr}`;
    
    const currentClientName = getClientNameForStation(stationNum);
    if (currentClientName) {
        document.getElementById('reassign-modal-desc').innerText = `Esta estación está asignada actualmente a: ${currentClientName}. Selecciona otro cliente o desvincula la estación.`;
    } else {
        document.getElementById('reassign-modal-desc').innerText = `Esta estación no tiene asignación. Selecciona un cliente para vincularla.`;
    }
    
    // Set active select option
    const select = document.getElementById('reassign-client-select');
    if (select) {
        const option = Array.from(select.options).find(opt => opt.textContent === currentClientName);
        if (option) {
            select.value = option.value;
        } else {
            select.value = '';
        }
    }
    
    modal.style.display = 'flex';
}

function closeReassignModal() {
    const modal = document.getElementById('reassign-modal');
    if (modal) modal.style.display = 'none';
}

function executeReassign() {
    const stationVal = document.getElementById('reassign-station-num').value;
    const num = parseInt(stationVal, 10);
    if (isNaN(num)) return;
    
    const select = document.getElementById('reassign-client-select');
    const clientId = select.value;
    const option = select.options[select.selectedIndex];
    const clientName = (option && clientId) ? option.textContent : '';
    
    // Split/update range assignments containing this station
    let assignments = globalAppData.stationAssignments || [];
    let newAssignments = [];
    
    assignments.forEach(item => {
        const s = parseInt(item.start, 10);
        const e = parseInt(item.end, 10);
        
        if (num >= s && num <= e) {
            if (s < num) {
                newAssignments.push({
                    id: 'asg_' + Date.now() + '_L_' + Math.floor(Math.random() * 1000),
                    clientId: item.clientId,
                    clientName: item.clientName,
                    start: s,
                    end: num - 1
                });
            }
            if (e > num) {
                newAssignments.push({
                    id: 'asg_' + Date.now() + '_R_' + Math.floor(Math.random() * 1000),
                    clientId: item.clientId,
                    clientName: item.clientName,
                    start: num + 1,
                    end: e
                });
            }
        } else {
            newAssignments.push(item);
        }
    });
    
    if (clientId && clientName) {
        newAssignments.push({
            id: 'asg_' + Date.now() + '_M_' + Math.floor(Math.random() * 1000),
            clientId,
            clientName,
            start: num,
            end: num
        });
    }
    
    globalAppData.stationAssignments = newAssignments;
    saveGlobalAppData();
    
    // Refresh displays
    generateStationDropdown();
    renderAssignmentsList();
    renderMonitoreo();
    updateStationClientInfo();
    
    closeReassignModal();
    alert(`✅ Estación #${String(num).padStart(2, '0')} modificada con éxito.`);
}

// Helper: Map text consumption percentage to numeric value for analytics
function getConsumptionNumeric(value) {
    if (value === '0%') return 0;
    if (value === '25-50%') return 37.5;
    if (value === '75%') return 75;
    if (value === '100%') return 100;
    return 0;
}

// Helper: Check if a station is critical (alert condition)
// An alert is triggered ONLY when a station has more than 4 consecutive inspections (so >= 5 records)
// and all of those most recent 5 inspections have a consumption over 75% ('75%' or '100%')
function isStationCritical(stationKey) {
    const stationRecords = inspections.filter(r => r.station === stationKey);
    // Sort records by timestamp descending (newest first)
    const sortedRecords = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
    
    // Must have more than 4 consecutive inspections (so >= 5 total)
    if (sortedRecords.length < 5) return false;
    
    // Check if all of the last 5 inspections have >= 75% consumption
    const last5 = sortedRecords.slice(0, 5);
    return last5.every(r => r.consumption === '75%' || r.consumption === '100%');
}

// Helper: Calculate consumption average and trend for a station
function calculateStationAnalytics(stationKey) {
    const stationRecords = inspections.filter(r => r.station === stationKey);
    
    // Sort oldest to newest using robust timestamp extraction
    const sortedRecords = [...stationRecords].sort((a, b) => getRecordTimestamp(a) - getRecordTimestamp(b));
    
    if (sortedRecords.length === 0) {
        return {
            avg: 0,
            lastVal: '-',
            trend: 'none', // none, up, down, stable
            recordsCount: 0,
            latestRecord: null
        };
    }
    
    // Calculate average
    let sum = 0;
    sortedRecords.forEach(r => {
        sum += getConsumptionNumeric(r.consumption);
    });
    const avg = Math.round(sum / sortedRecords.length);
    const latestRecord = sortedRecords[sortedRecords.length - 1];
    
    let trend = 'none';
    if (sortedRecords.length >= 2) {
        const lastVal = getConsumptionNumeric(latestRecord.consumption);
        const prevVal = getConsumptionNumeric(sortedRecords[sortedRecords.length - 2].consumption);
        if (lastVal > prevVal) {
            trend = 'up';
        } else if (lastVal < prevVal) {
            trend = 'down';
        } else {
            trend = 'stable';
        }
    }
    
    return {
        avg,
        lastVal: latestRecord.consumption,
        trend,
        recordsCount: sortedRecords.length,
        latestRecord
    };
}

// Action: Open station details modal
function openStationDetails(stationNum) {
    const modal = document.getElementById('station-details-modal');
    if (!modal) return;
    
    const numStr = String(stationNum).padStart(2, '0');
    const stationKey = `ESTACION-${numStr}`;
    
    document.getElementById('detail-station-title').innerText = `Estación #${numStr}`;
    
    // Get client info
    const clientName = getClientNameForStation(stationNum);
    const clientDiv = document.getElementById('detail-station-client');
    if (clientName) {
        const client = (globalAppData.clients || []).find(c => c.id === getClientIdForStation(stationNum) || c.name === clientName);
        const addressText = client && client.address ? ` | 📍 ${client.address}` : '';
        clientDiv.innerHTML = `<strong>👤 Cliente:</strong> ${clientName}${addressText}`;
    } else {
        clientDiv.innerHTML = `⚠️ Sin cliente asignado (Estación virgen)`;
    }
    
    // Calculate analytics
    const analytics = calculateStationAnalytics(stationKey);
    
    // Set KPIs
    document.getElementById('detail-last-consumption').innerText = analytics.lastVal;
    document.getElementById('detail-avg-consumption').innerText = analytics.recordsCount > 0 ? `${analytics.avg}%` : '-%';
    
    // Set Trend Badge
    const trendBadge = document.getElementById('detail-station-trend');
    trendBadge.className = 'sync-badge'; // reset
    if (analytics.trend === 'up') {
        trendBadge.innerHTML = '📈 Alza';
        trendBadge.style.background = 'rgba(239, 68, 68, 0.2)';
        trendBadge.style.color = '#f87171';
    } else if (analytics.trend === 'down') {
        trendBadge.innerHTML = '📉 Baja';
        trendBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        trendBadge.style.color = '#34d399';
    } else if (analytics.trend === 'stable') {
        trendBadge.innerHTML = '➡️ Estable';
        trendBadge.style.background = 'rgba(255, 255, 255, 0.08)';
        trendBadge.style.color = '#fff';
    } else {
        trendBadge.innerHTML = '⚪ Sin Actividad';
        trendBadge.style.background = 'rgba(255, 255, 255, 0.04)';
        trendBadge.style.color = '#888';
    }
    
    // Draw History Table inside Modal
    const tbody = document.getElementById('detail-history-list');
    tbody.innerHTML = '';
    
    const stationRecords = inspections.filter(r => r.station === stationKey);
    const sorted = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a)); // newest first
    
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888; padding: 15px;">No hay inspecciones para esta estación.</td></tr>`;
    } else {
        sorted.forEach(r => {
            const tr = document.createElement('tr');
            const maintStr = (r.maintenance || []).map(m => m.replace(' (Klerat)', '')).join(', ') || 'Ninguno';
            tr.innerHTML = `
                <td style="padding: 8px 10px;">${r.timestamp.split(' ')[0]}</td>
                <td style="padding: 8px 10px; font-weight:600;">${r.consumption}</td>
                <td style="padding: 8px 10px; color:#aaa; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${maintStr}">${maintStr}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    modal.style.display = 'flex';
}

function closeStationDetails() {
    const modal = document.getElementById('station-details-modal');
    if (modal) modal.style.display = 'none';
}

// Helper to get Client ID for station
function getClientIdForStation(stationNum) {
    if (!globalAppData.stationAssignments) return null;
    const assignment = globalAppData.stationAssignments.find(item => {
        const start = parseInt(item.start, 10);
        const end = parseInt(item.end, 10);
        return stationNum >= start && stationNum <= end;
    });
    return assignment ? assignment.clientId : null;
}

// Action: Delete all data of a station (Reset Station)
function resetStationData(stationNum) {
    const numStr = String(stationNum).padStart(2, '0');
    const stationKey = `ESTACION-${numStr}`;
    
    const warning = `🚨 ¿Estás seguro de que deseas REINICIAR COMPLETAMENTE la Estación #${numStr}?\n\nEsta acción eliminará de forma irreversible:\n- Toda la asignación del cliente para esta estación.\n- Todo el historial de inspecciones (${inspections.filter(r => r.station === stationKey).length} reportes) registradas localmente en este dispositivo.`;
    
    if (!confirm(warning)) return;
    if (!confirm("⚠️ CONFIRMACIÓN FINAL: Esta acción no se puede deshacer y borrará los reportes tanto locales como en la nube al sincronizar. ¿Deseas continuar?")) return;
    
    // 1. Remove all local inspections for this station
    inspections = inspections.filter(r => r.station !== stationKey);
    localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
    
    // 2. Remove assignment for this station using Split Range logic
    let assignments = globalAppData.stationAssignments || [];
    let newAssignments = [];
    assignments.forEach(item => {
        const s = parseInt(item.start, 10);
        const e = parseInt(item.end, 10);
        
        if (stationNum >= s && stationNum <= e) {
            if (s < stationNum) {
                newAssignments.push({
                    id: 'asg_' + Date.now() + '_L_' + Math.floor(Math.random() * 1000),
                    clientId: item.clientId,
                    clientName: item.clientName,
                    start: s,
                    end: stationNum - 1
                });
            }
            if (e > stationNum) {
                newAssignments.push({
                    id: 'asg_' + Date.now() + '_R_' + Math.floor(Math.random() * 1000),
                    clientId: item.clientId,
                    clientName: item.clientName,
                    start: stationNum + 1,
                    end: e
                });
            }
        } else {
            newAssignments.push(item);
        }
    });
    globalAppData.stationAssignments = newAssignments;
    saveGlobalAppData();
    
    // 3. Delete from cloud database if online and logged in
    if (currentUser && db) {
        db.collection('users').doc(getActiveUid()).collection('inspecciones')
            .where('station', '==', stationKey)
            .get()
            .then(snap => {
                const batch = db.batch();
                snap.forEach(doc => batch.delete(doc.ref));
                return batch.commit();
            })
            .then(() => console.log(`Cloud inspections deleted for ${stationKey}`))
            .catch(err => console.error("Error deleting cloud inspections:", err));
    }
    
    closeStationDetails();
    
    // Refresh views
    generateStationDropdown();
    renderAssignmentsList();
    renderMonitoreo();
    updateStationClientInfo();
    
    alert(`🧹 Estación #${numStr} ha sido reseteada y dejada virgen.`);
}

// Action: Open transfer station modal
function openTransferModal(stationNum) {
    const modal = document.getElementById('transfer-station-modal');
    if (!modal) return;
    
    closeStationDetails();
    
    document.getElementById('transfer-source-num').value = stationNum;
    
    const numStr = String(stationNum).padStart(2, '0');
    document.getElementById('transfer-source-label').innerText = `Estación #${numStr}`;
    
    // Populate target stations select 1 to 100 excluding source
    const select = document.getElementById('transfer-target-select');
    if (select) {
        select.innerHTML = '';
        for (let i = 1; i <= 100; i++) {
            if (i === stationNum) continue;
            const opt = document.createElement('option');
            opt.value = i;
            
            const targetClient = getClientNameForStation(i);
            const targetNameStr = targetClient ? ` (${targetClient})` : ' (Virgen)';
            opt.textContent = `Estación #${String(i).padStart(2, '0')}${targetNameStr}`;
            select.appendChild(opt);
        }
    }
    
    modal.style.display = 'flex';
}

function closeTransferModal() {
    const modal = document.getElementById('transfer-station-modal');
    if (modal) modal.style.display = 'none';
}

function executeTransfer() {
    const sourceVal = document.getElementById('transfer-source-num').value;
    const sourceNum = parseInt(sourceVal, 10);
    const select = document.getElementById('transfer-target-select');
    const targetNum = parseInt(select.value, 10);
    
    if (isNaN(sourceNum) || isNaN(targetNum)) return;
    
    const sourceKey = `ESTACION-${String(sourceNum).padStart(2, '0')}`;
    const targetKey = `ESTACION-${String(targetNum).padStart(2, '0')}`;
    
    const clientName = getClientNameForStation(sourceNum);
    const clientId = getClientIdForStation(sourceNum);
    
    const sourceInspections = inspections.filter(r => r.station === sourceKey);
    
    if (sourceInspections.length === 0 && !clientName) {
        return alert("La estación origen no tiene historial ni asignación que transferir.");
    }
    
    // Check if target has existing data
    const targetClient = getClientNameForStation(targetNum);
    const targetInspections = inspections.filter(r => r.station === targetKey);
    if (targetClient || targetInspections.length > 0) {
        if (!confirm(`⚠️ ATENCIÓN: La Estación Destino (#${String(targetNum).padStart(2, '0')}) ya tiene datos asignados o historial.\n\nSi continúas, la información se fusionará y los reportes se mezclarán.\n\n¿Deseas proceder con la transferencia?`)) {
            return;
        }
    }
    
    // 1. Transfer Client Assignment
    if (clientId && clientName) {
        let assignments = globalAppData.stationAssignments || [];
        let newAssignments = [];
        
        // Remove source station from assignments (Split Range)
        assignments.forEach(item => {
            const s = parseInt(item.start, 10);
            const e = parseInt(item.end, 10);
            
            if (sourceNum >= s && sourceNum <= e) {
                if (s < sourceNum) {
                    newAssignments.push({
                        id: 'asg_' + Date.now() + '_L_' + Math.floor(Math.random() * 1000),
                        clientId: item.clientId,
                        clientName: item.clientName,
                        start: s,
                        end: sourceNum - 1
                    });
                }
                if (e > sourceNum) {
                    newAssignments.push({
                        id: 'asg_' + Date.now() + '_R_' + Math.floor(Math.random() * 1000),
                        clientId: item.clientId,
                        clientName: item.clientName,
                        start: sourceNum + 1,
                        end: e
                    });
                }
            } else {
                newAssignments.push(item);
            }
        });
        
        // Add target station assignment
        newAssignments.push({
            id: 'asg_' + Date.now() + '_T_' + Math.floor(Math.random() * 1000),
            clientId,
            clientName,
            start: targetNum,
            end: targetNum
        });
        
        globalAppData.stationAssignments = newAssignments;
        saveGlobalAppData();
    }
    
    // 2. Transfer Inspections history locally
    inspections.forEach(r => {
        if (r.station === sourceKey) {
            r.station = targetKey;
            r.status = 'pendiente'; // Mark as pending to trigger cloud sync update
        }
    });
    localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
    
    // 3. Update in Cloud
    if (currentUser && db) {
        db.collection('users').doc(getActiveUid()).collection('inspecciones')
            .where('station', '==', sourceKey)
            .get()
            .then(snap => {
                const batch = db.batch();
                snap.forEach(doc => batch.delete(doc.ref));
                return batch.commit();
            })
            .then(() => {
                console.log(`Cloud historical inspections removed from ${sourceKey}. Triggering sync for new target station.`);
                syncWithCloud(true);
            })
            .catch(err => console.error("Cloud transfer sync error:", err));
    }
    
    closeTransferModal();
    
    // Refresh displays
    generateStationDropdown();
    renderAssignmentsList();
    renderMonitoreo();
    updateStationClientInfo();
    
    alert(`✅ Los datos de la Estación #${String(sourceNum).padStart(2, '0')} se trasladaron con éxito a la Estación #${String(targetNum).padStart(2, '0')}.`);
}

// Catálogo de Recomendaciones Estándar de Manejo Integrado de Plagas (MIP)
const AVAILABLE_RECOMMENDATIONS = [
    {
        category: "Higiene Ambiental y Manejo de Residuos",
        icon: "🧹",
        items: [
            {
                id: "rec_limpieza_escombros",
                title: "Limpieza y retiro de basura o escombros",
                desc: "Retirar acumulación de basura, maderas en desuso y escombros que sirvan como zonas de madriguera o refugio de plagas.",
                isSuggested: true
            },
            {
                id: "rec_desmalezado_perimetral",
                title: "Desmalezado y despeje perimetral",
                desc: "Podar malezas densas y ramas bajas en un radio mínimo de 1 a 2 metros alrededor de las estaciones y muros perimetrales.",
                isSuggested: true
            },
            {
                id: "rec_manejo_basureros",
                title: "Manejo hermético de contenedores de basura",
                desc: "Asegurar que los basureros y contenedores cuenten con tapas herméticas y permanezcan cerrados para evitar fuentes de alimento.",
                isSuggested: true
            },
            {
                id: "rec_aguas_estancadas",
                title: "Eliminación de fuentes de agua estancada",
                desc: "Eliminar recipientes abiertos, charcos o fugas en cañerías que sirvan como bebederos a los roedores.",
                isSuggested: true
            }
        ]
    },
    {
        category: "Hermeticidad Estructural y Exclusión (Pest Exclusion)",
        icon: "🚪",
        items: [
            {
                id: "rec_sellado_grietas",
                title: "Sellado de grietas y orificios de ingreso",
                desc: "Sellar hendiduras, grietas y aberturas superiores a 6 mm en muros exteriores, zócalos y pasos de cañerías/ductos.",
                isSuggested: false
            },
            {
                id: "rec_guardapolvos_puertas",
                title: "Ajuste e instalación de guardapolvos en puertas",
                desc: "Instalar o reparar burletes y guardapolvos de goma dura/aluminio en la base de puertas exteriores (holgura máxima 5 mm).",
                isSuggested: false
            },
            {
                id: "rec_mallas_ventilaciones",
                title: "Protección de ductos y ventilaciones con mallas",
                desc: "Instalar mallas metálicas galvanizadas (trama < 6 mm) en ventilaciones, ductos de desagüe y bajadas de agua.",
                isSuggested: false
            },
            {
                id: "rec_ramas_techos",
                title: "Poda de ramas en contacto con techumbres",
                desc: "Cortar ramas de árboles que toquen o queden a menos de 1 metro de techos y aleros, para evitar puentes aéreos de acceso.",
                isSuggested: false
            }
        ]
    },
    {
        category: "Almacenamiento y Protección de Alimentos",
        icon: "📦",
        items: [
            {
                id: "rec_palletizado_bodegas",
                title: "Elevación y orden en bodegas (Palletizado)",
                desc: "Almacenar mercaderías, sacos y alimentos sobre tarimas elevadas a mínimo 15 cm del suelo y a 50 cm de muros perimetrales.",
                isSuggested: false
            },
            {
                id: "rec_limpieza_derrames",
                title: "Limpieza inmediata de derrames de alimentos",
                desc: "Barrer y limpiar inmediatamente cualquier derrame de granos, semillas, harinas o restos orgánicos en bodegas o patios.",
                isSuggested: false
            },
            {
                id: "rec_comida_mascotas",
                title: "Retiro nocturno de alimentos para animales",
                desc: "Evitar dejar platos con alimento o agua para mascotas/animales expuestos en exteriores durante la noche.",
                isSuggested: false
            }
        ]
    },
    {
        category: "Sistema de Cebado y Medidas Operativas",
        icon: "🎯",
        items: [
            {
                id: "rec_acceso_despejado",
                title: "Mantener acceso despejado a las estaciones",
                desc: "No bloquear el acceso a las cajas cebaderas con pallets, herramientas ni maquinaria para permitir su correcta inspección.",
                isSuggested: true
            },
            {
                id: "rec_anclajes_seguridad",
                title: "Inspección de anclajes y cerraduras",
                desc: "Verificar periódicamente el anclaje físico al suelo/muro y el cierre de seguridad de las estaciones para evitar manipulaciones ajenas.",
                isSuggested: true
            },
            {
                id: "rec_aumento_frecuencia",
                title: "Aumento de frecuencia de visitas en focos críticos",
                desc: "Coordinar una visita de refuerzo y reposición intensiva de cebos en un plazo no mayor a 7 días en las estaciones con consumo crítico.",
                isSuggested: false
            },
            {
                id: "rec_rotacion_cebos",
                title: "Rotación de formulaciones e ingredientes activos",
                desc: "Evaluar alternar entre bloques parafinados y pastas frescas de alta palatabilidad para prevenir aversión o acostumbramiento.",
                isSuggested: false
            }
        ]
    }
];

// Render recommendations checkboxes inside the modal
function renderRecommendationsCheckboxes() {
    const container = document.getElementById('report-recommendations-list');
    if (!container) return;
    
    let html = '';
    AVAILABLE_RECOMMENDATIONS.forEach(cat => {
        html += `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 12px;">
                <div style="font-size: 0.82rem; font-weight: 700; color: #93c5fd; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                    <span>${cat.icon}</span> <span>${cat.category}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${cat.items.map(item => `
                        <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: #e2e8f0; cursor: pointer; line-height: 1.35; padding: 2px 0;">
                            <input type="checkbox" class="report-rec-checkbox" 
                                   data-rec-id="${item.id}" 
                                   data-rec-title="${item.title.replace(/"/g, '&quot;')}" 
                                   data-rec-desc="${item.desc.replace(/"/g, '&quot;')}" 
                                   ${item.isSuggested ? 'checked' : ''} 
                                   style="margin-top: 2px; accent-color: var(--primary); width: 16px; height: 16px; flex-shrink: 0; cursor: pointer;">
                            <div>
                                <strong style="color: #fff;">${item.title}:</strong> 
                                <span style="color: #94a3b8;">${item.desc}</span>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.dataset.rendered = "true";
}

// Select all or suggested recommendations in the modal
function selectAllRecommendations(state) {
    const checkboxes = document.querySelectorAll('.report-rec-checkbox');
    checkboxes.forEach(chk => {
        if (state === true) {
            const recId = chk.getAttribute('data-rec-id');
            let isSuggested = false;
            for (const cat of AVAILABLE_RECOMMENDATIONS) {
                const found = cat.items.find(i => i.id === recId);
                if (found) {
                    isSuggested = !!found.isSuggested;
                    break;
                }
            }
            chk.checked = isSuggested;
        } else {
            chk.checked = false;
        }
    });
}

// Open Intermediate Report Configuration Modal
function openReportConfigModal() {
    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    if (!filterClientId) {
        alert("⚠️ Selecciona un cliente para configurar y generar el reporte.");
        return;
    }
    
    const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
    const clientName = clientObj ? clientObj.name : 'Cliente';
    
    // Count client stations
    const clientStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        if (getClientIdForStation(i) === filterClientId || getClientNameForStation(i) === clientName) {
            clientStations.push(i);
        }
    }
    
    const clientInfoEl = document.getElementById('report-modal-client-info');
    if (clientInfoEl) {
        clientInfoEl.innerHTML = `Cliente: <strong style="color: #fff;">${clientName}</strong> · <strong>${clientStations.length}</strong> estaciones asignadas`;
    }
    
    // Populate recommendations checkboxes if not yet rendered
    const recListContainer = document.getElementById('report-recommendations-list');
    if (recListContainer && (!recListContainer.dataset.rendered || recListContainer.children.length === 0)) {
        renderRecommendationsCheckboxes();
    }
    
    const modal = document.getElementById('report-config-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Intermediate Report Configuration Modal
function closeReportConfigModal() {
    const modal = document.getElementById('report-config-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Execute PDF Monitoring Report generation with configured recommendations
async function executeGeneratePDFReport() {
    if (typeof html2pdf === 'undefined') {
        alert("⚠️ La librería html2pdf.js no está cargada. Verifica tu conexión a internet.");
        return;
    }
    
    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    if (!filterClientId) {
        alert("⚠️ Selecciona un cliente para generar el reporte.");
        return;
    }
    
    const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
    const clientName = clientObj ? clientObj.name : 'Cliente';
    const clientAddress = clientObj ? clientObj.address : 'Sin dirección';
    
    // Get summary statistics
    const summaries = getClientMonitoreoSummary();
    const clientSummary = summaries.find(s => s.id === filterClientId);
    
    if (!clientSummary) {
        alert("⚠️ No se encontraron datos para este cliente.");
        return;
    }

    // Read selected recommendations from the modal checkboxes
    const selectedRecs = [];
    document.querySelectorAll('.report-rec-checkbox:checked').forEach(chk => {
        selectedRecs.push({
            title: chk.getAttribute('data-rec-title') || '',
            desc: chk.getAttribute('data-rec-desc') || ''
        });
    });

    // Read custom notes from modal
    const customNotesEl = document.getElementById('report-custom-notes');
    const customNotes = customNotesEl ? customNotesEl.value.trim() : '';

    // Read modal checkbox options
    const modalChkAlerts = document.getElementById('modal-chk-include-alerts');
    const includeAlerts = modalChkAlerts ? modalChkAlerts.checked : true;

    const modalChkMap = document.getElementById('modal-chk-include-map');
    const includeMap = modalChkMap ? modalChkMap.checked : true;

    // Close the config modal now
    closeReportConfigModal();
    
    // Show spinner on main button and modal button
    const btn = document.getElementById('btn-generate-pdf-report');
    const modalBtn = document.getElementById('btn-modal-download-pdf');
    const originalText = btn ? btn.innerText : '📄 Descargar Reporte PDF';
    if (btn) {
        btn.disabled = true;
        btn.innerText = 'Generando Reporte...';
    }
    if (modalBtn) {
        modalBtn.disabled = true;
    }

    // Helper escape
    const esc = (s) => {
        if (!s) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
    
    // 1. Build recommendations block
    let recommendationsHTML = "";

    // 1.1 Diagnosis alert banner if selected
    if (includeAlerts) {
        if (clientSummary.criticalCount > 0) {
            recommendationsHTML += `
                <div class="rec-card" style="margin-bottom: 14px; padding: 14px 16px; border-left: 5px solid #ef4444; background: #fef2f2; border-radius: 6px; page-break-inside: avoid !important; break-inside: avoid !important;">
                    <h4 style="margin: 0 0 6px 0; color: #991b1b; font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <span>🚨</span> Diagnóstico de Alerta Crítica en el Predio
                    </h4>
                    <p style="margin: 0; font-size: 0.82rem; color: #7f1d1d; line-height: 1.45;">
                        Se han identificado <strong>${clientSummary.criticalCount} estaciones en estado crítico</strong> (consumo promedio superior al 50% o incidentes de consumo de 75%-100% en visitas recientes). Se requiere priorizar las medidas correctivas inmediatas.
                    </p>
                </div>
            `;
        } else if (clientSummary.lastVisitAvgConsumption > 20 || clientSummary.avgConsumption > 20) {
            recommendationsHTML += `
                <div class="rec-card" style="margin-bottom: 14px; padding: 14px 16px; border-left: 5px solid #fbbf24; background: #fffbef; border-radius: 6px; page-break-inside: avoid !important; break-inside: avoid !important;">
                    <h4 style="margin: 0 0 6px 0; color: #92400e; font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <span>⚠️</span> Diagnóstico de Actividad Moderada
                    </h4>
                    <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.45;">
                        Se detectó actividad moderada de roedores en el predio (consumo última visita: <strong>${clientSummary.lastVisitAvgConsumption}%</strong> | promedio global: <strong>${clientSummary.avgConsumption}%</strong>). Se aconseja mantener medidas de control preventivo continuo.
                    </p>
                </div>
            `;
        } else {
            recommendationsHTML += `
                <div class="rec-card" style="margin-bottom: 14px; padding: 14px 16px; border-left: 5px solid #10b981; background: #ecfdf5; border-radius: 6px; page-break-inside: avoid !important; break-inside: avoid !important;">
                    <h4 style="margin: 0 0 6px 0; color: #065f46; font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <span>✅</span> Diagnóstico del Predio: Bajo Control
                    </h4>
                    <p style="margin: 0; font-size: 0.82rem; color: #064e3b; line-height: 1.45;">
                        El predio presenta niveles óptimos y controlados de cebado (consumo última visita: <strong>${clientSummary.lastVisitAvgConsumption}%</strong> | promedio global: <strong>${clientSummary.avgConsumption}%</strong>). Mantener las labores regulares de reposición y monitoreo.
                    </p>
                </div>
            `;
        }
    }

    // 1.2 Selected recommendations list
    if (selectedRecs.length > 0) {
        recommendationsHTML += `
            <div class="rec-card" style="margin-bottom: 14px; padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; page-break-inside: avoid !important; break-inside: avoid !important;">
                <h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                    <span>📋</span> Recomendaciones Técnicas y Medidas Preventivas Acordadas:
                </h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.82rem; color: #334155; line-height: 1.5;">
                    ${selectedRecs.map(r => `<li style="margin-bottom: 5px;"><strong>${esc(r.title)}:</strong> ${esc(r.desc)}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // 1.3 Custom notes
    if (customNotes) {
        recommendationsHTML += `
            <div class="rec-card" style="margin-bottom: 12px; padding: 12px 16px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 6px; page-break-inside: avoid !important; break-inside: avoid !important;">
                <h4 style="margin: 0 0 6px 0; color: #065f46; font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                    <span>✍️</span> Observaciones Técnicas en Terreno:
                </h4>
                <p style="margin: 0; font-size: 0.82rem; color: #1e293b; line-height: 1.45; white-space: pre-wrap;">${esc(customNotes)}</p>
            </div>
        `;
    }

    // 2. Build latest inspections table rows
    const clientStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        if (getClientIdForStation(i) === filterClientId || getClientNameForStation(i) === clientName) {
            clientStations.push(i);
        }
    }
    
    let latestInspectionsHTML = "";
    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const analytics = calculateStationAnalytics(stationKey);
        
        let lastDate = '-';
        let lastCons = 'Pendiente';
        let lastMaint = 'Ninguno';
        let lastEvid = 'Ninguna';
        let lastNotes = '-';
        
        if (analytics.latestRecord) {
            lastDate = analytics.latestRecord.timestamp.split(' ')[0];
            lastCons = analytics.latestRecord.consumption;
            lastMaint = (analytics.latestRecord.maintenance || []).map(m => m.replace(' (Klerat)', '')).join(', ') || 'Ninguno';
            lastEvid = (analytics.latestRecord.evidence || []).join(', ') || 'Ninguna';
            lastNotes = analytics.latestRecord.notes || '-';
        }
        
        const isCritical = isStationCritical(stationKey);
        const warningIcon = (isCritical && includeAlerts) ? ' <span style="color: #ef4444;">🚨</span>' : '';
        
        latestInspectionsHTML += `
            <tr style="border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; page-break-inside: avoid; break-inside: avoid;">
                <td style="padding: 10px 8px; font-weight: 700; color: #1e293b; text-align: left;">Estación #${String(num).padStart(2, '0')}${warningIcon}</td>
                <td style="padding: 10px 8px; text-align: center;">${lastDate}</td>
                <td style="padding: 10px 8px; text-align: center; font-weight: 700; color: ${lastCons === '0%' ? '#10b981' : lastCons === '25-50%' ? '#fbbf24' : '#ef4444'};">${lastCons}</td>
                <td style="padding: 10px 8px; text-align: left; color: #475569;">${lastMaint}</td>
                <td style="padding: 10px 8px; text-align: left; color: #475569;">${lastEvid}</td>
                <td style="padding: 10px 8px; text-align: left; color: #64748b; font-style: italic;">${lastNotes}</td>
            </tr>
        `;
    });

    // 3. Build historical entries listing per station
    let historyHTML = "";
    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const stationRecords = inspections.filter(r => r.station === stationKey);
        const sortedRecords = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a)); // Newest first
        
        let rows = "";
        sortedRecords.forEach(r => {
            const maint = (r.maintenance || []).map(m => m.replace(' (Klerat)', '')).join(', ') || 'Ninguno';
            rows += `
                <div style="display: flex; justify-content: space-between; font-size: 0.76rem; padding: 5px 0; border-bottom: 1px dashed #e2e8f0; color: #475569;">
                    <span style="font-weight: 500;">📅 ${r.timestamp}</span>
                    <span style="font-weight: 600; color: ${r.consumption === '0%' ? '#10b981' : r.consumption === '25-50%' ? '#d97706' : '#dc2626'};">Consumo: ${r.consumption}</span>
                    <span>🔧 Mantenimiento: ${maint}</span>
                </div>
            `;
        });
        
        if (rows === "") {
            rows = `<div style="font-size: 0.76rem; color: #94a3b8; font-style: italic; padding: 4px 0;">Sin visitas registradas en este dispositivo</div>`;
        }
        
        historyHTML += `
            <div style="margin-bottom: 15px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #f8fafc; page-break-inside: avoid; break-inside: avoid;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.85rem; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-weight: 700;">
                    Estación #${String(num).padStart(2, '0')}
                </h5>
                ${rows}
            </div>
        `;
    });

    // Check map snapshot
    const mapStations = [];
    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const coords = getLatestStationCoords(stationKey);
        if (coords && coords.lat && coords.lng) {
            mapStations.push({ num: num, coords: coords });
        }
    });

    const originalMap = document.getElementById('monitoreo-map');
    const originalMapParent = originalMap ? originalMap.parentNode : null;
    const originalMapNextSibling = originalMap ? originalMap.nextSibling : null;
    
    let mapSectionHTML = "";
    let mapPageBreakHTML = "";
    if (includeMap) {
        mapSectionHTML = `
            <div class="doc-section" style="page-break-inside: avoid; break-inside: avoid;">
                <h2>2. Plano Satelital del Predio</h2>
                <div id="pdf-map-placeholder" style="margin-bottom: 25px; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; height: 350px; background: #f8fafc; width: 100%;"></div>
            </div>
        `;
        // Cuando se incluye el mapa, este completa la Página 1 junto con el Header e Información General.
        // Se hace un salto de página limpio para que la Sección 3 (Recomendaciones y Notas) inicie fresca en la Página 2 sin cortarse.
        mapPageBreakHTML = `<div style="page-break-before: always; break-before: always;"></div>`;
    }

    // 4. Create floating status toast notification
    const statusToast = document.createElement('div');
    statusToast.id = 'temp-pdf-toast';
    statusToast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100000;
        background: #1e293b;
        color: #60a5fa;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        border: 1px solid rgba(96, 165, 250, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    statusToast.innerHTML = `<span>⚙️</span> Generando Informe de Trazabilidad... Por favor espera unos segundos.`;
    document.body.appendChild(statusToast);

    // Switch map markers to clean PDF mode (white border, no tickets/halos)
    window.isGeneratingPdf = true;
    if (includeMap && originalMap) {
        initOrUpdateMap();
        await new Promise(r => setTimeout(r, 200));
    }

    // 5. Create printable report wrapper at fixed top: 0, left: 0
    const pdfWrapper = document.createElement('div');
    pdfWrapper.id = 'temp-pdf-wrapper';
    pdfWrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(4px);
        overflow-y: auto;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    `;

    const reportContainer = document.createElement('div');
    reportContainer.id = 'temp-pdf-report';
    reportContainer.className = 'formal-document';
    reportContainer.style.cssText = `
        position: relative;
        background: #ffffff !important;
        color: #1e293b !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        box-sizing: border-box !important;
        line-height: 1.5 !important;
        width: 794px !important;
        max-width: 794px !important;
        padding: 40px !important;
        margin: 0 auto !important;
        transform: none !important;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;
    
    reportContainer.innerHTML = `
        <!-- Header -->
        <div class="doc-header" style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; page-break-inside: avoid; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <img src="logo.png" alt="Stahlgraf Logo" style="max-height: 90px; width: auto; object-fit: contain;" onerror="this.style.display='none'">
                <div style="text-align: right;">
                    <h1 style="margin: 0; font-size: 18pt; color: #222; text-transform: uppercase; font-weight: 700;">INFORME DE TRAZABILIDAD</h1>
                    <p style="margin: 5px 0 0 0; font-size: 10pt; color: #555;">Fecha: <strong>${new Date().toLocaleDateString('es-CL')}</strong></p>
                    <p style="margin: 0; font-size: 10pt; color: #555;">Estaciones Activas: <strong>${clientStations.length}</strong></p>
                </div>
            </div>
        </div>
        
        <!-- Client Details card -->
        <div class="doc-section" style="page-break-inside: avoid; break-inside: avoid;">
            <h2>1. Información del Cliente & Resumen</h2>
            <table class="doc-table-simple">
                <tr>
                    <th style="width: 22%; background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Cliente</th>
                    <td style="width: 38%; font-weight: 600; padding: 6px; border: 1px solid #ddd;">${clientName}</td>
                    <th style="width: 25%; background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Estaciones Revisadas</th>
                    <td style="width: 15%; padding: 6px; border: 1px solid #ddd;">${clientSummary.inspectedStations} / ${clientSummary.totalStations}</td>
                </tr>
                <tr>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Dirección</th>
                    <td style="padding: 6px; border: 1px solid #ddd;">${clientAddress}</td>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Consumo Última Visita</th>
                    <td style="font-weight: 700; color: ${clientSummary.lastVisitAvgConsumption > 50 ? '#ef4444' : clientSummary.lastVisitAvgConsumption > 20 ? '#d97706' : '#10b981'}; padding: 6px; border: 1px solid #ddd;">${clientSummary.lastVisitAvgConsumption}%</td>
                </tr>
                <tr>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Tendencia General</th>
                    <td style="padding: 6px; border: 1px solid #ddd;">${clientSummary.trend === 'up' ? '📈 En Alza' : clientSummary.trend === 'down' ? '📉 En Baja' : '➡️ Estable'}</td>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Consumo Prom. Global</th>
                    <td style="font-weight: 700; color: ${clientSummary.avgConsumption > 50 ? '#ef4444' : clientSummary.avgConsumption > 20 ? '#d97706' : '#10b981'}; padding: 6px; border: 1px solid #ddd;">${clientSummary.avgConsumption}%</td>
                </tr>
            </table>
        </div>

        ${mapSectionHTML}
        ${mapPageBreakHTML}
        
        <!-- Recommendations block -->
        ${recommendationsHTML ? `
        <div class="doc-section" style="page-break-inside: avoid; break-inside: avoid;">
            <h2>3. Diagnóstico y Recomendaciones de Control</h2>
            ${recommendationsHTML}
        </div>
        ` : ''}

        <!-- Latest inspections details -->
        <div class="doc-section" style="page-break-inside: avoid; break-inside: avoid;">
            <h2>4. Detalles de Última Inspección por Estación</h2>
            <table class="doc-table-simple" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background: #1e3a8a; color: #ffffff; font-size: 0.85rem;">
                        <th style="padding: 8px 6px; text-align: left; width: 15%; background: #1e3a8a; color: white;">Estación</th>
                        <th style="padding: 8px 6px; text-align: center; width: 15%; background: #1e3a8a; color: white;">Última Visita</th>
                        <th style="padding: 8px 6px; text-align: center; width: 12%; background: #1e3a8a; color: white;">Consumo</th>
                        <th style="padding: 8px 6px; text-align: left; width: 20%; background: #1e3a8a; color: white;">Mantenimiento</th>
                        <th style="padding: 8px 6px; text-align: left; width: 18%; background: #1e3a8a; color: white;">Evidencia</th>
                        <th style="padding: 8px 6px; text-align: left; width: 20%; background: #1e3a8a; color: white;">Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${latestInspectionsHTML}
                </tbody>
            </table>
        </div>
        
        <div style="page-break-before: always; break-before: always;"></div>

        <!-- Historical entries per box -->
        <div class="doc-section" style="page-break-inside: avoid; break-inside: avoid;">
            <h2>5. Historial Cronológico por Estación</h2>
            <div>
                ${historyHTML}
            </div>
        </div>
    `;
    
    pdfWrapper.appendChild(reportContainer);
    document.body.appendChild(pdfWrapper);

    // Attach live Leaflet map element to the printable placeholder if included
    const mapPlaceholder = reportContainer.querySelector('#pdf-map-placeholder');
    if (includeMap && mapPlaceholder && originalMap) {
        mapPlaceholder.appendChild(originalMap);
        originalMap.style.width = '100%';
        originalMap.style.height = '350px';
        originalMap.style.display = 'block';
        if (typeof leafletMap !== 'undefined' && leafletMap) {
            leafletMap.invalidateSize();
        }
    }

    // Give Leaflet tiles and browser layout time to render
    await new Promise(r => setTimeout(r, 450));

    try {
        const options = {
            margin: [10, 0, 15, 0],
            filename: `Reporte_Monitoreo_${clientName.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                allowTaint: true,
                logging: false,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { 
                mode: ['css', 'legacy'],
                avoid: ['.doc-section', '.rec-card', 'tr', '.no-break']
            }
        };
        
        const worker = html2pdf().set(options).from(reportContainer);
        const pdfBlob = await worker.outputPdf('blob');
        await worker.save();
        
        // Auto-save this report to Firebase Storage and Firestore collection `station_reports_sent`
        if (currentUser && db) {
            const reportPayloadId = 'rep_sent_' + Date.now();
            const reportPayload = {
                id: reportPayloadId,
                clientId: filterClientId,
                clientName: clientName,
                date: new Date().toISOString().split('T')[0],
                emails: (clientObj && clientObj.email) ? clientObj.email : 'Descargado localmente',
                notes: `Reporte de cebado generado automáticamente (${clientSummary.inspectedStations} de ${clientSummary.totalStations} estaciones revisadas - Consumo última visita: ${clientSummary.lastVisitAvgConsumption}%, Global: ${clientSummary.avgConsumption}%).`,
                pdfUrl: ''
            };

            db.collection('users').doc(getActiveUid()).collection('station_reports_sent').doc(reportPayloadId).set(reportPayload)
                .then(() => {
                    console.log("Recorded station report sent metadata in Firestore.");
                    if (storage) {
                        const uploadUid = getActiveUid();
                        storage.ref().child(`users/${uploadUid}/station_reports/${reportPayloadId}.pdf`).put(pdfBlob)
                            .then(snapshot => snapshot.ref.getDownloadURL())
                            .then(downloadUrl => {
                                return db.collection('users').doc(uploadUid).collection('station_reports_sent').doc(reportPayloadId).update({
                                    pdfUrl: downloadUrl
                                });
                            })
                            .catch(storageErr => {
                                console.warn("Could not archive station report PDF in Storage, using base64 fallback:", storageErr);
                                const reader = new FileReader();
                                reader.readAsDataURL(pdfBlob);
                                reader.onloadend = function() {
                                    const base64data = reader.result;
                                    db.collection('users').doc(uploadUid).collection('station_reports_sent').doc(reportPayloadId).update({
                                        pdfUrl: base64data
                                    });
                                };
                            });
                    }
                })
                .catch(err => console.error("Failed to record station report:", err));
        }
    } catch (err) {
        console.error("PDF generation failed:", err);
        alert("⚠️ Error al generar el PDF. Ocurrió un problema inesperado.");
    } finally {
        window.isGeneratingPdf = false;
        // Restore Leaflet map to original DOM container if it was moved
        if (includeMap && originalMap && originalMapParent) {
            originalMap.style.width = '';
            originalMap.style.height = '';
            if (originalMapNextSibling) {
                originalMapParent.insertBefore(originalMap, originalMapNextSibling);
            } else {
                originalMapParent.appendChild(originalMap);
            }
            if (typeof leafletMap !== 'undefined' && leafletMap) {
                leafletMap.invalidateSize();
            }
            // Restore interactive inspection markers (with tickets and status borders)
            initOrUpdateMap();
        }
        if (pdfWrapper && pdfWrapper.parentNode) {
            pdfWrapper.parentNode.removeChild(pdfWrapper);
        }
        if (statusToast && statusToast.parentNode) {
            statusToast.parentNode.removeChild(statusToast);
        }
        if (btn) {
            btn.disabled = false;
            btn.innerText = originalText;
        }
        if (modalBtn) {
            modalBtn.disabled = false;
        }
    }
}

// Fallback alias for generatePDFReport
function generatePDFReport() {
    openReportConfigModal();
}

// Expose deleteAssignment and other handlers globally
window.deleteAssignment = deleteAssignment;
window.openReassignModal = openReassignModal;
window.closeReassignModal = closeReassignModal;
window.openStationDetails = openStationDetails;
window.closeStationDetails = closeStationDetails;
window.resetStationData = resetStationData;
window.openTransferModal = openTransferModal;
window.closeTransferModal = closeTransferModal;
window.executeTransfer = executeTransfer;
window.openReportConfigModal = openReportConfigModal;
window.closeReportConfigModal = closeReportConfigModal;
window.selectAllRecommendations = selectAllRecommendations;
window.executeGeneratePDFReport = executeGeneratePDFReport;
window.generatePDFReport = generatePDFReport;
