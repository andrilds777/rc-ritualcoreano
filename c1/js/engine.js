/* ============================================================
   ENGINE v2 — motor de steps do quiz
   Novidades: CTA bar fixa (sempre visível) · loading com anel
   de progresso + carrosséis · bigidea (sim/não) · break
   personalizado · future pacing · diagnóstico qualitativo
   ============================================================ */

var QuizState = (function(){
  var KEY = 'kbm_quiz_v1';
  var data = { step: 0, answers: {} };
  try { var saved = JSON.parse(localStorage.getItem(KEY)); if (saved && saved.answers) data = saved; } catch(e){}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){} }
  return {
    get: function(k){ return data.answers[k]; },
    set: function(k, v){ data.answers[k] = v; save(); },
    answers: function(){ return data.answers; },
    step: function(){ return data.step; },
    setStep: function(i){ data.step = i; save(); },
    reset: function(){ data = { step:0, answers:{} }; save(); }
  };
})();

(function Engine(){
  var root = document.getElementById('quiz-root');
  var current = QuizState.step();
  if (current >= STEPS.length) current = 0;
  var timers = [];

  /* ---------- helpers ---------- */
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function fill(tpl){
    var name = QuizState.get('name');
    return tpl.replace(/\{name\}/g, name ? esc(name) : 'amiga');
  }
  function clearTimers(){ timers.forEach(function(t){ clearTimeout(t); clearInterval(t); }); timers = []; }

  function go(i){
    clearTimers();
    if (i < 0 || i >= STEPS.length) return;
    current = i;
    QuizState.setStep(i);
    render();
    window.scrollTo(0, 0);
  }
  function next(){
    if (current === STEPS.length - 1) { finish(); return; }
    go(current + 1);
  }
  function finish(){ location.href = RESULTS_URL + getUTMQuery(); }

  /* CTA fixa sempre visível (regra geral 2 do briefing) */
  function ctaBar(inner){ return '<div class="cta-bar">' + inner + '</div>'; }

  var LOGO_SVG = '<svg class="logo-berry" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">'
    + '<ellipse cx="12" cy="17" rx="3.2" ry="6.2" transform="rotate(-28 12 17)" fill="#4350A8"/>'
    + '<ellipse cx="19.5" cy="14.5" rx="3" ry="5.8" transform="rotate(22 19.5 14.5)" fill="#5B6BD6"/>'
    + '<ellipse cx="15.5" cy="22.5" rx="2.9" ry="5.4" transform="rotate(-6 15.5 22.5)" fill="#8E9FE5"/>'
    + '<ellipse cx="11" cy="15" rx="0.9" ry="1.9" transform="rotate(-28 11 15)" fill="#BFD0FF" opacity=".85"/></svg>';

  /* ---------- chrome (header + progress) ---------- */
  function chrome(step){
    var canBack = current > 0 && !step.noBack;
    var h = '<div class="topbar">'
      + '<button class="back-btn' + (canBack ? '' : ' hidden') + '" id="btn-back" aria-label="Back">‹</button>'
      + '<div class="brand">' + LOGO_SVG
      + '<div class="brand-tx"><b>Pegamento de Arroz <span>Morado</span></b><small>Test de Piel de la Dra. Yuna</small></div></div>'
      + '<div class="trust"><b>★ 4.8</b><br>37 mil+</div></div>';
    var showProg = step.progress !== false && step.section > 0;
    h += '<div class="progress-wrap' + (showProg ? '' : ' hidden') + '">'
      + '<div class="progress-label">' + SECTIONS[step.section - 1 >= 0 ? step.section - 1 : 0] + '</div>'
      + '<div class="progress-track">';
    var perSection = [0,0,0,0,0], doneSection = [0,0,0,0,0];
    STEPS.forEach(function(s, idx){
      if (s.section > 0) {
        perSection[s.section - 1]++;
        if (idx < current) doneSection[s.section - 1]++;
        if (idx === current) doneSection[s.section - 1] += 0.6;
      }
    });
    for (var i = 0; i < 5; i++){
      var pct = perSection[i] ? Math.min(100, Math.round(doneSection[i] / perSection[i] * 100)) : 0;
      h += '<div class="progress-seg"><div class="fill" style="width:' + pct + '%"></div></div>';
    }
    h += '</div></div>';
    return h;
  }

  /* ---------- componentes reutilizáveis ---------- */
  /* card de depoimento SEMPRE com imagem de resultado (modelo T20) */
  function tCard(t){
    var media;
    if (t.before && t.after) {
      media = '<div class="ba-pair">'
        + '<div class="half"><span class="ba-tag">Antes</span><img src="' + t.before + '" alt=""></div>'
        + '<div class="half"><span class="ba-tag after">Después</span><img src="' + t.after + '" alt=""></div></div>';
    } else {
      media = '<div class="pg-ph">' + (t.ph || 'PHOTO PENDING — before/after ' + t.n) + '</div>';
    }
    return '<div class="ba-card">' + media
      + '<div class="ba-meta"><div class="stars">★★★★★</div>'
      + '<div class="ba-name">' + t.n + ' <span style="color:var(--green);font-size:10px;font-weight:800">✔ Verificada</span></div>'
      + '<div class="ba-quote">“' + t.q + '”</div></div></div>';
  }
  function baCard(b, withMeta){
    return '<div class="ba-card"><div class="ba-pair">'
      + '<div class="half"><span class="ba-tag">Antes</span><img src="' + b.before + '" alt=""></div>'
      + '<div class="half"><span class="ba-tag after">Después</span><img src="' + b.after + '" alt=""></div></div>'
      + (withMeta ? '<div class="ba-meta"><div class="stars">★★★★★</div><div class="ba-name">' + b.name + '</div>'
        + (b.q ? '<div class="ba-quote">“' + b.q + '”</div>' : '') + '</div>' : '')
      + '</div>';
  }
  function carouselHtml(slides, id){
    var dots = slides.map(function(_, i){ return '<span class="dot' + (i===0?' active':'') + '"></span>'; }).join('');
    // lazy: só o 1º slide carrega imagens de cara; os demais ganham data-src
    var sl = slides.map(function(s, i){
      var content = i === 0 ? s : s.replace(/ src="/g, ' data-src="');
      return '<div class="slide' + (i===0?' active':'') + '">' + content + '</div>';
    }).join('');
    return '<div class="carousel" id="' + id + '">' + sl + '<div class="car-dots">' + dots + '</div></div>';
  }
  function hydrateSlide(slide){
    if (!slide) return;
    slide.querySelectorAll('img[data-src]').forEach(function(im){
      im.src = im.getAttribute('data-src');
      im.removeAttribute('data-src');
    });
  }
  function startCarousel(id, ms){
    var el = document.getElementById(id);
    if (!el) return;
    var slides = el.querySelectorAll('.slide'), dots = el.querySelectorAll('.dot'), i = 0;
    hydrateSlide(slides[1]); // pré-carrega o próximo
    timers.push(setInterval(function(){
      slides[i].classList.remove('active'); dots[i].classList.remove('active');
      i = (i + 1) % slides.length;
      hydrateSlide(slides[i]);
      hydrateSlide(slides[(i + 1) % slides.length]);
      slides[i].classList.add('active'); dots[i].classList.add('active');
    }, ms || 2200));
  }

  /* ---------- renderers ---------- */
  var renderers = {

    landing: function(s){
      var bullets = s.bullets.map(function(b){ return '<div class="bullet"><span class="bi">◆</span><span>' + b + '</span></div>'; }).join('');
      var bas = s.baStrip.map(function(b){
        return '<div class="bas"><div class="pair"><img src="' + b.before + '" alt=""><img src="' + b.after + '" alt=""></div><div class="nm">' + b.name + '</div></div>';
      }).join('');
      return '<div class="screen">'
        + '<div class="hero-img"><img src="' + s.heroImg + '" alt="Pegamento de Arroz Morado Coreano" fetchpriority="high"></div>'
        + '<p class="q-sub">' + s.sub + '</p>'
        + '<p class="nob">' + s.nob + '</p>'
        + '<div class="bullets">' + bullets + '</div>'
        + '<div class="urg">' + s.urg + '</div>'
        + '<div class="ba-strip">' + bas + '</div>'
        + '<div class="dr-chip"><img src="' + s.chip.img + '" alt="">'
        + '<div><div class="nm">' + s.chip.name + ' <span>✔</span></div><div class="cr">' + s.chip.cred + '</div></div></div>'
        + '</div>'
        + ctaBar('<button class="btn pulse-soft" id="btn-cta">' + s.cta + '</button><div class="micro">' + s.micro + '</div>');
    },

    bigidea: function(s){
      var cards = s.cards.map(function(c){
        var media = c.img
          ? '<img src="' + c.img + '" alt=""' + (c.pos ? ' style="object-position:' + c.pos + '"' : '') + '>'
          : '<div class="bi-ph">' + c.ph + '</div>';
        return '<div class="bi-card">' + media + '<div class="bi-cap">' + c.cap + '</div></div>';
      }).join('');
      return '<div class="screen inter"><h2>' + s.title + '</h2>' + cards + '</div>'
        + ctaBar('<div class="yn-row"><button class="btn" id="btn-yes">' + s.yes + '</button><button class="btn ghost" id="btn-no">' + s.no + '</button></div>');
    },

    single: function(s){
      var h = '<div class="screen">';
      if (s.lockBanner) h += '<div class="lock-banner">' + s.lockBanner + '</div>';
      h += '<h1 class="q-title">' + fill(s.title) + '</h1>';
      if (s.sub) h += '<p class="q-sub">' + s.sub + '</p>';
      h += '<div class="options">';
      s.options.forEach(function(o, i){
        h += '<button class="opt single" data-i="' + i + '"><span class="emoji">' + o.e + '</span><span>' + o.t + '</span><span class="check"></span></button>';
      });
      return h + '</div></div>';
    },

    multi: function(s){
      var h = '<div class="screen"><h1 class="q-title">' + fill(s.title) + '</h1>';
      if (s.sub) h += '<p class="q-sub">' + s.sub + '</p>';
      h += '<div class="options">';
      s.options.forEach(function(o, i){
        h += '<button class="opt" data-i="' + i + '"><span class="emoji">' + o.e + '</span><span>' + o.t + '</span><span class="check">✓</span></button>';
      });
      return h + '</div></div>' + ctaBar('<button class="btn" id="btn-cta" disabled>Continuar</button>');
    },

    zones: function(s){
      var h = '<div class="screen"><h1 class="q-title">' + fill(s.title) + '</h1>';
      if (s.sub) h += '<p class="q-sub">' + s.sub + '</p>';
      h += '<div class="zone-grid">';
      s.options.forEach(function(o, i){
        h += '<button class="opt" data-i="' + i + '"><img src="' + o.img + '" alt="" loading="lazy"><span>' + o.t + '</span><span class="check">✓</span></button>';
      });
      return h + '</div></div>' + ctaBar('<button class="btn" id="btn-cta" disabled>Continuar</button>');
    },

    name: function(s){
      return '<div class="screen"><h1 class="q-title">' + s.title + '</h1>'
        + '<p class="q-sub">' + s.sub + '</p>'
        + '<input class="name-input" id="name-input" type="text" maxlength="24" autocomplete="given-name" placeholder="Tu nombre" value="' + esc(QuizState.get('name') || '') + '">'
        + '</div>' + ctaBar('<button class="btn" id="btn-cta" disabled>' + s.cta + '</button>');
    },

    interstitial: function(s){
      return '<div class="screen inter">' + fill(s.html()) + '</div>'
        + ctaBar('<button class="btn ' + (s.ctaClass || '') + '" id="btn-cta">' + s.cta + '</button>');
    },

    break: function(s){
      var tried = (QuizState.get('tried') || []).filter(function(t){ return t !== 'nothing'; });
      var pool = [];
      if (tried.length) tried.forEach(function(t){ if (TESTIMONIALS_BY_METHOD[t]) pool = pool.concat(TESTIMONIALS_BY_METHOD[t]); });
      else Object.keys(TESTIMONIALS_BY_METHOD).forEach(function(k){ pool.push(TESTIMONIALS_BY_METHOD[k][0]); });
      var slides = pool.map(function(t){ return tCard(t); });
      return '<div class="screen inter">'
        + '<span class="kicker-tag">No estás sola</span>'
        + '<h2>Está todo bien, ' + esc(QuizState.get('name') || 'amiga') + '. Miles de las más de 37 mil mujeres que rejuvenecieron con el Pegamento de Arroz Morado Coreano pasaron exactamente por esto.</h2>'
        + '<p class="body" style="text-align:center">Mira lo que dicen sobre los métodos que <b>tú</b> probaste:</p>'
        + carouselHtml(slides, 'brk-car') + '</div>'
        + ctaBar('<button class="btn" id="btn-cta">' + s.cta + '</button>');
    },

    emotional: function(s){
      var h = '<div class="screen">';
      if (s.img2) {
        h += '<div class="ba-card" style="margin-bottom:12px"><div class="ba-pair">'
          + '<div class="half"><span class="ba-tag">Antes</span><img src="' + s.img + '" alt=""></div>'
          + '<div class="half"><span class="ba-tag after">Después</span><img src="' + s.img2 + '" alt=""></div>'
          + '</div></div>';
      } else {
        h += '<div class="emo-img"><img src="' + s.img + '" alt=""></div>';
      }
      if (s.caption) h += '<div class="emo-cap">' + s.caption + '</div>';
      h += '<div class="emo-quote">' + s.quote + '</div><div class="options">';
      s.options.forEach(function(o, i){
        h += '<button class="opt single" data-i="' + i + '"><span class="emoji">' + o.e + '</span><span>' + o.t + '</span><span class="check"></span></button>';
      });
      return h + '</div></div>';
    },

    goal: function(s){
      var h = '<div class="screen"><h1 class="q-title">' + fill(s.title) + '</h1><div class="options">';
      s.options.forEach(function(o, i){
        h += '<button class="opt single" data-i="' + i + '"><span class="emoji">' + o.e + '</span><span>' + o.t + '</span><span class="check"></span></button>';
      });
      h += '</div><div id="goal-extra"></div></div>'
        + ctaBar('<button class="btn" id="btn-cta" disabled style="visibility:hidden">' + s.cta + '</button>');
      return h;
    },

    loading: function(s){
      var C = 2 * Math.PI * 52; // raio 52
      var h = '<div class="screen loadv2">'
        + '<div class="ring-wrap"><svg width="118" height="118" viewBox="0 0 118 118">'
        + '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">'
        + '<stop offset="0%" stop-color="#8E9FE5"/><stop offset="100%" stop-color="#4350A8"/></linearGradient></defs>'
        + '<circle class="ring-bg" cx="59" cy="59" r="52"/>'
        + '<circle class="ring-fg" id="ring-fg" cx="59" cy="59" r="52" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/>'
        + '</svg><div class="ring-pct" id="ring-pct">0%</div></div>'
        + '<div class="load-title">' + fill(s.title) + '</div>'
        + '<div class="load-current" id="load-current"></div>';
      if (s.items) {
        h += '<div class="load-list">';
        s.items.forEach(function(it, i){
          h += '<div class="load-item" id="li-' + i + '"><span class="li-ico">⏳</span><span>' + it + '</span></div>';
        });
        h += '</div>';
      }
      if (s.carousel) h += carouselHtml(s.carousel.map(function(t){ return tCard(t); }), 'load-car');
      if (s.baCarousel) h += carouselHtml(s.baCarousel.map(function(b){ return baCard(b, true); }), 'load-bacar');
      if (s.credentials) {
        var cr = s.credentials;
        h += '<div class="cred-block"><img src="' + cr.img + '" alt="">'
          + '<div><div class="cb-n">' + cr.name + (cr.check ? ' <span>✔</span>' : '') + '</div><ul>'
          + cr.items.map(function(it){ return '<li>' + it + '</li>'; }).join('') + '</ul></div></div>';
      }
      if (s.social) h += '<div class="load-social">★★★★★ ' + s.social + '</div>';
      return h + '</div>';
    },

    diagnosis: function(s){
      var a = QuizState.answers();
      var d = buildDiagnosis(a);
      var name = QuizState.get('name') || 'amiga';
      var age = QuizState.get('age_bucket') || '';
      var findingsHtml = d.findings.map(function(f){ return '<div class="diag-alert"><span class="x">❌</span><span>' + f + '</span></div>'; }).join('');
      var benefitsHtml = d.benefits.map(function(b){ return '<div class="benefit-card"><div class="bc-i">' + b.i + '</div><div class="bc-t">' + b.t + '</div></div>'; }).join('');
      var zones = ['z-off','z-weak','z-on'];
      var gauge = zones.map(function(z, i){
        return '<div class="zone ' + z + (i === d.status.zone ? ' lit' : '') + '">' + (i === d.status.zone ? '<span class="pin"></span>' : '') + '</div>';
      }).join('');
      // gráfico de projeção (SVG): curva subindo Today -> Day 21
      var chart = '<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">'
        + '<line x1="28" y1="104" x2="312" y2="104" stroke="#E9E5DC" stroke-width="1.5"/>'
        + '<line x1="28" y1="22" x2="312" y2="22" stroke="#BFE5CD" stroke-width="1.5" stroke-dasharray="5 4"/>'
        + '<text x="312" y="15" font-size="9.5" font-weight="800" fill="#2E9E5B" text-anchor="end" font-family="Inter,sans-serif">TU META</text>'
        + '<path d="M34 98 C 110 96, 150 78, 200 56 S 290 28, 306 25" fill="none" stroke="#5B6BD6" stroke-width="3.5" stroke-linecap="round"/>'
        + '<circle cx="34" cy="98" r="6" fill="#D64545"/>'
        + '<text x="34" y="86" font-size="9" font-weight="800" fill="#D64545" text-anchor="start" font-family="Inter,sans-serif">TÚ HOY</text>'
        + '<circle cx="306" cy="25" r="6" fill="#2E9E5B"/>'
        + '<text x="34" y="120" font-size="9" font-weight="700" fill="#6B7080" font-family="Inter,sans-serif">Hoy</text>'
        + '<text x="124" y="120" font-size="9" font-weight="700" fill="#6B7080" font-family="Inter,sans-serif">Sem. 1</text>'
        + '<text x="214" y="120" font-size="9" font-weight="700" fill="#6B7080" font-family="Inter,sans-serif">Sem. 2</text>'
        + '<text x="306" y="120" font-size="9" font-weight="700" fill="#6B7080" text-anchor="end" font-family="Inter,sans-serif">Día 21</text>'
        + '</svg>';
      return '<div class="screen">'
        + '<div class="diag-head"><img src="assets/t25-dryuna-diagnosis.jpg" alt="Dr. Yuna Mun">'
        + '<div><div class="dh-t">Evaluación de la Dra. Yuna para ' + esc(name) + (age ? ', ' + age : '') + '</div>'
        + '<div class="dh-s">Basada en TUS respuestas · comparada con su método clínico</div></div></div>'
        + '<div class="diag-box-red">'
        + '<div class="status-line">Estado del Escudo de la Piel</div>'
        + '<div class="status-value">' + d.status.label + '</div>'
        + '<div class="status-gauge">' + gauge + '</div>'
        + '<div class="gauge-labels"><span>Apagado</span><span>Debilitado</span><span>Encendido</span></div>'
        + '<div class="diag-alert-title">⚠️ Lo que encontré en TUS respuestas:</div>'
        + findingsHtml + '</div>'
        + '<div class="diag-box-green">💚 <b>La buena noticia: el escudo puede volver a ENCENDERSE — comprobado en mujeres ' + (age ? 'de ' + age : 'de tu edad') + '.</b> El Pegamento de Arroz Morado Coreano — en la proporción correcta para TU piel — es el interruptor. ✨</div>'
        + '<div class="proj-chart"><div class="ng-title">Tu progresión prevista — próximos 21 días</div>' + chart + '</div>'
        + '<div class="benefit-grid">' + benefitsHtml + '</div>'
        + '<div class="diag-sign"><span class="signature" style="font-size:21px">Dr. Yuna Mun</span></div>'
        + '</div>'
        + ctaBar('<button class="btn" id="btn-cta">' + s.cta + '</button>');
    },

    futurepacing: function(s){
      var fp = buildFuturePacing(QuizState.answers());
      var items = fp.items.map(function(it){
        return '<div class="fp-item' + (it.gold ? ' gold' : '') + '"><div class="wk">' + it.wk + '</div><div class="tx">' + it.tx + '</div></div>';
      }).join('');
      var proofHtml = fp.proof ? '<div class="fp-proof" style="margin-top:18px">' + tCard(fp.proof) + '</div>' : '';
      return '<div class="screen inter">'
        + '<span class="kicker-tag">Tu proyección</span>'
        + '<h2>' + fp.title + '</h2>'
        + '<div class="fp-hero"><img src="assets/sales-macro-bowl.jpg" alt="Pegamento de Arroz Morado Coreano"></div>'
        + '<div class="fp-timeline">' + items + '</div>'
        + proofHtml + '</div>'
        + ctaBar('<button class="btn" id="btn-cta">' + s.cta + '</button>');
    }
  };

  /* ---------- bind ---------- */
  function bind(step){
    var backBtn = document.getElementById('btn-back');
    if (backBtn) backBtn.addEventListener('click', function(){ go(current - 1); });

    var type = step.type;

    if (type === 'landing') {
      document.getElementById('btn-cta').addEventListener('click', function(){
        track('QuizStart', {});
        next();
      });
    }

    if (type === 'bigidea') {
      ['btn-yes','btn-no'].forEach(function(id, idx){
        document.getElementById(id).addEventListener('click', function(){
          var v = idx === 0 ? 'yes' : 'no';
          QuizState.set(step.varName, v);
          track('quiz_answer', { step: step.id, question: step.varName, answer: v });
          next();
        });
      });
    }

    if (type === 'single' || type === 'emotional') {
      root.querySelectorAll('.opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          var o = step.options[+btn.dataset.i];
          QuizState.set(step.varName, o.v);
          track('quiz_answer', { step: step.id, question: step.varName, answer: o.v });
          if (step.commitEvent && (o.v === 'committed' || o.v === 'tonight')) track('CommitYes', {});
          btn.classList.add('selected');
          timers.push(setTimeout(next, 220));
        });
      });
    }

    if (type === 'multi' || type === 'zones') {
      var selected = [];
      var cta = document.getElementById('btn-cta');
      root.querySelectorAll('.opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          var o = step.options[+btn.dataset.i];
          var idx = selected.indexOf(o.v);
          if (idx === -1) {
            if (o.exclusive) {
              selected = [];
              root.querySelectorAll('.opt').forEach(function(b){ b.classList.remove('selected'); });
            } else {
              step.options.forEach(function(oo, j){
                if (oo.exclusive) {
                  var k = selected.indexOf(oo.v);
                  if (k !== -1) { selected.splice(k, 1); root.querySelectorAll('.opt')[j].classList.remove('selected'); }
                }
              });
            }
            selected.push(o.v);
            btn.classList.add('selected');
          } else {
            selected.splice(idx, 1);
            btn.classList.remove('selected');
          }
          cta.disabled = selected.length === 0;
        });
      });
      cta.addEventListener('click', function(){
        QuizState.set(step.varName, selected);
        track('quiz_answer', { step: step.id, question: step.varName, answer: selected });
        next();
      });
    }

    if (type === 'name') {
      var input = document.getElementById('name-input');
      var nameCta = document.getElementById('btn-cta');
      nameCta.disabled = !(input.value.trim().length >= 2);
      input.addEventListener('input', function(){ nameCta.disabled = input.value.trim().length < 2; });
      input.addEventListener('keydown', function(e){ if (e.key === 'Enter' && !nameCta.disabled) nameCta.click(); });
      nameCta.addEventListener('click', function(){
        var v = input.value.trim();
        QuizState.set('name', v.charAt(0).toUpperCase() + v.slice(1));
        track('quiz_answer', { step: step.id, question: 'name_given', answer: true });
        next();
      });
    }

    if (type === 'interstitial' || type === 'diagnosis' || type === 'futurepacing' || type === 'break') {
      document.getElementById('btn-cta').addEventListener('click', function(){
        if (step.eventOnCta && step.event) track(step.event, {});
        next();
      });
      if (type === 'break') startCarousel('brk-car', 2600);
    }

    if (type === 'goal') {
      var extra = document.getElementById('goal-extra');
      var goalCta = document.getElementById('btn-cta');
      root.querySelectorAll('.opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          root.querySelectorAll('.opt').forEach(function(b){ b.classList.remove('selected'); });
          btn.classList.add('selected');
          var o = step.options[+btn.dataset.i];
          QuizState.set(step.varName, o.v);
          track('quiz_answer', { step: step.id, question: step.varName, answer: o.v });
          extra.innerHTML = '<div class="goal-badge">' + step.badge(o.v) + '</div>'
            + '<div class="yuna-validate"><img src="assets/avatar-dryuna.jpg" alt=""><div class="tx">' + fill(step.validation()) + '</div></div>';
          goalCta.style.visibility = 'visible';
          goalCta.disabled = false;
        });
      });
      goalCta.addEventListener('click', next);
    }

    if (type === 'loading') {
      var items = step.items || [];
      var totalMs = items.length * (step.itemMs || 1500) + 800;
      var C = 2 * Math.PI * 52;
      var ringFg = document.getElementById('ring-fg');
      var ringPct = document.getElementById('ring-pct');
      var currentLbl = document.getElementById('load-current');
      var start = Date.now();
      // anel + porcentagem (suave, 10fps)
      timers.push(setInterval(function(){
        var p = Math.min(1, (Date.now() - start) / totalMs);
        ringFg.style.strokeDashoffset = C * (1 - p);
        ringPct.textContent = Math.round(p * 100) + '%';
      }, 100));
      // checklist sequencial
      var i = 0;
      function tick(){
        if (i > 0) {
          var prev = document.getElementById('li-' + (i - 1));
          if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('.li-ico').textContent = '✅'; }
        }
        if (i >= items.length) {
          timers.push(setTimeout(function(){
            if (step.redirect) finish(); else next();
          }, 800));
          return;
        }
        var li = document.getElementById('li-' + i);
        if (li) li.classList.add('active');
        if (currentLbl) currentLbl.textContent = items[i] + '...';
        i++;
        timers.push(setTimeout(tick, step.itemMs || 1500));
      }
      tick();
      if (step.carousel) startCarousel('load-car', 2100);
      if (step.baCarousel) startCarousel('load-bacar', 2400);
    }
  }

  /* ---------- render ---------- */
  function render(){
    var step = STEPS[current];
    var html = chrome(step) + renderers[step.type](step);
    root.innerHTML = html;
    document.body.classList.toggle('has-ctabar', html.indexOf('cta-bar') !== -1);
    bind(step);
    track('quiz_step_view', { step: step.id, index: current, type: step.type });
    if (step.event && !step.eventOnCta) track(step.event, { step: step.id });
    // preload da próxima tela com imagem
    var nxt = STEPS[current + 1];
    if (nxt) {
      var imgs = [];
      if (nxt.heroImg) imgs.push(nxt.heroImg);
      if (nxt.img) imgs.push(nxt.img);
      if (nxt.img2) imgs.push(nxt.img2);
      imgs.forEach(function(src){ var im = new Image(); im.src = src; });
    }
  }

  /* ============================================================
     EXIT-INTENT / BACK-REDIRECT DO QUIZ (melhoria 5)
     Tentou sair → popup "seu plano de 21 dias está pronto" →
     CTA leva para o loading final (T28), que entrega a oferta.
     ============================================================ */
  var T28_IDX = STEPS.findIndex(function(s){ return s.id === 'T28'; });
  var exitArmed = false, mouseShown = false;

  function showQuizExitPopup(){
    if (document.getElementById('exit-popup')) return;
    var name = QuizState.get('name') || '';
    var div = document.createElement('div');
    div.className = 'popup-overlay';
    div.id = 'exit-popup';
    div.innerHTML = '<div class="popup">'
      + '<button class="px" id="exit-x">×</button>'
      + '<span class="gift-emoji">🫐</span>'
      + '<h3>Espera' + (name ? ', ' + name : '') + ' — ¡tu plan de 21 días del Pegamento de Arroz Morado Coreano está listo!</h3>'
      + '<p>Tus respuestas ya fueron analizadas y tu protocolo personalizado está <b>generado y esperándote</b>. No lo pierdas — es solo un toque.</p>'
      + '<button class="btn" id="exit-cta">Quiero mi acceso →</button>'
      + '<button class="later" id="exit-later">No, quiero seguir respondiendo</button>'
      + '</div>';
    document.body.appendChild(div);
    track('ExitIntentQuiz', { step: STEPS[current].id });
    function close(){ var el = document.getElementById('exit-popup'); if (el) el.remove(); }
    document.getElementById('exit-cta').addEventListener('click', function(){
      track('ExitIntentAccept', {});
      close();
      go(T28_IDX);
    });
    document.getElementById('exit-x').addEventListener('click', close);
    document.getElementById('exit-later').addEventListener('click', close);
  }

  function armExitTrap(){
    if (exitArmed) return;
    exitArmed = true;
    history.pushState({ kbm: 1 }, '');
    window.addEventListener('popstate', function(){
      if (current >= 1 && current < T28_IDX) {
        history.pushState({ kbm: 1 }, '');   // re-arma
        showQuizExitPopup();
      }
      // na T1 ou já no final: deixa sair
    });
    document.addEventListener('mouseout', function(e){
      if (mouseShown || e.relatedTarget) return;
      if (e.clientY <= 0 && current >= 1 && current < T28_IDX) {
        mouseShown = true;
        showQuizExitPopup();
      }
    });
  }

  var _renderOrig = render;
  render = function(){
    _renderOrig();
    if (current >= 1) armExitTrap();
  };

  render();
})();
