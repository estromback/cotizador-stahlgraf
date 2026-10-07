/**
 * LÓGICA OFICIAL: ¿QUIÉN SOY? - JUEGOS STAHLGRAF
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * =============================================
 * Modo A: Adivinanza en la frente / contrarreloj con pantalla limpia.
 * Modos de Victoria:
 * - Carrera de Aciertos (Meta de puntos para ganar)
 * - Modo Muerte (Vidas / Eliminación si no adivinas cierta cantidad de veces)
 * - Rondas Libres (Sin límite fijo)
 */

const AVATARS = ['🦁', '🐯', '🐼', '🦊', '🐨', '🐵', '🦄', '🦅'];

// ==================== GESTOR DE SONIDO (WEB AUDIO API) ====================
const soundManager = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  playTick() {
    this.playTone(850, 'triangle', 0.05, 0.1);
  },

  playAlarm() {
    this.playTone(400, 'sawtooth', 0.25, 0.25);
    setTimeout(() => this.playTone(320, 'sawtooth', 0.35, 0.25), 260);
  },

  playSuccess() {
    this.playTone(523.25, 'triangle', 0.12, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.25), 110); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.28, 0.3), 230); // G5
  },

  playFail() {
    this.playTone(280, 'sawtooth', 0.18, 0.2);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.28, 0.2), 160);
  },

  playVictory() {
    this.playTone(523.25, 'triangle', 0.15, 0.25);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.25), 130);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.2, 0.3), 260);
    setTimeout(() => this.playTone(1046.50, 'triangle', 0.45, 0.35), 420);
  }
};

// ==================== ESTADO DEL JUEGO ====================
const gameState = {
  timeLimit: 60,
  winMode: 'race',         // 'race' | 'survival' | 'free'
  targetScore: 5,          // Meta de aciertos para modo carrera
  maxLives: 3,             // Vidas para modo muerte
  selectedCategories: ['chile', 'cine', 'infantil', 'historia', 'musica', 'deportes'],
  playersCount: 4,
  players: [],
  activePlayerIndex: 0,
  currentChar: null,
  usedCharNames: new Set(),
  timerRemaining: 60,
  timerInterval: null,
  isGuessingActive: false,
  isMatchOver: false,
  winnerPlayer: null
};

const STORAGE_KEY = 'quiensoy_session_v2';

// ==================== ELEMENTOS DEL DOM ====================
let DOM = {};

function initDOM() {
  DOM = {
    setupScreen: document.getElementById('setup-screen'),
    prepScreen: document.getElementById('prep-screen'),
    gameActiveModal: document.getElementById('game-active-modal'),
    resultScreen: document.getElementById('result-screen'),
    podiumScreen: document.getElementById('podium-screen'),

    // Setup - Tiempo & Modo
    timeBtns: document.querySelectorAll('.qs-time-btn'),
    modeTabBtns: document.querySelectorAll('.qs-mode-tab-btn'),
    subconfigRace: document.getElementById('subconfig-race'),
    subconfigSurvival: document.getElementById('subconfig-survival'),
    raceTargetBtns: document.querySelectorAll('#subconfig-race .qs-sub-btn'),
    survivalLivesBtns: document.querySelectorAll('#subconfig-survival .qs-sub-btn'),

    // Setup - Categorías & Jugadores
    catsContainer: document.getElementById('cats-container'),
    btnToggleAllCats: document.getElementById('btn-toggle-all-cats'),
    playerCountBtns: document.querySelectorAll('#player-count-selector .qs-count-btn'),
    playersInputsList: document.getElementById('players-inputs-list'),
    btnStartGame: document.getElementById('btn-start-game'),

    // Prep
    prepPlayerAvatar: document.getElementById('prep-player-avatar'),
    prepPlayerName: document.getElementById('prep-player-name'),
    prepPlayerStatus: document.getElementById('prep-player-status'),
    btnReadyToGuess: document.getElementById('btn-ready-to-guess'),

    // Game Activo
    activePlayerAvatar: document.getElementById('active-player-avatar'),
    activePlayerName: document.getElementById('active-player-name'),
    activePlayerStatus: document.getElementById('active-player-status'),
    activeCatIcon: document.getElementById('active-cat-icon'),
    activeCatName: document.getElementById('active-cat-name'),
    characterNameDisplay: document.getElementById('character-name-display'),
    timerDisplay: document.getElementById('timer-display'),
    timerBarFill: document.getElementById('timer-bar-fill'),

    // Result
    matchOverAlert: document.getElementById('match-over-alert'),
    matchOverTitle: document.getElementById('match-over-title'),
    matchOverDesc: document.getElementById('match-over-desc'),
    resultPlayerName: document.getElementById('result-player-name'),
    resultCharName: document.getElementById('result-char-name'),
    btnRecordSuccess: document.getElementById('btn-record-success'),
    btnRecordFail: document.getElementById('btn-record-fail'),
    scoresLeaderboardList: document.getElementById('scores-leaderboard-list'),
    btnNextPlayer: document.getElementById('btn-next-player'),
    nextPlayerBtnLabel: document.getElementById('next-player-btn-label'),
    btnFinishGame: document.getElementById('btn-finish-game'),

    // Podium
    podiumWinnerAvatar: document.getElementById('podium-winner-avatar'),
    podiumWinnerTitle: document.getElementById('podium-winner-title'),
    podiumWinnerSub: document.getElementById('podium-winner-sub'),
    finalScoresList: document.getElementById('final-scores-list'),
    btnRematch: document.getElementById('btn-rematch')
  };
}

// ==================== INICIALIZACIÓN ====================
function initQuienSoyApp() {
  initDOM();
  renderCategoriesGrid();
  initDefaultPlayers();
  renderPlayersInputs();
  attachEventListeners();
  checkAndRestoreSession();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuienSoyApp);
} else {
  initQuienSoyApp();
}

function attachEventListeners() {
  // 1. Selector de Tiempo
  DOM.timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.timeLimit = parseInt(btn.dataset.time, 10);
      soundManager.playTone(480, 'sine', 0.08, 0.1);
    });
  });

  // 2. Selector de Modo de Juego (Carrera, Muerte, Libre)
  DOM.modeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.modeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.winMode = btn.dataset.mode;

      if (gameState.winMode === 'race') {
        DOM.subconfigRace.classList.remove('hidden');
        DOM.subconfigSurvival.classList.add('hidden');
      } else if (gameState.winMode === 'survival') {
        DOM.subconfigRace.classList.add('hidden');
        DOM.subconfigSurvival.classList.remove('hidden');
      } else {
        DOM.subconfigRace.classList.add('hidden');
        DOM.subconfigSurvival.classList.add('hidden');
      }
      soundManager.playTone(500, 'sine', 0.08, 0.1);
    });
  });

  // Subconfig Carrera: Meta de Aciertos
  DOM.raceTargetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.raceTargetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.targetScore = parseInt(btn.dataset.target, 10);
      soundManager.playTone(460, 'sine', 0.06, 0.1);
    });
  });

  // Subconfig Modo Muerte: Vidas Máximas
  DOM.survivalLivesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.survivalLivesBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.maxLives = parseInt(btn.dataset.lives, 10);
      soundManager.playTone(460, 'sine', 0.06, 0.1);
    });
  });

  // 3. Selector de cantidad de jugadores
  DOM.playerCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.playerCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const count = parseInt(btn.dataset.count, 10);
      gameState.playersCount = count;
      updatePlayersListCount(count);
      soundManager.playTone(440, 'sine', 0.08, 0.1);
    });
  });

  // Botón Seleccionar Todas las Categorías
  DOM.btnToggleAllCats.addEventListener('click', () => {
    const allKeys = Object.keys(QUIEN_SOY_CATEGORIES);
    if (gameState.selectedCategories.length === allKeys.length) {
      gameState.selectedCategories = ['chile'];
    } else {
      gameState.selectedCategories = [...allKeys];
    }
    renderCategoriesGrid();
    soundManager.playTone(520, 'triangle', 0.08, 0.1);
  });

  // Botón Comenzar Partida
  DOM.btnStartGame.addEventListener('click', () => {
    capturePlayersInputs();
    if (gameState.selectedCategories.length === 0) {
      gameState.selectedCategories = ['chile'];
    }
    soundManager.playSuccess();
    startMatch();
  });

  // Botón Listo para adivinar en Prep Screen
  DOM.btnReadyToGuess.addEventListener('click', () => {
    soundManager.playTone(600, 'triangle', 0.1, 0.15);
    launchActiveGuessing();
  });

  // Toque en pantalla durante el juego para detener el tiempo (adivinó o terminó)
  DOM.gameActiveModal.addEventListener('click', () => {
    if (gameState.isGuessingActive) {
      concludeGuessing();
    }
  });

  // Botón Registrar Acierto (+1 punto)
  DOM.btnRecordSuccess.addEventListener('click', () => {
    recordRoundResult(true);
  });

  // Botón Registrar Fallo (0 puntos / pierde vida)
  DOM.btnRecordFail.addEventListener('click', () => {
    recordRoundResult(false);
  });

  // Botón Siguiente Jugador
  DOM.btnNextPlayer.addEventListener('click', () => {
    if (gameState.isMatchOver) {
      showPodiumScreen();
    } else {
      advanceToNextPlayer();
    }
  });

  // Botón Terminar Partida y Ver Podio
  DOM.btnFinishGame.addEventListener('click', () => {
    showPodiumScreen();
  });

  // Botón Revancha
  DOM.btnRematch.addEventListener('click', () => {
    rematchGame();
  });

  // Modal de Reglas (¿Cómo Jugar?)
  const rulesModal = document.getElementById('rules-modal');
  const btnCloseRules = document.getElementById('btn-close-rules');
  const btnAckRules = document.getElementById('btn-ack-rules');

  const doOpenRules = () => {
    if (rulesModal) {
      rulesModal.classList.remove('hidden');
      rulesModal.style.setProperty('display', 'flex', 'important');
      document.body.style.overflow = 'hidden';
      soundManager.playTone(520, 'sine', 0.08, 0.15);
    }
  };

  const doCloseRules = () => {
    if (rulesModal) {
      rulesModal.classList.add('hidden');
      rulesModal.style.setProperty('display', 'none', 'important');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.btn-open-rules, #btn-top-rules, #btn-setup-rules').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      doOpenRules();
    });
  });

  if (btnCloseRules) {
    btnCloseRules.addEventListener('click', (e) => {
      e.preventDefault();
      doCloseRules();
    });
  }

  if (btnAckRules) {
    btnAckRules.addEventListener('click', (e) => {
      e.preventDefault();
      doCloseRules();
    });
  }

  if (rulesModal) {
    rulesModal.addEventListener('click', (e) => {
      if (e.target === rulesModal) {
        doCloseRules();
      }
    });
  }
}

// ==================== RENDERIZADO DE CONFIGURACIÓN ====================
function renderCategoriesGrid() {
  DOM.catsContainer.innerHTML = '';
  
  Object.keys(QUIEN_SOY_CATEGORIES).forEach(catKey => {
    const meta = QUIEN_SOY_CATEGORIES[catKey];
    const isSelected = gameState.selectedCategories.includes(catKey);
    const count = QUIEN_SOY_PERSONAJES.filter(p => p.categoria === catKey).length;

    const card = document.createElement('div');
    card.className = `qs-cat-card ${isSelected ? 'active' : ''}`;
    card.style.setProperty('--cat-color', meta.color);

    card.innerHTML = `
      <span class="qs-cat-icon">${meta.icon}</span>
      <div class="qs-cat-info">
        <span class="qs-cat-name">${meta.name}</span>
        <span class="qs-cat-count">${count} personajes</span>
      </div>
      <div class="qs-cat-check">✓</div>
    `;

    card.addEventListener('click', () => {
      if (gameState.selectedCategories.includes(catKey)) {
        if (gameState.selectedCategories.length > 1) {
          gameState.selectedCategories = gameState.selectedCategories.filter(k => k !== catKey);
        }
      } else {
        gameState.selectedCategories.push(catKey);
      }
      renderCategoriesGrid();
      soundManager.playTone(460, 'sine', 0.05, 0.1);
    });

    DOM.catsContainer.appendChild(card);
  });
}

function initDefaultPlayers() {
  gameState.players = [];
  for (let i = 0; i < 8; i++) {
    gameState.players.push({
      id: i,
      name: `Jugador ${i + 1}`,
      avatar: AVATARS[i % AVATARS.length],
      score: 0,
      lives: gameState.maxLives,
      eliminated: false
    });
  }
}

function updatePlayersListCount(count) {
  renderPlayersInputs();
}

function renderPlayersInputs() {
  DOM.playersInputsList.innerHTML = '';
  for (let i = 0; i < gameState.playersCount; i++) {
    const p = gameState.players[i];
    const row = document.createElement('div');
    row.className = 'qs-player-row';
    row.innerHTML = `
      <span class="qs-player-tag">${p.avatar} P${i + 1}</span>
      <input type="text" class="qs-player-input" id="player-input-${i}" value="${p.name}" maxlength="20" placeholder="Nombre...">
    `;
    DOM.playersInputsList.appendChild(row);

    const input = row.querySelector(`#player-input-${i}`);
    input.addEventListener('input', () => {
      gameState.players[i].name = input.value.trim() || `Jugador ${i + 1}`;
    });
  }
}

function capturePlayersInputs() {
  for (let i = 0; i < gameState.playersCount; i++) {
    const input = document.getElementById(`player-input-${i}`);
    if (input && input.value.trim()) {
      gameState.players[i].name = input.value.trim();
    }
  }
}

// ==================== FLUJO DE PARTIDA ====================
function startMatch() {
  gameState.activePlayerIndex = 0;
  gameState.usedCharNames.clear();
  gameState.isMatchOver = false;
  gameState.winnerPlayer = null;

  // Resetear puntajes y vidas según el modo
  for (let i = 0; i < gameState.playersCount; i++) {
    gameState.players[i].score = 0;
    gameState.players[i].lives = gameState.maxLives;
    gameState.players[i].eliminated = false;
  }

  if (window.StahlgrafAnalytics) {
    window.StahlgrafAnalytics.trackGameStart('quiensoy', {
      win_mode: gameState.winMode,
      players_count: gameState.playersCount,
      time_limit: gameState.timeLimit
    });
  }

  DOM.setupScreen.classList.add('hidden');
  DOM.podiumScreen.classList.add('hidden');
  saveSession();
  showPrepScreen();
}

function getPlayerStatusText(player) {
  if (gameState.winMode === 'survival') {
    if (player.eliminated) return '💀 Eliminado';
    return `${'❤️'.repeat(Math.max(0, player.lives))} (${player.lives} ${player.lives === 1 ? 'vida' : 'vidas'})`;
  } else if (gameState.winMode === 'race') {
    return `${player.score}/${gameState.targetScore} aciertos para ganar`;
  } else {
    return `${player.score} ${player.score === 1 ? 'acierto' : 'aciertos'}`;
  }
}

function showPrepScreen() {
  const activePlayer = gameState.players[gameState.activePlayerIndex];
  DOM.prepPlayerAvatar.textContent = activePlayer.avatar;
  DOM.prepPlayerName.textContent = activePlayer.name;

  if (DOM.prepPlayerStatus) {
    DOM.prepPlayerStatus.textContent = getPlayerStatusText(activePlayer);
  }

  DOM.prepScreen.classList.remove('hidden');
  DOM.gameActiveModal.classList.add('hidden');
  DOM.resultScreen.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== RONDA ACTIVA (PANTALLA LIMPIA) ====================
function launchActiveGuessing() {
  // 1. Elegir personaje aleatorio del mazo seleccionado
  const eligible = QUIEN_SOY_PERSONAJES.filter(p => gameState.selectedCategories.includes(p.categoria));
  const available = eligible.filter(p => !gameState.usedCharNames.has(p.nombre));
  const pool = available.length > 0 ? available : eligible;

  if (pool.length === 0) {
    alert("Por favor selecciona al menos una categoría con personajes.");
    return;
  }

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  gameState.currentChar = chosen;
  gameState.usedCharNames.add(chosen.nombre);

  const activePlayer = gameState.players[gameState.activePlayerIndex];
  const catMeta = QUIEN_SOY_CATEGORIES[chosen.categoria] || { name: 'Personaje', icon: '🎭' };

  // 2. Poblar datos visuales en pantalla completa limpia
  DOM.activePlayerAvatar.textContent = activePlayer.avatar;
  DOM.activePlayerName.textContent = activePlayer.name;
  if (DOM.activePlayerStatus) {
    DOM.activePlayerStatus.textContent = getPlayerStatusText(activePlayer);
  }

  DOM.activeCatIcon.textContent = catMeta.icon;
  DOM.activeCatName.textContent = catMeta.name;
  DOM.characterNameDisplay.textContent = chosen.nombre;

  // 3. Preparar temporizador
  DOM.prepScreen.classList.add('hidden');
  DOM.gameActiveModal.classList.remove('hidden');
  gameState.isGuessingActive = true;

  if (gameState.timeLimit > 0) {
    gameState.timerRemaining = gameState.timeLimit;
    DOM.timerDisplay.textContent = gameState.timerRemaining;
    DOM.timerDisplay.classList.remove('danger');
    DOM.timerBarFill.style.width = '100%';

    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
      gameState.timerRemaining--;

      DOM.timerDisplay.textContent = gameState.timerRemaining;
      const pct = (gameState.timerRemaining / gameState.timeLimit) * 100;
      DOM.timerBarFill.style.width = `${Math.max(0, pct)}%`;

      if (gameState.timerRemaining <= 10 && gameState.timerRemaining > 0) {
        DOM.timerDisplay.classList.add('danger');
        soundManager.playTick();
      }

      if (gameState.timerRemaining <= 0) {
        clearInterval(gameState.timerInterval);
        soundManager.playAlarm();
        concludeGuessing();
      }
    }, 1000);
  } else {
    // Modo sin límite
    DOM.timerDisplay.textContent = '♾️';
    DOM.timerBarFill.style.width = '100%';
  }
}

function concludeGuessing() {
  gameState.isGuessingActive = false;
  clearInterval(gameState.timerInterval);

  DOM.gameActiveModal.classList.add('hidden');
  showResultScreen();
}

// ==================== PANTALLA DE RESULTADOS Y CONTEO ====================
function showResultScreen() {
  const activePlayer = gameState.players[gameState.activePlayerIndex];
  DOM.resultPlayerName.textContent = activePlayer.name;
  DOM.resultCharName.textContent = gameState.currentChar.nombre;

  // Habilitar botones de resultado
  DOM.btnRecordSuccess.disabled = false;
  DOM.btnRecordFail.disabled = false;
  DOM.btnRecordSuccess.style.opacity = '1';
  DOM.btnRecordFail.style.opacity = '1';

  // Ocultar alerta de victoria previa hasta resolver
  DOM.matchOverAlert.classList.add('hidden');

  renderLeaderboard();
  updateNextPlayerButtonText();
  DOM.resultScreen.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function recordRoundResult(didGuess) {
  const activePlayer = gameState.players[gameState.activePlayerIndex];

  if (didGuess) {
    activePlayer.score++;
    DOM.btnRecordSuccess.style.transform = 'scale(1.05)';
    DOM.btnRecordFail.style.opacity = '0.35';

    // Comprobar victoria en Modo Carrera
    if (gameState.winMode === 'race' && activePlayer.score >= gameState.targetScore) {
      gameState.isMatchOver = true;
      gameState.winnerPlayer = activePlayer;
      soundManager.playVictory();
      triggerMatchVictory(
        `¡${activePlayer.name.toUpperCase()} HA GANADO!`,
        `¡Fue el primero en alcanzar la meta de ${gameState.targetScore} aciertos!`
      );
    } else {
      soundManager.playSuccess();
    }
  } else {
    DOM.btnRecordFail.style.transform = 'scale(1.05)';
    DOM.btnRecordSuccess.style.opacity = '0.35';

    // Modo Muerte: Restar vida
    if (gameState.winMode === 'survival') {
      activePlayer.lives--;
      if (activePlayer.lives <= 0) {
        activePlayer.lives = 0;
        activePlayer.eliminated = true;
      }

      // Comprobar cuántos jugadores siguen vivos
      const alivePlayers = gameState.players.slice(0, gameState.playersCount).filter(p => !p.eliminated);

      if (alivePlayers.length === 1) {
        gameState.isMatchOver = true;
        gameState.winnerPlayer = alivePlayers[0];
        soundManager.playVictory();
        triggerMatchVictory(
          `¡${alivePlayers[0].name.toUpperCase()} ES EL ÚLTIMO EN PIE!`,
          `¡Todos los demás jugadores han agotado sus vidas! Victoria indiscutida.`
        );
      } else if (alivePlayers.length === 0) {
        gameState.isMatchOver = true;
        gameState.winnerPlayer = activePlayer;
        soundManager.playAlarm();
        triggerMatchVictory(
          `¡FIN DE LA PARTIDA!`,
          `Todos los jugadores se quedaron sin vidas. ¡El podio definirá el empate!`
        );
      } else {
        soundManager.playFail();
      }
    } else {
      soundManager.playFail();
    }
  }

  DOM.btnRecordSuccess.disabled = true;
  DOM.btnRecordFail.disabled = true;

  saveSession();
  renderLeaderboard();
  updateNextPlayerButtonText();
}

function triggerMatchVictory(title, desc) {
  DOM.matchOverTitle.textContent = title;
  DOM.matchOverDesc.textContent = desc;
  DOM.matchOverAlert.classList.remove('hidden');
}

function updateNextPlayerButtonText() {
  if (gameState.isMatchOver) {
    DOM.btnNextPlayer.innerHTML = `<span>👑 ¡Ver Podio y Coronación! ➔</span>`;
  } else {
    const nextIdx = getNextAvailablePlayerIndex();
    const nextPlayer = gameState.players[nextIdx];
    DOM.btnNextPlayer.innerHTML = `<span>➡️ Turno de <strong>${nextPlayer ? nextPlayer.name : 'Siguiente'}</strong> ➔</span>`;
  }
}

function getNextAvailablePlayerIndex() {
  for (let i = 1; i <= gameState.playersCount; i++) {
    const candidateIdx = (gameState.activePlayerIndex + i) % gameState.playersCount;
    const player = gameState.players[candidateIdx];
    if (gameState.winMode !== 'survival' || !player.eliminated) {
      return candidateIdx;
    }
  }
  return (gameState.activePlayerIndex + 1) % gameState.playersCount;
}

function renderLeaderboard() {
  DOM.scoresLeaderboardList.innerHTML = '';

  const activeList = gameState.players.slice(0, gameState.playersCount);
  
  // Ordenar lista para la tabla:
  // En supervivencia: primero los vivos por vidas desc, luego por aciertos, luego eliminados
  const sorted = [...activeList].sort((a, b) => {
    if (gameState.winMode === 'survival') {
      if (a.eliminated !== b.eliminated) return a.eliminated ? 1 : -1;
      if (a.lives !== b.lives) return b.lives - a.lives;
      return b.score - a.score;
    }
    return b.score - a.score;
  });

  const topPlayer = sorted[0];

  sorted.forEach((p, index) => {
    const isLeader = topPlayer && (p.id === topPlayer.id) && (p.score > 0 || (gameState.winMode === 'survival' && !p.eliminated));
    const row = document.createElement('div');
    row.className = `qs-score-row ${isLeader ? 'leader' : ''}`;

    let medal = '';
    if (index === 0 && (p.score > 0 || (gameState.winMode === 'survival' && !p.eliminated))) medal = '🥇 ';
    else if (index === 1) medal = '🥈 ';
    else if (index === 2) medal = '🥉 ';

    let statusDisplay = '';
    if (gameState.winMode === 'survival') {
      if (p.eliminated) {
        statusDisplay = `<span class="qs-score-eliminated">💀 ELIMINADO (${p.score} pts)</span>`;
      } else {
        statusDisplay = `<span class="qs-score-lives">${'❤️'.repeat(p.lives)}</span> <strong style="color:var(--gold-light); margin-left:0.3rem;">${p.score} pts</strong>`;
      }
    } else if (gameState.winMode === 'race') {
      statusDisplay = `<span class="qs-score-pts">${p.score}<small>/${gameState.targetScore} aciertos</small></span>`;
    } else {
      statusDisplay = `<span class="qs-score-pts">${p.score} <small>${p.score === 1 ? 'acierto' : 'aciertos'}</small></span>`;
    }

    row.innerHTML = `
      <div class="qs-score-player">
        <span>${p.avatar}</span>
        <span>${medal}${p.name}</span>
      </div>
      <div>
        ${statusDisplay}
      </div>
    `;

    DOM.scoresLeaderboardList.appendChild(row);
  });
}

function advanceToNextPlayer() {
  gameState.activePlayerIndex = getNextAvailablePlayerIndex();
  DOM.resultScreen.classList.add('hidden');
  saveSession();
  showPrepScreen();
}

// ==================== PODIO Y FINAL ====================
function showPodiumScreen() {
  soundManager.playVictory();
  DOM.resultScreen.classList.add('hidden');
  DOM.podiumScreen.classList.remove('hidden');

  const activeList = gameState.players.slice(0, gameState.playersCount);
  
  // Ordenar para el podio
  const sorted = [...activeList].sort((a, b) => {
    if (gameState.winMode === 'survival') {
      if (a.eliminated !== b.eliminated) return a.eliminated ? 1 : -1;
      if (a.lives !== b.lives) return b.lives - a.lives;
      return b.score - a.score;
    }
    return b.score - a.score;
  });

  const winner = gameState.winnerPlayer || sorted[0];

  if (window.StahlgrafAnalytics) {
    window.StahlgrafAnalytics.trackGameFinish('quiensoy', {
      win_mode: gameState.winMode,
      winner_name: winner?.name,
      winner_score: winner?.score || 0
    });
  }

  DOM.podiumWinnerAvatar.textContent = winner.avatar;
  DOM.podiumWinnerTitle.textContent = `¡${winner.name} es el Campeón!`;

  if (gameState.winMode === 'survival') {
    DOM.podiumWinnerSub.textContent = `Sobrevivió con ${winner.lives} ${winner.lives === 1 ? 'vida restante' : 'vidas restantes'} y ${winner.score} personajes adivinados.`;
  } else if (gameState.winMode === 'race') {
    DOM.podiumWinnerSub.textContent = `Conquistó la meta alcanzando ${winner.score} aciertos en la carrera.`;
  } else {
    DOM.podiumWinnerSub.textContent = `Mayor cantidad de aciertos acumulados con ${winner.score} personajes adivinados.`;
  }

  DOM.finalScoresList.innerHTML = '';
  sorted.forEach((p, idx) => {
    const row = document.createElement('div');
    row.className = `qs-score-row ${idx === 0 ? 'leader' : ''}`;
    const medals = ['🥇', '🥈', '🥉'];
    const badge = medals[idx] || `${idx + 1}°`;

    let scoreSub = `${p.score} pts`;
    if (gameState.winMode === 'survival') {
      scoreSub = p.eliminated ? `💀 Eliminado (${p.score} pts)` : `${'❤️'.repeat(p.lives)} (${p.score} pts)`;
    }

    row.innerHTML = `
      <div class="qs-score-player">
        <span>${badge} ${p.avatar}</span>
        <strong>${p.name}</strong>
      </div>
      <div class="qs-score-pts">
        ${scoreSub}
      </div>
    `;
    DOM.finalScoresList.appendChild(row);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function rematchGame() {
  DOM.podiumScreen.classList.add('hidden');
  startMatch();
}

// ==================== PERSISTENCIA DE SESIÓN ====================
function saveSession() {
  try {
    const data = {
      timeLimit: gameState.timeLimit,
      winMode: gameState.winMode,
      targetScore: gameState.targetScore,
      maxLives: gameState.maxLives,
      selectedCategories: gameState.selectedCategories,
      playersCount: gameState.playersCount,
      players: gameState.players,
      activePlayerIndex: gameState.activePlayerIndex,
      isMatchOver: gameState.isMatchOver
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function checkAndRestoreSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const session = JSON.parse(raw);
    if (session && Array.isArray(session.players) && session.players.length > 0) {
      gameState.timeLimit = typeof session.timeLimit === 'number' ? session.timeLimit : 60;
      gameState.winMode = session.winMode || 'race';
      gameState.targetScore = session.targetScore || 5;
      gameState.maxLives = session.maxLives || 3;
      gameState.selectedCategories = session.selectedCategories || Object.keys(QUIEN_SOY_CATEGORIES);
      gameState.playersCount = session.playersCount || 4;
      gameState.players = session.players;

      // Sincronizar UI del Setup
      DOM.timeBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.time, 10) === gameState.timeLimit);
      });
      DOM.modeTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === gameState.winMode);
      });

      if (gameState.winMode === 'race') {
        DOM.subconfigRace.classList.remove('hidden');
        DOM.subconfigSurvival.classList.add('hidden');
      } else if (gameState.winMode === 'survival') {
        DOM.subconfigRace.classList.add('hidden');
        DOM.subconfigSurvival.classList.remove('hidden');
      } else {
        DOM.subconfigRace.classList.add('hidden');
        DOM.subconfigSurvival.classList.add('hidden');
      }

      DOM.raceTargetBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.target, 10) === gameState.targetScore);
      });
      DOM.survivalLivesBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.lives, 10) === gameState.maxLives);
      });

      DOM.playerCountBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.count, 10) === gameState.playersCount);
      });

      renderCategoriesGrid();
      renderPlayersInputs();
    }
  } catch (e) {}
}
