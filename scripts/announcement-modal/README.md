# 🎉 Announcement Modal für VARIAD

Ein einfaches, konfigurierbares Modal-System für Angebote, Ankündigungen und Call-to-Actions auf der VARIAD-Website.

---

## 📋 Übersicht

### Was ist das?

Ein Pop-up-Fenster, das auf deiner Website erscheint um Besucher auf spezielle Angebote aufmerksam zu machen (z.B. "Gratis Erstgespräch").

### Features

✅ **Einfache Bedienung** - Nur Config-Datei bearbeiten, kein Programmierwissen nötig
✅ **Seitenübergreifend** - Einmal einbinden, auf allen Seiten aktiv
✅ **Smart Tracking** - Erscheint nur einmal pro Besucher (außer du änderst die Version)
✅ **Mobile-optimiert** - Funktioniert perfekt auf allen Geräten
✅ **VARIAD Design** - Schwarze Box mit roter leuchtender Outline
✅ **Barrierearm** - ESC-Taste, Overlay-Click, X-Button, "Nein danke" Button

---

## 📁 Dateien-Struktur

```
scripts/announcement-modal/
├── config.js          👈 NUR DIESE DATEI BEARBEITEN!
├── modal.js           ⚠️ Nicht anfassen
├── modal.css          ⚠️ Nicht anfassen
├── README.md          📖 Diese Datei
├── INSTALLATION.md    📖 Installations-Anleitung
└── BEISPIELE.md       📖 Anwendungsbeispiele
```

---

## 🚀 Quick Start

### 1. Installation (nur einmal)

Füge diese 3 Zeilen in den `<head>`-Bereich **ALLER** HTML-Seiten ein:

```html
<link rel="stylesheet" href="scripts/announcement-modal/modal.css">
<script src="scripts/announcement-modal/config.js"></script>
<script src="scripts/announcement-modal/modal.js"></script>
```

**Wo genau?** Am besten direkt vor `</head>`.

**Detaillierte Anleitung:** Siehe [`INSTALLATION.md`](INSTALLATION.md)

### 2. Inhalt bearbeiten

Öffne `config.js` und passe die Werte an:

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🎉 Gratis Social Media Beratung",
    message: "Sichere dir jetzt dein kostenloses Erstgespräch!",
    buttonText: "Jetzt Termin sichern",
    buttonLink: "index.html#contact",
    delaySeconds: 5,
    version: "angebot-januar-2025"
};
```

**Das war's!** Speichern und fertig.

---

## ⚙️ Wichtige Config-Optionen

### Modal ein-/ausschalten

```javascript
enabled: true   // Modal wird angezeigt
enabled: false  // Modal ist komplett aus
```

### Neues Angebot = Modal erscheint wieder

Wenn Besucher das Modal bereits geschlossen haben, sehen sie es nicht mehr.
**Lösung:** Ändere die Version-Nummer!

```javascript
version: "angebot-februar-2025"  // Modal erscheint wieder für alle
```

### Verzögerung anpassen

```javascript
delaySeconds: 0   // Sofort beim Laden
delaySeconds: 3   // Nach 3 Sekunden
delaySeconds: 10  // Nach 10 Sekunden
```

### Link-Ziel

```javascript
buttonLink: "index.html#contact"           // Kontaktformular
buttonLink: "beratung.html"                // Andere Seite
buttonLink: "https://calendly.com/link"    // Externes Tool
buttonLink: "mailto:hello@variad.de"       // E-Mail
buttonLink: "tel:+4915511541310"           // Telefon
```

---

## 🔧 Häufige Anwendungsfälle

### "Ich will ein neues Angebot bewerben"

1. Öffne `config.js`
2. Ändere `title`, `message`, `buttonText`
3. Ändere `version` (z.B. "sommer-special-2025")
4. Speichern

→ Modal erscheint wieder für alle Besucher!

### "Ich will das Modal temporär ausschalten"

1. Öffne `config.js`
2. Ändere `enabled: false`
3. Speichern

→ Modal ist komplett deaktiviert.

### "Ich will dass Modal nur auf Desktop zeigen"

1. Öffne `config.js`
2. Ändere `showOnMobile: false`
3. Speichern

→ Mobile Nutzer sehen das Modal nicht mehr.

---

## 🐛 Fehlersuche

### Modal erscheint nicht

**Prüfe:**
1. Ist `enabled: true` in config.js?
2. Sind alle 3 Dateien korrekt eingebunden?
3. Ist `delaySeconds` zu hoch? (Warte die Zeit ab)
4. Browser-Cache leeren (Strg+F5)

### Modal wurde geschlossen und erscheint nicht mehr

**Das ist normal!** Modal speichert dass du es geschlossen hast.

**Zum Testen:**
- Ändere `debugMode: true` in config.js
- Oder lösche Browser-localStorage
- Oder ändere `version: "test-123"`

### Modal erscheint auf bestimmten Seiten nicht

**Prüfe:**
- Ist die Seite in `excludePages` aufgelistet?
- Sind die Dateien korrekt eingebunden?

---

## 📚 Weitere Dokumentation

- **[INSTALLATION.md](INSTALLATION.md)** - Schritt-für-Schritt Installations-Anleitung
- **[BEISPIELE.md](BEISPIELE.md)** - Konkrete Anwendungsbeispiele und Vorlagen

---

## 💡 Tipps für beste Ergebnisse

1. **Verzögerung nutzen** - `delaySeconds: 3-5` ist optimal
2. **Klare Botschaft** - Kurz und prägnant
3. **Starker CTA** - "Jetzt sichern" statt "Mehr erfahren"
4. **Version ändern** - Bei jedem neuen Angebot
5. **Testen** - Auf Desktop UND Mobile testen

---

## ⚡ Support

Bei Fragen oder Problemen:
1. Schaue in die anderen Dokumentations-Dateien
2. Prüfe die Kommentare in config.js
3. Kontaktiere den Developer

---

**Version:** 1.0.0
**Erstellt für:** VARIAD
**Letzte Aktualisierung:** Januar 2025
