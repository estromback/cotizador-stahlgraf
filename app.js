// --- FIREBASE CONFIGURATION ---
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
let currentQuoteId = null;
let loadedCorrelative = null;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.");
    }
} else if (typeof firebase !== 'undefined' && firebase.apps.length) {
    db = firebase.firestore();
    auth = firebase.auth();
}
// ------------------------------

// Default Database if localStorage is empty
const defaultChemicals = [
    { id: 'c1', name: 'CiperKill 25 EC', type: 'standard', price: 35000, size: 1000, dose: 0.4 },
    { id: 'c2', name: 'Atonit 2.5% EC', type: 'standard', price: 35000, size: 1000, dose: 0.8 },
    { id: 'c3', name: 'Mandra SC', type: 'standard', price: 60000, size: 1000, dose: 0.2 },
    { id: 'c4', name: 'Aquatrin 2.5 SC', type: 'standard', price: 38000, size: 1000, dose: 0.6 }
];

// App State
let appData = {
    margin: 40,
    minRate: 40000,
    correlative: 126,
    reportCorrelative: 1,
    baitPrice: 3750,
    loosePrice: 800,
    inspectPrice: 1500,
    snapPrice: 4500,
    sanitizePrice: 25000,
    exclusionPrice: 35000,
    hhPrice: 15000,
    hhSpeed: 50,
    asanaToken: '',
    asanaProject: '',
    mothPrepPrice: 15000,
    mothTrapPrice: 5000,
    mothChemPrice: 25000,
    chemicals: [],
    clients: []
};

// Formatter for CLP
const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

// Initialize App
function initApp() {
    loadData();
    setupEventListeners();
    renderChemicalsList();
    if(typeof renderClientsList === 'function') renderClientsList();
    
    // Set formatted date
    const dateOpts = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('doc-date').innerText = new Date().toLocaleDateString('es-ES', dateOpts);
    
    calculateQuote();

    // Intercept CRM Form prefill parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('prefill') === 'true') {
        const name = urlParams.get('name');
        const phone = urlParams.get('phone');
        const email = urlParams.get('email');
        const address = urlParams.get('address');
        const size = urlParams.get('size');
        const desc = urlParams.get('desc');
        
        if (name) document.getElementById('client-name').value = name;
        if (phone) document.getElementById('client-phone').value = phone;
        if (email) document.getElementById('client-email').value = email;
        if (address) document.getElementById('client-address').value = address;
        if (size && document.getElementById('property-size')) {
            document.getElementById('property-size').value = size;
        }
        
        if (desc && document.getElementById('quote-title')) {
            document.getElementById('quote-title').value = desc;
        }
        
        calculateQuote();
    }

    // Firebase Auth Listener
    if (auth) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                document.getElementById('sync-text').innerText = "Conectado";
                document.getElementById('sync-icon').innerText = "✅";
                syncFromFirebase();
            } else {
                currentUser = null;
                document.getElementById('sync-text').innerText = "Ingresar para Sync";
                document.getElementById('sync-icon').innerText = "☁️";
            }
        });
    }
}

// LocalStorage Management
function loadData() {
    const savedData = localStorage.getItem('stahlgraf_data_v4');
    if (savedData) {
        appData = JSON.parse(savedData);
        if(!appData.clients) appData.clients = [];
    } else {
        const oldData = localStorage.getItem('stahlgraf_data_v3');
        if (oldData) {
            appData = JSON.parse(oldData);
            appData.chemicals = [...defaultChemicals];
            if(appData.loosePrice === undefined) {
                appData.loosePrice = 800;
                appData.inspectPrice = 1500;
                appData.snapPrice = 4500;
                appData.sanitizePrice = 25000;
                appData.exclusionPrice = 35000;
            }
        } else {
            appData.margin = 40;
            appData.minRate = parseInt(document.getElementById('setting-min-rate').value) || 40000;
            appData.correlative = parseInt(document.getElementById('setting-correlative').value) || 126;
            appData.reportCorrelative = parseInt(document.getElementById('setting-report-correlative')?.value) || 1;
            appData.baitPrice = 3750;
            appData.loosePrice = 800;
            appData.inspectPrice = 1500;
            appData.snapPrice = 4500;
            appData.sanitizePrice = 25000;
            appData.exclusionPrice = 35000;
            appData.hhPrice = 15000;
            appData.hhSpeed = 50;
            appData.mothPrepPrice = 15000;
            appData.mothTrapPrice = 5000;
            appData.mothChemPrice = 25000;
            appData.asanaToken = appData.asanaToken || '';
            appData.asanaProject = appData.asanaProject || '';
            appData.chemicals = [...defaultChemicals];
        }
        
        appData.asanaToken = appData.asanaToken || '';
        appData.asanaProject = appData.asanaProject || '';
        if(!appData.clients) appData.clients = [];
        saveData();
    }
    
    updateSettingsUI();
}

function updateSettingsUI() {
    const marginInput = document.getElementById('setting-margin');
    if (!marginInput) return; // Exit early if we are not on the Hub page
    
    marginInput.value = appData.margin;
    document.getElementById('setting-min-rate').value = appData.minRate;
    document.getElementById('setting-correlative').value = appData.correlative;
    if(document.getElementById('setting-report-correlative')) document.getElementById('setting-report-correlative').value = appData.reportCorrelative || 1;
    document.getElementById('setting-bait-price').value = appData.baitPrice;
    document.getElementById('setting-loose-price').value = appData.loosePrice;
    document.getElementById('setting-inspect-price').value = appData.inspectPrice;
    document.getElementById('setting-snap-price').value = appData.snapPrice;
    document.getElementById('setting-sanitize-price').value = appData.sanitizePrice;
    document.getElementById('setting-exclusion-price').value = appData.exclusionPrice;
    document.getElementById('setting-moth-prep-price').value = appData.mothPrepPrice || 15000;
    document.getElementById('setting-moth-trap-price').value = appData.mothTrapPrice || 5000;
    document.getElementById('setting-moth-chem-price').value = appData.mothChemPrice || 25000;
    document.getElementById('setting-hh-price').value = appData.hhPrice;
    document.getElementById('setting-hh-speed').value = appData.hhSpeed;
    document.getElementById('setting-asana-token').value = appData.asanaToken || '';
    document.getElementById('setting-asana-project').value = appData.asanaProject || '';
}

function saveData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    
    // Sync to Firebase if logged in
    if (currentUser && db) {
        db.collection('users').doc(currentUser.uid).set(appData)
            .catch(err => console.error("Error saving to Firebase:", err));
    }
}

function syncFromFirebase() {
    if (!currentUser || !db) return;
    
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            appData = { ...appData, ...cloudData };
            
            // Save to local cache
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            
            // Re-render UI
            updateSettingsUI();
            renderChemicalsList();
            if(typeof renderClientsList === 'function') renderClientsList();
            calculateQuote();
            console.log("Datos sincronizados desde Firebase.");
        } else {
            // No data in cloud yet, initialize user document with local data
            saveData();
        }
    }).catch(err => console.error("Error fetching from Firebase:", err));
}

// Logic & Calculations
function calculateQuote() {
    // 1. Get Inputs
    const clientName = document.getElementById('client-name').value || '-';
    const clientAttention = document.getElementById('client-attention').value || '';
    const clientPhone = document.getElementById('client-phone').value || '-';
    const clientEmail = document.getElementById('client-email')?.value || '-';
    const clientAddress = document.getElementById('client-address').value || '-';
    
    const size = parseFloat(document.getElementById('property-size').value) || 0;
    const coverage = document.getElementById('coverage-type').value;
    const exterior = document.getElementById('exterior-zones').value;
    
    const hasRodents = document.getElementById('rodent-control').value === 'yes';
    const baitStations = parseInt(document.getElementById('bait-stations').value) || 0;
    const looseStations = parseInt(document.getElementById('loose-stations').value) || 0;
    const inspectStations = parseInt(document.getElementById('inspect-stations').value) || 0;
    const snapStations = parseInt(document.getElementById('snap-stations').value) || 0;
    const rodentExtras = document.getElementById('rodent-extras').value;

    const hasMoths = document.getElementById('moth-control') ? document.getElementById('moth-control').value === 'yes' : false;
    const mothPrep = document.getElementById('moth-prep-service') ? document.getElementById('moth-prep-service').value : 'no';
    const mothTraps = document.getElementById('moth-traps') ? parseInt(document.getElementById('moth-traps').value) || 0 : 0;

    const hasSanitization = document.getElementById('sanitization-control') ? document.getElementById('sanitization-control').value === 'yes' : false;
    const saniSize = parseFloat(document.getElementById('sanitization-size')?.value) || 0;
    const saniChemId = document.getElementById('sanitization-chem')?.value;
    const saniTech = document.getElementById('sanitization-tech')?.value || 'Nebulización ULV';

    // 2. Adjust effective size based on coverage
    let interiorSize = 0;
    let exteriorSize = 0;
    
    if (coverage === 'inside' || coverage === 'both') {
        interiorSize = size;
    }
    if (coverage === 'outside' || coverage === 'both') {
        exteriorSize = size;
        if (exterior === 'full') exteriorSize *= 1.4; 
        else if (exterior === 'perimeter') exteriorSize *= 1.1;
    }

    // 3. Find suitable product
    const interiorChemId = document.getElementById('interior-chem').value;
    const exteriorChemId = document.getElementById('exterior-chem').value;
    
    // Get Techniques
    const interiorTech = document.getElementById('interior-tech').value || 'Nebulización ULV + Aspersión Manual';
    const exteriorTech = document.getElementById('exterior-tech').value || 'Motopulverización + Aspersión Manual';

    const selectedChem = appData.chemicals.find(c => c.id === interiorChemId) || appData.chemicals[0] || defaultChemicals[0];
    const exteriorChem = appData.chemicals.find(c => c.id === exteriorChemId) || appData.chemicals[0] || defaultChemicals[0];

    // Apply Margin
    const marginMultiplier = 1 + (appData.margin / 100);

    // Calculate Interior
    let interiorCost = 0;
    let interiorText = '';
    if (interiorSize > 0) {
        let interiorTime = interiorSize / appData.hhSpeed;
        let cost_HH_interior = interiorTime * appData.hhPrice;
        let cost_chem_interior = (interiorSize * selectedChem.dose / selectedChem.size) * selectedChem.price;

        let baseCostInterior = cost_HH_interior + cost_chem_interior;
        interiorCost = Math.round(baseCostInterior * marginMultiplier);
        if (interiorCost > 0 && interiorCost < appData.minRate) interiorCost = appData.minRate; 
        
        interiorText = `Técnica(s): ${interiorTech} para control de insectos rastreros y voladores, utilizando producto ${selectedChem.name}.`;
    }

    // Calculate Exterior
    let exteriorCost = 0;
    let exteriorText = '';
    if (exteriorSize > 0) {
        let exteriorTime = exteriorSize / appData.hhSpeed;
        let cost_HH_exterior = exteriorTime * appData.hhPrice;
        let cost_chem_exterior = (exteriorSize * exteriorChem.dose / exteriorChem.size) * exteriorChem.price;

        let baseCostExterior = cost_HH_exterior + cost_chem_exterior;
        exteriorCost = Math.round(baseCostExterior * marginMultiplier);
        if (exteriorCost > 0 && exteriorCost < appData.minRate) exteriorCost = appData.minRate;

        exteriorText = `Técnica(s): ${exteriorTech} para control perimetral/focalizado asegurando residualidad, utilizando producto ${exteriorChem.name}.`;
    }

    // Calculate Rodents
    let rodentsCost = 0;
    if (hasRodents) {
        if(baitStations > 0) rodentsCost += baitStations * appData.baitPrice;
        if(looseStations > 0) rodentsCost += looseStations * appData.loosePrice;
        if(inspectStations > 0) rodentsCost += inspectStations * appData.inspectPrice;
        if(snapStations > 0) rodentsCost += snapStations * appData.snapPrice;
        if(rodentExtras === 'sanitize' || rodentExtras === 'both') rodentsCost += appData.sanitizePrice;
        if(rodentExtras === 'exclusion' || rodentExtras === 'both') rodentsCost += appData.exclusionPrice;
    }

    // Calculate Moths
    let mothsCost = 0;
    if (hasMoths) {
        mothsCost += appData.mothChemPrice || 25000; // Base tratment
        if (mothPrep === 'yes') mothsCost += appData.mothPrepPrice || 15000;
        if (mothTraps > 0) mothsCost += (mothTraps * (appData.mothTrapPrice || 5000));
    }

    // Calculate Sanitization
    let saniCost = 0;
    let saniText = '';
    if (hasSanitization && saniSize > 0) {
        const saniChem = appData.chemicals.find(c => c.id === saniChemId) || appData.chemicals[0] || defaultChemicals[0];
        let saniTime = saniSize / appData.hhSpeed;
        let cost_HH_sani = saniTime * appData.hhPrice;
        let cost_chem_sani = (saniSize * saniChem.dose / saniChem.size) * saniChem.price;

        let baseCostSani = cost_HH_sani + cost_chem_sani;
        saniCost = Math.round(baseCostSani * marginMultiplier);
        if (saniCost > 0 && saniCost < appData.minRate) saniCost = appData.minRate; 
        
        saniText = `Aplicación mediante ${saniTech} de producto sanitizante y desodorizante ambiental (${saniChem.name}), enfocado en reducción de carga microbiológica y malos olores.`;
    }

    // Calculate General Services
    let genServicesCost = 0;
    const genServicesData = [];
    const generalServicesRows = document.querySelectorAll('.general-service-row');
    generalServicesRows.forEach(row => {
        const name = row.querySelector('.gs-name').value;
        const desc = row.querySelector('.gs-desc').value;
        const price = parseFloat(row.querySelector('.gs-price').value) || 0;
        
        if(name) {
            genServicesCost += price;
            genServicesData.push({name, desc, price});
        }
    });

    const totalCost = interiorCost + exteriorCost + rodentsCost + mothsCost + saniCost + genServicesCost;

    // --- UPDATE UI DOCUMENT ---
    const displayCorr = loadedCorrelative !== null ? loadedCorrelative : appData.correlative;
    document.getElementById('doc-correlative').innerText = displayCorr;
    document.getElementById('doc-client-name').innerText = clientName;
    document.getElementById('doc-client-phone').innerText = clientPhone;
    if (document.getElementById('doc-client-email')) {
        document.getElementById('doc-client-email').innerText = clientEmail;
    }
    document.getElementById('doc-client-address').innerText = clientAddress;
    
    const quoteTitle = document.getElementById('quote-title')?.value || "COTIZACIÓN DE SERVICIOS: CONTROL DE PLAGAS Y FUMIGACIÓN";
    document.getElementById('doc-title').innerHTML = quoteTitle.replace(':', ':<br>');
    
    if(clientAttention) {
        document.getElementById('row-attention').classList.remove('hidden');
        document.getElementById('doc-client-attention').innerText = clientAttention;
    } else {
        document.getElementById('row-attention').classList.add('hidden');
    }

    // Generate Table Rows
    const tbody = document.getElementById('doc-services-body');
    tbody.innerHTML = '';

    if (hasRodents) {
        const renderRow = (concept, desc, qty, priceUnit, totalRow) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${concept}</td>
                <td>${desc}</td>
                <td class="text-right">${qty}</td>
                <td class="text-right">${formatter.format(priceUnit)}</td>
                <td class="text-right"><strong>${formatter.format(totalRow)}</strong></td>
            `;
            tbody.appendChild(tr);
        };

        if(baitStations > 0) renderRow('Control de roedores', 'Cebaderos de Seguridad (Instalación)', baitStations, appData.baitPrice, baitStations * appData.baitPrice);
        if(looseStations > 0) renderRow('Control de roedores', 'Cebos Sueltos', looseStations, appData.loosePrice, looseStations * appData.loosePrice);
        if(inspectStations > 0) renderRow('Control de roedores', 'Servicio de Inspección/Reposición', inspectStations, appData.inspectPrice, inspectStations * appData.inspectPrice);
        if(snapStations > 0) renderRow('Control de roedores', 'Servicio de Instalación de Trampas Físicas/Captura (Incluye cebado, revisión y retiro de la trampa.)', snapStations, appData.snapPrice, snapStations * appData.snapPrice);
        if(rodentExtras === 'sanitize' || rodentExtras === 'both') renderRow('S. Complementario', 'Retiro de cadáveres y sanitización focalizada', 1, appData.sanitizePrice, appData.sanitizePrice);
        if(rodentExtras === 'exclusion' || rodentExtras === 'both') renderRow('S. Complementario', 'Sellado físico de accesos y exclusión', 1, appData.exclusionPrice, appData.exclusionPrice);
    }
    
    if (hasMoths) {
        const renderRow = (concept, desc, qty, priceUnit, totalRow) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${concept}</td>
                <td>${desc}</td>
                <td class="text-right">${qty}</td>
                <td class="text-right">${formatter.format(priceUnit)}</td>
                <td class="text-right"><strong>${formatter.format(totalRow)}</strong></td>
            `;
            tbody.appendChild(tr);
        };
        const basePrice = appData.mothChemPrice || 25000;
        renderRow('Control Polillas de Despensa', 'Tratamiento base: Aplicación localizada con atomizador (esquema de barrera no "al aire").', 1, basePrice, basePrice);
        
        if (mothPrep === 'yes') {
            const prepPrice = appData.mothPrepPrice || 15000;
            renderRow('Protección Polillas', 'Servicio de vaciado de despensa y aspirado minucioso de rincones y grietas.', 1, prepPrice, prepPrice);
        }
        if (mothTraps > 0) {
            const trapPrice = appData.mothTrapPrice || 5000;
            renderRow('Monitoreo Polillas', 'Instalación de trampas de feromonas para polillas.', mothTraps, trapPrice, mothTraps * trapPrice);
        }
    }

    if (hasSanitization && saniSize > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Sanitización y Desodorización</td>
            <td>${saniText}</td>
            <td class="text-right">1</td>
            <td class="text-right">${formatter.format(saniCost)}</td>
            <td class="text-right"><strong>${formatter.format(saniCost)}</strong></td>
        `;
        tbody.appendChild(tr);
    }

    if (interiorSize > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Control de Insectos Rastreros y voladores en interior</td>
            <td>${interiorText}</td>
            <td class="text-right">1</td>
            <td class="text-right">${formatter.format(interiorCost)}</td>
            <td class="text-right"><strong>${formatter.format(interiorCost)}</strong></td>
        `;
        tbody.appendChild(tr);
    }

    if (exteriorSize > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Control de Insectos Rastreros y voladores en exterior</td>
            <td>${exteriorText}</td>
            <td class="text-right">1</td>
            <td class="text-right">${formatter.format(exteriorCost)}</td>
            <td class="text-right"><strong>${formatter.format(exteriorCost)}</strong></td>
        `;
        tbody.appendChild(tr);
    }

    genServicesData.forEach(gs => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${gs.name}</td>
            <td>${gs.desc || '-'}</td>
            <td class="text-right">1</td>
            <td class="text-right">${formatter.format(gs.price)}</td>
            <td class="text-right"><strong>${formatter.format(gs.price)}</strong></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('doc-subtotal').innerText = formatter.format(totalCost);
    document.getElementById('doc-total').innerText = formatter.format(totalCost);

    const hasFumigation = interiorSize > 0 || exteriorSize > 0;

    // Metodología y Garantía
    const methList = document.getElementById('doc-methodology-list');
    methList.innerHTML = '';
    
    // Techniques
    let finalTech = '';
    if(hasFumigation) {
        let fumiTechs = [];
        if(interiorSize > 0) fumiTechs.push(`Interior: ${interiorTech}`);
        if(exteriorSize > 0) fumiTechs.push(`Exterior: ${exteriorTech}`);
        finalTech += fumiTechs.join(' | ') + '. ';
    }
    if(hasRodents) {
        let rTechs = [];
        if(baitStations > 0) rTechs.push('Cebado en bloques de seguridad');
        if(looseStations > 0) rTechs.push('Cebado suelto en puntos clave');
        if(inspectStations > 0) rTechs.push('Reposición/Inspección');
        if(snapStations > 0) rTechs.push('Servicio integral de trampas físicas de golpe/captura');
        if(rodentExtras === 'sanitize' || rodentExtras === 'both') rTechs.push('Sanitización Local de Rastros/Cadáveres');
        if(rodentExtras === 'exclusion' || rodentExtras === 'both') rTechs.push('Sellado Estructural (Exclusión)');
        finalTech += `Para roedores: ${rTechs.join(', ')}. `;
    }
    if(hasMoths) {
        finalTech += `Para polillas: Tratamiento de alta precisión en muebles y despensa. Aplicación en formato abanico cerrado exclusivo en grietas, uniones y esquinas (técnica de barrera de contacto/repelencia, no aerotransportada). Instalación de trampas de feromenas (si aplica). `;
    }
    if(hasSanitization) {
        finalTech += `Para sanitización ambiental: Aplicación de producto desinfectante mediante equipo especializado asegurando la correcta cobertura espacial y superficial. `;
    }
    
    if(finalTech) {
        methList.innerHTML += `<li><strong>Técnica(s) Empleada(s):</strong> ${finalTech}</li>`;
    }

    // Products
    let finalProd = '';
    if(hasFumigation) {
        let fumiProds = [];
        if(interiorSize > 0) fumiProds.push(selectedChem.name);
        if(exteriorSize > 0 && exteriorChem.id !== selectedChem.id) fumiProds.push(exteriorChem.name);
        finalProd += `Utilizamos insecticidas de grado profesional, biodegradables y autorizados por SAG (${fumiProds.join(' y ')}). `;
    }
    if(hasRodents) finalProd += `Para roedores: Rodenticida anticoagulante de segunda generación (Bromadiolona). `;
    if(hasMoths) finalProd += `Para polillas: Insecticida Piretroide de rápido volteo (Lambda-cialotrina). Este químico es altamente recomendado por su letalidad inmediata por contacto contra adultos y larvas. `;
    if(hasSanitization) {
        const saniChem = appData.chemicals.find(c => c.id === saniChemId) || appData.chemicals[0] || defaultChemicals[0];
        finalProd += `Para sanitización: Producto sanitizante/desodorizante (${saniChem.name}) efectivo contra microorganismos y malos olores. `;
    }

    if(finalProd) {
        methList.innerHTML += `<li><strong>Productos:</strong> ${finalProd}</li>`;
    }

    // Warranty
    let finalWarranty = '';
    if(hasFumigation) finalWarranty += `Fumigación general: Después de los 15 días corridos de la aplicación, si la plaga no se ha controlado efectivamente, se ofrece una reaplicación localizada en la zona de reaparición. `;
    if(hasRodents) finalWarranty += `Rodentización: Puede contratar un servicio de visita cada 30 días para inspección y reposición de los cebos (Valor base mensual de $1.500 por cebadero tras instalación inicial). `;
    if(hasMoths) finalWarranty += `Control de Polillas: Nuestra técnica y química empleada garantizan el corte drástico del ciclo reproductivo tras el secado de la barrera. El control difiere según la higiene y hábitos de descarte futuro. `;
    if(hasSanitization) finalWarranty += `Sanitización: Eficacia comprobada para abatir cargas bacterianas y desodorizar al momento de la aplicación; el mantenimiento de los resultados dependerá de los procesos de higiene habituales del cliente. `;

    if(finalWarranty) {
        methList.innerHTML += `<li><strong>Garantía / Mantención:</strong> ${finalWarranty}</li>`;
    }

    // Section 4 toggles (Preparation and Post)
    const fumiRules = document.querySelectorAll('.fumi-rule');
    fumiRules.forEach(el => hasFumigation ? el.classList.remove('hidden') : el.classList.add('hidden'));
    
    const rodentElems = document.querySelectorAll('.rodent-rule');
    rodentElems.forEach(el => hasRodents ? el.classList.remove('hidden') : el.classList.add('hidden'));

    const mothElems = document.querySelectorAll('.moth-rule');
    mothElems.forEach(el => hasMoths ? el.classList.remove('hidden') : el.classList.add('hidden'));

    const saniElems = document.querySelectorAll('.sani-rule');
    saniElems.forEach(el => hasSanitization ? el.classList.remove('hidden') : el.classList.add('hidden'));
}

// Event Listeners
function setupEventListeners() {
    // Setup Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.settings-tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            if(document.getElementById(targetId)) {
                document.getElementById(targetId).classList.add('active');
            }
        });
    });

    // Form Real-time calculation
    const inputs = document.querySelectorAll('#quote-form input, #quote-form select');
    inputs.forEach(input => {
        input.addEventListener('input', calculateQuote);
        input.addEventListener('change', calculateQuote);
    });

    // Sync Login Button
    document.getElementById('btn-sync-login').addEventListener('click', () => {
        if (!auth) return alert("Firebase no está configurado. Revisa la consola y las claves (firebaseConfig).");
        
        if (currentUser) {
            if(confirm("¿Deseas cerrar sesión de sincronización?")) {
                auth.signOut().then(() => {
                    alert('Sesión cerrada.');
                });
            }
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).then(() => {
                // UI automatically updates via onAuthStateChanged
            }).catch(err => {
                console.error("Login failed", err);
                alert("Error al iniciar sesión: " + err.message);
            });
        }
    });

    // Coverage changes (disable/enable exterior select)
    document.getElementById('coverage-type').addEventListener('change', (e) => {
        const extSelect = document.getElementById('exterior-zones');
        if (e.target.value === 'inside') {
            extSelect.value = 'none';
            extSelect.disabled = true;
        } else {
            if(extSelect.value === 'none') extSelect.value = 'perimeter';
            extSelect.disabled = false;
        }
        calculateQuote();
    });

    // Rodent changes
    document.getElementById('rodent-control').addEventListener('change', (e) => {
        const isYes = e.target.value === 'yes';
        const fields = ['bait-stations', 'loose-stations', 'inspect-stations', 'snap-stations', 'rodent-extras'];
        fields.forEach(f => {
            document.getElementById(f).disabled = !isYes;
        });
        
        if (isYes) {
            const baitInput = document.getElementById('bait-stations');
            if(baitInput.value === '') baitInput.value = 10;
        }
        
        calculateQuote();
    });

    // Moth changes
    const mothControlEl = document.getElementById('moth-control');
    if (mothControlEl) {
        mothControlEl.addEventListener('change', (e) => {
            const isYes = e.target.value === 'yes';
            document.getElementById('moth-prep-service').disabled = !isYes;
            document.getElementById('moth-traps').disabled = !isYes;
            calculateQuote();
        });
    }

    // Sanitization changes
    const saniControlEl = document.getElementById('sanitization-control');
    if (saniControlEl) {
        saniControlEl.addEventListener('change', (e) => {
            const isYes = e.target.value === 'yes';
            document.getElementById('sanitization-size').disabled = !isYes;
            document.getElementById('sanitization-chem').disabled = !isYes;
            document.getElementById('sanitization-tech').disabled = !isYes;
            calculateQuote();
        });
    }

    // General Services
    const btnAddGenServ = document.getElementById('btn-add-general-service');
    if (btnAddGenServ) {
        btnAddGenServ.addEventListener('click', () => {
            if(typeof window.addGeneralService === 'function') {
                window.addGeneralService();
            }
        });
    }

    // Modal Triggers
    const modal = document.getElementById('settings-modal');
    if (modal) {
        document.getElementById('btn-settings').addEventListener('click', () => modal.classList.add('active'));
        document.getElementById('btn-close-settings').addEventListener('click', () => modal.classList.remove('active'));
    }

    const modalHistory = document.getElementById('history-modal');
    document.getElementById('btn-history').addEventListener('click', () => {
        modalHistory.classList.add('active');
        loadHistoryUI();
    });
    document.getElementById('btn-close-history').addEventListener('click', () => modalHistory.classList.remove('active'));

    const modalClients = document.getElementById('clients-modal');
    if (document.getElementById('btn-load-client')) {
        document.getElementById('btn-load-client').addEventListener('click', () => {
            modalClients.classList.add('active');
            renderClientsSelect();
        });
    }
    if (document.getElementById('btn-close-clients')) {
        document.getElementById('btn-close-clients').addEventListener('click', () => modalClients.classList.remove('active'));
    }
    if (document.getElementById('client-search')) {
        document.getElementById('client-search').addEventListener('input', (e) => {
            if (typeof renderClientsSelect === 'function') renderClientsSelect(e.target.value);
        });
    }

    // Settings Parameters Listeners
    if (document.getElementById('setting-margin')) {
        document.getElementById('setting-margin').addEventListener('change', (e) => {
            appData.margin = parseFloat(e.target.value) || 0;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-min-rate').addEventListener('change', (e) => {
            appData.minRate = parseFloat(e.target.value) || 0;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-correlative').addEventListener('change', (e) => {
            appData.correlative = parseInt(e.target.value) || 1;
            saveData();
            calculateQuote();
        });

        if (document.getElementById('setting-report-correlative')) {
            document.getElementById('setting-report-correlative').addEventListener('change', (e) => {
                appData.reportCorrelative = parseInt(e.target.value) || 1;
                saveData();
            });
        }

        document.getElementById('setting-bait-price').addEventListener('change', (e) => {
            appData.baitPrice = parseInt(e.target.value) || 3750;
            saveData();
            calculateQuote();
        });
        
        document.getElementById('setting-moth-prep-price')?.addEventListener('change', (e) => {
            appData.mothPrepPrice = parseInt(e.target.value) || 15000;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-moth-trap-price')?.addEventListener('change', (e) => {
            appData.mothTrapPrice = parseInt(e.target.value) || 5000;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-moth-chem-price')?.addEventListener('change', (e) => {
            appData.mothChemPrice = parseInt(e.target.value) || 25000;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-hh-price').addEventListener('change', (e) => {
            appData.hhPrice = parseFloat(e.target.value) || 15000;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-hh-speed').addEventListener('change', (e) => {
            appData.hhSpeed = parseFloat(e.target.value) || 50;
            saveData();
            calculateQuote();
        });

        document.getElementById('setting-asana-token').addEventListener('change', (e) => {
            appData.asanaToken = e.target.value.trim();
            saveData();
        });

        document.getElementById('setting-asana-project').addEventListener('change', (e) => {
            appData.asanaProject = e.target.value.trim();
            saveData();
        });
    }


    // DB Form Actions
    const btnAddChem = document.getElementById('btn-add-chemical');
    if (btnAddChem) {
        btnAddChem.addEventListener('click', () => {
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
    }
    document.getElementById('btn-generate-pdf').addEventListener('click', generatePDF);
    document.getElementById('btn-asana').addEventListener('click', uploadToAsana);
    
    document.getElementById('btn-new-quote').addEventListener('click', resetForm);

    const btnImport = document.getElementById('btn-import-clients');
    if (btnImport) {
        btnImport.addEventListener('click', async () => {
            if (!currentUser || !db) {
                alert("Debes iniciar sesión con Google primero para importar desde la nube.");
                return;
            }
            const origText = btnImport.innerText;
            btnImport.innerText = "Importando...";
            btnImport.disabled = true;

            try {
                const snap = await db.collection('users').doc(currentUser.uid).collection('quotes').get();
                if (snap.empty) {
                    alert("No se encontraron cotizaciones previas en la nube.");
                    return;
                }
                
                let added = 0;
                if (!appData.clients || !Array.isArray(appData.clients)) {
                    appData.clients = [];
                }
                
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
                    if(typeof renderClientsList === 'function') renderClientsList();
                    alert(`¡Éxito! Se importaron ${added} clientes únicos desde tu historial de cotizaciones.`);
                } else {
                    alert("No se encontraron clientes nuevos para importar (o ya están todos en tu directorio).");
                }
            } catch (err) {
                console.error(err);
                alert("Error al importar clientes: " + err.message);
            } finally {
                btnImport.innerText = origText;
                btnImport.disabled = false;
            }
        });
    }
}

// --- General Services Logic ---
window.addGeneralService = function(data = null) {
    const container = document.getElementById('general-services-container');
    if(!container) return;

    const div = document.createElement('div');
    div.className = 'general-service-row form-grid';
    div.style.position = 'relative';
    div.style.border = '1px solid rgba(255,255,255,0.1)';
    div.style.padding = '15px';
    div.style.borderRadius = '8px';
    div.style.marginBottom = '15px';
    div.style.background = 'rgba(0,0,0,0.1)';

    div.innerHTML = `
        <button type="button" class="btn btn-secondary btn-sm" style="position: absolute; top: 10px; right: 10px; padding: 2px 8px; background: #e74c3c; border-color: #e74c3c; color: white;" onclick="this.parentElement.remove(); calculateQuote();">X</button>
        <div class="input-group">
            <label>Nombre del Servicio</label>
            <input type="text" class="gs-name" placeholder="Ej. Reparación de techumbre" value="${data ? data.name : ''}" required>
        </div>
        <div class="input-group">
            <label>Descripción (Opcional)</label>
            <input type="text" class="gs-desc" placeholder="Ej. Sellado de grietas y limpieza" value="${data ? (data.desc || '') : ''}">
        </div>
        <div class="input-group">
            <label>Precio Total ($)</label>
            <input type="number" class="gs-price" placeholder="Ej. 85000" value="${data ? data.price : ''}" min="0" required>
        </div>
    `;

    div.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', calculateQuote);
        inp.addEventListener('change', calculateQuote);
    });

    container.appendChild(div);
    calculateQuote();
};

// Database Actions
function renderChemicalsList() {
    const list = document.getElementById('db-chemicals-list');
    if (list) {
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
    
    populateChemSelects();
}

function populateChemSelects() {
    const intSelect = document.getElementById('interior-chem');
    const extSelect = document.getElementById('exterior-chem');
    const saniSelect = document.getElementById('sanitization-chem');
    
    // Preserve current selection if any
    const currInt = intSelect?.value;
    const currExt = extSelect?.value;
    const currSani = saniSelect?.value;
    
    if(intSelect) intSelect.innerHTML = '';
    if(extSelect) extSelect.innerHTML = '';
    if(saniSelect) saniSelect.innerHTML = '';
    
    appData.chemicals.forEach(chem => {
        const opt1 = document.createElement('option');
        opt1.value = chem.id;
        opt1.textContent = chem.name;
        if(intSelect) intSelect.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = chem.id;
        opt2.textContent = chem.name;
        if(extSelect) extSelect.appendChild(opt2);

        const opt3 = document.createElement('option');
        opt3.value = chem.id;
        opt3.textContent = chem.name;
        if(saniSelect) saniSelect.appendChild(opt3);
    });
    
    if(currInt && appData.chemicals.some(c => c.id === currInt) && intSelect) intSelect.value = currInt;
    if(currExt && appData.chemicals.some(c => c.id === currExt) && extSelect) extSelect.value = currExt;
    if(currSani && appData.chemicals.some(c => c.id === currSani) && saniSelect) saniSelect.value = currSani;
}

function saveChemical() {
    const name = document.getElementById('chem-name').value;
    const type = document.getElementById('chem-type').value;
    const price = parseFloat(document.getElementById('chem-price').value);
    const size = parseFloat(document.getElementById('chem-size').value);
    const dose = parseFloat(document.getElementById('chem-dose').value);

    if (!name || isNaN(price) || isNaN(size) || isNaN(dose)) {
        alert("Por favor completa todos los campos numéricos y el nombre.");
        return;
    }

    const newChem = {
        id: 'c' + Date.now(),
        name,
        type,
        price,
        size,
        dose
    };

    appData.chemicals.push(newChem);
    saveData();
    renderChemicalsList();
    document.getElementById('chemical-form').classList.add('hidden');
    calculateQuote();
}

window.deleteChemical = function(id) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        appData.chemicals = appData.chemicals.filter(c => c.id !== id);
        saveData();
        renderChemicalsList();
        calculateQuote();
    }
};

// PDF Generation & Web Share
async function generatePDF() {
    const name = document.getElementById('client-name').value;
    if(!name) {
        alert("Por favor ingresa al menos el nombre del cliente para exportar.");
        return;
    }

    // Consumir correlativo localmente si es una cotización nueva, incluso si la nube falla
    if (!currentQuoteId && loadedCorrelative === null) {
        loadedCorrelative = appData.correlative;
        appData.correlative++;
        document.getElementById('setting-correlative').value = appData.correlative;
        saveData();
        calculateQuote();
    }

    const saved = await saveQuote(true);
    if (!saved && !confirm("No se ha podido guardar en la nube (revisa tu sesión o conexión). ¿Deseas exportar el PDF de todas formas?")) return;

    const btn = document.getElementById('btn-generate-pdf');
    const oldText = btn.innerText;
    btn.innerText = "Exportando...";
    btn.disabled = true;

    try {
        const element = document.getElementById('pdf-content');
        const container = document.getElementById('pdf-container');

        const opt = {
            margin:       [10, 0, 15, 0],
            filename:     `COTIZACION_DE_SERVICIOS_${loadedCorrelative !== null ? loadedCorrelative : appData.correlative}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const originalTransform = element.style.transform;
        const originalMarginBottom = element.style.marginBottom;
        const originalOverflow = container.style.overflow;
        const originalMaxHeight = container.style.maxHeight;

        element.style.transform = 'none';
        element.style.marginBottom = '0px';
        container.style.overflow = 'visible';
        container.style.maxHeight = 'none';
        
        const worker = html2pdf().set(opt).from(element);
        const pdfBlob = await worker.outputPdf('blob');
        
        element.style.transform = originalTransform;
        element.style.marginBottom = originalMarginBottom;
        container.style.overflow = originalOverflow;
        container.style.maxHeight = originalMaxHeight;

        const file = new File([pdfBlob], opt.filename, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
               await navigator.share({
                   title: 'Cotización Stahlgraf',
                   text: `Adjunto cotización solicitada.`,
                   files: [file]
               });
            } catch(e) {
               // User cancelled or share failed, fallback to download
               await worker.save();
            }
        } else {
            // Fallback for PC Safari/Chrome/Edge where file sharing might be disabled
            await worker.save();
            alert("El navegador no soporta el envío directo en este dispositivo. El PDF se ha guardado en tus Descargas para que puedas enviarlo.");
        }
    } catch(err) {
        console.error("PDF generation error: ", err);
    } finally {
        btn.innerText = oldText;
        btn.disabled = false;
    }
}

// Asana Upload Flow
async function uploadToAsana() {
    if (!appData.asanaToken || !appData.asanaProject) {
        alert("Por favor configura tu Token Personal (PAT) y el Project ID de Asana en 'Ajustes & BD' primero.");
        return;
    }

    const clientName = document.getElementById('client-name').value || 'Cliente sin nombre';
    if(clientName === 'Cliente sin nombre' || !document.getElementById('client-name').value) {
        alert("Por favor ingresa al menos el nombre del cliente para crear la tarea.");
        return;
    }

    // Consumir correlativo localmente si es una cotización nueva
    if (!currentQuoteId && loadedCorrelative === null) {
        loadedCorrelative = appData.correlative;
        appData.correlative++;
        document.getElementById('setting-correlative').value = appData.correlative;
        saveData();
        calculateQuote();
    }

    const saved = await saveQuote(true);
    if (!saved && !confirm("No se ha podido guardar la cotización en la nube. ¿Deseas subir el archivo a Asana de todas formas?")) return;

    const btn = document.getElementById('btn-asana');
    const originalText = btn.innerText;
    btn.innerText = "Subiendo...";
    btn.disabled = true;

    try {
        // 0. Search for existing task
        btn.innerText = "Buscando...";
        let taskGid = null;
        let searchUrl = `https://app.asana.com/api/1.0/tasks?project=${appData.asanaProject}&opt_fields=name&limit=100`;
        
        const normalizeText = (text) => text ? text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
        const targetName = normalizeText(clientName);

        while (searchUrl && !taskGid) {
            const getTasksRes = await fetch(searchUrl, {
                headers: {
                    'Authorization': `Bearer ${appData.asanaToken}`,
                    'Accept': 'application/json'
                }
            });
            if (!getTasksRes.ok) {
                const errText = await getTasksRes.text();
                console.warn("No se pudo buscar tareas existentes. Status:", getTasksRes.status, errText);
                break;
            }
            const tasksJson = await getTasksRes.json();
            
            if (tasksJson.data && tasksJson.data.length > 0) {
                const existingTask = tasksJson.data.find(t => normalizeText(t.name) === targetName);
                if (existingTask) {
                    taskGid = existingTask.gid;
                    break;
                }
            }
            searchUrl = tasksJson.next_page ? tasksJson.next_page.uri : null;
        }

        if (!taskGid) {
            // 1. Create Task (Not Found)
            btn.innerText = "Creando tarea...";
            const taskData = {
                data: {
                    name: clientName,
                    notes: `Atención a: ${document.getElementById('client-attention').value || '-'}
Teléfono: ${document.getElementById('client-phone').value || '-'}
Dirección: ${document.getElementById('client-address').value || '-'}
Total Cotizado: ${document.getElementById('doc-total').innerText}

Creado desde Cotizador Stahlgraf.`,
                    projects: [appData.asanaProject]
                }
            };

            const taskRes = await fetch('https://app.asana.com/api/1.0/tasks', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${appData.asanaToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!taskRes.ok) throw new Error("Error creando tarea en Asana: " + (await taskRes.text()));
            
            const taskJson = await taskRes.json();
            taskGid = taskJson.data.gid;
        } else {
            // Found existing task, add a comment indicating a new quote was added
            btn.innerText = "Actualizando...";
            try {
                await fetch(`https://app.asana.com/api/1.0/tasks/${taskGid}/stories`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${appData.asanaToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            text: `Se ha generado y adjuntado una nueva versión de cotización (#${finalCorrelative}) por ${document.getElementById('doc-total').innerText}.`
                        }
                    })
                });
            } catch (e) {
                console.warn("No se pudo añadir el comentario a la tarea existente.", e);
            }
        }

        // 2. Generate PDF Blob directly from html2pdf
        btn.innerText = "Generando PDF...";
        const element = document.getElementById('pdf-content');
        const container = document.getElementById('pdf-container');
        const finalCorrelativeForPdf = loadedCorrelative !== null ? loadedCorrelative : appData.correlative;
        
        const originalTransform = element.style.transform;
        const originalMarginBottom = element.style.marginBottom;
        const originalOverflow = container.style.overflow;
        const originalMaxHeight = container.style.maxHeight;

        element.style.transform = 'none';
        element.style.marginBottom = '0px';
        container.style.overflow = 'visible';
        container.style.maxHeight = 'none';

        const opt = {
            margin:       [10, 0, 15, 0],
            filename:     `COTIZACION_${finalCorrelativeForPdf}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // await html2pdf generator Promise
        const worker = html2pdf().set(opt).from(element);
        const pdfBlob = await worker.outputPdf('blob');
        
        element.style.transform = originalTransform;
        element.style.marginBottom = originalMarginBottom;
        container.style.overflow = originalOverflow;
        container.style.maxHeight = originalMaxHeight;

        // 3. Upload Attachment to Asana Task
        const formData = new FormData();
        const fileName = `Cotizacion_${finalCorrelativeForPdf}_${clientName.replace(/\s+/g, '_')}.pdf`;
        formData.append('file', pdfBlob, fileName);

        const attachRes = await fetch(`https://app.asana.com/api/1.0/tasks/${taskGid}/attachments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${appData.asanaToken}`,
                'Accept': 'application/json'
            },
            body: formData
        });

        if (!attachRes.ok) throw new Error("Error subiendo PDF a Asana: " + (await attachRes.text()));

        // Correlativo es autoincrementado silenciosamente por saveQuote().
        alert("¡Éxito! Tarea y Cotización subidas a Asana.");
    } catch (err) {
        console.error("Asana Flow Error:", err);
        alert("Ocurrió un error al enviar a Asana. Revisa la consola para más detalles.\n\n" + err.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Quote History & Save Flow
function resetForm() {
    document.getElementById('quote-form').reset();
    const gsContainer = document.getElementById('general-services-container');
    if(gsContainer) gsContainer.innerHTML = '';
    currentQuoteId = null;
    loadedCorrelative = null;
    calculateQuote();
    alert("Formulario limpiado. Listo para una nueva cotización.");
}

async function saveQuote(silent = false) {
    if (!currentUser || !db) {
        alert("Atención: No has iniciado sesión con Google. La cotización NO se guardará en la nube, pero el PDF sí se generará.");
        return false;
    }
    
    const inputs = document.querySelectorAll('#quote-form input, #quote-form select');
    const quoteData = {};
    inputs.forEach(input => {
        if(input.id) quoteData[input.id] = input.value;
    });
    
    quoteData.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    quoteData.clientName = document.getElementById('client-name').value || 'Sin nombre';
    quoteData.totalStr = document.getElementById('doc-total').innerText;
    
    const genServices = [];
    document.querySelectorAll('.general-service-row').forEach(row => {
        const name = row.querySelector('.gs-name').value;
        const desc = row.querySelector('.gs-desc').value;
        const price = parseFloat(row.querySelector('.gs-price').value) || 0;
        if(name) genServices.push({name, desc, price});
    });
    quoteData.generalServices = genServices;
    
    const btn = document.getElementById('btn-save-quote');
    let oldText = "";
    if (btn) {
        oldText = btn.innerText;
        btn.innerText = "Guardando...";
        btn.disabled = true;
    }

    try {
        if (!currentQuoteId) {
            // Lock correlative if not already locked
            if (loadedCorrelative === null) {
                loadedCorrelative = appData.correlative;
                appData.correlative++;
                document.getElementById('setting-correlative').value = appData.correlative;
                saveData();
            }
            quoteData.correlative = loadedCorrelative;
            
            const ref = await db.collection('users').doc(currentUser.uid).collection('quotes').add(quoteData);
            currentQuoteId = ref.id;
        } else {
            quoteData.correlative = loadedCorrelative !== null ? loadedCorrelative : appData.correlative;
            await db.collection('users').doc(currentUser.uid).collection('quotes').doc(currentQuoteId).set(quoteData, { merge: true });
        }
        
        if (!silent) alert("✅ Cotización guardada exitosamente en Firestore.");
        
        // Auto-save client info to directory silently
        if(typeof saveClientToDirectory === 'function') saveClientToDirectory(true);
        
        // Sync quote to our own CRM
        await syncToCRM(quoteData, currentQuoteId);
        
        calculateQuote();
        return true;
    } catch(err) {
        console.error(err);
        alert("Error de Firebase al guardar la cotización: " + err.message + "\n(Puede que las reglas de la base de datos hayan expirado o haya un problema de conexión)");
        return false;
    } finally {
        if (btn) {
            btn.innerText = oldText;
            btn.disabled = false;
        }
    }
}

async function syncToCRM(quoteData, quoteId) {
    if (!currentUser || !db) return;
    
    const clientName = quoteData.clientName;
    const totalStr = quoteData.totalStr;
    const correlative = quoteData.correlative;
    const phone = (quoteData['client-phone'] || '').trim();
    const email = (quoteData['client-email'] || '').trim();
    const dateStr = new Date().toLocaleString();
    
    try {
        const snapQuote = await db.collection('users').doc(currentUser.uid).collection('crm').where('quoteId', '==', quoteId).limit(1).get();
        
        if (!snapQuote.empty) {
            const docId = snapQuote.docs[0].id;
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(docId).update({
                client: clientName,
                phone: phone,
                email: email,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return;
        }

        const snapClient = await db.collection('users').doc(currentUser.uid).collection('crm').where('client', '==', clientName).get();
        let targetDoc = null;

        if (!snapClient.empty) {
            snapClient.forEach(doc => {
                const docData = doc.data();
                const docPhone = (docData.phone || '').trim();
                if (docPhone === phone) {
                    targetDoc = doc;
                }
            });
        }

        if (targetDoc) {
            const docId = targetDoc.id;
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(docId).update({
                email: email,
                comments: firebase.firestore.FieldValue.arrayUnion({
                    text: `Se generó la Cotización #${correlative} por un total de ${totalStr}.`,
                    date: dateStr
                }),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            const payload = {
                client: clientName,
                phone: phone,
                email: email,
                column: 'Cotizados',
                date: new Date().toISOString().split('T')[0],
                desc: `Cotización #${correlative} generada automáticamente.\nTotal: ${totalStr}`,
                quoteId: quoteId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                comments: []
            };
            await db.collection('users').doc(currentUser.uid).collection('crm').add(payload);
        }
    } catch(e) {
        console.error("No se pudo sincronizar con CRM automáticamente", e);
    }
}

window.tempHistorySnap = null;
async function loadHistoryUI() {
    if (!currentUser || !db) {
        document.getElementById('history-list').innerHTML = '<p>Inicia sesión primero para ver tu historial.</p>';
        return;
    }
    
    document.getElementById('history-list').innerHTML = '<p>Cargando de la nube...</p>';
    try {
        const snap = await db.collection('users').doc(currentUser.uid).collection('quotes')
          .orderBy('timestamp', 'desc').limit(50).get();
          
        if (snap.empty) {
            document.getElementById('history-list').innerHTML = '<p>No tienes cotizaciones guardadas aún.</p>';
            return;
        }
        
        window.tempHistorySnap = snap;
        let html = '';
        snap.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp && data.timestamp.toDate ? data.timestamp.toDate().toLocaleDateString('es-ES') : 'Reciente';
            html += `
            <div class="db-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; flex-wrap: wrap; gap: 10px;">
                <div>
                    <strong>#${data.correlative || '?'} - ${data.clientName}</strong>
                    <div style="font-size: 0.85em; color: #666;">Fecha: ${date} | Total: ${data.totalStr || '$0'}</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button class="btn btn-primary-outline btn-sm" onclick="loadQuoteFromDB('${doc.id}')">🔄 Cargar</button>
                    <button class="btn btn-primary btn-sm" style="background-color: #25D366; border-color: #25D366; color: white;" onclick="resendWhatsAppFromDB('${doc.id}')">▶️ WhatsApp</button>
                    <button class="btn btn-secondary btn-sm" onclick="deleteQuoteFromDB('${doc.id}')">❌</button>
                </div>
            </div>`;
        });
        document.getElementById('history-list').innerHTML = html;
        
    } catch(err) {
        document.getElementById('history-list').innerHTML = '<p>Error cargando historial.</p>';
        console.error("Load History Error:", err);
    }
}

window.loadQuoteFromDB = function(id, silent = false) {
    if (!window.tempHistorySnap) return;
    const doc = window.tempHistorySnap.docs.find(d => d.id === id);
    if (!doc) return;
    
    const data = doc.data();
    Object.keys(data).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = data[key];
        }
    });
    
    const gsContainer = document.getElementById('general-services-container');
    if(gsContainer) gsContainer.innerHTML = '';
    if(data.generalServices && data.generalServices.length > 0) {
        data.generalServices.forEach(gs => window.addGeneralService(gs));
    }
    
    currentQuoteId = id;
    loadedCorrelative = data.correlative || null;
    calculateQuote();
    
    document.getElementById('history-modal').classList.remove('active');
    if (!silent) alert("Cotización restaurada. Cualquier cambio y nueva guardada sobrescribirá el archivo original sin gastar un número de folio nuevo.");
};

window.deleteQuoteFromDB = async function(id) {
    if(!confirm("¿Estás seguro de eliminar esta cotización definitivamente?")) return;
    try {
        await db.collection('users').doc(currentUser.uid).collection('quotes').doc(id).delete();
        if (currentQuoteId === id) resetForm(); // If it was loaded, reset UI
        loadHistoryUI();
    } catch(err) {
        console.error(err);
        alert("Error al eliminar.");
    }
};

window.resendWhatsAppFromDB = async function(id) {
    window.loadQuoteFromDB(id, true);
    // Allow DOM to process the changes immediately before generating PDF
    setTimeout(async () => {
        await generatePDF();
    }, 200);
};
// --- Client Directory Management ---

window.saveClientToDirectory = function(silent = false) {
    const name = document.getElementById('client-name').value.trim();
    const attention = document.getElementById('client-attention').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const email = document.getElementById('client-email') ? document.getElementById('client-email').value.trim() : '';
    const address = document.getElementById('client-address').value.trim();

    if (!name || (!silent && (!phone || !address))) {
        if(!silent) alert("Por favor completa al menos Nombre, Teléfono y Dirección para guardar el cliente.");
        return;
    }

    const newClient = {
        id: 'cl_' + Date.now(),
        name,
        attention,
        phone,
        email,
        address
    };

    // Check if client with same name already exists to update it instead of duplicate
    const existingIndex = appData.clients.findIndex(c => (c.name || '').toLowerCase() === name.toLowerCase());
    if (existingIndex >= 0) {
        if (!silent) {
            if(confirm(`El cliente "${name}" ya existe en tu directorio. ¿Deseas actualizar sus datos?`)) {
                newClient.id = appData.clients[existingIndex].id; // preserve ID
                appData.clients[existingIndex] = newClient;
            } else {
                return;
            }
        } else {
            // Silently update if we are auto-saving
            newClient.id = appData.clients[existingIndex].id; // preserve ID
            // Preserve fields if not provided in auto-save
            if (!email && appData.clients[existingIndex].email) newClient.email = appData.clients[existingIndex].email;
            if (!phone && appData.clients[existingIndex].phone) newClient.phone = appData.clients[existingIndex].phone;
            if (!address && appData.clients[existingIndex].address) newClient.address = appData.clients[existingIndex].address;
            appData.clients[existingIndex] = newClient;
        }
    } else {
        appData.clients.push(newClient);
    }

    saveData();
    if(typeof renderClientsList === 'function') renderClientsList();
    if (!silent) alert("Cliente guardado en tu directorio.");
};

window.renderClientsList = function() {
    const list = document.getElementById('db-clients-settings-list');
    if (!list) return;

    list.innerHTML = '';
    if (!appData.clients || appData.clients.length === 0) {
        list.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No hay clientes guardados. Usa el botón "Guardar Cliente" en la pantalla principal.</p>';
        return;
    }

    // Sort alphabetically by name
    const sortedClients = [...appData.clients].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    sortedClients.forEach(client => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.innerHTML = `
            <div class="db-item-info">
                <strong>${client.name}</strong>
                <span>${client.attention ? 'Atención: ' + client.attention + ' | ' : ''}Tel: ${client.phone} | Dir: ${client.address}</span>
            </div>
            <div class="db-item-actions">
                <button onclick="loadClientToForm('${client.id}'); document.getElementById('settings-modal').classList.remove('active');">Cargar</button>
                <button class="action-danger" onclick="deleteClient('${client.id}')">Eliminar</button>
            </div>
        `;
        list.appendChild(div);
    });
};

window.renderClientsSelect = function(searchTerm = '') {
    const list = document.getElementById('client-select-list');
    if (!list) return;

    list.innerHTML = '';
    if (!appData.clients || appData.clients.length === 0) {
        list.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No hay clientes guardados.</p>';
        return;
    }

    let filteredClients = appData.clients;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredClients = appData.clients.filter(c => (c.name || '').toLowerCase().includes(term));
    }

    // Sort alphabetically by name
    filteredClients.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    if (filteredClients.length === 0) {
        list.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No se encontraron clientes.</p>';
        return;
    }

    filteredClients.forEach(client => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.style.cursor = 'pointer';
        div.onclick = () => {
            loadClientToForm(client.id);
            document.getElementById('clients-modal').classList.remove('active');
        };
        div.innerHTML = `
            <div class="db-item-info">
                <strong>${client.name}</strong>
                <span>Tel: ${client.phone} | Dir: ${client.address}${client.email ? ` | Email: ${client.email}` : ''}</span>
            </div>
            <div class="db-item-actions">
                <button class="btn btn-primary btn-sm">Seleccionar</button>
            </div>
        `;
        list.appendChild(div);
    });
};

window.loadClientToForm = function(id) {
    const client = appData.clients.find(c => c.id === id);
    if (!client) return;

    document.getElementById('client-name').value = client.name || '';
    document.getElementById('client-attention').value = client.attention || '';
    document.getElementById('client-phone').value = client.phone || '';
    if (document.getElementById('client-email')) {
        document.getElementById('client-email').value = client.email || '';
    }
    document.getElementById('client-address').value = client.address || '';
    
    calculateQuote();
};

window.deleteClient = function(id) {
    if (confirm("¿Estás seguro de eliminar a este cliente del directorio?")) {
        appData.clients = appData.clients.filter(c => c.id !== id);
        saveData();
        renderClientsList();
        if(document.getElementById('clients-modal').classList.contains('active')) {
            renderClientsSelect();
        }
    }
};

// Run
document.addEventListener('DOMContentLoaded', initApp);
