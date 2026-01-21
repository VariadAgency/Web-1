# Audit & Projekt-Plan (Phase 1)

**Datum:** 08. Januar 2026
**Autor:** Gemini (Senior Web Developer Role)
**Status:** Initialisierung

## 1. Bestandsaufnahme (Audit)

### Architektur & Tech-Stack
*   **Entry-Point:** `index.html` (Single Page Application Charakter, aber statisch).
*   **Styling:** ~2000 Zeilen CSS direkt im `<head>` der `index.html`. Nutzung von CSS-Variablen (`:root`), aber inkonsistent. Hohe Spezifität durch `!important`.
*   **Logik:** ~1500 Zeilen JavaScript direkt am Ende des `<body>`. Viele globale Event-Listener (Scroll), mehrere `requestAnimationFrame` Loops.
*   **Assets:** Bilder und Videos liegen lokal vor. Einige Icons sind als Base64 im CSS eingebettet (User-Wunsch: beibehalten).
*   **Server:** Statisches Hosting (aktuell lokal via Python SimpleHTTP auf Port 5179).

### Kritische Bereiche
1.  **Wartbarkeit (Hochkritisch):** Durch den "Monolithen" (alles in einer Datei) ist das Risiko für "Breaking Changes" bei kleinen Änderungen extrem hoch. Teamarbeit ist unmöglich.
2.  **Performance:** Browser-Caching für CSS/JS ist nicht möglich. Parallele Animations-Loops belasten den Main-Thread.
3.  **Daten-Integrität:** Das Kontaktformular nutzt `mailto:`, was auf vielen Endgeräten ohne Standard-Mail-Client fehlschlägt. (Status: "WIP", wird später adressiert).
4.  **Redundanz:** Ordner `assets/css` und `assets/js` sind angelegt, aber leer oder enthalten Zombie-Code.

### Risikoanalyse für Refactoring
*   **CSS-Extraktion:** Risiko, dass relative Pfade (z.B. zu Bildern) brechen, wenn CSS verschoben wird.
*   **JS-Extraktion:** Risiko, dass Ausführungsreihenfolge (`DOMContentLoaded`) sich ändert, wenn Scripts ausgelagert werden.

---

## 2. Der 5-Schritte-Plan (Phase 1: Safe Ops & Cleanup)

Dieser Plan folgt strikt der Regel: **Kleine, isolierte Änderungen.**

### Schritt 1: Sicherheits-Backup & Baseline
*   **Ziel:** Einen sauberen Wiederherstellungspunkt schaffen.
*   **Aktion:** Backup der `index.html` erstellen.
*   **Prüfung:** Hash-Vergleich der Dateien.

### Schritt 2: CSS Extraktion (Separation of Concerns)
*   **Ziel:** Design vom Inhalt trennen.
*   **Aktion:**
    1.  Inhalt des `<style>` Blocks in `assets/css/style.css` übertragen.
    2.  `<link rel="stylesheet">` in `index.html` einfügen.
    3.  Original `<style>` Block entfernen.
*   **Risiko:** Pfade zu Bildern in `url(...)` könnten brechen.
*   **Mitigation:** Manuelle Prüfung aller `url()` Referenzen im CSS vor dem Commit.

### Schritt 3: JS Extraktion (Separation of Concerns)
*   **Ziel:** Logik vom Inhalt trennen.
*   **Aktion:**
    1.  Inhalt der `<script>` Blöcke (außer kritische Inline-Config) in `assets/js/main.js` übertragen.
    2.  `<script src="...">` am Ende des Body einfügen.
*   **Risiko:** Globale Variablen Scope-Probleme.
*   **Mitigation:** Wrapper (IIFE) oder Module-Pattern nutzen, Smoke-Test der Interaktivität.

### Schritt 4: Cleanup Zombie-Dateien
*   **Ziel:** Verwirrung vermeiden.
*   **Aktion:** Löschen oder Archivieren der alten, ungenutzten `styles.css` / `script.js` im Root, falls vorhanden (im `optimized_site` Root scheinen sie aktuell nicht zu liegen, Prüfung erforderlich).

### Schritt 5: Smoke-Test & Dokumentation
*   **Ziel:** Verifizieren, dass die Seite optisch und funktional 1:1 dem Original entspricht.
*   **Aktion:**
    1.  Visueller Vergleich (Header, Hero, Slider).
    2.  Funktionstest (Scroll-Effekte, Hover).
    3.  Abschlussbericht schreiben.

---

## Nächste Phasen (Ausblick)
*   **Phase 2:** Design System (Variablen konsolidieren, `!important` entfernen).
*   **Phase 3:** Performance (Scroll-Events drosseln, Bilder optimieren).
*   **Phase 4:** Content & UX (Formular-Backend, Texte).
