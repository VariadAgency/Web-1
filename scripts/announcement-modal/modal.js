/**
 * ═══════════════════════════════════════════════════════════════
 * ANNOUNCEMENT MODAL - HAUPT-SCRIPT
 * ═══════════════════════════════════════════════════════════════
 *
 * ⚠️ DIESE DATEI NICHT BEARBEITEN!
 * Alle Einstellungen werden in config.js vorgenommen.
 *
 * Version: 1.0.0
 * Erstellt für: VARIAD
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // INITIALISIERUNG
    // ═══════════════════════════════════════════════════════════

    /**
     * Warte bis DOM geladen ist, dann starte
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /**
     * Hauptfunktion - prüft alle Bedingungen und zeigt Modal
     */
    function init() {
        // Detect language based on URL path
        const isEnglish = window.location.pathname.includes('/en/');

        // Choose appropriate config based on language
        let config;
        if (isEnglish) {
            if (typeof ANNOUNCEMENT_CONFIG_EN === 'undefined') {
                console.error('Announcement Modal: config-en.js not found!');
                return;
            }
            config = ANNOUNCEMENT_CONFIG_EN;
        } else {
            if (typeof ANNOUNCEMENT_CONFIG === 'undefined') {
                console.error('Announcement Modal: config.js nicht gefunden!');
                return;
            }
            config = ANNOUNCEMENT_CONFIG;
        }

        // Prüfe ob Modal aktiviert ist
        if (!config.enabled) {
            return;
        }

        // Prüfe ob aktuelle Seite ausgeschlossen ist
        if (isPageExcluded(config.excludePages)) {
            return;
        }

        // Prüfe ob auf Mobile angezeigt werden soll
        if (!config.showOnMobile && isMobileDevice()) {
            return;
        }

        // Prüfe ob Modal bereits geschlossen wurde (außer im Debug-Modus)
        if (!config.debugMode && hasUserClosedModal(config.version)) {
            return;
        }

        // Alle Checks bestanden - zeige Modal nach Verzögerung
        setTimeout(function() {
            showModal(config);
        }, config.delaySeconds * 1000);
    }


    // ═══════════════════════════════════════════════════════════
    // PRÜF-FUNKTIONEN
    // ═══════════════════════════════════════════════════════════

    /**
     * Prüft ob aktuelle Seite in der Ausschluss-Liste ist
     */
    function isPageExcluded(excludePages) {
        if (!excludePages || excludePages.length === 0) {
            return false;
        }

        const currentPage = window.location.pathname.split('/').pop();
        return excludePages.includes(currentPage);
    }

    /**
     * Prüft ob Gerät mobil ist
     */
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Prüft ob Nutzer das Modal bereits geschlossen hat
     */
    function hasUserClosedModal(version) {
        try {
            const storageKey = 'announcement_modal_closed_' + version;
            return localStorage.getItem(storageKey) === 'true';
        } catch (e) {
            // localStorage nicht verfügbar (z.B. Private Mode)
            return false;
        }
    }

    /**
     * Speichert dass Nutzer das Modal geschlossen hat
     */
    function markModalAsClosed(version) {
        try {
            const storageKey = 'announcement_modal_closed_' + version;
            localStorage.setItem(storageKey, 'true');
        } catch (e) {
            console.warn('Announcement Modal: localStorage nicht verfügbar');
        }
    }


    // ═══════════════════════════════════════════════════════════
    // MODAL ANZEIGEN
    // ═══════════════════════════════════════════════════════════

    /**
     * Erstellt und zeigt das Modal an
     */
    function showModal(config) {
        // Modal HTML erstellen
        const modal = createModalHTML(config);

        // Ins DOM einfügen
        document.body.appendChild(modal);

        // Animation starten (nach kurzer Verzögerung für CSS-Transition)
        setTimeout(function() {
            modal.classList.add('announcement-modal-visible');
        }, 10);

        // Event Listeners registrieren
        setupEventListeners(modal, config);
    }

    /**
     * Erstellt die Modal HTML-Struktur
     */
    function createModalHTML(config) {
        // Container erstellen
        const modalContainer = document.createElement('div');
        modalContainer.id = 'announcement-modal';
        modalContainer.className = 'announcement-modal';

        // Target für Links
        const target = config.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';

        // HTML aufbauen
        modalContainer.innerHTML = `
            <div class="announcement-modal-overlay"></div>
            <div class="announcement-modal-content">
                <button class="announcement-modal-close" aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="announcement-modal-body">
                    <h2 class="announcement-modal-title">${escapeHtml(config.title)}</h2>
                    <p class="announcement-modal-message">${escapeHtml(config.message)}</p>
                    <div class="announcement-modal-buttons">
                        <a href="${escapeHtml(config.buttonLink)}"${target} class="announcement-modal-cta">
                            ${escapeHtml(config.buttonText)}
                        </a>
                        <button class="announcement-modal-decline">
                            ${escapeHtml(config.closeButtonText)}
                        </button>
                    </div>
                </div>
            </div>
        `;

        return modalContainer;
    }

    /**
     * Registriert alle Event Listeners
     */
    function setupEventListeners(modal, config) {
        // X-Button
        const closeBtn = modal.querySelector('.announcement-modal-close');
        closeBtn.addEventListener('click', function() {
            closeModal(modal, config.version);
        });

        // "Nein danke" Button
        const declineBtn = modal.querySelector('.announcement-modal-decline');
        declineBtn.addEventListener('click', function() {
            closeModal(modal, config.version);
        });

        // Overlay (außerhalb klicken)
        const overlay = modal.querySelector('.announcement-modal-overlay');
        overlay.addEventListener('click', function() {
            closeModal(modal, config.version);
        });

        // ESC-Taste
        document.addEventListener('keydown', function escListener(e) {
            if (e.key === 'Escape') {
                closeModal(modal, config.version);
                document.removeEventListener('keydown', escListener);
            }
        });

        // CTA-Button Click tracken (optional für Analytics)
        const ctaBtn = modal.querySelector('.announcement-modal-cta');
        ctaBtn.addEventListener('click', function() {
            // Modal schließen wenn interner Link
            if (!config.openInNewTab) {
                markModalAsClosed(config.version);
            }
        });
    }


    // ═══════════════════════════════════════════════════════════
    // MODAL SCHLIEẞEN
    // ═══════════════════════════════════════════════════════════

    /**
     * Schließt das Modal mit Animation
     */
    function closeModal(modal, version) {
        // Speichern dass Modal geschlossen wurde
        markModalAsClosed(version);

        // Animation starten
        modal.classList.remove('announcement-modal-visible');

        // Nach Animation aus DOM entfernen
        setTimeout(function() {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300); // Match mit CSS transition-duration
    }


    // ═══════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════

    /**
     * Escaped HTML um XSS zu verhindern
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
