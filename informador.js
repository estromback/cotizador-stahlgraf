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
let storage = null;
let currentUser = null;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
    } catch (e) {
        console.warn("Firebase config is incomplete or invalid.", e);
    }
}

// Global state
let currentPhotos = []; // Array of { file, dataUrl }
let loadedReportCorrelative = null;
let clientsList = [];

// DOM Elements
const formInputs = document.querySelectorAll('#report-form input, #report-form textarea, #report-form select');
const checkboxes = document.querySelectorAll('input[name="pest-type"]');
const photoUpload = document.getElementById('photo-upload');
const photoPreviewGrid = document.getElementById('photo-preview-grid');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Set date to today
    document.getElementById('report-date').valueAsDate = new Date();
    
    setupEventListeners();
    updatePDFPreview();

    // Firebase Auth Listener
    if (auth) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                document.getElementById('sync-text').innerText = "Conectado";
                document.getElementById('sync-icon').innerText = "✅";
                loadUserConfig();
                loadClientsFromFirebase();
            } else {
                currentUser = null;
                document.getElementById('sync-text').innerText = "Ingresar";
                document.getElementById('sync-icon').innerText = "☁️";
            }
        });
    }
});

function setupEventListeners() {
    // Login
    document.getElementById('btn-sync-login').addEventListener('click', () => {
        if (!auth) return alert("Firebase no está configurado.");
        if (currentUser) {
            if(confirm("¿Deseas cerrar sesión?")) {
                auth.signOut().then(() => alert('Sesión cerrada.'));
            }
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(err => alert("Error: " + err.message));
        }
    });

    // Inputs real-time update
    formInputs.forEach(input => {
        input.addEventListener('input', updatePDFPreview);
    });
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updatePDFPreview);
    });

    // Photos
    photoUpload.addEventListener('change', handlePhotoUpload);

    // Clients Modal
    const modalClients = document.getElementById('clients-modal');
    document.getElementById('btn-load-client').addEventListener('click', () => {
        modalClients.classList.add('active');
        renderClientsSelect();
    });
    document.getElementById('btn-close-clients').addEventListener('click', () => {
        modalClients.classList.remove('active');
    });
    document.getElementById('client-search').addEventListener('input', (e) => {
        renderClientsSelect(e.target.value);
    });

    // Action Buttons
    document.getElementById('btn-new-report').addEventListener('click', resetForm);
    document.getElementById('btn-save-report').addEventListener('click', saveReportToCloud);
    document.getElementById('btn-generate-pdf').addEventListener('click', generatePDF);

    // History Modal
    const modalHistory = document.getElementById('history-modal');
    document.getElementById('btn-history').addEventListener('click', () => {
        if (!currentUser) return alert("Debes iniciar sesión para ver el historial.");
        modalHistory.classList.add('active');
        loadHistoryUI();
    });
    document.getElementById('btn-close-history').addEventListener('click', () => {
        modalHistory.classList.remove('active');
    });

    // Dashboard Modal
    const modalDashboard = document.getElementById('dashboard-modal');
    document.getElementById('btn-dashboard').addEventListener('click', () => {
        if (!currentUser) return alert("Debes iniciar sesión para ver el dashboard.");
        modalDashboard.classList.add('active');
        loadDashboardUI();
    });
    document.getElementById('btn-close-dashboard').addEventListener('click', () => {
        modalDashboard.classList.remove('active');
    });
}

function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 800; // Compress images to max 800px

                if (width > height && width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6); // 60% quality jpeg

                currentPhotos.push({
                    file: file,
                    dataUrl: compressedDataUrl,
                    id: Date.now() + Math.random().toString()
                });
                renderPhotoGrid();
                updatePDFPreview();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    // Reset input
    photoUpload.value = '';
}

function renderPhotoGrid() {
    photoPreviewGrid.innerHTML = '';
    currentPhotos.forEach(photoObj => {
        const div = document.createElement('div');
        div.className = 'photo-thumbnail-container';
        div.innerHTML = `
            <img src="${photoObj.dataUrl}" class="photo-thumbnail">
            <button type="button" class="photo-remove-btn" data-id="${photoObj.id}">&times;</button>
        `;
        photoPreviewGrid.appendChild(div);
    });

    // Add remove listeners
    document.querySelectorAll('.photo-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            currentPhotos = currentPhotos.filter(p => p.id !== id);
            renderPhotoGrid();
            updatePDFPreview();
        });
    });
}

function updatePDFPreview() {
    // Basic Info
    const cName = document.getElementById('client-name').value || '-';
    const cAddress = document.getElementById('client-address').value || '-';
    const cTech = document.getElementById('technician-name').value || '-';
    const rawDate = document.getElementById('report-date').value;
    
    let dateStr = '-';
    if(rawDate) {
        const [y, m, d] = rawDate.split('-');
        dateStr = `${d}/${m}/${y}`;
    }

    document.getElementById('doc-client-name').innerText = cName;
    document.getElementById('doc-client-address').innerText = cAddress;
    document.getElementById('doc-technician-name').innerText = cTech;
    document.getElementById('doc-date').innerText = dateStr;

    // Helper function to show/hide blocks
    const toggleBlock = (docId, value) => {
        const pEl = document.getElementById(docId);
        if (value && value.trim() !== '') {
            pEl.innerText = value;
            pEl.parentElement.style.display = 'block';
        } else {
            pEl.parentElement.style.display = 'none';
        }
    };

    // Checkboxes
    const selectedPests = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    toggleBlock('doc-pests-detected', selectedPests.join(', '));

    // Text areas
    toggleBlock('doc-access-points', document.getElementById('access-points').value);
    toggleBlock('doc-nesting-places', document.getElementById('nesting-places').value);
    toggleBlock('doc-weak-points', document.getElementById('weak-points').value);
    toggleBlock('doc-recommendations', document.getElementById('recommendations').value);

    // Photos
    const docPhotoGrid = document.getElementById('doc-photo-grid');
    const docNoPhotos = document.getElementById('doc-no-photos');
    
    docPhotoGrid.innerHTML = '';
    if (currentPhotos.length > 0) {
        docNoPhotos.style.display = 'none';
        currentPhotos.forEach(photoObj => {
            const div = document.createElement('div');
            div.className = 'pdf-photo-wrapper';
            div.innerHTML = `<img src="${photoObj.dataUrl}">`;
            docPhotoGrid.appendChild(div);
        });
    } else {
        docNoPhotos.style.display = 'block';
    }
}

async function saveReportToCloud() {
    if (!currentUser || !db) {
        return alert("Debes iniciar sesión para guardar en la nube.");
    }
    const clientName = document.getElementById('client-name').value.trim();
    if (!clientName) {
        return alert("Por favor ingresa al menos el Nombre del Cliente.");
    }

    const btn = document.getElementById('btn-save-report');
    const originalText = btn.innerText;
    btn.innerText = "Guardando...";
    btn.disabled = true;

    try {
        const timestamp = new Date().getTime();
        const reportId = 'rep_' + timestamp;
        const photoUrls = [];

        // Save compressed photos as base64 in Firestore directly to prevent Storage hangs
        if (currentPhotos.length > 0) {
            btn.innerText = "Procesando fotos...";
            for (let i = 0; i < currentPhotos.length; i++) {
                photoUrls.push(currentPhotos[i].dataUrl);
            }
        }

        btn.innerText = "Guardando Datos...";

        const selectedPests = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

        const reportData = {
            id: reportId,
            clientName: clientName,
            clientAddress: document.getElementById('client-address').value,
            technicianName: document.getElementById('technician-name').value,
            date: document.getElementById('report-date').value,
            pestsDetected: selectedPests,
            accessPoints: document.getElementById('access-points').value,
            nestingPlaces: document.getElementById('nesting-places').value,
            weakPoints: document.getElementById('weak-points').value,
            recommendations: document.getElementById('recommendations').value,
            photoUrls: photoUrls,
            timestamp: timestamp
        };

        await db.collection('users').doc(currentUser.uid).collection('reports').doc(reportId).set(reportData);

        // Increment correlative
        const savedData = localStorage.getItem('stahlgraf_data_v4');
        if (savedData) {
            const appData = JSON.parse(savedData);
            appData.reportCorrelative = (appData.reportCorrelative || 1) + 1;
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            
            if (currentUser && db) {
                db.collection('users').doc(currentUser.uid).set(appData, { merge: true }).catch(e => console.error(e));
            }
            
            loadedReportCorrelative = appData.reportCorrelative;
            document.getElementById('doc-correlative').innerText = loadedReportCorrelative;
        }

        alert("¡Informe guardado exitosamente!");
        btn.innerText = originalText;
        btn.disabled = false;

    } catch (error) {
        console.error("Error saving report:", error);
        alert("Error al guardar: " + error.message);
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function generatePDF() {
    const btn = document.getElementById('btn-generate-pdf');
    const oldText = btn.innerText;
    btn.innerText = "Generando...";
    btn.disabled = true;

    try {
        const element = document.getElementById('pdf-content');
        const container = element.parentElement; // .pdf-container
        
        // Remove transform and overflow temporarily for PDF generation to fix blank pages on mobile
        const originalTransform = element.style.transform;
        const originalMarginBottom = element.style.marginBottom;
        const originalOverflow = container.style.overflow;
        const originalMaxHeight = container.style.maxHeight;

        element.style.transform = 'none';
        element.style.marginBottom = '0px';
        container.style.overflow = 'visible';
        container.style.maxHeight = 'none';

        const clientName = document.getElementById('client-name').value || 'Sin_Nombre';
        const rawDate = document.getElementById('report-date').value;
        const dateStr = rawDate ? rawDate.replace(/-/g, '') : 'Fecha';

        const opt = {
            margin:       10,
            filename:     `Informe_${clientName.replace(/\s+/g, '_')}_${dateStr}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const worker = html2pdf().set(opt).from(element);
        const pdfBlob = await worker.outputPdf('blob');

        // Revert styles
        element.style.transform = originalTransform;
        element.style.marginBottom = originalMarginBottom;
        container.style.overflow = originalOverflow;
        container.style.maxHeight = originalMaxHeight;

        const file = new File([pdfBlob], opt.filename, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
               await navigator.share({
                   title: 'Informe de Inspección Stahlgraf',
                   text: `Adjunto informe de plagas.`,
                   files: [file]
               });
            } catch(e) {
               await worker.save();
            }
        } else {
            await worker.save();
        }
    } catch(err) {
        console.error("PDF error: ", err);
        alert("Error al generar PDF: " + err.message);
    } finally {
        btn.innerText = oldText;
        btn.disabled = false;
    }
}

function resetForm() {
    if(!confirm("¿Seguro que deseas limpiar todo el formulario?")) return;
    document.getElementById('report-form').reset();
    document.getElementById('report-date').valueAsDate = new Date();
    currentPhotos = [];
    renderPhotoGrid();
    updatePDFPreview();
}

// ---- Client Data (Reused from Quote App) ----
function loadClientsFromFirebase() {
    if (!currentUser || !db) return;
    
    // Load local cache if available from other app
    const savedData = localStorage.getItem('stahlgraf_data_v4');
    if (savedData) {
        const appData = JSON.parse(savedData);
        if (appData.clients) {
            clientsList = appData.clients;
        }
    }
    
    // Try to sync with firebase user doc
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            if (cloudData.clients) {
                clientsList = cloudData.clients;
                localStorage.setItem('stahlgraf_data_v4', JSON.stringify({ ...JSON.parse(localStorage.getItem('stahlgraf_data_v4') || '{}'), clients: clientsList }));
            }
        }
    });
}

function renderClientsSelect(filter = '') {
    const listEl = document.getElementById('client-select-list');
    listEl.innerHTML = '';
    
    if (clientsList.length === 0) {
        listEl.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No hay clientes guardados. Guárdalos desde la Configuración del Cotizador.</p>';
        return;
    }

    const term = filter.toLowerCase();
    const filtered = clientsList.filter(c => c.name.toLowerCase().includes(term) || (c.address && c.address.toLowerCase().includes(term)));

    filtered.forEach(client => {
        const div = document.createElement('div');
        div.className = 'db-item';
        div.style.cursor = 'pointer';
        div.innerHTML = `
            <div class="db-item-content">
                <strong>${client.name}</strong><br>
                <span style="font-size: 0.85rem; color: #888;">${client.address || ''}</span>
            </div>
            <button class="btn btn-primary-outline btn-sm" style="padding: 3px 8px;">Seleccionar</button>
        `;
        div.addEventListener('click', () => {
            document.getElementById('client-name').value = client.name || '';
            document.getElementById('client-address').value = client.address || '';
            document.getElementById('clients-modal').classList.remove('active');
            updatePDFPreview();
        });
        listEl.appendChild(div);
    });
}

function loadUserConfig() {
    const savedData = localStorage.getItem('stahlgraf_data_v4');
    if (savedData) {
        const appData = JSON.parse(savedData);
        loadedReportCorrelative = appData.reportCorrelative || 1;
        document.getElementById('doc-correlative').innerText = loadedReportCorrelative;
    }
}

// ---- History and Dashboard ----
async function loadHistoryUI() {
    const listEl = document.getElementById('history-list');
    listEl.innerHTML = '<p style="color: #666;">Cargando informes...</p>';

    if (!currentUser || !db) return;

    try {
        const snapshot = await db.collection('users').doc(currentUser.uid).collection('reports').orderBy('timestamp', 'desc').limit(20).get();
        if (snapshot.empty) {
            listEl.innerHTML = '<p style="color: #666;">No hay informes guardados aún.</p>';
            return;
        }

        listEl.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const dateStr = data.date ? data.date : new Date(data.timestamp).toLocaleDateString('es-CL');
            const div = document.createElement('div');
            div.className = 'db-item';
            div.innerHTML = `
                <div class="db-item-content">
                    <strong>${data.clientName || 'Sin Nombre'}</strong> <span style="color:#aaa; font-size:0.85rem;">(${dateStr})</span><br>
                    <span style="font-size: 0.85rem; color: #888;">Plagas: ${(data.pestsDetected || []).join(', ') || 'Ninguna'}</span>
                </div>
                <div class="db-item-actions">
                    <button class="btn btn-secondary btn-sm btn-load-historic" data-id="${doc.id}">Ver Resumen</button>
                </div>
            `;
            listEl.appendChild(div);
        });

        // Event listener para ver resumen o cargar
        document.querySelectorAll('.btn-load-historic').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                try {
                    const docInfo = await db.collection('users').doc(currentUser.uid).collection('reports').doc(id).get();
                    if(docInfo.exists) {
                        const rData = docInfo.data();
                        document.getElementById('client-name').value = rData.clientName || '';
                        document.getElementById('client-address').value = rData.clientAddress || '';
                        document.getElementById('technician-name').value = rData.technicianName || '';
                        document.getElementById('report-date').value = rData.date || '';
                        
                        document.getElementById('access-points').value = rData.accessPoints || '';
                        document.getElementById('nesting-places').value = rData.nestingPlaces || '';
                        document.getElementById('weak-points').value = rData.weakPoints || '';
                        document.getElementById('recommendations').value = rData.recommendations || '';

                        checkboxes.forEach(cb => {
                            cb.checked = (rData.pestsDetected && rData.pestsDetected.includes(cb.value));
                        });

                        currentPhotos = [];
                        if (rData.photoUrls && rData.photoUrls.length > 0) {
                            rData.photoUrls.forEach(url => {
                                currentPhotos.push({
                                    file: null,
                                    dataUrl: url,
                                    id: Date.now() + Math.random().toString()
                                });
                            });
                        }
                        
                        renderPhotoGrid();
                        updatePDFPreview();
                        
                        document.getElementById('history-modal').classList.remove('active');
                    }
                } catch(error) {
                    alert("Error cargando informe: " + error.message);
                }
            });
        });

    } catch (err) {
        console.error(err);
        listEl.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}

async function loadDashboardUI() {
    const statsContainer = document.getElementById('dashboard-stats');
    const barsContainer = document.getElementById('pests-chart-bars');
    
    statsContainer.innerHTML = '<p>Cargando estadísticas...</p>';
    barsContainer.innerHTML = '';

    if (!currentUser || !db) return;

    try {
        const snapshot = await db.collection('users').doc(currentUser.uid).collection('reports').get();
        const totalReports = snapshot.size;
        
        if (totalReports === 0) {
            statsContainer.innerHTML = '<p>No hay datos suficientes para el Dashboard.</p>';
            return;
        }

        let pestCounts = {};
        let totalPestsReported = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.pestsDetected && Array.isArray(data.pestsDetected)) {
                data.pestsDetected.forEach(pest => {
                    pestCounts[pest] = (pestCounts[pest] || 0) + 1;
                    totalPestsReported++;
                });
            }
        });

        // Render Stats Cards
        statsContainer.innerHTML = `
            <div class="stat-card">
                <h4>Total Informes</h4>
                <div class="stat-value">${totalReports}</div>
            </div>
            <div class="stat-card">
                <h4>Tipos de Plagas</h4>
                <div class="stat-value">${Object.keys(pestCounts).length}</div>
            </div>
        `;

        // Render Bars
        if (totalPestsReported === 0) {
            barsContainer.innerHTML = '<p>No hay plagas reportadas aún.</p>';
            return;
        }

        // Sort by count
        const sortedPests = Object.entries(pestCounts).sort((a, b) => b[1] - a[1]);
        const maxCount = sortedPests[0][1];

        sortedPests.forEach(([pestName, count]) => {
            const percentage = (count / maxCount) * 100;
            const barHTML = `
                <div class="bar-row">
                    <div class="bar-label">${pestName}</div>
                    <div class="bar-track">
                        <div class="bar-fill" style="width: ${percentage}%;"></div>
                    </div>
                    <div class="bar-value">${count}</div>
                </div>
            `;
            barsContainer.innerHTML += barHTML;
        });

    } catch (err) {
        console.error(err);
        statsContainer.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}
