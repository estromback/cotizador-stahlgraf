/**
 * CENSURADO_DATA.JS
 * Base de datos oficial para "Censurado" (Juegos Stahlgraf).
 * Cada tarjeta contiene la palabra principal a adivinar y 5 palabras censuradas (prohibidas).
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 */

const CENSURADO_CATEGORIAS = {
  cotidiano: {
    nombre: "Hogar & Vida Diaria",
    icono: "🏠",
    color: "#3b82f6"
  },
  comidas: {
    nombre: "Comidas & Bebidas",
    icono: "🍔",
    color: "#f59e0b"
  },
  cine_tv: {
    nombre: "Cine, Series & TV",
    icono: "🎬",
    color: "#ec4899"
  },
  chile: {
    nombre: "Chile Pop & Costumbres",
    icono: "🇨🇱",
    color: "#ef4444"
  },
  lugares: {
    nombre: "Lugares & Viajes",
    icono: "✈️",
    color: "#10b981"
  },
  profesiones: {
    nombre: "Personajes & Roles",
    icono: "💼",
    color: "#8b5cf6"
  },
  deportes: {
    nombre: "Deportes & Juegos",
    icono: "⚽",
    color: "#06b6d4"
  }
};

const CENSURADO_TARJETAS = [
  // ==================== COMIDAS & BEBIDAS ====================
  {
    palabra: "COMPLETO",
    categoria: "chile",
    prohibidas: ["PAN", "VIENESA", "PALTA", "TOMATE", "ITALIANO"]
  },
  {
    palabra: "ASADO",
    categoria: "comidas",
    prohibidas: ["CARNE", "PARRILLA", "FUEGO", "CARBON", "DOMINGO"]
  },
  {
    palabra: "PIZZA",
    categoria: "comidas",
    prohibidas: ["QUESO", "MASA", "ITALIA", "HORNO", "PEPERONI"]
  },
  {
    palabra: "CAFE",
    categoria: "comidas",
    prohibidas: ["DESPERTAR", "TAZA", "GRANO", "CALIENTE", "MAÑANA"]
  },
  {
    palabra: "TERREMOTO",
    categoria: "chile",
    prohibidas: ["PIPAÑO", "HELADO", "GRANADINA", "FONDA", "SEPTEMBRE"]
  },
  {
    palabra: "SUSHI",
    categoria: "comidas",
    prohibidas: ["ARROZ", "JAPON", "PESCADO", "PALILLOS", "ROLL"]
  },
  {
    palabra: "EMPANADA",
    categoria: "chile",
    prohibidas: ["PINO", "MASA", "HORNO", "CEBOLLA", "FIESTAS PATRIAS"]
  },
  {
    palabra: "CHOCOLATE",
    categoria: "comidas",
    prohibidas: ["DULCE", "CACAO", "NEGRO", "BARRA", "POSTRE"]
  },
  {
    palabra: "CERVEZA",
    categoria: "comidas",
    prohibidas: ["ALCOHOL", "LATA", "ESPUMA", "CEBADA", "CHOPP"]
  },
  {
    palabra: "HELADO",
    categoria: "comidas",
    prohibidas: ["FRIO", "CONO", "VERANO", "CREMA", "SABOR"]
  },
  {
    palabra: "SOPAIPAS",
    categoria: "chile",
    prohibidas: ["ZAPALLO", "CHANCACA", "FRITO", "INVIERNO", "CALLE"]
  },
  {
    palabra: "HAMBURGUESA",
    categoria: "comidas",
    prohibidas: ["FAST FOOD", "CARNE", "MC DONALDS", "PAPAS", "QUESO"]
  },

  // ==================== COTIDIANO & HOGAR ====================
  {
    palabra: "RELOJ",
    categoria: "cotidiano",
    prohibidas: ["HORA", "MINUTOS", "TIEMPO", "MUÑECA", "DESPERTADOR"]
  },
  {
    palabra: "TELEFONO",
    categoria: "cotidiano",
    prohibidas: ["LLAMAR", "CELULAR", "PANTALLA", "WHATSAPP", "NUMERO"]
  },
  {
    palabra: "CAMA",
    categoria: "cotidiano",
    prohibidas: ["DORMIR", "SUEÑO", "COLCHON", "ALMOHADA", "SABANA"]
  },
  {
    palabra: "ESPEJO",
    categoria: "cotidiano",
    prohibidas: ["REFLEJO", "MIRAR", "VIDRIO", "CARA", "PEINAR"]
  },
  {
    palabra: "PARAGUAS",
    categoria: "cotidiano",
    prohibidas: ["LLUVIA", "AGUA", "ABRIR", "MOJAR", "INVIERNO"]
  },
  {
    palabra: "BILLETERA",
    categoria: "cotidiano",
    prohibidas: ["DINERO", "PLATA", "TARJETA", "BOLSILLO", "PAGAR"]
  },
  {
    palabra: "REFRIGERADOR",
    categoria: "cotidiano",
    prohibidas: ["FRIO", "COMIDA", "HIELO", "COCINA", "CONGELADOR"]
  },
  {
    palabra: "ZAPATILLAS",
    categoria: "cotidiano",
    prohibidas: ["PIES", "CORDONES", "CAMINAR", "CORRER", "CALZADO"]
  },
  {
    palabra: "LENTES",
    categoria: "cotidiano",
    prohibidas: ["OJOS", "VER", "SOL", "MARCO", "VISION"]
  },
  {
    palabra: "DUCHA",
    categoria: "cotidiano",
    prohibidas: ["BAÑO", "AGUA", "JABON", "LAVAR", "CALIENTE"]
  },
  {
    palabra: "LLAVES",
    categoria: "cotidiano",
    prohibidas: ["CERRADURA", "PUERTA", "CANDADO", "ABRIR", "LLAVERO"]
  },

  // ==================== CINE, SERIES & ENTRETENCIÓN ====================
  {
    palabra: "NETFLIX",
    categoria: "cine_tv",
    prohibidas: ["SERIES", "PELICULAS", "STREAMING", "PANTALLA", "SILLON"]
  },
  {
    palabra: "TITANIC",
    categoria: "cine_tv",
    prohibidas: ["BARCO", "ICEBERG", "DI CAPRIO", "HUNDIRSE", "ROSE"]
  },
  {
    palabra: "CINE",
    categoria: "cine_tv",
    prohibidas: ["PELICULA", "POPCORN", "CABRITAS", "PANTALLA", "ENTRADA"]
  },
  {
    palabra: "HARRY POTTER",
    categoria: "cine_tv",
    prohibidas: ["MAGIA", "VARITA", "HOGWARTS", "CICATRIZ", "MAGO"]
  },
  {
    palabra: "STAR WARS",
    categoria: "cine_tv",
    prohibidas: ["ESPADA", "DARTH VADER", "JEDI", "GALAXIA", "FUERZA"]
  },
  {
    palabra: "SHREK",
    categoria: "cine_tv",
    prohibidas: ["OGRO", "VERDE", "FIONA", "BURRO", "PANTANO"]
  },
  {
    palabra: "BATMAN",
    categoria: "cine_tv",
    prohibidas: ["MURCIELAGO", "GOTHAM", "JOKER", "CAPA", "NOCHE"]
  },
  {
    palabra: "SPIDERMAN",
    categoria: "cine_tv",
    prohibidas: ["ARAÑA", "TELARAÑA", "PETER PARKER", "PICADURA", "SUPERHEROE"]
  },
  {
    palabra: "OSCAR",
    categoria: "cine_tv",
    prohibidas: ["PREMIO", "ESTATUILLA", "HOLLYWOOD", "ACTOR", "GANADOR"]
  },
  {
    palabra: "TIKTOK",
    categoria: "cine_tv",
    prohibidas: ["VIDEOS", "BAILE", "RED SOCIAL", "VIRAL", "CELULAR"]
  },

  // ==================== CHILE POP & CULTURA ====================
  {
    palabra: "CONDORITO",
    categoria: "chile",
    prohibidas: ["PLOP", "PELOTILLEHUE", "YAYITA", "CONDOR", "HISTORIETA"]
  },
  {
    palabra: "FESTIVAL DE VIÑA",
    categoria: "chile",
    prohibidas: ["QUINTA VERGARA", "GAVIOTA", "MONSTRUO", "FEBRERO", "ANIMADOR"]
  },
  {
    palabra: "METRO DE SANTIAGO",
    categoria: "chile",
    prohibidas: ["TREN", "SUBTERRANEO", "BIP", "ESTACION", "HORA PUNTA"]
  },
  {
    palabra: "PISCOLA",
    categoria: "chile",
    prohibidas: ["PISCO", "BEBIDA", "COCA COLA", "HIELO", "VASO"]
  },
  {
    palabra: "31 MINUTOS",
    categoria: "chile",
    prohibidas: ["TULIO", "BODOQUE", "TITERES", "NOTICIERO", "CANCIONES"]
  },
  {
    palabra: "COSTANERA CENTER",
    categoria: "chile",
    prohibidas: ["TORRE", "MALL", "ALTO", "EDIFICIO", "PROVIDENCIA"]
  },
  {
    palabra: "FIESTAS PATRIAS",
    categoria: "chile",
    prohibidas: ["DIECIOCHO", "FONDA", "SEPTEMBRE", "CUECA", "FERIADO"]
  },
  {
    palabra: "MARRAQUETA",
    categoria: "chile",
    prohibidas: ["PAN", "BATIDO", "FRANCES", "TOSTADOR", "CRUJIENTE"]
  },
  {
    palabra: "MOAI",
    categoria: "chile",
    prohibidas: ["ISLA DE PASCUA", "RAPA NUI", "ESTATUA", "PIEDRA", "GIGANTE"]
  },
  {
    palabra: "CACHIPUN",
    categoria: "chile",
    prohibidas: ["PIEDRA", "PAPEL", "TIJERA", "MANO", "JUEGO"]
  },

  // ==================== LUGARES & VIAJES ====================
  {
    palabra: "AEROPUERTO",
    categoria: "lugares",
    prohibidas: ["AVION", "VOLAR", "MALETAS", "PASAPORTE", "TERMINAL"]
  },
  {
    palabra: "PLAYA",
    categoria: "lugares",
    prohibidas: ["ARENA", "MAR", "SOL", "VERANO", "TOALLA"]
  },
  {
    palabra: "HOSPITAL",
    categoria: "lugares",
    prohibidas: ["MEDICO", "ENFERMO", "URGENCIA", "CAMILLA", "MEDICINA"]
  },
  {
    palabra: "MUSEO",
    categoria: "lugares",
    prohibidas: ["ARTE", "CUADROS", "HISTORIA", "EXPOSICION", "ESCULTURA"]
  },
  {
    palabra: "CEMENTERIO",
    categoria: "lugares",
    prohibidas: ["MUERTOS", "TUMBAS", "FLORES", "FANTASMAS", "ENTIERRO"]
  },
  {
    palabra: "HOTEL",
    categoria: "lugares",
    prohibidas: ["HABITACION", "VACACIONES", "RECEPCION", "DORMIR", "RESERVA"]
  },
  {
    palabra: "SUPERMERCADO",
    categoria: "lugares",
    prohibidas: ["COMPRAS", "CARRO", "CAJA", "PASILLOS", "PRODUCTOS"]
  },
  {
    palabra: "ZOO",
    categoria: "lugares",
    prohibidas: ["ANIMALES", "JAULA", "LEON", "MONO", "VISITA"]
  },
  {
    palabra: "BIBLIOTECA",
    categoria: "lugares",
    prohibidas: ["LIBROS", "SILENCIO", "LEER", "ESTUDIAR", "PRESTAMO"]
  },
  {
    palabra: "GIMNASIO",
    categoria: "lugares",
    prohibidas: ["PESAS", "EJERCICIO", "SUDAR", "MUSCULOS", "ENTRENAR"]
  },

  // ==================== PROFESIONES & ROLES ====================
  {
    palabra: "BOMBERO",
    categoria: "profesiones",
    prohibidas: ["FUEGO", "INCENDIO", "AGUA", "MANGUERA", "SIRENA"]
  },
  {
    palabra: "DENTISTA",
    categoria: "profesiones",
    prohibidas: ["DIENTES", "BOCA", "DOLOR", "TORNO", "CARIES"]
  },
  {
    palabra: "PROFESOR",
    categoria: "profesiones",
    prohibidas: ["ALUMNOS", "CLASES", "COLEGIO", "PIZARRON", "ENSEÑAR"]
  },
  {
    palabra: "POLICIA",
    categoria: "profesiones",
    prohibidas: ["CARABINERO", "LADRON", "PISTOLA", "ARRESTAR", "PATRULLA"]
  },
  {
    palabra: "ABOGADO",
    categoria: "profesiones",
    prohibidas: ["JUICIO", "LEYES", "DEFENDER", "JUEZ", "DEMANDA"]
  },
  {
    palabra: "ASTRONAUTA",
    categoria: "profesiones",
    prohibidas: ["ESPACIO", "LUNA", "COHETE", "TRAJE", "NASA"]
  },
  {
    palabra: "MAGO",
    categoria: "profesiones",
    prohibidas: ["TRUCO", "CONEJO", "SOMBRERO", "VARITA", "ILUSION"]
  },
  {
    palabra: "ARBITRO",
    categoria: "profesiones",
    prohibidas: ["FUTBOL", "SILBATO", "TARJETA", "PENAL", "FALTA"]
  },
  {
    palabra: "COCINERO",
    categoria: "profesiones",
    prohibidas: ["CHEF", "COMIDA", "RESTAURANTE", "RECETA", "SARTEN"]
  },
  {
    palabra: "PILOTO",
    categoria: "profesiones",
    prohibidas: ["AVION", "VOLAR", "CABINA", "AZAFATA", "AEROPUERTO"]
  },

  // ==================== DEPORTES & JUEGOS ====================
  {
    palabra: "FUTBOL",
    categoria: "deportes",
    prohibidas: ["PELOTA", "GOL", "CANCHA", "ARCO", "JUGADORES"]
  },
  {
    palabra: "TENIS",
    categoria: "deportes",
    prohibidas: ["RAQUETA", "PELOTA", "RED", "SAQUE", "SET"]
  },
  {
    palabra: "AJEDREZ",
    categoria: "deportes",
    prohibidas: ["REY", "JAQUE", "TABLERO", "PEON", "CABALLO"]
  },
  {
    palabra: "NATACION",
    categoria: "deportes",
    prohibidas: ["AGUA", "PISCINA", "NADAR", "ESTILO", "GORRO"]
  },
  {
    palabra: "MONOPOLY",
    categoria: "deportes",
    prohibidas: ["CASAS", "DINERO", "HOTEL", "TABLERO", "DADOS"]
  },
  {
    palabra: "BOXEO",
    categoria: "deportes",
    prohibidas: ["GUANTES", "RING", "GOLPE", "KNOCKOUT", "PELEA"]
  },
  {
    palabra: "BASKETBALL",
    categoria: "deportes",
    prohibidas: ["ARO", "PELOTA", "ENCESTAR", "CANASTA", "PIQUE"]
  },
  {
    palabra: "GOLF",
    categoria: "deportes",
    prohibidas: ["HOYO", "PALO", "PASTO", "PELOTITA", "TIGER WOODS"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CENSURADO_CATEGORIAS, CENSURADO_TARJETAS };
}
