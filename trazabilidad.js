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

    // Event Bindings
    document.getElementById('btn-sync-login').addEventListener('click', () => {
        if (!auth) return alert("Firebase no está configurado.");
        if (currentUser) {
            if (confirm("¿Deseas cerrar sesión?")) auth.signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
    });

    document.getElementById('btn-save-inspection').addEventListener('click', saveInspection);
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
    document.getElementById('btn-export-json').addEventListener('click', exportJSON);
    document.getElementById('btn-clear-local').addEventListener('click', clearLocalData);
    document.getElementById('btn-sync-cloud').addEventListener('click', syncWithCloud);
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

// Check if URL has ?id=ESTACION-XX parameter
function checkURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
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
    
    // Show premium visual feedback
    alert(`✅ ¡Inspección de ${station} registrada con éxito de forma local!`);
    
    // Clear inputs (except station if locked)
    resetInspectionForm();
    renderMonitoreo();
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
            latest = stationRecords[stationRecords.length - 1];
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

// Sync pending local records to Firebase Firestore
async function syncWithCloud() {
    if (!currentUser || !db) {
        return alert("⚠️ Debes iniciar sesión con Google mediante el botón superior para sincronizar con la nube.");
    }
    
    loadLocalInspections();
    const pending = inspections.filter(r => r.status === 'pendiente');
    
    if (pending.length === 0) {
        return alert("¡Todos tus registros locales ya están sincronizados con la nube!");
    }
    
    const spinner = document.getElementById('sync-spinner');
    const syncBtn = document.getElementById('btn-sync-cloud');
    
    spinner.style.display = 'inline-block';
    syncBtn.disabled = true;
    syncBtn.innerText = 'Sincronizando...';
    
    try {
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
        
        alert(`🎉 ¡Éxito! Se han sincronizado ${pending.length} registros con el servidor de la nube.`);
        renderMonitoreo();
        
    } catch (err) {
        console.error("Cloud synchronization failed: ", err);
        alert("Ocurrió un error al sincronizar con Firestore. Por favor, verifica tu conexión a internet.");
    } finally {
        spinner.style.display = 'none';
        syncBtn.disabled = false;
        syncBtn.innerText = 'Sincronizar con Servidor';
    }
}
