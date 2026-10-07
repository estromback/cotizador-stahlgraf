/**
 * IMPOSTOR.JS
 * Lógica principal del juego "El Impostor" (Stahlgraf Games).
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * Soporta Modo a Ciegas, Modo Infiltrado (Palabra Similar), Reparto Secreto táctil,
 * Debate en la mesa, Votación dramática, Redención del impostor y Podio acumulado.
 */

// ==================== ESTADO GLOBAL DEL JUEGO ====================
const gameState = {
  mode: 'blind', // 'blind' | 'undercover'
  categoryHint: true,
  impostorCount: 1,
  timerLimit: 180, // segundos (0 = sin límite)
  selectedCategories: ['comidas', 'lugares', 'objetos', 'animales', 'profesiones', 'pop_chile'],
  playersCount: 4,
  players: [],
  
  // Estado de la ronda actual
  activePassIndex: 0,
  currentPair: null,
  citizenWord: '',
  undercoverWord: '',
  impostorIds: [],
  starterPlayerId: null,
  
  // Temporizador de debate
  timerSeconds: 0,
  timerInterval: null,
  isTimerPaused: false,
  
  // Votación y expulsión
  accusedPlayerId: null,
  hasRevealedPass: false,
  soundEnabled: true
};

const AVATARS = ['🦊', '🐯', '🐼', '🦁', '🦉', '🐨', '🐸', '🦄', '🐙', '🐺', '🦅', '🐵'];

// ==================== REFERENCIAS AL DOM ====================
const DOM = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  loadSession();
  initDefaultPlayers();
  renderCategoriesGrid();
  renderPlayersInputs();
  bindEvents();
});

function cacheDOM() {
  DOM.soundToggle = document.getElementById('btn-sound-toggle');
  DOM.soundIcon = document.getElementById('sound-icon');
  
  // Pantallas
  DOM.setupScreen = document.getElementById('setup-screen');
  DOM.passScreen = document.getElementById('pass-screen');
  DOM.debateScreen = document.getElementById('debate-screen');
  DOM.votingScreen = document.getElementById('voting-screen');
  DOM.podiumScreen = document.getElementById('podium-screen');
  DOM.suspenseModal = document.getElementById('suspense-modal');
  
  // Setup
  DOM.modeCards = document.querySelectorAll('.imp-mode-card');
  DOM.blindOptions = document.getElementById('blind-mode-options');
  DOM.chkCategoryHint = document.getElementById('chk-category-hint');
  DOM.impostorPills = document.querySelectorAll('#impostor-count-group .imp-pill-btn');
  DOM.btnTwoImpostors = document.getElementById('btn-two-impostors');
  DOM.timerPills = document.querySelectorAll('#timer-limit-group .imp-pill-btn');
  DOM.btnToggleAllCats = document.getElementById('btn-toggle-all-cats');
  DOM.catsContainer = document.getElementById('cats-container');
  DOM.playerCountChips = document.querySelectorAll('#player-count-chips .imp-chip-btn');
  DOM.playersInputsList = document.getElementById('players-inputs-list');
  DOM.btnStartGame = document.getElementById('btn-start-game');
  
  // Pass Screen
  DOM.passProgressText = document.getElementById('pass-progress-text');
  DOM.passPlayerAvatar = document.getElementById('pass-player-avatar');
  DOM.passPlayerName = document.getElementById('pass-player-name');
  DOM.secretZone = document.getElementById('secret-zone');
  DOM.secretHiddenState = document.getElementById('secret-hidden-state');
  DOM.secretRevealedState = document.getElementById('secret-revealed-state');
  DOM.viewCitizen = document.getElementById('view-citizen');
  DOM.citizenCategory = document.getElementById('citizen-category');
  DOM.citizenWord = document.getElementById('citizen-word');
  DOM.viewBlindImpostor = document.getElementById('view-blind-impostor');
  DOM.blindCategoryHint = document.getElementById('blind-category-hint');
  DOM.viewUndercover = document.getElementById('view-undercover');
  DOM.undercoverCategory = document.getElementById('undercover-category');
  DOM.undercoverWord = document.getElementById('undercover-word');
  DOM.btnNextPass = document.getElementById('btn-next-pass');
  
  // Debate Screen
  DOM.debateStarterName = document.getElementById('debate-starter-name');
  DOM.debateTimerContainer = document.getElementById('debate-timer-container');
  DOM.debateTimerDigits = document.getElementById('debate-timer-digits');
  DOM.btnTimerPause = document.getElementById('btn-timer-pause');
  DOM.btnTimerAdd = document.getElementById('btn-timer-add');
  DOM.debateActiveCount = document.getElementById('debate-active-count');
  DOM.debatePlayersGrid = document.getElementById('debate-players-grid');
  DOM.btnGoToVote = document.getElementById('btn-go-to-vote');
  
  // Voting Screen
  DOM.suspectsGrid = document.getElementById('suspects-grid');
  DOM.btnBackToDebate = document.getElementById('btn-back-to-debate');
  
  // Suspense Modal
  DOM.suspenseDrumrollBox = document.getElementById('suspense-drumroll-box');
  DOM.drumrollPlayerName = document.getElementById('drumroll-player-name');
  DOM.resultCitizenBox = document.getElementById('result-citizen-box');
  DOM.expelledCitizenName = document.getElementById('expelled-citizen-name');
  DOM.citizenFailActions = document.getElementById('citizen-fail-actions');
  DOM.btnContinueDebate = document.getElementById('btn-continue-debate');
  DOM.resultImpostorBox = document.getElementById('result-impostor-box');
  DOM.expelledImpostorName = document.getElementById('expelled-impostor-name');
  DOM.btnImpostorGuessed = document.getElementById('btn-impostor-guessed');
  DOM.btnImpostorFailed = document.getElementById('btn-impostor-failed');
  
  // Podium Screen
  DOM.podiumOutcomeBadge = document.getElementById('podium-outcome-badge');
  DOM.podiumHeadline = document.getElementById('podium-headline');
  DOM.podiumSummaryText = document.getElementById('podium-summary-text');
  DOM.podiumCitizenWord = document.getElementById('podium-citizen-word');
  DOM.podiumImpostorWordRow = document.getElementById('podium-impostor-word-row');
  DOM.podiumImpostorWord = document.getElementById('podium-impostor-word');
  DOM.podiumImpostorNames = document.getElementById('podium-impostor-names');
  DOM.podiumLeaderboardTable = document.getElementById('podium-leaderboard-table');
  DOM.btnPlayAgainSame = document.getElementById('btn-play-again-same');
  DOM.btnBackToSetup = document.getElementById('btn-back-to-setup');
}

// ==================== SISTEMA DE AUDIO (WEB AUDIO API) ====================
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.25) {
    if (!gameState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
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
    } catch (e) {
      console.warn("Audio playTone error", e);
    }
  }

  playHeartbeat() {
    if (!gameState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Golpe 1 (grave)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(30, now + 0.12);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Golpe 2 (segundo latido más corto)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(75, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(35, now + 0.32);
      gain2.gain.setValueAtTime(0.35, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.32);
    } catch (e) {
      console.warn("Audio heartbeat error", e);
    }
  }

  playDramaticBoom() {
    if (!gameState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn("Audio boom error", e);
    }
  }

  playVictory() {
    if (!gameState.soundEnabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.3);
      }, idx * 110);
    });
  }

  playFail() {
    if (!gameState.soundEnabled) return;
    this.playTone(200, 'sawtooth', 0.45, 0.25);
  }

  playTick() {
    if (!gameState.soundEnabled) return;
    this.playTone(700, 'sine', 0.04, 0.15);
  }
}

const soundManager = new SoundManager();

// ==================== CONFIGURACIÓN INICIAL & JUGADORES ====================
function initDefaultPlayers() {
  gameState.players = [];
  for (let i = 0; i < 12; i++) {
    gameState.players.push({
      id: i,
      name: `Jugador ${i + 1}`,
      avatar: AVATARS[i % AVATARS.length],
      score: 0,
      role: 'citizen',
      secretWord: '',
      eliminated: false
    });
  }
}

function renderCategoriesGrid() {
  DOM.catsContainer.innerHTML = '';
  Object.keys(IMPOSTOR_CATEGORIES).forEach(catKey => {
    const meta = IMPOSTOR_CATEGORIES[catKey];
    const isSelected = gameState.selectedCategories.includes(catKey);
    const count = IMPOSTOR_WORD_PAIRS.filter(p => p.categoria === catKey).length;

    const card = document.createElement('div');
    card.className = `imp-cat-card ${isSelected ? 'active' : ''}`;
    card.style.setProperty('--cat-color', meta.color);

    card.innerHTML = `
      <span class="imp-cat-icon">${meta.icon}</span>
      <div class="imp-cat-info">
        <span class="imp-cat-name">${meta.name}</span>
        <span class="imp-cat-count">${count} pares</span>
      </div>
      <div class="imp-cat-check">✓</div>
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
      soundManager.playTone(480, 'sine', 0.05, 0.1);
      saveSession();
    });

    DOM.catsContainer.appendChild(card);
  });
}

function renderPlayersInputs() {
  DOM.playersInputsList.innerHTML = '';
  for (let i = 0; i < gameState.playersCount; i++) {
    const p = gameState.players[i];
    const row = document.createElement('div');
    row.className = 'imp-player-input-row';
    row.innerHTML = `
      <span class="imp-player-avatar-badge">${p.avatar}</span>
      <input type="text" class="imp-player-text-input" id="player-input-${i}" value="${p.name}" maxlength="18" placeholder="Nombre...">
    `;
    DOM.playersInputsList.appendChild(row);

    const input = row.querySelector(`#player-input-${i}`);
    input.addEventListener('input', () => {
      gameState.players[i].name = input.value.trim() || `Jugador ${i + 1}`;
      saveSession();
    });
  }

  // Si hay menos de 6 jugadores, forzar a 1 impostor
  if (gameState.playersCount < 6) {
    gameState.impostorCount = 1;
    DOM.btnTwoImpostors.style.opacity = '0.35';
    DOM.btnTwoImpostors.style.pointerEvents = 'none';
    DOM.impostorPills.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.impostors, 10) === 1);
    });
  } else {
    DOM.btnTwoImpostors.style.opacity = '1';
    DOM.btnTwoImpostors.style.pointerEvents = 'auto';
  }
}

// ==================== ASOCIACIÓN DE EVENTOS ====================
function bindEvents() {
  // Toggle Sonido
  DOM.soundToggle.addEventListener('click', () => {
    gameState.soundEnabled = !gameState.soundEnabled;
    DOM.soundIcon.textContent = gameState.soundEnabled ? '🔊' : '🔇';
    soundManager.playTone(500, 'sine', 0.05, 0.1);
  });

  // Selector de Modo de Juego (A Ciegas vs Infiltrado)
  DOM.modeCards.forEach(card => {
    card.addEventListener('click', () => {
      DOM.modeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      gameState.mode = card.dataset.mode;
      DOM.blindOptions.style.display = gameState.mode === 'blind' ? 'block' : 'none';
      soundManager.playTone(440, 'sine', 0.08, 0.15);
      saveSession();
    });
  });

  // Checkbox pista de categoría
  DOM.chkCategoryHint.addEventListener('change', (e) => {
    gameState.categoryHint = e.target.checked;
    saveSession();
  });

  // Cantidad de Impostores
  DOM.impostorPills.forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.dataset.impostors, 10);
      if (count === 2 && gameState.playersCount < 6) return;
      DOM.impostorPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.impostorCount = count;
      soundManager.playTone(460, 'sine', 0.08, 0.15);
      saveSession();
    });
  });

  // Selector de Tiempo de Debate
  DOM.timerPills.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.timerPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.timerLimit = parseInt(btn.dataset.time, 10);
      soundManager.playTone(460, 'sine', 0.08, 0.15);
      saveSession();
    });
  });

  // Seleccionar todas las categorías
  DOM.btnToggleAllCats.addEventListener('click', () => {
    const allKeys = Object.keys(IMPOSTOR_CATEGORIES);
    if (gameState.selectedCategories.length === allKeys.length) {
      gameState.selectedCategories = [allKeys[0]];
    } else {
      gameState.selectedCategories = [...allKeys];
    }
    renderCategoriesGrid();
    soundManager.playTone(500, 'sine', 0.08, 0.15);
    saveSession();
  });

  // Selector de Jugadores (Chips 3 a 12)
  DOM.playerCountChips.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.playerCountChips.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.playersCount = parseInt(btn.dataset.count, 10);
      renderPlayersInputs();
      soundManager.playTone(440, 'sine', 0.08, 0.15);
      saveSession();
    });
  });

  // Iniciar Partida
  DOM.btnStartGame.addEventListener('click', () => {
    startNewMatch();
  });

  // Modal de Reglas (¿Cómo Jugar?)
  const rulesModal = document.getElementById('rules-modal');
  const btnCloseRules = document.getElementById('btn-close-rules');
  const btnAckRules = document.getElementById('btn-ack-rules');

  document.querySelectorAll('.btn-open-rules, #btn-top-rules, #btn-setup-rules').forEach(btn => {
    btn.addEventListener('click', () => {
      if (rulesModal) rulesModal.classList.remove('hidden');
      if (soundManager && soundManager.playTone) soundManager.playTone(520, 'sine', 0.08, 0.15);
    });
  });

  if (btnCloseRules) {
    btnCloseRules.addEventListener('click', () => {
      if (rulesModal) rulesModal.classList.add('hidden');
    });
  }

  if (btnAckRules) {
    btnAckRules.addEventListener('click', () => {
      if (rulesModal) rulesModal.classList.add('hidden');
    });
  }

  if (rulesModal) {
    rulesModal.addEventListener('click', (e) => {
      if (e.target === rulesModal) {
        rulesModal.classList.add('hidden');
      }
    });
  }

  // ==================== ZONA SECRETA TÁCTIL (MANTENER PRESIONADO) ====================
  const revealSecret = (e) => {
    if (e) e.preventDefault();
    showSecretWordForActivePlayer();
  };

  const hideSecret = (e) => {
    if (e) e.preventDefault();
    hideSecretWordForActivePlayer();
  };

  // Eventos pointer / touch / mouse
  DOM.secretZone.addEventListener('pointerdown', revealSecret);
  DOM.secretZone.addEventListener('pointerup', hideSecret);
  DOM.secretZone.addEventListener('pointerleave', hideSecret);
  DOM.secretZone.addEventListener('pointercancel', hideSecret);

  // Siguiente jugador en la fase de reparto
  DOM.btnNextPass.addEventListener('click', () => {
    advancePassToNextPlayer();
  });

  // ==================== FASE DE DEBATE ====================
  DOM.btnTimerPause.addEventListener('click', toggleTimerPause);
  DOM.btnTimerAdd.addEventListener('click', () => {
    gameState.timerSeconds += 30;
    updateTimerDisplay();
    soundManager.playTone(600, 'sine', 0.05, 0.1);
  });

  DOM.btnGoToVote.addEventListener('click', () => {
    pauseDebateTimer();
    soundManager.playTone(520, 'sine', 0.1, 0.2);
    showVotingScreen();
  });

  DOM.btnBackToDebate.addEventListener('click', () => {
    resumeDebateTimer();
    showDebateScreen();
  });

  // ==================== REDENCIÓN Y FIN ====================
  DOM.btnContinueDebate.addEventListener('click', () => {
    DOM.suspenseModal.classList.add('hidden');
    checkRemainingSurvivors();
  });

  DOM.btnImpostorGuessed.addEventListener('click', () => {
    finishMatch('impostor_guessed');
  });

  DOM.btnImpostorFailed.addEventListener('click', () => {
    finishMatch('citizens_win');
  });

  // Podio
  DOM.btnPlayAgainSame.addEventListener('click', () => {
    startNewMatch(true); // conserva jugadores y puntaje
  });

  DOM.btnBackToSetup.addEventListener('click', () => {
    stopDebateTimer();
    showSetupScreen();
  });
}

// ==================== FLUJO DE PARTIDA: INICIO & REPARTO ====================
function startNewMatch(keepScores = false) {
  // Asegurar que hay categorías seleccionadas
  if (gameState.selectedCategories.length === 0) {
    gameState.selectedCategories = ['comidas'];
  }

  // Filtrar pares disponibles según categorías
  const availablePairs = IMPOSTOR_WORD_PAIRS.filter(p => gameState.selectedCategories.includes(p.categoria));
  if (availablePairs.length === 0) {
    alert("Por favor selecciona al menos una categoría con palabras.");
    return;
  }

  // Elegir un par de palabras aleatorio
  gameState.currentPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
  
  // Asignar aleatoriamente cuál es la palabra de ciudadanos y cuál del infiltrado
  if (Math.random() > 0.5) {
    gameState.citizenWord = gameState.currentPair.palabraA;
    gameState.undercoverWord = gameState.currentPair.palabraB;
  } else {
    gameState.citizenWord = gameState.currentPair.palabraB;
    gameState.undercoverWord = gameState.currentPair.palabraA;
  }

  // Reset de jugadores activos
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  activePlayers.forEach(p => {
    p.eliminated = false;
    p.role = 'citizen';
    p.secretWord = gameState.citizenWord;
    if (!keepScores) {
      p.score = 0;
    }
  });

  // Elegir aleatoriamente al impostor o 2 impostores
  const indices = activePlayers.map((_, i) => i);
  // Barajar índices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  gameState.impostorIds = indices.slice(0, gameState.impostorCount).map(idx => activePlayers[idx].id);

  // Asignar rol a los elegidos
  gameState.impostorIds.forEach(id => {
    const imp = activePlayers.find(p => p.id === id);
    if (imp) {
      imp.role = 'impostor';
      imp.secretWord = gameState.mode === 'undercover' ? gameState.undercoverWord : '';
    }
  });

  // Elegir al azar quién dará la primera pista
  const randomStarterIdx = Math.floor(Math.random() * activePlayers.length);
  gameState.starterPlayerId = activePlayers[randomStarterIdx].id;

  // Iniciar en Fase 1 (Reparto secreto)
  gameState.activePassIndex = 0;
  gameState.hasRevealedPass = false;
  soundManager.playTone(523.25, 'triangle', 0.15, 0.2);

  if (window.StahlgrafAnalytics) {
    window.StahlgrafAnalytics.trackGameStart('impostor', {
      mode: gameState.mode,
      impostors_count: gameState.impostorCount,
      players_count: gameState.playersCount,
      category: gameState.currentPair?.categoria
    });
  }

  showPassScreenForCurrentPlayer();
}

// ==================== FASE 1: PASA EL TELÉFONO ====================
function showPassScreenForCurrentPlayer() {
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const currentPlayer = activePlayers[gameState.activePassIndex];

  DOM.passProgressText.textContent = `Jugador ${gameState.activePassIndex + 1} de ${activePlayers.length}`;
  DOM.passPlayerAvatar.textContent = currentPlayer.avatar;
  DOM.passPlayerName.textContent = currentPlayer.name;

  // Resetear estados visuales
  DOM.secretZone.classList.remove('pressing');
  DOM.secretHiddenState.classList.remove('hidden');
  DOM.secretRevealedState.classList.add('hidden');
  DOM.viewCitizen.classList.add('hidden');
  DOM.viewBlindImpostor.classList.add('hidden');
  DOM.viewUndercover.classList.add('hidden');

  // El botón siguiente se desactiva hasta que el jugador mantenga presionado al menos una vez
  gameState.hasRevealedPass = false;
  DOM.btnNextPass.disabled = true;

  if (gameState.activePassIndex === activePlayers.length - 1) {
    DOM.btnNextPass.innerHTML = `<span>¡Todos listos! Comenzar Debate ➔</span>`;
  } else {
    DOM.btnNextPass.innerHTML = `<span>Continuar al Siguiente ➔</span>`;
  }

  switchScreen(DOM.passScreen);
}

function showSecretWordForActivePlayer() {
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const currentPlayer = activePlayers[gameState.activePassIndex];
  const catMeta = IMPOSTOR_CATEGORIES[gameState.currentPair.categoria];

  DOM.secretZone.classList.add('pressing');
  DOM.secretHiddenState.classList.add('hidden');
  DOM.secretRevealedState.classList.remove('hidden');

  soundManager.playTone(600, 'sine', 0.08, 0.15);

  if (currentPlayer.role === 'citizen') {
    // VISTA CIUDADANO
    DOM.citizenCategory.textContent = catMeta ? `${catMeta.icon} ${catMeta.name}` : '';
    DOM.citizenWord.textContent = currentPlayer.secretWord;
    DOM.viewCitizen.classList.remove('hidden');
  } else {
    // VISTA IMPOSTOR
    if (gameState.mode === 'blind') {
      // Modo a ciegas
      if (gameState.categoryHint && catMeta) {
        DOM.blindCategoryHint.textContent = `Categoría: ${catMeta.icon} ${catMeta.name}`;
        DOM.blindCategoryHint.classList.remove('hidden');
      } else {
        DOM.blindCategoryHint.classList.add('hidden');
      }
      DOM.viewBlindImpostor.classList.remove('hidden');
    } else {
      // Modo Infiltrado
      DOM.undercoverCategory.textContent = catMeta ? `${catMeta.icon} ${catMeta.name}` : '';
      DOM.undercoverWord.textContent = currentPlayer.secretWord;
      DOM.viewUndercover.classList.remove('hidden');
    }
  }

  gameState.hasRevealedPass = true;
  DOM.btnNextPass.disabled = false;
}

function hideSecretWordForActivePlayer() {
  DOM.secretZone.classList.remove('pressing');
  DOM.secretHiddenState.classList.remove('hidden');
  DOM.secretRevealedState.classList.add('hidden');
  DOM.viewCitizen.classList.add('hidden');
  DOM.viewBlindImpostor.classList.add('hidden');
  DOM.viewUndercover.classList.add('hidden');
}

function advancePassToNextPlayer() {
  soundManager.playTone(440, 'sine', 0.08, 0.15);
  gameState.activePassIndex++;

  if (gameState.activePassIndex < gameState.playersCount) {
    showPassScreenForCurrentPlayer();
  } else {
    // Todos vieron su rol -> Comenzar debate
    soundManager.playDramaticBoom();
    showDebateScreen();
  }
}

// ==================== FASE 2: DEBATE & PISTAS ====================
function showDebateScreen() {
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const starter = activePlayers.find(p => p.id === gameState.starterPlayerId) || activePlayers[0];
  DOM.debateStarterName.textContent = starter.name;

  // Actualizar jugadores vivos
  renderDebatePlayersGrid();

  // Temporizador
  if (gameState.timerLimit > 0) {
    DOM.debateTimerContainer.style.display = 'flex';
    if (!gameState.timerInterval) {
      gameState.timerSeconds = gameState.timerLimit;
      startDebateTimer();
    }
  } else {
    DOM.debateTimerContainer.style.display = 'none';
  }

  switchScreen(DOM.debateScreen);
}

function renderDebatePlayersGrid() {
  DOM.debatePlayersGrid.innerHTML = '';
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const alivePlayers = activePlayers.filter(p => !p.eliminated);
  DOM.debateActiveCount.textContent = alivePlayers.length;

  activePlayers.forEach(p => {
    const chip = document.createElement('div');
    chip.className = `imp-active-player-chip ${p.eliminated ? 'eliminated' : ''}`;
    chip.innerHTML = `
      <span>${p.avatar}</span>
      <span>${p.name}</span>
      ${p.eliminated ? '<span style="color:#ef4444;">💀</span>' : ''}
    `;
    DOM.debatePlayersGrid.appendChild(chip);
  });
}

function startDebateTimer() {
  stopDebateTimer();
  updateTimerDisplay();
  gameState.isTimerPaused = false;
  DOM.btnTimerPause.textContent = 'Pausar';

  gameState.timerInterval = setInterval(() => {
    if (gameState.isTimerPaused) return;

    gameState.timerSeconds--;
    updateTimerDisplay();

    if (gameState.timerSeconds <= 5 && gameState.timerSeconds > 0) {
      soundManager.playTick();
    }

    if (gameState.timerSeconds <= 0) {
      stopDebateTimer();
      soundManager.playFail();
      DOM.debateTimerDigits.textContent = '00:00';
      DOM.debateTimerDigits.classList.add('urgent');
    }
  }, 1000);
}

function toggleTimerPause() {
  gameState.isTimerPaused = !gameState.isTimerPaused;
  DOM.btnTimerPause.textContent = gameState.isTimerPaused ? 'Reanudar' : 'Pausar';
  soundManager.playTone(500, 'sine', 0.05, 0.1);
}

function pauseDebateTimer() {
  gameState.isTimerPaused = true;
}

function resumeDebateTimer() {
  gameState.isTimerPaused = false;
}

function stopDebateTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const m = Math.floor(gameState.timerSeconds / 60);
  const s = gameState.timerSeconds % 60;
  DOM.debateTimerDigits.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  if (gameState.timerSeconds <= 15) {
    DOM.debateTimerDigits.classList.add('urgent');
  } else {
    DOM.debateTimerDigits.classList.remove('urgent');
  }
}

// ==================== FASE 3: VOTACIÓN & JUICIO ====================
function showVotingScreen() {
  DOM.suspectsGrid.innerHTML = '';
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const alivePlayers = activePlayers.filter(p => !p.eliminated);

  alivePlayers.forEach(p => {
    const card = document.createElement('div');
    card.className = 'imp-suspect-card';
    card.innerHTML = `
      <div class="imp-suspect-avatar">${p.avatar}</div>
      <div class="imp-suspect-name">${p.name}</div>
      <span class="imp-suspect-tag">SOSPECHOSO</span>
    `;

    card.addEventListener('click', () => {
      confirmExpulsion(p);
    });

    DOM.suspectsGrid.appendChild(card);
  });

  switchScreen(DOM.votingScreen);
}

function confirmExpulsion(player) {
  const confirmed = confirm(`¿Están seguros en la mesa de acusar y expulsar a ${player.name.toUpperCase()}?`);
  if (!confirmed) return;

  gameState.accusedPlayerId = player.id;
  triggerSuspenseReveal(player);
}

// ==================== FASE 4: SUSPENSO & REVELACIÓN DRAMÁTICA ====================
function triggerSuspenseReveal(player) {
  // Preparar modal de suspenso
  DOM.drumrollPlayerName.textContent = player.name.toUpperCase();
  DOM.suspenseDrumrollBox.classList.remove('hidden');
  DOM.resultCitizenBox.classList.add('hidden');
  DOM.resultImpostorBox.classList.add('hidden');
  DOM.suspenseModal.classList.remove('hidden');

  // Latidos de corazón acelerados
  soundManager.playHeartbeat();
  setTimeout(() => soundManager.playHeartbeat(), 700);
  setTimeout(() => soundManager.playHeartbeat(), 1300);
  setTimeout(() => soundManager.playHeartbeat(), 1800);

  // Revelación después de 2.4 segundos
  setTimeout(() => {
    DOM.suspenseDrumrollBox.classList.add('hidden');
    soundManager.playDramaticBoom();

    if (player.role === 'citizen') {
      // ERA UN CIUDADANO
      player.eliminated = true;
      DOM.expelledCitizenName.textContent = player.name;
      DOM.resultCitizenBox.classList.remove('hidden');
      soundManager.playFail();

      // Verificar si los impostores ganan automáticamente por superioridad numérica
      const activePlayers = gameState.players.slice(0, gameState.playersCount);
      const aliveCitizens = activePlayers.filter(p => !p.eliminated && p.role === 'citizen');
      const aliveImpostors = activePlayers.filter(p => !p.eliminated && p.role === 'impostor');

      if (aliveCitizens.length <= aliveImpostors.length) {
        // Los impostores ganaron la partida
        DOM.citizenFailActions.innerHTML = `
          <button type="button" class="imp-danger-btn" id="btn-impostors-win-now">
            <span>😈 ¡El Impostor Ha Ganado! Ver Podio ➔</span>
          </button>
        `;
        document.getElementById('btn-impostors-win-now').addEventListener('click', () => {
          DOM.suspenseModal.classList.add('hidden');
          finishMatch('impostors_survived');
        });
      } else {
        DOM.citizenFailActions.innerHTML = `
          <button type="button" id="btn-continue-debate" class="imp-primary-btn">
            <span>Continuar debate con los sobrevivientes ➔</span>
          </button>
        `;
        document.getElementById('btn-continue-debate').addEventListener('click', () => {
          DOM.suspenseModal.classList.add('hidden');
          checkRemainingSurvivors();
        });
      }

    } else {
      // ERA EL IMPOSTOR
      player.eliminated = true;
      DOM.expelledImpostorName.textContent = player.name;
      DOM.resultImpostorBox.classList.remove('hidden');
      soundManager.playVictory();
    }
  }, 2300);
}

function checkRemainingSurvivors() {
  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const alivePlayers = activePlayers.filter(p => !p.eliminated);
  const aliveImpostors = alivePlayers.filter(p => p.role === 'impostor');

  if (aliveImpostors.length === 0) {
    // No quedan más impostores
    finishMatch('citizens_win');
  } else {
    // Continúa el debate con los jugadores sobrevivientes
    resumeDebateTimer();
    showDebateScreen();
  }
}

// ==================== FASE 5: PODIO & RESOLUCIÓN ====================
function finishMatch(outcome) {
  stopDebateTimer();
  DOM.suspenseModal.classList.add('hidden');

  if (window.StahlgrafAnalytics) {
    window.StahlgrafAnalytics.trackGameFinish('impostor', {
      outcome: outcome,
      mode: gameState.mode,
      players_count: gameState.playersCount
    });
  }

  const activePlayers = gameState.players.slice(0, gameState.playersCount);
  const impostors = activePlayers.filter(p => p.role === 'impostor');
  const citizens = activePlayers.filter(p => p.role === 'citizen');

  // Reparto de puntos
  if (outcome === 'citizens_win') {
    // Victoria total ciudadana (+2 puntos a cada ciudadano)
    citizens.forEach(c => c.score += 2);
    DOM.podiumOutcomeBadge.textContent = '🏆 VICTORIA DE LOS CIUDADANOS';
    DOM.podiumHeadline.textContent = '¡El Impostor Fue Descubierto!';
    DOM.podiumSummaryText.textContent = 'Los ciudadanos desenmascararon al infiltrado y protegieron la palabra secreta. (+2 puntos a cada ciudadano)';
    soundManager.playVictory();
  } else if (outcome === 'impostor_guessed') {
    // Robo de victoria por adivinanza del impostor (+3 puntos a los impostores)
    impostors.forEach(imp => imp.score += 3);
    DOM.podiumOutcomeBadge.textContent = '🎯 ROBO DE VICTORIA: EL IMPOSTOR';
    DOM.podiumHeadline.textContent = '¡El Impostor Adivinó la Palabra!';
    DOM.podiumSummaryText.textContent = 'Aunque fue descubierto, ¡el impostor dedujo la palabra secreta de los ciudadanos y se robó la victoria! (+3 puntos)';
    soundManager.playDramaticBoom();
  } else if (outcome === 'impostors_survived') {
    // Los impostores engañaron al pueblo (+3 puntos a los impostores)
    impostors.forEach(imp => imp.score += 3);
    DOM.podiumOutcomeBadge.textContent = '😈 VICTORIA DEL IMPOSTOR';
    DOM.podiumHeadline.textContent = '¡El Engaño Fue Absoluto!';
    DOM.podiumSummaryText.textContent = 'El impostor logró eliminar a suficientes inocentes para dominar el pueblo sin ser atrapado. (+3 puntos)';
    soundManager.playDramaticBoom();
  }

  // Palabras y revelación en el podio
  DOM.podiumCitizenWord.textContent = gameState.citizenWord.toUpperCase();
  if (gameState.mode === 'undercover') {
    DOM.podiumImpostorWordRow.style.display = 'flex';
    DOM.podiumImpostorWord.textContent = gameState.undercoverWord.toUpperCase();
  } else {
    DOM.podiumImpostorWordRow.style.display = 'none';
  }

  DOM.podiumImpostorNames.textContent = impostors.map(imp => imp.name).join(', ');

  // Tabla de posiciones acumulada
  renderLeaderboard();
  saveSession();
  switchScreen(DOM.podiumScreen);
}

function renderLeaderboard() {
  DOM.podiumLeaderboardTable.innerHTML = '';
  const activePlayers = [...gameState.players.slice(0, gameState.playersCount)];
  // Ordenar por puntaje descendente
  activePlayers.sort((a, b) => b.score - a.score);

  activePlayers.forEach((p, idx) => {
    const row = document.createElement('div');
    row.className = `imp-lb-row ${idx === 0 ? 'first-place' : ''}`;
    
    let medal = `${idx + 1}º`;
    if (idx === 0) medal = '🥇';
    else if (idx === 1) medal = '🥈';
    else if (idx === 2) medal = '🥉';

    row.innerHTML = `
      <div class="imp-lb-left">
        <span class="imp-lb-rank">${medal}</span>
        <span class="imp-lb-avatar">${p.avatar}</span>
        <span class="imp-lb-name">${p.name}</span>
      </div>
      <span class="imp-lb-score">${p.score} pts</span>
    `;

    DOM.podiumLeaderboardTable.appendChild(row);
  });
}

// ==================== TRANSICIONES Y UTILIDADES ====================
function switchScreen(targetScreen) {
  [DOM.setupScreen, DOM.passScreen, DOM.debateScreen, DOM.votingScreen, DOM.podiumScreen].forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active');
  });
  targetScreen.classList.remove('hidden');
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSetupScreen() {
  switchScreen(DOM.setupScreen);
}

// ==================== PERSISTENCIA (LOCALSTORAGE) ====================
function saveSession() {
  try {
    const session = {
      mode: gameState.mode,
      categoryHint: gameState.categoryHint,
      impostorCount: gameState.impostorCount,
      timerLimit: gameState.timerLimit,
      selectedCategories: gameState.selectedCategories,
      playersCount: gameState.playersCount,
      players: gameState.players.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        score: p.score
      }))
    };
    localStorage.setItem('impostor_session_v1', JSON.stringify(session));
  } catch (e) {
    console.warn("Error saving session", e);
  }
}

function loadSession() {
  try {
    const data = localStorage.getItem('impostor_session_v1');
    if (!data) return;
    const session = JSON.parse(data);
    if (session.mode) gameState.mode = session.mode;
    if (session.categoryHint !== undefined) gameState.categoryHint = session.categoryHint;
    if (session.impostorCount) gameState.impostorCount = session.impostorCount;
    if (session.timerLimit !== undefined) gameState.timerLimit = session.timerLimit;
    if (session.selectedCategories && Array.isArray(session.selectedCategories)) {
      gameState.selectedCategories = session.selectedCategories;
    }
    if (session.playersCount) gameState.playersCount = session.playersCount;
    if (session.players && Array.isArray(session.players)) {
      session.players.forEach((sp, idx) => {
        if (gameState.players[idx]) {
          gameState.players[idx].name = sp.name || gameState.players[idx].name;
          gameState.players[idx].score = sp.score || 0;
        }
      });
    }

    // Actualizar UI inicial según datos cargados
    if (DOM.chkCategoryHint) DOM.chkCategoryHint.checked = gameState.categoryHint;
    if (DOM.blindOptions) DOM.blindOptions.style.display = gameState.mode === 'blind' ? 'block' : 'none';
    
    DOM.modeCards.forEach(card => {
      card.classList.toggle('active', card.dataset.mode === gameState.mode);
    });

    DOM.impostorPills.forEach(pill => {
      pill.classList.toggle('active', parseInt(pill.dataset.impostors, 10) === gameState.impostorCount);
    });

    DOM.timerPills.forEach(pill => {
      pill.classList.toggle('active', parseInt(pill.dataset.time, 10) === gameState.timerLimit);
    });

    DOM.playerCountChips.forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.count, 10) === gameState.playersCount);
    });

  } catch (e) {
    console.warn("Error loading session", e);
  }
}
