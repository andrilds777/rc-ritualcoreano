/* ============================================================
   STEPS-C — quiz corto (Variante C): 6 preguntas + 1 análisis.
   Reaprovecha las preguntas de config.js (mismas opciones, mismos
   varName, mismo evento) para no duplicar contenido — solo cambia
   qué pantallas entran y en qué sección de la barra de progreso
   caen. Debe cargar DESPUES de config.js y ANTES de engine.js.

   Las 6 preguntas mantenidas son exactamente las que alimentan
   buildDiagnosis()/buildFuturePacing() en config.js: goal, age,
   dimensional, zones, tried, sleep. Ninguna quita personalización
   del diagnóstico final — toda la persuasión que antes vivía en
   el quiz (T2B, T15, T16, T27, TBRK) se movió a results.html.
   ============================================================ */
(function(){
  var byId = {};
  STEPS.forEach(function(s){ byId[s.id] = s; });

  // orden final + sección de la barra de progreso (5 secciones fijas en SECTIONS)
  var ORDER = [
    { id: 'T2',  section: 1 },   // objetivo principal
    { id: 'T3',  section: 1 },   // edad
    { id: 'T9',  section: 2 },   // mayor problema de la piel
    { id: 'T5',  section: 2 },   // zona que más incomoda
    { id: 'T11', section: 3 },   // qué ya probó
    { id: 'T18', section: 3 }    // estilo de vida — sueño (elegido sobre exposición al sol:
                                  // alimenta más hallazgos de buildDiagnosis que toxin_env).
                                  // Misma sección que T11 — "Tus Emociones"/"Tus Resultados"
                                  // no encajan con esta pregunta y no vale forzar el rótulo.
  ];

  var picked = ORDER.map(function(o){
    var s = byId[o.id];
    if (!s) return null;
    s.section = o.section;
    s.progress = true;
    return s;
  }).filter(Boolean);

  picked.push({
    id: 'TCL', type: 'loading', section: 5, progress: false, noBack: true, redirect: true, event: 'QuizComplete',
    title: 'Calibrando tu protocolo personalizado, {name}...',
    items: ['Preparando tu resultado'],
    itemMs: 900
  });

  STEPS = picked;
})();
