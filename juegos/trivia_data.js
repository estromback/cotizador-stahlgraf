/**
 * BASE DE DATOS DE TRIVIA GENERAL - TRIVIÓDROMO: LA PISTA DEL SABER
 * © 2026 Stahlgraf Games. Todos los derechos reservados.
 * Base de datos enriquecida con 321 preguntas de trivia y contenido visual.
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
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRIVIA_GENERAL_QUESTIONS };
}
