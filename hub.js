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
let activeClientSelectionTarget = 'crm';
let quickServiceFetchedPrice = 0;

// Client portal map variables
let clientPortalMap = null;
let clientPortalMarkerGroup = null;

function getActiveUid() {
    return localStorage.getItem('stahlgraf_target_uid') || (currentUser ? currentUser.uid : null);
}

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
    crmColumns: 'Formulario, Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos'
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
    clientsList = appData.clients || [];
}

function saveData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    if (currentUser && db) {
        db.collection('users').doc(getActiveUid()).set(appData, { merge: true })
            .catch(err => console.error("Error saving to Firebase:", err));
    }
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
            
            const emailKey = user.email.toLowerCase();
            db.collection('user_roles').doc(emailKey).get().then(doc => {
                if (doc.exists) {
                    const roleData = doc.data();
                    localStorage.setItem('stahlgraf_user_role', roleData.role || 'tech');
                    localStorage.setItem('stahlgraf_target_uid', roleData.ownerUid || user.uid);
                    if (roleData.linkedClientId) {
                        localStorage.setItem('stahlgraf_linked_client_id', roleData.linkedClientId);
                        localStorage.setItem('stahlgraf_client_name', roleData.clientName || '');
                    } else {
                        localStorage.removeItem('stahlgraf_linked_client_id');
                        localStorage.removeItem('stahlgraf_client_name');
                    }
                } else {
                    alert("⚠️ Acceso denegado: Su correo no está autorizado en esta plataforma.");
                    auth.signOut().then(() => {
                        localStorage.clear();
                        window.location.href = 'index.html';
                    });
                    return;
                }
                
                checkTechnicalMode();
                loadDashboardStats();
                subscribeToCRM();
                syncFromFirebase();
            }).catch(err => {
                console.error("Error checking user role:", err);
                alert("⚠️ Error de autenticación o acceso denegado. Intente nuevamente.");
                auth.signOut().then(() => {
                    localStorage.clear();
                    window.location.href = 'index.html';
                });
            });
        } else {
            // Redirect to public landing page if not logged in
            window.location.href = 'index.html';
            
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

    // Exit Technical View Button (only for admin user looking at tech view)
    const btnExitTech = document.getElementById('btn-exit-tech-mode');
    if (btnExitTech) {
        btnExitTech.addEventListener('click', () => {
            sessionStorage.removeItem('trazabilidad_mode');
            window.history.replaceState({}, document.title, window.location.pathname);
            checkTechnicalMode();
        });
    }

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
        modal.classList.remove('active');
    });
    if (document.getElementById('btn-cancel-settings')) {
        document.getElementById('btn-cancel-settings').addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    if (document.getElementById('btn-save-settings')) {
        document.getElementById('btn-save-settings').addEventListener('click', () => {
            saveSettingsFromUI();
            modal.classList.remove('active');
        });
    }

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
            activeClientSelectionTarget = 'crm';
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

    // Quick Service Registration Modal bindings
    const quickServiceModal = document.getElementById('quick-service-modal');
    if (document.getElementById('btn-quick-service')) {
        document.getElementById('btn-quick-service').addEventListener('click', (e) => {
            e.preventDefault();
            // Reset modal inputs
            document.getElementById('quick-service-client-id').value = '';
            document.getElementById('quick-service-client-name').innerText = 'Ninguno seleccionado';
            document.getElementById('quick-service-type').selectedIndex = 0;
            document.getElementById('quick-service-notes').value = '';
            
            // Reset technical fields
            document.getElementById('quick-service-coverage').value = 'both';
            document.getElementById('quick-service-exterior-zones').value = 'none';
            document.getElementById('quick-service-area').value = '';
            document.getElementById('quick-service-chemical').value = '';
            quickServiceFetchedPrice = 0;
            
            // Set date to today
            const todayStr = new Date().toISOString().split('T')[0];
            document.getElementById('quick-service-date').value = todayStr;
            
            // Set default technician from localStorage
            document.getElementById('quick-service-technician').value = localStorage.getItem('last_technician') || '';
            
            quickServiceModal.classList.add('active');
        });
    }

    if (document.getElementById('btn-close-quick-service')) {
        document.getElementById('btn-close-quick-service').addEventListener('click', () => {
            quickServiceModal.classList.remove('active');
        });
    }
    if (document.getElementById('btn-quick-service-cancel')) {
        document.getElementById('btn-quick-service-cancel').addEventListener('click', () => {
            quickServiceModal.classList.remove('active');
        });
    }

    // Selector de cliente para servicio rápido
    if (document.getElementById('btn-quick-service-select-client')) {
        document.getElementById('btn-quick-service-select-client').addEventListener('click', () => {
            activeClientSelectionTarget = 'quick-service';
            document.getElementById('clients-modal').classList.add('active');
            renderClientsSelect();
        });
    }

    // Quick Templates click listeners
    document.querySelectorAll('.quick-tmpl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            const notes = btn.getAttribute('data-notes');
            
            document.getElementById('quick-service-type').value = type;
            document.getElementById('quick-service-notes').value = notes;
        });
    });

    // Guardar servicio rápido
    if (document.getElementById('btn-quick-service-save')) {
        document.getElementById('btn-quick-service-save').addEventListener('click', async () => {
            const clientId = document.getElementById('quick-service-client-id').value;
            const clientName = document.getElementById('quick-service-client-name').innerText;
            const type = document.getElementById('quick-service-type').value;
            const date = document.getElementById('quick-service-date').value;
            const technician = document.getElementById('quick-service-technician').value.trim();
            const notes = document.getElementById('quick-service-notes').value.trim();
            
            const coverage = document.getElementById('quick-service-coverage').value;
            const exteriorZones = document.getElementById('quick-service-exterior-zones').value;
            const area = parseInt(document.getElementById('quick-service-area').value) || 0;
            const chemical = document.getElementById('quick-service-chemical').value.trim();
            
            if (!clientId) {
                return alert("Por favor, selecciona un cliente.");
            }
            if (!date) {
                return alert("Por favor, selecciona la fecha del servicio.");
            }
            
            const servicePayload = {
                id: 'srv_' + Date.now(),
                clientId,
                clientName,
                type,
                date,
                price: quickServiceFetchedPrice,
                technician: technician || 'No asignado',
                coverage,
                exteriorZones,
                area,
                chemical,
                notes: notes || '-'
            };
            
            const btn = document.getElementById('btn-quick-service-save');
            btn.disabled = true;
            btn.innerText = 'Guardando...';
            
            try {
                if (!appData.services) appData.services = [];
                appData.services.push(servicePayload);
                localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
                
                if (currentUser && db) {
                    await db.collection('users').doc(getActiveUid()).collection('services').doc(servicePayload.id).set(servicePayload);
                }
                
                if (technician) {
                    localStorage.setItem('last_technician', technician);
                }
                
                alert("✅ Servicio registrado exitosamente.");
                quickServiceModal.classList.remove('active');
            } catch(e) {
                console.error("Error saving quick service:", e);
                alert("Ocurrió un error al guardar el servicio.");
            } finally {
                btn.disabled = false;
                btn.innerText = '💾 Guardar Servicio';
            }
        });
    }
    
    // Toggle Client selection dropdown visibility based on selected role in settings
    const selectRole = document.getElementById('new-user-role');
    const clientContainer = document.getElementById('new-user-client-container');
    if (selectRole && clientContainer) {
        selectRole.addEventListener('change', () => {
            clientContainer.style.display = selectRole.value === 'client' ? 'block' : 'none';
        });
    }
    
    // Add user access click handler
    const btnAddUser = document.getElementById('btn-add-user-access');
    if (btnAddUser) {
        btnAddUser.addEventListener('click', async () => {
            const emailInput = document.getElementById('new-user-email');
            const email = emailInput.value.trim().toLowerCase();
            const role = document.getElementById('new-user-role').value;
            const clientId = document.getElementById('new-user-client-id').value;
            const clientSelect = document.getElementById('new-user-client-id');
            const clientName = clientSelect && clientSelect.selectedIndex !== -1 ? clientSelect.options[clientSelect.selectedIndex].text : '';
            
            if (!email) {
                return alert("Por favor, ingresa el correo Google del usuario.");
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return alert("Por favor, ingresa un correo electrónico válido.");
            }
            
            if (currentUser && email === currentUser.email.toLowerCase()) {
                return alert("No es necesario agregarte a ti mismo (eres el administrador principal).");
            }
            
            if (!appData.userAccessList) appData.userAccessList = [];
            if (appData.userAccessList.some(u => u.email === email)) {
                return alert("Este correo ya tiene un acceso registrado.");
            }
            
            const newUser = {
                email,
                role,
                linkedClientId: role === 'client' ? clientId : null,
                clientName: role === 'client' ? clientName : null,
                ownerUid: currentUser.uid,
                ownerEmail: currentUser.email
            };
            
            btnAddUser.disabled = true;
            btnAddUser.innerText = 'Guardando...';
            
            try {
                if (currentUser && db) {
                    await db.collection('user_roles').doc(email).set(newUser);
                }
                
                appData.userAccessList.push(newUser);
                saveData();
                
                emailInput.value = '';
                document.getElementById('new-user-role').value = 'tech';
                if (clientContainer) clientContainer.style.display = 'none';
                
                renderUserAccessList();
                alert("✅ Nuevo acceso guardado y autorizado con éxito.");
            } catch(e) {
                console.error("Error creating user access:", e);
                alert("Ocurrió un error al guardar el acceso. Asegúrate de tener permisos.");
            } finally {
                btnAddUser.disabled = false;
                btnAddUser.innerText = 'Guardar Acceso';
            }
        });
    }
    
    // Check and apply technical mode restrictions
    checkTechnicalMode();
});

// Function to handle technician restricted view on dashboard
function checkTechnicalMode() {
    const params = new URLSearchParams(window.location.search);
    let mode = params.get('mode');
    const role = localStorage.getItem('stahlgraf_user_role') || 'guest';
    
    // Clear mode parameter if url is empty
    if (!window.location.search) {
        sessionStorage.removeItem('trazabilidad_mode');
    }
    
    // Set trazabilidad_mode in sessionStorage based on URL or Role
    if (role === 'tech') {
        sessionStorage.setItem('trazabilidad_mode', 'tech');
    } else if (mode === 'tech') {
        sessionStorage.setItem('trazabilidad_mode', 'tech');
    } else if (mode === 'admin') {
        sessionStorage.setItem('trazabilidad_mode', 'admin');
    }
    
    const activeMode = sessionStorage.getItem('trazabilidad_mode');
    
    // Elements to manage
    const appsGrid = document.querySelector('.apps-grid');
    const adminCards = [
        'card-cotizador',
        'card-informador',
        'card-crm',
        'card-clientes',
        'card-trazabilidad',
        'card-finanzas',
        'card-satisfaccion'
    ];
    const btnQuickService = document.getElementById('btn-quick-service');
    const btnQuickInspect = document.getElementById('btn-quick-inspect');
    const btnSettings = document.getElementById('btn-settings');
    const calendarPanel = document.getElementById('calendar-panel');
    const dashboardPanel = document.getElementById('dashboard-panel');
    const clientPortal = document.getElementById('client-portal-container');
    const btnExitTech = document.getElementById('btn-exit-tech-mode');
    
    // Toggle Exit Tech Mode button for admin users currently viewing tech mode
    if (role === 'admin' && activeMode === 'tech') {
        if (btnExitTech) btnExitTech.style.display = 'inline-flex';
    } else {
        if (btnExitTech) btnExitTech.style.display = 'none';
    }
    
    if (role === 'client') {
        // Hide EVERYTHING administrative/tech
        if (appsGrid) appsGrid.style.display = 'none';
        if (btnSettings) btnSettings.style.display = 'none';
        if (calendarPanel) calendarPanel.style.display = 'none';
        if (dashboardPanel) dashboardPanel.style.display = 'none';
        
        // Show Client Portal
        if (clientPortal) {
            clientPortal.style.display = 'block';
            renderClientPortal();
        }
    } else if (activeMode === 'tech') {
        // Tech Mode layout
        if (appsGrid) appsGrid.style.display = 'grid';
        adminCards.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        if (btnQuickService) btnQuickService.style.display = 'flex';
        if (btnQuickInspect) btnQuickInspect.style.display = 'flex';
        if (btnSettings) btnSettings.style.display = 'none';
        if (calendarPanel) calendarPanel.style.display = 'none';
        if (dashboardPanel) dashboardPanel.style.display = 'none';
        if (clientPortal) clientPortal.style.display = 'none';
    } else {
        // Admin Mode layout (Restore all)
        if (appsGrid) appsGrid.style.display = 'grid';
        adminCards.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'flex';
        });
        if (btnQuickService) btnQuickService.style.display = 'flex';
        if (btnQuickInspect) btnQuickInspect.style.display = 'flex';
        if (btnSettings) btnSettings.style.display = 'block';
        if (calendarPanel) calendarPanel.style.display = 'block';
        if (dashboardPanel) dashboardPanel.style.display = 'block';
        if (clientPortal) clientPortal.style.display = 'none';
    }
}

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

    if (document.getElementById('setting-asana-token')) {
        document.getElementById('setting-asana-token').value = appData.asanaToken || '';
    }
    if (document.getElementById('setting-asana-project')) {
        document.getElementById('setting-asana-project').value = appData.asanaProject || '';
    }
    
    if (document.getElementById('setting-crm-columns')) {
        document.getElementById('setting-crm-columns').value = appData.crmColumns || 'Formulario, Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos';
    }

    renderChemicalsSettings();
    
    // Populate Client selector in users settings tab
    const clientSelect = document.getElementById('new-user-client-id');
    if (clientSelect) {
        clientSelect.innerHTML = '';
        const sorted = [...clientsList].sort((a, b) => a.name.localeCompare(b.name));
        if (sorted.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = '⚠️ Sin clientes en directorio';
            clientSelect.appendChild(opt);
        } else {
            sorted.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name;
                clientSelect.appendChild(opt);
            });
        }
    }
    
    renderUserAccessList();
}

function renderUserAccessList() {
    const tbody = document.getElementById('user-access-list-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const accesses = appData.userAccessList || [];
    
    if (accesses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888; padding:15px;">No hay accesos de usuarios registrados.</td></tr>`;
        return;
    }
    
    accesses.forEach((u, index) => {
        const tr = document.createElement('tr');
        const roleLabel = u.role === 'tech' ? '🛠️ Técnico' : (u.role === 'client' ? '👤 Cliente' : '👑 Administrador');
        const clientLabel = u.role === 'client' ? (u.clientName || 'Sin vincular') : '-';
        
        tr.innerHTML = `
            <td>${u.email}</td>
            <td><strong>${roleLabel}</strong></td>
            <td>${clientLabel}</td>
            <td style="text-align:center;">
                <button type="button" class="btn btn-secondary btn-sm" onclick="removeUserAccess(${index})" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444; padding:3px 8px; font-size:0.75rem; border-radius:6px; cursor:pointer; margin:0;">
                    🗑️ Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.removeUserAccess = async function(index) {
    const accesses = appData.userAccessList || [];
    const user = accesses[index];
    if (!user) return;
    
    if (!confirm(`¿Estás seguro de que deseas eliminar el acceso para ${user.email}?`)) return;
    
    const emailKey = user.email.toLowerCase();
    
    // 1. Delete from root collection user_roles in Firestore
    try {
        if (currentUser && db) {
            await db.collection('user_roles').doc(emailKey).delete();
        }
    } catch(err) {
        console.error("Error deleting from user_roles in Firestore:", err);
    }
    
    // 2. Remove from local registry
    accesses.splice(index, 1);
    appData.userAccessList = accesses;
    saveData();
    renderUserAccessList();
    alert("✅ Acceso de usuario eliminado con éxito.");
};

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

    if (document.getElementById('setting-asana-token')) {
        appData.asanaToken = document.getElementById('setting-asana-token').value.trim();
    }
    if (document.getElementById('setting-asana-project')) {
        appData.asanaProject = document.getElementById('setting-asana-project').value.trim();
    }

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
            db.collection('users').doc(getActiveUid()).collection('quotes').get(),
            db.collection('users').doc(getActiveUid()).collection('reports').get()
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
    
    crmListener = db.collection('users').doc(getActiveUid()).collection('crm')
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

function syncFromFirebase() {
    if (!currentUser || !db) return;
    db.collection('users').doc(getActiveUid()).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            
            // Merge cloud data into appData
            appData = { ...appData, ...cloudData };
            
            if (cloudData.clients) {
                clientsList = cloudData.clients;
            }
            
            // Save to local cache
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            
            // Re-render UI elements
            updateSettingsUI();
            if (typeof renderCalendar === 'function') renderCalendar();
        } else {
            // No data in cloud yet, initialize user document with local data
            saveData();
        }
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    }).catch(e => {
        console.error("Error syncing from Firebase: ", e);
        isUserConfigLoaded = true;
        syncCrmClientsToDirectory();
    });
}

function getCRMColumns() {
    const defaultCols = (appData.crmColumns || 'Formulario, Cotizados, Vendidos, Pago Pendiente, Contacto Futuro, Perdidos')
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
    const currentValue = select.value;
    select.innerHTML = '';
    const cols = getCRMColumns();
    cols.forEach(col => {
        const opt = document.createElement('option');
        opt.value = col;
        opt.textContent = col;
        select.appendChild(opt);
    });
    if (currentValue) {
        select.value = currentValue;
    }
}

function renderCalendar(month, year) {
    if (month === undefined || month === null) month = currentMonth;
    if (year === undefined || year === null) year = currentYear;
    
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
        chip.innerText = (event.time ? `${event.time} | ` : '') + event.client;
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
        await db.collection('users').doc(getActiveUid()).collection('crm').doc(cardId).update({
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
        document.getElementById('card-balance-due').value = card.balanceDue !== undefined && card.balanceDue !== null ? card.balanceDue : '';
        document.getElementById('card-date').value = card.date || '';
        document.getElementById('card-time').value = card.time || '';
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
                const baseUrl = window.location.href.split('?')[0].replace('crm.html', 'cotizador.html').replace('index.html', 'cotizador.html').replace('hub.html', 'cotizador.html');
                const prefillUrl = new URL(baseUrl);
                prefillUrl.searchParams.set('prefill', 'true');
                prefillUrl.searchParams.set('name', fd.clientName || card.client);
                prefillUrl.searchParams.set('phone', fd.clientPhone || card.phone || '');
                prefillUrl.searchParams.set('email', fd.clientEmail || card.email || '');
                prefillUrl.searchParams.set('address', fd.clientAddress || '');
                
                const constSize = fd.propertySizeConstruction || fd.propertySize || '';
                if (constSize && constSize !== '-') {
                    prefillUrl.searchParams.set('size', constSize);
                }
                
                // Calculate coverage
                let coverage = 'both';
                if (Array.isArray(fd.treatmentArea)) {
                    const hasInterior = fd.treatmentArea.includes('Interior');
                    const hasExterior = fd.treatmentArea.some(a => a && a.startsWith('Exterior'));
                    if (hasInterior && !hasExterior) {
                        coverage = 'inside';
                    } else if (!hasInterior && hasExterior) {
                        coverage = 'outside';
                    }
                }
                prefillUrl.searchParams.set('coverage', coverage);

                // Calculate rodents
                let hasRodents = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && p.includes('Roedores'))) {
                        hasRodents = 'yes';
                    }
                }
                prefillUrl.searchParams.set('rodents', hasRodents);

                // Calculate moths
                let hasMoths = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && p.includes('Polilla'))) {
                        hasMoths = 'yes';
                    }
                }
                if (hasMoths === 'no' && fd.comments) {
                    if (fd.comments.toLowerCase().includes('polilla')) {
                        hasMoths = 'yes';
                    }
                }
                prefillUrl.searchParams.set('moths', hasMoths);

                // Calculate sanitization
                let hasSani = 'no';
                if (Array.isArray(fd.plagas)) {
                    if (fd.plagas.some(p => p && (p.includes('Sanitiz') || p.includes('Desinfec')))) {
                        hasSani = 'yes';
                    }
                }
                if (hasSani === 'no' && fd.comments) {
                    const commentLower = fd.comments.toLowerCase();
                    if (commentLower.includes('sanitiz') || commentLower.includes('desinfec') || commentLower.includes('virus') || commentLower.includes('bacteria')) {
                        hasSani = 'yes';
                    }
                }
                prefillUrl.searchParams.set('sanitization', hasSani);

                // Pass client comments as observations
                if (fd.comments && fd.comments !== 'Sin comentarios adicionales.') {
                    prefillUrl.searchParams.set('comments', fd.comments);
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
        
        renderModalComments(card);
    } else {
        document.getElementById('modal-card-title').innerText = 'Nuevo Registro CRM';
        document.getElementById('card-id').value = '';
        document.getElementById('card-client').value = '';
        document.getElementById('card-phone').value = '';
        document.getElementById('card-email').value = '';
        document.getElementById('card-column').selectedIndex = 0;
        document.getElementById('card-balance-due').value = '';
        document.getElementById('card-date').value = defaultDate;
        document.getElementById('card-time').value = '';
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
    const balanceDueInput = document.getElementById('card-balance-due').value;
    const balanceDue = balanceDueInput === '' ? null : parseFloat(balanceDueInput) || 0;
    const date = document.getElementById('card-date').value;
    const time = document.getElementById('card-time').value;
    const desc = document.getElementById('card-desc').value.trim();
    
    if (!client) return alert("Ingresa un cliente o título.");
    
    const btn = document.getElementById('btn-save-card');
    btn.disabled = true;
    btn.innerText = 'Guardando...';
    
    try {
        const payload = {
            client, phone, email, column, balanceDue, date, time, desc,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (id) {
            await db.collection('users').doc(getActiveUid()).collection('crm').doc(id).update(payload);
        } else {
            payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            payload.comments = [];
            await db.collection('users').doc(getActiveUid()).collection('crm').add(payload);
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
            await db.collection('users').doc(getActiveUid()).collection('crm').doc(id).delete();
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
        
        await db.collection('users').doc(getActiveUid()).collection('crm').doc(cardId).update({
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

function renderModalComments(card) {
    const commentsList = document.getElementById('card-comments-list');
    commentsList.innerHTML = '';
    
    if (!card || !card.comments || card.comments.length === 0) {
        commentsList.innerHTML = '<p style="color:#666; font-size:0.9rem;">No hay comentarios aún.</p>';
        return;
    }

    card.comments.forEach((c, index) => {
        const cDiv = document.createElement('div');
        cDiv.className = 'comment-item';
        cDiv.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        cDiv.style.paddingBottom = '5px';
        cDiv.style.marginBottom = '8px';
        cDiv.style.display = 'flex';
        cDiv.style.justifyContent = 'space-between';
        cDiv.style.alignItems = 'flex-start';
        cDiv.style.gap = '10px';
        
        cDiv.innerHTML = `
            <div class="comment-content-view" style="flex: 1;">
                <span style="font-size: 0.78rem; color: #aaa; display: block; margin-bottom: 2px;">${c.date}</span>
                <p style="margin: 0; font-size: 0.9rem; white-space: pre-wrap; color: #cbd5e1;">${c.text}</p>
            </div>
            <div class="comment-actions" style="display: flex; gap: 8px; font-size: 0.78rem; align-items: center; padding-top: 2px;">
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
                    <span style="font-size: 0.78rem; color: #aaa;">Editando comentario de ${c.date}</span>
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
                renderModalComments(card);
            };

            cDiv.querySelector('.save-edit-btn').onclick = async (ev) => {
                ev.preventDefault();
                const newText = textarea.value.trim();
                if (!newText) return;
                
                await updateCardComment(card.id, index, newText);
                card.comments[index].text = newText;
                renderModalComments(card);
            };
        };

        deleteLink.onclick = async (e) => {
            e.preventDefault();
            if (confirm("¿Seguro que deseas eliminar este comentario?")) {
                await deleteCardComment(card.id, index);
                card.comments.splice(index, 1);
                renderModalComments(card);
            }
        };

        commentsList.appendChild(cDiv);
    });
    commentsList.scrollTop = commentsList.scrollHeight;
}

async function updateCardComment(cardId, index, newText) {
    if (!currentUser || !db) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card || !card.comments || !card.comments[index]) return;

    const updatedComments = [...card.comments];
    updatedComments[index].text = newText;

    try {
        await db.collection('users').doc(getActiveUid()).collection('crm').doc(cardId).update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error(e);
        alert("Error al actualizar el comentario.");
    }
}

async function deleteCardComment(cardId, index) {
    if (!currentUser || !db) return;
    const card = crmCards.find(c => c.id === cardId);
    if (!card || !card.comments || !card.comments[index]) return;

    const updatedComments = [...card.comments];
    updatedComments.splice(index, 1);

    try {
        await db.collection('users').doc(getActiveUid()).collection('crm').doc(cardId).update({
            comments: updatedComments,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error(e);
        alert("Error al eliminar el comentario.");
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
            if (activeClientSelectionTarget === 'quick-service') {
                loadClientToQuickService(client);
            } else {
                loadClientToForm(client.id);
            }
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

async function loadClientToQuickService(client) {
    if (!client) return;
    document.getElementById('quick-service-client-id').value = client.id;
    document.getElementById('quick-service-client-name').innerText = client.name;
    
    // Clear technical fields
    document.getElementById('quick-service-coverage').value = 'both';
    document.getElementById('quick-service-exterior-zones').value = 'none';
    document.getElementById('quick-service-area').value = '';
    document.getElementById('quick-service-chemical').value = '';
    quickServiceFetchedPrice = 0;
    
    if (currentUser && db) {
        try {
            const snap = await db.collection('users').doc(getActiveUid()).collection('quotes').where('clientName', '==', client.name).get();
            if (!snap.empty) {
                let quotesList = [];
                snap.forEach(doc => {
                    quotesList.push(doc.data());
                });
                
                // Sort by correlative descending, then by timestamp descending
                quotesList.sort((a, b) => {
                    const corrA = parseInt(a.correlative) || 0;
                    const corrB = parseInt(b.correlative) || 0;
                    if (corrB !== corrA) return corrB - corrA;
                    
                    const timeA = a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime()) : 0;
                    const timeB = b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime()) : 0;
                    return timeB - timeA;
                });
                
                const latest = quotesList[0];
                if (latest) {
                    if (latest.totalStr) {
                        const cleanPriceStr = latest.totalStr.replace(/[^0-9]/g, '');
                        quickServiceFetchedPrice = parseInt(cleanPriceStr) || 0;
                    }
                    if (latest['coverage-type']) {
                        document.getElementById('quick-service-coverage').value = latest['coverage-type'];
                    }
                    if (latest['property-size']) {
                        document.getElementById('quick-service-area').value = latest['property-size'];
                    }
                    if (latest['exterior-zones']) {
                        document.getElementById('quick-service-exterior-zones').value = latest['exterior-zones'];
                    }
                    
                    // Translate chemical IDs to names
                    const chemIds = [];
                    if (latest['interior-chem']) chemIds.push(latest['interior-chem']);
                    if (latest['exterior-chem']) chemIds.push(latest['exterior-chem']);
                    if (latest['sanitization-chem']) chemIds.push(latest['sanitization-chem']);
                    
                    const names = [];
                    const chems = appData.chemicals || [];
                    chemIds.forEach(id => {
                        const matched = chems.find(c => c.id === id);
                        if (matched && matched.name) {
                            names.push(matched.name);
                        }
                    });
                    
                    const uniqueNames = [...new Set(names)];
                    if (uniqueNames.length > 0) {
                        document.getElementById('quick-service-chemical').value = uniqueNames.join(', ');
                    }
                }
            }
        } catch (err) {
            console.error("Error loading last quote details:", err);
        }
    }
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
        db.collection('users').doc(getActiveUid()).set(appData, { merge: true })
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
        
        db.collection('users').doc(getActiveUid()).set(appDataLocal, { merge: true })
            .then(() => {
                console.log("Client directory auto-synchronized with Hub CRM cards.");
            })
            .catch(err => console.error("Error auto-saving client directory from Hub CRM:", err));
    }
}

function isStationAssignedToClient(stationName, clientId, clientName) {
    const assignments = appData.stationAssignments || [];
    const match = stationName.match(/ESTACION-(\d+)/i);
    if (!match) return false;
    const num = parseInt(match[1], 10);
    
    const normalize = (str) => (str || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
    const targetNorm = normalize(clientName);
    
    return assignments.some(asg => {
        const idMatch = asg.clientId && clientId && asg.clientId === clientId;
        if (idMatch) {
            return num >= parseInt(asg.start, 10) && num <= parseInt(asg.end, 10);
        }
        
        // Fallback to strict normalized name equality if client IDs are missing/not matched
        const asgNorm = normalize(asg.clientName);
        const nameMatch = asgNorm && (asgNorm === targetNorm);
        return nameMatch &&
            num >= parseInt(asg.start, 10) &&
            num <= parseInt(asg.end, 10);
    });
}

let isClientPortalLoading = false;

async function renderClientPortal() {
    const container = document.getElementById('client-portal-container');
    if (!container) return;
    
    if (isClientPortalLoading) return;
    
    const ownerUid = getActiveUid();
    const clientId = localStorage.getItem('stahlgraf_linked_client_id');
    
    if (!ownerUid || !clientId) {
        container.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 20px; border-radius: 8px; color: #f87171; text-align: center;">
                ⚠️ Error: No se ha configurado la vinculación de este usuario con un cliente del directorio.
            </div>
        `;
        return;
    }
    
    if (!isUserConfigLoaded) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <p style="color: #aaa; margin: 0 0 15px 0;">Sincronizando información del portal de cliente...</p>
                <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid rgba(255,255,255,0.1); border-radius: 50%; border-top-color: var(--primary); animation: spin 1s linear infinite;"></div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        setTimeout(renderClientPortal, 500);
        return;
    }
    
    let clientObj = clientsList.find(c => c.id === clientId);
    if (!clientObj) {
        const storedName = localStorage.getItem('stahlgraf_client_name') || 'Cliente';
        clientObj = {
            id: clientId,
            name: storedName,
            address: 'Dirección registrada en el sistema',
            phone: 'No disponible',
            email: currentUser ? currentUser.email : 'No disponible'
        };
    }
    
    isClientPortalLoading = true;
    const clientName = clientObj.name;
    
    // Query Firestore strictly using the exact client name to prevent data overlap between separate clients with similar names (e.g. "Marcela Fuenzalida" vs "Marcela Fuenzalida Casa")
    const uniqueVariations = [clientName];
    
    // Helper to query collections safely
    async function safeQuery(collectionName, queryRef) {
        try {
            return await queryRef.get();
        } catch (err) {
            console.error(`Error querying ${collectionName} for client portal:`, err);
            return {
                empty: true,
                forEach: () => {},
                docs: [],
                error: err,
                exists: false,
                data: () => ({})
            };
        }
    }
    
    try {
        // Fetch client documents in parallel with safe error wrapping
        const [quotesSnap, reportsSnap, servicesSnap, reportsSentSnap, inspectionsSnap, assignmentsConfigSnap] = await Promise.all([
            safeQuery('quotes', db.collection('users').doc(ownerUid).collection('quotes').where('clientName', 'in', uniqueVariations)),
            safeQuery('reports', db.collection('users').doc(ownerUid).collection('reports').where('clientName', 'in', uniqueVariations)),
            safeQuery('services', db.collection('users').doc(ownerUid).collection('services').where('clientName', 'in', uniqueVariations)),
            safeQuery('station_reports_sent', db.collection('users').doc(ownerUid).collection('station_reports_sent').where('clientName', 'in', uniqueVariations)),
            safeQuery('inspecciones', db.collection('users').doc(ownerUid).collection('inspecciones')),
            safeQuery('inspecciones/assignments_config', db.collection('users').doc(ownerUid).collection('inspecciones').doc('assignments_config'))
        ]);
        
        let assignments = [];
        if (assignmentsConfigSnap && !assignmentsConfigSnap.error && assignmentsConfigSnap.exists) {
            assignments = assignmentsConfigSnap.data().stationAssignments || [];
        }
        appData.stationAssignments = assignments;
        
        container.innerHTML = `
            <div class="client-portal-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h2 style="margin: 0; color: var(--primary); font-size: 1.8rem; display: flex; align-items: center; gap: 10px;">
                        👤 Portal de Cliente: <span style="color: #fff;">${clientName}</span>
                    </h2>
                    <p style="margin: 5px 0 0 0; color: var(--text-muted); font-size: 0.9rem;">
                        📍 ${clientObj.address || 'Sin dirección registrada'} | 📞 ${clientObj.phone || 'Sin teléfono'} | ✉️ ${clientObj.email || 'Sin email'}
                    </p>
                </div>
                <div class="portal-badge">
                    🟢 Cliente Activo
                </div>
            </div>
            
            <!-- Dynamic Dashboard Row -->
            <div class="client-dashboard" id="client-dashboard-row" style="display: none;">
                <!-- Stations Widget -->
                <div class="client-dashboard-card" id="dash-card-stations" style="display: none;">
                    <div class="client-dashboard-icon" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">🎯</div>
                    <div class="client-dashboard-info">
                        <span class="client-dashboard-value" id="dash-val-stations">-</span>
                        <span class="client-dashboard-label">Estaciones de Cebado</span>
                    </div>
                </div>
                <!-- Services Widget -->
                <div class="client-dashboard-card" id="dash-card-services" style="display: none;">
                    <div class="client-dashboard-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">🛠️</div>
                    <div class="client-dashboard-info">
                        <span class="client-dashboard-value" id="dash-val-services">-</span>
                        <span class="client-dashboard-label">Servicios Realizados</span>
                    </div>
                </div>
                <!-- Quotes Widget -->
                <div class="client-dashboard-card" id="dash-card-quotes" style="display: none;">
                    <div class="client-dashboard-icon" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24;">📄</div>
                    <div class="client-dashboard-info">
                        <span class="client-dashboard-value" id="dash-val-quotes">-</span>
                        <span class="client-dashboard-label">Cotizaciones Activas</span>
                    </div>
                </div>
                <!-- Technical Reports Widget -->
                <div class="client-dashboard-card" id="dash-card-reports" style="display: none;">
                    <div class="client-dashboard-icon" style="background: rgba(139, 92, 246, 0.15); color: #a78bfa;">📋</div>
                    <div class="client-dashboard-info">
                        <span class="client-dashboard-value" id="dash-val-reports">-</span>
                        <span class="client-dashboard-label">Informes Técnicos</span>
                    </div>
                </div>
                <!-- Monitoring Reports Widget -->
                <div class="client-dashboard-card" id="dash-card-station-reports" style="display: none;">
                    <div class="client-dashboard-icon" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee;">📥</div>
                    <div class="client-dashboard-info">
                        <span class="client-dashboard-value" id="dash-val-station-reports">-</span>
                        <span class="client-dashboard-label">Reportes de Monitoreo</span>
                    </div>
                </div>
            </div>
            
            <!-- Protagonist Area: Control de Estaciones de Cebado (Full Width at the Top) -->
            <div class="portal-card" id="card-client-stations" style="margin-bottom: 30px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; backdrop-filter: blur(8px);">
                <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-bottom: 20px;">
                    📊 Control de Estaciones de Cebado (Roedores)
                </h3>
                
                <!-- Map Container First (Larger and Protagonist) -->
                <div id="client-portal-map" style="height: 450px; border-radius: 10px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden; background: #1a1a1a;"></div>
                
                <!-- Grid Container Second -->
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px;">Estaciones de cebado activas en tu propiedad y su nivel de consumo en la última visita:</p>
                <div id="client-stations-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px; margin-bottom: 20px;"></div>
                
                <div style="display: flex; gap: 20px; font-size: 0.8rem; justify-content: center; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;">
                    <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:12px; height:12px; background:#10b981; border-radius:50%;"></span> 0% Consumo</span>
                    <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:12px; height:12px; background:#f59e0b; border-radius:50%;"></span> 50% Consumo</span>
                    <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:12px; height:12px; background:#ef4444; border-radius:50%;"></span> 75%+ Consumo</span>
                    <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:12px; height:12px; background:#475569; border-radius:50%;"></span> Sin visitas</span>
                </div>
            </div>

            <!-- Two-Column Area for Other Documents -->
            <div class="client-portal-grid" id="client-portal-grid-docs">
                <!-- Column 1: Quotes and Reports -->
                <div id="client-col-1" style="display: flex; flex-direction: column; gap: 25px;">
                    <!-- Quotes Section -->
                    <div class="portal-card" id="card-client-quotes">
                        <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-bottom: 15px;">
                            📄 Cotizaciones Activas
                        </h3>
                        <div id="client-quotes-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 250px; overflow-y: auto; padding-right: 5px;"></div>
                    </div>

                    <!-- Technical Reports Section -->
                    <div class="portal-card" id="card-client-reports">
                        <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-bottom: 15px;">
                            📋 Informes Técnicos de Servicio
                        </h3>
                        <div id="client-reports-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 250px; overflow-y: auto; padding-right: 5px;"></div>
                    </div>
                </div>

                <!-- Column 2: Certificates and Services -->
                <div id="client-col-2" style="display: flex; flex-direction: column; gap: 25px;">
                    <!-- Station Reports Section -->
                    <div class="portal-card" id="card-client-station-reports">
                        <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-bottom: 15px;">
                            📥 Certificados y Reportes de Monitoreo
                        </h3>
                        <div id="client-station-reports-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 250px; overflow-y: auto; padding-right: 5px;"></div>
                    </div>

                    <!-- Services Section -->
                    <div class="portal-card" id="card-client-services">
                        <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 1.15rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-bottom: 15px;">
                            🛠️ Historial de Aplicaciones Realizadas
                        </h3>
                        <div id="client-services-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto; padding-right: 5px;"></div>
                    </div>
                </div>
            </div>
        `;
        
        // 1. Populate Quotes
        const quotesContainer = document.getElementById('client-quotes-list');
        const quotesCard = document.getElementById('card-client-quotes');
        let quotesCount = 0;
        
        if (quotesSnap.error) {
            if (quotesCard) quotesCard.style.display = 'none';
        } else {
            quotesSnap.forEach(doc => {
                quotesCount++;
                const q = doc.data();
                const dateStr = q.date || 'Sin fecha';
                const priceStr = q.total ? `$${q.total.toLocaleString()}` : '-';
                const correlativeStr = q.correlative || 'N/A';
                const pdfBtn = q.pdfUrl ? `<button onclick="viewPDF('${q.pdfUrl}', 'Cotizacion_${correlativeStr}.pdf')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 6px; cursor: pointer; margin: 0; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa;">📥 PDF</button>` : '<span style="color:#666; font-size:0.75rem;">No disponible</span>';
                
                const div = document.createElement('div');
                div.className = 'portal-item';
                div.innerHTML = `
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: #fff;">Cotización #${correlativeStr}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">📅 ${dateStr} | Total: ${priceStr}</div>
                    </div>
                    <div>${pdfBtn}</div>
                `;
                quotesContainer.appendChild(div);
            });
            if (quotesCount === 0 && quotesCard) {
                quotesCard.style.display = 'none';
            }
        }
        
        // 2. Populate Reports
        const reportsContainer = document.getElementById('client-reports-list');
        const reportsCard = document.getElementById('card-client-reports');
        let reportsCount = 0;
        
        if (reportsSnap.error) {
            if (reportsCard) reportsCard.style.display = 'none';
        } else {
            reportsSnap.forEach(doc => {
                reportsCount++;
                const r = doc.data();
                const dateStr = r.date || 'Sin fecha';
                const titleStr = r.title || `Informe Técnico`;
                const pdfBtn = r.pdfUrl ? `<button onclick="viewPDF('${r.pdfUrl}', 'Informe_${doc.id}.pdf')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 6px; cursor: pointer; margin: 0; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa;">📥 PDF</button>` : '<span style="color:#666; font-size:0.75rem;">No disponible</span>';
                
                const div = document.createElement('div');
                div.className = 'portal-item';
                div.innerHTML = `
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: #fff;">${titleStr}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">📅 ${dateStr}</div>
                    </div>
                    <div>${pdfBtn}</div>
                `;
                reportsContainer.appendChild(div);
            });
            if (reportsCount === 0 && reportsCard) {
                reportsCard.style.display = 'none';
            }
        }
        
        // 3. Populate Services
        const servicesContainer = document.getElementById('client-services-list');
        const servicesCard = document.getElementById('card-client-services');
        let servicesCount = 0;
        
        if (servicesSnap.error) {
            if (servicesCard) servicesCard.style.display = 'none';
        } else {
            const sortedServices = [];
            servicesSnap.forEach(doc => {
                sortedServices.push({ id: doc.id, ...doc.data() });
            });
            sortedServices.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            sortedServices.forEach(s => {
                servicesCount++;
                const dateStr = s.date || 'Sin fecha';
                const typeStr = s.type || 'Servicio';
                const techStr = s.technician || 'No asignado';
                const notesStr = s.notes || '-';
                
                const div = document.createElement('div');
                div.className = 'portal-item';
                div.style.flexDirection = 'column';
                div.style.alignItems = 'stretch';
                div.style.gap = '5px';
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-weight: 600; font-size: 0.9rem; color: #fff;">🛠️ ${typeStr}</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">📅 ${dateStr}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Técnico: <strong style="color:#ccc;">${techStr}</strong></div>
                    <div style="font-size: 0.75rem; color: #aaa; margin-top: 2px; line-height: 1.3;">${notesStr}</div>
                `;
                servicesContainer.appendChild(div);
            });
            if (servicesCount === 0 && servicesCard) {
                servicesCard.style.display = 'none';
            }
        }
        
        // 4. Populate Stations Grid
        const gridContainer = document.getElementById('client-stations-grid');
        const stationsCard = document.getElementById('card-client-stations');
        let assignedStationsCount = 0;
        const assignedStationsData = [];
        
        if (inspectionsSnap.error) {
            if (stationsCard) stationsCard.style.display = 'none';
        } else {
            // Dynamically calculate max stations based on assignments & records
            let maxStations = 15;
            if (Array.isArray(assignments)) {
                assignments.forEach(asg => {
                    const s = parseInt(asg.start, 10);
                    const e = parseInt(asg.end, 10);
                    if (!isNaN(s) && s > maxStations) maxStations = s;
                    if (!isNaN(e) && e > maxStations) maxStations = e;
                });
            }
            if (!inspectionsSnap.error && inspectionsSnap.forEach) {
                inspectionsSnap.forEach(doc => {
                    const data = doc.data();
                    if (data.station) {
                        const match = data.station.match(/ESTACION-(\d+)/i);
                        if (match) {
                            const num = parseInt(match[1], 10);
                            if (!isNaN(num) && num > maxStations) maxStations = num;
                        }
                    }
                });
            }

            for (let i = 1; i <= maxStations; i++) {
                const stationName = `ESTACION-${String(i).padStart(2, '0')}`;
                if (isStationAssignedToClient(stationName, clientId, clientName)) {
                    assignedStationsCount++;
                    
                    let latestInspection = null;
                    let coords = null;
                    
                    inspectionsSnap.forEach(doc => {
                        const data = doc.data();
                        if (data.station === stationName) {
                            const currentTimestamp = data.localTimestamp || data.timestamp || '';
                            const latestTimestamp = latestInspection ? (latestInspection.localTimestamp || latestInspection.timestamp || '') : '';
                            if (!latestInspection || currentTimestamp > latestTimestamp) {
                                latestInspection = data;
                            }
                            
                            // Get station coordinates from the latest inspection record that has coords
                            if (data.coords && data.coords.lat && data.coords.lng) {
                                if (!coords || currentTimestamp > (coords.timestamp || '')) {
                                    coords = {
                                        lat: parseFloat(data.coords.lat),
                                        lng: parseFloat(data.coords.lng),
                                        timestamp: currentTimestamp
                                    };
                                }
                            }
                        }
                    });
                    
                    let bgColor = '#475569';
                    let consumptionText = 'Sin visitas';
                    let formattedTimestamp = '-';
                    let alertActive = false;
                    
                    if (latestInspection) {
                        const cons = latestInspection.consumption || '0%';
                        consumptionText = `Consumo: ${cons}`;
                        formattedTimestamp = latestInspection.localTimestamp || latestInspection.timestamp || '-';
                        
                        if (cons === '0%') bgColor = '#10b981';
                        else if (cons === '25-50%' || cons === '50%') bgColor = '#f59e0b';
                        else if (cons === '75%' || cons === '100%' || cons === '50-75%' || cons === '75-100%') bgColor = '#ef4444';
                        
                        const highCons = ['50-75%', '75%', '100%', '75-100%'].includes(cons);
                        const hasEvid = latestInspection.evidence && latestInspection.evidence.length > 0 && !latestInspection.evidence.includes('Ninguna');
                        alertActive = highCons || hasEvid;
                    }
                    
                    const cell = document.createElement('div');
                    cell.style.cssText = `background: ${bgColor}; padding: 10px; border-radius: 8px; text-align: center; font-weight: bold; border: 1px solid rgba(255,255,255,0.06); cursor: default; display: flex; flex-direction: column; justify-content: center; min-height: 70px;`;
                    cell.innerHTML = `
                        <div style="font-size: 0.65rem; opacity: 0.8; color: #fff;">Estación</div>
                        <div style="font-size: 1.2rem; margin: 2px 0; color: #fff;">${i}</div>
                        <div style="font-size: 0.65rem; opacity: 0.9; color: #fff; white-space: nowrap;">${consumptionText}</div>
                    `;
                    gridContainer.appendChild(cell);
                    
                    assignedStationsData.push({
                        num: i,
                        key: stationName,
                        coords: coords,
                        consumption: latestInspection ? (latestInspection.consumption || '0%') : 'Sin visitas',
                        timestamp: formattedTimestamp,
                        alertActive: alertActive
                    });
                }
            }
            if (assignedStationsCount === 0 && stationsCard) {
                stationsCard.style.display = 'none';
            } else {
                // Initialize/Update the Map with the assigned stations
                setTimeout(() => {
                    initClientPortalMap(assignedStationsData);
                }, 100);
            }
        }
        
        // 5. Populate Station Reports
        const stationReportsContainer = document.getElementById('client-station-reports-list');
        const stationReportsCard = document.getElementById('card-client-station-reports');
        let stationReportsCount = 0;
        
        if (reportsSentSnap.error) {
            if (stationReportsCard) stationReportsCard.style.display = 'none';
        } else {
            reportsSentSnap.forEach(doc => {
                stationReportsCount++;
                const r = doc.data();
                const dateStr = r.date || 'Sin fecha';
                const stationStr = r.station || `Reporte de Monitoreo`;
                const pdfBtn = r.pdfUrl ? `<button onclick="viewPDF('${r.pdfUrl}', 'Reporte_Monitoreo_${doc.id}.pdf')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 6px; cursor: pointer; margin: 0; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa;">📥 PDF</button>` : '<span style="color:#666; font-size:0.75rem;">No disponible</span>';
                
                const div = document.createElement('div');
                div.className = 'portal-item';
                div.innerHTML = `
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: #fff;">${stationStr}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">📅 ${dateStr}</div>
                    </div>
                    <div>${pdfBtn}</div>
                `;
                stationReportsContainer.appendChild(div);
            });
            if (stationReportsCount === 0 && stationReportsCard) {
                stationReportsCard.style.display = 'none';
            }
        }
        
        // Update Dashboard Summary Widgets
        const inspectedStationsCount = assignedStationsData.filter(s => s.consumption !== 'Sin visitas').length;
        
        // Stations Card
        const dashCardStations = document.getElementById('dash-card-stations');
        const dashValStations = document.getElementById('dash-val-stations');
        if (assignedStationsCount > 0) {
            if (dashValStations) dashValStations.textContent = `${inspectedStationsCount}/${assignedStationsCount}`;
            if (dashCardStations) dashCardStations.style.display = 'flex';
        } else {
            if (dashCardStations) dashCardStations.style.display = 'none';
        }
        
        // Services Card
        const dashCardServices = document.getElementById('dash-card-services');
        const dashValServices = document.getElementById('dash-val-services');
        if (servicesCount > 0) {
            if (dashValServices) dashValServices.textContent = `${servicesCount}`;
            if (dashCardServices) dashCardServices.style.display = 'flex';
        } else {
            if (dashCardServices) dashCardServices.style.display = 'none';
        }
        
        // Quotes Card
        const dashCardQuotes = document.getElementById('dash-card-quotes');
        const dashValQuotes = document.getElementById('dash-val-quotes');
        if (quotesCount > 0) {
            if (dashValQuotes) dashValQuotes.textContent = `${quotesCount}`;
            if (dashCardQuotes) dashCardQuotes.style.display = 'flex';
        } else {
            if (dashCardQuotes) dashCardQuotes.style.display = 'none';
        }
        
        // Reports Card
        const dashCardReports = document.getElementById('dash-card-reports');
        const dashValReports = document.getElementById('dash-val-reports');
        if (reportsCount > 0) {
            if (dashValReports) dashValReports.textContent = `${reportsCount}`;
            if (dashCardReports) dashCardReports.style.display = 'flex';
        } else {
            if (dashCardReports) dashCardReports.style.display = 'none';
        }
        
        // Station Reports Card
        const dashCardStationReports = document.getElementById('dash-card-station-reports');
        const dashValStationReports = document.getElementById('dash-val-station-reports');
        if (stationReportsCount > 0) {
            if (dashValStationReports) dashValStationReports.textContent = `${stationReportsCount}`;
            if (dashCardStationReports) dashCardStationReports.style.display = 'flex';
        } else {
            if (dashCardStationReports) dashCardStationReports.style.display = 'none';
        }
        
        // Hide containers / adjust layout depending on element counts
        const totalVisible = 
            (assignedStationsCount > 0 ? 1 : 0) +
            (quotesCount > 0 ? 1 : 0) +
            (reportsCount > 0 ? 1 : 0) +
            (servicesCount > 0 ? 1 : 0) +
            (stationReportsCount > 0 ? 1 : 0);
            
        const dashRow = document.getElementById('client-dashboard-row');
        if (dashRow) {
            if (totalVisible > 0) {
                dashRow.style.display = 'grid';
            } else {
                dashRow.style.display = 'none';
            }
        }
            
        if (totalVisible === 0) {
            const noDataMessage = document.createElement('div');
            noDataMessage.id = 'client-portal-no-data-msg';
            noDataMessage.style.cssText = 'background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.06); padding: 40px; border-radius: 12px; text-align: center; color: var(--text-muted); margin-top: 20px;';
            noDataMessage.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 15px;">📂</div>
                <h3 style="color: #fff; margin: 0 0 10px 0;">Sin información disponible</h3>
                <p style="margin: 0; font-size: 0.9rem;">No se encontraron registros de cotizaciones, visitas técnicas ni estaciones de monitoreo asociadas a tu cuenta actualmente.</p>
            `;
            container.appendChild(noDataMessage);
            
            const gridDocs = document.getElementById('client-portal-grid-docs');
            if (gridDocs) gridDocs.style.display = 'none';
        } else {
            const col1Visible = (quotesCount > 0 ? 1 : 0) + (reportsCount > 0 ? 1 : 0);
            const col2Visible = (stationReportsCount > 0 ? 1 : 0) + (servicesCount > 0 ? 1 : 0);
            
            const col1 = document.getElementById('client-col-1');
            const col2 = document.getElementById('client-col-2');
            const gridDocs = document.getElementById('client-portal-grid-docs');
            
            if (col1Visible === 0 && col1) col1.style.display = 'none';
            if (col2Visible === 0 && col2) col2.style.display = 'none';
            
            if (col1Visible === 0 || col2Visible === 0) {
                if (gridDocs) {
                    gridDocs.style.gridTemplateColumns = '1fr';
                }
            }
        }
        
    } catch(err) {
        console.error("Error retrieving client portal data:", err);
        container.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 20px; border-radius: 8px; color: #f87171; text-align: center;">
                ⚠️ Error al cargar los documentos de la base de datos principal. Por favor, reintente más tarde.
            </div>
        `;
    } finally {
        isClientPortalLoading = false;
    }
}

function initClientPortalMap(assignedStationsData) {
    if (typeof L === 'undefined') {
        console.warn("Leaflet is not loaded.");
        return;
    }
    
    const mapContainer = document.getElementById('client-portal-map');
    if (!mapContainer) return;
    
    if (!clientPortalMap) {
        clientPortalMap = L.map('client-portal-map', {
            zoomControl: true,
            scrollWheelZoom: false
        });
        
        L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: 'Map data &copy; Google',
            maxZoom: 19,
            crossOrigin: true
        }).addTo(clientPortalMap);
        
        clientPortalMarkerGroup = L.layerGroup().addTo(clientPortalMap);
    } else {
        clientPortalMarkerGroup.clearLayers();
    }
    
    const markerCoords = [];
    
    assignedStationsData.forEach(st => {
        if (st.coords && st.coords.lat && st.coords.lng) {
            const lat = parseFloat(st.coords.lat);
            const lng = parseFloat(st.coords.lng);
            markerCoords.push([lat, lng]);
            
            let color = '#10b981'; // Green
            if (st.alertActive) color = '#ef4444'; // Red
            else if (st.consumption !== '0%' && st.consumption !== 'No inspeccionada' && st.consumption !== 'Sin visitas') color = '#fbbf24'; // Yellow
            else if (st.consumption === 'Sin visitas' || st.consumption === 'No inspeccionada') color = '#475569'; // Grey
            
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
            clientPortalMarkerGroup.addLayer(marker);
        }
    });
    
    if (markerCoords.length > 0) {
        clientPortalMap.fitBounds(markerCoords);
    } else {
        clientPortalMap.setView([-37.4612, -72.3514], 16);
    }
    
    // Invalidate Leaflet map size to fix any rendering size glitches inside dynamic elements
    setTimeout(() => {
        if (clientPortalMap) {
            clientPortalMap.invalidateSize();
            if (markerCoords.length > 0) {
                clientPortalMap.fitBounds(markerCoords);
            }
        }
    }, 300);
}

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
