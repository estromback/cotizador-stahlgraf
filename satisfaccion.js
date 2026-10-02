// satisfaccion.js - Admin logic for Customer Satisfaction & Quality Control

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
let allFeedback = [];
let allClients = [];
let currentResolvingDocId = null;

function getActiveUid() {
    return localStorage.getItem('stahlgraf_target_uid') || (currentUser ? currentUser.uid : null);
}

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase init error:", e);
    }
}
db = firebase.firestore();
auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    // Load local client directory cache
    try {
        const raw = localStorage.getItem('stahlgraf_data_v4');
        if (raw) {
            const parsed = JSON.parse(raw);
            allClients = parsed.clients || [];
        }
    } catch(e) {}

    // Sync button logic
    const syncBtn = document.getElementById('btn-sync-login');
    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            if (!auth) return alert("Firebase no está configurado.");
            if (currentUser && !currentUser.isAnonymous) {
                if (confirm("¿Deseas cerrar sesión?")) {
                    auth.signOut().then(() => {
                        window.location.href = "hub.html";
                    });
                }
            } else {
                const provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithPopup(provider).catch(e => {
                    console.error("Login popup error:", e);
                });
            }
        });
    }

    auth.onAuthStateChanged(user => {
        const syncText = document.getElementById('sync-text');
        const syncIcon = document.getElementById('sync-icon');
        const syncBtn = document.getElementById('btn-sync-login');

        if (user && !user.isAnonymous) {
            currentUser = user;
            if (syncText) syncText.innerText = user.email;
            if (syncIcon) syncIcon.innerText = '🟢';
            if (syncBtn) {
                syncBtn.classList.remove('btn-primary-outline');
                syncBtn.classList.add('btn-secondary');
            }
            loadFeedbackData();
        } else if (user && user.isAnonymous) {
            currentUser = user;
            if (syncText) syncText.innerText = "Modo Anónimo";
            if (syncIcon) syncIcon.innerText = '☁️';
            loadFeedbackData();
        } else {
            if (syncText) syncText.innerText = "Ingresar para Sync";
            if (syncIcon) syncIcon.innerText = '☁️';
            if (syncBtn) {
                syncBtn.classList.add('btn-primary-outline');
                syncBtn.classList.remove('btn-secondary');
            }
            // Attempt anonymous fallback if needed
            auth.signInAnonymously().then(cred => {
                currentUser = cred.user;
                loadFeedbackData();
            }).catch(() => {
                alert("Debes iniciar sesión para visualizar las métricas administrativas.");
                window.location.href = "hub.html";
            });
        }
    });
});

async function loadFeedbackData() {
    const activeUid = getActiveUid();
    if (!activeUid || !db) return;

    try {
        // Real-time listener for feedback collection
        db.collection('users').doc(activeUid).collection('feedback')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                allFeedback = [];
                snapshot.forEach(doc => {
                    allFeedback.push({ id: doc.id, ...doc.data() });
                });
                renderDashboard();
            }, err => {
                console.error("Error listening to feedback:", err);
                document.getElementById('alerts-container').innerHTML = `
                    <div style="text-align: center; color: #ef4444; padding: 20px;">
                        ⚠️ Error al cargar los datos de satisfacción: ${err.message}
                    </div>
                `;
            });
    } catch (e) {
        console.error("Failed to setup feedback listener:", e);
    }
}

function renderDashboard() {
    computeKPIs();
    renderRecoveryAlerts();
    renderTechRanking();
    renderFeedList();
}

function computeKPIs() {
    const total = allFeedback.length;
    const elCsatScore = document.getElementById('kpi-csat-score');
    const elCsatSub = document.getElementById('kpi-csat-sub');
    const elTotalEvals = document.getElementById('kpi-total-evals');
    const elChannelsSub = document.getElementById('kpi-channels-sub');
    const elPositiveRate = document.getElementById('kpi-positive-rate');
    const elPositiveSub = document.getElementById('kpi-positive-sub');
    const elPendingAlerts = document.getElementById('kpi-pending-alerts');
    const elAlertsSub = document.getElementById('kpi-alerts-sub');

    if (total === 0) {
        elCsatScore.textContent = '5.0 ⭐';
        elCsatSub.textContent = 'Sin evaluaciones aún';
        elTotalEvals.textContent = '0';
        elChannelsSub.textContent = 'Aún no hay respuestas';
        elPositiveRate.textContent = '100%';
        elPositiveSub.textContent = 'Esperando primeros datos';
        elPendingAlerts.textContent = '0';
        elAlertsSub.textContent = 'Todo al día';
        return;
    }

    const sumRating = allFeedback.reduce((acc, f) => acc + (f.rating || 5), 0);
    const avgRating = (sumRating / total).toFixed(1);

    const waCount = allFeedback.filter(f => f.channel === 'whatsapp').length;
    const portalCount = allFeedback.filter(f => f.channel === 'portal').length;

    const positiveCount = allFeedback.filter(f => (f.rating || 5) >= 4).length;
    const positivePct = Math.round((positiveCount / total) * 100);

    const pendingAlerts = allFeedback.filter(f => (f.rating || 5) <= 3 && f.status !== 'resuelto');

    elCsatScore.textContent = `${avgRating} ⭐`;
    elCsatSub.innerHTML = `<span style="color:#10b981;">●</span> Escala de 1 a 5 estrellas`;

    elTotalEvals.textContent = `${total}`;
    elChannelsSub.textContent = `📲 ${waCount} WhatsApp • 👤 ${portalCount} Portal`;

    elPositiveRate.textContent = `${positivePct}%`;
    elPositiveSub.textContent = `${positiveCount} de ${total} clientes conformes`;

    elPendingAlerts.textContent = `${pendingAlerts.length}`;
    elAlertsSub.textContent = pendingAlerts.length === 0 ? '✓ Todos los casos gestionados' : 'Requieren contacto inmediato';
}

function renderRecoveryAlerts() {
    const container = document.getElementById('alerts-container');
    const countLabel = document.getElementById('alerts-count-label');
    const pendingAlerts = allFeedback.filter(f => (f.rating || 5) <= 3 && f.status !== 'resuelto');

    countLabel.textContent = `${pendingAlerts.length} pendiente(s)`;

    if (pendingAlerts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px; background: rgba(16, 185, 129, 0.05); border: 1px dashed rgba(16, 185, 129, 0.2); border-radius: 12px; color: #34d399;">
                <div style="font-size: 2rem; margin-bottom: 8px;">🎉</div>
                <div style="font-weight: 700; font-size: 1.1rem; color: #fff; margin-bottom: 4px;">¡Excelente trabajo!</div>
                <div style="font-size: 0.88rem; color: var(--text-muted);">No hay clientes insatisfechos pendientes de gestión en este momento.</div>
            </div>
        `;
        return;
    }

    let html = '';
    pendingAlerts.forEach(fb => {
        const clientObj = allClients.find(c => c.name === fb.clientName || (fb.clientName && c.name.toLowerCase().includes(fb.clientName.toLowerCase())));
        const phone = clientObj ? clientObj.phone : '';
        const cleanPhone = phone.replace(/\D/g, '');

        const tagsHtml = (fb.tags && fb.tags.length > 0)
            ? `<div class="tags-list">${fb.tags.map(t => `<span class="tag-badge">🏷️ ${t}</span>`).join('')}</div>`
            : '';

        const commentHtml = fb.comment 
            ? `<div class="alert-comment">"${fb.comment}"</div>`
            : '<div style="font-size: 0.82rem; color: #94a3b8; font-style: italic; margin: 6px 0;">El cliente no dejó comentario escrito.</div>';

        const waMsg = `Hola ${fb.clientName.split(' ')[0]}, te escribe la administración de Stahlgraf. Vimos tu evaluación respecto al servicio de ${fb.serviceType || 'atención técnica'} del ${fb.serviceDate || ''}. Queremos conversar contigo para entender qué ocurrió y darte una solución inmediata.`;
        const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}` : `https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`;

        html += `
            <div class="alert-card">
                <div class="alert-top">
                    <div>
                        <div class="alert-client-name">👤 ${fb.clientName}</div>
                        <div class="alert-meta">
                            🛠️ ${fb.serviceType || 'Servicio'} • 📅 ${fb.serviceDate || '-'} • 👤 Técnico: <strong>${fb.technician || 'No asignado'}</strong>
                            ${phone ? ` • 📞 ${phone}` : ''}
                        </div>
                    </div>
                    <div class="alert-rating-badge">
                        ⭐ ${fb.rating}/5 Calificación
                    </div>
                </div>

                ${tagsHtml}
                ${commentHtml}

                <div class="alert-actions">
                    <a href="${waLink}" target="_blank" class="btn btn-sm" style="background: rgba(37, 211, 102, 0.2); color: #25D366; border: 1px solid rgba(37, 211, 102, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; font-size: 0.82rem; border-radius: 8px;">
                        📲 Contactar por WhatsApp
                    </a>
                    <button class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.82rem;" onclick="openResolveModal('${fb.id}', '${escape(fb.clientName)}')">
                        ✅ Marcar como Resuelto
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderTechRanking() {
    const tbody = document.getElementById('tech-ranking-tbody');
    if (!tbody) return;

    if (allFeedback.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">
                    No hay registros de evaluaciones para calcular desempeño técnico.
                </td>
            </tr>
        `;
        return;
    }

    // Group by technician
    const techMap = {};
    allFeedback.forEach(fb => {
        const tech = fb.technician || 'Sin asignar';
        if (!techMap[tech]) {
            techMap[tech] = {
                count: 0,
                totalRating: 0,
                positives: 0,
                tags: []
            };
        }
        techMap[tech].count++;
        techMap[tech].totalRating += (fb.rating || 5);
        if ((fb.rating || 5) >= 4) techMap[tech].positives++;
        if (fb.tags && Array.isArray(fb.tags)) {
            techMap[tech].tags.push(...fb.tags);
        }
    });

    const techList = Object.keys(techMap).map(name => {
        const data = techMap[name];
        const avg = (data.totalRating / data.count).toFixed(1);
        const approval = Math.round((data.positives / data.count) * 100);
        return {
            name,
            count: data.count,
            avg: parseFloat(avg),
            approval,
            tags: data.tags
        };
    });

    // Sort by highest average
    techList.sort((a, b) => b.avg - a.avg || b.count - a.count);

    let html = '';
    techList.forEach(t => {
        // Tag frequency
        const tagCounts = {};
        t.tags.forEach(tag => { tagCounts[tag] = (tagCounts[tag] || 0) + 1; });
        const topTags = Object.keys(tagCounts).sort((a,b) => tagCounts[b] - tagCounts[a]).slice(0, 3);
        const tagsSummary = topTags.length > 0 
            ? topTags.map(tg => `<span class="tag-badge" style="font-size: 0.72rem;">${tg} (${tagCounts[tg]})</span>`).join(' ')
            : '<span style="color:#10b981; font-size:0.8rem;">✓ 100% positivo</span>';

        const starColor = t.avg >= 4.5 ? '#10b981' : (t.avg >= 3.5 ? '#f59e0b' : '#ef4444');

        html += `
            <tr>
                <td><strong style="color: #fff;">👤 ${t.name}</strong></td>
                <td>${t.count} servicio(s)</td>
                <td><span style="color: ${starColor}; font-weight: 700;">⭐ ${t.avg} / 5.0</span></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 600; color: #fff;">${t.approval}%</span>
                        <div style="flex: 1; max-width: 80px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${t.approval}%; height: 100%; background: ${t.approval >= 80 ? '#10b981' : '#f59e0b'};"></div>
                        </div>
                    </div>
                </td>
                <td>${tagsSummary}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function renderFeedList() {
    const container = document.getElementById('feed-list-container');
    const searchVal = (document.getElementById('feed-search').value || '').toLowerCase().trim();
    const filterStars = document.getElementById('feed-filter-stars').value;
    const filterChannel = document.getElementById('feed-filter-channel').value;

    let filtered = [...allFeedback];

    if (searchVal) {
        filtered = filtered.filter(f => 
            (f.clientName || '').toLowerCase().includes(searchVal) ||
            (f.technician || '').toLowerCase().includes(searchVal) ||
            (f.comment || '').toLowerCase().includes(searchVal) ||
            (f.serviceType || '').toLowerCase().includes(searchVal)
        );
    }

    if (filterStars === '5') {
        filtered = filtered.filter(f => f.rating === 5);
    } else if (filterStars === '4') {
        filtered = filtered.filter(f => f.rating === 4);
    } else if (filterStars === 'critical') {
        filtered = filtered.filter(f => (f.rating || 5) <= 3);
    }

    if (filterChannel !== 'all') {
        filtered = filtered.filter(f => f.channel === filterChannel);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #64748b;">
                No se encontraron evaluaciones que coincidan con los filtros aplicados.
            </div>
        `;
        return;
    }

    let html = '';
    filtered.forEach(fb => {
        const rating = fb.rating || 5;
        const starColor = rating >= 4 ? '#10b981' : (rating === 3 ? '#f59e0b' : '#ef4444');
        const channelBadge = fb.channel === 'whatsapp' 
            ? '<span class="tag-badge" style="background: rgba(37, 211, 102, 0.15); border-color: rgba(37, 211, 102, 0.3); color: #25D366;">📲 WhatsApp</span>' 
            : '<span class="tag-badge" style="background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.3); color: #60a5fa;">👤 Portal</span>';

        const statusBadge = fb.status === 'resuelto' 
            ? '<span class="tag-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">✓ Resuelto</span>'
            : (rating <= 3 ? '<span class="tag-badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">🚨 Pendiente</span>' : '');

        const tagsHtml = (fb.tags && fb.tags.length > 0)
            ? `<div class="tags-list">${fb.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}</div>`
            : '';

        const commentHtml = fb.comment 
            ? `<div style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; font-size: 0.88rem; color: #e2e8f0; margin-top: 4px;">"${fb.comment}"</div>`
            : '';

        const resolvedNotesHtml = (fb.status === 'resuelto' && fb.resolutionNotes)
            ? `<div style="font-size: 0.8rem; color: #34d399; margin-top: 4px;">🤝 <strong>Gestión:</strong> ${fb.resolutionNotes}</div>`
            : '';

        let dateStr = fb.serviceDate || '-';
        if (fb.createdAt && fb.createdAt.toDate) {
            dateStr = fb.createdAt.toDate().toLocaleDateString('es-CL');
        }

        html += `
            <div class="feed-item">
                <div class="feed-top">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span class="feed-client">${fb.clientName}</span>
                        ${channelBadge}
                        ${statusBadge}
                    </div>
                    <div style="font-size: 1rem; font-weight: 700; color: ${starColor};">
                        ⭐ ${rating} / 5
                    </div>
                </div>

                <div class="feed-details">
                    🛠️ ${fb.serviceType || 'Servicio'} • 👤 Técnico: <strong>${fb.technician || 'Sin asignar'}</strong> • 📅 ${dateStr}
                </div>

                ${tagsHtml}
                ${commentHtml}
                ${resolvedNotesHtml}
            </div>
        `;
    });

    container.innerHTML = html;
}

window.filterFeedbackList = function() {
    renderFeedList();
};

// --- Modal for Case Resolution ---
window.openResolveModal = function(id, clientName) {
    currentResolvingDocId = id;
    document.getElementById('modal-resolve-client-info').textContent = `Cliente: ${unescape(clientName)}`;
    document.getElementById('modal-resolve-notes').value = '';
    document.getElementById('modal-resolve-alert').classList.add('active');
};

window.closeResolveModal = function() {
    currentResolvingDocId = null;
    document.getElementById('modal-resolve-alert').classList.remove('active');
};

window.confirmResolveAlert = async function() {
    if (!currentResolvingDocId) return;
    const notes = document.getElementById('modal-resolve-notes').value.trim();
    if (!notes) {
        return alert("Por favor escribe una breve nota de qué acuerdo o solución se le dio al cliente.");
    }

    const activeUid = getActiveUid();
    if (!activeUid || !db) return;

    try {
        await db.collection('users').doc(activeUid).collection('feedback').doc(currentResolvingDocId).update({
            status: 'resuelto',
            resolutionNotes: notes,
            resolvedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        closeResolveModal();
    } catch (e) {
        console.error("Error resolving alert:", e);
        alert("Ocurrió un error al actualizar el estado: " + e.message);
    }
};
