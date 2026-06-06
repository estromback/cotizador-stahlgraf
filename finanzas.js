(function() {
    const role = localStorage.getItem('stahlgraf_user_role') || 'admin';
    if (role !== 'admin') {
        alert("⚠️ Acceso denegado: Se requiere perfil de Administrador.");
        window.location.href = 'index.html';
    }
})();

// finanzas.js - Stahlgraf Finance Module Logic

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
let appData = {
    clients: [],
    margin: 40,
    hhPrice: 15000,
    hhSpeed: 50,
    chemicals: []
};
let clientsList = [];
let manualTransactions = [];
let quotesList = [];
let servicesList = [];
let crmList = [];
let activeFilters = {
    type: 'all',
    category: 'all',
    month: ''
};

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
                    } else {
                        localStorage.removeItem('stahlgraf_linked_client_id');
                    }
                } else {
                    localStorage.setItem('stahlgraf_user_role', 'admin');
                    localStorage.setItem('stahlgraf_target_uid', user.uid);
                    localStorage.removeItem('stahlgraf_linked_client_id');
                }
                
                const role = localStorage.getItem('stahlgraf_user_role');
                if (role !== 'admin') {
                    alert("⚠️ Acceso denegado: Se requiere perfil de Administrador.");
                    window.location.href = 'index.html';
                    return;
                }
                
                // Sync user settings and data
                loadGlobalConfig();
            }).catch(err => {
                console.error("Error retrieving user role:", err);
                // Fallback (assume admin or allow load)
                loadGlobalConfig();
            });
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
            document.getElementById('btn-sync-login').classList.add('btn-primary-outline');
            document.getElementById('btn-sync-login').classList.remove('btn-secondary');
            
            localStorage.removeItem('stahlgraf_user_role');
            localStorage.removeItem('stahlgraf_target_uid');
            localStorage.removeItem('stahlgraf_linked_client_id');
            
            // Clear lists
            clientsList = [];
            manualTransactions = [];
            quotesList = [];
            servicesList = [];
            crmList = [];
            updateUI();
        }
    });
}

function loadGlobalConfig() {
    if (!currentUser || !db) return;
    
    db.collection('users').doc(getActiveUid()).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            appData = { ...appData, ...cloudData };
            clientsList = appData.clients || [];
            populateClientDropdown();
        }
        
        // Listen to all subcollections
        subscribeToFinancialData();
    }).catch(err => {
        console.error("Error loading user configuration:", err);
    });
}

function subscribeToFinancialData() {
    const uid = getActiveUid();
    if (!uid || !db) return;
    
    // Subscribe to CRM
    db.collection('users').doc(uid).collection('crm').onSnapshot(snap => {
        crmList = [];
        snap.forEach(doc => crmList.push({ id: doc.id, ...doc.data() }));
        recalculateAndRender();
    }, err => console.error("Error listening to CRM:", err));
    
    // Subscribe to Quotes
    db.collection('users').doc(uid).collection('quotes').onSnapshot(snap => {
        quotesList = [];
        snap.forEach(doc => quotesList.push({ id: doc.id, ...doc.data() }));
        recalculateAndRender();
    }, err => console.error("Error listening to Quotes:", err));

    // Subscribe to Services
    db.collection('users').doc(uid).collection('services').onSnapshot(snap => {
        servicesList = [];
        snap.forEach(doc => servicesList.push({ id: doc.id, ...doc.data() }));
        recalculateAndRender();
    }, err => console.error("Error listening to Services:", err));

    // Subscribe to Manual Transactions
    db.collection('users').doc(uid).collection('finanzas_transacciones').onSnapshot(snap => {
        manualTransactions = [];
        snap.forEach(doc => manualTransactions.push({ id: doc.id, ...doc.data() }));
        recalculateAndRender();
    }, err => console.error("Error listening to manual transactions:", err));
}

function recalculateAndRender() {
    updateUI();
}

function updateUI() {
    const kpiIngresos = document.getElementById('kpi-ingresos');
    const kpiEgresos = document.getElementById('kpi-egresos');
    const kpiUtilidad = document.getElementById('kpi-utilidad');
    const kpiUtilidadDesc = document.getElementById('kpi-utilidad-desc');
    const kpiPorCobrar = document.getElementById('kpi-por-cobrar');
    const kpiUtilidadCard = document.getElementById('kpi-utilidad-card');

    let totalIngresos = 0;
    let totalEgresos = 0;
    let totalPorCobrar = 0;
    
    // Monthly Cash Flow Bucket
    const monthlyData = {};
    
    // Expense Category Bucket
    const expenseCategories = {
        'Combustible': 0,
        'Químicos': 0,
        'Insumos': 0,
        'Sueldos': 0,
        'Vehículo': 0,
        'Arriendo': 0,
        'Servicios Básicos': 0,
        'Marketing': 0,
        'Otros Egresos': 0,
        'Costo Operativo': 0
    };

    const marginMultiplier = 1 + (appData.margin / 100);

    // 1. Process Won CRM Quotes / Deals (Ingresos & Costo Operativo)
    // Check cards in "Vendidos"
    crmList.forEach(card => {
        const isSold = (card.column || '').toLowerCase() === 'vendidos' || (card.column || '').toLowerCase() === 'vendido';
        const isPending = (card.column || '').toLowerCase() === 'pago pendiente';
        
        // Find matching quote total
        let quoteTotal = 0;
        const matchingQuote = quotesList.find(q => q.clientName === card.client || q.clientPhone === card.phone);
        if (matchingQuote) {
            // Parse total from quote total string or number
            quoteTotal = parseFloat(String(matchingQuote.total || matchingQuote.totalStr || '0').replace(/[^0-9.-]+/g, "")) || 0;
        } else {
            // Fallback from notes or description if possible
            quoteTotal = parseFloat(card.amount) || 0;
        }
        
        if (isSold && quoteTotal > 0) {
            totalIngresos += quoteTotal;
            
            // Calculate operational cost (expense)
            const opCost = Math.round(quoteTotal / marginMultiplier);
            totalEgresos += opCost;
            expenseCategories['Costo Operativo'] += opCost;
            
            // Register monthly cash flow
            const dateStr = card.date || matchingQuote?.date || new Date().toISOString().split('T')[0];
            const monthKey = dateStr.substring(0, 7); // "YYYY-MM"
            if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0 };
            monthlyData[monthKey].income += quoteTotal;
            monthlyData[monthKey].expense += opCost;
            
        } else if (isPending && quoteTotal > 0) {
            totalPorCobrar += quoteTotal;
        }
    });

    // 2. Process Performed Services (Fumigaciones / Sanitizaciones in terreno)
    servicesList.forEach(s => {
        const price = parseFloat(s.price) || 0;
        const dateStr = s.date || new Date().toISOString().split('T')[0];
        const monthKey = dateStr.substring(0, 7);
        
        if (price > 0) {
            totalIngresos += price;
            
            const opCost = Math.round(price / marginMultiplier);
            totalEgresos += opCost;
            expenseCategories['Costo Operativo'] += opCost;
            
            if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0 };
            monthlyData[monthKey].income += price;
            monthlyData[monthKey].expense += opCost;
        } else {
            // Price is 0 (registered quickly in terrain). Estimate cost!
            // Estimate HH labor cost
            const area = parseFloat(s.area) || 0;
            const hours = area / (appData.hhSpeed || 50);
            const hhCost = hours * (appData.hhPrice || 15000);
            
            // Estimate chemical cost
            let chemCost = 0;
            if (s.chemical && appData.chemicals) {
                const chem = appData.chemicals.find(c => c.name === s.chemical || c.id === s.chemical);
                if (chem) {
                    chemCost = (area * chem.dose / chem.size) * chem.price;
                }
            }
            
            const estCost = Math.round(hhCost + chemCost);
            if (estCost > 0) {
                totalEgresos += estCost;
                expenseCategories['Costo Operativo'] += estCost;
                
                if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0 };
                monthlyData[monthKey].expense += estCost;
            }
        }
    });

    // 3. Process Manual Transactions (Ingresos & Egresos)
    manualTransactions.forEach(tx => {
        const amt = parseFloat(tx.monto) || 0;
        const dateStr = tx.fecha || new Date().toISOString().split('T')[0];
        const monthKey = dateStr.substring(0, 7);
        
        if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0 };
        
        if (tx.tipo === 'ingreso') {
            totalIngresos += amt;
            monthlyData[monthKey].income += amt;
        } else {
            totalEgresos += amt;
            monthlyData[monthKey].expense += amt;
            
            // Group by expense category
            const cat = tx.categoria || 'Otros Egresos';
            if (expenseCategories[cat] !== undefined) {
                expenseCategories[cat] += amt;
            } else {
                expenseCategories['Otros Egresos'] += amt;
            }
        }
    });

    // 4. Calculate Net Profit and margin
    const netProfit = totalIngresos - totalEgresos;
    const netMargin = totalIngresos > 0 ? Math.round((netProfit / totalIngresos) * 100) : 0;

    // Render KPIs
    if (kpiIngresos) kpiIngresos.innerText = `$${totalIngresos.toLocaleString()}`;
    if (kpiEgresos) kpiEgresos.innerText = `$${totalEgresos.toLocaleString()}`;
    if (kpiUtilidad) {
        kpiUtilidad.innerText = `${netProfit >= 0 ? '' : '-'}$${Math.abs(netProfit).toLocaleString()}`;
    }
    if (kpiUtilidadDesc) {
        kpiUtilidadDesc.innerText = `Rentabilidad real (Margen: ${netMargin}%)`;
    }
    if (kpiPorCobrar) kpiPorCobrar.innerText = `$${totalPorCobrar.toLocaleString()}`;

    // Color code the utility card
    if (kpiUtilidadCard) {
        if (netProfit < 0) {
            kpiUtilidadCard.style.borderLeftColor = '#ef4444'; // Red for loss
        } else {
            kpiUtilidadCard.style.borderLeftColor = '#10b981'; // Green for profit
        }
    }

    // 5. Render charts
    renderCashFlowChart(monthlyData);
    renderDonutChart(expenseCategories);
    
    // 6. Render transactions list
    renderTransactionsTable();
}

function renderCashFlowChart(monthlyData) {
    const chartContainer = document.getElementById('cash-flow-chart');
    if (!chartContainer) return;
    
    // Find scale limit
    let maxVal = 10000;
    Object.values(monthlyData).forEach(m => {
        if (m.income > maxVal) maxVal = m.income;
        if (m.expense > maxVal) maxVal = m.expense;
    });
    
    const monthsNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const currentMonthIndex = new Date().getMonth();
    
    chartContainer.innerHTML = '';
    
    // Render last 6 months
    for (let i = 5; i >= 0; i--) {
        let mIdx = currentMonthIndex - i;
        if (mIdx < 0) mIdx += 12;
        
        const year = new Date().getFullYear() - (currentMonthIndex - i < 0 ? 1 : 0);
        const monthKey = `${year}-${String(mIdx + 1).padStart(2, '0')}`;
        const data = monthlyData[monthKey] || { income: 0, expense: 0 };
        
        const incPct = (data.income / maxVal) * 100;
        const expPct = (data.expense / maxVal) * 100;
        
        const group = document.createElement('div');
        group.className = 'bar-group';
        group.innerHTML = `
            <div class="bars-wrapper">
                <div class="chart-bar income" style="height: ${incPct}%;" data-value="Ingreso: $${data.income.toLocaleString()}"></div>
                <div class="chart-bar expense" style="height: ${expPct}%;" data-value="Egreso: $${data.expense.toLocaleString()}"></div>
            </div>
            <div class="bar-label">${monthsNames[mIdx]}</div>
        `;
        chartContainer.appendChild(group);
    }
}

function renderDonutChart(expenseCategories) {
    const svg = document.getElementById('donut-chart-svg');
    const labelsContainer = document.getElementById('donut-labels');
    const totalValContainer = document.getElementById('donut-total-value');
    
    if (!svg || !labelsContainer || !totalValContainer) return;
    
    // Clear segments
    const segments = svg.querySelectorAll('.donut-segment');
    segments.forEach(s => s.remove());
    
    let totalExpense = 0;
    Object.values(expenseCategories).forEach(val => totalExpense += val);
    totalValContainer.innerText = `$${totalExpense.toLocaleString()}`;
    
    if (totalExpense === 0) {
        labelsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:0.85rem; margin-top:20px; margin-bottom:0;">No hay egresos registrados.</p>`;
        return;
    }
    
    let accumulatedPercent = 0;
    labelsContainer.innerHTML = '';
    
    const colors = {
        'Combustible': '#ef4444',
        'Químicos': '#f59e0b',
        'Insumos': '#3b82f6',
        'Sueldos': '#10b981',
        'Vehículo': '#8b5cf6',
        'Arriendo': '#ec4899',
        'Servicios Básicos': '#06b6d4',
        'Marketing': '#f43f5e',
        'Otros Egresos': '#64748b',
        'Costo Operativo': '#f97316'
    };
    
    const defaultColor = '#64748b';
    
    Object.entries(expenseCategories).forEach(([cat, val]) => {
        if (val === 0) return;
        const pct = (val / totalExpense) * 100;
        const color = colors[cat] || defaultColor;
        
        // Create circle segment
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'donut-segment');
        circle.setAttribute('cx', '21');
        circle.setAttribute('cy', '21');
        circle.setAttribute('r', '15.91549430918954');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-dasharray', `${pct} ${100 - pct}`);
        circle.setAttribute('stroke-dashoffset', String(-accumulatedPercent));
        svg.appendChild(circle);
        
        accumulatedPercent += pct;
        
        // Add label item
        const labelItem = document.createElement('div');
        labelItem.className = 'donut-label-item';
        labelItem.innerHTML = `
            <div style="display:flex; align-items:center;">
                <span class="donut-color-dot" style="background:${color};"></span>
                <span>${cat}</span>
            </div>
            <div style="font-weight:600; color:#fff;">$${val.toLocaleString()} (${Math.round(pct)}%)</div>
        `;
        labelsContainer.appendChild(labelItem);
    });
}

function renderTransactionsTable() {
    const tbody = document.getElementById('trans-list-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Sort transactions by date descending
    const filtered = manualTransactions.filter(tx => {
        // Type filter
        if (activeFilters.type !== 'all' && tx.tipo !== activeFilters.type) return false;
        
        // Category filter
        if (activeFilters.category !== 'all' && tx.categoria !== activeFilters.category) return false;
        
        // Month filter ("YYYY-MM")
        if (activeFilters.month && tx.fecha && tx.fecha.substring(0, 7) !== activeFilters.month) return false;
        
        return true;
    });
    
    filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:20px;">No hay movimientos financieros que coincidan con los filtros.</td></tr>`;
        return;
    }
    
    filtered.forEach(tx => {
        const tr = document.createElement('tr');
        
        const typeBadge = tx.tipo === 'ingreso' ? '<span class="badge-type ingreso">Ingreso</span>' : '<span class="badge-type egreso">Egreso</span>';
        const clientText = tx.clientName ? ` (${tx.clientName})` : '';
        const descText = `${tx.descripcion}${clientText}`;
        const amtStr = `$${parseFloat(tx.monto || 0).toLocaleString()}`;
        
        tr.innerHTML = `
            <td>${tx.fecha}</td>
            <td>${typeBadge}</td>
            <td><strong>${tx.categoria}</strong></td>
            <td style="color:#ccc;">${descText}</td>
            <td style="font-weight:bold; color:#fff;">${amtStr}</td>
            <td style="text-align:center;">
                <button class="btn-icon" onclick="deleteTransaction('${tx.id}')" title="Eliminar transaccion">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteTransaction = function(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro financiero?")) return;
    
    const uid = getActiveUid();
    if (currentUser && db && uid) {
        db.collection('users').doc(uid).collection('finanzas_transacciones').doc(id).delete()
            .then(() => console.log("Transacción eliminada de Firestore."))
            .catch(err => alert("Error al eliminar de Firestore: " + err.message));
    }
};

function populateClientDropdown() {
    const select = document.getElementById('tx-client');
    if (!select) return;
    select.innerHTML = '<option value="">-- Seleccionar Cliente (Opcional) --</option>';
    const sorted = [...clientsList].sort((a,b) => a.name.localeCompare(b.name));
    sorted.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name;
        select.appendChild(opt);
    });
}

function updateCategoryOptions() {
    const typeSelect = document.getElementById('tx-type');
    const catSelect = document.getElementById('tx-category');
    if (!typeSelect || !catSelect) return;
    
    const val = typeSelect.value;
    catSelect.innerHTML = '';
    
    if (val === 'egreso') {
        const categories = [
            { v: 'Combustible', t: 'Combustible' },
            { v: 'Químicos', t: 'Compra de Químicos' },
            { v: 'Insumos', t: 'Cajas / Trampas / Equipos' },
            { v: 'Sueldos', t: 'Sueldos y Personal' },
            { v: 'Vehículo', t: 'Mantenimiento de Vehículo' },
            { v: 'Arriendo', t: 'Arriendo de Oficina' },
            { v: 'Servicios Básicos', t: 'Servicios Básicos (Luz/Agua/Net)' },
            { v: 'Marketing', t: 'Marketing y Publicidad' },
            { v: 'Otros Egresos', t: 'Otros Egresos' }
        ];
        categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.v;
            opt.textContent = c.t;
            catSelect.appendChild(opt);
        });
    } else {
        const categories = [
            { v: 'Servicio Adicional', t: 'Servicio Adicional' },
            { v: 'Otros Ingresos', t: 'Otros Ingresos' }
        ];
        categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.v;
            opt.textContent = c.t;
            catSelect.appendChild(opt);
        });
    }
    
    // Refresh filter category dropdown
    populateFilterCategories();
}

function populateFilterCategories() {
    const filterCat = document.getElementById('filter-category');
    if (!filterCat) return;
    
    filterCat.innerHTML = '<option value="all">📁 Todas las categorías</option>';
    
    const allCategories = [
        'Combustible', 'Químicos', 'Insumos', 'Sueldos', 'Vehículo', 'Arriendo', 
        'Servicios Básicos', 'Marketing', 'Otros Egresos', 'Costo Operativo', 
        'Servicio Adicional', 'Otros Ingresos'
    ];
    
    allCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        filterCat.appendChild(opt);
    });
}

// Bind DOM Events
document.addEventListener('DOMContentLoaded', () => {
    // Default form date to today
    const dateInput = document.getElementById('tx-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Toggle categories based on movement type
    const typeSelect = document.getElementById('tx-type');
    if (typeSelect) {
        typeSelect.addEventListener('change', updateCategoryOptions);
        updateCategoryOptions();
    }
    
    // Bind form submit
    const form = document.getElementById('transaction-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const tipo = document.getElementById('tx-type').value;
            const categoria = document.getElementById('tx-category').value;
            const fecha = document.getElementById('tx-date').value;
            const monto = parseFloat(document.getElementById('tx-amount').value) || 0;
            const clientName = document.getElementById('tx-client').value || null;
            const metodoPago = document.getElementById('tx-method').value;
            const descripcion = document.getElementById('tx-desc').value.trim() || 'Movimiento manual';
            
            if (monto <= 0) return alert("Por favor, ingresa un monto válido.");
            
            const uid = getActiveUid();
            if (!currentUser || !db || !uid) {
                return alert("No has iniciado sesión. No se puede guardar en la nube.");
            }
            
            const txPayload = {
                id: 'tx_' + Date.now(),
                tipo,
                categoria,
                fecha,
                monto,
                clientName,
                metodoPago,
                descripcion,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            const btn = document.getElementById('btn-save-tx');
            btn.disabled = true;
            btn.innerText = 'Guardando...';
            
            try {
                await db.collection('users').doc(uid).collection('finanzas_transacciones').doc(txPayload.id).set(txPayload);
                
                // Clear fields
                document.getElementById('tx-amount').value = '';
                document.getElementById('tx-desc').value = '';
                document.getElementById('tx-client').value = '';
                
                alert("✅ Transacción registrada con éxito.");
            } catch(err) {
                console.error("Error saving manual transaction:", err);
                alert("Ocurrió un error al guardar la transacción.");
            } finally {
                btn.disabled = false;
                btn.innerText = '💾 Guardar Transacción';
            }
        });
    }
    
    // Bind filter controls
    const filterType = document.getElementById('filter-type');
    if (filterType) {
        filterType.addEventListener('change', (e) => {
            activeFilters.type = e.target.value;
            renderTransactionsTable();
        });
    }
    
    const filterCat = document.getElementById('filter-category');
    if (filterCat) {
        filterCat.addEventListener('change', (e) => {
            activeFilters.category = e.target.value;
            renderTransactionsTable();
        });
    }
    
    const filterMonth = document.getElementById('filter-month');
    if (filterMonth) {
        filterMonth.addEventListener('change', (e) => {
            activeFilters.month = e.target.value; // "YYYY-MM"
            renderTransactionsTable();
        });
    }
    
    // Login Sync Button trigger
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
    
    // Initialize filter category list dropdown
    populateFilterCategories();
});
