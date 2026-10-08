/**
 * CENSURADO.JS
 * Lógica principal del juego "Censurado" (Juegos Stahlgraf).
 * Juego estilo Taboo / Palabras Prohibidas por equipos.
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 */

(function () {
  'use strict';

  // ==================== CONFIGURACIÓN & ESTADO ====================
  const DEFAULT_TEAMS = [
    { id: 1, name: 'Equipo Rojo', color: '#ef4444', avatar: '🔴', score: 0 },
    { id: 2, name: 'Equipo Azul', color: '#3b82f6', avatar: '🔵', score: 0 },
    { id: 3, name: 'Equipo Verde', color: '#10b981', avatar: '🟢', score: 0 },
    { id: 4, name: 'Equipo Amarillo', color: '#f59e0b', avatar: '🟡', score: 0 }
  ];

  const state = {
    turnTime: 60,
    targetScore: 15,
    teamCount: 2,
    teams: [],
    selectedCategories: new Set(),
    activeTeamIndex: 0,
    deck: [],
    deckIndex: 0,
    currentCard: null,
    timeLeft: 60,
    timerId: null,
    turnStats: {
      correct: 0,
      fails: 0,
      net: 0
    },
    turnsPlayedInRound: 0
  };

  // ==================== MOTOR DE SONIDO (WEB AUDIO API) ====================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.15) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  function playSuccessSound() {
    initAudio();
    if (!audioCtx) return;
    // Chime brillante ascendente
    playTone(523.25, 0.12, 'triangle', 0.2); // C5
    setTimeout(() => playTone(659.25, 0.12, 'triangle', 0.22), 80); // E5
    setTimeout(() => playTone(783.99, 0.22, 'triangle', 0.25), 160); // G5
  }

  function playFailSound() {
    initAudio();
    if (!audioCtx) return;
    // Buzzer áspero tipo censura de TV
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(130, audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  function playSkipSound() {
    initAudio();
    if (!audioCtx) return;
    playTone(400, 0.1, 'sine', 0.12);
  }

  function playTickSound(urgent = false) {
    initAudio();
    if (!audioCtx) return;
    if (urgent) {
      playTone(920, 0.05, 'sine', 0.2);
    } else {
      playTone(580, 0.04, 'sine', 0.1);
    }
  }

  function playTimesUpSound() {
    initAudio();
    if (!audioCtx) return;
    // 3 beeps rápidos finales
    playTone(330, 0.15, 'sawtooth', 0.25);
    setTimeout(() => playTone(330, 0.15, 'sawtooth', 0.25), 180);
    setTimeout(() => playTone(220, 0.45, 'sawtooth', 0.3), 360);
  }

  function playVictoryFanfare() {
    initAudio();
    if (!audioCtx) return;
    const notes = [
      { f: 523.25, d: 0.15, delay: 0 },
      { f: 659.25, d: 0.15, delay: 150 },
      { f: 783.99, d: 0.15, delay: 300 },
      { f: 1046.50, d: 0.5, delay: 450 }
    ];
    notes.forEach(n => {
      setTimeout(() => playTone(n.f, n.d, 'triangle', 0.28), n.delay);
    });
  }

  // ==================== NAVEGACIÓN DE PANTALLAS ====================
  const screens = {
    setup: document.getElementById('setup-screen'),
    pass: document.getElementById('pass-screen'),
    game: document.getElementById('game-screen'),
    summary: document.getElementById('round-summary-screen'),
    podium: document.getElementById('podium-screen')
  };

  function showScreen(name) {
    Object.keys(screens).forEach(key => {
      if (screens[key]) {
        if (key === name) {
          screens[key].classList.remove('hidden');
        } else {
          screens[key].classList.add('hidden');
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== SETUP: CATEGORÍAS & EQUIPOS ====================
  function initCategoriesUI() {
    const container = document.getElementById('cats-container');
    if (!container || typeof CENSURADO_CATEGORIAS === 'undefined') return;

    container.innerHTML = '';
    const catKeys = Object.keys(CENSURADO_CATEGORIAS);

    // Por defecto todas seleccionadas
    state.selectedCategories = new Set(catKeys);

    catKeys.forEach(catKey => {
      const cat = CENSURADO_CATEGORIAS[catKey];
      const card = document.createElement('div');
      card.className = 'cs-cat-card active';
      card.dataset.cat = catKey;
      card.innerHTML = `
        <span class="cs-cat-icon">${cat.icono}</span>
        <span class="cs-cat-name">${cat.nombre}</span>
      `;

      card.addEventListener('click', () => {
        initAudio();
        if (state.selectedCategories.has(catKey)) {
          // No permitir deseleccionar todas
          if (state.selectedCategories.size <= 1) {
            alert('¡Debes mantener al menos una categoría seleccionada!');
            return;
          }
          state.selectedCategories.delete(catKey);
          card.classList.remove('active');
        } else {
          state.selectedCategories.add(catKey);
          card.classList.add('active');
        }
      });

      container.appendChild(card);
    });

    const btnToggleAll = document.getElementById('btn-toggle-all-cats');
    if (btnToggleAll) {
      btnToggleAll.addEventListener('click', () => {
        initAudio();
        const allSelected = state.selectedCategories.size === catKeys.length;
        const cards = container.querySelectorAll('.cs-cat-card');
        if (allSelected) {
          // Dejar solo la primera
          state.selectedCategories.clear();
          state.selectedCategories.add(catKeys[0]);
          cards.forEach((c, idx) => {
            if (idx === 0) c.classList.add('active');
            else c.classList.remove('active');
          });
        } else {
          // Seleccionar todas
          catKeys.forEach(k => state.selectedCategories.add(k));
          cards.forEach(c => c.classList.add('active'));
        }
      });
    }
  }

  function renderTeamInputs() {
    const container = document.getElementById('teams-inputs-container');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < state.teamCount; i++) {
      const defaultTeam = DEFAULT_TEAMS[i];
      const currentName = (state.teams[i] && state.teams[i].name) ? state.teams[i].name : defaultTeam.name;

      const row = document.createElement('div');
      row.className = 'cs-team-input-row';
      row.innerHTML = `
        <span class="cs-team-color-indicator" style="background: ${defaultTeam.color}; box-shadow: 0 0 10px ${defaultTeam.color};"></span>
        <input type="text" class="cs-team-input" id="team-input-${i}" value="${currentName}" maxlength="24" placeholder="Nombre de Equipo ${i + 1}">
      `;
      container.appendChild(row);
    }
  }

  function initSetupEvents() {
    // Selector de tiempo
    const timeButtons = document.querySelectorAll('#time-selector .cs-pill-btn');
    timeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        timeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.turnTime = parseInt(btn.dataset.time, 10);
      });
    });

    // Selector de meta de victoria
    const targetButtons = document.querySelectorAll('#target-selector .cs-pill-btn');
    targetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        targetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.targetScore = parseInt(btn.dataset.target, 10);
      });
    });

    // Selector de cantidad de equipos
    const countButtons = document.querySelectorAll('#teams-count-selector .cs-pill-btn');
    countButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        countButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.teamCount = parseInt(btn.dataset.count, 10);
        renderTeamInputs();
      });
    });

    // Botón iniciar partida
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        initAudio();
        startNewGame();
      });
    }

    // Botón comenzar turno desde pantalla de pase
    const btnReadyTurn = document.getElementById('btn-ready-turn');
    if (btnReadyTurn) {
      btnReadyTurn.addEventListener('click', () => {
        initAudio();
        startTurn();
      });
    }

    // Botones de acción durante juego
    const btnSuccess = document.getElementById('btn-action-success');
    if (btnSuccess) {
      btnSuccess.addEventListener('click', () => handleTurnAction('success'));
    }

    const btnFail = document.getElementById('btn-action-fail');
    if (btnFail) {
      btnFail.addEventListener('click', () => handleTurnAction('fail'));
    }

    const btnSkip = document.getElementById('btn-action-skip');
    if (btnSkip) {
      btnSkip.addEventListener('click', () => handleTurnAction('skip'));
    }

    // Botón siguiente turno desde resumen
    const btnNextTurn = document.getElementById('btn-next-turn');
    if (btnNextTurn) {
      btnNextTurn.addEventListener('click', () => {
        initAudio();
        prepareNextTurn();
      });
    }

    // Botón revancha en podio
    const btnRematch = document.getElementById('btn-rematch');
    if (btnRematch) {
      btnRematch.addEventListener('click', () => {
        initAudio();
        resetToSetup();
      });
    }
  }

  // ==================== CREAR MAZO & MEZCLAR ====================
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildDeck() {
    if (typeof CENSURADO_TARJETAS === 'undefined') return [];
    const filtered = CENSURADO_TARJETAS.filter(card => state.selectedCategories.has(card.categoria));
    return shuffleArray(filtered);
  }

  function getNextCard() {
    if (state.deck.length === 0) {
      state.deck = buildDeck();
      state.deckIndex = 0;
    }
    if (state.deckIndex >= state.deck.length) {
      // Barajar de nuevo si se agotan
      state.deck = shuffleArray(state.deck);
      state.deckIndex = 0;
    }
    const card = state.deck[state.deckIndex];
    state.deckIndex++;
    return card;
  }

  // ==================== INICIO DE PARTIDA ====================
  function startNewGame() {
    // 1. Guardar equipos con nombres de los inputs
    state.teams = [];
    for (let i = 0; i < state.teamCount; i++) {
      const input = document.getElementById(`team-input-${i}`);
      const name = (input && input.value.trim()) ? input.value.trim() : DEFAULT_TEAMS[i].name;
      state.teams.push({
        id: DEFAULT_TEAMS[i].id,
        name: name,
        color: DEFAULT_TEAMS[i].color,
        avatar: DEFAULT_TEAMS[i].avatar,
        score: 0
      });
    }

    // 2. Preparar mazo
    state.deck = buildDeck();
    state.deckIndex = 0;
    state.activeTeamIndex = 0;
    state.turnsPlayedInRound = 0;

    if (state.deck.length === 0) {
      alert('Por favor selecciona al menos una categoría con tarjetas.');
      return;
    }

    // Analytics
    if (window.gtag) {
      gtag('event', 'game_start', {
        event_category: 'Censurado',
        event_label: `Equipos: ${state.teamCount}, Meta: ${state.targetScore}`
      });
    }

    // Ir a pantalla de pase del primer equipo
    showPassScreen();
  }

  function resetToSetup() {
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;
    showScreen('setup');
  }

  // ==================== PANTALLA DE PASE ====================
  function showPassScreen() {
    const activeTeam = state.teams[state.activeTeamIndex];
    const passAvatar = document.getElementById('pass-team-avatar');
    const passName = document.getElementById('pass-team-name');
    const passPill = document.getElementById('pass-team-pill');

    if (passAvatar) passAvatar.textContent = activeTeam.avatar;
    if (passName) passName.textContent = activeTeam.name;
    if (passPill) {
      passPill.style.borderColor = activeTeam.color;
      passPill.style.color = activeTeam.color;
    }

    showScreen('pass');
  }

  // ==================== INICIO DEL TURNO ACTIVO ====================
  function startTurn() {
    const activeTeam = state.teams[state.activeTeamIndex];

    // Reiniciar estadísticas del turno
    state.turnStats = { correct: 0, fails: 0, net: 0 };
    state.timeLeft = state.turnTime;

    // Actualizar badges superiores de juego
    const dot = document.getElementById('active-team-color-dot');
    const nameLabel = document.getElementById('active-team-name-label');
    const turnScoreText = document.getElementById('turn-score-text');

    if (dot) dot.style.background = activeTeam.color;
    if (nameLabel) nameLabel.textContent = activeTeam.name;
    if (turnScoreText) {
      turnScoreText.textContent = '+0';
      turnScoreText.style.color = '#34d399';
    }

    // Renderizar primera tarjeta
    renderCard(getNextCard());

    // Mostrar pantalla de juego
    showScreen('game');

    // Iniciar reloj
    startTimer();
  }

  function renderCard(card) {
    if (!card) return;
    state.currentCard = card;

    const catMeta = (typeof CENSURADO_CATEGORIAS !== 'undefined' && CENSURADO_CATEGORIAS[card.categoria]) 
      ? CENSURADO_CATEGORIAS[card.categoria] 
      : { icono: '🏷️', nombre: 'General', color: '#fbbf24' };

    const tagIcon = document.getElementById('card-category-icon');
    const tagName = document.getElementById('card-category-name');
    const targetWord = document.getElementById('target-word-display');
    const forbiddenList = document.getElementById('forbidden-words-list');

    if (tagIcon) tagIcon.textContent = catMeta.icono;
    if (tagName) tagName.textContent = catMeta.nombre;
    if (targetWord) targetWord.textContent = card.palabra;

    if (forbiddenList) {
      forbiddenList.innerHTML = '';
      card.prohibidas.forEach(word => {
        const item = document.createElement('div');
        item.className = 'cs-forbidden-item';
        item.innerHTML = `<span>${word}</span> <span>🚫</span>`;
        forbiddenList.appendChild(item);
      });
    }

    // Efecto de entrada sutil
    const heroCard = document.querySelector('.cs-hero-card');
    if (heroCard) {
      heroCard.style.animation = 'none';
      heroCard.offsetHeight; // forzar reflow
      heroCard.style.animation = 'fadeIn 0.2s ease';
    }
  }

  // ==================== TEMPORIZADOR ====================
  function startTimer() {
    if (state.timerId) clearInterval(state.timerId);

    const timerDisplay = document.getElementById('timer-display');
    const timerFill = document.getElementById('timer-fill');

    function updateTimerUI() {
      if (timerDisplay) {
        timerDisplay.textContent = state.timeLeft;
        if (state.timeLeft <= 10) {
          timerDisplay.classList.add('urgent');
        } else {
          timerDisplay.classList.remove('urgent');
        }
      }

      if (timerFill) {
        const pct = Math.max(0, Math.min(100, (state.timeLeft / state.turnTime) * 100));
        timerFill.style.width = `${pct}%`;
        if (state.timeLeft <= 10) {
          timerFill.style.background = '#ef4444';
        } else if (state.timeLeft <= 20) {
          timerFill.style.background = '#f59e0b';
        } else {
          timerFill.style.background = 'linear-gradient(90deg, #10b981 0%, #f59e0b 60%, #ef4444 100%)';
        }
      }
    }

    updateTimerUI();

    state.timerId = setInterval(() => {
      state.timeLeft--;
      updateTimerUI();

      if (state.timeLeft <= 10 && state.timeLeft > 0) {
        playTickSound(true);
      } else if (state.timeLeft > 10) {
        // Tick discreto en segundos pares
        if (state.timeLeft % 5 === 0) playTickSound(false);
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timerId);
        state.timerId = null;
        endTurn();
      }
    }, 1000);
  }

  // ==================== ACCIONES DEL TURNO ====================
  function handleTurnAction(type) {
    if (state.timeLeft <= 0) return;

    const turnScoreText = document.getElementById('turn-score-text');

    if (type === 'success') {
      playSuccessSound();
      state.turnStats.correct++;
      state.turnStats.net++;
      state.teams[state.activeTeamIndex].score = Math.max(0, state.teams[state.activeTeamIndex].score + 1);
    } else if (type === 'fail') {
      playFailSound();
      state.turnStats.fails++;
      state.turnStats.net--;
      state.teams[state.activeTeamIndex].score = Math.max(0, state.teams[state.activeTeamIndex].score - 1);
      
      // Flash de advertencia en pantalla
      const hero = document.querySelector('.cs-hero-card');
      if (hero) {
        hero.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.8)';
        setTimeout(() => {
          hero.style.boxShadow = '';
        }, 300);
      }
    } else if (type === 'skip') {
      playSkipSound();
    }

    // Actualizar contador del turno
    if (turnScoreText) {
      const net = state.turnStats.net;
      turnScoreText.textContent = net >= 0 ? `+${net}` : `${net}`;
      turnScoreText.style.color = net >= 0 ? '#34d399' : '#f87171';
    }

    // Cargar siguiente tarjeta
    renderCard(getNextCard());
  }

  // ==================== FIN DEL TURNO & RESUMEN ====================
  function endTurn() {
    playTimesUpSound();

    if (navigator.vibrate) {
      try { navigator.vibrate([200, 100, 200]); } catch (e) {}
    }

    const activeTeam = state.teams[state.activeTeamIndex];
    state.turnsPlayedInRound++;

    // Actualizar pantalla de resumen
    const summaryTitle = document.getElementById('summary-team-title');
    const statCorrect = document.getElementById('summary-stat-correct');
    const statFails = document.getElementById('summary-stat-fails');
    const statNet = document.getElementById('summary-stat-net');

    if (summaryTitle) {
      summaryTitle.innerHTML = `<span style="color: ${activeTeam.color};">${activeTeam.avatar} ${activeTeam.name}</span>`;
    }
    if (statCorrect) statCorrect.textContent = state.turnStats.correct;
    if (statFails) statFails.textContent = state.turnStats.fails;
    if (statNet) {
      const net = state.turnStats.net;
      statNet.textContent = net >= 0 ? `+${net}` : `${net}`;
      statNet.style.color = net >= 0 ? 'var(--gold-light)' : '#f87171';
    }

    // Renderizar tabla general de posiciones
    renderLeaderboard('summary-leaderboard-list');

    // Verificar si se ha alcanzado la meta de victoria
    const isRoundComplete = (state.turnsPlayedInRound % state.teams.length === 0);
    const leadingScore = Math.max(...state.teams.map(t => t.score));

    // Si completamos una ronda entera y alguien alcanzó o superó la meta
    if (isRoundComplete && leadingScore >= state.targetScore) {
      // Comprobar si hay un único líder o desempate
      const contenders = state.teams.filter(t => t.score === leadingScore);
      if (contenders.length === 1) {
        // Hay un ganador definitivo
        setTimeout(() => {
          showPodiumScreen(contenders[0]);
        }, 1200);
        return;
      }
    }

    // Siguiente equipo
    const nextTeamIndex = (state.activeTeamIndex + 1) % state.teams.length;
    const nextTeam = state.teams[nextTeamIndex];
    const nextTeamNameSpan = document.getElementById('summary-next-team-name');
    if (nextTeamNameSpan) {
      nextTeamNameSpan.textContent = nextTeam.name;
      nextTeamNameSpan.style.color = nextTeam.color;
    }

    showScreen('summary');
  }

  function renderLeaderboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    // Clonar y ordenar por puntaje descendente
    const sorted = [...state.teams].sort((a, b) => b.score - a.score);

    sorted.forEach((team, idx) => {
      const row = document.createElement('div');
      const isActive = (team.id === state.teams[state.activeTeamIndex].id);
      row.className = `cs-leaderboard-row ${isActive ? 'active' : ''}`;

      const medals = ['🥇', '🥈', '🥉', '4️⃣'];
      const medal = medals[idx] || `${idx + 1}º`;

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.1rem;">${medal}</span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: ${team.color}; display: inline-block;"></span>
          <strong style="color: ${isActive ? 'var(--gold-light)' : '#fff'};">${team.name}</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <strong style="font-size: 1.1rem; color: var(--gold);">${team.score}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">pts</span>
        </div>
      `;
      container.appendChild(row);
    });
  }

  function prepareNextTurn() {
    state.activeTeamIndex = (state.activeTeamIndex + 1) % state.teams.length;
    showPassScreen();
  }

  // ==================== PODIO & VICTORIA ====================
  function showPodiumScreen(winner) {
    playVictoryFanfare();

    const winnerAvatar = document.getElementById('podium-winner-avatar');
    const winnerName = document.getElementById('podium-winner-name');

    if (winnerAvatar) winnerAvatar.textContent = winner.avatar;
    if (winnerName) {
      winnerName.textContent = winner.name;
      winnerName.style.color = winner.color;
    }

    renderLeaderboard('final-leaderboard-list');
    showScreen('podium');

    // Confetti si está disponible o fireworks
    if (window.gtag) {
      gtag('event', 'game_finish', {
        event_category: 'Censurado',
        event_label: `Ganador: ${winner.name}, Puntos: ${winner.score}`
      });
    }
  }

  // ==================== PAUSA & SALIDA ====================
  function pauseGame() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
      state.isPaused = true;
    }
  }

  function resumeGame() {
    if (typeof closeExitModal === 'function') closeExitModal();
    const gameScreen = document.getElementById('game-screen');
    const isGameActive = gameScreen && !gameScreen.classList.contains('hidden');
    if (isGameActive && state.timeLeft > 0) {
      state.isPaused = false;
      startTimer();
    }
  }

  function handleExitToSetup() {
    if (typeof closeExitModal === 'function') closeExitModal();
    resetToSetup();
  }

  window.censuradoGame = {
    pauseGame,
    resumeGame,
    resetToSetup: handleExitToSetup
  };
  window.resumeGameFromExitModal = resumeGame;
  window.restartToSetupFromExitModal = handleExitToSetup;

  // ==================== INICIALIZACIÓN ====================
  document.addEventListener('DOMContentLoaded', () => {
    initCategoriesUI();
    renderTeamInputs();
    initSetupEvents();

    // Eventos del modal de salida
    const btnExitResume = document.getElementById('btn-exit-resume');
    if (btnExitResume) btnExitResume.addEventListener('click', resumeGame);

    const btnExitRestart = document.getElementById('btn-exit-restart');
    if (btnExitRestart) btnExitRestart.addEventListener('click', handleExitToSetup);
  });

})();
