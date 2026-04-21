// --- FIREBASE CONFIGURATION (Reused from Cotizador) ---
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
let asanaToken = '';
let generatedFile = null;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
    } catch (e) {
        console.warn("Firebase config error", e);
    }
}

// --- DOM ELEMENTS ---
const btnLogin = document.getElementById('btn-login');
const syncText = document.getElementById('sync-text');
const syncIcon = document.getElementById('sync-icon');
const btnSettings = document.getElementById('btn-settings');
const modalSettings = document.getElementById('settings-modal');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const inputToken = document.getElementById('setting-asana-token');

const welcomeState = document.getElementById('welcome-state');
const dashboardState = document.getElementById('dashboard-state');

const wsSelect = document.getElementById('workspace-select');
const projSelect = document.getElementById('project-select');
const optComments = document.getElementById('opt-comments');
const btnExport = document.getElementById('btn-export');
const btnShare = document.getElementById('btn-share');
const btnDownload = document.getElementById('btn-download');
const statusMsg = document.getElementById('export-status');

// --- INIT ---
function init() {
    setupEventListeners();

    if (auth) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                syncText.innerText = "Cerrar Sesión";
                syncIcon.innerText = "✅";
                btnSettings.disabled = false;
                syncUserData();
            } else {
                currentUser = null;
                syncText.innerText = "Iniciar Sesión";
                syncIcon.innerText = "☁️";
                btnSettings.disabled = true;
                
                welcomeState.classList.add('active');
                dashboardState.classList.remove('active');
                
                asanaToken = '';
                wsSelect.innerHTML = '<option value="">Selecciona Workspace...</option>';
                projSelect.innerHTML = '<option value="">Selecciona Proyecto...</option>';
                projSelect.disabled = true;
                btnExport.disabled = true;
            }
        });
    }
}

// --- FIREBASE SYNC ---
async function syncUserData() {
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.exportadorAsanaToken) {
                asanaToken = data.exportadorAsanaToken;
                inputToken.value = asanaToken;
                loadWorkspaces();
            } else {
                // No token found, show settings
                modalSettings.classList.add('active');
                welcomeState.classList.add('active');
                dashboardState.classList.remove('active');
            }
        } else {
            // First time user, no document
            modalSettings.classList.add('active');
            welcomeState.classList.add('active');
            dashboardState.classList.remove('active');
        }
    } catch (err) {
        console.error("Sync error:", err);
    }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    btnLogin.addEventListener('click', () => {
        if (!auth) return alert("Firebase no configurado.");
        if (currentUser) {
            if(confirm("¿Cerrar sesión?")) auth.signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(err => alert("Error login: " + err.message));
        }
    });

    btnSettings.addEventListener('click', () => modalSettings.classList.add('active'));
    btnCloseSettings.addEventListener('click', () => modalSettings.classList.remove('active'));

    btnSaveSettings.addEventListener('click', async () => {
        const tokenVal = inputToken.value.trim();
        if(!tokenVal) return alert("Ingresa un Token válido.");
        
        asanaToken = tokenVal;
        modalSettings.classList.remove('active');
        
        if (currentUser) {
            // Guardamos el token en Firebase usanda una llave independiente
            try {
                await db.collection('users').doc(currentUser.uid).set({ exportadorAsanaToken: asanaToken }, { merge: true });
            } catch(e) { console.error("Error saving token", e); }
        }
        
        loadWorkspaces();
    });

    wsSelect.addEventListener('change', () => {
        if (wsSelect.value) {
            loadProjects(wsSelect.value);
        } else {
            projSelect.innerHTML = '<option value="">Selecciona Proyecto...</option>';
            projSelect.disabled = true;
            btnExport.disabled = true;
        }
    });

    projSelect.addEventListener('change', () => {
        btnExport.disabled = !projSelect.value;
    });

    btnExport.addEventListener('click', generateExcel);
    btnShare.addEventListener('click', shareExcel);
    btnDownload.addEventListener('click', downloadExcel);
}

// --- ASANA API CALLS ---
async function asanaFetch(endpoint) {
    const res = await fetch(`https://app.asana.com/api/1.0${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${asanaToken}`,
            'Accept': 'application/json'
        }
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

async function loadWorkspaces() {
    try {
        welcomeState.classList.remove('active');
        dashboardState.classList.add('active');
        statusMsg.innerText = "Cargando espacios de trabajo...";
        statusMsg.className = "status-msg";
        
        const json = await asanaFetch('/workspaces');
        
        wsSelect.innerHTML = '<option value="">Selecciona Workspace...</option>';
        json.data.forEach(ws => {
            wsSelect.innerHTML += `<option value="${ws.gid}">${ws.name}</option>`;
        });
        
        statusMsg.innerText = "Listo. Selecciona el espacio de trabajo.";
    } catch(e) {
        statusMsg.innerText = "Error cargando Asana. Verifica el Token.";
        statusMsg.className = "status-msg status-error";
        console.error(e);
    }
}

async function loadProjects(workspaceGid) {
    try {
        projSelect.disabled = true;
        projSelect.innerHTML = '<option value="">Cargando proyectos...</option>';
        btnExport.disabled = true;
        
        const json = await asanaFetch(`/projects?workspace=${workspaceGid}`);
        
        projSelect.innerHTML = '<option value="">Selecciona Proyecto...</option>';
        json.data.forEach(p => {
            projSelect.innerHTML += `<option value="${p.gid}">${p.name}</option>`;
        });
        projSelect.disabled = false;
        statusMsg.innerText = "Proyectos cargados. Selecciona el que deseas exportar.";
    } catch(e) {
        statusMsg.innerText = "Error cargando proyectos.";
        statusMsg.className = "status-msg status-error";
        console.error(e);
    }
}

async function generateExcel() {
    const projectGid = projSelect.value;
    const projectName = projSelect.options[projSelect.selectedIndex].text;
    const includeComments = optComments.checked;
    
    if(!projectGid) return;
    
    btnExport.disabled = true;
    btnShare.classList.add('hidden');
    btnDownload.classList.add('hidden');
    
    try {
        statusMsg.innerText = "Obteniendo lista de tareas...";
        statusMsg.className = "status-msg";
        
        // 1. Fetch Tasks
        // opt_fields request specific fields to reduce payload
        const tasksJson = await asanaFetch(`/tasks?project=${projectGid}&opt_fields=name,assignee.name,due_on,completed,notes`);
        const tasks = tasksJson.data;
        
        if(tasks.length === 0) {
            statusMsg.innerText = "El proyecto no tiene tareas o no tienes permisos.";
            return;
        }

        const excelData = [];
        let index = 1;
        
        for (const task of tasks) {
            statusMsg.innerText = `Procesando Tarea ${index} de ${tasks.length}...`;
            
            let commentsStr = "";
            
            // 2. Fetch Stories (Comments) sequentially if checked
            if (includeComments) {
                try {
                    const storiesJson = await asanaFetch(`/tasks/${task.gid}/stories?opt_fields=text,type,created_by.name`);
                    const comments = storiesJson.data.filter(s => s.type === 'comment');
                    
                    if (comments.length > 0) {
                        commentsStr = comments.map(c => `[${c.created_by ? c.created_by.name : 'Unknown'}]: ${c.text}`).join('\n---\n');
                    } else {
                        commentsStr = "Sin comentarios";
                    }
                } catch(err) {
                    console.warn(`Error fetching stories for task ${task.gid}`, err);
                    commentsStr = "Error al obtener comentarios";
                }
            }

            excelData.push({
                'Nombre Tarea': task.name || '',
                'Responsable': task.assignee ? task.assignee.name : 'Sin Asignar',
                'Fecha de Entrega': task.due_on || 'Sin Fecha',
                'Estado': task.completed ? 'Completado' : 'Pendiente',
                'Descripción': task.notes || '',
                ...(includeComments ? { 'Comentarios': commentsStr } : {})
            });
            
            index++;
            
            // Pequeña pausa para no saturar rate limits si son muchas tareas
            if(index % 20 === 0) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        statusMsg.innerText = "Generando archivo Excel...";

        // 3. Create Excel Worksheet uses SheetJS
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        
        // Adjust column widths roughly
        const wscols = [
            {wch: 40}, // Nombre
            {wch: 25}, // Responsable
            {wch: 15}, // Fecha
            {wch: 15}, // Estado
            {wch: 50}, // Descripcion
            ...(includeComments ? [{wch: 60}] : []) // Comentarios
        ];
        worksheet['!cols'] = wscols;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");

        // Generate buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
        // Create Blob
        const fileName = `Exportacion_Asana_${projectName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.xlsx`;
        generatedFile = new File([excelBuffer], fileName, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        statusMsg.innerText = "¡Excel generado con éxito!";
        
        btnShare.classList.remove('hidden');
        btnDownload.classList.remove('hidden');

    } catch(e) {
        statusMsg.innerText = "Error generando Excel: " + e.message;
        statusMsg.className = "status-msg status-error";
        console.error(e);
    } finally {
        btnExport.disabled = false;
    }
}

async function shareExcel() {
    if (!generatedFile) return;
    
    if (navigator.canShare && navigator.canShare({ files: [generatedFile] })) {
        try {
            const btn = document.getElementById('btn-share');
            btn.disabled = true;
            await navigator.share({
                title: 'Exportación Asana',
                text: 'Adjunto exportación del proyecto de Asana.',
                files: [generatedFile]
            });
            btn.disabled = false;
        } catch(e) {
            console.log("Share failed or cancelled", e);
            document.getElementById('btn-share').disabled = false;
        }
    } else {
        alert("Tu navegador o sistema operativo no soporta compartir archivos directamente. Por favor utiliza el botón de Descargar.");
    }
}

function downloadExcel() {
    if (!generatedFile) return;
    
    const url = URL.createObjectURL(generatedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Start
document.addEventListener('DOMContentLoaded', init);
