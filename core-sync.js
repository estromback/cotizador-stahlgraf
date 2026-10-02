// core-sync.js
// Handles intelligent merging of appData arrays (clients, services, chemicals, etc.)
// Prevents offline data loss during synchronization

const STAHLGRAF_VERSION = "v4.4.0";

if (typeof window !== 'undefined') {
    window.STAHLGRAF_VERSION = STAHLGRAF_VERSION;
    const applyVersionBadges = () => {
        document.querySelectorAll('.app-version-badge, #app-version-badge').forEach(el => {
            el.innerText = STAHLGRAF_VERSION;
        });
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyVersionBadges);
    } else {
        applyVersionBadges();
    }
}

function mergeAppData(localData, cloudData) {
    if (!localData) return cloudData || {};
    if (!cloudData) return localData || {};

    const merged = { ...localData, ...cloudData };
    
    // List of arrays we need to deep merge by ID
    const arrayKeys = ['clients', 'chemicals', 'services', 'reportsSent', 'stationAssignments'];
    
    arrayKeys.forEach(key => {
        if (localData[key] || cloudData[key]) {
            const localArr = localData[key] || [];
            const cloudArr = cloudData[key] || [];
            
            const map = new Map();
            const noIdItems = [];
            
            // Helper to get a unique identifier
            const getIdentifier = (item) => item.id || item.clientId || (key === 'clients' ? item.name : null);
            
            // Add cloud items first (source of truth)
            cloudArr.forEach(item => {
                if (!item) return;
                const id = getIdentifier(item);
                if (id) {
                    map.set(id, item);
                } else {
                    noIdItems.push(item);
                }
            });
            
            // Add or intelligently merge local items
            localArr.forEach(item => {
                if (!item) return;
                
                const id = getIdentifier(item);
                if (!id) {
                    // If no identifier, avoid adding exact duplicates
                    const str = JSON.stringify(item);
                    if (!noIdItems.some(ci => JSON.stringify(ci) === str)) {
                        noIdItems.push(item);
                    }
                    return;
                }
                
                const cloudItem = map.get(id);
                if (!cloudItem) {
                    // Local addition that hasn't synced yet! Preserve it.
                    map.set(id, item);
                } else {
                    // Conflict resolution based on optional timestamps
                    let preferLocal = false;
                    
                    if (item.updatedAt && cloudItem.updatedAt) {
                        const localTime = item.updatedAt.toMillis ? item.updatedAt.toMillis() : new Date(item.updatedAt).getTime();
                        const cloudTime = cloudItem.updatedAt.toMillis ? cloudItem.updatedAt.toMillis() : new Date(cloudItem.updatedAt).getTime();
                        
                        if (localTime > cloudTime) preferLocal = true;
                    } else if (item.lastModified && cloudItem.lastModified) {
                        if (item.lastModified > cloudItem.lastModified) preferLocal = true;
                    }
                    
                    if (preferLocal) {
                        map.set(id, item);
                    }
                }
            });
            
            merged[key] = [...Array.from(map.values()), ...noIdItems];
        }
    });

    // Use a global lastModified for resolving scalar properties if available
    const localTime = localData.lastModified || 0;
    const cloudTime = cloudData.lastModified || 0;
    
    if (localTime > cloudTime) {
        // Keep local scalar properties if local is explicitly newer
        Object.keys(localData).forEach(k => {
            if (!arrayKeys.includes(k)) {
                merged[k] = localData[k];
            }
        });
    }

    return merged;
}

// Function to enable persistence safely
function initFirestorePersistence(db) {
    if (db) {
        // Detect iOS / iPadOS to skip IndexedDB persistence and prevent WebKit hangs in PWA mode
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        if (isIOS) {
            console.log("iOS/iPadOS detected: Using direct network mode for Firestore to avoid WebKit IndexedDB locks.");
            return;
        }

        db.enablePersistence({ synchronizeTabs: true })
            .then(() => console.log("Firebase Offline Persistence Enabled (multi-tab mode)"))
            .catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn("Multiple tabs open, fallback to single tab persistence.");
                    db.enablePersistence().catch(e => console.warn("Single tab persistence failed:", e));
                } else if (err.code === 'unimplemented') {
                    console.warn("The current browser does not support all of the features required to enable persistence.");
                } else {
                    console.warn("Firebase persistence error:", err);
                }
            });
    }
}

// --- Global Modal for Copying / Sharing Satisfaction Survey Message ---
window.showShareSurveyModal = function({ clientName, message, phone }) {
    let modal = document.getElementById('modal-share-survey');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-share-survey';
        modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 10000; align-items: center; justify-content: center; padding: 20px;';
        modal.innerHTML = `
            <div style="background: #1e293b; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; width: 100%; max-width: 520px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); color: #fff; font-family: inherit;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.4rem;">📋</span>
                        <h3 style="margin: 0; font-size: 1.15rem; color: #fff; font-weight: 700;">Mensaje Listo para Copiar</h3>
                    </div>
                    <button type="button" onclick="window.closeShareSurveyModal()" style="background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer; line-height: 1;">&times;</button>
                </div>
                
                <div style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 10px;">
                    Cliente: <strong id="share-modal-client" style="color: #fff;">-</strong>
                </div>

                <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 12px; line-height: 1.4;">
                    Copia este mensaje y pégalo en el canal que utilices (WhatsApp Empresa, Correo, SMS u otro):
                </p>

                <textarea id="share-survey-textarea" readonly style="width: 100%; min-height: 110px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 12px; color: #f8fafc; font-size: 0.88rem; resize: none; line-height: 1.4; outline: none; margin-bottom: 18px; font-family: inherit; box-sizing: border-box;"></textarea>

                <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
                    <button type="button" id="btn-copy-survey-msg" onclick="window.copySurveyMessage()" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; font-weight: 600; cursor: pointer; font-size: 0.92rem; border-radius: 8px; background: #3b82f6; color: #fff; border: none;">
                        <span>📋 Copiar Mensaje</span>
                    </button>
                    <button type="button" onclick="window.closeShareSurveyModal()" class="btn btn-secondary" style="font-size: 0.9rem; padding: 10px 16px; border-radius: 8px; cursor: pointer; background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.15);">
                        Cerrar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('share-modal-client').textContent = clientName || 'Cliente';
    const textarea = document.getElementById('share-survey-textarea');
    if (textarea) textarea.value = message;

    modal.style.display = 'flex';
};

window.closeShareSurveyModal = function() {
    const modal = document.getElementById('modal-share-survey');
    if (modal) modal.style.display = 'none';
};

window.copySurveyMessage = function() {
    const textarea = document.getElementById('share-survey-textarea');
    if (!textarea) return;
    
    const text = textarea.value;
    textarea.select();
    
    const btn = document.getElementById('btn-copy-survey-msg');
    const finish = () => {
        if (btn) {
            const oldHtml = btn.innerHTML;
            btn.innerHTML = '<span>✓ ¡Mensaje Copiado!</span>';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            setTimeout(() => {
                btn.innerHTML = oldHtml;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 2500);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(finish).catch(() => {
            document.execCommand('copy');
            finish();
        });
    } else {
        document.execCommand('copy');
        finish();
    }
};

// =========================================================================
// ASANA-STYLE MULTI-USER AUDIT TRAIL & SYSTEM ACTIVITY TRACKING ENGINE
// =========================================================================

// 1. Resolve current user identity, name, role and avatar initials
window.getCurrentUserInfo = function() {
    const authInstance = (typeof auth !== 'undefined' && auth) ? auth : (typeof firebase !== 'undefined' && firebase.auth && firebase.apps.length ? firebase.auth() : null);
    const u = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : (authInstance ? authInstance.currentUser : null);
    
    const role = localStorage.getItem('stahlgraf_user_role') || 'tech';
    let roleLabel = 'Técnico';
    if (role === 'admin') roleLabel = 'Administrador';
    else if (role === 'client') roleLabel = 'Cliente';

    if (!u) {
        const cachedEmail = localStorage.getItem('stahlgraf_cached_email') || '';
        const cachedName = localStorage.getItem('stahlgraf_cached_name') || 'Usuario';
        let initials = 'U';
        if (cachedName && cachedName !== 'Usuario') {
            const parts = cachedName.trim().split(/\s+/);
            initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
        }
        return {
            uid: null,
            email: cachedEmail,
            displayName: cachedName,
            role,
            roleLabel,
            initials,
            photoURL: ''
        };
    }

    // Determine clean display name
    let name = (u.displayName || '').trim();
    if (!name && u.email) {
        const localPart = u.email.split('@')[0];
        name = localPart.replace(/[._\-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    if (!name) name = 'Usuario';

    // Compute initials (e.g. "Carlos Medina" -> "CM")
    let initials = 'U';
    const nameParts = name.split(/\s+/);
    if (nameParts.length > 1) {
        initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    } else if (nameParts[0].length >= 2) {
        initials = nameParts[0].substring(0, 2).toUpperCase();
    } else if (nameParts[0].length === 1) {
        initials = nameParts[0].toUpperCase();
    }

    // Cache locally for offline fallback
    if (u.email) localStorage.setItem('stahlgraf_cached_email', u.email);
    if (name) localStorage.setItem('stahlgraf_cached_name', name);

    return {
        uid: u.uid,
        email: u.email || '',
        displayName: name,
        role,
        roleLabel,
        initials,
        photoURL: u.photoURL || ''
    };
};

// 2. Relative time formatter ("Hace 5 minutos", "Hoy 14:30", etc.)
window.formatTimeAgo = function(timestampOrDate) {
    if (!timestampOrDate) return 'Fecha desconocida';
    let time = 0;
    if (typeof timestampOrDate === 'number') {
        time = timestampOrDate;
    } else if (timestampOrDate.toMillis) {
        time = timestampOrDate.toMillis();
    } else if (timestampOrDate instanceof Date) {
        time = timestampOrDate.getTime();
    } else if (typeof timestampOrDate === 'string') {
        const parsed = new Date(timestampOrDate).getTime();
        time = !isNaN(parsed) ? parsed : 0;
    }
    if (!time) return String(timestampOrDate);

    const now = Date.now();
    const diffSeconds = Math.floor((now - time) / 1000);

    if (diffSeconds < 45) return 'Justo ahora';
    if (diffSeconds < 90) return 'Hace 1 min';
    if (diffSeconds < 3600) return `Hace ${Math.floor(diffSeconds / 60)} min`;
    if (diffSeconds < 7200) return 'Hace 1 hora';
    if (diffSeconds < 86400) return `Hace ${Math.floor(diffSeconds / 3600)} horas`;
    if (diffSeconds < 172800) return 'Ayer';
    
    const d = new Date(time);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + 
           d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
};

// 3. Central System Activity Logger
window.logSystemActivity = async function({
    actionType,
    category = 'general',
    summary,
    details = {},
    clientName = '',
    clientId = '',
    cardId = '',
    quoteId = '',
    reportId = '',
    serviceId = ''
}) {
    try {
        const userInfo = window.getCurrentUserInfo();
        if (!userInfo || !userInfo.email) {
            console.warn("[Activity Tracker] User not logged in, activity skipped:", summary);
            return null;
        }

        const ownerUid = (typeof getActiveUid === 'function' ? getActiveUid() : null) || 
                         localStorage.getItem('stahlgraf_target_uid') || 
                         userInfo.uid;
        
        if (!ownerUid) return null;

        const dbInstance = (typeof db !== 'undefined' && db) ? db : (typeof firebase !== 'undefined' && firebase.firestore && firebase.apps.length ? firebase.firestore() : null);
        if (!dbInstance) return null;

        const now = new Date();
        const dateStr = now.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + 
                        now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

        const logPayload = {
            actionType,
            category: category || 'general',
            summary: summary || 'Actividad registrada',
            details: details || {},
            clientName: clientName || '',
            clientId: clientId || '',
            cardId: cardId || '',
            quoteId: quoteId || '',
            reportId: reportId || '',
            serviceId: serviceId || '',
            author: {
                uid: userInfo.uid,
                email: userInfo.email,
                displayName: userInfo.displayName,
                role: userInfo.role,
                roleLabel: userInfo.roleLabel,
                initials: userInfo.initials
            },
            clientTimestamp: now.getTime(),
            dateStr: dateStr
        };

        // Add Firestore server timestamp if online
        if (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue) {
            logPayload.timestamp = firebase.firestore.FieldValue.serverTimestamp();
        } else {
            logPayload.timestamp = now.getTime();
        }

        const docRef = await dbInstance.collection('users').doc(ownerUid).collection('activity_logs').add(logPayload);
        logPayload.id = docRef.id;

        // Dispatch local event for reactive updates in open modals
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('stahlgraf:activity_logged', { detail: logPayload }));
        }

        return docRef.id;
    } catch (err) {
        console.error("[Activity Tracker] Error logging activity:", err);
        return null;
    }
};

// 4. Asana-style Comment Item HTML Formatter
window.renderAsanaCommentItem = function(c, index, { canEdit = true, canDelete = true, onEdit, onDelete } = {}) {
    const userInfo = window.getCurrentUserInfo();
    const commentAuthorEmail = (c.authorEmail || c.author || '').toLowerCase();
    const currentEmail = (userInfo.email || '').toLowerCase();
    const isAdmin = userInfo.role === 'admin';

    // Permissions: Admin can edit/delete all, author can edit/delete their own
    const userCanEdit = canEdit && (isAdmin || (commentAuthorEmail && commentAuthorEmail === currentEmail));
    const userCanDelete = canDelete && (isAdmin || (commentAuthorEmail && commentAuthorEmail === currentEmail));

    const authorName = c.authorName || (commentAuthorEmail ? commentAuthorEmail.split('@')[0].replace(/[._\-]/g, ' ') : 'Usuario');
    const authorRole = c.authorRole || 'tech';
    const authorRoleLabel = c.authorRoleLabel || (authorRole === 'admin' ? 'Administrador' : (authorRole === 'client' ? 'Cliente' : 'Técnico'));

    let initials = 'U';
    const parts = authorName.trim().split(/\s+/);
    if (parts.length > 1) {
        initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts[0].length >= 2) {
        initials = parts[0].substring(0, 2).toUpperCase();
    }

    const timeAgoStr = window.formatTimeAgo(c.timestamp || c.date);

    return `
        <div class="asana-comment-item" data-comment-index="${index}">
            <div class="asana-comment-header">
                <div class="asana-author-left">
                    <div class="user-avatar-circle ${authorRole}">${initials}</div>
                    <span class="asana-author-name">${authorName}</span>
                    <span class="user-role-badge ${authorRole}">${authorRoleLabel}</span>
                    <span class="asana-comment-time" title="${c.date || ''}">• ${timeAgoStr}</span>
                </div>
                ${(userCanEdit || userCanDelete) ? `
                    <div class="asana-comment-actions">
                        ${userCanEdit ? `<a href="#" class="edit-comment-link" style="color: #60a5fa;">Editar</a>` : ''}
                        ${(userCanEdit && userCanDelete) ? `<span style="color: rgba(255,255,255,0.2);">|</span>` : ''}
                        ${userCanDelete ? `<a href="#" class="delete-comment-link" style="color: #f87171;">Borrar</a>` : ''}
                    </div>
                ` : ''}
            </div>
            <p class="asana-comment-body">${escapeHTML(c.text || '')}</p>
        </div>
    `;
};

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 5. Global Activity & Audit Center Modal (Asana-Style)
let auditLogsListener = null;
let cachedAuditLogs = [];
let auditActiveFilterClient = null;

window.openActivityAuditModal = function(options = {}) {
    let modal = document.getElementById('modal-activity-audit');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-activity-audit';
        modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 10050; align-items: center; justify-content: center; padding: 20px;';
        modal.innerHTML = `
            <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; width: 100%; max-width: 900px; height: 90vh; max-height: 800px; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); color: #fff; font-family: inherit; overflow: hidden;">
                <!-- Header -->
                <div style="padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(30,41,59,0.7); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.4rem;">⚡</span>
                            <h2 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #fff;">Centro de Actividades & Auditoría</h2>
                            <span id="audit-log-counter" class="pill-badge pill-badge-primary" style="font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; background: rgba(59,130,246,0.2); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3);">Cargando...</span>
                        </div>
                        <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #94a3b8;">
                            Tracking en tiempo real (estilo Asana) de todos los cambios de fecha, CRM, cotizaciones, informes, comentarios y servicios.
                        </p>
                    </div>
                    <button type="button" onclick="window.closeActivityAuditModal()" style="background: none; border: none; color: #94a3b8; font-size: 1.8rem; cursor: pointer; line-height: 1; padding: 4px;">&times;</button>
                </div>

                <!-- Filters Bar -->
                <div style="padding: 14px 24px; background: rgba(15,23,42,0.9); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; gap: 12px; flex-wrap: wrap; align-items: center; flex-shrink: 0;">
                    <div style="flex: 1; min-width: 200px;">
                        <input type="text" id="audit-filter-search" placeholder="🔍 Buscar por cliente, detalle o acción..." style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.3); color: #fff; font-size: 0.88rem; outline: none;">
                    </div>
                    <div>
                        <select id="audit-filter-category" style="padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(30,41,59,0.9); color: #fff; font-size: 0.85rem; outline: none; cursor: pointer;">
                            <option value="all">📁 Todas las Categorías</option>
                            <option value="dates">📅 Cambios de Fecha</option>
                            <option value="comments">💬 Comentarios</option>
                            <option value="crm">📋 CRM & Tratos</option>
                            <option value="services">🛠️ Servicios Realizados</option>
                            <option value="quotes">💰 Cotizaciones</option>
                            <option value="reports">📄 Informes Técnicos</option>
                            <option value="clients">👥 Clientes</option>
                        </select>
                    </div>
                    <div>
                        <select id="audit-filter-user" style="padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(30,41,59,0.9); color: #fff; font-size: 0.85rem; outline: none; cursor: pointer;">
                            <option value="all">👤 Todos los Usuarios</option>
                        </select>
                    </div>
                    <button type="button" id="btn-audit-clear-filters" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; padding: 8px 12px; border-radius: 8px; font-size: 0.82rem; cursor: pointer;">
                        Limpiar
                    </button>
                </div>

                <!-- Feed Content Area -->
                <div id="audit-feed-list" style="flex: 1; overflow-y: auto; padding: 20px 24px; background: rgba(15,23,42,0.6);">
                    <p style="color: #94a3b8; text-align: center; margin-top: 40px;">Cargando registro de actividades en tiempo real...</p>
                </div>

                <!-- Footer -->
                <div style="padding: 12px 24px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(30,41,59,0.5); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #94a3b8; flex-shrink: 0;">
                    <span>🟢 Sincronizado en vivo con la nube de Stahlgraf</span>
                    <button type="button" onclick="window.closeActivityAuditModal()" class="btn btn-secondary btn-sm" style="padding: 6px 14px;">Cerrar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Bind filter events
        document.getElementById('audit-filter-search').addEventListener('input', renderFilteredAuditLogs);
        document.getElementById('audit-filter-category').addEventListener('change', renderFilteredAuditLogs);
        document.getElementById('audit-filter-user').addEventListener('change', renderFilteredAuditLogs);
        document.getElementById('btn-audit-clear-filters').addEventListener('click', () => {
            document.getElementById('audit-filter-search').value = '';
            document.getElementById('audit-filter-category').value = 'all';
            document.getElementById('audit-filter-user').value = 'all';
            auditActiveFilterClient = null;
            renderFilteredAuditLogs();
        });
    }

    if (options && options.clientName) {
        auditActiveFilterClient = options.clientName;
        const searchInput = document.getElementById('audit-filter-search');
        if (searchInput) searchInput.value = options.clientName;
    } else {
        auditActiveFilterClient = null;
    }

    modal.style.display = 'flex';
    subscribeToGlobalAuditLogs();
};

window.closeActivityAuditModal = function() {
    const modal = document.getElementById('modal-activity-audit');
    if (modal) modal.style.display = 'none';
};

function subscribeToGlobalAuditLogs() {
    const ownerUid = (typeof getActiveUid === 'function' ? getActiveUid() : null) || 
                     localStorage.getItem('stahlgraf_target_uid') || 
                     (currentUser ? currentUser.uid : null);
    
    if (!ownerUid) return;
    const dbInstance = (typeof db !== 'undefined' && db) ? db : (typeof firebase !== 'undefined' && firebase.firestore && firebase.apps.length ? firebase.firestore() : null);
    if (!dbInstance) return;

    if (auditLogsListener) auditLogsListener();

    try {
        auditLogsListener = dbInstance.collection('users').doc(ownerUid).collection('activity_logs')
            .orderBy('clientTimestamp', 'desc')
            .limit(150)
            .onSnapshot(snap => {
                cachedAuditLogs = [];
                snap.forEach(doc => {
                    cachedAuditLogs.push({ id: doc.id, ...doc.data() });
                });
                updateAuditUserDropdown();
                renderFilteredAuditLogs();
            }, err => {
                console.error("Error subscribing to activity_logs:", err);
                // Fallback without orderBy if index not ready
                dbInstance.collection('users').doc(ownerUid).collection('activity_logs').limit(100).get().then(snap => {
                    cachedAuditLogs = [];
                    snap.forEach(doc => cachedAuditLogs.push({ id: doc.id, ...doc.data() }));
                    cachedAuditLogs.sort((a,b) => (b.clientTimestamp || 0) - (a.clientTimestamp || 0));
                    updateAuditUserDropdown();
                    renderFilteredAuditLogs();
                }).catch(e => console.error("Fallback get error:", e));
            });
    } catch(err) {
        console.error("Audit listener setup failed:", err);
    }
}

function updateAuditUserDropdown() {
    const userSelect = document.getElementById('audit-filter-user');
    if (!userSelect) return;

    const currentVal = userSelect.value;
    const usersMap = new Map();

    cachedAuditLogs.forEach(log => {
        if (log.author && log.author.email) {
            const email = log.author.email.toLowerCase();
            if (!usersMap.has(email)) {
                usersMap.set(email, {
                    name: log.author.displayName || email,
                    roleLabel: log.author.roleLabel || 'Usuario'
                });
            }
        }
    });

    userSelect.innerHTML = '<option value="all">👤 Todos los Usuarios</option>';
    usersMap.forEach((u, email) => {
        const opt = document.createElement('option');
        opt.value = email;
        opt.textContent = `👤 ${u.name} (${u.roleLabel})`;
        userSelect.appendChild(opt);
    });

    if (currentVal && usersMap.has(currentVal)) {
        userSelect.value = currentVal;
    }
}

function renderFilteredAuditLogs() {
    const feed = document.getElementById('audit-feed-list');
    const counter = document.getElementById('audit-log-counter');
    if (!feed) return;

    const searchVal = (document.getElementById('audit-filter-search')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('audit-filter-category')?.value || 'all';
    const userVal = document.getElementById('audit-filter-user')?.value || 'all';

    const filtered = cachedAuditLogs.filter(log => {
        // Category filter
        if (catVal !== 'all' && log.category !== catVal) return false;
        
        // User filter
        if (userVal !== 'all') {
            const authorEmail = (log.author && log.author.email ? log.author.email : '').toLowerCase();
            if (authorEmail !== userVal) return false;
        }

        // Search text
        if (searchVal) {
            const client = (log.clientName || '').toLowerCase();
            const summary = (log.summary || '').toLowerCase();
            const authorName = (log.author && log.author.displayName ? log.author.displayName : '').toLowerCase();
            const authorEmail = (log.author && log.author.email ? log.author.email : '').toLowerCase();
            const detailsStr = JSON.stringify(log.details || {}).toLowerCase();
            
            if (!client.includes(searchVal) && 
                !summary.includes(searchVal) && 
                !authorName.includes(searchVal) && 
                !authorEmail.includes(searchVal) && 
                !detailsStr.includes(searchVal)) {
                return false;
            }
        }

        return true;
    });

    if (counter) {
        counter.innerText = `${filtered.length} evento${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
        feed.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; color: #94a3b8;">
                <div style="font-size: 2.2rem; margin-bottom: 10px;">🔍</div>
                <h4 style="margin: 0 0 5px 0; color: #cbd5e1;">No se encontraron actividades</h4>
                <p style="font-size: 0.85rem; margin: 0;">Prueba modificando los filtros o realiza nuevas acciones en el sistema.</p>
            </div>
        `;
        return;
    }

    const actionIcons = {
        date_changed: '📅',
        comment_added: '💬',
        comment_edited: '✏️',
        comment_deleted: '🗑️',
        crm_stage_changed: '📋',
        crm_created: '➕',
        crm_updated: '✏️',
        crm_deleted: '🗑️',
        service_created: '🛠️',
        service_updated: '✏️',
        service_deleted: '🗑️',
        quote_created: '💰',
        quote_updated: '✏️',
        quote_deleted: '🗑️',
        report_created: '📄',
        report_deleted: '🗑️',
        client_created: '👥',
        client_updated: '✏️',
        client_deleted: '🗑️'
    };

    feed.innerHTML = filtered.map(log => {
        const author = log.author || {};
        const authorName = author.displayName || (author.email ? author.email.split('@')[0] : 'Usuario');
        const role = author.role || 'tech';
        const roleLabel = author.roleLabel || (role === 'admin' ? 'Administrador' : 'Técnico');
        const initials = author.initials || authorName.substring(0, 2).toUpperCase();
        const icon = actionIcons[log.actionType] || '⚡';
        const timeAgo = window.formatTimeAgo(log.clientTimestamp || log.timestamp || log.dateStr);

        let detailsExtraHtml = '';
        if (log.details) {
            if (log.details.previousDate && log.details.newDate) {
                detailsExtraHtml = `<div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">Fecha previa: <span style="text-decoration: line-through;">${log.details.previousDate}</span> ➔ <strong style="color: #60a5fa;">${log.details.newDate}</strong></div>`;
            } else if (log.details.fromCol && log.details.toCol) {
                detailsExtraHtml = `<div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">Etapa: <span style="text-decoration: line-through;">${log.details.fromCol}</span> ➔ <strong style="color: #fbbf24;">${log.details.toCol}</strong></div>`;
            } else if (log.details.textSnippet) {
                detailsExtraHtml = `<div style="font-size: 0.82rem; color: #cbd5e1; background: rgba(0,0,0,0.25); padding: 5px 8px; border-radius: 6px; margin-top: 5px; font-style: italic;">"${escapeHTML(log.details.textSnippet)}"</div>`;
            } else if (log.details.type && log.details.technician) {
                detailsExtraHtml = `<div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">Técnico: <strong style="color: #fff;">${log.details.technician}</strong> • Valor: <strong>$${(log.details.price || 0).toLocaleString('es-CL')}</strong></div>`;
            }
        }

        const clientChip = log.clientName ? `
            <span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 7px; font-size: 0.75rem; color: #e2e8f0; font-weight: 500;">
                🏢 ${escapeHTML(log.clientName)}
            </span>
        ` : '';

        return `
            <div class="audit-card">
                <div class="user-avatar-circle ${role}" title="${author.email || ''}">${initials}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <strong style="color: #f8fafc; font-size: 0.88rem;">${escapeHTML(authorName)}</strong>
                            <span class="user-role-badge ${role}">${roleLabel}</span>
                            <span class="audit-action-chip ${log.category}">${icon} ${log.category}</span>
                            ${clientChip}
                        </div>
                        <span style="font-size: 0.74rem; color: #94a3b8;" title="${log.dateStr || ''}">• ${timeAgo}</span>
                    </div>
                    <div style="font-size: 0.88rem; color: #f1f5f9; line-height: 1.4;">
                        ${escapeHTML(log.summary || '')}
                    </div>
                    ${detailsExtraHtml}
                </div>
            </div>
        `;
    }).join('');
}

// 6. Embedded Client Audit Timeline Component (e.g. for Clientes.html modal tab)
window.renderClientAuditTimeline = function(containerElOrId, targetClientName) {
    const container = typeof containerElOrId === 'string' ? document.getElementById(containerElOrId) : containerElOrId;
    if (!container) return;

    if (!targetClientName) {
        container.innerHTML = '<p style="color:#666; font-size:0.9rem;">Selecciona un cliente para ver su historial de cambios.</p>';
        return;
    }

    const ownerUid = (typeof getActiveUid === 'function' ? getActiveUid() : null) || 
                     localStorage.getItem('stahlgraf_target_uid') || 
                     (currentUser ? currentUser.uid : null);
    
    if (!ownerUid) {
        container.innerHTML = '<p style="color:#666; font-size:0.9rem;">Inicia sesión para ver la auditoría.</p>';
        return;
    }

    const dbInstance = (typeof db !== 'undefined' && db) ? db : (typeof firebase !== 'undefined' && firebase.firestore && firebase.apps.length ? firebase.firestore() : null);
    if (!dbInstance) return;

    container.innerHTML = '<p style="color:#94a3b8; font-size:0.88rem;">Cargando registro de auditoría de este cliente...</p>';

    dbInstance.collection('users').doc(ownerUid).collection('activity_logs')
        .where('clientName', '==', targetClientName)
        .limit(60)
        .get()
        .then(snap => {
            if (snap.empty) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 30px 15px; color: #94a3b8; background: rgba(255,255,255,0.02); border-radius: 8px;">
                        <span style="font-size: 1.8rem; display: block; margin-bottom: 6px;">📋</span>
                        <p style="margin: 0; font-size: 0.88rem;">No hay registros de auditoría aún para este cliente.</p>
                        <p style="margin: 4px 0 0 0; font-size: 0.78rem; color: #64748b;">Los cambios de fecha, cotizaciones, informes, servicios y comentarios aparecerán aquí con el nombre del usuario responsable.</p>
                    </div>
                `;
                return;
            }

            let logs = [];
            snap.forEach(d => logs.push({ id: d.id, ...d.data() }));
            logs.sort((a,b) => (b.clientTimestamp || 0) - (a.clientTimestamp || 0));

            const actionIcons = {
                date_changed: '📅', comment_added: '💬', comment_edited: '✏️', comment_deleted: '🗑️',
                crm_stage_changed: '📋', crm_created: '➕', crm_updated: '✏️', crm_deleted: '🗑️',
                service_created: '🛠️', service_updated: '✏️', service_deleted: '🗑️',
                quote_created: '💰', quote_updated: '✏️', quote_deleted: '🗑️',
                report_created: '📄', report_deleted: '🗑️', client_created: '👥', client_updated: '✏️', client_deleted: '🗑️'
            };

            container.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 0.85rem; color: #94a3b8;">Mostrando <strong>${logs.length}</strong> eventos registrados para <strong>${escapeHTML(targetClientName)}</strong></span>
                    <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 3px 8px;" onclick="window.openActivityAuditModal({ clientName: '${escape(targetClientName)}' })">
                        ⚡ Abrir en Pantalla Completa
                    </button>
                </div>
                <div class="client-audit-timeline-feed" style="max-height: 400px; overflow-y: auto; padding-right: 5px;">
                    ${logs.map(log => {
                        const author = log.author || {};
                        const authorName = author.displayName || (author.email ? author.email.split('@')[0] : 'Usuario');
                        const role = author.role || 'tech';
                        const roleLabel = author.roleLabel || (role === 'admin' ? 'Admin' : 'Técnico');
                        const initials = author.initials || authorName.substring(0, 2).toUpperCase();
                        const icon = actionIcons[log.actionType] || '⚡';
                        const timeAgo = window.formatTimeAgo(log.clientTimestamp || log.timestamp || log.dateStr);

                        return `
                            <div class="audit-card" style="padding: 10px; margin-bottom: 8px;">
                                <div class="user-avatar-circle ${role}" style="width: 24px; height: 24px; font-size: 0.7rem;">${initials}</div>
                                <div style="flex: 1; min-width: 0;">
                                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 3px; flex-wrap: wrap;">
                                        <div style="display: flex; align-items: center; gap: 6px;">
                                            <strong style="font-size: 0.84rem; color: #f8fafc;">${escapeHTML(authorName)}</strong>
                                            <span class="user-role-badge ${role}">${roleLabel}</span>
                                            <span class="audit-action-chip ${log.category}">${icon} ${log.category}</span>
                                        </div>
                                        <span style="font-size: 0.72rem; color: #94a3b8;">${timeAgo}</span>
                                    </div>
                                    <div style="font-size: 0.84rem; color: #e2e8f0;">
                                        ${escapeHTML(log.summary || '')}
                                    </div>
                                    ${(log.details && log.details.textSnippet) ? `
                                        <div style="font-size: 0.78rem; color: #94a3b8; font-style: italic; margin-top: 3px;">"${escapeHTML(log.details.textSnippet)}"</div>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        })
        .catch(err => {
            console.error("Error loading client audit timeline:", err);
            container.innerHTML = '<p style="color:#ef4444; font-size:0.85rem;">Error al cargar auditoría del cliente.</p>';
        });
};
