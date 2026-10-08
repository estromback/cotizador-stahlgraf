/**
 * TICTACBOOM_DATA.JS
 * Base de datos oficial para "Tic-Tac Boom" (Juegos Stahlgraf).
 * Sílabas, reglas de dado clásicas y categorías de fiesta a contrarreloj.
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 */

const TICTACBOOM_REGLAS_DADO = {
  TIC: {
    id: "TIC",
    nombre: "TIC",
    badge: "🚫 NO AL INICIO",
    reglaResumen: "En el medio o al final",
    color: "#3b82f6",
    descripcion: "La palabra NO puede empezar con la sílaba. Debe estar en el medio o al final.",
    ejemplo: "Con 'PA': 'SOPA', 'COPA', 'CAMPANA' (NO vale 'PATO')."
  },
  TICTAC: {
    id: "TICTAC",
    nombre: "TIC-TAC",
    badge: "🔄 CUALQUIER LUGAR",
    reglaResumen: "Al inicio, medio o final",
    color: "#10b981",
    descripcion: "La sílaba puede estar en cualquier posición: al inicio, al medio o al final.",
    ejemplo: "Con 'TOR': 'TORMENTA', 'ACTOR', 'HISTORIA'."
  },
  BOOM: {
    id: "BOOM",
    nombre: "BOOM",
    badge: "🚫 NO AL FINAL",
    reglaResumen: "Al inicio o en el medio",
    color: "#ef4444",
    descripcion: "La palabra NO puede terminar con la sílaba. Debe estar al inicio o al medio.",
    ejemplo: "Con 'TE': 'TELEFONO', 'BOTERO' (NO vale 'CHOCOLATE')."
  }
};

const TICTACBOOM_SILABAS = [
  "PA", "TO", "MAR", "CON", "DE", "GRA", "FLA", "COR", "TER", "SOL",
  "PAN", "VAL", "BRI", "CAN", "MEN", "PLA", "DOR", "FLO", "PAR", "ROS",
  "VER", "LIN", "COL", "CAR", "PEN", "FOR", "TRA", "BAN", "PIN", "SAL",
  "TAL", "RES", "BOR", "MAN", "SEN", "PRE", "MAL", "TEN", "MOR", "CAS",
  "BAR", "PAS", "TOR", "CHO", "PLA", "LUN", "SER", "RAN", "FER", "GOR",
  "BIL", "MON", "PON", "RON", "FIN", "BOL", "CAL", "FIL", "GAR", "LAM",
  "MIL", "POR", "SAN", "TAN", "VAN", "ZAP", "BRO", "CLA", "CRI", "DRO",
  "FRA", "GLO", "KIL", "MUR", "PER", "RIT", "SOM", "TIM", "ZOR", "CHE"
];

const TICTACBOOM_CATEGORIAS = [
  // Cotidiano & Hogar
  { titulo: "Cosas que encuentras en un refrigerador", icono: "❄️" },
  { titulo: "Objetos que tienes en tu velador o mesa de noche", icono: "🛏️" },
  { titulo: "Cosas que guardas en la guantera de un auto", icono: "🚗" },
  { titulo: "Herramientas o cosas que hay en una caja de herramientas", icono: "🔧" },
  { titulo: "Cosas que compras en una farmacia", icono: "💊" },
  { titulo: "Objetos que encuentras debajo de la cama", icono: "🧹" },
  { titulo: "Cosas que llevas a un día de playa o piscina", icono: "🏖️" },
  { titulo: "Cosas que huelen muy mal o desagradable", icono: "🦨" },
  { titulo: "Cosas que son de color amarillo brillante", icono: "🍋" },
  { titulo: "Objetos de vidrio o extremadamente frágiles", icono: "🍷" },

  // Comidas, Bebidas & Fiestas
  { titulo: "Comidas que llevan queso derretido", icono: "🧀" },
  { titulo: "Ingredientes que le puedes poner a una pizza", icono: "🍕" },
  { titulo: "Tragos, cócteles o bebidas alcohólicas", icono: "🍹" },
  { titulo: "Sabores comunes de helado", icono: "🍦" },
  { titulo: "Cosas que se comen con las manos sin cubiertos", icono: "🍟" },
  { titulo: "Comidas típicas chilenas o latinoamericanas", icono: "🇨🇱" },
  { titulo: "Frutas o verduras que tienen pepas o semillas", icono: "🍉" },
  { titulo: "Cosas que compras en la panadería un domingo", icono: "🥖" },
  { titulo: "Comidas que pides por delivery un viernes en la noche", icono: "🛵" },
  { titulo: "Marcas famosas de golosinas, chocolates o galletas", icono: "🍫" },

  // Cultura Pop, Cine & TV
  { titulo: "Superhéroes o villanos de cómics y películas", icono: "🦸" },
  { titulo: "Películas de terror o suspenso conocidas", icono: "👻" },
  { titulo: "Series famosas de Netflix o streaming", icono: "📺" },
  { titulo: "Personajes animados o de Disney", icono: "🐭" },
  { titulo: "Bandas o cantantes famosos de rock o pop", icono: "🎸" },
  { titulo: "Videojuegos clásicos o modernos", icono: "🎮" },
  { titulo: "Películas que hayan ganado un Óscar o sean clásicos", icono: "🏆" },
  { titulo: "Actores o actrices de Hollywood conocidos", icono: "🎬" },

  // Situaciones de la Vida & Humor
  { titulo: "Excusas típicas para llegar tarde al trabajo o clases", icono: "⏰" },
  { titulo: "Cosas que dan vergüenza ajena extrema", icono: "🙈" },
  { titulo: "Mentiras piadosas que todo el mundo dice", icono: "🤥" },
  { titulo: "Cosas que haces cuando estás solo en tu casa", icono: "🕺" },
  { titulo: "Razones por las que terminarías una relación en la primera cita", icono: "💔" },
  { titulo: "Cosas que no deberías decir en un funeral", icono: "⚰️" },
  { titulo: "Cosas que te arruinan completamente el día", icono: "🌧️" },
  { titulo: "Lugares terribles para quedarse dormido", icono: "💤" },
  { titulo: "Cosas que la gente presume en Instagram o redes sociales", icono: "📸" },

  // Geografía, Animales & Mundo
  { titulo: "Países que comiencen o contengan la letra 'A'", icono: "🌍" },
  { titulo: "Ciudades capitales del mundo", icono: "🏛️" },
  { titulo: "Animales salvajes o peligrosos", icono: "🦁" },
  { titulo: "Animales que vuelan o tienen alas", icono: "🦅" },
  { titulo: "Animales marinos o acuáticos", icono: "🐬" },
  { titulo: "Marcas famosas de automóviles", icono: "🏎️" },
  { titulo: "Marcas famosas de ropa, zapatillas o moda", icono: "👟" },
  { titulo: "Deportes olímpicos o de competencia", icono: "🥇" },
  { titulo: "Profesiones u oficios que requieren uniforme", icono: "👮" },
  { titulo: "Instrumentos musicales de cuerda o viento", icono: "🎺" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TICTACBOOM_REGLAS_DADO,
    TICTACBOOM_SILABAS,
    TICTACBOOM_CATEGORIAS
  };
}
