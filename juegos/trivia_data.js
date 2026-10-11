/**
 * BASE DE DATOS DE TRIVIA GENERAL - TRIVIÓDROMO: LA PISTA DEL SABER
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * Base de datos enriquecida con 856 preguntas de trivia y contenido visual.
 * Categorías: Geografía, Historia, Biología, Química, Arte, Deportes, Música, Cine, Tecnología, Guerras y Farándula.
 */

var TRIVIA_GENERAL_QUESTIONS = [
  {
    "id": "flag_jp",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Japón",
      "Corea del Sur",
      "Bangladés",
      "Indonesia"
    ],
    "respuestaCorrecta": "Japón",
    "explicacion": "Es la bandera oficial de <strong>Japón</strong>. El sol naciente (Hinomaru) es el símbolo de Japón.",
    "imagen": "https://flagcdn.com/w320/jp.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ca",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Canadá",
      "Suiza",
      "Dinamarca",
      "Noruega"
    ],
    "respuestaCorrecta": "Canadá",
    "explicacion": "Es la bandera oficial de <strong>Canadá</strong>. La hoja de arce roja de 11 puntas es el símbolo patrio de Canadá.",
    "imagen": "https://flagcdn.com/w320/ca.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ar",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Argentina",
      "Uruguay",
      "Guatemala",
      "Honduras"
    ],
    "respuestaCorrecta": "Argentina",
    "explicacion": "Es la bandera oficial de <strong>Argentina</strong>. Luce franjas celeste y blanca con el Sol de Mayo en su centro.",
    "imagen": "https://flagcdn.com/w320/ar.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_br",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Brasil",
      "Colombia",
      "Jamaica",
      "Sudáfrica"
    ],
    "respuestaCorrecta": "Brasil",
    "explicacion": "Es la bandera oficial de <strong>Brasil</strong>. Posee un rombo amarillo y una esfera celeste con el lema Ordem e Progresso.",
    "imagen": "https://flagcdn.com/w320/br.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_fr",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Francia",
      "Países Bajos",
      "Rusia",
      "Italia"
    ],
    "respuestaCorrecta": "Francia",
    "explicacion": "Es la bandera oficial de <strong>Francia</strong>. La célebre tricolor azul, blanco y rojo originada en la Revolución Francesa.",
    "imagen": "https://flagcdn.com/w320/fr.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_cl",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Chile",
      "Texas",
      "República Checa",
      "Cuba"
    ],
    "respuestaCorrecta": "Chile",
    "explicacion": "Es la bandera oficial de <strong>Chile</strong>. La Estrella Solitaria con campos azul, blanco y rojo.",
    "imagen": "https://flagcdn.com/w320/cl.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_de",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Alemania",
      "Bélgica",
      "Austria",
      "Polonia"
    ],
    "respuestaCorrecta": "Alemania",
    "explicacion": "Es la bandera oficial de <strong>Alemania</strong>. Tres franjas horizontales: negro, rojo y dorado.",
    "imagen": "https://flagcdn.com/w320/de.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_it",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Italia",
      "Irlanda",
      "México",
      "Hungría"
    ],
    "respuestaCorrecta": "Italia",
    "explicacion": "Es la bandera oficial de <strong>Italia</strong>. Tricolor vertical de verde, blanco y rojo.",
    "imagen": "https://flagcdn.com/w320/it.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_es",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "España",
      "Portugal",
      "Andorra",
      "Bélgica"
    ],
    "respuestaCorrecta": "España",
    "explicacion": "Es la bandera oficial de <strong>España</strong>. La Rojigualda con dos franjas rojas y una amarilla central más ancha.",
    "imagen": "https://flagcdn.com/w320/es.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_gb",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Reino Unido",
      "Australia",
      "Nueva Zelanda",
      "Islandia"
    ],
    "respuestaCorrecta": "Reino Unido",
    "explicacion": "Es la bandera oficial de <strong>Reino Unido</strong>. La Union Jack combina las cruces de San Jorge, San Andrés y San Patricio.",
    "imagen": "https://flagcdn.com/w320/gb.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_mx",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "México",
      "Italia",
      "Irlanda",
      "Perú"
    ],
    "respuestaCorrecta": "México",
    "explicacion": "Es la bandera oficial de <strong>México</strong>. Tricolor verde, blanco y rojo con el águila devorando a la serpiente sobre un nopal.",
    "imagen": "https://flagcdn.com/w320/mx.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_za",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Sudáfrica",
      "Kenia",
      "Jamaica",
      "Nigeria"
    ],
    "respuestaCorrecta": "Sudáfrica",
    "explicacion": "Es la bandera oficial de <strong>Sudáfrica</strong>. Su diseño en \"Y\" horizontal simboliza la unión de diversas poblaciones.",
    "imagen": "https://flagcdn.com/w320/za.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_au",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Australia",
      "Nueva Zelanda",
      "Fiyi",
      "Samoa"
    ],
    "respuestaCorrecta": "Australia",
    "explicacion": "Es la bandera oficial de <strong>Australia</strong>. Azul con la Union Jack y las estrellas de la Cruz del Sur.",
    "imagen": "https://flagcdn.com/w320/au.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_gr",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Grecia",
      "Uruguay",
      "Finlandia",
      "Chipre"
    ],
    "respuestaCorrecta": "Grecia",
    "explicacion": "Es la bandera oficial de <strong>Grecia</strong>. Nueve franjas azules y blancas con una cruz blanca en el cantón superior.",
    "imagen": "https://flagcdn.com/w320/gr.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_no",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Noruega",
      "Islandia",
      "Suecia",
      "Dinamarca"
    ],
    "respuestaCorrecta": "Noruega",
    "explicacion": "Es la bandera oficial de <strong>Noruega</strong>. Cruz nórdica azul con bordes blancos sobre fondo rojo.",
    "imagen": "https://flagcdn.com/w320/no.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_jm",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Jamaica",
      "Bahamas",
      "Trinidad y Tobago",
      "Barbados"
    ],
    "respuestaCorrecta": "Jamaica",
    "explicacion": "Es la bandera oficial de <strong>Jamaica</strong>. Cruz de San Andrés dorada que divide campos verdes y negros, sin rojo, blanco ni azul.",
    "imagen": "https://flagcdn.com/w320/jm.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_eg",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Egipto",
      "Siria",
      "Irak",
      "Yemen"
    ],
    "respuestaCorrecta": "Egipto",
    "explicacion": "Es la bandera oficial de <strong>Egipto</strong>. Franjas roja, blanca y negra con el Águila de Saladino dorada en el centro.",
    "imagen": "https://flagcdn.com/w320/eg.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_kr",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Corea del Sur",
      "Japón",
      "Tailandia",
      "Vietnam"
    ],
    "respuestaCorrecta": "Corea del Sur",
    "explicacion": "Es la bandera oficial de <strong>Corea del Sur</strong>. El Taegeuk rojo y azul en el centro con cuatro trigramas negros sobre fondo blanco.",
    "imagen": "https://flagcdn.com/w320/kr.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_uy",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Uruguay",
      "Argentina",
      "Grecia",
      "Paraguay"
    ],
    "respuestaCorrecta": "Uruguay",
    "explicacion": "Es la bandera oficial de <strong>Uruguay</strong>. Nueve franjas alternadas con el Sol de Mayo en el cantón superior izquierdo.",
    "imagen": "https://flagcdn.com/w320/uy.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_pt",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Portugal",
      "España",
      "Italia",
      "Marruecos"
    ],
    "respuestaCorrecta": "Portugal",
    "explicacion": "Es la bandera oficial de <strong>Portugal</strong>. Campos verde y rojo con la esfera armilar y el escudo portugués.",
    "imagen": "https://flagcdn.com/w320/pt.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_in",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "India",
      "Irlanda",
      "Níger",
      "Irán"
    ],
    "respuestaCorrecta": "India",
    "explicacion": "Es la bandera oficial de <strong>India</strong>. Tricolor de azafrán, blanco y verde con la rueda Ashoka Chakra azul.",
    "imagen": "https://flagcdn.com/w320/in.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_se",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Suecia",
      "Finlandia",
      "Ucrania",
      "Noruega"
    ],
    "respuestaCorrecta": "Suecia",
    "explicacion": "Es la bandera oficial de <strong>Suecia</strong>. Cruz nórdica amarilla sobre un campo azul intenso.",
    "imagen": "https://flagcdn.com/w320/se.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_nl",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Países Bajos",
      "Francia",
      "Rusia",
      "Luxemburgo"
    ],
    "respuestaCorrecta": "Países Bajos",
    "explicacion": "Es la bandera oficial de <strong>Países Bajos</strong>. Tricolor horizontal de rojo, blanco y azul más antigua del mundo en uso.",
    "imagen": "https://flagcdn.com/w320/nl.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ch",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Suiza",
      "Dinamarca",
      "Austria",
      "Turquía"
    ],
    "respuestaCorrecta": "Suiza",
    "explicacion": "Es la bandera oficial de <strong>Suiza</strong>. Cruz griega blanca sobre campo cuadrado rojo.",
    "imagen": "https://flagcdn.com/w320/ch.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_co",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Colombia",
      "Ecuador",
      "Venezuela",
      "Rumania"
    ],
    "respuestaCorrecta": "Colombia",
    "explicacion": "Es la bandera oficial de <strong>Colombia</strong>. Amarillo (la mitad superior), azul y rojo en franjas horizontales.",
    "imagen": "https://flagcdn.com/w320/co.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_pe",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Perú",
      "Canadá",
      "Austria",
      "Polonia"
    ],
    "respuestaCorrecta": "Perú",
    "explicacion": "Es la bandera oficial de <strong>Perú</strong>. Tres franjas verticales: dos rojas y una blanca en el centro.",
    "imagen": "https://flagcdn.com/w320/pe.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_cn",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "China",
      "Vietnam",
      "Corea del Norte",
      "Singapur"
    ],
    "respuestaCorrecta": "China",
    "explicacion": "Es la bandera oficial de <strong>China</strong>. Fondo rojo con una gran estrella dorada rodeada de cuatro estrellas menores.",
    "imagen": "https://flagcdn.com/w320/cn.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_tr",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Turquía",
      "Túnez",
      "Argelia",
      "Pakistán"
    ],
    "respuestaCorrecta": "Turquía",
    "explicacion": "Es la bandera oficial de <strong>Turquía</strong>. La luna creciente y una estrella blanca sobre fondo rojo vivo.",
    "imagen": "https://flagcdn.com/w320/tr.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_nz",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Nueva Zelanda",
      "Australia",
      "Reino Unido",
      "Fiyi"
    ],
    "respuestaCorrecta": "Nueva Zelanda",
    "explicacion": "Es la bandera oficial de <strong>Nueva Zelanda</strong>. Union Jack con cuatro estrellas rojas de bordes blancos (Cruz del Sur).",
    "imagen": "https://flagcdn.com/w320/nz.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ie",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Irlanda",
      "Italia",
      "Costa de Marfil",
      "India"
    ],
    "respuestaCorrecta": "Irlanda",
    "explicacion": "Es la bandera oficial de <strong>Irlanda</strong>. Verde, blanco y naranja, simbolizando la paz entre católicos y protestantes.",
    "imagen": "https://flagcdn.com/w320/ie.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_cu",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Cuba",
      "Puerto Rico",
      "Chile",
      "Filipinas"
    ],
    "respuestaCorrecta": "Cuba",
    "explicacion": "Es la bandera oficial de <strong>Cuba</strong>. Tres franjas azules, dos blancas, triángulo rojo y estrella solitaria.",
    "imagen": "https://flagcdn.com/w320/cu.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_is",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera?",
    "opciones": [
      "Islandia",
      "Noruega",
      "Finlandia",
      "Groenlandia"
    ],
    "respuestaCorrecta": "Islandia",
    "explicacion": "Es la bandera oficial de <strong>Islandia</strong>. Cruz nórdica roja con bordes blancos sobre fondo azul mar.",
    "imagen": "https://flagcdn.com/w320/is.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "map_af",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente se encuentra resaltado en verde en el globo terráqueo?",
    "opciones": [
      "África",
      "Asia",
      "América del Sur",
      "Europa"
    ],
    "respuestaCorrecta": "África",
    "explicacion": "Se trata de <strong>África</strong>, el segundo continente más grande y poblado del planeta.",
    "imagen": "assets/maps/africa.png",
    "tipoImagen": "mapa"
  },
  {
    "id": "map_sa",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente se encuentra resaltado en verde en el globo terráqueo?",
    "opciones": [
      "América del Sur",
      "África",
      "América del Norte",
      "Oceanía"
    ],
    "respuestaCorrecta": "América del Sur",
    "explicacion": "Se trata de <strong>América del Sur</strong>, hogar de la Cordillera de los Andes y la cuenca del Amazonas.",
    "imagen": "assets/maps/south_america.png",
    "tipoImagen": "mapa"
  },
  {
    "id": "map_eu",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente se encuentra resaltado en verde en el globo terráqueo?",
    "opciones": [
      "Europa",
      "Asia",
      "América del Norte",
      "África"
    ],
    "respuestaCorrecta": "Europa",
    "explicacion": "Se trata de <strong>Europa</strong>, cuna de civilizaciones clásicas como Grecia y Roma.",
    "imagen": "assets/maps/europe.png",
    "tipoImagen": "mapa"
  },
  {
    "id": "map_oc",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente o región insular se encuentra resaltado en verde en el globo terráqueo?",
    "opciones": [
      "Oceanía",
      "Antártida",
      "Asia",
      "América del Sur"
    ],
    "respuestaCorrecta": "Oceanía",
    "explicacion": "Se trata de <strong>Oceanía</strong>, que comprende Australia, Nueva Zelanda y los archipiélagos del Pacífico.",
    "imagen": "assets/maps/oceania.png",
    "tipoImagen": "mapa"
  },
  {
    "id": "map_as",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente se encuentra resaltado en verde en el globo terráqueo?",
    "opciones": [
      "Asia",
      "África",
      "Europa",
      "América del Norte"
    ],
    "respuestaCorrecta": "Asia",
    "explicacion": "Se trata de <strong>Asia</strong>, el continente más extenso y poblado de la Tierra.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/asia.png"
  },
  {
    "id": "map_an",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué continente cubierto de hielo se encuentra resaltado en verde en el polo sur?",
    "opciones": [
      "Antártida",
      "Groenlandia",
      "Ártico",
      "Oceanía"
    ],
    "respuestaCorrecta": "Antártida",
    "explicacion": "La <strong>Antártida</strong> es el continente más frío, seco y ventoso del planeta.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/antarctica.png"
  },
  {
    "id": "sil_it",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué país europeo con su inconfundible forma de \"bota\" está resaltado en verde en el mapa?",
    "opciones": [
      "Italia",
      "Grecia",
      "España",
      "Portugal"
    ],
    "respuestaCorrecta": "Italia",
    "explicacion": "La península itálica es famosa mundialmente por asemejar la forma de una bota con un tacón y puntera pateando a Sicilia.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/italy.png"
  },
  {
    "id": "sil_cl",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué país sudamericano, el más largo y angosto del mundo, está resaltado en verde en el mapa?",
    "opciones": [
      "Chile",
      "Argentina",
      "Perú",
      "Ecuador"
    ],
    "respuestaCorrecta": "Chile",
    "explicacion": "<strong>Chile</strong> se extiende por más de 4.300 km de norte a sur bordeando la costa del Pacífico.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/chile.png"
  },
  {
    "id": "sil_jp",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué país insular de Asia oriental con forma de arco o medialuna está resaltado en verde?",
    "opciones": [
      "Japón",
      "Filipinas",
      "Indonesia",
      "Nueva Zelanda"
    ],
    "respuestaCorrecta": "Japón",
    "explicacion": "El archipiélago de <strong>Japón</strong> está compuesto por cuatro islas principales (Honshu, Hokkaido, Kyushu, Shikoku).",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/japan.png"
  },
  {
    "id": "sil_md",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué gran país insular frente a la costa oriental de África está resaltado en verde?",
    "opciones": [
      "Madagascar",
      "Sri Lanka",
      "Islandia",
      "Cuba"
    ],
    "respuestaCorrecta": "Madagascar",
    "explicacion": "<strong>Madagascar</strong> es la cuarta isla más grande del mundo y destaca por su asombrosa biodiversidad única.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/madagascar.png"
  },
  {
    "id": "sil_fr",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué país de Europa occidental conocido como \"El Hexágono\" por su forma está resaltado en verde?",
    "opciones": [
      "Francia",
      "Alemania",
      "Polonia",
      "España"
    ],
    "respuestaCorrecta": "Francia",
    "explicacion": "En Francia se utiliza a menudo el término <em>L'Hexagone</em> para referirse al territorio metropolitano.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/france.png"
  },
  {
    "id": "sil_br",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué gigante sudamericano que abarca casi la mitad del subcontinente está resaltado en verde?",
    "opciones": [
      "Brasil",
      "Colombia",
      "Argentina",
      "Venezuela"
    ],
    "respuestaCorrecta": "Brasil",
    "explicacion": "<strong>Brasil</strong> es el país más grande de América del Sur y el quinto más extenso del mundo.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/brazil.png"
  },
  {
    "id": "sea_med",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué importante mar interior, rodeado por Europa, África y Asia, está señalado con el indicador rojo?",
    "opciones": [
      "Mar Mediterráneo",
      "Mar Negro",
      "Mar Báltico",
      "Mar Rojo"
    ],
    "respuestaCorrecta": "Mar Mediterráneo",
    "explicacion": "El <strong>Mar Mediterráneo</strong> fue la arteria de navegación y comercio de griegos, romanos, fenicios y egipcios.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/mediterranean_globe.png"
  },
  {
    "id": "sea_pan",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué famoso canal interoceánico artificial une los océanos Atlántico y Pacífico en la zona señalada?",
    "opciones": [
      "Canal de Panamá",
      "Canal de Suez",
      "Canal de Corinto",
      "Canal de Kiel"
    ],
    "respuestaCorrecta": "Canal de Panamá",
    "explicacion": "Inaugurado en 1914, el <strong>Canal de Panamá</strong> transformó el comercio marítimo mundial.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/panama_canal_globe.png"
  },
  {
    "id": "sea_mag",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué histórico paso interoceánico natural en el extremo sur de América está señalado en el mapa?",
    "opciones": [
      "Estrecho de Magallanes",
      "Canal de Beagle",
      "Pasaje de Drake",
      "Estrecho de Bering"
    ],
    "respuestaCorrecta": "Estrecho de Magallanes",
    "explicacion": "Hernando de Magallanes descubrió este paso en 1520 durante la primera expedición que circunnavegó el globo.",
    "tipoImagen": "mapa",
    "imagen": "assets/maps/magellan_globe.png"
  },
  {
    "id": "geo_q1",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el río más largo del planeta Tierra?",
    "opciones": [
      "Río Amazonas",
      "Río Nilo",
      "Río Misisipi",
      "Río Yangtsé"
    ],
    "respuestaCorrecta": "Río Amazonas",
    "explicacion": "El Amazonas es el río más largo y caudaloso del mundo, superando los 6.900 km."
  },
  {
    "id": "geo_q2",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿En qué continente se ubica el Desierto del Sahara?",
    "opciones": [
      "África",
      "Asia",
      "Oceanía",
      "América del Sur"
    ],
    "respuestaCorrecta": "África",
    "explicacion": "El Sahara es el desierto cálido más grande del mundo y cubre la mayor parte del norte de África."
  },
  {
    "id": "geo_q3",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es la montaña más alta del mundo sobre el nivel del mar?",
    "opciones": [
      "Monte Everest",
      "K2",
      "Kangchenjunga",
      "Monte Kilimanjaro"
    ],
    "respuestaCorrecta": "Monte Everest",
    "explicacion": "El Everest se alza a 8.848 metros sobre el nivel del mar en la cordillera del Himalaya."
  },
  {
    "id": "geo_q4",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es la capital oficial de Australia?",
    "opciones": [
      "Canberra",
      "Sídney",
      "Melbourne",
      "Brisbane"
    ],
    "respuestaCorrecta": "Canberra",
    "explicacion": "Canberra fue construida como una ciudad planificada para zanjar la rivalidad entre Sídney y Melbourne."
  },
  {
    "id": "geo_q5",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué estrecho separa la península ibérica en Europa del continente africano?",
    "opciones": [
      "Estrecho de Gibraltar",
      "Estrecho del Bósforo",
      "Estrecho de Ormuz",
      "Estrecho de Malaca"
    ],
    "respuestaCorrecta": "Estrecho de Gibraltar",
    "explicacion": "El Estrecho de Gibraltar une el Atlántico con el Mediterráneo y separa España de Marruecos por solo 14 km."
  },
  {
    "id": "geo_q6",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el lago navegable más alto del mundo, compartido por Perú y Bolivia?",
    "opciones": [
      "Lago Titicaca",
      "Lago Baikal",
      "Lago Victoria",
      "Lago Superior"
    ],
    "respuestaCorrecta": "Lago Titicaca",
    "explicacion": "El Titicaca se encuentra a 3.812 metros de altitud en la meseta del Collao."
  },
  {
    "id": "geo_q7",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el país independiente más pequeño del mundo por superficie y población?",
    "opciones": [
      "Ciudad del Vaticano",
      "Mónaco",
      "San Marino",
      "Liechtenstein"
    ],
    "respuestaCorrecta": "Ciudad del Vaticano",
    "explicacion": "La Ciudad del Vaticano tiene solo 0,44 km² y está enclavada dentro de Roma."
  },
  {
    "id": "geo_q8",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el océano más grande y profundo del planeta?",
    "opciones": [
      "Océano Pacífico",
      "Océano Atlántico",
      "Océano Índico",
      "Océano Ártico"
    ],
    "respuestaCorrecta": "Océano Pacífico",
    "explicacion": "El Pacífico cubre más de un tercio de la superficie terrestre y contiene la Fosa de las Marianas."
  },
  {
    "id": "geo_q9",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es la capital de Canadá?",
    "opciones": [
      "Ottawa",
      "Toronto",
      "Montreal",
      "Vancouver"
    ],
    "respuestaCorrecta": "Ottawa",
    "explicacion": "La reina Victoria eligió Ottawa como capital en 1857 por su ubicación estratégica entre las regiones francófona y anglófona."
  },
  {
    "id": "his_01",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el primer emperador del Imperio Romano?",
    "opciones": [
      "César Augusto (Octavio)",
      "Julio César",
      "Nerón",
      "Marco Aurelio"
    ],
    "respuestaCorrecta": "César Augusto (Octavio)",
    "explicacion": "Tras vencer a Marco Antonio, Octavio asumió el título de Augusto en el 27 a.C., fundando el principado romano."
  },
  {
    "id": "his_02",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué civilización mesoamericana construyó la pirámide de Kukulcán en Chichén Itzá?",
    "opciones": [
      "Los Mayas",
      "Los Aztecas",
      "Los Incas",
      "Los Olmecas"
    ],
    "respuestaCorrecta": "Los Mayas",
    "explicacion": "Chichén Itzá fue una de las grandes ciudades-estado de la civilización maya en la península de Yucatán."
  },
  {
    "id": "his_03",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el monarca absolutista francés conocido como el \"Rey Sol\"?",
    "opciones": [
      "Luis XIV",
      "Luis XVI",
      "Carlos Magno",
      "Napoleón I"
    ],
    "respuestaCorrecta": "Luis XIV",
    "explicacion": "Luis XIV gobernó durante 72 años y construyó el imponente Palacio de Versalles, símbolo del absolutismo."
  },
  {
    "id": "his_04",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué célebre faraón egipcio es famoso por el descubrimiento de su tumba casi intacta en 1922?",
    "opciones": [
      "Tutankamón",
      "Ramsés II",
      "Akenatón",
      "Cleopatra"
    ],
    "respuestaCorrecta": "Tutankamón",
    "explicacion": "Howard Carter descubrió la tumba del joven faraón Tutankamón repleta de tesoros y su icónica máscara de oro."
  },
  {
    "id": "his_05",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿En qué batalla fue derrotado definitivamente Napoleón Bonaparte en 1815?",
    "opciones": [
      "Batalla de Waterloo",
      "Batalla de Trafalgar",
      "Batalla de Austerlitz",
      "Batalla de Leipzig"
    ],
    "respuestaCorrecta": "Batalla de Waterloo",
    "explicacion": "La coalición aliada al mando del Duque de Wellington y Blücher derrotó a Napoleón en la actual Bélgica."
  },
  {
    "id": "his_06",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Quién lideró la Revolución de Octubre de 1917 en Rusia instaurando el régimen bolchevique?",
    "opciones": [
      "Vladimir Lenin",
      "Iósif Stalin",
      "León Trotski",
      "Mijaíl Gorbachov"
    ],
    "respuestaCorrecta": "Vladimir Lenin",
    "explicacion": "Lenin encabezó a los bolcheviques bajo el lema \"Paz, pan y tierra\", creando el primer estado socialista soviético."
  },
  {
    "id": "his_07",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba la famosa reina de Egipto de la dinastía ptolemaica aliada de Julio César y Marco Antonio?",
    "opciones": [
      "Cleopatra VII",
      "Nefertiti",
      "Hatshepsut",
      "Nefertari"
    ],
    "respuestaCorrecta": "Cleopatra VII",
    "explicacion": "Cleopatra fue la última gobernante de la dinastía ptolemaica antes de la anexión romana de Egipto."
  },
  {
    "id": "his_08",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué líder guerrero mongol unificó las tribus y conquistó gran parte de Eurasia en el siglo XIII?",
    "opciones": [
      "Gengis Kan",
      "Kublai Kan",
      "Atila",
      "Tamerlán"
    ],
    "respuestaCorrecta": "Gengis Kan",
    "explicacion": "Gengis Kan fundó el imperio contiguo más grande de la historia mediante veloces tácticas de caballería."
  },
  {
    "id": "his_09",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué filósofo griego fue maestro de Alejandro Magno?",
    "opciones": [
      "Aristóteles",
      "Platón",
      "Sócrates",
      "Pitágoras"
    ],
    "respuestaCorrecta": "Aristóteles",
    "explicacion": "El rey Filipo II de Macedonia contrató a Aristóteles para educar al joven príncipe Alejandro."
  },
  {
    "id": "his_10",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué código babilónico del 1750 a.C. es uno de los primeros conjuntos de leyes escritas (\"ojo por ojo\")?",
    "opciones": [
      "Código de Hammurabi",
      "Código Justiniano",
      "Leyes de Solón",
      "Edicto de Milán"
    ],
    "respuestaCorrecta": "Código de Hammurabi",
    "explicacion": "El rey Hammurabi hizo tallar 282 leyes en una estela de basalto negro en la antigua Mesopotamia."
  },
  {
    "id": "his_11",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el primer presidente de los Estados Unidos de América?",
    "opciones": [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin"
    ],
    "respuestaCorrecta": "George Washington",
    "explicacion": "Washington fue el comandante general en la Guerra de Independencia y presidente electo unánimemente en 1789."
  },
  {
    "id": "his_12",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿En qué año cayó la ciudad de Constantinopla en manos del Imperio Otomano, finalizando la Edad Media?",
    "opciones": [
      "1453",
      "1492",
      "1204",
      "1517"
    ],
    "respuestaCorrecta": "1453",
    "explicacion": "Las tropas del sultán Mehmed II conquistaron Constantinopla en 1453, marcando el fin del Imperio Bizantino."
  },
  {
    "id": "his_13",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué reina gobernó el Imperio Británico durante la era de máxima expansión colonial e industrial en el siglo XIX?",
    "opciones": [
      "Reina Victoria",
      "Isabel I",
      "Reina Ana",
      "María Estuardo"
    ],
    "respuestaCorrecta": "Reina Victoria",
    "explicacion": "La Era Victoriana (1837-1901) coincidió con el cenit del poderío naval, comercial e industrial británico."
  },
  {
    "id": "his_14",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el líder pacífico que encabezó la marcha de la sal y la independencia de la India de forma no violenta?",
    "opciones": [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Nelson Mandela",
      "Martin Luther King"
    ],
    "respuestaCorrecta": "Mahatma Gandhi",
    "explicacion": "Gandhi promovió la filosofía de la no violencia (Ahimsa) y la desobediencia civil pacífica (Satyagraha)."
  },
  {
    "id": "his_15",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué civilización andina construyó la ciudadela de Machu Picchu en lo alto de los Andes peruanos?",
    "opciones": [
      "El Imperio Inca",
      "Los Mochicas",
      "Los Tiwanaku",
      "Los Nazcas"
    ],
    "respuestaCorrecta": "El Imperio Inca",
    "explicacion": "El emperador inca Pachacútec ordenó construir Machu Picchu hacia 1450 como santuario y hacienda real."
  },
  {
    "id": "his_16",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué famosa muralla de más de 20.000 km fue construida para proteger las fronteras del imperio chino?",
    "opciones": [
      "La Gran Muralla China",
      "Muro de Adriano",
      "Muralla de Troya",
      "Muralla de Babilonia"
    ],
    "respuestaCorrecta": "La Gran Muralla China",
    "explicacion": "Varias dinastías chinas, especialmente Qin y Ming, erigieron esta colosal fortificación defensiva."
  },
  {
    "id": "his_17",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Quién fue la primera mujer en gobernar como emperatriz reinante en toda la historia de China?",
    "opciones": [
      "Wu Zetian",
      "Cixi",
      "Cleopatra",
      "Catalina la Grande"
    ],
    "respuestaCorrecta": "Wu Zetian",
    "explicacion": "Wu Zetian gobernó con astucia y mano firme durante la dinastía Zhou en el siglo VII d.C."
  },
  {
    "id": "his_18",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué célebre barco zarpó de Inglaterra en 1831 llevando al naturalista Charles Darwin en su viaje científico?",
    "opciones": [
      "HMS Beagle",
      "Mayflower",
      "Santa María",
      "HMS Victory"
    ],
    "respuestaCorrecta": "HMS Beagle",
    "explicacion": "Durante los 5 años a bordo del Beagle, Darwin recolectó las observaciones clave para su teoría de la evolución."
  },
  {
    "id": "his_19",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué edificio romano albergaba los combates de gladiadores y fieras en la Antigüedad?",
    "opciones": [
      "El Coliseo",
      "El Panteón",
      "El Foro Romano",
      "Las Termas de Caracalla"
    ],
    "respuestaCorrecta": "El Coliseo",
    "explicacion": "Inaugurado en el 80 d.C. por el emperador Tito, el Anfiteatro Flavio tenía capacidad para más de 50.000 espectadores."
  },
  {
    "id": "his_20",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué emperador bizantino recopiló el Corpus Iuris Civilis, base del derecho civil moderno?",
    "opciones": [
      "Justiniano I",
      "Constantino el Grande",
      "Teodosio I",
      "Basilio II"
    ],
    "respuestaCorrecta": "Justiniano I",
    "explicacion": "El código legislativo de Justiniano en el siglo VI preservó y sistematizó las leyes romanas para la posteridad."
  },
  {
    "id": "his_21",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Quién fue la heroína francesa que lideró tropas en la Guerra de los Cien Años guiada por visiones divinas?",
    "opciones": [
      "Juana de Arco",
      "María Antonieta",
      "Catalina de Médici",
      "Madame Curie"
    ],
    "respuestaCorrecta": "Juana de Arco",
    "explicacion": "La doncella de Orleans levantó el sitio de Orleans en 1429 antes de ser juzgada y martirizada en Ruán."
  },
  {
    "id": "his_22",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué navegante portugués lideró la expedición que logró la primera circunnavegación del planeta Tierra?",
    "opciones": [
      "Hernando de Magallanes",
      "Vasco da Gama",
      "Cristóbal Colón",
      "Américo Vespucio"
    ],
    "respuestaCorrecta": "Hernando de Magallanes",
    "explicacion": "La expedición iniciada por Magallanes en 1519 fue completada en 1522 por el marino español Juan Sebastián Elcano."
  },
  {
    "id": "his_23",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué filósofo ateniense fue condenado a muerte bebiendo cicuta por corromper a la juventud según sus jueces?",
    "opciones": [
      "Sócrates",
      "Platón",
      "Epicuro",
      "Pitágoras"
    ],
    "respuestaCorrecta": "Sócrates",
    "explicacion": "Sócrates nunca escribió libros y enseñaba mediante el diálogo y preguntas constantes (mayéutica)."
  },
  {
    "id": "his_24",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué documento firmado en 1215 por el rey Juan Sin Tierra limitó por primera vez el poder absoluto monárquico en Inglaterra?",
    "opciones": [
      "La Carta Magna",
      "La Declaración de Derechos",
      "El Tratado de Tordesillas",
      "La Bula Papal"
    ],
    "respuestaCorrecta": "La Carta Magna",
    "explicacion": "La Carta Magna sentó las bases históricas del estado de derecho y las garantías judiciales individuales."
  },
  {
    "id": "his_25",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿En qué río se desarrolló la civilización del Antiguo Egipto?",
    "opciones": [
      "Río Nilo",
      "Río Éufrates",
      "Río Tigris",
      "Río Danubio"
    ],
    "respuestaCorrecta": "Río Nilo",
    "explicacion": "El historiador griego Heródoto afirmó célebremente que \"Egipto es un don del río Nilo\" por sus crecidas fértiles."
  },
  {
    "id": "his_26",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué acontecimiento detonó el estallido de la Primera Guerra Mundial en junio de 1914?",
    "opciones": [
      "El asesinato del archiduque Francisco Fernando",
      "La invasión de Polonia",
      "El hundimiento del Lusitania",
      "La Revolución Rusa"
    ],
    "respuestaCorrecta": "El asesinato del archiduque Francisco Fernando",
    "explicacion": "El magnicidio en Sarajevo del heredero austrohúngaro activó el sistema de alianzas militares europeas."
  },
  {
    "id": "his_27",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué estructura dividió la ciudad de Berlín durante la Guerra Fría entre 1961 y 1989?",
    "opciones": [
      "El Muro de Berlín",
      "La Cortina de Hierro",
      "La Línea Maginot",
      "El Muro de Antonino"
    ],
    "respuestaCorrecta": "El Muro de Berlín",
    "explicacion": "El muro cayó el 9 de noviembre de 1989, simbolizando el colapso del bloque soviético."
  },
  {
    "id": "his_28",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Quién fue el líder sudafricano que pasó 27 años en prisión antes de convertirse en el primer presidente negro de su país?",
    "opciones": [
      "Nelson Mandela",
      "Desmond Tutu",
      "Kofi Annan",
      "Patrice Lumumba"
    ],
    "respuestaCorrecta": "Nelson Mandela",
    "explicacion": "Mandela encabezó la lucha pacífica contra el régimen racista del Apartheid y recibió el Premio Nobel de la Paz."
  },
  {
    "id": "his_29",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué tratado de 1494 dividió las zonas de navegación y conquista del Nuevo Mundo entre España y Portugal?",
    "opciones": [
      "Tratado de Tordesillas",
      "Tratado de Utrecht",
      "Tratado de Versalles",
      "Tratado de Viena"
    ],
    "respuestaCorrecta": "Tratado de Tordesillas",
    "explicacion": "Estableció una línea imaginaria a 370 leguas al oeste de Cabo Verde, otorgando Brasil a Portugal."
  },
  {
    "id": "his_30",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué rey de Esparta lideró a 300 guerreros en el paso de las Termópilas contra el ejército persa de Jerjes I?",
    "opciones": [
      "Leónidas I",
      "Agis II",
      "Pausanias",
      "Agesilao II"
    ],
    "respuestaCorrecta": "Leónidas I",
    "explicacion": "En el 480 a.C., Leónidas y sus espartanos resistieron heroicamente para retrasar el avance persa."
  },
  {
    "id": "his_31",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue la primera civilización en inventar la escritura cuneiforme en tablillas de arcilla?",
    "opciones": [
      "Los Sumerios",
      "Los Romanos",
      "Los Vikingos",
      "Los Fenicios"
    ],
    "respuestaCorrecta": "Los Sumerios",
    "explicacion": "En el sur de Mesopotamia, los sumerios inventaron la escritura cuneiforme hacia el 3400 a.C."
  },
  {
    "id": "his_32",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Quién lideró la independencia de Venezuela, Colombia, Ecuador, Perú y Bolivia?",
    "opciones": [
      "Simón Bolívar",
      "José de San Martín",
      "Bernardo O'Higgins",
      "Antonio José de Sucre"
    ],
    "respuestaCorrecta": "Simón Bolívar",
    "explicacion": "Conocido como \"El Libertador\", Bolívar comandó las campañas que emanciparon el norte de Sudamérica."
  },
  {
    "id": "his_33",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué monje agustino clavó sus 95 tesis en Wittenberg en 1517, iniciando la Reforma Protestante?",
    "opciones": [
      "Martín Lutero",
      "Juan Calvino",
      "Enrique VIII",
      "Tomás de Aquino"
    ],
    "respuestaCorrecta": "Martín Lutero",
    "explicacion": "Lutero protestó contra la venta de indulgencias papales, fracturando la unidad de la cristiandad occidental."
  },
  {
    "id": "his_34",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué célebre científico formuló las leyes de la gravedad tras observar caer una manzana?",
    "opciones": [
      "Isaac Newton",
      "Galileo Galilei",
      "Albert Einstein",
      "Johannes Kepler"
    ],
    "respuestaCorrecta": "Isaac Newton",
    "explicacion": "Newton publicó sus <em>Principia Mathematica</em> en 1687, sentando las bases de la física clásica."
  },
  {
    "id": "his_35",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué dinastía imperial gobernó Rusia durante más de 300 años hasta la abdicación de Nicolás II en 1917?",
    "opciones": [
      "Dinastía Románov",
      "Dinastía Rúrik",
      "Dinastía Habsburgo",
      "Dinastía Borbón"
    ],
    "respuestaCorrecta": "Dinastía Románov",
    "explicacion": "Los Románov rigieron el Imperio Ruso desde Miguel I en 1613 hasta la Revolución Rusa de 1917."
  },
  {
    "id": "his_36",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba la famosa reina de Francia guillotinada durante la Revolución Francesa en 1793?",
    "opciones": [
      "María Antonieta",
      "Catalina de Médici",
      "María Tudor",
      "Madame de Pompadour"
    ],
    "respuestaCorrecta": "María Antonieta",
    "explicacion": "Esposa de Luis XVI, María Antonieta de Austria fue ejecutada en la Plaza de la Revolución de París."
  },
  {
    "id": "his_37",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el líder cartaginés que cruzó los Alpes con elefantes de combate para atacar a Roma?",
    "opciones": [
      "Aníbal Barca",
      "Amílcar Barca",
      "Asdrúbal",
      "Escipión el Africano"
    ],
    "respuestaCorrecta": "Aníbal Barca",
    "explicacion": "Durante la Segunda Guerra Púnica (218 a.C.), Aníbal infligió devastadoras derrotas a los ejércitos romanos en Cannas."
  },
  {
    "id": "his_38",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué emperador romano legalizó el cristianismo mediante el Edicto de Milán en el 313 d.C.?",
    "opciones": [
      "Constantino el Grande",
      "Nerón",
      "Calígula",
      "Diocleciano"
    ],
    "respuestaCorrecta": "Constantino el Grande",
    "explicacion": "Constantino también trasladó la capital del imperio a Bizancio, rebautizándola como Constantinopla."
  },
  {
    "id": "his_39",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué civilización de la antigüedad inventó el sistema de democracia en la polis de Atenas?",
    "opciones": [
      "La Antigua Grecia",
      "Los Fenicios",
      "Los Persas",
      "Los Cartagineses"
    ],
    "respuestaCorrecta": "La Antigua Grecia",
    "explicacion": "Clístenes y Pericles impulsaron el sistema donde los ciudadanos votaban directamente en la asamblea (Ekklesía)."
  },
  {
    "id": "his_40",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué navegante genovés llegó a América el 12 de octubre de 1492 al mando de tres carabelas?",
    "opciones": [
      "Cristóbal Colón",
      "Américo Vespucio",
      "Vasco Núñez de Balboa",
      "Juan Ponce de León"
    ],
    "respuestaCorrecta": "Cristóbal Colón",
    "explicacion": "Colón desembarcó en la isla de Guanahaní (Bahamas) creyendo haber llegado a las Indias orientales."
  },
  {
    "id": "bio_01",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué molécula portadora de las instrucciones genéticas de la vida representa esta ilustración?",
    "opciones": [
      "ADN (Ácido desoxirribonucleico)",
      "ARN mensajero",
      "Proteína de colágeno",
      "Glucosa"
    ],
    "respuestaCorrecta": "ADN (Ácido desoxirribonucleico)",
    "explicacion": "Watson y Crick descubrieron la estructura de doble hélice del ADN en 1953.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 200 150\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><path d=\"M 40,30 Q 70,75 100,30 Q 130,75 160,30\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"3.5\"/><path d=\"M 40,120 Q 70,75 100,120 Q 130,75 160,120\" fill=\"none\" stroke=\"#06b6d4\" stroke-width=\"3.5\"/><line x1=\"55\" y1=\"52\" x2=\"55\" y2=\"98\" stroke=\"#fbbf24\" stroke-width=\"2.5\"/><line x1=\"70\" y1=\"75\" x2=\"70\" y2=\"75\" stroke=\"#f43f5e\" stroke-width=\"5\"/><line x1=\"85\" y1=\"52\" x2=\"85\" y2=\"98\" stroke=\"#a855f7\" stroke-width=\"2.5\"/><line x1=\"100\" y1=\"30\" x2=\"100\" y2=\"120\" stroke=\"#fbbf24\" stroke-width=\"2.5\"/><line x1=\"115\" y1=\"52\" x2=\"115\" y2=\"98\" stroke=\"#f43f5e\" stroke-width=\"2.5\"/><line x1=\"130\" y1=\"75\" x2=\"130\" y2=\"75\" stroke=\"#a855f7\" stroke-width=\"5\"/><line x1=\"145\" y1=\"52\" x2=\"145\" y2=\"98\" stroke=\"#10b981\" stroke-width=\"2.5\"/><text x=\"100\" y=\"142\" font-size=\"8.5\" fill=\"#94a3b8\" text-anchor=\"middle\">Estructura Biomolecular</text></svg>"
  },
  {
    "id": "bio_02",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué unidad fundamental estructural y funcional de los seres vivos se ilustra en el esquema?",
    "opciones": [
      "La célula",
      "El átomo",
      "La bacteria",
      "El virus"
    ],
    "respuestaCorrecta": "La célula",
    "explicacion": "Todos los organismos vivos están compuestos por una o más células con membrana y núcleo u organelos.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 200 150\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><ellipse cx=\"100\" cy=\"75\" rx=\"75\" ry=\"55\" fill=\"rgba(16, 185, 129, 0.2)\" stroke=\"#10b981\" stroke-width=\"2.5\"/><circle cx=\"90\" cy=\"70\" r=\"22\" fill=\"#0284c7\" stroke=\"#38bdf8\" stroke-width=\"2\"/><circle cx=\"87\" cy=\"67\" r=\"9\" fill=\"#1e293b\"/><ellipse cx=\"140\" cy=\"60\" rx=\"10\" ry=\"5\" fill=\"#f59e0b\" transform=\"rotate(25, 140, 60)\"/><ellipse cx=\"60\" cy=\"100\" rx=\"9\" ry=\"4\" fill=\"#f59e0b\" transform=\"rotate(-35, 60, 100)\"/><text x=\"100\" y=\"144\" font-size=\"8.5\" fill=\"#94a3b8\" text-anchor=\"middle\">Unidad Básica Celular</text></svg>"
  },
  {
    "id": "bio_03",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el órgano más grande del cuerpo humano?",
    "opciones": [
      "La piel",
      "El hígado",
      "El cerebro",
      "El intestino delgado"
    ],
    "respuestaCorrecta": "La piel",
    "explicacion": "La piel de un adulto pesa entre 3 y 5 kilogramos y mide cerca de 2 metros cuadrados protegiendo los órganos internos."
  },
  {
    "id": "bio_04",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué gas absorben las plantas durante la fotosíntesis para producir azúcares?",
    "opciones": [
      "Dióxido de carbono (CO2)",
      "Oxígeno (O2)",
      "Nitrógeno (N2)",
      "Helio (He)"
    ],
    "respuestaCorrecta": "Dióxido de carbono (CO2)",
    "explicacion": "Las plantas capturan luz solar y CO2 liberando oxígeno como subproducto fundamental para la atmósfera."
  },
  {
    "id": "bio_05",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el animal terrestre más veloz del planeta, capaz de superar los 100 km/h?",
    "opciones": [
      "El guepardo (chita)",
      "El león",
      "La gacela de Thomson",
      "El caballo de carreras"
    ],
    "respuestaCorrecta": "El guepardo (chita)",
    "explicacion": "El guepardo puede acelerar de 0 a 96 km/h en apenas 3 segundos gracias a su columna flexible y garras semirretráctiles."
  },
  {
    "id": "bio_06",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué curioso mamífero semiacuático endémico de Australia pone huevos y tiene pico de pato?",
    "opciones": [
      "El ornitorrinco",
      "El equidna",
      "El koala",
      "El demonio de Tasmania"
    ],
    "respuestaCorrecta": "El ornitorrinco",
    "explicacion": "Los ornitorrincos pertenecen al orden de los monotremas, los únicos mamíferos que ponen huevos."
  },
  {
    "id": "bio_07",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el hueso más largo y resistente del cuerpo humano?",
    "opciones": [
      "El fémur (muslo)",
      "La tibia",
      "El húmero",
      "La columna vertebral"
    ],
    "respuestaCorrecta": "El fémur (muslo)",
    "explicacion": "El fémur soporta hasta 30 veces el peso corporal de una persona al correr o saltar."
  },
  {
    "id": "bio_08",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué tipo de sangre es considerado \"donante universal\" en el sistema ABO y Rh?",
    "opciones": [
      "O negativo (O-)",
      "AB positivo (AB+)",
      "A positivo (A+)",
      "O positivo (O+)"
    ],
    "respuestaCorrecta": "O negativo (O-)",
    "explicacion": "Los glóbulos rojos O- carecen de antígenos A, B y factor Rh, por lo que no provocan rechazo en otros receptores."
  },
  {
    "id": "bio_09",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué animal marino es el mamífero más grande que jamás ha existido en la Tierra?",
    "opciones": [
      "La ballena azul",
      "El cachalote",
      "La orca",
      "El tiburón ballena"
    ],
    "respuestaCorrecta": "La ballena azul",
    "explicacion": "La ballena azul puede medir más de 30 metros de longitud y pesar hasta 180 toneladas."
  },
  {
    "id": "bio_10",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llaman las células del sistema nervioso especializadas en transmitir impulsos eléctricos?",
    "opciones": [
      "Neuronas",
      "Glóbulos blancos",
      "Osteocitos",
      "Mioblastos"
    ],
    "respuestaCorrecta": "Neuronas",
    "explicacion": "El cerebro humano cuenta con aproximadamente 86 mil millones de neuronas interconectadas por sinapsis."
  },
  {
    "id": "bio_11",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué insecto es el principal polinizador responsable de la reproducción del 75% de los cultivos florales?",
    "opciones": [
      "La abeja",
      "La avispa",
      "La mariposa",
      "El escarabajo"
    ],
    "respuestaCorrecta": "La abeja",
    "explicacion": "Las abejas transportan polen entre flores, siendo vitales para la biodiversidad y la seguridad alimentaria global."
  },
  {
    "id": "bio_12",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué órgano humano es el único capaz de regenerar parte de su tejido tras ser extirpado quirúrgicamente?",
    "opciones": [
      "El hígado",
      "El bazo",
      "El páncreas",
      "El riñón"
    ],
    "respuestaCorrecta": "El hígado",
    "explicacion": "El hígado puede recuperar su tamaño original incluso si se extirpa hasta el 70% de su masa biológica."
  },
  {
    "id": "bio_13",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué proceso de transformación física experimentan las orugas para convertirse en mariposas?",
    "opciones": [
      "Metamorfosis",
      "Meiosis",
      "Fotosíntesis",
      "Mitosis"
    ],
    "respuestaCorrecta": "Metamorfosis",
    "explicacion": "Dentro de la crisálida, las células imaginales reconstruyen completamente la anatomía del insecto adulto."
  },
  {
    "id": "bio_14",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuántas cámaras o cavidades tiene el corazón humano?",
    "opciones": [
      "4 (2 aurículas y 2 ventrículos)",
      "2 cavidades",
      "3 cavidades",
      "6 cavidades"
    ],
    "respuestaCorrecta": "4 (2 aurículas y 2 ventrículos)",
    "explicacion": "El lado derecho bombea sangre desoxigenada a los pulmones y el izquierdo sangre oxigenada al cuerpo."
  },
  {
    "id": "bio_15",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué orgánulo celular es conocido como la \"central energética\" de la célula por producir ATP?",
    "opciones": [
      "Mitocondria",
      "Ribosoma",
      "Aparato de Golgi",
      "Lisosoma"
    ],
    "respuestaCorrecta": "Mitocondria",
    "explicacion": "Las mitocondrias realizan la respiración celular oxidando nutrientes para generar adenosín trifosfato (ATP)."
  },
  {
    "id": "bio_16",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué vertebrados tienen plumas, pico sin dientes y ponen huevos con cáscara dura?",
    "opciones": [
      "Las aves",
      "Los reptiles",
      "Los anfibios",
      "Los murciélagos"
    ],
    "respuestaCorrecta": "Las aves",
    "explicacion": "Las aves evolucionaron directamente a partir de dinosaurios terópodos bípedos en el Jurásico."
  },
  {
    "id": "bio_17",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué pigmento verde en los cloroplastos es responsable de absorber la luz solar en las plantas?",
    "opciones": [
      "Clorofila",
      "Caroteno",
      "Melanina",
      "Hemoglobina"
    ],
    "respuestaCorrecta": "Clorofila",
    "explicacion": "La clorofila absorbe luz roja y azul, reflejando la longitud de onda verde que vemos en las hojas."
  },
  {
    "id": "bio_18",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué porcentaje aproximado del cuerpo humano adulto está compuesto por agua?",
    "opciones": [
      "Alrededor del 60%",
      "El 30%",
      "El 85%",
      "El 45%"
    ],
    "respuestaCorrecta": "Alrededor del 60%",
    "explicacion": "El agua es indispensable para el transporte sanguíneo, la digestión, la temperatura y las reacciones celulares."
  },
  {
    "id": "bio_19",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el único mamífero capaz de volar activamente con alas membranosas?",
    "opciones": [
      "El murciélago",
      "La ardilla voladora",
      "El lémur volador",
      "El colibrí"
    ],
    "respuestaCorrecta": "El murciélago",
    "explicacion": "Las alas del murciélago son manos modificadas con una fina membrana elástica llamada patagio."
  },
  {
    "id": "bio_20",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llaman los animales que se alimentan exclusivamente de materia vegetal?",
    "opciones": [
      "Herbívoros",
      "Carnívoros",
      "Omnívoros",
      "Detritívoros"
    ],
    "respuestaCorrecta": "Herbívoros",
    "explicacion": "Los herbívoros (como vacas, caballos o conejos) poseen sistemas digestivos adaptados para fermentar celulosa."
  },
  {
    "id": "bio_21",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué componente sanguíneo es el encargado de transportar oxígeno mediante la proteína hemoglobina?",
    "opciones": [
      "Glóbulos rojos (eritrocitos)",
      "Glóbulos blancos (leucocitos)",
      "Plaquetas",
      "Plasma"
    ],
    "respuestaCorrecta": "Glóbulos rojos (eritrocitos)",
    "explicacion": "Cada glóbulo rojo contiene unos 270 millones de moléculas de hemoglobina ricas en hierro."
  },
  {
    "id": "bio_22",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué científico austríaco descubrió las leyes básicas de la herencia genética experimentando con guisantes?",
    "opciones": [
      "Gregor Mendel",
      "Charles Darwin",
      "Louis Pasteur",
      "Alexander Fleming"
    ],
    "respuestaCorrecta": "Gregor Mendel",
    "explicacion": "Las leyes de Mendel (segregación e independencia de caracteres) sentaron las bases de la genética moderna."
  },
  {
    "id": "bio_23",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el reptil vivo más grande del mundo?",
    "opciones": [
      "El cocodrilo de agua salada",
      "El dragón de Komodo",
      "La anaconda verde",
      "La tortuga laúd"
    ],
    "respuestaCorrecta": "El cocodrilo de agua salada",
    "explicacion": "Los machos pueden medir más de 6 metros de longitud y pesar más de 1.000 kg en el norte de Australia y sudeste asiático."
  },
  {
    "id": "bio_24",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué sustancia producida por el páncreas regula la concentración de glucosa (azúcar) en sangre?",
    "opciones": [
      "Insulina",
      "Adrenalina",
      "Melatonina",
      "Cortisol"
    ],
    "respuestaCorrecta": "Insulina",
    "explicacion": "La insulina permite que las células absorban glucosa sanguínea para usarla como energía."
  },
  {
    "id": "bio_25",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el árbol más alto del mundo, perteneciente a la especie Sequoia sempervirens?",
    "opciones": [
      "Secuoya roja (Hyperion)",
      "Baobab",
      "Eucalipto arcoíris",
      "Pino longevo"
    ],
    "respuestaCorrecta": "Secuoya roja (Hyperion)",
    "explicacion": "El espécimen Hyperion en California supera los 115 metros de altura, más alto que la Estatua de la Libertad."
  },
  {
    "id": "bio_26",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué animales acuáticos respiran mediante branquias y tienen aletas para impulsarse?",
    "opciones": [
      "Los peces",
      "Las ballenas",
      "Los delfines",
      "Las focas"
    ],
    "respuestaCorrecta": "Los peces",
    "explicacion": "Las branquias extraen oxígeno disuelto en el agua a medida que esta fluye por sus filamentos."
  },
  {
    "id": "bio_27",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuántos pares de cromosomas tiene normalmente una célula humana somática sana?",
    "opciones": [
      "23 pares (46 cromosomas)",
      "46 pares (92)",
      "12 pares (24)",
      "30 pares (60)"
    ],
    "respuestaCorrecta": "23 pares (46 cromosomas)",
    "explicacion": "Heredamos 23 cromosomas de la madre y 23 del padre, incluyendo el par que determina el sexo biológico (XX o XY)."
  },
  {
    "id": "bio_28",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el proceso por el cual los osos pasan el invierno en letargo para ahorrar energía?",
    "opciones": [
      "Hibernación",
      "Migración",
      "Muda",
      "Estivación"
    ],
    "respuestaCorrecta": "Hibernación",
    "explicacion": "La frecuencia cardíaca y la temperatura corporal descienden drásticamente durante los meses fríos."
  },
  {
    "id": "bio_29",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué tipo de microorganismo produce la penicilina descubierta por Alexander Fleming en 1928?",
    "opciones": [
      "Un hongo (moho Penicillium)",
      "Una bacteria",
      "Un virus",
      "Una protozoo"
    ],
    "respuestaCorrecta": "Un hongo (moho Penicillium)",
    "explicacion": "Fleming observó que las colonias de bacterias no podían crecer cerca del hongo <em>Penicillium notatum</em>."
  },
  {
    "id": "bio_30",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué sentido tienen sumamente desarrollado los tiburones gracias a las ampollas de Lorenzini?",
    "opciones": [
      "Electrocepción (detectar campos eléctricos)",
      "Ecolocalización acústica",
      "Visión infrarroja",
      "Magnetorrecepción térmica"
    ],
    "respuestaCorrecta": "Electrocepción (detectar campos eléctricos)",
    "explicacion": "Las ampollas de Lorenzini detectan los diminutos impulsos eléctricos emitidos por los latidos cardíacos de sus presas."
  },
  {
    "id": "bio_31",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué órgano del cuerpo humano es el encargado de filtrar toxinas y producir orina?",
    "opciones": [
      "Los riñones",
      "Los pulmones",
      "El estómago",
      "El páncreas"
    ],
    "respuestaCorrecta": "Los riñones",
    "explicacion": "Los riñones filtran aproximadamente 200 litros de sangre al día para regular el equilibrio hídrico y expulsar desechos."
  },
  {
    "id": "bio_32",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué gran arrecife coralino en Australia es la estructura viva más grande del planeta visible desde el espacio?",
    "opciones": [
      "La Gran Barrera de Coral",
      "El Arrecife Mesoamericano",
      "El Arrecife de Belice",
      "Los Arrecifes de Florida"
    ],
    "respuestaCorrecta": "La Gran Barrera de Coral",
    "explicacion": "Se extiende por más de 2.300 km y alberga miles de especies de corales, peces, tortugas y tiburones."
  },
  {
    "id": "bio_33",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué sentido humano reside en las papilas gustativas de la lengua?",
    "opciones": [
      "El gusto",
      "El olfato",
      "El tacto",
      "El oído"
    ],
    "respuestaCorrecta": "El gusto",
    "explicacion": "Detecta los cinco sabores básicos: dulce, salado, ácido, amargo y umami."
  },
  {
    "id": "bio_34",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué grupo de vertebrados pasa por una fase larvaria acuática con branquias antes de transformarse en adultos terrestres?",
    "opciones": [
      "Los anfibios",
      "Los reptiles",
      "Los peces pulmonados",
      "Los crustáceos"
    ],
    "respuestaCorrecta": "Los anfibios",
    "explicacion": "Ranas y salamandras nacen como renacuajos acuáticos y desarrollan pulmones y patas de adultos."
  },
  {
    "id": "bio_35",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el pájaro más pequeño del mundo, capaz de volar hacia atrás y aletear hasta 80 veces por segundo?",
    "opciones": [
      "El colibrí (zunzuncito)",
      "El gorrión",
      "El canario",
      "El petirrojo"
    ],
    "respuestaCorrecta": "El colibrí (zunzuncito)",
    "explicacion": "El colibrí abeja de Cuba mide apenas 5 centímetros y pesa menos de 2 gramos."
  },
  {
    "id": "qui_01",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué elemento químico de número atómico 79 y símbolo \"Au\" se muestra en la tarjeta periódica?",
    "opciones": [
      "Oro",
      "Plata",
      "Aluminio",
      "Argón"
    ],
    "respuestaCorrecta": "Oro",
    "explicacion": "El símbolo \"Au\" proviene del latín <em>Aurum</em> (brillante amanecer). Es uno de los metales nobles más maleables.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 160 140\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><rect x=\"20\" y=\"10\" width=\"120\" height=\"120\" rx=\"12\" fill=\"#1e293b\" stroke=\"#fbbf24\" stroke-width=\"3\"/><text x=\"35\" y=\"32\" font-size=\"12\" fill=\"#fbbf24\" font-weight=\"bold\">79</text><text x=\"80\" y=\"78\" font-size=\"38\" fill=\"#fbbf24\" font-weight=\"900\" text-anchor=\"middle\" font-family=\"'Cinzel', serif\">Au</text><text x=\"80\" y=\"102\" font-size=\"11\" fill=\"#e2e8f0\" font-weight=\"bold\" text-anchor=\"middle\">196.966</text><text x=\"80\" y=\"120\" font-size=\"9\" fill=\"#94a3b8\" text-anchor=\"middle\">Tabla Periódica</text></svg>"
  },
  {
    "id": "qui_02",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué elemento químico metálico de número atómico 26 y símbolo \"Fe\" se muestra en la tarjeta periódica?",
    "opciones": [
      "Hierro",
      "Flúor",
      "Fósforo",
      "Francio"
    ],
    "respuestaCorrecta": "Hierro",
    "explicacion": "El símbolo \"Fe\" proviene del latín <em>Ferrum</em>. Es el metal más utilizado en la industria siderúrgica mundial.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 160 140\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><rect x=\"20\" y=\"10\" width=\"120\" height=\"120\" rx=\"12\" fill=\"#1e293b\" stroke=\"#06b6d4\" stroke-width=\"3\"/><text x=\"35\" y=\"32\" font-size=\"12\" fill=\"#06b6d4\" font-weight=\"bold\">26</text><text x=\"80\" y=\"78\" font-size=\"38\" fill=\"#06b6d4\" font-weight=\"900\" text-anchor=\"middle\" font-family=\"'Cinzel', serif\">Fe</text><text x=\"80\" y=\"102\" font-size=\"11\" fill=\"#e2e8f0\" font-weight=\"bold\" text-anchor=\"middle\">55.845</text><text x=\"80\" y=\"120\" font-size=\"9\" fill=\"#94a3b8\" text-anchor=\"middle\">Tabla Periódica</text></svg>"
  },
  {
    "id": "qui_03",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué elemento químico de número atómico 47 y símbolo \"Ag\" representa la tarjeta periódica?",
    "opciones": [
      "Plata",
      "Oro",
      "Argón",
      "Platino"
    ],
    "respuestaCorrecta": "Plata",
    "explicacion": "El símbolo \"Ag\" proviene del latín <em>Argentum</em>. Es el mejor conductor de calor y electricidad de todos los metales.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 160 140\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><rect x=\"20\" y=\"10\" width=\"120\" height=\"120\" rx=\"12\" fill=\"#1e293b\" stroke=\"#e2e8f0\" stroke-width=\"3\"/><text x=\"35\" y=\"32\" font-size=\"12\" fill=\"#e2e8f0\" font-weight=\"bold\">47</text><text x=\"80\" y=\"78\" font-size=\"38\" fill=\"#e2e8f0\" font-weight=\"900\" text-anchor=\"middle\" font-family=\"'Cinzel', serif\">Ag</text><text x=\"80\" y=\"102\" font-size=\"11\" fill=\"#e2e8f0\" font-weight=\"bold\" text-anchor=\"middle\">107.868</text><text x=\"80\" y=\"120\" font-size=\"9\" fill=\"#94a3b8\" text-anchor=\"middle\">Tabla Periódica</text></svg>"
  },
  {
    "id": "qui_04",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué modelo fundamental de la materia, formado por núcleo de protones y neutrones rodeado de electrones, se muestra en el esquema?",
    "opciones": [
      "El átomo",
      "La molécula de agua",
      "El cuásar",
      "El protón"
    ],
    "respuestaCorrecta": "El átomo",
    "explicacion": "El átomo es la unidad indivisible elemental que define a los elementos químicos.",
    "tipoImagen": "diagrama",
    "svg": "<svg viewBox=\"0 0 200 150\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background: #090d16; border-radius: 8px;\"><circle cx=\"100\" cy=\"75\" r=\"13\" fill=\"#ef4444\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"100\" y=\"79\" font-size=\"9\" font-weight=\"bold\" fill=\"#fff\" text-anchor=\"middle\">Núcleo</text><ellipse cx=\"100\" cy=\"75\" rx=\"55\" ry=\"18\" fill=\"none\" stroke=\"#06b6d4\" stroke-width=\"1.5\" transform=\"rotate(30, 100, 75)\"/><circle cx=\"145\" cy=\"50\" r=\"4.5\" fill=\"#38bdf8\"/><ellipse cx=\"100\" cy=\"75\" rx=\"55\" ry=\"18\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"1.5\" transform=\"rotate(-30, 100, 75)\"/><circle cx=\"55\" cy=\"50\" r=\"4.5\" fill=\"#34d399\"/><ellipse cx=\"100\" cy=\"75\" rx=\"55\" ry=\"18\" fill=\"none\" stroke=\"#a855f7\" stroke-width=\"1.5\" transform=\"rotate(90, 100, 75)\"/><circle cx=\"100\" cy=\"130\" r=\"4.5\" fill=\"#c084fc\"/><text x=\"100\" y=\"145\" font-size=\"8.5\" fill=\"#94a3b8\" text-anchor=\"middle\">Esquema Físico-Químico</text></svg>"
  },
  {
    "id": "qui_05",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es la fórmula química molecular del agua común?",
    "opciones": [
      "H2O",
      "CO2",
      "NaCl",
      "O2"
    ],
    "respuestaCorrecta": "H2O",
    "explicacion": "Una molécula de agua está compuesta por dos átomos de hidrógeno unidos covalentemente a un átomo de oxígeno."
  },
  {
    "id": "qui_06",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el gas más abundante en la atmósfera del planeta Tierra (78% del aire)?",
    "opciones": [
      "Nitrógeno (N2)",
      "Oxígeno (O2)",
      "Dióxido de carbono (CO2)",
      "Argón (Ar)"
    ],
    "respuestaCorrecta": "Nitrógeno (N2)",
    "explicacion": "Aunque respiramos oxígeno (21%), el nitrógeno gaseoso inerte constituye la mayor parte de la atmósfera."
  },
  {
    "id": "qui_07",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué físico formuló la famosa ecuación de equivalencia entre masa y energía E = mc²?",
    "opciones": [
      "Albert Einstein",
      "Niels Bohr",
      "Max Planck",
      "Marie Curie"
    ],
    "respuestaCorrecta": "Albert Einstein",
    "explicacion": "Formulada en 1905, demostró que una pequeña cantidad de materia puede convertirse en una inmensa cantidad de energía."
  },
  {
    "id": "qui_08",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿A qué velocidad viaja la luz en el vacío aproximadamente?",
    "opciones": [
      "300.000 kilómetros por segundo",
      "150.000 km/s",
      "30.000 km/s",
      "1.000.000 km/s"
    ],
    "respuestaCorrecta": "300.000 kilómetros por segundo",
    "explicacion": "La constante universal <em>c</em> es de exactamente 299.792.458 m/s, la velocidad límite del universo."
  },
  {
    "id": "qui_09",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué planeta del Sistema Solar es el más grande de todos, con una masa mayor que todos los demás planetas juntos?",
    "opciones": [
      "Júpiter",
      "Saturno",
      "Neptuno",
      "Urano"
    ],
    "respuestaCorrecta": "Júpiter",
    "explicacion": "Júpiter es un gigante gaseoso que cuenta con más de 90 lunas y la emblemática Gran Mancha Roja."
  },
  {
    "id": "qui_10",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el único metal conocido que permanece en estado líquido a temperatura ambiente (20°C)?",
    "opciones": [
      "Mercurio (Hg)",
      "Plomo (Pb)",
      "Cobre (Cu)",
      "Estaño (Sn)"
    ],
    "respuestaCorrecta": "Mercurio (Hg)",
    "explicacion": "El mercurio se utilizaba tradicionalmente en termómetros y barómetros por su dilatación uniforme."
  },
  {
    "id": "qui_11",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué científica polaca-francesa fue la primera persona en ganar dos Premios Nobel en distintas ciencias (Física y Química)?",
    "opciones": [
      "Marie Curie",
      "Rosalind Franklin",
      "Lise Meitner",
      "Ada Lovelace"
    ],
    "respuestaCorrecta": "Marie Curie",
    "explicacion": "Marie Curie aisló el radio y el polonio y acuñó el término radioactividad."
  },
  {
    "id": "qui_12",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué compuesto químico común de fórmula NaCl añadimos habitualmente a las comidas para dar sabor salado?",
    "opciones": [
      "Cloruro de sodio (sal común)",
      "Bicarbonato de sodio",
      "Sulfato de calcio",
      "Sacarosa"
    ],
    "respuestaCorrecta": "Cloruro de sodio (sal común)",
    "explicacion": "El cloruro de sodio es un cristal iónico esencial para la fisiología celular y la conservación de alimentos."
  },
  {
    "id": "qui_13",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué escala logarítmica de 0 a 14 mide el nivel de acidez o basicidad de una disolución acuosa?",
    "opciones": [
      "Escala de pH",
      "Escala de Richter",
      "Escala de Kelvin",
      "Escala de Mohs"
    ],
    "respuestaCorrecta": "Escala de pH",
    "explicacion": "Un pH 7 es neutro (agua pura), valores inferiores a 7 son ácidos y superiores a 7 son básicos o alcalinos."
  },
  {
    "id": "qui_14",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el planeta del Sistema Solar más cercano al Sol?",
    "opciones": [
      "Mercurio",
      "Venus",
      "Marte",
      "Tierra"
    ],
    "respuestaCorrecta": "Mercurio",
    "explicacion": "Mercurio orbita el Sol en solo 88 días terrestres y carece de atmósfera para retener calor por la noche."
  },
  {
    "id": "qui_15",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el elemento químico más abundante en el universo observable (más del 73% de la materia bariónica)?",
    "opciones": [
      "Hidrógeno (H)",
      "Helio (He)",
      "Carbono (C)",
      "Oxígeno (O)"
    ],
    "respuestaCorrecta": "Hidrógeno (H)",
    "explicacion": "El hidrógeno es el combustible que fusionan las estrellas para producir helio y emitir luz y calor."
  },
  {
    "id": "qui_16",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué ley de la física establece que \"a toda acción le corresponde una reacción igual y en sentido opuesto\"?",
    "opciones": [
      "Tercera Ley de Newton",
      "Primera Ley de Newton",
      "Ley de Coulomb",
      "Principio de Arquímedes"
    ],
    "respuestaCorrecta": "Tercera Ley de Newton",
    "explicacion": "Esta ley explica el principio de propulsión de cohetes espaciales al expulsar gases a gran velocidad."
  },
  {
    "id": "qui_17",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿En qué estado de la materia las partículas tienen forma y volumen fijos debido a fuertes fuerzas de atracción?",
    "opciones": [
      "Sólido",
      "Líquido",
      "Gas",
      "Plasma"
    ],
    "respuestaCorrecta": "Sólido",
    "explicacion": "Los sólidos poseen estructura cristalina o amorfa rígida que resiste la deformación exterior."
  },
  {
    "id": "qui_18",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el mineral natural más duro según la Escala de Mohs (nivel 10), capaz de rayar a todos los demás?",
    "opciones": [
      "El diamante",
      "El corindón (rubí)",
      "El cuarzo",
      "El topacio"
    ],
    "respuestaCorrecta": "El diamante",
    "explicacion": "El diamante está formado exclusivamente por átomos de carbono enlazados en una red tetraédrica perfecta."
  },
  {
    "id": "qui_19",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué planeta del Sistema Solar destaca por su espectacular sistema de anillos brillantes visibles desde la Tierra?",
    "opciones": [
      "Saturno",
      "Urano",
      "Júpiter",
      "Neptuno"
    ],
    "respuestaCorrecta": "Saturno",
    "explicacion": "Los anillos de Saturno están formados por miles de millones de fragmentos de hielo y roca orbitando el planeta."
  },
  {
    "id": "qui_20",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué partícula subatómica elemental no posee carga eléctrica y se ubica en el núcleo junto a los protones?",
    "opciones": [
      "Neutrón",
      "Protón",
      "Electrón",
      "Fotón"
    ],
    "respuestaCorrecta": "Neutrón",
    "explicacion": "Descubierto por James Chadwick en 1932, el neutrón estabiliza el núcleo atómico frente a la repulsión de protones."
  },
  {
    "id": "qui_21",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿A qué temperatura en grados Celsius se congela el agua destilada a nivel del mar (1 atmósfera de presión)?",
    "opciones": [
      "0 °C",
      "100 °C",
      "-10 °C",
      "32 °C"
    ],
    "respuestaCorrecta": "0 °C",
    "explicacion": "El punto de fusión/congelación del agua marca los 0 °C en la escala centígrada diseñada por Anders Celsius."
  },
  {
    "id": "qui_22",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué principio de la física explica por qué los barcos de acero flotan en el agua al desalojar un volumen de líquido igual a su peso?",
    "opciones": [
      "Principio de Arquímedes",
      "Principio de Bernoulli",
      "Efecto Doppler",
      "Ley de Hooke"
    ],
    "respuestaCorrecta": "Principio de Arquímedes",
    "explicacion": "El empuje hidrostático hacia arriba es igual al peso del volumen de fluido desplazado por el cuerpo sumergido."
  },
  {
    "id": "qui_23",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el cero absoluto de temperatura en la escala Kelvin, donde cesa toda agitación térmica molecular?",
    "opciones": [
      "0 Kelvin (-273,15 °C)",
      "-100 K",
      "0 °C",
      "-459 K"
    ],
    "respuestaCorrecta": "0 Kelvin (-273,15 °C)",
    "explicacion": "En el cero absoluto las partículas alcanzan su mínima energía cuántica posible en el universo."
  },
  {
    "id": "qui_24",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué planeta es conocido popularmente como el \"Planeta Rojo\" por el óxido de hierro en su superficie?",
    "opciones": [
      "Marte",
      "Venus",
      "Mercurio",
      "Júpiter"
    ],
    "respuestaCorrecta": "Marte",
    "explicacion": "Marte alberga el Monte Olimpo, el volcán más alto del Sistema Solar con 22 km de altitud."
  },
  {
    "id": "qui_25",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué fenómeno físico hace que el tono de la sirena de una ambulancia suene más agudo cuando se acerca y más grave cuando se aleja?",
    "opciones": [
      "Efecto Doppler",
      "Refracción de ondas",
      "Resonancia acústica",
      "Difracción cuántica"
    ],
    "respuestaCorrecta": "Efecto Doppler",
    "explicacion": "Christian Doppler descubrió el cambio aparente de frecuencia de una onda producido por el movimiento relativo de la fuente."
  },
  {
    "id": "qui_26",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué químico ruso organizó la primera versión de la Tabla Periódica de los elementos en 1869 ordenándolos por masa atómica?",
    "opciones": [
      "Dmitri Mendeléyev",
      "Antoine Lavoisier",
      "Robert Boyle",
      "John Dalton"
    ],
    "respuestaCorrecta": "Dmitri Mendeléyev",
    "explicacion": "Mendeléyev dejó espacios vacíos prediciendo con exactitud las propiedades de elementos aún no descubiertos como el galio."
  },
  {
    "id": "qui_27",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué capa de la atmósfera terrestre absorbe la mayor parte de la dañina radiación ultravioleta del Sol?",
    "opciones": [
      "Capa de ozono (estratosfera)",
      "Troposfera",
      "Termosfera",
      "Mesosfera"
    ],
    "respuestaCorrecta": "Capa de ozono (estratosfera)",
    "explicacion": "El ozono molecular (O3) actúa como un escudo protector indispensable para la vida animal y vegetal en la superficie."
  },
  {
    "id": "qui_28",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama la fuerza fundamental de la naturaleza responsable de mantener unidos los protones y neutrones en el núcleo atómico?",
    "opciones": [
      "Fuerza nuclear fuerte",
      "Fuerza gravitacional",
      "Fuerza electromagnética",
      "Fuerza nuclear débil"
    ],
    "respuestaCorrecta": "Fuerza nuclear fuerte",
    "explicacion": "La interacción nuclear fuerte es la más potente de las cuatro fuerzas fundamentales, operando a distancias subatómicas."
  },
  {
    "id": "qui_29",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué astro brillante es el centro gravitatorio del Sistema Solar y contiene más del 99,8% de toda su masa?",
    "opciones": [
      "El Sol",
      "Júpiter",
      "La Vía Láctea",
      "Sirio"
    ],
    "respuestaCorrecta": "El Sol",
    "explicacion": "El Sol es una estrella de tipo espectral G2V que fusiona unas 600 millones de toneladas de hidrógeno por segundo."
  },
  {
    "id": "qui_30",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué tipo de energía posee un objeto en virtud de su movimiento (proporcional a su masa y al cuadrado de su velocidad)?",
    "opciones": [
      "Energía cinética",
      "Energía potencial gravitatoria",
      "Energía nuclear",
      "Energía térmica"
    ],
    "respuestaCorrecta": "Energía cinética",
    "explicacion": "La energía cinética se calcula mediante la fórmula Ec = ½ m·v² y se mide en julios (Joules)."
  },
  {
    "id": "art_01",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién pintó la célebre obra maestra del Renacimiento \"La Gioconda\" (Mona Lisa)?",
    "opciones": [
      "Leonardo da Vinci",
      "Miguel Ángel",
      "Rafael Sanzio",
      "Sandro Botticelli"
    ],
    "respuestaCorrecta": "Leonardo da Vinci",
    "explicacion": "Pintada a principios del siglo XVI con la técnica del esfumado, se exhibe en el Museo del Louvre de París.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/270px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    "tipoImagen": "arte"
  },
  {
    "id": "art_02",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué pintor posimpresionista neerlandés creó el icónico cuadro \"La noche estrellada\" desde un sanatorio en Saint-Rémy?",
    "opciones": [
      "Vincent van Gogh",
      "Claude Monet",
      "Paul Cézanne",
      "Edgar Degas"
    ],
    "respuestaCorrecta": "Vincent van Gogh",
    "explicacion": "Pintada en 1889, refleja el cielo turbulento con remolinos de luz y cipreses expresionistas.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/300px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "tipoImagen": "arte"
  },
  {
    "id": "art_03",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién es el autor de la angustiante pintura expresionista \"El grito\" (1893)?",
    "opciones": [
      "Edvard Munch",
      "Gustav Klimt",
      "Wassily Kandinsky",
      "Henri Matisse"
    ],
    "respuestaCorrecta": "Edvard Munch",
    "explicacion": "Munch plasmó una figura andrógina en un puente bajo un cielo rojo llameante que simboliza la ansiedad existencial.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/260px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    "tipoImagen": "arte"
  },
  {
    "id": "art_04",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién esculpió la colosal estatua de mármol del rey David en Florencia?",
    "opciones": [
      "Miguel Ángel Buonarroti",
      "Donatello",
      "Gian Lorenzo Bernini",
      "Leonardo da Vinci"
    ],
    "respuestaCorrecta": "Miguel Ángel Buonarroti",
    "explicacion": "Esculpida entre 1501 y 1504 a partir de un solo bloque de mármol de Carrara, mide más de 5 metros de altura.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Michelangelo%27s_David_original_side_view.jpg/260px-Michelangelo%27s_David_original_side_view.jpg",
    "tipoImagen": "arte"
  },
  {
    "id": "art_05",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién escribió la célebre novela cumbre de la literatura en español \"Don Quijote de la Mancha\"?",
    "opciones": [
      "Miguel de Cervantes",
      "Lope de Vega",
      "Francisco de Quevedo",
      "Pedro Calderón de la Barca"
    ],
    "respuestaCorrecta": "Miguel de Cervantes",
    "explicacion": "Publicada en dos partes (1605 y 1615), es considerada la primera novela moderna universal."
  },
  {
    "id": "art_06",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor español creó el mural cubista \"Guernica\" para denunciar el bombardeo de la ciudad vasca en 1937?",
    "opciones": [
      "Pablo Picasso",
      "Salvador Dalí",
      "Joan Miró",
      "Francisco de Goya"
    ],
    "respuestaCorrecta": "Pablo Picasso",
    "explicacion": "En blanco, negro y gris, el Guernica es uno de los alegatos contra la barbarie bélica más poderosos del siglo XX."
  },
  {
    "id": "art_07",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién pintó la majestuosa obra renacentista \"El nacimiento de Venus\" emergiendo de una concha marina?",
    "opciones": [
      "Sandro Botticelli",
      "Tiziano",
      "Giotto",
      "Tintoretto"
    ],
    "respuestaCorrecta": "Sandro Botticelli",
    "explicacion": "Botticelli la pintó hacia 1485 para la familia Médici y se custodia en la Galería Uffizi de Florencia."
  },
  {
    "id": "art_08",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué artista barroco neerlandés pintó \"La joven de la perla\" (la \"Mona Lisa del Norte\")?",
    "opciones": [
      "Johannes Vermeer",
      "Rembrandt",
      "Frans Hals",
      "Jan Steen"
    ],
    "respuestaCorrecta": "Johannes Vermeer",
    "explicacion": "La obra destaca por el magistral uso de la luz suave y el turbante exótico con el pendiente brillante."
  },
  {
    "id": "art_09",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor surrealista catalán es célebre por sus relojes derretidos en \"La persistencia de la memoria\"?",
    "opciones": [
      "Salvador Dalí",
      "René Magritte",
      "Max Ernst",
      "Giorgio de Chirico"
    ],
    "respuestaCorrecta": "Salvador Dalí",
    "explicacion": "Pintado en 1931, Dalí declaró que la idea de los relojes blandos surgió tras contemplar un queso camembert derritiéndose."
  },
  {
    "id": "art_10",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién escribió las inmortales tragedias teatrales \"Romeo y Julieta\", \"Hamlet\" y \"Macbeth\"?",
    "opciones": [
      "William Shakespeare",
      "Christopher Marlowe",
      "Molière",
      "Oscar Wilde"
    ],
    "respuestaCorrecta": "William Shakespeare",
    "explicacion": "Conocido como el Bardo de Avon, es el dramaturgo más influyente de la lengua inglesa."
  },
  {
    "id": "art_11",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor francés fue el máximo pionero del Impresionismo con su obra \"Impresión, sol naciente\" y sus Nenúfares?",
    "opciones": [
      "Claude Monet",
      "Auguste Renoir",
      "Camille Pissarro",
      "Paul Gauguin"
    ],
    "respuestaCorrecta": "Claude Monet",
    "explicacion": "El crítico Louis Leroy utilizó despectivamente el término \"impresionistas\" inspirado en el cuadro de Monet."
  },
  {
    "id": "art_12",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién esculpió en bronce la famosa figura reflexiva \"El pensador\"?",
    "opciones": [
      "Auguste Rodin",
      "Alberto Giacometti",
      "Constantin Brâncuși",
      "Antonio Canova"
    ],
    "respuestaCorrecta": "Auguste Rodin",
    "explicacion": "Originalmente concebido para representar a Dante Alighieri en su monumental proyecto \"La puerta del Infierno\"."
  },
  {
    "id": "art_13",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién pintó los colosales frescos del techo de la Capilla Sixtina en el Vaticano, incluyendo \"La creación de Adán\"?",
    "opciones": [
      "Miguel Ángel Buonarroti",
      "Rafael Sanzio",
      "Sandro Botticelli",
      "Caravaggio"
    ],
    "respuestaCorrecta": "Miguel Ángel Buonarroti",
    "explicacion": "Miguel Ángel pintó la bóveda durante 4 años acostado sobre andamios a más de 20 metros del suelo."
  },
  {
    "id": "art_14",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la epopeya medieval italiana \"La Divina Comedia\" atravesando el Infierno, el Purgatorio y el Paraíso?",
    "opciones": [
      "Dante Alighieri",
      "Francesco Petrarca",
      "Giovanni Boccaccio",
      "Nicolás Maquiavelo"
    ],
    "respuestaCorrecta": "Dante Alighieri",
    "explicacion": "Escrita en dialecto toscano, estableció el italiano vernáculo como lengua literaria mayor."
  },
  {
    "id": "art_15",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso museo de arte de París fue originalmente una fortaleza y palacio de los reyes de Francia?",
    "opciones": [
      "Museo del Louvre",
      "Museo de Orsay",
      "Centro Pompidou",
      "Palacio de Versalles"
    ],
    "respuestaCorrecta": "Museo del Louvre",
    "explicacion": "Es el museo más visitado del mundo y custodia miles de obras maestras desde la Antigüedad hasta el siglo XIX."
  },
  {
    "id": "art_16",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor austríaco decoró con pan de oro la célebre obra simbolista modernista \"El beso\"?",
    "opciones": [
      "Gustav Klimt",
      "Egon Schiele",
      "Oskar Kokoschka",
      "Alphonse Mucha"
    ],
    "respuestaCorrecta": "Gustav Klimt",
    "explicacion": "Pertenece a la \"Fase Dorada\" de Klimt y se exhibe en el Palacio Belvedere de Viena."
  },
  {
    "id": "art_17",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la novela cumbre del realismo mágico \"Cien años de soledad\" ambientada en Macondo?",
    "opciones": [
      "Gabriel García Márquez",
      "Mario Vargas Llosa",
      "Julio Cortázar",
      "Jorge Luis Borges"
    ],
    "respuestaCorrecta": "Gabriel García Márquez",
    "explicacion": "El escritor colombiano recibió el Premio Nobel de Literatura en 1982 por sus fábulas épicas."
  },
  {
    "id": "art_18",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué pintor barroco español realizó \"Las Meninas\" (La familia de Felipe IV) en 1656?",
    "opciones": [
      "Diego Velázquez",
      "Francisco de Goya",
      "Bartolomé Esteban Murillo",
      "El Greco"
    ],
    "respuestaCorrecta": "Diego Velázquez",
    "explicacion": "Velázquez revolucionó la perspectiva pictórica autorretratándose pintando frente a los reyes."
  },
  {
    "id": "art_19",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué célebre poeta chileno ganó el Premio Nobel de Literatura en 1971 (\"Veinte poemas de amor y una canción desesperada\")?",
    "opciones": [
      "Pablo Neruda",
      "Gabriela Mistral",
      "Vicente Huidobro",
      "Nicanor Parra"
    ],
    "respuestaCorrecta": "Pablo Neruda",
    "explicacion": "Neftalí Reyes (Neruda) es uno de los poetas hispanos más leídos y traducidos del siglo XX."
  },
  {
    "id": "art_20",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién fue la primera mujer latinoamericana en ganar el Premio Nobel de Literatura (1945)?",
    "opciones": [
      "Gabriela Mistral",
      "Isabel Allende",
      "Sor Juana Inés de la Cruz",
      "Alfonsina Storni"
    ],
    "respuestaCorrecta": "Gabriela Mistral",
    "explicacion": "Lucila Godoy Alcayaga (Mistral) fue poetisa, pedagoga y diplomática chilena."
  },
  {
    "id": "art_21",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué arquitecto catalán diseñó el templo expiatorio de la Sagrada Familia y el Park Güell en Barcelona?",
    "opciones": [
      "Antoni Gaudí",
      "Santiago Calatrava",
      "Mies van der Rohe",
      "Le Corbusier"
    ],
    "respuestaCorrecta": "Antoni Gaudí",
    "explicacion": "Máximo exponente del modernismo catalán, sus formas orgánicas se inspiran en la geometría de la naturaleza."
  },
  {
    "id": "art_22",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la monumental epopeya griega \"La Ilíada\" y \"La Odisea\"?",
    "opciones": [
      "Homero",
      "Virgilio",
      "Sófocles",
      "Eurípides"
    ],
    "respuestaCorrecta": "Homero",
    "explicacion": "Narra la Guerra de Troya y el regreso de Odiseo (Ulises) a su reino de Ítaca tras diez años de peripecias."
  },
  {
    "id": "art_23",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué pintora mexicana es mundialmente famosa por sus intensos autorretratos con trajes tradicionales tehuana?",
    "opciones": [
      "Frida Kahlo",
      "Leonora Carrington",
      "Remedios Varo",
      "María Izquierdo"
    ],
    "respuestaCorrecta": "Frida Kahlo",
    "explicacion": "Esposa del muralista Diego Rivera, canalizó su sufrimiento físico y vital en una obra poética y descarnada."
  },
  {
    "id": "art_24",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué movimiento vanguardista del siglo XX buscaba plasmar el mundo de los sueños y el inconsciente liderado por André Breton?",
    "opciones": [
      "El Surrealismo",
      "El Cubismo",
      "El Futurismo",
      "El Dadaísmo"
    ],
    "respuestaCorrecta": "El Surrealismo",
    "explicacion": "Inspirado en el psicoanálisis de Freud, produjo obras oníricas de Dalí, Magritte, Miró y Ernst."
  },
  {
    "id": "art_25",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué pintor barroco italiano revolucionó la pintura mediante el tenebrismo y violentos contrastes de claroscuro?",
    "opciones": [
      "Caravaggio",
      "Bernini",
      "Artemisia Gentileschi",
      "Guido Reni"
    ],
    "respuestaCorrecta": "Caravaggio",
    "explicacion": "Michelangelo Merisi da Caravaggio utilizaba modelos de la calle para representar santos y mártires con crudo realismo."
  },
  {
    "id": "art_26",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la distopía política \"1984\" alertando sobre el Gran Hermano y la vigilancia totalitaria?",
    "opciones": [
      "George Orwell",
      "Aldous Huxley",
      "Ray Bradbury",
      "H.G. Wells"
    ],
    "respuestaCorrecta": "George Orwell",
    "explicacion": "Publicada en 1949, introdujo conceptos como la \"neolengua\", el \"doblepensar\" y el omnipresente Gran Hermano."
  },
  {
    "id": "art_27",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué escultor francés del siglo XIX esculpió la icónica estatua de la Libertad que Francia donó a EE.UU.?",
    "opciones": [
      "Frédéric Auguste Bartholdi",
      "Auguste Rodin",
      "Gustave Eiffel",
      "Antoine Bourdelle"
    ],
    "respuestaCorrecta": "Frédéric Auguste Bartholdi",
    "explicacion": "Eiffel diseñó la armadura metálica interna y Bartholdi moldeó las láminas de cobre exteriores."
  },
  {
    "id": "art_28",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió \"El principito\" (Le Petit Prince), la entrañable fábula poética sobre un niño que cuida una rosa en el asteroide B-612?",
    "opciones": [
      "Antoine de Saint-Exupéry",
      "Albert Camus",
      "Jean-Paul Sartre",
      "Victor Hugo"
    ],
    "respuestaCorrecta": "Antoine de Saint-Exupéry",
    "explicacion": "Aviador y escritor francés, su obra ha sido traducida a más de 300 idiomas y dialectos."
  },
  {
    "id": "art_29",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor neerlandés barroco pintó la colosal escena nocturna \"Ronda de noche\" (La milicia del capitán Banning Cocq)?",
    "opciones": [
      "Rembrandt van Rijn",
      "Johannes Vermeer",
      "Frans Hals",
      "Pieter Brueghel"
    ],
    "respuestaCorrecta": "Rembrandt van Rijn",
    "explicacion": "Rembrandt innovó al dotar de dinamismo y acción dramática a lo que solía ser un rígido retrato corporativo de guardia cívica."
  },
  {
    "id": "art_30",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué célebre novela de Mary Shelley de 1818 inauguró el género de la ciencia ficción moderna mediante la creación de un monstruo?",
    "opciones": [
      "Frankenstein",
      "Drácula",
      "El extraño caso del Dr. Jekyll y Mr. Hyde",
      "El retrato de Dorian Gray"
    ],
    "respuestaCorrecta": "Frankenstein",
    "explicacion": "Shelley escribió la historia durante una noche de tormenta en Villa Diodati a orillas del lago Lemán."
  },
  {
    "id": "dep_01",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué país ha ganado más Copas del Mundo de la FIFA en la historia del fútbol masculino?",
    "opciones": [
      "Brasil (5 títulos)",
      "Alemania (4)",
      "Italia (4)",
      "Argentina (3)"
    ],
    "respuestaCorrecta": "Brasil (5 títulos)",
    "explicacion": "La Canarinha se coronó campeona en 1958, 1962, 1970, 1994 y 2002."
  },
  {
    "id": "dep_02",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cada cuántos años se celebran los Juegos Olímpicos de Verano?",
    "opciones": [
      "Cada 4 años",
      "Cada 2 años",
      "Cada 3 años",
      "Cada 5 años"
    ],
    "respuestaCorrecta": "Cada 4 años",
    "explicacion": "La periodicidad de 4 años se hereda de las olimpíadas de la Antigua Grecia."
  },
  {
    "id": "dep_03",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Quién es el velocista jamaicano plusmarquista mundial de 100 y 200 metros planos conocido como \"Relámpago\"?",
    "opciones": [
      "Usain Bolt",
      "Carl Lewis",
      "Tyson Gay",
      "Asafa Powell"
    ],
    "respuestaCorrecta": "Usain Bolt",
    "explicacion": "Bolt cronometró un asombroso récord de 9,58 segundos en los 100 metros del Mundial de Berlín 2009."
  },
  {
    "id": "dep_04",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué tenista español ostenta el récord absoluto de 14 títulos individuales en el torneo de Roland Garros?",
    "opciones": [
      "Rafael Nadal",
      "Roger Federer",
      "Novak Djokovic",
      "Carlos Alcaraz"
    ],
    "respuestaCorrecta": "Rafael Nadal",
    "explicacion": "Nadal dominó la tierra batida parisina como ningún otro deportista en la historia del tenis."
  },
  {
    "id": "dep_05",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué deporte destacó Michael Jordan como la máxima estrella de los Chicago Bulls en los años 90?",
    "opciones": [
      "Baloncesto (Básquetbol)",
      "Béisbol",
      "Fútbol americano",
      "Golf"
    ],
    "respuestaCorrecta": "Baloncesto (Básquetbol)",
    "explicacion": "Jordan ganó 6 campeonatos de la NBA y es considerado por muchos el mejor baloncestista de todos los tiempos."
  },
  {
    "id": "dep_06",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Quién es el nadador estadounidense más condecorado de la historia olímpica con 28 medallas (23 de oro)?",
    "opciones": [
      "Michael Phelps",
      "Mark Spitz",
      "Ryan Lochte",
      "Ian Thorpe"
    ],
    "respuestaCorrecta": "Michael Phelps",
    "explicacion": "Phelps logró la proeza inigualada de colgarse 8 oros en una sola edición en Pekín 2008."
  },
  {
    "id": "dep_07",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cuántos jugadores componen un equipo en el terreno de juego en un partido oficial de fútbol profesional?",
    "opciones": [
      "11 jugadores",
      "9 jugadores",
      "10 jugadores",
      "12 jugadores"
    ],
    "respuestaCorrecta": "11 jugadores",
    "explicacion": "Cada equipo juega con 10 futbolistas de campo más el guardameta (portero)."
  },
  {
    "id": "dep_08",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿En qué país y ciudad se celebraron los primeros Juegos Olímpicos de la era moderna en 1896?",
    "opciones": [
      "Atenas, Grecia",
      "París, Francia",
      "Londres, Reino Unido",
      "Roma, Italia"
    ],
    "respuestaCorrecta": "Atenas, Grecia",
    "explicacion": "El barón Pierre de Coubertin refundó las olimpiadas reuniendo a 14 naciones en el Estadio Panathinaikó."
  },
  {
    "id": "dep_09",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama la legendaria carrera ciclista por etapas de tres semanas que se disputa en Francia en julio?",
    "opciones": [
      "El Tour de Francia",
      "El Giro de Italia",
      "La Vuelta a España",
      "París-Roubaix"
    ],
    "respuestaCorrecta": "El Tour de Francia",
    "explicacion": "El ganador de la clasificación general viste el codiciado maillot amarillo (maillot jaune)."
  },
  {
    "id": "dep_10",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿En qué deporte de raqueta se golpea un volante o pluma en lugar de una pelota convencional?",
    "opciones": [
      "Bádminton",
      "Squash",
      "Tenis de mesa",
      "Pádel"
    ],
    "respuestaCorrecta": "Bádminton",
    "explicacion": "El volante puede alcanzar velocidades de más de 400 km/h al ser rematado por profesionales."
  },
  {
    "id": "dep_11",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué legendario boxeador se autoproclamaba \"El más grande\" y flotaba como mariposa y picaba como abeja?",
    "opciones": [
      "Muhammad Ali (Cassius Clay)",
      "Mike Tyson",
      "Joe Frazier",
      "Sugar Ray Robinson"
    ],
    "respuestaCorrecta": "Muhammad Ali (Cassius Clay)",
    "explicacion": "Ali fue triple campeón mundial de peso pesado y un ícono global de la lucha por los derechos civiles."
  },
  {
    "id": "dep_12",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cuál es la distancia exacta oficial de una carrera de maratón completa?",
    "opciones": [
      "42,195 kilómetros",
      "40 kilómetros",
      "45 kilómetros",
      "42,500 kilómetros"
    ],
    "respuestaCorrecta": "42,195 kilómetros",
    "explicacion": "La distancia exacta se fijó en los Juegos Olímpicos de Londres 1908 para finalizar frente al palco real del Castillo de Windsor."
  },
  {
    "id": "dep_13",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué deporte de pelota se utiliza un bate y los jugadores corren alrededor de cuatro bases?",
    "opciones": [
      "Béisbol",
      "Cricket",
      "Rugby",
      "Polo"
    ],
    "respuestaCorrecta": "Béisbol",
    "explicacion": "El béisbol es conocido como el \"pasatiempo nacional\" de EE.UU. y goza de inmensa popularidad en el Caribe y Japón."
  },
  {
    "id": "dep_14",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué selección nacional de fútbol conquistó el Mundial de Qatar 2022 capitaneada por Lionel Messi?",
    "opciones": [
      "Argentina",
      "Francia",
      "Croacia",
      "Marruecos"
    ],
    "respuestaCorrecta": "Argentina",
    "explicacion": "Argentina sumó su tercera estrella mundialista tras vencer a Francia en una emocionante tanda de penales."
  },
  {
    "id": "dep_15",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cuántos puntos vale una canasta encestada desde más allá de la línea perimetral exterior en baloncesto?",
    "opciones": [
      "3 puntos",
      "2 puntos",
      "4 puntos",
      "1 punto"
    ],
    "respuestaCorrecta": "3 puntos",
    "explicacion": "El tiro triple fue adoptado por la NBA en 1979 revolucionando el juego ofensivo moderno."
  },
  {
    "id": "dep_16",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué piloto de Fórmula 1 brasileño fue tricampeón mundial y es considerado uno de los más veloces y míticos de la historia?",
    "opciones": [
      "Ayrton Senna",
      "Alain Prost",
      "Michael Schumacher",
      "Nelson Piquet"
    ],
    "respuestaCorrecta": "Ayrton Senna",
    "explicacion": "Senna deslumbraba por su maestría pilotando bajo la lluvia torrencial antes de su trágico accidente en Imola 1994."
  },
  {
    "id": "dep_17",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué país es el hogar y cuna tradicional del haka, la imponente danza maorí previa a los partidos de rugby?",
    "opciones": [
      "Nueva Zelanda (All Blacks)",
      "Australia",
      "Sudáfrica",
      "Fiyi"
    ],
    "respuestaCorrecta": "Nueva Zelanda (All Blacks)",
    "explicacion": "Los All Blacks ejecutan el Ka Mate o Kapa o Pango para desafiar al rival y concentrar energía."
  },
  {
    "id": "dep_18",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué torneo de tenis se juega tradicionalmente sobre pistas de hierba natural en Londres obligando a vestir de blanco?",
    "opciones": [
      "Wimbledon",
      "Abierto de Australia",
      "US Open",
      "Roland Garros"
    ],
    "respuestaCorrecta": "Wimbledon",
    "explicacion": "Fundado en 1877, Wimbledon es el torneo de tenis más antiguo y distinguido del circuito internacional."
  },
  {
    "id": "dep_19",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cuántos jugadores por equipo juegan simultáneamente dentro de la piscina en un partido de waterpolo?",
    "opciones": [
      "7 jugadores",
      "6 jugadores",
      "8 jugadores",
      "5 jugadores"
    ],
    "respuestaCorrecta": "7 jugadores",
    "explicacion": "Se compone de 6 jugadores de campo y 1 portero, quienes no pueden tocar el fondo de la piscina."
  },
  {
    "id": "dep_20",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué astro brasileño es el único futbolista en haber ganado tres Copas Mundiales de la FIFA como jugador (1958, 1962, 1970)?",
    "opciones": [
      "Pelé (Edson Arantes do Nascimento)",
      "Garrincha",
      "Ronaldo Nazário",
      "Romário"
    ],
    "respuestaCorrecta": "Pelé (Edson Arantes do Nascimento)",
    "explicacion": "\"O Rei\" anotó más de 1.000 goles a lo largo de su carrera deportiva entre el Santos y la selección brasileña."
  },
  {
    "id": "dep_21",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿En qué deporte de invierno sobre hielo los equipos deslizan pesadas piedras de granito pulido hacia una diana mientras barren?",
    "opciones": [
      "Curling",
      "Hockey sobre hielo",
      "Bobsleigh",
      "Skeleton"
    ],
    "respuestaCorrecta": "Curling",
    "explicacion": "El barrido con escobas calienta el hielo reduciendo la fricción para controlar trayectoria y distancia."
  },
  {
    "id": "dep_22",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cuántos anillos de distintos colores componen el símbolo oficial de los Juegos Olímpicos?",
    "opciones": [
      "5 anillos (azul, amarillo, negro, verde, rojo)",
      "4 anillos",
      "6 anillos",
      "7 anillos"
    ],
    "respuestaCorrecta": "5 anillos (azul, amarillo, negro, verde, rojo)",
    "explicacion": "Diseñados en 1913, representan los cinco continentes unidos en el espíritu deportivo olímpico."
  },
  {
    "id": "dep_23",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué gimnasta rumana de 14 años logró el primer \"10 perfecto\" en la historia olímpica en Montreal 1976?",
    "opciones": [
      "Nadia Comăneci",
      "Olga Korbut",
      "Simone Biles",
      "Svetlana Khorkina"
    ],
    "respuestaCorrecta": "Nadia Comăneci",
    "explicacion": "El marcador digital no estaba programado para cuatro dígitos y mostró \"1.00\" por falta de espacio para el 10.00."
  },
  {
    "id": "dep_24",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué deporte ecuestre dos equipos montados a caballo intentan marcar goles con una bocha impulsada con tacos de madera?",
    "opciones": [
      "Polo",
      "Doma clásica",
      "Salto ecuestre",
      "Rodeo"
    ],
    "respuestaCorrecta": "Polo",
    "explicacion": "El polo se juega habitualmente en campos de césped divididos en tiempos denominados chukkers."
  },
  {
    "id": "dep_25",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué tenista suizo es apodado \"Su Majestad\" por su estilo elegante y ganó 20 títulos de Grand Slam?",
    "opciones": [
      "Roger Federer",
      "Stan Wawrinka",
      "Björn Borg",
      "Pete Sampras"
    ],
    "respuestaCorrecta": "Roger Federer",
    "explicacion": "Federer cautivó al público durante dos décadas con su revés a una mano y récord de 8 coronas en Wimbledon."
  },
  {
    "id": "can_01",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué legendaria banda de rock británica liderada por Freddie Mercury compuso \"Bohemian Rhapsody\"?",
    "opciones": [
      "Queen",
      "The Beatles",
      "The Rolling Stones",
      "Led Zeppelin"
    ],
    "respuestaCorrecta": "Queen",
    "explicacion": "Lanzada en 1975 en el álbum <em>A Night at the Opera</em>, combina balada, ópera y hard rock sinfónico."
  },
  {
    "id": "can_02",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Quién es el artista conocido como el \"Rey del Pop\", creador de álbumes históricos como \"Thriller\" y \"Bad\"?",
    "opciones": [
      "Michael Jackson",
      "Prince",
      "Stevie Wonder",
      "Elton John"
    ],
    "respuestaCorrecta": "Michael Jackson",
    "explicacion": "<em>Thriller</em> (1982) sigue siendo el álbum más vendido de la historia con más de 70 millones de copias."
  },
  {
    "id": "can_03",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿De qué ciudad inglesa eran originarios los \"cuatro de Liverpool\" (The Beatles)?",
    "opciones": [
      "Liverpool",
      "Londres",
      "Mánchester",
      "Birmingham"
    ],
    "respuestaCorrecta": "Liverpool",
    "explicacion": "John Lennon, Paul McCartney, George Harrison y Ringo Starr iniciaron su leyenda en el mítico pub The Cavern."
  },
  {
    "id": "can_04",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el genial compositor clásico austríaco que compuso sinfonías y óperas como niño prodigio desde los 5 años?",
    "opciones": [
      "Wolfgang Amadeus Mozart",
      "Ludwig van Beethoven",
      "Johann Sebastian Bach",
      "Frédéric Chopin"
    ],
    "respuestaCorrecta": "Wolfgang Amadeus Mozart",
    "explicacion": "A pesar de morir a los 35 años, Mozart compuso más de 600 obras maestras como <em>La flauta mágica</em> y el <em>Réquiem</em>."
  },
  {
    "id": "can_05",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué compositor alemán continuó escribiendo colosales obras como la Novena Sinfonía a pesar de quedar completamente sordo?",
    "opciones": [
      "Ludwig van Beethoven",
      "Richard Wagner",
      "Johannes Brahms",
      "Franz Schubert"
    ],
    "respuestaCorrecta": "Ludwig van Beethoven",
    "explicacion": "Beethoven apoyaba una vara de madera entre su piano y sus dientes para percibir las vibraciones mecánicas."
  },
  {
    "id": "can_06",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Quién es conocido mundialmente como el \"Rey del Rock and Roll\" por éxitos como \"Jailhouse Rock\" y \"Hound Dog\"?",
    "opciones": [
      "Elvis Presley",
      "Chuck Berry",
      "Buddy Holly",
      "Little Richard"
    ],
    "respuestaCorrecta": "Elvis Presley",
    "explicacion": "Su voz barítona y movimientos de cadera causaron sensación en Graceland y la televisión de los años 50."
  },
  {
    "id": "can_07",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué mítica banda de rock británica compuso los álbumes conceptuales \"The Dark Side of the Moon\" y \"The Wall\"?",
    "opciones": [
      "Pink Floyd",
      "The Who",
      "Genesis",
      "Deep Purple"
    ],
    "respuestaCorrecta": "Pink Floyd",
    "explicacion": "Roger Waters y David Gilmour crearon algunas de las atmósferas psicodélicas y progresivas más aclamadas de la música."
  },
  {
    "id": "can_08",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante colombiana ha triunfado a nivel global con éxitos como \"Hips Don't Lie\", \"Whenever, Wherever\" y \"Waka Waka\"?",
    "opciones": [
      "Shakira",
      "Karol G",
      "Rosalía",
      "Jennifer Lopez"
    ],
    "respuestaCorrecta": "Shakira",
    "explicacion": "Shakira es una de las artistas latinas más influyentes y premiadas del pop internacional."
  },
  {
    "id": "can_09",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué famoso cuarteto pop sueco ganó Eurovisión 1974 con \"Waterloo\" y arrasó con \"Dancing Queen\"?",
    "opciones": [
      "ABBA",
      "Roxette",
      "A-ha",
      "Ace of Base"
    ],
    "respuestaCorrecta": "ABBA",
    "explicacion": "Formado por Agnetha, Björn, Benny y Anni-Frid, sus iniciales dieron nombre al grupo."
  },
  {
    "id": "can_10",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué instrumento musical de viento metal posee tres pistones y un tubo enrollado con una campana ancha?",
    "opciones": [
      "La trompeta",
      "El trombón",
      "El saxofón",
      "La flauta traversa"
    ],
    "respuestaCorrecta": "La trompeta",
    "explicacion": "La trompeta es el instrumento de registro más agudo de la familia de viento metal."
  },
  {
    "id": "can_11",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Quién fue el pionero jamaicano y máximo profeta del reggae con canciones como \"No Woman, No Cry\" y \"One Love\"?",
    "opciones": [
      "Bob Marley",
      "Peter Tosh",
      "Jimmy Cliff",
      "Toots Hibbert"
    ],
    "respuestaCorrecta": "Bob Marley",
    "explicacion": "Junto a The Wailers difundió el mensaje de paz, justicia y cultura rastafari por los cinco continentes."
  },
  {
    "id": "can_12",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué instrumento de percusión de teclado está compuesto por láminas de madera afinadas que se golpean con baquetas?",
    "opciones": [
      "El xilófono",
      "El metalófono",
      "El timbal",
      "El triángulo"
    ],
    "respuestaCorrecta": "El xilófono",
    "explicacion": "Su nombre proviene del griego <em>xylon</em> (madera) y <em>phone</em> (sonido)."
  },
  {
    "id": "can_13",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué cantante británica de poderosa voz soul batió récords de ventas con sus álbumes \"21\" y \"25\" (\"Rolling in the Deep\", \"Hello\")?",
    "opciones": [
      "Adele",
      "Amy Winehouse",
      "Dua Lipa",
      "Ellie Goulding"
    ],
    "respuestaCorrecta": "Adele",
    "explicacion": "Adele ha ganado 16 premios Grammy y un premio Óscar por la canción del film de James Bond <em>Skyfall</em>."
  },
  {
    "id": "can_14",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Cuántas cuerdas suele tener una guitarra acústica o clásica estándar?",
    "opciones": [
      "6 cuerdas",
      "4 cuerdas",
      "5 cuerdas",
      "8 cuerdas"
    ],
    "respuestaCorrecta": "6 cuerdas",
    "explicacion": "La afinación habitual de más grave a más aguda es Mi, La, Re, Sol, Si, Mi (E-A-D-G-B-E)."
  },
  {
    "id": "can_15",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué influyente banda de rock liderada por Kurt Cobain popularizó el movimiento grunge en Seattle con \"Smells Like Teen Spirit\"?",
    "opciones": [
      "Nirvana",
      "Pearl Jam",
      "Soundgarden",
      "Alice in Chains"
    ],
    "respuestaCorrecta": "Nirvana",
    "explicacion": "El álbum <em>Nevermind</em> (1991) desplazó a Michael Jackson del número 1 de Billboard marcando a una generación."
  },
  {
    "id": "can_16",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama la famosa ópera de Georges Bizet ambientada en Sevilla cuya protagonista es una gitana cigarrera?",
    "opciones": [
      "Carmen",
      "La Traviata",
      "Madama Butterfly",
      "La flauta mágica"
    ],
    "respuestaCorrecta": "Carmen",
    "explicacion": "Incluye arias memorables como la \"Habanera\" y la \"Canción del toreador\"."
  },
  {
    "id": "can_17",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué legendario guitarrista estadounidense incendió su propia guitarra en el Festival de Monterey y tocó en Woodstock en 1969?",
    "opciones": [
      "Jimi Hendrix",
      "Eric Clapton",
      "Jimmy Page",
      "B.B. King"
    ],
    "respuestaCorrecta": "Jimi Hendrix",
    "explicacion": "Hendrix revolucionó el sonido de la guitarra eléctrica utilizando pedales fuzz, wah-wah y retroalimentación controlada."
  },
  {
    "id": "can_18",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Cuál de estos cantantes es apodado \"La Voz\" y popularizó \"My Way\" y \"Fly Me to the Moon\"?",
    "opciones": [
      "Frank Sinatra",
      "Dean Martin",
      "Tony Bennett",
      "Nat King Cole"
    ],
    "respuestaCorrecta": "Frank Sinatra",
    "explicacion": "Sinatra fue una figura titánica de la música melódica, el swing y el cine estadounidense clásico."
  },
  {
    "id": "can_19",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda de hard rock australiana liderada por los hermanos Young compuso himnos como \"Highway to Hell\" y \"Back in Black\"?",
    "opciones": [
      "AC/DC",
      "Guns N' Roses",
      "Aerosmith",
      "Def Leppard"
    ],
    "respuestaCorrecta": "AC/DC",
    "explicacion": "<em>Back in Black</em> (1980), con Angus Young en su uniforme escolar, es el segundo álbum más vendido de la historia."
  },
  {
    "id": "can_20",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué instrumento de viento madera con lengüeta simple de caña fue patentado por Adolphe Sax en Bélgica?",
    "opciones": [
      "El saxofón",
      "El clarinete",
      "El oboe",
      "El fagot"
    ],
    "respuestaCorrecta": "El saxofón",
    "explicacion": "Aunque es de latón dorado, se clasifica como viento madera porque el sonido lo origina una caña vibratoria."
  },
  {
    "id": "can_21",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué canción del compositor puertorriqueño Luis Fonsi junto a Daddy Yankee se convirtió en el video musical más visto de YouTube en 2017?",
    "opciones": [
      "Despacito",
      "Bailando",
      "Danza Kuduro",
      "Gasolina"
    ],
    "respuestaCorrecta": "Despacito",
    "explicacion": "El hit global superó las 8 mil millones de reproducciones y lideró listas en más de 40 países."
  },
  {
    "id": "can_22",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué compositor barroco alemán escribió las célebres \"Cuatro Estaciones\", un conjunto de cuatro conciertos para violín?",
    "opciones": [
      "Antonio Vivaldi",
      "Johann Sebastian Bach",
      "Georg Friedrich Händel",
      "Claudio Monteverdi"
    ],
    "respuestaCorrecta": "Antonio Vivaldi",
    "explicacion": "Vivaldi (\"El cura rojo\") compuso música descriptiva que imita cantos de pájaros en primavera y tormentas de verano."
  },
  {
    "id": "can_23",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda de pop-rock irlandesa liderada por Bono compuso álbumes como \"The Joshua Tree\" y temas como \"With or Without You\"?",
    "opciones": [
      "U2",
      "The Cranberries",
      "The Corrs",
      "Snow Patrol"
    ],
    "respuestaCorrecta": "U2",
    "explicacion": "Con The Edge en la guitarra, U2 es una de las bandas más galardonadas con 22 premios Grammy."
  },
  {
    "id": "can_24",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué instrumento musical de percusión consiste en dos pequeños tambores cónicos unidos y tocados con las manos?",
    "opciones": [
      "Bongos",
      "Congas",
      "Timbales",
      "Batería"
    ],
    "respuestaCorrecta": "Bongos",
    "explicacion": "Originarios del este de Cuba, son fundamentales en el son cubano, la salsa y los ritmos afrocaribeños."
  },
  {
    "id": "can_25",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda británica de rock compuesta por Mick Jagger y Keith Richards tiene como logo una lengua roja afuera?",
    "opciones": [
      "The Rolling Stones",
      "The Who",
      "The Kinks",
      "The Clash"
    ],
    "respuestaCorrecta": "The Rolling Stones",
    "explicacion": "El célebre diseño \"Hot Lips\" fue creado por John Pasche en 1970 para el álbum <em>Sticky Fingers</em>."
  },
  {
    "id": "pel_01",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué director estadounidense dirigió clásicos legendarios como \"Tiburón\", \"E.T. el extraterrestre\" y \"Jurassic Park\"?",
    "opciones": [
      "Steven Spielberg",
      "George Lucas",
      "James Cameron",
      "Martin Scorsese"
    ],
    "respuestaCorrecta": "Steven Spielberg",
    "explicacion": "Spielberg es el cineasta más taquillero de todos los tiempos y pionero del concepto moderno de blockbuster de verano."
  },
  {
    "id": "pel_02",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el androide de protocolo dorado en la saga \"Star Wars\" que acompaña a R2-D2?",
    "opciones": [
      "C-3PO",
      "BB-8",
      "Boba Fett",
      "K-2SO"
    ],
    "respuestaCorrecta": "C-3PO",
    "explicacion": "Diseñado por George Lucas e interpretado por Anthony Daniels, habla más de seis millones de formas de comunicación."
  },
  {
    "id": "pel_03",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué película de James Cameron de 1997 ganó 11 premios Óscar narrando el romance entre Jack Dawson y Rose DeWitt?",
    "opciones": [
      "Titanic",
      "Avatar",
      "Terminator 2",
      "El secreto del abismo"
    ],
    "respuestaCorrecta": "Titanic",
    "explicacion": "Protagonizada por Leonardo DiCaprio y Kate Winslet, recreó minuciosamente el naufragio de 1912."
  },
  {
    "id": "pel_04",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actor estadounidense interpretó al excéntrico capitán Jack Sparrow en la saga \"Piratas del Caribe\"?",
    "opciones": [
      "Johnny Depp",
      "Orlando Bloom",
      "Brad Pitt",
      "Tom Cruise"
    ],
    "respuestaCorrecta": "Johnny Depp",
    "explicacion": "Depp basó su peculiar interpretación en el guitarrista de los Rolling Stones, Keith Richards."
  },
  {
    "id": "pel_05",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿En qué trilogía cinematográfica de fantasía dirigida por Peter Jackson los hobbits deben destruir el Anillo Único en el Monte del Destino?",
    "opciones": [
      "El Señor de los Anillos",
      "Las crónicas de Narnia",
      "Harry Potter",
      "Eragon"
    ],
    "respuestaCorrecta": "El Señor de los Anillos",
    "explicacion": "La tercera entrega, <em>El retorno del rey</em> (2003), arrasó ganando los 11 premios Óscar a los que estaba nominada."
  },
  {
    "id": "pel_06",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el colegio de magia y hechicería al que asiste Harry Potter en las novelas de J.K. Rowling?",
    "opciones": [
      "Hogwarts",
      "Ilvermorny",
      "Beauxbatons",
      "Durmstrang"
    ],
    "respuestaCorrecta": "Hogwarts",
    "explicacion": "Hogwarts cuenta con cuatro casas fundadoras: Gryffindor, Slytherin, Ravenclaw y Hufflepuff."
  },
  {
    "id": "pel_07",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película animada del estudio Pixar en 1995 fue el primer largometraje de la historia realizado completamente por computadora?",
    "opciones": [
      "Toy Story",
      "Bichos",
      "Monsters, Inc.",
      "Buscando a Nemo"
    ],
    "respuestaCorrecta": "Toy Story",
    "explicacion": "Dirigida por John Lasseter, narró la amistad y rivalidad entre el vaquero Woody y el astronauta Buzz Lightyear."
  },
  {
    "id": "pel_08",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué superhéroe encapuchado cuida la sombría ciudad ficticia de Gotham City bajo la identidad secreta de Bruce Wayne?",
    "opciones": [
      "Batman",
      "Superman",
      "Spider-Man",
      "Iron Man"
    ],
    "respuestaCorrecta": "Batman",
    "explicacion": "Creado por Bob Kane y Bill Finger en 1939, carece de superpoderes alienígenas y depende de su intelecto y tecnología."
  },
  {
    "id": "pel_09",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué director británico es considerado el \"Amo del Suspense\" por obras maestras como \"Psicosis\", \"Vértigo\" y \"La ventana indiscreta\"?",
    "opciones": [
      "Alfred Hitchcock",
      "Stanley Kubrick",
      "Ridley Scott",
      "Christopher Nolan"
    ],
    "respuestaCorrecta": "Alfred Hitchcock",
    "explicacion": "Hitchcock fue pionero en el uso de planos subjetivos y giros psicológicos inesperados en el cine."
  },
  {
    "id": "pel_10",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actor interpretó al boxeador Rocky Balboa y al veterano de Vietnam John Rambo en el cine de acción?",
    "opciones": [
      "Sylvester Stallone",
      "Arnold Schwarzenegger",
      "Jean-Claude Van Damme",
      "Bruce Willis"
    ],
    "respuestaCorrecta": "Sylvester Stallone",
    "explicacion": "Stallone escribió el guion de <em>Rocky</em> (1976) que ganó el Óscar a Mejor Película."
  },
  {
    "id": "pel_11",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película de ciencia ficción de Christopher Nolan viaja a través de un agujero de gusano cerca de Saturno en busca de un nuevo hogar para la humanidad?",
    "opciones": [
      "Interestelar",
      "El origen (Inception)",
      "Tenet",
      "Gravedad"
    ],
    "respuestaCorrecta": "Interestelar",
    "explicacion": "Contó con el asesoramiento del físico teórico y Premio Nobel Kip Thorne para simular el agujero negro Gargantúa."
  },
  {
    "id": "pel_12",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el nombre del león protagonista que debe reclamar su lugar como rey en la sabana africana en el clásico animado de Disney?",
    "opciones": [
      "Simba",
      "Mufasa",
      "Scar",
      "Timón"
    ],
    "respuestaCorrecta": "Simba",
    "explicacion": "<em>El Rey León</em> (1994) se inspiró libremente en la tragedia <em>Hamlet</em> de Shakespeare."
  },
  {
    "id": "pel_13",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué director japonés de animación fundó Studio Ghibli y dirigió obras maestras como \"El viaje de Chihiro\" y \"Mi vecino Totoro\"?",
    "opciones": [
      "Hayao Miyazaki",
      "Isao Takahata",
      "Makoto Shinkai",
      "Satoshi Kon"
    ],
    "respuestaCorrecta": "Hayao Miyazaki",
    "explicacion": "<em>El viaje de Chihiro</em> (2001) ganó el Óscar a Mejor Película de Animación y el Oso de Oro de Berlín."
  },
  {
    "id": "pel_14",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué película de mafiosos de 1972 dirigida por Francis Ford Coppola narra la saga de la familia Corleone?",
    "opciones": [
      "El Padrino",
      "Buenos muchachos (Goodfellas)",
      "Scarface",
      "Casino"
    ],
    "respuestaCorrecta": "El Padrino",
    "explicacion": "Protagonizada por Marlon Brando y Al Pacino, es considerada una de las mejores películas de la historia del cine."
  },
  {
    "id": "pel_15",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Quién interpretó al androide T-800 que viaja en el tiempo y pronuncia la mítica frase \"Hasta la vista, baby\"?",
    "opciones": [
      "Arnold Schwarzenegger",
      "Sylvester Stallone",
      "Kurt Russell",
      "Harrison Ford"
    ],
    "respuestaCorrecta": "Arnold Schwarzenegger",
    "explicacion": "Dirigida por James Cameron en 1991, <em>Terminator 2</em> fue un hito en efectos especiales CGI."
  },
  {
    "id": "pel_16",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué arqueólogo aventurero con látigo y sombrero fedora interpreta Harrison Ford en busca del Arca Perdida?",
    "opciones": [
      "Indiana Jones",
      "Han Solo",
      "Rick O'Connell",
      "Alan Grant"
    ],
    "respuestaCorrecta": "Indiana Jones",
    "explicacion": "Creado conjuntamente por George Lucas y Steven Spielberg en homenaje a los seriales de los años 30."
  },
  {
    "id": "pel_17",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué director surcoreano hizo historia al ganar 4 premios Óscar (incluyendo Mejor Película) en 2020 con \"Parásitos\" (Parasite)?",
    "opciones": [
      "Bong Joon-ho",
      "Park Chan-wook",
      "Kim Ki-duk",
      "Lee Chang-dong"
    ],
    "respuestaCorrecta": "Bong Joon-ho",
    "explicacion": "Fue la primera película en idioma no inglés en ganar el Óscar a Mejor Película en los 92 años de historia del certamen."
  },
  {
    "id": "pel_18",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el ogro verde de DreamWorks que vive en un pantano y se enamora de la princesa Fiona?",
    "opciones": [
      "Shrek",
      "Sulley",
      "Hulk",
      "Ralph"
    ],
    "respuestaCorrecta": "Shrek",
    "explicacion": "Ganó el primer Óscar concedido a la Mejor Película de Animación en 2002."
  },
  {
    "id": "pel_19",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué actor interpretó al Joker de forma póstuma y ganó el Óscar por su escalofriante actuación en \"El caballero de la noche\" (2008)?",
    "opciones": [
      "Heath Ledger",
      "Joaquin Phoenix",
      "Jack Nicholson",
      "Jared Leto"
    ],
    "respuestaCorrecta": "Heath Ledger",
    "explicacion": "Ledger creó una interpretación anárquica e inolvidable bajo la dirección de Christopher Nolan."
  },
  {
    "id": "pel_20",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué personaje de Disney pierde una zapatilla de cristal en la escalinata del palacio a medianoche?",
    "opciones": [
      "Cenicienta",
      "Blancanieves",
      "La Bella Durmiente",
      "Ariel"
    ],
    "respuestaCorrecta": "Cenicienta",
    "explicacion": "El hechizo del hada madrina que convierte una calabaza en carruaje cesa al sonar las doce campanadas."
  },
  {
    "id": "pel_21",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película de Stanley Kubrick de 1968 revolucionó el cine espacial con la computadora inteligente rebelde HAL 9000?",
    "opciones": [
      "2001: Odisea del espacio",
      "La naranja mecánica",
      "Blade Runner",
      "Solaris"
    ],
    "respuestaCorrecta": "2001: Odisea del espacio",
    "explicacion": "Kubrick y el escritor Arthur C. Clarke imaginaron el viaje interplanetario con precisión científica y el vals del Danubio azul."
  },
  {
    "id": "pel_22",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actor interpretó a Neo en la revolucionaria saga de ciencia ficción cibernética \"The Matrix\" (1999)?",
    "opciones": [
      "Keanu Reeves",
      "Will Smith",
      "Tom Cruise",
      "Brad Pitt"
    ],
    "respuestaCorrecta": "Keanu Reeves",
    "explicacion": "Reeves popularizó las escenas de artes marciales y el innovador efecto visual \"bullet time\" (tiempo bala)."
  },
  {
    "id": "pel_23",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué famosa estatuilla dorada entrega anualmente la Academia de Artes y Ciencias Cinematográficas de Hollywood?",
    "opciones": [
      "El Premio Óscar",
      "El Globo de Oro",
      "La Palma de Oro",
      "El León de Oro"
    ],
    "respuestaCorrecta": "El Premio Óscar",
    "explicacion": "El diseño original de la estatuilla representa a un caballero sobre un rollo de película sosteniendo una espada de cruzado."
  },
  {
    "id": "pel_24",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actriz británica protagonizó \"Mary Poppins\", \"La novicia rebelde\" (Sonrisas y lágrimas) y prestó su voz a la reina de Genovia?",
    "opciones": [
      "Julie Andrews",
      "Audrey Hepburn",
      "Meryl Streep",
      "Maggie Smith"
    ],
    "respuestaCorrecta": "Julie Andrews",
    "explicacion": "Andrews ganó el Óscar por interpretar a la mágica niñera que desciende del cielo con su paraguas volador."
  },
  {
    "id": "pel_25",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué director mexicano ha ganado el Óscar a Mejor Director por \"La forma del agua\" y recreó \"Pinocho\" en stop-motion?",
    "opciones": [
      "Guillermo del Toro",
      "Alejandro González Iñárritu",
      "Alfonso Cuarón",
      "Robert Rodriguez"
    ],
    "respuestaCorrecta": "Guillermo del Toro",
    "explicacion": "Del Toro es célebre por su fascinación poética hacia los monstruos y el cine gótico fantástico."
  },
  {
    "id": "tec_01",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Quién cofundó Apple junto a Steve Wozniak en un garaje y presentó el primer iPhone revolucionario en 2007?",
    "opciones": [
      "Steve Jobs",
      "Bill Gates",
      "Mark Zuckerberg",
      "Jeff Bezos"
    ],
    "respuestaCorrecta": "Steve Jobs",
    "explicacion": "Jobs transformó la informática personal, la música digital con el iPod y la telefonía móvil con la pantalla táctil capacitiva."
  },
  {
    "id": "tec_02",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué significan las siglas \"WWW\" en las direcciones de las páginas de internet?",
    "opciones": [
      "World Wide Web",
      "World Wide Wireless",
      "Web Wide World",
      "World Wireless Web"
    ],
    "respuestaCorrecta": "World Wide Web",
    "explicacion": "El científico británico Tim Berners-Lee inventó la World Wide Web en 1989 mientras trabajaba en el laboratorio CERN."
  },
  {
    "id": "tec_03",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál fue la primera consola de videojuegos lanzada por Sony en 1994 que popularizó los juegos en CD-ROM?",
    "opciones": [
      "PlayStation",
      "Nintendo 64",
      "Sega Saturn",
      "Xbox"
    ],
    "respuestaCorrecta": "PlayStation",
    "explicacion": "PlayStation vendió más de 102 millones de consolas gracias a títulos en 3D como <em>Final Fantasy VII</em> y <em>Gran Turismo</em>."
  },
  {
    "id": "tec_04",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué matemático británico descifró la máquina nazi Enigma en Bletchley Park y es considerado padre de la computación moderna?",
    "opciones": [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Claude Shannon"
    ],
    "respuestaCorrecta": "Alan Turing",
    "explicacion": "Turing formalizó el concepto de algoritmo con la \"Máquina de Turing\" y concibió el famoso test para evaluar inteligencia artificial."
  },
  {
    "id": "tec_05",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Quién es considerada la primera programadora informática de la historia tras escribir un algoritmo para la Máquina Analítica en 1843?",
    "opciones": [
      "Ada Lovelace",
      "Grace Hopper",
      "Margaret Hamilton",
      "Joan Clarke"
    ],
    "respuestaCorrecta": "Ada Lovelace",
    "explicacion": "Hija de Lord Byron, Lovelace comprendió que las máquinas de cálculo podían manipular símbolos y no solo números."
  },
  {
    "id": "tec_06",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué compañía multinacional creó el motor de búsqueda más utilizado del mundo y el sistema operativo Android?",
    "opciones": [
      "Google",
      "Microsoft",
      "Apple",
      "Yahoo!"
    ],
    "respuestaCorrecta": "Google",
    "explicacion": "Fundada en 1998 por Larry Page y Sergey Brin en la Universidad de Stanford con el algoritmo PageRank."
  },
  {
    "id": "tec_07",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué lenguaje de programación popular en ciencia de datos e inteligencia artificial tiene como logotipo dos serpientes?",
    "opciones": [
      "Python",
      "Java",
      "Ruby",
      "C++"
    ],
    "respuestaCorrecta": "Python",
    "explicacion": "Creado por Guido van Rossum en 1991, fue bautizado así en honor al grupo cómico británico Monty Python."
  },
  {
    "id": "tec_08",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué personaje de Nintendo con bigote, overol azul y gorra roja es el fontanero más famoso de los videojuegos?",
    "opciones": [
      "Mario (Super Mario)",
      "Luigi",
      "Wario",
      "Donkey Kong"
    ],
    "respuestaCorrecta": "Mario (Super Mario)",
    "explicacion": "Creado por Shigeru Miyamoto en 1981 (originalmente llamado Jumpman), es la mascota insignia de Nintendo."
  },
  {
    "id": "tec_09",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué sistema operativo de código abierto basado en Unix fue creado por el estudiante finlandés Linus Torvalds en 1991?",
    "opciones": [
      "Linux",
      "Windows",
      "macOS",
      "MS-DOS"
    ],
    "respuestaCorrecta": "Linux",
    "explicacion": "Linux y su mascota, el pingüino Tux, alimentan hoy en día a la mayoría de servidores web, supercomputadoras y dispositivos Android."
  },
  {
    "id": "tec_10",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Quién fundó Microsoft junto a Paul Allen en 1975 desarrollando el sistema MS-DOS y Windows?",
    "opciones": [
      "Bill Gates",
      "Steve Jobs",
      "Michael Dell",
      "Larry Ellison"
    ],
    "respuestaCorrecta": "Bill Gates",
    "explicacion": "Windows se convirtió en el sistema operativo dominante en computadoras de escritorio en todo el mundo."
  },
  {
    "id": "tec_11",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué dispositivo de bolsillo lanzado por Apple en 2001 permitía llevar \"1.000 canciones en el bolsillo\" con una rueda mecánica?",
    "opciones": [
      "iPod",
      "iPad",
      "iPhone",
      "Walkman"
    ],
    "respuestaCorrecta": "iPod",
    "explicacion": "El iPod transformó la industria discográfica global impulsando la compra digital a través de la tienda iTunes."
  },
  {
    "id": "tec_12",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué videojuego de bloques cúbicos creado por Markus \"Notch\" Persson es el más vendido de todos los tiempos?",
    "opciones": [
      "Minecraft",
      "Tetris",
      "Grand Theft Auto V",
      "Pac-Man"
    ],
    "respuestaCorrecta": "Minecraft",
    "explicacion": "Con más de 300 millones de copias vendidas, permite construir mundos ilimitados mediante minería y recolección de materiales."
  },
  {
    "id": "tec_13",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué tecnología de red inalámbrica de corto alcance que une auriculares y teléfonos debe su nombre a un rey vikingo?",
    "opciones": [
      "Bluetooth",
      "Wi-Fi",
      "NFC",
      "Infrarrojos"
    ],
    "respuestaCorrecta": "Bluetooth",
    "explicacion": "Recibe su nombre del rey danés Harald Blåtand (Diente Azul), quien unificó las tribus escandinavas en el siglo X."
  },
  {
    "id": "tec_14",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama la pequeña pieza de silicio que actúa como el \"cerebro\" central de cualquier computadora (CPU)?",
    "opciones": [
      "Microprocesador (Procesador)",
      "Memoria RAM",
      "Disco duro",
      "Tarjeta de sonido"
    ],
    "respuestaCorrecta": "Microprocesador (Procesador)",
    "explicacion": "Contiene miles de millones de transistores microscópicos que ejecutan cálculos lógicos a velocidades de gigahercios."
  },
  {
    "id": "tec_15",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué red militar estadounidense de 1969 conectó cuatro universidades pioneras y fue el antecesor directo de Internet?",
    "opciones": [
      "ARPANET",
      "Ethernet",
      "Usenet",
      "Bitnet"
    ],
    "respuestaCorrecta": "ARPANET",
    "explicacion": "Desarrollada por el Departamento de Defensa de EE.UU., introdujo la conmutación de paquetes y el protocolo TCP/IP."
  },
  {
    "id": "tec_16",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué consola híbrida lanzada por Nintendo en 2017 puede jugarse tanto conectada al televisor como de forma portátil?",
    "opciones": [
      "Nintendo Switch",
      "Nintendo Wii",
      "Game Boy",
      "Nintendo DS"
    ],
    "respuestaCorrecta": "Nintendo Switch",
    "explicacion": "Sus mandos desmontables Joy-Con y portabilidad la convirtieron en una de las consolas más exitosas de la historia."
  },
  {
    "id": "tec_17",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué tecnología de registro distribuido e inmutable sirve de base para las criptomonedas como Bitcoin?",
    "opciones": [
      "Blockchain (Cadena de bloques)",
      "Cloud Computing",
      "Big Data",
      "Computación cuántica"
    ],
    "respuestaCorrecta": "Blockchain (Cadena de bloques)",
    "explicacion": "Satoshi Nakamoto introdujo la blockchain en 2008 para permitir transferencias de valor sin necesidad de un banco central."
  },
  {
    "id": "tec_18",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué compañía espacial privada fundada por Elon Musk logró reutilizar con éxito los cohetes Falcon 9 haciéndolos aterrizar en vertical?",
    "opciones": [
      "SpaceX",
      "Blue Origin",
      "Virgin Galactic",
      "NASA"
    ],
    "respuestaCorrecta": "SpaceX",
    "explicacion": "La recuperación y reutilización de propulsores redujo drásticamente el costo del acceso humano al espacio exterior."
  },
  {
    "id": "tec_19",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué juego clásico arcade de 1980 desarrollado por Namco tenía como protagonista a un círculo amarillo comiendo puntos en un laberinto?",
    "opciones": [
      "Pac-Man",
      "Space Invaders",
      "Donkey Kong",
      "Galaga"
    ],
    "respuestaCorrecta": "Pac-Man",
    "explicacion": "Toru Iwatani concibió el diseño de Pac-Man al ver una pizza a la que le faltaba una rebanada."
  },
  {
    "id": "tec_20",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué científica informática acuñó el término \"bug\" tras retirar una polilla real atrapada en el relé de la computadora Mark II en 1947?",
    "opciones": [
      "Grace Hopper",
      "Ada Lovelace",
      "Margaret Hamilton",
      "Radia Perlman"
    ],
    "respuestaCorrecta": "Grace Hopper",
    "explicacion": "Hopper también creó el primer compilador y fue una figura central en el desarrollo del lenguaje COBOL."
  },
  {
    "id": "gue_01",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué ataque aéreo sorpresa a la base naval estadounidense en Hawái provocó la entrada de EE.UU. en la Segunda Guerra Mundial?",
    "opciones": [
      "Ataque a Pearl Harbor",
      "Batalla de Midway",
      "Invasión de Iwo Jima",
      "Ataque de Guadalcanal"
    ],
    "respuestaCorrecta": "Ataque a Pearl Harbor",
    "explicacion": "El 7 de diciembre de 1941, la aviación japonesa bombardeó Pearl Harbor en lo que Roosevelt llamó \"una fecha que vivirá en la infamia\"."
  },
  {
    "id": "gue_02",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿En qué playas francesas tuvo lugar la colosal invasión anfibia aliada del \"Día D\" el 6 de junio de 1944?",
    "opciones": [
      "Playas de Normandía",
      "Playas de Dunkerque",
      "Costa Azul",
      "Playas de Calais"
    ],
    "respuestaCorrecta": "Playas de Normandía",
    "explicacion": "La Operación Overlord movilizó a más de 150.000 soldados aliados en las playas Utah, Omaha, Gold, Juno y Sword."
  },
  {
    "id": "gue_03",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el Primer Ministro británico que inspiró a su nación con \"Sangre, esfuerzo, lágrimas y sudor\" durante la II Guerra Mundial?",
    "opciones": [
      "Winston Churchill",
      "Neville Chamberlain",
      "Clement Attlee",
      "Anthony Eden"
    ],
    "respuestaCorrecta": "Winston Churchill",
    "explicacion": "Churchill lideró al Reino Unido en su resistencia solitaria frente a la Luftwaffe alemana durante la Batalla de Inglaterra."
  },
  {
    "id": "gue_04",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué brutal batalla urbana entre 1942 y 1943 a orillas del Volga marcó el punto de inflexión definitivo en el frente oriental soviético?",
    "opciones": [
      "Batalla de Stalingrado",
      "Batalla de Moscú",
      "Batalla de Kursk",
      "Sitio de Leningrado"
    ],
    "respuestaCorrecta": "Batalla de Stalingrado",
    "explicacion": "El cerco y rendición del 6.º Ejército alemán frenó definitivamente el avance nazi hacia los campos petrolíferos del Cáucaso."
  },
  {
    "id": "gue_05",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué tratado de paz firmado en 1919 impuso severas reparaciones a Alemania y concluyó formalmente la Primera Guerra Mundial?",
    "opciones": [
      "Tratado de Versalles",
      "Tratado de Brest-Litovsk",
      "Pacto de Múnich",
      "Tratado de Ginebra"
    ],
    "respuestaCorrecta": "Tratado de Versalles",
    "explicacion": "Firmado en la Galería de los Espejos de Versalles, reconfiguró el mapa europeo y creó la Sociedad de Naciones."
  },
  {
    "id": "gue_06",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Sobre qué dos ciudades japonesas lanzó Estados Unidos las bombas atómicas en agosto de 1945 precipitando el fin de la guerra?",
    "opciones": [
      "Hiroshima y Nagasaki",
      "Tokio y Kioto",
      "Osaka y Yokohama",
      "Nagoya y Sapporo"
    ],
    "respuestaCorrecta": "Hiroshima y Nagasaki",
    "explicacion": "Los bombardeos de \"Little Boy\" y \"Fat Man\" aceleraron la rendición incondicional de Japón el 15 de agosto de 1945."
  },
  {
    "id": "gue_07",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamó la línea fortificada subterránea de defensa de hormigón que construyó Francia a lo largo de su frontera con Alemania?",
    "opciones": [
      "Línea Maginot",
      "Línea Sigfrido",
      "Muralla del Atlántico",
      "Línea Hindenburg"
    ],
    "respuestaCorrecta": "Línea Maginot",
    "explicacion": "El ejército alemán la esquivó invadiendo Francia a través de los densos bosques de las Ardenas en Bélgica."
  },
  {
    "id": "gue_08",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué presidente estadounidense autorizó el \"Plan Marshall\" para reconstruir económicamente a Europa tras la Segunda Guerra Mundial?",
    "opciones": [
      "Harry S. Truman",
      "Franklin D. Roosevelt",
      "Dwight D. Eisenhower",
      "John F. Kennedy"
    ],
    "respuestaCorrecta": "Harry S. Truman",
    "explicacion": "El Plan Marshall inyectó más de 13.000 millones de dólares para reactivar la industria y evitar el colapso social europeo."
  },
  {
    "id": "gue_09",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué invasión militar efectuada por la Alemania nazi el 1 de septiembre de 1939 desató la Segunda Guerra Mundial en Europa?",
    "opciones": [
      "La invasión de Polonia",
      "La invasión de Francia",
      "La anexión de Austria",
      "La invasión de la URSS"
    ],
    "respuestaCorrecta": "La invasión de Polonia",
    "explicacion": "Gran Bretaña y Francia respondieron declarando la guerra a Alemania dos días después, cumpliendo su alianza defensiva."
  },
  {
    "id": "gue_10",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué batalla naval de junio de 1942 en el océano Pacífico decantó la balanza a favor de la armada de EE.UU. hundiendo 4 portaaviones japoneses?",
    "opciones": [
      "Batalla de Midway",
      "Batalla del Mar de Coral",
      "Batalla del Golfo de Leyte",
      "Batalla de Okinawa"
    ],
    "respuestaCorrecta": "Batalla de Midway",
    "explicacion": "Los criptoanalistas estadounidenses descifraron los códigos navales japoneses JN-25 tendiendo una emboscada decisiva."
  },
  {
    "id": "gue_11",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué pacto militar de defensa mutua fundaron EE.UU. y sus aliados europeos occidentales en 1949 durante la Guerra Fría?",
    "opciones": [
      "La OTAN (Organización del Tratado del Atlántico Norte)",
      "El Pacto de Varsovia",
      "La Liga Árabe",
      "La Triple Entente"
    ],
    "respuestaCorrecta": "La OTAN (Organización del Tratado del Atlántico Norte)",
    "explicacion": "El artículo 5 estipula que un ataque armado contra uno de sus miembros se considerará un ataque contra todos ellos."
  },
  {
    "id": "gue_12",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué pacto militar antagónico crearon la Unión Soviética y sus satélites de Europa del Este en 1955 frente a la OTAN?",
    "opciones": [
      "El Pacto de Varsovia",
      "El Cominform",
      "El Eje Roma-Berlín",
      "La Komintern"
    ],
    "respuestaCorrecta": "El Pacto de Varsovia",
    "explicacion": "Disuelto en 1991 con la caída de la Unión Soviética, agrupaba a naciones del bloque socialista europeo."
  },
  {
    "id": "gue_13",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué crisis diplomática y militar de octubre de 1962 colocó al mundo al borde de una guerra nuclear total entre EE.UU. y la URSS?",
    "opciones": [
      "La Crisis de los Misiles en Cuba",
      "El bloqueo de Berlín",
      "La Guerra de Corea",
      "La invasión de Bahía de Cochinos"
    ],
    "respuestaCorrecta": "La Crisis de los Misiles en Cuba",
    "explicacion": "John F. Kennedy impuso una cuarentena naval hasta que Nikita Jrushchov aceptó retirar los misiles soviéticos de Cuba."
  },
  {
    "id": "gue_14",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué batalla entre tanques e infantería en el verano de 1943 es recordada como el mayor enfrentamiento blindado de la historia?",
    "opciones": [
      "Batalla de Kursk",
      "Batalla de El Alamein",
      "Batalla de las Ardenas",
      "Batalla de Montecassino"
    ],
    "respuestaCorrecta": "Batalla de Kursk",
    "explicacion": "Involucró a casi 3 millones de soldados y más de 6.000 tanques en un intento alemán por recuperar la iniciativa."
  },
  {
    "id": "gue_15",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿En qué país del sudeste asiático libró Estados Unidos una prolongada guerra entre las décadas de 1960 y 1970?",
    "opciones": [
      "Vietnam",
      "Corea",
      "Filipinas",
      "Indonesia"
    ],
    "respuestaCorrecta": "Vietnam",
    "explicacion": "El conflicto enfrentó al gobierno prooccidental de Vietnam del Sur contra las fuerzas comunistas del Viet Cong y Vietnam del Norte."
  },
  {
    "id": "gue_16",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué general y líder militar británico apodado \"Monty\" derrotó al mariscal Erwin Rommel en la batalla de El Alamein en el norte de África?",
    "opciones": [
      "Bernard Montgomery",
      "George Patton",
      "Arthur Harris",
      "Harold Alexander"
    ],
    "respuestaCorrecta": "Bernard Montgomery",
    "explicacion": "La victoria en Egipto protegió el Canal de Suez y expulsó a las tropas del Afrika Korps del continente africano."
  },
  {
    "id": "gue_17",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Cómo se denominó la guerra no declarada de tensión política, espionaje y carrera armamentística entre EE.UU. y la URSS entre 1947 y 1991?",
    "opciones": [
      "La Guerra Fría",
      "La Gran Guerra",
      "La Guerra de los Cien Años",
      "La Guerra de las Galaxias"
    ],
    "respuestaCorrecta": "La Guerra Fría",
    "explicacion": "Se llamó \"fría\" porque las dos superpotencias nunca se enfrentaron directamente en combate armado masivo en sus propios suelos."
  },
  {
    "id": "gue_18",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué conferencia de febrero de 1945 en Crimea reunió a Churchill, Roosevelt y Stalin para planificar la división y orden de la posguerra europea?",
    "opciones": [
      "Conferencia de Yalta",
      "Conferencia de Teherán",
      "Conferencia de Potsdam",
      "Conferencia de Casablanca"
    ],
    "respuestaCorrecta": "Conferencia de Yalta",
    "explicacion": "Los \"Tres Grandes\" acordaron la partición de Alemania en zonas de ocupación y la creación de la ONU."
  },
  {
    "id": "gue_19",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué aviador británico lideró el \"Comando de Bombarderos\" y qué avión caza con motor Merlin fue legendario en la defensa de Gran Bretaña?",
    "opciones": [
      "El Supermarine Spitfire",
      "El Boeing B-17",
      "El Messerschmitt Bf 109",
      "El P-51 Mustang"
    ],
    "respuestaCorrecta": "El Supermarine Spitfire",
    "explicacion": "El caza Spitfire y el Hawker Hurricane interceptaron a la Luftwaffe en 1940 salvaguardando el espacio aéreo británico."
  },
  {
    "id": "gue_20",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué organismo internacional fundado en San Francisco en 1945 reemplazó a la Sociedad de Naciones para velar por la paz mundial?",
    "opciones": [
      "La Organización de las Naciones Unidas (ONU)",
      "La Cruz Roja Internacional",
      "La Unión Europea",
      "El Banco Mundial"
    ],
    "respuestaCorrecta": "La Organización de las Naciones Unidas (ONU)",
    "explicacion": "Comenzó con 51 estados miembros y cuenta con el Consejo de Seguridad con cinco miembros permanentes con poder de veto."
  },
  {
    "id": "far_01",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué icónica estrella rubia de Hollywood protagonizó \"Los caballeros las prefieren rubias\" y cantó \"Happy Birthday, Mr. President\"?",
    "opciones": [
      "Marilyn Monroe",
      "Audrey Hepburn",
      "Grace Kelly",
      "Elizabeth Taylor"
    ],
    "respuestaCorrecta": "Marilyn Monroe",
    "explicacion": "Norma Jeane Baker (Marilyn) se convirtió en uno de los mayores mitos y símbolos sexuales del siglo XX."
  },
  {
    "id": "far_02",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué muñeca de moda con proportions estilizadas creada por Ruth Handler y la empresa Mattel debutó en 1959?",
    "opciones": [
      "Barbie",
      "Bratz",
      "Polly Pocket",
      "Nancy"
    ],
    "respuestaCorrecta": "Barbie",
    "explicacion": "Inspirada en la muñeca alemana Bild Lilli, Barbie se ha adaptado a más de 200 profesiones y estilos."
  },
  {
    "id": "far_03",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿En qué evento anual de gala benéfica en el Museo Metropolitano de Nueva York las celebridades visten trajes temáticos extravagantes?",
    "opciones": [
      "La Met Gala",
      "Los Premios Grammy",
      "Los Globos de Oro",
      "Los Premios BAFTA"
    ],
    "respuestaCorrecta": "La Met Gala",
    "explicacion": "Organizada por Anna Wintour y la revista Vogue, es conocida como \"la noche más grande de la moda\"."
  },
  {
    "id": "far_04",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué célebre cantante y actriz es apodada la \"Reina del Pop\" con himnos como \"Like a Virgin\", \"Vogue\" y \"Material Girl\"?",
    "opciones": [
      "Madonna",
      "Cher",
      "Cyndi Lauper",
      "Celine Dion"
    ],
    "respuestaCorrecta": "Madonna",
    "explicacion": "Madonna Louise Ciccone ha vendido más de 300 millones de discos redefiniendo el videoclip y la moda pop."
  },
  {
    "id": "far_05",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué actriz de Hollywood ganó el Óscar, protagonizó \"La ventana indiscreta\" y se convirtió en Princesa de Mónaco al casarse con Raniero III?",
    "opciones": [
      "Grace Kelly",
      "Ingrid Bergman",
      "Rita Hayworth",
      "Ava Gardner"
    ],
    "respuestaCorrecta": "Grace Kelly",
    "explicacion": "Grace Kelly abandonó el cine a los 26 años para asumir sus deberes reales en el principado monegasco."
  },
  {
    "id": "far_06",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué famosa banda pop británica de cinco chicas popularizó el lema \"Girl Power\" con su éxito \"Wannabe\" en los años 90?",
    "opciones": [
      "Spice Girls",
      "Destiny's Child",
      "TLC",
      "All Saints"
    ],
    "respuestaCorrecta": "Spice Girls",
    "explicacion": "Geri, Emma, Mel B, Mel C y Victoria Beckham fueron un fenómeno sociológico y de mercadotecnia en todo el mundo."
  },
  {
    "id": "far_07",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué cantante estadounidense rompió récords históricos mundiales con su multimillonaria gira de conciertos \"The Eras Tour\"?",
    "opciones": [
      "Taylor Swift",
      "Beyoncé",
      "Ariana Grande",
      "Billie Eilish"
    ],
    "respuestaCorrecta": "Taylor Swift",
    "explicacion": "The Eras Tour se convirtió en la primera gira en recaudar más de mil millones de dólares repasando sus diez álbumes de estudio."
  },
  {
    "id": "far_08",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso paseo peatonal de Los Ángeles cuenta con más de 2.700 estrellas de terrazo rosa y bronce dedicadas a artistas?",
    "opciones": [
      "Paseo de la Fama de Hollywood",
      "Rodeo Drive",
      "Sunset Boulevard",
      "Santa Monica Pier"
    ],
    "respuestaCorrecta": "Paseo de la Fama de Hollywood",
    "explicacion": "La actriz Joanne Woodward recibió una de las primeras estrellas oficiales en 1960."
  },
  {
    "id": "far_09",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué artista del pop art creó la famosa serigrafía multicolor con el rostro repetido de Marilyn Monroe y latas de sopa Campbell?",
    "opciones": [
      "Andy Warhol",
      "Roy Lichtenstein",
      "Keith Haring",
      "Jean-Michel Basquiat"
    ],
    "respuestaCorrecta": "Andy Warhol",
    "explicacion": "Warhol convirtió los productos de consumo masivo y las celebridades en las imágenes sacras del arte contemporáneo."
  },
  {
    "id": "far_10",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Quién interpretó a la princesa Leia Organa con su característico peinado de dos rodetes laterales en \"Star Wars\"?",
    "opciones": [
      "Carrie Fisher",
      "Natalie Portman",
      "Daisy Ridley",
      "Sigourney Weaver"
    ],
    "respuestaCorrecta": "Carrie Fisher",
    "explicacion": "Fisher encarnó a una líder rebelde fuerte e ingeniosa que desafió los arquetipos de damisela en apuros."
  },
  {
    "id": "far_11",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué cantante pop estadounidense debutó en 1998 vestida de colegiala con el videoclip de \"...Baby One More Time\"?",
    "opciones": [
      "Britney Spears",
      "Christina Aguilera",
      "Jessica Simpson",
      "Avril Lavigne"
    ],
    "respuestaCorrecta": "Britney Spears",
    "explicacion": "Britney lideró el resurgimiento del teen pop a finales de los 90 convirtiéndose en una superestrella planetaria."
  },
  {
    "id": "far_12",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿En qué serie de televisión de comedia de los 90 vivían en Manhattan los amigos Rachel, Monica, Phoebe, Joey, Chandler y Ross?",
    "opciones": [
      "Friends",
      "Seinfeld",
      "How I Met Your Mother",
      "The Big Bang Theory"
    ],
    "respuestaCorrecta": "Friends",
    "explicacion": "Emitida durante 10 temporadas (1994-2004), sus reuniones en el café Central Perk siguen siendo de las más vistas en streaming."
  },
  {
    "id": "far_13",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué diseñadora de moda francesa liberó a la mujer del corsé, introdujo el \"vestido negro corto\" y el perfume Chanel Nº 5?",
    "opciones": [
      "Coco Chanel",
      "Elsa Schiaparelli",
      "Christian Dior",
      "Jeanne Lanvin"
    ],
    "respuestaCorrecta": "Coco Chanel",
    "explicacion": "Gabrielle \"Coco\" Chanel apostó por prendas cómodas inspiradas en la sastrería masculina y el punto de lana."
  },
  {
    "id": "far_14",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante británica de peinado abombado y delineador de ojos grueso grabó el mítico álbum \"Back to Black\"?",
    "opciones": [
      "Amy Winehouse",
      "Duffy",
      "Joss Stone",
      "Adele"
    ],
    "respuestaCorrecta": "Amy Winehouse",
    "explicacion": "Con su voz desgarradora de jazz y soul, Amy ganó 5 premios Grammy en una sola noche en 2008."
  },
  {
    "id": "far_15",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué actriz y filántropa de Hollywood ganó el Óscar por \"Inocencia interrumpida\" y es famosa por su papel como Lara Croft y Maléfica?",
    "opciones": [
      "Angelina Jolie",
      "Charlize Theron",
      "Scarlett Johansson",
      "Jennifer Aniston"
    ],
    "respuestaCorrecta": "Angelina Jolie",
    "explicacion": "Jolie ha destacado además por sus misiones humanitarias como enviada especial del ACNUR de la ONU."
  },
  {
    "id": "flag_fi",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país nórdico pertenece esta bandera?",
    "opciones": [
      "Finlandia",
      "Suecia",
      "Noruega",
      "Estonia"
    ],
    "respuestaCorrecta": "Finlandia",
    "explicacion": "Es la bandera de <strong>Finlandia</strong>, con una cruz nórdica azul (que simboliza sus miles de lagos) sobre fondo blanco (la nieve).",
    "imagen": "https://flagcdn.com/w320/fi.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_dk",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país pertenece esta bandera, considerada la bandera nacional en uso continuo más antigua del mundo?",
    "opciones": [
      "Dinamarca",
      "Suiza",
      "Noruega",
      "Austria"
    ],
    "respuestaCorrecta": "Dinamarca",
    "explicacion": "Es la bandera de <strong>Dinamarca</strong> (Dannebrog), cuyo diseño de cruz blanca sobre fondo rojo data del siglo XIII.",
    "imagen": "https://flagcdn.com/w320/dk.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_pl",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿A qué país europeo pertenece esta bandera?",
    "opciones": [
      "Polonia",
      "Indonesia",
      "Mónaco",
      "Austria"
    ],
    "respuestaCorrecta": "Polonia",
    "explicacion": "Es la bandera de <strong>Polonia</strong>, compuesta por dos franjas horizontales: blanca arriba y roja abajo.",
    "imagen": "https://flagcdn.com/w320/pl.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ma",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿A qué país del norte de África pertenece esta bandera?",
    "opciones": [
      "Marruecos",
      "Túnez",
      "Turquía",
      "Vietnam"
    ],
    "respuestaCorrecta": "Marruecos",
    "explicacion": "Es la bandera de <strong>Marruecos</strong>, roja con el pentagrama (estrella de cinco puntas) verde de Sulaymán en el centro.",
    "imagen": "https://flagcdn.com/w320/ma.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_vn",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿A qué país del sudeste asiático pertenece esta bandera?",
    "opciones": [
      "Vietnam",
      "China",
      "Corea del Norte",
      "Camboya"
    ],
    "respuestaCorrecta": "Vietnam",
    "explicacion": "Es la bandera de <strong>Vietnam</strong>, roja con una gran estrella dorada de cinco puntas en el centro.",
    "imagen": "https://flagcdn.com/w320/vn.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_th",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿A qué país asiático pertenece esta bandera?",
    "opciones": [
      "Tailandia",
      "Costa Rica",
      "Filipinas",
      "Malasia"
    ],
    "respuestaCorrecta": "Tailandia",
    "explicacion": "Es la bandera de <strong>Tailandia</strong>, con cinco franjas horizontales en orden rojo, blanco, azul doble, blanco y rojo.",
    "imagen": "https://flagcdn.com/w320/th.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_ke",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿A qué país africano pertenece esta bandera con un escudo tradicional masái y dos lanzas?",
    "opciones": [
      "Kenia",
      "Sudáfrica",
      "Nigeria",
      "Etiopía"
    ],
    "respuestaCorrecta": "Kenia",
    "explicacion": "Es la bandera de <strong>Kenia</strong>, que lleva en su centro el escudo tradicional masái cruzado por dos lanzas blancas.",
    "imagen": "https://flagcdn.com/w320/ke.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_bo",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿A qué país sudamericano vecino de Chile pertenece esta bandera tricolor?",
    "opciones": [
      "Bolivia",
      "Ecuador",
      "Colombia",
      "Paraguay"
    ],
    "respuestaCorrecta": "Bolivia",
    "explicacion": "Es la bandera de <strong>Bolivia</strong>, formada por tres franjas horizontales de color rojo, amarillo y verde.",
    "imagen": "https://flagcdn.com/w320/bo.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "flag_np",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Qué país tiene la única bandera nacional del mundo que NO es rectangular ni cuadrada, sino de dos triángulos superpuestos?",
    "opciones": [
      "Nepal",
      "Bután",
      "Sri Lanka",
      "Tíbet"
    ],
    "respuestaCorrecta": "Nepal",
    "explicacion": "La bandera de <strong>Nepal</strong> es la única con cinco lados (dos pennones triangulares) que simbolizan los picos del Himalaya.",
    "imagen": "https://flagcdn.com/w320/np.png",
    "tipoImagen": "bandera"
  },
  {
    "id": "geo_10",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el océano más grande y profundo del planeta Tierra?",
    "opciones": [
      "Océano Pacífico",
      "Océano Atlántico",
      "Océano Índico",
      "Océano Ártico"
    ],
    "respuestaCorrecta": "Océano Pacífico",
    "explicacion": "El Océano Pacífico cubre más de un tercio de la superficie terrestre y alberga la Fosa de las Marianas."
  },
  {
    "id": "geo_11",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es la capital de Francia?",
    "opciones": [
      "París",
      "Lyon",
      "Marsella",
      "Niza"
    ],
    "respuestaCorrecta": "París",
    "explicacion": "París es la capital de Francia, atravesada por el río Sena."
  },
  {
    "id": "geo_12",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿En qué continente se encuentra el desierto del Sahara?",
    "opciones": [
      "África",
      "Asia",
      "Oceanía",
      "América"
    ],
    "respuestaCorrecta": "África",
    "explicacion": "El Sahara es el desierto cálido más grande del mundo y abarca gran parte del norte de África."
  },
  {
    "id": "geo_13",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el país más grande del mundo en superficie territorial?",
    "opciones": [
      "Rusia",
      "Canadá",
      "China",
      "Estados Unidos"
    ],
    "respuestaCorrecta": "Rusia",
    "explicacion": "Rusia abarca más de 17 millones de kilómetros cuadrados, extendiéndose por Europa Oriental y todo el norte de Asia."
  },
  {
    "id": "geo_14",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el país más pequeño del mundo en superficie y población?",
    "opciones": [
      "Ciudad del Vaticano",
      "Mónaco",
      "San Marino",
      "Liechtenstein"
    ],
    "respuestaCorrecta": "Ciudad del Vaticano",
    "explicacion": "Con apenas 0,44 km² dentro de Roma, la Ciudad del Vaticano es el Estado soberano más pequeño del mundo."
  },
  {
    "id": "geo_15",
    "categoria": "geografia",
    "dificultad": "facil",
    "pregunta": "¿Qué cordillera recorre de norte a sur todo el territorio de Chile?",
    "opciones": [
      "Cordillera de los Andes",
      "Cordillera de los Alpes",
      "Montañas Rocosas",
      "Cordillera del Himalaya"
    ],
    "respuestaCorrecta": "Cordillera de los Andes",
    "explicacion": "La Cordillera de los Andes es la cadena montañosa continental más larga de la Tierra, con más de 7.000 km."
  },
  {
    "id": "geo_16",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es la capital de Australia?",
    "opciones": [
      "Canberra",
      "Sídney",
      "Melbourne",
      "Brisbane"
    ],
    "respuestaCorrecta": "Canberra",
    "explicacion": "Aunque Sídney y Melbourne son más grandes, Canberra fue elegida en 1908 como capital de compromiso entre ambas."
  },
  {
    "id": "geo_17",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es la capital de Canadá?",
    "opciones": [
      "Ottawa",
      "Toronto",
      "Montreal",
      "Vancouver"
    ],
    "respuestaCorrecta": "Ottawa",
    "explicacion": "Ottawa, situada en la provincia de Ontario junto al río homónimo, es la capital federal de Canadá."
  },
  {
    "id": "geo_18",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué estrecho separa el extremo sur de la península ibérica (España) del norte de África (Marruecos)?",
    "opciones": [
      "Estrecho de Gibraltar",
      "Estrecho de Magallanes",
      "Estrecho de Bering",
      "Canal de la Mancha"
    ],
    "respuestaCorrecta": "Estrecho de Gibraltar",
    "explicacion": "El Estrecho de Gibraltar conecta el océano Atlántico con el mar Mediterráneo y tiene solo 14,4 km en su punto más angosto."
  },
  {
    "id": "geo_19",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿En qué región de Chile se encuentra el Parque Nacional Torres del Paine?",
    "opciones": [
      "Magallanes y de la Antártica Chilena",
      "Aysén",
      "Los Lagos",
      "Los Ríos"
    ],
    "respuestaCorrecta": "Magallanes y de la Antártica Chilena",
    "explicacion": "Torres del Paine se ubica en la provincia de Última Esperanza, en la Región de Magallanes."
  },
  {
    "id": "geo_20",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Qué río atraviesa la ciudad de Londres?",
    "opciones": [
      "Támesis",
      "Sena",
      "Danubio",
      "Rin"
    ],
    "respuestaCorrecta": "Támesis",
    "explicacion": "El río Támesis recorre el sur de Inglaterra y cruza el corazón histórico de Londres."
  },
  {
    "id": "geo_21",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el lago navegable más alto del mundo, compartido por Perú y Bolivia?",
    "opciones": [
      "Lago Titicaca",
      "Lago Poopó",
      "Lago Nahuel Huapi",
      "Lago Llanquihue"
    ],
    "respuestaCorrecta": "Lago Titicaca",
    "explicacion": "El Lago Titicaca se sitúa en el altiplano andino a unos 3.812 metros sobre el nivel del mar."
  },
  {
    "id": "geo_22",
    "categoria": "geografia",
    "dificultad": "media",
    "pregunta": "¿Con cuántos países limita Chile de forma terrestre?",
    "opciones": [
      "3 (Perú, Bolivia y Argentina)",
      "2 (Perú y Argentina)",
      "4 (Perú, Bolivia, Argentina y Brasil)",
      "5"
    ],
    "respuestaCorrecta": "3 (Perú, Bolivia y Argentina)",
    "explicacion": "Chile limita al norte con Perú, al noreste con Bolivia y al este con Argentina."
  },
  {
    "id": "geo_23",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el volcán activo más alto del mundo, ubicado en la frontera entre Chile y Argentina?",
    "opciones": [
      "Nevado Ojos del Salado",
      "Aconcagua",
      "Volcán Villarrica",
      "Volcán Cotopaxi"
    ],
    "respuestaCorrecta": "Nevado Ojos del Salado",
    "explicacion": "El Nevado Ojos del Salado, en la Región de Atacama, alcanza los 6.891 metros de altitud, siendo el volcán más alto de la Tierra."
  },
  {
    "id": "geo_24",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es la capital de Turquía?",
    "opciones": [
      "Ankara",
      "Estambul",
      "Esmirna",
      "Antalya"
    ],
    "respuestaCorrecta": "Ankara",
    "explicacion": "Ankara reemplazó a Estambul (antigua Constantinopla) como capital turca en 1923 tras la fundación de la República."
  },
  {
    "id": "geo_25",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es la capital de Suiza (conocida oficialmente como ciudad federal)?",
    "opciones": [
      "Berna",
      "Zúrich",
      "Ginebra",
      "Basilea"
    ],
    "respuestaCorrecta": "Berna",
    "explicacion": "Aunque Zúrich y Ginebra son más pobladas, Berna es la sede del gobierno federal suizo desde 1848."
  },
  {
    "id": "geo_26",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama la fosa oceánica más profunda de la Tierra, situada en el Pacífico occidental?",
    "opciones": [
      "Fosa de las Marianas",
      "Fosa de Atacama",
      "Fosa de Tonga",
      "Fosa de Puerto Rico"
    ],
    "respuestaCorrecta": "Fosa de las Marianas",
    "explicacion": "El Abismo de Challenger en la Fosa de las Marianas desciende hasta casi 11.000 metros de profundidad."
  },
  {
    "id": "geo_27",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Qué país africano es el único cuyo idioma oficial es el español?",
    "opciones": [
      "Guinea Ecuatorial",
      "Marruecos",
      "Angola",
      "Cabo Verde"
    ],
    "respuestaCorrecta": "Guinea Ecuatorial",
    "explicacion": "Guinea Ecuatorial fue colonia española hasta 1968 y conserva el español como lengua oficial mayoritaria."
  },
  {
    "id": "geo_28",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Qué mar sin salida oceánica es en realidad el cuerpo de agua interior (lago) más extenso del planeta?",
    "opciones": [
      "Mar Caspio",
      "Mar Muerto",
      "Mar Negro",
      "Mar de Aral"
    ],
    "respuestaCorrecta": "Mar Caspio",
    "explicacion": "El Mar Caspio, situado entre Europa y Asia, tiene unos 371.000 km² de superficie."
  },
  {
    "id": "geo_29",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es la capital de Nueva Zelanda?",
    "opciones": [
      "Wellington",
      "Auckland",
      "Christchurch",
      "Queenstown"
    ],
    "respuestaCorrecta": "Wellington",
    "explicacion": "Wellington, en el extremo sur de la Isla Norte, es la capital más austral del mundo."
  },
  {
    "id": "geo_30",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Qué país sudamericano NO tiene frontera terrestre con Brasil?",
    "opciones": [
      "Ecuador",
      "Colombia",
      "Guyana",
      "Surinam"
    ],
    "respuestaCorrecta": "Ecuador",
    "explicacion": "Solo dos países de Sudamérica no limitan con Brasil: Chile y Ecuador."
  },
  {
    "id": "geo_31",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el río más largo de Europa?",
    "opciones": [
      "Río Volga",
      "Río Danubio",
      "Río Rin",
      "Río Dniéper"
    ],
    "respuestaCorrecta": "Río Volga",
    "explicacion": "El río Volga recorre unos 3.530 km por la Rusia europea hasta desembocar en el mar Caspio."
  },
  {
    "id": "geo_32",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿En qué país actual se encuentra la antigua ciudad tallada en roca de Petra?",
    "opciones": [
      "Jordania",
      "Egipto",
      "Siria",
      "Irán"
    ],
    "respuestaCorrecta": "Jordania",
    "explicacion": "Petra fue la capital del antiguo reino nabateo y se ubica en un valle desértico del suroeste de Jordania."
  },
  {
    "id": "geo_33",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el lago más grande de Chile por completo dentro de su territorio (sin ser compartido)?",
    "opciones": [
      "Lago Llanquihue",
      "Lago General Carrera",
      "Lago Villarrica",
      "Lago Ranco"
    ],
    "respuestaCorrecta": "Lago Llanquihue",
    "explicacion": "El General Carrera es mayor en total pero compartido con Argentina; el Llanquihue (860 km²) es el mayor íntegramente chileno."
  },
  {
    "id": "geo_34",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es la capital de Marruecos?",
    "opciones": [
      "Rabat",
      "Casablanca",
      "Marrakech",
      "Fez"
    ],
    "respuestaCorrecta": "Rabat",
    "explicacion": "Aunque Casablanca es el motor económico y Marrakech la joya turística, Rabat es la capital política de Marruecos."
  },
  {
    "id": "geo_35",
    "categoria": "geografia",
    "dificultad": "dificil",
    "pregunta": "¿Qué canal artificial inaugurado en 1869 une el mar Mediterráneo con el mar Rojo?",
    "opciones": [
      "Canal de Suez",
      "Canal de Panamá",
      "Canal de Corinto",
      "Canal de Kiel"
    ],
    "respuestaCorrecta": "Canal de Suez",
    "explicacion": "El Canal de Suez en Egipto permite navegar entre Europa y el sur de Asia sin rodear el continente africano."
  },
  {
    "id": "his_41",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el comandante de La Esmeralda que murió en el Combate Naval de Iquique el 21 de mayo de 1879?",
    "opciones": [
      "Arturo Prat",
      "Bernardo O'Higgins",
      "Miguel Grau",
      "Carlos Condell"
    ],
    "respuestaCorrecta": "Arturo Prat",
    "explicacion": "Arturo Prat Chacón saltó al abordaje del monitor Huáscar tras pronunciar su célebre arenga."
  },
  {
    "id": "his_42",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué civilización precolombina construyó la ciudadela de Machu Picchu en los Andes?",
    "opciones": [
      "Imperio Inca",
      "Imperio Azteca",
      "Civilización Maya",
      "Cultura Mapuche"
    ],
    "respuestaCorrecta": "Imperio Inca",
    "explicacion": "Machu Picchu fue edificada en el siglo XV bajo el mandato del emperador inca Pachacútec."
  },
  {
    "id": "his_43",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿En qué país comenzó la Revolución Industrial a mediados del siglo XVIII?",
    "opciones": [
      "Gran Bretaña (Inglaterra)",
      "Francia",
      "Estados Unidos",
      "Alemania"
    ],
    "respuestaCorrecta": "Gran Bretaña (Inglaterra)",
    "explicacion": "El uso del carbón, la máquina de vapor de James Watt y la industria textil impulsaron la revolución en Inglaterra."
  },
  {
    "id": "his_44",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaron las tres embarcaciones con las que Cristóbal Colón llegó a América en 1492?",
    "opciones": [
      "La Niña, la Pinta y la Santa María",
      "La Victoria, la Trinidad y la Concepción",
      "La Esmeralda, la Covadonga y el Huáscar",
      "El Mayflower, el Beagle y el Endeavour"
    ],
    "respuestaCorrecta": "La Niña, la Pinta y la Santa María",
    "explicacion": "Dos carabelas (la Niña y la Pinta) y una nao (la Santa María) zarparon del puerto de Palos el 3 de agosto de 1492."
  },
  {
    "id": "his_45",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué líder sudafricano estuvo 27 años preso por luchar contra el Apartheid y luego fue presidente de su país?",
    "opciones": [
      "Nelson Mandela",
      "Desmond Tutu",
      "Kofi Annan",
      "Patrice Lumumba"
    ],
    "respuestaCorrecta": "Nelson Mandela",
    "explicacion": "Mandela recibió el Premio Nobel de la Paz en 1993 y gobernó Sudáfrica entre 1994 y 1999."
  },
  {
    "id": "his_46",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿En qué fecha se celebra la Primera Junta Nacional de Gobierno en Chile?",
    "opciones": [
      "18 de septiembre de 1810",
      "12 de febrero de 1818",
      "5 de abril de 1818",
      "21 de mayo de 1879"
    ],
    "respuestaCorrecta": "18 de septiembre de 1810",
    "explicacion": "El Cabildo Abierto de Santiago del 18 de septiembre de 1810 inició el proceso de emancipación chilena."
  },
  {
    "id": "his_47",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso barco transatlántico se hundió en su viaje inaugural en abril de 1912 tras chocar con un iceberg?",
    "opciones": [
      "RMS Titanic",
      "RMS Lusitania",
      "HMS Britannic",
      "Bismarck"
    ],
    "respuestaCorrecta": "RMS Titanic",
    "explicacion": "Más de 1.500 personas perdieron la vida en las heladas aguas del Atlántico Norte."
  },
  {
    "id": "his_48",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el líder del movimiento de independencia de la India mediante la resistencia pacífica y no violenta?",
    "opciones": [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Dalai Lama",
      "Siddhartha Gautama"
    ],
    "respuestaCorrecta": "Mahatma Gandhi",
    "explicacion": "Mohandas 'Mahatma' Gandhi lideró marchas históricas como la Marcha de la Sal frente al Imperio Británico."
  },
  {
    "id": "his_49",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué antigua civilización construyó las pirámides de Giza y la Gran Esfinge?",
    "opciones": [
      "Antiguo Egipto",
      "Mesopotamia",
      "Imperio Persa",
      "Grecia Clásica"
    ],
    "respuestaCorrecta": "Antiguo Egipto",
    "explicacion": "Fueron erigidas durante el Imperio Antiguo de Egipto para los faraones Keops, Kefrén y Micerino."
  },
  {
    "id": "his_50",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el primer presidente de los Estados Unidos?",
    "opciones": [
      "George Washington",
      "Abraham Lincoln",
      "Thomas Jefferson",
      "Benjamin Franklin"
    ],
    "respuestaCorrecta": "George Washington",
    "explicacion": "Washington comandó el Ejército Continental en la Guerra de Independencia y asumió la presidencia en 1789."
  },
  {
    "id": "his_51",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué batalla del 5 de abril de 1818 selló definitivamente la Independencia de Chile con el famoso abrazo entre O'Higgins y San Martín?",
    "opciones": [
      "Batalla de Maipú",
      "Batalla de Chacabuco",
      "Desastre de Rancagua",
      "Cancha Rayada"
    ],
    "respuestaCorrecta": "Batalla de Maipú",
    "explicacion": "La victoria patriota en los llanos de Maipú aseguró la independencia chilena frente a las tropas realistas de Mariano Osorio."
  },
  {
    "id": "his_52",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué líder mapuche (toqui) encabezó la primera gran rebelión indígena y derrotó a Pedro de Valdivia en la batalla de Tucapel?",
    "opciones": [
      "Lautaro (Leftraru)",
      "Caupolicán",
      "Galvarino",
      "Pelantaro"
    ],
    "respuestaCorrecta": "Lautaro (Leftraru)",
    "explicacion": "Lautaro había sido paje de Valdivia, aprendió la táctica de caballería española y la usó con genio militar en 1553."
  },
  {
    "id": "his_53",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿En qué año cayó el Muro de Berlín, símbolo de la división de Europa durante la Guerra Fría?",
    "opciones": [
      "1989",
      "1991",
      "1985",
      "1979"
    ],
    "respuestaCorrecta": "1989",
    "explicacion": "La noche del 9 de noviembre de 1989 miles de berlineses derribaron los pasos fronterizos del muro."
  },
  {
    "id": "his_54",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué emperador francés fue derrotado definitivamente en la Batalla de Waterloo en 1815?",
    "opciones": [
      "Napoleón Bonaparte",
      "Luis XIV",
      "Luis XVI",
      "Carlos Magno"
    ],
    "respuestaCorrecta": "Napoleón Bonaparte",
    "explicacion": "Tras su regreso de los Cien Días, Napoleón cayó ante las fuerzas aliadas comandadas por Wellington y Blücher."
  },
  {
    "id": "his_55",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué presidente estadounidense promulgó la Proclamación de Emancipación que abolió la esclavitud y fue asesinado en un teatro en 1865?",
    "opciones": [
      "Abraham Lincoln",
      "Ulysses S. Grant",
      "Theodore Roosevelt",
      "Andrew Jackson"
    ],
    "respuestaCorrecta": "Abraham Lincoln",
    "explicacion": "Lincoln lideró a la Unión durante la Guerra de Secesión y fue asesinado por John Wilkes Booth en el Teatro Ford."
  },
  {
    "id": "his_56",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué explorador portugués al servicio de España lideró la primera expedición en cruzar el estrecho austral de Chile hacia el océano Pacífico en 1520?",
    "opciones": [
      "Hernando de Magallanes",
      "Vasco da Gama",
      "Sebastián Elcano",
      "Pedro de Valdivia"
    ],
    "respuestaCorrecta": "Hernando de Magallanes",
    "explicacion": "Magallanes descubrió el paso interoceánico que hoy lleva su nombre; tras su muerte en Filipinas, Elcano completó la vuelta al mundo."
  },
  {
    "id": "his_57",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué mujer francesa del siglo XV, apodada la 'Doncella de Orleans', lideró al ejército real en la Guerra de los Cien Años?",
    "opciones": [
      "Juana de Arco",
      "María Antonieta",
      "Catalina de Médici",
      "Leonor de Aquitania"
    ],
    "respuestaCorrecta": "Juana de Arco",
    "explicacion": "Capturada y quemada en la hoguera a los 19 años en 1431, fue canonizada siglos después como patrona de Francia."
  },
  {
    "id": "his_58",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamó el desastre nuclear ocurrido en abril de 1986 en la actual Ucrania (entonces Unión Soviética)?",
    "opciones": [
      "Chernóbil",
      "Fukushima",
      "Three Mile Island",
      "Kyshtym"
    ],
    "respuestaCorrecta": "Chernóbil",
    "explicacion": "La explosión del reactor número 4 de la central Vladímir Ilich Lenin obligó a evacuar la ciudad de Prípiat."
  },
  {
    "id": "his_59",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué conquistador español fundó la ciudad de Santiago del Nuevo Extremo el 12 de febrero de 1541?",
    "opciones": [
      "Pedro de Valdivia",
      "Diego de Almagro",
      "Francisco Pizarro",
      "Hernán Cortés"
    ],
    "respuestaCorrecta": "Pedro de Valdivia",
    "explicacion": "Valdivia fundó Santiago a los pies del cerro Huelén (actual cerro Santa Lucía)."
  },
  {
    "id": "his_60",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué reina de Francia fue ejecutada en la guillotina en 1793 durante la Revolución Francesa?",
    "opciones": [
      "María Antonieta",
      "María Estuardo",
      "Ana Bolena",
      "Isabel de Baviera"
    ],
    "respuestaCorrecta": "María Antonieta",
    "explicacion": "Esposa de Luis XVI y archiduquesa de Austria, se convirtió en símbolo de los excesos de la monarquía absoluta."
  },
  {
    "id": "his_61",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿En qué año lograron las mujeres en Chile el derecho a voto pleno en las elecciones presidenciales y parlamentarias?",
    "opciones": [
      "1949",
      "1934",
      "1970",
      "1925"
    ],
    "respuestaCorrecta": "1949",
    "explicacion": "El presidente Gabriel González Videla promulgó la ley en enero de 1949, impulsada por líderes feministas como Elena Caffarena."
  },
  {
    "id": "his_62",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué imperio antiguo tuvo como capital a Tenochtitlán, sobre cuyas ruinas se edificó la actual Ciudad de México?",
    "opciones": [
      "Imperio Azteca (Mexica)",
      "Imperio Maya",
      "Imperio Inca",
      "Cultura Olmeca"
    ],
    "respuestaCorrecta": "Imperio Azteca (Mexica)",
    "explicacion": "Tenochtitlán fue fundada en 1325 en un islote del lago de Texcoco y conquistada por Hernán Cortés en 1521."
  },
  {
    "id": "his_63",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿En qué año cayó Constantinopla en manos del Imperio Otomano, hecho que tradicionalmente marca el fin de la Edad Media?",
    "opciones": [
      "1453",
      "1492",
      "1348",
      "1517"
    ],
    "respuestaCorrecta": "1453",
    "explicacion": "El sultán Mehmed II conquistó la capital del Imperio Bizantino el 29 de mayo de 1453."
  },
  {
    "id": "his_64",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué código legal tallado en una estela de basalto negro hacia el 1750 a.C. en Babilonia es famoso por la ley del talión ('ojo por ojo')?",
    "opciones": [
      "Código de Hammurabi",
      "Piedra de Rosetta",
      "Cilindro de Ciro",
      "Leyes de las Doce Tablas"
    ],
    "respuestaCorrecta": "Código de Hammurabi",
    "explicacion": "Contiene 282 leyes babilónicas y hoy se conserva en el Museo del Louvre en París."
  },
  {
    "id": "his_65",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el presidente de Chile que murió en el Palacio de La Moneda el 11 de septiembre de 1973?",
    "opciones": [
      "Salvador Allende",
      "Eduardo Frei Montalva",
      "Jorge Alessandri",
      "Carlos Ibáñez del Campo"
    ],
    "respuestaCorrecta": "Salvador Allende",
    "explicacion": "Allende había sido elegido en 1970 al frente de la coalición de la Unidad Popular."
  },
  {
    "id": "his_66",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué presidente chileno impulsó la construcción del Viaducto del Malleco y vivió el conflicto de la Guerra Civil de 1891?",
    "opciones": [
      "José Manuel Balmaceda",
      "Manuel Montt",
      "Aníbal Pinto",
      "Arturo Alessandri Palma"
    ],
    "respuestaCorrecta": "José Manuel Balmaceda",
    "explicacion": "Balmaceda modernizó la infraestructura pública gracias a la riqueza del salitre antes de la crisis con el Congreso en 1891."
  },
  {
    "id": "his_67",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué tratado firmado en 1494 dividió las tierras recién descubiertas fuera de Europa entre las coronas de España y Portugal?",
    "opciones": [
      "Tratado de Tordesillas",
      "Tratado de Versalles",
      "Tratado de Utrecht",
      "Paz de Westfalia"
    ],
    "respuestaCorrecta": "Tratado de Tordesillas",
    "explicacion": "Estableció un meridiano a 370 leguas al oeste de las islas de Cabo Verde, lo que permitió a Portugal reclamar Brasil."
  },
  {
    "id": "his_68",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el último emperador (zar) de Rusia, ejecutado junto a toda su familia en Ekaterimburgo en 1918?",
    "opciones": [
      "Nicolás II",
      "Alejandro III",
      "Pedro el Grande",
      "Iván el Terrible"
    ],
    "respuestaCorrecta": "Nicolás II",
    "explicacion": "Nicolás II abdicó en 1917 durante la Revolución Rusa, poniendo fin a más de tres siglos de la dinastía Romanov."
  },
  {
    "id": "his_69",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué monje alemán clavó sus 95 tesis en la puerta de la iglesia de Wittenberg en 1517, dando inicio a la Reforma Protestante?",
    "opciones": [
      "Martín Lutero",
      "Juan Calvino",
      "Erasmo de Róterdam",
      "Tomás Moro"
    ],
    "respuestaCorrecta": "Martín Lutero",
    "explicacion": "Lutero cuestionó la venta de indulgencias y tradujo la Biblia al alemán."
  },
  {
    "id": "his_70",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el terremoto más potente jamás registrado instrumentalmente en la historia de la humanidad (9,5 Mw), ocurrido en Chile en 1960?",
    "opciones": [
      "Terremoto de Valdivia de 1960",
      "Terremoto de Chillán de 1939",
      "Terremoto del Maule de 2010",
      "Terremoto de Valparaíso de 1906"
    ],
    "respuestaCorrecta": "Terremoto de Valdivia de 1960",
    "explicacion": "Ocurrido el 22 de mayo de 1960, alcanzó 9,5 grados y generó un tsunami que llegó hasta Hawái y Japón."
  },
  {
    "id": "his_71",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué general cartaginés cruzó los Alpes con elefantes de guerra para invadir Roma durante la Segunda Guerra Púnica?",
    "opciones": [
      "Aníbal Barca",
      "Escipión el Africano",
      "Espartaco",
      "Atila"
    ],
    "respuestaCorrecta": "Aníbal Barca",
    "explicacion": "Aníbal infligió a Roma una de sus peores derrotas tácticas en la batalla de Cannas (216 a.C.)."
  },
  {
    "id": "his_72",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿En qué ciudad de Egipto fundó Alejandro Magno la más célebre biblioteca y el faro del mundo antiguo?",
    "opciones": [
      "Alejandría",
      "Tebas",
      "Menfis",
      "Luxor"
    ],
    "respuestaCorrecta": "Alejandría",
    "explicacion": "Fundada en el 331 a.C., Alejandría fue el centro intelectual del mundo helenístico."
  },
  {
    "id": "his_73",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué prócer chileno fundó el primer periódico nacional, 'La Aurora de Chile', en 1812?",
    "opciones": [
      "Fray Camilo Henríquez",
      "José Miguel Carrera",
      "Manuel Rodríguez",
      "Andrés Bello"
    ],
    "respuestaCorrecta": "Fray Camilo Henríquez",
    "explicacion": "Con una imprenta traída desde Estados Unidos durante el gobierno de Carrera, publicó el primer ejemplar el 13 de febrero de 1812."
  },
  {
    "id": "his_74",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué emperador romano legalizó el cristianismo mediante el Edicto de Milán en el año 313 d.C.?",
    "opciones": [
      "Constantino el Grande",
      "Julio César",
      "Nerón",
      "Marco Aurelio"
    ],
    "respuestaCorrecta": "Constantino el Grande",
    "explicacion": "Constantino puso fin a las persecuciones contra los cristianos y trasladó la capital imperial a Bizancio (Constantinopla)."
  },
  {
    "id": "his_75",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el primer ser humano en realizar un vuelo espacial orbital alrededor de la Tierra el 12 de abril de 1961?",
    "opciones": [
      "Yuri Gagarin",
      "Neil Armstrong",
      "Alan Shepard",
      "Buzz Aldrin"
    ],
    "respuestaCorrecta": "Yuri Gagarin",
    "explicacion": "El cosmonauta soviético orbitó el planeta a bordo de la cápsula Vostok 1 durante 108 minutos."
  },
  {
    "id": "his_76",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué documento firmado en Inglaterra en 1215 por el rey Juan sin Tierra limitó por primera vez el poder absoluto del monarca?",
    "opciones": [
      "Carta Magna",
      "Declaración de Derechos (Bill of Rights)",
      "Edicto de Nantes",
      "Habeas Corpus"
    ],
    "respuestaCorrecta": "Carta Magna",
    "explicacion": "La Carta Magna es considerada uno de los antecedentes fundamentales del constitucionalismo moderno."
  },
  {
    "id": "his_77",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Quién redactó el Código Civil de Chile (1855) y fue el primer rector de la Universidad de Chile?",
    "opciones": [
      "Andrés Bello",
      "Diego Portales",
      "Benjamín Vicuña Mackenna",
      "Domingo Faustino Sarmiento"
    ],
    "respuestaCorrecta": "Andrés Bello",
    "explicacion": "El humanista venezolano-chileno Andrés Bello plasmó una obra jurídica que sirvió de modelo para varios países latinoamericanos."
  },
  {
    "id": "his_78",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué nave espacial estadounidense sufrió una trágica explosión 73 segundos después de su despegue en enero de 1986?",
    "opciones": [
      "Transbordador Challenger",
      "Transbordador Columbia",
      "Apolo 13",
      "Sputnik 2"
    ],
    "respuestaCorrecta": "Transbordador Challenger",
    "explicacion": "El fallo de una junta tórica en un cohete acelerador causó la pérdida de sus siete tripulantes."
  },
  {
    "id": "his_79",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamaba la ruta comercial terrestre que conectaba China con el Mediterráneo desde la Antigüedad?",
    "opciones": [
      "Ruta de la Seda",
      "Ruta de las Especias",
      "Camino del Inca",
      "Vía Apia"
    ],
    "respuestaCorrecta": "Ruta de la Seda",
    "explicacion": "Por ella circularon seda, porcelana, papel, pólvora e ideas religiosas y científicas entre Oriente y Occidente."
  },
  {
    "id": "his_80",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué batalla naval librada en 1805 frente a las costas de Cádiz consolidó la supremacía marítima británica y costó la vida al almirante Nelson?",
    "opciones": [
      "Batalla de Trafalgar",
      "Batalla de Lepanto",
      "Combate de Angamos",
      "Batalla de Jutlandia"
    ],
    "respuestaCorrecta": "Batalla de Trafalgar",
    "explicacion": "La flota británica derrotó a la escuadra combinada franco-española frustrando la invasión napoleónica al Reino Unido."
  },
  {
    "id": "his_81",
    "categoria": "historia",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso guerrillero patriota chileno es recordado por sus disfraces, su astucia y la frase '¡Aún tenemos patria, ciudadanos!'?",
    "opciones": [
      "Manuel Rodríguez",
      "José Miguel Carrera",
      "Ramón Freire",
      "Lord Cochrane"
    ],
    "respuestaCorrecta": "Manuel Rodríguez",
    "explicacion": "El 'Húsar de la Muerte' mantuvo viva la resistencia patriota durante la Reconquista española."
  },
  {
    "id": "his_82",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué médico escocés descubrió la penicilina en 1928, revolucionando la medicina con el primer antibiótico?",
    "opciones": [
      "Alexander Fleming",
      "Louis Pasteur",
      "Robert Koch",
      "Edward Jenner"
    ],
    "respuestaCorrecta": "Alexander Fleming",
    "explicacion": "Fleming observó cómo el hongo Penicillium notatum destruía colonias bacterianas en una placa olvidada."
  },
  {
    "id": "his_83",
    "categoria": "historia",
    "dificultad": "media",
    "pregunta": "¿Qué líder estadounidense de los derechos civiles pronunció en 1963 el famoso discurso 'I Have a Dream' ('Yo tengo un sueño')?",
    "opciones": [
      "Martin Luther King Jr.",
      "Malcolm X",
      "Rosa Parks",
      "Barack Obama"
    ],
    "respuestaCorrecta": "Martin Luther King Jr.",
    "explicacion": "Lo pronunció frente al Monumento a Lincoln en Washington D.C. ante más de 250.000 personas."
  },
  {
    "id": "his_84",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿En qué año se disolvió oficialmente la Unión de Repúblicas Socialistas Soviéticas (URSS)?",
    "opciones": [
      "1991",
      "1989",
      "1993",
      "1986"
    ],
    "respuestaCorrecta": "1991",
    "explicacion": "En diciembre de 1991 Mijaíl Gorbachov dimitió y la bandera roja fue arriada del Kremlin."
  },
  {
    "id": "his_85",
    "categoria": "historia",
    "dificultad": "dificil",
    "pregunta": "¿Qué almirante escocés al mando de la Escuadra Chilena protagonizó la increíble Toma de Valdivia en 1820?",
    "opciones": [
      "Lord Thomas Cochrane",
      "Manuel Blanco Encalada",
      "Carlos Condell",
      "Juan Williams Rebolledo"
    ],
    "respuestaCorrecta": "Lord Thomas Cochrane",
    "explicacion": "Con apenas unos cientos de hombres, Cochrane capturó el sistema de fuertes españoles más poderoso del Pacífico Sur."
  },
  {
    "id": "bio_36",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el órgano más grande del cuerpo humano en cuanto a superficie y peso externo?",
    "opciones": [
      "La piel",
      "El hígado",
      "El cerebro",
      "Los pulmones"
    ],
    "respuestaCorrecta": "La piel",
    "explicacion": "La piel de un adulto cubre cerca de 2 metros cuadrados y actúa como barrera protectora."
  },
  {
    "id": "bio_37",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué gas absorben las plantas de la atmósfera durante la fotosíntesis para producir su alimento?",
    "opciones": [
      "Dióxido de carbono (CO2)",
      "Oxígeno",
      "Nitrógeno",
      "Hidrógeno"
    ],
    "respuestaCorrecta": "Dióxido de carbono (CO2)",
    "explicacion": "Las plantas captan CO2 y agua, y gracias a la luz solar liberan oxígeno como subproducto."
  },
  {
    "id": "bio_38",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el único mamífero capaz de volar de forma sostenida?",
    "opciones": [
      "El murciélago",
      "La ardilla voladora",
      "El avestruz",
      "El colibrí"
    ],
    "respuestaCorrecta": "El murciélago",
    "explicacion": "Las alas de los murciélagos son extremidades modificadas con una membrana de piel llamada patagio."
  },
  {
    "id": "bio_39",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuántos huesos tiene aproximadamente el esqueleto de un ser humano adulto?",
    "opciones": [
      "206",
      "150",
      "300",
      "256"
    ],
    "respuestaCorrecta": "206",
    "explicacion": "Los bebés nacen con unos 300 huesos, pero muchos se fusionan durante el crecimiento hasta quedar en 206."
  },
  {
    "id": "bio_40",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué animales aparecen en el Escudo Nacional de Chile?",
    "opciones": [
      "El cóndor y el huemul",
      "El puma y el águila",
      "La llama y el cóndor",
      "El pudú y el flamenco"
    ],
    "respuestaCorrecta": "El cóndor y el huemul",
    "explicacion": "El huemul (ciervo andino en peligro) y el cóndor (gran ave de los Andes) escoltan el escudo bajo el lema 'Por la razón o la fuerza'."
  },
  {
    "id": "bio_41",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el animal terrestre más alto del planeta?",
    "opciones": [
      "La jirafa",
      "El elefante africano",
      "El avestruz",
      "El oso polar"
    ],
    "respuestaCorrecta": "La jirafa",
    "explicacion": "Las jirafas pueden alcanzar hasta 5,5 metros de altura gracias a su largo cuello de 7 vértebras gigantes."
  },
  {
    "id": "bio_42",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué insecto produce la miel a partir del néctar de las flores?",
    "opciones": [
      "La abeja",
      "La avispa",
      "El abejorro carpintero",
      "La mariposa"
    ],
    "respuestaCorrecta": "La abeja",
    "explicacion": "La abeja melífera (Apis mellifera) transforma el néctar mediante enzimas y evaporación dentro del panal."
  },
  {
    "id": "bio_43",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llaman los animales que se alimentan exclusivamente de plantas y vegetales?",
    "opciones": [
      "Herbívoros",
      "Carnívoros",
      "Omnívoros",
      "Carroñeros"
    ],
    "respuestaCorrecta": "Herbívoros",
    "explicacion": "Los herbívoros poseen dientes molares planos y sistemas digestivos adaptados para procesar la celulosa."
  },
  {
    "id": "bio_44",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Qué órgano del cuerpo humano se encarga de bombear la sangre a través de las arterias y venas?",
    "opciones": [
      "El corazón",
      "Los pulmones",
      "El riñón",
      "El estómago"
    ],
    "respuestaCorrecta": "El corazón",
    "explicacion": "El corazón late unas 100.000 veces al día impulsando cerca de 5 litros de sangre por todo el organismo."
  },
  {
    "id": "bio_45",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el ciervo más pequeño del mundo, nativo de los bosques del sur de Chile?",
    "opciones": [
      "Pudú",
      "Huemul",
      "Guanaco",
      "Vicuña"
    ],
    "respuestaCorrecta": "Pudú",
    "explicacion": "El pudú mide apenas entre 35 y 40 centímetros de altura al hombro y habita el bosque templado valdiviano."
  },
  {
    "id": "bio_46",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué pigmento verde presente en los cloroplastos permite a las plantas capturar la energía de la luz solar?",
    "opciones": [
      "Clorofila",
      "Melanina",
      "Hemoglobina",
      "Caroteno"
    ],
    "respuestaCorrecta": "Clorofila",
    "explicacion": "La clorofila absorbe principalmente luz azul y roja y refleja la verde, dándole su color a las hojas."
  },
  {
    "id": "bio_47",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el hueso más largo y resistente del cuerpo humano?",
    "opciones": [
      "El fémur",
      "El húmero",
      "La tibia",
      "El radio"
    ],
    "respuestaCorrecta": "El fémur",
    "explicacion": "Ubicado en el muslo, el fémur representa cerca de una cuarta parte de la altura total de una persona."
  },
  {
    "id": "bio_48",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué proteína presente en los glóbulos rojos transporta el oxígeno desde los pulmones hacia los tejidos?",
    "opciones": [
      "Hemoglobina",
      "Insulina",
      "Queratina",
      "Colágeno"
    ],
    "respuestaCorrecta": "Hemoglobina",
    "explicacion": "La hemoglobina contiene átomos de hierro que se unen al oxígeno y dan el color rojo a la sangre."
  },
  {
    "id": "bio_49",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué tipo de sangre es considerado el 'donante universal' de glóbulos rojos?",
    "opciones": [
      "O negativo (O-)",
      "AB positivo (AB+)",
      "A positivo (A+)",
      "O positivo (O+)"
    ],
    "respuestaCorrecta": "O negativo (O-)",
    "explicacion": "Los glóbulos rojos O- carecen de antígenos A, B y Rh, por lo que no provocan rechazo en emergencias."
  },
  {
    "id": "bio_50",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el ave voladora más grande del mundo por superficie alar, emblemática de la cordillera de los Andes?",
    "opciones": [
      "Cóndor andino",
      "Albatros viajero",
      "Águila harpía",
      "Pelícano"
    ],
    "respuestaCorrecta": "Cóndor andino",
    "explicacion": "El cóndor andino alcanza más de 3 metros de envergadura y un peso de hasta 15 kg."
  },
  {
    "id": "bio_51",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué órgano del cuerpo humano filtra la sangre para eliminar desechos a través de la orina?",
    "opciones": [
      "Los riñones",
      "El páncreas",
      "El bazo",
      "La vesícula biliar"
    ],
    "respuestaCorrecta": "Los riñones",
    "explicacion": "Los dos riñones filtran alrededor de 180 litros de líquido al día a través de millones de nefronas."
  },
  {
    "id": "bio_52",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué hormona producida por el páncreas regula los niveles de glucosa (azúcar) en la sangre?",
    "opciones": [
      "Insulina",
      "Adrenalina",
      "Tiroxina",
      "Melatonina"
    ],
    "respuestaCorrecta": "Insulina",
    "explicacion": "El déficit o resistencia a la insulina es la causa principal de la diabetes mellitus."
  },
  {
    "id": "bio_53",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuántos corazones tiene un pulpo?",
    "opciones": [
      "3 corazones",
      "1 corazón",
      "2 corazones",
      "8 corazones"
    ],
    "respuestaCorrecta": "3 corazones",
    "explicacion": "Los pulpos tienen dos corazones branquiales que bombean sangre a las branquias y uno sistémico para el resto del cuerpo."
  },
  {
    "id": "bio_54",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué árbol milenario nativo del sur de Chile (Fitzroya cupressoides) puede vivir más de 3.600 años?",
    "opciones": [
      "Alerce",
      "Araucaria",
      "Quillay",
      "Canelo"
    ],
    "respuestaCorrecta": "Alerce",
    "explicacion": "El Alerce o Lahuan es una de las especies arbóreas más longevas del planeta junto al pino bristlecone."
  },
  {
    "id": "bio_55",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el árbol sagrado del pueblo Mapuche?",
    "opciones": [
      "El Canelo (Foye)",
      "El Sauce",
      "El Eucalipto",
      "El Pino"
    ],
    "respuestaCorrecta": "El Canelo (Foye)",
    "explicacion": "El canelo (Drimys winteri) es el árbol sagrado utilizado por la machi en ceremonias como el Machitún y el Nguillatún."
  },
  {
    "id": "bio_56",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué mamífero australiano pone huevos en lugar de parir crías vivas y tiene pico de pato?",
    "opciones": [
      "El ornitorrinco",
      "El koala",
      "El canguro",
      "El demonio de Tasmania"
    ],
    "respuestaCorrecta": "El ornitorrinco",
    "explicacion": "Junto con los equidnas, el ornitorrinco pertenece al orden de los monotremas, mamíferos ovíparos."
  },
  {
    "id": "bio_57",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Dónde se encuentran los tres huesos más pequeños del cuerpo humano (martillo, yunque y estribo)?",
    "opciones": [
      "En el oído medio",
      "En la nariz",
      "En el dedo meñique",
      "En la garganta"
    ],
    "respuestaCorrecta": "En el oído medio",
    "explicacion": "El estribo mide apenas unos 3 milímetros y transmite las vibraciones sonoras hacia el oído interno."
  },
  {
    "id": "bio_58",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Qué vitamina sintetiza principalmente la piel humana al exponerse de forma moderada a la luz del sol?",
    "opciones": [
      "Vitamina D",
      "Vitamina C",
      "Vitamina B12",
      "Vitamina A"
    ],
    "respuestaCorrecta": "Vitamina D",
    "explicacion": "La vitamina D es indispensable para la absorción del calcio y la salud de los huesos."
  },
  {
    "id": "bio_59",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama el proceso de división celular mediante el cual una célula madre genera dos células hijas genéticamente idénticas?",
    "opciones": [
      "Mitosis",
      "Meiosis",
      "Fagocitosis",
      "Sinapsis"
    ],
    "respuestaCorrecta": "Mitosis",
    "explicacion": "La mitosis permite el crecimiento y la regeneración de tejidos, mientras que la meiosis produce gametos sexuales."
  },
  {
    "id": "bio_60",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué par de bases nitrogenadas se unen siempre entre sí en la doble hélice del ADN junto al par Citocina-Guanina?",
    "opciones": [
      "Adenina y Timina (A-T)",
      "Adenina y Uracilo (A-U)",
      "Timina y Guanina (T-G)",
      "Citocina y Adenina (C-A)"
    ],
    "respuestaCorrecta": "Adenina y Timina (A-T)",
    "explicacion": "En el ADN, la Adenina se empareja con la Timina mediante dos puentes de hidrógeno (en el ARN la timina es reemplazada por uracilo)."
  },
  {
    "id": "bio_61",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué científico austríaco y monje agustino formuló las leyes fundamentales de la herencia genética experimentando con arvejas (guisantes)?",
    "opciones": [
      "Gregor Mendel",
      "Charles Darwin",
      "Louis Pasteur",
      "Alexander von Humboldt"
    ],
    "respuestaCorrecta": "Gregor Mendel",
    "explicacion": "Publicadas en 1866, las Leyes de Mendel sentaron las bases de la genética moderna."
  },
  {
    "id": "bio_62",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿A qué reino biológico pertenecen las levaduras, el moho y los champiñones?",
    "opciones": [
      "Reino Fungi (Hongos)",
      "Reino Plantae (Plantas)",
      "Reino Protista",
      "Reino Monera"
    ],
    "respuestaCorrecta": "Reino Fungi (Hongos)",
    "explicacion": "Los hongos no hacen fotosíntesis y sus paredes celulares están compuestas de quitina en lugar de celulosa."
  },
  {
    "id": "bio_63",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuántos pares de cromosomas tiene normalmente una célula somática humana?",
    "opciones": [
      "23 pares (46 cromosomas)",
      "21 pares (42 cromosomas)",
      "24 pares (48 cromosomas)",
      "12 pares (24 cromosomas)"
    ],
    "respuestaCorrecta": "23 pares (46 cromosomas)",
    "explicacion": "22 pares son autosomas y el par 23 corresponde a los cromosomas sexuales (XX o XY)."
  },
  {
    "id": "bio_64",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué científicos descubrieron y propusieron en 1953 la estructura de doble hélice del ADN con el aporte clave de las radiografías de Rosalind Franklin?",
    "opciones": [
      "Watson y Crick",
      "Pasteur y Koch",
      "Darwin y Wallace",
      "Cajal y Golgi"
    ],
    "respuestaCorrecta": "Watson y Crick",
    "explicacion": "James Watson y Francis Crick publicaron su célebre modelo molecular en la revista Nature en abril de 1953."
  },
  {
    "id": "bio_65",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el nombre científico de la especie humana moderna?",
    "opciones": [
      "Homo sapiens",
      "Homo erectus",
      "Homo habilis",
      "Australopithecus afarensis"
    ],
    "respuestaCorrecta": "Homo sapiens",
    "explicacion": "El término fue acuñado por Carl von Linneo en 1758 y significa en latín 'hombre sabio'."
  },
  {
    "id": "bio_66",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué orgánulo celular contiene enzimas digestivas encargadas de degradar desechos y reciclar componentes dentro de la célula?",
    "opciones": [
      "Lisosoma",
      "Ribosoma",
      "Aparato de Golgi",
      "Centríolo"
    ],
    "respuestaCorrecta": "Lisosoma",
    "explicacion": "Los lisosomas mantienen un pH ácido en su interior para descomponer macromoléculas y patógenos."
  },
  {
    "id": "bio_67",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué enfermedad infecciosa fue la primera y única enfermedad humana erradicada por completo en el mundo gracias a la vacunación (declarada en 1980)?",
    "opciones": [
      "La viruela",
      "La poliomielitis",
      "El sarampión",
      "La peste bubónica"
    ],
    "respuestaCorrecta": "La viruela",
    "explicacion": "La OMS certificó la erradicación mundial de la viruela en mayo de 1980 tras una campaña global de vacunación."
  },
  {
    "id": "bio_68",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué pequeño marsupial arborícola de los bosques del sur de Chile es considerado un 'fósil viviente' emparentado con los marsupiales australianos?",
    "opciones": [
      "Monito del monte",
      "Chinchilla",
      "Degú",
      "Visón"
    ],
    "respuestaCorrecta": "Monito del monte",
    "explicacion": "El monito del monte (Dromiciops gliroides) es el único representante vivo del orden Microbiotheria."
  },
  {
    "id": "bio_69",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llaman los vasos sanguíneos microscópicos de paredes finísimas donde ocurre el intercambio de oxígeno y nutrientes con las células?",
    "opciones": [
      "Capilares",
      "Arterias",
      "Venas",
      "Aortas"
    ],
    "respuestaCorrecta": "Capilares",
    "explicacion": "Los capilares conectan las arteriolas con las vénulas y su diámetro es tan pequeño que los glóbulos rojos pasan en fila."
  },
  {
    "id": "bio_70",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué estructura del ojo humano contiene los fotorreceptores (conos y bastones) que transforman la luz en impulsos nerviosos?",
    "opciones": [
      "La retina",
      "La córnea",
      "El cristalino",
      "El iris"
    ],
    "respuestaCorrecta": "La retina",
    "explicacion": "Los conos permiten la visión en colores y los bastones la visión en condiciones de poca luz."
  },
  {
    "id": "bio_71",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué ave es el ser vivo más veloz del planeta, capaz de superar los 320 km/h en su vuelo en picada para cazar?",
    "opciones": [
      "El halcón peregrino",
      "El águila real",
      "El vencejo común",
      "El cóndor"
    ],
    "respuestaCorrecta": "El halcón peregrino",
    "explicacion": "En picada de caza (stoop), el halcón peregrino ha sido cronometrado a velocidades superiores a 350 km/h."
  },
  {
    "id": "bio_72",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué tejido vegetal conduce el agua y las sales minerales (savia bruta) desde las raíces hasta las hojas?",
    "opciones": [
      "Xilema",
      "Floema",
      "Estoma",
      "Cambium"
    ],
    "respuestaCorrecta": "Xilema",
    "explicacion": "El xilema transporta la savia bruta hacia arriba, mientras que el floema distribuye la savia elaborada (azúcares)."
  },
  {
    "id": "bio_73",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué estructura cerebral con forma de caballito de mar es fundamental para consolidar la memoria a largo plazo y la orientación espacial?",
    "opciones": [
      "El hipocampo",
      "El cerebelo",
      "El bulbo raquídeo",
      "La hipófisis"
    ],
    "respuestaCorrecta": "El hipocampo",
    "explicacion": "Situado en el lóbulo temporal, el hipocampo es una de las primeras áreas afectadas en la enfermedad de Alzheimer."
  },
  {
    "id": "bio_74",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué biólogo y filósofo chileno co-creó junto a Francisco Varela el concepto de 'Autopoiesis' para definir la organización de los seres vivos?",
    "opciones": [
      "Humberto Maturana",
      "Igor Saavedra",
      "Claudio Teitelboim",
      "Pablo Valenzuela"
    ],
    "respuestaCorrecta": "Humberto Maturana",
    "explicacion": "Maturana y Varela publicaron 'De máquinas y seres vivos' en 1973, influyendo en la biología, sociología y cibernética."
  },
  {
    "id": "bio_75",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el único felino salvaje del mundo que vive en manadas organizadas socialmente?",
    "opciones": [
      "El león",
      "El tigre",
      "El leopardo",
      "El jaguar"
    ],
    "respuestaCorrecta": "El león",
    "explicacion": "A diferencia del resto de los grandes felinos solitarios, los leones forman manadas compuestas por hembras emparentadas, crías y machos."
  },
  {
    "id": "bio_76",
    "categoria": "biologia",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el animal terrestre más rápido en carreras cortas?",
    "opciones": [
      "El guepardo (chita)",
      "El león",
      "El caballo purasangre",
      "El galgo"
    ],
    "respuestaCorrecta": "El guepardo (chita)",
    "explicacion": "El guepardo puede acelerar de 0 a 100 km/h en apenas 3 segundos."
  },
  {
    "id": "bio_77",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el proceso de transformación biológica por el cual una oruga se convierte en mariposa?",
    "opciones": [
      "Metamorfosis",
      "Fotosíntesis",
      "Muda",
      "Polinización"
    ],
    "respuestaCorrecta": "Metamorfosis",
    "explicacion": "Dentro de la crisálida o pupa, los tejidos de la larva se reorganizan por completo para formar el insecto adulto."
  },
  {
    "id": "bio_78",
    "categoria": "biologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es el diente más largo del mundo animal, que en realidad es un colmillo en espiral que poseen los narvales?",
    "opciones": [
      "El cuerno del narval",
      "El colmillo del elefante",
      "El colmillo de la morsa",
      "El diente del tiburón blanco"
    ],
    "respuestaCorrecta": "El cuerno del narval",
    "explicacion": "El famoso 'cuerno' del narval ártico es en realidad un diente canino izquierdo que atraviesa su labio superior y mide hasta 3 metros."
  },
  {
    "id": "bio_79",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué sustancia resistente forma el exoesqueleto de los insectos, arácnidos y crustáceos?",
    "opciones": [
      "Quitina",
      "Queratina",
      "Celulosa",
      "Lignina"
    ],
    "respuestaCorrecta": "Quitina",
    "explicacion": "La quitina es un polisacárido nitrogenado muy resistente que también forma parte de la pared celular de los hongos."
  },
  {
    "id": "bio_80",
    "categoria": "biologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué bioquímico chileno dirigió el desarrollo de la primera vacuna recombinante del mundo contra la Hepatitis B?",
    "opciones": [
      "Pablo Valenzuela",
      "Humberto Maturana",
      "Mario Luxoro",
      "Hermann Niemeyer"
    ],
    "respuestaCorrecta": "Pablo Valenzuela",
    "explicacion": "Pablo Valenzuela cofundó Chiron Corporation en California y logró clonar el antígeno del virus de la Hepatitis B."
  },
  {
    "id": "qui_31",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el planeta más cercano al Sol en nuestro Sistema Solar?",
    "opciones": [
      "Mercurio",
      "Venus",
      "Marte",
      "Tierra"
    ],
    "respuestaCorrecta": "Mercurio",
    "explicacion": "Mercurio orbita el Sol en apenas 88 días terrestres."
  },
  {
    "id": "qui_32",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿A qué temperatura hierve el agua pura al nivel del mar en la escala Celsius?",
    "opciones": [
      "100 °C",
      "0 °C",
      "90 °C",
      "120 °C"
    ],
    "respuestaCorrecta": "100 °C",
    "explicacion": "A 1 atmósfera de presión, el punto de ebullición del agua es 100 °C y su punto de congelación es 0 °C."
  },
  {
    "id": "qui_33",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el símbolo químico del Hierro en la tabla periódica?",
    "opciones": [
      "Fe",
      "Hi",
      "Ir",
      "He"
    ],
    "respuestaCorrecta": "Fe",
    "explicacion": "Proviene de su nombre en latín, 'Ferrum'."
  },
  {
    "id": "qui_34",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué fuerza invisible atrae los cuerpos hacia el centro de la Tierra y mantiene a los planetas en órbita?",
    "opciones": [
      "La gravedad",
      "El magnetismo",
      "La fricción",
      "La inercia"
    ],
    "respuestaCorrecta": "La gravedad",
    "explicacion": "Descrita por Isaac Newton y reformulada por Albert Einstein como la curvatura del espacio-tiempo."
  },
  {
    "id": "qui_35",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el planeta más grande del Sistema Solar?",
    "opciones": [
      "Júpiter",
      "Saturno",
      "Neptuno",
      "Urano"
    ],
    "respuestaCorrecta": "Júpiter",
    "explicacion": "Júpiter es un gigante gaseoso cuya masa supera más de dos veces la de todos los demás planetas juntos."
  },
  {
    "id": "qui_36",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué instrumento se utiliza para medir la temperatura?",
    "opciones": [
      "Termómetro",
      "Barómetro",
      "Anemómetro",
      "Higrómetro"
    ],
    "respuestaCorrecta": "Termómetro",
    "explicacion": "El barómetro mide la presión atmosférica, mientras que el termómetro mide la temperatura."
  },
  {
    "id": "qui_37",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el satélite natural de la Tierra?",
    "opciones": [
      "La Luna",
      "Fobos",
      "Titán",
      "Europa"
    ],
    "respuestaCorrecta": "La Luna",
    "explicacion": "La Luna es el quinto satélite más grande del Sistema Solar y regula las mareas terrestres."
  },
  {
    "id": "qui_38",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llaman las partículas con carga eléctrica negativa que orbitan alrededor del núcleo del átomo?",
    "opciones": [
      "Electrones",
      "Protones",
      "Neutrones",
      "Fotones"
    ],
    "respuestaCorrecta": "Electrones",
    "explicacion": "Los electrones tienen carga negativa, los protones positiva y los neutrones son eléctricamente neutros."
  },
  {
    "id": "qui_39",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué metal es el principal recurso minero de exportación de Chile y un excelente conductor eléctrico?",
    "opciones": [
      "El cobre (Cu)",
      "El aluminio (Al)",
      "El plomo (Pb)",
      "El zinc (Zn)"
    ],
    "respuestaCorrecta": "El cobre (Cu)",
    "explicacion": "Chile es el mayor productor mundial de cobre, con grandes yacimientos como Chuquicamata y El Teniente."
  },
  {
    "id": "qui_40",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el paso del agua desde el estado líquido al estado gaseoso (vapor)?",
    "opciones": [
      "Evaporación (o vaporización)",
      "Condensación",
      "Solidificación",
      "Fusión"
    ],
    "respuestaCorrecta": "Evaporación (o vaporización)",
    "explicacion": "Al calentarse, las moléculas líquidas ganan energía cinética y pasan a la fase gaseosa."
  },
  {
    "id": "qui_41",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el símbolo químico de la Plata en la tabla periódica?",
    "opciones": [
      "Ag",
      "Pl",
      "Pt",
      "Au"
    ],
    "respuestaCorrecta": "Ag",
    "explicacion": "Proviene del latín 'Argentum' (de donde también deriva el nombre de Argentina)."
  },
  {
    "id": "qui_42",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el símbolo químico del Sodio?",
    "opciones": [
      "Na",
      "So",
      "Sd",
      "S"
    ],
    "respuestaCorrecta": "Na",
    "explicacion": "Proviene del latín 'Natrium'."
  },
  {
    "id": "qui_43",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el símbolo químico del Potasio?",
    "opciones": [
      "K",
      "Po",
      "Pt",
      "P"
    ],
    "respuestaCorrecta": "K",
    "explicacion": "Proviene del neolatín 'Kalium'."
  },
  {
    "id": "qui_44",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el planeta más caliente del Sistema Solar debido a su denso efecto invernadero?",
    "opciones": [
      "Venus",
      "Mercurio",
      "Marte",
      "Júpiter"
    ],
    "respuestaCorrecta": "Venus",
    "explicacion": "Aunque Mercurio está más cerca del Sol, la densa atmósfera de CO2 de Venus atrapa el calor superando los 460 °C."
  },
  {
    "id": "qui_45",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué unidad se utiliza en el Sistema Internacional para medir la frecuencia de las ondas (ciclos por segundo)?",
    "opciones": [
      "Hercio (Hz)",
      "Vatio (W)",
      "Julio (J)",
      "Amperio (A)"
    ],
    "respuestaCorrecta": "Hercio (Hz)",
    "explicacion": "Nombrada en honor al físico alemán Heinrich Hertz, descubridor de las ondas electromagnéticas."
  },
  {
    "id": "qui_46",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el gas noble que se usa para inflar globos que flotan porque es más liviano que el aire y no es inflamable?",
    "opciones": [
      "Helio (He)",
      "Hidrógeno (H)",
      "Neón (Ne)",
      "Argón (Ar)"
    ],
    "respuestaCorrecta": "Helio (He)",
    "explicacion": "El helio es el segundo elemento más ligero del universo y, a diferencia del hidrógeno, es totalmente inerte."
  },
  {
    "id": "qui_47",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué escala mide la acidez o alcalinidad de una disolución acuosa de 0 a 14?",
    "opciones": [
      "Escala de pH",
      "Escala de Mohs",
      "Escala de Kelvin",
      "Escala de Richter"
    ],
    "respuestaCorrecta": "Escala de pH",
    "explicacion": "Un pH de 7 es neutro (agua pura), menor que 7 es ácido y mayor que 7 es básico o alcalino."
  },
  {
    "id": "qui_48",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué científico ruso creó la primera versión de la Tabla Periódica de los Elementos en 1869?",
    "opciones": [
      "Dmitri Mendeléyev",
      "Antoine Lavoisier",
      "Niels Bohr",
      "Ernest Rutherford"
    ],
    "respuestaCorrecta": "Dmitri Mendeléyev",
    "explicacion": "Mendeléyev ordenó los elementos por masa atómica e incluso predijo las propiedades de elementos aún no descubiertos."
  },
  {
    "id": "qui_49",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué mineral alcalino ligero (símbolo Li), abundante en el Salar de Atacama, es clave para fabricar baterías recargables?",
    "opciones": [
      "Litio",
      "Cobalto",
      "Silicio",
      "Grafeno"
    ],
    "respuestaCorrecta": "Litio",
    "explicacion": "El litio es el metal sólido más ligero de la tabla periódica (número atómico 3)."
  },
  {
    "id": "qui_50",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿A qué velocidad aproximada viaja el sonido en el aire a temperatura ambiente (20 °C)?",
    "opciones": [
      "343 metros por segundo (~1.235 km/h)",
      "300.000 km por segundo",
      "100 metros por segundo",
      "5.000 metros por segundo"
    ],
    "respuestaCorrecta": "343 metros por segundo (~1.235 km/h)",
    "explicacion": "Cuando un avión supera esta velocidad (Mach 1), rompe la barrera del sonido generando un estampido sónico."
  },
  {
    "id": "qui_51",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama la galaxia espiral donde se encuentra nuestro Sistema Solar?",
    "opciones": [
      "Vía Láctea",
      "Andrómeda",
      "Nube de Magallanes",
      "Centaurus A"
    ],
    "respuestaCorrecta": "Vía Láctea",
    "explicacion": "La Vía Láctea alberga entre 100.000 y 400.000 millones de estrellas."
  },
  {
    "id": "qui_52",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Qué ley de la conservación enunció Antoine Lavoisier al afirmar que 'la materia no se crea ni se destruye, solo se transforma'?",
    "opciones": [
      "Ley de conservación de la masa",
      "Ley de la gravitación universal",
      "Ley de Ohm",
      "Principio de Arquímedes"
    ],
    "respuestaCorrecta": "Ley de conservación de la masa",
    "explicacion": "En toda reacción química ordinaria, la masa total de los reactivos es igual a la masa total de los productos."
  },
  {
    "id": "qui_53",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el cero absoluto de temperatura expresado en grados Celsius, donde cesa prácticamente todo movimiento térmico?",
    "opciones": [
      "-273,15 °C (0 Kelvin)",
      "-100 °C",
      "-459,67 °C",
      "-196 °C"
    ],
    "respuestaCorrecta": "-273,15 °C (0 Kelvin)",
    "explicacion": "El cero absoluto equivale a 0 K en la escala Kelvin o -273,15 °C."
  },
  {
    "id": "qui_54",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué elemento químico tiene el número atómico 1 y es el más abundante de todo el universo?",
    "opciones": [
      "Hidrógeno (H)",
      "Helio (He)",
      "Carbono (C)",
      "Oxígeno (O)"
    ],
    "respuestaCorrecta": "Hidrógeno (H)",
    "explicacion": "El hidrógeno representa cerca del 75% de la materia visible del universo y es el combustible principal de las estrellas."
  },
  {
    "id": "qui_55",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama el paso directo de una sustancia del estado sólido al gaseoso sin pasar por el estado líquido (como el hielo seco)?",
    "opciones": [
      "Sublimación",
      "Condensación",
      "Licuefacción",
      "Fusión"
    ],
    "respuestaCorrecta": "Sublimación",
    "explicacion": "El dióxido de carbono sólido (hielo seco) y la naftalina se subliman a presión atmosférica normal."
  },
  {
    "id": "qui_56",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué principio físico explica por qué un barco de acero flota al experimentar un empuje hacia arriba igual al peso del fluido desalojado?",
    "opciones": [
      "Principio de Arquímedes",
      "Principio de Pascal",
      "Teorema de Bernoulli",
      "Efecto Doppler"
    ],
    "respuestaCorrecta": "Principio de Arquímedes",
    "explicacion": "Cuenta la leyenda que Arquímedes de Siracusa lo descubrió al sumergirse en una bañera y gritó '¡Eureka!'."
  },
  {
    "id": "qui_57",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué fenómeno físico hace que el tono de la sirena de una ambulancia suene más agudo al acercarse y más grave al alejarse?",
    "opciones": [
      "Efecto Doppler",
      "Efecto Fotoeléctrico",
      "Refracción",
      "Resonancia"
    ],
    "respuestaCorrecta": "Efecto Doppler",
    "explicacion": "Descubierto por Christian Doppler en 1842, también permite a los astrónomos medir si las galaxias se alejan (corrimiento al rojo)."
  },
  {
    "id": "qui_58",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Por qué descubrimiento específico recibió Albert Einstein el Premio Nobel de Física en 1921?",
    "opciones": [
      "La ley del efecto fotoeléctrico",
      "La teoría de la relatividad general",
      "El movimiento browniano",
      "Las ondas gravitacionales"
    ],
    "respuestaCorrecta": "La ley del efecto fotoeléctrico",
    "explicacion": "Curiosamente no lo recibió por la relatividad, sino por explicar cómo la luz arranca electrones de un metal mediante cuantos (fotones)."
  },
  {
    "id": "qui_59",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el único no metal de la tabla periódica que es líquido a temperatura y presión ambiente?",
    "opciones": [
      "Bromo (Br)",
      "Mercurio (Hg)",
      "Cloro (Cl)",
      "Yodo (I)"
    ],
    "respuestaCorrecta": "Bromo (Br)",
    "explicacion": "El mercurio es el único metal líquido a 20 °C, mientras que el bromo es el único no metal líquido en esas condiciones."
  },
  {
    "id": "qui_60",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué ley relaciona el voltaje (V), la intensidad de corriente (I) y la resistencia eléctrica (R) mediante la fórmula V = I × R?",
    "opciones": [
      "Ley de Ohm",
      "Ley de Coulomb",
      "Ley de Faraday",
      "Ley de Joule"
    ],
    "respuestaCorrecta": "Ley de Ohm",
    "explicacion": "Formulada por el físico alemán Georg Simon Ohm en 1827."
  },
  {
    "id": "qui_61",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es la estrella más cercana a nuestro Sistema Solar (después del Sol), ubicada a unos 4,2 años luz?",
    "opciones": [
      "Próxima Centauri",
      "Sirio",
      "Betelgeuse",
      "Polaris"
    ],
    "respuestaCorrecta": "Próxima Centauri",
    "explicacion": "Próxima Centauri es una enana roja perteneciente al sistema estelar triple de Alfa Centauri."
  },
  {
    "id": "qui_62",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué escala del 1 al 10 se utiliza en geología y química mineral para medir la dureza de los minerales, donde el talco es 1 y el diamante es 10?",
    "opciones": [
      "Escala de Mohs",
      "Escala de Kelvin",
      "Escala de Beaufort",
      "Escala de Pauling"
    ],
    "respuestaCorrecta": "Escala de Mohs",
    "explicacion": "Ideada por el geólogo alemán Friedrich Mohs en 1812 basándose en qué mineral raya a otro."
  },
  {
    "id": "qui_63",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llaman los átomos de un mismo elemento químico que tienen el mismo número de protones pero distinto número de neutrones?",
    "opciones": [
      "Isótopos",
      "Iones",
      "Isómeros",
      "Alótropos"
    ],
    "respuestaCorrecta": "Isótopos",
    "explicacion": "Un ejemplo famoso es el Carbono-14, isótopo radiactivo usado para datar restos arqueológicos."
  },
  {
    "id": "qui_64",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el símbolo químico del Tungsteno (o Wolframio), el metal con el punto de fusión más alto?",
    "opciones": [
      "W",
      "Tu",
      "Tg",
      "Wf"
    ],
    "respuestaCorrecta": "W",
    "explicacion": "Su símbolo W proviene de su nombre alemán 'Wolfram', y funde a unos impresionantes 3.422 °C."
  },
  {
    "id": "qui_65",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué astrónomo chileno descubrió las supernovas que sirvieron de base para medir la expansión acelerada del universo y ganó el Premio Nacional de Ciencias?",
    "opciones": [
      "José Maza (junto al Proyecto Calán/Tololo con Mario Hamuy)",
      "Claudio Bunster",
      "Humberto Maturana",
      "Francisco Varela"
    ],
    "respuestaCorrecta": "José Maza (junto al Proyecto Calán/Tololo con Mario Hamuy)",
    "explicacion": "El Proyecto Calán/Tololo en Chile calibró las supernovas tipo Ia, clave para el Nobel de Física de 2011."
  },
  {
    "id": "qui_66",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué partícula subatómica elemental predicha en 1964 y confirmada en el CERN en 2012 explica por qué las partículas tienen masa?",
    "opciones": [
      "Bosón de Higgs",
      "Neutrino",
      "Positrón",
      "Gluón"
    ],
    "respuestaCorrecta": "Bosón de Higgs",
    "explicacion": "Conocida popularmente como 'la partícula de Dios', fue detectada en el Gran Colisionador de Hadrones (LHC)."
  },
  {
    "id": "qui_67",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué ácido fuerte se utiliza dentro de las baterías convencionales de plomo de los automóviles?",
    "opciones": [
      "Ácido sulfúrico (H2SO4)",
      "Ácido clorhídrico (HCl)",
      "Ácido nítrico (HNO3)",
      "Ácido acético"
    ],
    "respuestaCorrecta": "Ácido sulfúrico (H2SO4)",
    "explicacion": "El ácido sulfúrico diluido actúa como electrolito entre las placas de plomo de la batería."
  },
  {
    "id": "qui_68",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué nombre reciben las distintas formas estructurales de un mismo elemento en el mismo estado físico, como el diamante y el grafito respecto al carbono?",
    "opciones": [
      "Alótropos",
      "Isótopos",
      "Polímeros",
      "Coloides"
    ],
    "respuestaCorrecta": "Alótropos",
    "explicacion": "El diamante, el grafito, el grafeno y los fullerenos son alótropos puros del carbono."
  },
  {
    "id": "qui_69",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es el símbolo químico del Plomo, derivado de su nombre en latín 'Plumbum'?",
    "opciones": [
      "Pb",
      "Pl",
      "Pm",
      "Po"
    ],
    "respuestaCorrecta": "Pb",
    "explicacion": "De la palabra latina 'plumbum' (usada en las cañerías romanas) proviene también la palabra 'plomero'."
  },
  {
    "id": "qui_70",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿De qué dos metales está compuesto principalmente el Bronce?",
    "opciones": [
      "Cobre y Estaño",
      "Hierro y Carbono",
      "Cobre y Zinc",
      "Oro y Plata"
    ],
    "respuestaCorrecta": "Cobre y Estaño",
    "explicacion": "El bronce es una aleación de cobre y estaño; el acero es hierro con carbono y el latón es cobre con zinc."
  },
  {
    "id": "qui_71",
    "categoria": "quimica",
    "dificultad": "facil",
    "pregunta": "¿Qué fenómeno óptico y meteorológico descompone la luz solar a través de las gotas de lluvia formando siete colores en el cielo?",
    "opciones": [
      "El arcoíris",
      "La aurora boreal",
      "El espejismo",
      "El eclipse"
    ],
    "respuestaCorrecta": "El arcoíris",
    "explicacion": "Ocurre por la refracción y reflexión interna de la luz blanca del Sol en las gotas de agua."
  },
  {
    "id": "qui_72",
    "categoria": "quimica",
    "dificultad": "media",
    "pregunta": "¿Cuál es la fórmula química del amoníaco?",
    "opciones": [
      "NH3",
      "CH4",
      "H2O2",
      "NaCl"
    ],
    "respuestaCorrecta": "NH3",
    "explicacion": "El amoníaco está formado por un átomo de nitrógeno y tres de hidrógeno; CH4 es el metano y H2O2 el agua oxigenada."
  },
  {
    "id": "qui_73",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿En qué región de Chile se ubica el observatorio ALMA, el mayor proyecto radioastronómico terrestre del mundo?",
    "opciones": [
      "Región de Antofagasta (Llano de Chajnantor)",
      "Región de Coquimbo (La Silla)",
      "Región de Atacama (Copiapó)",
      "Región Metropolitana"
    ],
    "respuestaCorrecta": "Región de Antofagasta (Llano de Chajnantor)",
    "explicacion": "ALMA cuenta con 66 antenas de alta precisión ubicadas a 5.000 metros de altitud cerca de San Pedro de Atacama."
  },
  {
    "id": "qui_74",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué elemento químico radiactivo con símbolo U y número atómico 92 es el combustible más utilizado en los reactores nucleares?",
    "opciones": [
      "Uranio",
      "Plutonio",
      "Radio",
      "Torio"
    ],
    "respuestaCorrecta": "Uranio",
    "explicacion": "El isótopo fisible Uranio-235 se emplea para mantener reacciones en cadena controladas en centrales nucleares."
  },
  {
    "id": "qui_75",
    "categoria": "quimica",
    "dificultad": "dificil",
    "pregunta": "¿Qué ley de la termodinámica establece que la entropía (grado de desorden) de un sistema aislado siempre tiende a aumentar con el tiempo?",
    "opciones": [
      "Segunda ley de la termodinámica",
      "Primera ley de la termodinámica",
      "Ley cero de la termodinámica",
      "Tercera ley de la termodinámica"
    ],
    "respuestaCorrecta": "Segunda ley de la termodinámica",
    "explicacion": "También explica por qué el calor fluye espontáneamente de los cuerpos calientes a los fríos y nunca al revés."
  },
  {
    "id": "art_31",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién escribió el famoso cuento clásico 'El Principito'?",
    "opciones": [
      "Antoine de Saint-Exupéry",
      "Julio Verne",
      "Oscar Wilde",
      "Hans Christian Andersen"
    ],
    "respuestaCorrecta": "Antoine de Saint-Exupéry",
    "explicacion": "El aviador y escritor francés publicó 'El Principito' en 1943, ilustrado con sus propias acuarelas."
  },
  {
    "id": "art_32",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿En qué ciudad europea se encuentra el famoso Museo del Louvre?",
    "opciones": [
      "París",
      "Madrid",
      "Roma",
      "Londres"
    ],
    "respuestaCorrecta": "París",
    "explicacion": "El Louvre en París es el museo de arte más visitado del mundo y alberga la Mona Lisa y la Venus de Milo."
  },
  {
    "id": "art_33",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué poetisa chilena fue la primera persona de América Latina en ganar el Premio Nobel de Literatura en 1945?",
    "opciones": [
      "Gabriela Mistral",
      "Violeta Parra",
      "Isabel Allende",
      "Marcela Paz"
    ],
    "respuestaCorrecta": "Gabriela Mistral",
    "explicacion": "Lucila Godoy Alcayaga (Gabriela Mistral) recibió el galardón de la Academia Sueca el 10 de diciembre de 1945."
  },
  {
    "id": "art_34",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién creó al famoso niño travieso chileno 'Papelucho'?",
    "opciones": [
      "Marcela Paz",
      "Gabriela Mistral",
      "Marta Brunet",
      "María Luisa Bombal"
    ],
    "respuestaCorrecta": "Marcela Paz",
    "explicacion": "Ester Huneeus Salas, bajo el seudónimo de Marcela Paz, publicó el primer libro de Papelucho en 1947."
  },
  {
    "id": "art_35",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién pintó el famoso mural 'La última cena'?",
    "opciones": [
      "Leonardo da Vinci",
      "Miguel Ángel",
      "Rafael Sanzio",
      "Caravaggio"
    ],
    "respuestaCorrecta": "Leonardo da Vinci",
    "explicacion": "Da Vinci lo pintó entre 1495 y 1498 en el refectorio del convento de Santa Maria delle Grazie en Milán."
  },
  {
    "id": "art_36",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿En qué mitología antigua Zeus es el rey de los dioses del Olimpo?",
    "opciones": [
      "Mitología griega",
      "Mitología romana",
      "Mitología nórdica",
      "Mitología egipcia"
    ],
    "respuestaCorrecta": "Mitología griega",
    "explicacion": "En la mitología griega es Zeus; su equivalente en la mitología romana es Júpiter."
  },
  {
    "id": "art_37",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién escribió la famosa tragedia de amor 'Romeo y Julieta'?",
    "opciones": [
      "William Shakespeare",
      "Miguel de Cervantes",
      "Dante Alighieri",
      "Molière"
    ],
    "respuestaCorrecta": "William Shakespeare",
    "explicacion": "Shakespeare ambientó la historia de los amantes de las familias Montesco y Capuleto en la ciudad italiana de Verona."
  },
  {
    "id": "art_38",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso detective ficticio de Londres vive en el 221B de Baker Street junto a su amigo el Dr. Watson?",
    "opciones": [
      "Sherlock Holmes",
      "Hércules Poirot",
      " Auguste Dupin",
      "Philip Marlowe"
    ],
    "respuestaCorrecta": "Sherlock Holmes",
    "explicacion": "Fue creado en 1887 por el escritor y médico escocés Sir Arthur Conan Doyle."
  },
  {
    "id": "art_39",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba el fiel escudero de Don Quijote de la Mancha?",
    "opciones": [
      "Sancho Panza",
      "Rocinante",
      "Dulcinea",
      "Lazarillo"
    ],
    "respuestaCorrecta": "Sancho Panza",
    "explicacion": "Sancho Panza acompaña a Alonso Quijano montado en su burro Rucio, aportando el sentido común popular."
  },
  {
    "id": "art_40",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Qué pintora mexicana es célebre por sus intensos autorretratos y su vida en la Casa Azul de Coyoacán?",
    "opciones": [
      "Frida Kahlo",
      "Remedios Varo",
      "Leonora Carrington",
      "Tamara de Lempicka"
    ],
    "respuestaCorrecta": "Frida Kahlo",
    "explicacion": "Frida Kahlo plasmó su dolor físico y la identidad mexicana en obras como 'Las dos Fridas' y 'La columna rota'."
  },
  {
    "id": "art_41",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué escritora chilena es autora de la célebre novela 'La casa de los espíritus' (1982)?",
    "opciones": [
      "Isabel Allende",
      "Diamela Eltit",
      "María Luisa Bombal",
      "Carla Guelfenbein"
    ],
    "respuestaCorrecta": "Isabel Allende",
    "explicacion": "Es la escritora viva en lengua española más leída del mundo, con más de 75 millones de ejemplares vendidos."
  },
  {
    "id": "art_42",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién pintó el famoso cuadro 'El grito' en 1893?",
    "opciones": [
      "Edvard Munch",
      "Gustav Klimt",
      "Claude Monet",
      "Paul Cézanne"
    ],
    "respuestaCorrecta": "Edvard Munch",
    "explicacion": "El pintor expresionista noruego Edvard Munch creó cuatro versiones de esta icónica obra sobre la angustia humana."
  },
  {
    "id": "art_43",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor español fue el creador del Cubismo y pintó 'Las señoritas de Aviñón'?",
    "opciones": [
      "Pablo Picasso",
      "Salvador Dalí",
      "Joan Miró",
      "Diego Velázquez"
    ],
    "respuestaCorrecta": "Pablo Picasso",
    "explicacion": "Junto a Georges Braque, Picasso revolucionó el arte del siglo XX fragmentando las formas en planos geométricos."
  },
  {
    "id": "art_44",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la novela distópica '1984', de donde proviene el concepto del 'Gran Hermano' (Big Brother)?",
    "opciones": [
      "George Orwell",
      "Aldous Huxley",
      "Ray Bradbury",
      "H. G. Wells"
    ],
    "respuestaCorrecta": "George Orwell",
    "explicacion": "Publicada en 1949 por Eric Arthur Blair (George Orwell), también autor de 'Rebelión en la granja'."
  },
  {
    "id": "art_45",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué escultor francés creó la famosa estatua en bronce de 'El pensador'?",
    "opciones": [
      "Auguste Rodin",
      "Gian Lorenzo Bernini",
      "Donatello",
      "Fernando Botero"
    ],
    "respuestaCorrecta": "Auguste Rodin",
    "explicacion": "Originalmente concebida como un retrato de Dante meditando frente a 'Las puertas del Infierno'."
  },
  {
    "id": "art_46",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué poeta chileno creó la 'Antipoesía' con su libro 'Poemas y antipoemas' (1954) y vivió hasta los 103 años?",
    "opciones": [
      "Nicanor Parra",
      "Vicente Huidobro",
      "Gonzalo Rojas",
      "Pablo de Rokha"
    ],
    "respuestaCorrecta": "Nicanor Parra",
    "explicacion": "Hermano mayor de Violeta Parra, Nicanor ganó el Premio Cervantes en 2011."
  },
  {
    "id": "art_47",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿En qué museo de Madrid se exhibe 'Las Meninas' de Diego Velázquez?",
    "opciones": [
      "Museo del Prado",
      "Museo Reina Sofía",
      "Museo Thyssen-Bornemisza",
      "Museo Guggenheim"
    ],
    "respuestaCorrecta": "Museo del Prado",
    "explicacion": "Las Meninas está en el Museo del Prado, mientras que el Guernica de Picasso está en el Reina Sofía."
  },
  {
    "id": "art_48",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió 'La Metamorfosis', donde el protagonista Gregorio Samsa despierta convertido en un monstruoso insecto?",
    "opciones": [
      "Franz Kafka",
      "Fiódor Dostoyevski",
      "Thomas Mann",
      "Albert Camus"
    ],
    "respuestaCorrecta": "Franz Kafka",
    "explicacion": "Publicada en 1915, la obra de Kafka dio origen al adjetivo 'kafkiano' para describir situaciones absurdas y angustiantes."
  },
  {
    "id": "art_49",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué pintor neerlandés pintó 'La joven de la perla' en el siglo XVII?",
    "opciones": [
      "Johannes Vermeer",
      "Rembrandt",
      "Vincent van Gogh",
      "El Bosco"
    ],
    "respuestaCorrecta": "Johannes Vermeer",
    "explicacion": "Conocida como la 'Mona Lisa del Norte', destaca por el dominio de la luz de Vermeer de Delft."
  },
  {
    "id": "art_50",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió 'Veinte poemas de amor y una canción desesperada' a los 19 años de edad?",
    "opciones": [
      "Pablo Neruda",
      "Federico García Lorca",
      "Mario Benedetti",
      "Rubén Darío"
    ],
    "respuestaCorrecta": "Pablo Neruda",
    "explicacion": "Publicado en 1924, es uno de los poemarios más célebres de la lengua castellana."
  },
  {
    "id": "art_51",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién es la autora británica de la clásica novela gótica 'Frankenstein o el moderno Prometeo' (1818)?",
    "opciones": [
      "Mary Shelley",
      "Jane Austen",
      "Emily Brontë",
      "Virginia Woolf"
    ],
    "respuestaCorrecta": "Mary Shelley",
    "explicacion": "Mary Shelley la escribió con apenas 18 años durante un verano lluvioso en Suiza junto a Lord Byron y Percy Shelley."
  },
  {
    "id": "art_52",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué arquitecto catalán diseñó el templo expiatorio de la Sagrada Familia y el Parque Güell en Barcelona?",
    "opciones": [
      "Antoni Gaudí",
      "Santiago Calatrava",
      "Le Corbusier",
      "Frank Lloyd Wright"
    ],
    "respuestaCorrecta": "Antoni Gaudí",
    "explicacion": "Gaudí es el máximo exponente del modernismo catalán y dedicó los últimos años de su vida a la Sagrada Familia."
  },
  {
    "id": "art_53",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué poeta chileno fundó el movimiento vanguardista del 'Creacionismo' y escribió el poema épico 'Altazor'?",
    "opciones": [
      "Vicente Huidobro",
      "Pablo de Rokha",
      "Jorge Teillier",
      "Raúl Zurita"
    ],
    "respuestaCorrecta": "Vicente Huidobro",
    "explicacion": "En su manifiesto 'Non Serviam', Huidobro proclamó que 'el poeta es un pequeño Dios'."
  },
  {
    "id": "art_54",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién pintó el famoso tríptico medieval-renacentista 'El jardín de las delicias'?",
    "opciones": [
      "El Bosco (Jheronimus Bosch)",
      "Pieter Brueghel el Viejo",
      "Jan van Eyck",
      "Alberto Durero"
    ],
    "respuestaCorrecta": "El Bosco (Jheronimus Bosch)",
    "explicacion": "Pintado hacia el año 1500, se conserva en el Museo del Prado de Madrid."
  },
  {
    "id": "art_55",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué escritor ruso es el autor de las monumentales novelas 'Crimen y castigo' y 'Los hermanos Karamázov'?",
    "opciones": [
      "Fiódor Dostoyevski",
      "León Tolstói",
      "Antón Chéjov",
      "Nikolái Gógol"
    ],
    "respuestaCorrecta": "Fiódor Dostoyevski",
    "explicacion": "Dostoyevski exploró con maestría la psicología humana, la culpa y la redención; Tolstói escribió 'Guerra y paz'."
  },
  {
    "id": "art_56",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué pintor chileno del movimiento Surrealista internacional es considerado el último de los grandes surrealistas ('El primer gol del pueblo chileno')?",
    "opciones": [
      "Roberto Matta",
      "Claudio Bravo",
      "Oswaldo Guayasamín",
      "Nemesio Antúnez"
    ],
    "respuestaCorrecta": "Roberto Matta",
    "explicacion": "Roberto Matta Echaurren fue figura clave del surrealismo en París y Nueva York e influyó en el expresionismo abstracto."
  },
  {
    "id": "art_57",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién pintó el célebre cuadro dorado 'El beso' entre 1907 y 1908?",
    "opciones": [
      "Gustav Klimt",
      "Egon Schiele",
      "Henri Matisse",
      "Marc Chagall"
    ],
    "respuestaCorrecta": "Gustav Klimt",
    "explicacion": "El pintor simbolista austríaco empleó pan de oro real sobre el lienzo; se exhibe en el Palacio Belvedere de Viena."
  },
  {
    "id": "art_58",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué escritor chileno escribió las aclamadas novelas 'Los detectives salvajes' y '2666'?",
    "opciones": [
      "Roberto Bolaño",
      "José Donoso",
      "Jorge Edwards",
      "Alejandro Zambra"
    ],
    "respuestaCorrecta": "Roberto Bolaño",
    "explicacion": "Tras su muerte en 2003, Bolaño se consolidó como uno de los autores latinoamericanos más influyentes del cambio de siglo."
  },
  {
    "id": "art_59",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué movimiento artístico francés del siglo XIX recibió su nombre a partir del cuadro 'Impresión, sol naciente' de Claude Monet?",
    "opciones": [
      "Impresionismo",
      "Expresionismo",
      "Surrealismo",
      "Fauvismo"
    ],
    "respuestaCorrecta": "Impresionismo",
    "explicacion": "Pintores como Monet, Renoir y Degas buscaron captar la luz cambiante al aire libre con pinceladas sueltas."
  },
  {
    "id": "art_60",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién compuso el famoso ballet 'El lago de los cisnes' y 'El cascanueces'?",
    "opciones": [
      "Piotr Ilich Chaikovski",
      "Ígor Stravinski",
      "Serguéi Prokófiev",
      "Frédéric Chopin"
    ],
    "respuestaCorrecta": "Piotr Ilich Chaikovski",
    "explicacion": "El compositor romántico ruso creó las partituras más célebres de la historia del ballet clásico."
  },
  {
    "id": "art_61",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué escritor argentino ciego y director de la Biblioteca Nacional escribió los libros de cuentos 'Ficciones' y 'El Aleph'?",
    "opciones": [
      "Jorge Luis Borges",
      "Julio Cortázar",
      "Ernesto Sabato",
      "Adolfo Bioy Casares"
    ],
    "respuestaCorrecta": "Jorge Luis Borges",
    "explicacion": "Borges revolucionó la literatura universal con sus cuentos sobre laberintos, espejos y el infinito."
  },
  {
    "id": "art_62",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama la escultura griega helenística sin cabeza ni brazos que representa a la diosa alada de la Victoria en la proa de un barco?",
    "opciones": [
      "La Victoria de Samotracia",
      "La Venus de Milo",
      "El Discóbolo",
      "El Laocoonte"
    ],
    "respuestaCorrecta": "La Victoria de Samotracia",
    "explicacion": "Tallada hacia el 190 a.C., preside la gran escalinata Daru del Museo del Louvre."
  },
  {
    "id": "art_63",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué pintor español retrató los horrores de la invasión napoleónica en 'El 3 de mayo en Madrid' y pintó 'Saturno devorando a su hijo'?",
    "opciones": [
      "Francisco de Goya",
      "El Greco",
      "Bartolomé Esteban Murillo",
      "Joaquín Sorolla"
    ],
    "respuestaCorrecta": "Francisco de Goya",
    "explicacion": "Sus 'Pinturas negras', realizadas en las paredes de su casa (la Quinta del Sordo), anticiparon el arte moderno."
  },
  {
    "id": "art_64",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué escritor peruano ganó el Premio Nobel de Literatura en 2010 y es autor de 'La ciudad y los perros'?",
    "opciones": [
      "Mario Vargas Llosa",
      "César Vallejo",
      "Alfredo Bryce Echenique",
      "Julio Ramón Ribeyro"
    ],
    "respuestaCorrecta": "Mario Vargas Llosa",
    "explicacion": "Integrante fundamental del Boom latinoamericano junto a García Márquez, Cortázar y Carlos Fuentes."
  },
  {
    "id": "art_65",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién escribió la novela 'Rayuela' (1963), famosa por poder leerse en orden tradicional o saltando capítulos según un tablero de dirección?",
    "opciones": [
      "Julio Cortázar",
      "Juan Rulfo",
      "Carlos Fuentes",
      "Mario Benedetti"
    ],
    "respuestaCorrecta": "Julio Cortázar",
    "explicacion": "La historia de Horacio Oliveira y La Maga en París y Buenos Aires rompió los moldes narrativos en español."
  },
  {
    "id": "art_66",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué novela corta de Juan Rulfo comienza con la famosa frase: 'Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo'?",
    "opciones": [
      "Pedro Páramo",
      "El llano en llamas",
      "Los de abajo",
      "La muerte de Artemio Cruz"
    ],
    "respuestaCorrecta": "Pedro Páramo",
    "explicacion": "Publicada en 1955, es precursora directa del realismo mágico latinoamericano."
  },
  {
    "id": "art_67",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Quién pintó 'El nacimiento de Venus', donde la diosa emerge del mar sobre una gran concha?",
    "opciones": [
      "Sandro Botticelli",
      "Tiziano",
      "Rafael Sanzio",
      "Fra Angelico"
    ],
    "respuestaCorrecta": "Sandro Botticelli",
    "explicacion": "Obra maestra del Quattrocento italiano (hacia 1485), conservada en la Galería Uffizi de Florencia."
  },
  {
    "id": "art_68",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué novela de José Donoso retrata la decadencia de una familia aristocrática chilena a través de seres marginales encerrados en una casona?",
    "opciones": [
      "El obsceno pájaro de la noche",
      "Coronación",
      "El lugar sin límites",
      "Casa de campo"
    ],
    "respuestaCorrecta": "El obsceno pájaro de la noche",
    "explicacion": "Publicada en 1970, es considerada la cumbre literaria de José Donoso."
  },
  {
    "id": "art_69",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué dramaturgo griego de la Antigüedad escribió la tragedia 'Edipo Rey'?",
    "opciones": [
      "Sófocles",
      "Eurípides",
      "Esquilo",
      "Aristófanes"
    ],
    "respuestaCorrecta": "Sófocles",
    "explicacion": "Aristóteles consideró a 'Edipo Rey' de Sófocles como el ejemplo más perfecto de la tragedia griega."
  },
  {
    "id": "art_70",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué pintor impresionista francés pintó más de 250 óleos de su jardín acuático de 'Nenúfares' en Giverny?",
    "opciones": [
      "Claude Monet",
      "Pierre-Auguste Renoir",
      "Edgar Degas",
      "Camille Pissarro"
    ],
    "respuestaCorrecta": "Claude Monet",
    "explicacion": "Monet siguió pintando sus nenúfares incluso cuando padecía cataratas avanzadas."
  },
  {
    "id": "art_71",
    "categoria": "arte",
    "dificultad": "facil",
    "pregunta": "¿Quién escribió el cuento clásico de 'Pinocho', la marioneta de madera a la que le crece la nariz al mentir?",
    "opciones": [
      "Carlo Collodi",
      "Charles Perrault",
      "Hermanos Grimm",
      "Esopo"
    ],
    "respuestaCorrecta": "Carlo Collodi",
    "explicacion": "El italiano Carlo Collodi publicó 'Las aventuras de Pinocho' por entregas entre 1881 y 1883."
  },
  {
    "id": "art_72",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Quién escribió la novela 'El retrato de Dorian Gray', sobre un joven que nunca envejece mientras su cuadro se corrompe?",
    "opciones": [
      "Oscar Wilde",
      "Bram Stoker",
      "Robert Louis Stevenson",
      "Charles Dickens"
    ],
    "respuestaCorrecta": "Oscar Wilde",
    "explicacion": "La única novela del ingenioso autor irlandés Oscar Wilde fue publicada en 1890."
  },
  {
    "id": "art_73",
    "categoria": "arte",
    "dificultad": "media",
    "pregunta": "¿Qué escritor irlandés creó al conde 'Drácula' en su famosa novela epistolar de 1897?",
    "opciones": [
      "Bram Stoker",
      "Oscar Wilde",
      "James Joyce",
      "Edgar Allan Poe"
    ],
    "respuestaCorrecta": "Bram Stoker",
    "explicacion": "Stoker se inspiró en el folclore de Europa del Este y en la figura histórica de Vlad el Empalador."
  },
  {
    "id": "art_74",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿En qué ciudad italiana se encuentra la Galería de la Academia que alberga la estatua original del 'David' de Miguel Ángel?",
    "opciones": [
      "Florencia",
      "Roma",
      "Venecia",
      "Milán"
    ],
    "respuestaCorrecta": "Florencia",
    "explicacion": "El David de mármol blanco de más de 5 metros fue esculpido para la ciudad de Florencia entre 1501 y 1504."
  },
  {
    "id": "art_75",
    "categoria": "arte",
    "dificultad": "dificil",
    "pregunta": "¿Qué escritor chileno ganó el Premio Cervantes en 1999 con novelas como 'Persona non grata'?",
    "opciones": [
      "Jorge Edwards",
      "Gonzalo Rojas",
      "Nicanor Parra",
      "Antonio Skármeta"
    ],
    "respuestaCorrecta": "Jorge Edwards",
    "explicacion": "Tres autores chilenos han ganado el Premio Cervantes: Jorge Edwards (1999), Gonzalo Rojas (2003) y Nicanor Parra (2011)."
  },
  {
    "id": "dep_26",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué año se jugó la Copa Mundial de Fútbol organizada en Chile, donde La Roja obtuvo el tercer lugar?",
    "opciones": [
      "1962",
      "1950",
      "1970",
      "1974"
    ],
    "respuestaCorrecta": "1962",
    "explicacion": "Bajo el lema de Carlos Dittborn 'Porque no tenemos nada, queremos hacerlo todo', Chile logró el 3º puesto en 1962."
  },
  {
    "id": "dep_27",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Contra qué selección ganó Chile las dos finales de la Copa América 2015 y Copa América Centenario 2016 por penales?",
    "opciones": [
      "Argentina",
      "Brasil",
      "Uruguay",
      "Colombia"
    ],
    "respuestaCorrecta": "Argentina",
    "explicacion": "La Generación Dorada venció a Argentina en las tandas de penales de Santiago (2015) y Nueva Jersey (2016)."
  },
  {
    "id": "dep_28",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué tenista chileno llegó a ser el Número 1 del mundo del ranking ATP en marzo de 1998?",
    "opciones": [
      "Marcelo 'Chino' Ríos",
      "Fernando González",
      "Nicolás Massú",
      "Patricio Cornejo"
    ],
    "respuestaCorrecta": "Marcelo 'Chino' Ríos",
    "explicacion": "Tras vencer a Andre Agassi en la final de Miami (Key Biscayne), el 'Chino' fue el primer latinoamericano Nº 1 de la ATP."
  },
  {
    "id": "dep_29",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cuántos jugadores por equipo hay dentro de la cancha al inicio de un partido oficial de fútbol?",
    "opciones": [
      "11 jugadores",
      "10 jugadores",
      "12 jugadores",
      "9 jugadores"
    ],
    "respuestaCorrecta": "11 jugadores",
    "explicacion": "Cada equipo alinea 10 jugadores de campo y 1 guardameta (arquero)."
  },
  {
    "id": "dep_30",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué ciudad se disputaron los Juegos Olímpicos de 2004 donde Nicolás Massú y Fernando González ganaron el primer oro olímpico para Chile?",
    "opciones": [
      "Atenas",
      "Sídney",
      "Pekín",
      "Atlanta"
    ],
    "respuestaCorrecta": "Atenas",
    "explicacion": "En Atenas 2004 ganaron el oro en dobles, y al día siguiente Massú ganó también el oro individual."
  },
  {
    "id": "dep_31",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cuál es el único club chileno masculino que ha ganado la Copa Libertadores de América (en 1991)?",
    "opciones": [
      "Colo-Colo",
      "Universidad de Chile",
      "Universidad Católica",
      "Cobreloa"
    ],
    "respuestaCorrecta": "Colo-Colo",
    "explicacion": "Dirigido por Mirko Jozić, Colo-Colo venció 3-0 a Olimpia de Paraguay el 5 de junio de 1991 en el Estadio Monumental."
  },
  {
    "id": "dep_32",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué club chileno ganó la Copa Sudamericana en 2011 de manera invicta bajo la dirección de Jorge Sampaoli?",
    "opciones": [
      "Universidad de Chile",
      "Colo-Colo",
      "Universidad Católica",
      "Unión Española"
    ],
    "respuestaCorrecta": "Universidad de Chile",
    "explicacion": "Con Eduardo Vargas como goleador del torneo, la 'U' venció a Liga de Quito en la final."
  },
  {
    "id": "dep_33",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Cuántos minutos dura el tiempo reglamentario de un partido de fútbol profesional (sin contar descuentos ni alargue)?",
    "opciones": [
      "90 minutos",
      "80 minutos",
      "60 minutos",
      "100 minutos"
    ],
    "respuestaCorrecta": "90 minutos",
    "explicacion": "Se divide en dos tiempos de 45 minutos con un descanso de 15 minutos."
  },
  {
    "id": "dep_34",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué país ganó la Copa Mundial de la FIFA Catar 2022?",
    "opciones": [
      "Argentina",
      "Francia",
      "Croacia",
      "Brasil"
    ],
    "respuestaCorrecta": "Argentina",
    "explicacion": "Argentina, liderada por Lionel Messi, venció a Francia en los penales tras empatar 3-3 en una final histórica."
  },
  {
    "id": "dep_35",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿En qué deporte se utiliza un bate, un guante de cuero y cuatro bases formando un diamante?",
    "opciones": [
      "Béisbol",
      "Críquet",
      "Rugby",
      "Polo"
    ],
    "respuestaCorrecta": "Béisbol",
    "explicacion": "El corredor debe pisar primera, segunda y tercera base hasta llegar al 'home plate' para anotar una carrera."
  },
  {
    "id": "dep_36",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué legendario boxeador estadounidense nació como Cassius Clay y decía que 'flotaba como una mariposa y picaba como una abeja'?",
    "opciones": [
      "Muhammad Ali",
      "Mike Tyson",
      "Floyd Mayweather",
      "George Foreman"
    ],
    "respuestaCorrecta": "Muhammad Ali",
    "explicacion": "Muhammad Ali fue tres veces campeón mundial de los pesos pesados y medalla de oro en Roma 1960."
  },
  {
    "id": "dep_37",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿De qué color es el cinturón que representa el grado de maestría en artes marciales como el Karate o el Judo?",
    "opciones": [
      "Negro",
      "Rojo",
      "Dorado",
      "Blanco"
    ],
    "respuestaCorrecta": "Negro",
    "explicacion": "El cinturón blanco representa al principiante y el negro al experto (con grados Dan)."
  },
  {
    "id": "dep_38",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Quién es el máximo goleador histórico de la Selección Chilena de Fútbol ('La Roja')?",
    "opciones": [
      "Alexis Sánchez",
      "Eduardo Vargas",
      "Marcelo Salas",
      "Iván Zamorano"
    ],
    "respuestaCorrecta": "Alexis Sánchez",
    "explicacion": "El 'Niño Maravilla' superó la marca histórica de Marcelo Salas en 2017 y acumula más de 50 goles con La Roja."
  },
  {
    "id": "dep_39",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamó la famosa dupla delantera de Chile en las eliminatorias y el Mundial de Francia 1998?",
    "opciones": [
      "Za-Sa (Zamorano y Salas)",
      "Ro-Sa (Rozental y Salas)",
      "Sa-Va (Sánchez y Vargas)",
      "Ca-Le (Caszely y Letelier)"
    ],
    "respuestaCorrecta": "Za-Sa (Zamorano y Salas)",
    "explicacion": "Iván 'Bam Bam' Zamorano y José Marcelo 'Matador' Salas llevaron a Chile de vuelta a un Mundial tras 16 años."
  },
  {
    "id": "dep_40",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué tenista suizo ganó 20 títulos de Grand Slam, incluidos 8 trofeos en el césped de Wimbledon?",
    "opciones": [
      "Roger Federer",
      "Stan Wawrinka",
      "Novak Djokovic",
      "Björn Borg"
    ],
    "respuestaCorrecta": "Roger Federer",
    "explicacion": "Considerado un ícono de elegancia deportiva, Federer se retiró profesionalmente en la Laver Cup de 2022."
  },
  {
    "id": "dep_41",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿En qué ciudad se celebraron los Juegos Panamericanos y Parapanamericanos de 2023?",
    "opciones": [
      "Santiago de Chile",
      "Lima",
      "Buenos Aires",
      "Guadalajara"
    ],
    "respuestaCorrecta": "Santiago de Chile",
    "explicacion": "Santiago 2023 fue el mayor evento multideportivo de la historia de Chile y dejó como mascota al querido pajarito Fiu."
  },
  {
    "id": "dep_42",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamaba el pájaro de siete colores que fue la mascota oficial de los Juegos Panamericanos Santiago 2023?",
    "opciones": [
      "Fiu",
      "Zincha",
      "Rojita",
      "Choclito"
    ],
    "respuestaCorrecta": "Fiu",
    "explicacion": "Inspirado en el pájaro siete colores de los humedales chilenos, Fiu causó furor en todo el país."
  },
  {
    "id": "dep_43",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué selección de rugby es famosa por vestir completamente de negro y realizar la danza maorí 'Haka' antes de cada partido?",
    "opciones": [
      "Nueva Zelanda (All Blacks)",
      "Sudáfrica (Springboks)",
      "Australia (Wallabies)",
      "Fiyi"
    ],
    "respuestaCorrecta": "Nueva Zelanda (All Blacks)",
    "explicacion": "Los All Blacks han ganado tres Copas del Mundo de Rugby (1987, 2011 y 2015)."
  },
  {
    "id": "dep_44",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué arquera chilena fue elegida por la FIFA como la Mejor Arquera del Mundo en los premios The Best 2021?",
    "opciones": [
      "Christiane Endler",
      "Natalia Campos",
      "Antonia Canales",
      "Ryann Torrero"
    ],
    "respuestaCorrecta": "Christiane Endler",
    "explicacion": "'Tiane' Endler, histórica capitana de La Roja Femenina y campeona de la Champions League con el Olympique de Lyon, ganó el premio en enero de 2022."
  },
  {
    "id": "dep_45",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Cuántos sets como máximo se pueden disputar en un partido masculino individual de torneo Grand Slam de tenis?",
    "opciones": [
      "5 sets (al mejor de 5)",
      "3 sets (al mejor de 3)",
      "7 sets",
      "4 sets"
    ],
    "respuestaCorrecta": "5 sets (al mejor de 5)",
    "explicacion": "En los cuatro torneos de Grand Slam el cuadro masculino se juega al primero que gane 3 de 5 sets."
  },
  {
    "id": "dep_46",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué país ganó el primer Mundial de Fútbol de la historia en 1930, jugado en su propio territorio?",
    "opciones": [
      "Uruguay",
      "Argentina",
      "Italia",
      "Brasil"
    ],
    "respuestaCorrecta": "Uruguay",
    "explicacion": "Uruguay derrotó 4-2 a Argentina en la final disputada en el Estadio Centenario de Montevideo."
  },
  {
    "id": "dep_47",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué piloto brasileño de Fórmula 1, tricampeón mundial con McLaren, falleció trágicamente en el circuito de Imola en 1994?",
    "opciones": [
      "Ayrton Senna",
      "Nelson Piquet",
      "Emerson Fittipaldi",
      "Rubens Barrichello"
    ],
    "respuestaCorrecta": "Ayrton Senna",
    "explicacion": "Ayrton Senna ganó los campeonatos de 1988, 1990 y 1991 y es considerado uno de los pilotos más veloces de todos los tiempos."
  },
  {
    "id": "dep_48",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿En qué deporte destacó mundialmente el chileno Carlo de Gavardo ('El Cóndor de Huelquén') y luego Francisco 'Chaleco' López?",
    "opciones": [
      "Motociclismo Rally Cross-Country (Rally Dakar)",
      "Fórmula 1",
      "Ciclismo en pista",
      "Salto ecuestre"
    ],
    "respuestaCorrecta": "Motociclismo Rally Cross-Country (Rally Dakar)",
    "explicacion": "Carlo de Gavardo fue campeón mundial de rally y el primer chileno en lograr un podio en el Rally Dakar."
  },
  {
    "id": "dep_49",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué leyenda del básquetbol de Los Angeles Lakers fue apodado 'Black Mamba' y usó los números 8 y 24?",
    "opciones": [
      "Kobe Bryant",
      "LeBron James",
      "Shaquille O'Neal",
      "Magic Johnson"
    ],
    "respuestaCorrecta": "Kobe Bryant",
    "explicacion": "Kobe Bryant ganó 5 anillos de la NBA con los Lakers y dos oros olímpicos."
  },
  {
    "id": "dep_50",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Con qué icónica camiseta (color) se premia al líder general de la clasificación en el Tour de Francia de ciclismo?",
    "opciones": [
      "Maillot Amarillo",
      "Maillot Rosa",
      "Maillot Verde",
      "Maillot Rojo"
    ],
    "respuestaCorrecta": "Maillot Amarillo",
    "explicacion": "El Maillot Jaune (amarillo) identifica al líder del Tour de Francia; la Maglia Rosa es del Giro de Italia."
  },
  {
    "id": "dep_51",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué defensa central chileno fue elegido tres veces consecutivas (1974, 1975 y 1976) como el Mejor Futbolista de América y es famoso por 'el área iluminada'?",
    "opciones": [
      "Elías Figueroa",
      "Alberto Quintano",
      "Luis Eyzaguirre",
      "Javier Margas"
    ],
    "respuestaCorrecta": "Elías Figueroa",
    "explicacion": "'Don Elías' brilló en Peñarol e Internacional de Porto Alegre y disputó tres Mundiales (1966, 1974 y 1982)."
  },
  {
    "id": "dep_52",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Quién es el único futbolista de la historia en haber ganado 3 Copas del Mundo de la FIFA como jugador (1958, 1962 y 1970)?",
    "opciones": [
      "Pelé",
      "Cafú",
      "Ronaldo Nazário",
      "Garrincha"
    ],
    "respuestaCorrecta": "Pelé",
    "explicacion": "Edson Arantes do Nascimento (Pelé) debutó ganando Suecia 1958 a los 17 años y cerró su ciclo en México 1970."
  },
  {
    "id": "dep_53",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el récord mundial de los 100 metros planos establecido por Usain Bolt en Berlín en 2009?",
    "opciones": [
      "9,58 segundos",
      "9,69 segundos",
      "9,45 segundos",
      "9,72 segundos"
    ],
    "respuestaCorrecta": "9,58 segundos",
    "explicacion": "Bolt batió su propio récord de Pekín (9,69 s) dejando la marca en unos asombrosos 9,58 segundos."
  },
  {
    "id": "dep_54",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué tiradora chilena de tiro skeet ganó la medalla de oro en los Juegos Olímpicos de París 2024?",
    "opciones": [
      "Francisca Crovetto",
      "Kristel Köbrich",
      "Marlene Ahrens",
      "Bárbara Riveros"
    ],
    "respuestaCorrecta": "Francisca Crovetto",
    "explicacion": "Francisca Crovetto se convirtió en la primera mujer chilena en ganar una medalla de oro olímpica en la historia."
  },
  {
    "id": "dep_55",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue la primera deportista chilena en ganar una medalla olímpica (plata en lanzamiento de la jabalina en Melbourne 1956)?",
    "opciones": [
      "Marlene Ahrens",
      "Anita Lizana",
      "Lucy López",
      "Érika Olivera"
    ],
    "respuestaCorrecta": "Marlene Ahrens",
    "explicacion": "Marlene Ahrens fue abanderada y ganó la plata en Melbourne 1956 con un lanzamiento de 50,38 metros."
  },
  {
    "id": "dep_56",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué luchador grecorromano cubano-chileno ganó la medalla de plata para Chile en los Juegos Olímpicos de París 2024?",
    "opciones": [
      "Yasmani Acosta",
      "Arley Méndez",
      "Tomás González",
      "Marco Grimalt"
    ],
    "respuestaCorrecta": "Yasmani Acosta",
    "explicacion": "Yasmani Acosta obtuvo la plata olímpica en la categoría de 130 kg tras enfrentar en la final a la leyenda Mijaín López."
  },
  {
    "id": "dep_57",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué tenista chilena ganó el Abierto de Estados Unidos (Forest Hills) en 1937 y fue la primera latinoamericana Nº 1 del mundo?",
    "opciones": [
      "Anita Lizana",
      "Silvana Urroz",
      "Daniela Seguel",
      "Alexa Guarachi"
    ],
    "respuestaCorrecta": "Anita Lizana",
    "explicacion": "Apodada la 'Ratita', Anita Lizana da hoy su nombre al court central de tenis del Estadio Nacional."
  },
  {
    "id": "dep_58",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Quién es el máximo goleador en la historia de los Mundiales de Fútbol masculinos con 16 tantos?",
    "opciones": [
      "Miroslav Klose",
      "Ronaldo Nazário",
      "Pelé",
      "Just Fontaine"
    ],
    "respuestaCorrecta": "Miroslav Klose",
    "explicacion": "El delantero alemán Miroslav Klose anotó su gol 16 en el Mundial de Brasil 2014, superando los 15 de Ronaldo."
  },
  {
    "id": "dep_59",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué club de fútbol argentino es el máximo ganador histórico de la Copa Libertadores de América con 7 títulos?",
    "opciones": [
      "Independiente de Avellaneda",
      "Boca Juniors",
      "River Plate",
      "Estudiantes de La Plata"
    ],
    "respuestaCorrecta": "Independiente de Avellaneda",
    "explicacion": "El 'Rey de Copas' ganó 7 finales de Copa Libertadores entre 1964 y 1984 sin perder ninguna."
  },
  {
    "id": "dep_60",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿A qué altura exacta del suelo se encuentra el aro oficial de básquetbol (NBA y FIBA)?",
    "opciones": [
      "3,05 metros (10 pies)",
      "2,90 metros",
      "3,25 metros",
      "2,80 metros"
    ],
    "respuestaCorrecta": "3,05 metros (10 pies)",
    "explicacion": "Desde que James Naismith clavó las primeras cestas de duraznos a 10 pies de altura en 1891, la medida de 3,05 m se ha mantenido."
  },
  {
    "id": "dep_61",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué boxeador chileno disputó el título mundial de los pesos pesados frente al legendario Joe Louis en el Yankee Stadium en 1940?",
    "opciones": [
      "Arturo Godoy",
      "Martín Vargas",
      "Carlos Cruzat",
      "Estanislao Loayza"
    ],
    "respuestaCorrecta": "Arturo Godoy",
    "explicacion": "El iquiqueño Arturo Godoy resistió los 15 asaltos frente a Joe Louis en su primer combate en Nueva York."
  },
  {
    "id": "dep_62",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué tenista chileno ganó el torneo de Roland Garros en 1956 (y fue finalista dos veces en Wimbledon)?",
    "opciones": [
      "Luis Ayala",
      "Jaime Fillol",
      "Hans Gildemeister",
      "Marcelo Ríos"
    ],
    "respuestaCorrecta": "Luis Ayala",
    "explicacion": "Luis Ayala ganó el título de dobles mixtos en Roland Garros 1956 y disputó las finales individuales de París en 1958 y 1960."
  },
  {
    "id": "dep_63",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el histórico triunfo de la Selección Chilena sobre la Unión Soviética (2-1) en Arica durante los cuartos de final del Mundial de 1962?",
    "opciones": [
      "La victoria de Arica (con goles de Leonel Sánchez y Eladio Rojas)",
      "El Maracanazo",
      "El Milagro de Berna",
      "La Batalla de Santiago"
    ],
    "respuestaCorrecta": "La victoria de Arica (con goles de Leonel Sánchez y Eladio Rojas)",
    "explicacion": "Leonel Sánchez y Eladio Rojas batieron al mítico arquero soviético Lev Yashin ('La Araña Negra') para meter a Chile en semifinales."
  },
  {
    "id": "dep_64",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Contra qué selección se disputó el infame y durísimo partido del Mundial de 1962 conocido mundialmente como 'La Batalla de Santiago'?",
    "opciones": [
      "Italia",
      "Alemania Federal",
      "Brasil",
      "Yugoslavia"
    ],
    "respuestaCorrecta": "Italia",
    "explicacion": "Chile venció 2-0 a Italia en un encuentro tan friccionado que inspiró a la FIFA la posterior creación de las tarjetas amarilla y roja."
  },
  {
    "id": "dep_65",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué futbolista chileno fue el primer jugador de la historia en recibir oficialmente una tarjeta roja directa en un Mundial (Alemania 1974)?",
    "opciones": [
      "Carlos Caszely",
      "Elías Figueroa",
      "Guillermo Páez",
      "Alberto Quintano"
    ],
    "respuestaCorrecta": "Carlos Caszely",
    "explicacion": "Las tarjetas se estrenaron en 1970 sin expulsados; en Alemania 1974 el árbitro turco Doğan Babacan mostró la primera roja a Caszely."
  },
  {
    "id": "dep_66",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué selección protagonizó el famoso 'Maracanazo' al vencer 2-1 al anfitrión Brasil en el partido decisivo del Mundial de 1950?",
    "opciones": [
      "Uruguay",
      "Argentina",
      "Suecia",
      "España"
    ],
    "respuestaCorrecta": "Uruguay",
    "explicacion": "Con goles de Schiaffino y Alcides Ghiggia ante casi 200.000 espectadores en Río de Janeiro, Uruguay silenció el Maracaná."
  },
  {
    "id": "dep_67",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué tenista serbio ostenta el récord histórico masculino con 24 títulos individuales de Grand Slam y el oro olímpico en París 2024?",
    "opciones": [
      "Novak Djokovic",
      "Rafael Nadal",
      "Roger Federer",
      "Pete Sampras"
    ],
    "respuestaCorrecta": "Novak Djokovic",
    "explicacion": "Djokovic superó los 22 de Nadal y los 20 de Federer, completando además el Golden Slam de carrera."
  },
  {
    "id": "dep_68",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué jinete chileno junto a su caballo 'Huaso' batió en 1949 el récord mundial de salto alto ecuestre (2,47 metros), marca aún vigente tras más de 75 años?",
    "opciones": [
      "Capitán Alberto Larraguibel",
      "Óscar Cristi",
      "Ricardo Echeverría",
      "César Mendoza"
    ],
    "respuestaCorrecta": "Capitán Alberto Larraguibel",
    "explicacion": "El 5 de febrero de 1949 en Viña del Mar, Larraguibel y Huaso superaron los 2,47 metros, uno de los récords más longevos del deporte mundial."
  },
  {
    "id": "dep_69",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué gimnasta chileno alcanzó tres finales olímpicas en salto y suelo (obteniendo dos cuartos lugares en Londres 2012)?",
    "opciones": [
      "Tomás González",
      "Simón Castro",
      "Christian Bruno",
      "Makarena Pinto"
    ],
    "respuestaCorrecta": "Tomás González",
    "explicacion": "Tomás González logró históricos cuartos puestos en las finales de suelo y salto en los Juegos Olímpicos de Londres 2012."
  },
  {
    "id": "dep_70",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Cuántos puntos vale un 'Touchdown' en el fútbol americano antes de patear el punto extra?",
    "opciones": [
      "6 puntos",
      "7 puntos",
      "5 puntos",
      "3 puntos"
    ],
    "respuestaCorrecta": "6 puntos",
    "explicacion": "El Touchdown vale 6 puntos; luego el equipo puede patear por 1 punto extra o intentar una jugada de conversión por 2 puntos."
  },
  {
    "id": "dep_71",
    "categoria": "deportes",
    "dificultad": "facil",
    "pregunta": "¿Qué selección nacional de fútbol es conocida como 'La Verdeamarela' o 'El Scratch'?",
    "opciones": [
      "Brasil",
      "Colombia",
      "Ecuador",
      "Sudáfrica"
    ],
    "respuestaCorrecta": "Brasil",
    "explicacion": "Por los colores amarillo y verde de su camiseta titular."
  },
  {
    "id": "dep_72",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué delantero chileno fue apodado 'El Matador', celebraba con una rodilla en tierra apuntando al cielo y fue ídolo de River Plate y la Lazio?",
    "opciones": [
      "Marcelo Salas",
      "Iván Zamorano",
      "Carlos Caszely",
      "Humberto Suazo"
    ],
    "respuestaCorrecta": "Marcelo Salas",
    "explicacion": "Marcelo Salas fue elegido Futbolista del Año en Sudamérica en 1997 jugando por River Plate."
  },
  {
    "id": "dep_73",
    "categoria": "deportes",
    "dificultad": "media",
    "pregunta": "¿Qué país ha ganado más medallas de oro en la historia total de los Juegos Olímpicos de Verano?",
    "opciones": [
      "Estados Unidos",
      "China",
      "Reino Unido",
      "Francia"
    ],
    "respuestaCorrecta": "Estados Unidos",
    "explicacion": "Estados Unidos supera las 1.000 medallas de oro olímpicas en los Juegos de Verano."
  },
  {
    "id": "dep_74",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿En qué año ganó la Selección Chilena de Fútbol la medalla de bronce en los Juegos Olímpicos de Sídney?",
    "opciones": [
      "2000",
      "1996",
      "2004",
      "1992"
    ],
    "respuestaCorrecta": "2000",
    "explicacion": "Con Iván Zamorano como goleador del torneo olímpico, Chile venció 2-0 a Estados Unidos por el bronce en Sídney 2000."
  },
  {
    "id": "dep_75",
    "categoria": "deportes",
    "dificultad": "dificil",
    "pregunta": "¿Qué club de básquetbol de la NBA comparte con los Boston Celtics el sitial de los más ganadores de la historia (con 17 y 18 anillos)?",
    "opciones": [
      "Los Angeles Lakers",
      "Chicago Bulls",
      "Golden State Warriors",
      "San Antonio Spurs"
    ],
    "respuestaCorrecta": "Los Angeles Lakers",
    "explicacion": "Los Celtics suman 18 campeonatos (tras ganar en 2024) y los Lakers los siguen de cerca con 17 títulos."
  },
  {
    "id": "can_26",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué mítica banda chilena de San Miguel compuso los himnos 'El baile de los que sobran', 'Tren al sur' y 'La voz de los 80'?",
    "opciones": [
      "Los Prisioneros",
      "Los Tres",
      "Los Bunkers",
      "La Ley"
    ],
    "respuestaCorrecta": "Los Prisioneros",
    "explicacion": "Formada por Jorge González, Claudio Narea y Miguel Tapia, es la banda más influyente del rock chileno."
  },
  {
    "id": "can_27",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante colombiana interpreta éxitos mundiales como 'Hips Don't Lie', 'Ojos así' y el himno del Mundial 2010 'Waka Waka'?",
    "opciones": [
      "Shakira",
      "Karol G",
      "Fanny Lu",
      "Paulina Rubio"
    ],
    "respuestaCorrecta": "Shakira",
    "explicacion": "La artista nacida en Barranquilla es una de las cantantes latinas más premiadas de la historia."
  },
  {
    "id": "can_28",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantautora y folclorista chilena compuso la inmortal canción 'Gracias a la vida' y 'Volver a los 17'?",
    "opciones": [
      "Violeta Parra",
      "Margot Loyola",
      "Isabel Parra",
      "Myriam Hernández"
    ],
    "respuestaCorrecta": "Violeta Parra",
    "explicacion": "'Gracias a la vida', publicada en 1966 en su álbum 'Las últimas composiciones', ha sido versionada en todo el mundo."
  },
  {
    "id": "can_29",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué banda británica de rock está integrada por Mick Jagger y Keith Richards y tiene como logo una lengua roja?",
    "opciones": [
      "The Rolling Stones",
      "The Beatles",
      "Led Zeppelin",
      "The Who"
    ],
    "respuestaCorrecta": "The Rolling Stones",
    "explicacion": "Formada en Londres en 1962, lleva más de seis décadas activa en los escenarios mundiales."
  },
  {
    "id": "can_30",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante puertorriqueño es apodado 'El Conejo Malo' y lanzó el exitoso álbum 'Un Verano Sin Ti'?",
    "opciones": [
      "Bad Bunny",
      "Daddy Yankee",
      "Rauw Alejandro",
      "Anuel AA"
    ],
    "respuestaCorrecta": "Bad Bunny",
    "explicacion": "Benito Antonio Martínez Ocasio (Bad Bunny) ha sido durante varios años el artista más escuchado del mundo en Spotify."
  },
  {
    "id": "can_31",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué banda chilena originaria de Concepción interpreta los éxitos 'Llueve sobre la ciudad', 'Bailando solo' y 'Ven aquí'?",
    "opciones": [
      "Los Bunkers",
      "Los Tres",
      "De Saloon",
      "Chancho en Piedra"
    ],
    "respuestaCorrecta": "Los Bunkers",
    "explicacion": "En 2024 Los Bunkers hicieron historia llenando dos veces consecutivas el Estadio Nacional de Santiago."
  },
  {
    "id": "can_32",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Quién es conocido mundialmente como el 'Rey del Rock and Roll' e interpretó 'Jailhouse Rock' y 'Can't Help Falling in Love'?",
    "opciones": [
      "Elvis Presley",
      "Chuck Berry",
      "Buddy Holly",
      "Johnny Cash"
    ],
    "respuestaCorrecta": "Elvis Presley",
    "explicacion": "Elvis revolucionó la cultura popular estadounidense desde mediados de los años 50 desde Memphis, Tennessee."
  },
  {
    "id": "can_33",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante chilena nacida en Viña del Mar alcanzó fama internacional desde México con 'Tu falta de querer' y 'Amárrame'?",
    "opciones": [
      "Mon Laferte",
      "Francisca Valenzuela",
      "Cami",
      "Denise Rosenthal"
    ],
    "respuestaCorrecta": "Mon Laferte",
    "explicacion": "Norma Monserrat Bustamante Laferte ha ganado múltiples premios Grammy Latinos."
  },
  {
    "id": "can_34",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué grupo sueco de pop ganó Eurovisión en 1974 y es famoso por canciones como 'Dancing Queen' y 'Mamma Mia'?",
    "opciones": [
      "ABBA",
      "Roxette",
      "Ace of Base",
      "Europe"
    ],
    "respuestaCorrecta": "ABBA",
    "explicacion": "El nombre ABBA es un acrónimo formado por las iniciales de Agnetha, Björn, Benny y Anni-Frid."
  },
  {
    "id": "can_35",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Cuántas cuerdas tiene normalmente una guitarra acústica o española estándar?",
    "opciones": [
      "6 cuerdas",
      "4 cuerdas",
      "5 cuerdas",
      "8 cuerdas"
    ],
    "respuestaCorrecta": "6 cuerdas",
    "explicacion": "Afinadas de grave a agudo en Mi, La, Re, Sol, Si y Mi; el bajo eléctrico estándar suele tener 4 cuerdas."
  },
  {
    "id": "can_36",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante puertorriqueño es el ídolo romántico de las madres chilenas con temas como 'Torero', 'Tiempo de vals' y 'Dejaría todo'?",
    "opciones": [
      "Chayanne",
      "Ricky Martin",
      "Luis Fonsi",
      "Marc Anthony"
    ],
    "respuestaCorrecta": "Chayanne",
    "explicacion": "Elmer Figueroa Arce (Chayanne) posee el récord de conciertos multitudinarios agotados en Chile."
  },
  {
    "id": "can_37",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante chilena de baladas románticas es famosa por 'El hombre que yo amo', 'Huele a peligro' y 'Mío'?",
    "opciones": [
      "Myriam Hernández",
      "Cecilia la Incomparable",
      "Palmenia Pizarro",
      "Nicole"
    ],
    "respuestaCorrecta": "Myriam Hernández",
    "explicacion": "Además de su carrera musical internacional, animó el Festival de Viña del Mar entre 2002 y 2006."
  },
  {
    "id": "can_38",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda chilena liderada por Álvaro Henríquez popularizó 'La espada & la pared', 'Déjate caer' y las cuecas 'La vida que yo he pasado'?",
    "opciones": [
      "Los Tres",
      "Los Bunkers",
      "Pettinellis",
      "Electrodomésticos"
    ],
    "respuestaCorrecta": "Los Tres",
    "explicacion": "Su concierto 'MTV Unplugged' grabado en 1995 es uno de los discos más vendidos de la historia musical chilena."
  },
  {
    "id": "can_39",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda chilena liderada por Beto Cuevas ganó el premio Grammy estadounidense y el MTV Unplugged con 'El Duelo' y 'Aquí'?",
    "opciones": [
      "La Ley",
      "Lucybell",
      "Saiko",
      "Gondwana"
    ],
    "respuestaCorrecta": "La Ley",
    "explicacion": "Su álbum 'La Ley MTV Unplugged' (2001) consolidó al grupo en toda Hispanoamérica."
  },
  {
    "id": "can_40",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué icónica banda argentina de rock liderada por Gustavo Cerati compuso 'De música ligera', 'Persiana americana' y 'En la ciudad de la furia'?",
    "opciones": [
      "Soda Stereo",
      "Los Enanitos Verdes",
      "Virus",
      "Babasónicos"
    ],
    "respuestaCorrecta": "Soda Stereo",
    "explicacion": "El trío formado por Gustavo Cerati, Zeta Bosio y Charly Alberti marcó un antes y un después en el rock en español."
  },
  {
    "id": "can_41",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda británica de rock progresivo lanzó en 1973 el mítico álbum 'The Dark Side of the Moon' con el prisma y el arcoíris en su portada?",
    "opciones": [
      "Pink Floyd",
      "Genesis",
      "Yes",
      "Deep Purple"
    ],
    "respuestaCorrecta": "Pink Floyd",
    "explicacion": "También creadores de 'The Wall' y 'Wish You Were Here', permanecieron cientos de semanas en las listas mundiales."
  },
  {
    "id": "can_42",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda chilena de folclore progresivo ('rock indígena') es autora del clásico instrumental y coral 'Todos juntos' (1972)?",
    "opciones": [
      "Los Jaivas",
      "Illapu",
      "Inti-Illimani",
      "Quilapayún"
    ],
    "respuestaCorrecta": "Los Jaivas",
    "explicacion": "Originarios de Viña del Mar, Los Jaivas también musicalizaron el poema 'Alturas de Machu Picchu' de Pablo Neruda."
  },
  {
    "id": "can_43",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué cantante británica lanzó los álbumes titulados con la edad en que los compuso: '19', '21', '25' y '30'?",
    "opciones": [
      "Adele",
      "Dua Lipa",
      "Ed Sheeran",
      "Sam Smith"
    ],
    "respuestaCorrecta": "Adele",
    "explicacion": "De su álbum '21' se desprendieron clásicos modernos como 'Rolling in the Deep' y 'Someone Like You'."
  },
  {
    "id": "can_44",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué rapero estadounidense protagonizó la película '8 Mile' y es autor de 'Lose Yourself', 'Stan' y 'Without Me'?",
    "opciones": [
      "Eminem",
      "Snoop Dogg",
      "50 Cent",
      "Kendrick Lamar"
    ],
    "respuestaCorrecta": "Eminem",
    "explicacion": "Marshall Mathers (Eminem) ganó el premio Óscar a la Mejor Canción Original en 2003 por 'Lose Yourself'."
  },
  {
    "id": "can_45",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda estadounidense de hard rock liderada por Axl Rose y el guitarrista Slash lanzó en 1987 'Appetite for Destruction' ('Sweet Child O' Mine')?",
    "opciones": [
      "Guns N' Roses",
      "Bon Jovi",
      "Aerosmith",
      "Mötley Crüe"
    ],
    "respuestaCorrecta": "Guns N' Roses",
    "explicacion": "Sus himnos 'Welcome to the Jungle', 'Paradise City' y 'November Rain' dominaron fines de los 80 y principios de los 90."
  },
  {
    "id": "can_46",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué cantante mexicano es apodado 'El Sol de México' e interpreta 'La incondicional', 'Ahora te puedes marchar' y 'Hasta que me olvides'?",
    "opciones": [
      "Luis Miguel",
      "Juan Gabriel",
      "Alejandro Fernández",
      "Cristian Castro"
    ],
    "respuestaCorrecta": "Luis Miguel",
    "explicacion": "Luis Miguel inició su carrera siendo niño a comienzos de los años 80 y revitalizó el bolero con su serie de discos 'Romance'."
  },
  {
    "id": "can_47",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda australiana de hard rock, con el guitarrista Angus Young vestido de colegial, grabó 'Back in Black' y 'Highway to Hell'?",
    "opciones": [
      "AC/DC",
      "INXS",
      "Men at Work",
      "Airbourne"
    ],
    "respuestaCorrecta": "AC/DC",
    "explicacion": "'Back in Black' (1980) es el segundo álbum más vendido de toda la historia de la música, solo detrás de 'Thriller'."
  },
  {
    "id": "can_48",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué banda británica formada en Mánchester por los hermanos Liam y Noel Gallagher compuso 'Wonderwall' y 'Don't Look Back in Anger'?",
    "opciones": [
      "Oasis",
      "Blur",
      "Radiohead",
      "Coldplay"
    ],
    "respuestaCorrecta": "Oasis",
    "explicacion": "Su álbum '(What's the Story) Morning Glory?' (1995) fue el estandarte del movimiento Britpop de los años 90."
  },
  {
    "id": "can_49",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué grupo chileno de la Nueva Canción Chilena inmortalizó la 'Cantata Santa María de Iquique' y 'El pueblo unido jamás será vencido'?",
    "opciones": [
      "Quilapayún",
      "Inti-Illimani",
      "Illapu",
      "Sol y Lluvia"
    ],
    "respuestaCorrecta": "Quilapayún",
    "explicacion": "La Cantata Santa María de Iquique fue compuesta por Luis Advis e interpretada por Quilapayún en 1970."
  },
  {
    "id": "can_50",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué cantante británico, conocido antes como el líder de The Police, compuso 'Every Breath You Take' y 'Roxanne'?",
    "opciones": [
      "Sting",
      "Phil Collins",
      "Peter Gabriel",
      "Bono"
    ],
    "respuestaCorrecta": "Sting",
    "explicacion": "Gordon Sumner ('Sting') fue el bajista y vocalista de The Police antes de su exitosa carrera solista."
  },
  {
    "id": "can_51",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantautor y director de teatro chileno fue asesinado en septiembre de 1973 y es autor de 'Te recuerdo Amanda', 'Manifiesto' y 'El derecho de vivir en paz'?",
    "opciones": [
      "Víctor Jara",
      "Patricio Manns",
      "Rolando Alarcón",
      "Ángel Parra"
    ],
    "respuestaCorrecta": "Víctor Jara",
    "explicacion": "'Te recuerdo Amanda' (1969) es una de las canciones más emblemáticas de la Nueva Canción Chilena."
  },
  {
    "id": "can_52",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el nombre real de Freddie Mercury, el legendario vocalista de Queen nacido en Zanzíbar?",
    "opciones": [
      "Farrokh Bulsara",
      "Reginald Dwight",
      "David Robert Jones",
      "Paul David Hewson"
    ],
    "respuestaCorrecta": "Farrokh Bulsara",
    "explicacion": "Farrokh Bulsara nació en Zanzíbar de padres parsis de origen indio; Reginald Dwight es el nombre real de Elton John."
  },
  {
    "id": "can_53",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿En qué año se realizó la primera edición de la historia del Festival Internacional de la Canción de Viña del Mar?",
    "opciones": [
      "1960",
      "1955",
      "1965",
      "1968"
    ],
    "respuestaCorrecta": "1960",
    "explicacion": "Se inauguró el 21 de febrero de 1960 a un costado del Palacio Vergara y fue animado desde su origen por Ricardo García y luego César Antonio Santis."
  },
  {
    "id": "can_54",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué leyenda de la 'Nueva Ola' chilena nacida en Tomé inmortalizó canciones como 'Baño de mar a medianoche' y 'Puré de papas'?",
    "opciones": [
      "Cecilia, la Incomparable",
      "Gloria Benavides",
      "Fresia Soto",
      "Luz Eliana"
    ],
    "respuestaCorrecta": "Cecilia, la Incomparable",
    "explicacion": "Mireya Cecilia Pantoja Levi ganó el Festival de Viña de 1965 con su famoso 'beso de taquito' desafiando las normas de la época."
  },
  {
    "id": "can_55",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué compositor alemán del período Clásico-Romántico quedó completamente sordo y aun así compuso su 'Novena Sinfonía' (con el Himno a la Alegría)?",
    "opciones": [
      "Ludwig van Beethoven",
      "Wolfgang Amadeus Mozart",
      "Johann Sebastian Bach",
      "Johannes Brahms"
    ],
    "respuestaCorrecta": "Ludwig van Beethoven",
    "explicacion": "En el estreno de la Novena Sinfonía en Viena en 1824, tuvieron que girar a Beethoven hacia el público para que viera la ovación."
  },
  {
    "id": "can_56",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué pianista chileno de fama mundial, nacido en Chillán, fue uno de los más grandes intérpretes de Beethoven y Mozart del siglo XX?",
    "opciones": [
      "Claudio Arrau",
      "Roberto Bravo",
      "Valentín Trujillo",
      "Enrique Soro"
    ],
    "respuestaCorrecta": "Claudio Arrau",
    "explicacion": "Niño prodigio que estudió en Berlín becado por el Estado chileno, Arrau recibió el Premio Nacional de Arte en 1983."
  },
  {
    "id": "can_57",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué banda británica de heavy metal tiene como mascota icónica en todas sus portadas y conciertos al monstruo 'Eddie' y un avión piloteado por su vocalista Bruce Dickinson?",
    "opciones": [
      "Iron Maiden",
      "Black Sabbath",
      "Judas Priest",
      "Motörhead"
    ],
    "respuestaCorrecta": "Iron Maiden",
    "explicacion": "Bruce Dickinson es además piloto comercial y comandó el Boeing 747 'Ed Force One' en sus giras mundiales."
  },
  {
    "id": "can_58",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué dúo francés de música electrónica que usaba cascos de robot lanzó los éxitos 'One More Time', 'Around the World' y 'Get Lucky'?",
    "opciones": [
      "Daft Punk",
      "Justice",
      "Air",
      "Disclosure"
    ],
    "respuestaCorrecta": "Daft Punk",
    "explicacion": "Formado por Thomas Bangalter y Guy-Manuel de Homem-Christo, se separaron en 2021 tras 28 años de carrera."
  },
  {
    "id": "can_59",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantautor y escritor chileno compuso el clásico 'Arriba en la cordillera' (1965)?",
    "opciones": [
      "Patricio Manns",
      "Tito Fernández",
      "Eduardo Gatti",
      "Fernando Ubiergo"
    ],
    "respuestaCorrecta": "Patricio Manns",
    "explicacion": "'Arriba en la cordillera' es una de las piezas cumbres del neofolclore y la Nueva Canción Chilena."
  },
  {
    "id": "can_60",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué grupo chileno compuso en 1970 la mítica balada 'Los momentos' ('Tu sombra en el cristal...')?",
    "opciones": [
      "Los Blops (Eduardo Gatti)",
      "Congregación",
      "Aguaturbia",
      "Los Ángeles Negros"
    ],
    "respuestaCorrecta": "Los Blops (Eduardo Gatti)",
    "explicacion": "Compuesta por Eduardo Gatti junto a Los Blops en 1970, es considerada un himno generacional chileno."
  },
  {
    "id": "can_61",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué conjunto chileno originario de San Carlos conquistó toda América con la voz de Germain de la Fuente y temas como 'Y volveré' y 'Murió la flor'?",
    "opciones": [
      "Los Ángeles Negros",
      "Los Galos",
      "Los Golpes",
      "Los Ramblers"
    ],
    "respuestaCorrecta": "Los Ángeles Negros",
    "explicacion": "Incluso raperos estadounidenses como Jay-Z y Beastie Boys han sampleado las canciones de Los Ángeles Negros."
  },
  {
    "id": "can_62",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué banda chilena compuso el himno oficial del Mundial de Fútbol de 1962, 'El Rock del Mundial'?",
    "opciones": [
      "The Ramblers (Los Ramblers)",
      "Los Bric a Brac",
      "Los Mac's",
      "Los Carrers"
    ],
    "respuestaCorrecta": "The Ramblers (Los Ramblers)",
    "explicacion": "Escrito por Jorge Rojas y cantado por Germán Casas, sigue siendo el sencillo más vendido de la música chilena."
  },
  {
    "id": "can_63",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿En qué año se celebró el mítico festival de música y contracultura de 'Woodstock' ('3 días de paz y música') en el estado de Nueva York?",
    "opciones": [
      "1969",
      "1967",
      "1971",
      "1974"
    ],
    "respuestaCorrecta": "1969",
    "explicacion": "Celebrado en agosto de 1969 ante más de 400.000 personas, contó con Jimi Hendrix, Janis Joplin, Santana y The Who."
  },
  {
    "id": "can_64",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantante estadounidense conocido como 'El Hombre de Negro' grabó el famoso concierto dentro de la prisión de Folsom y los temas 'Ring of Fire' y 'Hurt'?",
    "opciones": [
      "Johnny Cash",
      "Willie Nelson",
      "Bob Dylan",
      "Bruce Springsteen"
    ],
    "respuestaCorrecta": "Johnny Cash",
    "explicacion": "Leyenda de la música country y rockabilly, famoso por vestir siempre de negro en solidaridad con los marginados."
  },
  {
    "id": "can_65",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantautor estadounidense de folk y rock ('Blowin' in the Wind', 'Like a Rolling Stone') ganó el Premio Nobel de Literatura en 2016?",
    "opciones": [
      "Bob Dylan",
      "Leonard Cohen",
      "Paul Simon",
      "Neil Young"
    ],
    "respuestaCorrecta": "Bob Dylan",
    "explicacion": "La Academia Sueca lo premió 'por haber creado nuevas expresiones poéticas dentro de la gran tradición de la canción estadounidense'."
  },
  {
    "id": "can_66",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantante chileno ganó la competencia internacional del Festival de Viña (1978), el Festival OTI (1984) y el Festival de Benidorm con temas como 'El tiempo en las bastillas'?",
    "opciones": [
      "Fernando Ubiergo",
      "Alberto Plaza",
      "Pablo Herrera",
      "Juan Antonio Labra"
    ],
    "respuestaCorrecta": "Fernando Ubiergo",
    "explicacion": "'El tiempo en las bastillas' ganó en Viña 1978 y 'Agualuna' triunfó en la OTI 1984."
  },
  {
    "id": "can_67",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué banda chilena de cumbia y pachanga liderada por 'Chico' Trujillo y Aldo 'Macha' Asenjo popularizó 'Loca', 'La cosecha de mujeres' y 'Gran pecador'?",
    "opciones": [
      "Chico Trujillo",
      "Santaferia",
      "Combo Tortuga",
      "La Combo Tortuga"
    ],
    "respuestaCorrecta": "Chico Trujillo",
    "explicacion": "Proyecto nacido de la banda punk/ska La Floripondio que encabezó el fenómeno de la Nueva Cumbia Chilena."
  },
  {
    "id": "can_68",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Cuántas teclas en total (52 blancas y 36 negras) tiene un piano de cola estándar moderno?",
    "opciones": [
      "88 teclas",
      "76 teclas",
      "64 teclas",
      "100 teclas"
    ],
    "respuestaCorrecta": "88 teclas",
    "explicacion": "Un piano estándar abarca 7 octavas más tres notas adicionales, sumando exactamente 88 teclas."
  },
  {
    "id": "can_69",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué legendario guitarrista zurdo estadounidense incendió su guitarra en el festival de Monterey y tocó el himno de EE.UU. distorsionado en Woodstock?",
    "opciones": [
      "Jimi Hendrix",
      "Eric Clapton",
      "Jimmy Page",
      "Carlos Santana"
    ],
    "respuestaCorrecta": "Jimi Hendrix",
    "explicacion": "Pese a que su carrera principal duró apenas cuatro años antes de morir a los 27 años en 1970, revolucionó la guitarra eléctrica."
  },
  {
    "id": "can_70",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué banda chilena de reggae nacida en la población La Pincoya interpreta 'Sentimiento original', 'Armonía de amor' y 'Felicidad'?",
    "opciones": [
      "Gondwana",
      "Movimiento Original",
      "Quique Neira",
      "Zona Ganjah"
    ],
    "respuestaCorrecta": "Gondwana",
    "explicacion": "Fundada en 1987 por I-Locks Labbé, Gondwana es la banda pionera y más internacional del reggae chileno."
  },
  {
    "id": "can_71",
    "categoria": "canciones",
    "dificultad": "facil",
    "pregunta": "¿Qué cantante canadiense saltó a la fama siendo adolescente en YouTube con el éxito 'Baby' (2010)?",
    "opciones": [
      "Justin Bieber",
      "Shawn Mendes",
      "The Weeknd",
      "Drake"
    ],
    "respuestaCorrecta": "Justin Bieber",
    "explicacion": "Descubierto a través de sus videos caseros en YouTube, 'Baby' fue uno de los primeros videos en superar los mil millones de vistas."
  },
  {
    "id": "can_72",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué grupo mexicano de rock alternativo es autor de 'Eres', 'Ingrata' y 'La chica banda'?",
    "opciones": [
      "Café Tacvba",
      "Maná",
      "Molotov",
      "Caifanes"
    ],
    "respuestaCorrecta": "Café Tacvba",
    "explicacion": "Su disco 'Re' (1994) es considerado por la crítica como uno de los mejores álbumes de rock latinoamericano."
  },
  {
    "id": "can_73",
    "categoria": "canciones",
    "dificultad": "media",
    "pregunta": "¿Qué grupo chileno originario de Coquimbo puso a bailar a generaciones en Año Nuevo con 'Un año más', 'El galeón español' y 'Daniela'?",
    "opciones": [
      "Los Vikings 5",
      "La Sonora de Tommy Rey",
      "Sonora Palacios",
      "Giolito y su Combo"
    ],
    "respuestaCorrecta": "Los Vikings 5",
    "explicacion": "Aunque Tommy Rey también grabó una famosísima versión de 'Un año más', compuesta por Hernán Gallardo Pavez, Los Vikings 5 de Coquimbo la popularizaron junto a 'El galeón español'."
  },
  {
    "id": "can_74",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el legendario vocalista de la orquesta de cumbia chilena que dio voz a 'El galeón español', 'Los domingos' y 'Daniela' tras separarse de la Sonora Palacios en 1982?",
    "opciones": [
      "Tommy Rey (Patricio Zúñiga)",
      "Marty Palacios",
      "Pachuco y la Cubanacán",
      "Zalo Reyes"
    ],
    "respuestaCorrecta": "Tommy Rey (Patricio Zúñiga)",
    "explicacion": "Patricio Zúñiga ('Tommy Rey') fue la voz insigne de la cumbia chilena durante más de seis décadas."
  },
  {
    "id": "can_75",
    "categoria": "canciones",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantante chileno de Conchalí, apodado 'El Gorrión de Conchalí', emocionó al país con 'Con una lágrima en la garganta' y 'Una lágrima y un recuerdo'?",
    "opciones": [
      "Zalo Reyes",
      "Buddy Richard",
      "José Alfredo Fuentes",
      "Wildo"
    ],
    "respuestaCorrecta": "Zalo Reyes",
    "explicacion": "Boris González ('Zalo Reyes') fue un ícono de la música cebolla y popular chilena de los años 80."
  },
  {
    "id": "pel_26",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué película chilena ganó en 2018 el premio Óscar a la Mejor Película de Habla No Inglesa (Internacional), protagonizada por Daniela Vega?",
    "opciones": [
      "Una mujer fantástica",
      "Machuca",
      "El agente topo",
      "La nana"
    ],
    "respuestaCorrecta": "Una mujer fantástica",
    "explicacion": "Dirigida por Sebastián Lelio, fue el primer largometraje chileno en ganar la estatuilla de la Academia."
  },
  {
    "id": "pel_27",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llaman el vaquero y el guardián espacial que protagonizan la saga animada 'Toy Story'?",
    "opciones": [
      "Woody y Buzz Lightyear",
      "Andy y Sid",
      "Mike y Sulley",
      "Shrek y Burro"
    ],
    "respuestaCorrecta": "Woody y Buzz Lightyear",
    "explicacion": "'Toy Story' (1995) de Pixar fue el primer largometraje de la historia animado íntegramente por computadora."
  },
  {
    "id": "pel_28",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿En qué película animada de Disney/Pixar ambientada en el Día de Muertos de México suena la canción 'Recuérdame'?",
    "opciones": [
      "Coco",
      "Encanto",
      "Moana",
      "Valiente"
    ],
    "respuestaCorrecta": "Coco",
    "explicacion": "Estrenada en 2017, sigue al joven Miguel en su viaje por la Tierra de los Muertos."
  },
  {
    "id": "pel_29",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actor interpretó al excéntrico capitán pirata Jack Sparrow en la saga 'Piratas del Caribe'?",
    "opciones": [
      "Johnny Depp",
      "Orlando Bloom",
      "Brad Pitt",
      "Robert Downey Jr."
    ],
    "respuestaCorrecta": "Johnny Depp",
    "explicacion": "Su actuación en 'La maldición del Perla Negra' (2003) le valió su primera nominación al Óscar."
  },
  {
    "id": "pel_30",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el colegio de magia y hechicería al que asiste Harry Potter?",
    "opciones": [
      "Hogwarts",
      "Narnia",
      "Mordor",
      "Wakanda"
    ],
    "respuestaCorrecta": "Hogwarts",
    "explicacion": "Dividido en cuatro casas: Gryffindor, Slytherin, Ravenclaw y Hufflepuff."
  },
  {
    "id": "pel_31",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué villano de Marvel chasquea los dedos con el Guantelete del Infinito para eliminar a la mitad del universo en 'Avengers: Infinity War'?",
    "opciones": [
      "Thanos",
      "Loki",
      "Ultron",
      "Kang"
    ],
    "respuestaCorrecta": "Thanos",
    "explicacion": "El 'Titán Loco' reunió las seis Gemas del Infinito."
  },
  {
    "id": "pel_32",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿En qué película de 1994 un joven león llamado Simba debe recuperar su lugar en la Roca del Rey tras la muerte de su padre Mufasa?",
    "opciones": [
      "El Rey León",
      "Madagascar",
      "El libro de la selva",
      "Tarzán"
    ],
    "respuestaCorrecta": "El Rey León",
    "explicacion": "Clásico del Renacimiento de Disney con banda sonora de Elton John y Hans Zimmer."
  },
  {
    "id": "pel_33",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué automóvil deportivo modificado se utiliza como máquina del tiempo en la trilogía 'Volver al Futuro'?",
    "opciones": [
      "Un DeLorean DMC-12",
      "Un Chevrolet Camaro",
      "Un Ford Mustang",
      "Un Aston Martin"
    ],
    "respuestaCorrecta": "Un DeLorean DMC-12",
    "explicacion": "El Doc Emmett Brown instaló el 'condensador de flujo' en un DeLorean de acero inoxidable que debía alcanzar las 88 millas por hora."
  },
  {
    "id": "pel_34",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama la princesa con poderes de hielo que canta 'Libre soy' ('Let It Go') en la película 'Frozen'?",
    "opciones": [
      "Elsa",
      "Anna",
      "Rapunzel",
      "Mérida"
    ],
    "respuestaCorrecta": "Elsa",
    "explicacion": "Elsa es la reina de Arendelle y hermana mayor de Anna."
  },
  {
    "id": "pel_35",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué película de terror tiene como villano a un payaso demoníaco llamado Pennywise que aparece cada 27 años con un globo rojo?",
    "opciones": [
      "It (Eso)",
      "El conjuro",
      "Scream",
      "Saw"
    ],
    "respuestaCorrecta": "It (Eso)",
    "explicacion": "Basada en la extensa novela de terror publicada por Stephen King en 1986."
  },
  {
    "id": "pel_36",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Qué actor chileno protagoniza la serie de Star Wars 'The Mandalorian' y 'The Last of Us'?",
    "opciones": [
      "Pedro Pascal",
      "Benjamín Vicuña",
      "Cristián de la Fuente",
      "Marko Zaror"
    ],
    "respuestaCorrecta": "Pedro Pascal",
    "explicacion": "José Pedro Balmaceda Pascal interpreta a Din Djarin (Mando) y a Joel Miller."
  },
  {
    "id": "pel_37",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué cortometraje animado chileno ganó en 2016 el primer premio Óscar en la historia de Chile?",
    "opciones": [
      "Historia de un oso (Bear Story)",
      "Bestia",
      "Teclópolis",
      "Papelucho"
    ],
    "respuestaCorrecta": "Historia de un oso (Bear Story)",
    "explicacion": "Dirigido por Gabriel Osorio y producido por Patricio Escala (Punkrobot Studio), narra el exilio a través de un diorama mecánico."
  },
  {
    "id": "pel_38",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿En qué película chilena de Andrés Wood (2004) dos niños de distintas clases sociales, Gonzalo Infante y Pedro Machuca, se hacen amigos en 1973?",
    "opciones": [
      "Machuca",
      "Historias de fútbol",
      "Violeta se fue a los cielos",
      "Araña"
    ],
    "respuestaCorrecta": "Machuca",
    "explicacion": "Protagonizada por Matías Quer y Ariel Mateluna, es una de las películas más vistas y premiadas del cine chileno."
  },
  {
    "id": "pel_39",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película surcoreana dirigida por Bong Joon-ho hizo historia en 2020 al ser la primera de habla no inglesa en ganar el Óscar a Mejor Película?",
    "opciones": [
      "Parásitos (Parasite)",
      "Oldboy",
      "Tren a Busan",
      "Minari"
    ],
    "respuestaCorrecta": "Parásitos (Parasite)",
    "explicacion": "'Parásitos' ganó 4 premios Óscar: Mejor Película, Mejor Director, Mejor Guion Original y Mejor Película Internacional."
  },
  {
    "id": "pel_40",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué director de cine estadounidense dirigió 'Tiburón', 'E.T.', 'Jurassic Park' y 'La lista de Schindler'?",
    "opciones": [
      "Steven Spielberg",
      "George Lucas",
      "Martin Scorsese",
      "Christopher Nolan"
    ],
    "respuestaCorrecta": "Steven Spielberg",
    "explicacion": "Spielberg es el director más taquillero de la historia del cine y ganador de tres premios Óscar."
  },
  {
    "id": "pel_41",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿En qué película de 1999 Keanu Reeves interpreta a un programador llamado Thomas Anderson (Neo) que debe elegir entre la píldora roja y la azul?",
    "opciones": [
      "The Matrix",
      "Constantine",
      "John Wick",
      "Máxima velocidad"
    ],
    "respuestaCorrecta": "The Matrix",
    "explicacion": "Dirigida por las hermanas Wachowski, revolucionó los efectos visuales con el efecto 'bullet time' (tiempo bala)."
  },
  {
    "id": "pel_42",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué actor interpretó al Guasón (Joker) en 'Batman: El caballero de la noche' (2008), ganando el Óscar póstumo como Mejor Actor de Reparto?",
    "opciones": [
      "Heath Ledger",
      "Joaquin Phoenix",
      "Jack Nicholson",
      "Jared Leto"
    ],
    "respuestaCorrecta": "Heath Ledger",
    "explicacion": "Heath Ledger falleció meses antes del estreno de la película de Christopher Nolan y su actuación quedó en la historia del cine."
  },
  {
    "id": "pel_43",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el documental chileno de Maite Alberdi nominado al Óscar en 2021 sobre un tierno anciano de 83 años contratado como detective privado en un hogar de ancianos?",
    "opciones": [
      "El agente topo",
      "La memoria infinita",
      "La once",
      "Los niños"
    ],
    "respuestaCorrecta": "El agente topo",
    "explicacion": "Protagonizado por don Sergio Chamy, emocionó al mundo entero y fue nominado al Óscar a Mejor Documental."
  },
  {
    "id": "pel_44",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Por qué película de supervivencia ganó finalmente Leonardo DiCaprio su primer premio Óscar como Mejor Actor en 2016?",
    "opciones": [
      "El renacido (The Revenant)",
      "El lobo de Wall Street",
      "El origen (Inception)",
      "La isla siniestra"
    ],
    "respuestaCorrecta": "El renacido (The Revenant)",
    "explicacion": "Dirigida por Alejandro González Iñárritu, DiCaprio interpretó al explorador Hugh Glass atacado por un oso."
  },
  {
    "id": "pel_45",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película de animación japonesa de Studio Ghibli (2001), dirigida por Hayao Miyazaki, narra la historia de Chihiro en un mundo de dioses y espíritus?",
    "opciones": [
      "El viaje de Chihiro",
      "Mi vecino Totoro",
      "La princesa Mononoke",
      "El castillo vagabundo"
    ],
    "respuestaCorrecta": "El viaje de Chihiro",
    "explicacion": "Ganó el Óscar a la Mejor Película Animada en 2003 y el Oso de Oro en el Festival de Berlín."
  },
  {
    "id": "pel_46",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el hotel aislado en las montañas donde Jack Nicholson pierde la cordura en la película 'El resplandor' (The Shining)?",
    "opciones": [
      "Hotel Overlook",
      "Hotel Bates",
      "Hotel Continental",
      "Hotel Transylvania"
    ],
    "respuestaCorrecta": "Hotel Overlook",
    "explicacion": "Dirigida por Stanley Kubrick en 1980 a partir de la novela de Stephen King."
  },
  {
    "id": "pel_47",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué comedia chilena dirigida por Boris Quercia en 2003, con Patricio Contreras, Javiera Contador, Álvaro Rudolphy y Sigrid Alegría, fue un récord de taquilla nacional?",
    "opciones": [
      "Sexo con amor",
      "El chacotero sentimental",
      "Promedio rojo",
      "El rey de los huevones"
    ],
    "respuestaCorrecta": "Sexo con amor",
    "explicacion": "Estrenada en 2003, 'Sexo con amor' superó los 990.000 espectadores en las salas de cine chilenas."
  },
  {
    "id": "pel_48",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película de 1994 protagonizada por Tom Hanks incluye la famosa frase: 'Mamá siempre decía que la vida es como una caja de bombones'?",
    "opciones": [
      "Forrest Gump",
      "Náufrago",
      "Filadelfia",
      "Rescatando al soldado Ryan"
    ],
    "respuestaCorrecta": "Forrest Gump",
    "explicacion": "Dirigida por Robert Zemeckis, ganó 6 premios Óscar incluyendo Mejor Película, Mejor Director y Mejor Actor."
  },
  {
    "id": "pel_49",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué actor interpretó a Tony Stark / Iron Man durante más de una década en el Universo Cinematográfico de Marvel?",
    "opciones": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Chris Hemsworth",
      "Mark Ruffalo"
    ],
    "respuestaCorrecta": "Robert Downey Jr.",
    "explicacion": "Inició el MCU en 'Iron Man' (2008) y luego ganó el Óscar como Mejor Actor de Reparto por 'Oppenheimer' (2023)."
  },
  {
    "id": "pel_50",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamó el fenómeno cinematográfico del verano de 2023 al estrenarse el mismo día 'Barbie' y 'Oppenheimer'?",
    "opciones": [
      "Barbenheimer",
      "Oppiebarbie",
      "Cinemania",
      "Pink Bomb"
    ],
    "respuestaCorrecta": "Barbenheimer",
    "explicacion": "El contraste entre la comedia rosa de Greta Gerwig y el drama atómico de Christopher Nolan llevó a millones de espectadores a hacer función doble."
  },
  {
    "id": "pel_51",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Cuáles son las únicas tres películas en la historia que han empatado con el récord máximo de 11 premios Óscar ganados?",
    "opciones": [
      "Ben-Hur (1959), Titanic (1997) y El Señor de los Anillos: El retorno del Rey (2003)",
      "Lo que el viento se llevó, El Padrino y Titanic",
      "Avatar, Titanic y Star Wars",
      "Ben-Hur, Gladiador y Oppenheimer"
    ],
    "respuestaCorrecta": "Ben-Hur (1959), Titanic (1997) y El Señor de los Anillos: El retorno del Rey (2003)",
    "explicacion": "'El retorno del Rey' ganó además en las 11 categorías en las que estuvo nominada (100% de efectividad)."
  },
  {
    "id": "pel_52",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué clásico del cine chileno de 1968 dirigido por Miguel Littín está basado en la historia real de Jorge del Carmen Valenzuela Torres?",
    "opciones": [
      "El Chacal de Nahueltoro",
      "Tres tristes tigres",
      "Valparaíso mi amor",
      "Largo viaje"
    ],
    "respuestaCorrecta": "El Chacal de Nahueltoro",
    "explicacion": "Protagonizada magistralmente por Nelson Villagra, es una de las obras cumbres del Nuevo Cine Chileno."
  },
  {
    "id": "pel_53",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película chilena de Andrés Wood (2011) retrata la apasionada vida, viajes y creación artística de la folclorista Violeta Parra, protagonizada por Francisca Gavilán?",
    "opciones": [
      "Violeta se fue a los cielos",
      "La fiebre del loco",
      "Historias de fútbol",
      "La buena vida"
    ],
    "respuestaCorrecta": "Violeta se fue a los cielos",
    "explicacion": "Ganó el Gran Premio Internacional del Jurado en el Festival de Cine de Sundance en 2012."
  },
  {
    "id": "pel_54",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué director de cine estadounidense dirigió 'Pulp Fiction', 'Bastardos sin gloria', 'Kill Bill' y 'Django sin cadenas'?",
    "opciones": [
      "Quentin Tarantino",
      "Martin Scorsese",
      "David Fincher",
      "Ridley Scott"
    ],
    "respuestaCorrecta": "Quentin Tarantino",
    "explicacion": "Tarantino ganó dos veces el Óscar al Mejor Guion Original por 'Pulp Fiction' y 'Django Unchained'."
  },
  {
    "id": "pel_55",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué significa la misteriosa palabra 'Rosebud', pronunciada al morir por el magnate Charles Foster Kane en la obra maestra 'El ciudadano Kane' (1941)?",
    "opciones": [
      "La marca de su trineo de nieve de la infancia",
      "El nombre de su primer amor secreto",
      "El nombre de su periódico favorito",
      "El código de su caja fuerte"
    ],
    "respuestaCorrecta": "La marca de su trineo de nieve de la infancia",
    "explicacion": "Dirigida y protagonizada por Orson Welles a los 25 años, el trineo 'Rosebud' simbolizaba la inocencia perdida de su niñez."
  },
  {
    "id": "pel_56",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película chilena de 1999 dividida en tres historias ('El Dj', 'Secretos' y 'Todo es cancha') fue dirigida por Cristián Galaz y nacida de un programa radial del Rumpy?",
    "opciones": [
      "El chacotero sentimental",
      "Historias de fútbol",
      "Taxi para tres",
      "B-Happy"
    ],
    "respuestaCorrecta": "El chacotero sentimental",
    "explicacion": "Con actuaciones de Daniel Muñoz, Tamara Acosta y Lorene Prieto, superó los 800.000 espectadores en cines chilenos."
  },
  {
    "id": "pel_57",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película chilena de Orlando Lübbert (2001), protagonizada por Alejandro Trejo, Fernando Gómez-Rovira y Daniel Muñoz, cuenta cómo un taxista es obligado a ser chofer de dos asaltantes?",
    "opciones": [
      "Taxi para tres",
      "Coronación",
      "Subterra",
      "Fuga"
    ],
    "respuestaCorrecta": "Taxi para tres",
    "explicacion": "Famosa por el personaje de 'Chavelo' ('¡Ulises, compadre!'), ganó la Concha de Oro en el Festival de San Sebastián."
  },
  {
    "id": "pel_58",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Quién compuso las inconfundibles bandas sonoras de 'Star Wars', 'Indiana Jones', 'Tiburón', 'Jurassic Park' y 'Harry Potter'?",
    "opciones": [
      "John Williams",
      "Hans Zimmer",
      "Ennio Morricone",
      "Howard Shore"
    ],
    "respuestaCorrecta": "John Williams",
    "explicacion": "Con más de 50 nominaciones al Óscar, John Williams es la persona viva con más nominaciones en la historia de la Academia."
  },
  {
    "id": "pel_59",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿En qué película de Alfred Hitchcock (1960) el personaje de Norman Bates regenta un solitario motel junto a una siniestra casa en la colina?",
    "opciones": [
      "Psicosis (Psycho)",
      "Vértigo",
      "Los pájaros",
      "La ventana indiscreta"
    ],
    "respuestaCorrecta": "Psicosis (Psycho)",
    "explicacion": "Su famosa escena del asesinato de Marion Crane (Janet Leigh) en la ducha con violines estridentes hizo historia en el cine."
  },
  {
    "id": "pel_60",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película de ciencia ficción de 1968 dirigida por Stanley Kubrick presenta a la supercomputadora rebelde 'HAL 9000' y un monolito negro?",
    "opciones": [
      "2001: Odisea del espacio",
      "Blade Runner",
      "Solaris",
      "Encuentros cercanos del tercer tipo"
    ],
    "respuestaCorrecta": "2001: Odisea del espacio",
    "explicacion": "Co-escrita junto a Arthur C. Clarke, es considerada la obra maestra fundacional de la ciencia ficción moderna."
  },
  {
    "id": "pel_61",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué actriz chilena protagonizó 'La nana' (2009) de Sebastián Silva y 'Gloria' (2013), por la que ganó el Oso de Plata a Mejor Actriz en el Festival de Berlín?",
    "opciones": [
      "Paulina García",
      "Catalina Saavedra",
      "Tamara Acosta",
      "Aline Küppenheim"
    ],
    "respuestaCorrecta": "Paulina García",
    "explicacion": "Paulina García ganó el Oso de Plata en Berlín 2013 por 'Gloria', mientras que Catalina Saavedra protagonizó 'La nana'."
  },
  {
    "id": "pel_62",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué actriz chilena interpretó a Raquel en la premiada película 'La nana' (2009), triunfando en el Festival de Sundance?",
    "opciones": [
      "Catalina Saavedra",
      "Mariana Loyola",
      "Claudia Di Girolamo",
      "Amparo Noguera"
    ],
    "respuestaCorrecta": "Catalina Saavedra",
    "explicacion": "'La nana', dirigida por Sebastián Silva, fue nominada a los Globos de Oro como Mejor Película Extranjera."
  },
  {
    "id": "pel_63",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué director de cine chileno-francés, autor de la 'Psicomagia', dirigió las películas de culto 'El Topo' (1970) y 'La montaña sagrada' (1973)?",
    "opciones": [
      "Alejandro Jodorowsky",
      "Raúl Ruiz",
      "Patricio Guzmán",
      "Miguel Littín"
    ],
    "respuestaCorrecta": "Alejandro Jodorowsky",
    "explicacion": "Nacido en Tocopilla, Jodorowsky es además un célebre guionista de cómics ('El Incal') y escritor."
  },
  {
    "id": "pel_64",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué documentalista chileno dirigió la histórica trilogía 'La batalla de Chile' y los poéticos documentales 'Nostalgia de la luz' y 'El botón de nácar'?",
    "opciones": [
      "Patricio Guzmán",
      "Ignacio Agüero",
      "Silvio Caiozzi",
      "Cristián Sánchez"
    ],
    "respuestaCorrecta": "Patricio Guzmán",
    "explicacion": "'Nostalgia de la luz' (2010), filmado en el desierto de Atacama, fue aclamado en el Festival de Cannes y en todo el mundo."
  },
  {
    "id": "pel_65",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿En qué país se filmaron íntegramente las tres películas de la trilogía de 'El Señor de los Anillos' dirigidas por Peter Jackson?",
    "opciones": [
      "Nueva Zelanda",
      "Escocia",
      "Irlanda",
      "Islandia"
    ],
    "respuestaCorrecta": "Nueva Zelanda",
    "explicacion": "Los paisajes naturales de Nueva Zelanda dieron vida a la Tierra Media de J. R. R. Tolkien."
  },
  {
    "id": "pel_66",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué actor interpretó a Vito Corleone joven en 'El Padrino II' (1974) y a Travis Bickle en 'Taxi Driver' (1976)?",
    "opciones": [
      "Robert De Niro",
      "Al Pacino",
      "Joe Pesci",
      "Marlon Brando"
    ],
    "respuestaCorrecta": "Robert De Niro",
    "explicacion": "Tanto Marlon Brando (en la primera parte) como Robert De Niro (en la segunda) ganaron el Óscar por interpretar a Vito Corleone."
  },
  {
    "id": "pel_67",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamaba el primer largometraje sonoro de la historia del cine, estrenado en 1927 con diálogos y canciones sincronizadas?",
    "opciones": [
      "El cantante de jazz (The Jazz Singer)",
      "Luces de la ciudad",
      "Lo que el viento se llevó",
      "Metrópolis"
    ],
    "respuestaCorrecta": "El cantante de jazz (The Jazz Singer)",
    "explicacion": "Protagonizada por Al Jolson y producida por Warner Bros., marcó el fin de la era del cine mudo."
  },
  {
    "id": "pel_68",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película chilena de Ricardo Larraín (1991), protagonizada por Patricio Contreras y Héctor Noguera, ganó el Oso de Plata en Berlín y el Premio Goya?",
    "opciones": [
      "La frontera",
      "El entusiasmo",
      "Negocio redondo",
      "Coronación"
    ],
    "respuestaCorrecta": "La frontera",
    "explicacion": "'La frontera' retrata a un profesor relegado a la zona costera del sur de Chile afectada por el maremoto de 1960."
  },
  {
    "id": "pel_69",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película de Pablo Larraín (2012), protagonizada por Gael García Bernal como un publicista en el plebiscito de 1988, fue la primera película chilena nominada al Óscar?",
    "opciones": [
      "No",
      "Tony Manero",
      "El club",
      "Neruda"
    ],
    "respuestaCorrecta": "No",
    "explicacion": "'No' compitió en la categoría de Mejor Película de Habla No Inglesa en los premios Óscar de 2013."
  },
  {
    "id": "pel_70",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué documental de Maite Alberdi sobre la historia de amor de Augusto Góngora y Paulina Urrutia frente al Alzheimer fue nominado al Óscar en 2024?",
    "opciones": [
      "La memoria infinita",
      "El agente topo",
      "La once",
      "El lugar de la otra"
    ],
    "respuestaCorrecta": "La memoria infinita",
    "explicacion": "Ganó el Gran Premio del Jurado en Sundance, el Premio Goya y fue nominada al Óscar a Mejor Documental."
  },
  {
    "id": "pel_71",
    "categoria": "peliculas",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el ogro verde que vive en un pantano y se enamora de la princesa Fiona?",
    "opciones": [
      "Shrek",
      "Hulk",
      "Sulley",
      "Yoda"
    ],
    "respuestaCorrecta": "Shrek",
    "explicacion": "'Shrek' (2001) de DreamWorks ganó el primer premio Óscar de la historia a la Mejor Película Animada."
  },
  {
    "id": "pel_72",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿En qué película de Pixar las emociones Alegría, Tristeza, Furia, Temor y Desagrado controlan la mente de una niña llamada Riley?",
    "opciones": [
      "Intensa-Mente (Inside Out)",
      "Soul",
      "Elementos",
      "Red"
    ],
    "respuestaCorrecta": "Intensa-Mente (Inside Out)",
    "explicacion": "Estrenada en 2015, tuvo una exitosa secuela en 2024 que incorporó emociones como Ansiedad y Vergüenza."
  },
  {
    "id": "pel_73",
    "categoria": "peliculas",
    "dificultad": "media",
    "pregunta": "¿Qué película chilena de 2003 dirigida por Marcelo Ferrari adapta los cuentos de Baldomero Lillo sobre los mineros del carbón de Lota?",
    "opciones": [
      "Subterra",
      "Caluga o menta",
      "Dawson. Isla 10",
      "Machuca"
    ],
    "respuestaCorrecta": "Subterra",
    "explicacion": "Ambientada en 1897 en las minas submarinas de Lota, fue protagonizada por Francisco Reyes y Consuelo Holzapfel."
  },
  {
    "id": "pel_74",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué película de ciencia ficción de Ridley Scott (1979) tiene como protagonista a la teniente Ellen Ripley (Sigourney Weaver) a bordo de la nave Nostromo?",
    "opciones": [
      "Alien: el octavo pasajero",
      "Blade Runner",
      "Prometeo",
      "Depredador"
    ],
    "respuestaCorrecta": "Alien: el octavo pasajero",
    "explicacion": "Famosa por su lema publicitario: 'En el espacio nadie puede oír tus gritos'."
  },
  {
    "id": "pel_75",
    "categoria": "peliculas",
    "dificultad": "dificil",
    "pregunta": "¿Qué director chileno dirigió la película 'El conde' (ganadora de Mejor Guion en Venecia) y las biografías internacionales 'Jackie', 'Spencer' y 'Maria'?",
    "opciones": [
      "Pablo Larraín",
      "Sebastián Lelio",
      "Andrés Wood",
      "Matías Bize"
    ],
    "respuestaCorrecta": "Pablo Larraín",
    "explicacion": "Las películas de Pablo Larraín han acumulado múltiples nominaciones a los premios Óscar."
  },
  {
    "id": "tec_21",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el plomero bigotudo vestido de rojo y azul que es la mascota oficial de Nintendo?",
    "opciones": [
      "Mario (Super Mario)",
      "Sonic",
      "Link",
      "Crash Bandicoot"
    ],
    "respuestaCorrecta": "Mario (Super Mario)",
    "explicacion": "Creado por Shigeru Miyamoto, apareció por primera vez en 1981 en el arcade 'Donkey Kong' bajo el nombre de Jumpman."
  },
  {
    "id": "tec_22",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué empresa tecnológica de la manzana mordida fabrica el iPhone, el iPad y los computadores Mac?",
    "opciones": [
      "Apple",
      "Microsoft",
      "Samsung",
      "Sony"
    ],
    "respuestaCorrecta": "Apple",
    "explicacion": "Fundada en 1976 por Steve Jobs, Steve Wozniak y Ronald Wayne en un garaje de California."
  },
  {
    "id": "tec_23",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué videojuego de construcción con bloques cúbicos creado por 'Notch' tiene monstruos verdes explosivos llamados Creepers?",
    "opciones": [
      "Minecraft",
      "Roblox",
      "Fortnite",
      "Terraria"
    ],
    "respuestaCorrecta": "Minecraft",
    "explicacion": "Lanzado oficialmente en 2011 y adquirido por Microsoft en 2014, es el videojuego más vendido de todos los tiempos."
  },
  {
    "id": "tec_24",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué aplicación de mensajería instantánea del ícono verde con un teléfono blanco es la más usada en Chile y Latinoamérica?",
    "opciones": [
      "WhatsApp",
      "Telegram",
      "Messenger",
      "Signal"
    ],
    "respuestaCorrecta": "WhatsApp",
    "explicacion": "Lanzada en 2009 por Jan Koum y Brian Acton y adquirida por Meta (Facebook) en 2014."
  },
  {
    "id": "tec_25",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el ratón eléctrico amarillo que es el Pokémon número 25 y compañero inseparable de Ash Ketchum?",
    "opciones": [
      "Pikachu",
      "Charmander",
      "Bulbasaur",
      "Squirtle"
    ],
    "respuestaCorrecta": "Pikachu",
    "explicacion": "Pikachu es la mascota oficial de la franquicia Pokémon creada por Satoshi Tajiri en 1996."
  },
  {
    "id": "tec_26",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué significa la sigla 'Wi-Fi' o para qué se utiliza en el hogar?",
    "opciones": [
      "Conexión inalámbrica a Internet / red local sin cables",
      "Cable de fibra óptica submarina",
      "Memoria interna del teléfono",
      "Pantalla de alta definición"
    ],
    "respuestaCorrecta": "Conexión inalámbrica a Internet / red local sin cables",
    "explicacion": "La tecnología Wi-Fi utiliza ondas de radio para conectar dispositivos a Internet sin necesidad de cables."
  },
  {
    "id": "tec_27",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué consola híbrida de Nintendo lanzada en 2017 permite jugar tanto conectada al televisor como en modo portátil con controles Joy-Con?",
    "opciones": [
      "Nintendo Switch",
      "Nintendo Wii",
      "Game Boy",
      "Nintendo 64"
    ],
    "respuestaCorrecta": "Nintendo Switch",
    "explicacion": "La Nintendo Switch superó los 140 millones de unidades vendidas a nivel mundial."
  },
  {
    "id": "tec_28",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué plataforma de inteligencia artificial conversacional lanzada por OpenAI a fines de 2022 popularizó los chatbots de IA en todo el mundo?",
    "opciones": [
      "ChatGPT",
      "Siri",
      "Alexa",
      "Cortana"
    ],
    "respuestaCorrecta": "ChatGPT",
    "explicacion": "ChatGPT alcanzó 100 millones de usuarios en apenas dos meses, convirtiéndose en la aplicación de más rápido crecimiento."
  },
  {
    "id": "tec_29",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el erizo azul ultrarrápido que recolecta anillos dorados y es la mascota histórica de SEGA?",
    "opciones": [
      "Sonic",
      "Tails",
      "Knuckles",
      "Mega Man"
    ],
    "respuestaCorrecta": "Sonic",
    "explicacion": "'Sonic the Hedgehog' debutó en 1991 en la consola Sega Genesis (Mega Drive) para competir directamente con Mario."
  },
  {
    "id": "tec_30",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué combinación de teclas en un computador con Windows sirve universalmente para 'Copiar' y 'Pegar'?",
    "opciones": [
      "Ctrl + C y Ctrl + V",
      "Alt + F4 y Ctrl + Z",
      "Ctrl + X y Ctrl + P",
      "Shift + A y Shift + B"
    ],
    "respuestaCorrecta": "Ctrl + C y Ctrl + V",
    "explicacion": "Ideados originalmente por Larry Tesler en Xerox PARC; Ctrl + Z sirve para Deshacer."
  },
  {
    "id": "tec_31",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué videojuego móvil lanzado en 2020 sobre tripulantes de colores que deben reparar una nave espacial popularizó la frase 'hay un impostor entre nosotros'?",
    "opciones": [
      "Among Us",
      "Fall Guys",
      "Brawl Stars",
      "Clash Royale"
    ],
    "respuestaCorrecta": "Among Us",
    "explicacion": "Aunque fue lanzado en 2018 por InnerSloth, explotó mundialmente durante los confinamientos de 2020."
  },
  {
    "id": "tec_32",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿Qué sistema operativo móvil creado por Google utilizan la mayoría de los teléfonos Samsung, Xiaomi y Motorola?",
    "opciones": [
      "Android",
      "iOS",
      "Windows Phone",
      "Symbian"
    ],
    "respuestaCorrecta": "Android",
    "explicacion": "Representado por un pequeño robot verde, Android es el sistema operativo con más dispositivos activos del planeta."
  },
  {
    "id": "tec_33",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Cuál es la consola de videojuegos de sobremesa más vendida de toda la historia (con cerca de 160 millones de unidades)?",
    "opciones": [
      "PlayStation 2 (PS2)",
      "PlayStation 4",
      "Xbox 360",
      "Super Nintendo"
    ],
    "respuestaCorrecta": "PlayStation 2 (PS2)",
    "explicacion": "Lanzada por Sony en el año 2000, su capacidad de reproducir discos DVD y su enorme catálogo la hicieron imbatible."
  },
  {
    "id": "tec_34",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el protagonista vestido con túnica verde en la saga 'The Legend of Zelda', a quien mucha gente confunde con el nombre de la princesa?",
    "opciones": [
      "Link",
      "Zelda",
      "Ganondorf",
      "Cloud"
    ],
    "respuestaCorrecta": "Link",
    "explicacion": "Link es el héroe de Hyrule; Zelda es el nombre de la princesa del reino."
  },
  {
    "id": "tec_35",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué empresario sudafricano es el director ejecutivo de Tesla y SpaceX, y compró la red social Twitter para renombrarla como 'X'?",
    "opciones": [
      "Elon Musk",
      "Jeff Bezos",
      "Mark Zuckerberg",
      "Bill Gates"
    ],
    "respuestaCorrecta": "Elon Musk",
    "explicacion": "Musk cofundó PayPal antes de liderar SpaceX y Tesla Motors."
  },
  {
    "id": "tec_36",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿En qué año presentó Steve Jobs el primer iPhone original de la historia?",
    "opciones": [
      "2007",
      "2004",
      "2010",
      "2001"
    ],
    "respuestaCorrecta": "2007",
    "explicacion": "Fue presentado el 9 de enero de 2007 como 'un iPod de pantalla táctil, un teléfono y un comunicador de Internet en un solo dispositivo'."
  },
  {
    "id": "tec_37",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué significa el código de error '404' cuando intentas entrar a una página web en Internet?",
    "opciones": [
      "Página no encontrada (Not Found)",
      "Sin conexión de batería",
      "Virus detectado",
      "Contraseña incorrecta"
    ],
    "respuestaCorrecta": "Página no encontrada (Not Found)",
    "explicacion": "En el protocolo HTTP, el código de estado 404 indica que el servidor funciona pero no encontró el recurso solicitado."
  },
  {
    "id": "tec_38",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué clásico videojuego de rompecabezas donde caen piezas geométricas (tetrominós) fue creado en la Unión Soviética en 1984?",
    "opciones": [
      "Tetris",
      "Pac-Man",
      "Space Invaders",
      "Pong"
    ],
    "respuestaCorrecta": "Tetris",
    "explicacion": "Fue programado por el ingeniero informático ruso Alekséi Pázhitnov en la Academia de Ciencias de Moscú."
  },
  {
    "id": "tec_39",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué videojuego de acción protagonizado por Carl 'CJ' Johnson en el estado ficticio de los años 90 fue el juego más vendido de PlayStation 2?",
    "opciones": [
      "Grand Theft Auto: San Andreas (GTA San Andreas)",
      "GTA Vice City",
      "Red Dead Redemption",
      "Need for Speed Underground"
    ],
    "respuestaCorrecta": "Grand Theft Auto: San Andreas (GTA San Andreas)",
    "explicacion": "Lanzado por Rockstar Games en 2004, su mapa abarcaba las ciudades de Los Santos, San Fierro y Las Venturas."
  },
  {
    "id": "tec_40",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué significan las siglas 'CPU' en el interior de un computador o teléfono?",
    "opciones": [
      "Unidad Central de Procesamiento (Central Processing Unit)",
      "Control de Pantalla Universal",
      "Cable de Potencia Única",
      "Centro de Programas de Usuario"
    ],
    "respuestaCorrecta": "Unidad Central de Procesamiento (Central Processing Unit)",
    "explicacion": "La CPU o procesador es el 'cerebro' encargado de ejecutar las instrucciones de los programas."
  },
  {
    "id": "tec_41",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué programa de mensajería de Microsoft fue el rey de los chats en Chile durante los años 2000, famoso por sus 'zumbidos' y estados con canciones?",
    "opciones": [
      "MSN Messenger (Windows Live Messenger)",
      "ICQ",
      "Skype",
      "Yahoo! Messenger"
    ],
    "respuestaCorrecta": "MSN Messenger (Windows Live Messenger)",
    "explicacion": "Millones de usuarios conectaban y desconectaban sesión para que su contacto viera la ventanita emergente en la esquina."
  },
  {
    "id": "tec_42",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué red social de fotografías previa a Instagram fue furor entre los jóvenes chilenos ('pokemones', 'pelolais', 'hardcore') entre 2005 y 2008?",
    "opciones": [
      "Fotolog",
      "MySpace",
      "Hi5",
      "Tumblr"
    ],
    "respuestaCorrecta": "Fotolog",
    "explicacion": "En Fotolog solo se podía subir una foto al día (salvo con cuenta Gold) y se firmaba con 'F/F' (post por post)."
  },
  {
    "id": "tec_43",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el protagonista espartano de piel ceniza y tatuaje rojo en la exitosa saga de videojuegos 'God of War'?",
    "opciones": [
      "Kratos",
      "Atreus",
      "Ares",
      "Dante"
    ],
    "respuestaCorrecta": "Kratos",
    "explicacion": "El 'Fantasma de Esparta' se enfrentó primero a los dioses del Olimpo griego y luego a la mitología nórdica junto a su hijo Atreus."
  },
  {
    "id": "tec_44",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué empresa japonesa creó en 1979 el 'Walkman', el reproductor portátil de casetes que permitió escuchar música caminando con audífonos?",
    "opciones": [
      "Sony",
      "Panasonic",
      "Casio",
      "Toshiba"
    ],
    "respuestaCorrecta": "Sony",
    "explicacion": "El Sony Walkman TPS-L2 cambió para siempre la forma en que las personas consumen música en la calle."
  },
  {
    "id": "tec_45",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué unidad de almacenamiento digital equivale aproximadamente a 1.024 Gigabytes (GB)?",
    "opciones": [
      "1 Terabyte (TB)",
      "1 Megabyte (MB)",
      "1 Kilobyte (KB)",
      "1 Bit"
    ],
    "respuestaCorrecta": "1 Terabyte (TB)",
    "explicacion": "El orden de menor a mayor es: Byte, Kilobyte (KB), Megabyte (MB), Gigabyte (GB), Terabyte (TB) y Petabyte (PB)."
  },
  {
    "id": "tec_46",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué consola de Nintendo lanzada en 2006 revolucionó los juegos familiares con un control inalámbrico con sensor de movimiento (como 'Wii Sports')?",
    "opciones": [
      "Nintendo Wii",
      "Nintendo GameCube",
      "Nintendo DS",
      "Wii U"
    ],
    "respuestaCorrecta": "Nintendo Wii",
    "explicacion": "Con su juego incluido de tenis y bolos, la Wii superó los 101 millones de consolas vendidas."
  },
  {
    "id": "tec_47",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué matemático y criptógrafo británico descifró los códigos de la máquina nazi 'Enigma' y es considerado el padre de la computación moderna y la inteligencia artificial?",
    "opciones": [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Tim Berners-Lee"
    ],
    "respuestaCorrecta": "Alan Turing",
    "explicacion": "Su concepto de la 'Máquina de Turing' (1936) y el 'Test de Turing' (1950) sentaron las bases teóricas de toda la informática actual."
  },
  {
    "id": "tec_48",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue la matemática británica del siglo XIX, hija de Lord Byron, considerada la primera programadora de la historia por escribir el primer algoritmo para una máquina?",
    "opciones": [
      "Ada Lovelace",
      "Grace Hopper",
      "Hedy Lamarr",
      "Margaret Hamilton"
    ],
    "respuestaCorrecta": "Ada Lovelace",
    "explicacion": "En 1843 escribió las notas y el primer algoritmo destinado a la Máquina Analítica de Charles Babbage."
  },
  {
    "id": "tec_49",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué científico británico inventó en 1989 la 'World Wide Web' (WWW), el protocolo HTTP y el lenguaje HTML mientras trabajaba en el CERN?",
    "opciones": [
      "Tim Berners-Lee",
      "Vinton Cerf",
      "Linus Torvalds",
      "Bill Gates"
    ],
    "respuestaCorrecta": "Tim Berners-Lee",
    "explicacion": "Berners-Lee decidió liberar las patentes de la Web de forma gratuita para que toda la humanidad pudiera usarla."
  },
  {
    "id": "tec_50",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿De qué rey escandinavo medieval del siglo X proviene el nombre y el símbolo rúnico de la tecnología inalámbrica 'Bluetooth'?",
    "opciones": [
      "Harald 'Diente Azul' (Harald Blåtand)",
      "Ragnar Lodbrok",
      "Erik el Rojo",
      "Canuto el Grande"
    ],
    "respuestaCorrecta": "Harald 'Diente Azul' (Harald Blåtand)",
    "explicacion": "El rey Harald unificó las tribus de Dinamarca y Noruega, tal como el estándar Bluetooth unificó la comunicación entre dispositivos."
  },
  {
    "id": "tec_51",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué teléfono móvil de Nokia lanzado en el año 2000 (con el juego 'Snake II') es legendario en la cultura pop por su batería eterna y su carcasa 'indestructible'?",
    "opciones": [
      "Nokia 3310",
      "Motorola Razr V3",
      "BlackBerry Bold",
      "Sony Ericsson Walkman"
    ],
    "respuestaCorrecta": "Nokia 3310",
    "explicacion": "El Nokia 3310 vendió más de 126 millones de unidades y se transformó en un meme universal de resistencia."
  },
  {
    "id": "tec_52",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál fue el primer videojuego comercial de arcade de éxito masivo en 1972, desarrollado por Atari, que simulaba un sencillo partido de tenis de mesa con dos líneas blancas?",
    "opciones": [
      "Pong",
      "Space Invaders",
      "Asteroids",
      "Breakout"
    ],
    "respuestaCorrecta": "Pong",
    "explicacion": "Creado por Allan Alcorn y Nolan Bushnell en Atari, dio inicio a la industria comercial de los videojuegos."
  },
  {
    "id": "tec_53",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llaman los cuatro fantasmas de colores (rojo, rosado, celeste y naranja) que persiguen a Pac-Man en el juego original en inglés?",
    "opciones": [
      "Blinky, Pinky, Inky y Clyde",
      "winky, Dipsy, Laa-Laa y Po",
      "Shadow, Speedy, Bashful y Pokey",
      "Boo, Gastly, Haunter y Gengar"
    ],
    "respuestaCorrecta": "Blinky, Pinky, Inky y Clyde",
    "explicacion": "Cada uno de los cuatro fantasmas tenía programado un algoritmo de persecución distinto dentro del laberinto."
  },
  {
    "id": "tec_54",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué ingeniero finlandés creó en 1991 el núcleo del sistema operativo de código abierto 'Linux' y el sistema de control de versiones 'Git'?",
    "opciones": [
      "Linus Torvalds",
      "Richard Stallman",
      "Dennis Ritchie",
      "Ken Thompson"
    ],
    "respuestaCorrecta": "Linus Torvalds",
    "explicacion": "Linux es hoy la base de la gran mayoría de los servidores de Internet, supercomputadores y del sistema Android."
  },
  {
    "id": "tec_55",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué significa el acrónimo 'URL' que representa la dirección única de cada página en Internet?",
    "opciones": [
      "Uniform Resource Locator (Localizador Uniforme de Recursos)",
      "Universal Radio Link",
      "United Router Line",
      "User Reference List"
    ],
    "respuestaCorrecta": "Uniform Resource Locator (Localizador Uniforme de Recursos)",
    "explicacion": "Una URL indica el protocolo (https), el dominio y la ruta exacta hacia un recurso en la red."
  },
  {
    "id": "tec_56",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué empresa tecnológica domina hoy el mercado mundial de tarjetas gráficas (GPU) y chips para entrenar Inteligencia Artificial, superando los 3 billones de dólares de valoración?",
    "opciones": [
      "NVIDIA",
      "Intel",
      "IBM",
      "Cisco"
    ],
    "respuestaCorrecta": "NVIDIA",
    "explicacion": "Fundada en 1993 por Jensen Huang, sus tarjetas GeForce y sus procesadores para IA la convirtieron en una de las empresas más valiosas del planeta."
  },
  {
    "id": "tec_57",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el proyecto cibernético pionero desarrollado en Chile entre 1971 y 1973 junto al británico Stafford Beer para conectar las fábricas del país en tiempo real mediante télex?",
    "opciones": [
      "Proyecto Synco (Cybersyn)",
      "Proyecto Eniac",
      "Red Arpanet Sur",
      "Sistema Cóndor"
    ],
    "respuestaCorrecta": "Proyecto Synco (Cybersyn)",
    "explicacion": "Con su futurista sala de operaciones hexagonal en Santiago, es considerado un precursor histórico de la gestión de datos en red."
  },
  {
    "id": "tec_58",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿En qué año fue conectada y enviada desde Chile la primera transmisión universitaria de correo electrónico que dio inicio a Internet en el país (.cl)?",
    "opciones": [
      "1987",
      "1995",
      "1980",
      "1999"
    ],
    "respuestaCorrecta": "1987",
    "explicacion": "En 1987 académicos de la Universidad de Chile y la USACH enviaron el primer correo electrónico entre ambos campus y crearon NIC Chile (.cl)."
  },
  {
    "id": "tec_59",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué seudónimo utilizó la persona o grupo anónimo que publicó en 2008 el documento fundacional de 'Bitcoin' y la cadena de bloques (Blockchain)?",
    "opciones": [
      "Satoshi Nakamoto",
      "Vitalik Buterin",
      "Hal Finney",
      "Nick Szabo"
    ],
    "respuestaCorrecta": "Satoshi Nakamoto",
    "explicacion": "La verdadera identidad de Satoshi Nakamoto sigue siendo uno de los mayores misterios de la era digital."
  },
  {
    "id": "tec_60",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué legendario código secreto de los videojuegos de Konami comienza con la secuencia: 'Arriba, Arriba, Abajo, Abajo, Izquierda, Derecha, Izquierda, Derecha, B, A'?",
    "opciones": [
      "Código Konami (Konami Code)",
      "Código Contra",
      "Modo Dios (IDDQD)",
      "Código Motherlode"
    ],
    "respuestaCorrecta": "Código Konami (Konami Code)",
    "explicacion": "Creado por Kazuhisa Hashimoto en 1986 para el juego 'Gradius' y mundialmente famoso por otorgar 30 vidas en 'Contra'."
  },
  {
    "id": "tec_61",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué videojuego ganó el premio 'Game of the Year' (Juego del Año) en The Game Awards 2022, desarrollado por FromSoftware con colaboración de George R. R. Martin?",
    "opciones": [
      "Elden Ring",
      "God of War Ragnarök",
      "Baldur's Gate 3",
      "The Last of Us Part II"
    ],
    "respuestaCorrecta": "Elden Ring",
    "explicacion": "Dirigido por Hidetaka Miyazaki, 'Elden Ring' llevó el género Soulslike a un mundo abierto masivo."
  },
  {
    "id": "tec_62",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué estudio chileno de videojuegos independiente creó la aclamada saga 'Zeno Clash', 'Rock of Ages' y 'The Eternal Cylinder'?",
    "opciones": [
      "ACE Team",
      "Niebla Games",
      "AOne Games",
      "Iguanabee"
    ],
    "respuestaCorrecta": "ACE Team",
    "explicacion": "Fundado en Santiago por los hermanos Andrés, Carlos y Edmundo Bordeu, ACE Team es pionero de la industria chilena de videojuegos."
  },
  {
    "id": "tec_63",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el famoso gusano informático o 'virus del milenio' que generó pánico mundial ante el cambio de fecha del 31 de diciembre de 1999 al 1 de enero de 2000?",
    "opciones": [
      "Efecto 2000 (Y2K)",
      "Virus I Love You",
      "Caballo de Troya",
      "Stuxnet"
    ],
    "respuestaCorrecta": "Efecto 2000 (Y2K)",
    "explicacion": "Se debía a que los sistemas antiguos guardaban los años con solo dos dígitos ('99'), temiendo que el '00' se interpretara como 1900."
  },
  {
    "id": "tec_64",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál fue el primer videojuego de la historia en viajar al espacio exterior, llevado por el cosmonauta Aleksandr Serebrov a la estación Mir en 1993 en una Game Boy?",
    "opciones": [
      "Tetris",
      "Super Mario Land",
      "Space Invaders",
      "Pac-Man"
    ],
    "respuestaCorrecta": "Tetris",
    "explicacion": "La consola Game Boy y el cartucho de Tetris orbitaron la Tierra más de 3.000 veces a bordo de la estación espacial Mir."
  },
  {
    "id": "tec_65",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué ingeniera de software de la NASA lideró el equipo que escribió el código de vuelo del programa Apolo que llevó al ser humano a la Luna en 1969?",
    "opciones": [
      "Margaret Hamilton",
      "Katherine Johnson",
      "Dorothy Vaughan",
      "Sally Ride"
    ],
    "respuestaCorrecta": "Margaret Hamilton",
    "explicacion": "Es famosa su fotografía junto a la pila de libros con el código impreso del Apolo 11, tan alta como ella misma."
  },
  {
    "id": "tec_66",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué componente electrónico inventado en los Laboratorios Bell en 1947 reemplazó a los tubos de vacío y permitió la creación de los microchips modernos?",
    "opciones": [
      "El transistor",
      "El condensador",
      "El diodo láser",
      "La bobina de Tesla"
    ],
    "respuestaCorrecta": "El transistor",
    "explicacion": "Inventado por Bardeen, Brattain y Shockley, un procesador actual de teléfono contiene miles de millones de transistores microscópicos."
  },
  {
    "id": "tec_67",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué significa el término 'Open Source' en el mundo del desarrollo de software?",
    "opciones": [
      "Software de código abierto (cuyo código fuente puede ser inspeccionado, modificado y compartido)",
      "Software que no necesita electricidad",
      "Programas exclusivos para teléfonos móviles",
      "Juegos sin conexión a Internet"
    ],
    "respuestaCorrecta": "Software de código abierto (cuyo código fuente puede ser inspeccionado, modificado y compartido)",
    "explicacion": "Ejemplos fundamentales de código abierto son Linux, Python, Blender, VLC y Chromium."
  },
  {
    "id": "tec_68",
    "categoria": "tecnologia",
    "dificultad": "facil",
    "pregunta": "¿En qué plataforma de streaming de color morado transmiten en vivo la mayoría de los gamers y streamers del mundo?",
    "opciones": [
      "Twitch",
      "Spotify",
      "Netflix",
      "Pinterest"
    ],
    "respuestaCorrecta": "Twitch",
    "explicacion": "Lanzada en 2011 como un derivado de Justin.tv y adquirida por Amazon en 2014."
  },
  {
    "id": "tec_69",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Qué videojuego de simulación de vida de EA permite construir casas, crear familias que hablan en idioma 'Simlish' y usar el truco 'klapaucius' o 'motherlode' para tener dinero?",
    "opciones": [
      "Los Sims (The Sims)",
      "SimCity",
      "Animal Crossing",
      "Stardew Valley"
    ],
    "respuestaCorrecta": "Los Sims (The Sims)",
    "explicacion": "Creado por Will Wright en el año 2000, es una de las franquicias de PC más exitosas de todos los tiempos."
  },
  {
    "id": "tec_70",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿En qué juego de cartas coleccionables y videojuegos existen criaturas como el 'Dragón Blanco de Ojos Azules' y 'Exodia, el Prohibido'?",
    "opciones": [
      "Yu-Gi-Oh!",
      "Pokémon TCG",
      "Magic: The Gathering",
      "Mitos y Leyendas"
    ],
    "respuestaCorrecta": "Yu-Gi-Oh!",
    "explicacion": "Basado en el manga de Kazuki Takahashi protagonizado por Yugi Muto y Seto Kaiba."
  },
  {
    "id": "tec_71",
    "categoria": "tecnologia",
    "dificultad": "media",
    "pregunta": "¿Cómo se llama el legendario juego chileno de cartas coleccionables creado por Salo en el año 2000 sobre mitología universal e historia de Chile?",
    "opciones": [
      "Mitos y Leyendas",
      "Humano",
      "El Señor de los Anillos",
      "Catan"
    ],
    "respuestaCorrecta": "Mitos y Leyendas",
    "explicacion": "Con ediciones inolvidables como 'El Reto', 'Espada Sagrada', 'Helénica' e 'Hijos de Daana', marcó a toda una generación en Chile y Latinoamérica."
  },
  {
    "id": "tec_72",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál de las siguientes fue una de las ediciones más icónicas de la 'Primera Era' del juego de cartas chileno 'Mitos y Leyendas', centrada en el Rey Arturo y los caballeros medievales?",
    "opciones": [
      "Espada Sagrada",
      "era de Ultrón",
      "Tierra Media",
      "Invasión Alienígena"
    ],
    "respuestaCorrecta": "Espada Sagrada",
    "explicacion": "Lanzada en 2003 por Salo, 'Espada Sagrada' (junto a 'Helénica' e 'Hijos de Daana') es una de las ediciones más recordadas del juego."
  },
  {
    "id": "tec_73",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el nombre del lenguaje de programación creado por Guido van Rossum en 1991, hoy líder en ciencia de datos e Inteligencia Artificial, cuyo nombre rinde homenaje a un grupo británico de comedia?",
    "opciones": [
      "Python",
      "Java",
      "C++",
      "Rust"
    ],
    "respuestaCorrecta": "Python",
    "explicacion": "Guido van Rossum lo bautizó 'Python' en honor al grupo cómico británico 'Monty Python', no por la serpiente."
  },
  {
    "id": "tec_74",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué supercomputadora de IBM derrotó en 1997 al campeón mundial de ajedrez Garri Kaspárov en un duelo histórico de 6 partidas?",
    "opciones": [
      "Deep Blue",
      "AlphaGo",
      "Watson",
      "HAL 9000"
    ],
    "respuestaCorrecta": "Deep Blue",
    "explicacion": "Fue la primera vez que una computadora venció a un campeón mundial de ajedrez vigente bajo ritmo de torneo."
  },
  {
    "id": "tec_75",
    "categoria": "tecnologia",
    "dificultad": "dificil",
    "pregunta": "¿Qué telescopio espacial infrarrojo lanzado en la Navidad de 2021 con un espejo plegable dorado de 6,5 metros sucedió al Telescopio Espacial Hubble?",
    "opciones": [
      "Telescopio Espacial James Webb (JWST)",
      "Telescopio Kepler",
      "Sonda Voyager 1",
      "Observatorio Chandra"
    ],
    "respuestaCorrecta": "Telescopio Espacial James Webb (JWST)",
    "explicacion": "Situado a 1,5 millones de kilómetros de la Tierra (punto de Lagrange L2), observa las primeras galaxias formadas tras el Big Bang."
  },
  {
    "id": "gue_21",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Entre qué años se desarrolló la Primera Guerra Mundial (también llamada la Gran Guerra)?",
    "opciones": [
      "1914 a 1918",
      "1939 a 1945",
      "1905 a 1910",
      "1929 a 1935"
    ],
    "respuestaCorrecta": "1914 a 1918",
    "explicacion": "Comenzó en julio de 1914 y terminó con el Armisticio del 11 de noviembre de 1918."
  },
  {
    "id": "gue_22",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Entre qué años se desarrolló la Segunda Guerra Mundial?",
    "opciones": [
      "1939 a 1945",
      "1914 a 1918",
      "1941 a 1950",
      "1936 a 1939"
    ],
    "respuestaCorrecta": "1939 a 1945",
    "explicacion": "Se inició el 1 de septiembre de 1939 con la invasión alemana de Polonia y concluyó en septiembre de 1945."
  },
  {
    "id": "gue_23",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué tres países integraron las potencias principales del 'Eje' durante la Segunda Guerra Mundial?",
    "opciones": [
      "Alemania, Italia y Japón",
      "Alemania, Rusia y España",
      "Estados Unidos, Reino Unido y Francia",
      "Alemania, Turquía y China"
    ],
    "respuestaCorrecta": "Alemania, Italia y Japón",
    "explicacion": "El Pacto Tripartito unió a la Alemania nazi de Hitler, la Italia fascista de Mussolini y el Imperio del Japón."
  },
  {
    "id": "gue_24",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué base naval estadounidense en Hawái fue atacada sorpresivamente por la aviación japonesa el 7 de diciembre de 1941?",
    "opciones": [
      "Pearl Harbor",
      "Midway",
      "Guantánamo",
      "San Diego"
    ],
    "respuestaCorrecta": "Pearl Harbor",
    "explicacion": "El ataque a Pearl Harbor provocó la entrada inmediata de Estados Unidos en la Segunda Guerra Mundial."
  },
  {
    "id": "gue_25",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué niña judía escribió un famoso diario mientras permanecía oculta con su familia en un desván de Ámsterdam durante la ocupación nazi?",
    "opciones": [
      "Ana Frank (Anne Frank)",
      "Eva Braun",
      "Sophie Scholl",
      "Irena Sendler"
    ],
    "respuestaCorrecta": "Ana Frank (Anne Frank)",
    "explicacion": "'El diario de Ana Frank', publicado por su padre Otto Frank tras la guerra, es uno de los testimonios más conmovedores del Holocausto."
  },
  {
    "id": "gue_26",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué países se enfrentaron en la Guerra del Pacífico entre 1879 y 1884?",
    "opciones": [
      "Chile contra la alianza de Perú y Bolivia",
      "Chile contra Argentina",
      "Perú contra Ecuador",
      "Chile contra España"
    ],
    "respuestaCorrecta": "Chile contra la alianza de Perú y Bolivia",
    "explicacion": "También conocida como la Guerra del Guano y del Salitre, definió las fronteras del norte grande de Chile."
  },
  {
    "id": "gue_27",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba el buque blindado peruano comandado por Miguel Grau que hundió a la Esmeralda y luego fue capturado por Chile en Angamos?",
    "opciones": [
      "Monitor Huáscar",
      "Fragata Independencia",
      "Corbeta Covadonga",
      "Blindado Cochrane"
    ],
    "respuestaCorrecta": "Monitor Huáscar",
    "explicacion": "Capturado el 8 de octubre de 1879, hoy el Huáscar se conserva como museo flotante en la base naval de Talcahuano."
  },
  {
    "id": "gue_28",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Sobre qué dos ciudades japonesas lanzó Estados Unidos bombas atómicas en agosto de 1945?",
    "opciones": [
      "Hiroshima y Nagasaki",
      "Tokio y Kioto",
      "Osaka y Yokohama",
      "Hiroshima y Okinawa"
    ],
    "respuestaCorrecta": "Hiroshima y Nagasaki",
    "explicacion": "El 6 de agosto cayó 'Little Boy' sobre Hiroshima y el 9 de agosto 'Fat Man' sobre Nagasaki."
  },
  {
    "id": "gue_29",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamó el enfrentamiento político, ideológico y espacial sin combate directo entre Estados Unidos y la Unión Soviética tras 1945?",
    "opciones": [
      "La Guerra Fría",
      "La Guerra de los Cien Años",
      "La Guerra del Golfo",
      "La Paz Armada"
    ],
    "respuestaCorrecta": "La Guerra Fría",
    "explicacion": "Se extendió desde el fin de la Segunda Guerra Mundial hasta la disolución de la URSS en 1991."
  },
  {
    "id": "gue_30",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamó el sistema de combate característico del frente occidental en la Primera Guerra Mundial, donde los soldados vivían en zanjas excavadas en la tierra?",
    "opciones": [
      "Guerra de trincheras",
      "Guerra relámpago",
      "Guerra de guerrillas",
      "Guerra cibernética"
    ],
    "respuestaCorrecta": "Guerra de trincheras",
    "explicacion": "Kilómetros de trincheras con alambre de púas y barro separaban a los ejércitos por la 'tierra de nadie'."
  },
  {
    "id": "gue_31",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿En qué región de Francia ocurrió el famoso desembarco aliado del 'Día D' el 6 de junio de 1944 (Operación Overlord)?",
    "opciones": [
      "Normandía",
      "Calais",
      "Bretaña",
      "Provenza"
    ],
    "respuestaCorrecta": "Normandía",
    "explicacion": "Más de 150.000 soldados aliados desembarcaron en las playas de Utah, Omaha, Gold, Juno y Sword en Normandía."
  },
  {
    "id": "gue_32",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Quién fue el Primer Ministro británico que lideró la resistencia del Reino Unido durante la Segunda Guerra Mundial, famoso por su discurso de 'sangre, esfuerzo, lágrimas y sudor'?",
    "opciones": [
      "Winston Churchill",
      "Neville Chamberlain",
      "Clement Attlee",
      "David Lloyd George"
    ],
    "respuestaCorrecta": "Winston Churchill",
    "explicacion": "Churchill encabezó el gobierno británico entre 1940 y 1945 y ganó además el Premio Nobel de Literatura en 1953."
  },
  {
    "id": "gue_33",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué sangrienta batalla librada entre 1942 y 1943 a orillas del río Volga marcó el punto de inflexión y el inicio de la derrota de Alemania en el Frente Oriental?",
    "opciones": [
      "Batalla de Stalingrado",
      "Batalla de Moscú",
      "Batalla de Berlín",
      "Sitio de Leningrado"
    ],
    "respuestaCorrecta": "Batalla de Stalingrado",
    "explicacion": "La rendición del 6.º Ejército alemán de Friedrich Paulus en febrero de 1943 cambió el curso de la Segunda Guerra Mundial."
  },
  {
    "id": "gue_34",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué marino chileno al mando de la goleta Covadonga logró que la poderosa fragata blindada peruana Independencia encallara en Punta Gruesa el 21 de mayo de 1879?",
    "opciones": [
      "Carlos Condell",
      "Arturo Prat",
      "Juan José Latorre",
      "Luis Uribe"
    ],
    "respuestaCorrecta": "Carlos Condell",
    "explicacion": "Mientras Prat combatía en Iquique, la hábil maniobra de Condell en Punta Gruesa privó al Perú de su mejor blindado."
  },
  {
    "id": "gue_35",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿En qué histórica acción militar del 7 de junio de 1880 el ejército chileno tomó una fortaleza estratégica en solo 55 minutos al mando del coronel Pedro Lagos?",
    "opciones": [
      "Asalto y Toma del Morro de Arica",
      "Batalla de Tacna",
      "Batalla de Chorrillos",
      "Batalla de Miraflores"
    ],
    "respuestaCorrecta": "Asalto y Toma del Morro de Arica",
    "explicacion": "El rápido asalto al Morro de Arica pasó a la historia militar de Chile y de los regimientos de línea."
  },
  {
    "id": "gue_36",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamó el proyecto científico-militar secreto de Estados Unidos liderado por Robert Oppenheimer para desarrollar la primera bomba atómica?",
    "opciones": [
      "Proyecto Manhattan",
      "Operación Paperclip",
      "Proyecto Apolo",
      "Operación Valkiria"
    ],
    "respuestaCorrecta": "Proyecto Manhattan",
    "explicacion": "Con su laboratorio principal en Los Álamos (Nuevo México), realizó la primera prueba nuclear ('Trinity') en julio de 1945."
  },
  {
    "id": "gue_37",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué organización internacional de paz fue fundada en octubre de 1945 tras el fin de la Segunda Guerra Mundial para reemplazar a la fallida Sociedad de las Naciones?",
    "opciones": [
      "Organización de las Naciones Unidas (ONU)",
      "OTAN",
      "Unión Europea",
      "Cruz Roja Internacional"
    ],
    "respuestaCorrecta": "Organización de las Naciones Unidas (ONU)",
    "explicacion": "La Carta de las Naciones Unidas fue firmada en San Francisco en 1945 por 51 países fundadores, incluido Chile."
  },
  {
    "id": "gue_38",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué término en alemán ('Guerra Relámpago') describía la táctica nazi de ataques rápidos coordinados con tanques Panzer y aviación Luftwaffe?",
    "opciones": [
      "Blitzkrieg",
      "Wehrmacht",
      "Anschluss",
      "Lebensraum"
    ],
    "respuestaCorrecta": "Blitzkrieg",
    "explicacion": "La Blitzkrieg permitió a Alemania conquistar Polonia, Francia, Bélgica y los Países Bajos en pocas semanas entre 1939 y 1940."
  },
  {
    "id": "gue_39",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué as de la aviación alemana de la Primera Guerra Mundial, que pilotaba un triplano Fokker pintado de rojo brillante, derribó 80 aviones enemigos?",
    "opciones": [
      "El Barón Rojo (Manfred von Richthofen)",
      "Hermann Göring",
      "Charles Lindbergh",
      "Eddie Rickenbacker"
    ],
    "respuestaCorrecta": "El Barón Rojo (Manfred von Richthofen)",
    "explicacion": "Manfred von Richthofen fue el piloto más famoso de la Primera Guerra Mundial hasta ser derribado en abril de 1918."
  },
  {
    "id": "gue_40",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué crisis de octubre de 1962 puso al mundo al borde de una tercera guerra mundial nuclear durante 13 días por la instalación de proyectiles soviéticos en el Caribe?",
    "opciones": [
      "Crisis de los Misiles en Cuba",
      "Invasión de Bahía de Cochinos",
      "Bloqueo de Berlín",
      "Guerra de Corea"
    ],
    "respuestaCorrecta": "Crisis de los Misiles en Cuba",
    "explicacion": "El pulso entre John F. Kennedy y Nikita Jrushchov ha sido el momento de mayor tensión nuclear de la historia."
  },
  {
    "id": "gue_41",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿En qué combate de julio de 1882 en la sierra peruana 77 jóvenes soldados chilenos del Batallón Chacabuco al mando de Ignacio Carrera Pinto murieron sin rendirse?",
    "opciones": [
      "Combate de La Concepción",
      "Combate de Sangra",
      "Batalla de Huamachuco",
      "Batalla de Tarapacá"
    ],
    "respuestaCorrecta": "Combate de La Concepción",
    "explicacion": "En memoria de los 77 héroes de La Concepción (9 y 10 de julio de 1882), en Chile se celebra cada 9 de julio el Juramento a la Bandera."
  },
  {
    "id": "gue_42",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué dictador italiano fundó el Partido Nacional Fascista, se hacía llamar 'Il Duce' y fue aliado de Hitler en la Segunda Guerra Mundial?",
    "opciones": [
      "Benito Mussolini",
      "Francisco Franco",
      "Víctor Manuel III",
      "Giuseppe Garibaldi"
    ],
    "respuestaCorrecta": "Benito Mussolini",
    "explicacion": "Mussolini gobernó Italia desde la Marcha sobre Roma en 1922 hasta su caída y ejecución en 1945."
  },
  {
    "id": "gue_43",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿En qué ciudad alemana se celebraron entre 1945 y 1946 los históricos juicios internacionales contra los jerarcas nazis por crímenes contra la humanidad?",
    "opciones": [
      "Núremberg",
      "Múnich",
      "Berlín",
      "Hamburgo"
    ],
    "respuestaCorrecta": "Núremberg",
    "explicacion": "Los Juicios de Núremberg sentaron las bases del derecho penal internacional moderno."
  },
  {
    "id": "gue_44",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué atentado ocurrido el 28 de junio de 1914 en Sarajevo fue el detonante directo que desató la Primera Guerra Mundial?",
    "opciones": [
      "El asesinato del archiduque Francisco Fernando de Austria",
      "El hundimiento del Lusitania",
      "La invasión de Bélgica",
      "El Telegrama Zimmermann"
    ],
    "respuestaCorrecta": "El asesinato del archiduque Francisco Fernando de Austria",
    "explicacion": "El heredero al trono austrohúngaro y su esposa Sofía fueron asesinados en Sarajevo por el nacionalista serbobosnio Gavrilo Princip."
  },
  {
    "id": "gue_45",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó en código militar la gigantesca invasión de la Alemania nazi a la Unión Soviética iniciada el 22 de junio de 1941?",
    "opciones": [
      "Operación Barbarroja",
      "Operación León Marino",
      "Operación Market Garden",
      "Operación Antropoide"
    ],
    "respuestaCorrecta": "Operación Barbarroja",
    "explicacion": "Con más de 3 millones de soldados del Eje, la Operación Barbarroja fue la mayor invasión terrestre de la historia militar."
  },
  {
    "id": "gue_46",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué batalla aeronaval de junio de 1942 en el océano Pacífico, donde Estados Unidos hundió cuatro portaaviones japoneses, cambió el rumbo de la guerra en el Pacífico?",
    "opciones": [
      "Batalla de Midway",
      "Batalla de Guadalcanal",
      "Batalla de Iwo Jima",
      "Batalla del Mar del Coral"
    ],
    "respuestaCorrecta": "Batalla de Midway",
    "explicacion": "Gracias al descifrado de los códigos navales japoneses, la flota estadounidense emboscó a la flota combinada del almirante Yamamoto."
  },
  {
    "id": "gue_47",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué almirante chileno al mando del blindado Almirante Cochrane lideró la captura del monitor Huáscar en el Combate Naval de Angamos el 8 de octubre de 1879?",
    "opciones": [
      "Juan José Latorre",
      "Patricio Lynch",
      "Galvarino Riveros",
      "Manuel Baquedano"
    ],
    "respuestaCorrecta": "Juan José Latorre",
    "explicacion": "La precisión artillera y velocidad del blindado Cochrane al mando de Latorre decidieron el dominio del mar en la Guerra del Pacífico."
  },
  {
    "id": "gue_48",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué general alemán de la Segunda Guerra Mundial fue apodado 'El Zorro del Desierto' por sus campañas al mando del Afrika Korps en el norte de África?",
    "opciones": [
      "Erwin Rommel",
      "Heinz Guderian",
      "Erich von Manstein",
      "Friedrich Paulus"
    ],
    "respuestaCorrecta": "Erwin Rommel",
    "explicacion": "Rommel fue derrotado finalmente por el general británico Bernard Montgomery en la Batalla de El Alamein (1942)."
  },
  {
    "id": "gue_49",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿En qué ciudad de Crimea se reunieron en febrero de 1945 Roosevelt, Churchill y Stalin ('Los Tres Grandes') para diseñar el orden mundial posterior a la derrota nazi?",
    "opciones": [
      "Yalta (Conferencia de Yalta)",
      "Potsdam",
      "Teherán",
      "Casablanca"
    ],
    "respuestaCorrecta": "Yalta (Conferencia de Yalta)",
    "explicacion": "En el Palacio de Livadia en Yalta acordaron la división de Alemania en zonas de ocupación y la creación de la ONU."
  },
  {
    "id": "gue_50",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el bombardero B-29 estadounidense pilotado por Paul Tibbets que lanzó la primera bomba atómica sobre Hiroshima?",
    "opciones": [
      "Enola Gay",
      "Bockscar",
      "Memphis Belle",
      "Spirit of St. Louis"
    ],
    "respuestaCorrecta": "Enola Gay",
    "explicacion": "Paul Tibbets bautizó al avión con el nombre de su madre, Enola Gay Tibbets; 'Bockscar' fue el avión que lanzó la bomba de Nagasaki."
  },
  {
    "id": "gue_51",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cuál fue la mayor batalla de tanques de la historia, librada en julio de 1943 en el Frente Oriental entre el Ejército Rojo y la Wehrmacht?",
    "opciones": [
      "Batalla de Kursk",
      "Batalla de las Ardenas",
      "Batalla de El Alamein",
      "Batalla de Prokhorovka (parte de Kursk)"
    ],
    "respuestaCorrecta": "Batalla de Kursk",
    "explicacion": "En el saliente de Kursk se enfrentaron más de 6.000 tanques y 2 millones de soldados."
  },
  {
    "id": "gue_52",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó la milagrosa evacuación marítima de más de 338.000 soldados británicos y franceses acorralados en una playa del norte de Francia en mayo-junio de 1940?",
    "opciones": [
      "Evacuación de Dunkerque (Operación Dinamo)",
      "Batalla de Inglaterra",
      "Desembarco de Dieppe",
      "Operación Torch"
    ],
    "respuestaCorrecta": "Evacuación de Dunkerque (Operación Dinamo)",
    "explicacion": "Cientos de barcos pesqueros y de recreo civiles ('little ships') cruzaron el Canal de la Mancha bajo el fuego aéreo para rescatar a las tropas."
  },
  {
    "id": "gue_53",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué paralelo geográfico quedó establecido como la frontera y zona desmilitarizada que divide hasta hoy a Corea del Norte y Corea del Sur tras la Guerra de Corea (1950-1953)?",
    "opciones": [
      "El paralelo 38",
      "El paralelo 17",
      "El paralelo 49",
      "El paralelo 24"
    ],
    "respuestaCorrecta": "El paralelo 38",
    "explicacion": "El armisticio de Panmunjom en 1953 fijó la línea de demarcación en torno al paralelo 38 norte."
  },
  {
    "id": "gue_54",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿A bordo de qué acorazado estadounidense en la bahía de Tokio firmó Japón su rendición incondicional el 2 de septiembre de 1945, poniendo fin a la Segunda Guerra Mundial?",
    "opciones": [
      "USS Missouri",
      "USS Arizona",
      "USS Enterprise",
      "HMS Hood"
    ],
    "respuestaCorrecta": "USS Missouri",
    "explicacion": "Ante el general Douglas MacArthur a bordo del USS Missouri, Japón firmó el acta que cerró oficialmente el conflicto mundial."
  },
  {
    "id": "gue_55",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿En qué isla volcánica del Pacífico se tomó en febrero de 1945 la icónica fotografía de seis marines estadounidenses alzando la bandera en el monte Suribachi?",
    "opciones": [
      "Iwo Jima",
      "Okinawa",
      "Guadalcanal",
      "Saipán"
    ],
    "respuestaCorrecta": "Iwo Jima",
    "explicacion": "La foto tomada por Joe Rosenthal en Iwo Jima ganó el Premio Pulitzer y se convirtió en la imagen más reproducida de la guerra."
  },
  {
    "id": "gue_56",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué telegrama secreto interceptado en 1917, en el que Alemania proponía a México aliarse contra Estados Unidos para recuperar Texas, aceleró la entrada de EE.UU. a la Primera Guerra Mundial?",
    "opciones": [
      "Telegrama Zimmermann",
      "Telegrama Ems",
      "Despacho de Berlín",
      "Pacto Ribbentrop-Mólotov"
    ],
    "respuestaCorrecta": "Telegrama Zimmermann",
    "explicacion": "Enviado por el ministro alemán Arthur Zimmermann y descifrado por la inteligencia británica, indignó a la opinión pública estadounidense."
  },
  {
    "id": "gue_57",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué tratado de paz firmado en 1904 entre Chile y Bolivia fijó de manera definitiva los límites entre ambos países y construyó el ferrocarril de Arica a La Paz?",
    "opciones": [
      "Tratado de Paz y Amistad de 1904",
      "Tratado de Ancón (1883)",
      "Tratado de Lima (1929)",
      "Pacto de Tregua de 1884"
    ],
    "respuestaCorrecta": "Tratado de Paz y Amistad de 1904",
    "explicacion": "El Tratado de Ancón (1883) y el de Lima (1929) fueron con Perú; el Tratado de 1904 selló la paz definitiva con Bolivia."
  },
  {
    "id": "gue_58",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué conflicto bélico de 1982 en el Atlántico Sur enfrentó a la República Argentina y al Reino Unido por la soberanía de un archipiélago austral?",
    "opciones": [
      "Guerra de las Malvinas (Falklands)",
      "Conflicto del Beagle",
      "Guerra del Chaco",
      "Guerra del Cenepa"
    ],
    "respuestaCorrecta": "Guerra de las Malvinas (Falklands)",
    "explicacion": "Se extendió durante 74 días entre el 2 de abril y el 14 de junio de 1982."
  },
  {
    "id": "gue_59",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Quién fue el papa cuya mediación en diciembre de 1978, a través del cardenal Antonio Samoré, evitó una guerra inminente entre Chile y Argentina por el Canal Beagle?",
    "opciones": [
      "Juan Pablo II",
      "Pablo VI",
      "Juan XXIII",
      "Benedicto XVI"
    ],
    "respuestaCorrecta": "Juan Pablo II",
    "explicacion": "La mediación papal de Juan Pablo II condujo finalmente a la firma del Tratado de Paz y Amistad de 1984."
  },
  {
    "id": "gue_60",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó la tregua espontánea ocurrida el 24 y 25 de diciembre de 1914 en la Primera Guerra Mundial, donde soldados alemanes y británicos salieron de las trincheras a cantar villancicos y jugar fútbol?",
    "opciones": [
      "La Tregua de Navidad",
      "La Paz de Invierno",
      "El Milagro de Flandes",
      "El Armisticio de Ypres"
    ],
    "respuestaCorrecta": "La Tregua de Navidad",
    "explicacion": "En el frente de Ypres (Bélgica), los soldados enemigos intercambiaron cigarrillos, chocolates y jugaron partidos de fútbol en la tierra de nadie."
  },
  {
    "id": "gue_61",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué batalla librada en enero de 1881 a las puertas de Lima permitió al ejército chileno al mando del general Manuel Baquedano entrar en la capital peruana?",
    "opciones": [
      "Batallas de Chorrillos y Miraflores",
      "Batalla de Dolores",
      "Batalla de Los Ángeles",
      "Combate de Pisagua"
    ],
    "respuestaCorrecta": "Batallas de Chorrillos y Miraflores",
    "explicacion": "Tras las victorias en las líneas defensivas de Chorrillos (13 de enero) y Miraflores (15 de enero), las tropas entraron a Lima el 17 de enero de 1881."
  },
  {
    "id": "gue_62",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué pacto de no agresión firmado en agosto de 1939 entre la Alemania nazi y la Unión Soviética incluía un protocolo secreto para repartirse Polonia?",
    "opciones": [
      "Pacto Ribbentrop-Mólotov",
      "Pacto de Acero",
      "Acuerdos de Múnich",
      "Pacto de Varsovia"
    ],
    "respuestaCorrecta": "Pacto Ribbentrop-Mólotov",
    "explicacion": "Firmado apenas nueve días antes del inicio de la Segunda Guerra Mundial, fue roto por Hitler en 1941 al invadir la URSS."
  },
  {
    "id": "gue_63",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué país asiático fue dividido y escenario de una larga guerra contra Estados Unidos entre 1955 y 1975, donde combatió la guerrilla del Viet Cong?",
    "opciones": [
      "Vietnam",
      "Camboya",
      "Tailandia",
      "Filipinas"
    ],
    "respuestaCorrecta": "Vietnam",
    "explicacion": "La Guerra de Vietnam finalizó en abril de 1975 con la caída de Saigón y la reunificación del país."
  },
  {
    "id": "gue_64",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué dos batallas de la Primera Guerra Mundial celebradas en 1916 en Francia (una de 10 meses y otra junto a un río) dejaron más de dos millones de bajas entre ambos bandos?",
    "opciones": [
      "Batalla de Verdún y Batalla del Somme",
      "Batalla de Marne y Batalla de Tannenberg",
      "Batalla de Galípoli y Batalla de Caporetto",
      "Batalla de Waterloo y Batalla de Austerlitz"
    ],
    "respuestaCorrecta": "Batalla de Verdún y Batalla del Somme",
    "explicacion": "Verdún y el Somme fueron las batallas de desgaste más sangrientas de la Gran Guerra en 1916."
  },
  {
    "id": "gue_65",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantinera y sargento chilena acompañó a las tropas en el desierto durante la Guerra del Pacífico atendiendo a los heridos y combatiendo fusil en mano en Tacna y Miraflores?",
    "opciones": [
      "Irene Morales (y Candelaria Pérez en 1839)",
      "Javiera Carrera",
      "Paula Jaraquemada",
      "Inés de Suárez"
    ],
    "respuestaCorrecta": "Irene Morales (y Candelaria Pérez en 1839)",
    "explicacion": "Irene Morales fue cantinera en la Guerra del Pacífico (1879-1884), mientras que la Sargento Candelaria Pérez fue heroína de la Guerra contra la Confederación Perú-Boliviana (1839)."
  },
  {
    "id": "gue_66",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba el líder de la Alemania nazi durante la Segunda Guerra Mundial?",
    "opciones": [
      "Adolf Hitler",
      "Benito Mussolini",
      "Joseph Goebbels",
      "Otto von Bismarck"
    ],
    "respuestaCorrecta": "Adolf Hitler",
    "explicacion": "Hitler instauró la dictadura totalitaria del Tercer Reich en 1933 hasta su suicidio en el búnker de Berlín en abril de 1945."
  },
  {
    "id": "gue_67",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué tratado firmado en 1919 puso fin oficialmente a la Primera Guerra Mundial e impuso severas sanciones e indemnizaciones a Alemania?",
    "opciones": [
      "Tratado de Versalles",
      "Tratado de París",
      "Tratado de Viena",
      "Tratado de Ginebra"
    ],
    "respuestaCorrecta": "Tratado de Versalles",
    "explicacion": "Firmado en la Galería de los Espejos del Palacio de Versalles el 28 de junio de 1919."
  },
  {
    "id": "gue_68",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué alianza militar defensiva del bloque occidental liderada por EE.UU. y Europa se creó en 1949 durante la Guerra Fría?",
    "opciones": [
      "OTAN (Organización del Tratado del Atlántico Norte)",
      "Pacto de Varsovia",
      "ONU",
      "Mercosur"
    ],
    "respuestaCorrecta": "OTAN (Organización del Tratado del Atlántico Norte)",
    "explicacion": "La OTAN se fundó en 1949; en respuesta, la Unión Soviética y sus aliados crearon el Pacto de Varsovia en 1955."
  },
  {
    "id": "gue_69",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿En qué batalla final del 10 de julio de 1883 en los Andes peruanos las fuerzas chilenas de Alejandro Gorostiaga vencieron a la resistencia de Andrés Avelino Cáceres, cerrando la Guerra del Pacífico?",
    "opciones": [
      "Batalla de Huamachuco",
      "Batalla de Tarapacá",
      "Combate de Sangra",
      "Batalla de Yungay"
    ],
    "respuestaCorrecta": "Batalla de Huamachuco",
    "explicacion": "La victoria en Huamachuco quebró la última resistencia de la Campaña de la Breña y dio paso a la firma del Tratado de Ancón en octubre de 1883."
  },
  {
    "id": "gue_70",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cuál fue la última gran contraofensiva alemana en el frente occidental en el gélido invierno de diciembre de 1944 en los bosques de Bélgica y Luxemburgo?",
    "opciones": [
      "Batalla de las Ardenas",
      "Batalla de Normandía",
      "Operación Market Garden",
      "Sitio de Bastogne"
    ],
    "respuestaCorrecta": "Batalla de las Ardenas",
    "explicacion": "Conocida en inglés como 'Battle of the Bulge', agotó las últimas reservas blindadas y aéreas de Alemania en el oeste."
  },
  {
    "id": "gue_71",
    "categoria": "guerras",
    "dificultad": "facil",
    "pregunta": "¿Qué arma blindada con orugas se utilizó por primera vez en la historia en combate durante la Primera Guerra Mundial (en 1916) para cruzar trincheras?",
    "opciones": [
      "El tanque de guerra",
      "La catapulta",
      "El helicóptero",
      "El misil nuclear"
    ],
    "respuestaCorrecta": "El tanque de guerra",
    "explicacion": "Los británicos los llamaron en secreto 'tanks' (tanques de agua) para engañar al espionaje enemigo antes de estrenarlos en la batalla del Somme."
  },
  {
    "id": "gue_72",
    "categoria": "guerras",
    "dificultad": "media",
    "pregunta": "¿Qué transatlántico de pasajeros británico fue hundido por un submarino alemán (U-Boot) en 1915, provocando la muerte de casi 1.200 civiles?",
    "opciones": [
      "RMS Lusitania",
      "RMS Titanic",
      "HMS Hood",
      "USS Maine"
    ],
    "respuestaCorrecta": "RMS Lusitania",
    "explicacion": "El hundimiento del Lusitania frente a las costas de Irlanda volcó a la opinión pública estadounidense en contra de Alemania."
  },
  {
    "id": "gue_73",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué oficial alemán con un parche en el ojo colocó el maletín con una bomba bajo la mesa de Hitler el 20 de julio de 1944 en el fallido intento de golpe de Estado?",
    "opciones": [
      "Claus von Stauffenberg (Operación Valkiria)",
      "Erwin Rommel",
      "Wilhelm Canaris",
      "Rudolf Hess"
    ],
    "respuestaCorrecta": "Claus von Stauffenberg (Operación Valkiria)",
    "explicacion": "El coronel Stauffenberg detonó la bomba en la 'Guarida del Lobo', pero la gruesa pata de madera de la mesa salvó la vida de Hitler."
  },
  {
    "id": "gue_74",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamó el conflicto bélico entre Chile y la Confederación Perú-Boliviana del mariscal Andrés de Santa Cruz (1836-1839), decidido en la Batalla de Yungay?",
    "opciones": [
      "Guerra contra la Confederación Perú-Boliviana",
      "Guerra del Pacífico",
      "Guerra Hispano-Sudamericana",
      "Pacificación de la Araucanía"
    ],
    "respuestaCorrecta": "Guerra contra la Confederación Perú-Boliviana",
    "explicacion": "El Ejército Unido Restaurador al mando del general Manuel Bulnes triunfó en Yungay el 20 de enero de 1839 (día del Roto Chileno)."
  },
  {
    "id": "gue_75",
    "categoria": "guerras",
    "dificultad": "dificil",
    "pregunta": "¿Qué potencia europea bombardeó el puerto de Valparaíso el 31 de marzo de 1866 durante la Guerra Hispano-Sudamericana?",
    "opciones": [
      "España",
      "Inglaterra",
      "Francia",
      "Holanda"
    ],
    "respuestaCorrecta": "España",
    "explicacion": "La escuadra española del almirante Casto Méndez Núñez bombardeó el puerto indefenso de Valparaíso, lo que motivó la posterior creación de fortificaciones costeras."
  },
  {
    "id": "far_16",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llama el famoso noticiero infantil chileno de títeres conducido por Tulio Triviño, Juan Carlos Bodoque y Juanín Juan Harry?",
    "opciones": [
      "31 Minutos",
      "Cachureos",
      "El Mundo del Profesor Rossa",
      "Pin Pon"
    ],
    "respuestaCorrecta": "31 Minutos",
    "explicacion": "Creado por Álvaro Díaz y Pedro Peirano en 2003, es un fenómeno cultural en Chile y México."
  },
  {
    "id": "far_17",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué legendario programa de televisión conducido por Don Francisco entró al Récord Guinness como el show de variedades más longevo de la historia (53 años al aire)?",
    "opciones": [
      "Sábado Gigante",
      "Martes 13",
      "Venga Conmigo",
      "Siempre Lunes"
    ],
    "respuestaCorrecta": "Sábado Gigante",
    "explicacion": "Comenzó en Canal 13 de Chile en 1962 como 'Sábados Gigantes' y se despidió en Univisión en 2015."
  },
  {
    "id": "far_18",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué trofeo reciben los artistas triunfadores en el Festival Internacional de la Canción de Viña del Mar por ovación del 'Monstruo'?",
    "opciones": [
      "La Gaviota (de Plata y de Oro)",
      "El Cóndor de Oro",
      "El Copihue de Oro",
      "El Pudú de Plata"
    ],
    "respuestaCorrecta": "La Gaviota (de Plata y de Oro)",
    "explicacion": "Diseñada originalmente en 1969, la Gaviota es el máximo galardón que entrega el público de la Quinta Vergara."
  },
  {
    "id": "far_19",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué ex Miss Universo chilena (ganadora de la corona mundial en 1987) es una de las figuras más famosas de la televisión nacional?",
    "opciones": [
      "Cecilia Bolocco",
      "Diana Bolocco",
      "Raquel Argandoña",
      "Tonka Tomicic"
    ],
    "respuestaCorrecta": "Cecilia Bolocco",
    "explicacion": "El 26 de mayo de 1987 en Singapur, Cecilia Bolocco se convirtió en la primera y única Miss Universo de Chile."
  },
  {
    "id": "far_20",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaba el querido animador del matinal 'Buenos Días a Todos', apodado 'El Halcón de Chicureo', fallecido en el accidente aéreo de Juan Fernández en 2011?",
    "opciones": [
      "Felipe Camiroaga",
      "Antonio Vodanovic",
      "Kike Morandé",
      "Rafael Araneda"
    ],
    "respuestaCorrecta": "Felipe Camiroaga",
    "explicacion": "Felipe Camiroaga creó además inolvidables personajes como Luciano Bello y el Washington."
  },
  {
    "id": "far_21",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿En qué programa infantil chileno de los años 80 y 90 conducido por Marcelo Hernández aparecían Epidemia, el Gato Juanito, el Conejo Wenceslao y el Señor Lápiz?",
    "opciones": [
      "Cachureos",
      "Pipiripao",
      "Zoolo TV",
      "Bkn"
    ],
    "respuestaCorrecta": "Cachureos",
    "explicacion": "Con canciones como 'Congelao' y 'La mosca', Cachureos marcó la infancia de millones de chilenos."
  },
  {
    "id": "far_22",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Cómo se llamaban los tres integrantes clásicos de 'El Mundo del Profesor Rossa'?",
    "opciones": [
      "Profesor Rossa, Guru-Guru y Don Carter",
      "Tulio, Bodoque y Patana",
      "Marcelo, Epidemia y Chanchoman",
      "Pin Pon, el Amigo Pepe y Tía Pucherito"
    ],
    "respuestaCorrecta": "Profesor Rossa, Guru-Guru y Don Carter",
    "explicacion": "Interpretados por Iván Arenas, Claudio Moreno (el pájaro Guru-Guru) y Juan Alcayaga (el cartero Don Carter)."
  },
  {
    "id": "far_23",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué programa juvenil vespertino de Mega conducido por José Miguel Viñuela entre 1997 y 2007 popularizó el 'baile del Koala' y lanzó a decenas de famosos?",
    "opciones": [
      "Mekano",
      "Yingo",
      "Rojo Fama Contrafama",
      "Calle 7"
    ],
    "respuestaCorrecta": "Mekano",
    "explicacion": "El 'Team Mekano', el grupo Axe Bahía y Porto Seguro marcaron la tarde televisiva de toda la década del 2000."
  },
  {
    "id": "far_24",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué programa de talentos de TVN conducido originalmente por Rafael Araneda descubrió a artistas como Mon Laferte, María José Quintanilla, Mario Guerrero y Christell?",
    "opciones": [
      "Rojo, Fama Contrafama",
      "Mekano",
      "Protagonistas de la Fama",
      "Mi Nombre Es"
    ],
    "respuestaCorrecta": "Rojo, Fama Contrafama",
    "explicacion": "Estrenado en 2002 con su lema 'El color del talento', enfrentaba a cantantes y bailarines en la famosa 'Capilla'."
  },
  {
    "id": "far_25",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué famoso niño chileno se volvió un meme y viral histórico al caer de un columpio de palo tras decir 'Me llamo Danilo y voy a hacer una cochiná' (o el 'Tarro' saltando en bicicleta)?",
    "opciones": [
      "El Tarro ('¡Se cayó el Tarro!')",
      "El Zafrada",
      "Chimuelo",
      "El Niño Poeta"
    ],
    "respuestaCorrecta": "El Tarro ('¡Se cayó el Tarro!')",
    "explicacion": "Grabado en Talca en 2014 con el relato de su amigo Eduardo ('¡Se prepara, va a saltar... cayó el Tarro!'), es uno de los virales más queridos de Chile."
  },
  {
    "id": "far_26",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Qué viral chileno protagonizado por un niño que intentaba enterrar solemnemente a su pequeña caturra muerta terminó con su perro llevándosela en el hocico?",
    "opciones": [
      "Adiós Chimuelo",
      "El Zafrada",
      "La Mojojojo",
      "Calmao nomás"
    ],
    "respuestaCorrecta": "Adiós Chimuelo",
    "explicacion": "Renato Barrera inmortalizó en 2019 el canto 'Ave María, Señor Jesús, lleva a Chimuelo al ataúd' antes de rescatar al ave de las fauces de su perrita."
  },
  {
    "id": "far_27",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿Quién fue el histórico animador del Festival de Viña del Mar durante 29 ediciones consecutivas (1976-2004), famoso por decir '¡Porque Viña tiene Festival!'?",
    "opciones": [
      "Antonio Vodanovic",
      "César Antonio Santis",
      "Sergio Lagos",
      "Martín Cárcamo"
    ],
    "respuestaCorrecta": "Antonio Vodanovic",
    "explicacion": "Antonio Vodanovic es el animador más emblemático en la historia de la Quinta Vergara."
  },
  {
    "id": "far_28",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Cuál fue el primer reality show de encierro producido en Chile, transmitido por Canal 13 en el verano de 2003 y ganado por Álvaro Ballero y Catalina Bono?",
    "opciones": [
      "Protagonistas de la Fama",
      "La Granja",
      "Mundos Opuestos",
      "1810"
    ],
    "respuestaCorrecta": "Protagonistas de la Fama",
    "explicacion": "Conducido por Sergio Lagos y con el tema 'La búsqueda' ('Todo puede cambiar...'), paralizó al país en 2003."
  },
  {
    "id": "far_29",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Con qué frase publicitaria se hizo famoso Álvaro Ballero tras salir de 'Protagonistas de la Fama' en un comercial de telefonía?",
    "opciones": [
      "'Yo amo a Ballero'",
      "'Cómprate un bosque y piérdete'",
      "'Tranquilo papá'",
      "'Cara de cuica'"
    ],
    "respuestaCorrecta": "'Yo amo a Ballero'",
    "explicacion": "El comercial de Entel PCS ironizaba con su fama repentina haciendo que todos gritaran '¡Yo amo a Ballero!'."
  },
  {
    "id": "far_30",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué niño de Iloca se hizo famoso y querido en todo Chile tras el terremoto y tsunami del 27F de 2010 al pedir 'zafradas' (frazadas) en una entrevista?",
    "opciones": [
      "Víctor Díaz ('El Zafrada')",
      "Jorge Rivas ('El Niño Poeta')",
      "Renato ('Chimuelo')",
      "Miguelito"
    ],
    "respuestaCorrecta": "Víctor Díaz ('El Zafrada')",
    "explicacion": "Años más tarde, Víctor Díaz incluso ganó el programa culinario 'El Discípulo del Chef'."
  },
  {
    "id": "far_31",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué famoso dúo humorístico chileno formado por Paul Vásquez ('El Flaco') y Mauricio Medina ('El Indio') triunfó en Viña 1996 con 'Mi mamá me los compró'?",
    "opciones": [
      "Dinamita Show",
      "Millenium Show",
      "Los Atletas de la Risa",
      "Pujillay"
    ],
    "respuestaCorrecta": "Dinamita Show",
    "explicacion": "Dinamita Show pasó del humor callejero en Viña del Mar a marcar récords históricos de sintonía en la Quinta Vergara."
  },
  {
    "id": "far_32",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué humorista chileno de traje y sombrero completamente blancos inmortalizó la frase 'Sospechosa la weá' y el chiste de los '5 kilos de... Master Plop'?",
    "opciones": [
      "Bombo Fica",
      "Coco Legrand",
      "Álvaro Salas",
      "Jorge Alís"
    ],
    "respuestaCorrecta": "Bombo Fica",
    "explicacion": "Daniel 'Bombo' Fica, oriundo de Purén, ha logrado algunos de los peaks de sintonía más altos en la historia del Festival de Viña."
  },
  {
    "id": "far_33",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué imitador chileno deslumbró por primera vez en el Festival de Viña del Mar 2008 realizando más de 30 imitaciones en una sola rutina?",
    "opciones": [
      "Stefan Kramer",
      "Fabrizio Copano",
      "Edo Caroe",
      "Felipe Avello"
    ],
    "respuestaCorrecta": "Stefan Kramer",
    "explicacion": "Su rutina en Viña 2008 marcó un antes y un después en la comedia televisiva chilena."
  },
  {
    "id": "far_34",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamaba la exitosa teleserie de Canal 13 (2003) sobre el patriarca Ángel Mercader (Héctor Noguera) y sus siete hijos varones en Viña del Mar?",
    "opciones": [
      "Machos",
      "Brujas",
      "Papi Ricky",
      "Tentación"
    ],
    "respuestaCorrecta": "Machos",
    "explicacion": "'Machos' (2003) fue un fenómeno televisivo en Chile y se vendió a decenas de países del mundo."
  },
  {
    "id": "far_35",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿En qué mítica teleserie de TVN (2001) el actor Álvaro Rudolphy interpretó a los gemelos idénticos 'Pelluco' Solís (garzón del Mercado Central) y Rodolfo Ruttenmeyer?",
    "opciones": [
      "Amores de Mercado",
      "La Fiera",
      "Sucupira",
      "Pampa Ilusión"
    ],
    "respuestaCorrecta": "Amores de Mercado",
    "explicacion": "'Amores de Mercado' ostenta el récord como la teleserie más vista en la historia del People Meter en Chile, con un capítulo final que superó los 60 puntos."
  },
  {
    "id": "far_36",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué personaje cómico de la teleserie 'Sucupira' (1996), interpretado por Mauricio Pesutic, era el encargado de cuidar el cementerio del pueblo y tenía tres 'hermanitas'?",
    "opciones": [
      "El Primo Renato",
      "Juan Burro",
      "Federico Valdivieso",
      "Diógenes"
    ],
    "respuestaCorrecta": "El Primo Renato",
    "explicacion": "Aunque Juan Burro (Pablo Schwarz) y su burro Luis Miguel y el alcalde Federico Valdivieso (Héctor Noguera) también eran íconos de Sucupira, el Primo Renato siempre decía '¡Mis hermanitas!'."
  },
  {
    "id": "far_37",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamaba el burro mascota de 'Juan Burro' (Pablo Schwarz) en la teleserie 'Sucupira'?",
    "opciones": [
      "Luis Miguel",
      "Chayanne",
      "Platero",
      "Rucio"
    ],
    "respuestaCorrecta": "Luis Miguel",
    "explicacion": "Juan del Burro andaba por las playas de Sucupira acompañado de su inseparable burro 'Luis Miguel'."
  },
  {
    "id": "far_38",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué grupo brasileño trajo a Chile a Flaviana, Jocineide, Francini, Bruno y Jefferson desatando la fiebre del baile 'Mueve la pompa' y 'Beso en la boca' en 2002?",
    "opciones": [
      "Axé Bahía",
      "Porto Seguro",
      "É o Tchan!",
      "Carrapicho"
    ],
    "respuestaCorrecta": "Axé Bahía",
    "explicacion": "Axé Bahía fue un fenómeno total en el programa Mekano y en el Festival de Viña del Mar 2002."
  },
  {
    "id": "far_39",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué periodista y comediante chileno, apodado 'El Pececillo', ganó las Gaviotas en Viña 2019 y 2024 con su humor interactivo y la frase '¡Están matando a un weón!'?",
    "opciones": [
      "Felipe Avello",
      "Pedro Ruminot",
      "Sergio Freire",
      "Rodrigo Salinas"
    ],
    "respuestaCorrecta": "Felipe Avello",
    "explicacion": "Felipe Avello brilló primero en SQP y Tierra 2 antes de llenar teatros en todo Chile con su stand-up familiar y absurdo."
  },
  {
    "id": "far_40",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿En qué programa de humor chileno nacieron los personajes de 'El Club de la Comedia' como 'El Buenos Días a Todos', 'El Hombre Ardilla', 'Fuerzas Especiales' ('¡Hola, soy el cabo...!') y 'El Dostor'?",
    "opciones": [
      "El Club de la Comedia (y antes SCA en Vía X)",
      "Morandé con Compañía",
      "Jappening con Ja",
      "Plan Z"
    ],
    "respuestaCorrecta": "El Club de la Comedia (y antes SCA en Vía X)",
    "explicacion": "Emitido por Chilevisión desde 2007 con Sergio Freire, Rodrigo Salinas, Patricio Pimienta, Natalia Valdebenito, Pedro Ruminot y Fabrizio Copano."
  },
  {
    "id": "far_41",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué legendario programa de humor chileno creado en 1978 tenía la sección 'La Oficina' con Espinita, Canitrot, el jefe Zañartu, la señorita Gertrudis y don Pío?",
    "opciones": [
      "Jappening con Ja",
      "Mediomundo",
      "De Chincol a Jote",
      "Viva el Lunes"
    ],
    "respuestaCorrecta": "Jappening con Ja",
    "explicacion": "Fundado por Jorge Pedreros, Fernando Alarcón y Eduardo Ravani junto a Gloria Benavides y Maitén Montenegro."
  },
  {
    "id": "far_42",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué estelar de conversación de Canal 13 en los años 90 era conducido por el trío compuesto por Cecilia Bolocco, Kike Morandé y Álvaro Salas?",
    "opciones": [
      "Viva el Lunes",
      "Vértigo",
      "Noche de Juegos",
      "De Pé a Pá"
    ],
    "respuestaCorrecta": "Viva el Lunes",
    "explicacion": "Dirigido por Gonzalo Bertrán, tuvo invitados internacionales desde Diego Maradona y Pelé hasta Cindy Crawford y Chayanne."
  },
  {
    "id": "far_43",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué actor de Hollywood protagonizó en los Oscars de 2022 un polémico momento en vivo al subir al escenario y darle una bofetada al comediante Chris Rock?",
    "opciones": [
      "Will Smith",
      "Johnny Depp",
      "Leonardo DiCaprio",
      "Brad Pitt"
    ],
    "respuestaCorrecta": "Will Smith",
    "explicacion": "Minutos después del incidente, Will Smith ganó el Óscar a Mejor Actor por su papel en 'King Richard'."
  },
  {
    "id": "far_44",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Con qué futbolista español estuvo casada Shakira durante más de una década, a quien le dedicó la famosa 'BZRP Music Sessions #53' ('Clara-mente... sal-pique')?",
    "opciones": [
      "Gerard Piqué",
      "Sergio Ramos",
      "Iker Casillas",
      "Cesc Fàbregas"
    ],
    "respuestaCorrecta": "Gerard Piqué",
    "explicacion": "La sesión #53 de Shakira con el productor argentino Bizarrap rompió 14 récords Guinness tras su estreno en enero de 2023."
  },
  {
    "id": "far_45",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué famoso reality chileno de época emitido por Canal 13 en 2009 tuvo en su final el recordado duelo entre Coca Mendoza y Angélica Sepúlveda ('La Fierecilla de Yungay')?",
    "opciones": [
      "1810",
      "La Granja VIP",
      "Pelotón",
      "Tierra Brava"
    ],
    "respuestaCorrecta": "1810",
    "explicacion": "Coca Mendoza se quedó con el triunfo en la gran final en vivo en Estación Mapocho / Barrancas."
  },
  {
    "id": "far_46",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿En qué reality de Canal 13 (2005) ocurrió la recordada final extrema donde Javier Estrada venció a Gonzalo Egas, y donde participó Arturo Longton?",
    "opciones": [
      "La Granja (y La Granja VIP)",
      "Protagonistas de la Música",
      "Amor Ciego",
      "Año 0"
    ],
    "respuestaCorrecta": "La Granja (y La Granja VIP)",
    "explicacion": "En 2005 Canal 13 emitió 'La Granja' (ganada por Gonzalo Egas) y inmediatamente después 'La Granja VIP' (ganada por el español Javier Estrada)."
  },
  {
    "id": "far_47",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Cómo se llamaba el dating show (reality de citas) de Canal 13 en 2008 donde un grupo de pretendientes liderados por Edmundo Varas ('¡Tranquilo papá!') competía por el amor de Carolina Bastías?",
    "opciones": [
      "Amor Ciego",
      "40 o 20",
      "Manos al Fuego",
      "Volverías con tu Ex"
    ],
    "respuestaCorrecta": "Amor Ciego",
    "explicacion": "Edmundo Varas ganó la final de 'Amor Ciego' tras cantarle 'Al otro lado del sol' a Cari."
  },
  {
    "id": "far_48",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué teleserie de TVN (1999) ambientada en Chiloé inmortalizó al personaje de 'El Chamorro', 'La Joyita' y a 'DJ Katia' diciendo '¡Chao pescao!'?",
    "opciones": [
      "La Fiera",
      "Iorana",
      "Oro Verde",
      "Aquelarre"
    ],
    "respuestaCorrecta": "La Fiera",
    "explicacion": "Grabada en Dalcahue (Chiloé) y protagonizada por Claudia Di Girolamo ('La Fiera'), Francisco Reyes y Luis Alarcón (Pedro Chamorro)."
  },
  {
    "id": "far_49",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿En qué teleserie de TVN (2000) ambientada en un campamento de gitanos en Mejillones brillaron los personajes de la gitana Jovanka, el cura Juan y Lazlo California ('¡Maldita lisiada / Por el chico no hay guagua!')?",
    "opciones": [
      "Romané",
      "El Circo de las Montini",
      "Pampa Ilusión",
      "Puertas Adentro"
    ],
    "respuestaCorrecta": "Romané",
    "explicacion": "'Romané' popularizó frases en romané ('¡Briza!', '¡Miéchica!') y al inolvidable personaje de Lazlo California (Alfredo Castro)."
  },
  {
    "id": "far_50",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿En qué teleserie de TVN (2002) ambientada en San Antonio aparecía la matriarca 'Olga Primera Montini', 'Olga Segunda', 'Olga Tercera' y el trapecista 'David'?",
    "opciones": [
      "El Circo de las Montini",
      "Los Pincheira",
      "Iorana",
      "Estúpido Cupido"
    ],
    "respuestaCorrecta": "El Circo de las Montini",
    "explicacion": "También inmortalizó el término 'Potoloco' (interpretado por Álvaro Morales y Claudia Di Girolamo)."
  },
  {
    "id": "far_51",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué teleserie de TVN (1995) ambientada en los años 60 tenía a la 'Hermana Angélica' (Claudia Di Girolamo) andando en motoneta Vespa y a Isabel Margarita (Carolina Fadic)?",
    "opciones": [
      "Estúpido Cupido",
      "Ámame",
      "Rojo y Miel",
      "Tic Tac"
    ],
    "respuestaCorrecta": "Estúpido Cupido",
    "explicacion": "Recordada por su banda sonora rockabilly de los años 60 y el personaje de Jaime (Álvaro Rudolphy)."
  },
  {
    "id": "far_52",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿En qué teleserie de TVN (1999) ocurría el fenómeno sobrenatural de un pueblo donde durante 30 años solo nacían mujeres y ni un solo varón?",
    "opciones": [
      "Aquelarre",
      "Santo Ladrón",
      "Borrón y Cuenta Nueva",
      "Loca Piel"
    ],
    "respuestaCorrecta": "Aquelarre",
    "explicacion": "Con personajes icónicos como el 'Toro Mardones' (Francisco Pérez-Bannen), 'Prudencio' (Mauricio Pesutic) y la 'Poncia' (Ximena Rivas)."
  },
  {
    "id": "far_53",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué famosa frase pronunció Raquel Argandoña en el jurado del Festival de Viña del Mar de 1981 provocando un escándalo nacional con el público de la galería?",
    "opciones": [
      "'Yo soy de la galería...'",
      "'Aquí hay puros picantes'",
      "'A mí no me pifian'",
      "'Yo vengo a cantar'"
    ],
    "respuestaCorrecta": "'Yo soy de la galería...'",
    "explicacion": "Al decir que ella pertenecía a la galería mientras lucía un vestido metálico de alta costura, despertó una de las pifiaderas más recordadas de la Quinta Vergara."
  },
  {
    "id": "far_54",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué cantante español protagonizó un recordado incidente en el Festival de Viña del Mar 2000 al lanzar la Gaviota de Plata hacia el público de la platea, hiriendo a una fanática?",
    "opciones": [
      "Enrique Iglesias",
      "Alejandro Sanz",
      "David Bisbal",
      "Miguel Bosé"
    ],
    "respuestaCorrecta": "Enrique Iglesias",
    "explicacion": "En Viña 2000, Enrique Iglesias arrojó la Gaviota de Plata con tanta fuerza que las puntas del trofeo lesionaron a una espectadora en primera fila."
  },
  {
    "id": "far_55",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué animadora infantil brasileña lloró en el escenario del Festival de Viña del Mar 2000 cuando el 'Monstruo' cambió la letra del coro de su canción 'Ilariê'?",
    "opciones": [
      "Xuxa",
      "Angélica",
      "Eliana",
      "Ivete Sangalo"
    ],
    "respuestaCorrecta": "Xuxa",
    "explicacion": "Años después se supo que todo fue una broma de mal gusto alentada desde la transmisión y el público respondió con una rima subida de tono."
  },
  {
    "id": "far_56",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué comediante y maestro del humor chileno creó obras teatrales como 'Con la camiseta puesta', 'Al diablo con todo' y el personaje del 'Lolo Palanca' y 'Cuesco Cabrera'?",
    "opciones": [
      "Coco Legrand",
      "Hermógenes Conache",
      "Carlos Helo",
      "Pepe Tapia"
    ],
    "respuestaCorrecta": "Coco Legrand",
    "explicacion": "Alejandro González Legrand ('Coco Legrand') es considerado el padre del stand-up comedy y del café concert en Chile."
  },
  {
    "id": "far_57",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamaba la mítica serie de televisión de Canal 13 de fines de los años 80 y 90 que retrataba la vida cotidiana de una familia chilena de clase media encabezada por Juan Herrera (Daniel Muñoz) y Ana López (Tamara Acosta)?",
    "opciones": [
      "Los 80",
      "Los Venegas",
      "Casado con Hijos",
      "Soltera Otra Vez"
    ],
    "respuestaCorrecta": "Los 80",
    "explicacion": "Emitida entre 2008 y 2014 por Canal 13, la historia de Juan, Ana, Claudia, Martín, Félix y Brunito es considerada la mejor serie dramática chilena."
  },
  {
    "id": "far_58",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamaba el mejor amigo de Félix Herrera en la serie 'Los 80'?",
    "opciones": [
      "Bruno Mora (Brunito)",
      "Exequiel Pacheco",
      "Don Genaro",
      "Petita"
    ],
    "respuestaCorrecta": "Bruno Mora (Brunito)",
    "explicacion": "Interpretado por Pablo Freire, Brunito con sus lentes y su noble amistad con Félix (Lucas Bolvarán) conquistó a todo Chile."
  },
  {
    "id": "far_59",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué serie familiar chilena emitida por TVN a la hora de almuerzo durante 22 años (1989-2011) estaba protagonizada por Guillermo Venegas (Jorge Gajardo), Silvia Maturana (Mónica Carrasco) y el 'Compadre Moncho'?",
    "opciones": [
      "Los Venegas",
      "Los 80",
      "La Colonia",
      "Vecinos al 3 y al 4"
    ],
    "respuestaCorrecta": "Los Venegas",
    "explicacion": "Adriano Castillo inmortalizó al 'Compadre Moncho', un ícono viviente de la cultura popular santiaguina."
  },
  {
    "id": "far_60",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿En qué serie chilena de Mega adaptada de 'Married... with Children' Fernando Larraín interpreta a un vendedor de zapatos llamado Tito Larraín casado con Quena Gómez (Javiera Contador)?",
    "opciones": [
      "Casado con Hijos",
      "La Nany",
      "Bkn",
      "Tres son Multitud"
    ],
    "respuestaCorrecta": "Casado con Hijos",
    "explicacion": "Junto a sus hijos Nacho (Fernando Godoy, creador del 'baile del limpiaparabrisas') y Titi (Dayana Amigo), más sus vecinos Marcia y Pablo."
  },
  {
    "id": "far_61",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llama el personaje de teleserie interpretado por Solange Lackington en 'Brujas' (Canal 13, 2005), madre de los hermanos Sa-Sa y famosa por decir '¡Chao con la pescá!' y '¡Qué clase de...!'?",
    "opciones": [
      "Martuca (Marta Salinas)",
      "La Joyita",
      "Olga Primera",
      "Beatriz"
    ],
    "respuestaCorrecta": "Martuca (Marta Salinas)",
    "explicacion": "'Brujas' (2005) popularizó a la familia Sa-Sa (Sánchez Salinas), a Dante (Jorge Zabaleta) y a las cinco 'Ángeles'."
  },
  {
    "id": "far_62",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué canción del 'Ranking Top' de 31 Minutos es interpretada por el personaje 'Lolo' y consiste únicamente en repetir dos sílabas con una guitarra distorsionada?",
    "opciones": [
      "Lala",
      "Severlá",
      "Mi muñeca me habló",
      "Bailan sin cesar"
    ],
    "respuestaCorrecta": "Lala",
    "explicacion": "Compuesta por el personaje Lolo (con voz de Pedro Peirano), la letra de la canción dice literalmente solo 'Lala'."
  },
  {
    "id": "far_63",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué personaje del Ranking Top de 31 Minutos canta 'Diente blanco, no te vayas'?",
    "opciones": [
      "John Quijada",
      "Freddy Turbina",
      "César",
      "Chascoberto"
    ],
    "respuestaCorrecta": "John Quijada",
    "explicacion": "Freddy Turbina canta 'Mi equilibrio espiritual', César canta 'Bailan sin cesar' y John Quijada canta 'Diente blanco, no te vayas'."
  },
  {
    "id": "far_64",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué niño chileno de La Pintana se volvió viral en 2016 por su forma ilustrada y formal de hablar sobre literatura y decir 'Bueno, era para no decir que estaba leyendo...'?",
    "opciones": [
      "El Niño Poeta (Jorge Rivas)",
      "El Zafrada",
      "El Tarro",
      "Tomiii 11"
    ],
    "respuestaCorrecta": "El Niño Poeta (Jorge Rivas)",
    "explicacion": "Su entrevista en televisión hablando de Nicanor Parra y de su gata se transformó en uno de los videos más virales de la década en Chile."
  },
  {
    "id": "far_65",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué pequeño youtuber chileno cumplió en 2021 su sueño de superar los 10 millones de suscriptores (Botón de Diamante) gracias a la unión solidaria de todo Internet?",
    "opciones": [
      "Tomiii 11 (Tomás Blanch)",
      "Germán Garmendia",
      "Fabio Torres",
      "Pollo Castillo"
    ],
    "respuestaCorrecta": "Tomiii 11 (Tomás Blanch)",
    "explicacion": "La campaña mundial para apoyar a Tomiii 11 movilizó a millones de personas y comunidades gamer en todo el mundo."
  },
  {
    "id": "far_66",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Cuál es el nombre del canal original de YouTube con el que el chileno Germán Garmendia se convirtió en el primer youtuber de habla hispana en superar los 40 millones de suscriptores?",
    "opciones": [
      "HolaSoyGerman (y JuegaGerman)",
      "ElRubiusOMG",
      "Fernanfloo",
      "Wismichu"
    ],
    "respuestaCorrecta": "HolaSoyGerman (y JuegaGerman)",
    "explicacion": "Con sus videos semanales como 'Los hermanos' y 'Las apuestas' cerrando con '¡Un abrazo psicológico!', Germán obtuvo dos Botones de Diamante."
  },
  {
    "id": "far_67",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué programa juvenil de vanguardia y humor absurdo del desaparecido Canal 2 Rock & Pop (años 90) fue creado por Peirano, Díaz, Rafael Gumucio, Ángel Carcavilla y Marco Silva?",
    "opciones": [
      "Plan Z (y Gato por Liebre)",
      "Plaza Italia",
      "CQC Chile",
      "Maldita Sea"
    ],
    "respuestaCorrecta": "Plan Z (y Gato por Liebre)",
    "explicacion": "'Plan Z' es considerado un programa de culto absoluto del humor negro e irreverente en la televisión chilena."
  },
  {
    "id": "far_68",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué programa de culto de Canal 2 Rock & Pop de fines de los años 90 era conducido por el 'Pera' Cuadra y Juan Andrés Salfate comentando cine B, anime, videojuegos y conspiraciones?",
    "opciones": [
      "Maldita Sea",
      "Invasión",
      "Bakania",
      "Extra Jóvenes"
    ],
    "respuestaCorrecta": "Maldita Sea",
    "explicacion": "En 'Maldita Sea', Salfate y el Pera presentaban películas de culto con una botella de bebida en la mesa."
  },
  {
    "id": "far_69",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Cómo se llamaba el mítico concurso de 'Sábado Gigante' donde los participantes que cantaban desafinados eran eliminados por el toque de trompeta de un personaje enmascarado?",
    "opciones": [
      "El Chacal de la Trompeta",
      "El Muro de la Fama",
      "Solteras sin Compromiso",
      "Los Eguiguren"
    ],
    "respuestaCorrecta": "El Chacal de la Trompeta",
    "explicacion": "'¡Y... fuera!' decía Don Francisco cuando el Chacal hacía sonar su trompeta."
  },
  {
    "id": "far_70",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿En qué programa de Chilevisión estrenado en 2003 bajo el lema 'La televisión duele' nacieron las notas del 'Periodismo incisivo' con Nicolás Larraín, Felipe Bianchi y Fernando Lasalvia?",
    "opciones": [
      "Caiga Quien Caiga (CQC Chile)",
      "Primer Plano",
      "SQP",
      "Intrusos"
    ],
    "respuestaCorrecta": "Caiga Quien Caiga (CQC Chile)",
    "explicacion": "Con sus trajes negros y lentes oscuros, CQC marcó la pauta política y de espectáculo de los años 2000 en Chile."
  },
  {
    "id": "far_71",
    "categoria": "farandula",
    "dificultad": "facil",
    "pregunta": "¿En qué programa de viajes de Canal 13 el animador Pancho Saavedra recorre rincones de Chile probando cazuelas y riendo con su característica carcajada?",
    "opciones": [
      "Lugares que Hablan",
      "Socios por el Mundo",
      "Recomiendo Chile",
      "Frutos del País"
    ],
    "respuestaCorrecta": "Lugares que Hablan",
    "explicacion": "'Lugares que Hablan' convirtió a Francisco Saavedra y al 'Catador' en favoritos del público chileno."
  },
  {
    "id": "far_72",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué programa de investigación de Canal 13 conducido por Emilio Sutherland ('El Tío Emilio') desenmascaraba a estafadores con cámaras ocultas?",
    "opciones": [
      "En su Propia Trampa",
      "Contacto",
      "Informe Especial",
      "Mea Culpa"
    ],
    "respuestaCorrecta": "En su Propia Trampa",
    "explicacion": "De este programa surgieron frases virales en Chile como '¡Me tienen envidia!' y '¡Te pillamos po compadre!'."
  },
  {
    "id": "far_73",
    "categoria": "farandula",
    "dificultad": "media",
    "pregunta": "¿Qué clásico programa de recreaciones policiales de TVN conducido por Carlos Pinto entre humo y gabardina reconstruía crímenes reales ocurridos en Chile?",
    "opciones": [
      "Mea Culpa",
      "El Día Menos Pensado",
      "Enigma",
      "Brigada Escorpión"
    ],
    "respuestaCorrecta": "Mea Culpa",
    "explicacion": "'Nada hacía presagiar...' es la frase más asociada al estilo narrativo de Carlos Pinto en 'Mea Culpa' y 'El Día Menos Pensado'."
  },
  {
    "id": "far_74",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué famosa frase decía una entrevistada en Talca en un viral chileno al explicar por qué se peleaba con sus vecinos: '¡Porque somos elegantes y...!'?",
    "opciones": [
      "'¡Nos tienen envidia!' (La Mojojojo / Las Calilas y las Maiga)",
      "'¡Hágase famoso!'",
      "'¡Un manjarsh!'",
      "'¡Índole!'"
    ],
    "respuestaCorrecta": "'¡Nos tienen envidia!' (La Mojojojo / Las Calilas y las Maiga)",
    "explicacion": "Del mítico reportaje policial en Talca donde nombraba a 'la Careputa, la Mojojojo y la Maiga' salieron decenas de audios virales en Chile."
  },
  {
    "id": "far_75",
    "categoria": "farandula",
    "dificultad": "dificil",
    "pregunta": "¿Qué recordado caballero del campo chileno se volvió un ícono viral tomando vino en garrafa y exclamando con satisfacción '¡Un manjarsh!'?",
    "opciones": [
      "Don Juan ('Un manjarsh')",
      "El Chuña",
      "El Poeta de la Cumbia",
      "Don Carter"
    ],
    "respuestaCorrecta": "Don Juan ('Un manjarsh')",
    "explicacion": "Su frase '¡Un manjarsh!' al probar un vaso de vino se transformó en expresión cotidiana en todo Chile."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRIVIA_GENERAL_QUESTIONS };
}
