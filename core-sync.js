// core-sync.js
// Handles intelligent merging of appData arrays (clients, services, chemicals, etc.)
// Prevents offline data loss during synchronization

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
            
            // Add cloud items first (source of truth)
            cloudArr.forEach(item => {
                if (item && item.id) {
                    map.set(item.id, item);
                }
            });
            
            // Add or intelligently merge local items
            localArr.forEach(item => {
                if (!item || !item.id) return;
                
                const cloudItem = map.get(item.id);
                if (!cloudItem) {
                    // Local addition that hasn't synced yet! Preserve it.
                    map.set(item.id, item);
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
                        map.set(item.id, item);
                    }
                }
            });
            
            merged[key] = Array.from(map.values());
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
        db.enablePersistence({ synchronizeTabs: true })
            .then(() => console.log("Firebase Offline Persistence Enabled"))
            .catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
                } else if (err.code === 'unimplemented') {
                    console.warn("The current browser does not support all of the features required to enable persistence.");
                } else {
                    console.warn("Firebase persistence error:", err);
                }
            });
    }
}
