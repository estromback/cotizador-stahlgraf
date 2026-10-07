/**
 * LÓGICA DEL JUEGO - CRONOLINE
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * 
 * Este archivo gestiona el estado de la partida, los turnos (Pass & Play),
 * la validación cronológica y las actualizaciones de la interfaz.
 */

// --- ESTADO DEL JUEGO ---
let gameState = {
  version: 'historia',       // 'historia' | 'canciones' | 'peliculas' | 'farandula' | 'edificios' | 'guerras'
  mode: 'solitario',         // 'solitario' o 'multiplayer'
  deck: [],                 // Mazo de cartas filtrado y barajado
  placedCards: [],          // Cartas colocadas correctamente en el timeline (ordenadas)
  currentCard: null,        // Carta que el jugador debe colocar ahora
  
  // Modo Solitario
  score: 0,                 // Aciertos seguidos (racha actual)
  bestScore: 0,             // Mejor racha histórica (guardada en localStorage)
  
  // Modo Multijugador
  players: [],              // Lista de jugadores { name, lives, score, isDead }
  activePlayerIndex: 0,     // Índice del jugador activo
  maxLives: 3,              // Vidas por jugador al iniciar
  timelineMode: 'compartida', // 'compartida' o 'individual'
  difficulty: 'todas',        // 'todas' | 'facil' | 'media' | 'dificil'
  tentativeIndex: null,       // Índice de posicionamiento tentativo en el timeline
  winCondition: 'survival',   // 'survival' o 'race'
  targetCards: 5              // Cantidad de cartas para ganar en modo carrera
};

// --- ELEMENTOS DEL DOM ---
const hubScreen = document.getElementById('hub-screen');
const btnEnterCronoline = document.getElementById('btn-enter-cronoline');
const btnBackToHub = document.getElementById('btn-back-to-hub');
const versionScreen = document.getElementById('version-screen');
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const timelineWrapper = document.getElementById('timeline-wrapper');
const timelineSection = document.getElementById('timeline-section');
const activeCardContainer = document.getElementById('active-card-container');
const livesDisplay = document.getElementById('lives-display');
const scoreValue = document.getElementById('score-value');
const scoreLabel = document.getElementById('score-label');
const activePlayerTag = document.getElementById('game-active-player');

const setupTitle = document.getElementById('setup-title');
const setupSubtitle = document.getElementById('setup-subtitle');
const categoriesGridContainer = document.getElementById('categories-grid-container');
const difficultySetupGroup = document.getElementById('difficulty-setup-group');
const categoriesSetupGroup = document.getElementById('categories-setup-group');

// Botones y Selectores
const btnModeSolitario = document.getElementById('btn-mode-solitario');
const btnModeMultiplayer = document.getElementById('btn-mode-multiplayer');
const multiplayerConfig = document.getElementById('multiplayer-config');
const playerInputsContainer = document.getElementById('player-inputs');
const btnStartGame = document.getElementById('btn-start-game');
const btnExitGame = document.getElementById('btn-exit-game');
const btnTimelineShared = document.getElementById('btn-timeline-shared');
const btnTimelineIndividual = document.getElementById('btn-timeline-individual');
const btnBackToVersions = document.getElementById('btn-back-to-versions');

// Modales y Overlays
const flashFeedback = document.getElementById('flash-feedback');
const errorOverlay = document.getElementById('error-overlay');
const errorCardPreview = document.getElementById('error-card-preview');
const btnContinueError = document.getElementById('btn-continue-error');

const transitionOverlay = document.getElementById('transition-overlay');
const transitionPlayerTitle = document.getElementById('transition-player-title');
const transitionPlayerDesc = document.getElementById('transition-player-desc');
const btnTransitionStart = document.getElementById('btn-transition-start');

const gameoverOverlay = document.getElementById('gameover-overlay');
const gameoverTitle = document.getElementById('gameover-title');
const gameoverDesc = document.getElementById('gameover-desc');
const gameoverSummaryList = document.getElementById('gameover-summary-list');
const btnRestartGame = document.getElementById('btn-restart-game');

// Modal de Inspección de Carta
const inspectOverlay = document.getElementById('inspect-overlay');
const inspectCardTitle = document.getElementById('inspect-card-title');
const inspectCardBadge = document.getElementById('inspect-card-badge');
const inspectCardDesc = document.getElementById('inspect-card-desc');
const btnCloseInspect = document.getElementById('btn-close-inspect');

// Modal de Instrucciones
const instructionsOverlay = document.getElementById('instructions-overlay');
const btnOpenInstructionsVersions = document.getElementById('btn-open-instructions-versions');
const btnOpenInstructionsSetup = document.getElementById('btn-open-instructions-setup');
const btnOpenInstructionsGame = document.getElementById('btn-open-instructions-game');
const btnCloseInstructions = document.getElementById('btn-close-instructions');

// --- EVENT LISTENERS Y LÓGICA DE SELECCIÓN DE VERSIÓN ---

// Selección de Versión
document.querySelectorAll('.version-select-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const version = btn.dataset.version;
    selectVersion(version);
  });
});

function selectVersion(version) {
  gameState.version = version;
  const versionMeta = GAME_VERSIONS[version];
  
  if (!versionMeta) return;
  
  // Actualizar Títulos del Setup
  setupTitle.textContent = versionMeta.title;
  setupSubtitle.textContent = versionMeta.subtitle;
  
  // Controlar visibilidad del selector de dificultad
  if (versionMeta.hasDifficulty) {
    difficultySetupGroup.classList.remove('hidden');
  } else {
    difficultySetupGroup.classList.add('hidden');
  }
  
  // Generar Categorías Dinámicamente
  categoriesGridContainer.innerHTML = '';
  const categories = versionMeta.categories;
  const catKeys = Object.keys(categories);
  
  if (catKeys.length > 0) {
    categoriesSetupGroup.classList.remove('hidden');
    catKeys.forEach(catKey => {
      const cat = categories[catKey];
      
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = `cat-${catKey}-cb`;
      cb.className = 'category-checkbox';
      cb.dataset.category = catKey;
      cb.checked = true;
      
      const label = document.createElement('label');
      label.htmlFor = `cat-${catKey}-cb`;
      label.className = `category-label cat-${catKey}`;
      label.style.setProperty('--color-accent', cat.color);
      label.style.setProperty('--glow-accent', cat.glow);
      label.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
      
      categoriesGridContainer.appendChild(cb);
      categoriesGridContainer.appendChild(label);
    });
  } else {
    categoriesSetupGroup.classList.add('hidden');
  }
  
  // Ir al setup
  versionScreen.classList.add('hidden');
  setupScreen.classList.remove('hidden');
}

// Navegación del Hub de Juegos Stahlgraf
function showCronolineVersionScreen() {
  if (hubScreen) hubScreen.classList.add('hidden');
  if (versionScreen) versionScreen.classList.remove('hidden');
  if (setupScreen) setupScreen.classList.add('hidden');
  if (gameScreen) gameScreen.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHubMainScreen() {
  if (versionScreen) versionScreen.classList.add('hidden');
  if (setupScreen) setupScreen.classList.add('hidden');
  if (gameScreen) gameScreen.classList.add('hidden');
  if (hubScreen) hubScreen.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (btnEnterCronoline) {
  btnEnterCronoline.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof soundManager !== 'undefined') soundManager?.playClick?.();
    window.location.hash = '#cronoline';
    showCronolineVersionScreen();
  });
}

if (btnBackToHub) {
  btnBackToHub.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof soundManager !== 'undefined') soundManager?.playClick?.();
    window.location.hash = '';
    showHubMainScreen();
  });
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#cronoline') {
    showCronolineVersionScreen();
  } else if (!window.location.hash || window.location.hash === '#hub') {
    showHubMainScreen();
  }
});

// Botón de Volver al Selector de Versión
btnBackToVersions.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  versionScreen.classList.remove('hidden');
});

// Cambiar de modo a Solitario
btnModeSolitario.addEventListener('click', () => {
  btnModeSolitario.classList.add('active');
  btnModeMultiplayer.classList.remove('active');
  multiplayerConfig.classList.add('hidden');
  gameState.mode = 'solitario';
});

// Cambiar de modo a Multijugador
btnModeMultiplayer.addEventListener('click', () => {
  btnModeMultiplayer.classList.add('active');
  btnModeSolitario.classList.remove('active');
  multiplayerConfig.classList.remove('hidden');
  gameState.mode = 'multiplayer';
});

// Selector de Modo de Línea Temporal (Compartida vs Individual)
btnTimelineShared.addEventListener('click', () => {
  btnTimelineShared.classList.add('active');
  btnTimelineIndividual.classList.remove('active');
  gameState.timelineMode = 'compartida';
});

btnTimelineIndividual.addEventListener('click', () => {
  btnTimelineIndividual.classList.add('active');
  btnTimelineShared.classList.remove('active');
  gameState.timelineMode = 'individual';
});

// Selector de Dificultad
const diffButtons = document.querySelectorAll('.diff-btn');
diffButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    diffButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    gameState.difficulty = e.target.dataset.diff;
  });
});

// Selector de número de jugadores (2 a 4)
document.querySelectorAll('#multiplayer-config .count-btn[data-count]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('#multiplayer-config .count-btn[data-count]').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    const count = parseInt(e.currentTarget.dataset.count);
    configurePlayerInputs(count);
  });
});

// Selector de vidas por jugador (1, 3, 5, 8, ilimitadas)
const livesButtons = document.querySelectorAll('#lives-selector .count-btn');
livesButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    livesButtons.forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const val = e.currentTarget.dataset.lives;
    gameState.maxLives = val === 'infinite' ? Infinity : parseInt(val);
  });
});

// Selector de Objetivo de Partida (Supervivencia vs Carrera)
const btnGoalSurvival = document.getElementById('btn-goal-survival');
const btnGoalRace = document.getElementById('btn-goal-race');
const raceTargetConfig = document.getElementById('race-target-config');

btnGoalSurvival.addEventListener('click', () => {
  btnGoalSurvival.classList.add('active');
  btnGoalRace.classList.remove('active');
  gameState.winCondition = 'survival';
  raceTargetConfig.classList.add('hidden');
});

btnGoalRace.addEventListener('click', () => {
  btnGoalRace.classList.add('active');
  btnGoalSurvival.classList.remove('active');
  gameState.winCondition = 'race';
  raceTargetConfig.classList.remove('hidden');
});

// Selector de cartas para ganar en modo Carrera (5, 10, 15, 20)
const targetCardsButtons = document.querySelectorAll('#target-cards-selector .count-btn');
targetCardsButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    targetCardsButtons.forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    gameState.targetCards = parseInt(e.currentTarget.dataset.target);
  });
});

// Asignar nombres aleatorios a los inputs de jugadores
function randomizeCronolinePlayerNames(force = false) {
  if (typeof getRandomTeamNames !== 'function') return;
  const count = 4;
  const currentValues = [];
  if (!force) {
    for (let i = 1; i <= count; i++) {
      const input = document.getElementById(`player-name-${i}`);
      if (input && input.value.trim() && !input.value.startsWith('Jugador ')) {
        currentValues.push(input.value.trim());
      }
    }
  }
  
  const randomNames = getRandomTeamNames(count, currentValues);
  for (let i = 1; i <= count; i++) {
    const input = document.getElementById(`player-name-${i}`);
    if (input) {
      if (force || !input.value.trim() || input.value.startsWith('Jugador ')) {
        input.value = randomNames[i - 1];
      }
    }
  }
}

// Botón para aleatorizar nombres en Cronoline
const btnRandomizeCronolineNames = document.getElementById('btn-randomize-cronoline-names');
if (btnRandomizeCronolineNames) {
  btnRandomizeCronolineNames.addEventListener('click', () => {
    randomizeCronolinePlayerNames(true);
  });
}

// Mostrar/Ocultar inputs de nombres según cantidad elegida
function configurePlayerInputs(count) {
  const inputs = playerInputsContainer.querySelectorAll('.input-wrapper');
  inputs.forEach((inputWrapper, index) => {
    if (index < count) {
      inputWrapper.classList.remove('hidden');
      const input = inputWrapper.querySelector('input');
      if (input && !input.value.trim()) {
        input.value = (typeof getRandomSingleTeamName === 'function') 
          ? getRandomSingleTeamName() 
          : `Equipo ${index + 1}`;
      }
    } else {
      inputWrapper.classList.add('hidden');
    }
  });
}

// Botón de iniciar juego
btnStartGame.addEventListener('click', () => {
  if (startNewGame()) {
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    window.StahlgrafAnalytics?.trackGameStart('cronoline', {
      version: currentVersion,
      mode: gameState.mode,
      players: gameState.players?.length || 1
    });
  }
});

// Botón salir al menú
btnExitGame.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres abandonar la partida? Se perderá todo el progreso.')) {
    clearCronolineSavedGame();
    returnToMenu();
  }
});

// Botones de modales
btnContinueError.addEventListener('click', () => {
  errorOverlay.classList.remove('active');
  
  if (gameState.mode === 'solitario') {
    prepareNextCard();
    const status = checkGameStatus();
    if (status.over) {
      endGame(status.victory);
    } else {
      renderActiveCard();
      saveCronolineGame();
    }
  } else {
    // Comprobar si la partida terminó tras perder vidas
    const status = checkGameStatus();
    if (status.over) {
      endGame(status.victory, status.winner);
    } else {
      renderPassTurnButton();
      saveCronolineGame();
    }
  }
});

btnRestartGame.addEventListener('click', () => {
  gameoverOverlay.classList.remove('active');
  clearCronolineSavedGame();
  returnToMenu();
});

// Listeners para el modal de inspección de carta
btnCloseInspect.addEventListener('click', () => {
  inspectOverlay.classList.remove('active');
});

inspectOverlay.addEventListener('click', (e) => {
  if (e.target === inspectOverlay) {
    inspectOverlay.classList.remove('active');
  }
});

// Listeners para el modal de instrucciones
document.querySelectorAll('.btn-open-rules, #btn-open-instructions-versions, #btn-open-instructions-setup, #btn-open-instructions-game').forEach(btn => {
  btn.addEventListener('click', () => {
    instructionsOverlay.classList.add('active');
  });
});

const btnTopBackToVersions = document.getElementById('btn-top-back-to-versions');
if (btnTopBackToVersions) {
  btnTopBackToVersions.addEventListener('click', () => {
    setupScreen.classList.add('hidden');
    versionScreen.classList.remove('hidden');
  });
}

btnCloseInstructions.addEventListener('click', () => {
  instructionsOverlay.classList.remove('active');
});

instructionsOverlay.addEventListener('click', (e) => {
  if (e.target === instructionsOverlay) {
    instructionsOverlay.classList.remove('active');
  }
});

// --- LÓGICA CORE DEL JUEGO ---

/**
 * Inicia el estado de una nueva partida
 */
function formatCardValue(cardData) {
  if (cardData.valor_display) {
    return cardData.valor_display;
  }
  return cardData.año < 0 ? `${Math.abs(cardData.año)} A.C.` : cardData.año;
}

/**
 * Inicia el estado de una nueva partida
 */
function startNewGame() {
  gameState.tentativeIndex = null;
  // 1. Obtener categorías seleccionadas
  const selectedCategories = [];
  const checkboxes = categoriesGridContainer.querySelectorAll('.category-checkbox');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedCategories.push(cb.dataset.category);
    }
  });
  
  if (selectedCategories.length === 0) {
    alert('Por favor, selecciona al menos una categoría para jugar.');
    return false;
  }
  
  // 2. Cargar mejor puntuación de Solitario por versión
  gameState.bestScore = parseInt(localStorage.getItem(`cronoline_best_score_${gameState.version}`)) || 0;
  
  // 3. Filtrar y barajar el mazo usando la versión activa
  const versionMeta = GAME_VERSIONS[gameState.version || 'historia'];
  let filteredCards = versionMeta.cards.filter(card => selectedCategories.includes(card.categoria));
  
  if (versionMeta.hasDifficulty && gameState.difficulty !== 'todas') {
    filteredCards = filteredCards.filter(card => card.dificultad === gameState.difficulty);
  }
  
  if (filteredCards.length < 5) {
    alert('No hay suficientes cartas seleccionadas para iniciar una partida adecuada.');
    return false;
  }
  
  gameState.deck = [...filteredCards];
  shuffle(gameState.deck);
  
  // 4. Configurar según el modo
  if (gameState.mode === 'solitario') {
    gameState.score = 0;
    activePlayerTag.textContent = 'Modo Solitario';
    scoreLabel.textContent = 'Racha Actual';
    scoreValue.textContent = '0';
    livesDisplay.innerHTML = `🏆 Racha máx: ${gameState.bestScore}`;
  } else {
    // Modo Multijugador
    gameState.players = [];
    const countBtn = document.querySelector('#multiplayer-config .count-btn[data-count].active');
    const playerCount = parseInt(countBtn.dataset.count);
    
    for (let i = 1; i <= playerCount; i++) {
      const nameInput = document.getElementById(`player-name-${i}`);
      const fallback = (typeof getRandomSingleTeamName === 'function') ? getRandomSingleTeamName() : `Equipo ${i}`;
      const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : fallback;
      gameState.players.push({
        name: name,
        lives: gameState.maxLives,
        score: gameState.timelineMode === 'individual' ? 1 : 0,
        isDead: false,
        placedCards: [] // Línea temporal individual
      });
    }
    
    gameState.activePlayerIndex = 0;
    scoreLabel.textContent = gameState.timelineMode === 'individual' ? 'Cartas en Línea' : 'Aciertos';
    scoreValue.textContent = gameState.timelineMode === 'individual' ? '1' : '0';
    updateMultiplayerHeader();
  }
  
  // 5. Establecer carta inicial en el centro de la línea
  gameState.placedCards = [];
  
  if (gameState.mode === 'solitario' || gameState.timelineMode === 'compartida') {
    const starterCard = gameState.deck.pop();
    gameState.placedCards.push(starterCard);
  } else {
    // Cada jugador/equipo tiene su propia línea temporal y carta de inicio
    gameState.players.forEach(player => {
      const starterCard = gameState.deck.pop();
      player.placedCards.push(starterCard);
    });
  }
  
  // 6. Obtener primera carta para colocar
  gameState.currentCard = gameState.deck.pop();
  
  // 7. Renderizar tablero inicial
  renderTimeline();
  renderActiveCard();
  
  saveCronolineGame();
  return true;
}

/**
 * Baraja un array usando Fisher-Yates
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Renderiza la línea de tiempo horizontal con sus ranuras
 */
/**
 * Obtiene la línea de tiempo activa según la modalidad
 */
function getActiveTimeline() {
  if (gameState.mode === 'solitario' || gameState.timelineMode === 'compartida') {
    return gameState.placedCards;
  } else {
    const activePlayer = gameState.players[gameState.activePlayerIndex];
    return activePlayer.placedCards;
  }
}

// ==================== MECÁNICA DE DRAG & DROP EN CRONOLINE ====================
let isDragInProgress = false;

/**
 * Habilita arrastrar (Desktop Drag & Drop y Touch Mobile) en una carta activa o tentativa
 */
function enableDragOnCard(cardEl) {
  if (!gameState.currentCard) return;
  cardEl.setAttribute('draggable', 'true');
  cardEl.classList.add('draggable');

  // --- HTML5 Desktop Drag & Drop ---
  cardEl.addEventListener('dragstart', (e) => {
    isDragInProgress = true;
    setTimeout(() => {
      cardEl.classList.add('is-dragging');
    }, 0);
    e.dataTransfer.setData('text/plain', 'cronoline-card');
    e.dataTransfer.effectAllowed = 'move';
  });

  cardEl.addEventListener('dragend', () => {
    cardEl.classList.remove('is-dragging');
    clearAllSlotDragOver();
    setTimeout(() => {
      isDragInProgress = false;
    }, 100);
  });

  // --- Mobile Touch Drag & Drop (Pantallas táctiles y móviles) ---
  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoved = false;
  let touchGhost = null;

  cardEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchMoved = false;
  }, { passive: true });

  cardEl.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (!touchMoved && Math.hypot(dx, dy) > 8) {
      touchMoved = true;
      isDragInProgress = true;
      cardEl.classList.add('is-dragging');

      touchGhost = cardEl.cloneNode(true);
      touchGhost.className = 'card touch-drag-ghost';
      // Eliminar por completo la cara trasera del fantasma de arrastre
      const ghostBack = touchGhost.querySelector('.card-back');
      if (ghostBack) ghostBack.remove();
      touchGhost.style.left = `${touch.clientX}px`;
      touchGhost.style.top = `${touch.clientY}px`;
      document.body.appendChild(touchGhost);
    }

    if (touchMoved && touchGhost) {
      if (e.cancelable) e.preventDefault();
      touchGhost.style.left = `${touch.clientX}px`;
      touchGhost.style.top = `${touch.clientY}px`;

      checkAutoScrollTimeline(touch.clientX);
      updateTouchHoverTarget(touch.clientX, touch.clientY);
    }
  }, { passive: false });

  cardEl.addEventListener('touchend', (e) => {
    if (touchMoved) {
      if (e.cancelable) e.preventDefault();
      cardEl.classList.remove('is-dragging');
      if (touchGhost && touchGhost.parentNode) {
        touchGhost.parentNode.removeChild(touchGhost);
        touchGhost = null;
      }

      const touch = e.changedTouches[0];
      const targetIndex = findDropTargetIndexAtPoint(touch.clientX, touch.clientY);
      clearAllSlotDragOver();

      if (targetIndex !== null) {
        selectTentativeSlot(targetIndex);
      }

      setTimeout(() => {
        isDragInProgress = false;
      }, 150);
    }
  }, { passive: false });

  cardEl.addEventListener('touchcancel', () => {
    cardEl.classList.remove('is-dragging');
    if (touchGhost && touchGhost.parentNode) {
      touchGhost.parentNode.removeChild(touchGhost);
      touchGhost = null;
    }
    clearAllSlotDragOver();
    isDragInProgress = false;
  });
}

function setupSlotDropTarget(slot, index) {
  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    slot.classList.add('drag-over');
    checkAutoScrollTimeline(e.clientX);
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('drag-over');
  });

  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    selectTentativeSlot(index);
  });
}

function setupCardDropTarget(cardEl, index) {
  cardEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = cardEl.getBoundingClientRect();
    const isLeft = e.clientX < rect.left + rect.width / 2;
    const targetIdx = isLeft ? index : index + 1;
    highlightSlotByIndex(targetIdx);
    checkAutoScrollTimeline(e.clientX);
  });

  cardEl.addEventListener('dragleave', (e) => {
    if (!cardEl.contains(e.relatedTarget)) {
      clearAllSlotDragOver();
    }
  });

  cardEl.addEventListener('drop', (e) => {
    e.preventDefault();
    clearAllSlotDragOver();
    const rect = cardEl.getBoundingClientRect();
    const isLeft = e.clientX < rect.left + rect.width / 2;
    const targetIdx = isLeft ? index : index + 1;
    selectTentativeSlot(targetIdx);
  });
}

function highlightSlotByIndex(index) {
  clearAllSlotDragOver();
  const slot = timelineWrapper.querySelector(`.insert-slot[data-index="${index}"]`);
  if (slot) slot.classList.add('drag-over');
}

function clearAllSlotDragOver() {
  document.querySelectorAll('.insert-slot.drag-over').forEach(s => s.classList.remove('drag-over'));
}

function checkAutoScrollTimeline(clientX) {
  const container = document.getElementById('timeline-section');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const threshold = 70;
  if (clientX < rect.left + threshold) {
    container.scrollLeft -= 15;
  } else if (clientX > rect.right - threshold) {
    container.scrollLeft += 15;
  }
}

function updateTouchHoverTarget(clientX, clientY) {
  const targetIndex = findDropTargetIndexAtPoint(clientX, clientY);
  if (targetIndex !== null) {
    highlightSlotByIndex(targetIndex);
  } else {
    clearAllSlotDragOver();
  }
}

function findDropTargetIndexAtPoint(clientX, clientY) {
  const ghost = document.querySelector('.touch-drag-ghost');
  if (ghost) ghost.style.display = 'none';
  const el = document.elementFromPoint(clientX, clientY);
  if (ghost) ghost.style.display = 'block';

  if (!el) return null;

  // 1. Directamente sobre una ranura
  const slot = el.closest('.insert-slot');
  if (slot && slot.dataset.index !== undefined) {
    return parseInt(slot.dataset.index, 10);
  }

  // 2. Sobre una carta colocada en el timeline
  const card = el.closest('#timeline-wrapper .card:not(.tentative-card)');
  if (card && card.dataset.placedIndex !== undefined) {
    const placedIdx = parseInt(card.dataset.placedIndex, 10);
    const rect = card.getBoundingClientRect();
    return (clientX < rect.left + rect.width / 2) ? placedIdx : placedIdx + 1;
  }

  // 3. Sobre la carta tentativa misma
  const tentativeCard = el.closest('.tentative-card');
  if (tentativeCard && tentativeCard.dataset.tentativeIndex !== undefined) {
    return parseInt(tentativeCard.dataset.tentativeIndex, 10);
  }

  return null;
}

/**
 * Renderiza la línea de tiempo horizontal con sus ranuras y carta tentativa (sin pin redundante)
 */
function renderTimeline() {
  // Limpiar contenedor (dejando solo la línea de fondo estática)
  timelineWrapper.innerHTML = '<div class="timeline-line"></div>';
  
  const activeTimeline = getActiveTimeline();
  const totalCards = activeTimeline.length;
  const T = gameState.tentativeIndex;
  
  // Renderizar ranuras e insertar cartas
  for (let i = 0; i <= totalCards; i++) {
    // 1. Si la carta tentativa se encuentra en esta posición, dibujarla en lugar de la ranura i (SIN PIN REDUNDANTE)
    if (T !== null && T === i) {
      const tentativeCardEl = createCardElement(gameState.currentCard, false);
      tentativeCardEl.classList.add('tentative-card');
      tentativeCardEl.dataset.tentativeIndex = i;
      enableDragOnCard(tentativeCardEl);
      timelineWrapper.appendChild(tentativeCardEl);
    } else {
      // 2. Ranura de Inserción normal con botón '+'
      const slot = document.createElement('div');
      slot.className = 'insert-slot';
      slot.dataset.index = i;
      
      const slotBtn = document.createElement('button');
      slotBtn.className = 'insert-slot-btn';
      slotBtn.textContent = '+';
      slot.appendChild(slotBtn);
      
      slot.addEventListener('click', () => {
        selectTentativeSlot(i);
      });
      
      setupSlotDropTarget(slot, i);
      timelineWrapper.appendChild(slot);
    }
    
    // 3. Carta ya colocada (si no es la última ranura)
    if (i < totalCards) {
      const cardData = activeTimeline[i];
      const cardEl = createCardElement(cardData, true);
      cardEl.dataset.placedIndex = i;
      cardEl.addEventListener('click', () => {
        if (!isDragInProgress) {
          showCardInspection(cardData);
        }
      });
      setupCardDropTarget(cardEl, i);
      timelineWrapper.appendChild(cardEl);
    }
  }
}

/**
 * Selecciona una ranura de forma tentativa
 */
function selectTentativeSlot(index) {
  if (!gameState.currentCard) return;
  
  gameState.tentativeIndex = index;
  renderTimeline();
  renderActiveCard();
  
  // Hacer auto-scroll hacia la carta tentativa
  setTimeout(() => {
    const tentativeCard = timelineWrapper.querySelector('.tentative-card');
    if (tentativeCard) {
      tentativeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, 50);
}

/**
 * Crea el nodo HTML de una carta (revelada o para colocar)
 */
function createCardElement(cardData, isRevealed) {
  const card = document.createElement('div');
  card.className = `card cat-${cardData.categoria}`;
  if (isRevealed) {
    card.classList.add('revealed');
  }
  
  const catConfig = CATEGORIES[cardData.categoria] || { name: 'Otros', icon: '❓' };
  
  card.innerHTML = `
    <div class="card-inner">
      <!-- CARA FRONTAL (Año oculto) -->
      <div class="card-face card-front">
        <span class="card-category-badge">${catConfig.icon} ${catConfig.name}</span>
        <div class="card-title">${cardData.titulo}</div>
        <p class="card-desc">${cardData.descripcion_corta}</p>
      </div>
      <!-- CARA TRASERA (Año revelado) -->
      <div class="card-face card-back" style="${!isRevealed ? 'display: none;' : ''}">
        <span class="card-back-header">${catConfig.icon} ${catConfig.name}</span>
        <div class="card-year-reveal">${isRevealed ? formatCardValue(cardData) : ''}</div>
        <div class="card-back-title">${cardData.titulo}</div>
        ${(isRevealed && (cardData.categoria === 'rock_pop' || cardData.categoria === 'latino' || cardData.categoria === 'clasicos')) ? `
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(cardData.titulo)}" target="_blank" class="card-play-btn" onclick="event.stopPropagation()" title="Escuchar en YouTube">▶️</a>
        ` : ''}
      </div>
    </div>
  `;
  
  return card;
}

/**
 * Renderiza la carta que el jugador activo debe colocar en su mano (o controles de confirmación)
 */
function renderActiveCard() {
  activeCardContainer.innerHTML = '';
  
  if (gameState.currentCard) {
    if (gameState.tentativeIndex === null) {
      // Caso estándar: la carta está en la mano
      const activeCardEl = createCardElement(gameState.currentCard, false);
      activeCardEl.classList.add('active-card');
      enableDragOnCard(activeCardEl);
      
      activeCardEl.addEventListener('click', () => {
        if (!isDragInProgress) {
          showCardInspection(gameState.currentCard);
        }
      });
      
      activeCardContainer.appendChild(activeCardEl);
    } else {
      // Caso tentativo: la carta está en el tablero. Mostramos controles de confirmación.
      const controlPanel = document.createElement('div');
      controlPanel.style.display = 'flex';
      controlPanel.style.flexDirection = 'column';
      controlPanel.style.alignItems = 'center';
      controlPanel.style.gap = '0.75rem';
      controlPanel.style.animation = 'fadeIn 0.3s ease-out';
      controlPanel.style.width = '100%';
      
      const infoText = document.createElement('p');
      infoText.className = 'text-muted';
      infoText.style.fontSize = '0.85rem';
      infoText.style.textAlign = 'center';
      infoText.style.color = 'var(--gold)';
      infoText.style.margin = '0';
      infoText.innerHTML = `Posicionada en la ranura nº ${gameState.tentativeIndex + 1}.<br>¿Estás seguro de colocarla aquí?`;
      
      const confirmRow = document.createElement('div');
      confirmRow.className = 'confirm-row';
      
      const btnConfirm = document.createElement('button');
      btnConfirm.className = 'btn-primary';
      btnConfirm.style.boxShadow = '0 0 20px var(--gold-glow)';
      btnConfirm.innerHTML = '🔮 Voltear';
      btnConfirm.addEventListener('click', () => {
        confirmPlacement();
      });
      
      const btnReturn = document.createElement('button');
      btnReturn.className = 'mode-btn';
      btnReturn.innerHTML = '↩️ Devolver';
      btnReturn.addEventListener('click', () => {
        gameState.tentativeIndex = null;
        renderTimeline();
        renderActiveCard();
      });
      
      confirmRow.appendChild(btnReturn);
      confirmRow.appendChild(btnConfirm);
      
      controlPanel.appendChild(infoText);
      controlPanel.appendChild(confirmRow);
      
      activeCardContainer.appendChild(controlPanel);
    }
  } else {
    activeCardContainer.innerHTML = '<p class="text-muted">¡Mazo vacío!</p>';
  }
}

/**
 * Confirma la colocación tentando el volteo 3D en el tablero antes de evaluar matemáticamente
 */
function confirmPlacement() {
  if (gameState.tentativeIndex === null) return;
  
  const tentativeCard = timelineWrapper.querySelector('.tentative-card');
  if (tentativeCard) {
    const cardBack = tentativeCard.querySelector('.card-back');
    const yearReveal = tentativeCard.querySelector('.card-year-reveal');
    if (yearReveal && gameState.currentCard) {
      yearReveal.textContent = formatCardValue(gameState.currentCard);
    }
    if (cardBack) {
      cardBack.style.display = 'flex';
    }
    tentativeCard.classList.add('revealed');
    
    // Esperar a que la animación de volteo 3D termine (600ms) para gatillar validación
    setTimeout(() => {
      placeCardAt(gameState.tentativeIndex);
    }, 600);
  } else {
    placeCardAt(gameState.tentativeIndex);
  }
}

/**
 * Muestra el modal de inspección para leer la descripción detallada
 */
function showCardInspection(card) {
  const catConfig = CATEGORIES[card.categoria] || { name: 'Otros', icon: '❓', color: '#fbbf24' };
  
  inspectCardTitle.textContent = card.titulo;
  inspectCardBadge.textContent = `${catConfig.icon} ${catConfig.name}`;
  inspectCardBadge.style.color = catConfig.color;
  inspectCardBadge.style.borderColor = catConfig.color;
  inspectCardDesc.textContent = card.descripcion_corta;
  
  // Agregar link a YouTube si es una canción
  const extraContainer = document.getElementById('inspect-card-extra');
  if (extraContainer) {
    extraContainer.innerHTML = '';
    if (card.categoria === 'rock_pop' || card.categoria === 'latino' || card.categoria === 'clasicos') {
      const link = document.createElement('a');
      link.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(card.titulo)}`;
      link.target = '_blank';
      link.className = 'btn-primary';
      link.style.display = 'inline-flex';
      link.style.alignItems = 'center';
      link.style.gap = '0.5rem';
      link.style.textDecoration = 'none';
      link.style.justifyContent = 'center';
      link.style.width = 'auto';
      link.style.padding = '0.6rem 1.2rem';
      link.style.fontSize = '0.95rem';
      link.style.background = '#e11d48';
      link.style.borderColor = '#be123c';
      link.style.color = '#fff';
      link.style.boxShadow = '0 0 10px rgba(225, 29, 72, 0.4)';
      link.innerHTML = '🎵 Escuchar en YouTube';
      extraContainer.appendChild(link);
    }
  }
  
  inspectOverlay.classList.add('active');
}

/**
 * Lógica de Colocación y Validación
 */
function placeCardAt(index) {
  if (!gameState.currentCard) return;
  
  const cardToPlace = gameState.currentCard;
  const yearToPlace = cardToPlace.año;
  const activeTimeline = getActiveTimeline();
  const totalPlaced = activeTimeline.length;
  
  let isValid = false;
  
  // Matemáticas del orden cronológico
  if (index === 0) {
    // Primera posición: el año debe ser menor o igual al de la primera carta
    isValid = (yearToPlace <= activeTimeline[0].año);
  } else if (index === totalPlaced) {
    // Última posición: el año debe ser mayor o igual al de la última carta
    isValid = (yearToPlace >= activeTimeline[totalPlaced - 1].año);
  } else {
    // Entre medio: el año debe estar en el rango de sus dos vecinas
    const prevYear = activeTimeline[index - 1].año;
    const nextYear = activeTimeline[index].año;
    isValid = (yearToPlace >= prevYear && yearToPlace <= nextYear);
  }
  
  if (isValid) {
    handlePlacementSuccess(cardToPlace, index);
  } else {
    handlePlacementFailure(cardToPlace);
  }
}

/**
 * Gestor de colocación EXITOSA
 */
function handlePlacementSuccess(card, index) {
  // 1. Insertar carta en la lista colocada
  const activeTimeline = getActiveTimeline();
  activeTimeline.splice(index, 0, card);
  gameState.currentCard = null; // Carta consumida
  gameState.tentativeIndex = null; // Limpiar índice tentativo
  
  // 2. Destello verde breve de acierto
  triggerFlashFeedback('correct');
  
  // 3. Renderizar el tablero actualizado
  renderTimeline();
  
  // 4. Centrar scroll en la nueva carta colocada
  setTimeout(() => {
    const cardsOnBoard = timelineWrapper.querySelectorAll('.card');
    const targetCard = cardsOnBoard[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, 100);
  
  // 5. Puntuación y estadísticas
  if (gameState.mode === 'solitario') {
    gameState.score++;
    scoreValue.textContent = gameState.score;
    
    if (gameState.score > gameState.bestScore) {
      gameState.bestScore = gameState.score;
      localStorage.setItem('cronoline_best_score', gameState.bestScore);
      livesDisplay.innerHTML = `🏆 Racha máx: ${gameState.bestScore}`;
    }
    
    prepareNextCard();
    const status = checkGameStatus();
    if (status.over) {
      endGame(status.victory);
    } else {
      renderActiveCard();
      saveCronolineGame();
    }
  } else {
    // Modo Multijugador
    const activePlayer = gameState.players[gameState.activePlayerIndex];
    activePlayer.score++;
    scoreValue.textContent = activePlayer.score;
    
    const status = checkGameStatus();
    if (status.over) {
      endGame(status.victory, status.winner);
    } else {
      renderPassTurnButton();
      saveCronolineGame();
    }
  }
}

/**
 * Gestor de colocación ERRÓNEA
 */
function handlePlacementFailure(card) {
  gameState.currentCard = null; // Carta consumida
  gameState.tentativeIndex = null; // Limpiar índice tentativo
  
  // 1. Destello rojo de fallo
  triggerFlashFeedback('incorrect');
  
  // 2. Preparar el modal de error
  errorCardPreview.innerHTML = '';
  // Clonar la carta para mostrarla revelada en el modal de error
  const previewCard = createCardElement(card, true);
  previewCard.classList.add('shake');
  errorCardPreview.appendChild(previewCard);
  
  // Mostrar modal de error educativo (año correcto visible)
  errorOverlay.classList.add('active');
  
  // 3. Aplicar penalizaciones
  if (gameState.mode === 'solitario') {
    gameState.score = 0; // Se rompe la racha
    scoreValue.textContent = 0;
  } else {
    // Restar vida en Multijugador (solo si no es ilimitado)
    const activePlayer = gameState.players[gameState.activePlayerIndex];
    if (activePlayer.lives !== Infinity) {
      activePlayer.lives--;
      if (activePlayer.lives <= 0) {
        activePlayer.isDead = true;
      }
    }
    updateMultiplayerHeader();
  }
  saveCronolineGame();
}

/**
 * Prepara la siguiente carta del mazo
 */
function prepareNextCard() {
  if (gameState.deck.length > 0) {
    gameState.currentCard = gameState.deck.pop();
  } else {
    gameState.currentCard = null; // No quedan más cartas
  }
}

/**
 * Comprueba si la partida debe terminar
 */
function checkGameStatus() {
  // Si no quedan cartas en el mazo y no hay carta activa
  if (gameState.deck.length === 0 && !gameState.currentCard) {
    if (gameState.mode === 'multiplayer') {
      let bestPlayer = null;
      let maxScore = -1;
      gameState.players.forEach(p => {
        if (!p.isDead && p.score > maxScore) {
          maxScore = p.score;
          bestPlayer = p;
        }
      });
      return { over: true, victory: true, winner: bestPlayer };
    }
    return { over: true, victory: true };
  }
  
  if (gameState.mode === 'multiplayer') {
    const livingPlayers = gameState.players.filter(p => !p.isDead);
    
    // 1. Condición de carrera (Race)
    if (gameState.winCondition === 'race') {
      const activePlayer = gameState.players[gameState.activePlayerIndex];
      if (activePlayer.score >= gameState.targetCards) {
        return { over: true, victory: true, winner: activePlayer };
      }
    }
    
    // 2. Condición de supervivencia (Survival)
    if (livingPlayers.length === 0) {
      return { over: true, victory: false };
    }
    
    if (livingPlayers.length === 1 && gameState.players.length > 1) {
      return { over: true, victory: true, winner: livingPlayers[0] };
    }
  }
  
  return { over: false };
}

/**
 * Encuentra el siguiente jugador con vidas
 */
function getNextLivingPlayer() {
  const players = gameState.players;
  let nextIndex = gameState.activePlayerIndex;
  
  const livingPlayers = players.filter(p => !p.isDead);
  if (livingPlayers.length === 0) return null;
  
  do {
    nextIndex = (nextIndex + 1) % players.length;
  } while (players[nextIndex].isDead);
  
  return players[nextIndex];
}

/**
 * Dibuja un botón en la mano del jugador para pasar el dispositivo al rival
 */
/**
 * Dibuja un botón en la mano del jugador para pasar el dispositivo al rival de forma directa
 */
function renderPassTurnButton() {
  activeCardContainer.innerHTML = '';
  
  const nextPlayer = getNextLivingPlayer();
  if (!nextPlayer) {
    endGame(false);
    return;
  }
  
  const passBtn = document.createElement('button');
  passBtn.className = 'btn-primary';
  passBtn.style.marginTop = '2rem';
  passBtn.style.maxWidth = '320px';
  passBtn.innerHTML = `Pasar Turno a <strong>${nextPlayer.name}</strong> ➡️`;
  
  passBtn.style.boxShadow = '0 0 20px var(--gold-glow)';
  
  passBtn.addEventListener('click', () => {
    // Cambiar al nuevo jugador y actualizar pantalla directamente
    gameState.activePlayerIndex = gameState.players.indexOf(nextPlayer);
    
    updateMultiplayerHeader();
    prepareNextCard();
    gameState.tentativeIndex = null;
    renderTimeline();
    renderActiveCard();
    saveCronolineGame();
  });
  
  activeCardContainer.appendChild(passBtn);
}

/**
 * Dibuja un flash visual rápido en pantalla para feedback instantáneo
 */
function triggerFlashFeedback(type) {
  flashFeedback.className = `flash-feedback ${type}`;
  setTimeout(() => {
    flashFeedback.className = 'flash-feedback';
  }, 350);
}

/**
 * Actualiza la información y vidas del jugador en el header multijugador
 */
function updateMultiplayerHeader() {
  const activePlayer = gameState.players[gameState.activePlayerIndex];
  
  // Nombre
  activePlayerTag.textContent = activePlayer.name;
  
  // Puntuación
  scoreValue.textContent = activePlayer.score;
  
  // Vidas (Corazones)
  livesDisplay.innerHTML = '';
  if (gameState.maxLives === Infinity) {
    const infiniteLabel = document.createElement('span');
    infiniteLabel.style.color = 'var(--gold)';
    infiniteLabel.style.fontSize = '0.9rem';
    infiniteLabel.style.fontWeight = 'bold';
    infiniteLabel.innerHTML = '❤️ × ♾️ (Ilimitadas)';
    livesDisplay.appendChild(infiniteLabel);
  } else {
    for (let i = 0; i < gameState.maxLives; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart';
      if (i < activePlayer.lives) {
        heart.textContent = '❤️';
      } else {
        heart.textContent = '🖤';
        heart.classList.add('lost');
      }
      livesDisplay.appendChild(heart);
    }
  }
}

/**
 * Termina el juego y muestra la pantalla resumen
 */
function endGame(isVictory, winnerOverride = null) {
  clearCronolineSavedGame();
  gameoverOverlay.classList.add('active');
  
  let winner = winnerOverride;
  
  // 1. Configurar Título y Mensaje
  if (gameState.mode === 'solitario') {
    gameoverTitle.textContent = 'Partida Completada';
    gameoverDesc.textContent = `¡Felicidades! Lograste colocar ${gameState.placedCards.length - 1} cartas adicionales en la línea de tiempo. Tu mejor racha fue de ${gameState.bestScore}.`;
  } else {
    // Buscar ganador si no se pasó en el override
    if (!winner) {
      const livingPlayers = gameState.players.filter(p => !p.isDead);
      
      if (livingPlayers.length === 1) {
        winner = livingPlayers[0];
      } else if (livingPlayers.length > 1) {
        winner = [...gameState.players].sort((a, b) => b.score - a.score)[0];
      }
    }
    
    if (winner) {
      gameoverTitle.textContent = `¡Victoria para ${winner.name}!`;
      const livesText = winner.lives === Infinity ? 'vidas ilimitadas' : (winner.lives === 1 ? '1 vida' : `${winner.lives} vidas`);
      if (gameState.winCondition === 'race') {
        if (gameState.timelineMode === 'individual') {
          gameoverDesc.textContent = `¡Ha alcanzado el objetivo de tener ${gameState.targetCards} cartas en su línea de tiempo! Finalizó con ${livesText}.`;
        } else {
          gameoverDesc.textContent = `¡Ha alcanzado el objetivo de ${gameState.targetCards} cartas correctamente posicionadas! Finalizó con ${livesText}.`;
        }
      } else {
        gameoverDesc.textContent = `Ha sobrevivido a la historia con ${livesText} y ${winner.score} aciertos.`;
      }
    } else {
      // Todos murieron
      gameoverTitle.textContent = '¡Todos Eliminados!';
      gameoverDesc.textContent = 'Nadie sobrevivió a las arenas del tiempo. ¡Inténtenlo de nuevo!';
    }
  }
  
  // 2. Generar resumen cronológico de las cartas colocadas
  gameoverSummaryList.innerHTML = '';
  
  // Determinar qué línea de tiempo mostrar en el resumen final
  let displayTimeline = gameState.placedCards;
  if (gameState.mode === 'multiplayer' && gameState.timelineMode === 'individual') {
    if (winner) {
      displayTimeline = winner.placedCards;
      gameoverDesc.textContent += ` Se muestra abajo la línea temporal construida por ${winner.name}.`;
    } else {
      // Si todos murieron, mostramos la del jugador que obtuvo más aciertos
      const bestPlayer = [...gameState.players].sort((a, b) => b.score - a.score)[0];
      if (bestPlayer) {
        displayTimeline = bestPlayer.placedCards;
        gameoverDesc.textContent += ` Se muestra abajo la línea temporal construida por ${bestPlayer.name}.`;
      }
    }
  }
  
  // Ordenar cartas colocadas en la mesa por año de forma ascendente
  const sortedHistory = [...displayTimeline].sort((a, b) => a.año - b.año);
  
  sortedHistory.forEach(card => {
    const item = document.createElement('div');
    item.className = 'gameover-summary-item';
    
    // Formatear valor (año, metros, fecha)
    const valueDisplay = formatCardValue(card);
    
    item.innerHTML = `
      <span class="year">${valueDisplay}</span>
      <span class="title">${card.titulo}</span>
    `;
    gameoverSummaryList.appendChild(item);
  });
}

/**
 * Retorna al menú de configuración
 */
function returnToMenu() {
  clearCronolineSavedGame();
  gameScreen.classList.add('hidden');
  setupScreen.classList.remove('hidden');
  
  // Limpiar estados
  gameState.placedCards = [];
  gameState.currentCard = null;
  gameState.deck = [];
  gameState.tentativeIndex = null;
}

// ==================== PERSISTENCIA DE SESIÓN (AUTO-SAVE & RESTORE) ====================

const CRONOLINE_STORAGE_KEY = 'cronoline_active_session_v1';

/**
 * Guarda el estado actual de la partida en localStorage
 */
function saveCronolineGame() {
  // Solo guardar si estamos dentro de una partida activa con cartas
  if (!gameScreen || gameScreen.classList.contains('hidden')) return;
  
  const hasPlaced = (Array.isArray(gameState.placedCards) && gameState.placedCards.length > 0) ||
    (Array.isArray(gameState.players) && gameState.players.some(p => p.placedCards && p.placedCards.length > 0));
  
  if (!hasPlaced) return;

  const sessionData = {
    version: gameState.version,
    mode: gameState.mode,
    deck: gameState.deck,
    placedCards: gameState.placedCards,
    currentCard: gameState.currentCard,
    score: gameState.score,
    bestScore: gameState.bestScore,
    players: gameState.players.map(p => ({
      name: p.name,
      lives: p.lives === Infinity ? 'infinite' : p.lives,
      score: p.score,
      isDead: !!p.isDead,
      placedCards: p.placedCards || []
    })),
    activePlayerIndex: gameState.activePlayerIndex,
    maxLives: gameState.maxLives === Infinity ? 'infinite' : gameState.maxLives,
    timelineMode: gameState.timelineMode,
    difficulty: gameState.difficulty,
    winCondition: gameState.winCondition,
    targetCards: gameState.targetCards,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(CRONOLINE_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (err) {
    console.warn('No se pudo guardar la sesión de Cronoline:', err);
  }
}

/**
 * Borra el guardado de la partida
 */
function clearCronolineSavedGame() {
  try {
    localStorage.removeItem(CRONOLINE_STORAGE_KEY);
  } catch (err) {}
}

/**
 * Muestra notificación toast de progreso restaurado
 */
function showCronolineToast(msg = '🔄 ¡Partida restaurada automáticamente!', onDiscard = null) {
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
 * Comprueba y restaura la partida en caso de recarga de página (F5)
 */
function checkAndRestoreCronolineGame() {
  const raw = localStorage.getItem(CRONOLINE_STORAGE_KEY);
  if (!raw) return false;

  try {
    const session = JSON.parse(raw);
    if (!session || !session.version) return false;

    // Verificar que haya cartas colocadas
    const hasPlaced = (Array.isArray(session.placedCards) && session.placedCards.length > 0) ||
      (Array.isArray(session.players) && session.players.some(p => Array.isArray(p.placedCards) && p.placedCards.length > 0));

    if (!hasPlaced) {
      clearCronolineSavedGame();
      return false;
    }

    // Actualizar versión y metadatos
    gameState.version = session.version;
    const versionMeta = GAME_VERSIONS[session.version];
    if (versionMeta) {
      setupTitle.textContent = versionMeta.title;
      setupSubtitle.textContent = versionMeta.subtitle;
    }

    gameState.mode = session.mode || 'solitario';
    gameState.deck = Array.isArray(session.deck) ? session.deck : [];
    gameState.placedCards = Array.isArray(session.placedCards) ? session.placedCards : [];
    gameState.currentCard = session.currentCard || null;
    gameState.score = session.score || 0;
    gameState.bestScore = parseInt(session.bestScore) || 0;
    gameState.activePlayerIndex = session.activePlayerIndex || 0;
    gameState.maxLives = (session.maxLives === 'infinite' || session.maxLives === null) ? Infinity : session.maxLives;
    gameState.timelineMode = session.timelineMode || 'compartida';
    gameState.difficulty = session.difficulty || 'todas';
    gameState.winCondition = session.winCondition || 'survival';
    gameState.targetCards = session.targetCards || 5;
    gameState.tentativeIndex = null;

    if (Array.isArray(session.players) && session.players.length > 0) {
      gameState.players = session.players.map(p => ({
        name: p.name || 'Equipo',
        lives: (p.lives === 'infinite' || p.lives === null) ? Infinity : p.lives,
        score: p.score || 0,
        isDead: !!p.isDead,
        placedCards: Array.isArray(p.placedCards) ? p.placedCards : []
      }));
    } else {
      gameState.players = [];
    }

    // Si currentCard es nula pero quedan cartas en el mazo y no es momento de pasar turno
    if (!gameState.currentCard && gameState.deck.length > 0) {
      if (gameState.mode === 'solitario') {
        gameState.currentCard = gameState.deck.pop();
      }
    }

    // Pasar a pantalla de juego
    if (hubScreen) hubScreen.classList.add('hidden');
    versionScreen.classList.add('hidden');
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    if (gameState.mode === 'solitario') {
      activePlayerTag.textContent = 'Modo Solitario';
      scoreLabel.textContent = 'Racha Actual';
      scoreValue.textContent = gameState.score;
      livesDisplay.innerHTML = `🏆 Racha máx: ${gameState.bestScore}`;
    } else {
      scoreLabel.textContent = gameState.timelineMode === 'individual' ? 'Cartas en Línea' : 'Aciertos';
      const activePlayer = gameState.players[gameState.activePlayerIndex];
      scoreValue.textContent = activePlayer ? (gameState.timelineMode === 'individual' ? activePlayer.placedCards.length : activePlayer.score) : 0;
      updateMultiplayerHeader();
    }

    renderTimeline();

    if (gameState.currentCard) {
      renderActiveCard();
    } else {
      renderPassTurnButton();
    }

    showCronolineToast('🔄 ¡Partida de Cronoline restaurada!', () => {
      clearCronolineSavedGame();
      returnToMenu();
    });

    return true;
  } catch (err) {
    console.error('Error restaurando partida de Cronoline:', err);
    clearCronolineSavedGame();
    return false;
  }
}

// Guardar antes de descargar la página
window.addEventListener('beforeunload', () => {
  saveCronolineGame();
});

// ==================== ANALÍTICA DEL HUB ====================
function initHubAnalytics() {
  // Tracking de clics en las tarjetas del hub
  document.querySelectorAll('.hub-play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const href = btn.getAttribute('href') || 'cronoline';
      window.StahlgrafAnalytics?.trackHubClick(href);
    });
  });
}

// Comprobar y restaurar partida guardada al iniciar la aplicación
function initCronolineApp() {
  initHubAnalytics();
  randomizeCronolinePlayerNames(false);
  const restored = checkAndRestoreCronolineGame();
  if (!restored) {
    if (window.location.hash === '#cronoline') {
      if (hubScreen) hubScreen.classList.add('hidden');
      if (versionScreen) versionScreen.classList.remove('hidden');
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCronolineApp);
} else {
  initCronolineApp();
}

