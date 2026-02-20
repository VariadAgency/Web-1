/* --- Block 2 --- */
// Navigation Auto-Hide & Mobile Menu Toggle
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[Main.js] DOM loaded - Init Nav');
        const navWrapper = document.querySelector('.nav-wrapper');
        const nav = document.querySelector('nav');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        let lastScrollY = window.scrollY;

        // Mobile Menu Toggle
        if (mobileToggle && mobileMenu) {
            console.log('[Main.js] Mobile elements found:', mobileToggle, mobileMenu);

            let lastToggle = 0;
            function toggleMenu(e) {
                // Prevent double-fire from touch + click
                const now = Date.now();
                if (now - lastToggle < 300) return;
                lastToggle = now;

                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                console.log('[Main.js] Menu toggled!');

                const isActive = mobileMenu.classList.contains('is-active');

                if (isActive) {
                    mobileToggle.classList.remove('is-active');
                    mobileMenu.classList.remove('is-active');
                    nav.classList.remove('is-expanded'); // Header schrumpft
                    // Reset scroll position so nav doesn't flicker after close
                    lastScrollY = window.scrollY;
                } else {
                    mobileToggle.classList.add('is-active');
                    mobileMenu.classList.add('is-active');
                    nav.classList.add('is-expanded'); // Header wächst
                }
            }

            // Click event
            mobileToggle.addEventListener('click', toggleMenu, { passive: false });

            // Close menu when link is clicked
            mobileLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Wenn es ein Anker-Link (#) auf der gleichen Seite ist
                    if (link.getAttribute('href').startsWith('#')) {
                        mobileToggle.classList.remove('is-active');
                        mobileMenu.classList.remove('is-active');
                        nav.classList.remove('is-expanded'); // Header schrumpft
                        document.body.style.overflow = '';
                        lastScrollY = window.scrollY;
                    } 
                    // Bei normalen Links (wie en/index.html) lassen wir den Browser einfach navigieren
                });
            });
        } else {
            console.warn('[Main.js] Mobile elements NOT found!', { mobileToggle, mobileMenu });
        }

        // Initial sichtbar wenn oben
        if (window.scrollY < 50) {
            nav.classList.add('nav-visible-on-top');
        }

        const SCROLL_THRESHOLD = 5; // Minimum scroll delta to trigger show/hide
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            // Don't hide nav if mobile menu is open
            if (mobileMenu && mobileMenu.classList.contains('is-active')) return;

            const delta = currentScrollY - lastScrollY;

            // Wenn ganz oben (innerhalb 50px), Header sichtbar
            if (currentScrollY < 50) {
                nav.classList.add('nav-visible-on-top');
            } else if (delta < -SCROLL_THRESHOLD) {
                // Nach oben scrollen - Header einblenden
                nav.classList.add('nav-visible-on-top');
            } else if (delta > SCROLL_THRESHOLD) {
                // Nach unten scrollen - Header verstecken
                nav.classList.remove('nav-visible-on-top');
            }
            // Bei delta innerhalb Threshold: nichts ändern (Deadzone)

            lastScrollY = currentScrollY;
        });
    });


/* --- Block 3 --- */
// Contact Wizard (frontend only)
    (function(){
        function setup(){
        const root = document.getElementById('contact-wizard');
        if(!root) return; // should exist now
        console.log('[Wizard] init');
        const isEn = document.documentElement.lang.startsWith('en');
        const steps = Array.from(root.querySelectorAll('.wiz-step'));
        const nextBtn = root.querySelector('.wiz-btn.next');
        const prevBtn = root.querySelector('.wiz-btn.prev');
        const bar = root.querySelector('.wiz-progress .bar span');
        const dots = Array.from(root.querySelectorAll('.wiz-progress .dots i'));
        const state = { intent:null, budgetValue:1000, note:'', name:'', company:'', email:'', phone:'', skipBudget:false };
        let idx = 0;

        function setActive(i){
            steps.forEach((s,k)=> s.classList.toggle('is-active', k===i));
            idx = i;
            prevBtn.disabled = (idx===0);
            prevBtn.textContent = isEn ? 'Back' : 'Zurück';
            nextBtn.textContent = (idx === steps.length-1 ? (isEn ? 'Send Inquiry' : 'Anfrage absenden') : (isEn ? 'Next' : 'Weiter'));
            nextBtn.disabled = (idx===0 && !state.intent);
            const p = idx/(steps.length-1)*100; bar.style.width = p+'%';
            // Update step indicators with active/completed classes
            dots.forEach((d,k)=> {
                d.classList.toggle('completed', k < idx);
                d.classList.toggle('active', k === idx);
            });
            if(idx===3) renderSummary();

            // Auto-Focus Textarea on Step 1 - Aggressive retry strategy
            if(idx === 1) {
                const note = root.querySelector('#wiz-note');
                if(note) {
                    // Versuch 1: Schnell
                    setTimeout(() => note.focus({ preventScroll: true }), 100);
                    // Versuch 2: Nach Transition start
                    setTimeout(() => note.focus({ preventScroll: true }), 300);
                    // Versuch 3: Sicher ist sicher
                    setTimeout(() => note.focus({ preventScroll: true }), 600);
                }
            }

            // Auto-Focus Slider on Step 2 (Budget)
            if(idx === 2) {
                const budgetSlider = root.querySelector('#wiz-budget');
                if(budgetSlider) {
                    setTimeout(() => {
                        budgetSlider.focus({ preventScroll: true });
                        budgetSlider.click(); // Simuliere Klick
                    }, 150);
                }
            }
        }

        function toggleChip(btn){
            const key = btn.getAttribute('data-key');

            // --- Cookie Requirement Check: Debug & Force ---
            if(!key && typeof klaro !== 'undefined') {
                const manager = klaro.getManager();
                manager.loadConsents(); // Lade den aktuellsten Stand aus den Cookies
                
                const confirmed = manager.confirmed;
                const facebookConsent = manager.consents ? manager.consents.facebook : false;
                
                console.log('[Wizard Check] Confirmed:', confirmed, 'Facebook:', facebookConsent);

                // Wenn nicht bestätigt ODER facebook abgelehnt
                if (!confirmed || facebookConsent !== true) {
                    console.log('[Wizard Check] ACCESS DENIED. Showing Banner.');
                    
                    const banner = document.getElementById('variad-cookie-banner');
                    if(banner) {
                        const p = banner.querySelector('.text-side p');
                        const originalText = "Wir nutzen Cookies für Performance";
                        p.textContent = "Akzeptiere erst die Cookies.";
                        banner.classList.add('is-visible');
                        
                        const resetText = () => { p.textContent = originalText; };
                        document.getElementById('v-accept-btn').addEventListener('click', resetText, {once:true});
                        document.getElementById('v-decline-btn').addEventListener('click', resetText, {once:true});
                    }
                    return; // Blockiere hier hart!
                }
                console.log('[Wizard Check] ACCESS GRANTED.');
            }
            // ----------------------------------------------

            const dv = btn.getAttribute('data-value');
            const value = (dv !== null && dv !== undefined) ? dv : btn.textContent.trim();
            if(!key){ // step 0 intent
                state.intent = btn.dataset.value;
                root.querySelectorAll('[data-step="0"] .chip').forEach(b=> b.classList.toggle('is-on', b===btn));
                updateNextDisabled();

                // Bei Beratung: Budget überspringen, direkt zu Beschreibung (Step 1)
                if(state.intent === 'beratung'){
                    state.skipBudget = true;
                    setTimeout(()=> setActive(1), 120);
                } else {
                    state.skipBudget = false;
                    setTimeout(()=> setActive(1), 120);
                }
                return;
            }
            // single-choice keys
            root.querySelectorAll(`.chip[data-key="${key}"]`).forEach(b=> b.classList.remove('is-on'));
            btn.classList.add('is-on');
            state[key] = value;
            updateNextDisabled();
        }

        root.addEventListener('click', (e)=>{
            // in case something floats above: force enable pointer events on active step
            steps.forEach((s,k)=> s.style.pointerEvents = k===idx? 'auto':'none');
            const b = e.target.closest('.chip'); if(b){ toggleChip(b); return; }
            if(e.target===nextBtn){ onNext(); }
            if(e.target===prevBtn){ setActive(Math.max(0, idx-1)); }
        });

        const budgetInput = root.querySelector('#wiz-budget');
        if(budgetInput){
            const fmt=(n)=> new Intl.NumberFormat('de-DE').format(n)+' €';
            const out=root.querySelector('#wiz-budget-out');
            const sync=()=>{
                const raw = parseInt(budgetInput.value,10) || 1000;
                const clamped = Math.max(250, Math.min(2500, raw));
                const stepped = Math.min(2500, Math.max(250, Math.round(clamped/25)*25));
                state.budgetValue = stepped;
                if(out) out.textContent = (stepped >= 2500) ? '> 2 500 €' : fmt(stepped);
            };
            budgetInput.addEventListener('input',sync); sync();
        }

        

        // Mapping von technischen Werten zu lesbaren Namen
        function getIntentLabel(value){
            const labelsDe = {
                'smm': 'Social Media Management',
                'content': 'Content-Produktion',
                'ads': 'Meta Ads',
                'beratung': 'Kostenlos beraten',
                'sonstiges': 'Sonstiges'
            };
            const labelsEn = {
                'smm': 'Social Media Management',
                'content': 'Content Production',
                'ads': 'Meta Ads',
                'beratung': 'Free Consultation',
                'sonstiges': 'Other'
            };
            const labels = isEn ? labelsEn : labelsDe;
            return labels[value] || value;
        }

        function renderSummary(){
            const el = root.querySelector('#wiz-summary');
            const locale = isEn ? 'en-US' : 'de-DE';
            const budgetTxt = (state.budgetValue>=2500) ? '> 2,500 €' : (new Intl.NumberFormat(locale).format(state.budgetValue||0)+' €');
            const budgetDisplay = state.skipBudget ? (isEn ? 'free' : 'kostenlos') : budgetTxt;
            const intentLabel = getIntentLabel(state.intent);
            
            if (isEn) {
                el.innerHTML = `Selection: ${intentLabel||'-'} • Budget: ${budgetDisplay}`;
            } else {
                el.innerHTML = `Auswahl: ${intentLabel||'-'} • Budget: ${budgetDisplay}`;
            }
        }

        function updateNextDisabled(){
            nextBtn.disabled = (idx===0 && !state.intent);
        }

        function onNext(){
            // --- Cookie Requirement Check: Before proceeding ---
            if(typeof klaro !== 'undefined') {
                const manager = klaro.getManager();
                manager.loadConsents();
                const confirmed = manager.confirmed;
                const facebookConsent = manager.consents ? manager.consents.facebook : false;

                if (!confirmed || facebookConsent !== true) {
                    console.log('[Wizard Check] ACCESS DENIED on Next. Showing Banner.');
                    const banner = document.getElementById('variad-cookie-banner');
                    if(banner) {
                        const p = banner.querySelector('.text-side p');
                        const originalText = "Wir nutzen Cookies für Performance";
                        p.textContent = "Akzeptiere erst die Cookies.";
                        banner.classList.add('is-visible');
                        const resetText = () => { p.textContent = originalText; };
                        document.getElementById('v-accept-btn').addEventListener('click', resetText, {once:true});
                        document.getElementById('v-decline-btn').addEventListener('click', resetText, {once:true});
                    }
                    return; 
                }
            }
            // ----------------------------------------------

            if(idx < steps.length-1){
                // Capture note from Step 1
                if(idx===1){
                    state.note = root.querySelector('#wiz-note').value.trim();
                }

                if(idx===3){ return submit(); }

                // Bei Beratung: Step 2 (Budget) überspringen
                if(idx===1 && state.skipBudget){
                    setActive(3); // Direkt zu Kontakt
                } else {
                    setActive(idx+1);
                }
            } else {
                submit();
            }
        }

        function submit(){
            const errorEl = root.querySelector('#wiz-error');
            const nameEl = root.querySelector('#wiz-name');
            const emailEl = root.querySelector('#wiz-email');
            const phoneEl = root.querySelector('#wiz-phone');
            state.name = (nameEl?.value || '').trim();
            state.company = (root.querySelector('#wiz-company')?.value || '').trim();
            state.email = (emailEl?.value || '').trim();
            state.phone = (phoneEl?.value || '').trim();

            // Validation: Name required AND (Email OR Phone)
            function isEmail(v){ return /.+@.+\..+/.test(v); }
            function isPhone(v){ return v.replace(/\D/g,'').length >= 7; }
            let err = '';
            // reset invalid styles
            [nameEl,emailEl,phoneEl].forEach(el=> el && el.classList.remove('invalid'));
            if(!state.name){
                err = isEn ? 'Please provide your name.' : 'Bitte gib deinen Namen an.';
                if(nameEl) nameEl.classList.add('invalid');
            } else if(!(isEmail(state.email) || isPhone(state.phone))){
                err = isEn ? 'Please provide an email or phone number.' : 'Bitte gib E‑Mail oder Telefon an (eins davon reicht).';
                if(emailEl) emailEl.classList.add('invalid');
                if(phoneEl) phoneEl.classList.add('invalid');
            }
            if(err){
                if(errorEl){ errorEl.textContent = err; errorEl.scrollIntoView({behavior:'smooth', block:'nearest'}); }
                return;
            } else { if(errorEl) errorEl.textContent=''; }

            // Loading State
            nextBtn.disabled = true;
            nextBtn.textContent = isEn ? 'Sending...' : 'Wird gesendet...';

            // Data Preparation
            const intentLabel = getIntentLabel(state.intent);
            const locale = isEn ? 'en-US' : 'de-DE';
            const budgetTxt = state.skipBudget ? (isEn ? 'free' : 'kostenlos') : ((state.budgetValue>=2500) ? (isEn ? '> 2,500 €' : '> 2 500 €') : (new Intl.NumberFormat(locale).format(state.budgetValue||0)+' €'));

            // Netlify Form Submission
            const formData = new FormData();
            formData.append('form-name', 'contact-wizard');
            formData.append('bot-field', '');
            formData.append('recipient', 'projekte@variad.de');
            formData.append('intent', intentLabel);
            formData.append('note', state.note || '');
            formData.append('budget', budgetTxt);
            formData.append('name', state.name);
            formData.append('company', state.company || '');
            formData.append('email', state.email);
            formData.append('phone', state.phone);

            fetch(window.location.pathname, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                console.log('[Wizard] Success: Data sent to Netlify');
                // Success View (MASSIVE TEXT LEFT)
                root.querySelector('.wiz-viewport').innerHTML = `
                    <div class="wiz-success-card">
                        <div class="success-content">
                            <h3>${isEn ? 'Inquiry Sent.<br>Thank you.' : 'Anfrage gesendet<br>Danke.'}</h3>
                            <p>${isEn ? 'We will get back to you shortly.' : 'Wir melden uns in Kürze.'}</p>
                        </div>
                        <div class="success-actions">
                            <a href="/" class="btn-action-link">Startseite</a>
                            <button type="button" class="btn-action-link" onclick="window.location.reload()">neue anfrage</button>
                        </div>
                    </div>
                `;
                // Hide navigation and progress
                const nav = root.querySelector('.wiz-nav');
                const prog = root.querySelector('.wiz-progress');
                if(nav) nav.style.display = 'none';
                if(prog) prog.style.opacity = '0';
                
                // Scroll success card into view if needed
                root.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Clean local draft
                localStorage.removeItem('variad_contact_draft');
            })
            .catch((error) => {
                console.error('[Wizard] Submission error:', error);
                nextBtn.disabled = false;
                nextBtn.textContent = 'Erneut versuchen';
                if(errorEl) errorEl.textContent = 'Fehler beim Senden. Bitte versuche es erneut.';
            });
        }

        // Attach direct listeners as fallback (REMOVED - Delegation is enough)
        // Array.from(root.querySelectorAll('.chip')).forEach(b=> b.addEventListener('click', ()=> toggleChip(b)));

        setActive(0);
        updateNextDisabled();

        // Ensure upper sticky sections never block the wizard when in view
        try{
            const contactSection = document.getElementById('contact');
            const smm = document.getElementById('smm');
            if(contactSection && smm && 'IntersectionObserver' in window){
                const io = new IntersectionObserver((entries)=>{
                    entries.forEach(e=>{
                        if(e.isIntersecting){ smm.style.pointerEvents = 'none'; }
                        else { smm.style.pointerEvents = ''; }
                    });
                }, { threshold: 0.05 });
                io.observe(contactSection);
            }
        }catch(err){ console.warn('[Wizard] overlay guard failed', err); }
        }
        if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', setup, { once: true });
        } else {
            // try immediate; if not present, try again on next frame
            if(!document.getElementById('contact-wizard')){
                requestAnimationFrame(()=> document.addEventListener('DOMContentLoaded', setup, { once: true }));
            } else {
                setup();
            }
        }
    })();


/* --- Block 4 --- */
// Shared state
    (function(){ window.WHY = window.WHY || { dotsDone:false, pmStarted:false, startPm:null }; })();

    // Dots-Karte animieren: beim Eintritt nacheinander aufploppen
    (function(){
      const why = document.querySelector('#why-variad');
      if(!why) return;
      const card = why.querySelector('.card.dots');
      if(!card) return;
      const dots = card.querySelectorAll('.dot-grid .dot');
      if(!dots.length) return;
      let started = false;
      const io = new IntersectionObserver((entries)=>{
        const e = entries[0];
        if(!e || !e.isIntersecting || started) return;
        started = true;
        const per = 55;
        dots.forEach((el, i)=> setTimeout(()=> el.classList.add('show'), i*per));
        const total = (dots.length-1)*per + 400; // Ende + Puffer
        setTimeout(()=>{
          window.WHY.dotsDone = true;
          if (typeof window.WHY.startPm === 'function' && !window.WHY.pmStarted) {
            window.WHY.startPm(0);
          }
        }, total);
        io.disconnect();
      }, { threshold: 0.3 });
      io.observe(card);
    })();
    (function(){
      const root = document.querySelector('#why-variad');
      if(!root) return;
      const pm = root.querySelector('.card.pm');
      if(!pm) return;
      const steps = pm.querySelectorAll('.steps .step');
      if(!steps.length) return;
      function runSequence(delay){
        if (window.WHY.pmStarted) return;
        window.WHY.pmStarted = true;
        setTimeout(()=>{
          steps.forEach((el, i)=>{
            const t = i*1100;
            setTimeout(()=>{
              // Subtiler Burst jeder Zeile + Haken danach
              el.classList.add('burst');
              setTimeout(()=> el.classList.remove('burst'), 600);
              setTimeout(()=> el.classList.add('done'), 620);
            }, t);
          });
        }, delay||0);
      }
      window.WHY.startPm = runSequence;

      const io = new IntersectionObserver((entries)=>{
        const e = entries[0];
        if(!e || !e.isIntersecting) return;
        // Start erst nach den Dots
        if (window.WHY.dotsDone) runSequence(0);
        // sonst wartet Dots-Callback und ruft startPm auf
        io.disconnect();
      }, { threshold: 0.25 });
      io.observe(pm);
    })();


/* --- Block 5 --- */
// Fix: nahtloser Loop ohne Überlappung + dynamische Tile-Reihenfolge
            (function(){
              const root = document.querySelector('#smm');
              if(!root) return;
              const t1 = root.querySelector('.tape.t1');
              const t2 = root.querySelector('.tape.t2');
              
              // Sprache erkennen
              const lang = document.documentElement.lang || 'de';
              const isEn = lang.startsWith('en');

              // Kacheldaten DE
              const itemsDe = [
                { label: 'REGELMÄSSIGES\nPOSTEN', big: true },
                { label: 'INTERAKTION', big: false },
                { label: 'STORYTELLING', big: false },
                { label: 'REICHWEITE', big: false },
                { label: 'COMMUNITY\nMANAGEMENT', big: true },
                { label: 'ENGAGEMENT', big: false },
                { label: 'WACHSTUM', big: false },
                { label: 'RELEVANZ', big: false },
                { label: 'AUTHENTIZITÄT', big: false },
                { label: 'MEHRWERT', big: false },
                { label: 'CONVERSION', big: false },
                { label: 'ZIELGRUPPE', big: false },
                { label: 'BEHIND THE\nSCENES', big: true },
                { label: 'INTERAKTIVE\nCOMMUNITY', big: true },
                { label: 'CONTENT\nSTRATEGIE', big: true },
              ];

              // Kacheldaten EN
              const itemsEn = [
                { label: 'REGULAR\nPOSTING', big: true },
                { label: 'INTERACTION', big: false },
                { label: 'STORYTELLING', big: false },
                { label: 'REACH', big: false },
                { label: 'COMMUNITY\nMANAGEMENT', big: true },
                { label: 'ENGAGEMENT', big: false },
                { label: 'GROWTH', big: false },
                { label: 'RELEVANCE', big: false },
                { label: 'AUTHENTICITY', big: false },
                { label: 'VALUE', big: false },
                { label: 'CONVERSION', big: false },
                { label: 'TARGET GROUP', big: false },
                { label: 'BEHIND THE\nSCENES', big: true },
                { label: 'INTERACTIVE\nCOMMUNITY', big: true },
                { label: 'CONTENT\nSTRATEGY', big: true },
              ];

              const items = isEn ? itemsEn : itemsDe;

              function pick(arr){ return arr.splice(Math.floor(Math.random()*arr.length),1)[0]; }

              function distribute(list){
                const big = list.filter(i=>i.big);
                const small = list.filter(i=>!i.big);
                const res = [];
                let lastType = null; let run = 0; // run for lastType
                while (big.length || small.length) {
                  let type;
                  if (lastType==='big') {
                    // Direkt nach einer großen MUSS eine kleine kommen
                    if (!small.length) { // Fallback: wenn keine kleinen mehr, breche ab
                      while (big.length) res.push(pick(big));
                      break;
                    }
                    type = 'small';
                  } else {
                    // Sonst mischen, aber lange Small-Runs vermeiden
                    const forceBig = (lastType==='small' && run>=4 && big.length>0);
                    if (forceBig) type = 'big';
                    else if (!big.length) type = 'small';
                    else if (!small.length) type = 'big';
                    else type = Math.random()<0.5 ? 'big' : 'small';
                  }

                  const item = type==='big' ? pick(big) : pick(small);
                  res.push(item);
                  if (lastType===type) run++; else { lastType=type; run=1; }
                }

                // Nahtstelle der Schleife: vermeide big am Anfang UND Ende
                if (res.length>1 && res[0].big && res[res.length-1].big) {
                  const idx = [...res.keys()].reverse().find(k=>!res[k].big);
                  if (idx!==undefined) {
                    const tmp = res[res.length-1];
                    res[res.length-1] = res[idx];
                    res[idx] = tmp;
                  }
                }
                return res;
              }

              function render(){
                const seq = distribute(items.slice());
                t1.innerHTML = seq.map(it=>{
                  const cls = it.big ? 'card big' : 'card';
                  const html = it.label.replace(/\n/g,'<br/>');
                  return `<div class="${cls}"><span class="label">${html}</span></div>`;
                }).join('');
                t2.innerHTML = t1.innerHTML;
              }

              render();
              function layout(){
                const h = t1.getBoundingClientRect().height;
                const gap = parseFloat(getComputedStyle(t1).gap)||0;

                // KRITISCH: Nur setzen wenn h > 0 (Layout ist berechnet)
                if (h <= 0) {
                  // Layout noch nicht fertig - nochmal versuchen
                  requestAnimationFrame(layout);
                  return;
                }

                // Setze die zweite Bahn exakt hinter die erste (+Gap)
                t2.style.top = (h + gap) + 'px';
                // Einheitliche Geschwindigkeit (px/s)
                const speed = 44; // anpassbar
                const dur = Math.max(16, (h + gap) / speed);
                t1.style.animationDuration = dur + 's';
                t2.style.animationDuration = dur + 's';
              }

              // Layout nach render() mit Verzögerung starten
              requestAnimationFrame(() => {
                requestAnimationFrame(layout);
              });

              window.addEventListener('load', layout);
              window.addEventListener('resize', ()=>{ clearTimeout(layout._t); layout._t = setTimeout(layout,120);});
            })();

            // Emoji-Pop rund ums Handy – global im Abschnitt, weit außen, ohne Überdeckungen
            (function(){
              window.SMM = window.SMM || { emojis: [], msgs: [] };
              const section = document.querySelector('#smm');
              if(!section) return;
              const phone = section.querySelector('.phone');
              const layer = section.querySelector('.emoji-layer');
              const EMOJIS = ['🔥','😍','🥳','🤝','👍','🙌','👏','✨','💡','💬','🎯','📣','🧠','❤️','💪','😊','😎','🤩','🎉','👀','🚀','💯','⚡️','👌'];
              const MAX = 21; // 30% weniger gleichzeitig (von 30 auf 21)
              const lastPoints = [];
              let lastEmoji = '';

              function randomSize(){
                const isMobile = window.innerWidth <= 768;
                // Grundverteilung: große Emojis um ~30% seltener
                let size = (Math.random() < 0.21)
                  ? 84 + Math.random()*84   // 84–168px (groß - 30% reduziert)
                  : 48  + Math.random()*64;   // 48–112px (mittel)
                // Größte ca. 25% kleiner
                if(size > 140) size *= 0.75; // Schwellwert angepasst (vorher 200)
                // Kleinste ca. 15% größer
                if(size < 60)  size *= 1.15;
                
                // Mobile: Mindestens ein Drittel kleiner
                if(isMobile) size *= 0.6;
                
                return size;
              }

              function tooCloseToRecent(x,y){
                for(const p of lastPoints){
                  const dx = x-p.x, dy=y-p.y; if(Math.hypot(dx,dy) < 70) return true;
                }
                return false;
              }

              function spawnOne(){
                if(layer.children.length > MAX) layer.firstChild?.remove();
                const L = layer.getBoundingClientRect();
                const P = phone.getBoundingClientRect();

                // KRITISCH: Obere Grenze bestimmen (Header-Position)
                const header = section.querySelector('.section-header');
                const headerRect = header ? header.getBoundingClientRect() : null;
                const absoluteTopLimit = headerRect ? (headerRect.bottom + 120) : (L.top + 250);

                // Vorab Bewegung/Größe bestimmen, damit der Sicherheitsrand korrekt ist
                const size = randomSize();
                // BEGRENZTE Rise - Emojis steigen auf, bleiben aber unter Header!
                const rise = 100 + Math.random()*60; // 100–160px (erhöht für schnellere Bewegung)
                let driftX = (Math.random()*70 - 35); // -35..35px horizontal
                const driftY = (Math.random()*20 - 10); // -10..10px vertikale Variation
                // Animation SCHNELLER
                const minDur = 2500;  // ~2.5s (vorher 3.5s)
                const maxDur = 4000;  // ~4s (vorher 5.5s)
                const dur = minDur + Math.random() * (maxDur - minDur);

                // Exclusion: nicht im Phone inkl. Sicherheitsrand aus Größe & Drift
                const marginBase = 24 + Math.random()*28; // 24–52
                const M = marginBase + size*0.35 + 12; // proportionaler Sicherheitsrand
                const expanded = { left:P.left-M, top:P.top-M, right:P.right+M, bottom:P.bottom+M };

                // Punkt suchen – wähle eine Seite (links/rechts) und halte Pfad dort
                let cx=0, cy=0, tries=0;
                // Kandidaten erzeugen (Blue‑Noise ähnlich): wähle den mit größtem Abstand zu letzten Punkten
                function candidate(){
                  const isMobile = window.innerWidth <= 768;
                  const scrollProgress = (window.SMM && window.SMM.scrollProgress) || 0;
                  const P = phone.getBoundingClientRect();
                  
                  let x, y;

                  if (isMobile) {
                    // Mobile: Spawne über die komplette Breite und Höhe der Sektion
                    // Aber halte etwas Abstand zu den Rändern
                    x = L.left + 40 + Math.random() * (L.width - 80);
                    y = L.top + 100 + Math.random() * (L.height - 200);
                  } else {
                    // Desktop: Bestehende Phone-zentrierte Logik
                    const centerX = P.left + P.width / 2;
                    const centerY = P.top + P.height / 2;

                    // Spawn-Area: Phone-zentriert, aber variabel je nach Scroll
                    const maxRadius = P.width * 1.3;
                    const minRadius = P.width * 0.85;
                    const currentRadius = maxRadius - (scrollProgress * (maxRadius - minRadius));

                    // Voller Kreis: 0° bis 360°
                    const angle = Math.random() * Math.PI * 2;
                    const distance = minRadius + Math.random() * (currentRadius - minRadius);

                    x = centerX + Math.cos(angle) * distance;
                    y = centerY + Math.sin(angle) * distance;
                  }

                  // WICHTIG: Y-Position muss MINDESTENS unter Header + rise sein!
                  // Damit End-Position (y - rise) immer noch unter Header bleibt
                  const minY = absoluteTopLimit + rise + 100;
                  if (y < minY) {
                    y = minY + Math.random() * 80;
                  }

                  return {x, y};
                }
                function dist2(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return dx*dx+dy*dy; }
                let best=null, bestScore=-1;
                for(let i=0;i<10;i++){
                  const c = candidate();

                  // End-Position berechnen (mit Rise!)
                  const endCx = c.x + driftX;
                  const endCy = c.y + driftY - rise;

                  // KRITISCH: End-Position darf NICHT über Header gehen!
                  if (endCy < absoluteTopLimit + 60) continue;

                  // Start-Position auch checken
                  if (c.y < absoluteTopLimit + rise + 80) continue;

                  // Überschneidung mit Phone prüfen (Start & End)
                  const startIntersects = (c.x > expanded.left - size/2 && c.x < expanded.right + size/2 && c.y > expanded.top - size/2 && c.y < expanded.bottom + size/2);
                  const endIntersects   = (endCx > expanded.left - size/2 && endCx < expanded.right + size/2 && endCy > expanded.top - size/2 && endCy < expanded.bottom + size/2);
                  if(startIntersects || endIntersects) continue;

                  // Score = Abstand zum nächsten zuletzt gesetzten Punkt
                  let minD = Infinity; for(const p of lastPoints){ const d = dist2(c,p); if(d<minD) minD=d; }
                  if(minD>bestScore){ bestScore=minD; best=c; }
                }
                if(!best) return false;
                cx=best.x; cy=best.y;

                // Emoji wählen, nicht direkt doppeln
                let sym = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
                if(sym === lastEmoji) sym = EMOJIS[(EMOJIS.indexOf(sym)+Math.floor(1+Math.random()*5)) % EMOJIS.length];
                lastEmoji = sym;

                const el = document.createElement('div');
                el.className = 'emoji';
                el.textContent = sym;
                // Position als linkes/oberes Eck aus Center ableiten
                el.style.left = (((cx - size/2) - L.left)/L.width*100) + '%';
                el.style.top  = (((cy - size/2) - L.top)/L.height*100) + '%';

                // Bewegung/Optik übertragen
                el.style.fontSize = size + 'px';
                el.style.setProperty('--dx', driftX+'px');
                el.style.setProperty('--dy', driftY+'px');
                el.style.setProperty('--rise', rise+'px');
                el.style.animation = `popFloat ${dur}ms linear forwards`;

                el.style.setProperty('--sx', '0px');
                el.style.setProperty('--sy', '0px');
                layer.appendChild(el);
                el.addEventListener('animationend', ()=> el.remove());
                // Actor registrieren (für Collision‑Avoidance)
                const rb = el.getBoundingClientRect();
                const actor = { el, born: performance.now(), r: Math.max(rb.width, rb.height)*0.5 };
                window.SMM.emojis.push(actor);

                // Track Positionen (letzte 8)
                lastPoints.push({x:cx, y:cy});
                if(lastPoints.length>8) lastPoints.shift();

                return true;
              }

              function scheduleNext(){
                const t = 750 + Math.random()*1400; // 30% weniger Emojis (erhöht von 576+1080)
                setTimeout(()=>{
                  let ok = spawnOne();
                  let retries = 0;
                  // Sofortige kurze Retries, damit es nicht „pausiert", falls Punkte verworfen werden
                  function quickTry(){
                    if(ok || retries>4) return scheduleNext();
                    setTimeout(()=>{ ok = spawnOne() || ok; retries++; quickTry(); }, 110 + Math.random()*110);
                  }
                  quickTry();
                }, t);
              }

              if(document.readyState !== 'loading') { spawnOne(); scheduleNext(); }
              else window.addEventListener('DOMContentLoaded', ()=>{ spawnOne(); scheduleNext(); });
            })();

            // Message-Bubbles (Apple-like) – niemals Emojis berühren, kleine/mittlere Größe
            (function(){
              window.SMM = window.SMM || { emojis: [], msgs: [] };
              const section = document.querySelector('#smm');
              if(!section) return;
              const phone = section.querySelector('.phone');
              const layer = section.querySelector('.msg-layer');
              const MSGS = ['cool','stark','mega','geil','sauber','weiter so','top','hammer','nice','beste','tolles video','super','liebe es','grandios','gutes ding','saugeil','stabil','wow','echt stark','bitte mehr'];
              const lastPts = [];

              function emojiCenters(){
                return Array.from(section.querySelectorAll('.emoji')).map(e=>{ const r=e.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2, r: Math.max(r.width,r.height)/2}; });
              }

              function spawn(){
                const L = layer.getBoundingClientRect();
                const P = phone.getBoundingClientRect();

                // KRITISCH: Header-Grenze auch für Messages!
                const header = section.querySelector('.section-header');
                const headerRect = header ? header.getBoundingClientRect() : null;
                const absoluteTopLimit = headerRect ? (headerRect.bottom + 120) : (L.top + 250);

                const isMobile = window.innerWidth <= 768;
                let fs = 16 + Math.random()*6; // 16–22px
                if (isMobile) fs *= 0.8; // Auf Mobile etwas kleiner
                
                const rise = 120 + Math.random()*100; // 120–220px (erhöht für schnellere Bewegung)
                let dx = (Math.random()*40 - 20);   // -20..20px Seitwärtsbewegung
                const dy = (Math.random()*20 - 10);  // -10..10px vertikale Variation
                const minDur = 3500, maxDur = 6000; // SCHNELLER (vorher 4500-8000)
                const dur = minDur + Math.random()*(maxDur-minDur);

                // VIEL GRÖSSERER Sicherheitsrand - Messages WEIT WEG vom Phone!
                const M = 120 + fs*1.5; // Stark erhöht! (vorher 32 + fs*0.6)
                const expanded = { left:P.left-M, top:P.top-M, right:P.right+M, bottom:P.bottom+M };
                const eCenters = emojiCenters();

                function farFromEmojis(x,y){
                  for(const c of eCenters){ if(Math.hypot(x-c.x,y-c.y) < c.r + 90) return false; }
                  return true;
                }

                // Kandidaten und bestes mit größtem Abstand wählen
                function candidate(){
                  const isMobile = window.innerWidth <= 768;
                  // Scroll-basierte spawn area wie bei Emojis
                  const scrollProgress = (window.SMM && window.SMM.scrollProgress) || 0;
                  const centerX = P.left + P.width / 2;
                  const centerY = P.top + P.height / 2;
                  
                  let x, y;

                  if (isMobile) {
                    // Mobile: Über die komplette Sektion verteilen
                    x = L.left + 30 + Math.random() * (L.width - 60);
                    y = L.top + 100 + Math.random() * (L.height - 200);
                  } else {
                    // Desktop: Messages spawnen WEITER WEG vom Phone als Emojis!
                    const maxRadius = P.width * 1.6; // Erhöht von 1.3
                    const minRadius = P.width * 1.2; // Erhöht von 0.9 - MINDESTENS 1.2x Phone-Breite weg!
                    const currentRadius = maxRadius - (scrollProgress * (maxRadius - minRadius));

                    // Spawn in kreisförmiger Area um das Phone
                    const angle = Math.random() * Math.PI * 2;
                    const distance = minRadius + Math.random() * (currentRadius - minRadius);
                    x = centerX + Math.cos(angle) * distance;
                    y = centerY + Math.sin(angle) * distance;
                  }

                  // WICHTIG: Y muss unter Header + rise sein!
                  const minY = absoluteTopLimit + rise + 100;
                  if (y < minY) {
                    y = minY + Math.random() * 80;
                  }

                  return {x, y};
                }
                function d2(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return dx*dx+dy*dy; }
                let best=null, bestScore=-1;
                for(let i=0;i<12;i++){
                  const c=candidate();
                  const endX=c.x+dx, endY=c.y+dy-rise;

                  // KRITISCH: End-Position darf NICHT über Header gehen!
                  if (endY < absoluteTopLimit + 60) continue;

                  // Start-Position auch checken
                  if (c.y < absoluteTopLimit + rise + 80) continue;

                  const startHit=(c.x>expanded.left && c.x<expanded.right && c.y>expanded.top && c.y<expanded.bottom);
                  const endHit=(endX>expanded.left && endX<expanded.right && endY>expanded.top && endY<expanded.bottom);
                  if(startHit||endHit) continue; if(!farFromEmojis(c.x,c.y)) continue;
                  let minD=Infinity; for(const p of lastPts){ const dd=d2(c,p); if(dd<minD) minD=dd; }
                  if(minD>bestScore){ bestScore=minD; best=c; }
                }
                if(!best) return false;

                const el=document.createElement('div');
                el.className='msg v'+(1+Math.floor(Math.random()*5));
                el.textContent=MSGS[Math.floor(Math.random()*MSGS.length)];
                el.style.left=(((best.x) - L.left)/L.width*100)+'%';
                el.style.top=(((best.y) - L.top)/L.height*100)+'%';
                el.style.fontSize=fs+'px';
                el.style.setProperty('--dx', dx+'px');
                el.style.setProperty('--dy', dy+'px');
                el.style.setProperty('--rise', rise+'px');
                el.style.animation=`msgPopFloat ${dur}ms linear forwards`;
                el.style.setProperty('--sx','0px');
                el.style.setProperty('--sy','0px');
                layer.appendChild(el);
                el.addEventListener('animationend', ()=> el.remove());
                const rb = el.getBoundingClientRect();
                const actor = { el, born: performance.now(), r: Math.max(rb.width, rb.height)*0.55 };
                window.SMM.msgs.push(actor);
                lastPts.push(best); if(lastPts.length>10) lastPts.shift();
                return true;
              }

              function loop(){
                const t=940+Math.random()*1560; // 30% weniger Messages (erhöht von 720+1200)
                setTimeout(()=>{ let ok=spawn(); let r=0; (function retry(){ if(ok||r>3) return loop(); setTimeout(()=>{ ok=spawn()||ok; r++; retry(); }, 140+Math.random()*120); })(); }, t);
              }

              if(document.readyState!=='loading'){ spawn(); loop(); }
              else window.addEventListener('DOMContentLoaded', ()=>{ spawn(); loop(); });
            })();

            // Kollisionsvermeidung zwischen Emojis und Nachrichtenblasen
            // Smooth steering: vorausschauendes, weiches Ausweichen ohne Ruckler/Bounces
            (function(){
              const section = document.querySelector('#smm');
              if(!section) return;
              const phone = section.querySelector('.phone');

              function cleanup(list){
                return (list||[]).filter(a=>a && a.el && a.el.isConnected);
              }

              function nudge(el, sign, amount){
                const cur = parseFloat(getComputedStyle(el).getPropertyValue('--dx'))||0;
                const next = cur + sign*amount;
                el.style.setProperty('--dx', next + 'px');
                el.dataset.nudges = String((parseInt(el.dataset.nudges||'0',10))+1);
              }

              function addRise(el, inc){
                const cur = parseFloat(getComputedStyle(el).getPropertyValue('--rise'))||0;
                el.style.setProperty('--rise', (cur + inc) + 'px');
              }

              function soften(el, to=0.9, ms=240){
                if(!el) return;
                const prev = el.style.opacity || '';
                el.style.transition = `opacity ${ms}ms linear`;
                el.style.opacity = String(to);
                clearTimeout(el.__softenT);
                el.__softenT = setTimeout(()=>{ el.style.opacity = prev || '1'; }, ms+60);
              }

              function center(a){ const r=a.el.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2}; }

              function steer(actor, vx, vy){
                const type = actor.type || (actor.el.classList.contains('msg')?'m':'e');
                const clamp = (type==='m') ? 34 : 42; // max Lenkversatz
                // kleine, geglättete Inkremente gegen Ruckeln
                const alpha = 0.28; // smoothing
                actor.sx = (actor.sx||0) + vx*alpha;
                actor.sy = (actor.sy||0) + vy*alpha;
                const mag = Math.hypot(actor.sx, actor.sy);
                if(mag > clamp){ const k = clamp / mag; actor.sx *= k; actor.sy *= k; }
                actor.el.style.setProperty('--sx', actor.sx.toFixed(2)+'px');
                actor.el.style.setProperty('--sy', actor.sy.toFixed(2)+'px');
              }

              function avoidRect(actor, rect, start=160, gain=16){
                const c = center(actor);
                const zone = { left:rect.left-start, right:rect.right+start, top:rect.top-start, bottom:rect.bottom+start };
                if(c.x>zone.left && c.x<zone.right && c.y>zone.top && c.y<zone.bottom){
                  const cx = (rect.left+rect.right)/2;
                  const dir = Math.sign(c.x - cx) || 1;
                  steer(actor, dir*gain, 0);
                  // Mindest‑Seitenversatz sicherstellen, um nicht hineinzudriften
                  const minSide = 18;
                  const cur = parseFloat(getComputedStyle(actor.el).getPropertyValue('--sx'))||0;
                  if(Math.abs(cur) < minSide) actor.el.style.setProperty('--sx', (dir*minSide).toString()+'px');
                }
              }

              function avoidBounds(actor, bounds, pad=64, gain=10){
                const c = center(actor);
                if(c.x < bounds.left + pad)  steer(actor,  gain, 0);
                if(c.x > bounds.right - pad) steer(actor, -gain, 0);
                if(c.y < bounds.top + pad)   steer(actor,  0,  4);
              }

              setInterval(()=>{
                const SMM = window.SMM || {};
                SMM.emojis = cleanup(SMM.emojis);
                SMM.msgs   = cleanup(SMM.msgs);
                const all = [...SMM.emojis.map(x=>({type:'e',...x})), ...SMM.msgs.map(x=>({type:'m',...x}))];
                const phoneRect = phone.getBoundingClientRect();
                const bounds = section.getBoundingClientRect();

                // Vorausschauende Ausweichlogik
                for(let i=0;i<all.length;i++){
                  const a = all[i]; const ca = center(a);
                  avoidRect(a, phoneRect, 100, 10);
                  avoidBounds(a, bounds, 64, 8);
                  for(let j=i+1;j<all.length;j++){
                    const b = all[j]; const cb = center(b);
                    const sumR = a.r + b.r;
                    const anticipate = sumR + 90; // noch früher ausweichen
                    const d = Math.hypot(ca.x-cb.x, ca.y-cb.y);
                    if(d < anticipate){
                      const ux = (ca.x - cb.x) / (d||1);
                      const steerBase = (1 - d/anticipate); // 0..1
                      const k = 12 * steerBase; // sanftere Stärke
                      // Bubbles priorisiert minimal
                      const ka = (a.type==='m') ? k*0.8 : k;
                      const kb = (b.type==='m') ? k*0.8 : k;
                      steer(a,  ux*ka, 0);
                      steer(b, -ux*kb, 0);
                    }
                  }
                }
                // globale Dämpfung, um Schwingen zu vermeiden
                for(const a of all){
                  a.sx = (a.sx||0) * 0.96;
                  a.sy = (a.sy||0) * 0.96;
                  a.el.style.setProperty('--sx', (a.sx||0).toFixed(2)+'px');
                  a.el.style.setProperty('--sy', (a.sy||0).toFixed(2)+'px');
                }
              }, 100);
            })();

            // SMM Emoji Area Control
            (function(){
              const section = document.querySelector('#smm');
              if(!section) return;

              // Globale Variable für Emoji spawn area control
              window.SMM = window.SMM || {};
              window.SMM.scrollProgress = 0;

              function updateScrollProgress(){
                // Lineare, stabile Progress-Berechnung: 0 am Section-Start, 1 am Section-Ende
                const r = section.getBoundingClientRect();
                const total = Math.max(1, r.height - window.innerHeight);
                const progress = Math.max(0, Math.min(1, (-r.top) / total));
                window.SMM.scrollProgress = progress;
              }

              // Update on scroll
              let ticking = false;
              window.addEventListener('scroll', () => {
                if(!ticking) {
                  requestAnimationFrame(() => {
                    updateScrollProgress();
                    ticking = false;
                  });
                  ticking = true;
                }
              }, { passive: true });

              // Initial update
              updateScrollProgress();
            })();


/* --- Block 6 --- */
// SMM Slides: nur Richtungs-Setup; Sichtbarkeit steuert Sticky-Controller unten
            (function(){
              const section = document.querySelector('#smm');
              if(!section) return;
              const slides = Array.from(section.querySelectorAll('.content-slide'));
              if(!slides.length) return;
              // Richtung festlegen: 0,2,... von rechts; 1,3,... von links
              slides.forEach((s,i)=> s.classList.add(i%2===0 ? 'dir-right' : 'dir-left'));
              // WICHTIG: Keine Aktivierung hier – verhindert frühes Einblenden vor Sticky
            })();

            // SMM Content Slides - Text Rotation
            (function(){
              const section = document.querySelector('#smm');
              if(!section) return;

              const showcase = section.querySelector('.showcase');
              if(!showcase) return;

              const slides = Array.from(section.querySelectorAll('.content-slide'));
              if(slides.length === 0) return;

              // Globale Variable für Emoji spawn area control
              window.SMM = window.SMM || {};
              window.SMM.scrollProgress = 0;

              let currentSlideIndex = -1;

              function updateSlides(){
                // Lineare, stabile Progress-Berechnung 0..1
                const r = section.getBoundingClientRect();
                const total = Math.max(1, r.height - window.innerHeight);

                // Prüfe, ob .showcase wirklich sticky ist
                const showcaseRect = showcase.getBoundingClientRect();
                // Sticky ist aktiv wenn:
                // 1. Section top ist negativ (Sektion wird gescrollt)
                // 2. Showcase top ist bei 6vh (sticky position)
                const isSticky = r.top < -50 && showcaseRect.top <= window.innerHeight * 0.06 + 10;

                // Text erscheint erst, wenn .showcase sticky wird
                if (!isSticky) {
                  // Showcase ist noch nicht sticky - kein Text aktiv
                  window.SMM.scrollProgress = 0;
                  if (currentSlideIndex !== -1) {
                    slides.forEach(slide => slide.classList.remove('active', 'exiting'));
                    currentSlideIndex = -1;
                  }
                  return;
                }

                const progress = Math.max(0, Math.min(1, (-r.top) / total));

                // Update globale scroll progress (wird auch von apply() genutzt)
                window.SMM.scrollProgress = progress;

                // Gleichmäßige Aufteilung: 5 Slides → 0.2 pro Slide
                const activeIndex = Math.min(4, Math.max(0, Math.floor(progress * 5 + 1e-6)));

                if(activeIndex !== currentSlideIndex) {
                  const previousIndex = currentSlideIndex;
                  currentSlideIndex = activeIndex;

                  slides.forEach((slide, idx) => {
                    slide.classList.remove('active', 'exiting');
                    if(idx === activeIndex) {
                      slide.classList.add('active');
                    } else if(idx === previousIndex && previousIndex >= 0) {
                      slide.classList.add('exiting');
                    }
                  });
                }
              }

              // Update on scroll
              let ticking = false;
              window.addEventListener('scroll', () => {
                if(!ticking) {
                  requestAnimationFrame(() => {
                    updateSlides();
                    ticking = false;
                  });
                  ticking = true;
                }
              }, { passive: true });

              // Initial update
            updateSlides();
          })();


/* --- Block 7: Robust Marquee Logic (Portfolio & Partners) --- */
    (function(){
        function initMarquee(selector, speed = 50) {
            const track = document.querySelector(selector + ' .track');
            if (!track) return;

            const run = () => {
                if (track.dataset.marqueeReady) return;
                
                // 1. Get original items
                const items = Array.from(track.children);
                if (items.length === 0) return;

                // 2. Clear track to start fresh
                track.innerHTML = '';
                items.forEach(item => track.appendChild(item.cloneNode(true)));
                
                // 3. Fill width: The base set must be wider than the screen
                // We add a buffer of 500px to be absolutely sure
                let iterations = 0;
                while (track.scrollWidth < window.innerWidth + 500 && iterations < 10) {
                    const currentItems = Array.from(track.children);
                    currentItems.forEach(item => track.appendChild(item.cloneNode(true)));
                    iterations++;
                }
                
                // 4. Double it for the seamless CSS loop (0 to -50% or -50% to 0)
                const baseContent = track.innerHTML;
                track.innerHTML = baseContent + baseContent;
                
                // 5. Calculate duration based on width for constant speed
                // speed is px per second. distance is half the track width.
                const distance = track.scrollWidth / 2;
                const duration = distance / speed;
                track.style.animationDuration = duration + 's';
                
                track.dataset.marqueeReady = "true";
                track.style.opacity = "1";
            };

            // Wait for images to have dimensions
            const imgs = track.querySelectorAll('img');
            let loaded = 0;
            if (imgs.length === 0) {
                run();
            } else {
                track.style.opacity = "0"; 
                track.style.transition = "opacity 0.5s ease";
                imgs.forEach(img => {
                    if (img.complete) {
                        loaded++;
                        if (loaded === imgs.length) run();
                    } else {
                        img.addEventListener('load', () => {
                            loaded++;
                            if (loaded === imgs.length) run();
                        });
                        img.addEventListener('error', () => {
                            loaded++; // Count errors too so we don't hang
                            if (loaded === imgs.length) run();
                        });
                    }
                });
                // Ultimate fallback
                setTimeout(run, 3000);
            }
        }

        // Portfolio Marquee
        const portfolioTrack = document.querySelector('#portfolio .marquee-top .track');
        if(portfolioTrack) {
            const files = [
                'social-media-agentur-stuttgart-quer-01.jpeg',
                'videoproduktion-heilbronn-quer-02.jpeg',
                'content-creation-ludwigsburg-quer-03.jpeg',
                'imagefilm-produktion-backnang-quer-04.jpeg',
                'eventfotografie-stuttgart-quer-05.jpeg',
                'social-media-management-heilbronn-quer-06.jpeg',
                'werbefilm-produktion-bw-quer-07.jpeg',
                'corporate-influencer-marketing-quer-08.jpeg',
                'tiktok-reels-agentur-stuttgart-quer-09.jpeg',
                'drohnenaufnahmen-heilbronn-quer-10.jpeg',
                'produktfotografie-e-commerce-quer-11.jpeg',
                'unternehmensvideo-produktion-quer-12.jpeg',
                'social-media-content-creation-quer-13.jpeg',
                'performance-marketing-visuals-quer-14.jpeg',
                'social-media-agentur-stuttgart-quer-15.jpeg'
            ];
            function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
            const base = shuffle(files.slice()).slice(0, 15);
            const url = (name) => '/images/portfolio/Quer/' + encodeURI(name);
            portfolioTrack.innerHTML = base.map(n=>`<div class="tile"><img src="${url(n)}" alt="Referenz Projekt"></div>`).join('');
            
            initMarquee('#portfolio .marquee-top', 40); // 40px/s
        }

        // Partners Marquee
        initMarquee('#partners .marquee', 60); // 60px/s
    })();


/* --- Block 8 --- */
// Reveal on scroll (Delayed & Safe Trigger)
    (function(){
        const els = document.querySelectorAll('.fade-in');
        if (!('IntersectionObserver' in window) || !els.length) { 
            els.forEach(e=>e.classList.add('visible')); return; 
        }
        
        const io = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{ 
                // ZUSATZ-CHECK: Nur animieren, wenn wir nicht ganz oben sind (verhindert Instant-Trigger beim Laden)
                if(entry.isIntersecting && window.scrollY > 50){ 
                    entry.target.classList.add('visible'); 
                    io.unobserve(entry.target); 
                } 
            });
        }, { 
            threshold: 0.3, // Muss zu 30% sichtbar sein
            rootMargin: "0px 0px -100px 0px" // Trigger weit oberhalb des Bodens
        });
        
        // Erst beobachten, wenn wir sicher sind, dass das Layout steht
        setTimeout(() => {
            els.forEach(el => io.observe(el));
        }, 500);
    })();


/* --- Block 9 --- */
// Make "Beratung buchen" CTA focus the contact form after scroll
    (function(){
        const ctas = document.querySelectorAll('a[href="#contact"]');
        
        const smoothScrollToContact = (e) => {
            e.preventDefault();
            const target = document.getElementById('contact');
            if (!target) return;
            
            // Calculate position: target top + offset (e.g. -95px)
            // A negative offset helps land higher up if the target is being overshot
            const offset = window.innerWidth <= 768 ? -95 : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Focus name field after scroll
            setTimeout(()=> document.getElementById('wiz-name')?.focus({ preventScroll:true }), 800);
        };

        ctas.forEach(a=> a.addEventListener('click', smoothScrollToContact));
    })();


/* --- Block 10 --- */
// Stats: count-up for numbers when in view
    (function(){
        const nums = Array.from(document.querySelectorAll('.stat-box .num, .bento-stat .num'));
        if(!nums.length || !('IntersectionObserver' in window)) return;

        function formatCompact(n){
            if (n >= 1_000_000) return (n/1_000_000).toFixed(1).replace('.', ',') + 'M';
            if (n >= 1_000) return (n/1_000).toFixed(0) + 'k';
            return n.toLocaleString('de-DE');
        }

        function animate(el){
            const targetAttr = el.getAttribute('data-target');
            const target = targetAttr ? parseInt(targetAttr, 10) : parseInt(el.textContent.replace(/\D/g,'') || '0', 10);
            const suffix = el.getAttribute('data-suffix')||'';
            const prefix = el.getAttribute('data-prefix')||'';
            const fmt = el.getAttribute('data-format')||'plain';
            const start = 0;
            const dur = 2000;
            const t0 = performance.now();
            function tick(t){
                const p = Math.min(1, (t - t0)/dur);
                const ease = 1 - Math.pow(1-p, 4); 
                const val = Math.floor(start + ease * (target - start));
                const out = (fmt==='compact'? formatCompact(val) : val.toLocaleString('de-DE'));
                el.textContent = prefix + out + suffix;
                if(p<1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }

        const io = new IntersectionObserver((entries)=>{
            entries.forEach(e=>{
                if(!e.isIntersecting) return;
                animate(e.target); io.unobserve(e.target);
            });
        }, { threshold: 0.2 });
        nums.forEach(n=> io.observe(n));
    })();


/* --- Block 11 --- */
// ================================================
    // CAMERA INTERFACE CONTROLLER
    // Fullscreen card transitions with camera HUD
    // ================================================
    (function(){
        'use strict';

        const sec = document.getElementById('content-production');
        if (!sec) return;

        // Elements
        const cards = Array.from(sec.querySelectorAll('.production-card'));
        const stepIndicators = Array.from(sec.querySelectorAll('.step-indicator'));
        const fstopEl = document.getElementById('fstop-value');
        const isoEl = document.getElementById('iso-value');
        const shutterEl = document.getElementById('shutter-value');
        const wbEl = document.getElementById('wb-value');

        // Camera settings per step
        const fStops = ['f/1.4', 'f/2.8', 'f/5.6', 'f/11'];
        const isoValues = ['400', '800', '1600', '3200'];
        const shutterValues = ['1/125', '1/250', '1/500', '1/1000'];
        const wbValues = ['5600K', '4500K', '6500K', '5000K'];

        // Calculate section bounds
        function computeBounds() {
            const rect = sec.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            return {
                start: scrollY + rect.top,
                height: rect.height
            };
        }

        let bounds = computeBounds();
        let rafId = null;

        // Update camera settings display
        function updateCameraSettings(stepIndex) {
            if (fstopEl) fstopEl.textContent = fStops[stepIndex] || fStops[0];
            if (isoEl) isoEl.textContent = isoValues[stepIndex] || isoValues[0];
            if (shutterEl) shutterEl.textContent = shutterValues[stepIndex] || shutterValues[0];
            if (wbEl) wbEl.textContent = wbValues[stepIndex] || wbValues[0];
        }

        // Main update function
        function updateCamera() {
            rafId = null;

            const scrollY = window.scrollY || window.pageYOffset;
            const viewportCenter = scrollY + window.innerHeight / 2;

            // Start früher, nutze mehr Raum für alle 4 Steps - Step 4 bleibt länger
            const startOffset = bounds.height * 0.05;
            const activeRange = bounds.height * 0.65;

            // Calculate progress through section (0 to 1) - mit Verzögerung
            const rawProgress = (viewportCenter - bounds.start - startOffset) / activeRange;
            const progress = Math.max(0, Math.min(1, rawProgress));

            // Determine active card (0-3) - Step 4 bekommt viel mehr Zeit (40% der Range)
            let activeIndex;
            if (progress < 0.30) activeIndex = 0;
            else if (progress < 0.60) activeIndex = 1;
            else if (progress < 0.80) activeIndex = 2;
            else activeIndex = 3;

            // Update cards (fade in/out)
            cards.forEach((card, index) => {
                const isActive = index === activeIndex;

                if (isActive && !card.classList.contains('active')) {
                    card.classList.add('active');
                    updateCameraSettings(index);
                } else if (!isActive && card.classList.contains('active')) {
                    card.classList.remove('active');
                }
            });

            // Update step indicators
            stepIndicators.forEach((indicator, index) => {
                if (index === activeIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Scroll handler with RAF throttling
        function onScroll() {
            if (rafId === null) {
                rafId = requestAnimationFrame(updateCamera);
            }
        }

        // Resize handler
        function onResize() {
            bounds = computeBounds();
            updateCamera();
        }

        // Initialize
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // Initial update
        updateCamera();

        // Cleanup
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        });

    })();


/* --- Block 12 --- */
// Camera screen placement: fit HTML overlay to SVG <g id="DISPLAY">
    (function(){
        const wrap = document.querySelector('.camera-body-wrapper');
        const svg  = wrap?.querySelector('svg.camera-wireframe');
        const disp = svg?.querySelector('#DISPLAY');
        const path = disp?.querySelector('path');
        const screen = wrap?.querySelector('.camera-screen');
        if(!wrap || !svg || !disp || !path || !screen) return;

        // helper: compute effective stroke width in CSS px (accounts for SVG scale)
        function effectiveStrokePx(el){
            let sw = 0;
            const attr = el.getAttribute('style') || '';
            const m = attr.match(/stroke-width\s*:\s*([0-9.]+)px/);
            if(m) sw = parseFloat(m[1]);
            if(!sw){
                const swAttr = el.getAttribute('stroke-width');
                if(swAttr) sw = parseFloat(swAttr);
            }
            if(!sw) return 0;
            // scale via screen CTM (a/d are scale components)
            const ctm = el.getScreenCTM?.();
            if(ctm){
                const sx = Math.hypot(ctm.a, ctm.b);
                const sy = Math.hypot(ctm.c, ctm.d);
                return sw * (sx + sy) * 0.5;
            }
            return sw; // fallback
        }

        function place(){
            const r = disp.getBoundingClientRect();
            const W = wrap.getBoundingClientRect();
            const inset = effectiveStrokePx(path) * 0.5; // inside the orange stroke
            let left   = (r.left - W.left) + inset;
            let top    = (r.top  - W.top)  + inset;
            let width  = r.width  - inset*2;
            let height = r.height - inset*2;
            // Wachse die Fläche um ~0.5% (konfigurierbar), damit kein Spalt bleibt
            const grow = parseFloat(getComputedStyle(screen).getPropertyValue('--cp-grow-percent') || '0.005');
            if (!Number.isNaN(grow) && grow !== 0){
                const dw = width  * grow;
                const dh = height * grow;
                left   -= dw/2; top -= dh/2;
                width  += dw;   height += dh;
            }
            // Corner radius: ~6% der ursprünglichen Displaygröße, mit Korrektur um den Stroke-Inset
            const styles = getComputedStyle(screen);
            const baseMin = Math.min(r.width, r.height);
            const basePct = parseFloat(styles.getPropertyValue('--cp-radius-base-pct') || '0.06');
            const insetFactor = parseFloat(styles.getPropertyValue('--cp-radius-inset-factor') || '0.6');
            const rBase = baseMin * basePct; // Basisradius (Prozent vom min)
            // Korrektur: durch das Einrücken wirkt der innere Radius kleiner – etwas aufaddieren
            const adjustVar = parseFloat(styles.getPropertyValue('--cp-corner-adjust') || '0');
            let radiusPx = Math.max(4, rBase + inset * insetFactor + adjustVar);
            // Radius proportional zum Wachstum anpassen, damit Relation erhalten bleibt
            if (!Number.isNaN(grow) && grow !== 0){
                radiusPx *= (1 + grow);
            }
            Object.assign(screen.style, {
                left:   left  + 'px',
                top:    top   + 'px',
                width:  width + 'px',
                height: height+ 'px',
                borderRadius: radiusPx + 'px'
            });
        }

        // Debounced resize
        let t; const onResize = ()=>{ clearTimeout(t); t = setTimeout(place, 50); };
        const ready = (cb)=>{ if(document.readyState!=='loading') cb(); else document.addEventListener('DOMContentLoaded', cb, {once:true}); };

        ready(place);
        window.addEventListener('load', place, {once:true});
        window.addEventListener('resize', onResize, {passive:true});
        if('ResizeObserver' in window){ new ResizeObserver(()=>place()).observe(wrap); }
    })();


/* --- Block 13 --- */
// Meta Ads Impact Simulator - SMOOTH with GROWING NUMBERS (no lag, no shrink)
    (function() {
        console.log('[Ads Simulator] 🚀 Initializing...');

        const slider = document.getElementById('ads-budget-slider');
        const budgetDisplay = document.getElementById('ads-budget-display');
        const rocketTrail = document.getElementById('rocket-trail');
        const reachEl = document.getElementById('ads-reach');
        const impressionsEl = document.getElementById('ads-impressions');
        const clicksEl = document.getElementById('ads-clicks');
        const conversionsEl = document.getElementById('ads-conversions');
        

        if (!slider) {
            console.error('[Ads Simulator] ❌ Slider not found!');
            return;
        }

        
        let targetBudget = 300;
        let currentBudget = 300;
        let isAnimating = false;
        let isDragging = false;

        // Smooth interpolation to target budget
        function smoothUpdate() {
            const diff = targetBudget - currentBudget;
            if (Math.abs(diff) < 0.5) {
                currentBudget = targetBudget;
                isAnimating = false;
                return;
            }

            currentBudget += diff * 0.15; // Smooth easing
            updateMetrics(Math.round(currentBudget / 25) * 25); // Snap to 25€ for display/metrics
            requestAnimationFrame(smoothUpdate);
        }

        // Update rocket trail position - EXACT position
        function updateRocketTrail(value) {
            const min = parseFloat(slider.min), max = parseFloat(slider.max);
            const percent = (value - min) / (max - min);
            rocketTrail.style.transform = `translateY(-50%) scaleX(${Math.max(0, Math.min(1, percent))})`;
        }

        // Realistic calculation formulas
        function calculateMetrics(budget) {
            const impressions = Math.floor((budget / 8) * 1000);
            const reach = Math.floor(impressions * 0.85);
            const clicks = Math.floor(impressions * 0.012);
            const conversions = Math.floor(clicks * 0.025);
            const revenue = conversions * 75;
            const roas = budget > 0 ? revenue / budget : 0;
            return { reach, impressions, clicks, conversions, roas };
        }

        // Format numbers
        function formatNumber(num) {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
            return Math.floor(num).toLocaleString('de-DE');
        }

        // Calculate scale based on a value (fallback)
        function calculateScale(value, maxValue) {
            const minScale = 1;
            const maxScale = 2.5;
            const ratio = Math.min(value / maxValue, 1);
            return minScale + (maxScale - minScale) * ratio;
        }

        // Scale driven by budget position (for consistent grow/shrink)
        function budgetScale(rawBudget){
            const min = parseFloat(slider.min), max = parseFloat(slider.max);
            const p = Math.max(0, Math.min(1, (rawBudget - min)/(max - min)));
            const minScale = 1, maxScale = 2.5;
            // Baseline so that even at min budget the size feels like ~350€
            const pBase = Math.max(0, Math.min(1, (350 - min)/(max - min)));
            const baseScale = minScale + pBase*(maxScale - minScale);
            // Interpolate from baseline -> max depending on slider position
            return baseScale + p*(maxScale - baseScale);
        }

        // Animate number value only (no font-size changes)
        function animateNumberGrow(element, target, formatter = formatNumber, maxValue = 1000, duration = 600, scaleOverride = null) {
            const current = parseInt(element.getAttribute('data-value')||'0',10);
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const value = Math.floor(current + (target - current) * easeOutQuart);

                element.textContent = formatter(value);
                element.setAttribute('data-value', value);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = formatter(target);
                }
            }

            requestAnimationFrame(update);
        }

        // (ROAS removed)

        // Update all metrics
        let lastBudgetRaw = 300;
        let lastTargets = { reach:0, impressions:0, clicks:0, conversions:0 };

        function updateMetrics(rawBudget) {
            const snapped = Math.round(rawBudget / 25) * 25; // display/metrics step = 25€
            budgetDisplay.textContent = snapped + '€';
            // Trail follows the star (smooth) using raw value while dragging
            updateRocketTrail(isDragging ? parseInt(slider.value,10) : rawBudget);

            const metrics = calculateMetrics(snapped);

            // Monotonic when moving up: avoid smaller targets due to rounding plateaus
            const goingUp = rawBudget > lastBudgetRaw;
            if (goingUp) {
                metrics.reach = Math.max(metrics.reach, lastTargets.reach);
                metrics.impressions = Math.max(metrics.impressions, lastTargets.impressions);
                metrics.clicks = Math.max(metrics.clicks, lastTargets.clicks);
                metrics.conversions = Math.max(metrics.conversions, lastTargets.conversions);
            }

            // Animate with growth - LANGSAMER für Auto-Animation (smooth sync mit Slider)
            const fs = budgetScale(rawBudget); // one scale for all numbers, tied to slider
            animateNumberGrow(reachEl, metrics.reach, formatNumber, 100000, 1200, fs);
            animateNumberGrow(impressionsEl, metrics.impressions, formatNumber, 125000, 1000, fs);
            animateNumberGrow(clicksEl, metrics.clicks, formatNumber, 1500, 900, fs);
            // Conversions: auch langsamer für smooth animation
            animateNumberGrow(conversionsEl, metrics.conversions, formatNumber, 60, 800, fs);

            // persist last
            lastTargets = { ...metrics };
            lastBudgetRaw = rawBudget;
        }

        // Drag behavior: Pause Loop während Drag, danach 3s halten
        slider.addEventListener('pointerdown', ()=>{
            isDragging = true;
            if(loopId){ cancelAnimationFrame(loopId); loopId = null; }
            autoAnimationPaused = true; inHold = true; clearTimeout(holdTimeout); clearTimeout(armedFallback);
            armedResume = true;
        });
        window.addEventListener('pointerup', ()=>{ isDragging = false; });
        slider.addEventListener('touchstart', ()=>{
            isDragging = true;
            if(loopId){ cancelAnimationFrame(loopId); loopId = null; }
            autoAnimationPaused = true; inHold = true; clearTimeout(holdTimeout); clearTimeout(armedFallback);
            armedResume = false; // bei Touch nutzen wir festen Timer unten
        }, {passive:true});
        window.addEventListener('touchend', ()=>{ isDragging = false; }, {passive:true});

        // Slider input: update sofort, aber keine Auto-Resume – wir halten 3s nach Loslassen
        slider.addEventListener('input', (e) => {
            targetBudget = parseFloat(e.target.value);
            currentBudget = targetBudget;
            updateMetrics(targetBudget); // raw value for trail, snapped internally for metrics
        });
        function holdAtCurrentFor(ms){
            clearTimeout(holdTimeout);
            inHold = true; autoAnimationPaused = true;
            if(loopId){ cancelAnimationFrame(loopId); loopId = null; }
            setPhaseFromValue(parseFloat(slider.value));
            holdTimeout = setTimeout(()=>{
                inHold = false; autoAnimationPaused = false; speed = 0; speedTarget = 1; ensureLoop();
            }, ms);
        }
        // Maus: Halten bis Maus den Sliderbereich verlässt, dann 3s warten und fortsetzen
        slider.addEventListener('pointerup', (e)=>{
            // Verlasse‑Erkennung aktivieren: Sobald Cursor außerhalb des Wrapper‑Rects ist → 3s halten, dann weiter
            if(!inHold) return;
            const wrapper = document.querySelector('.rocket-slider-wrapper') || slider;
            if(!wrapper) { holdAtCurrentFor(3000); return; }
            const rect = wrapper.getBoundingClientRect();
            function outside(ev){
              return ev.clientX < rect.left || ev.clientX > rect.right || ev.clientY < rect.top || ev.clientY > rect.bottom;
            }
            const mm = (e)=>{
              if(!armedResume) { window.removeEventListener('mousemove', mm); return; }
              if(outside(e)){
                window.removeEventListener('mousemove', mm);
                holdAtCurrentFor(3000);
                armedResume = false;
              }
            };
            armedResume = true;
            window.addEventListener('mousemove', mm);
            // Falls der Cursor bereits außerhalb ist, starte sofort
            if(e && outside(e)){
              window.removeEventListener('mousemove', mm);
              holdAtCurrentFor(3000);
              armedResume = false;
              return;
            }
            // Fallback: nach 8s automatisch 3s halten, falls Maus im Bereich bleibt
            clearTimeout(armedFallback);
            armedFallback = setTimeout(()=>{ if(inHold) { holdAtCurrentFor(3000); armedResume = false; } }, 8000);
        });
        // Touch: kein Hover → feste 3s Haltedauer ab Loslassen
        slider.addEventListener('touchend', ()=>{ holdAtCurrentFor(3000); }, {passive:true});

        // ===== AUTO-ANIMATION (neu: kontinuierlicher Ping-Pong-Loop mit sanfter Geschwindigkeitsregelung) =====
        let autoAnimationId = null; // Alt: beibehalten für Kompatibilität
        let autoAnimationPaused = false;
        let inactivityTimeout = null;
        let holdTimeout = null;
        let inHold = false;
        let armedFallback = null;
        let armedResume = false; // wartet auf Verlassen des Sliderbereichs
        let isDecelerating = false; // bleibt, aber wird unten nicht mehr verwendet
        let decelerationId = null;
        // Neuer kontinuierlicher Loop
        let loopId = null;
        let lastTs = null;
        let phase = 0;           // wächst stetig (0→1 vorwärts, 1→2 rückwärts, ...)
        let speed = 0;           // 0..1 (1 = Normtempo)
        let speedTarget = 1;     // Zielgeschwindigkeit (Hover = 0, Normal = 1)

        // Easing function für sanftes Abbremsen (ease-out cubic)
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // Easing function für sanftes Beschleunigen (ease-in cubic)
        function easeInCubic(t) {
            return t * t * t;
        }

        function pingPong(x){ const n = Math.floor(x); const f = x - n; return (n % 2 === 0) ? f : 1 - f; }

        // Berechnet die Phase aus dem aktuellen Slider-Wert
        function setPhaseFromValue(value) {
            const minBudget = parseFloat(slider.min);
            const maxBudget = parseFloat(slider.max);
            const t = (value - minBudget) / (maxBudget - minBudget); // 0..1
            // Setze phase so dass pingPong(phase) = t
            // Wenn wir aufwärts fahren (gerade Zyklus): phase = t
            // Für Vereinfachung: Setze phase immer auf den nearest even cycle
            phase = t;
        }

        function ensureLoop(){
            if (loopId) return;
            const minBudget = parseFloat(slider.min);
            const maxBudget = parseFloat(slider.max);
            const halfDuration = 15000; // 15s pro Richtung
            function step(ts){
                if (autoAnimationPaused) { loopId = null; return; }
                if (lastTs == null) lastTs = ts;
                const dt = Math.max(0, Math.min(50, ts - lastTs)); // clamp dt
                lastTs = ts;
                // weiches Angleichen der Geschwindigkeit (Tau ~ 600ms)
                const tau = 600;
                speed += (speedTarget - speed) * (dt / tau);
                // Fortschritt
                phase += (dt / halfDuration) * Math.max(0, speed);
                const t = pingPong(phase); // 0..1..0
                const newValue = minBudget + t * (maxBudget - minBudget);
                slider.value = newValue;
                targetBudget = newValue;
                updateMetrics(newValue);
                loopId = requestAnimationFrame(step);
            }
            loopId = requestAnimationFrame(step);
        }

        function stopAutoAnimation() {
            if (loopId) { cancelAnimationFrame(loopId); loopId = null; }
            autoAnimationPaused = true; // pausiert den Loop komplett
            
            // Reset Inactivity Timer - nach 3 Sek neu starten
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(() => {
                autoAnimationPaused = false;
                // Sanft wieder anlaufen
                speedTarget = 1;
                ensureLoop();
            }, 3000);
        }
        // Sanftes Stoppen/Starten per Speed-Faktor (blockiert während Haltephase)
        function smoothStopAutoAnimation(){ if(inHold) return; speedTarget = 0; ensureLoop(); }
        function cancelSmoothStop(){ /* kein separater Decel mehr */ }
        function resumeAutoAnimation(){ if(inHold) return; autoAnimationPaused = false; speedTarget = 1; ensureLoop(); }

        // Event Listeners für Hover (Maus drüber → Sanftes Abbremsen)
        const hoverTarget = document.querySelector('.rocket-slider-wrapper') || slider;
        hoverTarget.addEventListener('mouseenter', ()=>{ smoothStopAutoAnimation(); clearTimeout(holdTimeout); clearTimeout(armedFallback); });
        hoverTarget.addEventListener('mouseleave', () => {
            // Cancel deceleration wenn Maus wieder weg ist
            cancelSmoothStop();
            // Sofort sanft wieder anlaufen lassen
            clearTimeout(inactivityTimeout);
            if(inHold){
              clearTimeout(armedFallback);
              // Nach User‑Set: 3s halten ab Verlassen, dann weiter – von der gesetzten Position
              holdAtCurrentFor(3000);
              armedResume = false;
            } else {
              autoAnimationPaused = false; speedTarget = 1; ensureLoop();
            }
        });

        // Bei Drag sofort stoppen (ohne Verzögerung)
        slider.addEventListener('pointerdown', () => { speedTarget = 0; ensureLoop(); });
        slider.addEventListener('touchstart', () => {
            speedTarget = 0; ensureLoop();
        }, {passive:true});

        // Initialize
        updateMetrics(300);
        // Auto-Animation nach 2 Sekunden starten (damit User Zeit hat die Seite zu sehen)
        setTimeout(() => { speed = 0; speedTarget = 1; ensureLoop(); }, 2000);
        console.log('[Ads Simulator] ✅ Smooth + Growing + Auto-Animation initialized!');
    })();


/* --- Block 14 --- */
// Meta Ads Intro Text Slide-Up Animation beim Why-Ads Sticky Scroll
    (function() {
        const introText = document.querySelector('.meta-ads-intro');
        const whyAdsSection = document.getElementById('why-ads');

        if (!introText || !whyAdsSection) return;

        function updateIntroPosition() {
            const rect = whyAdsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Berechne Scroll-Progress: 0 = Sektion startet, 1 = Sektion endet
            const sectionHeight = rect.height;
            const scrollStart = -rect.top;
            const scrollEnd = sectionHeight - windowHeight;
            const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

            // Text rutscht hoch: max -80px bei vollständigem Scroll
            const maxSlide = -80;
            const currentSlide = scrollProgress * maxSlide;

            introText.style.transform = `translateY(${currentSlide}px)`;
            introText.style.transition = 'transform 0.1s linear';
        }

        // Scroll Listener mit RequestAnimationFrame für Performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateIntroPosition();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial berechnen
        updateIntroPosition();
    })();


/* --- Block 15 --- */
// Rising chart on scroll (Warum Meta Ads?) – scroll-linked animation
    (function(){
        console.log('[Why Ads] 📊 Initializing scroll-linked chart...');

        const section = document.getElementById('why-ads');
        const svg = document.getElementById('why-svg');
        const path = document.getElementById('why-path');
        const endpoint = document.getElementById('why-endpoint');
        if (!section || !svg || !path) return;

        const len = path.getTotalLength();
        svg.style.setProperty('--plen', String(len));

        let vh = 0, secTopAbs = 0, secHeight = 0, scrubDistance = 0, startY = 0, endY = 0;

        function compute(){
            vh = window.innerHeight || document.documentElement.clientHeight;
            const rect = section.getBoundingClientRect();
            secTopAbs = window.scrollY + rect.top;
            secHeight = section.offsetHeight; // 200vh total

            // Animation startet wenn Section top = viewport top (normal)
            startY = secTopAbs;

            // Animation ends after scrolling through full section height
            scrubDistance = secHeight - vh; // 200vh - 100vh = 100vh of scrub
            endY = startY + scrubDistance;

            console.log('[Why Ads] 🔄 Computed:', {
                vh,
                secTopAbs,
                secHeight,
                startY: startY.toFixed(0),
                endY: endY.toFixed(0),
                scrubDistance: scrubDistance.toFixed(0)
            });
        }

        function update(){
            const y = window.scrollY;

            // Progress: 0 when scrollY = startY, 1 when scrollY = endY
            const progress = Math.max(0, Math.min(1, (y - startY) / scrubDistance));

            // Draw: stroke-dashoffset animation (0 = hidden, 1 = fully drawn)
            // When scrolling DOWN: progress increases (0→1) = chart draws
            // When scrolling UP: progress decreases (1→0) = chart undraws
            svg.style.setProperty('--draw', String(progress));

            // Rise: vertical scale growth (0.5 → 1.1)
            const rise = 0.5 + (0.6 * progress);
            svg.style.setProperty('--rise', String(rise));

            // Endpoint: Punkt folgt IMMER der Spitze des Charts
            if (endpoint && path) {
                const currentLen = len * progress;
                const point = path.getPointAtLength(currentLen);
                endpoint.setAttribute('cx', String(point.x));
                endpoint.setAttribute('cy', String(point.y));
                // Punkt ist immer sichtbar wenn Chart > 5% gezeichnet ist
                endpoint.style.opacity = progress > 0.05 ? '1' : '0';
            }
        }

        const onResize = () => { compute(); update(); };
        onResize();
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(onResize).catch(()=>{});
        }
        window.addEventListener('load', onResize);
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', update, { passive: true });

        console.log('[Why Ads] ✅ Scroll-linked chart initialized!');
    })();


/* --- Block 16 --- */
// Editorial: sticky scroll (cards + copy) with snap + easing
    (function(){
        const root = document.querySelector('#editorial .cf');
        const copyRoot = document.querySelector('#ed-copy');
        const head = copyRoot ? copyRoot.querySelector('.ed-head') : null;
        const wrap = document.querySelector('#editorial .ed-sticky-wrap');
        const section = document.getElementById('editorial');
        const prevSection = document.getElementById('partners');
        const nextSection = document.getElementById('services');
        if (!root || !copyRoot || !wrap) return;

        const cards = Array.from(root.querySelectorAll('.cf-card'));
        const glow = root.querySelector('.cf-glow');
        const stage = root.querySelector('.cf-stage');
        const panes = Array.from(copyRoot.querySelectorAll('.ed-pane'));

        const centerIndex = 1; // feste Positionierung: links(0), mitte(1), rechts(2)
        let focusTarget = -1;  // -1 = Intro (kein Fokus)

        function layout(focus){
            const baseZ = 100;
            const spacing = 110; // nah zusammenschieben
            const tiltY = 14;    // dezente 3D-Neigung
            const tiltZ = 6;     // 2D-Neigung
            const pullOut = 60;  // herausziehen
            cards.forEach((c, idx)=>{
                const pos = idx - centerIndex; // -1,0,1
                let x = pos * spacing;
                const ry = pos * tiltY;
                const rz = pos * tiltZ;
                // Gewichtung: je näher eine Karte am Fokus liegt, desto stärker der Effekt
                const ref = (focus < 0 ? centerIndex : focus);
                const dist = Math.abs(idx - ref);
                const w = Math.max(0, 1 - Math.min(1, dist)); // 0..1
                const z = baseZ - Math.abs(pos) + (w>0 ? 12*w : 0);
                const s = (idx===centerIndex ? 1.0 : 0.98) + 0.12*w;
                const blur = (idx===centerIndex ? 0.3 : 0.8) * (1 - w);
                const y = (pos !== 0 ? 10 : 0);
                if (w>0 && pos !== 0) { x += (pos < 0 ? -pullOut*w : pullOut*w); }
                c.style.transform = `translate3d(${x}px, ${y}px, ${-Math.abs(pos)*28}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`;
                c.style.filter = `blur(${blur}px) brightness(${w>0?1.08:0.96})`;
                c.style.zIndex = z;
                // ONLY glow when focus is active (not during intro)
                c.classList.toggle('active', focus >= 0 && w>0.5);
            });
            if (glow){
                const gx = (focus>=0 ? (focus - centerIndex) : 0) * spacing;
                glow.style.transform = `translateX(${gx}px)`;
                glow.style.opacity = focus>=0 ? 0.30 : 0.20;
            }
        }

        // Set dynamic pane top offset so panes never overlap the header
        function setPaneTop(){
            if (!head) return;
            const h = Math.ceil(head.getBoundingClientRect().height);
            copyRoot.style.setProperty('--pane-top', (h + 55) + 'px');
        }

        // Initial layout
        layout(-1);
        setPaneTop();

        // Sticky scroll controller
        const keys = ['intro','content','smm','ads'];
        const keyToIndex = { content: 0, smm: 1, ads: 2 };
        let currentKey = 'intro';
        let ticking = false;
        let lastMB = 0; // remember applied margins
        let lastMT = 0;

        function setPane(key){
            if (currentKey === key) return;

            const oldPane = panes.find(p => p.classList.contains('is-active'));

            // Helper function to activate new pane
            function activateNewPane() {
                currentKey = key;
                panes.forEach(p => {
                    if (p.getAttribute('data-key') === key) {
                        p.classList.add('is-active');
                    }
                });
                focusTarget = (key in keyToIndex) ? keyToIndex[key] : -1;
                layout(focusTarget);
            }

            if (oldPane) {
                // CRITICAL: Remove ALL is-active classes immediately
                panes.forEach(p => p.classList.remove('is-active'));

                // Wait for transitionend event (100% reliable)
                let transitionEnded = false;

                const handleTransitionEnd = (e) => {
                    // Only react to opacity transition (not transform)
                    if (e.propertyName !== 'opacity') return;
                    if (transitionEnded) return; // Prevent double-trigger

                    transitionEnded = true;
                    oldPane.removeEventListener('transitionend', handleTransitionEnd);

                    // NOW activate new pane - old is 100% invisible
                    activateNewPane();
                };

                oldPane.addEventListener('transitionend', handleTransitionEnd);

                // Fallback timeout: Text fade-out is now 200ms
                setTimeout(() => {
                    if (!transitionEnded) {
                        transitionEnded = true;
                        oldPane.removeEventListener('transitionend', handleTransitionEnd);
                        activateNewPane();
                    }
                }, 300); // Fade-out: 200ms + 100ms buffer

            } else {
                // First load - no transition needed
                activateNewPane();
            }
        }

        function onScroll(){
            if (ticking) return; ticking = true;
            requestAnimationFrame(()=>{
                const rect = wrap.getBoundingClientRect();
                const vh = window.innerHeight || document.documentElement.clientHeight;
                const total = Math.max(1, rect.height - vh);
                const scrolled = Math.min(total, Math.max(0, -rect.top));
                const p = scrolled / total; // 0..1
                // Zonen: Intro → Content → SMM → Ads (gleich große Fenster)
                const t1 = 0.25, t2 = 0.50, t3 = 0.75;
                if (p < t1) setPane('intro');
                else if (p < t2) setPane('content');
                else if (p < t3) setPane('smm');
                else setPane('ads');

                // Kein Exit-Fade mehr; Karten bleiben sichtbar

                // Neighbor choreography using REAL gap measurement → adjust margins to target gaps
                const targetTop = 2;     // px desired gap between partners and sticky top
                const targetBottom = 2;  // px desired gap between sticky bottom and services
                const maxClamp = 420;     // px safety clamp for negative margins

                function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
                const active = p > 0 && p < 1;

                if (active && prevSection){
                    const pr = prevSection.getBoundingClientRect();
                    // sticky top ist an den Viewport geklebt → Referenz ist 0
                    const gapTop = Math.round(pr.bottom - 0);
                    const need = gapTop - targetTop;
                    const mb = need > 0 ? -clamp(need, 0, maxClamp) : 0;
                    if (mb !== lastMB){ prevSection.style.marginBottom = mb ? (mb + 'px') : '0px'; lastMB = mb; }
                } else if (prevSection){
                    // keep lastMB to persist compact spacing after sticky
                    prevSection.style.marginBottom = lastMB ? (lastMB + 'px') : '0px';
                }

                if (active && nextSection){
                    const nr = nextSection.getBoundingClientRect();
                    const vhNow = window.innerHeight || document.documentElement.clientHeight;
                    // sticky bottom entspricht dem Viewport‑Bottom
                    const gapBottom = Math.round(nr.top - vhNow);
                    const need = gapBottom - targetBottom;
                    const mt = need > 0 ? -clamp(need, 0, maxClamp) : 0;
                    if (mt !== lastMT){ nextSection.style.marginTop = mt ? (mt + 'px') : '0px'; lastMT = mt; }
                    nextSection.style.pointerEvents = gapBottom > 24 ? 'none' : '';
                } else if (nextSection){
                    // keep lastMT so compact spacing remains after sticky
                    nextSection.style.marginTop = lastMT ? (lastMT + 'px') : '0px';
                    nextSection.style.pointerEvents = '';
                }
                ticking = false;
            });
        }

        // Attach scroll/resize
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', ()=>{ setPaneTop(); onScroll(); });
        onScroll();
    })();


/* --- Block 17 --- */
// Unified: Triptych switcher copy + stage swap
    (function(){
        const root = document.querySelector('#unified .tri');
        if (!root) return;
        const tabs = Array.from(root.querySelectorAll('.tri-tab'));
        const copy = root.querySelector('.tri-copy');
        const stages = {
            video: root.querySelector('.u-phone[data-kind="video"]'),
            foto: root.querySelector('.u-phone[data-kind="foto"]'),
            ads:  root.querySelector('.u-phone[data-kind="ads"]')
        };
        const copies = {
            video: 'Bewegt. Kompakt. Wiedererkennbar.',
            foto:  'Klar. On‑brand. Reduziert.',
            ads:   'Gezielt. Getrackt. Skalierbar.'
        };
        function select(key){
            Object.keys(stages).forEach(k=>{ stages[k].style.display = (k===key)?'block':'none'; });
            tabs.forEach(t=>{
                const on = t.getAttribute('data-k')===key;
                t.setAttribute('aria-selected', on? 'true':'false');
                t.tabIndex = on? 0 : -1;
            });
            if (copy) copy.textContent = copies[key] || '';
        }
        tabs.forEach(t=> t.addEventListener('click', ()=> select(t.getAttribute('data-k'))));
        tabs.forEach(t=> t.addEventListener('keydown', (e)=>{
            if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
                const i=tabs.indexOf(t); const n=(e.key==='ArrowRight')? (i+1)%tabs.length : (i-1+tabs.length)%tabs.length; tabs[n].focus(); select(tabs[n].getAttribute('data-k'));
            }
        }));
        select('video');
    })();

    // Unified: Pipeline nodes in-view highlight
    (function(){
        const pipe = document.querySelector('#unified .pipe');
        if (!pipe || !('IntersectionObserver' in window)) return;
        const nodes = Array.from(pipe.querySelectorAll('.node'));
        const io = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){ nodes.forEach((n,i)=> setTimeout(()=> n.classList.add('hit'), i*120)); io.unobserve(entry.target);} 
            });
        }, { threshold: 0.2 });
        io.observe(pipe);
    })();


/* --- Block 18 --- */
// ULTRA-SMOOTH Hover Effects - Service Cards & Bento Cards (EXCLUDE Editorial Buttons)
    (function(){
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const cards = document.querySelectorAll('.service-card, .bento-card');
        if (!cards.length) return;

        // Explicitly exclude editorial buttons from 3D effects
        const excludeSelectors = ['.ed-cta', '.ed-cta *', '#editorial .btn-primary'];

        cards.forEach((card) => {
            // Skip if card is or contains an excluded element
            if (excludeSelectors.some(sel => card.matches(sel) || card.querySelector(sel))) {
                return;
            }

            card.classList.add('js-active');
            card.style.willChange = 'transform';

            let isHovering = false;
            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let lift = 0, targetLift = 0;
            let animationId = null;

            function lerp(a, b, t){ return a + (b - a) * t; }

            function animate(){
                currentX = lerp(currentX, targetX, 0.1);
                currentY = lerp(currentY, targetY, 0.1);
                lift     = lerp(lift, targetLift, 0.15);

                const tiltX = currentY * 8;
                const tiltY = currentX * -8;
                const moveX = currentX * 6;
                const moveY = currentY * 6;
                
                card.style.transform = `translate3d(${moveX}px, ${moveY + lift}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1)`;

                if (!isHovering && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01 && Math.abs(lift) < 0.1) {
                    card.style.transform = 'translate3d(0,0,0) rotateX(0) rotateY(0) scale3d(1,1,1)';
                    animationId = null;
                    return;
                }
                animationId = requestAnimationFrame(animate);
            }

            card.addEventListener('mouseenter', () => {
                isHovering = true;
                targetLift = -10;
                if(!animationId) animationId = requestAnimationFrame(animate);
            });

            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                targetX = (e.clientX - (r.left + r.width/2)) / (r.width/2);
                targetY = (e.clientY - (r.top + r.height/2)) / (r.height/2);

                const gx = ((e.clientX - r.left) / r.width) * 100;
                const gy = ((e.clientY - r.top) / r.height) * 100;
                card.style.setProperty('--mouse-x', gx + '%');
                card.style.setProperty('--mouse-y', gy + '%');
            });

            card.addEventListener('mouseleave', () => {
                isHovering = false;
                targetX = 0; targetY = 0; targetLift = 0;
            });
        });
    })();


/* --- Block 19 --- */
// ULTRA-SMOOTH Price Cards – same 3D hover as service cards + blue glow
    (function(){
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const cards = document.querySelectorAll('.price-card');
        if (!cards.length) return;

        cards.forEach((card) => {
            // JS takes control of transforms
            card.classList.add('js-active');
            card.style.willChange = 'transform';
            card.style.transform = 'translate3d(0,0,0)';

            let isHovering = false;
            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let lift = 0, targetLift = 0; // negative = move up
            let animationId = null;

            function lerp(a, b, t){ return a + (b - a) * t; }

            function animate(){
                currentX = lerp(currentX, targetX, 0.15);
                currentY = lerp(currentY, targetY, 0.15);
                lift     = lerp(lift, targetLift, 0.2);

                const tiltX = currentY * 10;
                const tiltY = currentX * -10;
                const moveX = currentX * 8;
                const moveY = currentY * 8;
                card.style.transform = `translate3d(${moveX}px, ${moveY + lift}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1)`;

                if (!isHovering && Math.abs(currentX - targetX) < 0.005 && Math.abs(currentY - targetY) < 0.005 && Math.abs(lift - targetLift) < 0.2) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                    return;
                }
                animationId = requestAnimationFrame(animate);
            }

            card.addEventListener('mouseenter', () => {
                isHovering = true;
                targetLift = -12;
                if(!animationId) animationId = requestAnimationFrame(animate);
            });

            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width/2;
                const cy = r.top + r.height/2;
                targetX = (e.clientX - cx) / (r.width/2);
                targetY = (e.clientY - cy) / (r.height/2);

                const glowX = ((e.clientX - r.left) / r.width) * 100;
                const glowY = ((e.clientY - r.top) / r.height) * 100;
                card.style.setProperty('--mouse-x', Math.max(0, Math.min(100, glowX)) + '%');
                card.style.setProperty('--mouse-y', Math.max(0, Math.min(100, glowY)) + '%');
            });

            card.addEventListener('mouseleave', () => {
                isHovering = false;
                targetX = 0; targetY = 0; targetLift = 0;
                if(!animationId) animationId = requestAnimationFrame(animate);
            });
        });
    })();


/* --- Block 20 --- */
// Editorial Principles - Staggered Animation
    (function(){
        const principles = document.querySelectorAll('#why-variad .principle');
        if (principles.length === 0) return;

        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    principles.forEach(principle => {
                        principle.classList.add('visible');
                    });
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -80px 0px'
        });

        const principlesGrid = document.querySelector('#why-variad .principles-grid');
        if (principlesGrid) {
            observer.observe(principlesGrid);
        }
    })();


/* --- Block 21 --- */
// Generate noise texture in JS for cross-browser dithering (esp. Safari)
    (function(){
        try {
            const c = document.createElement('canvas');
            const s = 64; c.width = s; c.height = s;
            const ctx = c.getContext('2d');
            const img = ctx.createImageData(s, s);
            for (let i = 0; i < img.data.length; i += 4) {
                const v = (Math.random()*255)|0; // grayscale
                img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = 10; // ~4% opacity
            }
            ctx.putImageData(img, 0, 0);
            const url = c.toDataURL('image/png');
            const noiseEl = document.querySelector('.hero-noise');
            if (noiseEl) noiseEl.style.backgroundImage = `url(${url})`;
        } catch(e) { /* no-op */ }
    })();


/* --- Block 22 --- */
// Independent motion for glows (no spark particles)
    (function(){
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        // Glow animation controller
        const SPEED = 1.2; // +20% speed
        const glows = Array.from(document.querySelectorAll('.glow-layer .glow'));
        const seeds = glows.map((el, i) => ({
            fx: 0.12 + Math.random()*0.08, // movement frequency X
            fy: 0.10 + Math.random()*0.08, // movement frequency Y
            fs: 0.20 + Math.random()*0.15, // scale frequency
            ax: 10 + Math.random()*8,      // amplitude in percentage
            ay: 10 + Math.random()*8,
            p1: Math.random()*Math.PI*2,
            p2: Math.random()*Math.PI*2,
            p3: Math.random()*Math.PI*2,
            baseScale: 0.95 + Math.random()*0.1
        }));
        glows.forEach(el => el.classList.add('js-ctrl'));

        function raf(t){
            const time = t/1000;
            // Animate glows independently
            glows.forEach((el, i) => {
                const s = seeds[i];
                const x = Math.sin(time * s.fx * SPEED + s.p1) * s.ax; // percentage
                const y = Math.cos(time * s.fy * SPEED + s.p2) * s.ay;
                const scale = s.baseScale + Math.sin(time * s.fs * SPEED + s.p3) * 0.12;
                el.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale})`;
                el.style.opacity = 0.22 + Math.abs(Math.sin(time * s.fs * SPEED + s.p2)) * 0.12;
            });
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    })();


/* --- Block 23 --- */
// Dynamic Glow Brightness based on Scroll Position
    (function() {
        const glowLayer = document.querySelector('.glow-layer');
        if (!glowLayer) { return; }

        function updateGlowBrightness() {
            const scrollPosition = window.scrollY;
            const heroHeight = window.innerHeight * 0.8; // Approximate Home section height

            // Start fading earlier (at 40% of hero height) and make it 2x smoother
            const fadeStartScroll = heroHeight * 0.4;  // Start fade earlier
            const fadeEndScroll = heroHeight * 1.6;    // End later for smoother, longer transition

            let targetOpacity;
            if (scrollPosition < fadeStartScroll) {
                targetOpacity = 1;  // Full brightness at top
            } else if (scrollPosition >= fadeEndScroll) {
                targetOpacity = 0.5;  // Half brightness when fully scrolled
            } else {
                // Gradual linear interpolation for smooth fade (instead of instant switch)
                const progress = (scrollPosition - fadeStartScroll) / (fadeEndScroll - fadeStartScroll);
                targetOpacity = 1 - (progress * 0.5);  // Fade from 1.0 to 0.5
            }

            glowLayer.style.opacity = targetOpacity;
        }

        window.addEventListener('scroll', updateGlowBrightness, { passive: true });
        updateGlowBrightness();
    })();


/* --- Block 24 --- */
// Stats Counter Animation - trigger on scroll into view
    (function(){
        const statsNumbers = document.querySelectorAll('.stat-number[data-target]');
        if (statsNumbers.length === 0) return;

        let hasAnimated = false;

        function formatNumber(value, format, prefix, suffix) {
            let formatted = '';

            if (format === 'compact') {
                if (value >= 1000000) {
                    formatted = (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + 'M';
                } else if (value >= 1000) {
                    formatted = (value / 1000).toFixed(value % 1000 === 0 ? 0 : 0) + 'k';
                } else {
                    formatted = value.toString();
                }
            } else {
                formatted = value.toLocaleString('de-DE');
            }

            return (prefix || '') + formatted + (suffix || '');
        }

        function animateCounter(element, target, duration = 2000) {
            const format = element.getAttribute('data-format');
            const prefix = element.getAttribute('data-prefix');
            const suffix = element.getAttribute('data-suffix');

            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (easeOutExpo) - starts fast, ends slow
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                const currentValue = Math.floor(eased * target);
                element.textContent = formatNumber(currentValue, format, prefix, suffix);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    // Ensure final value is exact
                    element.textContent = formatNumber(target, format, prefix, suffix);
                }
            }

            requestAnimationFrame(update);
        }

        // IntersectionObserver to trigger animation when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    statsNumbers.forEach(el => {
                        const target = parseInt(el.getAttribute('data-target'), 10);
                        animateCounter(el, target);
                    });

                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of section is visible (better for mobile)
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe the grid containing the stats for more precise triggering
        const statsGrid = document.querySelector('#why-variad .stats-grid');
        if (statsGrid) {
            observer.observe(statsGrid);
        } else {
            // Fallback to section if grid not found
            const section = document.getElementById('why-variad');
            if (section) observer.observe(section);
        }
    })();

    /* --- Block 22: VARIAD Custom Cookie Banner Logic --- */
    (function() {
        function initBanner() {
            if (typeof klaro === 'undefined') return;
            const manager = klaro.getManager();
            const banner = document.getElementById('variad-cookie-banner');
            if (!banner) return;

            console.log('[Banner] Init running, confirmed:', manager.confirmed);

            // Zeige Banner wenn noch nicht bestätigt
            if (!manager.confirmed) {
                banner.classList.add('is-visible');
            }

                // Button: Akzeptieren
                const acceptBtn = document.getElementById('v-accept-btn');
                if (acceptBtn) {
                    acceptBtn.onclick = function(e) {
                        e.preventDefault();
                        console.log('[Banner] FORCING ACCEPT ALL');
                        
                        // 1. Alle Dienste auf TRUE setzen
                        manager.config.services.forEach(s => {
                            manager.updateConsent(s.name, true);
                        });
                        
                        // 2. Speichern und Anwenden (erzwingt das Schreiben des Cookies)
                        manager.saveAndApplyConsents();
                        
                        // 3. Status im Manager explizit auf confirmed setzen
                        manager.confirmed = true;
                        
                        console.log('[Banner] New Consents:', manager.consents);
                        
                        // 4. Banner ausblenden
                        banner.classList.remove('is-visible');
                    };
                }

            // Button: Ablehnen
            const declineBtn = document.getElementById('v-decline-btn');
            if (declineBtn) {
                declineBtn.onclick = function(e) {
                    e.preventDefault();
                    console.log('[Banner] Decline all clicked');
                    const consents = {};
                    manager.config.services.forEach(s => { consents[s.name] = false; });
                    manager.saveAndApplyConsents(consents);
                    banner.classList.remove('is-visible');
                };
            }

            // Link: Einstellungen
            const settingsLink = document.getElementById('v-open-settings');
            if (settingsLink) {
                settingsLink.onclick = function(e) {
                    e.preventDefault();
                    console.log('[Banner] Settings clicked');
                    // Wir lassen den Banner erst mal da, falls man zurück will
                    // oder wir blenden ihn aus - wir blenden ihn aus
                    banner.classList.remove('is-visible');
                    klaro.show(undefined, true); // True erzwingt das Modal
                };
            }
        }

        // Mehrfacher Init-Versuch
        if (document.readyState === 'loading') {
            window.addEventListener('load', initBanner);
        } else {
            initBanner();
        }
        setTimeout(initBanner, 500);
        setTimeout(initBanner, 1500);
    })();

/* --- Block 23 --- */
// Come Back Effect (Title & Favicon Change)
(function() {
    const originalTitle = document.title;
    let originalIcon = null;
    
    // Finde das aktuelle Favicon
    const iconLink = document.querySelector("link[rel~='icon']");
    if (iconLink) originalIcon = iconLink.href;

    const breakHeart = 'images/heart-broken.svg';
    const missMsg = 'Wir vermissen dich 💔';
    let timeout;

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Verzögerung, damit es nicht nervt bei kurzem Switch
            timeout = setTimeout(() => {
                document.title = missMsg;
                if (iconLink) iconLink.href = breakHeart;
            }, 2000); // Nach 2 Sekunden weg
        } else {
            // Sofort zurücksetzen
            clearTimeout(timeout);
            document.title = originalTitle;
            if (iconLink && originalIcon) iconLink.href = originalIcon;
        }
    });

    /* ==========================================================================
       MOBILE EDITORIAL FADE-IN ANIMATION (ROBUST)
       ========================================================================== */
    const mobilePanes = document.querySelectorAll('#editorial .ed-pane');
    if (mobilePanes.length > 0 && 'IntersectionObserver' in window) {
        const paneObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    // Fade out when leaving viewport
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            root: null, 
            rootMargin: '-5% 0px -5% 0px', // Trigger slightly inside the viewport (top/bottom)
            threshold: 0.1 // Trigger as soon as 10% is visible
        });

        mobilePanes.forEach(pane => paneObserver.observe(pane));
        
        // Remove Safety Timer because we want dynamic fade-in/out behavior,
        // forcing them visible would break the scroll effect.
    }

})();


/* --- Mobile-Only Sequential Typewriter Animation --- */
(function() {
    if (window.innerWidth > 768) return; 

    const section = document.querySelector('#content-production');
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('.production-card'));
    const allTextElements = [];

    cards.forEach(card => {
        const num = card.querySelector('.step-number');
        const title = card.querySelector('.step-title');
        const desc = card.querySelector('.step-desc');
        if (num) allTextElements.push({ el: num, text: num.textContent.trim() });
        if (title) allTextElements.push({ el: title, text: title.textContent.trim() });
        if (desc) allTextElements.push({ el: desc, text: desc.textContent.trim() });
    });

    allTextElements.forEach(item => {
        item.el.innerHTML = '';
        item.el.style.opacity = '0';
    });

    let hasStarted = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
            hasStarted = true;
            startGlobalTyping();
        }
    }, { threshold: 0.15 });

    observer.observe(section);

    async function startGlobalTyping() {
        const typeSpeed = 2; 
        
        for (let i = 0; i < allTextElements.length; i++) {
            const item = allTextElements[i];
            const text = item.text;
            const el = item.el;
            
            el.style.opacity = '1';
            el.innerHTML = '<span class="txt"></span><span class="typing-cursor"></span>';
            const txtSpan = el.querySelector('.txt');
            const cursor = el.querySelector('.typing-cursor');

            for (let char of text) {
                txtSpan.textContent += char;
                await new Promise(r => setTimeout(r, typeSpeed));
            }
            
            cursor.remove();
            await new Promise(r => setTimeout(r, 50));
        }
    }
})();

/* --- Mobile Spotlight Effect for SMM Section --- */
(function() {
    function updateSMMSpotlight() {
        if (window.innerWidth > 768) return;

        const smmSection = document.querySelector('#smm');
        if (!smmSection) return;

        const slides = smmSection.querySelectorAll('.content-slide');
        const viewportCenter = window.innerHeight / 2;

        slides.forEach(slide => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - slideCenter);
            
            // Calculate opacity: 1.0 at center, tapering to 0.2
            const fadeRange = window.innerHeight * 0.35; 
            let opacity = 1 - (distance / fadeRange);
            
            // Clamp zwischen 0.1 und 1.0
            opacity = Math.max(0.1, Math.min(1.0, opacity));
            
            // Skalierung: 1.0 in der Mitte, bis zu 0.9 an den Rändern
            let scale = 0.9 + (opacity - 0.1) * (1 - 0.9) / (1 - 0.1);
            
            slide.style.opacity = opacity;
            slide.style.transform = `scale(${scale})`;
        });
    }

    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!isTicking && window.innerWidth <= 768) {
            window.requestAnimationFrame(() => {
                updateSMMSpotlight();
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateSMMSpotlight);
    setTimeout(updateSMMSpotlight, 300);
})();

/* ===========================================
   LEISTUNGSSEITEN - INTERAKTIVE KOMPONENTEN
   =========================================== */

/* --- FAQ Accordion (Ludwigsburg) --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const accordionItems = document.querySelectorAll('.faq-accordion-item');

        if (accordionItems.length === 0) return;

        accordionItems.forEach(item => {
            const header = item.querySelector('.faq-accordion-header');

            if (!header) return;

            header.addEventListener('click', function() {
                // Schließe alle anderen Items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle aktuelles Item
                item.classList.toggle('active');
            });
        });

        // Erstes Item standardmäßig öffnen
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('active');
        }
    });
})();

/* --- Campaign Tabs (Advertising) --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const tabNav = document.querySelector('.kampagnen-tab-nav');
        const tabContent = document.querySelector('.kampagnen-tab-content');

        if (!tabNav || !tabContent) return;

        const tabBtns = tabNav.querySelectorAll('.tab-btn');
        const tabPanes = tabContent.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Entferne active von allen Buttons
                tabBtns.forEach(b => b.classList.remove('active'));

                // Füge active zum geklickten Button hinzu
                this.classList.add('active');

                // Zeige/Verstecke Tab-Inhalte
                tabPanes.forEach(pane => {
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });
    });
})();

/* --- Testimonial Carousel (Stuttgart) --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.testimonial-carousel');

        if (!carousel) return;

        const track = carousel.querySelector('.testimonial-track');
        const cards = carousel.querySelectorAll('.testimonial-card');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dots = carousel.querySelectorAll('.carousel-dots .dot');

        if (cards.length === 0) return;

        let currentIndex = 0;
        let autoplayInterval;

        function showSlide(index) {
            // Boundary check
            if (index < 0) index = cards.length - 1;
            if (index >= cards.length) index = 0;

            currentIndex = index;

            // Update cards
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === currentIndex);
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Event Listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startAutoplay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', function() {
                showSlide(i);
                startAutoplay();
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Initialize
        showSlide(0);
        startAutoplay();
    });
})();

/* --- Animated Stats Counter --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const statItems = document.querySelectorAll('.animated-stats .stat-item');

        if (statItems.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statItems.forEach(item => observer.observe(item));
    });
})();

/* --- Smooth Scroll für Leistungsseiten --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#' || href === '') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
})();

/* --- Metric Bars Animation --- */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const metricCards = document.querySelectorAll('.metric-card');

        if (metricCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.metric-fill');
                    if (fill) {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        metricCards.forEach(card => observer.observe(card));
    });
})();
