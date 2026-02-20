/**
 * ═══════════════════════════════════════════════════════════════
 * ANNOUNCEMENT MODAL - KONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 *
 * ⚠️ NUR DIESE DATEI BEARBEITEN!
 * Die anderen Dateien (modal.js, modal.css) musst du nicht anfassen.
 *
 * So funktioniert's:
 * 1. Ändere die Werte unten nach deinen Wünschen
 * 2. Speichern
 * 3. Fertig! Die Änderungen erscheinen sofort auf der Website
 */

const ANNOUNCEMENT_CONFIG = {

    // ═══════════════════════════════════════════════════════════
    // AKTIVIERUNG
    // ═══════════════════════════════════════════════════════════

    /**
     * Modal ein- oder ausschalten
     * true = Modal wird angezeigt
     * false = Modal ist komplett deaktiviert
     */
    enabled: true,


    // ═══════════════════════════════════════════════════════════
    // INHALT (Das wird im Modal angezeigt)
    // ═══════════════════════════════════════════════════════════

    /**
     * Überschrift des Modals
     * Beispiel: "🎉 Gratis Social Media Beratung"
     */
    title: "🎯 Gratis Instagram Profil-Überarbeitung",

    /**
     * Haupttext (kann auch mehrzeilig sein)
     * Beispiel: "Sichere dir jetzt dein kostenloses 30-Minuten Erstgespräch!"
     */
    message: "Wir überarbeiten dein Instagram-Profil kostenlos! Du gibst uns Zugriff, wir optimieren Bio, Highlights, Feed-Struktur und visuelles Branding – inklusive ausführlichem Feedback-Dokument mit Tipps für mehr Reichweite.",


    // ═══════════════════════════════════════════════════════════
    // CALL-TO-ACTION BUTTON (Roter Button)
    // ═══════════════════════════════════════════════════════════

    /**
     * Text auf dem Button
     * Beispiel: "Jetzt Termin sichern"
     */
    buttonText: "Jetzt Profil überarbeiten lassen",

    /**
     * Link wohin der Button führt
     * Beispiele:
     * - "index.html#contact" (Kontaktformular)
     * - "beratung.html" (Andere Seite)
     * - "https://calendly.com/dein-link" (Externes Tool)
     * - "mailto:hello@variad.de" (E-Mail)
     * - "tel:+4915511541310" (Telefon)
     */
    buttonLink: "instagram-profil-analyse.html",

    /**
     * Soll der Link in einem neuen Tab öffnen?
     * true = Neuer Tab
     * false = Gleicher Tab
     */
    openInNewTab: false,


    // ═══════════════════════════════════════════════════════════
    // "NEIN DANKE" BUTTON (Grauer Button zum Schließen)
    // ═══════════════════════════════════════════════════════════

    /**
     * Text auf dem "Ablehnen" Button
     * Beispiel: "Nein danke" oder "Vielleicht später"
     */
    closeButtonText: "Nein danke",


    // ═══════════════════════════════════════════════════════════
    // TIMING & VERHALTEN
    // ═══════════════════════════════════════════════════════════

    /**
     * Verzögerung bis das Modal erscheint (in Sekunden)
     * Empfehlung: 3-5 Sekunden
     * 0 = sofort, 5 = nach 5 Sekunden
     */
    delaySeconds: 5,

    /**
     * Modal-Version / Kampagnen-ID
     *
     * WICHTIG: Wenn Nutzer das Modal geschlossen haben, sehen sie es nicht mehr.
     * Um das Modal WIEDER anzuzeigen (z.B. für neues Angebot):
     * → Ändere diese Version-Nummer!
     *
     * Beispiele:
     * - "angebot-januar-2025"
     * - "sommer-special-2025"
     * - "v2"
     */
    version: "instagram-ueberarbeitung-januar-2025",

    /**
     * Soll das Modal auch auf mobilen Geräten erscheinen?
     * true = Ja, überall zeigen
     * false = Nur auf Desktop/Tablet
     */
    showOnMobile: true,


    // ═══════════════════════════════════════════════════════════
    // ERWEITERTE OPTIONEN (optional)
    // ═══════════════════════════════════════════════════════════

    /**
     * Auf welchen Seiten soll das Modal NICHT erscheinen?
     * Liste von Dateinamen (ohne Pfad)
     *
     * Beispiel: ["danke.html", "impressum.html"]
     * Leer lassen = Modal erscheint überall
     */
    excludePages: [],

    /**
     * Debug-Modus (für Tests)
     * true = Modal ignoriert localStorage (erscheint immer)
     * false = Normale Funktion
     *
     * ⚠️ Nur für Tests! Danach wieder auf false setzen!
     */
    debugMode: false

};

// ═══════════════════════════════════════════════════════════════
// ⚠️ AB HIER NICHTS MEHR ÄNDERN!
// ═══════════════════════════════════════════════════════════════
