/**
 * TICTACBOOM.JS
 * Lógica oficial del juego "Tic-Tac Boom" (Juegos Stahlgraf).
 * Pasa la bomba con sílabas, categorías y temporizador aleatorio impredecible.
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 */

(function () {
  'use strict';

  // ==================== ESTADO DEL JUEGO ====================
  const PLAYER_AVATARS = ['🔥', '⚡', '💥', '💣', '🧨', '🚀', '🎯', '🦊', '🐯', '🦁', '🐻', '🐼'];

  const state = {
    mode: 'silabas',       // 'silabas' | 'categorias' | 'mixto'
    durationProfile: 'normal', // 'fast' | 'normal' | 'slow'
    livesPerPlayer: 3,
    players: [],
    round: 1,
    currentChallenge: null,
    activePlayerIndex: 0,
    isBombActive: false,
    bombTotalDuration: 0,
    bombStartTime: 0,
    timerTimeoutId: null,
    tickIntervalId: null,
    isTock: false
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

  function playTickSound(isTock = false) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTock ? 620 : 840, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  function playPassSound() {
    initAudio();
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {}
  }

  function playExplosionSound() {
    initAudio();
    if (!audioCtx) return;
    try {
      // 1. Ruido blanco explosivo
      const bufferSize = audioCtx.sampleRate * 1.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 1.2);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.6, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start();

      // 2. Sub-bajo contundente
      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(140, audioCtx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.9);
      subGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.9);
      subOsc.connect(subGain);
      subGain.connect(audioCtx.destination);
      subOsc.start();
      subOsc.stop(audioCtx.currentTime + 0.9);
    } catch (e) {}
  }

  function playVictorySound() {
    initAudio();
    if (!audioCtx) return;
    const chords = [
      { f: 523.25, d: 0.15, delay: 0 },
      { f: 659.25, d: 0.15, delay: 140 },
      { f: 783.99, d: 0.15, delay: 280 },
      { f: 1046.50, d: 0.6, delay: 420 }
    ];
    chords.forEach(c => {
      setTimeout(() => {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(c.f, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + c.d);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + c.d);
        } catch (e) {}
      }, c.delay);
    });
  }

  // ==================== PANTALLAS ====================
  const screens = {
    setup: document.getElementById('setup-screen'),
    game: document.getElementById('game-screen'),
    explosion: document.getElementById('explosion-screen'),
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

  // ==================== CONFIGURACIÓN DE JUGADORES ====================
  function initDefaultPlayers() {
    state.players = [
      { id: 1, name: 'Jugador 1', avatar: '🔥', lives: 3, alive: true },
      { id: 2, name: 'Jugador 2', avatar: '⚡', lives: 3, alive: true },
      { id: 3, name: 'Jugador 3', avatar: '💥', lives: 3, alive: true },
      { id: 4, name: 'Jugador 4', avatar: '💣', lives: 3, alive: true }
    ];
  }

  function renderPlayersInputs() {
    const container = document.getElementById('players-list-container');
    const countBadge = document.getElementById('player-count-badge');
    if (!container) return;

    container.innerHTML = '';
    if (countBadge) countBadge.textContent = `${state.players.length} Jugadores`;

    state.players.forEach((p, index) => {
      const row = document.createElement('div');
      row.className = 'tb-player-row';
      row.innerHTML = `
        <span class="tb-player-avatar">${p.avatar}</span>
        <input type="text" class="tb-player-input" id="player-input-${index}" value="${p.name}" maxlength="18" placeholder="Nombre jugador ${index + 1}">
        ${state.players.length > 2 ? `<button type="button" class="tb-btn-del-player" data-idx="${index}" title="Eliminar jugador">✕</button>` : ''}
      `;
      container.appendChild(row);

      // Evento de cambio de nombre
      const input = row.querySelector('.tb-player-input');
      if (input) {
        input.addEventListener('input', (e) => {
          state.players[index].name = e.target.value.trim() || `Jugador ${index + 1}`;
        });
      }

      // Evento de eliminar jugador
      const btnDel = row.querySelector('.tb-btn-del-player');
      if (btnDel) {
        btnDel.addEventListener('click', () => {
          initAudio();
          if (state.players.length > 2) {
            state.players.splice(index, 1);
            renderPlayersInputs();
          }
        });
      }
    });
  }

  function addNewPlayer() {
    if (state.players.length >= 12) {
      alert('Máximo 12 jugadores permitidos.');
      return;
    }
    const nextIdx = state.players.length;
    const avatar = PLAYER_AVATARS[nextIdx % PLAYER_AVATARS.length];
    state.players.push({
      id: Date.now() + nextIdx,
      name: `Jugador ${nextIdx + 1}`,
      avatar: avatar,
      lives: state.livesPerPlayer,
      alive: true
    });
    renderPlayersInputs();
  }

  function initSetupEvents() {
    // Selector de modo
    const modeButtons = document.querySelectorAll('#mode-selector .tb-pill-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
      });
    });

    // Selector de duración
    const durationButtons = document.querySelectorAll('#duration-selector .tb-pill-btn');
    durationButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        durationButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.durationProfile = btn.dataset.duration;
      });
    });

    // Selector de vidas
    const livesButtons = document.querySelectorAll('#lives-selector .tb-pill-btn');
    livesButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        livesButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.livesPerPlayer = parseInt(btn.dataset.lives, 10);
      });
    });

    // Botón agregar jugador
    const btnAdd = document.getElementById('btn-add-player');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        initAudio();
        addNewPlayer();
      });
    }

    // Botón comenzar partida
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        initAudio();
        startNewGame();
      });
    }

    // Botón pasar bomba
    const btnPass = document.getElementById('btn-pass-bomb');
    if (btnPass) {
      btnPass.addEventListener('click', () => {
        passBombToNextPlayer();
      });
    }

    // Botón siguiente ronda
    const btnNextRound = document.getElementById('btn-next-round');
    if (btnNextRound) {
      btnNextRound.addEventListener('click', () => {
        initAudio();
        startNextRound();
      });
    }

    // Botón revancha
    const btnRematch = document.getElementById('btn-rematch');
    if (btnRematch) {
      btnRematch.addEventListener('click', () => {
        initAudio();
        resetToSetup();
      });
    }
  }

  // ==================== INICIO DE PARTIDA ====================
  function startNewGame() {
    // 1. Guardar nombres actualizados y restablecer vidas
    state.players.forEach((p, idx) => {
      const input = document.getElementById(`player-input-${idx}`);
      if (input && input.value.trim()) {
        p.name = input.value.trim();
      }
      p.lives = state.livesPerPlayer;
      p.alive = true;
    });

    state.round = 1;
    state.activePlayerIndex = 0;

    // Analytics
    if (window.gtag) {
      gtag('event', 'game_start', {
        event_category: 'TicTacBoom',
        event_label: `Modo: ${state.mode}, Jugadores: ${state.players.length}, Vidas: ${state.livesPerPlayer}`
      });
    }

    startRound();
  }

  function resetToSetup() {
    stopBombTimer();
    showScreen('setup');
  }

  // ==================== GENERADOR DE DESAFÍO ====================
  function generateChallenge() {
    let chosenMode = state.mode;
    if (chosenMode === 'mixto') {
      chosenMode = Math.random() < 0.5 ? 'silabas' : 'categorias';
    }

    if (chosenMode === 'silabas') {
      const silaba = TICTACBOOM_SILABAS[Math.floor(Math.random() * TICTACBOOM_SILABAS.length)];
      const reglasKeys = Object.keys(TICTACBOOM_REGLAS_DADO);
      const reglaKey = reglasKeys[Math.floor(Math.random() * reglasKeys.length)];
      const regla = TICTACBOOM_REGLAS_DADO[reglaKey];

      return {
        tipo: 'silaba',
        diceName: regla.nombre,        // "TIC", "TIC-TAC", "BOOM"
        badgeText: regla.badge,        // "🚫 NO AL INICIO", "🔄 CUALQUIER LUGAR", "🚫 NO AL FINAL"
        reglaColor: regla.color,
        reglaResumen: regla.reglaResumen,
        mainText: silaba,
        desc: `${regla.descripcion} (${regla.ejemplo})`
      };
    } else {
      const cat = TICTACBOOM_CATEGORIAS[Math.floor(Math.random() * TICTACBOOM_CATEGORIAS.length)];
      return {
        tipo: 'categoria',
        diceName: 'FIESTA',
        badgeText: `${cat.icono} CATEGORÍA DE FIESTA`,
        reglaColor: '#f97316',
        reglaResumen: 'Cualquier respuesta válida para esta consigna',
        mainText: cat.titulo,
        desc: 'Nombra un elemento válido que pertenezca a esta categoría y pasa la bomba.'
      };
    }
  }

  // ==================== CÁLCULO DE DURACIÓN DE BOMBA ====================
  function calculateBombDuration() {
    let min = 15;
    let max = 45;

    if (state.durationProfile === 'fast') {
      min = 10;
      max = 25;
    } else if (state.durationProfile === 'slow') {
      min = 25;
      max = 60;
    }

    // Tiempo aleatorio secreto en segundos
    const seconds = Math.floor(Math.random() * (max - min + 1)) + min;
    return seconds * 1000;
  }

  // ==================== INICIO DE RONDA ====================
  function startRound() {
    state.isBombActive = true;
    state.currentChallenge = generateChallenge();
    state.bombTotalDuration = calculateBombDuration();
    state.bombStartTime = Date.now();

    // Actualizar UI del desafío
    const roundBadge = document.getElementById('round-badge');
    const aliveCountSpan = document.getElementById('alive-players-count');
    const diceBadge = document.getElementById('challenge-dice-badge');
    const diceName = document.getElementById('challenge-dice-name');
    const ruleBadge = document.getElementById('challenge-rule-badge');
    const ruleBadgeText = document.getElementById('challenge-rule-badge-text');
    const positionTip = document.getElementById('challenge-position-tip');
    const positionText = document.getElementById('challenge-position-text');
    const mainText = document.getElementById('challenge-main-text');
    const descText = document.getElementById('challenge-desc');
    const bombGraphic = document.getElementById('bomb-graphic');

    if (roundBadge) roundBadge.textContent = `RONDA ${state.round}`;
    if (aliveCountSpan) {
      const aliveCount = state.players.filter(p => p.alive).length;
      aliveCountSpan.textContent = aliveCount;
    }
    if (mainText) mainText.textContent = state.currentChallenge.mainText;
    if (descText) descText.textContent = state.currentChallenge.desc;
    if (bombGraphic) bombGraphic.classList.remove('urgent');

    if (state.currentChallenge.tipo === 'silaba') {
      if (diceBadge) diceBadge.style.display = 'inline-flex';
      if (diceName) diceName.textContent = state.currentChallenge.diceName;
      if (ruleBadge) {
        ruleBadge.style.display = 'inline-flex';
        ruleBadge.style.borderColor = state.currentChallenge.reglaColor;
        ruleBadge.style.color = state.currentChallenge.reglaColor;
        ruleBadge.style.boxShadow = `0 0 16px ${state.currentChallenge.reglaColor}55`;
      }
      if (ruleBadgeText) ruleBadgeText.textContent = state.currentChallenge.badgeText;
      if (positionTip) positionTip.style.display = 'inline-flex';
      if (positionText) positionText.textContent = state.currentChallenge.reglaResumen;
    } else {
      if (diceBadge) diceBadge.style.display = 'none';
      if (ruleBadge) {
        ruleBadge.style.display = 'inline-flex';
        ruleBadge.style.borderColor = '#f97316';
        ruleBadge.style.color = '#fdba74';
        ruleBadge.style.boxShadow = '0 0 16px rgba(249, 115, 22, 0.35)';
      }
      if (ruleBadgeText) ruleBadgeText.textContent = state.currentChallenge.badgeText;
      if (positionTip) positionTip.style.display = 'none';
    }

    // Asegurarse de que el jugador activo esté vivo
    if (!state.players[state.activePlayerIndex].alive) {
      advanceToNextAlivePlayer();
    }
    updateCurrentPlayerUI();

    showScreen('game');

    // Iniciar el tic-tac dinámico
    startBombTickEngine();
  }

  function updateCurrentPlayerUI() {
    const player = state.players[state.activePlayerIndex];
    const avatar = document.getElementById('current-player-avatar');
    const name = document.getElementById('current-player-name');

    if (avatar) avatar.textContent = player.avatar;
    if (name) name.textContent = player.name;

    const pill = document.getElementById('current-player-pill');
    if (pill) {
      pill.style.animation = 'none';
      pill.offsetHeight; // reflow
      pill.style.animation = 'fadeIn 0.2s ease';
    }
  }

  function advanceToNextAlivePlayer() {
    let nextIdx = (state.activePlayerIndex + 1) % state.players.length;
    let attempts = 0;
    while (!state.players[nextIdx].alive && attempts < state.players.length) {
      nextIdx = (nextIdx + 1) % state.players.length;
      attempts++;
    }
    state.activePlayerIndex = nextIdx;
  }

  function passBombToNextPlayer() {
    if (!state.isBombActive) return;
    playPassSound();
    advanceToNextAlivePlayer();
    updateCurrentPlayerUI();
  }

  function clearBombTimers() {
    if (state.timerTimeoutId) clearTimeout(state.timerTimeoutId);
    if (state.tickIntervalId) clearInterval(state.tickIntervalId);
    state.timerTimeoutId = null;
    state.tickIntervalId = null;
  }

  // ==================== MOTOR DE TIC-TAC Y EXPLOSIÓN ====================
  function startBombTickEngine() {
    clearBombTimers();
    state.isBombActive = true;

    function scheduleNextTick() {
      if (!state.isBombActive) return;

      const elapsed = Date.now() - state.bombStartTime;
      const progress = elapsed / state.bombTotalDuration;

      // ¿Ha llegado el momento de la explosión?
      if (progress >= 1.0) {
        triggerExplosion();
        return;
      }

      // Sonido de tic o tock
      state.isTock = !state.isTock;
      playTickSound(state.isTock);

      // Calcular intervalo según el progreso
      let nextInterval = 800; // Calma inicial
      const bombGraphic = document.getElementById('bomb-graphic');

      if (progress >= 0.85) {
        nextInterval = 120; // Pánico total
        if (bombGraphic) bombGraphic.classList.add('urgent');
      } else if (progress >= 0.70) {
        nextInterval = 250; // Gran aceleración
        if (bombGraphic) bombGraphic.classList.add('urgent');
      } else if (progress >= 0.50) {
        nextInterval = 450; // Nervios
        if (bombGraphic) bombGraphic.classList.remove('urgent');
      } else if (progress >= 0.30) {
        nextInterval = 650;
        if (bombGraphic) bombGraphic.classList.remove('urgent');
      }

      state.timerTimeoutId = setTimeout(scheduleNextTick, nextInterval);
    }

    scheduleNextTick();
  }

  function stopBombTimer() {
    state.isBombActive = false;
    clearBombTimers();
  }

  // ==================== EXPLOSIÓN ====================
  function triggerExplosion() {
    stopBombTimer();
    playExplosionSound();

    if (navigator.vibrate) {
      try { navigator.vibrate([300, 100, 400]); } catch (e) {}
    }

    const victim = state.players[state.activePlayerIndex];
    const prevLives = victim.lives;
    victim.lives = Math.max(0, victim.lives - 1);
    if (victim.lives <= 0) {
      victim.alive = false;
    }

    // Actualizar pantalla de explosión
    const victimName = document.getElementById('victim-name');
    const victimChange = document.getElementById('victim-life-change');
    const victimMsg = document.getElementById('victim-status-msg');

    if (victimName) {
      victimName.innerHTML = `${victim.avatar} ${victim.name}`;
    }

    if (victimChange) {
      const renderHearts = (count) => '❤️'.repeat(count) || '💔';
      victimChange.innerHTML = `${renderHearts(prevLives)} ➔ ${renderHearts(victim.lives)} <span style="font-size: 0.9rem; color: #fca5a5;">(-1 Vida)</span>`;
    }

    if (victimMsg) {
      if (victim.alive) {
        victimMsg.innerHTML = `¡Aún sigues con vida con <strong>${victim.lives} ${victim.lives === 1 ? 'vida' : 'vidas'}</strong>!`;
        victimMsg.style.color = '#fde047';
      } else {
        victimMsg.innerHTML = `💀 <strong>¡HAS SIDO ELIMINADO DE LA PARTIDA!</strong>`;
        victimMsg.style.color = '#ef4444';
      }
    }

    renderPlayersStatusList('round-players-status-list');

    // Verificar si queda solo un sobreviviente
    const alivePlayers = state.players.filter(p => p.alive);
    const btnNext = document.getElementById('btn-next-round');

    if (alivePlayers.length <= 1) {
      if (btnNext) {
        btnNext.innerHTML = `<span>👑 ¡Ver Campeón Final!</span>`;
      }
    } else {
      if (btnNext) {
        btnNext.innerHTML = `<span>💣 ¡Siguiente Ronda!</span>`;
      }
    }

    showScreen('explosion');
  }

  function renderPlayersStatusList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    state.players.forEach(p => {
      const row = document.createElement('div');
      row.className = `tb-player-status-row ${!p.alive ? 'eliminated' : ''}`;
      
      const hearts = p.alive 
        ? '❤️'.repeat(p.lives) + '🖤'.repeat(state.livesPerPlayer - p.lives)
        : '💀 ELIMINADO';

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.1rem;">${p.avatar}</span>
          <strong style="color: ${p.alive ? '#fff' : '#78716c'};">${p.name}</strong>
        </div>
        <div style="font-size: 0.95rem; font-weight: 800; letter-spacing: 1px;">
          ${hearts}
        </div>
      `;
      container.appendChild(row);
    });
  }

  function startNextRound() {
    const alivePlayers = state.players.filter(p => p.alive);
    if (alivePlayers.length <= 1) {
      // Fin del juego: Podio
      showPodium(alivePlayers[0] || state.players[0]);
    } else {
      // Incrementar ronda y seguir
      state.round++;
      // La bomba arranca con la víctima si sigue viva, o con el siguiente vivo
      if (!state.players[state.activePlayerIndex].alive) {
        advanceToNextAlivePlayer();
      }
      startRound();
    }
  }

  // ==================== PODIO FINAL ====================
  function showPodium(winner) {
    playVictorySound();

    const winnerName = document.getElementById('podium-winner-name');
    if (winnerName) {
      winnerName.innerHTML = `${winner.avatar} ${winner.name}`;
      winnerName.style.color = '#fdba74';
    }

    renderPlayersStatusList('final-players-status-list');
    showScreen('podium');

    if (window.gtag) {
      gtag('event', 'game_finish', {
        event_category: 'TicTacBoom',
        event_label: `Ganador: ${winner.name}, Rondas: ${state.round}`
      });
    }
  }

  // ==================== PAUSA & SALIDA ====================
  function pauseGame() {
    if (state.isBombActive) {
      state.pausedElapsed = Date.now() - state.bombStartTime;
      clearBombTimers();
      state.isPaused = true;
    }
  }

  function resumeGame() {
    if (typeof closeExitModal === 'function') closeExitModal();
    const gameScreen = document.getElementById('game-screen');
    const isGameActive = gameScreen && !gameScreen.classList.contains('hidden');
    if (isGameActive && state.isPaused) {
      state.bombStartTime = Date.now() - (state.pausedElapsed || 0);
      state.isPaused = false;
      startBombTickEngine();
    }
  }

  function handleExitToSetup() {
    if (typeof closeExitModal === 'function') closeExitModal();
    stopBombTimer();
    showScreen('setup');
  }

  window.tictacBoomGame = {
    pauseGame,
    resumeGame,
    resetToSetup: handleExitToSetup
  };
  window.resumeGameFromExitModal = resumeGame;
  window.restartToSetupFromExitModal = handleExitToSetup;

  // ==================== INICIALIZACIÓN ====================
  document.addEventListener('DOMContentLoaded', () => {
    initDefaultPlayers();
    renderPlayersInputs();
    initSetupEvents();

    // Eventos del modal de salida
    const btnExitResume = document.getElementById('btn-exit-resume');
    if (btnExitResume) btnExitResume.addEventListener('click', resumeGame);

    const btnExitRestart = document.getElementById('btn-exit-restart');
    if (btnExitRestart) btnExitRestart.addEventListener('click', handleExitToSetup);
  });

})();
