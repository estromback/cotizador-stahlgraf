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
    const saved = localStorage.getItem('stahlgraf_data');
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
    localStorage.setItem('stahlgraf_data', JSON.stringify(appData));
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
        });
    }

    // Clients Import
    document.getElementById('btn-import-clients')?.addEventListener('click', async () => {
        if (!currentUser || !db) return alert("Inicia sesión para importar.");
        const btnImport = document.getElementById('btn-import-clients');
        const origText = btnImport.innerText;
        btnImport.innerText = "Importando...";
        btnImport.disabled = true;

        try {
            const snap = await db.collection('users').doc(currentUser.uid).collection('quotes').get();
            if (snap.empty) {
                alert("No hay cotizaciones previas en la nube.");
                return;
            }
            let added = 0;
            snap.forEach(doc => {
                const data = doc.data();
                const name = (data['client-name'] || data.clientName || '').trim();
                if (!name || name.toLowerCase() === 'sin nombre' || name === '-') return;
                
                const existingIndex = appData.clients.findIndex(c => (c.name || '').toLowerCase() === name.toLowerCase());
                if (existingIndex === -1) {
                    appData.clients.push({
                        id: 'cl_' + Date.now() + Math.floor(Math.random() * 10000),
                        name: name,
                        attention: (data['client-attention'] || '').trim(),
                        phone: (data['client-phone'] || '').trim(),
                        address: (data['client-address'] || '').trim()
                    });
                    added++;
                }
            });
            if (added > 0) {
                saveData();
                renderClientsSettings();
                alert(`¡Éxito! Se importaron ${added} clientes únicos.`);
            } else {
                alert("No se encontraron clientes nuevos para importar.");
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            btnImport.innerText = origText;
            btnImport.disabled = false;
        }
    });
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
    renderClientsSettings();
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

function deleteClient(id) {
    if(confirm("¿Seguro que deseas eliminar este cliente?")) {
        appData.clients = appData.clients.filter(c => c.id !== id);
        saveData();
        renderClientsSettings();
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

function renderClientsSettings() {
    const list = document.getElementById('db-clients-settings-list');
    list.innerHTML = '';
    if(!appData.clients || appData.clients.length === 0) {
        list.innerHTML = '<p style="color:#aaa;">No hay clientes en la base de datos local.</p>';
        return;
    }
    appData.clients.forEach(cl => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.innerHTML = `
            <div class="db-item-info">
                <strong>${cl.name}</strong>
                <span>Tel: ${cl.phone || '-'} | Dir: ${cl.address || '-'}</span>
            </div>
            <div class="db-item-actions">
                <button class="action-danger" onclick="deleteClient('${cl.id}')">Eliminar</button>
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
