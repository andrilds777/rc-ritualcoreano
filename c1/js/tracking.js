
/* ============================================================
   TRACKING — Meta Pixel (marcos do funil) + persistencia de UTM
   entre quiz -> results (Hotmart). Sem PostHog, sem ligacao com
   Cakto/Lastlink: esse funil roda 100% em Hotmart, em USD.
   ============================================================ */
var TRACKING_CONFIG = {
  META_PIXEL_ID: '2322448965159438'   // Glow - 777
};

(function initTracking(){
  if (TRACKING_CONFIG.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', TRACKING_CONFIG.META_PIXEL_ID);
    fbq('track', 'PageView');
  }
})();

/* UTMs: captura no load e persiste (atribucion por criativo hasta el checkout).

   El quiz y la página de resultado son dos páginas separadas del mismo sitio
   estático — `finish()` (js/engine.js) navega de una a otra con un simple
   `location.href`. Sin este objeto en localStorage, la UTM que llegó en la
   URL del quiz se perdería al llegar a `results.html`.

   90 días de validez para acompañar la ventana de atribución que ya se usa
   en el resto del proyecto (Utmify). */
var UTM_TTL_DIAS = 90;
var UTM_TTL_MS = UTM_TTL_DIAS * 24 * 60 * 60 * 1000;
var UTM_CHAVES = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','fbclid','gclid','gbraid','wbraid','sck'];

/* Claves que indican que la URL trae un toque NUEVO (no solo un parámetro
   suelto que una página interna del funil pueda agregar). Sin esta
   distinción, una página que solo pasa `utm_term` (por ejemplo un upsell)
   podría ser leída como toque nuevo y borrar la campaña ya guardada. */
var UTM_CHAVES_DE_IDENTIDADE = ['utm_campaign','utm_id','gclid','gbraid','wbraid','sck'];

/* Solo las claves conocidas se guardan — el formato guardado es
   `{v,at,utm}`, nunca el objeto de query completo. */
function utmLimpa(bruto){
  var utm = {};
  if (!bruto || typeof bruto !== 'object') return utm;
  UTM_CHAVES.forEach(function(k){ if (bruto[k]) utm[k] = String(bruto[k]); });
  return utm;
}

function lerUtmGuardada(){
  try {
    var cru = localStorage.getItem('kbm_utm');
    if (!cru) return {};

    var dado = JSON.parse(cru);
    if (!dado || typeof dado !== 'object') return {};

    if (dado.v === 1) {
      var idade = Date.now() - Number(dado.at || 0);
      if (!(idade >= 0) || idade > UTM_TTL_MS) return {};
      return utmLimpa(dado.utm);
    }

    var migrada = utmLimpa(dado);
    if (!Object.keys(migrada).length) return {};
    gravarUtm(migrada);
    return migrada;
  } catch(e){ return {}; }
}

function gravarUtm(utm){
  try {
    localStorage.setItem('kbm_utm', JSON.stringify({ v: 1, at: Date.now(), utm: utm }));
  } catch(e){}
}

function utmDaUrl(){
  var utm = {};
  try {
    var p = new URLSearchParams(location.search);
    UTM_CHAVES.forEach(function(k){ if (p.get(k)) utm[k] = p.get(k); });
  } catch(e){}
  return utm;
}

function temIdentidade(utm){
  for (var i = 0; i < UTM_CHAVES_DE_IDENTIDADE.length; i++) {
    if (utm[UTM_CHAVES_DE_IDENTIDADE[i]]) return true;
  }
  return false;
}

/* Graba el toque; SOLO sustituye el objeto entero cuando la URL trae
   identidad de campaña nueva. Si no, mezcla clave por clave para no perder
   lo que ya estaba guardado. */
(function persistUTM(){
  try {
    var daUrl = utmDaUrl();
    if (!Object.keys(daUrl).length) return;
    if (temIdentidade(daUrl)) { gravarUtm(daUrl); return; }

    var mesclada = lerUtmGuardada();
    UTM_CHAVES.forEach(function(k){ if (daUrl[k]) mesclada[k] = daUrl[k]; });
    gravarUtm(mesclada);
  } catch(e){}
})();

/* La URL de esta página gana sobre lo guardado, clave por clave. Usado por
   `finish()` (js/engine.js) para pasar la UTM del quiz a results.html, y por
   results.html para construir el link final de checkout de Hotmart. */
function getUTMQuery(){
  try {
    var daUrl = utmDaUrl(), guardada = lerUtmGuardada(), utm = {};
    UTM_CHAVES.forEach(function(k){
      var valor = daUrl[k] || guardada[k];
      if (valor) utm[k] = valor;
    });
    var q = new URLSearchParams(utm).toString();
    return q ? ('?' + q) : '';
  } catch(e){ return ''; }
}

/* Repone la UTM guardada en la barra de direcciones cuando la página actual
   no trae `utm_campaign` en la query (por ejemplo, quien entra directo a
   results.html reabriendo una pestaña). `replaceState` no recarga nada ni
   cambia el historial. */
(function restaurarUTMnaURL(){
  try {
    if (!window.history || !history.replaceState) return;
    if (new URLSearchParams(location.search).get('utm_campaign')) return;

    var guardada = getUTMQuery();
    if (!guardada) return;

    var atual = location.search ? location.search + '&' + guardada.slice(1) : guardada;
    history.replaceState(history.state, '', location.pathname + atual + location.hash);
  } catch(e){}
})();

/* track(): dispara el Meta Pixel en los hitos del funil. */
var PIXEL_MILESTONES = ['QuizStart','SectionStory','SectionSecret','SectionEmotions','SectionResults',
                        'MechanismAccepted','CommitYes','DiagnosisView','QuizComplete','InitiateCheckout'];

/* Nuestros eventos custom que TAMBIÉN disparan un evento ESTÁNDAR de Meta
   (los que el Ads Manager / optimización de campaña reconoce) */
var PIXEL_STANDARD = {
  'SalesPageView': 'ViewContent',   // llegó a la página de oferta
  'QuizComplete':  'Lead'           // terminó el quiz (lead calificado)
};

var PRODUCT_NAME = 'Pegamento de Arroz Morado Coreano';
var PRODUCT_VALUE = 14.90;
var PRODUCT_CURRENCY = 'USD';

function track(event, props){
  props = props || {};
  if (window.fbq && TRACKING_CONFIG.META_PIXEL_ID) {
    if (event === 'InitiateCheckout') {
      fbq('track', 'InitiateCheckout', { value: PRODUCT_VALUE, currency: PRODUCT_CURRENCY, content_name: PRODUCT_NAME });
    } else if (PIXEL_STANDARD[event]) {
      var std = PIXEL_STANDARD[event];
      if (std === 'ViewContent') fbq('track', 'ViewContent', { value: PRODUCT_VALUE, currency: PRODUCT_CURRENCY, content_name: PRODUCT_NAME });
      else fbq('track', std);
      fbq('trackCustom', event, props);   // mantiene el custom para el embudo detallado
    } else if (PIXEL_MILESTONES.indexOf(event) !== -1) {
      fbq('trackCustom', event, props);
    }
  } else {
    console.log('[track:dev]', event, props);
  }
}
