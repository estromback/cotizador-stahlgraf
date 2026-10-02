// core-sync.js
// Handles intelligent merging of appData arrays (clients, services, chemicals, etc.)
// Prevents offline data loss during synchronization

const STAHLGRAF_VERSION = "v4.3.6";

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
