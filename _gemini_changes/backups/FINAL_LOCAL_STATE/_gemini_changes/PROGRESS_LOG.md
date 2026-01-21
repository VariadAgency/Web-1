# Projekt-Fortschritt & Steuerungs-Log

**Status:** 🟡 Initialisierung
**Aktuelle Phase:** Phase 1 (Architektur & Entflechtung)
**Aktueller Task:** Warten auf Startschuss

Dieses Dokument steuert den Fortschritt. Es wird nach jedem atomaren Arbeitsschritt aktualisiert.

---

## 🛑 Regeln für diesen Prozess
1.  **Nur ein Haken pro Schritt.** Wir springen nicht.
2.  **Backup vor jedem Haken.** Ohne Backup in `backups/` keine Änderung.
3.  **Verifikation nach jedem Haken.** Die Seite muss unter `localhost:5179` laufen.

---

## 🗓 Phase 1: Architektur & Entflechtung (Das Fundament)
*Ziel: HTML, CSS und JS sind sauber getrennt. Die `index.html` ist lesbar.*

- [x] **1.1 Initiale Sicherung:** Snapshot der originalen `index.html` erstellen.
- [x] **1.2 CSS-Extraktion:** Inhalt des `<style>` Tags in `assets/css/style.css` verschieben und verlinken.
- [x] **1.3 Asset-Pfad-Korrektur (CSS):** Prüfen, ob `url(...)` Pfade im CSS nach dem Verschieben noch stimmen (ggf. `../` anpassen).
- [x] **1.4 Smoke-Test (CSS):** Prüfen, ob das Design noch exakt gleich aussieht.
- [x] **1.5 JS-Extraktion:** Inhalt der `<script>` Tags in `assets/js/main.js` verschieben und verlinken.
- [x] **1.6 Smoke-Test (JS):** Prüfen, ob Animationen und Interaktionen noch funktionieren.
- [x] **1.7 Cleanup:** Leere Tags und Kommentare aus der `index.html` entfernen.

---

## 🗓 Phase 2: HTML-Struktur & Semantik
*Ziel: Der Code wird verständlich und modernisiert.*

- [x] **2.1 Header/Nav:** `div` Suppe durch `<header>` und `<nav>` ersetzen.
- [x] **2.2 Main Content:** Hauptinhalt in `<main>` wrappen.
- [x] **2.3 Sections:** Sicherstellen, dass alle Bereiche saubere `<section id="...">` Tags haben. (Geprüft: OK)
- [x] **2.4 Footer:** `div` durch `<footer>` ersetzen. (Bereits vorhanden)
- [x] **2.5 Meta-Daten:** Title, Description und Meta-Tags im `<head>` prüfen und ordnen.

---

## 🗓 Phase 3: CSS Refactoring (Stabilisierung)
*Ziel: Wartbarer CSS-Code ohne `!important` Kriege.*

- [x] **3.1 Variablen-Audit:** Alle Hardcoded Colors finden und durch `var(--brand-...)` ersetzen.
- [x] **3.2 !important Analyse:** Die kritischen `!important` im `#why-ads` Bereich untersuchen und durch bessere Spezifität ersetzen.
- [ ] **3.3 Media-Query Gruppierung:** Verstreute Mobile-Regeln logisch ordnen (optional, wenn Zeit erlaubt).

---

## 🗓 Phase 4: JavaScript Performance
*Ziel: "60 FPS" Gefühl und Akku-Schonung.*

- [ ] **4.1 Scroll-Event Audit:** (Rollback durchgeführt - bleibt im Originalzustand)
- [ ] **4.2 Throttling:** (Übersprungen für Launch-Stabilität)
- [ ] **4.3 Animation Loop:** (Übersprungen)

---

## 🗓 Phase 5: Sicherheit & Abschluss
- [x] **5.1 Formular-Check:** Verbindung zwischen HTML und JS geprüft. OK.
- [x] **5.2 Finaler Smoke-Test:** Website ist live und stabil.
- [x] **5.3 Release-Paket:** Ordner bereinigt. Launch-bereit.

---
**PROJEKT ABGESCHLOSSEN.**
Website optimiert und bereit für Deployment. 🚀

