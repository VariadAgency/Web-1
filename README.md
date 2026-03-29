# VARIAD Agentur-Website (Dokumentation)

Dieses Repository enthält die technische Basis und den Content der **VARIAD** Agentur-Website. Die Plattform ist als hochperformante, SEO-optimierte Static-Site konzipiert, die sowohl regionale (Stuttgart, Heilbronn, Ludwigsburg) als auch internationale Märkte bedient.

---

## 🛠 Technische Architektur & Features

### 1. SEO & Internationalisierung
*   **Multilinguales Setup:** Strukturierte DE- und EN-Versionen (Verzeichnis `/en/`).
*   **Hreflang-Management:** Vollständiges Set (`de`, `en`, `x-default`) auf jeder Unterseite zur Vermeidung von Duplicate Content und zur Steuerung der regionalen Indexierung.
*   **Sitemap 2.0:** Vollständig indizierte `sitemap.xml` inklusive aller Sprachvarianten und Prioritäten.
*   **Structured Data:** JSON-LD Implementierung (Schema.org) für Organisation, Dienstleistungen und LocalBusiness-Entitäten.

### 2. UI/UX & Design-System
*   **Modulare Styles:** Trennung der CSS-Logik in dedizierte Module (`leistungen.css`, `agentur.css`, `mobile-fixes.css`) zur Reduzierung von Overhead.
*   **Unified Navigation:** Zentral gesteuerter Header über alle 25+ HTML-Dateien mit Glassmorphism-Effekten und automatischer Sichtbarkeits-Logik.
*   **Mobile-Optimierung:** Redesign des mobilen Menüs auf ein **2x2 Grid-Layout** zur verbesserten Daumen-Bedienbarkeit.
*   **Dynamic Components:** Injektion des Kontakt-Modals via `contact-modal.js`, um Redundanz in den HTML-Quelltexten zu eliminieren.

### 3. Sicherheit & Performance
*   **Spam-Prävention:** E-Mail-Obfuskation mittels Base64-Encoding für alle öffentlichen Kontakt-Links.
*   **Asset-Optimierung:** Konsequente Nutzung von optimierten JPEGs statt PNGs im Editorial-Bereich zur Minimierung der Payload.
*   **Absolute Routing:** Konsistente Nutzung absoluter Pfade (`/`), um Fehlverlinkungen bei variierender Verzeichnistiefe auszuschließen.

---

## 📂 Projektstruktur

```text
/
├── about-us.html           # Agenturvorstellung & Team
├── consulting.html         # Bereich Beratung & Strategie
├── content-production.html  # Bereich Foto- & Videoproduktion
├── portfolio.html          # Case Studies & Referenzen
├── index.html              # Zentrale Einstiegsseite
├── UPDATE_REPORT.md        # Technisches Log der letzten Änderungen
│
├── en/                     # Englische Sprachsektion
│   ├── index.html
│   ├── about-us.html
│   └── ...
│
├── assets/                 # Globale Ressourcen
│   ├── css/                # Modulare Stylesheets
│   ├── js/                 # App-Logik (Wizard, Modal, Scroll)
│   └── vendor/             # Externe Bibliotheken (Klaro etc.)
│
├── images/                 # Optimierte Bild-Assets
├── scripts/                # Hilfsskripte & Konfigurationen
└── videos/                 # Background-Videos & Loops
```

---

## ⚙️ Entwicklung & Deployment-Workflow

### AI-Driven Engineering
Die Entwicklung und das Refactoring dieses Projekts erfolgt unter Einsatz von KI-Agenten-Systemen (**Claude Code**, **Gemini**, **Codex**). Der Fokus liegt auf:
*   Automatisierter Qualitätssicherung der Code-Integrität.
*   Effizientem Massen-Refactoring (z.B. Pfad-Normalisierung, Header-Synchronisation).
*   SEO-technischer Validierung und Strukturierung.

### Git & Release Management
*   **main:** Produktionsreifer Live-Stand.
*   **preview:** Integrations-Branch für Staging und Abnahme neuer Features.

---

## 📊 Kontakt-Daten
*   **Unternehmen:** VARIAD Agentur
*   **Domain:** [variad.de](https://variad.de)
*   **Standort:** Region Stuttgart | Heilbronn | Ludwigsburg
