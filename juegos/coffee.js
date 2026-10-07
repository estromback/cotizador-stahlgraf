/**
 * COFFEE.JS - Sistema de Donaciones e "Invítanos un Café" (Juegos Stahlgraf)
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * 
 * Gestiona:
 * 1. Modal interactivo de donaciones para jugadores agradecidos.
 * 2. Enlaces a Cafecito / Buy Me a Coffee y PayPal.
 * 3. Acordeón con datos para Transferencia Bancaria Directa (Chile) con copiado rápido.
 * 4. Integración con métricas en Google Analytics 4.
 */

(function () {
  // CONFIGURACIÓN DE DONACIONES (Puedes actualizar estos enlaces con tus datos)
  // CONFIGURACIÓN DE DONACIONES Y PAGOS (Actualiza estos valores con tus datos reales)
  const COFFEE_CONFIG = {
    // 1. MERCADO PAGO (WebPay / Débito / Crédito en Chile)
    // Tiers con montos predefinidos y defaultUrl para monto manual/libre
    mercadoPago: {
      defaultUrl: "https://link.mercadopago.cl/stahlgrafgames", // Link para monto manual / libre
      tiers: {
        1: "https://mpago.la/2YDcqDK", // $1.500 CLP (1 Café)
        2: "https://mpago.la/1DNVPc7", // $3.000 CLP (Cafecito Doble)
        3: "https://mpago.la/2q95Sbj"  // $6.000 CLP (Pizza / Pack)
      }
    },
    
    // 2. PAYPAL (Aportes Internacionales / USD - Donación sin monto preestablecido)
    paypal: {
      url: "https://www.paypal.com/donate/?hosted_button_id=KS4ZNMY8DHP9Y"
    },

    // 3. TRANSFERENCIA BANCARIA DIRECTA VÍA MERCADO PAGO (Chile)
    transfer: {
      banco: "Mercado Pago (Institución Prepago)",
      tipoCuenta: "Cuenta Vista",
      numeroCuenta: "1048358737",
      titular: "Erick Stromback",
      rut: "15.370.996-3",
      email: "estromback@gmail.com"
    }
  };

  // Crear e inyectar el Modal de Cafecito en el DOM si no existe
  function injectCoffeeModal() {
    if (document.getElementById('coffee-modal-overlay')) return;

    const initialTier = 2; // Por defecto seleccionado $3.000
    const mpInitialUrl = (COFFEE_CONFIG.mercadoPago.tiers && COFFEE_CONFIG.mercadoPago.tiers[initialTier]) 
      ? COFFEE_CONFIG.mercadoPago.tiers[initialTier] 
      : COFFEE_CONFIG.mercadoPago.defaultUrl;

    const modalHTML = `
      <div id="coffee-modal-overlay" class="coffee-modal-overlay hidden">
        <div class="coffee-modal-card">
          
          <!-- Encabezado -->
          <div class="coffee-modal-header">
            <div class="coffee-modal-title-wrap">
              <span class="coffee-modal-icon">☕</span>
              <div>
                <h3 class="coffee-modal-title">¡Invítanos un Café!</h3>
                <div class="coffee-modal-subtitle">Apoya el desarrollo de Juegos Stahlgraf</div>
              </div>
            </div>
            <button type="button" id="btn-close-coffee-modal" class="coffee-modal-close" title="Cerrar">✕</button>
          </div>

          <!-- Mensaje -->
          <div class="coffee-modal-message">
            Desarrollamos estos juegos para que disfrutes con tus amigos y familia en asados, previas y juntas, de forma <strong>100% gratuita y sin publicidad invasiva</strong>.<br><br>
            Si te sacamos una sonrisa o pasaste una gran noche, puedes apoyarnos con un café simbólico para costear servidores y seguir creando más juegos y trivias.
          </div>

          <!-- Opciones de Aporte Simbólico -->
          <div class="coffee-tiers-grid">
            <div class="coffee-tier-card" data-tier="1" data-label="$1.500">
              <span class="coffee-tier-icon">☕</span>
              <span class="coffee-tier-title">1 Café</span>
              <span class="coffee-tier-price">$1.500 CLP</span>
            </div>
            <div class="coffee-tier-card selected" data-tier="2" data-label="$3.000">
              <span class="coffee-tier-icon">☕☕</span>
              <span class="coffee-tier-title">Café Doble</span>
              <span class="coffee-tier-price">$3.000 CLP</span>
            </div>
            <div class="coffee-tier-card" data-tier="3" data-label="$6.000">
              <span class="coffee-tier-icon">🍕</span>
              <span class="coffee-tier-title">Pizza / Pack</span>
              <span class="coffee-tier-price">$6.000 CLP</span>
            </div>
            <div class="coffee-tier-card" data-tier="custom" data-label="Monto Libre">
              <span class="coffee-tier-icon">✍️</span>
              <span class="coffee-tier-title">Monto Libre</span>
              <span class="coffee-tier-price">Tú decides</span>
            </div>
          </div>

          <!-- Canales de Aporte -->
          <div class="coffee-channels-list">
            
            <!-- 1. Mercado Pago (WebPay / Tarjetas Débito y Crédito Chile) -->
            <a href="${mpInitialUrl}" target="_blank" rel="noopener noreferrer" class="coffee-pay-link-btn btn-mercadopago-chile" id="link-pay-mercadopago">
              <div class="coffee-pay-btn-content">
                <span class="coffee-pay-btn-title">💳 Pagar <span id="mp-amount-display">$3.000</span> con WebPay / Tarjetas</span>
                <span class="coffee-pay-btn-subtitle">Vía Mercado Pago • Redcompra, Débito y Crédito</span>
              </div>
              <span class="coffee-pay-arrow">➔</span>
            </a>

            <!-- 2. PayPal (Donación abierta sin monto preestablecido) -->
            <a href="${COFFEE_CONFIG.paypal.url}" target="_blank" rel="noopener noreferrer" class="coffee-pay-link-btn btn-paypal-global" id="link-pay-paypal">
              <div class="coffee-pay-btn-content">
                <span class="coffee-pay-btn-title">🌎 Donar con PayPal (Sin monto fijo / USD)</span>
                <span class="coffee-pay-btn-subtitle">Donación libre para jugadores internacionales</span>
              </div>
              <span class="coffee-pay-arrow">➔</span>
            </a>

            <!-- 3. Transferencia Bancaria (Chile) vía Mercado Pago -->
            <div class="coffee-transfer-accordion">
              <button type="button" class="coffee-transfer-toggle" id="btn-toggle-transfer">
                <span>🇨🇱 Transferencia Bancaria Directa (Mercado Pago Chile)</span>
                <span id="transfer-toggle-icon">▼</span>
              </button>

              <div class="coffee-transfer-details hidden" id="coffee-transfer-details">
                <div class="coffee-bank-tip">
                  💡 <strong>Tip al transferir:</strong> En la app de tu banco selecciona como banco receptor <strong>"Mercado Pago"</strong> o <strong>"MercadoPago Emisora"</strong>.
                </div>

                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">Banco:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.banco}</span>
                </div>
                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">Tipo de Cuenta:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.tipoCuenta}</span>
                </div>
                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">N° de Cuenta:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.numeroCuenta}</span>
                </div>
                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">Titular:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.titular}</span>
                </div>
                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">RUT:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.rut}</span>
                </div>
                <div class="coffee-bank-row">
                  <span class="coffee-bank-lbl">Correo:</span>
                  <span class="coffee-bank-val">${COFFEE_CONFIG.transfer.email}</span>
                </div>

                <button type="button" class="coffee-copy-btn" id="btn-copy-transfer-data">
                  📋 Copiar todos los datos de transferencia
                </button>
              </div>
            </div>

          </div>

          <!-- Pie del modal -->
          <button type="button" id="btn-footer-close-coffee" class="btn-secondary" style="width: 100%; padding: 0.75rem; border-radius: 12px; font-weight: 700; cursor: pointer;">
            Cerrar Ventana
          </button>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    bindModalEvents();
  }

  // Asociar listeners del modal
  function bindModalEvents() {
    const modal = document.getElementById('coffee-modal-overlay');
    const btnCloseX = document.getElementById('btn-close-coffee-modal');
    const btnCloseFooter = document.getElementById('btn-footer-close-coffee');
    const btnToggleTransfer = document.getElementById('btn-toggle-transfer');
    const transferDetails = document.getElementById('coffee-transfer-details');
    const transferIcon = document.getElementById('transfer-toggle-icon');
    const btnCopyTransfer = document.getElementById('btn-copy-transfer-data');
    const linkMp = document.getElementById('link-pay-mercadopago');
    const linkPaypal = document.getElementById('link-pay-paypal');
    const mpAmountDisplay = document.getElementById('mp-amount-display');

    // Cerrar
    const closeModal = () => {
      if (modal) modal.classList.add('hidden');
    };

    if (btnCloseX) btnCloseX.addEventListener('click', closeModal);
    if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Toggle Acordeón de Transferencia
    if (btnToggleTransfer && transferDetails) {
      btnToggleTransfer.addEventListener('click', () => {
        const isHidden = transferDetails.classList.contains('hidden');
        transferDetails.classList.toggle('hidden', !isHidden);
        if (transferIcon) {
          transferIcon.textContent = isHidden ? '▲' : '▼';
        }
      });
    }

    // Copiar datos de transferencia al portapapeles
    if (btnCopyTransfer) {
      btnCopyTransfer.addEventListener('click', () => {
        const t = COFFEE_CONFIG.transfer;
        const textToCopy = `Datos de Transferencia Juegos Stahlgraf:
Banco: ${t.banco}
Tipo de Cuenta: ${t.tipoCuenta}
N° de Cuenta: ${t.numeroCuenta}
Titular: ${t.titular}
RUT: ${t.rut}
Correo: ${t.email}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          btnCopyTransfer.textContent = "✅ ¡Datos copiados al portapapeles!";
          btnCopyTransfer.classList.add('copied');
          setTimeout(() => {
            btnCopyTransfer.textContent = "📋 Copiar todos los datos de transferencia";
            btnCopyTransfer.classList.remove('copied');
          }, 3000);
        }).catch(() => {
          alert(textToCopy);
        });

        if (window.StahlgrafAnalytics) {
          window.StahlgrafAnalytics.trackCustomEvent('coffee_copy_transfer');
        }
      });
    }

    // Tracking de clics en enlaces
    if (linkMp) {
      linkMp.addEventListener('click', () => {
        if (window.StahlgrafAnalytics) {
          window.StahlgrafAnalytics.trackCustomEvent('coffee_click_mercadopago');
        }
      });
    }

    if (linkPaypal) {
      linkPaypal.addEventListener('click', () => {
        if (window.StahlgrafAnalytics) {
          window.StahlgrafAnalytics.trackCustomEvent('coffee_click_paypal');
        }
      });
    }

    // Selección interactiva de montos simbólicos
    document.querySelectorAll('.coffee-tier-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.coffee-tier-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const tier = card.dataset.tier;
        const label = card.dataset.label || '$3.000';

        // Actualizar etiqueta del botón de Mercado Pago
        if (mpAmountDisplay) {
          mpAmountDisplay.textContent = label;
        }

        // Actualizar link de Mercado Pago según tier
        if (linkMp && COFFEE_CONFIG.mercadoPago) {
          if (tier === 'custom') {
            linkMp.href = COFFEE_CONFIG.mercadoPago.defaultUrl;
          } else {
            const tierUrl = (COFFEE_CONFIG.mercadoPago.tiers && COFFEE_CONFIG.mercadoPago.tiers[tier])
              ? COFFEE_CONFIG.mercadoPago.tiers[tier]
              : COFFEE_CONFIG.mercadoPago.defaultUrl;
            if (tierUrl) {
              linkMp.href = tierUrl;
            }
          }
        }
      });
    });
  }

  // Abrir modal desde cualquier parte
  function openCoffeeModal() {
    injectCoffeeModal();
    const modal = document.getElementById('coffee-modal-overlay');
    if (modal) {
      modal.classList.remove('hidden');
      if (window.StahlgrafAnalytics) {
        window.StahlgrafAnalytics.trackCustomEvent('coffee_modal_open');
      }
    }
  }

  // Escuchar clics globales en botones marcados para abrir el cafecito
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('#btn-open-coffee-modal, .btn-open-coffee, #btn-floating-coffee');
    if (trigger) {
      e.preventDefault();
      openCoffeeModal();
    }
  });

  // Exponer API pública
  window.StahlgrafCoffee = {
    open: openCoffeeModal,
    config: COFFEE_CONFIG,
    
    /**
     * Inyecta una tarjeta simpática de invitación a un café dentro de un contenedor (ej: en el podio)
     */
    renderPodiumWidget: function (container) {
      if (!container) return;
      if (container.querySelector('.coffee-podium-card')) return;

      const widgetHTML = `
        <div class="coffee-podium-card">
          <div class="coffee-podium-title">
            <span>☕</span>
            <span>¿Lo pasaron bien jugando?</span>
          </div>
          <p class="coffee-podium-desc">
            Si disfrutaron esta partida con amigos o familia, ¡pueden invitarle un café al creador para apoyar el portal!
          </p>
          <button type="button" class="hub-coffee-btn btn-open-coffee">
            <span>☕ Invitar un Café ($1.500)</span>
          </button>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', widgetHTML);
    }
  };

  // Inicializar inyección cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCoffeeModal);
  } else {
    injectCoffeeModal();
  }
})();
