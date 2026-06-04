// clientes.js - Logic for Unified Client Directory with Cascading Deletions

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

let appData = {
    clients: []
};

function loadData() {
    const saved = localStorage.getItem('stahlgraf_data_v4');
    if (saved) {
        try {
            appData = { ...appData, ...JSON.parse(saved) };
        } catch(e) {}
    }
}

function saveData() {
    localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
    if (currentUser && db) {
        db.collection('users').doc(currentUser.uid).set(appData, { merge: true })
            .catch(err => console.error("Error saving clients list to Firebase:", err));
    }
}

// Authentication
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        const syncText = document.getElementById('sync-text');
        const syncIcon = document.getElementById('sync-icon');
        
        if (user) {
            syncText.innerText = "Conectado";
            syncIcon.innerText = "🟢";
            syncFromFirebase();
        } else {
            syncText.innerText = "Ingresar para Sync";
            syncIcon.innerText = '☁️';
        }
    });
}

function syncFromFirebase() {
    if (!currentUser || !db) return;
    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            const cloudData = doc.data();
            appData = { ...appData, ...cloudData };
            localStorage.setItem('stahlgraf_data_v4', JSON.stringify(appData));
            renderClients();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderClients();

    // Event Listeners
    document.getElementById('client-search').addEventListener('input', renderClients);
    document.getElementById('btn-add-client').addEventListener('click', () => openModal());
    document.getElementById('btn-close-modal').addEventListener('click', closeModal);
    document.getElementById('btn-save-client').addEventListener('click', saveClient);
    document.getElementById('btn-export-emails').addEventListener('click', openEmailsModal);
    document.getElementById('btn-close-emails-modal').addEventListener('click', closeEmailsModal);
    document.getElementById('btn-copy-emails').addEventListener('click', copyEmailsToClipboard);

    // Sync button logic
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
});

function renderClients() {
    const searchVal = document.getElementById('client-search').value.toLowerCase().trim();
    const container = document.getElementById('client-list-container');
    container.innerHTML = '';

    const list = appData.clients || [];
    document.getElementById('client-count').innerText = `${list.length} clientes en total`;

    const filtered = list.filter(c => 
        (c.name || '').toLowerCase().includes(searchVal) ||
        (c.address || '').toLowerCase().includes(searchVal) ||
        (c.phone || '').toLowerCase().includes(searchVal) ||
        (c.email || '').toLowerCase().includes(searchVal) ||
        (c.attention || '').toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px 0;">No se encontraron clientes.</p>';
        return;
    }

    // Sort alphabetically by name
    const sorted = [...filtered].sort((a,b) => (a.name || '').localeCompare(b.name || ''));

    sorted.forEach(c => {
        const div = document.createElement('div');
        div.className = 'client-card';
        div.innerHTML = `
            <div class="client-info">
                <h3>${c.name}</h3>
                <div class="info-row">
                    <span class="info-label">Contacto:</span>
                    <span>${c.attention || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Teléfono:</span>
                    <span>${c.phone || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span>${c.email || '-'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Dirección:</span>
                    <span>${c.address || '-'}</span>
                </div>
            </div>
            <div class="client-actions">
                <button class="btn btn-secondary btn-sm" onclick="openModal('${c.id}')">Editar</button>
                <button class="btn btn-secondary btn-sm" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c; border-color: rgba(231, 76, 60, 0.3);" onclick="deleteClientCascading('${c.id}')">Eliminar</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function openModal(id = null) {
    document.getElementById('client-modal').classList.add('active');
    if (id) {
        document.getElementById('modal-title').innerText = "Editar Cliente";
        const client = appData.clients.find(c => c.id === id);
        if (client) {
            document.getElementById('edit-client-id').value = client.id;
            document.getElementById('client-name').value = client.name || '';
            document.getElementById('client-attention').value = client.attention || '';
            document.getElementById('client-phone').value = client.phone || '';
            document.getElementById('client-email').value = client.email || '';
            document.getElementById('client-address').value = client.address || '';
        }
    } else {
        document.getElementById('modal-title').innerText = "Nuevo Cliente";
        document.getElementById('edit-client-id').value = '';
        document.getElementById('client-name').value = '';
        document.getElementById('client-attention').value = '';
        document.getElementById('client-phone').value = '';
        document.getElementById('client-email').value = '';
        document.getElementById('client-address').value = '';
    }
}

function closeModal() {
    document.getElementById('client-modal').classList.remove('active');
}

function saveClient() {
    const id = document.getElementById('edit-client-id').value;
    const name = document.getElementById('client-name').value.trim();
    const attention = document.getElementById('client-attention').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const address = document.getElementById('client-address').value.trim();

    if (!name || !phone || !address) {
        return alert("Por favor completa Nombre, Teléfono y Dirección.");
    }

    const payload = {
        id: id || 'cl_' + Date.now(),
        name, attention, phone, email, address
    };

    if (id) {
        const idx = appData.clients.findIndex(c => c.id === id);
        if (idx > -1) appData.clients[idx] = payload;
    } else {
        // Prevent duplicate names
        const exists = appData.clients.some(c => c.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            return alert("Ya existe un cliente con este nombre en tu directorio.");
        }
        appData.clients.push(payload);
    }

    saveData();
    renderClients();
    closeModal();
}

async function deleteClientCascading(id) {
    const client = appData.clients.find(c => c.id === id);
    if (!client) return;

    if (!confirm(`¿Estás seguro de eliminar a "${client.name}" del directorio de clientes?`)) return;

    let cascade = false;
    if (currentUser && db) {
        cascade = confirm(`¿Deseas también eliminar TODO el historial de "${client.name}" de la nube?\n\nSi confirmas, se borrarán de forma definitiva:\n- Sus cotizaciones en el Cotizador\n- Sus informes técnicos en el Informador\n- Sus tarjetas y notas de seguimiento en el CRM`);
    }

    if (cascade) {
        try {
            // Delete CRM cards
            const crmSnap = await db.collection('users').doc(currentUser.uid).collection('crm').where('client', '==', client.name).get();
            const crmBatch = db.batch();
            crmSnap.forEach(doc => crmBatch.delete(doc.ref));
            await crmBatch.commit();

            // Delete Quotes
            const quotesSnap = await db.collection('users').doc(currentUser.uid).collection('quotes').where('clientName', '==', client.name).get();
            const quotesBatch = db.batch();
            quotesSnap.forEach(doc => quotesBatch.delete(doc.ref));
            await quotesBatch.commit();

            // Delete Reports
            const reportsSnap = await db.collection('users').doc(currentUser.uid).collection('reports').where('clientName', '==', client.name).get();
            const reportsBatch = db.batch();
            reportsSnap.forEach(doc => reportsBatch.delete(doc.ref));
            await reportsBatch.commit();

            alert("✅ Todo el historial y registros del cliente han sido borrados de la nube exitosamente.");
        } catch(e) {
            console.error("Error committing deletions:", e);
            alert("Ocurrió un error al intentar eliminar los registros asociados de la nube.");
        }
    }

    // Always remove from client directory list
    appData.clients = appData.clients.filter(c => c.id !== id);
    
    // Remove station assignments linked to this client
    if (appData.stationAssignments) {
        appData.stationAssignments = appData.stationAssignments.filter(asg => asg.clientId !== id);
    }
    
    saveData();
    renderClients();
}

function openEmailsModal() {
    const modal = document.getElementById('emails-modal');
    const text = document.getElementById('emails-list-area');
    
    const emailList = (appData.clients || [])
        .map(c => (c.email || '').trim())
        .filter(e => e.length > 0);
        
    if (emailList.length === 0) {
        text.value = "No hay correos electrónicos registrados en tu directorio de clientes.";
    } else {
        text.value = emailList.join(', ');
    }
    
    modal.classList.add('active');
}

function closeEmailsModal() {
    document.getElementById('emails-modal').classList.remove('active');
}

function copyEmailsToClipboard() {
    const text = document.getElementById('emails-list-area').value;
    const btn = document.getElementById('btn-copy-emails');
    
    const emailCount = (appData.clients || []).filter(c => (c.email || '').trim()).length;
    if (emailCount === 0) {
        return alert("No hay correos para copiar.");
    }
    
    navigator.clipboard.writeText(text)
        .then(() => {
            const origText = btn.innerText;
            btn.innerText = "¡Copiado! ✓";
            btn.style.background = "#10b981"; // Success green accent
            setTimeout(() => {
                btn.innerText = origText;
                btn.style.background = ""; // Revert to primary
            }, 2000);
        })
        .catch(err => {
            console.error("Error copying to clipboard:", err);
            alert("Ocurrió un error al copiar al portapapeles. Por favor, cópialo manualmente.");
        });
}

// Map globally so onclick handlers work in HTML template strings
window.openModal = openModal;
window.deleteClientCascading = deleteClientCascading;
window.openEmailsModal = openEmailsModal;
window.closeEmailsModal = closeEmailsModal;
window.copyEmailsToClipboard = copyEmailsToClipboard;
