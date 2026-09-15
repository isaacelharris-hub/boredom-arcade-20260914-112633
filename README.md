# Boredom Arcade — World Atlas

A premium, fast country browser. Search or filter every country in the
world, open a full breakdown of everything about it, and compare any two
countries side by side.

## Features

- Instant country browser: search, filter by region, sort by name /
  population / area
- Full country profile: identity, geography, demographics, economy,
  society, codes & misc (ISO codes, calling codes, TLDs, driving side,
  coat of arms, Gini index, and more)
- Optional live economic indicators (GDP, inflation, unemployment, internet
  usage, life expectancy) pulled from the World Bank on demand
- Side-by-side country comparison
- Fully responsive: desktop side panel, mobile bottom sheet
- Offline-first: all core country data is bundled locally in
  `atlas-data.json`, so the atlas works even if external APIs are down
- No 3D rendering — lightweight and fast on any device

## Data sources

- Country data: the dataset behind REST Countries (mirrored as static JSON
  on GitHub for reliability)
- Optional economic indicators: World Bank Open Data (fetched on demand
  only, never required for the site to function)

## Structure

- `index.html` — the entire application (HTML, CSS, JS)
- `atlas-data.json` — bundled country data
- `.nojekyll` — disables Jekyll processing on GitHub Pages

Built for Boredom Arcade.
