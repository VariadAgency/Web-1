# 📦 Installation - Schritt für Schritt

Diese Anleitung zeigt dir **genau**, wie du das Announcement Modal auf deiner Website einbindest.

**Zielgruppe:** Diese Anleitung ist für Kollegen ohne Programmiererfahrung geschrieben.

---

## ⏱️ Dauer: Ca. 5-10 Minuten

---

## 🎯 Was du erreichen willst

Nach dieser Anleitung:
- ✅ Das Modal ist auf **allen** Seiten deiner Website aktiv
- ✅ Du kannst den Inhalt in `config.js` jederzeit selbst ändern
- ✅ Das Modal funktioniert auf Desktop und Mobile

---

## 📋 Was du brauchst

- [ ] Zugriff auf die Website-Dateien (via FTP, Netlify, GitHub, etc.)
- [ ] Einen Text-Editor (z.B. VS Code, Sublime Text, Notepad++)
- [ ] Die 3 Modal-Dateien (config.js, modal.js, modal.css)

---

## 🚀 Installation

### Schritt 1: Dateien prüfen

Stelle sicher, dass diese 3 Dateien existieren:

```
Web-1-main/
└── scripts/
    └── announcement-modal/
        ├── config.js
        ├── modal.js
        └── modal.css
```

**✅ Alle da?** → Weiter zu Schritt 2
**❌ Dateien fehlen?** → Kontaktiere den Developer

---

### Schritt 2: Code-Snippet kopieren

Kopiere diese 3 Zeilen:

```html
<link rel="stylesheet" href="scripts/announcement-modal/modal.css">
<script src="scripts/announcement-modal/config.js"></script>
<script src="scripts/announcement-modal/modal.js"></script>
```

**💡 Tipp:** Rechtsklick → Kopieren oder Strg+C / Cmd+C

---

### Schritt 3: HTML-Dateien bearbeiten

Du musst das Code-Snippet in **jede HTML-Datei** einfügen, auf der das Modal erscheinen soll.

#### 3.1 Öffne die erste HTML-Datei

Beispiel: `index.html`

#### 3.2 Finde den `<head>`-Bereich

Suche nach der Zeile `<head>` am Anfang der Datei.

**Sieht ungefähr so aus:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VARIAD</title>
    <!-- Hier sind verschiedene andere Einbindungen -->
</head>
```

#### 3.3 Füge das Code-Snippet ein

**Wo genau?** Am besten **direkt vor `</head>`**

**Vorher:**
```html
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js"></script>
</head>
<body>
```

**Nachher:**
```html
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js"></script>

    <!-- Announcement Modal -->
    <link rel="stylesheet" href="scripts/announcement-modal/modal.css">
    <script src="scripts/announcement-modal/config.js"></script>
    <script src="scripts/announcement-modal/modal.js"></script>
</head>
<body>
```

#### 3.4 Speichern

Speichere die Datei (Strg+S / Cmd+S)

#### 3.5 Wiederhole für alle Seiten

Das Modal soll auf allen Seiten erscheinen? Dann wiederhole Schritt 3.1-3.4 für:

- ✅ index.html
- ✅ beratung.html
- ✅ social-media-management.html
- ✅ content-produktion.html
- ✅ advertising.html
- ✅ portfolio.html
- ✅ ueber-uns.html
- ✅ etc.

**💡 Tipp:** Kopiere das Code-Snippet einmal und füge es dann in alle Dateien ein.

---

### Schritt 4: Auf Server hochladen

#### 4.1 Via Netlify (empfohlen)

1. Öffne dein Netlify Dashboard
2. Gehe zu deiner Website
3. Klicke auf "Deploys"
4. Ziehe die geänderten Dateien in den Upload-Bereich
   ODER
5. Pushe die Änderungen via Git (wenn du Git verwendest)

#### 4.2 Via FTP

1. Öffne dein FTP-Programm (z.B. FileZilla)
2. Verbinde dich mit dem Server
3. Navigiere zum Website-Ordner
4. Lade alle geänderten HTML-Dateien hoch
5. Lade den kompletten `scripts/announcement-modal/` Ordner hoch

---

### Schritt 5: Testen

#### 5.1 Öffne deine Website

Gehe zu deiner Website (z.B. https://variad.de)

#### 5.2 Warte 5 Sekunden

Das Modal ist so eingestellt, dass es nach 5 Sekunden erscheint.

#### 5.3 Modal sollte erscheinen

Du solltest jetzt eine schwarze Box mit roter leuchtender Outline sehen:
- ✅ Titel
- ✅ Text
- ✅ Roter "Jetzt sichern" Button
- ✅ Grauer "Nein danke" Button
- ✅ X zum Schließen oben rechts

#### 5.4 Funktionalität testen

Teste alle Funktionen:
- [ ] X-Button schließt das Modal
- [ ] "Nein danke" Button schließt das Modal
- [ ] Außerhalb der Box klicken schließt das Modal
- [ ] ESC-Taste schließt das Modal (nur Desktop)
- [ ] CTA-Button führt zur richtigen Seite
- [ ] Seite neu laden → Modal erscheint NICHT mehr

**✅ Alles funktioniert?** → Geschafft! 🎉

---

## ❌ Fehlersuche

### Modal erscheint nicht

**Mögliche Ursachen:**

1. **Dateien nicht hochgeladen**
   - Prüfe ob der `scripts/announcement-modal/` Ordner auf dem Server existiert

2. **Falsche Pfade**
   - Prüfe ob die Pfade in den HTML-Dateien korrekt sind
   - Es muss `scripts/announcement-modal/...` sein
   - NICHT `../scripts/announcement-modal/...` oder `/scripts/announcement-modal/...`

3. **Modal deaktiviert**
   - Öffne `config.js`
   - Prüfe ob `enabled: true` steht

4. **Zu lange Verzögerung**
   - Öffne `config.js`
   - Prüfe `delaySeconds` - warte diese Zeit ab

5. **Browser-Cache**
   - Drücke Strg+F5 (Windows) oder Cmd+Shift+R (Mac)
   - Das lädt die Seite komplett neu

### Modal wurde geschlossen und erscheint nicht mehr

**Das ist normal!**

Das Modal speichert, dass du es geschlossen hast und zeigt es dir nicht mehr an.

**Zum Testen:**

**Option 1: Debug-Modus aktivieren**
1. Öffne `config.js`
2. Ändere `debugMode: false` zu `debugMode: true`
3. Speichern und hochladen
4. Jetzt erscheint das Modal bei jedem Laden
5. **Wichtig:** Danach wieder auf `false` setzen!

**Option 2: Browser-Daten löschen**
1. Öffne Browser-Einstellungen
2. Lösche "Cookies und Website-Daten"
3. Seite neu laden

**Option 3: Inkognito-Modus**
1. Öffne ein privates/Inkognito-Fenster
2. Gehe zur Website
3. Modal sollte erscheinen

---

## ✅ Checkliste

Nach erfolgreicher Installation:

- [ ] Modal erscheint nach 5 Sekunden
- [ ] Alle Schließ-Funktionen funktionieren
- [ ] CTA-Button führt zur richtigen Seite
- [ ] Modal erscheint auf allen gewünschten Seiten
- [ ] Modal funktioniert auf Desktop
- [ ] Modal funktioniert auf Mobile

---

## 🎓 Nächste Schritte

Jetzt wo das Modal installiert ist, kannst du:

1. **Inhalt anpassen** → Siehe [README.md](README.md)
2. **Weitere Beispiele** → Siehe [BEISPIELE.md](BEISPIELE.md)

---

## 💬 Hilfe benötigt?

Wenn etwas nicht funktioniert:

1. Lies diese Anleitung nochmal durch
2. Prüfe die Fehlersuche oben
3. Schaue in die [README.md](README.md)
4. Kontaktiere den Developer

---

**Viel Erfolg! 🚀**
