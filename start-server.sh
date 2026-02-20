#!/bin/bash

# Lokaler Webserver für Web-1-main
# Standardport: 8000

PORT=${1:-8000}

echo "🚀 Starte lokalen Webserver..."
echo "📁 Verzeichnis: $(pwd)"
echo "🌐 URL: http://localhost:$PORT"
echo ""
echo "Drücke Ctrl+C zum Beenden"
echo ""

python3 -m http.server $PORT
