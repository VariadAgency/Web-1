/* ================================================
   CONTACT MODAL SCRIPT
   Handles popup opening/closing and dynamic injection
   ================================================ */

(function() {
    'use strict';

    const modalHTML = `
    <div id="contact-modal-overlay">
        <div class="contact-modal">
            <button class="modal-close-btn" onclick="closeContactModal()" aria-label="Schließen">X</button>
            <div class="contact-modal-wrapper">
                <div class="contact-modal-header">
                    <h2 data-i18n="modal_title">Lass uns sprechen</h2>
                    <p data-i18n="modal_subtitle">In 5 Schritten zu deiner Anfrage – schnell und smart.</p>
                </div>

                <div class="wizard" id="contact-wizard">
                    <div class="wiz-progress">
                        <div class="bar"><span></span></div>
                        <div class="dots" aria-hidden="true">
                            <i data-step="1" data-label="Thema"></i>
                            <i data-step="2" data-label="Budget"></i>
                            <i data-step="3" data-label="Details"></i>
                            <i data-step="4" data-label="Kontakt"></i>
                        </div>
                    </div>

                    <div class="wiz-viewport">
                        <!-- Step 0: Intent -->
                        <section class="wiz-step is-active" data-step="0">
                            <h3 class="wiz-title" data-i18n="step0_title">Worum geht's?</h3>
                            <p class="wiz-sub" data-i18n="step0_sub">Wähle, wobei wir dich unterstützen sollen.</p>
                            <div class="chip-grid">
                                <button type="button" class="chip" data-value="smm" data-i18n="service_smm">Social Media Management</button>
                                <button type="button" class="chip" data-value="content" data-i18n="service_content">Content‑Produktion</button>
                                <button type="button" class="chip" data-value="ads" data-i18n="service_ads">Meta Ads</button>
                                <button type="button" class="chip" data-value="beratung" data-i18n="service_consulting">Kostenlos beraten</button>
                                <button type="button" class="chip" data-value="sonstiges" data-i18n="service_other">Sonstiges</button>
                            </div>
                        </section>

                        <!-- Step 1: Kurzbeschreibung -->
                        <section class="wiz-step" data-step="1">
                            <h3 class="wiz-title" data-i18n="step1_title">Kurzbeschreibung</h3>
                            <textarea id="wiz-note" rows="6" placeholder="Erzähl uns ein wenig über dein Projekt..."></textarea>
                        </section>

                        <!-- Step 2: Budget -->
                        <section class="wiz-step" data-step="2">
                            <h3 class="wiz-title" data-i18n="step2_title">Budget pro Monat/Projekt</h3>
                            <div class="budget">
                                <input type="range" min="250" max="2500" step="1" value="1000" id="wiz-budget" />
                                <div class="budget-output" id="wiz-budget-out">1 000 €</div>
                            </div>
                        </section>

                        <!-- Step 3: Kontakt minimal -->
                        <section class="wiz-step" data-step="3">
                            <h3 class="wiz-title" data-i18n="step3_title">Wie erreichen wir dich?</h3>
                            <div class="grid-two">
                                <div class="form-mini">
                                    <label for="wiz-name" data-i18n="label_name">Name</label>
                                    <input id="wiz-name" type="text" placeholder="Dein Name" autocomplete="name" required>
                                </div>
                                <div class="form-mini">
                                    <label for="wiz-company" data-i18n="label_company">Unternehmen (optional)</label>
                                    <input id="wiz-company" type="text" placeholder="Dein Unternehmen" autocomplete="organization">
                                </div>
                            </div>
                            <div class="grid-two" style="margin-top:10px;">
                                <div class="form-mini">
                                    <label for="wiz-email" data-i18n="label_email">E‑Mail</label>
                                    <input id="wiz-email" type="email" placeholder="deine@email.de" autocomplete="email">
                                </div>
                                <div class="form-mini">
                                    <label for="wiz-phone" data-i18n="label_phone">Telefon</label>
                                    <input id="wiz-phone" type="tel" placeholder="z. B. 0157 1234567" autocomplete="tel">
                                </div>
                            </div>
                            <div class="form-error" id="wiz-error" role="alert" aria-live="polite"></div>
                            <div class="summary" id="wiz-summary" aria-live="polite"></div>
                        </section>
                    </div>

                    <div class="wiz-nav">
                        <button type="button" class="wiz-btn prev" disabled data-i18n="btn_back">Zurück</button>
                        <button type="button" class="wiz-btn next" data-i18n="btn_next">Weiter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    const translations = {
        en: {
            modal_title: "Let's talk",
            modal_subtitle: "In 5 steps to your request – fast and smart.",
            step0_title: "What's it about?",
            step0_sub: "Choose how we can support you.",
            service_smm: "Social Media Management",
            service_content: "Content Production",
            service_ads: "Meta Ads",
            service_consulting: "Free Consultation",
            service_other: "Other",
            step1_title: "Short Description",
            step1_placeholder: "Tell us a bit about your project...",
            step2_title: "Budget per month/project",
            step3_title: "How can we reach you?",
            label_name: "Name",
            placeholder_name: "Your Name",
            label_company: "Company (optional)",
            placeholder_company: "Your Company",
            label_email: "E-mail",
            placeholder_email: "your@email.com",
            label_phone: "Phone",
            placeholder_phone: "e.g. +49 157 1234567",
            btn_back: "Back",
            btn_next: "Next"
        }
    };

    // Open Modal Function
    window.openContactModal = function() {
        injectModal();
        const modal = document.getElementById('contact-modal-overlay');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Re-init Wizard if not already initialized for this element
            if (window.initVariadWizard && !modal.dataset.wizardInit) {
                window.initVariadWizard(modal.querySelector('#contact-wizard'));
                modal.dataset.wizardInit = 'true';
            }
        }
    };

    // Close Modal Function
    window.closeContactModal = function() {
        const modal = document.getElementById('contact-modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    function injectModal() {
        if (document.getElementById('contact-modal-overlay')) return;
        
        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        const modalEl = div.querySelector('#contact-modal-overlay');
        document.body.appendChild(modalEl);

        // Language Check
        const isEn = document.documentElement.lang.startsWith('en') || window.location.pathname.includes('/en/');
        if (isEn) {
            modalEl.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations.en[key]) el.textContent = translations.en[key];
            });
            // Handle placeholders
            const noteArea = modalEl.querySelector('#wiz-note');
            if (noteArea) noteArea.placeholder = translations.en.step1_placeholder;
            
            const nameIn = modalEl.querySelector('#wiz-name');
            if (nameIn) nameIn.placeholder = translations.en.placeholder_name;

            const compIn = modalEl.querySelector('#wiz-company');
            if (compIn) compIn.placeholder = translations.en.placeholder_company;

            const mailIn = modalEl.querySelector('#wiz-email');
            if (mailIn) mailIn.placeholder = translations.en.placeholder_email;

            const phoneIn = modalEl.querySelector('#wiz-phone');
            if (phoneIn) phoneIn.placeholder = translations.en.placeholder_phone;
        }

        // Close on Overlay Click
        modalEl.addEventListener('click', function(e) {
            if (e.target === modalEl) closeContactModal();
        });

        // Prevent content clicks from closing
        modalEl.querySelector('.contact-modal').addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close on Escape Key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeContactModal();
    });

    // Auto-bind all buttons with href="#contact"
    function bindTriggers() {
        // Look for buttons that should open the modal
        const selectors = [
            'a[href="#contact"]',
            'a[href$="#contact"]',
            '.open-contact-modal',
            '.cta-button[href*="#contact"]'
        ];
        
        document.querySelectorAll(selectors.join(',')).forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.openContactModal();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindTriggers);
    } else {
        bindTriggers();
    }

})();
