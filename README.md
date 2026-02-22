# 🌊 Sea Glass Thailand — Probability Map

An interactive web map that identifies Thai coastal zones with high sea glass probability, crossing oceanographic, historical, geomorphological, and legal data. Built as a proof of concept to demonstrate that predictive mapping of sea glass accumulation zones is feasible and useful.

![screenshot](./screenshot.png)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/sea-glass-thailand.git
cd sea-glass-thailand

# Copy env and add your Mapbox token
cp .env.example .env.local

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mapbox Token

This project requires a **Mapbox access token** to render the map.

1. Create a free account at [mapbox.com](https://www.mapbox.com/)
2. Go to [Account → Access tokens](https://account.mapbox.com/access-tokens/)
3. Copy your default public token
4. Paste it in `.env.local`:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
```

## Project Structure

```
sea-glass-thailand/
├── public/data/
│   ├── zones.geojson              # 23 scored coastal zones
│   ├── protected-areas.geojson    # 11 national parks
│   └── rivers.geojson             # 9 river mouths
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata)
│   │   ├── page.tsx               # Main page (map + sidebar)
│   │   └── globals.css            # Tailwind theme + animations
│   ├── components/
│   │   ├── Map/
│   │   │   ├── MapContainer.tsx   # Main map wrapper + interactions
│   │   │   ├── ZoneLayer.tsx      # Score-driven circle layer
│   │   │   ├── ProtectedLayer.tsx # National park polygons
│   │   │   ├── RiverLayer.tsx     # Pulsing river mouth markers
│   │   │   ├── ZonePopup.tsx      # Rich zone info popup
│   │   │   └── ProtectedPopup.tsx # Legal warning popup
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx        # Sidebar container
│   │   │   ├── StatsPanel.tsx     # Key statistics
│   │   │   ├── LegendPanel.tsx    # Color & symbol legend
│   │   │   ├── FiltersPanel.tsx   # Score filters & toggles
│   │   │   ├── TopSpotsPanel.tsx  # Top 6 zones ranking
│   │   │   └── MethodologyPanel.tsx
│   │   ├── Header.tsx             # App header bar
│   │   └── MobileDrawer.tsx       # Bottom-sheet for mobile
│   ├── store/
│   │   └── useMapStore.ts         # Zustand state (filters, selection)
│   └── lib/
│       ├── types.ts               # TypeScript interfaces
│       ├── scoring.ts             # Score computation formula
│       ├── colors.ts              # Score → color/label mapping
│       └── useZones.ts            # GeoJSON loader + filter hook
├── .env.example
├── next.config.js
├── tsconfig.json
└── package.json
```

## Scoring Methodology

Each coastal zone is scored from 0 to 1 using a weighted formula:

```
Score = 0.25 × Historical + 0.25 × Morphology + 0.20 × River + 0.15 × Ocean + 0.15 × Population
```

### Sub-scores

| Factor | Weight | Description |
|--------|--------|-------------|
| **Historical** (M_hist) | 25% | Proximity to historical landfills, industrial sites, and old ports — the primary sources of glass entering the ocean decades ago. |
| **Morphology** (M_morpho) | 25% | Coastal geomorphology favorable to accumulation: rocky beaches, sheltered coves, headlands that trap debris. |
| **River** (M_river) | 20% | Proximity to river mouths and upstream population density — rivers carry glass waste from inland cities to the coast. |
| **Ocean** (M_ocean) | 15% | Exposure to dominant currents and wave patterns that push floating debris toward the shore. |
| **Population** (M_pop) | 15% | Historical coastal population density — a proxy for the amount of glass waste generated near the shoreline. |

### Classification

| Classification | Score Range | Zones |
|---------------|-------------|-------|
| Very High | ≥ 75% | 2 |
| High | 55–74% | 8 |
| Medium | 35–54% | 13 |
| Low | 15–34% | 0 |
| Very Low | < 15% | 0 |

## Data Sources

- **Coastal zones**: 23 locations manually selected based on satellite imagery, OpenStreetMap data, and academic literature on marine debris in the Gulf of Thailand and Andaman Sea.
- **Protected areas**: 11 national parks from Thailand's Department of National Parks (DNP), governed by the National Park Act B.E. 2562 (2019).
- **River mouths**: 9 major river outlets with upstream population estimates from national census data.
- **Ocean currents**: General patterns from OSCAR (Ocean Surface Current Analysis Real-time).
- **Geomorphology**: Coastal classification from Sentinel-2 satellite imagery interpretation.

> **Note**: All scores in this PoC are expert estimates. A production version would compute them from real datasets (OSCAR, HydroSHEDS, Sentinel-2, OSM).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Map | Mapbox GL JS via react-map-gl v7 |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Geo computation | Turf.js |
| Icons | Lucide React |
| Deployment | Vercel |

## Roadmap

Future improvements beyond this PoC:

- **Real data pipeline** — Replace estimated scores with computed values from OSCAR, Sentinel-2, HydroSHEDS, and OSM
- **Supabase backend** — Migrate GeoJSON to PostGIS with materialized views for dynamic scoring
- **Crowdsourcing** — User-submitted finds (photo + geolocation) with feedback loop on score accuracy
- **Geographic expansion** — Vietnam, Philippines, Japan, California coast
- **WDPA integration** — Replace approximate circles with real protected area polygons
- **PWA mode** — Offline support, geolocation, "spots near me"
- **Real-time data** — Live ocean currents and wave height via Stormglass or CMEMS

## License

MIT
