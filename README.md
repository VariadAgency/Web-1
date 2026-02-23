# VARIAD - Social Media & Content Agentur Website

Willkommen im offiziellen Repository der **VARIAD** Agentur-Website. Dies ist eine hochperformante, SEO-optimierte Web-Plattform für unsere Präsenz im Raum Stuttgart, Heilbronn und Ludwigsburg sowie für unseren internationalen Markt.

---

## 🚀 Projekt-Übersicht

VARIAD ist eine spezialisierte Agentur für digitales Marketing. Die Website dient als zentraler Hub für die Neukundengewinnung, Portfolio-Präsentation und als Informationsquelle für unsere Dienstleistungen:

*   **Social Media Management:** Strategische Betreuung und Community-Aufbau.
*   **Content Produktion:** Professionelle Foto- und Videoproduktion (Reels, TikToks, Imagefilme).
*   **Performance Advertising:** Zielgerichtete Meta Ads (Instagram & Facebook).
*   **Consulting:** Strategie-Workshops und individuelle Beratung.

---

## ✨ Kern-Features

### 1. Internationalisierung & SEO (Ready for Global)
Die Website ist von Grund auf für internationales SEO konzipiert:
*   **Sprachunterstützung:** Vollständige DE- und EN-Versionen im `/en/` Verzeichnis.
*   **Hreflang-Set:** Korrekte Implementierung von `hreflang="de"`, `hreflang="en"` und `x-default` auf jeder Unterseite.
*   **Sitemap 2.0:** Dynamisch generierte `sitemap.xml` inklusive aller Sprachvarianten.
*   **JSON-LD:** Umfassende strukturierte Daten (Schema.org) für Organisation, Dienstleistungen und lokale Sichtbarkeit.

### 2. Modernes UI/UX Design
*   **Glassmorphism Header:** Ein einheitlicher, hochfunktionaler Header mit Blur-Effekten und automatischer Sichtbarkeitssteuerung.
*   **Mobile-First:** Speziell optimiertes mobiles Menü mit einem benutzerfreundlichen **2x2 Grid-Layout**.
*   **Interaktive Wizards:** Ein mehrstufiger Kontakt-Wizard, der die Konversionsrate durch einfache Nutzerführung steigert.
*   **Dynamic Component Injection:** Das Kontakt-Modal wird zentral über JavaScript gesteuert, was Redundanz im HTML-Code eliminiert.

### 3. Technische Highlights
*   **Performance:** Drastische Reduzierung der Ladezeiten durch Umstellung von schweren PNG-Assets auf optimierte JPEG/WebP-Formate.
*   **Sicherheit (Anti-Spam):** Implementierung einer **E-Mail-Obfuskation** via Base64, um die Ernte von E-Mail-Adressen durch Bots zu verhindern.
*   **Strukturierte Pfade:** Konsistente Nutzung absoluter Pfade (`/`), um Fehler bei tiefen Verzeichnisstrukturen auszuschließen.
*   **Modulares CSS:** Trennung der Styles in spezialisierte Module (`leistungen.css`, `agentur.css`, `mobile-fixes.css`).

---

## 📁 Projektstruktur

```text
/
├── about-us.html           # Team & Philosophie (DE)
├── consulting.html         # Beratungsleistungen (DE)
├── content-production.html  # Produktions-Sektion (DE)
├── portfolio.html          # Case Studies & Arbeiten
├── index.html              # Startseite (DE)
├── sitemap.xml             # SEO Sitemap
├── UPDATE_REPORT.md        # Detaillierte Änderungshistorie
│
├── en/                     # Englische Sprachversion
│   ├── about-us.html
│   ├── consulting.html
│   └── ...
│
├── assets/                 # Statische Ressourcen
│   ├── css/                # Modulare Stylesheets
│   ├── js/                 # Kern-Logik & Interaktionen
│   └── vendor/             # Drittanbieter (z.B. Klaro Cookie Consent)
│
├── images/                 # Bilder & Grafiken
│   ├── editorial/          # Optimierte Service-Bilder
│   ├── logo/               # Branding Assets
│   └── partner/            # Partner-Logos
│
├── scripts/                # Zusätzliche Skripte (z.B. Announcement Modals)
└── videos/                 # Videohintergründe & Portfolio-Clips
```

---

## 🛠 Entwicklung & Workflow

### AI-Driven Engineering
Dieses Projekt wurde unter Einsatz modernster KI-Technologien entwickelt und optimiert. Der Workflow nutzt fortschrittliche Agenten-Systeme zur Code-Generierung, zum Refactoring und zur Qualitätssicherung:
*   **Claude Code & Gemini:** Primär genutzt für komplexes Refactoring, architektonische Entscheidungen, SEO-Strategien und multilinguale Strukturierung.
*   **Automatisierte Workflows:** KI-gestützte Validierung von Pfaden, technischer Integrität und UI-Konsistenz über 25+ Unterseiten hinweg.

### Git Workflow
*   **main:** Stabiler Live-Stand der Produktion.
*   **preview:** Aktiver Staging-Branch für Tests und Abnahmen.

---

## 📞 Kontakt & Support

**VARIAD Agentur**  
Web: [variad.de](https://variad.de)  
E-Mail: hello@variad.de  
Region: Stuttgart | Heilbronn | Ludwigsburg

---
*Zuletzt aktualisiert am 23. Februar 2026*
