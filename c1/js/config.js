/* ============================================================
   CONFIG v2 — QUIZ PEGAMENTO DE ARROZ MORADO COREANO (ES / LATAM + ESPAÑA)
   Traducción natural del embudo BR. Misma estructura/IDs/assets.
   ============================================================ */

var RESULTS_URL = 'results.html';
var SECTIONS = ['Tu Piel', 'Tu Historia', 'El Secreto Coreano', 'Tus Emociones', 'Tus Resultados'];

/* ============================================================
   TESTIMONIOS PERSONALIZADOS POR MÉTODO (frustración → pegamento)
   ============================================================ */
var TESTIMONIALS_BY_METHOD = {
  creams: [
    { q:'Tenía un cajón lleno de cremas de US$ 60 que prometían de todo. Mi piel se las bebía antes del mediodía y seguía seca. Tres semanas con el pegamento y mi piel retiene la hidratación sola — no volví a comprar ni un frasco.', n:'Diane, 58', before:'assets/p1-01-diane-before.jpg', after:'assets/p1-01-diane-after.jpg' },
    { q:'Veinte años comprando sérum. Cada uno “funcionaba” un mes, y después nada. El pegamento fue la primera vez que mi piel de verdad CAMBIÓ en vez de solo quedar grasosa.', n:'Patricia, 62', before:'assets/p1-02-patricia-before.jpg', after:'assets/p1-02-patricia-after.jpg' },
    { q:'Mi baño parecía un cementerio de cremas. Hice el protocolo de 2 minutos durante 21 noches — mi hija me preguntó a qué dermatóloga estaba yendo.', n:'Carol, 54', before:'assets/p1-03-carol-before.jpg', after:'assets/p1-03-carol-after.jpg' } ],
  retinol: [
    { q:'El retinol me dejó la cara roja y descamada durante meses — “empeora antes de mejorar”, decían. Nunca mejoró. El pegamento me dio la renovación sin el ardor.', n:'Janet, 56', before:'assets/p1-04-janet-before.jpg', after:'assets/p1-04-janet-after.jpg' },
    { q:'Me daba miedo tomar sol por culpa del retinol. Ahora hago un protocolo coreano de 2 minutos por la noche y mi piel se renueva sola — sin descamarse, sin esconderme.', n:'Paula, 61', before:'assets/p1-05-paula-before.jpg', after:'assets/p1-05-paula-after.jpg' },
    { q:'Mi dermatóloga solo me subía la dosis de retinol. Mis arrugas seguían ahí; mi irritación crecía. Tres semanas con el pegamento de arroz morado hicieron lo que dos años de tretinoína no hicieron.', n:'Margaret, 65', before:'assets/p1-06-margaret-before.jpg', after:'assets/p1-06-margaret-after.jpg' } ],
  collagen: [
    { q:'Tomé cápsulas de colágeno cada mañana durante 3 años. US$ 30 al mes y mi contorno seguía cayéndose. Descubrí que el colágeno que tragamos no elige la cara. El pegamento funciona DONDE lo aplico.', n:'Nancy, 59', before:'assets/p1-07-nancy-before.jpg', after:'assets/p1-07-nancy-after.jpg' },
    { q:'Polvo en el café, gomitas, cápsulas… a mi cuello no le importaba. Dos semanas con el protocolo del pegamento y la piel finita del cuello empezó a alisarse.', n:'Barbara, 67', before:'assets/p1-08-barbara-before.jpg', after:'assets/p1-08-barbara-after.jpg' },
    { q:'Mi médico me dijo que la mayor parte del colágeno se digiere antes de hacer nada. Nadie me lo dijo ANTES de gastar una fortuna en cápsulas. El pegamento cuesta menos que un mes de ellas.', n:'Joyce, 63', before:'assets/p1-09-joyce-before.jpg', after:'assets/p1-09-joyce-after.jpg' } ],
  peptides: [
    { q:'Pagué caro por el “sérum de péptidos viral”. Se veía genial un mes — después lo dejé, y mis arrugas volvieron más profundas. El pegamento es lo primero que siguió funcionando DESPUÉS de saltarme una noche.', n:'Denise, 57', before:'assets/p1-10-denise-before.jpg', after:'assets/p1-10-denise-after.jpg' },
    { q:'Matrixyl, Argireline, péptidos de cobre — probé el alfabeto entero. Ellos ALQUILAN el resultado. El pegamento coreano fue lo primero que mi piel de verdad conservó.', n:'Donna, 60', before:'assets/p1-11-donna-before.jpg', after:'assets/p1-11-donna-after.jpg' },
    { q:'El sérum de péptidos me trabó un poco la expresión — me veía descansada, pero artificial. Con el pegamento mi cara se mueve… y aun así se ve años más joven.', n:'Sondra, 55', before:'assets/p1-12-sondra-before.jpg', after:'assets/p1-12-sondra-after.jpg' } ],
  harmoniza: [
    { q:'Le tengo pavor a las agujas, así que el botox y los rellenos eran siempre “para emergencias”. El masaje de 3 dedos con el pegamento activó lo que mi dermatóloga llamó efecto lifting natural. Sin consulta. Sin moretones.', n:'Kathleen, 69', before:'assets/p1-15-kathleen-before.jpg', after:'assets/p1-15-kathleen-after.jpg' } ]
};

/* Carrusel del loading T6 — reutiliza testimonios REALES (transformación más fuerte primero) */
var LOADING_QUOTES = [
  TESTIMONIALS_BY_METHOD.retinol[0],    // Janet
  TESTIMONIALS_BY_METHOD.creams[0],     // Diane
  TESTIMONIALS_BY_METHOD.collagen[0]    // Nancy
];

/* Carrusel de antes/después del loading T19 */
var BA_CAROUSEL = [
  { before:'assets/t19-karen-before.jpg', after:'assets/t19-karen-after.jpg', name:'Karen, 57',
    q:'Hice el protocolo de 2 minutos cada noche durante 3 semanas. Mi contorno se levantó, mi piel brilla — mi marido lo notó antes de que yo dijera nada.' },
  { before:'assets/t27-susan-before.jpg', after:'assets/t27-susan-after.jpg', name:'Susan, 47',
    q:'Tiré el corrector. Las líneas profundas alrededor de la boca desaparecieron en la segunda semana.' },
  { before:'assets/t27-linda-before.jpg', after:'assets/t27-linda-after.jpg', name:'Linda, 54',
    q:'Mi hija me preguntó si me había hecho “rellenos”. Le mostré el bol de arroz morado en mi refrigerador.' } ];

/* T27 — testimonios finales */
var PROOF_FINAL = [
  { claim:'Se ve 8 años más joven a los 49', name:'Gloria, 49', before:'assets/t27-gloria-before.jpg', after:'assets/t27-gloria-after.jpg',
    q:'Ocho años menos en la cara en tres semanas. Mi hermana todavía cree que miento cuando digo que no me hice ningún procedimiento.' },
  { claim:'Firmeza de vuelta a los 75', name:'Helen, 75', before:'assets/t27-helen-before.jpg', after:'assets/t27-helen-after.jpg',
    q:'Mi vecina me pidió el “secreto”. Nunca es demasiado tarde — yo soy la prueba.' },
  { claim:'Luminosidad de vuelta a los 61', name:'Martha, 61', before:'assets/t27-martha-before.jpg', after:'assets/t27-martha-after.jpg',
    q:'El brillo volvió en la primera semana. Mi piel se bebe el pegamento cada noche.' } ];

/* T16 — cards-enemigos condicionales */
var ENEMY_CARDS = [
  { keys:['creams'], icon:'🧴', title:'Cremas y sérums caros',
    body:'Hidratan por <b>FUERA</b> una piel que dejó de hidratarse sola. El agua se evapora en horas — y mañana empiezas de cero. <b>Tratan la superficie. Nunca la causa.</b>' },
  { keys:['harmoniza','peptides'], icon:'💉', title:'Botox, rellenos y Argireline',
    body:'<b>CONGELAN</b> el músculo temporalmente. Nada se renueva por debajo — y cuando paras, las arrugas vuelven, muchas veces más profundas. <b>Es el efecto rebote.</b>' },
  { keys:['peptides','retinol'], icon:'🧪', title:'Matrixyl y retinol',
    body:'Fuerzan una <b>renovación ARTIFICIAL</b> por fuera. En el momento en que dejas de pagar, el resultado desaparece — porque tu piel nunca volvió a aprender a renovarse.' },
  { keys:['collagen'], icon:'💊', title:'Suplemento de colágeno',
    body:'El colágeno que tragas se <b>digiere</b> como cualquier proteína — y lo que queda no elige tu cara. Tu contorno nunca vio ni una fracción de esas cápsulas.' } ];

/* ============================================================
   LAS PANTALLAS (mismo orden v2)
   ============================================================ */
var STEPS = [

  /* T1 — LANDING */
  { id:'T1', type:'landing', section:0, progress:false,
    heroImg:'assets/t01-hero.webp',
    sub:'Haz el <b>test de piel gratis de 1 minuto de la Dra. Yuna Mun</b> y descubre si el Pegamento de Arroz Morado Coreano puede rejuvenecer tu piel — y <b>desbloquea</b> tu receta personalizada del pegamento coreano.',
    nob:'Sin agujas · Sin Matrixyl ni Argireline · Sin cremas caras',
    bullets:[
      'Responde para descubrir si este <b>Pegamento Coreano</b> tiene un efecto <b>3 veces más fuerte que el Matrixyl, la Argireline y el retinol</b> en tu rostro',
      'El <b>“protocolo de la manzana”</b> que puede ayudarte a suavizar las arrugas en casa',
      'Y el <b>tai chi facial coreano</b> — un masaje de 3 dedos que, junto con el Pegamento de Arroz Morado Coreano, puede activar un <b>efecto lifting natural en 7 a 10 días</b>' ],
    cta:'DESCUBRIR SI FUNCIONA PARA MÍ',
    micro:'✓ Test gratis de 1 min   ✓ 100% natural   🔒 Privado',
    urg:'⚠️ La Dra. Yuna analiza un número limitado de tests por día',
    baStrip:[
      { before:'assets/thumb-karen-b.jpg', after:'assets/thumb-karen-a.jpg', name:'Karen, 57' },
      { before:'assets/thumb-susan-b.jpg', after:'assets/thumb-susan-a.jpg', name:'Susan, 47' },
      { before:'assets/thumb-linda-b.jpg', after:'assets/thumb-linda-a.jpg', name:'Linda, 54' } ],
    chip:{ img:'assets/avatar-dryuna.jpg', name:'Dra. Yuna Mun', cred:'Mayor dermatóloga natural de Corea · 27 años · Premio de la Universidad Nacional de Seúl' } },

  /* T2 — META */
  { id:'T2', type:'single', section:1, varName:'goal',
    title:'¿Cuál es tu mayor objetivo?',
    options:[
      { e:'〰️', t:'Eliminar las líneas de expresión del rostro', v:'wrinkles' },
      { e:'🔥', t:'Reafirmar y levantar la piel flácida', v:'firm' },
      { e:'✨', t:'Volver a tener luminosidad — sin maquillaje', v:'glow' },
      { e:'🌟', t:'Todas las anteriores', v:'all' } ] },

  /* T3 — EDAD */
  { id:'T3', type:'single', section:1, varName:'age_bucket',
    title:'¿Cuántos años tienes?',
    options:[
      { e:'🌺', t:'45–54', v:'45-54' },
      { e:'🌻', t:'55–64', v:'55-64' },
      { e:'🌷', t:'65–74', v:'65-74' },
      { e:'💐', t:'75+', v:'75+' } ] },

  /* T4 — DOLORES (multi) */
  { id:'T4', type:'multi', section:1, varName:'pains',
    title:'¿Qué es lo que más te molesta de tu piel?',
    sub:'Toca todo lo que aplique',
    options:[
      { e:'〰️', t:'Arrugas profundas en la boca y los ojos', v:'wrinkles' },
      { e:'😞', t:'Piel flácida y caída', v:'sagging' },
      { e:'🦢', t:'Cuello y papada flojos', v:'neck' },
      { e:'👁️', t:'Patas de gallo', v:'crowsfeet' },
      { e:'😣', t:'Líneas de marioneta (surcos junto a la boca)', v:'marionette' },
      { e:'📉', t:'Pérdida de firmeza en general', v:'firmness' } ] },

  /* T5 — ZONAS */
  { id:'T5', type:'zones', section:1, varName:'zones',
    title:'¿Qué zonas quieres levantar primero?',
    sub:'Toca todo lo que aplique',
    options:[
      { img:'assets/t05-zone-eyes.png',        t:'Ojos', v:'eyes', label:'zona de los ojos' },
      { img:'assets/t05-zone-jawline.png',     t:'Contorno y papada', v:'jawline', label:'contorno del rostro' },
      { img:'assets/t05-zone-neck.png',        t:'Cuello', v:'neck', label:'cuello' },
      { img:'assets/t05-zone-mouth.png',       t:'Zona de la boca', v:'mouth', label:'zona de la boca' },
      { img:'assets/t05-zone-forehead.png',    t:'Frente', v:'forehead', label:'frente' },
      { img:'assets/t05-zone-decolletage.png', t:'Escote', v:'decolletage', label:'escote' } ] },

  /* T2B — VENTA DE LA BIG IDEA */
  { id:'T2B', type:'bigidea', section:1, progress:false, varName:'big_idea_aware', event:'BigIdeaView',
    title:'¿Ya oíste hablar del Pegamento de Arroz Morado Coreano que están usando las estrellas de Hollywood alérgicas al botox?',
    cards:[
      { img:'assets/t2b-celebrity.jpg',
        cap:'“Después de descubrir que era <b>alérgica al botox</b>, este pegamento de arroz morado coreano salvó mi carrera de actriz después de los 50… parece que <b>volví en el tiempo</b>.”' },
      { img:'assets/t2b-doctor.jpg', pos:'center 12%',
        cap:'“Este pegamento coreano casero que aplicas antes de dormir combate las <b>“toxinas del envejecimiento”</b> — y puede hacer que las células de tu piel rejuvenezcan <b>en cuestión de semanas</b>.”' } ],
    yes:'Sí, ya oí hablar', no:'No — cuéntame más' },

  /* T6L — LOADING + CARRUSEL */
  { id:'T6L', type:'loading', section:1, progress:false, noBack:true, event:'FirstAnalysisView',
    title:'Analizando tus primeras respuestas...',
    items:[ 'Mapeando tu perfil de piel', 'Comparando con más de 37 mil mujeres evaluadas', 'Preparando tus próximas preguntas' ],
    carousel:LOADING_QUOTES,
    itemMs:1500 },

  /* T7 — NOMBRE */
  { id:'T7', type:'name', section:1, varName:'name',
    title:'¿Cuál es tu nombre?',
    sub:'Para que la Dra. Yuna personalice tus resultados',
    cta:'Continuar' },

  /* T9 — DOLOR DIMENSIONAL PIEL */
  { id:'T9', type:'multi', section:2, varName:'dimensional', event:'SectionStory',
    title:'¿Cuáles son los mayores problemas de tu piel hoy?',
    sub:'Toca todo lo que aplique',
    options:[
      { e:'🏜️', t:'Está siempre seca — no importa cuánta crema use', v:'dry' },
      { e:'〰️', t:'Mis arrugas son tan profundas que necesito maquillaje para disimularlas', v:'deep_wrinkles' },
      { e:'📉', t:'Perdió firmeza — mi contorno está empezando a caerse', v:'lost_firmness' },
      { e:'😶', t:'Se ve opaca y cansada, incluso después de dormir toda la noche', v:'dull' },
      { e:'🍂', t:'Está fina y arrugadita — sobre todo cuello, brazos y escote', v:'crepey' } ] },

  /* T8 — DOLOR DIMENSIONAL VIDA */
  { id:'T8', type:'single', section:2, varName:'life_impact',
    title:'{name}, ¿cómo afecta tu piel a tu vida?',
    options:[
      { e:'💔', t:'Mi autoestima — evito los espejos y las fotos', v:'selfesteem' },
      { e:'🪞', t:'Ya no puedo salir de casa sin maquillaje', v:'makeup' },
      { e:'👥', t:'Me siento invisible — la gente ya no me mira como antes', v:'invisible' },
      { e:'💍', t:'Mi marido ya no me elogia como antes', v:'husband' } ] },

  /* T11 — QUÉ YA PROBÓ */
  { id:'T11', type:'multi', section:2, varName:'tried',
    title:'¿Qué has probado ya?',
    sub:'Toca todo lo que aplique',
    options:[
      { e:'🧴', t:'Cremas y sérums caros', v:'creams' },
      { e:'🔬', t:'Retinol', v:'retinol' },
      { e:'💊', t:'Suplemento de colágeno', v:'collagen' },
      { e:'🧪', t:'Péptidos virales (Matrixyl, Argireline)', v:'peptides' },
      { e:'💉', t:'Botox o rellenos', v:'harmoniza' },
      { e:'🚫', t:'Todavía no he probado nada', v:'nothing', exclusive:true } ] },

  /* T12 — GASTO MENSUAL */
  { id:'T12', type:'single', section:2, varName:'spend',
    title:'¿Cuánto gastas en cuidado de la piel al mes?',
    options:[
      { e:'💵', t:'Menos de US$ 10', v:'under30' },
      { e:'💰', t:'US$ 10 – US$ 30', v:'30_80' },
      { e:'💳', t:'US$ 30 – US$ 80', v:'80_200' },
      { e:'💎', t:'Más de US$ 80 (con procedimientos)', v:'over200' } ] },

  /* T10 — CONFESIÓN */
  { id:'T10', type:'single', section:2, varName:'happy',
    title:'Sé sincera contigo misma: ¿estás feliz con tu piel hoy?',
    options:[
      { e:'🥺', t:'No, me pongo triste cuando me miro al espejo', v:'sad' },
      { e:'😐', t:'Podría estar mucho mejor', v:'better' },
      { e:'💪', t:'Lo intento, pero nada se mantiene', v:'nothing_sticks' } ] },

  /* TBRK — BREAK PERSONALIZADO */
  { id:'TBRK', type:'break', section:2, progress:false, event:'BreakProofView',
    cta:'Continuar →' },

  /* T13 — CALIBRACIÓN */
  { id:'T13', type:'single', section:2, varName:'awareness',
    title:'¿Ya oíste hablar de POR QUÉ las coreanas mantienen la piel joven después de los 50?',
    options:[
      { e:'🤔', t:'No — pero siempre me lo pregunté', v:'no' },
      { e:'👂', t:'Ya oí algo sobre su cuidado de la piel', v:'something' },
      { e:'💡', t:'Sí, conozco el secreto', v:'yes' } ] },

  /* T14L — LOADING + CREDENCIALES */
  { id:'T14L', type:'loading', section:3, progress:false, noBack:true, event:'SectionSecret',
    title:'Analizando tus respuestas con el método clínico de la Dra. Yuna...',
    items:[ 'Cruzando tu perfil de piel', 'Identificando por qué los métodos anteriores fallaron', 'Comparando tu caso con sus archivos clínicos' ],
    credentials:{
      img:'assets/t14-dryuna-authority.jpg',
      name:'Dra. Yuna Mun', check:true,
      items:[ '27 años en dermatología natural coreana', 'Premio Descubrimiento del Año — Universidad Nacional de Seúl (2012)', 'Autora del best-seller “El Secreto de la Piel Coreana”', 'Ha aparecido en la BBC' ] },
    itemMs:1500 },

  /* T16 — DIAGNÓSTICO DE LOS FALLOS */
  { id:'T16', type:'interstitial', section:3, progress:false, event:'FailureDiagnosisView',
    cta:'Entonces, ¿cuál es la causa real? →',
    html: function(){
      var tried = (QuizState.get('tried') || []).filter(function(t){ return t !== 'nothing'; });
      var cards = ENEMY_CARDS.filter(function(c){
        if (!tried.length) return true;
        return c.keys.some(function(k){ return tried.indexOf(k) !== -1; });
      });
      var cardsHtml = cards.map(function(c){
        return '<div class="enemy-v2"><div class="ev-bg"><span>' + c.icon + '</span></div>'
          + '<div class="ev-tx"><div class="ev-t">' + c.icon + ' ' + c.title + '</div><div class="ev-b">' + c.body + '</div></div></div>';
      }).join('');
      return ''+
      '<span class="kicker-tag red">⚠ Identificamos tu problema</span>'+
      '<h2>Por qué nada de lo que probaste duró:</h2>'+
      '<div class="voice-chip"><img src="assets/avatar-dryuna.jpg" alt=""><div><div class="vn">Dra. Yuna Mun <span>✔</span></div><div class="vr">analizó ' + (tried.length ? 'lo que probaste' : 'los métodos más comunes') + ':</div></div></div>'+
      cardsHtml +
      '<p class="absolve">Cada uno de ellos <u>enmascara</u> el síntoma.<br>Así que no — nunca fuiste tú. <b>Fue el método.</b></p>'+
      '<p class="body" style="text-align:center">Hay algo que ninguno de ellos tocó jamás — el verdadero motivo por el que tu piel dejó de renovarse. Las dermatólogas coreanas lo conocen desde hace siglos…</p>'; } },

  /* T15 — MECANISMO */
  { id:'T15', type:'interstitial', section:3, progress:false, event:'MechanismAccepted', eventOnCta:true,
    cta:'¡Entendido! →',
    html: function(){ return ''+
      '<div class="voice-chip"><img src="assets/avatar-dryuna.jpg" alt=""><div><div class="vn">Dra. Yuna Mun <span>✔</span></div><div class="vr">revela la causa real:</div></div></div>'+
      '<h2>Tu piel tiene un ESCUDO natural. Esto es lo que le pasó:</h2>'+
      '<div class="shield-grid">'+
        '<div class="shield-card"><span class="sc-n">1</span><img src="assets/t15-shield-1.png" alt=""><div class="sc-cap"><b>Piel joven</b><span>Tu escudo hidrata, protege y se renueva solo.</span></div></div>'+
        '<div class="shield-card"><span class="sc-n">2</span><img src="assets/t15-shield-2.png" alt=""><div class="sc-cap"><b>Después de los 40</b><span>El escudo se debilita y se apaga.</span></div></div>'+
        '<div class="shield-card"><span class="sc-n">3</span><img src="assets/t15-shield-3.png" alt=""><div class="sc-cap"><b>Radicales libres</b><span>Las toxinas empiezan a “oxidar” tu colágeno, día tras día.</span></div></div>'+
        '<div class="shield-card hero-step"><span class="sc-n">4</span><img src="assets/t15-shield-4.png" alt=""><div class="sc-cap"><b>El Pegamento de Arroz Morado Coreano</b><span>Vuelve a encender tu escudo — y la piel se renueva de nuevo.</span></div></div>'+
      '</div>'+
      '<div class="demo-box"><img class="apple43" src="assets/t15-apple-demo.jpg" alt="Demostración de la manzana">'+
        '<div class="cap">Esto es lo que los radicales libres le están haciendo a tu colágeno <b>ahora mismo</b>. La mitad tratada con el antioxidante morado coreano no envejeció. <b>Misma manzana. Escudo diferente.</b></div>'+
      '</div>'+
      '<div class="study-line">Un estudio de la Universidad Nacional de Seúl con <b>4.500 mujeres</b> descubrió que la única diferencia entre una piel envejecida y una joven era si este escudo estaba ENCENDIDO o APAGADO. Por eso el protocolo coreano es hasta <b>8 veces más eficaz</b> que las cremas, los péptidos o el botox — <b>es el único que va a la causa.</b></div>'; } },

  /* T17 — TOXINAS */
  { id:'T17', type:'single', section:3, varName:'toxin_env',
    title:'¿Dónde pasas la mayor parte de tus días?',
    options:[
      { e:'🏙️', t:'En la ciudad (tráfico, contaminación)', v:'city' },
      { e:'☀️', t:'Al aire libre, bajo el sol', v:'sun' },
      { e:'🏠', t:'Más dentro de casa (aire acondicionado)', v:'indoors' },
      { e:'🚗', t:'Un poco de todo', v:'mix' } ] },

  /* T18 — SUEÑO */
  { id:'T18', type:'single', section:3, varName:'sleep',
    title:'¿Cuántas horas duermes?',
    sub:'Tu piel renueva el colágeno por la noche — es cuando actúa el protocolo coreano.',
    options:[
      { e:'😴', t:'Menos de 5', v:'<5' },
      { e:'🛌', t:'5–7', v:'5-7' },
      { e:'😌', t:'7–9', v:'7-9' },
      { e:'💤', t:'9+', v:'9+' } ] },

  /* T19L — LOADING + CARRUSEL ANTES/DESPUÉS */
  { id:'T19L', type:'loading', section:4, progress:false, noBack:true, event:'SectionEmotions',
    title:'Mujeres como tú ya están haciendo el protocolo',
    items:[ 'Procesando tu perfil de piel', 'Buscando mujeres con TU perfil exacto', 'Cargando sus resultados' ],
    baCarousel:BA_CAROUSEL,
    itemMs:2300 },

  /* T20-22 — EMOCIONALES */
  { id:'T20', type:'emotional', section:4, varName:'emo_photos',
    img:'assets/t27-susan-before.jpg', img2:'assets/t27-susan-after.jpg',
    quote:'“Evito las fotos por culpa de mi piel”',
    options:[
      { e:'🙋‍♀️', t:'Me identifico', v:'yes' },
      { e:'🙅‍♀️', t:'No tanto', v:'no' },
      { e:'⏭️', t:'Prefiero saltar este paso', v:'skip' } ] },

  { id:'T21', type:'emotional', section:4, varName:'emo_harmoniza',
    img:'assets/t27-linda-before.jpg', img2:'assets/t27-linda-after.jpg',
    caption:'Sin agujas. Sin rellenos. 21 días del protocolo coreano.',
    quote:'“A mi edad, solo el botox o un lifting arreglarían mi cara”',
    options:[
      { e:'🥺', t:'A veces pienso eso...', v:'believe' },
      { e:'🤔', t:'Ojalá no sea verdad', v:'hope' },
      { e:'⏭️', t:'Prefiero saltar este paso', v:'skip' } ] },

  { id:'T22', type:'emotional', section:4, varName:'emo_fear',
    img:'assets/t22-mirror.jpg',
    quote:'“Tengo miedo de nunca volver a sentirme bonita al mirarme al espejo”',
    options:[
      { e:'🙋‍♀️', t:'Me identifico', v:'yes' },
      { e:'🙅‍♀️', t:'No, para nada', v:'no' },
      { e:'🤐', t:'Prefiero no responder', v:'skip' } ] },

  /* T23 — META */
  { id:'T23', type:'goal', section:5, varName:'goal_years', event:'SectionResults',
    title:'¿Cuántos años más joven quieres que se vea tu piel?',
    options:[
      { e:'🌟', t:'5 años más joven', v:'5' },
      { e:'✨', t:'10 años más joven', v:'10' },
      { e:'💫', t:'15 años más joven', v:'15' },
      { e:'🎁', t:'Sorpréndeme', v:'surprise' } ],
    badge: function(v){ return 'Meta: ' + (v==='surprise' ? 'máximo rejuvenecimiento' : v + ' años más joven') + ' 🎯'; },
    validation: function(){ return '<b>Es una meta realista, {name}.</b> Con la proporción correcta del protocolo, la mayoría de las mujeres nota la primera diferencia <b>en pocos días</b> — vamos a revisar tu perfil de piel.'; },
    cta:'Continuar →' },

  /* T24 — LOADING-ANÁLISIS */
  { id:'T24', type:'loading', section:5, progress:false, noBack:true, event:'AnalysisStart',
    title:'Analizando tus respuestas, {name}...',
    items:[ 'Perfil de piel mapeado', 'Midiendo tu Escudo de la Piel', 'Calculando la exposición a radicales libres', 'Calibrando la proporción de tu pegamento de arroz morado' ],
    carousel:[
      TESTIMONIALS_BY_METHOD.collagen[1],  // Joyce
      TESTIMONIALS_BY_METHOD.peptides[0],  // Sondra
      TESTIMONIALS_BY_METHOD.retinol[2]    // Margaret
    ],
    social:'más de 37 mil mujeres evaluadas',
    itemMs:1500 },

  /* T25 — DIAGNÓSTICO */
  { id:'T25', type:'diagnosis', section:5, progress:false, noBack:true, event:'DiagnosisView',
    cta:'Ver mi protocolo personalizado →' },

  /* T25B — FUTURE PACING */
  { id:'T25B', type:'futurepacing', section:5, progress:false, noBack:true, event:'FuturePacingView',
    cta:'Quiero esto →' },

  /* T26 — COMPROMISO */
  { id:'T26', type:'single', section:5, varName:'commit', noBack:true, commitEvent:true,
    lockBanner:'🔒 <b>Antes de que la Dra. Yuna desbloquee tu receta, necesita saber:</b>',
    title:'¿Te comprometes con el protocolo de 2 minutos cada noche durante 21 días?',
    options:[
      { e:'🤩', t:'¡Sí, estoy comprometida!', v:'committed' },
      { e:'😎', t:'Quiero empezar esta misma noche', v:'tonight' },
      { e:'🤔', t:'No estoy segura...', v:'notsure' } ] },

  /* T27 — PRUEBA FINAL */
  { id:'T27', type:'interstitial', section:5, progress:false, noBack:true, event:'ProofSegmentedView',
    cta:'Quiero MI protocolo ✨', ctaClass:'green',
    html: function(){
      var cards = PROOF_FINAL.map(function(p){
        var media = (p.before && p.after)
          ? '<div class="ba-pair"><div class="half"><span class="ba-tag">Antes</span><img src="' + p.before + '" alt="" loading="lazy"></div>'
            + '<div class="half"><span class="ba-tag after">Después</span><img src="' + p.after + '" alt="" loading="lazy"></div></div>'
          : '<div class="pg-ph">' + p.ph + '</div>';
        return '<div class="ba-card">' + media
          + '<div class="ba-meta"><div class="ba-claim">' + p.claim + '</div><div class="stars">★★★★★</div>'
          + '<div class="ba-name">' + p.name + '</div><div class="ba-quote">“' + p.q + '”</div></div></div>';
      }).join('');
      return ''+
      '<span class="kicker-tag">Resultados reales</span>'+
      '<h2>Mujeres reales. Escudos reencendidos de verdad.</h2>'+
      '<div class="proof-col">' + cards + '</div>'; } },

  /* T28 — LOADING FINAL */
  { id:'T28', type:'loading', section:5, progress:false, noBack:true, event:'QuizComplete',
    title:'Finalizando tu protocolo, {name}...',
    items:[ 'Proporción del pegamento de arroz morado calibrada', 'Protocolo de 21 días armado', 'Bonos seleccionados', 'Oferta especial preparada' ],
    itemMs:1300,
    redirect:true }
];

/* ============================================================
   SKIN SHIELD SCORE — interno (define la ZONA cualitativa)
   ============================================================ */
function computeShieldScore(a){
  var s = 52;
  s -= Math.min(((a.pains||[]).length) * 4, 16);
  s -= Math.min(((a.dimensional||[]).length) * 3, 9);
  if (a.toxin_env === 'city' || a.toxin_env === 'sun') s -= 4;
  if (a.sleep === '<5' || a.sleep === '5-7') s -= 3;
  var tried = (a.tried||[]).filter(function(t){ return t !== 'nothing'; });
  s -= Math.min(tried.length * 2, 6);
  return Math.max(22, Math.min(46, s));
}
function shieldStatus(a){
  var s = computeShieldScore(a);
  if (s <= 30) return { label:'APAGADO', zone:0 };
  if (s <= 38) return { label:'MUY DEBILITADO', zone:0 };
  return { label:'DEBILITADO', zone:1 };
}

/* ---- Hallazgos personalizados (espejo de las respuestas) ---- */
var DIAG_MAPS = {
  dimensional: {
    dry:            'Tu piel ya no se hidrata sola — <i>dijiste que queda seca sin importar la crema</i>',
    deep_wrinkles:  'Ruptura de colágeno activa — <i>dijiste que tus arrugas son tan profundas que necesitas maquillaje para disimularlas</i>',
    lost_firmness:  'Pérdida estructural de colágeno — <i>dijiste que tu contorno está empezando a caerse</i>',
    dull:           'Ciclo de renovación bloqueado — <i>dijiste que tu piel se ve cansada incluso después de dormir bien</i>',
    crepey:         'Dermis adelgazándose — <i>dijiste que tu piel se está poniendo fina y arrugadita</i>'
  },
  toxin: {
    city:    'Alta exposición a radicales libres — la <i>contaminación de la ciudad</i> está “oxidando” tu colágeno cada día',
    sun:     'Alta exposición a radicales libres — el <i>daño del sol</i> está “oxidando” tu colágeno cada día',
    indoors: 'Ambiente que roba humedad — el <i>aire acondicionado/calefacción</i> está deshidratando tu piel cada día',
    mix:     'Exposición diaria a radicales libres — las toxinas del ambiente están “oxidando” tu colágeno'
  },
  sleepLabels: { '<5':'menos de 5 horas', '5-7':'5 a 7 horas' }
};
function triedLabel(tried){
  var lab = { creams:'cremas', retinol:'retinol', collagen:'cápsulas de colágeno', peptides:'péptidos', harmoniza:'botox y rellenos' };
  return tried.slice(0,3).map(function(t){ return lab[t] || t; }).join(', ');
}
function zoneLabels(zones){
  var out = [];
  STEPS.forEach(function(st){ if (st.id==='T5') st.options.forEach(function(o){
    if ((zones||[]).indexOf(o.v) !== -1) out.push(o.label);
  }); });
  return out;
}
function buildDiagnosis(a){
  var st = shieldStatus(a);
  var findings = [];
  (a.dimensional||[]).slice(0,3).forEach(function(d){ if (DIAG_MAPS.dimensional[d]) findings.push(DIAG_MAPS.dimensional[d]); });
  if (a.toxin_env && DIAG_MAPS.toxin[a.toxin_env]) findings.push(DIAG_MAPS.toxin[a.toxin_env]);
  if (DIAG_MAPS.sleepLabels[a.sleep]) findings.push('Déficit de renovación nocturna — duermes <i>' + DIAG_MAPS.sleepLabels[a.sleep] + '</i>, pero el colágeno solo se reconstruye en el sueño profundo');
  var tried = (a.tried||[]).filter(function(t){ return t !== 'nothing'; });
  if (tried.length) findings.push('Dependencia de renovación artificial — los <i>' + triedLabel(tried) + '</i> que probaste trataron el síntoma, nunca el escudo');
  else findings.push('Escudo desprotegido — tu piel viene luchando contra los radicales libres sin ningún apoyo');
  var zl = zoneLabels(a.zones);
  if (zl.length) findings.push('Daño concentrado exactamente donde marcaste — <i>' + zl.slice(0,3).join(', ') + '</i>');
  if (findings.length < 3) findings.push('Desaceleración de la renovación típica de tu rango de edad — el escudo se apaga en silencio');
  findings = findings.slice(0,6);

  var goalTxt = { wrinkles:'suavizar las líneas de expresión', firm:'piel firme y levantada', glow:'luminosidad sin maquillaje', all:'rejuvenecimiento completo' }[a.goal] || 'piel más joven';
  var benefits = [
    { i:'🎯', t:'Levanta el <b>' + (zl[0] || 'contorno') + '</b> que marcaste primero' },
    { i:'〰️', t:'Suaviza arrugas profundas — <b>sin maquillaje</b>' },
    { i:'✨', t:'Luminosidad de vuelta en la primera semana — tu meta: <b>' + goalTxt + '</b>' },
    { i:'🌙', t:'<b>2 minutos por noche</b> — sin rutina de 10 pasos' } ];
  return { status: st, findings: findings, benefits: benefits };
}

/* ---- Future pacing (T25B) ---- */
function buildFuturePacing(a){
  return {
    title:'¿Qué pasa si usas el Pegamento de Arroz Morado Coreano durante 21 días?',
    items:[
      { wk:'Noche 1', tx:'Usas tu <b>Pegamento de Arroz Morado Coreano</b> casero 2 minutos antes de dormir y, al lavarte la cara, ya notas tu piel hidratada y suave.' },
      { wk:'Semana 1', tx:'La hidratación y la <b>luminosidad</b> son lo primero que las mujeres notan — generalmente en el día 4 o 5. Y en el día 7 ya percibes que las patas de gallo y las líneas de la frente empiezan a suavizarse.' },
      { wk:'Semana 2', tx:'Las líneas finas se suavizan y el <b>contorno del rostro</b> que marcaste empieza a levantarse, a medida que la renovación de colágeno se reinicia por debajo. La flacidez empieza a disminuir visiblemente.' },
      { wk:'Semana 3', tx:'Las líneas de expresión y las arrugas que te molestaban ya son casi imperceptibles, y recuperas la confianza de salir de casa <b>sin necesitar maquillaje</b>.', gold:true },
      { wk:'Semana 4', tx:'Comparas las fotos de hace 4 semanas con tu piel de ahora y notas que está <b>renovada y firme</b>, como en tu juventud.', gold:true } ],
    proof: TESTIMONIALS_BY_METHOD.collagen[2]   // Joyce, 63 — testimonio expresivo (foto real)
  };
}
