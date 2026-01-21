#!/bin/bash

# VARIAD Website Starter Script
# Startet die Website auf localhost:5179

# Farben für Output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Port und Verzeichnis definieren
PORT=5179
SITE_DIR="$HOME/site"

echo -e "${GREEN}🚀 VARIAD Website Starter${NC}"
echo "================================"

# Prüfen ob das Verzeichnis existiert
if [ ! -d "$SITE_DIR" ]; then
    echo -e "${RED}❌ Fehler: Verzeichnis $SITE_DIR nicht gefunden!${NC}"
    exit 1
fi

# Prüfen ob Port bereits belegt ist
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Port $PORT ist bereits belegt!${NC}"
    echo "Soll der bestehende Server gestoppt werden? (j/n)"
    read -r answer
    if [ "$answer" = "j" ] || [ "$answer" = "J" ]; then
        echo "Stoppe bestehenden Server..."
        kill $(lsof -t -i:$PORT) 2>/dev/null
        sleep 2
    else
        echo -e "${RED}Abgebrochen.${NC}"
        exit 1
    fi
fi

# In das Site-Verzeichnis wechseln
cd "$SITE_DIR" || exit 1

# Server starten
echo -e "${GREEN}✓${NC} Starte Server auf Port $PORT..."
python3 -m http.server $PORT > /dev/null 2>&1 &
SERVER_PID=$!

# Kurz warten
sleep 2

# Prüfen ob Server läuft
if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Server erfolgreich gestartet!"
    echo ""
    echo "📍 Website erreichbar unter:"
    echo -e "${GREEN}   http://localhost:$PORT${NC}"
    echo ""
    echo "🛑 Zum Stoppen drücke: Ctrl+C"
    echo "   Oder führe aus: kill $SERVER_PID"
    echo ""

    # Browser öffnen (optional)
    echo "Browser öffnen? (j/n)"
    read -r open_browser
    if [ "$open_browser" = "j" ] || [ "$open_browser" = "J" ]; then
        open "http://localhost:$PORT" 2>/dev/null || \
        xdg-open "http://localhost:$PORT" 2>/dev/null || \
        echo "Browser konnte nicht automatisch geöffnet werden."
    fi

    # Warten bis Ctrl+C gedrückt wird
    trap "echo ''; echo 'Server wird gestoppt...'; kill $SERVER_PID 2>/dev/null; echo 'Server gestoppt.'; exit 0" INT
    wait $SERVER_PID
else
    echo -e "${RED}❌ Server konnte nicht gestartet werden!${NC}"
    exit 1
fi
