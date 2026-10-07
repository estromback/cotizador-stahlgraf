/**
 * ANALYTICS.JS - Sistema de Medición de Tráfico y Métricas para Juegos Stahlgraf
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * ID de Medición GA4: G-X0X7E48C64
 * 
 * Permite monitorear:
 * 1. Tráfico global y visitantes únicos (cuánta gente juega).
 * 2. Ubicación geográfica automática (país, región, ciudad) e idioma.
 * 3. Eventos de juego en tiempo real (juego iniciado, modo, duración, partidas finalizadas).
 * 4. Preparación para monetización (Google AdSense, analítica de engagement y retención).
 */

(function () {
  const GA_MEASUREMENT_ID = 'G-X0X7E48C64';
  const LOCAL_STATS_KEY = 'stahlgraf_portal_stats_v1';

  // 1. INICIALIZACIÓN ASÍNCRONA DE GOOGLE ANALYTICS 4
  function initGoogleAnalytics() {
    try {
      // Evitar duplicar script si ya está en el DOM
      if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
        return;
      }

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
      });

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.onerror = function () {
        console.warn('Google Analytics no pudo ser cargado (posible adblocker activo).');
      };
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Error al inicializar Google Analytics:', e);
    }
  }

  // 2. REGISTRO LOCAL COMPLEMENTARIO (LOCALSTORAGE)
  function getLocalStats() {
    try {
      const data = localStorage.getItem(LOCAL_STATS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return {
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitsCount: 0,
      gamesPlayed: {
        cronoline: 0,
        triviodromo: 0,
        quiensoy: 0,
        impostor: 0
      },
      eventsLogged: 0
    };
  }

  function saveLocalStats(stats) {
    try {
      localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
    } catch (e) {}
  }

  function recordLocalGamePlay(gameName) {
    const stats = getLocalStats();
    stats.lastVisit = new Date().toISOString();
    if (!stats.gamesPlayed[gameName]) {
      stats.gamesPlayed[gameName] = 0;
    }
    stats.gamesPlayed[gameName]++;
    stats.eventsLogged++;
    saveLocalStats(stats);
  }

  // 3. API PÚBLICA DE TRACKING
  window.StahlgrafAnalytics = {
    measurementId: GA_MEASUREMENT_ID,

    /**
     * Registra una vista de página o cambio de sección
     */
    trackPageView: function (pageTitle, path) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: pageTitle || document.title,
          page_location: window.location.href,
          page_path: path || window.location.pathname
        });
      }
    },

    /**
     * Registra el inicio de una partida en cualquiera de los juegos
     */
    trackGameStart: function (gameName, details = {}) {
      recordLocalGamePlay(gameName);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'game_start', {
          game_name: gameName,
          ...details
        });
      }
    },

    /**
     * Registra el final de una partida
     */
    trackGameFinish: function (gameName, outcome = {}) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'game_finish', {
          game_name: gameName,
          ...outcome
        });
      }
    },

    /**
     * Registra un clic en el portal (ej: elegir juego en el hub)
     */
    trackHubClick: function (gameSelected) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'select_content', {
          content_type: 'game_portal_card',
          item_id: gameSelected
        });
      }
    },

    /**
     * Evento genérico personalizado
     */
    trackCustomEvent: function (eventName, params = {}) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    },

    /**
     * Obtiene las estadísticas almacenadas en el navegador actual
     */
    getLocalStats: getLocalStats
  };

  // Auto-iniciar al cargar el archivo
  initGoogleAnalytics();

  // Contabilizar visita en el almacenamiento local
  try {
    const stats = getLocalStats();
    stats.visitsCount++;
    stats.lastVisit = new Date().toISOString();
    saveLocalStats(stats);
  } catch (e) {}

})();
