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
    loadLocalInspections();
    generateStationDropdown();
    checkURLParameters();
    setupTabSwitching();
    setupCheckboxMutualExclusions();
    renderMonitoreo();
    handleAuthRedirects();

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

// Generate Station Dropdown options ESTACION-01 to ESTACION-15
function generateStationDropdown() {
    const select = document.getElementById('station-id');
    if (!select) return;
    select.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const numStr = String(i).padStart(2, '0');
        const opt = document.createElement('option');
        opt.value = `ESTACION-${numStr}`;
        opt.textContent = `Estación #${numStr}`;
        select.appendChild(opt);
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
    }
}

// Switch tabs dynamically
function setupTabSwitching() {
    document.querySelectorAll('.tab-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            document.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const panel = document.getElementById(targetId);
            if (panel) panel.classList.add('active');
            
            // Re-render when switching to monitoring panel
            if (targetId === 'panel-monitoreo') {
                renderMonitoreo();
            }
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
    
    let uniqueInspected = new Set();
    
    for (let i = 1; i <= 15; i++) {
        const numStr = String(i).padStart(2, '0');
        const stationKey = `ESTACION-${numStr}`;
        
        // Find latest local record for this station
        const stationRecords = inspections.filter(r => r.station === stationKey);
        let latest = null;
        if (stationRecords.length > 0) {
            // Robust check using numerical creation timestamp to guarantee newest record is chosen
            latest = stationRecords.reduce((newest, current) => {
                return getRecordTimestamp(current) > getRecordTimestamp(newest) ? current : newest;
            }, stationRecords[0]);
            uniqueInspected.add(stationKey);
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
        cell.innerHTML = `
            <span class="num">${numStr}</span>
            <span class="status-lbl">${statusText}</span>
        `;
        
        // Clicking cell opens Form view and selects this station (if not locked by URL)
        cell.addEventListener('click', () => {
            const select = document.getElementById('station-id');
            if (!select.disabled) {
                select.value = stationKey;
            }
            
            // Switch tab
            document.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            document.querySelector('.tab-trigger[data-target="panel-inspeccionar"]').classList.add('active');
            document.getElementById('panel-inspeccionar').classList.add('active');
        });
        
        grid.appendChild(cell);
    }
    
    document.getElementById('stat-reviewed-count').innerText = `${uniqueInspected.size} / 15`;
    
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
    sorted.forEach(ins => {
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
