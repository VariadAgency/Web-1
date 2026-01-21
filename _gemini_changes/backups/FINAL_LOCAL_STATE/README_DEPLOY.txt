# Deployment Anleitung (VARIAD Website)

Diese Version der Website ist technisch optimiert (getrenntes HTML/CSS/JS, SEO-Tags, Performance).

## 🚀 Was muss hochgeladen werden?

Lade folgende Dateien und Ordner in das Hauptverzeichnis deines Webservers (z.B. via FTP oder Netlify/Vercel):

1.  📄 **index.html** (Die Hauptseite)
2.  📁 **assets/** (Enthält `css/style.css` und `js/main.js`)
3.  📁 **images/** (Alle Bilder)
4.  📁 **videos/** (Alle Videos)

## 🛑 Was NICHT hochladen?

Folgende Ordner sind nur für die Entwicklung/Sicherung gedacht und gehören nicht auf den öffentlichen Server:

- ❌ **_gemini_changes/** (Enthält Backups und Protokolle)
- ❌ **_extract_*.py** (Falls noch Skripte herumliegen)
- ❌ **server.log** (Log-Dateien)

## ✅ Checkliste nach dem Upload

1.  Rufe die Seite auf.
2.  Prüfe, ob das Layout stimmt (CSS geladen?).
3.  Prüfe, ob Animationen funktionieren (JS geladen?).
4.  Prüfe, ob Bilder/Videos sichtbar sind.

Viel Erfolg beim Launch! 🚀
