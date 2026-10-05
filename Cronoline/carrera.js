/**
 * CRONOTRIVIA: LA PISTA DEL SABER
 * Motor de Juego de Tablero & Trivia por Equipos / Parejas
 */

// ==================== CONFIGURACIÓN Y CONSTANTES ====================
const DEFAULT_TEAMS_DATA = [
  { id: 0, name: "Los Sabelotodo", avatar: "🚀", color: "#0ea5e9", glow: "rgba(14, 165, 233, 0.4)" },
  { id: 1, name: "Pino y Napolitana", avatar: "⚡", color: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)" },
  { id: 2, name: "Teniente Bello", avatar: "🦖", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
  { id: 3, name: "Harta Cazuela", avatar: "👑", color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" }
];

const AVAILABLE_AVATARS = ['🚀', '⚡', '🦖', '👑', '🛸', '🧭', '🛡️', '💎', '🔥', '🦊', '🎩', '⚔️'];

const CATEGORY_META = {
  historia: { name: "Historia Universal", icon: "🏛️", color: "#fbbf24", type: "trivia", cardsKey: 'CARDS_HISTORIA' },
  geografia: { name: "Banderas & Geografía", icon: "🌍", color: "#0284c7", type: "trivia" },
  quimica: { name: "Química & Física", icon: "🧪", color: "#06b6d4", type: "trivia" },
  biologia: { name: "Biología & Naturaleza", icon: "🧬", color: "#10b981", type: "trivia" },
  deportes: { name: "Deportes & Mundiales", icon: "⚽", color: "#f97316", type: "trivia" },
  arte: { name: "Arte & Literatura", icon: "🎨", color: "#8b5cf6", type: "trivia" },
  canciones: { name: "Música & Hits", icon: "🎸", color: "#ec4899", type: "trivia", cardsKey: 'CARDS_CANCIONES' },
  peliculas: { name: "Cine & Películas", icon: "🎬", color: "#14b8a6", type: "trivia", cardsKey: 'CARDS_PELICULAS' },
  tecnologia: { name: "Tecnología & Gaming", icon: "💻", color: "#a855f7", type: "trivia", cardsKey: 'CARDS_TECNOLOGIA' },
  farandula: { name: "Farándula Pop", icon: "📺", color: "#eab308", type: "trivia", cardsKey: 'CARDS_FARANDULA' },
  guerras: { name: "Guerras Mundiales", icon: "🪖", color: "#fb7185", type: "trivia", cardsKey: 'CARDS_GUERRAS' }
};

// ==================== ESTADO DEL JUEGO ====================
const gameState = {
  teamsCount: 2,
  teams: [],
  boardLength: 30,
  board: [],
  tileCenters: [],
  selectedCategories: ['historia', 'geografia', 'quimica', 'biologia', 'deportes', 'arte', 'canciones', 'peliculas', 'tecnologia', 'farandula', 'guerras'],
  timerLimit: 45,
  penaltyRule: 'origin', // 'origin' (retroceder al origen), 'double' (origen + rival tira doble), 'none' (mantener)
  pendingExtraTurn: false,
  hasExtraTurn: false,
  extraTurnTeamIndex: null,
  activeTeamIndex: 0,
  diceRolling: false,
  diceMode: 'virtual', // 'virtual' o 'manual' (dados físicos)
  diceCount: 1,        // 1 o 2 dados
  timerInterval: null,
  currentQuestion: null,
  currentTile: null,
  soundEnabled: true,
  usedCardIds: new Set(),
  usedTriviaIds: new Set(),
  hasAnsweredCurrent: false
};

// ==================== SINTETIZADOR DE AUDIO WEB (SFX NATIVO) ====================
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.15) {
    if (!gameState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playDiceRoll() {
    if (!gameState.soundEnabled) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.playTone(200 + Math.random() * 250, 'triangle', 0.05, 0.1), i * 70);
    }
  }

  playMoveStep() {
    this.playTone(480, 'sine', 0.08, 0.12);
  }

  playCorrect() {
    if (!gameState.soundEnabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C mayor
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.25, 0.15), idx * 80);
    });
  }

  playIncorrect() {
    if (!gameState.soundEnabled) return;
    this.init();
    const notes = [311.13, 293.66, 261.63]; // Tono descendente
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.2, 0.1), idx * 100);
    });
  }

  playVictory() {
    if (!gameState.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.35, 0.2), idx * 120);
    });
  }
}

const soundManager = new SoundManager();

// ==================== ELEMENTOS DEL DOM ====================
const DOM = {
  // Pantallas
  carreraSetup: document.getElementById('carrera-setup'),
  carreraGame: document.getElementById('carrera-game'),
  
  // Setup
  teamsList: document.getElementById('teams-list'),
  teamCountBtns: document.querySelectorAll('.team-count-btn'),
  lengthBtns: document.querySelectorAll('.length-btn'),
  timerBtns: document.querySelectorAll('.timer-btn'),
  penaltyBtns: document.querySelectorAll('.penalty-btn'),
  diceModeBtns: document.querySelectorAll('.dice-mode-btn'),
  diceCountBtns: document.querySelectorAll('.dice-count-btn'),
  categoryInputs: document.querySelectorAll('input[name="cat"]'),
  btnIniciarCarrera: document.getElementById('btn-iniciar-carrera'),

  // Juego
  activeTurnIndicator: document.getElementById('active-turn-indicator'),
  turnTeamAvatar: document.getElementById('turn-team-avatar'),
  turnTeamName: document.getElementById('turn-team-name'),
  teamsLeaderboard: document.getElementById('teams-leaderboard'),
  boardContainer: document.getElementById('board-container'),
  
  // Panel de Lanzamiento
  diceElement: document.getElementById('dice-element'),
  diceFaceVal: document.getElementById('dice-face-val'),
  diceMessage: document.getElementById('dice-message'),
  btnRollDice: document.getElementById('btn-roll-dice'),
  btnOpenQuestion: document.getElementById('btn-open-question'),
  btnToggleDiceVirtual: document.getElementById('btn-toggle-dice-virtual'),
  btnToggleDiceManual: document.getElementById('btn-toggle-dice-manual'),
  btnToggleDiceCount1: document.getElementById('btn-toggle-dice-count-1'),
  btnToggleDiceCount2: document.getElementById('btn-toggle-dice-count-2'),
  virtualDiceSection: document.getElementById('virtual-dice-section'),
  manualDiceSection: document.getElementById('manual-dice-section'),
  manualDiceInstruction: document.getElementById('manual-dice-instruction'),
  manualKeypad1: document.getElementById('manual-keypad-1'),
  manualKeypad2: document.getElementById('manual-keypad-2'),
  tileInfoCard: document.getElementById('tile-info-card'),
  tileInfoIcon: document.getElementById('tile-info-icon'),
  tileInfoNum: document.getElementById('tile-info-num'),
  tileInfoName: document.getElementById('tile-info-name'),
  activeTeamComodines: document.getElementById('active-team-comodines'),

  // Modales
  triviaModal: document.getElementById('trivia-modal'),
  triviaModalCard: document.querySelector('#trivia-modal .trivia-modal-card'),
  triviaModalTeam: document.getElementById('trivia-modal-team'),
  triviaTeamIcon: document.getElementById('trivia-team-icon'),
  triviaTeamName: document.getElementById('trivia-team-name'),
  triviaModalCat: document.getElementById('trivia-modal-cat'),
  triviaCatIcon: document.getElementById('trivia-cat-icon'),
  triviaCatTitle: document.getElementById('trivia-cat-title'),
  triviaModalDiff: document.getElementById('trivia-modal-diff'),
  triviaPromptTag: document.getElementById('trivia-event-type'),
  triviaEventTitle: document.getElementById('trivia-event-title'),
  triviaEventDesc: document.getElementById('trivia-event-desc'),
  triviaOptionsGrid: document.getElementById('trivia-options-grid'),
  triviaFeedbackPanel: document.getElementById('trivia-feedback-panel'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackStatusTitle: document.getElementById('feedback-status-title'),
  feedbackExplanation: document.getElementById('feedback-explanation'),
  feedbackConsequence: document.getElementById('feedback-consequence'),
  btnNextTurn: document.getElementById('btn-next-turn'),

  // Temporizador
  timerBarFill: document.getElementById('timer-bar-fill'),
  timerSecondsText: document.getElementById('timer-seconds-text'),

  // Perks
  perk5050: document.getElementById('perk-btn-5050'),
  count5050: document.getElementById('count-5050'),
  perkSkip: document.getElementById('perk-btn-skip'),
  countSkip: document.getElementById('count-skip'),
  perkShield: document.getElementById('perk-btn-shield'),
  countShield: document.getElementById('count-shield'),

  // Eventos y Reglas
  eventModal: document.getElementById('event-modal'),
  eventIcon: document.getElementById('event-icon'),
  eventTitle: document.getElementById('event-title'),
  eventDesc: document.getElementById('event-desc'),
  eventRewardBox: document.getElementById('event-reward-box'),
  btnEventConfirm: document.getElementById('btn-event-confirm'),

  rulesModal: document.getElementById('rules-modal'),
  btnShowRules: document.getElementById('btn-show-rules'),
  btnCloseRules: document.getElementById('btn-close-rules'),
  btnAckRules: document.getElementById('btn-ack-rules'),

  // Victoria
  victoryScreen: document.getElementById('victory-screen'),
  winnerAvatar: document.getElementById('winner-avatar'),
  winnerTeamName: document.getElementById('winner-team-name'),
  victoryPodium: document.getElementById('victory-podium'),
  victoryStats: document.getElementById('victory-stats'),
  btnRematch: document.getElementById('btn-rematch'),
  confettiCanvas: document.getElementById('confetti-canvas'),

  // Controles
  btnToggleSound: document.getElementById('btn-toggle-sound'),
  btnAbandonGame: document.getElementById('btn-abandon-game')
};

// Memoria de nombres y avatares configurados en el setup
const setupTeamsCustom = [
  { name: "", avatar: "" },
  { name: "", avatar: "" },
  { name: "", avatar: "" },
  { name: "", avatar: "" }
];

function captureCurrentSetupInputs() {
  for (let i = 0; i < 4; i++) {
    const input = document.getElementById(`team-name-input-${i}`);
    if (input && input.value.trim()) {
      setupTeamsCustom[i].name = input.value.trim();
    }
    const avBtn = document.getElementById(`avatar-btn-${i}`);
    if (avBtn && avBtn.textContent.trim()) {
      setupTeamsCustom[i].avatar = avBtn.textContent.trim();
    }
  }
}

function randomizeCronoTriviaTeamNames(force = false) {
  if (typeof getRandomTeamNames !== 'function') return;
  const current = force ? [] : setupTeamsCustom.map(t => t.name).filter(Boolean);
  const randomNames = getRandomTeamNames(4, current);
  for (let i = 0; i < 4; i++) {
    if (force || !setupTeamsCustom[i].name) {
      setupTeamsCustom[i].name = randomNames[i] || DEFAULT_TEAMS_DATA[i].name;
    }
  }
}

// ==================== INICIALIZACIÓN DEL SETUP ====================
function initSetup() {
  randomizeCronoTriviaTeamNames(true);
  renderTeamsSetup();

  // Botón para aleatorizar nombres de equipos
  const btnRandomizeTeams = document.getElementById('btn-randomize-carrera-teams');
  if (btnRandomizeTeams) {
    btnRandomizeTeams.addEventListener('click', () => {
      randomizeCronoTriviaTeamNames(true);
      renderTeamsSetup();
    });
  }

  // Cantidad de Equipos
  DOM.teamCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.teamCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.teamsCount = parseInt(btn.dataset.count, 10);
      renderTeamsSetup();
    });
  });

  // Longitud de Tablero
  DOM.lengthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.lengthBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.boardLength = parseInt(btn.dataset.length, 10);
    });
  });

  // Temporizador
  DOM.timerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.timerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.timerLimit = parseInt(btn.dataset.time, 10);
    });
  });

  // Regla de Penalización al Fallar
  DOM.penaltyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.penaltyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.penaltyRule = btn.dataset.penalty;
    });
  });

  // Modo de Dados (Virtual vs Real en mesa)
  DOM.diceModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.diceModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.diceMode = btn.dataset.diceMode;
    });
  });

  // Cantidad de Dados (1 o 2)
  DOM.diceCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.diceCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameState.diceCount = parseInt(btn.dataset.diceCount, 10);
    });
  });

  // Iniciar Partida
  DOM.btnIniciarCarrera.addEventListener('click', startGame);

  // Botones para abrir Modal de Reglas (tanto en Setup como dentro de la Partida)
  document.querySelectorAll('.btn-open-rules, #btn-show-rules, #btn-setup-rules, #btn-top-rules').forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.rulesModal.classList.remove('hidden');
    });
  });
  if (DOM.btnShowRules) {
    DOM.btnShowRules.addEventListener('click', () => DOM.rulesModal.classList.remove('hidden'));
  }
  if (DOM.btnCloseRules) {
    DOM.btnCloseRules.addEventListener('click', () => DOM.rulesModal.classList.add('hidden'));
  }
  if (DOM.btnAckRules) {
    DOM.btnAckRules.addEventListener('click', () => DOM.rulesModal.classList.add('hidden'));
  }
  if (DOM.rulesModal) {
    DOM.rulesModal.addEventListener('click', (e) => {
      if (e.target === DOM.rulesModal) {
        DOM.rulesModal.classList.add('hidden');
      }
    });
  }

  // Botón Sonido
  DOM.btnToggleSound.addEventListener('click', () => {
    gameState.soundEnabled = !gameState.soundEnabled;
    DOM.btnToggleSound.textContent = gameState.soundEnabled ? '🔊' : '🔇';
  });

  // Botón Reiniciar
  DOM.btnAbandonGame.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas salir y configurar una nueva partida?")) {
      clearCronoTriviaGame();
      DOM.carreraGame.classList.add('hidden');
      DOM.carreraSetup.classList.remove('hidden');
    }
  });

  // Botón Revancha
  DOM.btnRematch.addEventListener('click', () => {
    DOM.victoryScreen.classList.add('hidden');
    startGame();
  });

  // Comprobar y restaurar partida activa si existe
  checkAndRestoreCronoTriviaGame();
}

function renderTeamsSetup() {
  captureCurrentSetupInputs();
  DOM.teamsList.innerHTML = '';
  
  for (let i = 0; i < gameState.teamsCount; i++) {
    const defaultData = DEFAULT_TEAMS_DATA[i];
    const teamName = setupTeamsCustom[i].name || defaultData.name;
    const teamAvatar = setupTeamsCustom[i].avatar || defaultData.avatar;

    const card = document.createElement('div');
    card.className = 'team-config-card';
    card.style.setProperty('--team-color', defaultData.color);

    card.innerHTML = `
      <div class="team-card-header">
        <button type="button" class="avatar-selector-btn" id="avatar-btn-${i}" title="Cambiar Avatar">
          ${teamAvatar}
        </button>
        <input type="text" class="team-name-input" id="team-name-input-${i}" value="${teamName}" maxlength="24" placeholder="Nombre del Equipo">
      </div>
      <div class="avatars-popup hidden" id="avatars-popup-${i}">
        ${AVAILABLE_AVATARS.map(av => `<span class="avatar-opt" data-avatar="${av}">${av}</span>`).join('')}
      </div>
    `;

    DOM.teamsList.appendChild(card);

    // Guardar cambios al escribir en el input
    const input = card.querySelector(`#team-name-input-${i}`);
    input.addEventListener('input', () => {
      setupTeamsCustom[i].name = input.value;
    });

    // Toggle selector de avatar
    const avatarBtn = card.querySelector(`#avatar-btn-${i}`);
    const popup = card.querySelector(`#avatars-popup-${i}`);
    avatarBtn.addEventListener('click', () => popup.classList.toggle('hidden'));

    popup.querySelectorAll('.avatar-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        avatarBtn.textContent = opt.dataset.avatar;
        setupTeamsCustom[i].avatar = opt.dataset.avatar;
        popup.classList.add('hidden');
      });
    });
  }
}

// ==================== INICIO DEL JUEGO ====================
function startGame() {
  soundManager.init();

  // 1. Recoger Equipos
  gameState.teams = [];
  for (let i = 0; i < gameState.teamsCount; i++) {
    const nameInput = document.getElementById(`team-name-input-${i}`);
    const avatarBtn = document.getElementById(`avatar-btn-${i}`);
    const def = DEFAULT_TEAMS_DATA[i];
    const fallbackName = setupTeamsCustom[i].name || def.name;
    const finalName = (nameInput && nameInput.value && nameInput.value.trim()) ? nameInput.value.trim() : fallbackName;
    const finalAvatar = (avatarBtn && avatarBtn.textContent && avatarBtn.textContent.trim()) ? avatarBtn.textContent.trim() : (setupTeamsCustom[i].avatar || def.avatar);
    
    gameState.teams.push({
      id: i,
      name: finalName,
      avatar: finalAvatar,
      color: def.color,
      glow: def.glow,
      position: 0,
      turnStartPos: 0,
      comodines: { '5050': 1, 'skip': 1, 'shield': 0 },
      stats: { answered: 0, correct: 0, chests: 0 }
    });
  }

  // 2. Recoger Categorías Seleccionadas
  gameState.selectedCategories = [];
  DOM.categoryInputs.forEach(input => {
    if (input.checked) gameState.selectedCategories.push(input.value);
  });
  if (gameState.selectedCategories.length === 0) {
    gameState.selectedCategories = ['historia', 'canciones'];
  }

  // 3. Recoger Regla de Penalización
  const activePenBtn = document.querySelector('.penalty-btn.active');
  gameState.penaltyRule = activePenBtn ? activePenBtn.dataset.penalty : 'origin';
  gameState.pendingExtraTurn = false;
  gameState.hasExtraTurn = false;
  gameState.extraTurnTeamIndex = null;

  // 3.5 Recoger Modo y Cantidad de Dados
  const activeDiceModeBtn = document.querySelector('.dice-mode-btn.active');
  gameState.diceMode = activeDiceModeBtn ? activeDiceModeBtn.dataset.diceMode : 'virtual';
  const activeDiceCountBtn = document.querySelector('.dice-count-btn.active');
  gameState.diceCount = activeDiceCountBtn ? parseInt(activeDiceCountBtn.dataset.diceCount, 10) : 1;

  // 4. Generar Tablero
  generateBoard();

  // 5. Preparar Estado
  gameState.activeTeamIndex = 0;
  gameState.diceRolling = false;
  gameState.usedCardIds.clear();

  // 6. Cambiar a pantalla de juego
  DOM.carreraSetup.classList.add('hidden');
  DOM.carreraGame.classList.remove('hidden');

  // 6. Renderizar Elementos
  renderBoard();
  updateLeaderboard();
  updateTurnDisplay();
  setupRollControls();
  saveCronoTriviaGame();
}

// ==================== GENERACIÓN DEL TABLERO ====================
function generateBoard() {
  gameState.board = [];
  const total = gameState.boardLength;

  // Casilla 0: Salida
  gameState.board.push({
    index: 0,
    type: 'salida',
    icon: '🏁',
    label: 'Salida',
    color: '#10b981'
  });

  const availableCats = gameState.selectedCategories;
  let catIndex = 0;

  for (let i = 1; i < total; i++) {
    // Casillas Especiales periódicas
    if (i % 6 === 0) {
      gameState.board.push({
        index: i,
        type: 'cofre',
        icon: '🎁',
        label: 'Cofre Temporal',
        color: '#f59e0b'
      });
    } else if (i % 8 === 0) {
      gameState.board.push({
        index: i,
        type: 'vortice',
        icon: '🌀',
        label: 'Vórtice (-2)',
        color: '#ef4444'
      });
    } else if (i === Math.floor(total * 0.35) || i === Math.floor(total * 0.75)) {
      gameState.board.push({
        index: i,
        type: 'atajo',
        icon: '🚀',
        label: 'Atajo Cuántico',
        color: '#10b981'
      });
    } else if (i === Math.floor(total * 0.5)) {
      gameState.board.push({
        index: i,
        type: 'duelo',
        icon: '⚔️',
        label: 'Duelo',
        color: '#ec4899'
      });
    } else {
      // Casilla de Categoría de Trivia
      const catKey = availableCats[catIndex % availableCats.length];
      const catMeta = CATEGORY_META[catKey];
      gameState.board.push({
        index: i,
        type: catKey,
        icon: catMeta.icon,
        label: catMeta.name,
        color: catMeta.color
      });
      catIndex++;
    }
  }

  // Casilla Final: Meta
  gameState.board.push({
    index: total,
    type: 'meta',
    icon: '👑',
    label: 'Meta del Tiempo',
    color: '#fbbf24'
  });
}

// ==================== GENERACIÓN DE PISTA CONTINUA (SERPENTINA SVG) ====================
function buildSerpentineSegments(numRows, width, height) {
  const rowHeight = (height - 200) / (numRows - 1);
  const radius = rowHeight / 2;
  const halfWidth = 38;
  const xMin = radius + halfWidth + 30;
  const xMax = width - xMin;
  const segments = [];

  for (let r = 0; r < numRows; r++) {
    const y = height - 100 - r * rowHeight;
    const isEven = r % 2 === 0;
    const fromX = isEven ? xMin : xMax;
    const toX = isEven ? xMax : xMin;
    segments.push({ type: 'line', x1: fromX, y1: y, x2: toX, y2: y, length: Math.abs(toX - fromX) });

    if (r < numRows - 1) {
      const centerY = y - radius;
      const centerX = isEven ? xMax : xMin;
      segments.push({
        type: 'arc',
        cx: centerX,
        cy: centerY,
        r: radius,
        isRightTurn: isEven,
        length: Math.PI * radius
      });
    }
  }
  return { segments, totalLength: segments.reduce((sum, s) => sum + s.length, 0), radius, halfWidth, rowHeight };
}

function getPointAndNormal(trackSegments, totalLength, s) {
  s = Math.max(0, Math.min(totalLength, s));
  let accumulated = 0;
  for (const seg of trackSegments) {
    if (s <= accumulated + seg.length || seg === trackSegments[trackSegments.length - 1]) {
      const localS = s - accumulated;
      if (seg.type === 'line') {
        const t = seg.length === 0 ? 0 : localS / seg.length;
        const x = seg.x1 + t * (seg.x2 - seg.x1);
        const y = seg.y1 + t * (seg.y2 - seg.y1);
        const dx = (seg.x2 - seg.x1) / (seg.length || 1);
        const dy = (seg.y2 - seg.y1) / (seg.length || 1);
        return { x, y, nx: -dy, ny: dx, angle: Math.atan2(dy, dx) };
      } else {
        const t = seg.length === 0 ? 0 : localS / seg.length;
        const theta = seg.isRightTurn ? (Math.PI / 2 - t * Math.PI) : (Math.PI / 2 + t * Math.PI);
        const x = seg.cx + seg.r * Math.cos(theta);
        const y = seg.cy + seg.r * Math.sin(theta);
        const dTheta = seg.isRightTurn ? -Math.PI : Math.PI;
        const tx = -seg.r * Math.sin(theta) * dTheta;
        const ty = seg.r * Math.cos(theta) * dTheta;
        const tLen = Math.hypot(tx, ty);
        const ux = tx / (tLen || 1);
        const uy = ty / (tLen || 1);
        return { x, y, nx: -uy, ny: ux, angle: Math.atan2(uy, ux) };
      }
    }
    accumulated += seg.length;
  }
}

function generateTilePath(segs, totLen, s0, s1, halfWidth) {
  const steps = 8;
  const leftPts = [];
  const rightPts = [];
  for (let j = 0; j <= steps; j++) {
    const s = s0 + (j / steps) * (s1 - s0);
    const p = getPointAndNormal(segs, totLen, s);
    leftPts.push({ x: +(p.x + halfWidth * p.nx).toFixed(1), y: +(p.y + halfWidth * p.ny).toFixed(1) });
    rightPts.push({ x: +(p.x - halfWidth * p.nx).toFixed(1), y: +(p.y - halfWidth * p.ny).toFixed(1) });
  }
  let d = 'M ' + leftPts[0].x + ' ' + leftPts[0].y;
  for (let j = 1; j < leftPts.length; j++) d += ' L ' + leftPts[j].x + ' ' + leftPts[j].y;
  for (let j = rightPts.length - 1; j >= 0; j--) d += ' L ' + rightPts[j].x + ' ' + rightPts[j].y;
  d += ' Z';
  return { d, pL1: leftPts[leftPts.length - 1], pR1: rightPts[0] };
}

function renderBoard() {
  DOM.boardContainer.innerHTML = '';

  const totalTiles = gameState.board.length;
  const numRows = gameState.boardLength <= 20 ? 3 : (gameState.boardLength <= 30 ? 4 : 5);
  const svgWidth = 1150;
  const svgHeight = 720;

  const { segments, totalLength, halfWidth } = buildSerpentineSegments(numRows, svgWidth, svgHeight);

  gameState.tileCenters = [];
  const tilePaths = [];

  // 1. Precomputar centros y caminos para todas las casillas
  for (let i = 0; i < totalTiles; i++) {
    const s0 = (i / totalTiles) * totalLength;
    const s1 = ((i + 1) / totalTiles) * totalLength;
    const midS = (s0 + s1) / 2;
    const center = getPointAndNormal(segments, totalLength, midS);
    const { d, pL1, pR1 } = generateTilePath(segments, totalLength, s0, s1, halfWidth);
    gameState.tileCenters.push(center);
    tilePaths.push({ d, dividerP1: pL1, dividerP2: pR1 });
  }

  // 2. Precomputar rieles exteriores continuos (curbs)
  const curbSamples = 160;
  let leftCurbD = '', rightCurbD = '';
  for (let k = 0; k <= curbSamples; k++) {
    const s = (k / curbSamples) * totalLength;
    const p = getPointAndNormal(segments, totalLength, s);
    const lx = (p.x + (halfWidth + 2) * p.nx).toFixed(1);
    const ly = (p.y + (halfWidth + 2) * p.ny).toFixed(1);
    const rx = (p.x - (halfWidth + 2) * p.nx).toFixed(1);
    const ry = (p.y - (halfWidth + 2) * p.ny).toFixed(1);
    leftCurbD += (k === 0 ? 'M ' : ' L ') + lx + ' ' + ly;
    rightCurbD += (k === 0 ? 'M ' : ' L ') + rx + ' ' + ry;
  }

  // 3. Crear SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'board-svg');
  svg.setAttribute('class', 'board-svg');
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  // SVG Defs
  svg.innerHTML = `
    <defs>
      <filter id="track-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="pawn-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.6" />
      </filter>
      <linearGradient id="tile-bevel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.35" />
      </linearGradient>
    </defs>

    <!-- Fondo de Arte Cósmico / Cronómetro de las Eras -->
    <g class="board-ambient-art" opacity="0.35">
      <!-- Astrolabio en cuadrante superior -->
      <g transform="translate(575, 255)">
        <circle r="72" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 5" />
        <circle r="52" fill="none" stroke="#fbbf24" stroke-width="1" />
        <circle r="32" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8 4" />
        <line x1="-80" y1="0" x2="80" y2="0" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1" />
        <line x1="0" y1="-80" x2="0" y2="80" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1" />
        <text x="0" y="-56" font-family="'Cinzel', serif" font-size="10" fill="#fbbf24" text-anchor="middle" font-weight="700">XII</text>
        <text x="58" y="4" font-family="'Cinzel', serif" font-size="10" fill="#fbbf24" text-anchor="middle" font-weight="700">III</text>
        <text x="0" y="66" font-family="'Cinzel', serif" font-size="10" fill="#fbbf24" text-anchor="middle" font-weight="700">VI</text>
        <text x="-58" y="4" font-family="'Cinzel', serif" font-size="10" fill="#fbbf24" text-anchor="middle" font-weight="700">IX</text>
      </g>
      <!-- Vórtice / Reloj de Arena en cuadrante inferior -->
      <g transform="translate(575, 465)">
        <circle r="60" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="6 6" />
        <circle r="40" fill="none" stroke="#a855f7" stroke-width="1" stroke-dasharray="4 4" />
        <text x="0" y="8" font-size="24" text-anchor="middle" opacity="0.6">⏳</text>
      </g>
    </g>

    <!-- Base de la Pista (Asfalto Temporal / Foundation) -->
    <g class="board-track-bed">
      <path d="${leftCurbD} L ${getPointAndNormal(segments, totalLength, totalLength).x} ${getPointAndNormal(segments, totalLength, totalLength).y} ${rightCurbD} Z"
            fill="#090d16" stroke="#1e293b" stroke-width="6" class="svg-track-underbed" />
    </g>

    <!-- Rieles Dorados Exteriores de la Pista (Curbs) -->
    <g class="board-track-curbs">
      <path d="${leftCurbD}" stroke="#fbbf24" stroke-width="3.5" class="svg-curb-rail" filter="url(#track-gold-glow)" />
      <path d="${rightCurbD}" stroke="#fbbf24" stroke-width="3.5" class="svg-curb-rail" filter="url(#track-gold-glow)" />
    </g>

    <!-- Capa de Casillas (Slabs Contiguas) -->
    <g id="svg-tiles-layer" class="board-tiles-layer"></g>

    <!-- Indicador de Casilla Activa -->
    <path id="svg-active-glow" class="svg-active-tile-glow" d="" fill="none" stroke="#fbbf24" stroke-width="4.5" />

    <!-- Capa de Fichas de Jugadores (Pawns) -->
    <g id="svg-pawns-layer" class="board-pawns-layer"></g>
  `;

  // 4. Renderizar cada Casilla dentro del grupo
  const tilesLayer = svg.querySelector('#svg-tiles-layer');

  gameState.board.forEach((tile, idx) => {
    const geom = tilePaths[idx];
    const center = gameState.tileCenters[idx];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `svg-tile-group-${idx}`);
    g.setAttribute('class', `svg-tile-group tile-${tile.type}`);
    g.setAttribute('data-index', idx);

    let contentSvg = '';

    if (tile.type === 'salida') {
      contentSvg = `
        <rect x="-30" y="-14" width="60" height="28" rx="14" fill="rgba(6, 95, 70, 0.9)" stroke="#34d399" stroke-width="2" />
        <text x="0" y="5" font-family="'Cinzel', sans-serif" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">🏁 SALIDA</text>
      `;
    } else if (tile.type === 'meta') {
      contentSvg = `
        <rect x="-28" y="-14" width="56" height="28" rx="14" fill="rgba(120, 53, 15, 0.9)" stroke="#fbbf24" stroke-width="2" />
        <text x="0" y="5" font-family="'Cinzel', sans-serif" font-size="11" font-weight="900" fill="#fbbf24" text-anchor="middle">👑 META</text>
      `;
    } else if (tile.type === 'cofre') {
      contentSvg = `
        <circle cx="0" cy="-10" r="13" fill="rgba(15, 23, 42, 0.75)" stroke="#f59e0b" stroke-width="1.5" />
        <text x="0" y="-5.5" font-family="'Cinzel', 'Outfit', sans-serif" font-weight="900" font-size="11.5" fill="#fff" text-anchor="middle">${idx}</text>
        <text x="0" y="14" font-size="20" class="svg-special-icon" text-anchor="middle">🎁</text>
        <rect x="-18" y="24" width="36" height="13" rx="6.5" fill="#f59e0b" class="svg-mini-tag-bg" stroke="#000" />
        <text x="0" y="33.5" class="svg-mini-tag-text" fill="#000" text-anchor="middle">BONO</text>
      `;
    } else if (tile.type === 'vortice') {
      contentSvg = `
        <circle cx="0" cy="-10" r="13" fill="rgba(15, 23, 42, 0.75)" stroke="#ef4444" stroke-width="1.5" />
        <text x="0" y="-5.5" font-family="'Cinzel', 'Outfit', sans-serif" font-weight="900" font-size="11.5" fill="#fff" text-anchor="middle">${idx}</text>
        <text x="0" y="14" font-size="20" class="svg-special-icon" text-anchor="middle">🌀</text>
        <rect x="-16" y="24" width="32" height="13" rx="6.5" fill="#ef4444" class="svg-mini-tag-bg" stroke="#fff" />
        <text x="0" y="33.5" class="svg-mini-tag-text" fill="#fff" text-anchor="middle">-2</text>
      `;
    } else if (tile.type === 'atajo') {
      contentSvg = `
        <circle cx="0" cy="-10" r="13" fill="rgba(15, 23, 42, 0.75)" stroke="#10b981" stroke-width="1.5" />
        <text x="0" y="-5.5" font-family="'Cinzel', 'Outfit', sans-serif" font-weight="900" font-size="11.5" fill="#fff" text-anchor="middle">${idx}</text>
        <text x="0" y="14" font-size="20" class="svg-special-icon" text-anchor="middle">🚀</text>
        <rect x="-16" y="24" width="32" height="13" rx="6.5" fill="#10b981" class="svg-mini-tag-bg" stroke="#fff" />
        <text x="0" y="33.5" class="svg-mini-tag-text" fill="#fff" text-anchor="middle">+3</text>
      `;
    } else if (tile.type === 'duelo') {
      contentSvg = `
        <circle cx="0" cy="-10" r="13" fill="rgba(15, 23, 42, 0.75)" stroke="#ec4899" stroke-width="1.5" />
        <text x="0" y="-5.5" font-family="'Cinzel', 'Outfit', sans-serif" font-weight="900" font-size="11.5" fill="#fff" text-anchor="middle">${idx}</text>
        <text x="0" y="14" font-size="20" class="svg-special-icon" text-anchor="middle">⚔️</text>
        <rect x="-18" y="24" width="36" height="13" rx="6.5" fill="#ec4899" class="svg-mini-tag-bg" stroke="#fff" />
        <text x="0" y="33.5" class="svg-mini-tag-text" fill="#fff" text-anchor="middle">1 vs 1</text>
      `;
    } else {
      // CASILLA REGULAR: Solo número centrado y limpio en la losa coloreada por categoría
      contentSvg = `
        <circle cx="0" cy="0" r="17" class="svg-num-disc-bg" />
        <text x="0" y="5.5" class="svg-tile-main-number" text-anchor="middle">${idx}</text>
      `;
    }

    g.innerHTML = `
      <title>Casilla #${idx}: ${tile.label}</title>
      <path class="svg-tile-slab" d="${geom.d}" fill="${tile.color}" />
      <path class="svg-tile-overlay" d="${geom.d}" fill="url(#tile-bevel)" />
      ${idx < totalTiles - 1 ? `<line x1="${geom.dividerP1.x}" y1="${geom.dividerP1.y}" x2="${geom.dividerP2.x}" y2="${geom.dividerP2.y}" class="svg-tile-divider" />` : ''}
      <g class="svg-tile-content" transform="translate(${center.x}, ${center.y})">
        ${contentSvg}
      </g>
    `;

    // Interacción Click
    g.addEventListener('click', () => {
      const activeTeam = gameState.teams[gameState.activeTeamIndex];
      updateCurrentTileCard(idx);
      if (activeTeam && activeTeam.position === idx && gameState.currentTile && !gameState.hasAnsweredCurrent) {
        prepareAndShowTrivia(activeTeam, tile);
      }
    });

    tilesLayer.appendChild(g);
  });

  DOM.boardContainer.appendChild(svg);

  renderCategoryLegend();
  renderAllTokens();
  highlightActiveTile();
}

function renderCategoryLegend() {
  const legendBar = document.getElementById('board-legend-bar');
  if (!legendBar) return;
  legendBar.innerHTML = '';

  const activeCats = gameState.selectedCategories;
  activeCats.forEach(catKey => {
    const meta = CATEGORY_META[catKey];
    if (!meta) return;
    const pill = document.createElement('div');
    pill.className = 'legend-pill';
    pill.style.setProperty('--leg-color', meta.color);
    pill.innerHTML = `
      <span class="legend-color-dot" style="background: ${meta.color};"></span>
      <span class="legend-text">${meta.icon} ${meta.name}</span>
    `;
    legendBar.appendChild(pill);
  });

  // Eventos Especiales en la Leyenda
  const specialPills = [
    { name: 'Bono', icon: '🎁', color: '#f59e0b' },
    { name: 'Vórtice (-2)', icon: '🌀', color: '#ef4444' },
    { name: 'Atajo (+3)', icon: '🚀', color: '#10b981' }
  ];
  specialPills.forEach(sp => {
    const pill = document.createElement('div');
    pill.className = 'legend-pill';
    pill.style.setProperty('--leg-color', sp.color);
    pill.innerHTML = `
      <span class="legend-color-dot" style="background: ${sp.color};"></span>
      <span class="legend-text">${sp.icon} ${sp.name}</span>
    `;
    legendBar.appendChild(pill);
  });
}

function highlightActiveTile() {
  document.querySelectorAll('.svg-tile-group').forEach(t => t.classList.remove('is-active'));
  const activeGlow = document.getElementById('svg-active-glow');
  if (gameState.teams.length > 0) {
    const currentTeam = gameState.teams[gameState.activeTeamIndex];
    if (currentTeam) {
      const activeTileG = document.getElementById(`svg-tile-group-${currentTeam.position}`);
      if (activeTileG) {
        activeTileG.classList.add('is-active');
        const activePath = activeTileG.querySelector('.svg-tile-slab');
        if (activePath && activeGlow) {
          activeGlow.setAttribute('d', activePath.getAttribute('d'));
        }
      }
    }
  }
}

function updateCurrentTileCard(pos) {
  const tile = gameState.board[pos];
  if (!tile) return;
  if (DOM.tileInfoIcon) DOM.tileInfoIcon.textContent = tile.icon;
  if (DOM.tileInfoNum) DOM.tileInfoNum.textContent = `Casilla #${pos} de ${gameState.boardLength}`;
  if (DOM.tileInfoName) DOM.tileInfoName.textContent = tile.label;
}

function renderAllTokens() {
  const pawnsLayer = document.getElementById('svg-pawns-layer');
  if (!pawnsLayer) return;
  pawnsLayer.innerHTML = '';

  gameState.teams.forEach(team => {
    const center = gameState.tileCenters[team.position];
    if (!center) return;

    // Calcular colisión si varios equipos están en la misma casilla
    const teamsOnTile = gameState.teams.filter(t => t.position === team.position);
    const slot = teamsOnTile.indexOf(team);
    let ox = 0, oy = 0;
    if (teamsOnTile.length === 2) {
      ox = slot === 0 ? -16 : 16;
      oy = 0;
    } else if (teamsOnTile.length === 3) {
      const angle = (slot * 2 * Math.PI) / 3 - Math.PI / 2;
      ox = Math.round(16 * Math.cos(angle));
      oy = Math.round(16 * Math.sin(angle));
    } else if (teamsOnTile.length >= 4) {
      ox = (slot % 2 === 0 ? -15 : 15);
      oy = (slot < 2 ? -15 : 15);
    }

    const isActive = team.id === gameState.teams[gameState.activeTeamIndex].id;

    const pawnG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pawnG.setAttribute('class', `svg-pawn-group ${isActive ? 'is-active-turn' : ''}`);
    pawnG.setAttribute('id', `svg-pawn-team-${team.id}`);
    pawnG.setAttribute('transform', `translate(${center.x + ox}, ${center.y + oy})`);
    pawnG.setAttribute('filter', 'url(#pawn-drop-shadow)');

    pawnG.innerHTML = `
      <title>${team.name} (Casilla #${team.position})</title>
      <ellipse cx="0" cy="18" rx="15" ry="5" fill="rgba(0,0,0,0.4)" />
      ${isActive ? `<circle cx="0" cy="0" r="23" fill="none" stroke="#fbbf24" stroke-width="3" class="pawn-active-ring" />` : ''}
      <circle cx="0" cy="0" r="18" fill="${team.color}" stroke="#ffffff" stroke-width="2.5" class="pawn-body" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="central" font-size="20" class="pawn-avatar">${team.avatar}</text>
      <rect x="-14" y="14" width="28" height="11" rx="5.5" fill="#0f172a" stroke="${team.color}" stroke-width="1.2" />
      <text x="0" y="22.5" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff">${team.name.substring(0, 3).toUpperCase()}</text>
    `;

    pawnsLayer.appendChild(pawnG);
  });
}

// ==================== CONTROLES DE TURNO Y MARCADOR ====================
function updateTurnDisplay() {
  const currentTeam = gameState.teams[gameState.activeTeamIndex];
  DOM.turnTeamAvatar.textContent = currentTeam.avatar;
  DOM.turnTeamName.textContent = currentTeam.name;
  DOM.turnTeamName.style.color = currentTeam.color;

  if (gameState.hasExtraTurn && gameState.activeTeamIndex === gameState.extraTurnTeamIndex) {
    DOM.diceMessage.innerHTML = `⚡ <span style="color: var(--gold-light); font-weight: 800;">¡TURNO DOBLE POR FALLO RIVAL!</span> ¡${currentTeam.name}, lanza el dado!`;
  } else {
    DOM.diceMessage.textContent = `¡${currentTeam.name}, es tu turno de jugar!`;
  }

  DOM.diceFaceVal.textContent = '🎲';
  disableRollControls(false);

  if (DOM.btnOpenQuestion) {
    DOM.btnOpenQuestion.classList.add('hidden');
  }

  updateDiceModeUI();
  updateCurrentTileCard(currentTeam.position);
  highlightActiveTile();
  renderActiveTeamComodines(currentTeam);
}

function updateDiceModeUI() {
  const isVirtual = gameState.diceMode === 'virtual';
  const is2Dice = gameState.diceCount === 2;

  // Actualizar botones de toggle en la barra superior del panel
  if (DOM.btnToggleDiceVirtual) DOM.btnToggleDiceVirtual.classList.toggle('active', isVirtual);
  if (DOM.btnToggleDiceManual) DOM.btnToggleDiceManual.classList.toggle('active', !isVirtual);
  if (DOM.btnToggleDiceCount1) DOM.btnToggleDiceCount1.classList.toggle('active', !is2Dice);
  if (DOM.btnToggleDiceCount2) DOM.btnToggleDiceCount2.classList.toggle('active', is2Dice);

  // Mostrar / Ocultar secciones correspondientes
  if (isVirtual) {
    if (DOM.virtualDiceSection) DOM.virtualDiceSection.classList.remove('hidden');
    if (DOM.manualDiceSection) DOM.manualDiceSection.classList.add('hidden');
    if (DOM.btnRollDice) {
      DOM.btnRollDice.classList.remove('hidden');
      DOM.btnRollDice.textContent = is2Dice ? '🎲🎲 ¡TIRAR 2 DADOS!' : '🎲 ¡TIRAR DADO!';
    }
  } else {
    if (DOM.virtualDiceSection) DOM.virtualDiceSection.classList.add('hidden');
    if (DOM.manualDiceSection) DOM.manualDiceSection.classList.remove('hidden');

    if (DOM.manualKeypad1) DOM.manualKeypad1.classList.toggle('hidden', is2Dice);
    if (DOM.manualKeypad2) DOM.manualKeypad2.classList.toggle('hidden', !is2Dice);

    if (DOM.manualDiceInstruction) {
      DOM.manualDiceInstruction.textContent = is2Dice 
        ? "Lanza 2 dados en tu mesa y pulsa la suma (2 a 12):" 
        : "Lanza 1 dado en tu mesa y pulsa el valor (1 a 6):";
    }
  }
}

function disableRollControls(disabled) {
  if (DOM.btnRollDice) DOM.btnRollDice.disabled = disabled;
  document.querySelectorAll('.manual-die-val-btn').forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '0.4' : '1';
    btn.style.pointerEvents = disabled ? 'none' : 'auto';
  });
}

function renderActiveTeamComodines(team) {
  DOM.activeTeamComodines.innerHTML = `
    <span class="comodin-chip" title="Descarta 2 opciones">🔍 50/50: <strong>${team.comodines['5050']}</strong></span>
    <span class="comodin-chip" title="Cambia la pregunta">⏳ Salto: <strong>${team.comodines['skip']}</strong></span>
    <span class="comodin-chip" title="Protección de vórtice">🛡️ Escudo: <strong>${team.comodines['shield']}</strong></span>
  `;
}

function updateLeaderboard() {
  DOM.teamsLeaderboard.innerHTML = '';

  // Ordenar copia por posición descendente
  const sorted = [...gameState.teams].sort((a, b) => b.position - a.position);

  sorted.forEach(team => {
    const card = document.createElement('div');
    const isCurrent = team.id === gameState.teams[gameState.activeTeamIndex].id;
    card.className = `team-score-card ${isCurrent ? 'is-turn' : ''}`;
    card.style.setProperty('--t-color', team.color);
    card.style.setProperty('--t-glow', team.glow);

    card.innerHTML = `
      <div class="t-info">
        <span style="font-size: 1.2rem;">${team.avatar}</span>
        <span class="t-name">${team.name}</span>
      </div>
      <div class="t-pos-badge">Casilla ${team.position}/${gameState.boardLength}</div>
    `;

    DOM.teamsLeaderboard.appendChild(card);
  });
}

// ==================== MECÁNICA DEL DADO Y MOVIMIENTO ====================
function setupRollControls() {
  if (DOM.btnRollDice) DOM.btnRollDice.onclick = rollDiceAndMove;
  if (DOM.diceElement) {
    DOM.diceElement.onclick = () => {
      if (!DOM.btnRollDice.disabled && gameState.diceMode === 'virtual') rollDiceAndMove();
    };
  }

  // Toggles de Turno (Virtual vs Manual y 1 vs 2 dados)
  if (DOM.btnToggleDiceVirtual) {
    DOM.btnToggleDiceVirtual.onclick = () => {
      gameState.diceMode = 'virtual';
      updateDiceModeUI();
      saveCronoTriviaGame();
    };
  }
  if (DOM.btnToggleDiceManual) {
    DOM.btnToggleDiceManual.onclick = () => {
      gameState.diceMode = 'manual';
      updateDiceModeUI();
      saveCronoTriviaGame();
    };
  }
  if (DOM.btnToggleDiceCount1) {
    DOM.btnToggleDiceCount1.onclick = () => {
      gameState.diceCount = 1;
      updateDiceModeUI();
      saveCronoTriviaGame();
    };
  }
  if (DOM.btnToggleDiceCount2) {
    DOM.btnToggleDiceCount2.onclick = () => {
      gameState.diceCount = 2;
      updateDiceModeUI();
      saveCronoTriviaGame();
    };
  }

  // Botones de teclado de dados manuales (1 a 6 y 2 a 12)
  document.querySelectorAll('.manual-die-val-btn').forEach(btn => {
    btn.onclick = () => {
      submitManualDiceRoll(btn.dataset.val);
    };
  });
}

function submitManualDiceRoll(val) {
  if (gameState.diceRolling) return;
  const roll = parseInt(val, 10);
  if (isNaN(roll) || roll < 1) return;

  const currentTeam = gameState.teams[gameState.activeTeamIndex];
  currentTeam.turnStartPos = currentTeam.position;

  gameState.diceRolling = true;
  disableRollControls(true);
  soundManager.playDiceRoll();

  DOM.diceFaceVal.textContent = roll;
  DOM.diceMessage.textContent = `🖐️ Dado en mesa: ¡Sacaste ${roll} y avanzas ${roll} ${roll === 1 ? 'casilla' : 'casillas'}!`;

  executeTeamMove(currentTeam, roll);
}

function rollDiceAndMove() {
  if (gameState.diceRolling) return;
  gameState.diceRolling = true;
  disableRollControls(true);

  const currentTeam = gameState.teams[gameState.activeTeamIndex];
  currentTeam.turnStartPos = currentTeam.position;

  soundManager.playDiceRoll();
  DOM.diceElement.classList.add('rolling');

  const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  let rollCounter = 0;
  
  const rollInterval = setInterval(() => {
    if (gameState.diceCount === 2) {
      const f1 = diceFaces[Math.floor(Math.random() * 6)];
      const f2 = diceFaces[Math.floor(Math.random() * 6)];
      DOM.diceFaceVal.textContent = `${f1} ${f2}`;
    } else {
      DOM.diceFaceVal.textContent = diceFaces[Math.floor(Math.random() * 6)];
    }
    rollCounter++;
    if (rollCounter > 8) {
      clearInterval(rollInterval);
      DOM.diceElement.classList.remove('rolling');
      
      let roll = 0;
      if (gameState.diceCount === 2) {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        roll = d1 + d2;
        DOM.diceFaceVal.textContent = `${d1}+${d2}`;
        DOM.diceMessage.textContent = `¡Obtuviste ${roll} (${d1} + ${d2})!`;
      } else {
        roll = Math.floor(Math.random() * 6) + 1;
        DOM.diceFaceVal.textContent = roll;
        DOM.diceMessage.textContent = `¡Obtuviste un ${roll}!`;
      }

      executeTeamMove(currentTeam, roll);
    }
  }, 60);
}

function executeTeamMove(team, roll) {
  const targetPos = Math.min(team.position + roll, gameState.boardLength);

  moveTeamStepByStep(team, targetPos, () => {
    gameState.diceRolling = false;
    disableRollControls(false);
    handleTileLanding(team, targetPos);
    saveCronoTriviaGame();
  });
}

function moveTeamStepByStep(team, targetPos, onComplete) {
  if (team.position === targetPos) {
    if (onComplete) onComplete();
    return;
  }

  const direction = targetPos > team.position ? 1 : -1;
  const stepInterval = setInterval(() => {
    team.position += direction;
    if (direction > 0) {
      soundManager.playMoveStep();
    } else {
      soundManager.playTone(320, 'sawtooth', 0.08, 0.1);
    }
    renderAllTokens();
    updateLeaderboard();
    highlightActiveTile();
    updateCurrentTileCard(team.position);

    if (team.position === targetPos) {
      clearInterval(stepInterval);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 350);
    }
  }, 220);
}

// ==================== EVENTOS AL CAER EN CASILLA ====================
function handleTileLanding(team, pos) {
  const tile = gameState.board[pos];
  gameState.currentTile = tile;

  updateCurrentTileCard(pos);
  highlightActiveTile();
  saveCronoTriviaGame();

  if (tile.type === 'salida') {
    passToNextTurn();
  } else {
    // Activar botón de responder pregunta en el panel de control
    if (DOM.btnOpenQuestion) {
      DOM.btnOpenQuestion.classList.remove('hidden');
      DOM.btnOpenQuestion.onclick = () => prepareAndShowTrivia(team, tile);
    }
    DOM.btnRollDice.classList.add('hidden');
    if (DOM.manualDiceSection) DOM.manualDiceSection.classList.add('hidden');
    if (tile.type === 'cofre') {
      DOM.diceMessage.textContent = `¡Caíste en Cofre Temporal! 🎁 Acierta la trivia para abrir el cofre y ganar tu bono:`;
    } else {
      DOM.diceMessage.textContent = `¡Caíste en ${tile.label}! Pulsa Responder o resuelve el desafío:`;
    }

    // Abrir automáticamente la trivia
    setTimeout(() => {
      prepareAndShowTrivia(team, tile);
    }, 450);
  }
}

function openChestEvent(team) {
  soundManager.playVictory();
  team.stats.chests++;

  const perks = ['5050', 'skip', 'shield'];
  const perkNames = {
    '5050': '🔍 50 / 50 (Descarta 2 opciones)',
    'skip': '⏳ Salto Temporal (Cambia la pregunta)',
    'shield': '🛡️ Escudo Paradoja (Inmunidad a vórtices)'
  };
  const wonPerk = perks[Math.floor(Math.random() * perks.length)];
  team.comodines[wonPerk]++;
  saveCronoTriviaGame();

  DOM.eventIcon.textContent = '🎁';
  DOM.eventTitle.textContent = `¡Cofre Temporal para ${team.name}!`;
  DOM.eventDesc.textContent = "Has encontrado una reliquia en el continuo espacio-tiempo.";
  DOM.eventRewardBox.textContent = `Obtienes: ${perkNames[wonPerk]}`;

  DOM.eventModal.classList.remove('hidden');

  DOM.btnEventConfirm.onclick = () => {
    DOM.eventModal.classList.add('hidden');
    passToNextTurn();
  };
}

// ==================== GENERADOR DE PREGUNTAS (TRIVIA) ====================
function getTriviaGeneralQuestions() {
  if (typeof TRIVIA_GENERAL_QUESTIONS !== 'undefined' && Array.isArray(TRIVIA_GENERAL_QUESTIONS)) {
    return TRIVIA_GENERAL_QUESTIONS;
  }
  if (typeof window !== 'undefined' && window.TRIVIA_GENERAL_QUESTIONS && Array.isArray(window.TRIVIA_GENERAL_QUESTIONS)) {
    return window.TRIVIA_GENERAL_QUESTIONS;
  }
  return [];
}

function getCategoryPool(catKey) {
  try {
    if (typeof GAME_VERSIONS !== 'undefined' && GAME_VERSIONS[catKey] && Array.isArray(GAME_VERSIONS[catKey].cards)) {
      return GAME_VERSIONS[catKey].cards;
    }
    switch (catKey) {
      case 'historia':
        if (typeof CARDS_HISTORIA !== 'undefined' && Array.isArray(CARDS_HISTORIA)) return CARDS_HISTORIA;
        if (typeof INITIAL_CARDS !== 'undefined' && Array.isArray(INITIAL_CARDS)) return INITIAL_CARDS;
        break;
      case 'canciones':
        if (typeof CARDS_CANCIONES !== 'undefined' && Array.isArray(CARDS_CANCIONES)) return CARDS_CANCIONES;
        break;
      case 'peliculas':
        if (typeof CARDS_PELICULAS !== 'undefined' && Array.isArray(CARDS_PELICULAS)) return CARDS_PELICULAS;
        break;
      case 'tecnologia':
        if (typeof CARDS_TECNOLOGIA !== 'undefined' && Array.isArray(CARDS_TECNOLOGIA)) return CARDS_TECNOLOGIA;
        break;
      case 'farandula':
        if (typeof CARDS_FARANDULA !== 'undefined' && Array.isArray(CARDS_FARANDULA)) return CARDS_FARANDULA;
        break;
      case 'guerras':
        if (typeof CARDS_GUERRAS !== 'undefined' && Array.isArray(CARDS_GUERRAS)) return CARDS_GUERRAS;
        break;
    }
  } catch (err) {
    console.error("Error obteniendo cartas:", catKey, err);
  }
  return [];
}

function generateQuestionForTile(tile) {
  let catKey = tile.type;
  if (['cofre', 'salida', 'vortice', 'atajo', 'duelo', 'meta'].includes(catKey)) {
    // Seleccionar categoría al azar de las seleccionadas
    const cats = gameState.selectedCategories;
    catKey = cats[Math.floor(Math.random() * cats.length)];
  }

  const catMeta = CATEGORY_META[catKey] || CATEGORY_META.historia;

  // CASO 1: CATEGORÍA DE TRIVIA GENERAL
  if (catMeta.type === 'trivia') {
    const allTrivia = getTriviaGeneralQuestions();
    let pool = allTrivia.filter(q => q.categoria === catKey);
    if (pool.length === 0) pool = allTrivia;

    if (pool.length > 0) {
      let available = pool.filter(q => !gameState.usedTriviaIds.has(q.id));
      if (available.length === 0) {
        // Liberar solo las preguntas de esta categoría para que no afecte a las otras
        pool.forEach(q => gameState.usedTriviaIds.delete(q.id));
        available = pool;
      }

      const tq = available[Math.floor(Math.random() * available.length)];
      if (tq) {
        gameState.usedTriviaIds.add(tq.id);

        return {
          isGeneralTrivia: true,
          categoryKey: catKey,
          categoryName: catMeta.name,
          categoryIcon: catMeta.icon,
          prompt: `Trivia: ${catMeta.name}`,
          titulo: tq.pregunta,
          descripcion: `Dificultad: ${tq.dificultad.toUpperCase()}`,
          correctAnswer: tq.respuestaCorrecta,
          options: [...tq.opciones].sort(() => Math.random() - 0.5),
          explicacion: tq.explicacion,
          imagen: tq.imagen || null,
          tipoImagen: tq.tipoImagen || null,
          svg: tq.svg || null
        };
      }
    }
  }

  // CASO 2: CATEGORÍA BASADA EN CARTAS DE CRONOLINE
  const pool = getCategoryPool(catKey);
  if (!pool || pool.length === 0) {
    return {
      isGeneralTrivia: false,
      categoryKey: 'historia',
      categoryName: 'Historia',
      categoryIcon: '🏛️',
      prompt: '¿En qué año ocurrió este suceso?',
      titulo: 'Descubrimiento de América',
      descripcion: 'Llegada de Cristóbal Colón a América.',
      correctAnswer: 1492,
      options: [1475, 1492, 1512, 1520],
      explicacion: 'Ocurrió en el año 1492.'
    };
  }

  // Filtrar cartas no usadas
  let availableCards = pool.filter(c => !gameState.usedCardIds.has(c.id));
  if (availableCards.length === 0) {
    gameState.usedCardIds.clear();
    availableCards = pool;
  }

  let card = availableCards[Math.floor(Math.random() * availableCards.length)];
  gameState.usedCardIds.add(card.id);

  const correctYear = Math.floor(card.año || 2000);
  
  // Generar 3 distractores convincentes
  const offsets = [-20, -15, -12, -10, -8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20];
  const distractors = new Set();

  for (let i = 0; i < 25 && distractors.size < 3; i++) {
    const other = pool[Math.floor(Math.random() * pool.length)];
    const otherYear = Math.floor(other.año || 0);
    if (otherYear !== correctYear && otherYear > 0 && Math.abs(otherYear - correctYear) <= 35) {
      distractors.add(otherYear);
    }
  }

  while (distractors.size < 3) {
    const off = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = correctYear + off;
    if (candidate !== correctYear && candidate > 0 && candidate <= 2026) {
      distractors.add(candidate);
    }
  }

  const options = Array.from(distractors);
  options.push(correctYear);
  options.sort(() => Math.random() - 0.5);

  let prompt = "¿En qué año ocurrió este suceso?";
  if (catKey === 'canciones') prompt = "¿En qué año se lanzó esta canción?";
  if (catKey === 'peliculas') prompt = "¿En qué año se estrenó esta película?";
  if (catKey === 'tecnologia') prompt = "¿En qué año se lanzó o inventó?";
  if (catKey === 'farandula') prompt = "¿En qué año ocurrió este momento?";

  return {
    isGeneralTrivia: false,
    categoryKey: catKey,
    categoryName: catMeta.name,
    categoryIcon: catMeta.icon,
    prompt: prompt,
    titulo: card.titulo,
    descripcion: card.descripcion_corta || "",
    correctAnswer: correctYear,
    options: options,
    explicacion: `Ocurrió exactamente en <strong>${correctYear}</strong>.<br><small>${card.descripcion_corta || ''}</small>`
  };
}

// ==================== MODAL DE TRIVIA Y RESPUESTA ====================
function prepareAndShowTrivia(team, tile) {
  gameState.currentQuestion = generateQuestionForTile(tile);
  gameState.hasAnsweredCurrent = false;

  const q = gameState.currentQuestion;

  // Header
  DOM.triviaModalTeam.style.borderColor = team.color;
  DOM.triviaTeamIcon.textContent = team.avatar;
  DOM.triviaTeamName.textContent = team.name;

  DOM.triviaCatIcon.textContent = q.categoryIcon;
  DOM.triviaCatTitle.textContent = q.categoryName;

  // Dificultad o Tipo de Casilla
  if (tile.type === 'vortice') {
    DOM.triviaModalDiff.textContent = '🌀 Peligro de Vórtice';
    DOM.triviaModalDiff.style.background = 'rgba(239, 68, 68, 0.2)';
    DOM.triviaModalDiff.style.color = '#fca5a5';
  } else if (tile.type === 'atajo') {
    DOM.triviaModalDiff.textContent = '🚀 Reto de Atajo (+3)';
    DOM.triviaModalDiff.style.background = 'rgba(16, 185, 129, 0.2)';
    DOM.triviaModalDiff.style.color = '#6ee7b7';
  } else if (tile.type === 'cofre') {
    DOM.triviaModalDiff.textContent = '🎁 Reto de Cofre (Bono)';
    DOM.triviaModalDiff.style.background = 'rgba(245, 158, 11, 0.25)';
    DOM.triviaModalDiff.style.color = '#fbbf24';
  } else if (tile.type === 'meta') {
    DOM.triviaModalDiff.textContent = '👑 Desafío Final del Campeón';
    DOM.triviaModalDiff.style.background = 'rgba(251, 191, 36, 0.2)';
    DOM.triviaModalDiff.style.color = 'var(--gold-light)';
  } else {
    DOM.triviaModalDiff.textContent = 'Trivia Estándar';
    DOM.triviaModalDiff.style.background = 'rgba(255, 255, 255, 0.1)';
    DOM.triviaModalDiff.style.color = '#fff';
  }

  // Contenido
  if (tile.type === 'cofre') {
    DOM.triviaPromptTag.textContent = `🎁 Pregunta de Cofre: ¡Acierta para abrir el cofre y ganar tu comodín!`;
  } else {
    DOM.triviaPromptTag.textContent = q.prompt;
  }
  DOM.triviaEventTitle.textContent = q.titulo;
  DOM.triviaEventDesc.textContent = q.descripcion;

  // Renderizar Contenido Visual (Banderas, Mapas SVG, Ilustraciones)
  const mediaWrapper = document.getElementById('trivia-media-wrapper');
  const mediaContainer = document.getElementById('trivia-media-container');

  if (mediaWrapper && mediaContainer) {
    if (q.svg) {
      mediaContainer.innerHTML = q.svg;
      mediaWrapper.classList.remove('hidden');
    } else if (q.imagen) {
      const isFlag = q.tipoImagen === 'bandera';
      mediaContainer.innerHTML = `<img src="${q.imagen}" alt="Ilustración" class="${isFlag ? 'trivia-media-flag' : ''}" onerror="this.parentElement.parentElement.classList.add('hidden')">`;
      mediaWrapper.classList.remove('hidden');
    } else {
      mediaContainer.innerHTML = '';
      mediaWrapper.classList.add('hidden');
    }
  }

  // Opciones
  renderTriviaOptions(q.options, q.correctAnswer, team, tile);

  // Comodines
  updateTriviaPerks(team);

  // Feedback Panel oculto
  DOM.triviaFeedbackPanel.classList.add('hidden');

  // Mostrar modal y reiniciar posición de scroll
  DOM.triviaModal.classList.remove('hidden');
  if (DOM.triviaModalCard) {
    DOM.triviaModalCard.scrollTop = 0;
  }
  DOM.triviaModal.scrollTop = 0;

  // Iniciar Temporizador
  startTimer();
}

function renderTriviaOptions(options, correctAnswer, team, tile) {
  DOM.triviaOptionsGrid.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = opt;

    btn.addEventListener('click', () => {
      if (gameState.hasAnsweredCurrent) return;
      handleAnswerSelection(opt, correctAnswer, btn, team, tile);
    });

    DOM.triviaOptionsGrid.appendChild(btn);
  });
}

function updateTriviaPerks(team) {
  DOM.count5050.textContent = team.comodines['5050'];
  DOM.perk5050.disabled = team.comodines['5050'] <= 0;

  DOM.countSkip.textContent = team.comodines['skip'];
  DOM.perkSkip.disabled = team.comodines['skip'] <= 0;

  DOM.countShield.textContent = team.comodines['shield'];
  DOM.perkShield.disabled = team.comodines['shield'] <= 0;

  // Listeners de comodines
  DOM.perk5050.onclick = () => {
    if (team.comodines['5050'] > 0 && !gameState.hasAnsweredCurrent) {
      team.comodines['5050']--;
      apply5050Perk(gameState.currentQuestion.correctAnswer);
      updateTriviaPerks(team);
      renderActiveTeamComodines(team);
      saveCronoTriviaGame();
    }
  };

  DOM.perkSkip.onclick = () => {
    if (team.comodines['skip'] > 0 && !gameState.hasAnsweredCurrent) {
      team.comodines['skip']--;
      clearInterval(gameState.timerInterval);
      prepareAndShowTrivia(team, gameState.currentTile);
      renderActiveTeamComodines(team);
      saveCronoTriviaGame();
    }
  };

  DOM.perkShield.onclick = () => {
    alert("🛡️ Tu Escudo Paradoja se activará automáticamente si caes en un vórtice y fallas.");
  };
}

function apply5050Perk(correctAnswer) {
  const buttons = Array.from(DOM.triviaOptionsGrid.querySelectorAll('.option-btn'));
  const incorrectBtns = buttons.filter(b => b.textContent !== String(correctAnswer));
  
  // Descartar 2 incorrectas
  incorrectBtns.sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(2, incorrectBtns.length); i++) {
    incorrectBtns[i].classList.add('dimmed');
    incorrectBtns[i].disabled = true;
  }
}

// ==================== TEMPORIZADOR ====================
function startTimer() {
  clearInterval(gameState.timerInterval);

  if (gameState.timerLimit <= 0) {
    DOM.timerBarFill.parentElement.style.display = 'none';
    return;
  }

  DOM.timerBarFill.parentElement.style.display = 'flex';
  let timeLeft = gameState.timerLimit;
  DOM.timerSecondsText.textContent = `${timeLeft}s`;
  DOM.timerBarFill.style.width = '100%';
  DOM.timerBarFill.style.background = 'linear-gradient(90deg, #10b981, #fbbf24)';

  gameState.timerInterval = setInterval(() => {
    timeLeft--;
    DOM.timerSecondsText.textContent = `${timeLeft}s`;
    const pct = (timeLeft / gameState.timerLimit) * 100;
    DOM.timerBarFill.style.width = `${pct}%`;

    if (timeLeft <= 10) {
      DOM.timerBarFill.style.background = '#ef4444';
    }

    if (timeLeft <= 0) {
      clearInterval(gameState.timerInterval);
      // Tiempo agotado = respuesta incorrecta
      if (!gameState.hasAnsweredCurrent) {
        handleTimeOut();
      }
    }
  }, 1000);
}

function handleTimeOut() {
  gameState.hasAnsweredCurrent = true;
  soundManager.playIncorrect();

  const currentTeam = gameState.teams[gameState.activeTeamIndex];
  currentTeam.stats.answered++;

  // Revelar correcta
  const buttons = DOM.triviaOptionsGrid.querySelectorAll('.option-btn');
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === String(gameState.currentQuestion.correctAnswer)) {
      b.classList.add('correct');
    }
  });

  DOM.feedbackIcon.textContent = '⏰';
  DOM.feedbackStatusTitle.textContent = '¡SE ACABÓ EL TIEMPO!';
  DOM.feedbackStatusTitle.style.color = '#ef4444';
  DOM.feedbackExplanation.innerHTML = `La respuesta correcta era: <strong>${gameState.currentQuestion.correctAnswer}</strong>.<br><small>${gameState.currentQuestion.explicacion}</small>`;

  applyConsequences(false, currentTeam, gameState.currentTile);
}

// ==================== RESOLUCIÓN DE RESPUESTA ====================
function handleAnswerSelection(chosen, correct, clickedBtn, team, tile) {
  gameState.hasAnsweredCurrent = true;
  clearInterval(gameState.timerInterval);

  team.stats.answered++;
  const isCorrect = String(chosen) === String(correct);

  const buttons = DOM.triviaOptionsGrid.querySelectorAll('.option-btn');
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === String(correct)) {
      b.classList.add('correct');
    }
  });

  if (isCorrect) {
    clickedBtn.classList.add('correct');
    team.stats.correct++;
    soundManager.playCorrect();

    DOM.feedbackIcon.textContent = '🎉';
    DOM.feedbackStatusTitle.textContent = '¡RESPUESTA CORRECTA!';
    DOM.feedbackStatusTitle.style.color = '#10b981';
    DOM.feedbackExplanation.innerHTML = `¡Excelente! ${gameState.currentQuestion.explicacion}`;
  } else {
    clickedBtn.classList.add('incorrect');
    soundManager.playIncorrect();

    DOM.feedbackIcon.textContent = '❌';
    DOM.feedbackStatusTitle.textContent = '¡RESPUESTA INCORRECTA!';
    DOM.feedbackStatusTitle.style.color = '#ef4444';
    DOM.feedbackExplanation.innerHTML = `La respuesta correcta era: <strong>${correct}</strong>.<br><small>${gameState.currentQuestion.explicacion}</small>`;
  }

  applyConsequences(isCorrect, team, tile);
}

function applyConsequences(isCorrect, team, tile) {
  let consequenceText = "";
  let actionCallback = null;
  const originPos = (typeof team.turnStartPos === 'number') ? team.turnStartPos : 0;

  if (isCorrect) {
    if (tile.type === 'cofre') {
      soundManager.playVictory();
      team.stats.chests++;

      const perks = ['5050', 'skip', 'shield'];
      const perkNames = {
        '5050': '🔍 50 / 50 (Descarta 2 opciones)',
        'skip': '⏳ Salto Temporal (Cambia la pregunta)',
        'shield': '🛡️ Escudo Paradoja (Inmunidad a vórtices)'
      };
      const wonPerk = perks[Math.floor(Math.random() * perks.length)];
      team.comodines[wonPerk]++;

      DOM.feedbackIcon.textContent = '🎁';
      DOM.feedbackStatusTitle.textContent = '¡RESPUESTA CORRECTA! ¡COFRE ABIERTO!';
      consequenceText = `🎁 ¡Has abierto el cofre del tesoro! Conquistas la casilla y ganas el comodín: ${perkNames[wonPerk]}.`;
      actionCallback = null;
    } else if (tile.type === 'atajo') {
      const bonus = Math.min(team.position + 3, gameState.boardLength);
      consequenceText = "🚀 ¡Atajo temporal activado! ¡Avanzas 3 casillas adicionales!";
      actionCallback = (done) => moveTeamStepByStep(team, bonus, done);
    } else if (tile.type === 'meta') {
      consequenceText = "👑 ¡HAS CONQUISTADO EL CURSO DEL TIEMPO! ¡VICTORIA!";
      actionCallback = () => triggerVictory(team);
    } else {
      consequenceText = "✅ ¡Respuesta correcta! Conquistas la casilla y aseguras tu avance.";
      actionCallback = null;
    }
  } else {
    // RESPUESTA INCORRECTA O TIEMPO AGOTADO
    if (tile.type === 'cofre') {
      DOM.feedbackIcon.textContent = '🔒';
      DOM.feedbackStatusTitle.textContent = '¡COFRE CERRADO!';
      if (gameState.penaltyRule === 'origin') {
        consequenceText = `❌ ¡Respuesta incorrecta! No pudiste abrir el cofre del bono y retrocedes a tu casilla de origen (#${originPos}).`;
        actionCallback = (done) => moveTeamStepByStep(team, originPos, done);
      } else if (gameState.penaltyRule === 'double') {
        gameState.pendingExtraTurn = true;
        consequenceText = `❌ ¡Respuesta incorrecta! No ganas el bono, retrocedes a tu casilla de origen (#${originPos}) y el rival obtiene TURNO DOBLE.`;
        actionCallback = (done) => moveTeamStepByStep(team, originPos, done);
      } else {
        // 'none'
        consequenceText = "❌ ¡Respuesta incorrecta! Te quedas en la casilla pero no ganas el bono del cofre.";
        actionCallback = null;
      }
    } else if (tile.type === 'vortice') {
      if (team.comodines['shield'] > 0) {
        team.comodines['shield']--;
        consequenceText = `🛡️ ¡Tu Escudo Paradoja te protegió del vórtice! Solo vuelves a tu casilla de origen (#${originPos}).`;
        actionCallback = (done) => moveTeamStepByStep(team, originPos, done);
      } else {
        const vortexPenalty = Math.max(0, originPos - 2);
        consequenceText = `🌀 ¡El Vórtice Temporal te arrastra! Vuelves al origen y retrocedes 2 casillas adicionales (Casilla #${vortexPenalty}).`;
        actionCallback = (done) => moveTeamStepByStep(team, vortexPenalty, done);
      }
      if (gameState.penaltyRule === 'double') {
        gameState.pendingExtraTurn = true;
        consequenceText += " Además, ¡el rival obtiene TURNO DOBLE!";
      }
    } else if (tile.type === 'meta') {
      const fallback = Math.max(0, gameState.boardLength - 2);
      consequenceText = `⚠️ Desafío Final no superado. Retrocedes a la casilla #${fallback} para intentarlo nuevamente.`;
      actionCallback = (done) => moveTeamStepByStep(team, fallback, done);
      if (gameState.penaltyRule === 'double') {
        gameState.pendingExtraTurn = true;
        consequenceText += " ¡El rival obtiene TURNO DOBLE!";
      }
    } else {
      // Casillas normales
      if (gameState.penaltyRule === 'origin') {
        consequenceText = `❌ ¡Respuesta incorrecta! Pierdes el avance de esta tirada y retrocedes a tu casilla de origen (#${originPos}).`;
        actionCallback = (done) => moveTeamStepByStep(team, originPos, done);
      } else if (gameState.penaltyRule === 'double') {
        gameState.pendingExtraTurn = true;
        consequenceText = `❌ ¡Respuesta incorrecta! Retrocedes a la casilla de origen (#${originPos}) y el rival obtiene TURNO DOBLE.`;
        actionCallback = (done) => moveTeamStepByStep(team, originPos, done);
      } else {
        // 'none'
        consequenceText = "Modo amigable: Mantienes la casilla conquistada para tu próximo turno.";
        actionCallback = null;
      }
    }
  }

  DOM.feedbackConsequence.textContent = consequenceText;
  DOM.triviaFeedbackPanel.classList.remove('hidden');
  saveCronoTriviaGame();

  // Desplazamiento automático suave hacia el feedback y botón Continuar en celulares
  setTimeout(() => {
    if (DOM.btnNextTurn) {
      DOM.btnNextTurn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (DOM.triviaFeedbackPanel) {
      DOM.triviaFeedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);

  DOM.btnNextTurn.onclick = () => {
    DOM.btnNextTurn.onclick = null;
    DOM.triviaModal.classList.add('hidden');
    if (actionCallback) {
      actionCallback(() => {
        if (tile.type !== 'meta' || !isCorrect) {
          passToNextTurn();
        }
      });
    } else {
      if (tile.type !== 'meta' || !isCorrect) {
        passToNextTurn();
      }
    }
  };
}

// ==================== CAMBIO DE TURNO (PASS & PLAY) ====================
function passToNextTurn() {
  if (gameState.pendingExtraTurn) {
    gameState.pendingExtraTurn = false;
    gameState.hasExtraTurn = true;
    const nextIdx = (gameState.activeTeamIndex + 1) % gameState.teams.length;
    gameState.extraTurnTeamIndex = nextIdx;
    gameState.activeTeamIndex = nextIdx;
  } else if (gameState.hasExtraTurn && gameState.activeTeamIndex === gameState.extraTurnTeamIndex) {
    gameState.hasExtraTurn = false;
    gameState.extraTurnTeamIndex = null;
    // Active team stays the same!
  } else {
    gameState.activeTeamIndex = (gameState.activeTeamIndex + 1) % gameState.teams.length;
  }

  updateLeaderboard();
  updateTurnDisplay();
  saveCronoTriviaGame();
}

// ==================== VICTORIA Y CONFETI ====================
function triggerVictory(winnerTeam) {
  clearCronoTriviaGame();
  DOM.triviaModal.classList.add('hidden');
  DOM.victoryScreen.classList.remove('hidden');
  soundManager.playVictory();

  DOM.winnerAvatar.textContent = winnerTeam.avatar;
  DOM.winnerTeamName.textContent = winnerTeam.name;
  DOM.winnerTeamName.style.color = winnerTeam.color;

  // Podio
  const sorted = [...gameState.teams].sort((a, b) => b.position - a.position);
  DOM.victoryPodium.innerHTML = '';
  const medals = ['🥇 1º Lugar', '🥈 2º Lugar', '🥉 3º Lugar', '4º Lugar'];

  sorted.forEach((team, idx) => {
    const row = document.createElement('div');
    row.className = 'podium-row';
    row.innerHTML = `
      <span class="podium-rank">${medals[idx] || `${idx + 1}º`}</span>
      <span style="font-weight: 700; color: ${team.color};">${team.avatar} ${team.name}</span>
      <span style="color: var(--gold); font-size: 0.85rem;">Casilla ${team.position}</span>
    `;
    DOM.victoryPodium.appendChild(row);
  });

  // Estadísticas
  DOM.victoryStats.innerHTML = `
    <div class="v-stat-card">
      <div class="v-stat-val">${winnerTeam.stats.correct}</div>
      <div class="v-stat-lbl">Aciertos del Ganador</div>
    </div>
    <div class="v-stat-card">
      <div class="v-stat-val">${gameState.boardLength}</div>
      <div class="v-stat-lbl">Casillas Conquistadas</div>
    </div>
    <div class="v-stat-card">
      <div class="v-stat-val">${winnerTeam.stats.chests}</div>
      <div class="v-stat-lbl">Cofres Encontrados</div>
    </div>
  `;

  launchConfetti();
}

function launchConfetti() {
  const canvas = DOM.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const particles = [];
  const colors = ['#fbbf24', '#f59e0b', '#0ea5e9', '#ec4899', '#10b981', '#ffffff'];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      vrot: Math.random() * 10 - 5
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    animationFrame = requestAnimationFrame(updateConfetti);
  }

  updateConfetti();
  setTimeout(() => cancelAnimationFrame(animationFrame), 12000);
}

// Iniciar al cargar DOM
document.addEventListener('DOMContentLoaded', initSetup);

// ==================== PERSISTENCIA DE SESIÓN (AUTO-SAVE & RESTORE) ====================

const CRONOTRIVIA_STORAGE_KEY = 'cronotrivia_active_session_v1';

/**
 * Guarda el estado actual de la partida en localStorage
 */
function saveCronoTriviaGame() {
  if (!DOM.carreraGame || DOM.carreraGame.classList.contains('hidden')) return;
  if (DOM.victoryScreen && !DOM.victoryScreen.classList.contains('hidden')) return;
  if (!gameState.teams || gameState.teams.length === 0) return;

  const session = {
    teamsCount: gameState.teamsCount,
    teams: gameState.teams.map(t => ({
      id: t.id,
      name: t.name,
      avatar: t.avatar,
      color: t.color,
      glow: t.glow,
      position: t.position,
      turnStartPos: t.turnStartPos,
      comodines: { ...t.comodines },
      stats: { ...t.stats }
    })),
    boardLength: gameState.boardLength,
    board: gameState.board,
    selectedCategories: gameState.selectedCategories,
    timerLimit: gameState.timerLimit,
    penaltyRule: gameState.penaltyRule,
    diceMode: gameState.diceMode,
    diceCount: gameState.diceCount,
    pendingExtraTurn: gameState.pendingExtraTurn,
    hasExtraTurn: gameState.hasExtraTurn,
    extraTurnTeamIndex: gameState.extraTurnTeamIndex,
    activeTeamIndex: gameState.activeTeamIndex,
    usedCardIds: Array.from(gameState.usedCardIds || []),
    usedTriviaIds: Array.from(gameState.usedTriviaIds || []),
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(CRONOTRIVIA_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn("Error guardando sesión de CronoTrivia:", err);
  }
}

/**
 * Borra la sesión guardada
 */
function clearCronoTriviaGame() {
  try {
    localStorage.removeItem(CRONOTRIVIA_STORAGE_KEY);
  } catch (err) {}
}

/**
 * Muestra notificación toast de progreso restaurado
 */
function showSaveRestoreToast(msg = '🔄 ¡Partida restaurada automáticamente!', onDiscard = null) {
  let toast = document.getElementById('save-restore-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'save-restore-toast';
    toast.className = 'save-restore-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span>${msg}</span>
    ${onDiscard ? '<button type="button" class="btn-discard-toast" style="background: rgba(239,68,68,0.25); border: 1px solid rgba(239,68,68,0.6); color: #fca5a5; border-radius: 6px; padding: 0.2rem 0.55rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; margin-left: 0.4rem;">Descartar</button>' : ''}
  `;

  if (onDiscard) {
    const discardBtn = toast.querySelector('.btn-discard-toast');
    if (discardBtn) {
      discardBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toast.classList.remove('show');
        onDiscard();
      });
    }
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * Comprueba si hay una partida activa guardada y la restaura
 */
function checkAndRestoreCronoTriviaGame() {
  const raw = localStorage.getItem(CRONOTRIVIA_STORAGE_KEY);
  if (!raw) return false;

  try {
    const session = JSON.parse(raw);
    if (!session || !Array.isArray(session.teams) || session.teams.length === 0 || !Array.isArray(session.board) || session.board.length === 0) {
      clearCronoTriviaGame();
      return false;
    }

    gameState.teamsCount = session.teamsCount || session.teams.length;
    gameState.teams = session.teams;
    gameState.boardLength = session.boardLength || 30;
    gameState.board = session.board;
    gameState.selectedCategories = session.selectedCategories || ['historia', 'canciones'];
    gameState.timerLimit = typeof session.timerLimit === 'number' ? session.timerLimit : 45;
    gameState.penaltyRule = session.penaltyRule || 'origin';
    gameState.diceMode = session.diceMode || 'virtual';
    gameState.diceCount = session.diceCount || 1;
    gameState.pendingExtraTurn = !!session.pendingExtraTurn;
    gameState.hasExtraTurn = !!session.hasExtraTurn;
    gameState.extraTurnTeamIndex = session.extraTurnTeamIndex !== undefined ? session.extraTurnTeamIndex : null;
    gameState.activeTeamIndex = (typeof session.activeTeamIndex === 'number' && session.activeTeamIndex < session.teams.length) ? session.activeTeamIndex : 0;
    gameState.usedCardIds = new Set(session.usedCardIds || []);
    gameState.usedTriviaIds = new Set(session.usedTriviaIds || []);
    gameState.diceRolling = false;
    gameState.currentQuestion = null;
    gameState.currentTile = null;
    gameState.hasAnsweredCurrent = false;

    // Ocultar cualquier modal que haya quedado abierto
    if (DOM.triviaModal) DOM.triviaModal.classList.add('hidden');
    if (DOM.eventModal) DOM.eventModal.classList.add('hidden');
    if (DOM.victoryScreen) DOM.victoryScreen.classList.add('hidden');

    // Cambiar a pantalla de juego
    DOM.carreraSetup.classList.add('hidden');
    DOM.carreraGame.classList.remove('hidden');

    // Renderizar todo el tablero y controles
    renderBoard();
    updateLeaderboard();
    updateTurnDisplay();
    setupRollControls();

    showSaveRestoreToast('🔄 ¡Partida de CronoTrivia restaurada!', () => {
      clearCronoTriviaGame();
      DOM.carreraGame.classList.add('hidden');
      DOM.carreraSetup.classList.remove('hidden');
    });

    return true;
  } catch (err) {
    console.error("Error restaurando partida de CronoTrivia:", err);
    clearCronoTriviaGame();
    return false;
  }
}

// Guardar partida antes de recargar o cerrar pestaña
window.addEventListener('beforeunload', () => {
  saveCronoTriviaGame();
});
