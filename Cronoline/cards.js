/**
 * BASE DE DATOS DE CARTAS - CRONOLINE (300 CARTAS)
 * 
 * Estructura de cada objeto:
 * - id: Número único identificador.
 * - titulo: Nombre corto del evento.
 * - descripcion_corta: Breve explicación del suceso histórico.
 * - año: Año en que ocurrió (número entero positivo para d.C.).
 * - categoria: 'chile' | 'universal' | 'ciencia' | 'arte'
 * - dificultad: 'facil' | 'media' | 'dificil'
 */

const CATEGORIES = {
  chile: {
    name: "Historia de Chile",
    icon: "🇨🇱",
    color: "#e11d48",
    glow: "rgba(225, 29, 72, 0.4)"
  },
  universal: {
    name: "Historia Universal",
    icon: "🌍",
    color: "#2563eb",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  ciencia: {
    name: "Ciencia e Inventos",
    icon: "💡",
    color: "#059669",
    glow: "rgba(5, 150, 105, 0.4)"
  },
  arte: {
    name: "Arte y Literatura",
    icon: "🎨",
    color: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.4)"
  }
};

const INITIAL_CARDS = [
  // ==================== HISTORIA UNIVERSAL (75 CARTAS) ====================
  // FÁCILES (25)
  { id: 1, titulo: "Descubrimiento de América", descripcion_corta: "Cristóbal Colón llega a las costas del continente americano (Guanahani).", año: 1492, categoria: "universal", dificultad: "facil" },
  { id: 2, titulo: "Revolución Francesa", descripcion_corta: "La Toma de la Bastilla marca el inicio del colapso de la monarquía absolutista.", año: 1789, categoria: "universal", dificultad: "facil" },
  { id: 3, titulo: "Hundimiento del Titanic", descripcion_corta: "El transatlántico británico choca contra un iceberg en el norte del Atlántico.", año: 1912, categoria: "universal", dificultad: "facil" },
  { id: 4, titulo: "Inicio de la Primera Guerra Mundial", descripcion_corta: "El asesinato del archiduque Francisco Fernando en Sarajevo detona la Gran Guerra.", año: 1914, categoria: "universal", dificultad: "facil" },
  { id: 5, titulo: "Inicio de la Segunda Guerra Mundial", descripcion_corta: "La Alemania nazi invade Polonia, desatando el conflicto bélico global.", año: 1939, categoria: "universal", dificultad: "facil" },
  { id: 6, titulo: "Caída del Muro de Berlín", descripcion_corta: "La demolición del muro simboliza el colapso del bloque soviético y la unificación alemana.", año: 1989, categoria: "universal", dificultad: "facil" },
  { id: 7, titulo: "Atentado a las Torres Gemelas", descripcion_corta: "Miembros de Al Qaeda destruyen el World Trade Center en Nueva York.", año: 2001, categoria: "universal", dificultad: "facil" },
  { id: 8, titulo: "Caída del Imperio Romano de Occidente", descripcion_corta: "El último emperador romano Rómulo Augústulo es depuesto, iniciando la Edad Media.", año: 476, categoria: "universal", dificultad: "facil" },
  { id: 9, titulo: "Independencia de los Estados Unidos", descripcion_corta: "Las trece colonias declaran formalmente su separación de la corona británica.", año: 1776, categoria: "universal", dificultad: "facil" },
  { id: 10, titulo: "Lanzamiento de las bombas atómicas", descripcion_corta: "Estados Unidos bombardea Hiroshima y Nagasaki, provocando el fin de la 2ª Guerra Mundial.", año: 1945, categoria: "universal", dificultad: "facil" },
  { id: 11, titulo: "Tragedia nuclear de Chernóbil", descripcion_corta: "Explota un reactor de la planta nuclear en Ucrania, el peor accidente civil nuclear.", año: 1986, categoria: "universal", dificultad: "facil" },
  { id: 12, titulo: "Coronación de Carlomagno", descripcion_corta: "El papa León III corona al rey de los francos como Emperador del Imperio Romano Germánico.", año: 800, categoria: "universal", dificultad: "facil" },
  { id: 13, titulo: "Disolución de la Unión Soviética", descripcion_corta: "Mijaíl Gorbachov renuncia y la bandera soviética es arriada en el Kremlin, marcando el fin de la URSS.", año: 1991, categoria: "universal", dificultad: "facil" },
  { id: 14, titulo: "Fin del Apartheid en Sudáfrica", descripcion_corta: "Nelson Mandela asume como presidente en las primeras elecciones democráticas multirraciales.", año: 1994, categoria: "universal", dificultad: "facil" },
  { id: 15, titulo: "Llegada de la Peste Negra a Europa", descripcion_corta: "La plaga de peste bubónica diezma a casi la mitad de la población europea.", año: 1347, categoria: "universal", dificultad: "facil" },
  { id: 16, titulo: "Toma de Constantinopla", descripcion_corta: "El Imperio Otomano conquista la capital bizantina, marcando el fin de la Edad Media.", año: 1453, categoria: "universal", dificultad: "facil" },
  { id: 17, titulo: "Revolución Rusa", descripcion_corta: "Los bolcheviques liderados por Lenin derrocan al gobierno provisional en la Revolución de Octubre.", año: 1917, categoria: "universal", dificultad: "facil" },
  { id: 18, titulo: "Coronación de Napoleón Bonaparte", descripcion_corta: "Napoleón se corona a sí mismo como Emperador de los franceses en Notre Dame.", año: 1804, categoria: "universal", dificultad: "facil" },
  { id: 19, titulo: "Guerra de los Seis Días", descripcion_corta: "Conflicto bélico en Medio Oriente entre Israel y una coalición árabe.", año: 1967, categoria: "universal", dificultad: "facil" },
  { id: 20, titulo: "Lanzamiento del Euro como moneda física", descripcion_corta: "El euro entra en circulación física en 12 países miembros de la Unión Europea.", año: 2002, categoria: "universal", dificultad: "facil" },
  { id: 21, titulo: "Crisis de los Misiles en Cuba", descripcion_corta: "Momento de máxima tensión de la Guerra Fría por la presencia de misiles soviéticos en Cuba.", año: 1962, categoria: "universal", dificultad: "facil" },
  { id: 22, titulo: "Ascenso de Hitler al Poder", descripcion_corta: "Adolf Hitler es nombrado Canciller de Alemania, disolviendo la República de Weimar.", año: 1933, categoria: "universal", dificultad: "facil" },
  { id: 23, titulo: "Fundación de las Naciones Unidas", descripcion_corta: "51 países firman la Carta de la ONU al término de la Segunda Guerra Mundial.", año: 1945, categoria: "universal", dificultad: "facil" },
  { id: 24, titulo: "Creación del Estado de Israel", descripcion_corta: "Se declara formalmente la independencia del nuevo Estado judío al expirar el mandato británico.", año: 1948, categoria: "universal", dificultad: "facil" },
  { id: 25, titulo: "Ejecución del Rey Luis XVI", descripcion_corta: "El monarca francés es ejecutado en la guillotina tras ser acusado de traición por la Convención.", año: 1793, categoria: "universal", dificultad: "facil" },

  // MEDIAS (25)
  { id: 26, titulo: "Batalla de Waterloo", descripcion_corta: "Napoleón es derrotado definitivamente por las tropas aliadas británicas y prusianas.", año: 1815, categoria: "universal", dificultad: "media" },
  { id: 27, titulo: "Firma de la Carta Magna", descripcion_corta: "El rey Juan I de Inglaterra firma la carta que limita por primera vez los poderes reales.", año: 1215, categoria: "universal", dificultad: "media" },
  { id: 28, titulo: "Tratado de Tordesillas", descripcion_corta: "España y Portugal dividen la exploración del Nuevo Mundo mediante una línea imaginaria.", año: 1494, categoria: "universal", dificultad: "media" },
  { id: 29, titulo: "Reforma Protestante", descripcion_corta: "Martín Lutero publica sus 95 tesis en la puerta de la iglesia de Wittenberg.", año: 1517, categoria: "universal", dificultad: "media" },
  { id: 30, titulo: "Paz de Westfalia", descripcion_corta: "Se firma la paz que pone fin a la Guerra de los Treinta Años en Europa.", año: 1648, categoria: "universal", dificultad: "media" },
  { id: 31, titulo: "Inicio de la Guerra de Secesión de EE.UU.", descripcion_corta: "Conflicto armado entre los estados del norte (Unión) y los del sur (Confederación).", año: 1861, categoria: "universal", dificultad: "media" },
  { id: 32, titulo: "Construcción del Muro de Berlín", descripcion_corta: "La RDA socialista comienza a levantar el muro para detener la fuga de sus ciudadanos al oeste.", año: 1961, categoria: "universal", dificultad: "media" },
  { id: 33, titulo: "Fundación de la Cruz Roja", descripcion_corta: "Henry Dunant promueve la creación de un organismo neutral para atender a los heridos de guerra.", año: 1863, categoria: "universal", dificultad: "media" },
  { id: 34, titulo: "Cisma de Oriente", descripcion_corta: "Mutua excomunión que consuma la división definitiva entre las iglesias Católica y Ortodoxa.", año: 1054, categoria: "universal", dificultad: "media" },
  { id: 35, titulo: "Congreso de Viena", descripcion_corta: "Las potencias europeas se reúnen para rediseñar el mapa político tras la derrota de Napoleón.", año: 1815, categoria: "universal", dificultad: "media" },
  { id: 36, titulo: "Unificación de Italia", descripcion_corta: "Se proclama el Reino de Italia bajo el reinado de Víctor Manuel II.", año: 1861, categoria: "universal", dificultad: "media" },
  { id: 37, titulo: "Unificación de Alemania", descripcion_corta: "Se funda el Imperio Alemán (Segundo Reich) tras la guerra franco-prusiana.", año: 1871, categoria: "universal", dificultad: "media" },
  { id: 38, titulo: "Primera Cruzada (Toma de Jerusalén)", descripcion_corta: "Los caballeros cristianos capturan la Ciudad Santa, estableciendo los Estados Cruzados.", año: 1099, categoria: "universal", dificultad: "media" },
  { id: 39, titulo: "Marcha sobre Roma de Mussolini", descripcion_corta: "Los camisas negras avanzan hacia la capital italiana, instalando el fascismo en el poder.", año: 1922, categoria: "universal", dificultad: "media" },
  { id: 40, titulo: "Crisis del Canal de Suez", descripcion_corta: "Conflicto diplomático y militar tras la nacionalización del canal por el presidente egipcio Nasser.", año: 1956, categoria: "universal", dificultad: "media" },
  { id: 41, titulo: "Revolución Islámica en Irán", descripcion_corta: "El sah de Irán es derrocado y el ayatolá Jomeini proclama la República Islámica.", año: 1979, categoria: "universal", dificultad: "media" },
  { id: 42, titulo: "Fundación de San Petersburgo", descripcion_corta: "El zar Pedro el Grande funda la nueva capital del Imperio Ruso a orillas del mar Báltico.", año: 1703, categoria: "universal", dificultad: "media" },
  { id: 43, titulo: "Batalla de Hastings", descripcion_corta: "Los normandos liderados por Guillermo el Conquistador invaden y dominan Inglaterra.", año: 1066, categoria: "universal", dificultad: "media" },
  { id: 44, titulo: "Tratado de Utrecht", descripcion_corta: "Acuerdos que ponen fin a la Guerra de Sucesión Española, consolidando el dominio británico.", año: 1713, categoria: "universal", dificultad: "media" },
  { id: 45, titulo: "Batalla de Trafalgar", descripcion_corta: "La armada británica derrota a la flota combinada franco-española liderada por Villeneuve.", año: 1805, categoria: "universal", dificultad: "media" },
  { id: 46, titulo: "Tratado de Brest-Litovsk", descripcion_corta: "Rusia firma la paz por separado con los Imperios Centrales, saliendo de la 1ª Guerra Mundial.", año: 1918, categoria: "universal", dificultad: "media" },
  { id: 47, titulo: "Inicio de la Guerra Civil Española", descripcion_corta: "Un sector del ejército sublevado contra la Segunda República da inicio al conflicto armado.", año: 1936, categoria: "universal", dificultad: "media" },
  { id: 48, titulo: "Toma de Granada por los Reyes Católicos", descripcion_corta: "Rendición de Boabdil, poniendo fin a la Reconquista en la península ibérica.", año: 1492, categoria: "universal", dificultad: "media" },
  { id: 49, titulo: "Fundación de Nueva Ámsterdam (Nueva York)", descripcion_corta: "Colonos holandeses compran la isla de Manhattan a nativos americanos.", año: 1626, categoria: "universal", dificultad: "media" },
  { id: 50, titulo: "Batalla de Lepanto", descripcion_corta: "La Liga Santa cristiana detiene la expansión marítima otomana en el golfo de Patras.", año: 1571, categoria: "universal", dificultad: "media" },

  // DIFÍCILES (25)
  { id: 51, titulo: "Coronación de Otón I el Grande", descripcion_corta: "Otón I es coronado Emperador, fundando formalmente el Sacro Imperio Romano Germánico.", año: 962, categoria: "universal", dificultad: "dificil" },
  { id: 52, titulo: "Fundación de la dinastía Abasí", descripcion_corta: "La dinastía Abasí toma el control del califato islámico, trasladando la capital a Bagdad.", año: 750, categoria: "universal", dificultad: "dificil" },
  { id: 53, titulo: "Cisma de Occidente", descripcion_corta: "Periodo en que la Iglesia Católica tiene dos y hasta tres papas rivales simultáneamente.", año: 1378, categoria: "universal", dificultad: "dificil" },
  { id: 54, titulo: "Guerra de los Treinta Años", descripcion_corta: "La defenestración de Praga desencadena el devastador conflicto político-religioso en Europa.", año: 1618, categoria: "universal", dificultad: "dificil" },
  { id: 55, titulo: "Batalla de Poitiers", descripcion_corta: "Las tropas francas de Carlos Martel frenan el avance de las fuerzas del califato omeya.", año: 732, categoria: "universal", dificultad: "dificil" },
  { id: 56, titulo: "Inicio de la Guerra de los Cien Años", descripcion_corta: "Conflicto feudal y dinástico entre las casas reales de Inglaterra y Francia.", año: 1337, categoria: "universal", dificultad: "dificil" },
  { id: 57, titulo: "Firma del Tratado de Verdún", descripcion_corta: "Los nietos de Carlomagno dividen el Imperio Carolingio en tres partes principales.", año: 843, categoria: "universal", dificultad: "dificil" },
  { id: 58, titulo: "Inicio de la Dinastía Ming", descripcion_corta: "Zhu Yuanzhang expulsa a los mongoles de la dinastía Yuan y asume el trono en China.", año: 1368, categoria: "universal", dificultad: "dificil" },
  { id: 59, titulo: "Expulsión de los judíos de España", descripcion_corta: "Los Reyes Católicos firman el Decreto de la Alhambra ordenando el destierro hebreo.", año: 1492, categoria: "universal", dificultad: "dificil" },
  { id: 60, titulo: "Revuelta de los Bóxers en China", descripcion_corta: "Movimiento nacionalista en China contra la influencia comercial y política extranjera.", año: 1899, categoria: "universal", dificultad: "dificil" },
  { id: 61, titulo: "Inicio de la Guerra del Peloponeso", descripcion_corta: "Atenas y Esparta inician su prolongada guerra por la hegemonía griega (431 a.C., representado d.C.).", año: 431, "comentario": "Año adaptado a escala positiva por simplicidad de orden.", categoria: "universal", dificultad: "dificil" },
  { id: 62, titulo: "Coronación de Justiniano I", descripcion_corta: "El soberano inicia su reinado en el Imperio Bizantino redactando el Corpus Juris Civilis.", año: 527, categoria: "universal", dificultad: "dificil" },
  { id: 63, titulo: "Inicio de las Guerras Médicas", descripcion_corta: "Los griegos repelen la primera invasión del Imperio Persa de Darío I (490 a.C., representado d.C.).", año: 490, categoria: "universal", dificultad: "dificil" },
  { id: 64, titulo: "Firma del Tratado de Portsmouth", descripcion_corta: "Se firma el tratado de paz negociado por Roosevelt que pone fin a la guerra ruso-japonesa.", año: 1905, categoria: "universal", dificultad: "dificil" },
  { id: 65, titulo: "Inicio de la Era Meiji", descripcion_corta: "El Emperador Mutsuhito asume el poder en Japón, iniciando la modernización e industrialización.", año: 1868, categoria: "universal", dificultad: "dificil" },
  { id: 66, titulo: "Coronación de Iván el Terrible", descripcion_corta: "Iván IV de Moscovia es coronado como el primer zar de todas las Rusias.", año: 1547, categoria: "universal", dificultad: "dificil" },
  { id: 67, titulo: "Paz de Nystad", descripcion_corta: "Tratado que pone fin a la Gran Guerra del Norte, consagrando a Rusia como potencia báltica.", año: 1721, categoria: "universal", dificultad: "dificil" },
  { id: 68, titulo: "Batalla de Mohács", descripcion_corta: "El sultán Solimán el Magnífico derrota a los húngaros, expandiendo el dominio otomano.", año: 1526, categoria: "universal", dificultad: "dificil" },
  { id: 69, titulo: "Concilio de Trento", descripcion_corta: "Se convoca el concilio ecuménico que define las bases de la Contrarreforma católica.", año: 1545, categoria: "universal", dificultad: "dificil" },
  { id: 70, titulo: "Guerra de Sucesión Austriaca", descripcion_corta: "Conflicto europeo tras la ascensión de María Teresa I al trono de los Habsburgo.", año: 1740, categoria: "universal", dificultad: "dificil" },
  { id: 71, titulo: "Batalla de Austerlitz", descripcion_corta: "Napoleón Bonaparte aplasta a las fuerzas coaligadas del Imperio Ruso e Imperio Austriaco.", año: 1805, categoria: "universal", dificultad: "dificil" },
  { id: 72, titulo: "Guerra Ruso-Turca", descripcion_corta: "Conflicto que reconfiguró los Balcanes con la independencia de Bulgaria, Serbia y Rumania.", año: 1877, categoria: "universal", dificultad: "dificil" },
  { id: 73, titulo: "Inicio de la Guerra de Sucesión Española", descripcion_corta: "Conflicto tras la muerte sin descendencia del último rey Habsburgo español, Carlos II.", año: 1701, categoria: "universal", dificultad: "dificil" },
  { id: 74, titulo: "Conferencia de Berlín", descripcion_corta: "Las potencias imperialistas se reúnen para repartirse el continente africano.", año: 1884, categoria: "universal", dificultad: "dificil" },
  { id: 75, titulo: "Ejecución de Juana de Arco", descripcion_corta: "La heroína francesa es quemada en la hoguera tras un juicio inquisitorial por herejía.", año: 1431, categoria: "universal", dificultad: "dificil" },


  // ==================== HISTORIA DE CHILE (75 CARTAS) ====================
  // FÁCILES (25)
  { id: 76, titulo: "Primera Junta Nacional de Gobierno", descripcion_corta: "Los criollos convocan a cabildo abierto, iniciando la autonomía política.", año: 1810, categoria: "chile", dificultad: "facil" },
  { id: 77, titulo: "Proclamación de la Independencia", descripcion_corta: "Bernardo O'Higgins firma el acta de Independencia formal de la República en Talca.", año: 1818, categoria: "chile", dificultad: "facil" },
  { id: 78, titulo: "Gran Terremoto de Valdivia", descripcion_corta: "El sismo más destructivo e intenso registrado instrumentalmente en la historia humana.", año: 1960, categoria: "chile", dificultad: "facil" },
  { id: 79, titulo: "Rescate de los 33 mineros", descripcion_corta: "Los mineros atrapados a 700 metros en la mina San José son izados con vida.", año: 2010, categoria: "chile", dificultad: "facil" },
  { id: 80, titulo: "Golpe de Estado en Chile", descripcion_corta: "Fuerzas Armadas bombardean La Moneda, instalando una junta militar.", año: 1973, categoria: "chile", dificultad: "facil" },
  { id: 81, titulo: "Plebiscito del Sí y el No", descripcion_corta: "Chile vota de forma masiva la no continuidad de Pinochet, iniciando la transición democrática.", año: 1988, categoria: "chile", dificultad: "facil" },
  { id: 82, titulo: "Fundación de Santiago de Nueva Extremadura", descripcion_corta: "Pedro de Valdivia funda la actual capital junto al río Mapocho.", año: 1541, categoria: "chile", dificultad: "facil" },
  { id: 83, titulo: "Combate Naval de Iquique", descripcion_corta: "El capitán Arturo Prat fallece en la cubierta del monitor peruano Huáscar.", año: 1879, categoria: "chile", dificultad: "facil" },
  { id: 84, titulo: "Retorno a la Democracia", descripcion_corta: "Patricio Aylwin asume como Presidente de la República tras la dictadura militar.", año: 1990, categoria: "chile", dificultad: "facil" },
  { id: 85, titulo: "Terremoto y Maremoto 27F", descripcion_corta: "Un terremoto de magnitud 8.8 sacude el centro-sur del país seguido por un tsunami.", año: 2010, categoria: "chile", dificultad: "facil" },
  { id: 86, titulo: "Abdicación de Bernardo O'Higgins", descripcion_corta: "El Director Supremo renuncia ante el Cabildo de Santiago para evitar una guerra civil.", año: 1823, categoria: "chile", dificultad: "facil" },
  { id: 87, titulo: "Primera mujer presidenta de Chile", descripcion_corta: "Michelle Bachelet Jeria asume su primer mandato constitucional.", año: 2006, categoria: "chile", dificultad: "facil" },
  { id: 88, titulo: "Inauguración del Metro de Santiago", descripcion_corta: "El tren subterráneo realiza su viaje inaugural en la Línea 1, de San Pablo a La Moneda.", año: 1975, categoria: "chile", dificultad: "facil" },
  { id: 89, titulo: "Ley de Voto Femenino Presidencial", descripcion_corta: "El presidente Gabriel González Videla promulga la ley que otorga el voto pleno a la mujer.", año: 1949, categoria: "chile", dificultad: "facil" },
  { id: 90, titulo: "Nacionalización del Cobre", descripcion_corta: "El Congreso Nacional aprueba por unanimidad la estatización de la gran minería del cobre.", año: 1971, categoria: "chile", dificultad: "facil" },
  { id: 91, titulo: "Visita del Papa Juan Pablo II", descripcion_corta: "El sumo pontífice realiza una histórica y masiva visita pastoral en pleno régimen militar.", año: 1987, categoria: "chile", dificultad: "facil" },
  { id: 92, titulo: "Batalla de Maipú", descripcion_corta: "El general San Martín derrota al ejército realista, consolidando la independencia de Chile.", año: 1818, categoria: "chile", dificultad: "facil" },
  { id: 93, titulo: "Incorporación de Rapa Nui a Chile", descripcion_corta: "El capitán Policarpo Toro firma el acuerdo de voluntades con los jefes de la Isla de Pascua.", año: 1888, categoria: "chile", dificultad: "facil" },
  { id: 94, titulo: "Estreno de la primera película chilena", descripcion_corta: "Se proyecta el documental mudo 'Un paseo a Playa Ancha' en Valparaíso.", año: 1903, categoria: "chile", dificultad: "facil" },
  { id: 95, titulo: "Inauguración de la Torre Costanera", descripcion_corta: "Se abre el rascacielos Gran Torre Santiago, el edificio más alto de Sudamérica.", año: 2012, categoria: "chile", dificultad: "facil" },
  { id: 96, titulo: "Batalla de Chacabuco", descripcion_corta: "El Ejército Libertador de los Andes derrota al gobernador realista Casimiro Marcó del Pont.", año: 1817, categoria: "chile", dificultad: "facil" },
  { id: 97, titulo: "Fundación de Valparaíso", descripcion_corta: "Juan de Saavedra arriba a la bahía de Quintil, fundando el histórico puerto.", año: 1536, categoria: "chile", dificultad: "facil" },
  { id: 98, titulo: "Desastre de Rancagua", descripcion_corta: "Las fuerzas de Bernardo O'Higgins son rodeadas y derrotadas, iniciando la Reconquista española.", año: 1814, categoria: "chile", dificultad: "facil" },
  { id: 99, titulo: "Creación de Carabineros de Chile", descripcion_corta: "Carlos Ibáñez del Campo unifica los cuerpos policiales y de gendarmería del país.", año: 1927, categoria: "chile", dificultad: "facil" },
  { id: 100, titulo: "Aprobación del Matrimonio Igualitario", descripcion_corta: "Se promulga la ley que permite el matrimonio civil entre personas del mismo sexo.", año: 2021, categoria: "chile", dificultad: "facil" },

  // MEDIAS (25)
  { id: 101, titulo: "Fundación de la Universidad de Chile", descripcion_corta: "Bajo la dirección de Andrés Bello se crea la sucesora de la Real Universidad de San Felipe.", año: 1842, categoria: "chile", dificultad: "media" },
  { id: 102, titulo: "Promulgación de la Constitución Presidencialista (Alessandri)", descripcion_corta: "La nueva carta fundamental presidencialista reemplaza al régimen parlamentario.", año: 1925, categoria: "chile", dificultad: "media" },
  { id: 103, titulo: "Promulgación de la Constitución de la Dictadura Militar", descripcion_corta: "Se promulga la constitución diseñada bajo la dictadura militar tras plebiscito.", año: 1980, categoria: "chile", dificultad: "media" },
  { id: 104, titulo: "Promulgación de la Constitución Conservadora (Portales)", descripcion_corta: "Se establece el orden autoritario conservador ideado por Diego Portales.", año: 1833, categoria: "chile", dificultad: "media" },
  { id: 105, titulo: "Matanza de la Escuela Santa María", descripcion_corta: "El ejército abre fuego contra los obreros del salitre en huelga general en Iquique.", año: 1907, categoria: "chile", dificultad: "media" },
  { id: 106, titulo: "Fundación de Concepción", descripcion_corta: "Pedro de Valdivia funda la villa en el sitio original del puerto de Penco.", año: 1550, categoria: "chile", dificultad: "media" },
  { id: 107, titulo: "Fundación de La Serena", descripcion_corta: "Juan Bohón funda la segunda ciudad más antigua del territorio chileno.", año: 1544, categoria: "chile", dificultad: "media" },
  { id: 108, titulo: "Fundación de Valdivia", descripcion_corta: "Pedro de Valdivia funda la ciudad en el sur para consolidar el control hispano.", año: 1552, categoria: "chile", dificultad: "media" },
  { id: 109, titulo: "Inauguración del Ferrocarril Copiapó-Caldera", descripcion_corta: "Primer ferrocarril de Chile y uno de los primeros en Sudamérica, impulsado por Wheelwright.", año: 1851, categoria: "chile", dificultad: "media" },
  { id: 110, titulo: "Inauguración del Viaducto del Malleco", descripcion_corta: "Obra maestra de ingeniería vial en acero, puente ferroviario en La Araucanía.", año: 1890, categoria: "chile", dificultad: "media" },
  { id: 111, titulo: "Creación de la CORFO", descripcion_corta: "Corporación de Fomento para industrializar el país tras el terremoto de Chillán.", año: 1939, categoria: "chile", dificultad: "media" },
  { id: 112, titulo: "El Gran Terremoto de Chillán (Aguirre Cerda)", descripcion_corta: "El terremoto con mayor número de fallecidos confirmados en la historia nacional.", año: 1939, categoria: "chile", dificultad: "media" },
  { id: 113, titulo: "Guerra Civil Presidencialista contra Parlamentaristas", descripcion_corta: "El congreso y la armada se sublevan contra el presidente Balmaceda, quien termina suicidándose.", año: 1891, categoria: "chile", dificultad: "media" },
  { id: 114, titulo: "Promulgación del Código Civil", descripcion_corta: "Redactado por Andrés Bello, entra en vigencia y define la propiedad y las personas.", año: 1855, categoria: "chile", dificultad: "media" },
  { id: 115, titulo: "Creación de la Fuerza Aérea (FACh)", descripcion_corta: "Arturo Merino Benítez funda la fuerza aérea nacional como rama independiente.", año: 1930, categoria: "chile", dificultad: "media" },
  { id: 116, titulo: "Nacionalización de la Universidad Técnica del Estado", descripcion_corta: "Se unifican las escuelas politécnicas y mineras en una sola universidad estatal (UTE).", año: 1947, categoria: "chile", dificultad: "media" },
  { id: 117, titulo: "Toma de posesión del Estrecho de Magallanes", descripcion_corta: "La goleta Ancud toma posesión soberana del estrecho construyendo el Fuerte Bulnes.", año: 1843, categoria: "chile", dificultad: "media" },
  { id: 118, titulo: "Fundación de la Universidad de Concepción", descripcion_corta: "Se crea la primera universidad privada del sur de Chile por iniciativa local.", año: 1919, categoria: "chile", dificultad: "media" },
  { id: 119, titulo: "Incendio de la Iglesia de la Compañía", descripcion_corta: "Más de 2000 personas mueren asfixiadas en el peor incendio urbano de la capital.", año: 1863, categoria: "chile", dificultad: "media" },
  { id: 120, titulo: "Ley de Instrucción Primaria Obligatoria", descripcion_corta: "Se promulga la ley que garantiza la educación primaria obligatoria y gratuita.", año: 1920, categoria: "chile", dificultad: "media" },
  { id: 121, titulo: "Firma del Tratado de Paz con Bolivia", descripcion_corta: "Se sella la paz y los límites definitivos tras la Guerra del Pacífico.", año: 1904, categoria: "chile", dificultad: "media" },
  { id: 122, titulo: "Tratado de Lima con Perú", descripcion_corta: "Tratado que resuelve la soberanía de Tacna (Perú) y Arica (Chile).", año: 1929, categoria: "chile", dificultad: "media" },
  { id: 123, titulo: "Combate de La Concepción", descripcion_corta: "Setenta y siete soldados chilenos resisten hasta la muerte contra fuerzas peruanas.", año: 1882, categoria: "chile", dificultad: "media" },
  { id: 124, titulo: "Fundación del Banco Estado", descripcion_corta: "Se fusionan cajas de ahorro público creándose el principal banco comercial del Estado.", año: 1953, categoria: "chile", dificultad: "media" },
  { id: 125, titulo: "Creación de la Región de Los Ríos", descripcion_corta: "Se promulga la ley que divide la provincia de Valdivia de la Región de Los Lagos.", año: 2007, categoria: "chile", dificultad: "media" },

  // DIFÍCILES (25)
  { id: 126, titulo: "Batalla de Lircay", descripcion_corta: "Tropas de Joaquín Prieto derrotan a Ramón Freire, iniciando la República Conservadora.", año: 1830, categoria: "chile", dificultad: "dificil" },
  { id: 127, titulo: "Combate de Papudo", descripcion_corta: "La corbeta Esmeralda captura a la goleta española Covadonga en la guerra contra España.", año: 1865, categoria: "chile", dificultad: "dificil" },
  { id: 128, titulo: "Bombardeo de Valparaíso", descripcion_corta: "La escuadra española bombardea la ciudad puerto desarmada durante tres horas.", año: 1866, categoria: "chile", dificultad: "dificil" },
  { id: 129, titulo: "Batalla de Yungay", descripcion_corta: "Las tropas chilenas de Bulnes derrotan al protector Andrés de Santa Cruz, disolviendo la Confederación.", año: 1839, categoria: "chile", dificultad: "dificil" },
  { id: 130, titulo: "Revolución Civil contra el Presidente Manuel Montt", descripcion_corta: "Sublevación contra el electo Manuel Montt que termina en la batalla de Loncomilla.", año: 1851, categoria: "chile", dificultad: "dificil" },
  { id: 131, titulo: "Revolución Constituyente (Guerra de Atacama)", descripcion_corta: "Sublevación liberal del norte de Chile (Atacama) en contra del gobierno conservador.", año: 1859, categoria: "chile", dificultad: "dificil" },
  { id: 132, titulo: "Terremoto Magno de Santiago", descripcion_corta: "El sismo destruye la capital colonial y da origen a la leyenda del Cristo de Mayo.", año: 1647, categoria: "chile", dificultad: "dificil" },
  { id: 133, titulo: "Inauguración de Cerro Tololo", descripcion_corta: "Comienza a operar el primer observatorio científico internacional en el Valle del Elqui.", año: 1967, categoria: "chile", dificultad: "dificil" },
  { id: 134, titulo: "Inauguración de la Central Rapel", descripcion_corta: "Primera gran central hidroeléctrica de embalse del país, en la región de O'Higgins.", año: 1968, categoria: "chile", dificultad: "dificil" },
  { id: 135, titulo: "Creación de FONASA", descripcion_corta: "Fondo Nacional de Salud, creado para centralizar la recaudación médica previsional.", año: 1979, categoria: "chile", dificultad: "dificil" },
  { id: 136, titulo: "Tratado de Paz con Argentina", descripcion_corta: "Se firma bajo mediación del Papa el tratado de paz por el diferendo austral del Beagle.", año: 1984, categoria: "chile", dificultad: "dificil" },
  { id: 137, titulo: "Ingreso de Chile a la APEC", descripcion_corta: "Chile es aceptado formalmente en el foro de cooperación económica de Asia-Pacífico.", año: 1994, categoria: "chile", dificultad: "dificil" },
  { id: 138, titulo: "Entrada en vigencia del TLC con EE.UU.", descripcion_corta: "Comienza a regir el acuerdo comercial bilateral, eliminando la mayoría de aranceles.", año: 2004, categoria: "chile", dificultad: "dificil" },
  { id: 139, titulo: "Creación del Ministerio de Cultura", descripcion_corta: "Se promulga la ley que crea el Ministerio de las Culturas, las Artes y el Patrimonio.", año: 2018, categoria: "chile", dificultad: "dificil" },
  { id: 140, titulo: "Batalla de Rancagua (Sitio de Rancagua)", descripcion_corta: "Se concreta el cerco militar de Bernardo O'Higgins en la plaza central de la ciudad.", año: 1814, categoria: "chile", dificultad: "dificil" },
  { id: 141, titulo: "Creación del primer Parque Nacional", descripcion_corta: "Se declara la reserva forestal de Malleco (Parque Nacional Benjamín Vicuña Mackenna).", año: 1907, categoria: "chile", dificultad: "dificil" },
  { id: 142, titulo: "Inicio de la Guerra contra la Confederación", descripcion_corta: "El ministro Diego Portales declara la guerra por la disputa de hegemonía portuaria en el Pacífico.", año: 1836, categoria: "chile", dificultad: "dificil" },
  { id: 143, titulo: "Asesinato de Diego Portales", descripcion_corta: "El ministro es fusilado por oficiales sublevados en los cerros de Valparaíso (Barón).", año: 1837, categoria: "chile", dificultad: "dificil" },
  { id: 144, titulo: "Primer Censo Nacional Oficial", descripcion_corta: "La Oficina de Estadística efectúa el primer empadronamiento general de la población.", año: 1835, categoria: "chile", dificultad: "dificil" },
  { id: 145, titulo: "Fundación de la Academia de Pintura", descripcion_corta: "Dirigida por el artista italiano Alejandro Ciccarelli, impulsando las bellas artes en el país.", año: 1849, categoria: "chile", dificultad: "dificil" },
  { id: 146, titulo: "Establecimiento del Estanco del Tabaco", descripcion_corta: "Se entrega el monopolio de licores, naipes y té a la firma Portales, Cea y Cía.", año: 1824, categoria: "chile", dificultad: "dificil" },
  { id: 147, titulo: "Creación de la Escuadra Nacional", descripcion_corta: "Zarpa desde Valparaíso la primera flota naval de Chile bajo el mando de Blanco Encalada.", año: 1818, categoria: "chile", dificultad: "dificil" },
  { id: 148, titulo: "Descubrimiento del yacimiento de Chañarcillo", descripcion_corta: "Juan Godoy descubre el rico mineral de plata en la región de Atacama.", año: 1832, categoria: "chile", dificultad: "dificil" },
  { id: 149, titulo: "Terremoto de Chillán y Concepción (Darwin)", descripcion_corta: "Destruye completamente la ciudad de Concepción y Chillán, presenciado por Charles Darwin.", año: 1835, categoria: "chile", dificultad: "dificil" },
  { id: 150, titulo: "Firma del Tratado de Límites con Bolivia", descripcion_corta: "Chile y Bolivia firman el primer tratado que fija la frontera en el paralelo 24 latitud sur.", año: 1866, categoria: "chile", dificultad: "dificil" },


  // ==================== CIENCIA Y TECNOLOGÍA (75 CARTAS) ====================
  // FÁCILES (25)
  { id: 151, titulo: "Llegada del Ser Humano a la Luna", descripcion_corta: "La tripulación del Apolo 11 realiza el primer alunizaje y caminata espacial en suelo lunar.", año: 1969, categoria: "ciencia", dificultad: "facil" },
  { id: 152, titulo: "Lanzamiento del Sputnik 1", descripcion_corta: "La Unión Soviética pone en órbita el primer satélite artificial, abriendo la era espacial.", año: 1957, categoria: "ciencia", dificultad: "facil" },
  { id: 153, titulo: "Invención de la Imprenta", descripcion_corta: "Johannes Gutenberg perfecciona la prensa de tipos móviles de metal en Europa.", año: 1440, categoria: "ciencia", dificultad: "facil" },
  { id: 154, titulo: "Descubrimiento de la Penicilina", descripcion_corta: "Alexander Fleming descubre el primer antibiótico de uso masivo tras notar moho en placas.", año: 1928, categoria: "ciencia", dificultad: "facil" },
  { id: 155, titulo: "Invención del Teléfono", descripcion_corta: "Alexander Graham Bell patenta el primer dispositivo eléctrico de comunicación oral a distancia.", año: 1876, categoria: "ciencia", dificultad: "facil" },
  { id: 156, titulo: "Invención de la Bombilla", descripcion_corta: "Thomas Alva Edison patenta la bombilla eléctrica de filamento de carbono comercializable.", año: 1879, categoria: "ciencia", dificultad: "facil" },
  { id: 157, titulo: "Máquina de Vapor de James Watt", descripcion_corta: "Watt patenta su versión mejorada con condensador separado, detonando la Revolución Industrial.", año: 1769, categoria: "ciencia", dificultad: "facil" },
  { id: 158, titulo: "Descubrimiento del ADN de Doble Hélice", descripcion_corta: "Watson, Crick y Franklin determinan la estructura molecular tridimensional de la vida.", año: 1953, categoria: "ciencia", dificultad: "facil" },
  { id: 159, titulo: "Invención del Automóvil Moderno", descripcion_corta: "Karl Benz patenta el primer vehículo autopropulsado por un motor de combustión interna.", año: 1886, categoria: "ciencia", dificultad: "facil" },
  { id: 160, titulo: "Primer Vuelo en Avión Controlado", descripcion_corta: "Los hermanos Wright realizan vuelos propulsados a motor en Kitty Hawk.", año: 1903, categoria: "ciencia", dificultad: "facil" },
  { id: 161, titulo: "Lanzamiento del iPhone", descripcion_corta: "Steve Jobs presenta el teléfono inteligente que popularizó las pantallas táctiles multipunto.", año: 2007, categoria: "ciencia", dificultad: "facil" },
  { id: 162, titulo: "Primer viaje espacial tripulado", descripcion_corta: "El cosmonauta soviético Yuri Gagarin completa una órbita terrestre a bordo de la nave Vostok 1.", año: 1961, categoria: "ciencia", dificultad: "facil" },
  { id: 163, titulo: "Clonación de la Oveja Dolly", descripcion_corta: "Primer mamífero clonado a partir de una célula adulta en el Instituto Roslin.", año: 1996, categoria: "ciencia", dificultad: "facil" },
  { id: 164, titulo: "Creación del World Wide Web (WWW)", descripcion_corta: "Tim Berners-Lee propone la arquitectura de hipertexto para la transferencia de información global.", año: 1889, "comentario": "Propuesto formalmente en 1989.", año: 1989, categoria: "ciencia", dificultad: "facil" },
  { id: 165, titulo: "Lanzamiento de Wikipedia", descripcion_corta: "Jimmy Wales y Larry Sanger lanzan el proyecto de enciclopedia libre editable.", año: 2001, categoria: "ciencia", dificultad: "facil" },
  { id: 166, titulo: "Lanzamiento del Telescopio Hubble", descripcion_corta: "El transbordador Discovery pone en órbita el observatorio astronómico espacial pionero.", año: 1990, categoria: "ciencia", dificultad: "facil" },
  { id: 167, titulo: "Secuenciación completa del Genoma Humano", descripcion_corta: "El consorcio internacional anuncia el mapa completo de los genes humanos.", año: 2003, categoria: "ciencia", dificultad: "facil" },
  { id: 168, titulo: "Invención del Cinematógrafo", descripcion_corta: "Los hermanos Lumière patentan el proyector y cámara, efectuando la primera función de cine.", año: 1895, categoria: "ciencia", dificultad: "facil" },
  { id: 169, titulo: "Lanzamiento de la sonda Voyager 1", descripcion_corta: "La sonda espacial de la NASA emprende su viaje hacia el espacio exterior y exterior interestelar.", año: 1977, categoria: "ciencia", dificultad: "facil" },
  { id: 170, titulo: "Invención de la Vacuna contra la Rabia", descripcion_corta: "Louis Pasteur aplica con éxito su vacuna de virus atenuado en el niño Joseph Meister.", año: 1885, categoria: "ciencia", dificultad: "facil" },
  { id: 171, titulo: "Descubrimiento de la Ley de Gravedad", descripcion_corta: "Isaac Newton formula la gravitación universal y las leyes de movimiento en los 'Principia'.", año: 1687, categoria: "ciencia", dificultad: "facil" },
  { id: 172, titulo: "Publicación de la Teoría de la Relatividad General", descripcion_corta: "Albert Einstein postula que la gravedad es la curvatura del espacio-tiempo.", año: 1915, categoria: "ciencia", dificultad: "facil" },
  { id: 173, titulo: "Descubrimiento de la Radioactividad", descripcion_corta: "Henri Becquerel descubre la emisión espontánea de radiación en las sales de uranio.", año: 1896, categoria: "ciencia", dificultad: "facil" },
  { id: 174, titulo: "Invención de la Vacuna contra la Viruela", descripcion_corta: "Edward Jenner inmuniza a un niño inoculándole virus de la viruela de las vacas.", año: 1796, categoria: "ciencia", dificultad: "facil" },
  { id: 175, titulo: "Lanzamiento de la red ARPANET", descripcion_corta: "Se envía el primer mensaje por red de computadoras entre UCLA y Stanford, origen del Internet.", año: 1969, categoria: "ciencia", dificultad: "facil" },

  // MEDIAS (25)
  { id: 176, titulo: "Teoría de la Relatividad Especial", descripcion_corta: "Albert Einstein establece la equivalencia masa-energía y la velocidad constante de la luz.", año: 1905, categoria: "ciencia", dificultad: "media" },
  { id: 177, titulo: "Descubrimiento de los Rayos X", descripcion_corta: "Wilhelm Röntgen descubre una radiación invisible capaz de atravesar cuerpos opacos.", año: 1895, categoria: "ciencia", dificultad: "media" },
  { id: 178, titulo: "Invención de la Dinamita", descripcion_corta: "Alfred Nobel patenta la dinamita, estabilizando la nitroglicerina con tierra de diatomeas.", año: 1867, categoria: "ciencia", dificultad: "media" },
  { id: 179, titulo: "Primer Trasplante de Corazón Humano", descripcion_corta: "Christian Barnard lidera la histórica cirugía cardíaca en Ciudad del Cabo.", año: 1967, categoria: "ciencia", dificultad: "media" },
  { id: 180, titulo: "Descubrimiento de las Leyes de Herencia", descripcion_corta: "Gregor Mendel publica sus experimentos de hibridación en guisantes, naciendo la genética.", año: 1866, categoria: "ciencia", dificultad: "media" },
  { id: 181, titulo: "Formulación de la Tabla Periódica", descripcion_corta: "Dmitri Mendeléyev organiza los elementos químicos según su masa atómica.", año: 1869, categoria: "ciencia", dificultad: "media" },
  { id: 182, titulo: "Invención del Transistor", descripcion_corta: "Bardeen, Brattain y Shockley demuestran el primer amplificador semiconductor en Bell Labs.", año: 1947, categoria: "ciencia", dificultad: "media" },
  { id: 183, titulo: "Invención del Telégrafo Eléctrico", descripcion_corta: "Samuel Morse patenta el telégrafo e introduce el código que lleva su nombre.", año: 1837, categoria: "ciencia", dificultad: "media" },
  { id: 184, titulo: "Invención del Microprocesador", descripcion_corta: "Intel lanza el modelo 4004, integrando toda la CPU de una computadora en un chip.", año: 1971, categoria: "ciencia", dificultad: "media" },
  { id: 185, titulo: "Descubrimiento del Planeta Neptuno", descripcion_corta: "Galle observa el planeta en Berlín basándose en cálculos matemáticos de Le Verrier.", año: 1846, categoria: "ciencia", dificultad: "media" },
  { id: 186, titulo: "Descubrimiento del Planeta Urano", descripcion_corta: "William Herschel identifica el planeta usando un telescopio fabricado por él mismo.", año: 1781, categoria: "ciencia", dificultad: "media" },
  { id: 187, titulo: "Invención de la Pila Voltaica", descripcion_corta: "Alessandro Volta construye la primera batería capaz de producir corriente continua.", año: 1800, categoria: "ciencia", dificultad: "media" },
  { id: 188, titulo: "Teoría de la Deriva Continental", descripcion_corta: "Alfred Wegener propone la teoría de Pangea y la deriva continental.", año: 1912, categoria: "ciencia", dificultad: "media" },
  { id: 189, titulo: "Invención del Radar", descripcion_corta: "Robert Watson-Watt patenta el sistema de detección por ondas de radio.", año: 1935, categoria: "ciencia", dificultad: "media" },
  { id: 190, titulo: "Invención de la Computadora ENIAC", descripcion_corta: "Se presenta la primera computadora digital programable de propósito general basada en tubos.", año: 1946, categoria: "ciencia", dificultad: "media" },
  { id: 191, titulo: "Descubrimiento del Oxígeno", descripcion_corta: "Joseph Priestley y Carl Wilhelm Scheele aíslan de forma independiente el oxígeno gaseoso.", año: 1774, categoria: "ciencia", dificultad: "media" },
  { id: 192, titulo: "Teoría de la Evolución de las Especies", descripcion_corta: "Charles Darwin publica 'El origen de las especies por medio de la selección natural'.", año: 1859, categoria: "ciencia", dificultad: "media" },
  { id: 193, titulo: "Descubrimiento del electrón", descripcion_corta: "J.J. Thomson identifica la primera partícula subatómica elemental mediante rayos catódicos.", año: 1897, categoria: "ciencia", dificultad: "media" },
  { id: 194, titulo: "Descubrimiento de los Grupos Sanguíneos", descripcion_corta: "Karl Landsteiner descubre los tipos de sangre A, B y O, haciendo seguras las transfusiones.", año: 1900, categoria: "ciencia", dificultad: "media" },
  { id: 195, titulo: "Descubrimiento del Bosón de Higgs", descripcion_corta: "Científicos del Gran Colisionador de Hadrones (CERN) confirman la existencia del bosón.", año: 2012, categoria: "ciencia", dificultad: "media" },
  { id: 196, titulo: "Invención de la Fotografía (Daguerrotipo)", descripcion_corta: "Louis Daguerre presenta el primer procedimiento fotográfico comercial.", año: 1839, categoria: "ciencia", dificultad: "media" },
  { id: 197, titulo: "Formulación de las Leyes de Kepler", descripcion_corta: "Johannes Kepler publica las dos primeras leyes de las órbitas elípticas de los planetas.", año: 1609, categoria: "ciencia", dificultad: "media" },
  { id: 198, titulo: "Invención del Telescopio Refractor", descripcion_corta: "Galileo Galilei construye su telescopio y realiza las primeras observaciones lunares y de Júpiter.", año: 1609, categoria: "ciencia", dificultad: "media" },
  { id: 199, titulo: "Invención de la Máquina de Escribir", descripcion_corta: "Sholes, Glidden y Soule patentan la primera máquina práctica y comercializada.", año: 1868, categoria: "ciencia", dificultad: "media" },
  { id: 200, titulo: "Lanzamiento del Telescopio James Webb", descripcion_corta: "El telescopio infrarrojo es lanzado al espacio profundo para estudiar las galaxias.", año: 2021, categoria: "ciencia", dificultad: "media" },

  // DIFÍCILES (25)
  { id: 201, titulo: "Publicación de la teoría heliocéntrica", descripcion_corta: "Nicolás Copérnico publica 'De revolutionibus orbium coelestium', postulando el Sol en el centro.", año: 1543, categoria: "ciencia", dificultad: "dificil" },
  { id: 202, titulo: "Descubrimiento de la circulación de la sangre", descripcion_corta: "William Harvey publica su modelo sobre el funcionamiento del corazón y arterias.", año: 1628, categoria: "ciencia", dificultad: "dificil" },
  { id: 203, titulo: "Descubrimiento de las bacterias", descripcion_corta: "Anton van Leeuwenhoek observa microorganismos en muestras de agua usando microscopios domésticos.", año: 1676, categoria: "ciencia", dificultad: "dificil" },
  { id: 204, titulo: "Invención del Termómetro de Mercurio", descripcion_corta: "Daniel Gabriel Fahrenheit diseña el termómetro fiable y crea la escala de temperatura homónima.", año: 1714, categoria: "ciencia", dificultad: "dificil" },
  { id: 205, titulo: "Invención del Pararrayos", descripcion_corta: "Benjamin Franklin realiza experimentos con cometas en tormentas y patenta el invento.", año: 1752, categoria: "ciencia", dificultad: "dificil" },
  { id: 206, titulo: "Invención del Microscopio Compuesto", descripcion_corta: "Zacharias Janssen y su padre fabrican un cilindro óptico precursor del microscopio moderno.", año: 1590, categoria: "ciencia", dificultad: "dificil" },
  { id: 207, titulo: "Descubrimiento de las Células", descripcion_corta: "Robert Hooke describe cavidades en el corcho que asemejan celdas, acuñando el término celular.", año: 1665, categoria: "ciencia", dificultad: "dificil" },
  { id: 208, titulo: "Descubrimiento del neutrón", descripcion_corta: "James Chadwick demuestra la existencia del neutrón en el núcleo de los átomos.", año: 1932, categoria: "ciencia", dificultad: "dificil" },
  { id: 209, titulo: "Invención del Marcapasos Implantable", descripcion_corta: "Rune Elmqvist y Senning implantan el primer marcapasos interno permanente en Suecia.", año: 1958, categoria: "ciencia", dificultad: "dificil" },
  { id: 210, titulo: "Invención del Telescopio Reflector", descripcion_corta: "Isaac Newton inventa el telescopio newtoniano de espejos para eliminar la aberración cromática.", año: 1668, categoria: "ciencia", dificultad: "dificil" },
  { id: 211, titulo: "Primer Vuelo en Globo Aerostático", descripcion_corta: "Los hermanos Montgolfier realizan el primer vuelo tripulado por humanos en París.", año: 1783, categoria: "ciencia", dificultad: "dificil" },
  { id: 212, titulo: "Invención del Submarino Militar", descripcion_corta: "David Bushnell diseña el 'Turtle', primer sumergible autopropulsado militar.", año: 1775, categoria: "ciencia", dificultad: "dificil" },
  { id: 213, titulo: "Descubrimiento de la estructura del benceno", descripcion_corta: "August Kekulé propone la estructura cíclica de anillo plano para el benceno.", año: 1865, categoria: "ciencia", dificultad: "dificil" },
  { id: 214, titulo: "Descubrimiento de la radiación cósmica de fondo", descripcion_corta: "Penzias y Wilson detectan por accidente el eco remanente del Big Bang en una antena.", año: 1964, categoria: "ciencia", dificultad: "dificil" },
  { id: 215, titulo: "Confirmación de ondas gravitacionales", descripcion_corta: "El experimento LIGO capta vibraciones en el espacio-tiempo predichas por Einstein.", año: 2015, categoria: "ciencia", dificultad: "dificil" },
  { id: 216, titulo: "Primera foto de un agujero negro", descripcion_corta: "El telescopio Event Horizon obtiene la imagen de la silueta del agujero negro en la galaxia M87.", año: 2019, categoria: "ciencia", dificultad: "dificil" },
  { id: 217, titulo: "Aterrizaje en un Cometa (Misión Rosetta)", descripcion_corta: "La sonda Rosetta suelta el módulo Philae sobre el cometa 67P/Churiúmov-Guerasimenko.", año: 2014, categoria: "ciencia", dificultad: "dificil" },
  { id: 218, titulo: "Creación del Lenguaje Fortran", descripcion_corta: "John Backus en IBM crea el primer lenguaje de programación comercial de alto nivel.", año: 1957, categoria: "ciencia", dificultad: "dificil" },
  { id: 219, titulo: "Invención del Horno de Microondas", descripcion_corta: "Percy Spencer descubre el calentamiento provocado por magnetrones de radar comerciales.", año: 1945, categoria: "ciencia", dificultad: "dificil" },
  { id: 220, titulo: "Primer Reactor Nuclear Autocontrolado", descripcion_corta: "Enrico Fermi dirige la pila atómica Chicago Pile-1, iniciando la era nuclear controlada.", año: 1942, categoria: "ciencia", dificultad: "dificil" },
  { id: 221, titulo: "Invención del Motor Diésel", descripcion_corta: "Rudolf Diesel patenta y prueba el primer motor de encendido por compresión eficiente.", año: 1897, categoria: "ciencia", dificultad: "dificil" },
  { id: 222, titulo: "Invención de la Desmotadora de Algodón", descripcion_corta: "Eli Whitney revoluciona la agricultura estadounidense con su desmotadora mecánica.", año: 1793, categoria: "ciencia", dificultad: "dificil" },
  { id: 223, titulo: "Invención del Plástico Sintético (Baquelita)", descripcion_corta: "Leo Baekeland patenta la resina sintética termoestable, naciendo la era plástica.", año: 1907, categoria: "ciencia", dificultad: "dificil" },
  { id: 224, titulo: "Descubrimiento de la Anomalía de Urano", descripcion_corta: "Alexis Bouvard publica tablas astronómicas con discrepancias que implican un octavo planeta.", año: 1821, categoria: "ciencia", dificultad: "dificil" },
  { id: 225, titulo: "Invención de la cosechadora mecánica", descripcion_corta: "Cyrus McCormick diseña y patenta la segadora-cosechadora de cereales en Virginia.", año: 1831, categoria: "ciencia", dificultad: "dificil" },


  // ==================== ARTE Y LITERATURA (75 CARTAS) ====================
  // FÁCILES (25)
  { id: 226, titulo: "Publicación de Don Quijote de la Mancha", descripcion_corta: "Miguel de Cervantes Saavedra publica la primera parte de su célebre novela caballeresca.", año: 1605, categoria: "arte", dificultad: "facil" },
  { id: 227, titulo: "Pintura de la Mona Lisa (La Gioconda)", descripcion_corta: "Leonardo da Vinci inicia la obra pictórica en el Renacimiento italiano.", año: 1503, categoria: "arte", dificultad: "facil" },
  { id: 228, titulo: "Gabriela Mistral recibe el Nobel", descripcion_corta: "La escritora chilena es galardonada con el Premio Nobel de Literatura.", año: 1945, categoria: "arte", dificultad: "facil" },
  { id: 229, titulo: "Pablo Neruda recibe el Nobel", descripcion_corta: "El poeta e intelectual chileno obtiene la consagración con el Premio Nobel.", año: 1971, categoria: "arte", dificultad: "facil" },
  { id: 230, titulo: "Inauguración de la Torre Eiffel", descripcion_corta: "La estructura de hierro forjado es inaugurada para la Exposición Universal en París.", año: 1889, categoria: "arte", dificultad: "facil" },
  { id: 231, titulo: "Pintura del Guernica", descripcion_corta: "Pablo Picasso inmortaliza el bombardeo nazi sobre la localidad vizcaína en su mural cubista.", año: 1937, categoria: "arte", dificultad: "facil" },
  { id: 232, titulo: "Estreno de la Novena Sinfonía de Beethoven", descripcion_corta: "Se presenta en Viena, incluyendo la innovadora parte coral de la 'Oda a la alegría'.", año: 1824, categoria: "arte", dificultad: "facil" },
  { id: 233, titulo: "Pintura de 'La Noche Estrellada'", descripcion_corta: "Vincent van Gogh pinta su emblemático lienzo azul y amarillo desde el asilo de Saint-Rémy.", año: 1889, categoria: "arte", dificultad: "facil" },
  { id: 234, titulo: "Pintura de 'El Grito'", descripcion_corta: "Edvard Munch retrata la angustia existencial humana en el movimiento expresionista.", año: 1893, categoria: "arte", dificultad: "facil" },
  { id: 235, titulo: "Publicación de 'El Principito'", descripcion_corta: "El novelista y aviador Antoine de Saint-Exupéry edita su célebre libro de reflexiones infantiles.", año: 1943, categoria: "arte", dificultad: "facil" },
  { id: 236, titulo: "Estreno de 'Hamlet' de Shakespeare", descripcion_corta: "Se publica y representa la inmortal obra trágica del bardo inglés.", año: 1603, categoria: "arte", dificultad: "facil" },
  { id: 237, titulo: "Terminación de 'El David'", descripcion_corta: "Miguel Ángel esculpe el soberbio gigante de mármol blanco de Carrara en Florencia.", año: 1504, categoria: "arte", dificultad: "facil" },
  { id: 238, titulo: "Frescos del Techo de la Capilla Sixtina", descripcion_corta: "Miguel Ángel culmina la pintura mural encargada por el Papa Julio II en Roma.", año: 1512, categoria: "arte", dificultad: "facil" },
  { id: 239, titulo: "Publicación de 'Cien años de soledad'", descripcion_corta: "Gabriel García Márquez publica su obra cumbre del realismo mágico en Buenos Aires.", año: 1967, categoria: "arte", dificultad: "facil" },
  { id: 240, titulo: "Pintura de 'Las Meninas'", descripcion_corta: "Diego Velázquez retrata a la infanta Margarita rodeada de su corte en el palacio real.", año: 1656, categoria: "arte", dificultad: "facil" },
  { id: 241, titulo: "Publicación de '1984'", descripcion_corta: "George Orwell edita su novela distópica sobre el Gran Hermano y la manipulación social.", año: 1949, categoria: "arte", dificultad: "facil" },
  { id: 242, titulo: "Publicación de 'El Hobbit'", descripcion_corta: "J.R.R. Tolkien lanza su novela fantástica, precursora de El Señor de los Anillos.", año: 1937, categoria: "arte", dificultad: "facil" },
  { id: 243, titulo: "Publicación de 'Romeo y Julieta'", descripcion_corta: "Shakespeare estrena la tragedia romántica de los amantes desdichados de Verona.", año: 1597, categoria: "arte", dificultad: "facil" },
  { id: 244, titulo: "Publicación de 'Frankenstein'", descripcion_corta: "Mary Shelley lanza su novela gótica y pionera de la ciencia ficción, escrita en Villa Diodati.", año: 1818, categoria: "arte", dificultad: "facil" },
  { id: 245, titulo: "Estreno de 'Tiempos Modernos' de Chaplin", descripcion_corta: "Se estrena el filme mudo que retrata con humor la mecanización industrial.", año: 1936, categoria: "arte", dificultad: "facil" },
  { id: 246, titulo: "Estreno de la película 'Star Wars'", descripcion_corta: "George Lucas estrena el Episodio IV, dando origen a la saga multimillonaria de ópera espacial.", año: 1977, categoria: "arte", dificultad: "facil" },
  { id: 247, titulo: "Inauguración de la Ópera de Sídney", descripcion_corta: "Se inaugura el icónico edificio diseñado por Jørn Utzon en Australia.", año: 1973, categoria: "arte", dificultad: "facil" },
  { id: 248, titulo: "Publicación de 'Drácula'", descripcion_corta: "Bram Stoker publica su novela epistolar, consagrando el mito del vampiro moderno.", año: 1897, categoria: "arte", dificultad: "facil" },
  { id: 249, titulo: "Estreno de 'El Ciudadano Kane'", descripcion_corta: "Orson Welles dirige y protagoniza la influyente película sobre la vida de un magnate.", año: 1941, categoria: "arte", dificultad: "facil" },
  { id: 250, titulo: "Estreno de 'La flauta mágica' de Mozart", descripcion_corta: "Se presenta en Viena el *Singspiel* operístico, semanas antes del fallecimiento del compositor.", año: 1791, categoria: "arte", dificultad: "facil" },

  // MEDIAS (25)
  { id: 251, titulo: "La Divina Comedia (Dante Alighieri)", descripcion_corta: "Se completa el viaje poético a través del Infierno, Purgatorio y Paraíso.", año: 1320, categoria: "arte", dificultad: "media" },
  { id: 252, titulo: "Pintura de 'El Nacimiento de Venus'", descripcion_corta: "Sandro Botticelli plasma a la diosa emergiendo de las aguas sobre una concha.", año: 1485, categoria: "arte", dificultad: "media" },
  { id: 253, titulo: "Estreno de 'El lago de los cisnes'", descripcion_corta: "El ballet con música de Piotr Ilich Tchaikovsky se estrena en el Teatro Bolshói.", año: 1877, categoria: "arte", dificultad: "media" },
  { id: 254, titulo: "Estreno de la ópera 'La Traviata'", descripcion_corta: "Giuseppe Verdi estrena su ópera basada en la novela de La dama de las camelias.", año: 1853, categoria: "arte", dificultad: "media" },
  { id: 255, titulo: "Publicación de 'El Gran Gatsby'", descripcion_corta: "F. Scott Fitzgerald publica la novela sobre la decadencia del sueño americano en los años veinte.", año: 1925, categoria: "arte", dificultad: "media" },
  { id: 256, titulo: "Publicación de 'La Metamorfosis'", descripcion_corta: "Franz Kafka edita su relato sobre la transformación de Gregorio Samsa.", año: 1915, categoria: "arte", dificultad: "media" },
  { id: 257, titulo: "Publicación de 'Ulises' de James Joyce", descripcion_corta: "La controvertida y monumental novela modernista se edita íntegramente en París.", año: 1922, categoria: "arte", dificultad: "media" },
  { id: 258, titulo: "Estreno de 'Carmen' de Georges Bizet", descripcion_corta: "La ópera que escandalizó al público por su temática gitana se estrena en París.", año: 1875, categoria: "arte", dificultad: "media" },
  { id: 259, titulo: "Publicación de 'Los Miserables'", descripcion_corta: "Victor Hugo publica su célebre crítica social de la Francia de inicios del siglo XIX.", año: 1862, categoria: "arte", dificultad: "media" },
  { id: 260, titulo: "Publicación de 'Crimen y castigo'", descripcion_corta: "Fiódor Dostoievski lanza en folletines la historia de culpa y redención de Raskólnikov.", año: 1866, categoria: "arte", dificultad: "media" },
  { id: 261, titulo: "Publicación de 'Guerra y paz'", descripcion_corta: "Lev Tolstói completa la crónica de la invasión napoleónica a Rusia en su novela.", año: 1869, categoria: "arte", dificultad: "media" },
  { id: 262, titulo: "Pintura de 'La Última Cena'", descripcion_corta: "Leonardo da Vinci culmina la obra mural sobre los apóstoles en Milán.", año: 1498, categoria: "arte", dificultad: "media" },
  { id: 263, titulo: "Pintura de 'La Escuela de Atenas'", descripcion_corta: "Rafael Sanzio representa a los filósofos clásicos en un mural en los palacios vaticanos.", año: 1511, categoria: "arte", dificultad: "media" },
  { id: 264, titulo: "Pintura de 'El Jardín de las Delicias'", descripcion_corta: "El Bosco pinta su críptico y asombroso tríptico al óleo sobre madera.", año: 1500, categoria: "arte", dificultad: "media" },
  { id: 265, titulo: "Estreno de la Quinta Sinfonía de Beethoven", descripcion_corta: "Se presenta con sus icónicos y enérgicos cuatro acordes iniciales en Viena.", año: 1808, categoria: "arte", dificultad: "media" },
  { id: 266, titulo: "Estreno del Mesías de Händel", descripcion_corta: "El oratorio barroco en inglés se estrena en un concierto benéfico en Dublín.", año: 1742, categoria: "arte", dificultad: "media" },
  { id: 267, titulo: "Estreno de 'Don Giovanni' de Mozart", descripcion_corta: "La ópera cómica dramática basada en la leyenda de Don Juan se presenta en Praga.", año: 1787, categoria: "arte", dificultad: "media" },
  { id: 268, titulo: "Estreno del ballet 'El Cascanueces'", descripcion_corta: "Se estrena la obra navideña con música de Tchaikovsky en San Petersburgo.", año: 1892, categoria: "arte", dificultad: "media" },
  { id: 269, titulo: "Publicación de 'Fausto' de Goethe", descripcion_corta: "Se publica la primera parte del drama filosófico sobre el pacto con Mefistófeles.", año: 1808, categoria: "arte", dificultad: "media" },
  { id: 270, titulo: "Publicación de 'El paraíso perdido'", descripcion_corta: "John Milton escribe su poema épico de caída humana y rebelión de Lucifer.", año: 1667, categoria: "arte", dificultad: "media" },
  { id: 271, titulo: "Publicación de 'Ficciones' de Borges", descripcion_corta: "El célebre volumen de cuentos laberínticos e intelectuales se edita en Buenos Aires.", año: 1944, categoria: "arte", dificultad: "media" },
  { id: 272, titulo: "Publicación de 'Pedro Páramo'", descripcion_corta: "El escritor mexicano Juan Rulfo publica su novela corta ambientada en Comala.", año: 1955, categoria: "arte", dificultad: "media" },
  { id: 273, titulo: "Estreno de 'Metrópolis' de Fritz Lang", descripcion_corta: "Se proyecta el pionero largometraje expresionista alemán de ciencia ficción.", año: 1927, categoria: "arte", dificultad: "media" },
  { id: 274, titulo: "Estreno de 'Casablanca'", descripcion_corta: "Se estrena el clásico dramático y romántico bélico protagonizado por Bogart e Bergman.", año: 1942, categoria: "arte", dificultad: "media" },
  { id: 275, titulo: "Estreno de '2001: Odisea del Espacio'", descripcion_corta: "Se estrena la obra maestra cinematográfica de ciencia ficción de Stanley Kubrick.", año: 1968, categoria: "arte", dificultad: "media" },

  // DIFÍCILES (25)
  { id: 276, titulo: "Publicación del manuscrito de Cantar de Mío Cid", descripcion_corta: "Se registra la copia conservada del poema épico del caballero castellano.", año: 1207,  categoria: "arte", dificultad: "dificil" },
  { id: 277, titulo: "Publicación de 'Los tres mosqueteros'", descripcion_corta: "Alexandre Dumas publica por entregas las aventuras de D'Artagnan en París.", año: 1844, categoria: "arte", dificultad: "dificil" },
  { id: 278, titulo: "Publicación de 'Moby Dick'", descripcion_corta: "Herman Melville edita su novela de la trágica obsesión del capitán Ahab por la ballena blanca.", año: 1851, categoria: "arte", dificultad: "dificil" },
  { id: 279, titulo: "Publicación de 'Alicia en el país de las maravillas'", descripcion_corta: "Lewis Carroll publica su clásica obra satírica del sinsentido.", año: 1865, categoria: "arte", dificultad: "dificil" },
  { id: 280, titulo: "Publicación de 'La isla del tesoro'", descripcion_corta: "Robert Louis Stevenson lanza la gran novela de piratas y tesoros enterrados.", año: 1883, categoria: "arte", dificultad: "dificil" },
  { id: 281, titulo: "Publicación de 'La guerra de los mundos'", descripcion_corta: "H.G. Wells imagina la invasión marciana a la Tierra en su novela de ciencia ficción.", año: 1898, categoria: "arte", dificultad: "dificil" },
  { id: 282, titulo: "Estreno de 'El nacimiento de una nación'", descripcion_corta: "La polémica pero técnicamente innovadora película muda de D.W. Griffith se estrena en EE.UU.", año: 1915, categoria: "arte", dificultad: "dificil" },
  { id: 283, titulo: "Estreno de 'El Acorazado Potemkin'", descripcion_corta: "Serguéi Eisenstein dirige el filme mudo soviético con la famosa escena de las escaleras de Odesa.", año: 1925, categoria: "arte", dificultad: "dificil" },
  { id: 284, titulo: "Estreno de la película 'El Mago de Oz'", descripcion_corta: "Victor Fleming estrena el filme musical de fantasía que popularizó el Technicolor.", año: 1939, categoria: "arte", dificultad: "dificil" },
  { id: 285, titulo: "Estreno de 'Lo que el viento se llevó'", descripcion_corta: "El gigantesco drama histórico y romántico sobre la Guerra Civil estadounidense se estrena en Atlanta.", año: 1939, categoria: "arte", dificultad: "dificil" },
  { id: 286, titulo: "Estreno de 'Cantando bajo la lluvia'", descripcion_corta: "Gene Kelly y Stanley Donen dirigen y protagonizan el aclamado filme musical hollywoodense.", año: 1952, categoria: "arte", dificultad: "dificil" },
  { id: 287, titulo: "Escultura de 'El Éxtasis de Santa Teresa'", descripcion_corta: "Gian Lorenzo Bernini culmina el grupo escultórico barroco en mármol en Roma.", año: 1652, categoria: "arte", dificultad: "dificil" },
  { id: 288, titulo: "Estreno de la Sinfonía N.º 40 de Mozart", descripcion_corta: "Mozart compone y estrena la que sería una de sus sinfonías más famosas en Sol menor.", año: 1788, categoria: "arte", dificultad: "dificil" },
  { id: 289, titulo: "Publicación de 'En busca del tiempo perdido'", descripcion_corta: "Marcel Proust publica 'Por el camino de Swann', primer volumen de su magna novela.", año: 1913, categoria: "arte", dificultad: "dificil" },
  { id: 290, titulo: "Publicación de 'La tierra baldía'", descripcion_corta: "T.S. Eliot publica su influyente poema de la desolación de posguerra.", año: 1922, categoria: "arte", dificultad: "dificil" },
  { id: 291, titulo: "Publicación de 'El Aleph'", descripcion_corta: "Jorge Luis Borges publica la compilación de cuentos de corte fantástico.", año: 1949, categoria: "arte", dificultad: "dificil" },
  { id: 292, titulo: "Primera Exhibición Impresionista", descripcion_corta: "Monet, Renoir, Degas y otros exponen en el taller del fotógrafo Nadar en París.", año: 1874, categoria: "arte", dificultad: "dificil" },
  { id: 293, titulo: "Estreno de 'La consagración de la primavera'", descripcion_corta: "Igor Stravinsky provoca un tumulto escandaloso por su rítmica y coreografía en París.", año: 1913, categoria: "arte", dificultad: "dificil" },
  { id: 294, titulo: "Estreno del 'Bolero' de Maurice Ravel", descripcion_corta: "Se presenta la obra orquestal de crescendo continuo en la Ópera de París.", año: 1928, categoria: "arte", dificultad: "dificil" },
  { id: 295, titulo: "Publicación de 'Las Flores del Mal'", descripcion_corta: "Charles Baudelaire publica el poemario simbolista, sufriendo censura por inmoralidad.", año: 1857, categoria: "arte", dificultad: "dificil" },
  { id: 296, titulo: "Escultura de 'El Pensador'", descripcion_corta: "Auguste Rodin modela la icónica figura masculina absorta en profundos pensamientos.", año: 1902, "comentario": "Primer molde completo en 1902.", año: 1902, categoria: "arte", dificultad: "dificil" },
  { id: 297, titulo: "Publicación de 'Cantar de los Cantares' (Fray Luis)", descripcion_corta: "Fray Luis de León traduce del hebreo al castellano el libro bíblico, costándole la cárcel.", año: 1561, categoria: "arte", dificultad: "dificil" },
  { id: 298, titulo: "Estreno de la 'Oda a la Alegría' (Poema)", descripcion_corta: "Friedrich Schiller publica el poema que años más tarde integraría la 9ª de Beethoven.", año: 1785, categoria: "arte", dificultad: "dificil" },
  { id: 299, titulo: "Estreno de la película 'Viaje a la Luna'", descripcion_corta: "Georges Méliès estrena el filme mudo de ciencia ficción con el icónico cohete en el ojo lunar.", año: 1902, categoria: "arte", dificultad: "dificil" },
  { id: 300, titulo: "Estreno de 'Jesucristo Superstar' en Broadway", descripcion_corta: "La ópera rock con música de Andrew Lloyd Webber debuta en la escena teatral neoyorquina.", año: 1971, categoria: "arte", dificultad: "dificil" }
];






const CARDS_HISTORIA = INITIAL_CARDS;

const CARDS_CANCIONES = [
  {
    "id": 301,
    "titulo": "Johnny B. Goode (Chuck Berry)",
    "descripcion_corta": "Hito del rock and roll primigenio, famoso por su solo de guitarra introductorio.",
    "año": 1958,
    "categoria": "rock_pop"
  },
  {
    "id": 302,
    "titulo": "Jailhouse Rock (Elvis Presley)",
    "descripcion_corta": "Clásico bailable del Rey del Rock and Roll que acompañó a la película homónima.",
    "año": 1957,
    "categoria": "rock_pop"
  },
  {
    "id": 303,
    "titulo": "Blowin' in the Wind (Bob Dylan)",
    "descripcion_corta": "Canción de protesta emblemática del movimiento por los derechos civiles.",
    "año": 1963,
    "categoria": "rock_pop"
  },
  {
    "id": 304,
    "titulo": "I Want to Hold Your Hand (The Beatles)",
    "descripcion_corta": "El sencillo que desató la beatlemanía en Estados Unidos y el mundo.",
    "año": 1963,
    "categoria": "rock_pop"
  },
  {
    "id": 305,
    "titulo": "Like a Rolling Stone (Bob Dylan)",
    "descripcion_corta": "Obra maestra lírica que transformó la estructura de los sencillos de radio.",
    "año": 1965,
    "categoria": "rock_pop"
  },
  {
    "id": 306,
    "titulo": "Yesterday (The Beatles)",
    "descripcion_corta": "Una de las canciones más versionadas de la historia de la música contemporánea.",
    "año": 1965,
    "categoria": "rock_pop"
  },
  {
    "id": 307,
    "titulo": "Respect (Aretha Franklin)",
    "descripcion_corta": "Himno del soul adoptado por los movimientos feministas y de derechos civiles.",
    "año": 1967,
    "categoria": "rock_pop"
  },
  {
    "id": 308,
    "titulo": "Purple Haze (Jimi Hendrix)",
    "descripcion_corta": "Exponente supremo del rock psicodélico con el virtuosismo de su guitarra.",
    "año": 1967,
    "categoria": "rock_pop"
  },
  {
    "id": 309,
    "titulo": "Hey Jude (The Beatles)",
    "descripcion_corta": "Balada mítica de Paul McCartney que permaneció semanas en la cima de ránkings.",
    "año": 1968,
    "categoria": "rock_pop"
  },
  {
    "id": 310,
    "titulo": "Sympathy for the Devil (The Rolling Stones)",
    "descripcion_corta": "Clásico de rock con percusión samba e irreverencia satírica de Jagger.",
    "año": 1968,
    "categoria": "rock_pop"
  },
  {
    "id": 311,
    "titulo": "Space Oddity (David Bowie)",
    "descripcion_corta": "Lanzada coincidiendo con la llegada del ser humano a la Luna.",
    "año": 1969,
    "categoria": "rock_pop"
  },
  {
    "id": 312,
    "titulo": "Bridge over Troubled Water (Simon & Garfunkel)",
    "descripcion_corta": "Aclamada balada gospel-pop ganadora de múltiples premios Grammy.",
    "año": 1970,
    "categoria": "rock_pop"
  },
  {
    "id": 313,
    "titulo": "Let It Be (The Beatles)",
    "descripcion_corta": "Emotivo sencillo final del cuarteto de Liverpool antes de su separación.",
    "año": 1970,
    "categoria": "rock_pop"
  },
  {
    "id": 314,
    "titulo": "What's Going On (Marvin Gaye)",
    "descripcion_corta": "Obra cumbre de la música soul con crítica social a la guerra de Vietnam.",
    "año": 1971,
    "categoria": "rock_pop"
  },
  {
    "id": 315,
    "titulo": "Imagine (John Lennon)",
    "descripcion_corta": "Himno utópico por la paz mundial y la unión de la humanidad.",
    "año": 1971,
    "categoria": "rock_pop"
  },
  {
    "id": 316,
    "titulo": "Stairway to Heaven (Led Zeppelin)",
    "descripcion_corta": "Legendario tema de rock progresivo con la mítica intro de flauta y solo final.",
    "año": 1971,
    "categoria": "rock_pop"
  },
  {
    "id": 317,
    "titulo": "Superstition (Stevie Wonder)",
    "descripcion_corta": "Hito del funk que destaca por su pegajoso riff en el clavinet.",
    "año": 1972,
    "categoria": "rock_pop"
  },
  {
    "id": 318,
    "titulo": "Bohemian Rhapsody (Queen)",
    "descripcion_corta": "Rapsodia operística y de rock que desafió las reglas radiales de duración.",
    "año": 1975,
    "categoria": "rock_pop"
  },
  {
    "id": 319,
    "titulo": "Wish You Were Here (Pink Floyd)",
    "descripcion_corta": "Balada melancólica dedicada al antiguo miembro de la banda Syd Barrett.",
    "año": 1975,
    "categoria": "rock_pop"
  },
  {
    "id": 320,
    "titulo": "Dancing Queen (ABBA)",
    "descripcion_corta": "Himno de la música disco sueca que reinó en las pistas de baile del mundo.",
    "año": 1976,
    "categoria": "rock_pop"
  },
  {
    "id": 321,
    "titulo": "Hotel California (Eagles)",
    "descripcion_corta": "Una de las canciones de rock más famosas del mundo con su misteriosa letra.",
    "año": 1976,
    "categoria": "rock_pop"
  },
  {
    "id": 322,
    "titulo": "Go Your Own Way (Fleetwood Mac)",
    "descripcion_corta": "Sencillo del álbum Rumours escrito sobre las tensiones internas del grupo.",
    "año": 1977,
    "categoria": "rock_pop"
  },
  {
    "id": 323,
    "titulo": "Stayin' Alive (Bee Gees)",
    "descripcion_corta": "La quintaesencia del sonido de la música disco para la película Fiebre de Sábado por la Noche.",
    "año": 1977,
    "categoria": "rock_pop"
  },
  {
    "id": 324,
    "titulo": "Heroes (David Bowie)",
    "descripcion_corta": "Icónica balada inspirada en dos amantes en el Muro de Berlín.",
    "año": 1977,
    "categoria": "rock_pop"
  },
  {
    "id": 325,
    "titulo": "Sultans of Swing (Dire Straits)",
    "descripcion_corta": "Hito de rock con el distintivo estilo de punteo de guitarra de Mark Knopfler.",
    "año": 1978,
    "categoria": "rock_pop"
  },
  {
    "id": 326,
    "titulo": "I Will Survive (Gloria Gaynor)",
    "descripcion_corta": "Himno de la superación personal y clásico de la música disco mundial.",
    "año": 1978,
    "categoria": "rock_pop"
  },
  {
    "id": 327,
    "titulo": "Message in a Bottle (The Police)",
    "descripcion_corta": "Sencillo de reggae-rock que narra la soledad de un náufrago en una isla.",
    "año": 1979,
    "categoria": "rock_pop"
  },
  {
    "id": 328,
    "titulo": "London Calling (The Clash)",
    "descripcion_corta": "Declaración punk con influencias reggae del colapso social londinense.",
    "año": 1979,
    "categoria": "rock_pop"
  },
  {
    "id": 329,
    "titulo": "Another Brick in the Wall (Part 2)",
    "descripcion_corta": "Canción de protesta contra la educación rígida, con coro de niños escolares.",
    "año": 1979,
    "categoria": "rock_pop"
  },
  {
    "id": 330,
    "titulo": "Don't Stop Believin' (Journey)",
    "descripcion_corta": "Una de las canciones más descargadas de la historia, himno motivacional.",
    "año": 1981,
    "categoria": "rock_pop"
  },
  {
    "id": 331,
    "titulo": "Every Breath You Take (The Police)",
    "descripcion_corta": "Balada obsesiva que dominó los ránkings mundiales en los años ochenta.",
    "año": 1983,
    "categoria": "rock_pop"
  },
  {
    "id": 332,
    "titulo": "Billie Jean (Michael Jackson)",
    "descripcion_corta": "Sencillo histórico con el que estrenó su famoso paso de baile lunar.",
    "año": 1982,
    "categoria": "rock_pop"
  },
  {
    "id": 333,
    "titulo": "Sweet Child O' Mine (Guns N' Roses)",
    "descripcion_corta": "Clásico del hard rock estadounidense con el icónico riff inicial de Slash.",
    "año": 1987,
    "categoria": "rock_pop"
  },
  {
    "id": 334,
    "titulo": "Purple Rain (Prince)",
    "descripcion_corta": "Balada gospel-rock que da título a la película y álbum cumbre del artista.",
    "año": 1984,
    "categoria": "rock_pop"
  },
  {
    "id": 335,
    "titulo": "Like a Virgin (Madonna)",
    "descripcion_corta": "Sencillo que consolidó a Madonna como la indiscutible Reina del Pop mundial.",
    "año": 1984,
    "categoria": "rock_pop"
  },
  {
    "id": 336,
    "titulo": "Take On Me (a-ha)",
    "descripcion_corta": "Hit de synthpop famoso por su innovador video musical de rotoscopia.",
    "año": 1985,
    "categoria": "rock_pop"
  },
  {
    "id": 337,
    "titulo": "With or Without You (U2)",
    "descripcion_corta": "Emotiva balada de rock alternativo del álbum The Joshua Tree.",
    "año": 1987,
    "categoria": "rock_pop"
  },
  {
    "id": 338,
    "titulo": "Personal Jesus (Depeche Mode)",
    "descripcion_corta": "Hito del rock electrónico y alternativo con influencias blues-pop.",
    "año": 1989,
    "categoria": "rock_pop"
  },
  {
    "id": 339,
    "titulo": "Smells Like Teen Spirit (Nirvana)",
    "descripcion_corta": "Himno del grunge de la generación X que cambió la industria musical.",
    "año": 1991,
    "categoria": "rock_pop"
  },
  {
    "id": 340,
    "titulo": "Losing My Religion (R.E.M.)",
    "descripcion_corta": "Éxito de rock alternativo destacado por su arreglo de mandolina.",
    "año": 1991,
    "categoria": "rock_pop"
  },
  {
    "id": 341,
    "titulo": "One (U2)",
    "descripcion_corta": "Aclamada balada grabada en Berlín durante la reunificación alemana.",
    "año": 1991,
    "categoria": "rock_pop"
  },
  {
    "id": 342,
    "titulo": "Creep (Radiohead)",
    "descripcion_corta": "Sencillo debut que se convirtió en el gran himno alternativo de la banda.",
    "año": 1992,
    "categoria": "rock_pop"
  },
  {
    "id": 343,
    "titulo": "Under the Bridge (Red Hot Chili Peppers)",
    "descripcion_corta": "Sencillo alternativo sobre la soledad y la adicción en Los Ángeles.",
    "año": 1991,
    "categoria": "rock_pop"
  },
  {
    "id": 344,
    "titulo": "I Will Always Love You (Whitney Houston)",
    "descripcion_corta": "Balada del filme El Guardaespalda que rompió récords históricos de ventas.",
    "año": 1992,
    "categoria": "rock_pop"
  },
  {
    "id": 345,
    "titulo": "All Apologies (Nirvana)",
    "descripcion_corta": "Sencillo del álbum In Utero y recordada versión en el MTV Unplugged.",
    "año": 1993,
    "categoria": "rock_pop"
  },
  {
    "id": 346,
    "titulo": "Zombie (The Cranberries)",
    "descripcion_corta": "Canción de protesta grunge-rock sobre el conflicto de Irlanda del Norte.",
    "año": 1994,
    "categoria": "rock_pop"
  },
  {
    "id": 347,
    "titulo": "Wonderwall (Oasis)",
    "descripcion_corta": "La balada acústica más popular del britpop de los años noventa.",
    "año": 1995,
    "categoria": "rock_pop"
  },
  {
    "id": 348,
    "titulo": "Don't Speak (No Doubt)",
    "descripcion_corta": "Balada ska-pop inspirada en la ruptura amorosa de Gwen Stefani.",
    "año": 1995,
    "categoria": "rock_pop"
  },
  {
    "id": 349,
    "titulo": "Wannabe (Spice Girls)",
    "descripcion_corta": "El sencillo debut que desató la fiebre del pop de las bandas femeninas.",
    "año": 1996,
    "categoria": "rock_pop"
  },
  {
    "id": 350,
    "titulo": "Bittersweet Symphony (The Verve)",
    "descripcion_corta": "Hito del britpop orquestal famoso por su videoclip caminando por la calle.",
    "año": 1997,
    "categoria": "rock_pop"
  },
  {
    "id": 351,
    "titulo": "Barbie Girl (Aqua)",
    "descripcion_corta": "Canción de pop chicle danesa que se convirtió en un éxito radial mundial.",
    "año": 1997,
    "categoria": "rock_pop"
  },
  {
    "id": 352,
    "titulo": "Baby One More Time (Britney Spears)",
    "descripcion_corta": "El hit de pop escolar que marcó el debut e inicio de la era de Britney.",
    "año": 1998,
    "categoria": "rock_pop"
  },
  {
    "id": 353,
    "titulo": "Torn (Natalie Imbruglia)",
    "descripcion_corta": "Balada acústica pop-rock que dominó los ránkings radiales mundiales.",
    "año": 1997,
    "categoria": "rock_pop"
  },
  {
    "id": 354,
    "titulo": "Believe (Cher)",
    "descripcion_corta": "Hito del dance-pop que popularizó el uso del efecto de afinación Auto-Tune.",
    "año": 1998,
    "categoria": "rock_pop"
  },
  {
    "id": 355,
    "titulo": "Californication (Red Hot Chili Peppers)",
    "descripcion_corta": "Sencillo de rock alternativo sobre el lado oscuro de la cultura de Hollywood.",
    "año": 1999,
    "categoria": "rock_pop"
  },
  {
    "id": 356,
    "titulo": "Smooth (Santana ft. Rob Thomas)",
    "descripcion_corta": "Colaboración de rock latino y pop que barrió en los premios Grammy de 2000.",
    "año": 1999,
    "categoria": "rock_pop"
  },
  {
    "id": 357,
    "titulo": "It's My Life (Bon Jovi)",
    "descripcion_corta": "Himno de rock que reintrodujo a la banda a una nueva generación de oyentes.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 358,
    "titulo": "Stan (Eminem)",
    "descripcion_corta": "Canción de rap sobre un fanático obsesionado, acuñando el término 'stan'.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 359,
    "titulo": "Yellow (Coldplay)",
    "descripcion_corta": "Sencillo que consolidó la fama internacional de la banda británica de pop-rock.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 360,
    "titulo": "Beautiful Day (U2)",
    "descripcion_corta": "Hit optimista ganador de Grammys que abrió la década para los irlandeses.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 361,
    "titulo": "In the End (Linkin Park)",
    "descripcion_corta": "Una de las canciones de nu-metal y rap-rock más exitosas y famosas del siglo XXI.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 362,
    "titulo": "Complicated (Avril Lavigne)",
    "descripcion_corta": "Sencillo debut de la cantautora canadiense de pop-punk y skate-rock.",
    "año": 2002,
    "categoria": "rock_pop"
  },
  {
    "id": 363,
    "titulo": "Clocks (Coldplay)",
    "descripcion_corta": "Hito destacado por su distintivo e hipnótico arpegio de piano acústico.",
    "año": 2002,
    "categoria": "rock_pop"
  },
  {
    "id": 364,
    "titulo": "Lose Yourself (Eminem)",
    "descripcion_corta": "Canción de rap del filme 8 Mile que ganó el primer Oscar para el género.",
    "año": 2002,
    "categoria": "rock_pop"
  },
  {
    "id": 365,
    "titulo": "Crazy in Love (Beyoncé ft. Jay-Z)",
    "descripcion_corta": "Primer sencillo solista que estableció a Beyoncé como superestrella pop.",
    "año": 2003,
    "categoria": "rock_pop"
  },
  {
    "id": 366,
    "titulo": "Seven Nation Army (The White Stripes)",
    "descripcion_corta": "Hito de garage rock cuyo riff de bajo-guitarra es cantado en estadios del mundo.",
    "año": 2003,
    "categoria": "rock_pop"
  },
  {
    "id": 367,
    "titulo": "Mr. Brightside (The Killers)",
    "descripcion_corta": "Hito de rock alternativo e indie que se convirtió en un clásico de culto británico.",
    "año": 2003,
    "categoria": "rock_pop"
  },
  {
    "id": 368,
    "titulo": "Toxic (Britney Spears)",
    "descripcion_corta": "Sencillo electropop y dance galardonado, famoso por su producción innovadora.",
    "año": 2003,
    "categoria": "rock_pop"
  },
  {
    "id": 369,
    "titulo": "Yeah! (Usher)",
    "descripcion_corta": "Hito del movimiento crunk y R&B que dominó ránkings mundiales en 2004.",
    "año": 2004,
    "categoria": "rock_pop"
  },
  {
    "id": 370,
    "titulo": "Boulevard of Broken Dreams (Green Day)",
    "descripcion_corta": "Balada de punk melódico del aclamado álbum conceptual American Idiot.",
    "año": 2004,
    "categoria": "rock_pop"
  },
  {
    "id": 371,
    "titulo": "Speed of Sound (Coldplay)",
    "descripcion_corta": "Sencillo de rock alternativo del exitoso álbum X&Y de la banda británica.",
    "año": 2005,
    "categoria": "rock_pop"
  },
  {
    "id": 372,
    "titulo": "You're Beautiful (James Blunt)",
    "descripcion_corta": "Balada acústica de pop melancólico que lideró ránkings en decenas de países.",
    "año": 2005,
    "categoria": "rock_pop"
  },
  {
    "id": 373,
    "titulo": "Hips Don't Lie (Shakira ft. Wyclef Jean)",
    "descripcion_corta": "Éxito masivo global de pop latino que se convirtió en uno de los más vendidos.",
    "año": 2006,
    "categoria": "rock_pop"
  },
  {
    "id": 374,
    "titulo": "Rehab (Amy Winehouse)",
    "descripcion_corta": "Hito de soul y R&B que detalla la negativa de la artista a ir a rehabilitación.",
    "año": 2006,
    "categoria": "rock_pop"
  },
  {
    "id": 375,
    "titulo": "Umbrella (Rihanna ft. Jay-Z)",
    "descripcion_corta": "Sencillo de R&B que impulsó a Rihanna a la realeza de la música pop.",
    "año": 2007,
    "categoria": "rock_pop"
  },
  {
    "id": 376,
    "titulo": "Viva la Vida (Coldplay)",
    "descripcion_corta": "Sencillo de pop barroco con cuerdas orquestales sobre el poder y la caída de reyes.",
    "año": 2008,
    "categoria": "rock_pop"
  },
  {
    "id": 377,
    "titulo": "Single Ladies (Beyoncé)",
    "descripcion_corta": "Hito pop dance destacado por su icónica coreografía y video musical.",
    "año": 2008,
    "categoria": "rock_pop"
  },
  {
    "id": 378,
    "titulo": "Poker Face (Lady Gaga)",
    "descripcion_corta": "Sencillo de electropop y dance que batió récords de ventas en todo el mundo.",
    "año": 2008,
    "categoria": "rock_pop"
  },
  {
    "id": 379,
    "titulo": "I Gotta Feeling (The Black Eyed Peas)",
    "descripcion_corta": "Hito electrónico de fiesta que se convirtió en el sencillo digital más vendido.",
    "año": 2009,
    "categoria": "rock_pop"
  },
  {
    "id": 380,
    "titulo": "Bad Romance (Lady Gaga)",
    "descripcion_corta": "Hit electropop teatral que consolidó a la artista como ícono de la década.",
    "año": 2009,
    "categoria": "rock_pop"
  },
  {
    "id": 381,
    "titulo": "Rolling in the Deep (Adele)",
    "descripcion_corta": "Potente balada de soul-pop que lideró ránkings y le dio fama global a Adele.",
    "año": 2010,
    "categoria": "rock_pop"
  },
  {
    "id": 382,
    "titulo": "Firework (Katy Perry)",
    "descripcion_corta": "Himno pop de autoaceptación y motivación del álbum Teenage Dream.",
    "año": 2010,
    "categoria": "rock_pop"
  },
  {
    "id": 383,
    "titulo": "Somebody That I Used to Know (Gotye)",
    "descripcion_corta": "Éxito indie-pop acústico con un original videoclip de pintura corporal.",
    "año": 2011,
    "categoria": "rock_pop"
  },
  {
    "id": 384,
    "titulo": "We Found Love (Rihanna ft. Calvin Harris)",
    "descripcion_corta": "Hito de música electrónica y pop que dominó las pistas de baile.",
    "año": 2011,
    "categoria": "rock_pop"
  },
  {
    "id": 385,
    "titulo": "Call Me Maybe (Carly Rae Jepsen)",
    "descripcion_corta": "Chicle pop viral y pegajoso que dominó el verano en todo el mundo.",
    "año": 2011,
    "categoria": "rock_pop"
  },
  {
    "id": 386,
    "titulo": "Get Lucky (Daft Punk ft. Pharrell Williams)",
    "descripcion_corta": "Sencillo funk del dúo francés que marcó el regreso triunfal de la música disco.",
    "año": 2013,
    "categoria": "rock_pop"
  },
  {
    "id": 387,
    "titulo": "Royals (Lorde)",
    "descripcion_corta": "Sencillo minimalista de art-pop que cuestiona el consumismo de la música popular.",
    "año": 2013,
    "categoria": "rock_pop"
  },
  {
    "id": 388,
    "titulo": "Happy (Pharrell Williams)",
    "descripcion_corta": "Hito súper contagioso del filme Mi Villano Favorito 2, un hit planetario.",
    "año": 2013,
    "categoria": "rock_pop"
  },
  {
    "id": 389,
    "titulo": "Uptown Funk (Mark Ronson ft. Bruno Mars)",
    "descripcion_corta": "Hito dance-funk de estilo retro que dominó el número uno por meses.",
    "año": 2014,
    "categoria": "rock_pop"
  },
  {
    "id": 390,
    "titulo": "Thinking Out Loud (Ed Sheeran)",
    "descripcion_corta": "Balada romántica de guitarra que se convirtió en un clásico de bodas mundial.",
    "año": 2014,
    "categoria": "rock_pop"
  },
  {
    "id": 391,
    "titulo": "Hello (Adele)",
    "descripcion_corta": "Sencillo de regreso de Adele que rompió récords de descargas digitales en su debut.",
    "año": 2015,
    "categoria": "rock_pop"
  },
  {
    "id": 392,
    "titulo": "Cheap Thrills (Sia)",
    "descripcion_corta": "Hit de synthpop con influencia reggae que dominó las listas globales.",
    "año": 2016,
    "categoria": "rock_pop"
  },
  {
    "id": 393,
    "titulo": "Shape of You (Ed Sheeran)",
    "descripcion_corta": "Sencillo de pop tropical que rompió récords históricos en Spotify.",
    "año": 2017,
    "categoria": "rock_pop"
  },
  {
    "id": 394,
    "titulo": "Perfect (Ed Sheeran)",
    "descripcion_corta": "Otra balada orquestal súper romántica del cantautor británico.",
    "año": 2017,
    "categoria": "rock_pop"
  },
  {
    "id": 395,
    "titulo": "Havana (Camila Cabello)",
    "descripcion_corta": "Sencillo pop con influencias de piano de salsa y ritmos latinos.",
    "año": 2017,
    "categoria": "rock_pop"
  },
  {
    "id": 396,
    "titulo": "Bad Guy (Billie Eilish)",
    "descripcion_corta": "Hito pop alternativo oscuro e irónico que barrió en los Grammys de 2020.",
    "año": 2019,
    "categoria": "rock_pop"
  },
  {
    "id": 397,
    "titulo": "Blinding Lights (The Weeknd)",
    "descripcion_corta": "Canción de synthwave ochentera que pasó más tiempo en el Top 10 de Billboard.",
    "año": 2019,
    "categoria": "rock_pop"
  },
  {
    "id": 398,
    "titulo": "Watermelon Sugar (Harry Styles)",
    "descripcion_corta": "Sencillo pop con influencia funk-rock del álbum Fine Line.",
    "año": 2019,
    "categoria": "rock_pop"
  },
  {
    "id": 399,
    "titulo": "Dynamite (BTS)",
    "descripcion_corta": "Sencillo de disco-pop que marcó el primer número uno de una banda de K-pop en EE.UU.",
    "año": 2020,
    "categoria": "rock_pop"
  },
  {
    "id": 400,
    "titulo": "Levitating (Dua Lipa)",
    "descripcion_corta": "Hito del nu-disco ochentero del aclamado álbum Future Nostalgia.",
    "año": 2020,
    "categoria": "rock_pop"
  },
  {
    "id": 401,
    "titulo": "Drivers License (Olivia Rodrigo)",
    "descripcion_corta": "Sencillo debut que se convirtió en un fenómeno viral de streaming.",
    "año": 2021,
    "categoria": "rock_pop"
  },
  {
    "id": 402,
    "titulo": "Stay (The Kid LAROI & Justin Bieber)",
    "descripcion_corta": "Hit de synthpop veloz que dominó las listas globales en 2021.",
    "año": 2021,
    "categoria": "rock_pop"
  },
  {
    "id": 403,
    "titulo": "As It Was (Harry Styles)",
    "descripcion_corta": "Sencillo de synthpop indie que rompió récords de semanas en el número uno en 2022.",
    "año": 2022,
    "categoria": "rock_pop"
  },
  {
    "id": 404,
    "titulo": "Flowers (Miley Cyrus)",
    "descripcion_corta": "Himno pop de amor propio lanzado el día del cumpleaños de su exesposo.",
    "año": 2023,
    "categoria": "rock_pop"
  },
  {
    "id": 405,
    "titulo": "Cruel Summer (Taylor Swift)",
    "descripcion_corta": "Lanzada en 2019, se convirtió en sencillo y llegó al número uno en 2023 por su gira.",
    "año": 2019,
    "categoria": "rock_pop"
  },
  {
    "id": 406,
    "titulo": "Hound Dog (Big Mama Thornton)",
    "descripcion_corta": "La versión blues original que inspiraría la posterior de Elvis Presley.",
    "año": 1952,
    "categoria": "rock_pop"
  },
  {
    "id": 407,
    "titulo": "What'd I Say (Ray Charles)",
    "descripcion_corta": "Hito del rhythm and blues y soul fundacional que fusionó góspel y jazz.",
    "año": 1959,
    "categoria": "rock_pop"
  },
  {
    "id": 408,
    "titulo": "Will You Love Me Tomorrow (The Shirelles)",
    "descripcion_corta": "Primera canción de un grupo de mujeres en llegar al número uno de Billboard.",
    "año": 1960,
    "categoria": "rock_pop"
  },
  {
    "id": 409,
    "titulo": "Stand by Me (Ben E. King)",
    "descripcion_corta": "Clásico inmortal del soul con uno de los patrones de bajo más famosos.",
    "año": 1961,
    "categoria": "rock_pop"
  },
  {
    "id": 410,
    "titulo": "The Sound of Silence (Simon & Garfunkel)",
    "descripcion_corta": "Balada folk de armonías vocales que se convirtió en un éxito tras ser reeditada.",
    "año": 1964,
    "categoria": "rock_pop"
  },
  {
    "id": 411,
    "titulo": "My Girl (The Temptations)",
    "descripcion_corta": "Hito emblemático del sonido Motown compuesto por Smokey Robinson.",
    "año": 1964,
    "categoria": "rock_pop"
  },
  {
    "id": 412,
    "titulo": "California Dreamin' (The Mamas & the Papas)",
    "descripcion_corta": "Hito de folk-rock símbolo de la contracultura californiana de los sesenta.",
    "año": 1965,
    "categoria": "rock_pop"
  },
  {
    "id": 413,
    "titulo": "Paint It Black (The Rolling Stones)",
    "descripcion_corta": "Clásico de rock con el innovador sitar de Brian Jones marcando el ritmo.",
    "año": 1966,
    "categoria": "rock_pop"
  },
  {
    "id": 414,
    "titulo": "All Along the Watchtower (Jimi Hendrix)",
    "descripcion_corta": "El cover de Bob Dylan que el propio Dylan reconoció como superior.",
    "año": 1968,
    "categoria": "rock_pop"
  },
  {
    "id": 415,
    "titulo": "Hotel Room Service (Pitbull)",
    "descripcion_corta": "Hito de dance y rap latino de fiesta del productor de Miami.",
    "año": 2009,
    "categoria": "rock_pop"
  },
  {
    "id": 416,
    "titulo": "Super Freaky Girl (Nicki Minaj)",
    "descripcion_corta": "Hito de rap que samplea el clásico Super Freak de Rick James.",
    "año": 2022,
    "categoria": "rock_pop"
  },
  {
    "id": 417,
    "titulo": "Anti-Hero (Taylor Swift)",
    "descripcion_corta": "Sencillo principal del álbum Midnights de la prolífica artista pop.",
    "año": 2022,
    "categoria": "rock_pop"
  },
  {
    "id": 418,
    "titulo": "Rush (Troye Sivan)",
    "descripcion_corta": "Éxito dance electrónico del artista de pop australiano.",
    "año": 2023,
    "categoria": "rock_pop"
  },
  {
    "id": 419,
    "titulo": "Rock Pop Hit #119 (Artista Varios)",
    "descripcion_corta": "Descripción detallada del hit de Rock & Pop número 119.",
    "año": 1999,
    "categoria": "rock_pop"
  },
  {
    "id": 420,
    "titulo": "Rock Pop Hit #120 (Artista Varios)",
    "descripcion_corta": "Descripción detallada del hit de Rock & Pop número 120.",
    "año": 2000,
    "categoria": "rock_pop"
  },
  {
    "id": 421,
    "titulo": "Amor Eterno (Juan Gabriel)",
    "descripcion_corta": "Una de las rancheras y baladas mexicanas más famosas de la historia.",
    "año": 1984,
    "categoria": "latino"
  },
  {
    "id": 422,
    "titulo": "La Bifurcada (Memphis la Blusera)",
    "descripcion_corta": "Hito del blues en español argentino sobre rupturas cotidianas.",
    "año": 1986,
    "categoria": "latino"
  },
  {
    "id": 423,
    "titulo": "Lanza Perfume (Rita Lee)",
    "descripcion_corta": "Sencillo brasileño pop-disco que se bailó en toda Sudamérica.",
    "año": 1980,
    "categoria": "latino"
  },
  {
    "id": 424,
    "titulo": "El Baile de los que Sobran (Los Prisioneros)",
    "descripcion_corta": "Himno social chileno de la juventud marginada de los ochenta.",
    "año": 1986,
    "categoria": "latino"
  },
  {
    "id": 425,
    "titulo": "De Música Ligera (Soda Stereo)",
    "descripcion_corta": "La canción de rock en español más famosa, parte de Canción Animal.",
    "año": 1990,
    "categoria": "latino"
  },
  {
    "id": 426,
    "titulo": "Tren al Sur (Los Prisioneros)",
    "descripcion_corta": "Hito de synth-pop andino con sintetizadores y charango.",
    "año": 1990,
    "categoria": "latino"
  },
  {
    "id": 427,
    "titulo": "La Flaca (Jarabe de Palo)",
    "descripcion_corta": "Hito de rock latino español inspirado en un viaje del grupo a La Habana.",
    "año": 1996,
    "categoria": "latino"
  },
  {
    "id": 428,
    "titulo": "Macarena (Los del Río)",
    "descripcion_corta": "Fenómeno bailable mundial que llegó al número uno de Billboard por 14 semanas.",
    "año": 1993,
    "categoria": "latino"
  },
  {
    "id": 429,
    "titulo": "Ciega, Sordomuda (Shakira)",
    "descripcion_corta": "Primer gran éxito radial latinoamericano del álbum ¿Dónde están los ladrones?",
    "año": 1998,
    "categoria": "latino"
  },
  {
    "id": 430,
    "titulo": "Rayando el Sol (Maná)",
    "descripcion_corta": "La balada pop-rock que lanzó a la fama internacional a la banda mexicana.",
    "año": 1990,
    "categoria": "latino"
  },
  {
    "id": 431,
    "titulo": "La Incondicional (Luis Miguel)",
    "descripcion_corta": "Balada romántica cumbre de su carrera con un icónico videoclip militar.",
    "año": 1988,
    "categoria": "latino"
  },
  {
    "id": 432,
    "titulo": "Gasolina (Daddy Yankee)",
    "descripcion_corta": "El hit que internacionalizó el reggaetón en mercados angloparlantes.",
    "año": 2004,
    "categoria": "latino"
  },
  {
    "id": 433,
    "titulo": "Despacito (Luis Fonsi ft. Daddy Yankee)",
    "descripcion_corta": "El fenómeno pop latino más exitoso de la historia de YouTube y listas.",
    "año": 2017,
    "categoria": "latino"
  },
  {
    "id": 434,
    "titulo": "Danza Kuduro (Don Omar ft. Lucenzo)",
    "descripcion_corta": "Sencillo de reggaetón y dance que sonó en todas las discotecas latinas.",
    "año": 2010,
    "categoria": "latino"
  },
  {
    "id": 435,
    "titulo": "Waka Waka (Shakira)",
    "descripcion_corta": "Canción oficial de la Copa del Mundo de Sudáfrica, un hit global.",
    "año": 2010,
    "categoria": "latino"
  },
  {
    "id": 436,
    "titulo": "Mi Gente (J Balvin ft. Willy William)",
    "descripcion_corta": "Hito de reggaetón y moombahton que alcanzó el top global de Spotify.",
    "año": 2017,
    "categoria": "latino"
  },
  {
    "id": 437,
    "titulo": "La Bachata (Manuel Turizo)",
    "descripcion_corta": "Éxito masivo de bachata urbana del artista colombiano.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 438,
    "titulo": "Bzrp Music Sessions, Vol. 53 (Bizarrap & Shakira)",
    "descripcion_corta": "Sesión musical cargada de indirectas que rompió récords de streaming latino.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 439,
    "titulo": "Aserejé (Las Ketchup)",
    "descripcion_corta": "Canción de pop española con coreografía viral y letra misteriosa.",
    "año": 2002,
    "categoria": "latino"
  },
  {
    "id": 440,
    "titulo": "Oye Mi Amor (Maná)",
    "descripcion_corta": "Hito del pop-rock latino infaltable en conciertos de la banda.",
    "año": 1992,
    "categoria": "latino"
  },
  {
    "id": 441,
    "titulo": "Matador (Los Fabulosos Cadillacs)",
    "descripcion_corta": "Fusión de ska, rock y samba que se convirtió en himno del rock latino.",
    "año": 1993,
    "categoria": "latino"
  },
  {
    "id": 442,
    "titulo": "Vasos Vacíos (Los Fabulosos Cadillacs ft. Celia Cruz)",
    "descripcion_corta": "Mítica colaboración de ska y salsa grabada en Buenos Aires.",
    "año": 1988,
    "categoria": "latino"
  },
  {
    "id": 443,
    "titulo": "Mariposa Tecknicolor (Fito Páez)",
    "descripcion_corta": "Hito del rock argentino y clásico alegre del álbum Circo Beat.",
    "año": 1994,
    "categoria": "latino"
  },
  {
    "id": 444,
    "titulo": "Flaca (Andrés Calamaro)",
    "descripcion_corta": "Balada pop-rock de piano y guitarra del exitoso álbum Alta Suciedad.",
    "año": 1997,
    "categoria": "latino"
  },
  {
    "id": 445,
    "titulo": "Corazón Partío (Alejandro Sanz)",
    "descripcion_corta": "Hito flamenco-pop que batió récords de semanas en listas hispanas.",
    "año": 1997,
    "categoria": "latino"
  },
  {
    "id": 446,
    "titulo": "La Camisa Negra (Juanes)",
    "descripcion_corta": "Hito de pop-rock guasca colombiano que causó furor en Europa y América.",
    "año": 2004,
    "categoria": "latino"
  },
  {
    "id": 447,
    "titulo": "Lamento Boliviano (Enanitos Verdes)",
    "descripcion_corta": "El cover más escuchado de la banda de rock mendocina.",
    "año": 1994,
    "categoria": "latino"
  },
  {
    "id": 448,
    "titulo": "Dembow (Danny Ocean)",
    "descripcion_corta": "Sencillo independiente grabado en casa que se transformó en hit mundial.",
    "año": 2017,
    "categoria": "latino"
  },
  {
    "id": 449,
    "titulo": "Tusa (KAROL G & Nicki Minaj)",
    "descripcion_corta": "Hito urbano que popularizó el término de la melancolía por ruptura.",
    "año": 2019,
    "categoria": "latino"
  },
  {
    "id": 450,
    "titulo": "Pepas (Farruko)",
    "descripcion_corta": "Sencillo que fusiona guaracha y electrónica de fiesta, número uno en discotecas.",
    "año": 2021,
    "categoria": "latino"
  },
  {
    "id": 451,
    "titulo": "Safaera (Bad Bunny)",
    "descripcion_corta": "Hito de reggaetón de estructura cambiante y tributo al reggaetón clásico.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 452,
    "titulo": "Dakiti (Bad Bunny ft. Jhay Cortez)",
    "descripcion_corta": "Sencillo de reggaetón synthpop que lideró las listas globales.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 453,
    "titulo": "Limón y Sal (Julieta Venegas)",
    "descripcion_corta": "Hito del pop acústico con acordeón de la artista mexicana.",
    "año": 2006,
    "categoria": "latino"
  },
  {
    "id": 454,
    "titulo": "Eres para Mí (Julieta Venegas)",
    "descripcion_corta": "Colaboración pop con la rapera Anita Tijoux.",
    "año": 2006,
    "categoria": "latino"
  },
  {
    "id": 455,
    "titulo": "Bailando (Enrique Iglesias ft. Gente de Zona)",
    "descripcion_corta": "Éxito de pop latino y reggaetón con un popular videoclip en República Dominicana.",
    "año": 2014,
    "categoria": "latino"
  },
  {
    "id": 456,
    "titulo": "Livin' la Vida Loca (Ricky Martin)",
    "descripcion_corta": "Sencillo que lideró la llamada 'explosión del pop latino' en el mercado anglo.",
    "año": 1999,
    "categoria": "latino"
  },
  {
    "id": 457,
    "titulo": "A Dios le Pido (Juanes)",
    "descripcion_corta": "Oración pop-rock de ritmos colombianos por la paz y la familia.",
    "año": 2002,
    "categoria": "latino"
  },
  {
    "id": 458,
    "titulo": "La Tortura (Shakira ft. Alejandro Sanz)",
    "descripcion_corta": "Hito de reggaetón-pop que dominó el mercado latino durante 2005.",
    "año": 2005,
    "categoria": "latino"
  },
  {
    "id": 459,
    "titulo": "Obsesión (Aventura)",
    "descripcion_corta": "La bachata que internacionalizó al grupo de Romeo Santos en todo el mundo.",
    "año": 2002,
    "categoria": "latino"
  },
  {
    "id": 460,
    "titulo": "Me Gustas Tú (Manu Chao)",
    "descripcion_corta": "Sencillo bilingüe reggae-pop con ritmo constante y pegajoso.",
    "año": 2001,
    "categoria": "latino"
  },
  {
    "id": 461,
    "titulo": "Duende (Aleste)",
    "descripcion_corta": "Una de las baladas de pop-rock chileno más exitosas de los años noventa.",
    "año": 1993,
    "categoria": "latino"
  },
  {
    "id": 462,
    "titulo": "Estrechez de Corazón (Los Prisioneros)",
    "descripcion_corta": "Clásico con coros operáticos y solo de guitarra del disco Corazones.",
    "año": 1990,
    "categoria": "latino"
  },
  {
    "id": 463,
    "titulo": "Locura (Virus)",
    "descripcion_corta": "Álbum y hito de synthpop argentino que marcó el destape tras la dictadura.",
    "año": 1985,
    "categoria": "latino"
  },
  {
    "id": 464,
    "titulo": "Mil Horas (Los Abuelos de la Nada)",
    "descripcion_corta": "Clásico pop-rock compuesto por Andrés Calamaro en Argentina.",
    "año": 1983,
    "categoria": "latino"
  },
  {
    "id": 465,
    "titulo": "Persiana Americana (Soda Stereo)",
    "descripcion_corta": "Hito del álbum Signos e infaltable del trío de rock argentino.",
    "año": 1986,
    "categoria": "latino"
  },
  {
    "id": 466,
    "titulo": "Cuando Pase el Temblor (Soda Stereo)",
    "descripcion_corta": "Fusión de new wave con ritmos andinos y carnavalito.",
    "año": 1985,
    "categoria": "latino"
  },
  {
    "id": 467,
    "titulo": "Gimme the Power (Molotov)",
    "descripcion_corta": "Canción de fuerte crítica política y social a los gobiernos mexicanos.",
    "año": 1997,
    "categoria": "latino"
  },
  {
    "id": 468,
    "titulo": "Frijolero (Molotov)",
    "descripcion_corta": "Crítica fronteriza humorística sobre las relaciones México-EE.UU.",
    "año": 2003,
    "categoria": "latino"
  },
  {
    "id": 469,
    "titulo": "Pachuco (Maldita Vecindad)",
    "descripcion_corta": "Hito de ska y rock mexicano sobre las diferencias generacionales.",
    "año": 1991,
    "categoria": "latino"
  },
  {
    "id": 470,
    "titulo": "Kumbala (Maldita Vecindad)",
    "descripcion_corta": "Clásico bolero-ska mexicano de atmósfera nocturna.",
    "año": 1991,
    "categoria": "latino"
  },
  {
    "id": 471,
    "titulo": "Chilanga Banda (Café Tacvba)",
    "descripcion_corta": "Hito del hip-hop mexicano cantado completamente en jerga del DF.",
    "año": 1996,
    "categoria": "latino"
  },
  {
    "id": 472,
    "titulo": "Ingrata (Café Tacvba)",
    "descripcion_corta": "Corrido-ska humorístico que fue uno de sus primeros éxitos radiales.",
    "año": 1994,
    "categoria": "latino"
  },
  {
    "id": 473,
    "titulo": "Eres (Café Tacvba)",
    "descripcion_corta": "Balada rock ganadora del Grammy Latino, cantada por Emmanuel del Real.",
    "año": 2003,
    "categoria": "latino"
  },
  {
    "id": 474,
    "titulo": "El Duelo (La Ley)",
    "descripcion_corta": "Sencillo del exitoso álbum Invisible de la banda de rock chilena.",
    "año": 1995,
    "categoria": "latino"
  },
  {
    "id": 475,
    "titulo": "Doble Opuesto (La Ley)",
    "descripcion_corta": "Primer gran éxito de la banda de Beto Cuevas tras la partida de Bobe.",
    "año": 1991,
    "categoria": "latino"
  },
  {
    "id": 476,
    "titulo": "He Barrido el Sol (Los Tres)",
    "descripcion_corta": "El sencillo de pop-rock más coreado de la banda penquista.",
    "año": 1993,
    "categoria": "latino"
  },
  {
    "id": 477,
    "titulo": "Déjate Caer (Los Tres)",
    "descripcion_corta": "Canción del álbum La Espada & la Pared con atmósfera melancólica.",
    "año": 1995,
    "categoria": "latino"
  },
  {
    "id": 478,
    "titulo": "Un Amor Violento (Los Tres)",
    "descripcion_corta": "Bolero-rock romántico emblemático compuesto por Álvaro Henríquez.",
    "año": 1991,
    "categoria": "latino"
  },
  {
    "id": 479,
    "titulo": "Fe (Jorge González)",
    "descripcion_corta": "Balada romántica solista del líder de Los Prisioneros tras disolverse la banda.",
    "año": 1993,
    "categoria": "latino"
  },
  {
    "id": 480,
    "titulo": "Mío (Paulina Rubio)",
    "descripcion_corta": "Hito de pop con el que debutó de solista la llamada 'Chica Dorada'.",
    "año": 1992,
    "categoria": "latino"
  },
  {
    "id": 481,
    "titulo": "Azúcar Amargo (Fey)",
    "descripcion_corta": "Éxito adolescente del pop mexicano de los noventa con su famosa coreografía.",
    "año": 1996,
    "categoria": "latino"
  },
  {
    "id": 482,
    "titulo": "Provócame (Chayanne)",
    "descripcion_corta": "Hito bailable pop que desató la histeria de sus fanáticas latinoamericanas.",
    "año": 1992,
    "categoria": "latino"
  },
  {
    "id": 483,
    "titulo": "Torero (Chayanne)",
    "descripcion_corta": "Hito dance-pop latino con un acelerado videoclip grabado en las calles de Buenos Aires.",
    "año": 2002,
    "categoria": "latino"
  },
  {
    "id": 484,
    "titulo": "Papi Chulo... Te Traigo el Mmm (Lorna)",
    "descripcion_corta": "Hito de reggaetón panameño precursor de la explosión del género.",
    "año": 2003,
    "categoria": "latino"
  },
  {
    "id": 485,
    "titulo": "Lo que Pasó, Pasó (Daddy Yankee)",
    "descripcion_corta": "Hito de reggaetón con acordeón tropical del disco Barrio Fino.",
    "año": 2004,
    "categoria": "latino"
  },
  {
    "id": 486,
    "titulo": "Ella Me Levantó (Daddy Yankee)",
    "descripcion_corta": "Fusión bailable de reggaetón con salsa urbana.",
    "año": 2007,
    "categoria": "latino"
  },
  {
    "id": 487,
    "titulo": "Mayor Que Yo (Baby Ranks, Tonny Tun Tun, Wisin & Yandel, Daddy Yankee)",
    "descripcion_corta": "Hito del reggaetón escolar del disco Mas Flow 2.",
    "año": 2005,
    "categoria": "latino"
  },
  {
    "id": 488,
    "titulo": "Rakata (Wisin & Yandel)",
    "descripcion_corta": "Sencillo de reggaetón duro que rompió listas latinas.",
    "año": 2005,
    "categoria": "latino"
  },
  {
    "id": 489,
    "titulo": "Noche de Entierro (Tony Dize, Wisin & Yandel, Daddy Yankee, Hector El Father)",
    "descripcion_corta": "Hito de reggaetón romántico con flauta andina.",
    "año": 2006,
    "categoria": "latino"
  },
  {
    "id": 490,
    "titulo": "Sexy Movimiento (Wisin & Yandel)",
    "descripcion_corta": "Hito de reggaetón electrónico del álbum Los Extraterrestres.",
    "año": 2007,
    "categoria": "latino"
  },
  {
    "id": 491,
    "titulo": "El Doctorado (Tony Dize)",
    "descripcion_corta": "Hito de reggaetón romántico y bachata urbana.",
    "año": 2009,
    "categoria": "latino"
  },
  {
    "id": 492,
    "titulo": "Taboo (Don Omar)",
    "descripcion_corta": "Hito dance latino que samplea la famosa lambada brasileña.",
    "año": 2011,
    "categoria": "latino"
  },
  {
    "id": 493,
    "titulo": "Te Boté (Remix)",
    "descripcion_corta": "El megaéxito de trap y reggaetón que popularizó el formato remix extendido.",
    "año": 2018,
    "categoria": "latino"
  },
  {
    "id": 494,
    "titulo": "Callaíta (Bad Bunny)",
    "descripcion_corta": "Hito de reggaetón veraniego e independiente.",
    "año": 2019,
    "categoria": "latino"
  },
  {
    "id": 495,
    "titulo": "Yo Perreo Sola (Bad Bunny)",
    "descripcion_corta": "Sencillo de reggaetón con fuerte mensaje de consentimiento femenino.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 496,
    "titulo": "Hawái (Maluma)",
    "descripcion_corta": "Hito de pop urbano sobre rupturas amorosas y redes sociales.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 497,
    "titulo": "Provenza (KAROL G)",
    "descripcion_corta": "Sencillo de pop afrobeats y reggaetón de la exitosa colombiana.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 498,
    "titulo": "Gatúbela (KAROL G ft. Maldy)",
    "descripcion_corta": "Hito de reggaetón de la vieja escuela.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 499,
    "titulo": "Beso (ROSALÍA & Rauw Alejandro)",
    "descripcion_corta": "Colaboración pop que sirvió para anunciar su compromiso matrimonial.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 500,
    "titulo": "Un x100to (Grupo Frontera & Bad Bunny)",
    "descripcion_corta": "Fusión de música norteña mexicana con la superestrella urbana.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 501,
    "titulo": "Ella Baila Sola (Eslabon Armado & Peso Pluma)",
    "descripcion_corta": "El corrido tumbado que se convirtió en la primera canción del género en liderar listas globales.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 502,
    "titulo": "Lulú (Jere Klein)",
    "descripcion_corta": "Hito del movimiento urbano chileno que dominó los ránkings de Spotify local.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 503,
    "titulo": "Ando (Jere Klein)",
    "descripcion_corta": "Éxito de reggaetón chileno que se internacionalizó en América Latina.",
    "año": 2023,
    "categoria": "latino"
  },
  {
    "id": 504,
    "titulo": "Una Noche en Medellín (Cris Mj)",
    "descripcion_corta": "Hito del reggaetón chileno que se hizo viral en TikTok mundialmente.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 505,
    "titulo": "Marisola (Remix)",
    "descripcion_corta": "Remix chileno-argentino que lideró ránkings sudamericanos.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 506,
    "titulo": "La Terapia (Young Cister)",
    "descripcion_corta": "Hito de pop urbano del artista de Quilicura, un éxito en radio y streaming.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 507,
    "titulo": "Caminemos de la Mano (Young Cister & Pailita)",
    "descripcion_corta": "Colaboración romántica urbana muy exitosa en el país.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 508,
    "titulo": "Ultra Solo (Polimá Westcoast & Pailita)",
    "descripcion_corta": "Hito del reggaetón chileno, uno de los virales latinos más grandes de ese año.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 509,
    "titulo": "Ultra Solo (Remix)",
    "descripcion_corta": "Remix estelar que consolidó el hit en todo el continente.",
    "año": 2022,
    "categoria": "latino"
  },
  {
    "id": 510,
    "titulo": "Dimelo Ma (Marcianeke ft. Pailita)",
    "descripcion_corta": "El sencillo que catapultó a Marcianeke y al trap chileno al mainstream.",
    "año": 2021,
    "categoria": "latino"
  },
  {
    "id": 511,
    "titulo": "Los Malvekes (Marcianeke, Cris Mj, Simon La Letra)",
    "descripcion_corta": "Hito del trap maleanteo chileno.",
    "año": 2021,
    "categoria": "latino"
  },
  {
    "id": 512,
    "titulo": "Mi Gata (Standly)",
    "descripcion_corta": "Sencillo bailable que causó furor en discotecas nacionales.",
    "año": 2021,
    "categoria": "latino"
  },
  {
    "id": 513,
    "titulo": "Not Steady (Paloma Mami)",
    "descripcion_corta": "Sencillo debut independiente que fusionó R&B, dancehall y pop latino.",
    "año": 2018,
    "categoria": "latino"
  },
  {
    "id": 514,
    "titulo": "Fingías (Paloma Mami)",
    "descripcion_corta": "Sencillo de pop urbano con un cuidado apartado visual en videoclip.",
    "año": 2019,
    "categoria": "latino"
  },
  {
    "id": 515,
    "titulo": "No Te Enamores (Paloma Mami)",
    "descripcion_corta": "Hito urbano de la chileno-estadounidense con gran repercusión internacional.",
    "año": 2018,
    "categoria": "latino"
  },
  {
    "id": 516,
    "titulo": "Santería (Lola Indigo, Danna Paola, Denise Rosenthal)",
    "descripcion_corta": "Colaboración pop internacional femenina con gran éxito radial.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 517,
    "titulo": "Tiene Sabor (Denise Rosenthal)",
    "descripcion_corta": "Himno pop chileno sobre la aceptación corporal femenina.",
    "año": 2020,
    "categoria": "latino"
  },
  {
    "id": 518,
    "titulo": "Lucha en Equilibrio (Denise Rosenthal)",
    "descripcion_corta": "Hito de pop-dance con lírica feminista.",
    "año": 2018,
    "categoria": "latino"
  },
  {
    "id": 519,
    "titulo": "Cambio de Piel (Denise Rosenthal)",
    "descripcion_corta": "Sencillo pop que marcó su regreso discográfico triunfal.",
    "año": 2017,
    "categoria": "latino"
  },
  {
    "id": 520,
    "titulo": "Aquí Estoy (Cami)",
    "descripcion_corta": "Hito folk-pop de la cantautora nacional ganadora de premios.",
    "año": 2019,
    "categoria": "latino"
  },
  {
    "id": 521,
    "titulo": "Querida Rosa (Cami)",
    "descripcion_corta": "Emotiva balada que sirvió de sencillo en su álbum debut Rosa.",
    "año": 2018,
    "categoria": "latino"
  },
  {
    "id": 521,
    "titulo": "Todos Juntos (Los Jaivas)",
    "descripcion_corta": "Hito del folklore y rock psicodélico que clama por la fraternidad latinoamericana.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 522,
    "titulo": "La Joya del Pacífico (Jorge Farías)",
    "descripcion_corta": "La interpretación emblemática del vals considerado himno de Valparaíso.",
    "año": 1966,
    "categoria": "clasicos"
  },
  {
    "id": 523,
    "titulo": "Hijo del Sol Luminoso (Congreso)",
    "descripcion_corta": "Composición andina y rock de Joe Vasconcellos para la banda nacional.",
    "año": 1981,
    "categoria": "clasicos"
  },
  {
    "id": 524,
    "titulo": "Gracias a la Vida (Violeta Parra)",
    "descripcion_corta": "Una de las canciones más importantes de la Nueva Canción Chilena y del folclor mundial.",
    "año": 1966,
    "categoria": "clasicos"
  },
  {
    "id": 525,
    "titulo": "Volver a los 17 (Violeta Parra)",
    "descripcion_corta": "Clásica composición folclórica sobre el amor y el rejuvenecimiento.",
    "año": 1966,
    "categoria": "clasicos"
  },
  {
    "id": 526,
    "titulo": "El Aparecido (Víctor Jara)",
    "descripcion_corta": "Hito dedicado a la figura del Che Guevara antes de su muerte.",
    "año": 1967,
    "categoria": "clasicos"
  },
  {
    "id": 527,
    "titulo": "Te Recuerdo Amanda (Víctor Jara)",
    "descripcion_corta": "Poética balada acústica sobre el amor obrero y las precarias condiciones laborales.",
    "año": 1969,
    "categoria": "clasicos"
  },
  {
    "id": 528,
    "titulo": "Plegaria a un Labrador (Víctor Jara)",
    "descripcion_corta": "Clamor folclórico y social que ganó el festival de la Nueva Canción Chilena.",
    "año": 1969,
    "categoria": "clasicos"
  },
  {
    "id": 529,
    "titulo": "Mira Niñita (Los Jaivas)",
    "descripcion_corta": "Balada andina de guitarra acústica y flauta que progresa a rock sinfónico.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 530,
    "titulo": "Sube a Nacer Conmigo Hermano (Los Jaivas)",
    "descripcion_corta": "Hito del disco Alturas de Macchu Picchu basado en poemas de Pablo Neruda.",
    "año": 1981,
    "categoria": "clasicos"
  },
  {
    "id": 531,
    "titulo": "La Conquistada (Los Jaivas)",
    "descripcion_corta": "Obra de rock progresivo y psicodelia del disco La Ventana.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 532,
    "titulo": "Mambo de Machaguay (Los Jaivas)",
    "descripcion_corta": "Bailable andino folclórico muy popular en el repertorio de la banda.",
    "año": 1981,
    "categoria": "clasicos"
  },
  {
    "id": 533,
    "titulo": "El Tiempo en las Bastillas (Fernando Ubiergo)",
    "descripcion_corta": "Balada ganadora del Festival de Viña que evoca el paso del tiempo en el país.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 534,
    "titulo": "La Locomotora (Congreso)",
    "descripcion_corta": "Obra instrumental andina e instrumental de fusión jazz-rock.",
    "año": 1984,
    "categoria": "clasicos"
  },
  {
    "id": 535,
    "titulo": "En todas las esquinas (Congreso)",
    "descripcion_corta": "Canción de celebración demócrata con ritmos latinoamericanos.",
    "año": 1989,
    "categoria": "clasicos"
  },
  {
    "id": 536,
    "titulo": "Huellas (Joe Vasconcellos)",
    "descripcion_corta": "Sencillo de su exitoso álbum en vivo Toque, mezcla de cumbia, pop y samba.",
    "año": 1995,
    "categoria": "clasicos"
  },
  {
    "id": 537,
    "titulo": "Mágico (Joe Vasconcellos)",
    "descripcion_corta": "Clásico alegre y playero infaltable del cantautor chileno.",
    "año": 1995,
    "categoria": "clasicos"
  },
  {
    "id": 538,
    "titulo": "Prende el Fuego (Joe Vasconcellos)",
    "descripcion_corta": "Hito tropical del disco Transformación.",
    "año": 1997,
    "categoria": "clasicos"
  },
  {
    "id": 539,
    "titulo": "Sed de Gol (Joe Vasconcellos)",
    "descripcion_corta": "Canción de fútbol muy popular lanzada para el mundial de Francia.",
    "año": 1998,
    "categoria": "clasicos"
  },
  {
    "id": 540,
    "titulo": "Chica de Humo (Emmanuel)",
    "descripcion_corta": "Hito de pop sintético mexicano con el que Emmanuel dominó los ránkings latinos.",
    "año": 1989,
    "categoria": "clasicos"
  },
  {
    "id": 541,
    "titulo": "Querida (Juan Gabriel)",
    "descripcion_corta": "Éxito romántico de mariachi-pop que permaneció meses en listas mexicanas.",
    "año": 1984,
    "categoria": "clasicos"
  },
  {
    "id": 542,
    "titulo": "Hasta que te Conocí (Juan Gabriel)",
    "descripcion_corta": "Emotiva y dramática balada ranchera del Divo de Juárez.",
    "año": 1986,
    "categoria": "clasicos"
  },
  {
    "id": 543,
    "titulo": "Así Fue (Isabel Pantoja)",
    "descripcion_corta": "Balada compuesta por Juan Gabriel que se transformó en clásico romántico.",
    "año": 1988,
    "categoria": "clasicos"
  },
  {
    "id": 544,
    "titulo": "La Bilirrubina (Juan Luis Guerra)",
    "descripcion_corta": "Merengue caribeño que introdujo el sonido dominicano a nivel mundial.",
    "año": 1990,
    "categoria": "clasicos"
  },
  {
    "id": 545,
    "titulo": "Burbujas de Amor (Juan Luis Guerra)",
    "descripcion_corta": "Famosísima bachata poética sobre peces y agua.",
    "año": 1990,
    "categoria": "clasicos"
  },
  {
    "id": 546,
    "titulo": "Ojalá que Llueva Café (Juan Luis Guerra)",
    "descripcion_corta": "Merengue-son folclórico que clama por la prosperidad del campo latino.",
    "año": 1989,
    "categoria": "clasicos"
  },
  {
    "id": 547,
    "titulo": "Bachata Rosa (Juan Luis Guerra)",
    "descripcion_corta": "Balada-bachata que le dio el nombre a su álbum más exitoso.",
    "año": 1990,
    "categoria": "clasicos"
  },
  {
    "id": 548,
    "titulo": "Pedro Navaja (Rubén Blades & Willie Colón)",
    "descripcion_corta": "Salsa de narrativa urbana inspirada en la ópera de tres centavos.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 549,
    "titulo": "Plástico (Rubén Blades & Willie Colón)",
    "descripcion_corta": "Crítica bailable a la superficialidad de la sociedad moderna latina.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 550,
    "titulo": "El Cantante (Héctor Lavoe)",
    "descripcion_corta": "Salsa compuesta por Rubén Blades que se convirtió en la firma de Lavoe.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 551,
    "titulo": "La Rebelión (Joe Arroyo)",
    "descripcion_corta": "Salsa con un potente relato histórico sobre la esclavitud en Cartagena.",
    "año": 1986,
    "categoria": "clasicos"
  },
  {
    "id": 552,
    "titulo": "Vivir Mi Vida (Marc Anthony)",
    "descripcion_corta": "Himno de salsa pop optimista del cantante puertorriqueño.",
    "año": 2013,
    "categoria": "clasicos"
  },
  {
    "id": 553,
    "titulo": "Valió la Pena (Marc Anthony)",
    "descripcion_corta": "Sencillo de salsa bailable y romántica muy exitoso.",
    "año": 2004,
    "categoria": "clasicos"
  },
  {
    "id": 554,
    "titulo": "Y cómo es él (José Luis Perales)",
    "descripcion_corta": "Balada española de celos y despecho escrita originalmente para Julio Iglesias.",
    "año": 1982,
    "categoria": "clasicos"
  },
  {
    "id": 555,
    "titulo": "El Triste (José José)",
    "descripcion_corta": "Legendaria interpretación vocal del Príncipe de la Canción en el festival OTI.",
    "año": 1970,
    "categoria": "clasicos"
  },
  {
    "id": 556,
    "titulo": "Gavilán o Paloma (José José)",
    "descripcion_corta": "Clásico balada pop del artista mexicano sobre la seducción frustrada.",
    "año": 1977,
    "categoria": "clasicos"
  },
  {
    "id": 557,
    "titulo": "40 y 20 (José José)",
    "descripcion_corta": "Balada que relata una relación de pareja con diferencia de edad.",
    "año": 1992,
    "categoria": "clasicos"
  },
  {
    "id": 558,
    "titulo": "Un Beso y una Flor (Nino Bravo)",
    "descripcion_corta": "Emotiva balada pop española de despedida y esperanza.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 559,
    "titulo": "Libre (Nino Bravo)",
    "descripcion_corta": "Himno a la libertad inspirado en la caída de personas en el Muro de Berlín.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 560,
    "titulo": "Noelia (Nino Bravo)",
    "descripcion_corta": "Orquestada balada dedicada a una mujer inalcanzable.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 561,
    "titulo": "Te quiero (José Luis Perales)",
    "descripcion_corta": "Balada poética de amor muy popular en España y América.",
    "año": 1981,
    "categoria": "clasicos"
  },
  {
    "id": 562,
    "titulo": "América, América (Nino Bravo)",
    "descripcion_corta": "Lanzada póstumamente, oda de agradecimiento al continente americano.",
    "año": 1973,
    "categoria": "clasicos"
  },
  {
    "id": 563,
    "titulo": "La Distancia (Roberto Carlos)",
    "descripcion_corta": "Balada romántica brasileña de gran éxito internacional.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 564,
    "titulo": "Detalles (Roberto Carlos)",
    "descripcion_corta": "Balada nostálgica de piano y voz muy recordada del cantautor brasileño.",
    "año": 1971,
    "categoria": "clasicos"
  },
  {
    "id": 565,
    "titulo": "Jesucristo (Roberto Carlos)",
    "descripcion_corta": "Hito de rock religioso del cantante brasileño.",
    "año": 1970,
    "categoria": "clasicos"
  },
  {
    "id": 566,
    "titulo": "El Gato que está Triste y Azul (Roberto Carlos)",
    "descripcion_corta": "Balada melancólica infantil y romántica popularizada en español.",
    "año": 1972,
    "categoria": "clasicos"
  },
  {
    "id": 567,
    "titulo": "Cama y Mesa (Roberto Carlos)",
    "descripcion_corta": "Balada romántica bailable y alegre.",
    "año": 1981,
    "categoria": "clasicos"
  },
  {
    "id": 568,
    "titulo": "El Rock del Mundial (Los Ramblers)",
    "descripcion_corta": "El rock and roll que sirvió de himno oficial para el Mundial de Fútbol de Chile.",
    "año": 1962,
    "categoria": "clasicos"
  },
  {
    "id": 569,
    "titulo": "La Consentida (Jaime Atria)",
    "descripcion_corta": "Cueca ganadora del Festival de Viña del Mar, un clásico patrio de Fiestas Patrias.",
    "año": 1961,
    "categoria": "clasicos"
  },
  {
    "id": 570,
    "titulo": "Volver a Empezar (Alejandro Lerner)",
    "descripcion_corta": "Balada de piano motivacional del compositor argentino.",
    "año": 1997,
    "categoria": "clasicos"
  },
  {
    "id": 571,
    "titulo": "Todo a Pulmón (Alejandro Lerner)",
    "descripcion_corta": "Hito del rock y la trova argentina sobre la persistencia.",
    "año": 1982,
    "categoria": "clasicos"
  },
  {
    "id": 572,
    "titulo": "Solo le Pido a Dios (León Gieco)",
    "descripcion_corta": "Canción de trova folk argentina que clama por la paz frente al conflicto del Beagle.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 573,
    "titulo": "Y dale alegría a mi corazón (Fito Páez)",
    "descripcion_corta": "Clásico de rock-trova cantado en estadios y reuniones del continente.",
    "año": 1990,
    "categoria": "clasicos"
  },
  {
    "id": 574,
    "titulo": "El Amor después del Amor (Fito Páez)",
    "descripcion_corta": "Hito inicial del disco de rock argentino más vendido de la historia.",
    "año": 1992,
    "categoria": "clasicos"
  },
  {
    "id": 575,
    "titulo": "Dar es Dar (Fito Páez)",
    "descripcion_corta": "Tema pop alegre sobre la reciprocidad.",
    "año": 1996,
    "categoria": "clasicos"
  },
  {
    "id": 576,
    "titulo": "Circo Beat (Fito Páez)",
    "descripcion_corta": "Hito nostálgico de infancia del artista rosarino.",
    "año": 1994,
    "categoria": "clasicos"
  },
  {
    "id": 577,
    "titulo": "Seminare (Serú Girán)",
    "descripcion_corta": "Balada de piano de Charly García grabada con su supergrupo argentino.",
    "año": 1978,
    "categoria": "clasicos"
  },
  {
    "id": 578,
    "titulo": "Inconsciente Colectivo (Charly García)",
    "descripcion_corta": "Balada esperanzadora grabada al término de la Guerra de las Malvinas.",
    "año": 1982,
    "categoria": "clasicos"
  },
  {
    "id": 579,
    "titulo": "Demoliendo Hoteles (Charly García)",
    "descripcion_corta": "Hito energético de su etapa solista post-dictadura en Argentina.",
    "año": 1984,
    "categoria": "clasicos"
  },
  {
    "id": 580,
    "titulo": "Nos Siguen Pegando Abajo (Charly García)",
    "descripcion_corta": "Clásico synthpop sobre la represión policial del disco Clics Modernos.",
    "año": 1983,
    "categoria": "clasicos"
  },
  {
    "id": 581,
    "titulo": "No me dejan salir (Charly García)",
    "descripcion_corta": "Hito rítmico destacado por su sampler de James Brown.",
    "año": 1983,
    "categoria": "clasicos"
  },
  {
    "id": 582,
    "titulo": "Los Dinosaurios (Charly García)",
    "descripcion_corta": "Poético relato sobre los desaparecidos por la dictadura militar.",
    "año": 1983,
    "categoria": "clasicos"
  },
  {
    "id": 583,
    "titulo": "Chipi Chipi (Charly García)",
    "descripcion_corta": "Hito de pop alegre del álbum La Hija de la Lágrima.",
    "año": 1994,
    "categoria": "clasicos"
  },
  {
    "id": 584,
    "titulo": "Rezo por Vos (Charly García & Luis Alberto Spinetta)",
    "descripcion_corta": "Histórica colaboración entre los dos titanes del rock argentino.",
    "año": 1986,
    "categoria": "clasicos"
  },
  {
    "id": 585,
    "titulo": "Seguir Viviendo sin tu Amor (Luis Alberto Spinetta)",
    "descripcion_corta": "La balada pop-rock más conocida y radial del Flaco Spinetta.",
    "año": 1991,
    "categoria": "clasicos"
  },
  {
    "id": 586,
    "titulo": "Muchacha Ojos de Papel (Almendra)",
    "descripcion_corta": "Himno fundacional de la trova y rock acústico argentino.",
    "año": 1969,
    "categoria": "clasicos"
  },
  {
    "id": 587,
    "titulo": "Barro Tal Vez (Luis Alberto Spinetta)",
    "descripcion_corta": "Zamba-trova compuesta en su adolescencia con gran intensidad lírica.",
    "año": 1982,
    "categoria": "clasicos"
  },
  {
    "id": 588,
    "titulo": "Bajan (Luis Alberto Spinetta)",
    "descripcion_corta": "Tema clásico de rock del álbum Artaud, versionado luego por Gustavo Cerati.",
    "año": 1973,
    "categoria": "clasicos"
  },
  {
    "id": 589,
    "titulo": "Té para Tres (Soda Stereo)",
    "descripcion_corta": "Balada acústica inspirada en la enfermedad del padre de Gustavo Cerati.",
    "año": 1990,
    "categoria": "clasicos"
  },
  {
    "id": 590,
    "titulo": "Trátame Suavemente (Soda Stereo)",
    "descripcion_corta": "Balada pop-rock de Daniel Melero grabada para el álbum debut del trío.",
    "año": 1984,
    "categoria": "clasicos"
  },
  {
    "id": 591,
    "titulo": "Juegos de Seducción (Soda Stereo)",
    "descripcion_corta": "Hito rítmico del álbum Nada Personal.",
    "año": 1985,
    "categoria": "clasicos"
  },
  {
    "id": 592,
    "titulo": "En la Ciudad de la Furia (Soda Stereo)",
    "descripcion_corta": "Hito de guitarras oscuras ambientado en un Buenos Aires mítico.",
    "año": 1988,
    "categoria": "clasicos"
  },
  {
    "id": 593,
    "titulo": "Un Misil en mi Placard (Soda Stereo)",
    "descripcion_corta": "Hito del EP Languis y recordada versión Unplugged de 1996.",
    "año": 1986,
    "categoria": "clasicos"
  },
  {
    "id": 594,
    "titulo": "Zoom (Soda Stereo)",
    "descripcion_corta": "Sencillo alternativo con samples de batería del álbum Sueño Stereo.",
    "año": 1995,
    "categoria": "clasicos"
  },
  {
    "id": 595,
    "titulo": "Ella Usó mi Cabeza como un Revólver (Soda Stereo)",
    "descripcion_corta": "Hito de rock con violines ganadora de premios MTV.",
    "año": 1995,
    "categoria": "clasicos"
  },
  {
    "id": 596,
    "titulo": "Puente (Gustavo Cerati)",
    "descripcion_corta": "La balada solista más exitosa de Cerati del aclamado álbum Bocanada.",
    "año": 1999,
    "categoria": "clasicos"
  },
  {
    "id": 597,
    "titulo": "Crimen (Gustavo Cerati)",
    "descripcion_corta": "Balada de piano ganadora del Grammy del álbum Ahí Vamos.",
    "año": 2006,
    "categoria": "clasicos"
  },
  {
    "id": 598,
    "titulo": "Adiós (Gustavo Cerati)",
    "descripcion_corta": "Tema sobre el crecimiento personal tras separarse de una pareja.",
    "año": 2006,
    "categoria": "clasicos"
  },
  {
    "id": 599,
    "titulo": "Déjà vu (Gustavo Cerati)",
    "descripcion_corta": "Hito de rock directo del que sería su último álbum Fuerza Natural.",
    "año": 2009,
    "categoria": "clasicos"
  },
  {
    "id": 600,
    "titulo": "Rap de las Hormigas (Charly García)",
    "descripcion_corta": "Fusión de pop, rock y rap experimental chileno-argentino.",
    "año": 1987,
    "categoria": "clasicos"
  }
];

const CARDS_PELICULAS = [
  {
    "id": 601,
    "titulo": "Ciudadano Kane (Orson Welles)",
    "descripcion_corta": "Obra maestra que revolucionó la profundidad de campo y narrativa del cine.",
    "año": 1941,
    "categoria": "clasico"
  },
  {
    "id": 602,
    "titulo": "Casablanca (Michael Curtiz)",
    "descripcion_corta": "Clásico romántico y dramático de la 2ª Guerra Mundial con Bogart e Bergman.",
    "año": 1942,
    "categoria": "clasico"
  },
  {
    "id": 603,
    "titulo": "Psicosis (Alfred Hitchcock)",
    "descripcion_corta": "Thriller de terror sicológico pionero en la estructura del cine moderno.",
    "año": 1960,
    "categoria": "clasico"
  },
  {
    "id": 604,
    "titulo": "El Padrino (Francis Ford Coppola)",
    "descripcion_corta": "Aclamada adaptación de la novela mafiosa de Mario Puzo con Marlon Brando.",
    "año": 1972,
    "categoria": "clasico"
  },
  {
    "id": 605,
    "titulo": "Tiburón (Steven Spielberg)",
    "descripcion_corta": "Película de terror marítimo que inventó el concepto de Blockbuster veraniego.",
    "año": 1975,
    "categoria": "clasico"
  },
  {
    "id": 606,
    "titulo": "Star Wars: Episodio IV - Una Nueva Esperanza (George Lucas)",
    "descripcion_corta": "Ópera espacial que cambió los efectos especiales y el mercadeo de cine.",
    "año": 1977,
    "categoria": "clasico"
  },
  {
    "id": 607,
    "titulo": "El Resplandor (Stanley Kubrick)",
    "descripcion_corta": "Atmósferico filme de terror sicológico adaptado de Stephen King.",
    "año": 1980,
    "categoria": "clasico"
  },
  {
    "id": 608,
    "titulo": "E.T., el extraterrestre (Steven Spielberg)",
    "descripcion_corta": "Aventura de ciencia ficción familiar sobre la amistad de un niño y un alienígena.",
    "año": 1982,
    "categoria": "clasico"
  },
  {
    "id": 609,
    "titulo": "Volver al Futuro (Robert Zemeckis)",
    "descripcion_corta": "Comedia de ciencia ficción sobre viajes temporales a bordo de un DeLorean.",
    "año": 1985,
    "categoria": "clasico"
  },
  {
    "id": 610,
    "titulo": "Luces de la Ciudad (Charles Chaplin)",
    "descripcion_corta": "Comedia romántica muda considerada una de las cumbres de Chaplin.",
    "año": 1931,
    "categoria": "clasico"
  },
  {
    "id": 611,
    "titulo": "Tiempos Modernos (Charles Chaplin)",
    "descripcion_corta": "Crítica satírica a la industrialización y maquinación del trabajo obrero.",
    "año": 1936,
    "categoria": "clasico"
  },
  {
    "id": 612,
    "titulo": "Lo que el Viento se Llevó (Victor Fleming)",
    "descripcion_corta": "Épica romántica ambientada en la Guerra Civil de EE.UU.",
    "año": 1939,
    "categoria": "clasico"
  },
  {
    "id": 613,
    "titulo": "El Mago de Oz (Victor Fleming)",
    "descripcion_corta": "Fantasía musical infantil que popularizó el Technicolor.",
    "año": 1939,
    "categoria": "clasico"
  },
  {
    "id": 614,
    "titulo": "Cantando bajo la Lluvia (Gene Kelly)",
    "descripcion_corta": "El musical de Hollywood por excelencia, ambientado en la llegada del cine sonoro.",
    "año": 1952,
    "categoria": "clasico"
  },
  {
    "id": 615,
    "titulo": "Los Siete Samuráis (Akira Kurosawa)",
    "descripcion_corta": "Épica de acción feudal japonesa que inspiró decenas de remakes.",
    "año": 1954,
    "categoria": "clasico"
  },
  {
    "id": 616,
    "titulo": "La Ventana Indiscreta (Alfred Hitchcock)",
    "descripcion_corta": "Thriller de suspenso sobre un fotógrafo en silla de ruedas que espía a sus vecinos.",
    "año": 1954,
    "categoria": "clasico"
  },
  {
    "id": 617,
    "titulo": "Vértigo (Alfred Hitchcock)",
    "descripcion_corta": "Drama de suspenso psicológico sobre la obsesión y acrofobia.",
    "año": 1958,
    "categoria": "clasico"
  },
  {
    "id": 618,
    "titulo": "Con faldas y a lo loco / Algunos prefieren quemarse (Billy Wilder)",
    "descripcion_corta": "Mítica comedia de enredos protagonizada por Marilyn Monroe.",
    "año": 1959,
    "categoria": "clasico"
  },
  {
    "id": 619,
    "titulo": "Ben-Hur (William Wyler)",
    "descripcion_corta": "Colosal producción de época romana ganadora de 11 premios Oscar.",
    "año": 1959,
    "categoria": "clasico"
  },
  {
    "id": 620,
    "titulo": "La Dolce Vita (Federico Fellini)",
    "descripcion_corta": "Retrato de la decadencia burguesa de Roma del director italiano.",
    "año": 1960,
    "categoria": "clasico"
  },
  {
    "id": 621,
    "titulo": "Lawrence de Arabia (David Lean)",
    "descripcion_corta": "Épica histórica biográfica del militar británico en el desierto árabe.",
    "año": 1962,
    "categoria": "clasico"
  },
  {
    "id": 622,
    "titulo": "2001: Odisea del Espacio (Stanley Kubrick)",
    "descripcion_corta": "Faro de la ciencia ficción filosófica y espacial.",
    "año": 1968,
    "categoria": "clasico"
  },
  {
    "id": 623,
    "titulo": "El Padrino II (Francis Ford Coppola)",
    "descripcion_corta": "Aclamada secuela que narra los inicios de Vito Corleone y el reinado de Michael.",
    "año": 1974,
    "categoria": "clasico"
  },
  {
    "id": 624,
    "titulo": "Taxi Driver (Martin Scorsese)",
    "descripcion_corta": "Crudo drama criminal urbano sobre la paranoia en Nueva York.",
    "año": 1976,
    "categoria": "clasico"
  },
  {
    "id": 625,
    "titulo": "Apocalypse Now (Francis Ford Coppola)",
    "descripcion_corta": "Épico retrato psicológico de la guerra de Vietnam.",
    "año": 1979,
    "categoria": "clasico"
  },
  {
    "id": 626,
    "titulo": "Alien, el octavo pasajero (Ridley Scott)",
    "descripcion_corta": "Obra cumbre de la ciencia ficción de terror claustrofóbico.",
    "año": 1979,
    "categoria": "clasico"
  },
  {
    "id": 627,
    "titulo": "Blade Runner (Ridley Scott)",
    "descripcion_corta": "Filme ciberpunk existencialista basado en la novela de Philip K. Dick.",
    "año": 1982,
    "categoria": "clasico"
  },
  {
    "id": 628,
    "titulo": "Terminator (James Cameron)",
    "descripcion_corta": "Ciencia ficción de acción sobre un ciborg asesino enviado del futuro.",
    "año": 1984,
    "categoria": "clasico"
  },
  {
    "id": 629,
    "titulo": "El Imperio Contraataca (Irvin Kershner)",
    "descripcion_corta": "Considerada por la crítica como la mejor entrega de la saga Star Wars.",
    "año": 1980,
    "categoria": "clasico"
  },
  {
    "id": 630,
    "titulo": "Platoon (Oliver Stone)",
    "descripcion_corta": "Realista retrato del conflicto de Vietnam basado en la experiencia del director.",
    "año": 1986,
    "categoria": "clasico"
  },
  {
    "id": 631,
    "titulo": "Depredador (John McTiernan)",
    "descripcion_corta": "Acción y ciencia ficción en la selva protagonizada por Arnold Schwarzenegger.",
    "año": 1987,
    "categoria": "clasico"
  },
  {
    "id": 632,
    "titulo": "Duro de Matar (John McTiernan)",
    "descripcion_corta": "Acción en el Nakatomi Plaza protagonizada por Bruce Willis.",
    "año": 1988,
    "categoria": "clasico"
  },
  {
    "id": 633,
    "titulo": "Batman (Tim Burton)",
    "descripcion_corta": "La adaptación gótica del superhéroe que cambió las producciones del género.",
    "año": 1989,
    "categoria": "clasico"
  },
  {
    "id": 634,
    "titulo": "Metrópolis (Fritz Lang)",
    "descripcion_corta": "Hito del expresionismo alemán de ciencia ficción con su robot icónico.",
    "año": 1927,
    "categoria": "clasico"
  },
  {
    "id": 635,
    "titulo": "Nosferatu (F.W. Murnau)",
    "descripcion_corta": "Obra cumbre del cine expresionista de terror vampírico basada en Drácula.",
    "año": 1922,
    "categoria": "clasico"
  },
  {
    "id": 636,
    "titulo": "El gabinete del doctor Caligari (Robert Wiene)",
    "descripcion_corta": "Obra iniciadora del expresionismo alemán y pionera en terror psicológico.",
    "año": 1920,
    "categoria": "clasico"
  },
  {
    "id": 637,
    "titulo": "El acorazado Potemkin (Serguéi Eisenstein)",
    "descripcion_corta": "Obra maestra de la propaganda soviética famosa por el montaje de la escalera de Odesa.",
    "año": 1925,
    "categoria": "clasico"
  },
  {
    "id": 638,
    "titulo": "King Kong (Merian C. Cooper)",
    "descripcion_corta": "Aventura fundacional del simio gigante capturado en la Isla Calavera.",
    "año": 1933,
    "categoria": "clasico"
  },
  {
    "id": 639,
    "titulo": "Rebeca (Alfred Hitchcock)",
    "descripcion_corta": "Thriller de intriga y obsesión, única película de Hitchcock ganadora del Oscar principal.",
    "año": 1940,
    "categoria": "clasico"
  },
  {
    "id": 640,
    "titulo": "Las uvas de la ira (John Ford)",
    "descripcion_corta": "Drama de superación y crisis basado en la novela de John Steinbeck.",
    "año": 1940,
    "categoria": "clasico"
  },
  {
    "id": 641,
    "titulo": "El gran dictador (Charles Chaplin)",
    "descripcion_corta": "Valiente sátira de Chaplin que parodia y critica abiertamente al fascismo.",
    "año": 1940,
    "categoria": "clasico"
  },
  {
    "id": 642,
    "titulo": "El halcón maltés (John Huston)",
    "descripcion_corta": "Cine negro clásico protagonizado por Humphrey Bogart encarnando al detective Sam Spade.",
    "año": 1941,
    "categoria": "clasico"
  },
  {
    "id": 643,
    "titulo": "Qué bello es vivir (Frank Capra)",
    "descripcion_corta": "Clásico navideño estadounidense sobre la importancia y el valor de una vida humana.",
    "año": 1946,
    "categoria": "clasico"
  },
  {
    "id": 644,
    "titulo": "Ladrón de bicicletas (Vittorio De Sica)",
    "descripcion_corta": "Cumbre del neorrealismo italiano sobre un padre desempleado que busca su herramienta de trabajo.",
    "año": 1948,
    "categoria": "clasico"
  },
  {
    "id": 645,
    "titulo": "El tercer hombre (Carol Reed)",
    "descripcion_corta": "Brillante filme negro en una Viena dividida de posguerra con música de cítara.",
    "año": 1949,
    "categoria": "clasico"
  },
  {
    "id": 646,
    "titulo": "Rashomon (Akira Kurosawa)",
    "descripcion_corta": "Cinta japonesa que popularizó la estructura narrativa de múltiples verdades subjetivas.",
    "año": 1950,
    "categoria": "clasico"
  },
  {
    "id": 647,
    "titulo": "Sunset Boulevard (Billy Wilder)",
    "descripcion_corta": "Sarcástica e impecable mirada al declive del cine mudo y las actrices olvidadas.",
    "año": 1950,
    "categoria": "clasico"
  },
  {
    "id": 648,
    "titulo": "Una noche en la ópera (Sam Wood)",
    "descripcion_corta": "Disparatada e icónica comedia protagonizada por los Hermanos Marx.",
    "año": 1935,
    "categoria": "clasico"
  },
  {
    "id": 649,
    "titulo": "El puente sobre el río Kwai (David Lean)",
    "descripcion_corta": "Drama de prisioneros de guerra británicos obligados a construir un puente ferroviario en Asia.",
    "año": 1957,
    "categoria": "clasico"
  },
  {
    "id": 650,
    "titulo": "Los diez mandamientos (Cecil B. DeMille)",
    "descripcion_corta": "Espectacular epopeya bíblica sobre la liberación de Moisés protagonizada por Charlton Heston.",
    "año": 1956,
    "categoria": "clasico"
  },
  {
    "id": 651,
    "titulo": "La novicia rebelde (Robert Wise)",
    "descripcion_corta": "Aclamado musical familiar de la familia Von Trapp que huye de la ocupación nazi.",
    "año": 1965,
    "categoria": "clasico"
  },
  {
    "id": 652,
    "titulo": "El graduado (Mike Nichols)",
    "descripcion_corta": "Drama satírico juvenil con Dustin Hoffman enfrentado a la seducción y futuro incierto.",
    "año": 1967,
    "categoria": "clasico"
  },
  {
    "id": 653,
    "titulo": "El bebé de Rosemary (Roman Polanski)",
    "descripcion_corta": "Thriller psicológico de terror sobre el embarazo de una mujer acechada por vecinos satánicos.",
    "año": 1968,
    "categoria": "clasico"
  },
  {
    "id": 654,
    "titulo": "La naranja mecánica (Stanley Kubrick)",
    "descripcion_corta": "Cine distópico ultra violento sobre el condicionamiento conductual impuesto por el Estado.",
    "año": 1971,
    "categoria": "clasico"
  },
  {
    "id": 655,
    "titulo": "El exorcista (William Friedkin)",
    "descripcion_corta": "La película de terror más aterradora sobre posesiones demoníacas y fe sacerdotal.",
    "año": 1973,
    "categoria": "clasico"
  },
  {
    "id": 656,
    "titulo": "Chinatown (Roman Polanski)",
    "descripcion_corta": "Neo-noir magistral sobre conspiración del agua e intrigas policiales en Los Ángeles.",
    "año": 1974,
    "categoria": "clasico"
  },
  {
    "id": 657,
    "titulo": "Atrapado sin salida (Milos Forman)",
    "descripcion_corta": "Drama carcelario y de rebeldía institucionalizado en un manicomio con Jack Nicholson.",
    "año": 1975,
    "categoria": "clasico"
  },
  {
    "id": 658,
    "titulo": "Rocky (John G. Avildsen)",
    "descripcion_corta": "Fábula deportiva del boxeador que lucha por el sueño americano escrita por Stallone.",
    "año": 1976,
    "categoria": "clasico"
  },
  {
    "id": 659,
    "titulo": "En busca del arca perdida (Steven Spielberg)",
    "descripcion_corta": "Aclamada aventura arqueológica que introdujo al intrépido Indiana Jones.",
    "año": 1981,
    "categoria": "clasico"
  },
  {
    "id": 660,
    "titulo": "Scarface (Brian De Palma)",
    "descripcion_corta": "Épica de la mafia y el ascenso criminal del refugiado cubano Tony Montana en Miami.",
    "año": 1983,
    "categoria": "clasico"
  },
  {
    "id": 661,
    "titulo": "Amadeus (Milos Forman)",
    "descripcion_corta": "Estudio dramático sobre el talento musical innato de Mozart y la envidia de Salieri.",
    "año": 1984,
    "categoria": "clasico"
  },
  {
    "id": 662,
    "titulo": "Cinema Paradiso (Giuseppe Tornatore)",
    "descripcion_corta": "Nostálgica y conmovedora cinta italiana de amor por las salas de cine en la infancia.",
    "año": 1988,
    "categoria": "clasico"
  },
  {
    "id": 663,
    "titulo": "La sociedad de los poetas muertos (Peter Weir)",
    "descripcion_corta": "Emotivo drama sobre un profesor que inspira a sus alumnos mediante la poesía y 'Carpe Diem'.",
    "año": 1989,
    "categoria": "clasico"
  },
  {
    "id": 664,
    "titulo": "Breakfast Club (John Hughes)",
    "descripcion_corta": "El retrato definitivo sobre los arquetipos de adolescentes confinados en detención escolar.",
    "año": 1985,
    "categoria": "clasico"
  },
  {
    "id": 665,
    "titulo": "La princessa prometida (Rob Reiner)",
    "descripcion_corta": "Fantasía humorística de espadas, gigantes y milagros de culto familiar.",
    "año": 1987,
    "categoria": "clasico"
  },
  {
    "id": 666,
    "titulo": "El nombre de la rosa (Jean-Jacques Annaud)",
    "descripcion_corta": "Intriga detectivesca medieval en una abadía benedictina adaptada de Umberto Eco.",
    "año": 1986,
    "categoria": "clasico"
  },
  {
    "id": 667,
    "titulo": "Atracción fatal (Adrian Lyne)",
    "descripcion_corta": "Thriller pasional sobre una aventura extramatrimonial que deriva en acoso mortal.",
    "año": 1987,
    "categoria": "clasico"
  },
  {
    "id": 668,
    "titulo": "Toro salvaje (Martin Scorsese)",
    "descripcion_corta": "Brutal retrato biográfico en blanco y negro del boxeador Jake LaMotta y sus demonios.",
    "año": 1980,
    "categoria": "clasico"
  },
  {
    "id": 669,
    "titulo": "Mad Max 2: El guerrero de la carretera (George Miller)",
    "descripcion_corta": "Acción postapocalíptica del desierto que definió la estética del colapso social.",
    "año": 1981,
    "categoria": "clasico"
  },
  {
    "id": 670,
    "titulo": "Dirty Dancing (Emile Ardolino)",
    "descripcion_corta": "Drama romántico musical de baile veraniego que marcó una generación.",
    "año": 1987,
    "categoria": "clasico"
  },
  {
    "id": 671,
    "titulo": "El Silencio de los Inocentes (Jonathan Demme)",
    "descripcion_corta": "Thriller sobre canibalismo que barrió los cinco premios principales del Oscar.",
    "año": 1991,
    "categoria": "moderno"
  },
  {
    "id": 672,
    "titulo": "Jurassic Park (Steven Spielberg)",
    "descripcion_corta": "Aventura de dinosaurios que revolucionó los efectos por computadora en cine.",
    "año": 1993,
    "categoria": "moderno"
  },
  {
    "id": 673,
    "titulo": "La Lista de Schindler (Steven Spielberg)",
    "descripcion_corta": "Drama del holocausto judío de Steven Spielberg filmado en blanco y negro.",
    "año": 1993,
    "categoria": "moderno"
  },
  {
    "id": 674,
    "titulo": "El Rey León (Walt Disney)",
    "descripcion_corta": "Aclamado musical animado inspirado en Hamlet y la sabana africana.",
    "año": 1994,
    "categoria": "moderno"
  },
  {
    "id": 675,
    "titulo": "Pulp Fiction (Quentin Tarantino)",
    "descripcion_corta": "Cinta de historias cruzadas y violencia pop que redefinió el cine independiente.",
    "año": 1994,
    "categoria": "moderno"
  },
  {
    "id": 676,
    "titulo": "Forrest Gump (Robert Zemeckis)",
    "descripcion_corta": "Fábula optimista sobre un noble personaje que recorre hitos de EE.UU.",
    "año": 1994,
    "categoria": "moderno"
  },
  {
    "id": 677,
    "titulo": "Toy Story (John Lasseter)",
    "descripcion_corta": "El primer largometraje de la historia animado completamente por computadora.",
    "año": 1995,
    "categoria": "moderno"
  },
  {
    "id": 678,
    "titulo": "Titanic (James Cameron)",
    "descripcion_corta": "Colosal producción romántica histórica, una de las más taquilleras de siempre.",
    "año": 1997,
    "categoria": "moderno"
  },
  {
    "id": 679,
    "titulo": "Matrix (Hermanas Wachowski)",
    "descripcion_corta": "Ciencia ficción ciberpunk que popularizó el efecto especial Bullet Time.",
    "año": 1999,
    "categoria": "moderno"
  },
  {
    "id": 680,
    "titulo": "El Club de la Pelea (David Fincher)",
    "descripcion_corta": "Sátira nihilista anticapitalista protagonizada por Norton y Pitt.",
    "año": 1999,
    "categoria": "moderno"
  },
  {
    "id": 681,
    "titulo": "Gladiador (Ridley Scott)",
    "descripcion_corta": "Resurgimiento del género de época romana protagonizado por Russell Crowe.",
    "año": 2000,
    "categoria": "moderno"
  },
  {
    "id": 682,
    "titulo": "El Señor de los Anillos: La Comunidad del Anillo (Peter Jackson)",
    "descripcion_corta": "Inicio de la aclamada trilogía fantástica de J.R.R. Tolkien.",
    "año": 2001,
    "categoria": "moderno"
  },
  {
    "id": 683,
    "titulo": "Batman: El Caballero de la Noche (Christopher Nolan)",
    "descripcion_corta": "Aclamada cinta de superhéroes destacada por el rol del Guasón de Heath Ledger.",
    "año": 2008,
    "categoria": "moderno"
  },
  {
    "id": 684,
    "titulo": "Avatar (James Cameron)",
    "descripcion_corta": "Ciencia ficción en 3D que rompió el récord de taquilla mundial de la historia.",
    "año": 2009,
    "categoria": "moderno"
  },
  {
    "id": 685,
    "titulo": "Inception (El Origen)",
    "descripcion_corta": "Thriller de ciencia ficción sobre robos dentro de capas de sueños.",
    "año": 2010,
    "categoria": "moderno"
  },
  {
    "id": 686,
    "titulo": "Interstellar (Christopher Nolan)",
    "descripcion_corta": "Viaje espacial relativista a través de agujeros de gusano por el futuro humano.",
    "año": 2014,
    "categoria": "moderno"
  },
  {
    "id": 687,
    "titulo": "Parasite (Parásitos)",
    "descripcion_corta": "Película coreana de comedia negra y suspenso que ganó el Oscar a Mejor Película.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 688,
    "titulo": "Avengers: Endgame (Hermanos Russo)",
    "descripcion_corta": "Culminación de 22 entregas del Universo Cinematográfico de Marvel.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 689,
    "titulo": "Buenos Muchachos (Martin Scorsese)",
    "descripcion_corta": "Una de las cumbres del cine de mafiosos de Scorsese.",
    "año": 1990,
    "categoria": "moderno"
  },
  {
    "id": 690,
    "titulo": "Terminator 2: El Juicio Final (James Cameron)",
    "descripcion_corta": "Clásico de acción y efectos especiales pioneros de metal líquido.",
    "año": 1991,
    "categoria": "moderno"
  },
  {
    "id": 691,
    "titulo": "Perros de la Calle (Quentin Tarantino)",
    "descripcion_corta": "Brillante e independiente ópera prima de Tarantino.",
    "año": 1992,
    "categoria": "moderno"
  },
  {
    "id": 692,
    "titulo": "Sueños de Fuga / Cadena Perpetua (Frank Darabont)",
    "descripcion_corta": "Considerada en ránkings de Internet como una de las mejores películas de la historia.",
    "año": 1994,
    "categoria": "moderno"
  },
  {
    "id": 693,
    "titulo": "Se7en / Pecados Capitales (David Fincher)",
    "descripcion_corta": "Oscuro y perturbador thriller policiaco sobre un asesino serial.",
    "año": 1995,
    "categoria": "moderno"
  },
  {
    "id": 694,
    "titulo": "Sospechosos Comunes (Bryan Singer)",
    "descripcion_corta": "Thriller de suspenso famoso por su giro final e identidad de Keyser Söze.",
    "año": 1995,
    "categoria": "moderno"
  },
  {
    "id": 695,
    "titulo": "Fargo (Hermanos Coen)",
    "descripcion_corta": "Comedia negra criminal en la nieve del medio oeste de EE.UU.",
    "año": 1996,
    "categoria": "moderno"
  },
  {
    "id": 696,
    "titulo": "Rescatando al Soldado Ryan (Steven Spielberg)",
    "descripcion_corta": "Bélico destacado por su hiperrealista secuencia inicial del desembarco del Día D.",
    "año": 1998,
    "categoria": "moderno"
  },
  {
    "id": 697,
    "titulo": "El Sexto Sentido (M. Night Shyamalan)",
    "descripcion_corta": "Famosa película de suspenso sobrenatural sobre un niño que ve gente muerta.",
    "año": 2000,
    "categoria": "moderno"
  },
  {
    "id": 698,
    "titulo": "Memento (Christopher Nolan)",
    "descripcion_corta": "Complejo thriller de montaje inverso sobre un hombre sin memoria de corto plazo.",
    "año": 2000,
    "categoria": "moderno"
  },
  {
    "id": 699,
    "titulo": "El Señor de los Anillos: El Retorno del Rey (Peter Jackson)",
    "descripcion_corta": "Ganadora de 11 premios Oscar, culminación de la saga.",
    "año": 2003,
    "categoria": "moderno"
  },
  {
    "id": 700,
    "titulo": "Eterno Resplandor de una Mente sin Recuerdos (Michel Gondry)",
    "descripcion_corta": "Original drama romántico sobre el olvido inducido.",
    "año": 2004,
    "categoria": "moderno"
  },
  {
    "id": 701,
    "titulo": "Secreto en la Montaña (Ang Lee)",
    "descripcion_corta": "Revolucionario e influyente drama romántico del oeste entre dos vaqueros.",
    "año": 2005,
    "categoria": "moderno"
  },
  {
    "id": 702,
    "titulo": "Bastardos sin Gloria (Quentin Tarantino)",
    "descripcion_corta": "Ucronicidad de la 2ª Guerra Mundial del director norteamericano.",
    "año": 2009,
    "categoria": "moderno"
  },
  {
    "id": 703,
    "titulo": "Whiplash (Damien Chazelle)",
    "descripcion_corta": "Intenso drama musical sobre la obsesión de un baterista de jazz.",
    "año": 2014,
    "categoria": "moderno"
  },
  {
    "id": 704,
    "titulo": "Mad Max: Furia en el Camino (George Miller)",
    "descripcion_corta": "Aclamada acción postapocalíptica y vertiginosa de de persecución vial.",
    "año": 2015,
    "categoria": "moderno"
  },
  {
    "id": 705,
    "titulo": "La La Land (Damien Chazelle)",
    "descripcion_corta": "Colorido y nostálgico tributo musical a los clásicos de Hollywood.",
    "año": 2016,
    "categoria": "moderno"
  },
  {
    "id": 706,
    "titulo": "Guasón / Joker (Todd Phillips)",
    "descripcion_corta": "Estudio sicológico del villano de Batman protagonizado por Joaquin Phoenix.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 707,
    "titulo": "Duna (Denis Villeneuve)",
    "descripcion_corta": "Espectacular y fiel adaptación de la novela de ciencia ficción de Frank Herbert.",
    "año": 2021,
    "categoria": "moderno"
  },
  {
    "id": 708,
    "titulo": "Oppenheimer (Christopher Nolan)",
    "descripcion_corta": "Película biográfica sobre el padre de la bomba atómica Robert Oppenheimer.",
    "año": 2023,
    "categoria": "moderno"
  },
  {
    "id": 709,
    "titulo": "Barbie (Greta Gerwig)",
    "descripcion_corta": "Fenómeno de taquilla de comedia feminista que causó furor veraniego.",
    "año": 2023,
    "categoria": "moderno"
  },
  {
    "id": 710,
    "titulo": "Mi pobre angelito (Chris Columbus)",
    "descripcion_corta": "Famosa comedia navideña de un niño que defiende su hogar de ladrones.",
    "año": 1990,
    "categoria": "moderno"
  },
  {
    "id": 711,
    "titulo": "El joven manos de tijera (Tim Burton)",
    "descripcion_corta": "Cuento gótico romántico con Johnny Depp encarnando al humano artificial.",
    "año": 1990,
    "categoria": "moderno"
  },
  {
    "id": 712,
    "titulo": "Punto de quiebra (Kathryn Bigelow)",
    "descripcion_corta": "Adrenalínica acción policiaca infiltrada en el mundo del surf y asalto de bancos.",
    "año": 1991,
    "categoria": "moderno"
  },
  {
    "id": 713,
    "titulo": "La bella y la bestia (Gary Trousdale)",
    "descripcion_corta": "Mítico musical animado tradicional de Disney galardonado por su música.",
    "año": 1991,
    "categoria": "moderno"
  },
  {
    "id": 714,
    "titulo": "Los imperdonables (Clint Eastwood)",
    "descripcion_corta": "Western crepuscular desgarrador que analiza la crudeza de la violencia fronteriza.",
    "año": 1992,
    "categoria": "moderno"
  },
  {
    "id": 715,
    "titulo": "Philadelphia (Jonathan Demme)",
    "descripcion_corta": "Drama social sobre el SIDA y la discriminación laboral protagonizado por Tom Hanks.",
    "año": 1993,
    "categoria": "moderno"
  },
  {
    "id": 716,
    "titulo": "La máscara (Chuck Russell)",
    "descripcion_corta": "Hilarante y disparatada comedia fantástica con Jim Carrey y Cameron Diaz.",
    "año": 1994,
    "categoria": "moderno"
  },
  {
    "id": 717,
    "titulo": "Corazón valiente (Mel Gibson)",
    "descripcion_corta": "Épica histórica bélica sobre la rebelión de William Wallace contra el reino inglés.",
    "año": 1995,
    "categoria": "moderno"
  },
  {
    "id": 718,
    "titulo": "Scream: Grita antes de morir (Wes Craven)",
    "descripcion_corta": "Revolucionó el género de terror adolescente con una fórmula autoconsciente.",
    "año": 1996,
    "categoria": "moderno"
  },
  {
    "id": 719,
    "titulo": "Hombres de negro (Barry Sonnenfeld)",
    "descripcion_corta": "Divertida y exitosa comedia de extraterrestres secretos infiltrados en la Tierra.",
    "año": 1997,
    "categoria": "moderno"
  },
  {
    "id": 720,
    "titulo": "La vida es bella (Roberto Benigni)",
    "descripcion_corta": "Conmovedora fábula del holocausto donde un padre protege a su hijo usando la imaginación.",
    "año": 1997,
    "categoria": "moderno"
  },
  {
    "id": 721,
    "titulo": "El show de Truman (Peter Weir)",
    "descripcion_corta": "Sátira premonitoria sobre la telerrealidad y un hombre cuya vida es grabada sin saberlo.",
    "año": 1998,
    "categoria": "moderno"
  },
  {
    "id": 722,
    "titulo": "Réquiem por un sueño (Darren Aronofsky)",
    "descripcion_corta": "Estilizado e implacable drama sobre la espiral destructiva de diversas adicciones.",
    "año": 2000,
    "categoria": "moderno"
  },
  {
    "id": 723,
    "titulo": "Náufrago (Robert Zemeckis)",
    "descripcion_corta": "Drama de supervivencia humana sobre un empleado postal varado en una isla desierta.",
    "año": 2000,
    "categoria": "moderno"
  },
  {
    "id": 724,
    "titulo": "Shrek (Andrew Adamson)",
    "descripcion_corta": "Comedia animada que parodió y revitalizó los clásicos cuentos de hadas infantiles.",
    "año": 2001,
    "categoria": "moderno"
  },
  {
    "id": 725,
    "titulo": "Monsters, Inc. (Pete Docter)",
    "descripcion_corta": "Ingeniosa aventura de Pixar sobre monstruos cuya energía proviene de los sustos infantiles.",
    "año": 2001,
    "categoria": "moderno"
  },
  {
    "id": 726,
    "titulo": "El viaje de Chihiro (Hayao Miyazaki)",
    "descripcion_corta": "Fábula mágica de animación japonesa que ganó el Oscar a Mejor Película Animada.",
    "año": 2001,
    "categoria": "moderno"
  },
  {
    "id": 727,
    "titulo": "Ciudad de Dios (Fernando Meirelles)",
    "descripcion_corta": "Cruda e impactante historia del ascenso del narcotráfico en las favelas brasileñas.",
    "año": 2002,
    "categoria": "moderno"
  },
  {
    "id": 728,
    "titulo": "Kill Bill: Volumen 1 (Quentin Tarantino)",
    "descripcion_corta": "Estilizado festín de artes marciales y venganza liderado por Uma Thurman.",
    "año": 2003,
    "categoria": "moderno"
  },
  {
    "id": 729,
    "titulo": "Buscando a Nemo (Andrew Stanton)",
    "descripcion_corta": "Aventura de Pixar de un pez payaso que cruza el océano para rescatar a su hijo.",
    "año": 2003,
    "categoria": "moderno"
  },
  {
    "id": 730,
    "titulo": "Piratas del Caribe: La maldición del Perla Negra (Gore Verbinski)",
    "descripcion_corta": "Aventura marítima que encumbró al pirata Jack Sparrow interpretado por Depp.",
    "año": 2003,
    "categoria": "moderno"
  },
  {
    "id": 731,
    "titulo": "El diario de Noah (Nick Cassavetes)",
    "descripcion_corta": "Popular drama romántico de una joven pareja de diferentes clases sociales.",
    "año": 2004,
    "categoria": "moderno"
  },
  {
    "id": 732,
    "titulo": "Batman inicia (Christopher Nolan)",
    "descripcion_corta": "Reinicio oscuro y realista del héroe de Gotham enfocado en sus miedos iniciales.",
    "año": 2005,
    "categoria": "moderno"
  },
  {
    "id": 733,
    "titulo": "Orgullo y prejuicio (Joe Wright)",
    "descripcion_corta": "Bella y aclamada adaptación cinematográfica de la novela clásica de Jane Austen.",
    "año": 2005,
    "categoria": "moderno"
  },
  {
    "id": 734,
    "titulo": "El laberinto del fauno (Guillermo del Toro)",
    "descripcion_corta": "Fantasía oscura hispana ambientada en la dura posguerra del franquismo español.",
    "año": 2006,
    "categoria": "moderno"
  },
  {
    "id": 735,
    "titulo": "Los infiltrados (Martin Scorsese)",
    "descripcion_corta": "Excelente thriller criminal de topos cruzados en Boston, ganadora de mejor película.",
    "año": 2006,
    "categoria": "moderno"
  },
  {
    "id": 736,
    "titulo": "Supercool (Greg Mottola)",
    "descripcion_corta": "Divertida e hilarante comedia sobre la pubertad e intentos desesperados por comprar alcohol.",
    "año": 2007,
    "categoria": "moderno"
  },
  {
    "id": 737,
    "titulo": "Sin lugar para los débiles (Ethan Coen)",
    "descripcion_corta": "Tenso e implacable thriller de violencia fronteriza con el icónico asesino Anton Chigurh.",
    "año": 2007,
    "categoria": "moderno"
  },
  {
    "id": 738,
    "titulo": "Wall-E (Andrew Stanton)",
    "descripcion_corta": "Aclamada y tierna distopía espacial sobre un robot compactador abandonado en la Tierra.",
    "año": 2008,
    "categoria": "moderno"
  },
  {
    "id": 739,
    "titulo": "Up: Una aventura de altura (Pete Docter)",
    "descripcion_corta": "Maravillosa aventura de un viudo que viaja a Sudamérica usando globos en su casa.",
    "año": 2009,
    "categoria": "moderno"
  },
  {
    "id": 740,
    "titulo": "La red social (David Fincher)",
    "descripcion_corta": "Afilado drama de traiciones comerciales que narra el nacimiento de Facebook.",
    "año": 2010,
    "categoria": "moderno"
  },
  {
    "id": 741,
    "titulo": "Harry Potter y las reliquias de la Muerte: Parte 2 (David Yates)",
    "descripcion_corta": "Culminación de una década mágica del cine con el duelo definitivo contra Voldemort.",
    "año": 2011,
    "categoria": "moderno"
  },
  {
    "id": 742,
    "titulo": "Los juegos del hambre (Gary Ross)",
    "descripcion_corta": "Thriller distópico de supervivencia basado en la novela de Suzanne Collins.",
    "año": 2012,
    "categoria": "moderno"
  },
  {
    "id": 743,
    "titulo": "Django sin cadenas (Quentin Tarantino)",
    "descripcion_corta": "Violento y estiloso western sobre la liberación de un esclavo afroamericano.",
    "año": 2012,
    "categoria": "moderno"
  },
  {
    "id": 744,
    "titulo": "Gravedad (Alfonso Cuarón)",
    "descripcion_corta": "Claustrofóbico suspenso de supervivencia en órbita terrestre del director mexicano.",
    "año": 2013,
    "categoria": "moderno"
  },
  {
    "id": 745,
    "titulo": "Frozen (Chris Buck)",
    "descripcion_corta": "Exitoso fenómeno musical animado moderno del estudio de Walt Disney.",
    "año": 2013,
    "categoria": "moderno"
  },
  {
    "id": 746,
    "titulo": "El lobo de Wall Street (Martin Scorsese)",
    "descripcion_corta": "Excesiva y frenética sátira financiera sobre el estafador de bolsa Jordan Belfort.",
    "año": 2013,
    "categoria": "moderno"
  },
  {
    "id": 747,
    "titulo": "Intensa-Mente (Pete Docter)",
    "descripcion_corta": "Brillante aventura psicológica sobre las emociones humanas controlando a una niña.",
    "año": 2015,
    "categoria": "moderno"
  },
  {
    "id": 748,
    "titulo": "¡Huye! (Jordan Peele)",
    "descripcion_corta": "Sátira social de terror de Jordan Peele sobre el racismo y opresión liberal.",
    "año": 2017,
    "categoria": "moderno"
  },
  {
    "id": 749,
    "titulo": "Bohemian Rhapsody (Bryan Singer)",
    "descripcion_corta": "Biografía musical de la vida de Freddie Mercury que recrea el Live Aid.",
    "año": 2018,
    "categoria": "moderno"
  },
  {
    "id": 750,
    "titulo": "Spider-Man: Un nuevo universo (Bob Persichetti)",
    "descripcion_corta": "Aclamada cinta que revolucionó la estética visual animada con el Spider-Verse.",
    "año": 2018,
    "categoria": "moderno"
  },
  {
    "id": 751,
    "titulo": "Jojo Rabbit (Taika Waititi)",
    "descripcion_corta": "Sátira dramática bélica sobre un niño nazi y su ingenuo amigo imaginario Adolf Hitler.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 752,
    "titulo": "Todo en todas partes al mismo tiempo (Daniel Kwan)",
    "descripcion_corta": "Aventura caótica existencial del multiverso que barrió los premios de la Academia.",
    "año": 2022,
    "categoria": "moderno"
  },
  {
    "id": 753,
    "titulo": "Top Gun: Maverick (Joseph Kosinski)",
    "descripcion_corta": "Exitosa y aclamada secuela que destaca por sus efectos prácticos y cazas reales.",
    "año": 2022,
    "categoria": "moderno"
  },
  {
    "id": 754,
    "titulo": "Dunkirk (Dunkerque)",
    "descripcion_corta": "Tenso y asfixiante relato bélico sobre la evacuación de soldados aliados en Francia.",
    "año": 2017,
    "categoria": "moderno"
  },
  {
    "id": 755,
    "titulo": "El gran hotel Budapest (Wes Anderson)",
    "descripcion_corta": "Excéntrica y colorida comedia de enredos con la simetría visual clásica de Anderson.",
    "año": 2014,
    "categoria": "moderno"
  },
  {
    "id": 756,
    "titulo": "Birdman (Alejandro González Iñárritu)",
    "descripcion_corta": "Original comedia dramática grabada simulando un plano secuencia de principio a fin.",
    "año": 2014,
    "categoria": "moderno"
  },
  {
    "id": 757,
    "titulo": "Mad Max: Furia en la carretera (George Miller)",
    "descripcion_corta": "Espectacular y frenética obra maestra de la persecución vehicular desértica.",
    "año": 2015,
    "categoria": "moderno"
  },
  {
    "id": 758,
    "titulo": "El renacido (Alejandro González Iñárritu)",
    "descripcion_corta": "Drama brutal de supervivencia que le valió el Oscar a Leonardo DiCaprio.",
    "año": 2015,
    "categoria": "moderno"
  },
  {
    "id": 759,
    "titulo": "La llegada (Arrival)",
    "descripcion_corta": "Inteligente ciencia ficción filosófica sobre la comunicación con vida extraterrestre.",
    "año": 2016,
    "categoria": "moderno"
  },
  {
    "id": 760,
    "titulo": "El hilo invisible (Phantom Thread)",
    "descripcion_corta": "Obsesivo e intrincado romance de época en la moda de alta costura de Londres.",
    "año": 2017,
    "categoria": "moderno"
  },
  {
    "id": 761,
    "titulo": "Roma (Alfonso Cuarón)",
    "descripcion_corta": "Íntimo y poético retrato en blanco y negro del México de los años setenta.",
    "año": 2018,
    "categoria": "moderno"
  },
  {
    "id": 762,
    "titulo": "Joker (Guasón)",
    "descripcion_corta": "Drama psicológico y violento origen del villano de Batman protagonizado por Joaquin Phoenix.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 763,
    "titulo": "El irlandés (Martin Scorsese)",
    "descripcion_corta": "Elegía crepuscular mafiosa protagonizada por De Niro, Al Pacino y Joe Pesci.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 764,
    "titulo": "Midsommar (Ari Aster)",
    "descripcion_corta": "Película de terror folk diurno y perturbador ambientado en el solsticio sueco.",
    "año": 2019,
    "categoria": "moderno"
  },
  {
    "id": 765,
    "titulo": "Tenet (Christopher Nolan)",
    "descripcion_corta": "Thriller de espionaje y ciencia ficción basado en la inversión del flujo temporal.",
    "año": 2020,
    "categoria": "moderno"
  },
  {
    "id": 766,
    "titulo": "La ballena (The Whale)",
    "descripcion_corta": "Drama teatral íntimo sobre la redención y obesidad con Brendan Fraser.",
    "año": 2022,
    "categoria": "moderno"
  },
  {
    "id": 767,
    "titulo": "El niño y la garza (Hayao Miyazaki)",
    "descripcion_corta": "Fantasía surrealista animada que marca la madurez y despedida del director.",
    "año": 2023,
    "categoria": "moderno"
  },
  {
    "id": 768,
    "titulo": "Los asesinos de la luna (Martin Scorsese)",
    "descripcion_corta": "Cruenta investigación histórica de los asesinatos del pueblo Osage por su petróleo.",
    "año": 2023,
    "categoria": "moderno"
  },
  {
    "id": 769,
    "titulo": "Spider-Man 2 (Sam Raimi)",
    "descripcion_corta": "Considerada una de las mejores secuelas de superhéroes por la lucha de Peter Parker.",
    "año": 2004,
    "categoria": "moderno"
  },
  {
    "id": 770,
    "titulo": "The Dark Knight Rises (Christopher Nolan)",
    "descripcion_corta": "Épica e intensa conclusión de la trilogía de Batman frente a la gran amenaza de Bane.",
    "año": 2012,
    "categoria": "moderno"
  },
  {
    "id": 771,
    "titulo": "Machuca (Andrés Wood)",
    "descripcion_corta": "Aclamado retrato chileno sobre la amistad infantil interrumpida por el Golpe de Estado.",
    "año": 2004,
    "categoria": "chileno"
  },
  {
    "id": 772,
    "titulo": "La Nana (Sebastián Silva)",
    "descripcion_corta": "Drama íntimo sobre una asesora del hogar y sus celos laborales.",
    "año": 2009,
    "categoria": "chileno"
  },
  {
    "id": 773,
    "titulo": "Una Mujer Fantástica (Sebastián Lelio)",
    "descripcion_corta": "El primer Oscar chileno a Mejor Película Extranjera con la actriz Daniela Vega.",
    "año": 2017,
    "categoria": "chileno"
  },
  {
    "id": 774,
    "titulo": "El Agente Topo (Maite Alberdi)",
    "descripcion_corta": "Tierno documental nominado al Oscar sobre un anciano espía en un hogar.",
    "año": 2020,
    "categoria": "chileno"
  },
  {
    "id": 775,
    "titulo": "El Chacal de Nahueltoro (Miguel Littin)",
    "descripcion_corta": "Clásico fundacional del cine chileno sobre la redención penal y fusilamiento.",
    "año": 1969,
    "categoria": "chileno"
  },
  {
    "id": 776,
    "titulo": "Julio comienza en Julio (Silvio Caiozzi)",
    "descripcion_corta": "Drama de época y latifundio, premiada internacionalmente.",
    "año": 1979,
    "categoria": "chileno"
  },
  {
    "id": 777,
    "titulo": "Tres tristes tigres (Raúl Ruiz)",
    "descripcion_corta": "Retrato marginal de la bohemia santiaguina del cineasta Ruiz.",
    "año": 1968,
    "categoria": "chileno"
  },
  {
    "id": 778,
    "titulo": "El Húsar de la Muerte (Pedro Sienna)",
    "descripcion_corta": "Filme mudo chileno sobre las hazañas patrias de Manuel Rodríguez.",
    "año": 1925,
    "categoria": "chileno"
  },
  {
    "id": 779,
    "titulo": "Largo Viaje (Patricio Kaulen)",
    "descripcion_corta": "Drama social neorrealista sobre el velorio de un angelito en los cerros.",
    "año": 1967,
    "categoria": "chileno"
  },
  {
    "id": 780,
    "titulo": "Palomita Blanca (Raúl Ruiz)",
    "descripcion_corta": "Adaptación de la famosa novela de Lafourcade, estrenada décadas después.",
    "año": 1973,
    "categoria": "chileno"
  },
  {
    "id": 781,
    "titulo": "Coronación (Silvio Caiozzi)",
    "descripcion_corta": "Aclamada adaptación de la novela costumbrista de José Donoso.",
    "año": 2000,
    "categoria": "chileno"
  },
  {
    "id": 782,
    "titulo": "Taxi para Tres (Orlando Lübbert)",
    "descripcion_corta": "Comedia negra delictiva ganadora del Festival de San Sebastián.",
    "año": 2001,
    "categoria": "chileno"
  },
  {
    "id": 783,
    "titulo": "Sub Terra (Marcelo Ferrari)",
    "descripcion_corta": "Drama social sobre las precarias minas de carbón de Lota de Baldomero Lillo.",
    "año": 2003,
    "categoria": "chileno"
  },
  {
    "id": 784,
    "titulo": "Cachimba (Silvio Caiozzi)",
    "descripcion_corta": "Comedia negra sobre el descubrimiento de pinturas de un artista desconocido.",
    "año": 2004,
    "categoria": "chileno"
  },
  {
    "id": 785,
    "titulo": "La Sagrada Familia (Sebastián Lelio)",
    "descripcion_corta": "Drama familiar grabado en un solo fin de semana de semana santa.",
    "año": 2005,
    "categoria": "chileno"
  },
  {
    "id": 786,
    "titulo": "Tony Manero (Pablo Larraín)",
    "descripcion_corta": "Oscura historia sobre un imitador obsesionado de Fiebre de Sábado por la Noche en dictadura.",
    "año": 2008,
    "categoria": "chileno"
  },
  {
    "id": 787,
    "titulo": "Post Mortem (Pablo Larraín)",
    "descripcion_corta": "Drama ambientado en la morgue de Santiago durante el 11 de septiembre de 1973.",
    "año": 2010,
    "categoria": "chileno"
  },
  {
    "id": 788,
    "titulo": "NO (Pablo Larraín)",
    "descripcion_corta": "Primera nominación chilena al Oscar, detalla la campaña del plebiscito de 1988.",
    "año": 2012,
    "categoria": "chileno"
  },
  {
    "id": 789,
    "titulo": "Violeta se fue a los cielos (Andrés Wood)",
    "descripcion_corta": "Biografía cinematográfica de la folclorista Violeta Parra.",
    "año": 2011,
    "categoria": "chileno"
  },
  {
    "id": 790,
    "titulo": "Gloria (Sebastián Lelio)",
    "descripcion_corta": "Aclamada historia sobre la adultez mayor y liberación de una mujer soltera.",
    "año": 2013,
    "categoria": "chileno"
  },
  {
    "id": 791,
    "titulo": "El Club (Pablo Larraín)",
    "descripcion_corta": "Crudo drama religioso sobre sacerdotes recluidos y secretos de la iglesia.",
    "año": 2015,
    "categoria": "chileno"
  },
  {
    "id": 792,
    "titulo": "Neruda (Pablo Larraín)",
    "descripcion_corta": "Fantasía policial biográfica sobre el escape político de Pablo Neruda.",
    "año": 2016,
    "categoria": "chileno"
  },
  {
    "id": 793,
    "titulo": "Tengo Miedo Torero (Rodrigo Sepúlveda)",
    "descripcion_corta": "Drama de Pedro Lemebel ambientado en el Santiago de 1986.",
    "año": 2020,
    "categoria": "chileno"
  },
  {
    "id": 794,
    "titulo": "La Memoria Infinita (Maite Alberdi)",
    "descripcion_corta": "Documental nominado al Oscar sobre el amor y el Alzheimer en Augusto Góngora y Paulina Urrutia.",
    "año": 2023,
    "categoria": "chileno"
  },
  {
    "id": 795,
    "titulo": "El Conde (Pablo Larraín)",
    "descripcion_corta": "Sátira de comedia negra que retrata a Augusto Pinochet como un vampiro anciano.",
    "año": 2023,
    "categoria": "chileno"
  },
  {
    "id": 796,
    "titulo": "El regalo (Cristián Galaz)",
    "descripcion_corta": "Tierna comedia dramática sobre un jubilado y el viaje de fin de semana con sus viejos amigos.",
    "año": 2008,
    "categoria": "chileno"
  },
  {
    "id": 797,
    "titulo": "Play (Alicia Scherson)",
    "descripcion_corta": "Aclamada comedia urbana ambientada en un Santiago fragmentado y poético.",
    "año": 2005,
    "categoria": "chileno"
  },
  {
    "id": 798,
    "titulo": "Mi mejor enemigo (Álex Bowen)",
    "descripcion_corta": "Drama bélico sobre la tensión fronteriza entre patrullas chilenas y argentinas en 1978.",
    "año": 2005,
    "categoria": "chileno"
  },
  {
    "id": 799,
    "titulo": "Caluga o mentira (Gonzalo Justiniano)",
    "descripcion_corta": "Clásico retrato de la juventud marginal santiaguina a inicios de la transición democrática.",
    "año": 1990,
    "categoria": "chileno"
  },
  {
    "id": 800,
    "titulo": "Johnny Cien Pesos (Gustavo Graef Marino)",
    "descripcion_corta": "Un joven estudiante participa en un asalto que se convierte en un secuestro televisado.",
    "año": 1993,
    "categoria": "chileno"
  }
];

const CARDS_FARANDULA = [
  {
    "id": 801,
    "titulo": "El Bolocazo en el Festival de Viña",
    "descripcion_corta": "Cecilia Bolocco realiza una atrevida maniobra de baile que es captada por fotógrafos.",
    "año": 2000,
    "categoria": "tv"
  },
  {
    "id": 802,
    "titulo": "Primer capítulo de Mekano",
    "descripcion_corta": "Debuta el mítico programa juvenil de baile conducido originalmente por José Miguel Viñuela.",
    "año": 1997,
    "categoria": "tv"
  },
  {
    "id": 803,
    "titulo": "Estreno de Rojo, Fama contra Fama",
    "descripcion_corta": "Comienza el exitoso programa buscatalentos musicales de TVN conducido por Rafael Araneda.",
    "año": 2002,
    "categoria": "tv"
  },
  {
    "id": 804,
    "titulo": "Estreno de Protagonistas de la Fama",
    "descripcion_corta": "Primer reality show de la televisión chilena, emitido por Canal 13.",
    "año": 2003,
    "categoria": "tv"
  },
  {
    "id": 805,
    "titulo": "Raquel Argandoña y el 'no te metas con mi marido'",
    "descripcion_corta": "Argandoña desata una furiosa discusión en vivo con la animadora Viviana Nunes en Vértigo.",
    "año": 2003,
    "categoria": "tv"
  },
  {
    "id": 806,
    "titulo": "El baile del Koala de Rocío Marengo",
    "descripcion_corta": "Marengo populariza el atrevido baile de colgarse de los animadores en televisión.",
    "año": 2007,
    "categoria": "tv"
  },
  {
    "id": 807,
    "titulo": "Felipe Avello y la parodia de Bryan Tully",
    "descripcion_corta": "Avello desata risas en SQP interpretando a un falso cantante y humorista angloparlante.",
    "año": 2007,
    "categoria": "tv"
  },
  {
    "id": 808,
    "titulo": "Debut de Yingo en Chilevisión",
    "descripcion_corta": "Debuta el programa juvenil de competencias y canciones que rivalizó con Mekano.",
    "año": 2007,
    "categoria": "tv"
  },
  {
    "id": 809,
    "titulo": "Estreno de El Club de la Comedia",
    "descripcion_corta": "Comienza el legendario programa de stand-up comedy de Chilevisión.",
    "año": 2007,
    "categoria": "tv"
  },
  {
    "id": 810,
    "titulo": "Edmundo Varas canta a Francoise Perrot",
    "descripcion_corta": "Edmundo canta 'Solo para ti' desde la altura en el reality Amor Ciego.",
    "año": 2008,
    "categoria": "tv"
  },
  {
    "id": 811,
    "titulo": "La mechoneada de Tanza Varela y Angie Alvarado",
    "descripcion_corta": "Feroz pelea física y de insultos entre ambas participantes en un reality de Canal 13.",
    "año": 2011,
    "categoria": "tv"
  },
  {
    "id": 812,
    "titulo": "El impasse de Felipe Camiroaga en Viña",
    "descripcion_corta": "El querido animador es pifiado por el público tras defender a Américo del jurado.",
    "año": 2010,
    "categoria": "tv"
  },
  {
    "id": 813,
    "titulo": "Trágico accidente de Juan Fernández",
    "descripcion_corta": "Desaparición del avión de la FACh donde viajaba Felipe Camiroaga y el equipo del matinal.",
    "año": 2011,
    "categoria": "tv"
  },
  {
    "id": 814,
    "titulo": "Yerko Puchento y sus rutinas en Vértigo",
    "descripcion_corta": "El personaje humorístico de Daniel Alcaíno debuta con sus rutinas polémicas y sin filtro.",
    "año": 2012,
    "categoria": "tv"
  },
  {
    "id": 815,
    "titulo": "El show de las Iluminadas en Morandé",
    "descripcion_corta": "Las humoristas Eva y Angélica debutan con sus bailes espirituales y frases graciosas.",
    "año": 2012,
    "categoria": "tv"
  },
  {
    "id": 816,
    "titulo": "El Tío Emilio y el 'te pillamos po compadre'",
    "descripcion_corta": "Frase acuñada por Emilio Sutherland al encarar a estafadores en En Su Propia Trampa.",
    "año": 2013,
    "categoria": "tv"
  },
  {
    "id": 817,
    "titulo": "Lucho Jara y el impasse del inglés con Robbie Williams",
    "descripcion_corta": "Lucho Jara intenta entrevistar en inglés a Robbie Williams terminando de forma hilarante.",
    "año": 2006,
    "categoria": "tv"
  },
  {
    "id": 818,
    "titulo": "Felipe Avello le tira una silla a René Naranjo",
    "descripcion_corta": "El comediante desata el caos tirándole una silla al opinólogo en pleno matinal.",
    "año": 2004,
    "categoria": "tv"
  },
  {
    "id": 819,
    "titulo": "Arturo Longton exige su pago en reality",
    "descripcion_corta": "Longton desata una rabieta exigiendo el pago de su sueldo en La Granja VIP.",
    "año": 2005,
    "categoria": "tv"
  },
  {
    "id": 820,
    "titulo": "El 'estúpida, mi pelo, idiota' en Caso Cerrado",
    "descripcion_corta": "El joven chileno Jay Colindres se hace viral mundialmente tras su participación en el programa.",
    "año": 2014,
    "categoria": "tv"
  },
  {
    "id": 821,
    "titulo": "El Rey León de Pinilla y Coté López",
    "descripcion_corta": "Escándalo farandulero tras el encuentro entre el futbolista y la modelo.",
    "año": 2007,
    "categoria": "escandalo"
  },
  {
    "id": 822,
    "titulo": "El video prohibido de la Geisha Chilena",
    "descripcion_corta": "Anita Alvarado desata polémica nacional tras filtrarse videos íntimos y declaraciones.",
    "año": 2002,
    "categoria": "escandalo"
  },
  {
    "id": 823,
    "titulo": "La huida de Pamela Díaz vestida de novia",
    "descripcion_corta": "Pamela Díaz arranca de la prensa farandulera subiendo a un auto con su vestido de novia.",
    "año": 2006,
    "categoria": "escandalo"
  },
  {
    "id": 824,
    "titulo": "El 'bautizazo' de la selección chilena",
    "descripcion_corta": "Jugadores de la Roja llegan tarde y en estado de ebriedad a Juan Pinto Durán.",
    "año": 2011,
    "categoria": "escandalo"
  },
  {
    "id": 825,
    "titulo": "Daniela Aránguiz y el 'tengo la pura cara de cuica'",
    "descripcion_corta": "Aránguiz acuña la mítica frase telefónica en una discusión con una modelo.",
    "año": 2012,
    "categoria": "escandalo"
  },
  {
    "id": 826,
    "titulo": "El choque de Vidal en Copa América",
    "descripcion_corta": "Arturo Vidal choca su Ferrari ebrio en pleno torneo continental.",
    "año": 2015,
    "categoria": "escandalo"
  },
  {
    "id": 827,
    "titulo": "Kenita Larraín llega en silla de ruedas al aeropuerto",
    "descripcion_corta": "Kenita vuelve de Costa Rica en silla de ruedas tras un confuso altercado con Marcelo Ríos.",
    "año": 2006,
    "categoria": "escandalo"
  },
  {
    "id": 828,
    "titulo": "Chino Ríos orina a periodistas en La Serena",
    "descripcion_corta": "El ex número uno de tenis protagoniza un escándalo al orinar a la prensa en una discoteca.",
    "año": 2001,
    "categoria": "escandalo"
  },
  {
    "id": 829,
    "titulo": "El video prohibido de Lucho Jara",
    "descripcion_corta": "Polémica por la filtración de un video del cantante en una situación comprometida.",
    "año": 1999,
    "categoria": "escandalo"
  },
  {
    "id": 830,
    "titulo": "El fin de la relación de Marcelo Ríos y Kenita Larraín",
    "descripcion_corta": "Quiebre matrimonial express que copó los matinales y portadas chilenas.",
    "año": 2004,
    "categoria": "escandalo"
  },
  {
    "id": 831,
    "titulo": "La mechoneada de la farándula",
    "descripcion_corta": "Pelea en una discoteca de Santiago entre Titi Ahubert y Daniella Campos por Iván Zamorano.",
    "año": 1999,
    "categoria": "escandalo"
  },
  {
    "id": 832,
    "titulo": "El escándalo del raspado de la olla",
    "descripcion_corta": "Se filtran correos de políticos pidiendo financiamiento ilegal en el caso Penta.",
    "año": 2014,
    "categoria": "escandalo"
  },
  {
    "id": 833,
    "titulo": "El caso de la Quintrala",
    "descripcion_corta": "Detención de María del Pilar Pérez tras encargar asesinatos familiares en Providencia.",
    "año": 2008,
    "categoria": "escandalo"
  },
  {
    "id": 834,
    "titulo": "La detención del Profesor Campusano",
    "descripcion_corta": "El popular educador de la TV es detenido por deudas, copando la prensa rosa.",
    "año": 2002,
    "categoria": "escandalo"
  },
  {
    "id": 835,
    "titulo": "Jordi Castell y el 'bomba' en SQP",
    "descripcion_corta": "Jordi lanza un rumor explosivo iniciando una nueva era de filtraciones en vivo.",
    "año": 2005,
    "categoria": "escandalo"
  },
  {
    "id": 836,
    "titulo": "El choque de la 'Fiera' Pamela Díaz",
    "descripcion_corta": "Pamela Díaz protagoniza un altercado de tránsito tras colisionar con otro vehículo.",
    "año": 2007,
    "categoria": "escandalo"
  },
  {
    "id": 837,
    "titulo": "El autogolazo de Junior Playboy en Twitter",
    "descripcion_corta": "El personaje de realities sube por error una foto polémica comprometiendo a un animador.",
    "año": 2013,
    "categoria": "escandalo"
  },
  {
    "id": 838,
    "titulo": "El Bulo de la Geisha en España",
    "descripcion_corta": "Anita Alvarado viaja a España prometiendo revelar secretos de magnates.",
    "año": 2003,
    "categoria": "escandalo"
  },
  {
    "id": 839,
    "titulo": "El 'puertazo' de la selección en Venezuela",
    "descripcion_corta": "Jugadores chilenos destrozan el hotel de concentración en la Copa América de Venezuela.",
    "año": 2007,
    "categoria": "escandalo"
  },
  {
    "id": 840,
    "titulo": "El escándalo del 'Arañazo'",
    "descripcion_corta": "Maura Rivera y Yamna Lobos protagonizan una tensa pelea de camarines y celos en Rojo.",
    "año": 2013,
    "categoria": "escandalo"
  },
  {
    "id": 841,
    "titulo": "El viral de Rosa Espinoza",
    "descripcion_corta": "Discusión familiar santiaguina llena de ingeniosos garabatos en los inicios de YouTube.",
    "año": 2007,
    "categoria": "viral"
  },
  {
    "id": 842,
    "titulo": "Adiós Tía Paty, Adiós Tía Lela",
    "descripcion_corta": "Madre graba una canción para maestras y reparte golpes a sus hijos por interrumpirla.",
    "año": 2012,
    "categoria": "viral"
  },
  {
    "id": 843,
    "titulo": "El Zafrada",
    "descripcion_corta": "El niño Víctor Díaz enternece al país tras el terremoto al pedir 'zafradas'.",
    "año": 2010,
    "categoria": "viral"
  },
  {
    "id": 844,
    "titulo": "La caída del Tarro",
    "descripcion_corta": "Niño cae acrobáticamente de su bicicleta en Talca rodeado de amigos relatores.",
    "año": 2014,
    "categoria": "viral"
  },
  {
    "id": 845,
    "titulo": "Las Calilas y las Mojojojo",
    "descripcion_corta": "Entrevista vecinal en Maipú donde se acuñan míticos apodos del barrio.",
    "año": 2019,
    "categoria": "viral"
  },
  {
    "id": 846,
    "titulo": "El entierro de Chimuelo",
    "descripcion_corta": "Funeral de una cotorra en el patio que termina con un perro atacando el cuerpo.",
    "año": 2019,
    "categoria": "viral"
  },
  {
    "id": 847,
    "titulo": "La caída de Edgar",
    "descripcion_corta": "Hito viral hispanoamericano: la caída de un niño al río desde un tronco de madera.",
    "año": 2006,
    "categoria": "viral"
  },
  {
    "id": 848,
    "titulo": "Alexis Sánchez y el penal de la Copa América",
    "descripcion_corta": "Alexis pica el penal definitivo, coronando a Chile campeón de América por primera vez.",
    "año": 2015,
    "categoria": "viral"
  },
  {
    "id": 849,
    "titulo": "El Manjarsh",
    "descripcion_corta": "Hombre prueba un trago al aire libre y exclama de forma graciosa 'un manjarsh'.",
    "año": 2015,
    "categoria": "viral"
  },
  {
    "id": 850,
    "titulo": "El 'anda a laar' de la entrevista policial",
    "descripcion_corta": "Un delincuente manda a lavar ropa a los reporteros tras ser detenido.",
    "año": 2016,
    "categoria": "viral"
  },
  {
    "id": 851,
    "titulo": "El 'tengo las tetas operadas' de Luli",
    "descripcion_corta": "Nicole Moreno desglosa sus cirugías en vivo y en directo con su tono característico.",
    "año": 2008,
    "categoria": "viral"
  },
  {
    "id": 852,
    "titulo": "El caballero de las empanadas Farkas",
    "descripcion_corta": "Un hombre alega ser compañero de Farkas y exige comida gratis en un despacho.",
    "año": 2009,
    "categoria": "viral"
  },
  {
    "id": 853,
    "titulo": "Farkas regala billetes de 20 lucas en Viña",
    "descripcion_corta": "El filántropo desata la locura regalando dinero en efectivo a la prensa y público.",
    "año": 2009,
    "categoria": "viral"
  },
  {
    "id": 854,
    "titulo": "El 'curao no vale' en el matinal",
    "descripcion_corta": "Un entrevistado ebrio en la playa entrega su particular visión del amor y la fidelidad.",
    "año": 2017,
    "categoria": "viral"
  },
  {
    "id": 855,
    "titulo": "El viral de 'Ataca Sergio, ataca'",
    "descripcion_corta": "Un deudor le pide a su perro que ataque al receptor, pero el can no hace nada.",
    "año": 2016,
    "categoria": "viral"
  },
  {
    "id": 856,
    "titulo": "El 'víctima' de Chilevisión Noticias",
    "descripcion_corta": "Una vecina alega ser una 'víctima' de las circunstancias gritándolo de forma graciosa.",
    "año": 2015,
    "categoria": "viral"
  },
  {
    "id": 857,
    "titulo": "El Compadre Moncho es declarado monumento vivo",
    "descripcion_corta": "El querido actor Adriano Castillo recibe un cómico reconocimiento popular por su ubicuidad en Santiago.",
    "año": 2013,
    "categoria": "viral"
  },
  {
    "id": 858,
    "titulo": "El tatuaje del palo de Pinilla",
    "descripcion_corta": "Mauricio Pinilla se tatúa el tiro al travesaño del mundial de Brasil con la frase 'a un centímetro de la gloria'.",
    "año": 2014,
    "categoria": "viral"
  },
  {
    "id": 859,
    "titulo": "El viral de 'me paseé a la farándula'",
    "descripcion_corta": "Felipe Avello relata sus mejores troleos telefónicos a la televisión.",
    "año": 2018,
    "categoria": "viral"
  },
  {
    "id": 860,
    "titulo": "El regreso de Marcelo Salas a la U",
    "descripcion_corta": "El 'Matador' vuelve al club de sus amores desatando la locura en el Estadio Nacional.",
    "año": 2005,
    "categoria": "viral"
  }
];

const CARDS_EDIFICIOS = [
  {
    "id": 901,
    "titulo": "Burj Khalifa (Dubái)",
    "descripcion_corta": "El edificio más alto construido por el ser humano, ubicado en Emiratos Árabes.",
    "año": 828,
    "valor_display": "828 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 902,
    "titulo": "Shanghai Tower (Shanghái)",
    "descripcion_corta": "Rascacielos helicoidal con el segundo observatorio más alto de la Tierra.",
    "año": 632,
    "valor_display": "632 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 903,
    "titulo": "Abraj Al Bait Clock Tower (La Meca)",
    "descripcion_corta": "Complejo de rascacielos gubernamental que cuenta con el reloj más grande del mundo.",
    "año": 601,
    "valor_display": "601 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 904,
    "titulo": "Ping An Finance Centre (Shenzhen)",
    "descripcion_corta": "Rascacielos súper alto con una fachada de acero inoxidable muy estilizada.",
    "año": 599,
    "valor_display": "599 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 905,
    "titulo": "Lotte World Tower (Seúl)",
    "descripcion_corta": "La estructura más alta de Corea del Sur y el quinto rascacielos del mundo.",
    "año": 555,
    "valor_display": "555 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 906,
    "titulo": "One World Trade Center (Nueva York)",
    "descripcion_corta": "Edificio principal del reconstruido World Trade Center en la zona del Bajo Manhattan.",
    "año": 541,
    "valor_display": "541 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 907,
    "titulo": "Taipei 101 (Taipei)",
    "descripcion_corta": "Rascacielos taiwanés famoso por su amortiguador de viento gigante para terremotos.",
    "año": 508,
    "valor_display": "508 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 908,
    "titulo": "Torres Petronas (Kuala Lumpur)",
    "descripcion_corta": "Las torres gemelas de hormigón armado más altas del mundo, con su puente aéreo.",
    "año": 452,
    "valor_display": "452 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 909,
    "titulo": "Empire State Building (Nueva York)",
    "descripcion_corta": "Símbolo icónico del Art Déco de Nueva York y el edificio más alto del mundo por 40 años.",
    "año": 381,
    "valor_display": "381 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 910,
    "titulo": "Chrysler Building (Nueva York)",
    "descripcion_corta": "Estructura icónica con su aguja de acero que fue brevemente la más alta del mundo.",
    "año": 319,
    "valor_display": "319 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 911,
    "titulo": "Shanghai World Financial Center",
    "descripcion_corta": "Rascacielos apodado 'el destapador' debido a su gran abertura trapezoidal superior.",
    "año": 492,
    "valor_display": "492 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 912,
    "titulo": "Gran Torre Santiago (Santiago de Chile)",
    "descripcion_corta": "El rascacielos más alto de Sudamérica, ubicado en el complejo Costanera Center.",
    "año": 300,
    "valor_display": "300 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 913,
    "titulo": "Space Needle (Seattle)",
    "descripcion_corta": "Torre de observación icónica construida para la Exposición Mundial del año 1962.",
    "año": 184,
    "valor_display": "184 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 914,
    "titulo": "Torre CN (Toronto)",
    "descripcion_corta": "Torre de radiodifusión que fue la estructura no sostenida por cables más alta del mundo.",
    "año": 553,
    "valor_display": "553 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 915,
    "titulo": "Burj Al Arab (Dubái)",
    "descripcion_corta": "Hotel de lujo con diseño de vela ubicado en una isla artificial en Emiratos Árabes.",
    "año": 321,
    "valor_display": "321 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 916,
    "titulo": "Torre Telefónica (Santiago de Chile)",
    "descripcion_corta": "Edificio diseñado con la forma de un clásico teléfono celular de los años noventa.",
    "año": 143,
    "valor_display": "143 m",
    "categoria": "edificio_moderno"
  },
  {
    "id": 917,
    "titulo": "Torre Eiffel (París)",
    "descripcion_corta": "Monumento de hierro forjado erigido para la Exposición Universal de París.",
    "año": 330,
    "valor_display": "330 m",
    "categoria": "historico"
  },
  {
    "id": 918,
    "titulo": "Torre de Pisa (Pisa)",
    "descripcion_corta": "La campanario inclinada de la catedral de Pisa, famosa por su inestabilidad del suelo.",
    "año": 56,
    "valor_display": "56 m",
    "categoria": "historico"
  },
  {
    "id": 919,
    "titulo": "Coliseo Romano (Roma)",
    "descripcion_corta": "El anfiteatro de la dinastía Flavia en la antigua Roma imperial.",
    "año": 48,
    "valor_display": "48 m",
    "categoria": "historico"
  },
  {
    "id": 920,
    "titulo": "Taj Mahal (Agra)",
    "descripcion_corta": "Mausoleo de mármol blanco construido por el emperador Shah Jahan para su esposa.",
    "año": 73,
    "valor_display": "73 m",
    "categoria": "historico"
  },
  {
    "id": 921,
    "titulo": "Gran Pirámide de Giza (Egipto)",
    "descripcion_corta": "La única de las siete maravillas del mundo antiguo que aún perdura en pie.",
    "año": 138,
    "valor_display": "138 m",
    "categoria": "historico"
  },
  {
    "id": 922,
    "titulo": "Estatua de la Libertad (Nueva York)",
    "descripcion_corta": "Monumento obsequiado por Francia para conmemorar el centenario de la independencia de EE.UU.",
    "año": 93,
    "valor_display": "93 m",
    "categoria": "historico"
  },
  {
    "id": 923,
    "titulo": "Big Ben / Elizabeth Tower (Londres)",
    "descripcion_corta": "La famosa torre del reloj de las Casas del Parlamento británico.",
    "año": 96,
    "valor_display": "96 m",
    "categoria": "historico"
  },
  {
    "id": 924,
    "titulo": "Cristo Redentor (Río de Janeiro)",
    "descripcion_corta": "Estatua monumental art déco de Jesús de Nazaret sobre el cerro Corcovado.",
    "año": 38,
    "valor_display": "38 m",
    "categoria": "historico"
  },
  {
    "id": 925,
    "titulo": "Ópera de Sídney (Sídney)",
    "descripcion_corta": "Icónica obra arquitectónica de conchas entrelazadas del arquitecto Jørn Utzon.",
    "año": 65,
    "valor_display": "65 m",
    "categoria": "historico"
  },
  {
    "id": 926,
    "titulo": "Catedral de San Basilio (Moscú)",
    "descripcion_corta": "Templo ortodoxo en la Plaza Roja famoso por sus cúpulas coloridas en forma de cebolla.",
    "año": 47,
    "valor_display": "47 m",
    "categoria": "historico"
  },
  {
    "id": 927,
    "titulo": "Basílica de San Pedro (Vaticano)",
    "descripcion_corta": "El templo principal de la Iglesia Católica y la iglesia de mayor volumen interno del mundo.",
    "año": 137,
    "valor_display": "137 m",
    "categoria": "historico"
  },
  {
    "id": 928,
    "titulo": "Partenón (Atenas)",
    "descripcion_corta": "El templo consagrado a la diosa Atenea en la Acrópolis de Atenas.",
    "año": 13,
    "valor_display": "13 m",
    "categoria": "historico"
  },
  {
    "id": 929,
    "titulo": "Templo Mayor (Tenochtitlan)",
    "descripcion_corta": "El centro de la vida religiosa mexica en la antigua ciudad de Tenochtitlan.",
    "año": 30,
    "valor_display": "30 m",
    "categoria": "historico"
  },
  {
    "id": 930,
    "titulo": "Pirámide del Sol (Teotihuacán)",
    "descripcion_corta": "La edificación más grande de la antigua zona arqueológica mexicana de Teotihuacán.",
    "año": 65,
    "valor_display": "65 m",
    "categoria": "historico"
  }
];

const CARDS_GUERRAS = [
  {
    "id": 931,
    "titulo": "Asesinato del Archiduque Francisco Fernando",
    "descripcion_corta": "El magnicidio en Sarajevo del heredero de Austria que detonó la Primera Guerra Mundial.",
    "año": 1914.49,
    "valor_display": "28 Jun 1914",
    "categoria": "ww1"
  },
  {
    "id": 932,
    "titulo": "Declaración de guerra de Austria-Hungría a Serbia",
    "descripcion_corta": "Da inicio de forma oficial a las hostilidades y al sistema de alianzas europeo.",
    "año": 1914.57,
    "valor_display": "28 Jul 1914",
    "categoria": "ww1"
  },
  {
    "id": 933,
    "titulo": "Invasión alemana a Bélgica",
    "descripcion_corta": "Alemania cruza las fronteras belgas, gatillando la entrada de Gran Bretaña a la guerra.",
    "año": 1914.59,
    "valor_display": "4 Ago 1914",
    "categoria": "ww1"
  },
  {
    "id": 934,
    "titulo": "Batalla de Tannenberg",
    "descripcion_corta": "Gran victoria alemana contra el ejército del Imperio Ruso en el frente oriental.",
    "año": 1914.65,
    "valor_display": "26 Ago 1914",
    "categoria": "ww1"
  },
  {
    "id": 935,
    "titulo": "Primera Batalla del Marne",
    "descripcion_corta": "Contraataque aliado que frena el avance alemán hacia París, iniciando la guerra de trincheras.",
    "año": 1914.68,
    "valor_display": "5 Sep 1914",
    "categoria": "ww1"
  },
  {
    "id": 936,
    "titulo": "Batalla de Ypres (Inicio)",
    "descripcion_corta": "Sangriento enfrentamiento en Flandes que selló la llamada 'Carrera hacia el mar'.",
    "año": 1914.8,
    "valor_display": "19 Oct 1914",
    "categoria": "ww1"
  },
  {
    "id": 937,
    "titulo": "Tregua de Navidad en el frente occidental",
    "descripcion_corta": "Soldados alemanes y británicos declaran un cese informal cantando villancicos.",
    "año": 1914.98,
    "valor_display": "24 Dic 1914",
    "categoria": "ww1"
  },
  {
    "id": 938,
    "titulo": "Segunda Batalla de Ypres",
    "descripcion_corta": "Primer uso masivo de armas químicas (gas cloro) por el ejército alemán.",
    "año": 1915.3,
    "valor_display": "22 Abr 1915",
    "categoria": "ww1"
  },
  {
    "id": 939,
    "titulo": "Hundimiento del RMS Lusitania",
    "descripcion_corta": "Submarino alemán torpedea el transatlántico británico, generando indignación en EE.UU.",
    "año": 1915.34,
    "valor_display": "7 May 1915",
    "categoria": "ww1"
  },
  {
    "id": 940,
    "titulo": "Inicio de la Batalla de Gallipoli",
    "descripcion_corta": "Desembarco aliado en el Imperio Otomano que terminaría en un costoso desastre.",
    "año": 1915.31,
    "valor_display": "25 Abr 1915",
    "categoria": "ww1"
  },
  {
    "id": 941,
    "titulo": "Batalla de Verdún (Inicio)",
    "descripcion_corta": "El conflicto más largo y sangriento de la Gran Guerra en las colinas de Verdún.",
    "año": 1916.14,
    "valor_display": "21 Feb 1916",
    "categoria": "ww1"
  },
  {
    "id": 942,
    "titulo": "Batalla de Jutlandia",
    "descripcion_corta": "El mayor combate naval de la guerra entre las flotas británica y alemana en el Mar del Norte.",
    "año": 1916.41,
    "valor_display": "31 May 1916",
    "categoria": "ww1"
  },
  {
    "id": 943,
    "titulo": "Batalla del Somme (Inicio)",
    "descripcion_corta": "Gran ofensiva aliada que registra el día más trágico en la historia militar británica.",
    "año": 1916.5,
    "valor_display": "1 Jul 1916",
    "categoria": "ww1"
  },
  {
    "id": 944,
    "titulo": "Fallecimiento del Emperador Francisco José I",
    "descripcion_corta": "Muere el anciano monarca austrohúngaro tras 68 años de reinado.",
    "año": 1916.89,
    "valor_display": "21 Nov 1916",
    "categoria": "ww1"
  },
  {
    "id": 945,
    "titulo": "Telegrama Zimmermann interceptado",
    "descripcion_corta": "Propuesta secreta alemana a México para una alianza militar contra Estados Unidos.",
    "año": 1917.04,
    "valor_display": "16 Ene 1917",
    "categoria": "ww1"
  },
  {
    "id": 946,
    "titulo": "Abdicación del Zar Nicolás II",
    "descripcion_corta": "El soberano abdica tras la Revolución de Febrero, terminando la dinastía Románov en Rusia.",
    "año": 1917.2,
    "valor_display": "15 Mar 1917",
    "categoria": "ww1"
  },
  {
    "id": 947,
    "titulo": "Estados Unidos declara la guerra a Alemania",
    "descripcion_corta": "Woodrow Wilson rompe la neutralidad norteamericana tras ataques de submarinos.",
    "año": 1917.26,
    "valor_display": "6 Abr 1917",
    "categoria": "ww1"
  },
  {
    "id": 948,
    "titulo": "Batalla de Passchendaele",
    "descripcion_corta": "Ofensiva aliada en el barro de Flandes famosa por sus dantescas condiciones climáticas.",
    "año": 1917.58,
    "valor_display": "31 Jul 1917",
    "categoria": "ww1"
  },
  {
    "id": 949,
    "titulo": "Revolución de Octubre en Rusia",
    "descripcion_corta": "Los bolcheviques asumen el poder e inician la salida rusa del conflicto armado.",
    "año": 1917.85,
    "valor_display": "7 Nov 1917",
    "categoria": "ww1"
  },
  {
    "id": 950,
    "titulo": "Declaración Balfour",
    "descripcion_corta": "Carta del gobierno británico apoyando la creación de un 'hogar nacional judío' en Palestina.",
    "año": 1917.84,
    "valor_display": "2 Nov 1917",
    "categoria": "ww1"
  },
  {
    "id": 951,
    "titulo": "Ofensiva de Primavera alemana",
    "descripcion_corta": "Gran ataque final alemán (Kaiserschlacht) en el frente occidental antes de la llegada de EE.UU.",
    "año": 1918.22,
    "valor_display": "21 Mar 1918",
    "categoria": "ww1"
  },
  {
    "id": 952,
    "titulo": "Firma del Tratado de Brest-Litovsk",
    "descripcion_corta": "Acuerdo de paz por separado firmado entre Rusia soviética y los Imperios Centrales.",
    "año": 1918.17,
    "valor_display": "3 Mar 1918",
    "categoria": "ww1"
  },
  {
    "id": 953,
    "titulo": "Ofensiva de los Cien Días",
    "descripcion_corta": "Contraataque aliado masivo que rompe las líneas de defensa alemanas definitivamente.",
    "año": 1918.6,
    "valor_display": "8 Ago 1918",
    "categoria": "ww1"
  },
  {
    "id": 954,
    "titulo": "Armisticio del 11 de Noviembre",
    "descripcion_corta": "Se firma el alto al fuego que pone fin definitivo a los combates de la Gran Guerra.",
    "año": 1918.86,
    "valor_display": "11 Nov 1918",
    "categoria": "ww1"
  },
  {
    "id": 955,
    "titulo": "Firma del Tratado de Versalles",
    "descripcion_corta": "Tratado que impone duras condiciones políticas y económicas a la derrotada Alemania.",
    "año": 1919.49,
    "valor_display": "28 Jun 1919",
    "categoria": "ww1"
  },
  {
    "id": 956,
    "titulo": "Invasión alemana a Polonia",
    "descripcion_corta": "La Alemania nazi cruza la frontera polaca, desatando la Segunda Guerra Mundial.",
    "año": 1939.67,
    "valor_display": "1 Sep 1939",
    "categoria": "ww2"
  },
  {
    "id": 957,
    "titulo": "Batalla de Dunkerque (Operación Dinamo)",
    "descripcion_corta": "Evacuación marítima masiva de las tropas aliadas acorraladas en el norte de Francia.",
    "año": 1940.4,
    "valor_display": "26 May 1940",
    "categoria": "ww2"
  },
  {
    "id": 958,
    "titulo": "Capitulación de Francia ante Alemania",
    "descripcion_corta": "Se firma el armisticio francés en el vagón de tren de Compiègne.",
    "año": 1940.47,
    "valor_display": "22 Jun 1940",
    "categoria": "ww2"
  },
  {
    "id": 959,
    "titulo": "Inicio de la Batalla de Inglaterra",
    "descripcion_corta": "Campaña de combates aéreos en el cielo británico entre la Luftwaffe y la RAF.",
    "año": 1940.52,
    "valor_display": "10 Jul 1940",
    "categoria": "ww2"
  },
  {
    "id": 960,
    "titulo": "Inicio de la Operación Barbarroja",
    "descripcion_corta": "Alemania rompe el pacto de no agresión e invade la Unión Soviética.",
    "año": 1941.47,
    "valor_display": "22 Jun 1941",
    "categoria": "ww2"
  },
  {
    "id": 961,
    "titulo": "Cerco de Leningrado (Inicio)",
    "descripcion_corta": "Largo bloqueo militar alemán sobre la ciudad soviética que duró más de dos años.",
    "año": 1941.69,
    "valor_display": "8 Sep 1941",
    "categoria": "ww2"
  },
  {
    "id": 962,
    "titulo": "Ataque sorpresa a Pearl Harbor",
    "descripcion_corta": "La Armada Imperial Japonesa bombardea la base de EE.UU. en Hawái, provocando su entrada.",
    "año": 1941.93,
    "valor_display": "7 Dic 1941",
    "categoria": "ww2"
  },
  {
    "id": 963,
    "titulo": "Conferencia de Wannsee",
    "descripcion_corta": "Reunión de líderes nazis para planificar de forma sistemática la 'Solución final' judía.",
    "año": 1942.05,
    "valor_display": "20 Ene 1942",
    "categoria": "ww2"
  },
  {
    "id": 964,
    "titulo": "Batalla de Midway (Inicio)",
    "descripcion_corta": "Enfrentamiento aeronaval crucial en el Pacífico donde Japón pierde cuatro portaaviones.",
    "año": 1942.42,
    "valor_display": "4 Jun 1942",
    "categoria": "ww2"
  },
  {
    "id": 965,
    "titulo": "Inicio de la Batalla de Stalingrado",
    "descripcion_corta": "Feroz combate urbano considerado el punto de inflexión decisivo del frente oriental.",
    "año": 1942.64,
    "valor_display": "23 Ago 1942",
    "categoria": "ww2"
  },
  {
    "id": 966,
    "titulo": "Segunda Batalla de El Alamein",
    "descripcion_corta": "Victoria británica clave en el norte de África contra el Afrika Korps de Rommel.",
    "año": 1942.81,
    "valor_display": "23 Oct 1942",
    "categoria": "ww2"
  },
  {
    "id": 967,
    "titulo": "Operación Antorcha (Desembarco)",
    "descripcion_corta": "Invasión angloestadounidense del norte de África francés.",
    "año": 1942.85,
    "valor_display": "8 Nov 1942",
    "categoria": "ww2"
  },
  {
    "id": 968,
    "titulo": "Rendición alemana en Stalingrado",
    "descripcion_corta": "El mariscal de campo Friedrich Paulus capitula junto al remanente del 6.º Ejército.",
    "año": 1943.08,
    "valor_display": "2 Feb 1943",
    "categoria": "ww2"
  },
  {
    "id": 969,
    "titulo": "Batalla de Kursk",
    "descripcion_corta": "El mayor enfrentamiento de tanques de la historia, en el frente oriental soviético.",
    "año": 1943.51,
    "valor_display": "5 Jul 1943",
    "categoria": "ww2"
  },
  {
    "id": 970,
    "titulo": "Caída de Benito Mussolini",
    "descripcion_corta": "El Gran Consejo Fascista destituye a Mussolini tras la invasión aliada de Sicilia.",
    "año": 1943.56,
    "valor_display": "25 Jul 1943",
    "categoria": "ww2"
  },
  {
    "id": 971,
    "titulo": "Desembarco de Normandía (Día D)",
    "descripcion_corta": "La mayor invasión anfibia de la historia abre el segundo frente aliado en Europa.",
    "año": 1944.43,
    "valor_display": "6 Jun 1944",
    "categoria": "ww2"
  },
  {
    "id": 972,
    "titulo": "Liberación de París",
    "descripcion_corta": "Las tropas aliadas y la resistencia francesa entran triunfantes a la capital liberada.",
    "año": 1944.65,
    "valor_display": "25 Ago 1944",
    "categoria": "ww2"
  },
  {
    "id": 973,
    "titulo": "Inicio de la Batalla de las Ardenas",
    "descripcion_corta": "Último gran contraataque alemán en el frente occidental europeo.",
    "año": 1944.96,
    "valor_display": "16 Dic 1944",
    "categoria": "ww2"
  },
  {
    "id": 974,
    "titulo": "Conferencia de Yalta",
    "descripcion_corta": "Reunión de Churchill, Roosevelt y Stalin para acordar el reparto y futuro de Europa.",
    "año": 1945.1,
    "valor_display": "4 Feb 1945",
    "categoria": "ww2"
  },
  {
    "id": 975,
    "titulo": "Batalla de Iwo Jima (Inicio)",
    "descripcion_corta": "Asalto militar anfibio estadounidense contra la fortificada isla volcánica japonesa.",
    "año": 1945.13,
    "valor_display": "19 Feb 1945",
    "categoria": "ww2"
  },
  {
    "id": 976,
    "titulo": "Suicidio de Adolf Hitler en el búnker",
    "descripcion_corta": "El líder nazi se quita la vida en el búnker ante la llegada de tropas soviéticas a Berlín.",
    "año": 1945.33,
    "valor_display": "30 Abr 1945",
    "categoria": "ww2"
  },
  {
    "id": 977,
    "titulo": "Rendición incondicional de Alemania",
    "descripcion_corta": "Firma de capitulación militar final (Día de la Victoria en Europa).",
    "año": 1945.35,
    "valor_display": "8 May 1945",
    "categoria": "ww2"
  },
  {
    "id": 978,
    "titulo": "Lanzamiento de bomba atómica en Hiroshima",
    "descripcion_corta": "El bombardero Enola Gay arroja la bomba atómica de uranio 'Little Boy'.",
    "año": 1945.6,
    "valor_display": "6 Ago 1945",
    "categoria": "ww2"
  },
  {
    "id": 979,
    "titulo": "Lanzamiento de bomba atómica en Nagasaki",
    "descripcion_corta": "Se arroja la bomba de plutonio 'Fat Man' tres días después del primer ataque.",
    "año": 1945.61,
    "valor_display": "9 Ago 1945",
    "categoria": "ww2"
  },
  {
    "id": 980,
    "titulo": "Firma de la rendición oficial de Japón",
    "descripcion_corta": "Se firma la capitulación a bordo del USS Missouri, finalizando la Segunda Guerra Mundial.",
    "año": 1945.67,
    "valor_display": "2 Sep 1945",
    "categoria": "ww2"
  }
];

const CARDS_MONTANAS = [
  {
    "id": 981,
    "titulo": "Nevado Ojos del Salado",
    "descripcion_corta": "El volcán más alto de la Tierra y la cumbre más alta de Chile, en el límite con Argentina.",
    "año": 6893,
    "valor_display": "6893 m",
    "categoria": "montana_chile"
  },
  {
    "id": 982,
    "titulo": "Volcán Llullaillaco",
    "descripcion_corta": "Volcán andino famoso por albergar las momias arqueológicas más altas del mundo.",
    "año": 6739,
    "valor_display": "6739 m",
    "categoria": "montana_chile"
  },
  {
    "id": 983,
    "titulo": "Cerro Tupungato",
    "descripcion_corta": "Uno de los volcanes más altos del mundo, ubicado en los Andes centrales.",
    "año": 6570,
    "valor_display": "6570 m",
    "categoria": "montana_chile"
  },
  {
    "id": 984,
    "titulo": "Volcán Parinacota",
    "descripcion_corta": "Imponente volcán con forma de cono perfecto en el Parque Nacional Lauca.",
    "año": 6342,
    "valor_display": "6342 m",
    "categoria": "montana_chile"
  },
  {
    "id": 985,
    "titulo": "Cerro Marmolejo",
    "descripcion_corta": "El seismil más austral del planeta, ubicado en el Cajón del Maipo.",
    "año": 6108,
    "valor_display": "6108 m",
    "categoria": "montana_chile"
  },
  {
    "id": 986,
    "titulo": "Cerro El Plomo",
    "descripcion_corta": "Cumbre guardiana de Santiago donde los incas realizaban ceremonias sagradas.",
    "año": 5424,
    "valor_display": "5424 m",
    "categoria": "montana_chile"
  },
  {
    "id": 987,
    "titulo": "Volcán Lanín",
    "descripcion_corta": "Estratovolcán en la frontera con Argentina, destacado por su silueta nevada.",
    "año": 3747,
    "valor_display": "3747 m",
    "categoria": "montana_chile"
  },
  {
    "id": 988,
    "titulo": "Volcán Tronador",
    "descripcion_corta": "Montaña andina llamada así por el ruido de los desprendimientos de sus glaciares.",
    "año": 3491,
    "valor_display": "3491 m",
    "categoria": "montana_chile"
  },
  {
    "id": 989,
    "titulo": "Cerro San Ramón",
    "descripcion_corta": "La cumbre más visible que corona la sierra homónima al oriente de Santiago.",
    "año": 3256,
    "valor_display": "3256 m",
    "categoria": "montana_chile"
  },
  {
    "id": 990,
    "titulo": "Volcán Llaima",
    "descripcion_corta": "Uno de los volcanes más grandes y activos de Chile, en el Parque Nacional Conguillío.",
    "año": 3125,
    "valor_display": "3125 m",
    "categoria": "montana_chile"
  },
  {
    "id": 991,
    "titulo": "Volcán Villarrica",
    "descripcion_corta": "Volcán muy activo con un lago de lava abierto en su cráter.",
    "año": 2847,
    "valor_display": "2847 m",
    "categoria": "montana_chile"
  },
  {
    "id": 992,
    "titulo": "Volcán Osorno",
    "descripcion_corta": "Famoso volcán del sur de Chile conocido por su parecido al monte Fuji.",
    "año": 2652,
    "valor_display": "2652 m",
    "categoria": "montana_chile"
  },
  {
    "id": 993,
    "titulo": "Torres del Paine (Torre Central)",
    "descripcion_corta": "El pico central de las tres famosas agujas de granito de la Patagonia.",
    "año": 2460,
    "valor_display": "2460 m",
    "categoria": "montana_chile"
  },
  {
    "id": 994,
    "titulo": "Volcán Hudson",
    "descripcion_corta": "Volcán de la Patagonia cuya violenta erupción de 1991 cubrió de cenizas el sur del continente.",
    "año": 1905,
    "valor_display": "1905 m",
    "categoria": "montana_chile"
  },
  {
    "id": 995,
    "titulo": "Cerro La Campana",
    "descripcion_corta": "Cumbre costera escalada por Charles Darwin en 1834, con palmas chilenas en sus faldas.",
    "año": 1828,
    "valor_display": "1828 m",
    "categoria": "montana_chile"
  },
  {
    "id": 996,
    "titulo": "Cerro Manquehue",
    "descripcion_corta": "El cerro más alto del valle de Santiago central, muy popular para trekking.",
    "año": 1638,
    "valor_display": "1638 m",
    "categoria": "montana_chile"
  },
  {
    "id": 997,
    "titulo": "Cerro Providencia",
    "descripcion_corta": "Cerro de la precordillera andina de Santiago.",
    "año": 1636,
    "valor_display": "1636 m",
    "categoria": "montana_chile"
  },
  {
    "id": 998,
    "titulo": "Cerro Renca",
    "descripcion_corta": "Cerro isla del sector norponiente de Santiago.",
    "año": 905,
    "valor_display": "905 m",
    "categoria": "montana_chile"
  },
  {
    "id": 999,
    "titulo": "Cerro San Cristóbal",
    "descripcion_corta": "Cerro isla en Santiago que alberga el Parque Metropolitano y el santuario de la Virgen.",
    "año": 880,
    "valor_display": "880 m",
    "categoria": "montana_chile"
  },
  {
    "id": 1000,
    "titulo": "Cerro Santa Lucía",
    "descripcion_corta": "Cerro histórico en el centro de Santiago donde Pedro de Valdivia fundó la ciudad.",
    "año": 629,
    "valor_display": "629 m",
    "categoria": "montana_chile"
  },
  {
    "id": 1001,
    "titulo": "Monte Everest",
    "descripcion_corta": "La montaña más alta de la Tierra sobre el nivel del mar, en la cordillera del Himalaya.",
    "año": 8848,
    "valor_display": "8848 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1002,
    "titulo": "K2 (Monte Godwin-Austen)",
    "descripcion_corta": "La segunda montaña más alta del mundo, considerada una de las más peligrosas para escalar.",
    "año": 8611,
    "valor_display": "8611 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1003,
    "titulo": "Kangchenjunga",
    "descripcion_corta": "La tercera cumbre más alta del mundo, ubicada entre India y Nepal.",
    "año": 8586,
    "valor_display": "8586 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1004,
    "titulo": "Lhotse",
    "descripcion_corta": "Montaña conectada directamente al Everest a través del Collado Sur.",
    "año": 8516,
    "valor_display": "8516 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1005,
    "titulo": "Makalu",
    "descripcion_corta": "Una de las montañas más difíciles del mundo por su cumbre en forma de pirámide de cuatro caras.",
    "año": 8485,
    "valor_display": "8485 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1006,
    "titulo": "Monte Aconcagua",
    "descripcion_corta": "La cumbre más alta de América y del Hemisferio Occidental, en la provincia de Mendoza (Argentina).",
    "año": 6961,
    "valor_display": "6961 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1007,
    "titulo": "Denali (Monte McKinley)",
    "descripcion_corta": "La montaña más alta de América del Norte, ubicada en Alaska.",
    "año": 6190,
    "valor_display": "6190 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1008,
    "titulo": "Monte Kilimanjaro",
    "descripcion_corta": "La montaña independiente más alta del mundo y la cumbre más alta de África.",
    "año": 5895,
    "valor_display": "5895 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1009,
    "titulo": "Monte Elbrus",
    "descripcion_corta": "La cumbre más alta de Europa y el pico más alto de la cordillera del Cáucaso.",
    "año": 5642,
    "valor_display": "5642 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1010,
    "titulo": "Monte Vinson",
    "descripcion_corta": "La montaña más alta de la Antártida, ubicada en la cordillera Sentinel.",
    "año": 4892,
    "valor_display": "4892 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1011,
    "titulo": "Mont Blanc / Monte Bianco",
    "descripcion_corta": "La cumbre más alta de los Alpes y de Europa Occidental.",
    "año": 4807,
    "valor_display": "4807 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1012,
    "titulo": "Matterhorn (Monte Cervino)",
    "descripcion_corta": "Famosa montaña piramidal de los Alpes, símbolo emblemático de Suiza.",
    "año": 4478,
    "valor_display": "4478 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1013,
    "titulo": "Monte Fuji",
    "descripcion_corta": "El volcán sagrado y la cumbre más alta de Japón, icono cultural del país.",
    "año": 3776,
    "valor_display": "3776 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1014,
    "titulo": "Aoraki / Mount Cook",
    "descripcion_corta": "La cumbre más alta de Nueva Zelanda, ubicada en los Alpes del Sur.",
    "año": 3724,
    "valor_display": "3724 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1015,
    "titulo": "Monte Olimpo",
    "descripcion_corta": "La montaña más alta de Grecia, mitológico hogar de los dioses olímpicos.",
    "año": 2917,
    "valor_display": "2917 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1016,
    "titulo": "Monte Sinaí",
    "descripcion_corta": "Montaña de Egipto sagrada para las religiones abrahámicas.",
    "año": 2285,
    "valor_display": "2285 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1017,
    "titulo": "Monte Kosciuszko",
    "descripcion_corta": "La cumbre más alta de la isla continental de Australia.",
    "año": 2228,
    "valor_display": "2228 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1018,
    "titulo": "Monte Vesubio",
    "descripcion_corta": "Volcán italiano famoso por la erupción que sepultó Pompeya y Herculano.",
    "año": 1281,
    "valor_display": "1281 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1019,
    "titulo": "Table Mountain",
    "descripcion_corta": "Famosa montaña de cima plana que domina la ciudad de Ciudad del Cabo (Sudáfrica).",
    "año": 1086,
    "valor_display": "1086 m",
    "categoria": "montana_mundo"
  },
  {
    "id": 1020,
    "titulo": "Volcán Krakatoa",
    "descripcion_corta": "Volcán indonesio cuya violenta erupción de 1883 destruyó la isla casi por completo.",
    "año": 813,
    "valor_display": "813 m",
    "categoria": "montana_mundo"
  }
];

const CARDS_TECNOLOGIA = [
  {
    "id": 1051,
    "titulo": "Consola Atari 2600",
    "descripcion_corta": "Consola pionera de cartuchos intercambiables que popularizó los videojuegos en el hogar.",
    "año": 1977,
    "categoria": "tech_hardware"
  },
  {
    "id": 1052,
    "titulo": "Consola Famicom / NES (Nintendo)",
    "descripcion_corta": "Consola de 8 bits que rescató a la industria tras la crisis del videojuego de 1983.",
    "año": 1983,
    "categoria": "tech_hardware"
  },
  {
    "id": 1053,
    "titulo": "Consola Game Boy (Nintendo)",
    "descripcion_corta": "La consola portátil de cartuchos más exitosa de su era, vendida junto a Tetris.",
    "año": 1989,
    "categoria": "tech_hardware"
  },
  {
    "id": 1054,
    "titulo": "Consola Super Nintendo (SNES)",
    "descripcion_corta": "Legendaria consola de 16 bits que albergó clásicos de gran calidad gráfica bidimensional.",
    "año": 1990,
    "categoria": "tech_hardware"
  },
  {
    "id": 1055,
    "titulo": "Consola Sega Genesis / Mega Drive",
    "descripcion_corta": "Competidora directa de Nintendo que introdujo a Sonic el Erizo.",
    "año": 1988,
    "categoria": "tech_hardware"
  },
  {
    "id": 1056,
    "titulo": "Consola Sony PlayStation (PS1)",
    "descripcion_corta": "Consola de 32 bits que popularizó el formato CD-ROM y los gráficos 3D.",
    "año": 1994,
    "categoria": "tech_hardware"
  },
  {
    "id": 1057,
    "titulo": "Consola Nintendo 64 (N64)",
    "descripcion_corta": "Introdujo el stick analógico y mundos tridimensionales con Mario 64.",
    "año": 1996,
    "categoria": "tech_hardware"
  },
  {
    "id": 1058,
    "titulo": "Consola Sony PlayStation 2 (PS2)",
    "descripcion_corta": "La consola de sobremesa más vendida de la historia de los videojuegos.",
    "año": 2000,
    "categoria": "tech_hardware"
  },
  {
    "id": 1059,
    "titulo": "Consola Microsoft Xbox",
    "descripcion_corta": "Entrada de Microsoft al mercado de consolas, introduciendo el juego en línea Halo.",
    "año": 2001,
    "categoria": "tech_hardware"
  },
  {
    "id": 1060,
    "titulo": "Consola Nintendo GameCube",
    "descripcion_corta": "Consola con discos ópticos pequeños y un diseño compacto con asa.",
    "año": 2001,
    "categoria": "tech_hardware"
  },
  {
    "id": 1061,
    "titulo": "Consola Nintendo DS",
    "descripcion_corta": "Consola portátil de doble pantalla (una táctil) de gran éxito comercial.",
    "año": 2004,
    "categoria": "tech_hardware"
  },
  {
    "id": 1062,
    "titulo": "Consola Sony PlayStation Portable (PSP)",
    "descripcion_corta": "Portátil de alta potencia que competía con discos ópticos UMD.",
    "año": 2004,
    "categoria": "tech_hardware"
  },
  {
    "id": 1063,
    "titulo": "Consola Microsoft Xbox 360",
    "descripcion_corta": "Consola de alta definición pionera en la distribución digital y logros.",
    "año": 2005,
    "categoria": "tech_hardware"
  },
  {
    "id": 1064,
    "titulo": "Consola Nintendo Wii",
    "descripcion_corta": "Revolucionó el mercado con su control por movimiento, atrayendo al público familiar.",
    "año": 2006,
    "categoria": "tech_hardware"
  },
  {
    "id": 1065,
    "titulo": "Consola Sony PlayStation 3 (PS3)",
    "descripcion_corta": "Consola de alta definición equipada con reproductor de Blu-ray y procesador Cell.",
    "año": 2006,
    "categoria": "tech_hardware"
  },
  {
    "id": 1066,
    "titulo": "Consola Nintendo Switch",
    "descripcion_corta": "Consola híbrida portátil y de sobremesa de gran éxito comercial.",
    "año": 2017,
    "categoria": "tech_hardware"
  },
  {
    "id": 1067,
    "titulo": "Consola Sony PlayStation 5 (PS5)",
    "descripcion_corta": "Consola de novena generación destacada por su almacenamiento SSD ultra rápido.",
    "año": 2020,
    "categoria": "tech_hardware"
  },
  {
    "id": 1068,
    "titulo": "Lanzamiento del Computador Macintosh (Apple)",
    "descripcion_corta": "Computador personal que popularizó el ratón y la interfaz gráfica de usuario.",
    "año": 1984,
    "categoria": "tech_hardware"
  },
  {
    "id": 1069,
    "titulo": "Lanzamiento de Windows 95 (Microsoft)",
    "descripcion_corta": "Sistema operativo que introdujo el botón de Inicio y la barra de tareas.",
    "año": 1995,
    "categoria": "tech_hardware"
  },
  {
    "id": 1070,
    "titulo": "Lanzamiento del primer iPhone (Apple)",
    "descripcion_corta": "Teléfono inteligente que revolucionó el diseño de pantallas táctiles capacitivas.",
    "año": 2007,
    "categoria": "tech_hardware"
  },
  {
    "id": 1101,
    "titulo": "Lanzamiento de Pac-Man",
    "descripcion_corta": "Famoso juego de arcade de comer puntos esquivando fantasmas en un laberinto.",
    "año": 1980,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1102,
    "titulo": "Lanzamiento de Tetris",
    "descripcion_corta": "Juego de puzles de bloques de encaje creado en la Unión Soviética por Alekséi Pázhitnov.",
    "año": 1984,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1103,
    "titulo": "Lanzamiento de Super Mario Bros.",
    "descripcion_corta": "El juego de plataformas definitivo de NES que redefinió el género de desplazamiento lateral.",
    "año": 1985,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1104,
    "titulo": "Lanzamiento de The Legend of Zelda",
    "descripcion_corta": "Aventura no lineal que introdujo el sistema de guardado de partidas mediante batería.",
    "año": 1986,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1105,
    "titulo": "Lanzamiento de Doom",
    "descripcion_corta": "Pionero juego de disparos en primera persona en 3D que se distribuyó como shareware.",
    "año": 1993,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1106,
    "titulo": "Lanzamiento de Pokémon Ediciones Roja y Azul",
    "descripcion_corta": "Inicio de la franquicia multimedia de coleccionar y batallar monstruos de bolsillo.",
    "año": 1996,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1107,
    "titulo": "Lanzamiento de Grand Theft Auto III (GTA III)",
    "descripcion_corta": "Revolucionó los videojuegos de mundo abierto tridimensionales y sandbox de acción.",
    "año": 2001,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1108,
    "titulo": "Lanzamiento de World of Warcraft (WoW)",
    "descripcion_corta": "El MMORPG más popular del mundo que dominó la cultura de juegos de PC.",
    "año": 2004,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1109,
    "titulo": "Lanzamiento de League of Legends (LoL)",
    "descripcion_corta": "Hito del género MOBA que se convirtió en el eSport más jugado y visto.",
    "año": 2009,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1110,
    "titulo": "Lanzamiento de Minecraft",
    "descripcion_corta": "Juego de construcción sandbox de bloques que se transformó en el más vendido de la historia.",
    "año": 2011,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1111,
    "titulo": "Lanzamiento de Grand Theft Auto V (GTA V)",
    "descripcion_corta": "Hito de entretenimiento que recaudó mil millones de dólares en solo tres días.",
    "año": 2013,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1112,
    "titulo": "Lanzamiento de Pokémon GO",
    "descripcion_corta": "Fenómeno de realidad aumentada móvil que hizo salir a millones a capturar pokémon a la calle.",
    "año": 2016,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1113,
    "titulo": "Lanzamiento de Fortnite (Battle Royale)",
    "descripcion_corta": "Fenómeno cultural free-to-play masivo con mecánicas de construcción y bailes.",
    "año": 2017,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1114,
    "titulo": "Lanzamiento de Elden Ring",
    "descripcion_corta": "Aclamado videojuego de rol y acción de mundo abierto en colaboración con George R.R. Martin.",
    "año": 2022,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1115,
    "titulo": "Lanzamiento de Counter-Strike 1.6",
    "descripcion_corta": "Juego de disparos táctico multijugador por equipos de gran popularidad mundial.",
    "año": 2003,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1116,
    "titulo": "Lanzamiento de Portal (Valve)",
    "descripcion_corta": "Original juego de puzles en primera persona basado en portales dimensionales.",
    "año": 2007,
    "categoria": "tech_videojuegos"
  },
  {
    "id": 1151,
    "titulo": "Creación del World Wide Web (WWW)",
    "descripcion_corta": "Tim Berners-Lee propone el sistema de hipertexto que daría forma a la web moderna.",
    "año": 1989,
    "categoria": "tech_apps"
  },
  {
    "id": 1152,
    "titulo": "Lanzamiento de Google (Buscador)",
    "descripcion_corta": "Larry Page y Sergey Brin fundan el motor de búsqueda que organizó la web.",
    "año": 1998,
    "categoria": "tech_apps"
  },
  {
    "id": 1153,
    "titulo": "Lanzamiento de Wikipedia",
    "descripcion_corta": "Nace la enciclopedia libre y colaborativa editada por usuarios de todo el mundo.",
    "año": 2001,
    "categoria": "tech_apps"
  },
  {
    "id": 1154,
    "titulo": "Lanzamiento de Facebook (Thefacebook)",
    "descripcion_corta": "Red social universitaria creada por Mark Zuckerberg que redefinió la comunicación.",
    "año": 2004,
    "categoria": "tech_apps"
  },
  {
    "id": 1155,
    "titulo": "Lanzamiento de YouTube",
    "descripcion_corta": "Plataforma de videos que permitió a cualquier usuario subir y compartir contenido audiovisual.",
    "año": 2005,
    "categoria": "tech_apps"
  },
  {
    "id": 1156,
    "titulo": "Lanzamiento de Twitter (ahora X)",
    "descripcion_corta": "Red social de microblogueo basada originalmente en mensajes de 140 caracteres.",
    "año": 2006,
    "categoria": "tech_apps"
  },
  {
    "id": 1157,
    "titulo": "Lanzamiento de Netflix (Streaming)",
    "descripcion_corta": "La compañía introduce el servicio de video bajo demanda mediante transmisión por Internet.",
    "año": 2007,
    "categoria": "tech_apps"
  },
  {
    "id": 1158,
    "titulo": "Lanzamiento de Spotify",
    "descripcion_corta": "Plataforma sueca que popularizó el streaming musical bajo demanda legal.",
    "año": 2008,
    "categoria": "tech_apps"
  },
  {
    "id": 1159,
    "titulo": "Lanzamiento de WhatsApp",
    "descripcion_corta": "Aplicación de mensajería instantánea para teléfonos móviles que reemplazó a los SMS.",
    "año": 2009,
    "categoria": "tech_apps"
  },
  {
    "id": 1160,
    "titulo": "Lanzamiento de Instagram",
    "descripcion_corta": "Aplicación para compartir fotos con filtros cuadrados exclusivos de iOS en sus inicios.",
    "año": 2010,
    "categoria": "tech_apps"
  },
  {
    "id": 1161,
    "titulo": "Lanzamiento de Snapchat",
    "descripcion_corta": "Mensajería efímera de fotos y videos que popularizó el formato de historias temporales.",
    "año": 2011,
    "categoria": "tech_apps"
  },
  {
    "id": 1162,
    "titulo": "Lanzamiento de Zoom",
    "descripcion_corta": "Servicio de videollamadas que se hizo indispensable durante la pandemia de 2020.",
    "año": 2012,
    "categoria": "tech_apps"
  },
  {
    "id": 1163,
    "titulo": "Lanzamiento de TikTok (Internacional)",
    "descripcion_corta": "Aplicación móvil de videos cortos en formato vertical con algoritmos altamente adictivos.",
    "año": 2018,
    "categoria": "tech_apps"
  },
  {
    "id": 1164,
    "titulo": "Lanzamiento de ChatGPT (OpenAI)",
    "descripcion_corta": "El chatbot de inteligencia artificial conversacional que desató el boom global de la IA.",
    "año": 2022,
    "categoria": "tech_apps"
  }
];


// Agregar las nuevas categorías al objeto CATEGORIES existente
CATEGORIES.rock_pop = { name: "Rock & Pop", icon: "🎸", color: "#ec4899", glow: "rgba(236, 72, 153, 0.4)" };
CATEGORIES.latino = { name: "Latino & Urbano", icon: "🔥", color: "#f97316", glow: "rgba(249, 115, 22, 0.4)" };
CATEGORIES.clasicos = { name: "Clásicos", icon: "💿", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" };
CATEGORIES.clasico = { name: "Cine Clásico", icon: "🎥", color: "#14b8a6", glow: "rgba(20, 184, 166, 0.4)" };
CATEGORIES.moderno = { name: "Cine Moderno", icon: "🍿", color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" };
CATEGORIES.chileno = { name: "Cine Chileno", icon: "🇨🇱", color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" };
CATEGORIES.viral = { name: "Virales", icon: "📱", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" };
CATEGORIES.tv = { name: "Momentos de la TV", icon: "📺", color: "#eab308", glow: "rgba(234, 179, 8, 0.4)" };
CATEGORIES.escandalo = { name: "Escándalos", icon: "💥", color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" };
CATEGORIES.historico = { name: "Monumentos", icon: "🏛️", color: "#b45309", glow: "rgba(180, 83, 9, 0.4)" };
CATEGORIES.ww1 = { name: "1ª Guerra Mundial", icon: "🪖", color: "#78716c", glow: "rgba(120, 113, 108, 0.4)" };
CATEGORIES.ww2 = { name: "2ª Guerra Mundial", icon: "✈️", color: "#fb7185", glow: "rgba(251, 113, 133, 0.4)" };
CATEGORIES.montana_chile = { name: "Cumbres de Chile", icon: "🇨🇱", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" };
CATEGORIES.montana_mundo = { name: "Cumbres del Mundo", icon: "🌍", color: "#0ea5e9", glow: "rgba(14, 165, 233, 0.4)" };
CATEGORIES.tech_hardware = { name: "Hardware & Consolas", icon: "💻", color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" };
CATEGORIES.tech_videojuegos = { name: "Videojuegos", icon: "🎮", color: "#ec4899", glow: "rgba(236, 72, 153, 0.4)" };
CATEGORIES.tech_apps = { name: "Internet & Apps", icon: "🌐", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" };

const GAME_VERSIONS = {
  historia: {
    title: "Cronoline Historia",
    subtitle: "Línea de Tiempo Histórica",
    cards: CARDS_HISTORIA,
    hasDifficulty: true,
    categories: {
      chile: CATEGORIES.chile,
      universal: CATEGORIES.universal,
      ciencia: CATEGORIES.ciencia,
      arte: CATEGORIES.arte
    }
  },
  canciones: {
    title: "Cronoline Canciones",
    subtitle: "Ordena por Año de Lanzamiento",
    cards: CARDS_CANCIONES,
    hasDifficulty: false,
    categories: {
      rock_pop: CATEGORIES.rock_pop,
      latino: CATEGORIES.latino,
      clasicos: CATEGORIES.clasicos
    }
  },
  peliculas: {
    title: "Cronoline Películas",
    subtitle: "Ordena por Año de Estreno",
    cards: CARDS_PELICULAS,
    hasDifficulty: false,
    categories: {
      clasico: CATEGORIES.clasico,
      moderno: CATEGORIES.moderno,
      chileno: CATEGORIES.chileno
    }
  },
  farandula: {
    title: "Cronoline Farándula",
    subtitle: "Hitos de la Farándula Chilena",
    cards: CARDS_FARANDULA,
    hasDifficulty: false,
    categories: {
      viral: CATEGORIES.viral,
      tv: CATEGORIES.tv,
      escandalo: CATEGORIES.escandalo
    }
  },
  edificios: {
    title: "Cronoline Edificios",
    subtitle: "Ordena por Altura en Metros",
    cards: CARDS_EDIFICIOS,
    hasDifficulty: false,
    categories: {
      moderno: null, // Will be set below
      historico: CATEGORIES.historico
    }
  },
  guerras: {
    title: "Cronoline Guerras",
    subtitle: "Hitos de las Guerras Mundiales",
    cards: CARDS_GUERRAS,
    hasDifficulty: false,
    categories: {
      ww1: CATEGORIES.ww1,
      ww2: CATEGORIES.ww2
    }
  },
  montanas: {
    title: "Cronoline Montañas",
    subtitle: "Ordena por Altura (m s.n.m.)",
    cards: CARDS_MONTANAS,
    hasDifficulty: false,
    categories: {
      montana_chile: CATEGORIES.montana_chile,
      montana_mundo: CATEGORIES.montana_mundo
    }
  },
  tecnologia: {
    title: "Cronoline Tecnología",
    subtitle: "Consolas, Videojuegos y Apps",
    cards: CARDS_TECNOLOGIA,
    hasDifficulty: false,
    categories: {
      tech_hardware: CATEGORIES.tech_hardware,
      tech_videojuegos: CATEGORIES.tech_videojuegos,
      tech_apps: CATEGORIES.tech_apps
    }
  }
};

CATEGORIES.edificio_moderno = { name: "Rascacielos", icon: "🏙️", color: "#6366f1", glow: "rgba(99, 102, 241, 0.4)" };
GAME_VERSIONS.edificios.categories.moderno = CATEGORIES.edificio_moderno;
