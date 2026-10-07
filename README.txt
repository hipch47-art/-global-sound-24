GLOBAL SOUND 24 V146 — BACKEND SOURCE CONNECTION TEST

This version adds a static source catalog endpoint:
  sources.json

The App loads sources.json at startup and uses each source.streamUrl for real HTML5 audio playback.

IMPORTANT:
- The included BBC stream is TEST ONLY and is NOT a rights clearance for a commercial app.
- Do not publish this source in the App Store until technical/content/rights review is completed.
- GitHub Pages is static hosting, so sources.json is the current lightweight "catalog backend". A real production backend should later use an authenticated database/API.

Upload these files to GitHub Pages:
  index.html
  sources.json
  manifest.webmanifest
  sw.js

Playback flow:
connect -> audio.play() -> playing event -> vinyl starts spinning.
error -> vinyl stays stopped.
