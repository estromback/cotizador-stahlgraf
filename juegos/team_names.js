/**
 * POOL DE NOMBRES DE EQUIPOS - CRONOLINE & TRIVIÓDROMO
 * ===================================================
 * Lista oficial de 30 nombres de equipos para asignar aleatoriamente al cargar o configurar partidas.
 * Los usuarios pueden editar cualquier nombre manualmente en la pantalla de inicio de ambos juegos.
 */

var DEFAULT_TEAM_NAMES_POOL = [
  "Los Sabelotodo",
  "Pino y Napolitana",
  "Teniente Bello",
  "Harta Cazuela",
  "Trivia Newton-John",
  "Los Condoritos",
  "Quizteama",
  'Los "Al Tiro"',
  "Cerebros Bazinga",
  "Zalo Reyes del Quiz",
  "Mascar Lauchas",
  "La Última y Nos Vamos",
  "Sherlock Homies",
  "Reyes de la Chuchoca",
  "Agatha Quiztie",
  "Mucha Challa",
  "Cachureos",
  "Anti-Google",
  "Pedro Pascal Fans",
  "Con la Marraqueta",
  "Ctrl Alt Derrota",
  "Asadores del Quiz",
  "Club de la Trivia",
  "Stranger Answers",
  "Al Apa",
  "Por el Vino",
  "Ni Idea",
  "Smartacus",
  "Los Picoteros",
  "Chilenos Terrenales"
];

// Variable global que contiene los nombres activos
var TEAM_NAMES_POOL = [...DEFAULT_TEAM_NAMES_POOL];

/**
 * Retorna un conjunto de nombres aleatorios únicos del pool.
 * @param {number} count Cantidad de nombres necesarios
 * @param {string[]} exclude Lista de nombres a omitir (opcional)
 * @returns {string[]}
 */
function getRandomTeamNames(count = 4, exclude = []) {
  const pool = TEAM_NAMES_POOL.filter(name => !exclude.includes(name));
  const available = pool.length >= count ? pool : [...TEAM_NAMES_POOL];
  
  // Algoritmo Fisher-Yates shuffle
  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const selected = [];
  for (let i = 0; i < count; i++) {
    selected.push(shuffled[i] || `Equipo ${i + 1}`);
  }
  return selected;
}

/**
 * Retorna un único nombre aleatorio que no esté actualmente en uso.
 * @param {string[]} currentNames Nombres actualmente en pantalla
 * @returns {string}
 */
function getRandomSingleTeamName(currentNames = []) {
  const available = TEAM_NAMES_POOL.filter(n => !currentNames.includes(n));
  if (available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    return available[idx];
  }
  return TEAM_NAMES_POOL[Math.floor(Math.random() * TEAM_NAMES_POOL.length)] || "Nuevo Equipo";
}

if (typeof window !== 'undefined') {
  window.TEAM_NAMES_POOL = TEAM_NAMES_POOL;
  window.getRandomTeamNames = getRandomTeamNames;
  window.getRandomSingleTeamName = getRandomSingleTeamName;
}
