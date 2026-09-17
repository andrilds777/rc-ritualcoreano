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
        + '<h2>Está todo bien, ' + esc(QuizState.get('name') || 'amiga') + '. Miles de las más de 37 mil mujeres que rejuvenecieron con el Pegamento de Arroz
