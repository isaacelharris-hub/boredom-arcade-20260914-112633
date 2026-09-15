# Boredom Arcade — World Atlas

A premium, interactive 3D world atlas. Explore every country on a real
globe, hover to reveal national flags, search instantly, dig into detailed
country statistics, and compare any two countries side by side.

## Features

- Interactive 3D globe built with Three.js and globe.gl
- Hover a country to see it rise slightly and reveal its flag
- Command-palette style search (name, official name, ISO alpha-2/alpha-3)
- Detailed country panel: identity, geography, demographics, economy
- Side-by-side country comparison
- Fully responsive: desktop side panel, mobile bottom sheet
- Offline-first: all core geographic and country data is bundled locally
  in `atlas-data.json`, so the atlas works even if external APIs are down
- Graceful fallback directory if the 3D globe cannot initialize

## Data sources

- Country data: REST Countries
- Geographic boundaries: geo-countries (Natural Earth derived GeoJSON)
- Optional economic indicators: World Bank Open Data (fetched on demand
  only, never required for the site to function)

## Structure

- `index.html` — the entire application (HTML, CSS, JS)
- `atlas-data.json` — bundled country + geographic data
- `.nojekyll` — disables Jekyll processing on GitHub Pages

Built for Boredom Arcade.
