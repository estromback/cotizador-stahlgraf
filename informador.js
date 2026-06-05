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
let lastSavedReportId = null;

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
    const cPhone = document.getElementById('client-phone').value || '-';
    const cTech = document.getElementById('technician-name').value || '-';
    const rawDate = document.getElementById('report-date').value;
    
    let dateStr = '-';
    if(rawDate) {
        const [y, m, d] = rawDate.split('-');
        dateStr = `${d}/${m}/${y}`;
    }

    document.getElementById('doc-client-name').innerText = cName;
    document.getElementById('doc-client-address').innerText = cAddress;
    document.getElementById('doc-client-phone').innerText = cPhone;
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

async function saveReportToCloud(silent = false) {
    if (!currentUser || !db) {
        if (!silent) alert("Debes iniciar sesión para guardar en la nube.");
        return false;
    }
    const clientName = document.getElementById('client-name').value.trim();
    if (!clientName) {
        if (!silent) alert("Por favor ingresa al menos el Nombre del Cliente.");
        return false;
    }

    const btn = document.getElementById('btn-save-report');
    const originalText = btn ? btn.innerText : 'Guardar en Nube';
    if (btn) {
        btn.innerText = "Guardando...";
        btn.disabled = true;
    }

    try {
        const timestamp = new Date().getTime();
        const reportId = 'rep_' + timestamp;
        lastSavedReportId = reportId;
        const photoUrls = [];

        // Save compressed photos as base64 in Firestore directly to prevent Storage hangs
        if (currentPhotos.length > 0) {
            if (btn) btn.innerText = "Procesando fotos...";
            for (let i = 0; i < currentPhotos.length; i++) {
                photoUrls.push(currentPhotos[i].dataUrl);
            }
        }

        if (btn) btn.innerText = "Guardando Datos...";

        const selectedPests = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        const clientEmail = document.getElementById('client-email') ? document.getElementById('client-email').value.trim() : '';

        const reportData = {
            id: reportId,
            clientName: clientName,
            clientAddress: document.getElementById('client-address').value,
            clientPhone: document.getElementById('client-phone').value,
            clientEmail: clientEmail,
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

        // Auto-guardar cliente en el directorio
        saveClientToDirectorySilently(clientName, document.getElementById('client-address').value, document.getElementById('client-phone').value, clientEmail);

        // Sincronizar con CRM
        await syncReportToCRM(reportData, reportId, loadedReportCorrelative || 1);

        if (!silent) alert("¡Informe guardado exitosamente!");
        if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
        }
        return true;

    } catch (error) {
        console.error("Error saving report:", error);
        if (!silent) alert("Error al guardar: " + error.message);
        if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
        }
        return false;
    }
}

async function syncReportToCRM(reportData, reportId, correlative) {
    if (!currentUser || !db) return;
    
    const clientName = reportData.clientName;
    const phone = (reportData.clientPhone || '').trim();
    const email = (reportData.clientEmail || '').trim();
    const dateStr = new Date().toLocaleString();
    
    const cleanPhone = (p) => p ? p.replace(/\D/g, '') : '';
    const phonesMatch = (p1, p2) => {
        const cp1 = cleanPhone(p1);
        const cp2 = cleanPhone(p2);
        if (!cp1 || !cp2) return false;
        const minLen = Math.min(cp1.length, cp2.length, 8);
        if (minLen < 6) return false;
        return cp1.slice(-minLen) === cp2.slice(-minLen);
    };
    
    const normalizeText = (text) => text ? text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
    const targetName = normalizeText(clientName);
    
    try {
        // First check if a card already has this reportId (either in legacy reportId or in reportIds array)
        let snapReport = await db.collection('users').doc(currentUser.uid).collection('crm').where('reportId', '==', reportId).limit(1).get();
        if (snapReport.empty) {
            snapReport = await db.collection('users').doc(currentUser.uid).collection('crm').where('reportIds', 'array-contains', reportId).limit(1).get();
        }
        
        if (!snapReport.empty) {
            const docId = snapReport.docs[0].id;
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(docId).update({
                client: clientName,
                phone: phone,
                email: email,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return;
        }

        // Search for an existing CRM card for this client in the entire CRM board
        const crmSnap = await db.collection('users').doc(currentUser.uid).collection('crm').get();
        let targetDoc = null;
        
        if (!crmSnap.empty) {
            crmSnap.forEach(doc => {
                const docData = doc.data();
                const matchName = normalizeText(docData.client) === targetName;
                const matchPhone = phonesMatch(docData.phone, phone);
                
                if (matchName || matchPhone) {
                    targetDoc = doc;
                }
            });
        }

        if (targetDoc) {
            const docId = targetDoc.id;
            await db.collection('users').doc(currentUser.uid).collection('crm').doc(docId).update({
                email: email,
                comments: firebase.firestore.FieldValue.arrayUnion({
                    text: `Se generó el Informe Técnico #${correlative}.\nRecomendaciones: ${reportData.recommendations || 'Sin recomendaciones'}`,
                    date: dateStr
                }),
                reportIds: firebase.firestore.FieldValue.arrayUnion(reportId),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            const payload = {
                client: clientName,
                phone: phone,
                email: email,
                column: 'Cotizados',
                date: reportData.date || new Date().toISOString().split('T')[0],
                desc: `Informe Técnico #${correlative} generado.`,
                reportId: reportId, // legacy
                reportIds: [reportId], // array tracking
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                comments: [{
                    text: `Se generó el Informe Técnico #${correlative}.\nRecomendaciones: ${reportData.recommendations || 'Sin recomendaciones'}`,
                    date: dateStr
                }]
            };
            await db.collection('users').doc(currentUser.uid).collection('crm').add(payload);
        }
    } catch(e) {
        console.error("No se pudo sincronizar el informe con CRM", e);
    }
}


async function generatePDF() {
    const clientName = document.getElementById('client-name').value.trim();
    if (!clientName) {
        return alert("Por favor ingresa al menos el Nombre del Cliente antes de generar el PDF.");
    }

    const btn = document.getElementById('btn-generate-pdf');
    const oldText = btn.innerText;
    btn.innerText = "Generando...";
    btn.disabled = true;

    // Auto-save silently to the cloud (which triggers directory save and CRM sync)
    const saved = await saveReportToCloud(true);
    if (!saved && !confirm("No se ha podido guardar en la nube (revisa tu sesión o conexión). ¿Deseas generar el PDF de todas formas?")) {
        btn.innerText = oldText;
        btn.disabled = false;
        return;
    }

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

        const rawDate = document.getElementById('report-date').value;
        const dateStr = rawDate ? rawDate.replace(/-/g, '') : 'Fecha';

        const opt = {
            margin:       [10, 0, 15, 0],
            filename:     `Informe_${clientName.replace(/\s+/g, '_')}_${dateStr}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['css', 'legacy'] }
        };

        const worker = html2pdf().set(opt).from(element);
        const pdfBlob = await worker.outputPdf('blob');

        // Archive Report PDF in Storage asynchronously to prevent hanging the main download flow
        if (currentUser && db && storage && lastSavedReportId) {
            const uploadReportId = lastSavedReportId;
            const uploadUid = currentUser.uid;
            storage.ref().child(`users/${uploadUid}/reports/${uploadReportId}.pdf`).put(pdfBlob)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(downloadUrl => {
                    return db.collection('users').doc(uploadUid).collection('reports').doc(uploadReportId).update({
                        pdfUrl: downloadUrl
                    });
                })
                .then(() => {
                    console.log("Report PDF archived in Firebase Storage asynchronously.");
                })
                .catch(storageErr => {
                    console.warn("Could not archive Report PDF in Firebase Storage, falling back to inline base64: ", storageErr);
                    const reader = new FileReader();
                    reader.readAsDataURL(pdfBlob);
                    reader.onloadend = function() {
                        const base64data = reader.result;
                        db.collection('users').doc(uploadUid).collection('reports').doc(uploadReportId).update({
                            pdfUrl: base64data
                        }).then(() => {
                            console.log("Report PDF archived as inline base64 in Firestore successfully.");
                        }).catch(dbErr => {
                            console.error("Failed to archive Report PDF as base64 in Firestore: ", dbErr);
                        });
                    };
                });
        }

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
        listEl.innerHTML = '<p style="color: #666; font-size: 0.95rem;">No hay clientes guardados. Guárdalos desde la Configuración del Cotizador o el Informador.</p>';
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
                <span style="font-size: 0.85rem; color: #888;">${client.address || ''}${client.email ? ` | Email: ${client.email}` : ''}</span>
            </div>
            <button class="btn btn-primary-outline btn-sm" style="padding: 3px 8px;">Seleccionar</button>
        `;
        div.addEventListener('click', () => {
            document.getElementById('client-name').value = client.name || '';
            document.getElementById('client-address').value = client.address || '';
            document.getElementById('client-phone').value = client.phone || '';
            if (document.getElementById('client-email')) {
                document.getElementById('client-email').value = client.email || '';
            }
            document.getElementById('clients-modal').classList.remove('active');
            updatePDFPreview();
        });
        listEl.appendChild(div);
    });
}

function saveClientToDirectorySilently(name, address, phone, email) {
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
        address: address || ''
    };

    const existingIndex = appData.clients.findIndex(c => (c.name || '').toLowerCase() === name.toLowerCase());
    if (existingIndex >= 0) {
        newClient.id = appData.clients[existingIndex].id; // preserve ID
        newClient.attention = appData.clients[existingIndex].attention || '';
        if (!phone && appData.clients[existingIndex].phone) newClient.phone = appData.clients[existingIndex].phone;
        if (!address && appData.clients[existingIndex].address) newClient.address = appData.clients[existingIndex].address;
        if (!email && appData.clients[existingIndex].email) newClient.email = appData.clients[existingIndex].email;
        appData.clients[existingIndex] = newClient;
    } else {
        appData.clients.push(newClient);
    }

    clientsList = appData.clients;
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    
    if (currentUser && db) {
        db.collection('users').doc(currentUser.uid).set(appData, { merge: true })
            .catch(err => console.error("Error saving client directory from Informador:", err));
    }
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
                <div class="db-item-actions" style="display: flex; gap: 5px; align-items: center;">
                    <button class="btn btn-secondary btn-sm btn-load-historic" data-id="${doc.id}">Ver Resumen</button>
                    ${data.pdfUrl ? `<a href="#" onclick="viewPDF('${data.pdfUrl}', 'Informe_${doc.id}.pdf'); return false;" class="btn btn-sm" style="padding: 5px 8px; font-size:0.75rem; background-color: #3b82f6; color: white; border: none; border-radius: 4px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-weight: normal; white-space: nowrap;">📥 PDF</a>` : ''}
                    <button class="btn btn-sm btn-delete-historic" data-id="${doc.id}" style="background: transparent; border: 1px solid var(--danger); color: var(--danger);">Eliminar</button>
                </div>
            `;
            listEl.appendChild(div);
        });

        // Event listener para eliminar
        document.querySelectorAll('.btn-delete-historic').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('¿Estás seguro de que deseas eliminar este informe del historial de forma permanente?')) {
                    try {
                        // Delete PDF from Firebase Storage if storage is initialized
                        if (storage && currentUser) {
                            try {
                                await storage.ref().child(`users/${currentUser.uid}/reports/${id}.pdf`).delete();
                                console.log("Deleted report PDF from Firebase Storage.");
                            } catch (storageErr) {
                                console.log("No Storage PDF to delete or already removed:", storageErr.message);
                            }
                        }
                        await db.collection('users').doc(currentUser.uid).collection('reports').doc(id).delete();
                        loadHistoryUI(); // Reload list
                    } catch (error) {
                        alert("Error al eliminar: " + error.message);
                    }
                }
            });
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
                        if (document.getElementById('client-phone')) {
                            document.getElementById('client-phone').value = rData.clientPhone || '';
                        }
                        if (document.getElementById('client-email')) {
                            document.getElementById('client-email').value = rData.clientEmail || '';
                        }
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
