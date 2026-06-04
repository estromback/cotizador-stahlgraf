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
let globalAppData = {
    clients: [],
    stationAssignments: []
};

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
    if (chkInstallMode && installClientContainer) {
        chkInstallMode.addEventListener('change', () => {
            if (chkInstallMode.checked) {
                installClientContainer.style.display = 'block';
                updateStationClientInfo();
            } else {
                installClientContainer.style.display = 'none';
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
});

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
    
    const newRecord = {
        id: 'ins_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        station,
        consumption,
        maintenance,
        evidence,
        notes,
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
}

// Render Monitoreo Panel (Heatmap and Table history)
function renderMonitoreo() {
    loadLocalInspections();
    
    const pendingCount = inspections.filter(r => r.status === 'pendiente').length;
    document.getElementById('stat-pending-count').innerText = pendingCount;
    
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const filterClientIdSelect = document.getElementById('filter-client-id');
    const filterClientId = filterClientIdSelect ? filterClientIdSelect.value : '';
    
    let filterClientName = '';
    if (filterClientId) {
        const clientObj = (globalAppData.clients || []).find(c => c.id === filterClientId);
        if (clientObj) filterClientName = clientObj.name;
    }
    
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
        
        // Find latest local record for this station
        const stationRecords = inspections.filter(r => r.station === stationKey);
        let latest = null;
        if (stationRecords.length > 0) {
            // Robust check using numerical creation timestamp to guarantee newest record is chosen
            latest = stationRecords.reduce((newest, current) => {
                return getRecordTimestamp(current) > getRecordTimestamp(newest) ? current : newest;
            }, stationRecords[0]);
            uniqueInspected.add(stationKey);
            reviewedCount++;
        }
        
        let stateClass = 'station-gray';
        let statusText = 'Pendiente';
        
        if (latest) {
            const consumption = latest.consumption;
            if (consumption === '0%') {
                stateClass = 'station-green';
                statusText = 'Intacto (0%)';
            } else if (consumption === '25-50%') {
                stateClass = 'station-yellow';
                statusText = 'Parcial (50%)';
            } else {
                stateClass = 'station-red';
                statusText = `Alerta (${consumption})`;
            }
        }
        
        const cell = document.createElement('div');
        cell.className = `station-cell ${stateClass}`;
        
        const clientLabel = clientName ? `<span style="font-size:0.65rem; color:#aaa; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top:2px; font-weight: 500;">👤 ${clientName}</span>` : '';
        
        cell.innerHTML = `
            <span class="num">${numStr}</span>
            <span class="status-lbl">${statusText}</span>
            ${clientLabel}
        `;
        
        // Clicking cell opens Form view and selects this station (if not locked by URL)
        cell.addEventListener('click', () => {
            const select = document.getElementById('station-id');
            if (!select.disabled) {
                // Ensure this dynamically generated station exists in select options
                const exists = Array.from(select.options).some(opt => opt.value === stationKey);
                if (!exists) {
                    const opt = document.createElement('option');
                    opt.value = stationKey;
                    opt.textContent = clientName ? `Estación #${numStr} - ${clientName}` : `Estación #${numStr}`;
                    select.appendChild(opt);
                }
                select.value = stationKey;
            }
            
            // Switch tab to form editor
            switchToTab('panel-inspeccionar');
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
    csvContent += "ID_Inspeccion,Estacion,Fecha_Hora,Consumo_Cebo,Mantenimiento,Evidencias,Observaciones,Estado_Sincronizacion\n";
    
    inspections.forEach(ins => {
        const maintStr = (ins.maintenance || []).join('; ');
        const evidStr = (ins.evidence || []).join('; ');
        const notesClean = (ins.notes || '').replace(/"/g, '""');
        
        const row = [
            ins.id,
            ins.station,
            ins.timestamp,
            ins.consumption,
            `"${maintStr}"`,
            `"${evidStr}"`,
            `"${notesClean}"`,
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

// Expose deleteAssignment to the global scope for HTML inline onclick
window.deleteAssignment = deleteAssignment;
window.openReassignModal = openReassignModal;
window.closeReassignModal = closeReassignModal;
