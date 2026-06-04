// trazabilidad.js - Rodent Bait Station Offline QR Tracking System

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

let inspections = [];
let lastKnownGPS = null;
let leafletMap = null;
let leafletMarkerGroup = null;
let activeTileLayer = null;

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
        db.collection('users').doc(currentUser.uid).set(globalAppData, { merge: true })
            .catch(err => console.error("Error saving global configuration to Firebase:", err));
    }
}

// Sync global configuration from Firebase user document
function syncGlobalDataFromFirebase() {
    if (!currentUser || !db) return;
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            globalAppData = { ...globalAppData, ...cloudData };
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(globalAppData));
            
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
            
            // Fetch central database configuration (clients & assignments) on login
            syncGlobalDataFromFirebase();
            
            // Auto-sync when login status is detected and online
            if (navigator.onLine) {
                syncWithCloud(true);
            }
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
            document.getElementById('btn-sync-login').classList.add('btn-primary-outline');
            document.getElementById('btn-sync-login').classList.remove('btn-secondary');
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
        btnGeneratePdf.addEventListener('click', generatePDFReport);
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

    // Camera QR Scanner bindings
    const btnScanQr = document.getElementById('btn-scan-qr');
    const btnCloseScanner = document.getElementById('btn-close-scanner');
    if (btnScanQr) btnScanQr.addEventListener('click', openScanner);
    if (btnCloseScanner) btnCloseScanner.addEventListener('click', closeScanner);
    
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

    const mapStations = [];
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        const clientName = getClientNameForStation(i);
        
        // Filter logic
        if (filterClientName && clientName !== filterClientName) {
            continue;
        }
        
        const coords = getLatestStationCoords(stationKey);
        if (coords && coords.lat && coords.lng) {
            mapStations.push({
                num: i,
                key: stationKey,
                clientName: clientName || 'Sin Cliente',
                coords: coords,
                analytics: calculateStationAnalytics(stationKey)
            });
        }
    }

    const placeholder = document.getElementById('monitoreo-map-placeholder');
    const mapElement = document.getElementById('monitoreo-map');

    if (mapStations.length === 0) {
        if (placeholder) placeholder.style.display = 'flex';
        if (mapElement) mapElement.style.opacity = '0';
        return;
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
            maxZoom: 20
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
            mapStations.forEach(s => {
                const avgColor = getColorForAvg(s.analytics.avg);
                const numStr = String(s.num).padStart(2, '0');
                
                // DivIcon containing a styled circle with the station number
                const customIcon = L.divIcon({
                    className: 'custom-station-icon',
                    html: `<div style="background-color: ${avgColor}; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.55);">${numStr}</div>`,
                    iconSize: [22, 22],
                    iconAnchor: [11, 11]
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

                // Trend icon
                let trendIcon = '';
                if (s.analytics.trend === 'up') trendIcon = '📈';
                else if (s.analytics.trend === 'down') trendIcon = '📉';
                else if (s.analytics.trend === 'stable') trendIcon = '➡️';
                
                const tooltipText = `${numStr} ${trendIcon}`;

                marker.bindTooltip(tooltipText, {
                    permanent: true,
                    direction: 'top',
                    className: 'premium-map-tooltip',
                    offset: [0, -12]
                });

                const popupContent = `
                    <div style="color: #333; font-family: 'Inter', sans-serif; font-size: 0.85rem; line-height: 1.4; padding: 5px;">
                        <h4 style="margin: 0 0 5px 0; font-size: 1rem; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
                            📍 Estación #${numStr}
                        </h4>
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
            });

            // Auto-fit map viewport to bounds
            if (mapStations.length > 0) {
                const bounds = mapStations.map(s => [s.coords.lat, s.coords.lng]);
                if (mapStations.length === 1) {
                    leafletMap.setView(bounds[0], 17);
                } else {
                    leafletMap.fitBounds(bounds, { padding: [40, 40] });
                }
            }
        }
    }, 100);
}

// Correct coordinates of a station (updates the latest inspection record with coords)
function updateStationCoordinates(stationKey, lat, lng) {
    // Find all inspections of this station that contain valid coords
    const stationRecords = inspections.filter(r => r.station === stationKey && r.coords && r.coords.lat && r.coords.lng);
    if (stationRecords.length > 0) {
        // Sort newest first
        const sorted = [...stationRecords].sort((a, b) => getRecordTimestamp(b) - getRecordTimestamp(a));
        const latestRecord = sorted[0];
        
        // Find it in the master inspections array
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
            
            // Re-render and show success alert
            renderMonitoreo();
            alert(`✅ La ubicación de la Estación #${stationKey.replace('ESTACION-', '')} ha sido corregida.`);
            
            if (navigator.onLine && currentUser) {
                syncWithCloud(true);
            }
        }
    } else {
        alert("⚠️ No se encontró un historial de geolocalización previo para esta estación.");
        initOrUpdateMap();
    }
}

// Load inspections queue from LocalStorage
function loadLocalInspections() {
    const saved = localStorage.getItem('stahlgraf_qr_inspecciones');
    if (saved) {
        try {
            inspections = JSON.parse(saved);
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
    
    const maxStations = getMaxStationNumber();
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        
        // Find if this station is assigned to a client
        const clientName = getClientNameForStation(i);
        
        const opt = document.createElement('option');
        opt.value = stationKey;
        if (clientName) {
            opt.textContent = `Estación #${numStr} - ${clientName}`;
        } else {
            opt.textContent = `Estación #${numStr}`;
        }
        select.appendChild(opt);
    }
    
    if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
        select.value = currentVal;
    }
    
    // Refresh info box for the currently selected station
    if (!skipInfoUpdate) {
        updateStationClientInfo();
    }
}

// Check if URL has ?id=ESTACION-XX parameter and preserve it across redirect logins
function checkURLParameters() {
    const params = new URLSearchParams(window.location.search);
    let idParam = params.get('id');
    
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
        select.disabled = true; // Lock field for safety in field
        if (badge) badge.style.display = 'inline-flex';
        
        // Auto-switch to Registrar tab since a station QR code is locked for active inspection
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
}

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
    
    // Unlock station selection and clear sessionStorage since this scanned QR inspection is completed
    sessionStorage.removeItem('last_scanned_station_id');
    if (select) select.disabled = false;
    const badge = document.getElementById('station-locked-badge');
    if (badge) badge.style.display = 'none';

    // Show premium visual feedback
    alert(`✅ ¡Inspección de ${station} registrada con éxito de forma local!`);
    
    // Clear inputs (except station if locked)
    resetInspectionForm();
    renderMonitoreo();
    updateStationClientInfo();

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
        let criticalCount = 0;
        let trendUpCount = 0;
        let trendDownCount = 0;
        
        clientStations.forEach(stationNum => {
            const stationKey = `ESTACION-${String(stationNum).padStart(2, '0')}`;
            const analytics = calculateStationAnalytics(stationKey);
            
            if (analytics.recordsCount > 0) {
                inspectedCount++;
                sumAvgConsumption += analytics.avg;
                
                // A station is critical if average consumption is > 50% or the latest consumption is high (75% or 100%)
                if (analytics.avg > 50 || analytics.lastVal === '75%' || analytics.lastVal === '100%') {
                    criticalCount++;
                }
                
                if (analytics.trend === 'up') trendUpCount++;
                else if (analytics.trend === 'down') trendDownCount++;
            }
        });
        
        const avgConsumption = inspectedCount > 0 ? Math.round(sumAvgConsumption / inspectedCount) : 0;
        
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
                    card.style.cssText = 'padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255, 255, 255, 0.02); transition: all 0.25s ease; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; height: 180px; box-sizing: border-box;';
                    
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
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                                <div style="background: rgba(255,255,255,0.02); padding: 8px; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.04);">
                                    <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Estaciones</span>
                                    <span style="font-size: 1.05rem; font-weight: 700; color: #fff;">${c.inspectedStations} / ${c.totalStations}</span>
                                </div>
                                <div style="background: rgba(255,255,255,0.02); padding: 8px; border-radius: 8px; text-align: center; border: 1px solid rgba(255,255,255,0.04);">
                                    <span style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 2px;">Promedio</span>
                                    <span style="font-size: 1.05rem; font-weight: 700; color: ${c.avgConsumption > 50 ? '#ef4444' : '#10b981'};">${c.avgConsumption}%</span>
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

    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let uniqueInspected = new Set();
    const maxStations = getMaxStationNumber();
    
    let totalCount = 0;
    let reviewedCount = 0;
    
    for (let i = 1; i <= maxStations; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        
        // Find if this station is assigned to a client
        const clientName = getClientNameForStation(i);
        
        // Filter logic
        if (filterClientName && clientName !== filterClientName) {
            continue; // Skip this cell if filtering and it doesn't belong to the client
        }
        
        totalCount++;
        
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
            uniqueInspected.add(stationKey);
            reviewedCount++;
        } else {
            statusText = 'Sin datos';
        }
        
        // Trend Icon Mapping
        let trendIcon = '';
        if (analytics.trend === 'up') trendIcon = '📈';
        else if (analytics.trend === 'down') trendIcon = '📉';
        else if (analytics.trend === 'stable') trendIcon = '➡️';
        
        const cell = document.createElement('div');
        cell.className = `station-cell ${stateClass}`;
        
        const clientLabel = clientName ? `<span style="font-size:0.65rem; color:#aaa; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top:2px; font-weight: 500;">👤 ${clientName}</span>` : '';
        
        cell.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 10px; box-sizing: border-box;">
                <span class="num">${numStr}</span>
                <span class="trend-icon" style="font-size: 0.9rem;">${trendIcon}</span>
            </div>
            <span class="status-lbl" style="font-size: 0.65rem; opacity: 0.95; line-height: 1.2; text-align: center; margin-top: 4px;">
                ${statusText}
            </span>
            ${clientLabel}
        `;
        
        // Clicking cell opens Detail Modal
        cell.addEventListener('click', () => {
            openStationDetails(i);
        });
        
        grid.appendChild(cell);
    }
    
    document.getElementById('stat-reviewed-count').innerText = `${reviewedCount} / ${totalCount}`;
    
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
        if (filterClientName) {
            const num = parseInt(ins.station.replace('ESTACION-', ''), 10);
            const instClient = getClientNameForStation(num);
            if (instClient !== filterClientName) {
                return; // Skip this history row if it doesn't belong to the client
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
    
    // Update map visualization
    initOrUpdateMap();
}

// Export data as JSON file download
function exportJSON() {
    if (inspections.length === 0) return alert("No hay datos para exportar.");
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inspections, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `inspecciones_cebado_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Export data as CSV file download
function exportCSV() {
    if (inspections.length === 0) return alert("No hay datos para exportar.");
    
    // Excel support for Spanish locale (UTF-8 BOM)
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "ID_Inspeccion,Estacion,Fecha_Hora,Consumo_Cebo,Mantenimiento,Evidencias,Observaciones,Latitud,Longitud,Estado_Sincronizacion\n";
    
    inspections.forEach(ins => {
        const maintStr = (ins.maintenance || []).join('; ');
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
    
    loadLocalInspections();
    const pending = inspections.filter(r => r.status === 'pendiente');
    
    const spinner = document.getElementById('sync-spinner');
    const syncBtn = document.getElementById('btn-sync-cloud');
    
    if (spinner && syncBtn) {
        spinner.style.display = 'inline-block';
        syncBtn.disabled = true;
        syncBtn.innerText = 'Sincronizando...';
    }
    
    try {
        let uploadedCount = 0;
        
        // 1. PUSH: Upload pending local inspections to Firestore
        if (pending.length > 0) {
            const batch = db.batch();
            const userRef = db.collection('users').doc(currentUser.uid);
            
            pending.forEach(item => {
                const docRef = userRef.collection('inspecciones').doc(item.id);
                batch.set(docRef, {
                    station: item.station,
                    consumption: item.consumption,
                    maintenance: item.maintenance,
                    evidence: item.evidence,
                    notes: item.notes,
                    coords: item.coords || null,
                    localTimestamp: item.timestamp,
                    syncedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
            
            await batch.commit();
            
            // Update local state to synced
            inspections.forEach(item => {
                if (item.status === 'pendiente') {
                    item.status = 'sincronizado';
                }
            });
            localStorage.setItem('stahlgraf_qr_inspecciones', JSON.stringify(inspections));
            uploadedCount = pending.length;
        }
        
        // 2. PULL: Download historical inspections from Firestore and merge
        const userRef = db.collection('users').doc(currentUser.uid);
        const snapshot = await userRef.collection('inspecciones').orderBy('localTimestamp', 'desc').limit(100).get();
        
        let pulledCount = 0;
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const recordId = doc.id;
            
            const pulledRecord = {
                id: recordId,
                station: data.station,
                consumption: data.consumption,
                maintenance: data.maintenance || [],
                evidence: data.evidence || [],
                notes: data.notes || '',
                coords: data.coords || null,
                timestamp: data.localTimestamp || new Date(data.syncedAt?.seconds * 1000).toLocaleString('es-CL'),
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
            alert("Ocurrió un error al sincronizar con Firestore: " + err.message + "\nPor favor, verifica tu conexión a internet.");
        }
    } finally {
        if (spinner && syncBtn) {
            spinner.style.display = 'none';
            syncBtn.disabled = false;
            syncBtn.innerText = 'Sincronizar con Servidor';
        }
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

// Camera Scanner helper logic using html5-qrcode
let html5QrcodeScanner = null;

function openScanner() {
    // If the scanner element exists, show the modal
    const modal = document.getElementById('scanner-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    // Create new Html5Qrcode instance
    try {
        html5QrcodeScanner = new Html5Qrcode("reader");
        const config = { 
            fps: 15, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0 
        };
        
        // Start scanning with environment/back camera
        html5QrcodeScanner.start(
            { facingMode: "environment" }, 
            config, 
            onScanSuccess, 
            onScanFailure
        ).catch(err => {
            console.error("No se pudo iniciar la cámara: ", err);
            alert("No se pudo iniciar la cámara. Por favor, asegúrate de otorgar permisos de cámara en tu navegador.");
            closeScanner();
        });
    } catch (e) {
        console.error("Error al inicializar html5-qrcode: ", e);
        alert("Error al inicializar la cámara.");
        closeScanner();
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scan success: ${decodedText}`);
    
    try {
        let stationId = null;
        if (decodedText.startsWith("http")) {
            const url = new URL(decodedText);
            stationId = url.searchParams.get("id");
        } else if (decodedText.startsWith("ESTACION-")) {
            stationId = decodedText;
        }
        
        if (stationId && stationId.startsWith("ESTACION-")) {
            const select = document.getElementById('station-id');
            if (select) {
                // Ensure this station option exists
                const exists = Array.from(select.options).some(opt => opt.value === stationId);
                if (!exists) {
                    const opt = document.createElement('option');
                    opt.value = stationId;
                    opt.textContent = `Estación #${stationId.replace('ESTACION-', '')}`;
                    select.appendChild(opt);
                }
                select.value = stationId;
                select.disabled = true; // Lock dropdown for technical inspection
                
                // Show badge
                const badge = document.getElementById('station-locked-badge');
                if (badge) badge.style.display = 'inline-flex';
                
                // Store in sessionStorage to persist
                sessionStorage.setItem('last_scanned_station_id', stationId);
                
                // Vibrate if supported
                if (navigator.vibrate) navigator.vibrate(100);
                
                alert(`🎯 Código QR escaneado con éxito:\n${stationId}\n\nEl selector ha sido bloqueado para esta estación.`);
                closeScanner();
                
                // Open Registrar tab automatically to fill the locked station form
                switchToTab('panel-inspeccionar');
            }
        } else {
            alert(`⚠️ El código QR escaneado no es válido para una estación de cebado.\nContenido: "${decodedText}"`);
        }
    } catch (err) {
        console.error("Error parsing scanned QR text: ", err);
        alert("Error al procesar el código QR.");
    }
}

function onScanFailure(error) {
    // Failures are triggered continuously on frames without QRs. Keep silent.
}

function closeScanner() {
    const modal = document.getElementById('scanner-modal');
    if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
        html5QrcodeScanner.stop().then(() => {
            if (modal) modal.style.display = 'none';
            html5QrcodeScanner = null;
        }).catch(err => {
            console.error("Error stopping camera: ", err);
            if (modal) modal.style.display = 'none';
            html5QrcodeScanner = null;
        });
    } else {
        if (modal) modal.style.display = 'none';
        html5QrcodeScanner = null;
    }
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
        if (!confirm(`⚠️ El rango ${start} - ${end} se cruza con otra asignación:\nCliente: ${overlap.clientName} (Rango: ${overlap.start} - ${overlap.end})\n\n¿Deseas registrarla de todas formas?`)) {
            return;
        }
    }
    
    const newAssignment = {
        id: 'asg_' + Date.now(),
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
    
    alert(`✅ Rango de estaciones ${start} a ${end} asignado con éxito a ${clientName}.`);
}

// Action: Render assignments list table
function renderAssignmentsList() {
    const tbody = document.getElementById('assignments-list');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const assignments = globalAppData.stationAssignments || [];
    if (assignments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888; padding:20px;">No hay rangos de estaciones asignados aún.</td></tr>`;
        return;
    }
    
    assignments.forEach(asg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${asg.clientName}</strong></td>
            <td><span style="font-size:0.95rem; font-weight:600; color:var(--primary);">Estaciones ${asg.start} a ${asg.end}</span></td>
            <td>
                <button type="button" class="btn btn-secondary" onclick="deleteAssignment('${asg.id}')" style="padding: 6px 12px; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 0.8rem; border-radius: 6px; cursor: pointer;">
                    🗑️ Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Action: Delete station range assignment
function deleteAssignment(id) {
    if (!confirm("¿Deseas eliminar esta asignación de rango de estaciones?")) return;
    
    if (globalAppData.stationAssignments) {
        globalAppData.stationAssignments = globalAppData.stationAssignments.filter(item => item.id !== id);
        saveGlobalAppData();
        
        generateStationDropdown();
        renderAssignmentsList();
        renderMonitoreo();
        updateStationClientInfo();
    }
}

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
            const maintStr = (r.maintenance || []).join(', ') || 'Ninguno';
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
        db.collection('users').doc(currentUser.uid).collection('inspecciones')
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
        db.collection('users').doc(currentUser.uid).collection('inspecciones')
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

// Generate PDF Monitoring Report for the selected client
async function generatePDFReport() {
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
    
    // Show spinner or alert that report is generating
    const btn = document.getElementById('btn-generate-pdf-report');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Generando Reporte...';
    
    // 1. Build recommendations block
    let recommendationsHTML = "";
    if (clientSummary.criticalCount > 0) {
        recommendationsHTML = `
            <div style="margin-top: 15px; padding: 15px; border-left: 5px solid #ef4444; background: #fef2f2; border-radius: 6px;">
                <h4 style="margin: 0 0 6px 0; color: #991b1b; font-size: 0.95rem; font-weight: 700;">🚨 Recomendaciones de Acción Inmediata</h4>
                <p style="margin: 0; font-size: 0.82rem; color: #7f1d1d; line-height: 1.45;">
                    Se han identificado <strong>${clientSummary.criticalCount} estaciones en estado crítico</strong> (consumo promedio de cebo superior al 50% o con incidentes recientes de consumo del 75%-100%). Se aconsejan las siguientes medidas de control de plagas:
                </p>
                <ul style="margin: 6px 0 0 0; padding-left: 20px; font-size: 0.8rem; color: #7f1d1d; line-height: 1.45;">
                    <li><strong>Aumentar frecuencia</strong>: Acortar el ciclo de revisión a visitas semanales en las zonas de las estaciones afectadas.</li>
                    <li><strong>Reforzar cebamiento</strong>: Colocar cebo fresco de alta palatabilidad en las estaciones críticas y reponer inmediatamente los consumos al 100%.</li>
                    <li><strong>Barrera Sanitaria</strong>: Inspeccionar y sellar posibles puntos de acceso y grietas en estructuras aledañas.</li>
                </ul>
            </div>
        `;
    } else if (clientSummary.avgConsumption > 20) {
        recommendationsHTML = `
            <div style="margin-top: 15px; padding: 15px; border-left: 5px solid #fbbf24; background: #fffbef; border-radius: 6px;">
                <h4 style="margin: 0 0 6px 0; color: #92400e; font-size: 0.95rem; font-weight: 700;">⚠️ Recomendaciones de Control Preventivo</h4>
                <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.45;">
                    Se detectó una actividad moderada en el predio (consumo promedio del <strong>${clientSummary.avgConsumption}%</strong>). Se sugiere:
                </p>
                <ul style="margin: 6px 0 0 0; padding-left: 20px; font-size: 0.8rem; color: #78350f; line-height: 1.45;">
                    <li><strong>Monitoreo Quincenal</strong>: Continuar con visitas quincenales regulares para supervisar los focos intermedios.</li>
                    <li><strong>Higiene Ambiental</strong>: Limpiar maleza densa, apilar escombros y eliminar acumulación de agua en un radio de 2 metros de las estaciones.</li>
                    <li><strong>Rotación de Ingredientes</strong>: Rotar el tipo de cebo químico para prevenir acostumbramiento o aversión.</li>
                </ul>
            </div>
        `;
    } else {
        recommendationsHTML = `
            <div style="margin-top: 15px; padding: 15px; border-left: 5px solid #10b981; background: #ecfdf5; border-radius: 6px;">
                <h4 style="margin: 0 0 6px 0; color: #065f46; font-size: 0.95rem; font-weight: 700;">✅ Estado de Monitoreo: Bajo Control</h4>
                <p style="margin: 0; font-size: 0.82rem; color: #064e3b; line-height: 1.45;">
                    El predio presenta niveles muy bajos de actividad de roedores (consumo promedio del <strong>${clientSummary.avgConsumption}%</strong>). Se sugiere:
                </p>
                <ul style="margin: 6px 0 0 0; padding-left: 20px; font-size: 0.8rem; color: #064e3b; line-height: 1.45;">
                    <li><strong>Mantenimiento Regular</strong>: Mantener el ciclo ordinario mensual de visitas técnicas para recambiar cebo deteriorado.</li>
                    <li><strong>Inspección Física</strong>: Evaluar el estado de anclaje, tapas y llaves de las cajas de cebado para evitar manipulaciones ajenas.</li>
                </ul>
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
            lastMaint = (analytics.latestRecord.maintenance || []).join(', ') || 'Ninguno';
            lastEvid = (analytics.latestRecord.evidence || []).join(', ') || 'Ninguna';
            lastNotes = analytics.latestRecord.notes || '-';
        }
        
        latestInspectionsHTML += `
            <tr style="border-bottom: 1px solid #e2e8f0; font-size: 0.8rem;">
                <td style="padding: 10px 8px; font-weight: 700; color: #1e293b; text-align: left;">Estación #${String(num).padStart(2, '0')}</td>
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
            const maint = (r.maintenance || []).join(', ') || 'Ninguno';
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
            <div style="margin-bottom: 15px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #f8fafc; page-break-inside: avoid;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.85rem; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; font-weight: 700;">
                    Estación #${String(num).padStart(2, '0')}
                </h5>
                ${rows}
            </div>
        `;
    });

    // Collect active map stations coordinates for bounds centering inside generation
    const mapStations = [];
    clientStations.forEach(num => {
        const stationKey = `ESTACION-${String(num).padStart(2, '0')}`;
        const coords = getLatestStationCoords(stationKey);
        if (coords && coords.lat && coords.lng) {
            mapStations.push({
                num: num,
                coords: coords
            });
        }
    });

    // 4. Create a hidden layout container (fixed at 0,0 but z-indexed behind the main app)
    const pdfWrapper = document.createElement('div');
    pdfWrapper.id = 'temp-pdf-wrapper';
    pdfWrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 210mm;
        height: 100%;
        overflow: hidden;
        z-index: -9999;
        background: transparent;
        pointer-events: none;
    `;

    const reportContainer = document.createElement('div');
    reportContainer.id = 'temp-pdf-report';
    reportContainer.className = 'formal-document';
    reportContainer.style.cssText = `
        position: relative;
        background: #ffffff;
        color: #1e293b;
        font-family: 'Inter', system-ui, sans-serif;
        box-sizing: border-box;
        line-height: 1.5;
    `;
    
    reportContainer.innerHTML = `
        <!-- Header -->
        <div class="doc-header" style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <img src="logo.png" alt="Stahlgraf Logo" style="max-height: 90px; width: auto; object-fit: contain;" onerror="this.style.display='none'">
                <div style="text-align: right;">
                    <h1 style="margin: 0; font-size: 18pt; color: #222; text-transform: uppercase; font-weight: 700;">INFORME DE TRAZABILIDAD QR</h1>
                    <p style="margin: 5px 0 0 0; font-size: 10pt; color: #555;">Fecha: <strong>${new Date().toLocaleDateString('es-CL')}</strong></p>
                    <p style="margin: 0; font-size: 10pt; color: #555;">Estaciones Activas: <strong>${clientStations.length}</strong></p>
                </div>
            </div>
        </div>
        
        <!-- Client Details card -->
        <div class="doc-section">
            <h2>1. Información del Cliente & Resumen</h2>
            <table class="doc-table-simple">
                <tr>
                    <th style="width: 25%; background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Cliente</th>
                    <td style="width: 40%; font-weight: 600; padding: 6px; border: 1px solid #ddd;">${clientName}</td>
                    <th style="width: 20%; background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Revisadas</th>
                    <td style="width: 15%; padding: 6px; border: 1px solid #ddd;">${clientSummary.inspectedStations} / ${clientSummary.totalStations}</td>
                </tr>
                <tr>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Dirección</th>
                    <td style="padding: 6px; border: 1px solid #ddd;">${clientAddress}</td>
                    <th style="background: #f8f9fa; font-weight: bold; text-align: left; padding: 6px; border: 1px solid #ddd;">Consumo Promedio</th>
                    <td style="font-weight: 700; color: ${clientSummary.avgConsumption > 50 ? '#ef4444' : '#10b981'}; padding: 6px; border: 1px solid #ddd;">${clientSummary.avgConsumption}%</td>
                </tr>
            </table>
        </div>

        <!-- Map Container Area inside PDF -->
        <div class="doc-section">
            <h2>2. Plano Satelital del Predio</h2>
            <div id="pdf-map-placeholder" style="margin-bottom: 25px; border-radius: 8px; overflow: hidden; border: 1px solid #ccc; height: 350px;"></div>
        </div>
        
        <!-- Recommendations block -->
        <div class="doc-section">
            <h2>3. Diagnóstico y Recomendaciones de Control</h2>
            ${recommendationsHTML}
        </div>
        
        <div style="page-break-before: always;"></div>

        <!-- Latest inspections details -->
        <div class="doc-section">
            <h2>4. Detalles de Última Inspección por Caja</h2>
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
        
        <!-- Historical entries per box -->
        <div class="doc-section">
            <h2>5. Historial Cronológico por Estación</h2>
            <div>
                ${historyHTML}
            </div>
        </div>
    `;
    
    pdfWrapper.appendChild(reportContainer);
    document.body.appendChild(pdfWrapper);

    // 5. Temporarily move map container into report container if map exists and has station coordinates
    const originalMap = document.getElementById('monitoreo-map');
    let originalParent = null;
    let nextSibling = null;
    const hasMapData = mapStations.length > 0 && leafletMap;
    let esriTileLayer = null;

    const pdfMapPlaceholder = reportContainer.querySelector('#pdf-map-placeholder');
    const bounds = mapStations.map(s => [s.coords.lat, s.coords.lng]);
    
    if (hasMapData) {
        // Swap to Esri World Imagery (CORS-compliant) for PDF rendering
        if (activeTileLayer) {
            leafletMap.removeLayer(activeTileLayer);
        }
        esriTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 20,
            crossOrigin: true
        }).addTo(leafletMap);

        originalParent = originalMap.parentNode;
        nextSibling = originalMap.nextSibling;
        pdfMapPlaceholder.appendChild(originalMap);
        
        // Re-draw map and recalculate Leaflet dimensions
        leafletMap.invalidateSize();
        
        // Fit map bounds to make sure the screenshot fits perfectly
        if (bounds.length > 0) {
            if (bounds.length === 1) {
                leafletMap.setView(bounds[0], 17);
            } else {
                leafletMap.fitBounds(bounds, { padding: [40, 40] });
            }
        }
    } else {
        // Render a clean placeholder inside the PDF
        pdfMapPlaceholder.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f8fafc; color: #64748b; padding: 40px; text-align: center; box-sizing: border-box; font-family: sans-serif;">
                <span style="font-size: 2.2rem; margin-bottom: 10px; display: block;">📍</span>
                <strong style="color: #334155; font-size: 0.95rem; font-weight: 700; display: block;">Ubicación Satelital Pendiente</strong>
                <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: #64748b; max-width: 320px; line-height: 1.45;">
                    Las estaciones de este cliente no poseen coordenadas geográficas registradas. Registre una ubicación en el modo instalación para habilitar el plano.
                </p>
            </div>
        `;
    }
    
    // 6. Wait for rendering, then run html2pdf
    setTimeout(async () => {
        try {
            const options = {
                margin: [10, 0, 15, 0],
                filename: `Reporte_Monitoreo_${clientName.replace(/\s+/g, '_')}_${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    logging: false,
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'] }
            };
            
            await html2pdf().from(reportContainer).set(options).save();
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("⚠️ Error al generar el PDF. Asegúrate de tener conexión a internet para descargar las imágenes del mapa.");
        } finally {
            if (hasMapData && originalParent) {
                // Restore original Google Hybrid tile layer
                if (esriTileLayer) {
                    leafletMap.removeLayer(esriTileLayer);
                }
                if (activeTileLayer) {
                    activeTileLayer.addTo(leafletMap);
                }

                // Restore map back to its UI home!
                originalParent.insertBefore(originalMap, nextSibling);
                
                // Re-invalidate UI map layout
                leafletMap.invalidateSize();
                if (bounds.length > 0) {
                    if (bounds.length === 1) {
                        leafletMap.setView(bounds[0], 17);
                    } else {
                        leafletMap.fitBounds(bounds, { padding: [40, 40] });
                    }
                }
            }
            
            // Remove printable report template elements from DOM
            pdfWrapper.remove();
            
            // Restore button text
            btn.disabled = false;
            btn.innerText = originalText;
        }
    }, 400); // 400ms wait to allow Leaflet mapping to fully settle in PDF div
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
