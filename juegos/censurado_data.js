/**
 * CENSURADO_DATA.JS
 * Base de datos oficial para "Censurado" (Juegos Stahlgraf).
 * Cada tarjeta contiene la palabra principal a adivinar y 5 palabras censuradas (prohibidas).
 * Total: 521 tarjetas distribuidas en 7 categorías.
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 */

const CENSURADO_CATEGORIAS = {
  "cotidiano": {
    "nombre": "Hogar & Vida Diaria",
    "icono": "🏠",
    "color": "#3b82f6"
  },
  "comidas": {
    "nombre": "Comidas & Bebidas",
    "icono": "🍔",
    "color": "#f59e0b"
  },
  "cine_tv": {
    "nombre": "Cine, Series & TV",
    "icono": "🎬",
    "color": "#ec4899"
  },
  "chile": {
    "nombre": "Chile Pop & Costumbres",
    "icono": "🇨🇱",
    "color": "#ef4444"
  },
  "lugares": {
    "nombre": "Lugares & Viajes",
    "icono": "✈️",
    "color": "#10b981"
  },
  "profesiones": {
    "nombre": "Personajes & Roles",
    "icono": "💼",
    "color": "#8b5cf6"
  },
  "deportes": {
    "nombre": "Deportes & Juegos",
    "icono": "⚽",
    "color": "#06b6d4"
  }
};

const CENSURADO_TARJETAS = [
  {
    "palabra": "COMPLETO",
    "categoria": "chile",
    "prohibidas": [
      "PAN",
      "VIENESA",
      "PALTA",
      "TOMATE",
      "ITALIANO"
    ]
  },
  {
    "palabra": "TERREMOTO",
    "categoria": "chile",
    "prohibidas": [
      "PIPEÑO",
      "HELADO",
      "GRANADINA",
      "FONDA",
      "SEPTIEMBRE"
    ]
  },
  {
    "palabra": "EMPANADA",
    "categoria": "chile",
    "prohibidas": [
      "PINO",
      "MASA",
      "HORNO",
      "CEBOLLA",
      "FIESTAS PATRIAS"
    ]
  },
  {
    "palabra": "SOPAIPAS",
    "categoria": "chile",
    "prohibidas": [
      "ZAPALLO",
      "CHANCACA",
      "FRITO",
      "INVIERNO",
      "LLUVIA"
    ]
  },
  {
    "palabra": "CONDORITO",
    "categoria": "chile",
    "prohibidas": [
      "PLOP",
      "PELOTILLEHUE",
      "YAYITA",
      "CONDOR",
      "HISTORIETA"
    ]
  },
  {
    "palabra": "FESTIVAL DE VIÑA",
    "categoria": "chile",
    "prohibidas": [
      "QUINTA VERGARA",
      "GAVIOTA",
      "MONSTRUO",
      "FEBRERO",
      "ANIMADOR"
    ]
  },
  {
    "palabra": "METRO DE SANTIAGO",
    "categoria": "chile",
    "prohibidas": [
      "TREN",
      "SUBTERRANEO",
      "BIP",
      "ESTACION",
      "HORA PUNTA"
    ]
  },
  {
    "palabra": "PISCOLA",
    "categoria": "chile",
    "prohibidas": [
      "PISCO",
      "BEBIDA",
      "COCA COLA",
      "HIELO",
      "VASO"
    ]
  },
  {
    "palabra": "31 MINUTOS",
    "categoria": "chile",
    "prohibidas": [
      "TULIO",
      "BODOQUE",
      "TITERES",
      "NOTICIERO",
      "CANCIONES"
    ]
  },
  {
    "palabra": "COSTANERA CENTER",
    "categoria": "chile",
    "prohibidas": [
      "TORRE",
      "MALL",
      "ALTO",
      "EDIFICIO",
      "PROVIDENCIA"
    ]
  },
  {
    "palabra": "FIESTAS PATRIAS",
    "categoria": "chile",
    "prohibidas": [
      "DIECIOCHO",
      "FONDA",
      "SEPTIEMBRE",
      "CUECA",
      "FERIADO"
    ]
  },
  {
    "palabra": "MARRAQUETA",
    "categoria": "chile",
    "prohibidas": [
      "PAN",
      "BATIDO",
      "FRANCES",
      "TOSTADOR",
      "CRUJIENTE"
    ]
  },
  {
    "palabra": "MOAI",
    "categoria": "chile",
    "prohibidas": [
      "ISLA DE PASCUA",
      "RAPA NUI",
      "ESTATUA",
      "PIEDRA",
      "GIGANTE"
    ]
  },
  {
    "palabra": "CACHIPUN",
    "categoria": "chile",
    "prohibidas": [
      "PIEDRA",
      "PAPEL",
      "TIJERA",
      "MANO",
      "JUEGO"
    ]
  },
  {
    "palabra": "CAZUELA",
    "categoria": "chile",
    "prohibidas": [
      "CALDO",
      "SOPA",
      "ZAPALLO",
      "CHOCLO",
      "CARNE"
    ]
  },
  {
    "palabra": "PASTEL DE CHOCLO",
    "categoria": "chile",
    "prohibidas": [
      "GREDA",
      "MAIZ",
      "PINO",
      "VERANO",
      "ALBAHACA"
    ]
  },
  {
    "palabra": "HUMITA",
    "categoria": "chile",
    "prohibidas": [
      "CHOCLO",
      "HOJA",
      "AMARRAR",
      "TOMATE",
      "VERANO"
    ]
  },
  {
    "palabra": "CHORRILLANA",
    "categoria": "chile",
    "prohibidas": [
      "PAPAS FRITAS",
      "CEBOLLA",
      "HUEVO",
      "CARNE",
      "COMPARTIR"
    ]
  },
  {
    "palabra": "MOTE CON HUESILLO",
    "categoria": "chile",
    "prohibidas": [
      "DURAZNO",
      "TRIGO",
      "JUGO",
      "VERANO",
      "CARRITO"
    ]
  },
  {
    "palabra": "CURANTO",
    "categoria": "chile",
    "prohibidas": [
      "CHILOE",
      "MARISCOS",
      "HOYO",
      "PIEDRAS",
      "CHAPALELE"
    ]
  },
  {
    "palabra": "PEBRE",
    "categoria": "chile",
    "prohibidas": [
      "CILANTRO",
      "TOMATE",
      "AJI",
      "CEBOLLA",
      "PAN"
    ]
  },
  {
    "palabra": "CHARQUICAN",
    "categoria": "chile",
    "prohibidas": [
      "ZAPALLO",
      "PAPAS",
      "MOLIDO",
      "HUEVO FRITO",
      "ALMUERZO"
    ]
  },
  {
    "palabra": "CALZONES ROTOS",
    "categoria": "chile",
    "prohibidas": [
      "MASA",
      "AZUCAR FLOR",
      "FRITO",
      "INVIERNO",
      "DULCE"
    ]
  },
  {
    "palabra": "BERLIN",
    "categoria": "chile",
    "prohibidas": [
      "PASTEL",
      "CREMA PASTELERA",
      "MANJAR",
      "AZUCAR FLOR",
      "REDONDO"
    ]
  },
  {
    "palabra": "HALLULLA",
    "categoria": "chile",
    "prohibidas": [
      "PAN",
      "REDONDO",
      "MANTEQUILLA",
      "HORNO",
      "ONCE"
    ]
  },
  {
    "palabra": "DOBLADITA",
    "categoria": "chile",
    "prohibidas": [
      "PAN",
      "TRIANGULO",
      "MANTECA",
      "CALIENTE",
      "ONCE"
    ]
  },
  {
    "palabra": "MILCAO",
    "categoria": "chile",
    "prohibidas": [
      "CHILOE",
      "PAPA",
      "CHICHARRONES",
      "CURANTO",
      "FRITO"
    ]
  },
  {
    "palabra": "MELON CON VINO",
    "categoria": "chile",
    "prohibidas": [
      "MELAME",
      "VERANO",
      "FRUTA",
      "BLANCO",
      "BOMBILLA"
    ]
  },
  {
    "palabra": "NAVEGADO",
    "categoria": "chile",
    "prohibidas": [
      "VINO TINTO",
      "CALIENTE",
      "NARANJA",
      "CANELA",
      "INVIERNO"
    ]
  },
  {
    "palabra": "COLA DE MONO",
    "categoria": "chile",
    "prohibidas": [
      "NAVIDAD",
      "LECHE",
      "CAFE",
      "AGUARDIENTE",
      "AÑO NUEVO"
    ]
  },
  {
    "palabra": "CHICHA",
    "categoria": "chile",
    "prohibidas": [
      "UVA",
      "MANZANA",
      "CACHO",
      "FONDA",
      "FERMENTADO"
    ]
  },
  {
    "palabra": "PISCO SOUR",
    "categoria": "chile",
    "prohibidas": [
      "LIMON",
      "ESPUMOSO",
      "APERITIVO",
      "COPA",
      "HIELO"
    ]
  },
  {
    "palabra": "BILZ Y PAP",
    "categoria": "chile",
    "prohibidas": [
      "BEBIDA",
      "ROJA",
      "AMARILLA",
      "FANTASIA",
      "GASEOSA"
    ]
  },
  {
    "palabra": "SUPER 8",
    "categoria": "chile",
    "prohibidas": [
      "OBLEA",
      "CHOCOLATE",
      "NEGRO",
      "MICRO",
      "GOLOSINA"
    ]
  },
  {
    "palabra": "CHOCMAN",
    "categoria": "chile",
    "prohibidas": [
      "BIZCOCHO",
      "MANJAR",
      "CHOCOLATE",
      "ENVOLTORIO",
      "COLACION"
    ]
  },
  {
    "palabra": "RAMITAS",
    "categoria": "chile",
    "prohibidas": [
      "SALADO",
      "QUESO",
      "EVERCRISP",
      "CUMPLEAÑOS",
      "SNACK"
    ]
  },
  {
    "palabra": "TELETON",
    "categoria": "chile",
    "prohibidas": [
      "DON FRANCISCO",
      "27 HORAS",
      "SOLIDARIDAD",
      "BANCO DE CHILE",
      "REHABILITACION"
    ]
  },
  {
    "palabra": "DON FRANCISCO",
    "categoria": "chile",
    "prohibidas": [
      "SABADO GIGANTE",
      "TELETON",
      "MARIO KREUTZBERGER",
      "ANIMADOR",
      "CHACAL"
    ]
  },
  {
    "palabra": "FELIPE CAMIROAGA",
    "categoria": "chile",
    "prohibidas": [
      "HALCON",
      "BUENOS DIAS A TODOS",
      "ANIMADOR",
      "TVN",
      "CHICUREO"
    ]
  },
  {
    "palabra": "PEDRO PASCAL",
    "categoria": "chile",
    "prohibidas": [
      "MANDALORIAN",
      "THE LAST OF US",
      "ACTOR",
      "HOLLYWOOD",
      "CHILENO"
    ]
  },
  {
    "palabra": "ALEXIS SANCHEZ",
    "categoria": "chile",
    "prohibidas": [
      "NIÑO MARAVILLA",
      "TOCOPILLA",
      "FUTBOL",
      "LA ROJA",
      "ARSENAL"
    ]
  },
  {
    "palabra": "ARTURO VIDAL",
    "categoria": "chile",
    "prohibidas": [
      "KING",
      "REY",
      "COLO COLO",
      "MOHICANO",
      "LA ROJA"
    ]
  },
  {
    "palabra": "MARCELO RIOS",
    "categoria": "chile",
    "prohibidas": [
      "CHINO",
      "TENIS",
      "NUMERO UNO",
      "ZURDO",
      "RAQUETA"
    ]
  },
  {
    "palabra": "NICOLAS MASSU",
    "categoria": "chile",
    "prohibidas": [
      "VAMPIRO",
      "TENIS",
      "MEDALLA DE ORO",
      "ATENAS",
      "GONZALEZ"
    ]
  },
  {
    "palabra": "GABRIELA MISTRAL",
    "categoria": "chile",
    "prohibidas": [
      "POETISA",
      "PREMIO NOBEL",
      "ELQUI",
      "LITERATURA",
      "BILLETE"
    ]
  },
  {
    "palabra": "PABLO NERUDA",
    "categoria": "chile",
    "prohibidas": [
      "POETA",
      "PREMIO NOBEL",
      "ISLA NEGRA",
      "AMOR",
      "VEINTE POEMAS"
    ]
  },
  {
    "palabra": "VIOLETA PARRA",
    "categoria": "chile",
    "prohibidas": [
      "GRACIAS A LA VIDA",
      "FOLCLORE",
      "GUITARRA",
      "CANTAUTORA",
      "ARPILLERA"
    ]
  },
  {
    "palabra": "LOS PRISIONEROS",
    "categoria": "chile",
    "prohibidas": [
      "JORGE GONZALEZ",
      "SAN MIGUEL",
      "BAILE DE LOS QUE SOBRAN",
      "ROCK",
      "OCHENTA"
    ]
  },
  {
    "palabra": "LOS TRES",
    "categoria": "chile",
    "prohibidas": [
      "ALVARO HENRIQUEZ",
      "CONCEPCION",
      "CUECA",
      "DEJATE CAER",
      "BANDA"
    ]
  },
  {
    "palabra": "LOS BUNKERS",
    "categoria": "chile",
    "prohibidas": [
      "CONCEPCION",
      "BAILANDO SOLO",
      "LLUEVE SOBRE LA CIUDAD",
      "ROCK",
      "BANDA"
    ]
  },
  {
    "palabra": "MON LAFERTE",
    "categoria": "chile",
    "prohibidas": [
      "TU FALTA DE QUERER",
      "VIÑA DEL MAR",
      "CANTANTE",
      "MEXICO",
      "VOZ"
    ]
  },
  {
    "palabra": "CASADO CON HIJOS",
    "categoria": "chile",
    "prohibidas": [
      "TITO LARRAIN",
      "QUENA",
      "NACHO",
      "TITI",
      "SERIE"
    ]
  },
  {
    "palabra": "CUENTA RUT",
    "categoria": "chile",
    "prohibidas": [
      "BANCO ESTADO",
      "TARJETA",
      "TRANSFERENCIA",
      "CLAVE",
      "DEBITO"
    ]
  },
  {
    "palabra": "FERIA LIBRE",
    "categoria": "chile",
    "prohibidas": [
      "VERDURAS",
      "FRUTAS",
      "CASERA",
      "CARRITO",
      "FIN DE SEMANA"
    ]
  },
  {
    "palabra": "COLECTIVO",
    "categoria": "chile",
    "prohibidas": [
      "AUTO",
      "NEGRO",
      "LETRERO",
      "PASAJERO",
      "RUTA"
    ]
  },
  {
    "palabra": "CORDILLERA DE LOS ANDES",
    "categoria": "chile",
    "prohibidas": [
      "MONTAÑAS",
      "NIEVE",
      "SANTIAGO",
      "FRONTERA",
      "ARGENTINA"
    ]
  },
  {
    "palabra": "DESIERTO DE ATACAMA",
    "categoria": "chile",
    "prohibidas": [
      "NORTE",
      "ARENA",
      "SECO",
      "SAN PEDRO",
      "FLORIDO"
    ]
  },
  {
    "palabra": "TORRES DEL PAINE",
    "categoria": "chile",
    "prohibidas": [
      "PATAGONIA",
      "SUR",
      "MAGALLANES",
      "MONTAÑAS",
      "TREKKING"
    ]
  },
  {
    "palabra": "CHILOE",
    "categoria": "chile",
    "prohibidas": [
      "ISLA",
      "PALAFITOS",
      "CURANTO",
      "MITOLOGIA",
      "TRAUKO"
    ]
  },
  {
    "palabra": "VALPARAISO",
    "categoria": "chile",
    "prohibidas": [
      "PUERTO",
      "CERROS",
      "ASCENSORES",
      "TROLEBUS",
      "AÑO NUEVO"
    ]
  },
  {
    "palabra": "LA MONEDA",
    "categoria": "chile",
    "prohibidas": [
      "PALACIO",
      "PRESIDENTE",
      "GOBIERNO",
      "SANTIAGO",
      "ALAMEDA"
    ]
  },
  {
    "palabra": "CERRO SAN CRISTOBAL",
    "categoria": "chile",
    "prohibidas": [
      "VIRGEN",
      "FUNICULAR",
      "TELEFERICO",
      "SANTIAGO",
      "PARQUE METROPOLITANO"
    ]
  },
  {
    "palabra": "FANTASILANDIA",
    "categoria": "chile",
    "prohibidas": [
      "PARQUE DE DIVERSIONES",
      "MONTAÑA RUSA",
      "PARQUE O'HIGGINS",
      "JUEGOS",
      "RAPTOR"
    ]
  },
  {
    "palabra": "ESTADIO NACIONAL",
    "categoria": "chile",
    "prohibidas": [
      "ÑUÑOA",
      "FUTBOL",
      "CONCIERTO",
      "LA ROJA",
      "CANCHA"
    ]
  },
  {
    "palabra": "ORGANILLERO",
    "categoria": "chile",
    "prohibidas": [
      "LORO",
      "MUSICA",
      "MANIVELA",
      "CHINCHINERO",
      "REMOLINO"
    ]
  },
  {
    "palabra": "VOLANTIN",
    "categoria": "chile",
    "prohibidas": [
      "HILO",
      "CIELO",
      "VIENTO",
      "SEPTIEMBRE",
      "ENCUMBRAR"
    ]
  },
  {
    "palabra": "TROMPO",
    "categoria": "chile",
    "prohibidas": [
      "MADERA",
      "CUERDA",
      "GIRAR",
      "PUA",
      "JUEGO TRADICIONAL"
    ]
  },
  {
    "palabra": "RAYUELA",
    "categoria": "chile",
    "prohibidas": [
      "TEJO",
      "BARRO",
      "HILO",
      "QUEMADA",
      "CANCHA"
    ]
  },
  {
    "palabra": "CUECA",
    "categoria": "chile",
    "prohibidas": [
      "PAÑUELO",
      "BAILE NACIONAL",
      "ZAPATEO",
      "HUASO",
      "CHINA"
    ]
  },
  {
    "palabra": "ONCE CHILENA",
    "categoria": "chile",
    "prohibidas": [
      "TE",
      "PAN",
      "PALTA",
      "TARDE",
      "MESA"
    ]
  },
  {
    "palabra": "QUILTRO",
    "categoria": "chile",
    "prohibidas": [
      "PERRO",
      "MESTIZO",
      "CALLEJERO",
      "RAZA",
      "MASCOTA"
    ]
  },
  {
    "palabra": "PANCHO SAAVEDRA",
    "categoria": "chile",
    "prohibidas": [
      "LUGARES QUE HABLAN",
      "RISA",
      "CAZUELAS",
      "ANIMADOR",
      "CANAL 13"
    ]
  },
  {
    "palabra": "TIO EMILIO",
    "categoria": "chile",
    "prohibidas": [
      "EN SU PROPIA TRAMPA",
      "PILLADO",
      "PROGRAMA",
      "PERIODISTA",
      "ESTAFADORES"
    ]
  },
  {
    "palabra": "BARROS LUCO",
    "categoria": "chile",
    "prohibidas": [
      "SANDWICH",
      "CARNE",
      "QUESO",
      "CALIENTE",
      "PRESIDENTE"
    ]
  },
  {
    "palabra": "CHACARERO",
    "categoria": "chile",
    "prohibidas": [
      "SANDWICH",
      "POROTOS VERDES",
      "TOMATE",
      "AJI",
      "CARNE"
    ]
  },
  {
    "palabra": "ASADO",
    "categoria": "comidas",
    "prohibidas": [
      "CARNE",
      "PARRILLA",
      "FUEGO",
      "CARBON",
      "DOMINGO"
    ]
  },
  {
    "palabra": "PIZZA",
    "categoria": "comidas",
    "prohibidas": [
      "QUESO",
      "MASA",
      "ITALIA",
      "HORNO",
      "PEPERONI"
    ]
  },
  {
    "palabra": "CAFE",
    "categoria": "comidas",
    "prohibidas": [
      "DESPERTAR",
      "TAZA",
      "GRANO",
      "CALIENTE",
      "MAÑANA"
    ]
  },
  {
    "palabra": "SUSHI",
    "categoria": "comidas",
    "prohibidas": [
      "ARROZ",
      "JAPON",
      "PESCADO",
      "PALILLOS",
      "ROLL"
    ]
  },
  {
    "palabra": "CHOCOLATE",
    "categoria": "comidas",
    "prohibidas": [
      "DULCE",
      "CACAO",
      "NEGRO",
      "BARRA",
      "POSTRE"
    ]
  },
  {
    "palabra": "CERVEZA",
    "categoria": "comidas",
    "prohibidas": [
      "ALCOHOL",
      "LATA",
      "ESPUMA",
      "CEBADA",
      "CHOPP"
    ]
  },
  {
    "palabra": "HELADO",
    "categoria": "comidas",
    "prohibidas": [
      "FRIO",
      "CONO",
      "VERANO",
      "CREMA",
      "SABOR"
    ]
  },
  {
    "palabra": "HAMBURGUESA",
    "categoria": "comidas",
    "prohibidas": [
      "FAST FOOD",
      "CARNE",
      "MC DONALDS",
      "PAPAS",
      "QUESO"
    ]
  },
  {
    "palabra": "PAPAS FRITAS",
    "categoria": "comidas",
    "prohibidas": [
      "ACEITE",
      "SAL",
      "KETCHUP",
      "CRUJIENTES",
      "ACOMPAÑAMIENTO"
    ]
  },
  {
    "palabra": "TACOS",
    "categoria": "comidas",
    "prohibidas": [
      "MEXICO",
      "TORTILLA",
      "PICANTE",
      "CARNE",
      "GUACAMOLE"
    ]
  },
  {
    "palabra": "BURRITO",
    "categoria": "comidas",
    "prohibidas": [
      "MEXICO",
      "ENROLLADO",
      "POROTOS",
      "ARROZ",
      "TORTILLA"
    ]
  },
  {
    "palabra": "NACHOS",
    "categoria": "comidas",
    "prohibidas": [
      "TRIANGULO",
      "QUESO CHEDDAR",
      "GUACAMOLE",
      "MAIZ",
      "CINE"
    ]
  },
  {
    "palabra": "GUACAMOLE",
    "categoria": "comidas",
    "prohibidas": [
      "PALTA",
      "MEXICO",
      "LIMON",
      "NACHOS",
      "VERDE"
    ]
  },
  {
    "palabra": "PAELLA",
    "categoria": "comidas",
    "prohibidas": [
      "ARROZ",
      "ESPAÑA",
      "MARISCOS",
      "AZAFRAN",
      "SARTEN"
    ]
  },
  {
    "palabra": "LASAÑA",
    "categoria": "comidas",
    "prohibidas": [
      "CAPAS",
      "PASTA",
      "CARNE",
      "QUESO",
      "GARFIELD"
    ]
  },
  {
    "palabra": "ESPAGUETI",
    "categoria": "comidas",
    "prohibidas": [
      "FIDEO",
      "PASTA",
      "SALSA ROJA",
      "ITALIA",
      "TENEDOR"
    ]
  },
  {
    "palabra": "RAVIOLES",
    "categoria": "comidas",
    "prohibidas": [
      "PASTA",
      "RELLENO",
      "CUADRADO",
      "ITALIA",
      "SALSA"
    ]
  },
  {
    "palabra": "ÑOQUIS",
    "categoria": "comidas",
    "prohibidas": [
      "PAPA",
      "PASTA",
      "DIA 29",
      "HARINA",
      "ITALIA"
    ]
  },
  {
    "palabra": "ENSALADA",
    "categoria": "comidas",
    "prohibidas": [
      "LECHUGA",
      "VERDURAS",
      "DIETA",
      "SANO",
      "ACEITE"
    ]
  },
  {
    "palabra": "PANQUEQUES",
    "categoria": "comidas",
    "prohibidas": [
      "MANJAR",
      "MASA",
      "SARTEN",
      "ENROLLADO",
      "DULCE"
    ]
  },
  {
    "palabra": "WAFFLES",
    "categoria": "comidas",
    "prohibidas": [
      "CUADRICULADO",
      "MIEL",
      "DESAYUNO",
      "MAQUINA",
      "DULCE"
    ]
  },
  {
    "palabra": "TORTA",
    "categoria": "comidas",
    "prohibidas": [
      "CUMPLEAÑOS",
      "VELAS",
      "BIZCOCHO",
      "CREMA",
      "CELEBRACION"
    ]
  },
  {
    "palabra": "QUEQUE",
    "categoria": "comidas",
    "prohibidas": [
      "HORNO",
      "HARINA",
      "MOLDE",
      "ONCE",
      "ESPONJOSO"
    ]
  },
  {
    "palabra": "PIE DE LIMON",
    "categoria": "comidas",
    "prohibidas": [
      "MERENGUE",
      "ACIDO",
      "AMARILLO",
      "MASA",
      "TARTA"
    ]
  },
  {
    "palabra": "TIRAMISU",
    "categoria": "comidas",
    "prohibidas": [
      "POSTRE",
      "CAFE",
      "ITALIA",
      "QUESO MASCARPONE",
      "CACAO"
    ]
  },
  {
    "palabra": "CHEESECAKE",
    "categoria": "comidas",
    "prohibidas": [
      "QUESO CREMA",
      "FRAMBUESA",
      "POSTRE",
      "GALLETA",
      "TARTA"
    ]
  },
  {
    "palabra": "FLAN",
    "categoria": "comidas",
    "prohibidas": [
      "CARAMELO",
      "HUEVO",
      "LECHE",
      "TEMBLOROSO",
      "POSTRE"
    ]
  },
  {
    "palabra": "ARROZ CON LECHE",
    "categoria": "comidas",
    "prohibidas": [
      "CANELA",
      "POSTRE",
      "BLANCO",
      "DULCE",
      "ABUELA"
    ]
  },
  {
    "palabra": "GELATINA",
    "categoria": "comidas",
    "prohibidas": [
      "POSTRE",
      "AGUA",
      "TEMBLAR",
      "COLORES",
      "FRIO"
    ]
  },
  {
    "palabra": "DONA",
    "categoria": "comidas",
    "prohibidas": [
      "AGUJERO",
      "REDONDA",
      "HOMERO SIMPSON",
      "GLASEADO",
      "DULCE"
    ]
  },
  {
    "palabra": "CHURROS",
    "categoria": "comidas",
    "prohibidas": [
      "FRITO",
      "AZUCAR",
      "MANJAR",
      "ALARGADO",
      "CHOCOLATE"
    ]
  },
  {
    "palabra": "CROISSANT",
    "categoria": "comidas",
    "prohibidas": [
      "FRANCIA",
      "MEDIALUNA",
      "MANTEQUILLA",
      "DESAYUNO",
      "HOJALDRE"
    ]
  },
  {
    "palabra": "HUEVO FRITO",
    "categoria": "comidas",
    "prohibidas": [
      "YEMA",
      "CLARA",
      "SARTEN",
      "ACEITE",
      "DESAYUNO"
    ]
  },
  {
    "palabra": "OMELETTE",
    "categoria": "comidas",
    "prohibidas": [
      "HUEVO",
      "BATIDO",
      "QUESO",
      "DOBLADO",
      "SARTEN"
    ]
  },
  {
    "palabra": "TOCINO",
    "categoria": "comidas",
    "prohibidas": [
      "CERDO",
      "CRUJIENTE",
      "GRASA",
      "DESAYUNO",
      "TIRAS"
    ]
  },
  {
    "palabra": "QUESO",
    "categoria": "comidas",
    "prohibidas": [
      "LECHE",
      "RATON",
      "AMARILLO",
      "DERRETIDO",
      "VACA"
    ]
  },
  {
    "palabra": "MANTEQUILLA",
    "categoria": "comidas",
    "prohibidas": [
      "PAN",
      "LECHE",
      "UNTAR",
      "AMARILLA",
      "DERRETIR"
    ]
  },
  {
    "palabra": "YOGURT",
    "categoria": "comidas",
    "prohibidas": [
      "LECHE",
      "CUCHARA",
      "CEREAL",
      "DESAYUNO",
      "FRUTA"
    ]
  },
  {
    "palabra": "VINO TINTO",
    "categoria": "comidas",
    "prohibidas": [
      "UVA",
      "COPA",
      "BOTELLA",
      "CORCHO",
      "ALCOHOL"
    ]
  },
  {
    "palabra": "CHAMPAGNE",
    "categoria": "comidas",
    "prohibidas": [
      "ESPUMANTE",
      "BRINDIS",
      "BURBUJAS",
      "AÑO NUEVO",
      "COPA"
    ]
  },
  {
    "palabra": "TEQUILA",
    "categoria": "comidas",
    "prohibidas": [
      "MEXICO",
      "SAL",
      "LIMON",
      "SHOT",
      "AGAVE"
    ]
  },
  {
    "palabra": "MOJITO",
    "categoria": "comidas",
    "prohibidas": [
      "MENTA",
      "RON",
      "LIMON",
      "HIELO",
      "TRAGO"
    ]
  },
  {
    "palabra": "PIÑA COLADA",
    "categoria": "comidas",
    "prohibidas": [
      "COCO",
      "PIÑA",
      "RON",
      "PLAYA",
      "TRAGO"
    ]
  },
  {
    "palabra": "MATE",
    "categoria": "comidas",
    "prohibidas": [
      "YERBA",
      "BOMBILLA",
      "TERMO",
      "AGUA CALIENTE",
      "ARGENTINA"
    ]
  },
  {
    "palabra": "PALOMITAS",
    "categoria": "comidas",
    "prohibidas": [
      "CINE",
      "CABRITAS",
      "MAIZ",
      "MANTEQUILLA",
      "EXPLOTAR"
    ]
  },
  {
    "palabra": "ALGODON DE AZUCAR",
    "categoria": "comidas",
    "prohibidas": [
      "FERIA",
      "NUBE",
      "ROSADO",
      "PALITO",
      "DULCE"
    ]
  },
  {
    "palabra": "CHICLE",
    "categoria": "comidas",
    "prohibidas": [
      "MASTICAR",
      "GLOBO",
      "MENTA",
      "BOCA",
      "PEGAR"
    ]
  },
  {
    "palabra": "MIEL",
    "categoria": "comidas",
    "prohibidas": [
      "ABEJA",
      "DULCE",
      "PANAL",
      "OSO",
      "AMARILLA"
    ]
  },
  {
    "palabra": "MERMELADA",
    "categoria": "comidas",
    "prohibidas": [
      "FRUTA",
      "PAN",
      "FRASCO",
      "DULCE",
      "UNTAR"
    ]
  },
  {
    "palabra": "MAYONESA",
    "categoria": "comidas",
    "prohibidas": [
      "HUEVO",
      "ACEITE",
      "BLANCA",
      "COMPLETO",
      "SALSA"
    ]
  },
  {
    "palabra": "KETCHUP",
    "categoria": "comidas",
    "prohibidas": [
      "TOMATE",
      "ROJO",
      "SALSA",
      "PAPAS FRITAS",
      "FRASCO"
    ]
  },
  {
    "palabra": "MOSTAZA",
    "categoria": "comidas",
    "prohibidas": [
      "AMARILLA",
      "SALSA",
      "HOT DOG",
      "SEMILLA",
      "FUERTE"
    ]
  },
  {
    "palabra": "AJO",
    "categoria": "comidas",
    "prohibidas": [
      "DIENTE",
      "OLOR",
      "VAMPIRO",
      "CONDIMENTO",
      "BLANCO"
    ]
  },
  {
    "palabra": "CEBOLLA",
    "categoria": "comidas",
    "prohibidas": [
      "LLORAR",
      "CAPAS",
      "ENSALADA",
      "PINO",
      "VERDURA"
    ]
  },
  {
    "palabra": "PALTA",
    "categoria": "comidas",
    "prohibidas": [
      "VERDE",
      "CAROZO",
      "PAN",
      "HASS",
      "MOLIDA"
    ]
  },
  {
    "palabra": "PLATANO",
    "categoria": "comidas",
    "prohibidas": [
      "MONO",
      "AMARILLO",
      "CASCARA",
      "POTASIO",
      "FRUTA"
    ]
  },
  {
    "palabra": "SANDIA",
    "categoria": "comidas",
    "prohibidas": [
      "VERANO",
      "ROJA",
      "PEPITAS",
      "VERDE",
      "AGUA"
    ]
  },
  {
    "palabra": "FRUTILLA",
    "categoria": "comidas",
    "prohibidas": [
      "ROJA",
      "CREMA",
      "PEQUEÑA",
      "DULCE",
      "FRUTA"
    ]
  },
  {
    "palabra": "PIÑA",
    "categoria": "comidas",
    "prohibidas": [
      "CORONA",
      "AMARILLA",
      "BOB ESPONJA",
      "TROPICAL",
      "ACIDA"
    ]
  },
  {
    "palabra": "NARANJA",
    "categoria": "comidas",
    "prohibidas": [
      "JUGO",
      "VITAMINA C",
      "GAJOS",
      "CITRICO",
      "COLOR"
    ]
  },
  {
    "palabra": "MANZANA",
    "categoria": "comidas",
    "prohibidas": [
      "ROJA",
      "VERDE",
      "BLANCANIEVES",
      "FRUTA",
      "ARBOL"
    ]
  },
  {
    "palabra": "UVA",
    "categoria": "comidas",
    "prohibidas": [
      "VINO",
      "RACIMO",
      "VERDE",
      "MORADA",
      "FRUTA"
    ]
  },
  {
    "palabra": "CEVICHE",
    "categoria": "comidas",
    "prohibidas": [
      "PESCADO",
      "LIMON",
      "PERU",
      "CRUDO",
      "CEBOLLA MORADA"
    ]
  },
  {
    "palabra": "CAMARON",
    "categoria": "comidas",
    "prohibidas": [
      "MARISCO",
      "ROSADO",
      "MAR",
      "COLA",
      "COCTEL"
    ]
  },
  {
    "palabra": "POLLO ASADO",
    "categoria": "comidas",
    "prohibidas": [
      "AVE",
      "PAPAS FRITAS",
      "ROSTIZADO",
      "DOMINGO",
      "PECHUGA"
    ]
  },
  {
    "palabra": "MILANESA",
    "categoria": "comidas",
    "prohibidas": [
      "CARNE",
      "PAN RALLADO",
      "FRITO",
      "POLLO",
      "ESCALOPA"
    ]
  },
  {
    "palabra": "PURE DE PAPAS",
    "categoria": "comidas",
    "prohibidas": [
      "MOLIDO",
      "LECHE",
      "MANTEQUILLA",
      "ACOMPAÑAMIENTO",
      "BLANDO"
    ]
  },
  {
    "palabra": "LENTEJAS",
    "categoria": "comidas",
    "prohibidas": [
      "LEGUMBRES",
      "GUISO",
      "OLLA",
      "HIERRO",
      "CAFE"
    ]
  },
  {
    "palabra": "POROTOS CON RIENDAS",
    "categoria": "comidas",
    "prohibidas": [
      "LEGUMBRES",
      "TALLARINES",
      "LONGANIZA",
      "ZAPALLO",
      "OLLA"
    ]
  },
  {
    "palabra": "MARISCAL",
    "categoria": "comidas",
    "prohibidas": [
      "MARISCOS",
      "CALDO",
      "LIMON",
      "CALIENTE",
      "MERCADO"
    ]
  },
  {
    "palabra": "RAMEN",
    "categoria": "comidas",
    "prohibidas": [
      "SOPAS",
      "FIDEOS",
      "JAPON",
      "HUEVO",
      "CALDO"
    ]
  },
  {
    "palabra": "SHAWARMA",
    "categoria": "comidas",
    "prohibidas": [
      "ARABE",
      "CARNE",
      "PAN PITA",
      "AJO",
      "ENROLLADO"
    ]
  },
  {
    "palabra": "EMPANADA DE QUESO",
    "categoria": "comidas",
    "prohibidas": [
      "FRITA",
      "DERRETIDO",
      "MASA",
      "PLAYA",
      "CALIENTE"
    ]
  },
  {
    "palabra": "GALLETAS",
    "categoria": "comidas",
    "prohibidas": [
      "CHISPITAS",
      "LECHE",
      "PAQUETE",
      "HORNO",
      "DULCE"
    ]
  },
  {
    "palabra": "BEBIDA ENERGETICA",
    "categoria": "comidas",
    "prohibidas": [
      "RED BULL",
      "MONSTER",
      "CAFEINA",
      "LATA",
      "DESPIERTO"
    ]
  },
  {
    "palabra": "RELOJ",
    "categoria": "cotidiano",
    "prohibidas": [
      "HORA",
      "MINUTOS",
      "TIEMPO",
      "MUÑECA",
      "DESPERTADOR"
    ]
  },
  {
    "palabra": "TELEFONO",
    "categoria": "cotidiano",
    "prohibidas": [
      "LLAMAR",
      "CELULAR",
      "PANTALLA",
      "WHATSAPP",
      "NUMERO"
    ]
  },
  {
    "palabra": "CAMA",
    "categoria": "cotidiano",
    "prohibidas": [
      "DORMIR",
      "SUEÑO",
      "COLCHON",
      "ALMOHADA",
      "SABANA"
    ]
  },
  {
    "palabra": "ESPEJO",
    "categoria": "cotidiano",
    "prohibidas": [
      "REFLEJO",
      "MIRAR",
      "VIDRIO",
      "CARA",
      "PEINAR"
    ]
  },
  {
    "palabra": "PARAGUAS",
    "categoria": "cotidiano",
    "prohibidas": [
      "LLUVIA",
      "AGUA",
      "ABRIR",
      "MOJAR",
      "INVIERNO"
    ]
  },
  {
    "palabra": "BILLETERA",
    "categoria": "cotidiano",
    "prohibidas": [
      "DINERO",
      "PLATA",
      "TARJETA",
      "BOLSILLO",
      "PAGAR"
    ]
  },
  {
    "palabra": "REFRIGERADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "FRIO",
      "COMIDA",
      "HIELO",
      "COCINA",
      "CONGELADOR"
    ]
  },
  {
    "palabra": "ZAPATILLAS",
    "categoria": "cotidiano",
    "prohibidas": [
      "PIES",
      "CORDONES",
      "CAMINAR",
      "CORRER",
      "CALZADO"
    ]
  },
  {
    "palabra": "LENTES",
    "categoria": "cotidiano",
    "prohibidas": [
      "OJOS",
      "VER",
      "SOL",
      "MARCO",
      "VISION"
    ]
  },
  {
    "palabra": "DUCHA",
    "categoria": "cotidiano",
    "prohibidas": [
      "BAÑO",
      "AGUA",
      "JABON",
      "LAVAR",
      "CALIENTE"
    ]
  },
  {
    "palabra": "LLAVES",
    "categoria": "cotidiano",
    "prohibidas": [
      "CERRADURA",
      "PUERTA",
      "CANDADO",
      "ABRIR",
      "LLAVERO"
    ]
  },
  {
    "palabra": "ALMOHADA",
    "categoria": "cotidiano",
    "prohibidas": [
      "CABEZA",
      "CAMA",
      "DORMIR",
      "BLANDA",
      "FUNDA"
    ]
  },
  {
    "palabra": "FRAZADA",
    "categoria": "cotidiano",
    "prohibidas": [
      "FRIO",
      "CAMA",
      "TAPARSE",
      "INVIERNO",
      "ABRIGO"
    ]
  },
  {
    "palabra": "CEPILLO DE DIENTES",
    "categoria": "cotidiano",
    "prohibidas": [
      "PASTA",
      "BOCA",
      "LAVAR",
      "MUELAS",
      "BAÑO"
    ]
  },
  {
    "palabra": "JABON",
    "categoria": "cotidiano",
    "prohibidas": [
      "ESPUMA",
      "LAVAR",
      "MANOS",
      "DUCHA",
      "OLOR"
    ]
  },
  {
    "palabra": "SHAMPOO",
    "categoria": "cotidiano",
    "prohibidas": [
      "PELO",
      "CABEZA",
      "DUCHA",
      "ESPUMA",
      "LAVAR"
    ]
  },
  {
    "palabra": "TOALLA",
    "categoria": "cotidiano",
    "prohibidas": [
      "SECAR",
      "BAÑO",
      "PLAYA",
      "MOJADO",
      "TELA"
    ]
  },
  {
    "palabra": "PAPEL HIGIENICO",
    "categoria": "cotidiano",
    "prohibidas": [
      "CONFORT",
      "BAÑO",
      "ROLLO",
      "LIMPIAR",
      "BLANCO"
    ]
  },
  {
    "palabra": "INODORO",
    "categoria": "cotidiano",
    "prohibidas": [
      "BAÑO",
      "TASA",
      "CADENA",
      "SENTARSE",
      "AGUA"
    ]
  },
  {
    "palabra": "SECADOR DE PELO",
    "categoria": "cotidiano",
    "prohibidas": [
      "VIENTO",
      "CALOR",
      "ENCHUFE",
      "CABELLO",
      "BAÑO"
    ]
  },
  {
    "palabra": "PEINETA",
    "categoria": "cotidiano",
    "prohibidas": [
      "PELO",
      "DESENREDAR",
      "CEPILLO",
      "CABEZA",
      "DIENTES"
    ]
  },
  {
    "palabra": "PERFUME",
    "categoria": "cotidiano",
    "prohibidas": [
      "OLOR",
      "AROMA",
      "FRASCO",
      "CUELLO",
      "ROCIAR"
    ]
  },
  {
    "palabra": "DESODORANTE",
    "categoria": "cotidiano",
    "prohibidas": [
      "AXILA",
      "OLOR",
      "TRANSPIRAR",
      "SPRAY",
      "SUDOR"
    ]
  },
  {
    "palabra": "CORTAUÑAS",
    "categoria": "cotidiano",
    "prohibidas": [
      "DEDOS",
      "MANOS",
      "PIES",
      "METAL",
      "CORTAR"
    ]
  },
  {
    "palabra": "LAVADORA",
    "categoria": "cotidiano",
    "prohibidas": [
      "ROPA",
      "AGUA",
      "DETERGENTE",
      "CENTRIFUGAR",
      "LIMPIA"
    ]
  },
  {
    "palabra": "PLANCHA",
    "categoria": "cotidiano",
    "prohibidas": [
      "ROPA",
      "CALOR",
      "ARRUGAS",
      "VAPOR",
      "CAMISA"
    ]
  },
  {
    "palabra": "ASPIRADORA",
    "categoria": "cotidiano",
    "prohibidas": [
      "POLVO",
      "PISO",
      "ALFOMBRA",
      "RUIDO",
      "LIMPIAR"
    ]
  },
  {
    "palabra": "ESCOBA",
    "categoria": "cotidiano",
    "prohibidas": [
      "BARRER",
      "PISO",
      "PALA",
      "BASURA",
      "BRUJA"
    ]
  },
  {
    "palabra": "BASURERO",
    "categoria": "cotidiano",
    "prohibidas": [
      "BOLSA",
      "DESECHOS",
      "BOTAR",
      "COCINA",
      "TARRO"
    ]
  },
  {
    "palabra": "MICROONDAS",
    "categoria": "cotidiano",
    "prohibidas": [
      "CALENTAR",
      "COMIDA",
      "COCINA",
      "SEGUNDOS",
      "PLATO"
    ]
  },
  {
    "palabra": "LICUADORA",
    "categoria": "cotidiano",
    "prohibidas": [
      "JUGO",
      "BATIDO",
      "CUCHILLAS",
      "FRUTA",
      "VASO"
    ]
  },
  {
    "palabra": "TOSTADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "PAN",
      "CALIENTE",
      "COCINA",
      "QUEMADO",
      "CRUJIENTE"
    ]
  },
  {
    "palabra": "HERVIDOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "AGUA",
      "CALIENTE",
      "TE",
      "CAFE",
      "VAPOR"
    ]
  },
  {
    "palabra": "SARTEN",
    "categoria": "cotidiano",
    "prohibidas": [
      "FREIR",
      "HUEVO",
      "ACEITE",
      "MANGO",
      "COCINA"
    ]
  },
  {
    "palabra": "OLLA",
    "categoria": "cotidiano",
    "prohibidas": [
      "COCINAR",
      "SOPA",
      "TAPA",
      "FUEGO",
      "CAZUELA"
    ]
  },
  {
    "palabra": "CUCHILLO",
    "categoria": "cotidiano",
    "prohibidas": [
      "CORTAR",
      "FILO",
      "CARNE",
      "TENEDOR",
      "COCINA"
    ]
  },
  {
    "palabra": "TENEDOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "PINCHAR",
      "DIENTES",
      "CUBIERTO",
      "CUCHILLO",
      "COMER"
    ]
  },
  {
    "palabra": "CUCHARA",
    "categoria": "cotidiano",
    "prohibidas": [
      "SOPA",
      "CUBIERTO",
      "REVOLVER",
      "POSTRE",
      "BOCA"
    ]
  },
  {
    "palabra": "SACACORCHOS",
    "categoria": "cotidiano",
    "prohibidas": [
      "VINO",
      "BOTELLA",
      "DESTAPAR",
      "CORCHO",
      "ESPIRAL"
    ]
  },
  {
    "palabra": "CONTROL REMOTO",
    "categoria": "cotidiano",
    "prohibidas": [
      "TELEVISOR",
      "CAMBIAR",
      "CANAL",
      "PILAS",
      "BOTONES"
    ]
  },
  {
    "palabra": "TELEVISOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "PANTALLA",
      "VER",
      "CANALES",
      "CONTROL",
      "SALA"
    ]
  },
  {
    "palabra": "SOFA",
    "categoria": "cotidiano",
    "prohibidas": [
      "SILLON",
      "SENTARSE",
      "LIVING",
      "COJINES",
      "TELE"
    ]
  },
  {
    "palabra": "COMPUTADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "PANTALLA",
      "TECLADO",
      "MOUSE",
      "INTERNET",
      "TRABAJAR"
    ]
  },
  {
    "palabra": "AUDIFONOS",
    "categoria": "cotidiano",
    "prohibidas": [
      "OREJAS",
      "MUSICA",
      "ESCUCHAR",
      "CABLE",
      "BLUETOOTH"
    ]
  },
  {
    "palabra": "CARGADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "BATERIA",
      "CELULAR",
      "ENCHUFE",
      "CABLE",
      "ENERGIA"
    ]
  },
  {
    "palabra": "AMPOLLETA",
    "categoria": "cotidiano",
    "prohibidas": [
      "LUZ",
      "TECHO",
      "ILUMINAR",
      "LAMPARA",
      "ELECTRICIDAD"
    ]
  },
  {
    "palabra": "VENTILADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "AIRE",
      "CALOR",
      "ASPAS",
      "GIRAR",
      "VERANO"
    ]
  },
  {
    "palabra": "ESTUFA",
    "categoria": "cotidiano",
    "prohibidas": [
      "CALOR",
      "FRIO",
      "INVIERNO",
      "GAS",
      "PRENDER"
    ]
  },
  {
    "palabra": "CORTINA",
    "categoria": "cotidiano",
    "prohibidas": [
      "VENTANA",
      "SOL",
      "TELA",
      "TAPAR",
      "LUZ"
    ]
  },
  {
    "palabra": "ASCENSOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "SUBIR",
      "BAJAR",
      "EDIFICIO",
      "PISOS",
      "BOTON"
    ]
  },
  {
    "palabra": "TIMBRE",
    "categoria": "cotidiano",
    "prohibidas": [
      "PUERTA",
      "SONAR",
      "VISITA",
      "CASA",
      "TOCAR"
    ]
  },
  {
    "palabra": "CANDADO",
    "categoria": "cotidiano",
    "prohibidas": [
      "LLAVE",
      "CERRAR",
      "SEGURIDAD",
      "CADENA",
      "CLAVE"
    ]
  },
  {
    "palabra": "MOCHILA",
    "categoria": "cotidiano",
    "prohibidas": [
      "ESPALDA",
      "COLEGIO",
      "LIBROS",
      "CORREAS",
      "BOLSO"
    ]
  },
  {
    "palabra": "MALETA",
    "categoria": "cotidiano",
    "prohibidas": [
      "VIAJE",
      "ROPA",
      "RUEDAS",
      "AEROPUERTO",
      "EQUIPAJE"
    ]
  },
  {
    "palabra": "CALCETINES",
    "categoria": "cotidiano",
    "prohibidas": [
      "PIES",
      "ZAPATOS",
      "PAR",
      "FRIO",
      "ALGODON"
    ]
  },
  {
    "palabra": "CORBATA",
    "categoria": "cotidiano",
    "prohibidas": [
      "CUELLO",
      "CAMISA",
      "TRAJE",
      "NUDO",
      "FORMAL"
    ]
  },
  {
    "palabra": "CINTURON",
    "categoria": "cotidiano",
    "prohibidas": [
      "PANTALON",
      "CINTURA",
      "HEBILLA",
      "CUERO",
      "AFIRMAR"
    ]
  },
  {
    "palabra": "PIJAMA",
    "categoria": "cotidiano",
    "prohibidas": [
      "DORMIR",
      "CAMA",
      "NOCHE",
      "ROPA",
      "SUAVE"
    ]
  },
  {
    "palabra": "ANILLO",
    "categoria": "cotidiano",
    "prohibidas": [
      "DEDO",
      "MATRIMONIO",
      "ORO",
      "COMPROMISO",
      "JOYA"
    ]
  },
  {
    "palabra": "COLLAR",
    "categoria": "cotidiano",
    "prohibidas": [
      "CUELLO",
      "CADENA",
      "JOYA",
      "PERLAS",
      "COLGANTE"
    ]
  },
  {
    "palabra": "TARJETA DE CREDITO",
    "categoria": "cotidiano",
    "prohibidas": [
      "PLASTICO",
      "COMPRAR",
      "CUOTAS",
      "BANCO",
      "DEUDA"
    ]
  },
  {
    "palabra": "CALENDARIO",
    "categoria": "cotidiano",
    "prohibidas": [
      "DIAS",
      "MESES",
      "AÑO",
      "FECHAS",
      "FERIADOS"
    ]
  },
  {
    "palabra": "CUADERNO",
    "categoria": "cotidiano",
    "prohibidas": [
      "HOJAS",
      "ESCRIBIR",
      "COLEGIO",
      "ESPIRAL",
      "LAPIZ"
    ]
  },
  {
    "palabra": "TIJERA",
    "categoria": "cotidiano",
    "prohibidas": [
      "CORTAR",
      "PAPEL",
      "FILO",
      "DOS HOJAS",
      "COLEGIO"
    ]
  },
  {
    "palabra": "PEGAMENTO",
    "categoria": "cotidiano",
    "prohibidas": [
      "UNIR",
      "PAPEL",
      "STICK FIX",
      "COLA FRIA",
      "PEGAR"
    ]
  },
  {
    "palabra": "ENCENDEDOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "FUEGO",
      "CHISPA",
      "GAS",
      "CIGARRO",
      "VELA"
    ]
  },
  {
    "palabra": "VELA",
    "categoria": "cotidiano",
    "prohibidas": [
      "CERA",
      "FUEGO",
      "MECHA",
      "CUMPLEAÑOS",
      "CORTE DE LUZ"
    ]
  },
  {
    "palabra": "COLGADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "ROPA",
      "CLOSET",
      "GANCHO",
      "CAMISA",
      "ORDENAR"
    ]
  },
  {
    "palabra": "MANGUERA",
    "categoria": "cotidiano",
    "prohibidas": [
      "AGUA",
      "JARDIN",
      "REGAR",
      "PASTO",
      "LLAVE"
    ]
  },
  {
    "palabra": "MARTILLO",
    "categoria": "cotidiano",
    "prohibidas": [
      "CLAVO",
      "GOLPEAR",
      "HERRAMIENTA",
      "MADERA",
      "PARED"
    ]
  },
  {
    "palabra": "DESTORNILLADOR",
    "categoria": "cotidiano",
    "prohibidas": [
      "TORNILLO",
      "GIRAR",
      "HERRAMIENTA",
      "CRUZ",
      "PALETA"
    ]
  },
  {
    "palabra": "CINTA ADHESIVA",
    "categoria": "cotidiano",
    "prohibidas": [
      "SCOTCH",
      "PEGAR",
      "ROLLO",
      "TRANSPARENTE",
      "CAJA"
    ]
  },
  {
    "palabra": "BOLSILLO",
    "categoria": "cotidiano",
    "prohibidas": [
      "PANTALON",
      "GUARDAR",
      "ROPA",
      "MONEDAS",
      "MANO"
    ]
  },
  {
    "palabra": "CIERRE",
    "categoria": "cotidiano",
    "prohibidas": [
      "CREMALLERA",
      "CHAQUETA",
      "PANTALON",
      "SUBIR",
      "ABRIR"
    ]
  },
  {
    "palabra": "BOTON",
    "categoria": "cotidiano",
    "prohibidas": [
      "CAMISA",
      "OJAL",
      "COSER",
      "ROPA",
      "APRETAR"
    ]
  },
  {
    "palabra": "NETFLIX",
    "categoria": "cine_tv",
    "prohibidas": [
      "SERIES",
      "PELICULAS",
      "STREAMING",
      "PANTALLA",
      "SILLON"
    ]
  },
  {
    "palabra": "TITANIC",
    "categoria": "cine_tv",
    "prohibidas": [
      "BARCO",
      "ICEBERG",
      "DI CAPRIO",
      "HUNDIRSE",
      "ROSE"
    ]
  },
  {
    "palabra": "CINE",
    "categoria": "cine_tv",
    "prohibidas": [
      "PELICULA",
      "POPCORN",
      "CABRITAS",
      "PANTALLA",
      "ENTRADA"
    ]
  },
  {
    "palabra": "HARRY POTTER",
    "categoria": "cine_tv",
    "prohibidas": [
      "MAGIA",
      "VARITA",
      "HOGWARTS",
      "CICATRIZ",
      "MAGO"
    ]
  },
  {
    "palabra": "STAR WARS",
    "categoria": "cine_tv",
    "prohibidas": [
      "ESPADA",
      "DARTH VADER",
      "JEDI",
      "GALAXIA",
      "FUERZA"
    ]
  },
  {
    "palabra": "SHREK",
    "categoria": "cine_tv",
    "prohibidas": [
      "OGRO",
      "VERDE",
      "FIONA",
      "BURRO",
      "PANTANO"
    ]
  },
  {
    "palabra": "BATMAN",
    "categoria": "cine_tv",
    "prohibidas": [
      "MURCIELAGO",
      "GOTHAM",
      "JOKER",
      "CAPA",
      "NOCHE"
    ]
  },
  {
    "palabra": "SPIDERMAN",
    "categoria": "cine_tv",
    "prohibidas": [
      "ARAÑA",
      "TELARAÑA",
      "PETER PARKER",
      "PICADURA",
      "SUPERHEROE"
    ]
  },
  {
    "palabra": "OSCAR",
    "categoria": "cine_tv",
    "prohibidas": [
      "PREMIO",
      "ESTATUILLA",
      "HOLLYWOOD",
      "ACTOR",
      "GANADOR"
    ]
  },
  {
    "palabra": "TIKTOK",
    "categoria": "cine_tv",
    "prohibidas": [
      "VIDEOS",
      "BAILE",
      "RED SOCIAL",
      "VIRAL",
      "CELULAR"
    ]
  },
  {
    "palabra": "AVENGERS",
    "categoria": "cine_tv",
    "prohibidas": [
      "MARVEL",
      "SUPERHEROES",
      "THANOS",
      "IRON MAN",
      "VENGADORES"
    ]
  },
  {
    "palabra": "IRON MAN",
    "categoria": "cine_tv",
    "prohibidas": [
      "TONY STARK",
      "ARMADURA",
      "ROJO",
      "MARVEL",
      "MILLONARIO"
    ]
  },
  {
    "palabra": "CAPITAN AMERICA",
    "categoria": "cine_tv",
    "prohibidas": [
      "ESCUDO",
      "ESTADOS UNIDOS",
      "STEVE ROGERS",
      "MARVEL",
      "SOLDADO"
    ]
  },
  {
    "palabra": "THOR",
    "categoria": "cine_tv",
    "prohibidas": [
      "MARTILLO",
      "DIOS",
      "TRUENO",
      "ASGARD",
      "RUBIO"
    ]
  },
  {
    "palabra": "HULK",
    "categoria": "cine_tv",
    "prohibidas": [
      "VERDE",
      "ENOJADO",
      "GIGANTE",
      "FUERZA",
      "BRUCE BANNER"
    ]
  },
  {
    "palabra": "SUPERMAN",
    "categoria": "cine_tv",
    "prohibidas": [
      "CAPA ROJA",
      "VOLAR",
      "KRIPTONITA",
      "CLARK KENT",
      "PERIODISTA"
    ]
  },
  {
    "palabra": "JOKER",
    "categoria": "cine_tv",
    "prohibidas": [
      "PAYASO",
      "GUASON",
      "BATMAN",
      "RISA",
      "VILLANO"
    ]
  },
  {
    "palabra": "DEADPOOL",
    "categoria": "cine_tv",
    "prohibidas": [
      "ROJO",
      "ESPADAS",
      "MARVEL",
      "RYAN REYNOLDS",
      "INMORTAL"
    ]
  },
  {
    "palabra": "TOY STORY",
    "categoria": "cine_tv",
    "prohibidas": [
      "JUGUETES",
      "WOODY",
      "BUZZ LIGHTYEAR",
      "ANDY",
      "PIXAR"
    ]
  },
  {
    "palabra": "BUSCANDO A NEMO",
    "categoria": "cine_tv",
    "prohibidas": [
      "PEZ PAYASO",
      "MAR",
      "DORY",
      "OCEANO",
      "PADRE"
    ]
  },
  {
    "palabra": "EL REY LEON",
    "categoria": "cine_tv",
    "prohibidas": [
      "SIMBA",
      "MUFASA",
      "SCAR",
      "AFRICA",
      "HAKUNA MATATA"
    ]
  },
  {
    "palabra": "FROZEN",
    "categoria": "cine_tv",
    "prohibidas": [
      "ELSA",
      "HIELO",
      "ANNA",
      "OLAF",
      "LIBRE SOY"
    ]
  },
  {
    "palabra": "COCO",
    "categoria": "cine_tv",
    "prohibidas": [
      "MEXICO",
      "DIA DE MUERTOS",
      "GUITARRA",
      "ABUELA",
      "RECUERDAME"
    ]
  },
  {
    "palabra": "INTENSA MENTE",
    "categoria": "cine_tv",
    "prohibidas": [
      "EMOCIONES",
      "ALEGRIA",
      "TRISTEZA",
      "MENTE",
      "RILEY"
    ]
  },
  {
    "palabra": "UP",
    "categoria": "cine_tv",
    "prohibidas": [
      "GLOBOS",
      "CASA",
      "ANCIANO",
      "VOLAR",
      "NIÑO EXPLORADOR"
    ]
  },
  {
    "palabra": "MONSTERS INC",
    "categoria": "cine_tv",
    "prohibidas": [
      "MONSTRUOS",
      "SUSTOS",
      "PUERTAS",
      "MIKE WAZOWSKI",
      "BOO"
    ]
  },
  {
    "palabra": "LOS INCREIBLES",
    "categoria": "cine_tv",
    "prohibidas": [
      "FAMILIA",
      "SUPERPODERES",
      "TRAJE ROJO",
      "PIXAR",
      "EDNA MODA"
    ]
  },
  {
    "palabra": "CARS",
    "categoria": "cine_tv",
    "prohibidas": [
      "RAYO MCQUEEN",
      "AUTOS",
      "CARRERA",
      "MATE",
      "PISTON"
    ]
  },
  {
    "palabra": "RATATOUILLE",
    "categoria": "cine_tv",
    "prohibidas": [
      "RATON",
      "COCINERO",
      "PARIS",
      "CHEF",
      "COMIDA"
    ]
  },
  {
    "palabra": "MINIONS",
    "categoria": "cine_tv",
    "prohibidas": [
      "AMARILLOS",
      "GRU",
      "BANANA",
      "OVEROL",
      "PEQUEÑOS"
    ]
  },
  {
    "palabra": "KUNG FU PANDA",
    "categoria": "cine_tv",
    "prohibidas": [
      "OSO",
      "ARTES MARCIALES",
      "PO",
      "DRAGON",
      "FIDEOS"
    ]
  },
  {
    "palabra": "MADAGASCAR",
    "categoria": "cine_tv",
    "prohibidas": [
      "ANIMALES",
      "ZOO",
      "LEON ALEX",
      "CEBRA",
      "PINGÜINOS"
    ]
  },
  {
    "palabra": "LA ERA DEL HIELO",
    "categoria": "cine_tv",
    "prohibidas": [
      "MAMUT",
      "ARDILLA",
      "BELLOTA",
      "SID",
      "FRIO"
    ]
  },
  {
    "palabra": "EL PADRINO",
    "categoria": "cine_tv",
    "prohibidas": [
      "MAFIA",
      "VITO CORLEONE",
      "ITALIA",
      "FAMILIA",
      "GANGSTER"
    ]
  },
  {
    "palabra": "JURASSIC PARK",
    "categoria": "cine_tv",
    "prohibidas": [
      "DINOSAURIOS",
      "ISLA",
      "T-REX",
      "PARQUE",
      "FOSIL"
    ]
  },
  {
    "palabra": "VOLVER AL FUTURO",
    "categoria": "cine_tv",
    "prohibidas": [
      "DELOREAN",
      "TIEMPO",
      "MARTY MCFLY",
      "DOC BROWN",
      "AUTO"
    ]
  },
  {
    "palabra": "MATRIX",
    "categoria": "cine_tv",
    "prohibidas": [
      "NEO",
      "PASTILLA ROJA",
      "COMPUTADORA",
      "BALAS",
      "REALIDAD"
    ]
  },
  {
    "palabra": "TERMINATOR",
    "categoria": "cine_tv",
    "prohibidas": [
      "ROBOT",
      "FUTURO",
      "SCHWARZENEGGER",
      "VOLVERE",
      "MAQUINA"
    ]
  },
  {
    "palabra": "AVATAR",
    "categoria": "cine_tv",
    "prohibidas": [
      "AZUL",
      "PANDORA",
      "GIGANTES",
      "SELVA",
      "JAMES CAMERON"
    ]
  },
  {
    "palabra": "EL SEÑOR DE LOS ANILLOS",
    "categoria": "cine_tv",
    "prohibidas": [
      "FRODO",
      "GOLLUM",
      "GANDALF",
      "HOBBIT",
      "VOLCAN"
    ]
  },
  {
    "palabra": "PIRATAS DEL CARIBE",
    "categoria": "cine_tv",
    "prohibidas": [
      "JACK SPARROW",
      "BARCO",
      "PERLA NEGRA",
      "JOHNNY DEPP",
      "TESORO"
    ]
  },
  {
    "palabra": "RAPIDO Y FURIOSO",
    "categoria": "cine_tv",
    "prohibidas": [
      "AUTOS",
      "CARRERAS",
      "TORETTO",
      "FAMILIA",
      "VELOCIDAD"
    ]
  },
  {
    "palabra": "JAMES BOND",
    "categoria": "cine_tv",
    "prohibidas": [
      "AGENTE 007",
      "ESPIA",
      "TRAJE",
      "PISTOLA",
      "INGLES"
    ]
  },
  {
    "palabra": "INDIANA JONES",
    "categoria": "cine_tv",
    "prohibidas": [
      "LATIGO",
      "SOMBRERO",
      "ARQUEOLOGO",
      "TESORO",
      "ROCA"
    ]
  },
  {
    "palabra": "ROCKY",
    "categoria": "cine_tv",
    "prohibidas": [
      "BOXEO",
      "BALBOA",
      "STALLONE",
      "RING",
      "GUANTES"
    ]
  },
  {
    "palabra": "FORREST GUMP",
    "categoria": "cine_tv",
    "prohibidas": [
      "CORRER",
      "CHOCOLATES",
      "TOM HANKS",
      "JENNY",
      "BANCA"
    ]
  },
  {
    "palabra": "MI POBRE ANGELITO",
    "categoria": "cine_tv",
    "prohibidas": [
      "NAVIDAD",
      "CASA SOLO",
      "KEVIN",
      "LADRONES",
      "TRAMPAS"
    ]
  },
  {
    "palabra": "EL EXORCISTA",
    "categoria": "cine_tv",
    "prohibidas": [
      "DEMONIO",
      "POSEIDA",
      "SACERDOTE",
      "CAMA",
      "TERROR"
    ]
  },
  {
    "palabra": "CHUCKY",
    "categoria": "cine_tv",
    "prohibidas": [
      "MUÑECO DIABOLICO",
      "CUCHILLO",
      "PELIRROJO",
      "JUGUETE",
      "TERROR"
    ]
  },
  {
    "palabra": "STRANGER THINGS",
    "categoria": "cine_tv",
    "prohibidas": [
      "ELEVEN",
      "ONCE",
      "MONSTRUO",
      "OCHENTA",
      "NIÑOS"
    ]
  },
  {
    "palabra": "BREAKING BAD",
    "categoria": "cine_tv",
    "prohibidas": [
      "WALTER WHITE",
      "QUIMICA",
      "DROGA",
      "PROFESOR",
      "CALVO"
    ]
  },
  {
    "palabra": "GAME OF THRONES",
    "categoria": "cine_tv",
    "prohibidas": [
      "DRAGONES",
      "TRONO DE HIERRO",
      "INVIERNO",
      "JON SNOW",
      "REINOS"
    ]
  },
  {
    "palabra": "LA CASA DE PAPEL",
    "categoria": "cine_tv",
    "prohibidas": [
      "ATRACO",
      "MASCARA",
      "PROFESOR",
      "ROJO",
      "BELLA CIAO"
    ]
  },
  {
    "palabra": "EL JUEGO DEL CALAMAR",
    "categoria": "cine_tv",
    "prohibidas": [
      "COREA",
      "MUÑECA",
      "DINERO",
      "VERDE",
      "ELIMINADO"
    ]
  },
  {
    "palabra": "LOS SIMPSON",
    "categoria": "cine_tv",
    "prohibidas": [
      "HOMERO",
      "AMARILLOS",
      "BART",
      "SPRINGFIELD",
      "DONA"
    ]
  },
  {
    "palabra": "BOB ESPONJA",
    "categoria": "cine_tv",
    "prohibidas": [
      "PIÑA",
      "FONDO DE BIKINI",
      "PATRICIO",
      "CANGREBURGER",
      "AMARILLO"
    ]
  },
  {
    "palabra": "DRAGON BALL",
    "categoria": "cine_tv",
    "prohibidas": [
      "GOKU",
      "ESFERAS",
      "VEGETA",
      "SAIYAJIN",
      "KAMEHAMEHA"
    ]
  },
  {
    "palabra": "NARUTO",
    "categoria": "cine_tv",
    "prohibidas": [
      "NINJA",
      "ALDEA",
      "ZORRO",
      "SASUKE",
      "ANIME"
    ]
  },
  {
    "palabra": "POKEMON",
    "categoria": "cine_tv",
    "prohibidas": [
      "PIKACHU",
      "POKEBOLA",
      "ASH",
      "ATRAPAR",
      "ENTRENADOR"
    ]
  },
  {
    "palabra": "ONE PIECE",
    "categoria": "cine_tv",
    "prohibidas": [
      "LUFFY",
      "PIRATA",
      "SOMBRERO DE PAJA",
      "GOMA",
      "TESORO"
    ]
  },
  {
    "palabra": "FRIENDS",
    "categoria": "cine_tv",
    "prohibidas": [
      "AMIGOS",
      "CAFE",
      "RACHEL",
      "ROSS",
      "NUEVA YORK"
    ]
  },
  {
    "palabra": "THE WALKING DEAD",
    "categoria": "cine_tv",
    "prohibidas": [
      "ZOMBIES",
      "MUERTOS",
      "APOCALIPSIS",
      "RICK",
      "MORDER"
    ]
  },
  {
    "palabra": "EL CHAVO DEL OCHO",
    "categoria": "cine_tv",
    "prohibidas": [
      "BARRIL",
      "VECINDAD",
      "QUICO",
      "DON RAMON",
      "TORTA DE JAMON"
    ]
  },
  {
    "palabra": "YOUTUBE",
    "categoria": "cine_tv",
    "prohibidas": [
      "VIDEOS",
      "CANAL",
      "SUSCRIBIRSE",
      "LIKE",
      "INTERNET"
    ]
  },
  {
    "palabra": "SPOTIFY",
    "categoria": "cine_tv",
    "prohibidas": [
      "MUSICA",
      "PLAYLIST",
      "CANCIONES",
      "ESCUCHAR",
      "APP"
    ]
  },
  {
    "palabra": "DISNEY",
    "categoria": "cine_tv",
    "prohibidas": [
      "MICKEY MOUSE",
      "CASTILLO",
      "PRINCESAS",
      "PELICULAS",
      "PARQUE"
    ]
  },
  {
    "palabra": "ALFOMBRA ROJA",
    "categoria": "cine_tv",
    "prohibidas": [
      "FAMOSOS",
      "PREMIOS",
      "VESTIDO",
      "FOTOS",
      "GALA"
    ]
  },
  {
    "palabra": "TRAILER",
    "categoria": "cine_tv",
    "prohibidas": [
      "ADELANTO",
      "PELICULA",
      "CINE",
      "AVANCE",
      "ESTRENO"
    ]
  },
  {
    "palabra": "DOBLAJE",
    "categoria": "cine_tv",
    "prohibidas": [
      "VOZ",
      "IDIOMA",
      "ESPAÑOL",
      "ACTOR",
      "TRADUCIR"
    ]
  },
  {
    "palabra": "SUBTITULOS",
    "categoria": "cine_tv",
    "prohibidas": [
      "LEER",
      "LETRAS",
      "ABAJO",
      "PELICULA",
      "IDIOMA"
    ]
  },
  {
    "palabra": "BARBIE",
    "categoria": "cine_tv",
    "prohibidas": [
      "MUÑECA",
      "ROSADO",
      "KEN",
      "PLASTICO",
      "PELICULA"
    ]
  },
  {
    "palabra": "OPPENHEIMER",
    "categoria": "cine_tv",
    "prohibidas": [
      "BOMBA ATOMICA",
      "CIENTIFICO",
      "EXPLOSION",
      "GUERRA",
      "SOMBRERO"
    ]
  },
  {
    "palabra": "MARIO BROS",
    "categoria": "cine_tv",
    "prohibidas": [
      "FONTANERO",
      "BIGOTE",
      "PRINCESA",
      "BOWSER",
      "CHAMPIÑON"
    ]
  },
  {
    "palabra": "MERLINA",
    "categoria": "cine_tv",
    "prohibidas": [
      "WEDNESDAY",
      "LOCOS ADDAMS",
      "TRENZAS",
      "NEGRO",
      "DEDOS"
    ]
  },
  {
    "palabra": "AEROPUERTO",
    "categoria": "lugares",
    "prohibidas": [
      "AVION",
      "VOLAR",
      "MALETAS",
      "PASAPORTE",
      "TERMINAL"
    ]
  },
  {
    "palabra": "PLAYA",
    "categoria": "lugares",
    "prohibidas": [
      "ARENA",
      "MAR",
      "SOL",
      "VERANO",
      "TOALLA"
    ]
  },
  {
    "palabra": "HOSPITAL",
    "categoria": "lugares",
    "prohibidas": [
      "MEDICO",
      "ENFERMO",
      "URGENCIA",
      "CAMILLA",
      "MEDICINA"
    ]
  },
  {
    "palabra": "MUSEO",
    "categoria": "lugares",
    "prohibidas": [
      "ARTE",
      "CUADROS",
      "HISTORIA",
      "EXPOSICION",
      "ESCULTURA"
    ]
  },
  {
    "palabra": "CEMENTERIO",
    "categoria": "lugares",
    "prohibidas": [
      "MUERTOS",
      "TUMBAS",
      "FLORES",
      "FANTASMAS",
      "ENTIERRO"
    ]
  },
  {
    "palabra": "HOTEL",
    "categoria": "lugares",
    "prohibidas": [
      "HABITACION",
      "VACACIONES",
      "RECEPCION",
      "DORMIR",
      "RESERVA"
    ]
  },
  {
    "palabra": "SUPERMERCADO",
    "categoria": "lugares",
    "prohibidas": [
      "COMPRAS",
      "CARRO",
      "CAJA",
      "PASILLOS",
      "PRODUCTOS"
    ]
  },
  {
    "palabra": "ZOO",
    "categoria": "lugares",
    "prohibidas": [
      "ANIMALES",
      "JAULA",
      "LEON",
      "MONO",
      "VISITA"
    ]
  },
  {
    "palabra": "BIBLIOTECA",
    "categoria": "lugares",
    "prohibidas": [
      "LIBROS",
      "SILENCIO",
      "LEER",
      "ESTUDIAR",
      "PRESTAMO"
    ]
  },
  {
    "palabra": "GIMNASIO",
    "categoria": "lugares",
    "prohibidas": [
      "PESAS",
      "EJERCICIO",
      "SUDAR",
      "MUSCULOS",
      "ENTRENAR"
    ]
  },
  {
    "palabra": "ESTACION DE TREN",
    "categoria": "lugares",
    "prohibidas": [
      "VIAS",
      "VAGONES",
      "RIELES",
      "BOLETO",
      "ANDEN"
    ]
  },
  {
    "palabra": "TERMINAL DE BUSES",
    "categoria": "lugares",
    "prohibidas": [
      "VIAJE",
      "PASAJE",
      "MALETAS",
      "ANDEN",
      "CHOFER"
    ]
  },
  {
    "palabra": "PUERTO",
    "categoria": "lugares",
    "prohibidas": [
      "BARCOS",
      "MAR",
      "CONTENEDORES",
      "MUELLE",
      "PESCADORES"
    ]
  },
  {
    "palabra": "CRUCERO",
    "categoria": "lugares",
    "prohibidas": [
      "BARCO",
      "VACACIONES",
      "MAR",
      "PISCINA",
      "CAMAROTE"
    ]
  },
  {
    "palabra": "FARO",
    "categoria": "lugares",
    "prohibidas": [
      "LUZ",
      "TORRE",
      "COSTA",
      "BARCOS",
      "NOCHE"
    ]
  },
  {
    "palabra": "ISLA",
    "categoria": "lugares",
    "prohibidas": [
      "AGUA",
      "RODEADA",
      "MAR",
      "PALMERA",
      "DESIERTA"
    ]
  },
  {
    "palabra": "DESIERTO",
    "categoria": "lugares",
    "prohibidas": [
      "ARENA",
      "CALOR",
      "CACTUS",
      "CAMELLO",
      "SEQUIA"
    ]
  },
  {
    "palabra": "SELVA",
    "categoria": "lugares",
    "prohibidas": [
      "ARBOLES",
      "AMAZONAS",
      "ANIMALES",
      "VERDE",
      "TROPICAL"
    ]
  },
  {
    "palabra": "BOSQUE",
    "categoria": "lugares",
    "prohibidas": [
      "ARBOLES",
      "PINOS",
      "LEÑA",
      "NATURALEZA",
      "SOMBRA"
    ]
  },
  {
    "palabra": "VOLCAN",
    "categoria": "lugares",
    "prohibidas": [
      "LAVA",
      "ERUPCION",
      "CRATER",
      "MONTAÑA",
      "CENIZA"
    ]
  },
  {
    "palabra": "CUEVA",
    "categoria": "lugares",
    "prohibidas": [
      "OSCURIDAD",
      "ROCA",
      "MURCIELAGO",
      "CAVERNICOLA",
      "SUBTERRANEO"
    ]
  },
  {
    "palabra": "CASCADA",
    "categoria": "lugares",
    "prohibidas": [
      "AGUA",
      "CAIDA",
      "RIO",
      "ALTURA",
      "ROCAS"
    ]
  },
  {
    "palabra": "GLACIAR",
    "categoria": "lugares",
    "prohibidas": [
      "HIELO",
      "FRIO",
      "SUR",
      "NIEVE",
      "DERRETIR"
    ]
  },
  {
    "palabra": "CAMPING",
    "categoria": "lugares",
    "prohibidas": [
      "CARPA",
      "FOGATA",
      "SACO DE DORMIR",
      "BOSQUE",
      "NATURALEZA"
    ]
  },
  {
    "palabra": "CIRCO",
    "categoria": "lugares",
    "prohibidas": [
      "CARPA",
      "PAYASOS",
      "TRAPECISTA",
      "MALABARES",
      "ESPECTACULO"
    ]
  },
  {
    "palabra": "CASINO",
    "categoria": "lugares",
    "prohibidas": [
      "APUESTAS",
      "RULETA",
      "DINERO",
      "CARTAS",
      "TRAGAMONEDAS"
    ]
  },
  {
    "palabra": "DISCOTECA",
    "categoria": "lugares",
    "prohibidas": [
      "BAILAR",
      "NOCHE",
      "MUSICA",
      "DJ",
      "LUCES"
    ]
  },
  {
    "palabra": "RESTAURANTE",
    "categoria": "lugares",
    "prohibidas": [
      "COMER",
      "MESERO",
      "MENU",
      "CUENTA",
      "MESA"
    ]
  },
  {
    "palabra": "PANADERIA",
    "categoria": "lugares",
    "prohibidas": [
      "PAN",
      "HARINA",
      "HORNO",
      "MARRAQUETA",
      "OLOR"
    ]
  },
  {
    "palabra": "CARNICERIA",
    "categoria": "lugares",
    "prohibidas": [
      "CARNE",
      "ASADO",
      "POLLO",
      "VACUNO",
      "CUCHILLO"
    ]
  },
  {
    "palabra": "FARMACIA",
    "categoria": "lugares",
    "prohibidas": [
      "REMEDIOS",
      "PASTILLAS",
      "RECETA",
      "ENFERMO",
      "MEDICAMENTOS"
    ]
  },
  {
    "palabra": "FERRETERIA",
    "categoria": "lugares",
    "prohibidas": [
      "HERRAMIENTAS",
      "CLAVOS",
      "TORNILLOS",
      "MARTILLO",
      "CONSTRUCCION"
    ]
  },
  {
    "palabra": "PELUQUERIA",
    "categoria": "lugares",
    "prohibidas": [
      "PELO",
      "CORTAR",
      "TIJERAS",
      "TEÑIR",
      "PEINAR"
    ]
  },
  {
    "palabra": "BANCO",
    "categoria": "lugares",
    "prohibidas": [
      "DINERO",
      "CUENTA",
      "CAJERO",
      "PRESTAMO",
      "FILA"
    ]
  },
  {
    "palabra": "CAJERO AUTOMATICO",
    "categoria": "lugares",
    "prohibidas": [
      "SACAR PLATA",
      "TARJETA",
      "CLAVE",
      "BILLETES",
      "BANCO"
    ]
  },
  {
    "palabra": "COMISARIA",
    "categoria": "lugares",
    "prohibidas": [
      "POLICIA",
      "CARABINEROS",
      "DENUNCIA",
      "DETENIDO",
      "CALABOZO"
    ]
  },
  {
    "palabra": "CARCEL",
    "categoria": "lugares",
    "prohibidas": [
      "PRESOS",
      "REJAS",
      "CELDA",
      "GUARDIA",
      "CONDENA"
    ]
  },
  {
    "palabra": "IGLESIA",
    "categoria": "lugares",
    "prohibidas": [
      "MISA",
      "DIOS",
      "CURA",
      "REZAR",
      "CRUZ"
    ]
  },
  {
    "palabra": "CASTILLO",
    "categoria": "lugares",
    "prohibidas": [
      "REY",
      "PRINCESA",
      "TORRES",
      "MEDIEVAL",
      "MURALLA"
    ]
  },
  {
    "palabra": "PIRAMIDES DE EGIPTO",
    "categoria": "lugares",
    "prohibidas": [
      "FARAON",
      "MOMIA",
      "DESIERTO",
      "TRIANGULO",
      "ESFINGE"
    ]
  },
  {
    "palabra": "TORRE EIFFEL",
    "categoria": "lugares",
    "prohibidas": [
      "PARIS",
      "FRANCIA",
      "HIERRO",
      "ALTA",
      "MONUMENTO"
    ]
  },
  {
    "palabra": "ESTATUA DE LA LIBERTAD",
    "categoria": "lugares",
    "prohibidas": [
      "NUEVA YORK",
      "ANTORCHA",
      "ESTADOS UNIDOS",
      "CORONA",
      "VERDE"
    ]
  },
  {
    "palabra": "COLISEO ROMANO",
    "categoria": "lugares",
    "prohibidas": [
      "ITALIA",
      "ROMA",
      "GLADIADORES",
      "ARENA",
      "RUINAS"
    ]
  },
  {
    "palabra": "GRAN MURALLA CHINA",
    "categoria": "lugares",
    "prohibidas": [
      "ASIA",
      "PARED",
      "LARGA",
      "PIEDRA",
      "DRAGON"
    ]
  },
  {
    "palabra": "MACHU PICCHU",
    "categoria": "lugares",
    "prohibidas": [
      "PERU",
      "INCAS",
      "MONTAÑA",
      "RUINAS",
      "CUSCO"
    ]
  },
  {
    "palabra": "DISNEYLANDIA",
    "categoria": "lugares",
    "prohibidas": [
      "MICKEY",
      "PARQUE",
      "JUEGOS",
      "CASTILLO",
      "ORLANDO"
    ]
  },
  {
    "palabra": "LAS VEGAS",
    "categoria": "lugares",
    "prohibidas": [
      "CASINOS",
      "APUESTAS",
      "BODAS",
      "LUCES",
      "DESIERTO"
    ]
  },
  {
    "palabra": "NUEVA YORK",
    "categoria": "lugares",
    "prohibidas": [
      "ESTADOS UNIDOS",
      "RASCACIELOS",
      "TIMES SQUARE",
      "MANHATTAN",
      "GRAN MANZANA"
    ]
  },
  {
    "palabra": "PARIS",
    "categoria": "lugares",
    "prohibidas": [
      "FRANCIA",
      "TORRE EIFFEL",
      "AMOR",
      "MUSEO LOUVRE",
      "CROISSANT"
    ]
  },
  {
    "palabra": "ROMA",
    "categoria": "lugares",
    "prohibidas": [
      "ITALIA",
      "COLISEO",
      "PAPA",
      "VATICANO",
      "PASTA"
    ]
  },
  {
    "palabra": "LONDRES",
    "categoria": "lugares",
    "prohibidas": [
      "INGLATERRA",
      "BIG BEN",
      "REINA",
      "AUTOBUS ROJO",
      "LLUVIA"
    ]
  },
  {
    "palabra": "TOKIO",
    "categoria": "lugares",
    "prohibidas": [
      "JAPON",
      "ANIME",
      "TECNOLOGIA",
      "SUSHI",
      "ASIA"
    ]
  },
  {
    "palabra": "RIO DE JANEIRO",
    "categoria": "lugares",
    "prohibidas": [
      "BRASIL",
      "CRISTO REDENTOR",
      "CARNAVAL",
      "PLAYA",
      "SAMBA"
    ]
  },
  {
    "palabra": "BUENOS AIRES",
    "categoria": "lugares",
    "prohibidas": [
      "ARGENTINA",
      "OBELISCO",
      "TANGO",
      "ASADO",
      "FUTBOL"
    ]
  },
  {
    "palabra": "COLEGIO",
    "categoria": "lugares",
    "prohibidas": [
      "CLASES",
      "PROFESOR",
      "RECREO",
      "ALUMNOS",
      "SALA"
    ]
  },
  {
    "palabra": "UNIVERSIDAD",
    "categoria": "lugares",
    "prohibidas": [
      "CARRERA",
      "ESTUDIAR",
      "TITULO",
      "MECHON",
      "RAMOS"
    ]
  },
  {
    "palabra": "JARDIN INFANTIL",
    "categoria": "lugares",
    "prohibidas": [
      "NIÑOS",
      "TIA",
      "JUGAR",
      "PARVULOS",
      "PEQUEÑOS"
    ]
  },
  {
    "palabra": "OFICINA",
    "categoria": "lugares",
    "prohibidas": [
      "TRABAJO",
      "ESCRITORIO",
      "COMPUTADOR",
      "JEFE",
      "REUNION"
    ]
  },
  {
    "palabra": "FABRICA",
    "categoria": "lugares",
    "prohibidas": [
      "MAQUINAS",
      "OBREROS",
      "PRODUCIR",
      "HUMO",
      "INDUSTRIA"
    ]
  },
  {
    "palabra": "ESTADIO",
    "categoria": "lugares",
    "prohibidas": [
      "FUTBOL",
      "CANCHA",
      "PUBLICO",
      "GRADAS",
      "PARTIDO"
    ]
  },
  {
    "palabra": "TEATRO",
    "categoria": "lugares",
    "prohibidas": [
      "ESCENARIO",
      "ACTORES",
      "OBRA",
      "TELON",
      "APLAUDIR"
    ]
  },
  {
    "palabra": "MALL",
    "categoria": "lugares",
    "prohibidas": [
      "TIENDAS",
      "COMPRAR",
      "CENTRO COMERCIAL",
      "PATIO DE COMIDAS",
      "ESCALERA MECANICA"
    ]
  },
  {
    "palabra": "ESTACIONAMIENTO",
    "categoria": "lugares",
    "prohibidas": [
      "AUTOS",
      "GUARDAR",
      "TICKET",
      "SUBTERRANEO",
      "ESTACIONAR"
    ]
  },
  {
    "palabra": "BENCINERA",
    "categoria": "lugares",
    "prohibidas": [
      "COMBUSTIBLE",
      "AUTO",
      "COPEC",
      "LLENAR",
      "ESTANQUE"
    ]
  },
  {
    "palabra": "PEAJE",
    "categoria": "lugares",
    "prohibidas": [
      "CARRETERA",
      "PAGAR",
      "AUTO",
      "BARRERA",
      "TAG"
    ]
  },
  {
    "palabra": "PUENTE",
    "categoria": "lugares",
    "prohibidas": [
      "CRUZAR",
      "RIO",
      "COLGANTE",
      "CAMINO",
      "ARRIBA"
    ]
  },
  {
    "palabra": "TUNEL",
    "categoria": "lugares",
    "prohibidas": [
      "CERRO",
      "OSCURO",
      "ATRAVESAR",
      "LUCES",
      "SUBTERRANEO"
    ]
  },
  {
    "palabra": "FRONTERA",
    "categoria": "lugares",
    "prohibidas": [
      "PAISES",
      "LIMITE",
      "ADUANA",
      "PASAPORTE",
      "CRUZAR"
    ]
  },
  {
    "palabra": "SAUNA",
    "categoria": "lugares",
    "prohibidas": [
      "VAPOR",
      "CALOR",
      "SUDAR",
      "MADERA",
      "TOALLA"
    ]
  },
  {
    "palabra": "PISCINA",
    "categoria": "lugares",
    "prohibidas": [
      "AGUA",
      "NADAR",
      "CLORO",
      "VERANO",
      "TRAJE DE BAÑO"
    ]
  },
  {
    "palabra": "MIRADOR",
    "categoria": "lugares",
    "prohibidas": [
      "VISTA",
      "ALTURA",
      "PAISAJE",
      "FOTOS",
      "CERRO"
    ]
  },
  {
    "palabra": "LABORATORIO",
    "categoria": "lugares",
    "prohibidas": [
      "CIENTIFICO",
      "TUBOS DE ENSAYO",
      "EXPERIMENTO",
      "MICROSCOPIO",
      "QUIMICA"
    ]
  },
  {
    "palabra": "OBSERVATORIO",
    "categoria": "lugares",
    "prohibidas": [
      "ESTRELLAS",
      "TELESCOPIO",
      "CIELO",
      "NOCHE",
      "PLANETAS"
    ]
  },
  {
    "palabra": "ACUARIO",
    "categoria": "lugares",
    "prohibidas": [
      "PECES",
      "AGUA",
      "VIDRIO",
      "TIBURON",
      "MAR"
    ]
  },
  {
    "palabra": "BOMBERO",
    "categoria": "profesiones",
    "prohibidas": [
      "FUEGO",
      "INCENDIO",
      "AGUA",
      "MANGUERA",
      "SIRENA"
    ]
  },
  {
    "palabra": "DENTISTA",
    "categoria": "profesiones",
    "prohibidas": [
      "DIENTES",
      "BOCA",
      "DOLOR",
      "TORNO",
      "CARIES"
    ]
  },
  {
    "palabra": "PROFESOR",
    "categoria": "profesiones",
    "prohibidas": [
      "ALUMNOS",
      "CLASES",
      "COLEGIO",
      "PIZARRON",
      "ENSEÑAR"
    ]
  },
  {
    "palabra": "POLICIA",
    "categoria": "profesiones",
    "prohibidas": [
      "CARABINERO",
      "LADRON",
      "PISTOLA",
      "ARRESTAR",
      "PATRULLA"
    ]
  },
  {
    "palabra": "ABOGADO",
    "categoria": "profesiones",
    "prohibidas": [
      "JUICIO",
      "LEYES",
      "DEFENDER",
      "JUEZ",
      "DEMANDA"
    ]
  },
  {
    "palabra": "ASTRONAUTA",
    "categoria": "profesiones",
    "prohibidas": [
      "ESPACIO",
      "LUNA",
      "COHETE",
      "TRAJE",
      "NASA"
    ]
  },
  {
    "palabra": "MAGO",
    "categoria": "profesiones",
    "prohibidas": [
      "TRUCO",
      "CONEJO",
      "SOMBRERO",
      "VARITA",
      "ILUSION"
    ]
  },
  {
    "palabra": "ARBITRO",
    "categoria": "profesiones",
    "prohibidas": [
      "FUTBOL",
      "SILBATO",
      "TARJETA",
      "PENAL",
      "FALTA"
    ]
  },
  {
    "palabra": "COCINERO",
    "categoria": "profesiones",
    "prohibidas": [
      "CHEF",
      "COMIDA",
      "RESTAURANTE",
      "RECETA",
      "SARTEN"
    ]
  },
  {
    "palabra": "PILOTO",
    "categoria": "profesiones",
    "prohibidas": [
      "AVION",
      "VOLAR",
      "CABINA",
      "AZAFATA",
      "AEROPUERTO"
    ]
  },
  {
    "palabra": "MEDICO",
    "categoria": "profesiones",
    "prohibidas": [
      "DOCTOR",
      "HOSPITAL",
      "ENFERMO",
      "RECETA",
      "DELANTAL BLANCO"
    ]
  },
  {
    "palabra": "ENFERMERA",
    "categoria": "profesiones",
    "prohibidas": [
      "HOSPITAL",
      "INYECCION",
      "CUIDAR",
      "PACIENTE",
      "SUERO"
    ]
  },
  {
    "palabra": "CIRUJANO",
    "categoria": "profesiones",
    "prohibidas": [
      "OPERAR",
      "QUIROFANO",
      "BISTURI",
      "HOSPITAL",
      "ANESTESIA"
    ]
  },
  {
    "palabra": "VETERINARIO",
    "categoria": "profesiones",
    "prohibidas": [
      "ANIMALES",
      "PERRO",
      "GATO",
      "DOCTOR",
      "VACUNA"
    ]
  },
  {
    "palabra": "PSICOLOGO",
    "categoria": "profesiones",
    "prohibidas": [
      "TERAPIA",
      "MENTE",
      "HABLAR",
      "PROBLEMAS",
      "DIVAN"
    ]
  },
  {
    "palabra": "KINESIOLOGO",
    "categoria": "profesiones",
    "prohibidas": [
      "LESION",
      "MUSCULOS",
      "REHABILITACION",
      "MASAJE",
      "EJERCICIOS"
    ]
  },
  {
    "palabra": "ARQUITECTO",
    "categoria": "profesiones",
    "prohibidas": [
      "PLANOS",
      "CASAS",
      "EDIFICIOS",
      "DISEÑAR",
      "CONSTRUCCION"
    ]
  },
  {
    "palabra": "CONSTRUCTOR",
    "categoria": "profesiones",
    "prohibidas": [
      "OBRA",
      "CEMENTO",
      "CASCO",
      "LADRILLOS",
      "EDIFICIO"
    ]
  },
  {
    "palabra": "CARPINTERO",
    "categoria": "profesiones",
    "prohibidas": [
      "MADERA",
      "MUEBLES",
      "SERRUCHO",
      "MARTILLO",
      "CLAVOS"
    ]
  },
  {
    "palabra": "ELECTRICISTA",
    "categoria": "profesiones",
    "prohibidas": [
      "CABLES",
      "LUZ",
      "CORRIENTE",
      "ENCHUFE",
      "INSTALAR"
    ]
  },
  {
    "palabra": "GASFITER",
    "categoria": "profesiones",
    "prohibidas": [
      "CAÑERIAS",
      "AGUA",
      "FUGA",
      "LLAVE",
      "BAÑO"
    ]
  },
  {
    "palabra": "PINTOR",
    "categoria": "profesiones",
    "prohibidas": [
      "BROCHA",
      "COLOR",
      "PARED",
      "CUADRO",
      "RODILLO"
    ]
  },
  {
    "palabra": "MECANICO",
    "categoria": "profesiones",
    "prohibidas": [
      "AUTO",
      "MOTOR",
      "TALLER",
      "ACEITE",
      "ARREGLAR"
    ]
  },
  {
    "palabra": "TAXISTA",
    "categoria": "profesiones",
    "prohibidas": [
      "AUTO",
      "TECHO AMARILLO",
      "PASAJERO",
      "TAXIMETRO",
      "MANEJAR"
    ]
  },
  {
    "palabra": "REPARTIDOR",
    "categoria": "profesiones",
    "prohibidas": [
      "DELIVERY",
      "MOTO",
      "PEDIDO",
      "COMIDA",
      "MOCHILA"
    ]
  },
  {
    "palabra": "CARTERO",
    "categoria": "profesiones",
    "prohibidas": [
      "CARTAS",
      "CORREO",
      "BUZON",
      "SOBRES",
      "ENTREGAR"
    ]
  },
  {
    "palabra": "GUARDIA",
    "categoria": "profesiones",
    "prohibidas": [
      "SEGURIDAD",
      "VIGILAR",
      "ENTRADA",
      "UNIFORME",
      "RADIO"
    ]
  },
  {
    "palabra": "DETECTIVE",
    "categoria": "profesiones",
    "prohibidas": [
      "INVESTIGAR",
      "PISTAS",
      "LUPA",
      "CRIMEN",
      "SHERLOCK HOLMES"
    ]
  },
  {
    "palabra": "ESPIA",
    "categoria": "profesiones",
    "prohibidas": [
      "SECRETO",
      "INFILTRADO",
      "AGENTE",
      "MISION",
      "OCULTO"
    ]
  },
  {
    "palabra": "JUEZ",
    "categoria": "profesiones",
    "prohibidas": [
      "TRIBUNAL",
      "MARTILLO",
      "SENTENCIA",
      "CULPABLE",
      "LEY"
    ]
  },
  {
    "palabra": "PRESIDENTE",
    "categoria": "profesiones",
    "prohibidas": [
      "PAIS",
      "GOBIERNO",
      "ELECCIONES",
      "BANDA",
      "LA MONEDA"
    ]
  },
  {
    "palabra": "ALCALDE",
    "categoria": "profesiones",
    "prohibidas": [
      "COMUNA",
      "MUNICIPALIDAD",
      "CIUDAD",
      "VECINOS",
      "VOTAR"
    ]
  },
  {
    "palabra": "PERIODISTA",
    "categoria": "profesiones",
    "prohibidas": [
      "NOTICIAS",
      "MICROFONO",
      "ENTREVISTA",
      "TELEVISION",
      "DIARIO"
    ]
  },
  {
    "palabra": "FOTOGRAFO",
    "categoria": "profesiones",
    "prohibidas": [
      "CAMARA",
      "FOTO",
      "LENTE",
      "FLASH",
      "POSAR"
    ]
  },
  {
    "palabra": "ACTOR",
    "categoria": "profesiones",
    "prohibidas": [
      "PELICULA",
      "TEATRO",
      "PERSONAJE",
      "ACTUAR",
      "GUION"
    ]
  },
  {
    "palabra": "CANTANTE",
    "categoria": "profesiones",
    "prohibidas": [
      "VOZ",
      "MICROFONO",
      "CONCIERTO",
      "CANCION",
      "ESCENARIO"
    ]
  },
  {
    "palabra": "DJ",
    "categoria": "profesiones",
    "prohibidas": [
      "MUSICA",
      "FIESTA",
      "MEZCLAR",
      "AUDIFONOS",
      "DISCOTECA"
    ]
  },
  {
    "palabra": "BAILARIN",
    "categoria": "profesiones",
    "prohibidas": [
      "MUSICA",
      "COREOGRAFIA",
      "ESCENARIO",
      "RITMO",
      "BALLET"
    ]
  },
  {
    "palabra": "PAYASO",
    "categoria": "profesiones",
    "prohibidas": [
      "NARIZ ROJA",
      "CIRCO",
      "REIR",
      "GLOBOS",
      "MAQUILLAJE"
    ]
  },
  {
    "palabra": "MIMO",
    "categoria": "profesiones",
    "prohibidas": [
      "SILENCIO",
      "CARA PINTADA",
      "GESTOS",
      "CAJA INVISIBLE",
      "GUANTES"
    ]
  },
  {
    "palabra": "INFLUENCER",
    "categoria": "profesiones",
    "prohibidas": [
      "INSTAGRAM",
      "SEGUIDORES",
      "REDES SOCIALES",
      "MARCAS",
      "FOTOS"
    ]
  },
  {
    "palabra": "YOUTUBER",
    "categoria": "profesiones",
    "prohibidas": [
      "VIDEOS",
      "CANAL",
      "SUSCRIPTORES",
      "INTERNET",
      "CAMARA"
    ]
  },
  {
    "palabra": "PROGRAMADOR",
    "categoria": "profesiones",
    "prohibidas": [
      "CODIGO",
      "COMPUTADOR",
      "SOFTWARE",
      "TECLADO",
      "PAGINA WEB"
    ]
  },
  {
    "palabra": "HACKER",
    "categoria": "profesiones",
    "prohibidas": [
      "COMPUTADOR",
      "PIRATA",
      "CONTRASEÑA",
      "ROBAR",
      "SISTEMA"
    ]
  },
  {
    "palabra": "CIENTIFICO",
    "categoria": "profesiones",
    "prohibidas": [
      "LABORATORIO",
      "EXPERIMENTO",
      "DESCUBRIR",
      "BATA BLANCA",
      "CIENCIA"
    ]
  },
  {
    "palabra": "ARQUEOLOGO",
    "categoria": "profesiones",
    "prohibidas": [
      "FOSILES",
      "EXCAVAR",
      "HUESOS",
      "RUINAS",
      "HISTORIA"
    ]
  },
  {
    "palabra": "ESCRITOR",
    "categoria": "profesiones",
    "prohibidas": [
      "LIBRO",
      "NOVELA",
      "HISTORIA",
      "AUTOR",
      "LETRAS"
    ]
  },
  {
    "palabra": "CONTADOR",
    "categoria": "profesiones",
    "prohibidas": [
      "NUMEROS",
      "IMPUESTOS",
      "FINANZAS",
      "BALANCE",
      "PLATA"
    ]
  },
  {
    "palabra": "VENDEDOR",
    "categoria": "profesiones",
    "prohibidas": [
      "TIENDA",
      "CLIENTE",
      "COMPRAR",
      "OFERTA",
      "ATENDER"
    ]
  },
  {
    "palabra": "CAJERO",
    "categoria": "profesiones",
    "prohibidas": [
      "SUPERMERCADO",
      "PAGAR",
      "DINERO",
      "BOLETA",
      "ESCANER"
    ]
  },
  {
    "palabra": "MESERO",
    "categoria": "profesiones",
    "prohibidas": [
      "GARZON",
      "RESTAURANTE",
      "PROPINA",
      "BANDEJA",
      "PEDIDO"
    ]
  },
  {
    "palabra": "BARMAN",
    "categoria": "profesiones",
    "prohibidas": [
      "TRAGOS",
      "BARRA",
      "COCTEL",
      "BOTELLAS",
      "SERVIR"
    ]
  },
  {
    "palabra": "PANADERO",
    "categoria": "profesiones",
    "prohibidas": [
      "PAN",
      "HARINA",
      "MASA",
      "HORNO",
      "MADRUGADA"
    ]
  },
  {
    "palabra": "PASTELERO",
    "categoria": "profesiones",
    "prohibidas": [
      "TORTAS",
      "DULCES",
      "CREMA",
      "HORNO",
      "DECORAR"
    ]
  },
  {
    "palabra": "CARNICERO",
    "categoria": "profesiones",
    "prohibidas": [
      "CARNE",
      "CUCHILLO",
      "CORTES",
      "PESAR",
      "VACUNO"
    ]
  },
  {
    "palabra": "PESCADOR",
    "categoria": "profesiones",
    "prohibidas": [
      "MAR",
      "BOTE",
      "RED",
      "CAÑA",
      "PECES"
    ]
  },
  {
    "palabra": "AGRICULTOR",
    "categoria": "profesiones",
    "prohibidas": [
      "CAMPO",
      "COSECHA",
      "SEMBRAR",
      "TIERRA",
      "TRACTOR"
    ]
  },
  {
    "palabra": "JARDINERO",
    "categoria": "profesiones",
    "prohibidas": [
      "PLANTAS",
      "PASTO",
      "CORTAR",
      "FLORES",
      "REGAR"
    ]
  },
  {
    "palabra": "PELUQUERO",
    "categoria": "profesiones",
    "prohibidas": [
      "CORTAR PELO",
      "TIJERAS",
      "PEINADO",
      "SECADOR",
      "SALON"
    ]
  },
  {
    "palabra": "MODELO",
    "categoria": "profesiones",
    "prohibidas": [
      "PASARELA",
      "ROPA",
      "DESFILE",
      "FOTOS",
      "MODA"
    ]
  },
  {
    "palabra": "SACERDOTE",
    "categoria": "profesiones",
    "prohibidas": [
      "CURA",
      "IGLESIA",
      "MISA",
      "CONFESION",
      "DIOS"
    ]
  },
  {
    "palabra": "SOLDADO",
    "categoria": "profesiones",
    "prohibidas": [
      "EJERCITO",
      "MILITAR",
      "GUERRA",
      "UNIFORME",
      "ARMA"
    ]
  },
  {
    "palabra": "MARINERO",
    "categoria": "profesiones",
    "prohibidas": [
      "BARCO",
      "MAR",
      "ANCLA",
      "NAVEGAR",
      "PUERTO"
    ]
  },
  {
    "palabra": "AZAFATA",
    "categoria": "profesiones",
    "prohibidas": [
      "AVION",
      "VUELO",
      "PASAJEROS",
      "SEGURIDAD",
      "BANDEJA"
    ]
  },
  {
    "palabra": "SALVAVIDAS",
    "categoria": "profesiones",
    "prohibidas": [
      "PLAYA",
      "PISCINA",
      "AHOGARSE",
      "SILBATO",
      "RESCATAR"
    ]
  },
  {
    "palabra": "ENTRENADOR",
    "categoria": "profesiones",
    "prohibidas": [
      "EQUIPO",
      "DT",
      "DEPORTE",
      "TACTICA",
      "JUGADORES"
    ]
  },
  {
    "palabra": "TATUADOR",
    "categoria": "profesiones",
    "prohibidas": [
      "AGUJA",
      "TINTA",
      "PIEL",
      "DIBUJO",
      "DOLOR"
    ]
  },
  {
    "palabra": "ASTRONOMO",
    "categoria": "profesiones",
    "prohibidas": [
      "ESTRELLAS",
      "TELESCOPIO",
      "UNIVERSO",
      "PLANETAS",
      "ESPACIO"
    ]
  },
  {
    "palabra": "CERRAJERO",
    "categoria": "profesiones",
    "prohibidas": [
      "LLAVES",
      "PUERTA",
      "CERRADURA",
      "COPIA",
      "ABRIR"
    ]
  },
  {
    "palabra": "CAMIONERO",
    "categoria": "profesiones",
    "prohibidas": [
      "CARRETERA",
      "CARGA",
      "MANEJAR",
      "RUEDAS",
      "VIAJE"
    ]
  },
  {
    "palabra": "GUARDAPARQUES",
    "categoria": "profesiones",
    "prohibidas": [
      "BOSQUE",
      "NATURALEZA",
      "CUIDAR",
      "ANIMALES",
      "RESERVA"
    ]
  },
  {
    "palabra": "LOCUTOR",
    "categoria": "profesiones",
    "prohibidas": [
      "RADIO",
      "VOZ",
      "MICROFONO",
      "PROGRAMA",
      "HABLAR"
    ]
  },
  {
    "palabra": "SOCORRISTA",
    "categoria": "profesiones",
    "prohibidas": [
      "AMBULANCIA",
      "PRIMEROS AUXILIOS",
      "EMERGENCIA",
      "HERIDO",
      "CAMILLA"
    ]
  },
  {
    "palabra": "RELOJERO",
    "categoria": "profesiones",
    "prohibidas": [
      "RELOJ",
      "HORA",
      "ENGRANAJES",
      "PILAS",
      "ARREGLAR"
    ]
  },
  {
    "palabra": "FUTBOL",
    "categoria": "deportes",
    "prohibidas": [
      "PELOTA",
      "GOL",
      "CANCHA",
      "ARCO",
      "JUGADORES"
    ]
  },
  {
    "palabra": "TENIS",
    "categoria": "deportes",
    "prohibidas": [
      "RAQUETA",
      "PELOTA",
      "RED",
      "SAQUE",
      "SET"
    ]
  },
  {
    "palabra": "AJEDREZ",
    "categoria": "deportes",
    "prohibidas": [
      "REY",
      "JAQUE",
      "TABLERO",
      "PEON",
      "CABALLO"
    ]
  },
  {
    "palabra": "NATACION",
    "categoria": "deportes",
    "prohibidas": [
      "AGUA",
      "PISCINA",
      "NADAR",
      "ESTILO",
      "GORRO"
    ]
  },
  {
    "palabra": "MONOPOLY",
    "categoria": "deportes",
    "prohibidas": [
      "CASAS",
      "DINERO",
      "HOTEL",
      "TABLERO",
      "DADOS"
    ]
  },
  {
    "palabra": "BOXEO",
    "categoria": "deportes",
    "prohibidas": [
      "GUANTES",
      "RING",
      "GOLPE",
      "KNOCKOUT",
      "PELEA"
    ]
  },
  {
    "palabra": "BASKETBALL",
    "categoria": "deportes",
    "prohibidas": [
      "ARO",
      "PELOTA",
      "ENCESTAR",
      "CANASTA",
      "PIQUE"
    ]
  },
  {
    "palabra": "GOLF",
    "categoria": "deportes",
    "prohibidas": [
      "HOYO",
      "PALO",
      "PASTO",
      "PELOTITA",
      "TIGER WOODS"
    ]
  },
  {
    "palabra": "VOLEIBOL",
    "categoria": "deportes",
    "prohibidas": [
      "RED",
      "MANOS",
      "REMATE",
      "BLOQUEO",
      "PLAYA"
    ]
  },
  {
    "palabra": "RUGBY",
    "categoria": "deportes",
    "prohibidas": [
      "PELOTA OVALADA",
      "TRY",
      "TACKLE",
      "SCRUM",
      "HAKA"
    ]
  },
  {
    "palabra": "FUTBOL AMERICANO",
    "categoria": "deportes",
    "prohibidas": [
      "SUPER BOWL",
      "CASCO",
      "TOUCHDOWN",
      "OVALADA",
      "YARDAS"
    ]
  },
  {
    "palabra": "BEISBOL",
    "categoria": "deportes",
    "prohibidas": [
      "BATE",
      "GUANTE",
      "HOME RUN",
      "LANZADOR",
      "BASES"
    ]
  },
  {
    "palabra": "PING PONG",
    "categoria": "deportes",
    "prohibidas": [
      "MESA",
      "PALETA",
      "PELOTITA",
      "RED",
      "TENIS DE MESA"
    ]
  },
  {
    "palabra": "PADEL",
    "categoria": "deportes",
    "prohibidas": [
      "PAREDES",
      "VIDRIO",
      "PALA",
      "DOBLES",
      "CANCHA"
    ]
  },
  {
    "palabra": "CICLISMO",
    "categoria": "deportes",
    "prohibidas": [
      "BICICLETA",
      "PEDALEAR",
      "RUEDAS",
      "CASCO",
      "TOUR DE FRANCIA"
    ]
  },
  {
    "palabra": "MARATON",
    "categoria": "deportes",
    "prohibidas": [
      "CORRER",
      "42 KILOMETROS",
      "META",
      "CANSANCIO",
      "CARRERA"
    ]
  },
  {
    "palabra": "GIMNASIA ARTISTICA",
    "categoria": "deportes",
    "prohibidas": [
      "PIRUETAS",
      "SALTO",
      "BARRAS",
      "SUELO",
      "FLEXIBILIDAD"
    ]
  },
  {
    "palabra": "PATINAJE",
    "categoria": "deportes",
    "prohibidas": [
      "RUEDAS",
      "HIELO",
      "PATINES",
      "DESLIZAR",
      "EQUILIBRIO"
    ]
  },
  {
    "palabra": "SKATE",
    "categoria": "deportes",
    "prohibidas": [
      "TABLA",
      "RUEDAS",
      "TRUCOS",
      "RAMPA",
      "PATINETA"
    ]
  },
  {
    "palabra": "SURF",
    "categoria": "deportes",
    "prohibidas": [
      "OLA",
      "TABLA",
      "MAR",
      "PLAYA",
      "EQUILIBRIO"
    ]
  },
  {
    "palabra": "KAYAK",
    "categoria": "deportes",
    "prohibidas": [
      "REMO",
      "RIO",
      "BOTE",
      "AGUA",
      "RAPIDOS"
    ]
  },
  {
    "palabra": "BUCEO",
    "categoria": "deportes",
    "prohibidas": [
      "MAR",
      "OXIGENO",
      "TANQUE",
      "ALETAS",
      "PROFUNDO"
    ]
  },
  {
    "palabra": "ESQUI",
    "categoria": "deportes",
    "prohibidas": [
      "NIEVE",
      "MONTAÑA",
      "BASTONES",
      "INVIERNO",
      "DESLIZAR"
    ]
  },
  {
    "palabra": "SNOWBOARD",
    "categoria": "deportes",
    "prohibidas": [
      "TABLA",
      "NIEVE",
      "MONTAÑA",
      "INVIERNO",
      "DESLIZAR"
    ]
  },
  {
    "palabra": "ESCALADA",
    "categoria": "deportes",
    "prohibidas": [
      "ROCA",
      "SUBIR",
      "CUERDA",
      "MURO",
      "ALTURA"
    ]
  },
  {
    "palabra": "PARACAIDISMO",
    "categoria": "deportes",
    "prohibidas": [
      "AVION",
      "SALTAR",
      "CIELO",
      "CAIDA LIBRE",
      "ABRIR"
    ]
  },
  {
    "palabra": "KARATE",
    "categoria": "deportes",
    "prohibidas": [
      "ARTES MARCIALES",
      "CINTURON NEGRO",
      "KIMONO",
      "PATADA",
      "JAPON"
    ]
  },
  {
    "palabra": "LUCHA LIBRE",
    "categoria": "deportes",
    "prohibidas": [
      "RING",
      "MASCARA",
      "WWE",
      "CUERDAS",
      "SILLA"
    ]
  },
  {
    "palabra": "ESGRIMA",
    "categoria": "deportes",
    "prohibidas": [
      "ESPADA",
      "MASCARA",
      "BLANCO",
      "TOCAR",
      "DUELO"
    ]
  },
  {
    "palabra": "TIRO CON ARCO",
    "categoria": "deportes",
    "prohibidas": [
      "FLECHA",
      "BLANCO",
      "CENTRO",
      "APUNTAR",
      "CUERDA"
    ]
  },
  {
    "palabra": "EQUITACION",
    "categoria": "deportes",
    "prohibidas": [
      "CABALLO",
      "MONTAR",
      "SALTAR",
      "JINETE",
      "OBSTACULOS"
    ]
  },
  {
    "palabra": "FORMULA 1",
    "categoria": "deportes",
    "prohibidas": [
      "AUTOS",
      "CARRERA",
      "VELOCIDAD",
      "CIRCUITO",
      "PITS"
    ]
  },
  {
    "palabra": "MOTOGP",
    "categoria": "deportes",
    "prohibidas": [
      "MOTOS",
      "CARRERA",
      "CASCO",
      "PISTA",
      "CURVA"
    ]
  },
  {
    "palabra": "RALLY",
    "categoria": "deportes",
    "prohibidas": [
      "AUTO",
      "TIERRA",
      "COPILOTO",
      "BARRO",
      "CAMINO"
    ]
  },
  {
    "palabra": "BILLAR",
    "categoria": "deportes",
    "prohibidas": [
      "POOL",
      "TACO",
      "BOLAS",
      "MESA VERDE",
      "TRONERA"
    ]
  },
  {
    "palabra": "BOLOS",
    "categoria": "deportes",
    "prohibidas": [
      "BOWLING",
      "PINOS",
      "BOLA PESADA",
      "CHUZA",
      "PISTA"
    ]
  },
  {
    "palabra": "DARDOS",
    "categoria": "deportes",
    "prohibidas": [
      "TABLERO",
      "PUNTA",
      "LANZAR",
      "CENTRO",
      "BAR"
    ]
  },
  {
    "palabra": "POKER",
    "categoria": "deportes",
    "prohibidas": [
      "CARTAS",
      "APUESTAS",
      "FICHAS",
      "FULL",
      "ESCALERA REAL"
    ]
  },
  {
    "palabra": "RULETA",
    "categoria": "deportes",
    "prohibidas": [
      "CASINO",
      "ROJO",
      "NEGRO",
      "NUMEROS",
      "GIRAR"
    ]
  },
  {
    "palabra": "BINGO",
    "categoria": "deportes",
    "prohibidas": [
      "CARTON",
      "NUMEROS",
      "TOMBOLA",
      "GRITAR",
      "PREMIO"
    ]
  },
  {
    "palabra": "DOMINO",
    "categoria": "deportes",
    "prohibidas": [
      "FICHAS",
      "PUNTOS",
      "MESA",
      "DOBLE SEIS",
      "JUEGO"
    ]
  },
  {
    "palabra": "UNO",
    "categoria": "deportes",
    "prohibidas": [
      "CARTAS",
      "COLORES",
      "MAS CUATRO",
      "REVERSA",
      "GRITAR"
    ]
  },
  {
    "palabra": "JENGA",
    "categoria": "deportes",
    "prohibidas": [
      "BLOQUES",
      "MADERA",
      "TORRE",
      "CAER",
      "SACAR"
    ]
  },
  {
    "palabra": "TWISTER",
    "categoria": "deportes",
    "prohibidas": [
      "CIRCULOS",
      "COLORES",
      "MANO",
      "PIE",
      "ALFOMBRA"
    ]
  },
  {
    "palabra": "PICTIONARY",
    "categoria": "deportes",
    "prohibidas": [
      "DIBUJAR",
      "ADIVINAR",
      "LAPIZ",
      "TIEMPO",
      "EQUIPOS"
    ]
  },
  {
    "palabra": "CATAN",
    "categoria": "deportes",
    "prohibidas": [
      "ISLA",
      "OVEJA",
      "MADERA",
      "TRIGO",
      "COLONOS"
    ]
  },
  {
    "palabra": "PUZZLE",
    "categoria": "deportes",
    "prohibidas": [
      "ROMPECABEZAS",
      "PIEZAS",
      "ARMAR",
      "IMAGEN",
      "CAJA"
    ]
  },
  {
    "palabra": "CUBO RUBIK",
    "categoria": "deportes",
    "prohibidas": [
      "COLORES",
      "CARAS",
      "GIRAR",
      "ARMAR",
      "CUADRADOS"
    ]
  },
  {
    "palabra": "ESCONDIDA",
    "categoria": "deportes",
    "prohibidas": [
      "CONTAR",
      "BUSCAR",
      "OCULTARSE",
      "JUEGO",
      "NIÑOS"
    ]
  },
  {
    "palabra": "SALTAR LA CUERDA",
    "categoria": "deportes",
    "prohibidas": [
      "SOGA",
      "PIES",
      "GIRAR",
      "EJERCICIO",
      "RECREO"
    ]
  },
  {
    "palabra": "SILLA MUSICAL",
    "categoria": "deportes",
    "prohibidas": [
      "MUSICA",
      "SENTARSE",
      "BAILAR",
      "QUITAR",
      "CUMPLEAÑOS"
    ]
  },
  {
    "palabra": "PLAYSTATION",
    "categoria": "deportes",
    "prohibidas": [
      "CONSOLA",
      "SONY",
      "MANDO",
      "VIDEOJUEGOS",
      "JUGAR"
    ]
  },
  {
    "palabra": "NINTENDO",
    "categoria": "deportes",
    "prohibidas": [
      "SWITCH",
      "MARIO",
      "CONSOLA",
      "ZELDA",
      "JAPON"
    ]
  },
  {
    "palabra": "MINECRAFT",
    "categoria": "deportes",
    "prohibidas": [
      "BLOQUES",
      "CREEPER",
      "CONSTRUIR",
      "PICAR",
      "CUBOS"
    ]
  },
  {
    "palabra": "FORTNITE",
    "categoria": "deportes",
    "prohibidas": [
      "BAILE",
      "ISLA",
      "DISPAROS",
      "CONSTRUIR",
      "BATTLE ROYALE"
    ]
  },
  {
    "palabra": "FIFA",
    "categoria": "deportes",
    "prohibidas": [
      "FUTBOL",
      "CONSOLA",
      "PARTIDO",
      "JUGAR",
      "MANDO"
    ]
  },
  {
    "palabra": "GTA",
    "categoria": "deportes",
    "prohibidas": [
      "ROBAR AUTOS",
      "CIUDAD",
      "POLICIA",
      "SAN ANDREAS",
      "MISIONES"
    ]
  },
  {
    "palabra": "TETRIS",
    "categoria": "deportes",
    "prohibidas": [
      "BLOQUES",
      "CAER",
      "LINEAS",
      "ENCAJAR",
      "JUEGO"
    ]
  },
  {
    "palabra": "PAC-MAN",
    "categoria": "deportes",
    "prohibidas": [
      "FANTASMAS",
      "AMARILLO",
      "COMER",
      "LABERINTO",
      "ARCADE"
    ]
  },
  {
    "palabra": "OLIMPIADAS",
    "categoria": "deportes",
    "prohibidas": [
      "JUEGOS",
      "ANILLOS",
      "ANTORCHA",
      "MEDALLAS",
      "CUATRO AÑOS"
    ]
  },
  {
    "palabra": "MUNDIAL DE FUTBOL",
    "categoria": "deportes",
    "prohibidas": [
      "COPA",
      "SELECCIONES",
      "FIFA",
      "CAMPEON",
      "CUATRO AÑOS"
    ]
  },
  {
    "palabra": "COPA AMERICA",
    "categoria": "deportes",
    "prohibidas": [
      "SELECCIONES",
      "SUDAMERICA",
      "FUTBOL",
      "CAMPEON",
      "TORNEO"
    ]
  },
  {
    "palabra": "CHAMPIONS LEAGUE",
    "categoria": "deportes",
    "prohibidas": [
      "EUROPA",
      "CLUBES",
      "OREJONA",
      "HIMNO",
      "FUTBOL"
    ]
  },
  {
    "palabra": "MEDALLA DE ORO",
    "categoria": "deportes",
    "prohibidas": [
      "PRIMER LUGAR",
      "PODIO",
      "CAMPEON",
      "CUELLO",
      "GANADOR"
    ]
  },
  {
    "palabra": "PENAL",
    "categoria": "deportes",
    "prohibidas": [
      "ARCO",
      "DOCE PASOS",
      "FALTA",
      "ARQUERO",
      "GOL"
    ]
  },
  {
    "palabra": "TIRO LIBRE",
    "categoria": "deportes",
    "prohibidas": [
      "BARRERA",
      "FALTA",
      "ARCO",
      "FUTBOL",
      "DISPARO"
    ]
  },
  {
    "palabra": "TARJETA ROJA",
    "categoria": "deportes",
    "prohibidas": [
      "EXPULSADO",
      "ARBITRO",
      "FALTA",
      "FUTBOL",
      "SALIR"
    ]
  },
  {
    "palabra": "CAMISETA",
    "categoria": "deportes",
    "prohibidas": [
      "NUMERO",
      "EQUIPO",
      "JUGADOR",
      "COLORES",
      "HINCHA"
    ]
  },
  {
    "palabra": "HINCHA",
    "categoria": "deportes",
    "prohibidas": [
      "ESTADIO",
      "EQUIPO",
      "CANTAR",
      "BANDERA",
      "FANATICO"
    ]
  },
  {
    "palabra": "TROFEO",
    "categoria": "deportes",
    "prohibidas": [
      "COPA",
      "PREMIO",
      "GANADOR",
      "LEVANTAR",
      "CAMPEON"
    ]
  },
  {
    "palabra": "CRONOMETRO",
    "categoria": "deportes",
    "prohibidas": [
      "TIEMPO",
      "SEGUNDOS",
      "MEDIR",
      "CARRERA",
      "RELOJ"
    ]
  },
  {
    "palabra": "FLEXIONES",
    "categoria": "deportes",
    "prohibidas": [
      "BRAZOS",
      "SUELO",
      "EJERCICIO",
      "PECHO",
      "LAGARTIJAS"
    ]
  },
  {
    "palabra": "ABDOMINALES",
    "categoria": "deportes",
    "prohibidas": [
      "GUATA",
      "EJERCICIO",
      "SUELO",
      "MUSCULOS",
      "GIMNASIO"
    ]
  },
  {
    "palabra": "TROTAR",
    "categoria": "deportes",
    "prohibidas": [
      "CORRER",
      "PARQUE",
      "ZAPATILLAS",
      "CARDIO",
      "EJERCICIO"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CENSURADO_CATEGORIAS, CENSURADO_TARJETAS };
}
