# 📖 Beispiele & Vorlagen

Fertige Config-Vorlagen für verschiedene Anwendungsfälle. Einfach kopieren und in `config.js` einfügen.

---

## 🎯 Gratis Erstgespräch (Standard)

**Use Case:** Neue Kunden für kostenlose Beratung gewinnen

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🎉 Gratis Social Media Beratung",
    message: "Sichere dir jetzt dein kostenloses 30-Minuten Erstgespräch! Wir analysieren deine Social Media Strategie und geben dir konkrete Tipps.",
    buttonText: "Jetzt Termin sichern",
    buttonLink: "index.html#contact",
    openInNewTab: false,
    closeButtonText: "Nein danke",
    delaySeconds: 5,
    version: "beratung-jan-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 🎁 Sonderangebot / Rabatt

**Use Case:** Zeitlich begrenztes Angebot bewerben

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "⚡ Nur noch 3 Tage!",
    message: "Sichere dir jetzt 20% Rabatt auf dein erstes Social Media Management Paket. Angebot endet am 31. Januar!",
    buttonText: "Jetzt Angebot sichern",
    buttonLink: "social-media-management.html#pakete",
    openInNewTab: false,
    closeButtonText: "Vielleicht später",
    delaySeconds: 3,
    version: "rabatt-januar-2025",
    showOnMobile: true,
    excludePages: ["danke.html"],
    debugMode: false
};
```

---

## 📅 Event-Einladung

**Use Case:** Zu einem Workshop oder Webinar einladen

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🎓 Kostenloser Instagram Workshop",
    message: "Lerne die Basics von Instagram Marketing! 15. Februar 2025, 18:00 Uhr - Online & kostenlos.",
    buttonText: "Jetzt anmelden",
    buttonLink: "https://elopage.com/s/variad/workshop",  // Externes Tool
    openInNewTab: true,
    closeButtonText: "Kein Interesse",
    delaySeconds: 4,
    version: "workshop-feb-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 📱 Social Media Audit

**Use Case:** Kostenlosen Audit als Lead-Magnet

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🔍 Gratis Social Media Audit",
    message: "Wir checken deinen Instagram Account und zeigen dir, was du verbessern kannst - komplett kostenlos!",
    buttonText: "Audit anfragen",
    buttonLink: "beratung.html",
    openInNewTab: false,
    closeButtonText: "Nicht jetzt",
    delaySeconds: 5,
    version: "audit-2025",
    showOnMobile: true,
    excludePages: ["beratung.html"],  // Nicht auf der Zielseite zeigen
    debugMode: false
};
```

---

## 🎬 Portfolio / Case Study

**Use Case:** Neue Arbeit präsentieren

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🎬 Neue Case Study verfügbar",
    message: "Schau dir an, wie wir für einen Kunden 300% mehr Reichweite in 3 Monaten erreicht haben!",
    buttonText: "Case Study ansehen",
    buttonLink: "portfolio.html",
    openInNewTab: false,
    closeButtonText: "Später ansehen",
    delaySeconds: 6,
    version: "case-study-2025",
    showOnMobile: true,
    excludePages: ["portfolio.html"],  // Nicht auf Portfolio zeigen
    debugMode: false
};
```

---

## 📞 Direktkontakt

**Use Case:** Sofortigen Kontakt per Telefon fördern

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "📞 Schnelle Frage?",
    message: "Ruf uns direkt an! Wir sind Mo-Fr von 9-18 Uhr für dich da.",
    buttonText: "Jetzt anrufen",
    buttonLink: "tel:+4915511541310",
    openInNewTab: false,
    closeButtonText: "Lieber schreiben",
    delaySeconds: 8,  // Später erscheinen
    version: "hotline-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## ✉️ Newsletter

**Use Case:** Newsletter-Anmeldungen sammeln

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "📧 Bleib auf dem Laufenden",
    message: "Erhalte monatlich die besten Social Media Tipps direkt in dein Postfach - kostenlos!",
    buttonText: "Zum Newsletter anmelden",
    buttonLink: "index.html#newsletter",  // Dein Newsletter-Formular
    openInNewTab: false,
    closeButtonText: "Kein Interesse",
    delaySeconds: 10,  // Spät erscheinen = weniger aufdringlich
    version: "newsletter-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 🎄 Saisonale Kampagne

**Use Case:** Weihnachten, Ostern, Black Friday etc.

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🎄 Frohe Weihnachten!",
    message: "Unser Geschenk für dich: 15% auf alle Content-Pakete bis zum 24. Dezember!",
    buttonText: "Geschenk einlösen",
    buttonLink: "content-produktion.html",
    openInNewTab: false,
    closeButtonText: "Nein danke",
    delaySeconds: 3,
    version: "weihnachten-2024",
    showOnMobile: true,
    excludePages: ["danke.html"],
    debugMode: false
};
```

---

## 🔥 Dringlichkeit / FOMO

**Use Case:** Letzter Platz verfügbar, limitiertes Angebot

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "⚠️ Nur noch 2 Plätze frei!",
    message: "Wir nehmen diesen Monat nur noch 2 neue Kunden an. Sichere dir jetzt deinen Platz!",
    buttonText: "Platz sichern",
    buttonLink: "index.html#contact",
    openInNewTab: false,
    closeButtonText: "Nicht interessiert",
    delaySeconds: 2,  // Früh zeigen
    version: "limit-feb-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 🆕 Neue Leistung

**Use Case:** Neuen Service ankündigen

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🆕 Neu: TikTok Marketing",
    message: "Ab sofort helfen wir dir auch mit professionellem TikTok Marketing. Jetzt mehr erfahren!",
    buttonText: "TikTok Service ansehen",
    buttonLink: "social-media-management.html",
    openInNewTab: false,
    closeButtonText: "Später",
    delaySeconds: 5,
    version: "tiktok-launch-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 🎓 Lead-Magnet / Freebie

**Use Case:** Kostenloses E-Book, Checkliste, Template

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "📖 Gratis Content-Kalender 2025",
    message: "Lade dir unseren kostenlosen Instagram Content-Kalender für 2025 herunter - mit 365 Post-Ideen!",
    buttonText: "Gratis herunterladen",
    buttonLink: "https://variad.de/downloads/content-kalender",
    openInNewTab: true,
    closeButtonText: "Nicht interessiert",
    delaySeconds: 7,
    version: "freebie-kalender-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 💼 B2B-Angebot

**Use Case:** Spezifisch für Unternehmen

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "🏢 Social Media für B2B",
    message: "Spezielle Pakete für Unternehmen: LinkedIn Strategie + Content + Ads aus einer Hand.",
    buttonText: "B2B-Pakete ansehen",
    buttonLink: "beratung.html",
    openInNewTab: false,
    closeButtonText: "Privatkunde",
    delaySeconds: 5,
    version: "b2b-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 📊 Datengetrieben / ROI

**Use Case:** Performance und Zahlen betonen

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "📊 Messbare Ergebnisse",
    message: "Unsere Kunden erreichen im Schnitt 300% mehr Reichweite in 3 Monaten. Jetzt kostenlos beraten lassen!",
    buttonText: "Kostenlose Analyse",
    buttonLink: "index.html#contact",
    openInNewTab: false,
    closeButtonText: "Später",
    delaySeconds: 5,
    version: "performance-2025",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 🚫 Modal temporär ausschalten

**Use Case:** Während Wartung, nach Kampagnenende etc.

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: false,  // ← Modal ist komplett aus
    // ... Rest bleibt gleich
};
```

---

## 🔧 Test-Modus

**Use Case:** Für Tests - Modal erscheint bei jedem Laden

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "⚠️ TEST-MODUS AKTIV",
    message: "Dies ist ein Test. In Production debugMode auf false setzen!",
    buttonText: "Test",
    buttonLink: "#",
    openInNewTab: false,
    closeButtonText: "Schließen",
    delaySeconds: 1,
    version: "test-v1",
    showOnMobile: true,
    excludePages: [],
    debugMode: true  // ← Ignoriert localStorage
};
```

**⚠️ Wichtig:** Nach Tests `debugMode: false` setzen!

---

## 💡 Kombinationen

Du kannst verschiedene Elemente kombinieren:

### Beispiel: Webinar + Dringlichkeit

```javascript
const ANNOUNCEMENT_CONFIG = {
    enabled: true,
    title: "⚡ Nur noch 10 Plätze! Instagram Masterclass",
    message: "Unser beliebter Instagram Workshop ist fast ausgebucht. Sichere dir jetzt einen der letzten Plätze!",
    buttonText: "Jetzt Platz sichern",
    buttonLink: "https://elopage.com/s/variad/masterclass",
    openInNewTab: true,
    closeButtonText: "Diesmal nicht",
    delaySeconds: 3,
    version: "masterclass-feb-limit",
    showOnMobile: true,
    excludePages: [],
    debugMode: false
};
```

---

## 📝 Tipps für gute Modal-Texte

### Überschrift (Title)
- ✅ Kurz und prägnant (max. 50 Zeichen)
- ✅ Emoji für Aufmerksamkeit (aber nicht übertreiben)
- ✅ Nutzen klar kommunizieren

**Gut:** "🎉 Gratis Social Media Beratung"
**Schlecht:** "Wir haben ein Angebot für Sie"

### Nachricht (Message)
- ✅ Klar und konkret
- ✅ Nutzen / Was bekommt der Kunde?
- ✅ Max. 2 Sätze

**Gut:** "Sichere dir jetzt dein kostenloses 30-Minuten Erstgespräch!"
**Schlecht:** "Wir bieten verschiedene Services an und würden uns freuen..."

### Button-Text (ButtonText)
- ✅ Aktionsaufforderung
- ✅ Beginne mit Verb
- ✅ Max. 3-4 Wörter

**Gut:** "Jetzt Termin sichern"
**Schlecht:** "Klicke hier"

---

## 🎯 Best Practices

1. **Verzögerung:** 3-5 Sekunden optimal
2. **Version ändern:** Bei jedem neuen Angebot
3. **Exclude Pages:** Danke-Seiten ausschließen
4. **Mobile:** Immer auch mobil testen
5. **A/B-Testing:** Verschiedene Texte testen

---

**Viel Erfolg mit deinen Kampagnen! 🚀**
