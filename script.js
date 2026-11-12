/* ============================================================
   GIOVANNI MUGAVERO — PORTFOLIO
   Interazioni, filtri, modale progetti, reveal e micro-dettagli.
   Nessuna dipendenza esterna.
   ============================================================ */

(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  /* ==========================================================
     DATI PROGETTI
     ========================================================== */
  const projectData = {
    nova: {
      kicker: 'AI · Desktop assistant',
      subtitle: 'Assistente locale per Windows',
      percent: 72,
      summary:
        'Nova è un assistente AI che gira sul computer: interpreta la richiesta, sceglie uno dei 58 strumenti disponibili e verifica il risultato prima di rispondere. La voce è gestita interamente in locale, senza inviare audio al cloud.',
      features: [
        '58 strumenti registrati e orchestrati dal modello',
        '73 controlli automatici prima di eseguire un’azione',
        'Voce locale con Ollama, Whisper e Piper',
        'Sprint 1–3 completati; integrazione desktop in rifinitura'
      ],
      tech: ['Python', 'Ollama', 'FastAPI', 'SQLite', 'PyQt', 'Whisper', 'Piper'],
      note: 'Modelli e memoria restano sul computer: è un progetto pensato per funzionare offline.'
    },

    lumia: {
      kicker: 'Web · Mobile · 4 varianti',
      subtitle: 'Ecosistema digitale per un barbiere',
      percent: 95,
      summary:
        'Quattro declinazioni dello stesso brand: sito vetrina in React, gestionale web, app mobile in Expo e backend FastAPI. Comprende autenticazione OAuth, database MongoDB ed email transazionali con Resend. Il progetto è completo: mancano solo le ottimizzazioni SEO per la pubblicazione definitiva.',
      features: [
        'Sito React, gestionale e app Expo dedicate',
        'Backend FastAPI con MongoDB e OAuth',
        'Variante mobile con 16 test pytest superati',
        'Email transazionali gestite con Resend',
        'Live su Vercel, in rifinitura SEO'
      ],
      tech: ['React', 'Expo', 'FastAPI', 'MongoDB', 'OAuth', 'Resend', 'Tailwind'],
      note: 'Live su Vercel: https://lumia-barber.vercel.app. Restano da rifinire SEO e indicizzazione.'
    },

    giovabot: {
      kicker: 'Bot · Community',
      subtitle: 'Un piccolo mondo dentro WhatsApp',
      percent: 85,
      summary:
        'GiovaBot trasforma una chat WhatsApp in un ecosistema: economia interna, minigiochi, pesca, missioni giornaliere, achievement e pannello di amministrazione. L’AI passa da Groq, mentre la voce usa Whisper ed edge-tts.',
      features: [
        'Oltre 80 comandi WhatsApp disponibili',
        'Economia, minigiochi, pesca, missioni e achievement',
        'Pannello admin per gestire utenti ed eventi',
        'AI con Groq e risposte vocali con Whisper ed edge-tts'
      ],
      tech: ['Node.js', 'whatsapp-web.js', 'Groq', 'Whisper', 'edge-tts'],
      note: 'Progetto nato per un gruppo ristretto: il bot gira su un numero dedicato, non su un’infrastruttura pubblica.'
    },

    taxiboss: {
      kicker: 'Web · PWA demo',
      subtitle: 'Prenotare un taxi, senza attese finte',
      percent: 72,
      summary:
        'TaxiBoss nasce da un compito scolastico: creare una piccola app Android. Non capivo ancora bene il funzionamento, così ho ripiegato su una web app. È una demo di PWA per prenotare un taxi a Catania, con mappa Leaflet, geocoding e traffico simulati, service worker e prenotazione conclusa su WhatsApp.',
      features: [
        'Nato da un compito scolastico pensato per Android',
        'Realizzato come web app per mancanza di basi native',
        'Mappa interattiva con Leaflet e geocoding',
        'Taxi e traffico simulati per la demo',
        'Service worker e installazione come PWA',
        'Prenotazione conclusa tramite WhatsApp'
      ],
      tech: ['JavaScript', 'Leaflet', 'Service Worker', 'PWA', 'HTML', 'CSS'],
      note: 'È una demo: i taxi e il traffico non sono collegati a flotte o dati reali.'
    },

    siria: {
      kicker: 'Web · One-page',
      subtitle: 'Sito vetrina per una nail artist',
      percent: 87,
      summary:
        'Nato come passatempo per mia sorella, che fa le unghie: un one-page statico costruito attorno alle sue immagini, con galleria dei lavori, attestati, identità visiva e prenotazioni dirette su WhatsApp. Il layout è interamente responsive.',
      features: [
        'Nato come passatempo per mia sorella nail artist',
        'One-page statico con identità visiva dedicata',
        'Galleria lavori e sezione attestati',
        'Prenotazioni dirette su WhatsApp',
        'Layout responsive curato per le immagini'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Responsive design'],
      note: 'La sezione mappa è ancora un segnaposto grafico: manca l’integrazione con una mappa reale.'
    },

    ncm: {
      kicker: 'Game · Multiplayer',
      subtitle: 'Nomi, Cose e Città in tempo reale',
      percent: 85,
      summary:
        'Nato dalla poca voglia di scrivere (in modo comico): invece di usare carta e penna ho creato un’app per giocare con amici e famiglia. La versione multiplayer del classico gioco di società: stanze con codice, lobby, categorie, timer e punteggi sincronizzati. Il ciclo di round è completo e gestito lato server con Express e Socket.IO.',
      features: [
        'Nato per evitare di scrivere a mano',
        'Stanze private con codice di accesso',
        'Lobby, categorie e timer sincronizzati',
        'Ciclo completo di round e punteggi',
        'Comunicazione realtime con Socket.IO'
      ],
      tech: ['Node.js', 'Express', 'Socket.IO', 'JavaScript', 'HTML', 'CSS'],
      note: 'Serve un server Node attivo: il gioco non funziona completamente offline.'
    },

    schoolbot: {
      kicker: 'AI · RAG',
      subtitle: 'Risposte ancorate ai documenti della scuola',
      percent: 78,
      summary:
        'Progetto scolastico pensato per imparare l’AI: un caso studio che raccoglie tre prototipi RAG. L’assistente cerca solo nei documenti scolastici indicizzati, cita le fonti e prova a rendere la risposta più chiara con un avatar 3D. Le tre varianti esplorano stack e interfacce diverse.',
      features: [
        'Progetto scolastico per imparare l’AI',
        'RAG su documenti scolastici indicizzati',
        'Citazioni delle fonti nelle risposte',
        'Tre varianti: FastAPI, Flask e three.js',
        'Avatar VRM per accompagnare la conversazione'
      ],
      tech: ['FastAPI', 'Flask', 'ChromaDB', 'Ollama', 'Anthropic', 'three.js', 'RAG'],
      note: 'Percentuale combinata: chatbot-istituti 88%, CHATBOT 68%, ChatBot_Node 65%.'
    },

    midnight: {
      kicker: 'Game · Tycoon mobile',
      subtitle: 'Ripara, guadagna, cresci',
      percent: 70,
      summary:
        'Midnight Motors è un tycoon di riparazioni per mobile, non un gioco di corsa. Il loop principale è: acquistare auto, gestire il garage, completare lavori a tempo, guadagnare e investire nel mercato.',
      features: [
        'Garage e mercato delle auto',
        'Riparazioni a tempo con guadagni',
        'Sei missioni e progressione',
        'Salvataggi locali con shared_preferences'
      ],
      tech: ['Flutter', 'Dart', 'shared_preferences'],
      note: 'Il concept è un gestionale di riparazioni: le auto sono il tema, non la guida.'
    },

    lucky: {
      kicker: 'Game · Concept visivo',
      subtitle: 'Una mappa, un casinò, un’idea',
      percent: 18,
      summary:
        'Lucky Debt nasce dall’idea di trasformare GiovaBot in un gioco: il bot contiene già molti minigiochi, così ho provato a estrarne uno in un prodotto dedicato. Per ora è un concept visivo in Flutter, con mappa disegnata in CustomPainter e transizione zoom verso il casinò. La parte grafica c’è, la logica di gioco no.',
      features: [
        'Nato dall’idea di rendere GiovaBot un gioco',
        'Mappa illustrata disegnata con CustomPainter',
        'Transizione zoom verso il casinò',
        'Concept UI e direzione visiva',
        'Logica di gioco ancora da progettare'
      ],
      tech: ['Flutter', 'Dart', 'CustomPainter'],
      note: 'Stato reale: solo concept visivo. Non c’è ancora un loop giocabile.'
    },

    torn: {
      kicker: 'Bot · Automazione',
      subtitle: 'Notifiche puntuali da Torn',
      percent: 85,
      summary:
        'Un notificatore Python per Torn: controlla vendite, messaggi privati, energia e cooldown, poi invia push mirate. Usa ntfy e CallMeBot, mantiene lo stato tra un avvio e l’altro ed è monitorato con healthchecks.io.',
      features: [
        'Monitoraggio di vendite, DM, energia e cooldown',
        'Notifiche push con ntfy e CallMeBot',
        'Stato persistente tra i riavvii',
        'Heartbeat su healthchecks.io'
      ],
      tech: ['Python', 'REST API', 'ntfy', 'CallMeBot', 'healthchecks.io'],
      note: 'Richiede una API key personale di Torn, volutamente non inclusa nel progetto.'
    },

    markx: {
      kicker: 'AI · Studio guidato',
      subtitle: 'Assistente vocale per Windows',
      percent: 78,
      summary:
        'Mark-X è un assistente vocale desktop costruito seguendo il tutorial di FatihMakes. Ho implementato l’interfaccia Tkinter, il riconoscimento vocale con Vosk, la sintesi con edge-tts e il collegamento ai modelli via OpenRouter e Gemini.',
      features: [
        'Riconoscimento vocale locale con Vosk',
        'Interfaccia desktop in Tkinter',
        'Sintesi vocale con edge-tts',
        'LLM via OpenRouter e Gemini'
      ],
      tech: ['Python', 'Tkinter', 'Vosk', 'edge-tts', 'OpenRouter', 'Gemini'],
      note: 'Studio guidato: l’impianto didattico e il tutorial sono di FatihMakes, l’implementazione è mia.'
    },

    novaandroid: {
      kicker: 'App · Voice prototype',
      subtitle: 'L’idea di Nova, su telefono',
      percent: 38,
      summary:
        'Nova Mobile è un prototipo Flutter separato da Nova: esplora un’interfaccia vocale con STT e TTS, un orb animato e un concept di conversazione mobile. Non condivide codice con l’assistente desktop.',
      features: [
        'Interfaccia vocale STT e TTS',
        'Orb animato e concept UI mobile',
        'Prototipo Flutter autonomo',
        'Ponte MethodChannel nativo ancora mancante'
      ],
      tech: ['Flutter', 'Dart', 'STT', 'TTS'],
      note: 'Separato da Nova: condivide nome e idea, non l’architettura. Manca il collegamento nativo in MainActivity.kt.'
    },

    sicilian: {
      kicker: 'Game · Mod Minecraft',
      subtitle: 'La filiera dell’arancino in Forge',
      percent: 64,
      summary:
        'Sicilian Delight porta gli arancini siciliani in Minecraft Forge 1.20.1: ingredienti, ricette, texture pixel art e una filiera di produzione completa. Il progetto compila in JAR, ma il caricamento del mod va ancora sistemato.',
      features: [
        'Filiera completa dell’arancino',
        'Ingredienti, ricette e crafting',
        'Texture pixel art originali',
        'Build JAR completata'
      ],
      tech: ['Java', 'Minecraft Forge 1.20.1', 'Pixel art', 'Gradle'],
      note: 'Compila ma va in crash al caricamento: metadata e registrazione del mod sono da completare.'
    },

    portfolio: {
      kicker: 'Web · Questo sito',
      subtitle: 'Il portfolio che stai guardando',
      percent: 100,
      summary:
        'Un sito statico senza framework e senza build: HTML, CSS e JavaScript scritti a mano. Include design system, animazioni al scroll, filtri, schede progetto, modale di dettaglio e asset completamente locali.',
      features: [
        'Design system custom con gradiente viola-blu',
        'Animazioni al scroll e cursore personalizzato',
        'Filtri e schede progetto interattive',
        'Modale dettaglio con navigazione tra progetti',
        'Font, immagini e CV serviti in locale'
      ],
      tech: ['HTML', 'CSS', 'JavaScript'],
      note: 'Nessuna dipendenza esterna: il sito funziona anche aprendo i file in locale.'
    }
  };

  /* ==========================================================
     RIFERIMENTI DOM
     ========================================================== */
  const body = document.body;
  const header = $('#siteHeader');
  const progressEl = $('.scroll-progress span');
  const navLinks = $$('.desktop-nav a');
  const cards = $$('.project-card');
  const projectCount = $('#projectCount');
  const filters = $$('.filter');

  const modal = $('#projectModal');
  const modalVisual = $('#modalVisual');
  const modalTitle = $('#modalTitle');
  const modalKicker = $('#modalKicker');
  const modalSubtitle = $('#modalSubtitle');
  const modalSummary = $('#modalSummary');
  const modalFeatures = $('#modalFeatures');
  const modalTech = $('#modalTech');
  const modalNote = $('#modalNote');
  const modalPercent = $('#modalPercent');
  const modalRing = $('#modalRing');
  const modalIndex = $('#modalIndex');
  const modalPrev = $('#modalPrev');
  const modalNext = $('#modalNext');

  /* ==========================================================
     HEADER + PROGRESSO + SCROLLSPY
     ========================================================== */
  let ticking = false;

  const sectionIds = navLinks
    .map((link) => link.getAttribute('href'))
    .filter((href) => href && href.startsWith('#'))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle('is-scrolled', y > 24);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressEl) {
      progressEl.style.setProperty('--scroll', max > 0 ? Math.min(y / max, 1) : 0);
    }

    let current = '';
    const offset = y + Math.min(window.innerHeight * 0.24, 180);
    sections.forEach((section) => {
      if (section.offsetTop <= offset) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  onScroll();

  /* ==========================================================
     MENU MOBILE
     ========================================================== */
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobileMenu');

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
    body.style.overflow = open ? 'hidden' : '';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      setMenu(!mobileMenu.classList.contains('is-open'));
    });

    $$('a', mobileMenu).forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) setMenu(false);
    });
  }

  /* ==========================================================
     REVEAL ON SCROLL
     ========================================================== */
  $$('.project-card, .skill-card, .goal-card, .timeline-item').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${(i % 3) * 0.06}s`);
  });

  const revealItems = $$('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* ==========================================================
     CONTATORI
     ========================================================== */
  const counters = $$('[data-count]');

  function animateCounter(el) {
    const target = Number(el.dataset.count) || 0;
    const duration = 1300;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ==========================================================
     FILTRI PROGETTI
     ========================================================== */
  function updateProjectCount() {
    const visible = cards.filter((card) => !card.classList.contains('is-hidden')).length;
    if (projectCount) projectCount.textContent = `${visible} ${visible === 1 ? 'progetto' : 'progetti'}`;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filters.forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        const cats = (card.dataset.cats || '').split(/\s+/);
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('is-hidden', !show);
        if (show) card.classList.add('is-visible');
      });

      updateProjectCount();
    });
  });

  filters.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
  });

  updateProjectCount();

  /* ==========================================================
     CURSORE PERSONALIZZATO
     ========================================================== */
  const cursor = $('.cursor');
  const cursorDot = $('.cursor-dot');
  const cursorRing = $('.cursor-ring');

  if (cursor && cursorDot && cursorRing && finePointer.matches && !reduceMotion.matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let cursorVisible = false;

    const interactive = 'a, button, .project-card, .filter, [role="button"], .tool, .contact-item';

    window.addEventListener(
      'pointermove',
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!cursorVisible) {
          cursorVisible = true;
          cursor.classList.add('is-visible');
        }

        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    document.addEventListener(
      'pointerover',
      (event) => {
        if (event.target.closest && event.target.closest(interactive)) {
          cursor.classList.add('is-hover');
        }
      },
      { passive: true }
    );

    document.addEventListener(
      'pointerout',
      (event) => {
        if (event.target.closest && event.target.closest(interactive)) {
          cursor.classList.remove('is-hover');
        }
      },
      { passive: true }
    );

    document.addEventListener('pointerleave', () => {
      cursorVisible = false;
      cursor.classList.remove('is-visible');
    });

    function cursorLoop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(cursorLoop);
    }

    cursorLoop();
  }

  /* ==========================================================
     TILT TERMINALE + GLOW CARD
     ========================================================== */
  const tiltEl = $('[data-tilt]');

  if (tiltEl && finePointer.matches && !reduceMotion.matches) {
    tiltEl.addEventListener('pointermove', (event) => {
      const rect = tiltEl.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      tiltEl.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
      tiltEl.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`);
    });

    tiltEl.addEventListener('pointerleave', () => {
      tiltEl.style.setProperty('--rx', '0deg');
      tiltEl.style.setProperty('--ry', '0deg');
    });
  }

  if (finePointer.matches) {
    cards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });
  }

  /* ==========================================================
     MODALE PROGETTI
     ========================================================== */
  let lastTrigger = null;
  let percentFrame = 0;

  function visibleCards() {
    return cards.filter((card) => !card.classList.contains('is-hidden'));
  }

  function setModalVisual(card) {
    if (!modalVisual) return;
    const media = card.querySelector('.project-media');
    modalVisual.innerHTML = '';
    if (!media) return;

    const clone = media.cloneNode(true);
    clone.classList.add('modal-media');
    clone.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
    });
    clone.querySelectorAll('.project-open-hint').forEach((el) => el.remove());
    modalVisual.appendChild(clone);
  }

  function animatePercent(target) {
    if (!modalPercent) return;
    cancelAnimationFrame(percentFrame);

    if (reduceMotion.matches) {
      modalPercent.textContent = target;
      return;
    }

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      modalPercent.textContent = Math.round(target * eased);
      if (p < 1) percentFrame = requestAnimationFrame(tick);
      else modalPercent.textContent = target;
    }

    percentFrame = requestAnimationFrame(tick);
  }

  function populateModal(card) {
    const id = card.dataset.project;
    const data = projectData[id];
    if (!data) return false;

    const visible = visibleCards();
    const index = visible.indexOf(card);

    if (modalKicker) modalKicker.textContent = data.kicker;
    if (modalTitle) modalTitle.textContent = card.querySelector('h3')?.textContent || data.subtitle;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalSummary) modalSummary.textContent = data.summary;

    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      data.features.forEach((feature) => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
      });
    }

    if (modalTech) {
      modalTech.innerHTML = '';
      data.tech.forEach((tech) => {
        const span = document.createElement('span');
        span.textContent = tech;
        modalTech.appendChild(span);
      });
    }

    if (modalNote) {
      modalNote.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = 'Nota: ';
      modalNote.append(strong, document.createTextNode(data.note));
    }

    if (modalRing) modalRing.style.setProperty('--p', data.percent);
    animatePercent(data.percent);

    if (modalIndex) {
      const total = String(visible.length).padStart(2, '0');
      modalIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${total}`;
    }

    setModalVisual(card);
    return true;
  }

  function openModal(card) {
    if (!modal || !populateModal(card)) return;
    lastTrigger = card;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    const closeButton = $('.modal-close', modal);
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    cancelAnimationFrame(percentFrame);

    if (lastTrigger) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
  }

  function moveModal(direction) {
    if (!modal || !modal.classList.contains('is-open')) return;
    const visible = visibleCards();
    if (visible.length < 2) return;

    const currentId = lastTrigger?.dataset.project;
    let index = visible.findIndex((card) => card.dataset.project === currentId);
    if (index < 0) index = 0;

    const next = (index + direction + visible.length) % visible.length;
    lastTrigger = visible[next];
    populateModal(visible[next]);
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  if (modal) {
    $$('[data-close-modal]', modal).forEach((el) => {
      el.addEventListener('click', closeModal);
    });

    if (modalPrev) modalPrev.addEventListener('click', () => moveModal(-1));
    if (modalNext) modalNext.addEventListener('click', () => moveModal(1));

    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const focusable = $$(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          modal
        ).filter((el) => el.offsetParent !== null);

        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (modal && modal.classList.contains('is-open')) {
        closeModal();
        return;
      }
      if (mobileMenu && mobileMenu.classList.contains('is-open')) setMenu(false);
    }

    if (!modal || !modal.classList.contains('is-open')) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveModal(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveModal(1);
    }
  });

  /* ==========================================================
     COPIA EMAIL
     ========================================================== */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    }
  }

  $$('.copy-email').forEach((button) => {
    const label = $('.copy-label', button);
    let timer = 0;

    button.addEventListener('click', async () => {
      const ok = await copyText(button.dataset.copy || 'mugaverogiovanni2506@gmail.com');
      if (!label) return;

      window.clearTimeout(timer);
      label.textContent = ok ? 'Email copiata!' : 'Copia non riuscita';
      button.classList.toggle('is-copied', ok);

      timer = window.setTimeout(() => {
        label.textContent = 'Copia email';
        button.classList.remove('is-copied');
      }, 2200);
    });
  });

  /* ==========================================================
     OROLOGI + ANNO
     ========================================================== */
  const clocks = $$('[data-clock]');
  const timeFormatter = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  function updateClocks() {
    const time = timeFormatter.format(new Date());
    clocks.forEach((clock) => {
      clock.textContent = time;
    });
  }

  updateClocks();
  window.setInterval(updateClocks, 1000);

  $$('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ==========================================================
     ANNO + LINK INTERNI FLUIDI
     ========================================================== */
  if (!reduceMotion.matches) {
    $$('a[href^="#"]').forEach((link) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;

      link.addEventListener('click', (event) => {
        const target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (history.replaceState) history.replaceState(null, '', id);
      });
    });
  }
})();
