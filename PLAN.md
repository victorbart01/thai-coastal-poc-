# 🌊 SEA GLASS THAILAND — Plan de réalisation avec Claude Code

## Comment utiliser ce document

Ce fichier est conçu pour être utilisé **comme contexte principal** dans Claude Code.
Lance Claude Code dans un dossier vide puis donne-lui ce fichier :

```bash
# 1. Créer le projet
mkdir sea-glass-thailand && cd sea-glass-thailand

# 2. Lancer Claude Code
claude

# 3. Dans Claude Code, coller :
# "Voici le plan du projet. Lis-le intégralement puis exécute-le phase par phase.
#  Attends ma validation entre chaque phase avant de passer à la suivante."
# Puis coller le contenu de ce fichier (ou le référencer si tu l'as placé dans le dossier)
```

---

## 0. Vision du projet

### Quoi
Une carte interactive web permettant d'identifier les zones côtières de Thaïlande à forte probabilité de contenir du sea glass (verre poli par la mer), avec affichage des contraintes légales de collecte.

### Pour qui
Collectionneurs de sea glass, beachcombers, touristes curieux, artisans.

### Différenciateur
Aucun outil existant ne croise données océanographiques + historiques + géomorphologiques + légales pour prédire les zones d'accumulation de sea glass. Les guides actuels sont purement anecdotiques.

### Ton & esthétique
**"Deep ocean cartography"** — Interface sombre et immersive évoquant les cartes marines et l'exploration sous-marine. Palette de bleus profonds avec des accents cyan lumineux. Typographie nette et technique. L'interface doit donner l'impression de consulter un instrument d'exploration maritime sophistiqué, pas un dashboard corporate générique.

---

## 1. Stack technique

| Couche | Choix | Justification |
|--------|-------|---------------|
| Framework | **Next.js 14+ (App Router)** | SSR pour le SEO des spots, RSC pour les données |
| Langage | **TypeScript** (strict) | Typage des GeoJSON, scores, etc. |
| Cartographie | **Mapbox GL JS** via `react-map-gl` | Rendu WebGL performant, styles custom, tuiles vectorielles |
| Styling | **Tailwind CSS 4** | Utility-first, cohérent, rapide |
| State | **Zustand** | Léger, parfait pour les filtres/état carte |
| Base de données | **Supabase** (PostgreSQL + PostGIS) | Requêtes géospatiales, API REST auto, gratuit en dev |
| Données | GeoJSON statiques pour le PoC (migration Supabase plus tard) | Simplicité pour itérer vite |
| Déploiement | **Vercel** | Intégration native Next.js |
| Linting | ESLint + Prettier | Qualité de code |

### Dépendances npm exactes

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "react-map-gl": "^7.1",
    "mapbox-gl": "^3.9",
    "@turf/turf": "^7.2",
    "zustand": "^5.0",
    "lucide-react": "^0.460"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "@types/react": "^18.3",
    "@types/node": "^22",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "postcss": "^8",
    "eslint": "^9",
    "eslint-config-next": "^14.2",
    "prettier": "^3",
    "@types/mapbox-gl": "^3"
  }
}
```

> **Note :** Le token Mapbox sera stocké dans `.env.local` sous `NEXT_PUBLIC_MAPBOX_TOKEN`.
> Pour le PoC, utiliser le style `mapbox://styles/mapbox/dark-v11` puis le customiser.

---

## 2. Structure du projet

```
sea-glass-thailand/
├── public/
│   └── data/
│       ├── zones.geojson            # Zones scorées (points)
│       ├── protected-areas.geojson  # Parcs nationaux (polygones)
│       ├── rivers.geojson           # Embouchures de rivières (points)
│       └── thailand-coast.geojson   # Trait de côte simplifié (optionnel)
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (fonts, metadata)
│   │   ├── page.tsx                 # Page unique (la carte)
│   │   └── globals.css              # Tailwind + custom CSS
│   ├── components/
│   │   ├── Map/
│   │   │   ├── MapContainer.tsx     # Wrapper react-map-gl
│   │   │   ├── ZoneLayer.tsx        # Couche des zones scorées
│   │   │   ├── ProtectedLayer.tsx   # Couche des zones protégées
│   │   │   ├── RiverLayer.tsx       # Couche des embouchures
│   │   │   ├── ZonePopup.tsx        # Popup au clic sur une zone
│   │   │   └── ProtectedPopup.tsx   # Popup zone protégée
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx          # Container sidebar
│   │   │   ├── StatsPanel.tsx       # Statistiques en haut
│   │   │   ├── LegendPanel.tsx      # Légende couleurs
│   │   │   ├── FiltersPanel.tsx     # Filtres et slider
│   │   │   ├── TopSpotsPanel.tsx    # Classement des meilleurs spots
│   │   │   └── MethodologyPanel.tsx # Explication du scoring
│   │   ├── Header.tsx               # Barre de titre
│   │   └── MobileDrawer.tsx         # Sidebar en drawer sur mobile
│   ├── store/
│   │   └── useMapStore.ts           # Zustand : filtres, zone sélectionnée, viewport
│   ├── lib/
│   │   ├── scoring.ts               # Logique de calcul du score
│   │   ├── colors.ts                # Palette et mapping score → couleur
│   │   └── types.ts                 # Types TypeScript
│   └── data/
│       └── zones-data.ts            # Données en dur pour le PoC (fallback si pas de GeoJSON)
├── .env.local                       # NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
├── .env.example                     # Template sans la clé
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 3. Données — Schéma & contenu

### 3.1 Types TypeScript (`src/lib/types.ts`)

```typescript
export interface SeaGlassZone {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  score: number; // 0–1, score total pondéré
  subscores: {
    historical: number;  // M_hist : proximité décharges/industries
    morphology: number;  // M_morpho : type de côte favorable
    river: number;       // M_river : proximité embouchure + pop amont
    ocean: number;       // M_ocean : exposition courants dominants
    population: number;  // M_pop : densité historique côtière
  };
  category: 'river_delta' | 'industrial' | 'urban_coast' | 'island' | 'river_mouth' | 'natural';
  classification: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  notes: string; // Description en 1-2 phrases
  region: 'upper_gulf' | 'eastern_seaboard' | 'central_gulf' | 'lower_gulf' | 'andaman';
}

export interface ProtectedArea {
  id: string;
  name: string;
  coordinates: [number, number]; // centroïde
  radiusKm: number;
  status: 'prohibited' | 'restricted';
  legalBasis: string;
  notes: string;
}

export interface RiverMouth {
  id: string;
  name: string;
  coordinates: [number, number];
  populationUpstream: string; // ex: "12M+"
  majorCity: string; // ville principale en amont
}

export type ScoreFilter = {
  minScore: number;
  showHigh: boolean;
  showMedium: boolean;
  showLow: boolean;
  showProtected: boolean;
  showRivers: boolean;
};
```

### 3.2 Données des zones (`public/data/zones.geojson`)

Convertir les données ci-dessous en GeoJSON FeatureCollection valide.
Chaque Feature est un Point avec les properties correspondant à `SeaGlassZone`.

**IMPORTANT** : Le score total est calculé par la formule :

```
score = 0.25 * historical + 0.25 * morphology + 0.20 * river + 0.15 * ocean + 0.15 * population
```

Voici les **23 zones** à inclure (données complètes) :

#### Upper Gulf (Golfe supérieur)

| Nom | Lng | Lat | hist | morpho | river | ocean | pop | Catégorie | Notes |
|-----|-----|-----|------|--------|-------|-------|-----|-----------|-------|
| Embouchure Chao Phraya (Samut Prakan) | 100.58 | 13.52 | 0.95 | 0.55 | 1.00 | 0.75 | 0.95 | river_delta | Source #1 : 10M+ habitants en amont, décharges historiques massives, ancien port industriel |
| Bang Saen / Ang Sila | 100.92 | 13.30 | 0.85 | 0.70 | 0.60 | 0.70 | 0.90 | urban_coast | Ancienne station balnéaire (1950s+), côte rocheuse, ancien village de pêcheurs avec déchets côtiers historiques |
| Si Racha / Laem Chabang | 100.93 | 13.17 | 0.95 | 0.65 | 0.50 | 0.75 | 0.90 | industrial | Zone portuaire majeure depuis 1980s, industries lourdes, plages rocheuses avec accumulation de débris |
| Pattaya Sud / Jomtien | 100.87 | 12.90 | 0.80 | 0.50 | 0.40 | 0.65 | 0.95 | urban_coast | Tourisme de masse depuis 1960s, forte densité historique de déchets, plages mixtes sable/roche |
| Koh Larn (face Pattaya) | 100.78 | 12.92 | 0.60 | 0.80 | 0.30 | 0.80 | 0.65 | island | Île touristique, criques rocheuses abritées, collecte de débris marins par les courants du golfe |

#### Eastern Seaboard

| Nom | Lng | Lat | hist | morpho | river | ocean | pop | Catégorie | Notes |
|-----|-----|-----|------|--------|-------|-------|-----|-----------|-------|
| Rayong — Map Ta Phut | 101.17 | 12.67 | 1.00 | 0.70 | 0.55 | 0.80 | 0.80 | industrial | Plus grande zone pétrochimique d'Asie du Sud-Est, plages rocheuses adjacentes, décharges industrielles historiques |
| Koh Samet (côte ouest) | 101.44 | 12.57 | 0.40 | 0.75 | 0.25 | 0.70 | 0.50 | island | Île en face de la zone industrielle de Rayong, criques rocheuses, courants transportant des débris |
| Chanthaburi — embouchure | 102.00 | 12.47 | 0.55 | 0.50 | 0.85 | 0.45 | 0.55 | river_mouth | Rivière Chanthaburi : ville historique de gemmes, ancienne industrie, embouchure avec mangroves |
| Koh Chang (côte est) | 102.36 | 12.07 | 0.30 | 0.75 | 0.40 | 0.55 | 0.35 | island | Plages rocheuses côté est exposées aux courants, moins touristique, accumulation naturelle |

#### Central & Lower Gulf

| Nom | Lng | Lat | hist | morpho | river | ocean | pop | Catégorie | Notes |
|-----|-----|-----|------|--------|-------|-------|-----|-----------|-------|
| Hua Hin — Khao Takiab | 99.96 | 12.54 | 0.55 | 0.65 | 0.25 | 0.50 | 0.60 | urban_coast | Station balnéaire royale depuis 1920s, cap rocheux de Khao Takiab, vieille ville |
| Chumphon — Pak Nam | 99.20 | 10.47 | 0.35 | 0.55 | 0.70 | 0.40 | 0.40 | river_mouth | Embouchure rivière Chumphon, port de pêche historique |
| Surat Thani — embouchure Tapi | 99.33 | 9.15 | 0.55 | 0.45 | 0.90 | 0.50 | 0.60 | river_delta | Rivière Tapi, ville historique, port commercial, delta large |
| Koh Samui (côte NE) | 100.10 | 9.58 | 0.40 | 0.70 | 0.20 | 0.60 | 0.55 | island | Tourisme massif depuis 1980s, plages rocheuses au NE, débris transportés par la mousson NE |
| Koh Phangan (côte sud) | 100.03 | 9.72 | 0.30 | 0.70 | 0.15 | 0.55 | 0.40 | island | Criques rocheuses abritées côté sud, courants du golfe |
| Nakhon Si Thammarat — Pak Phanang | 100.20 | 8.35 | 0.50 | 0.45 | 0.80 | 0.50 | 0.50 | river_mouth | Grande rivière Pak Phanang, ancienne cité commerciale, lagune côtière |
| Songkhla — embouchure du lac | 100.59 | 7.19 | 0.70 | 0.60 | 0.90 | 0.55 | 0.70 | river_delta | Lac Songkhla → mer, ancienne ville portuaire chinoise, zone industrielle Hat Yai en amont |

#### Andaman Sea

| Nom | Lng | Lat | hist | morpho | river | ocean | pop | Catégorie | Notes |
|-----|-----|-----|------|--------|-------|-------|-----|-----------|-------|
| Ranong — embouchure Kra Buri | 98.60 | 9.97 | 0.35 | 0.60 | 0.65 | 0.35 | 0.30 | river_mouth | Rivière Kra Buri (frontière Myanmar), anciennes mines d'étain |
| Phuket — Patong / côte ouest | 98.28 | 7.89 | 0.50 | 0.60 | 0.20 | 0.65 | 0.75 | urban_coast | Tourisme massif depuis 1970s, anciennes mines d'étain, exposition mousson SW |
| Phuket — côte est (Saphan Hin) | 98.38 | 7.87 | 0.75 | 0.55 | 0.30 | 0.50 | 0.80 | urban_coast | Ancien quartier industriel/portuaire de Phuket Town, ancienne décharge de Saphan Hin |
| Phang Nga — côte mangrove | 98.52 | 8.45 | 0.20 | 0.45 | 0.50 | 0.30 | 0.25 | natural | Zone de mangroves, faible densité historique, mais concentration par les racines |
| Krabi — Ao Nang | 98.82 | 8.03 | 0.30 | 0.65 | 0.35 | 0.40 | 0.40 | urban_coast | Tourisme croissant, criques calcaires avec piégeage naturel |
| Trang — Hat Chao Mai | 99.28 | 7.40 | 0.25 | 0.55 | 0.45 | 0.35 | 0.35 | natural | Côte relativement préservée, rivière Trang, plages mixtes |
| Satun — Pak Bara | 99.75 | 6.87 | 0.20 | 0.50 | 0.40 | 0.35 | 0.30 | natural | Port vers les îles, côte peu industrialisée |

### 3.3 Zones protégées (`public/data/protected-areas.geojson`)

| Nom | Lng | Lat | Rayon km | Statut | Base légale |
|-----|-----|-----|----------|--------|-------------|
| Mu Ko Similan NP | 97.64 | 8.65 | 15 | prohibited | National Park Act B.E. 2562 (2019) |
| Mu Ko Surin NP | 97.87 | 9.38 | 12 | prohibited | National Park Act B.E. 2562 (2019) |
| Ao Phang Nga NP | 98.50 | 8.28 | 10 | prohibited | National Park Act B.E. 2562 (2019) |
| Hat Noppharat Thara - Mu Ko Phi Phi NP | 98.77 | 7.74 | 18 | prohibited | National Park Act B.E. 2562 (2019) |
| Mu Ko Ang Thong NP | 99.68 | 9.62 | 12 | prohibited | National Park Act B.E. 2562 (2019) |
| Khao Sam Roi Yot NP | 99.95 | 12.15 | 8 | prohibited | National Park Act B.E. 2562 (2019) |
| Mu Ko Chang NP | 102.30 | 12.00 | 20 | prohibited | National Park Act B.E. 2562 (2019) |
| Hat Chao Mai NP | 99.27 | 7.38 | 10 | prohibited | National Park Act B.E. 2562 (2019) |
| Tarutao NP | 99.65 | 6.60 | 25 | prohibited | National Park Act B.E. 2562 (2019) |
| Khao Laem Ya - Mu Ko Samet NP | 101.46 | 12.57 | 8 | restricted | National Park Act B.E. 2562 (2019) |
| Sirinat NP (Phuket) | 98.30 | 8.12 | 5 | prohibited | National Park Act B.E. 2562 (2019) |

### 3.4 Embouchures de rivières (`public/data/rivers.geojson`)

| Nom | Lng | Lat | Pop. amont | Ville principale |
|-----|-----|-----|------------|------------------|
| Chao Phraya | 100.58 | 13.54 | 12M+ | Bangkok |
| Bang Pakong | 100.98 | 13.45 | 2M+ | Chachoengsao |
| Tapi | 99.32 | 9.16 | 500K+ | Surat Thani |
| Pak Phanang | 100.18 | 8.37 | 300K+ | Nakhon Si Thammarat |
| Songkhla Lake outlet | 100.58 | 7.20 | 1.5M+ | Hat Yai |
| Chanthaburi | 102.01 | 12.48 | 200K+ | Chanthaburi |
| Kra Buri | 98.62 | 9.98 | 150K+ | Ranong |
| Trang | 99.30 | 7.42 | 250K+ | Trang |
| Chumphon | 99.18 | 10.48 | 200K+ | Chumphon |

---

## 4. Phases de réalisation

### PHASE 1 — Scaffolding & configuration

**Objectif** : Projet qui compile, carte qui s'affiche.

Tâches :
1. `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir`
2. Installer les dépendances (voir section 1)
3. Configurer `.env.local` avec un placeholder pour le token Mapbox
4. Configurer Tailwind avec la palette custom (voir section 5.1)
5. Créer le layout root avec les fonts (voir section 5.2)
6. Créer une page unique `src/app/page.tsx` qui affiche la carte Mapbox centrée sur la Thaïlande [101, 12.5] zoom 6, style dark
7. Vérifier que `npm run dev` fonctionne et que la carte s'affiche

**Critère de validation** : Carte Mapbox sombre visible en plein écran, aucune erreur console.

---

### PHASE 2 — Données & store

**Objectif** : Données GeoJSON générées, store Zustand fonctionnel.

Tâches :
1. Créer `src/lib/types.ts` (voir section 3.1)
2. Créer `src/lib/scoring.ts` avec la fonction de calcul du score et la classification
3. Créer `src/lib/colors.ts` avec le mapping score → couleur (voir section 5.3)
4. Générer les 3 fichiers GeoJSON dans `public/data/` à partir des tableaux de la section 3
5. Créer `src/store/useMapStore.ts` — Zustand store contenant :
   - `filters: ScoreFilter` (état des filtres)
   - `selectedZone: SeaGlassZone | null`
   - `viewport: { latitude, longitude, zoom }`
   - Actions : `setFilter`, `selectZone`, `clearSelection`, `setViewport`, `flyTo`
6. Créer un hook `src/lib/useZones.ts` qui charge les GeoJSON et applique les filtres du store

**Critère de validation** : `console.log` dans la page affiche les 23 zones chargées et filtrées.

---

### PHASE 3 — Couches cartographiques

**Objectif** : Les 3 couches s'affichent correctement sur la carte.

Tâches :
1. **ZoneLayer** : Cercles proportionnels au score, couleur selon classification.
   - Rayon : `6 + score * 16` pixels
   - Opacité fill : 0.7, stroke : 2px même couleur
   - Au hover : augmenter le rayon de 4px et opacité à 0.9
   - Au clic : ouvrir le popup et setter `selectedZone` dans le store
   - Utiliser des Mapbox `circle` layers avec des expressions data-driven

2. **ProtectedLayer** : Cercles rouge semi-transparent avec bordure dashed.
   - Couleur : `#ef4444` avec fill opacity 0.08, stroke opacity 0.5
   - Rayon calculé depuis `radiusKm` en pixels via expression Mapbox
   - Au clic : popup avec le nom, statut, base légale

3. **RiverLayer** : Marqueurs bleus pulsants aux embouchures.
   - Cercle bleu `#60a5fa`, bordure dashed
   - Animation CSS pulse pour attirer l'attention
   - Au clic : popup avec nom, population amont, ville

4. Respecter l'ordre des couches : Protected (fond) → Rivers → Zones (dessus)

**Critère de validation** : Les 3 couches sont visibles, cliquables, avec popups corrects.

---

### PHASE 4 — Sidebar & filtres

**Objectif** : Sidebar complète et fonctionnelle, filtres connectés au store.

#### 4.1 Layout

La page est un grid `340px 1fr` (sidebar + carte). Sur mobile (< 768px), la sidebar devient un drawer bottom-sheet glissant vers le haut.

#### 4.2 Composants de la sidebar (de haut en bas)

1. **StatsPanel** — 4 cartes statistiques en grid 2×2 :
   - Zones affichées (réactif aux filtres)
   - Zones haute probabilité (score ≥ 0.55)
   - Zones protégées affichées
   - km de côtes (fixe : 3,219)

2. **LegendPanel** — Légende des couleurs et symboles :
   - 5 niveaux de score avec dot coloré
   - Symbole zone protégée (cercle rouge vide)
   - Symbole embouchure (cercle bleu dashed)

3. **FiltersPanel** — Contrôles interactifs :
   - 5 checkboxes : Haute/Très haute, Modérée, Faible, Zones protégées, Rivières
   - 1 range slider : Score minimum (0.00 → 1.00)
   - Chaque changement dispatch dans le Zustand store → re-filtrage réactif

4. **TopSpotsPanel** — Liste scrollable des 6 meilleures zones :
   - Card avec nom, score %, catégorie, barre de progression colorée
   - Au clic : `flyTo` sur la zone + ouvrir le popup
   - Trié par score décroissant, réactif aux filtres

5. **MethodologyPanel** — Texte explicatif (collapsible) :
   - Formule du score
   - Description de chaque sous-score
   - Sources de données

**Critère de validation** : Chaque filtre met à jour la carte ET les stats en temps réel. Cliquer un spot dans le top déplace la carte.

---

### PHASE 5 — Popups & interactions

**Objectif** : Popups riches, transitions fluides, interactions naturelles.

#### 5.1 Popup Zone (ZonePopup)

Contenu :
- Nom de la zone (titre)
- Score total en grand avec couleur
- 5 barres de progression horizontales pour chaque sous-score (avec label et %)
- Texte de notes (description)
- Badge catégorie (couleur selon type)
- Si la zone est dans un rayon de zone protégée : avertissement rouge

Style :
- Background sombre `#1a2540`, bordure cyan subtile
- Border-left colorée selon le score
- Coins arrondis 12px, ombre portée forte

#### 5.2 Popup Zone protégée (ProtectedPopup)

Contenu :
- Icône ⛔ + nom
- Statut (interdit / restreint)
- Base légale
- Note explicative sur le National Park Act

Style : bordure gauche rouge

#### 5.3 Interactions carte

- **Hover zone** : cursor pointer, léger grossissement du cercle
- **Clic zone** : popup s'ouvre, sidebar highlight le spot correspondant
- **Clic spot sidebar** : flyTo animé (duration 1.5s, zoom 11), popup s'ouvre
- **Double-clic carte** : zoom in standard
- **Scroll zoom** : activé
- **Clic hors popup** : ferme popup, déselectionne dans le store

**Critère de validation** : Toutes les interactions sont fluides, aucun état incohérent entre sidebar et carte.

---

### PHASE 6 — Design & polish

**Objectif** : Interface visuellement excellente, responsive, prête à montrer.

#### 6.1 Direction artistique

Le thème est **"Deep ocean cartography"** :
- Background : dégradé très sombre de `#0a0f1a` à `#0d1b2a`
- Surfaces : `#0d1525` (sidebar), `#1e293b` (cards), avec bordures `rgba(255,255,255,0.06)`
- Accents primaires : `#38bdf8` (cyan clair), `#06b6d4` (teal), `#22d3ee` (cyan vif)
- Danger : `#ef4444` (zones protégées)
- Texte : `#f0f6fc` (titres), `#e0e6ed` (corps), `#94a3b8` (secondaire), `#64748b` (tertiaire)
- Ombres : ombres profondes et diffuses, jamais de box-shadow flat

#### 6.2 Typographie

- **Font display** : `"JetBrains Mono"` ou `"Space Grotesk"` (via Google Fonts / next/font) pour les titres et valeurs numériques — donne un aspect technique/cartographique
- **Font body** : `"DM Sans"` ou `"Outfit"` pour le texte courant — lisible et moderne
- Importation via `next/font/google` pour l'optimisation automatique

> IMPORTANT : Ne PAS utiliser Inter, Roboto, ou Arial. Le choix de font doit être distinctif.

#### 6.3 Animations

- **Entrée sidebar** : stagger reveal des panels (chaque panel arrive avec 80ms de délai)
- **Barres de score** : animation de remplissage de gauche à droite au premier render (0.5s ease-out)
- **Cercles zones** : transition CSS sur le rayon au hover
- **FlyTo** : animation Mapbox native (duration: 1500ms, curve: 1.42)
- **Pulse rivières** : animation CSS `@keyframes pulse` sur les embouchures

#### 6.4 Responsive

- **Desktop** (≥ 1024px) : sidebar fixe à gauche (340px) + carte
- **Tablet** (768–1023px) : sidebar réductible (bouton toggle), carte pleine largeur
- **Mobile** (< 768px) : carte plein écran, sidebar en bottom-sheet draggable (position initiale : 30% de la hauteur, extensible à 80%). Un grab handle en haut du sheet. Les popups Mapbox restent natifs.

#### 6.5 Header

Barre fine en haut (48px), contenant :
- Logo (emoji 🌊 dans un carré arrondi avec gradient cyan)
- Titre "Sea Glass Probability Map"
- Badge "PoC THAÏLANDE"
- Aligné avec le grid sidebar/carte

#### 6.6 Détails de polish

- Scrollbar custom dans la sidebar (fine, couleur cyan)
- Transitions sur tous les changements d'état (200ms ease)
- Focus-visible sur les éléments interactifs (outline cyan)
- Les pourcentages utilisent une font monospace pour l'alignement
- Les cards au hover ont un léger shift de border-color vers cyan

**Critère de validation** : L'interface est visuellement cohérente, les animations sont fluides (60fps), le responsive fonctionne sur les 3 breakpoints.

---

### PHASE 7 — README & documentation

**Objectif** : Projet documenté, prêt à être partagé.

Le README.md doit contenir :

1. **Titre + description** (1 paragraphe)
2. **Screenshot** (placeholder `![screenshot](./screenshot.png)`)
3. **Quick start** : `git clone`, `cp .env.example .env.local`, `npm install`, `npm run dev`
4. **Obtenir un token Mapbox** : lien vers mapbox.com/account/access-tokens
5. **Structure du projet** (arbre simplifié)
6. **Méthodologie du scoring** : formule + description des 5 sous-scores
7. **Sources de données** : liste avec liens
8. **Roadmap** : futures améliorations (Supabase, crowdsourcing, données satellite réelles, extension géographique)
9. **Licence** : MIT

---

## 5. Références design

### 5.1 Palette CSS (Tailwind extend)

```typescript
// tailwind.config.ts — extend colors
{
  ocean: {
    950: '#0a0f1a',
    900: '#0d1525',
    800: '#0d1b2a',
    700: '#1a2540',
    600: '#1e293b',
    500: '#334155',
    400: '#475569',
  },
  glass: {
    DEFAULT: '#38bdf8',
    bright: '#22d3ee',
    deep: '#06b6d4',
    muted: '#0ea5e9',
  },
  score: {
    veryHigh: '#06b6d4',
    high: '#22d3ee',
    medium: '#facc15',
    low: '#fb923c',
    veryLow: '#64748b',
  },
  danger: '#ef4444',
  river: '#60a5fa',
}
```

### 5.2 Mapping Score → Visuel (`src/lib/colors.ts`)

```typescript
export function getScoreColor(score: number): string {
  if (score >= 0.75) return '#06b6d4';
  if (score >= 0.55) return '#22d3ee';
  if (score >= 0.35) return '#facc15';
  if (score >= 0.15) return '#fb923c';
  return '#64748b';
}

export function getScoreLabel(score: number): string {
  if (score >= 0.75) return 'Très élevé';
  if (score >= 0.55) return 'Élevé';
  if (score >= 0.35) return 'Modéré';
  if (score >= 0.15) return 'Faible';
  return 'Très faible';
}

export function getClassification(score: number): SeaGlassZone['classification'] {
  if (score >= 0.75) return 'very_high';
  if (score >= 0.55) return 'high';
  if (score >= 0.35) return 'medium';
  if (score >= 0.15) return 'low';
  return 'very_low';
}
```

### 5.3 Formule de scoring (`src/lib/scoring.ts`)

```typescript
const WEIGHTS = {
  historical: 0.25,
  morphology: 0.25,
  river: 0.20,
  ocean: 0.15,
  population: 0.15,
} as const;

export function computeScore(subscores: SeaGlassZone['subscores']): number {
  return Object.entries(WEIGHTS).reduce(
    (sum, [key, weight]) => sum + subscores[key as keyof typeof WEIGHTS] * weight,
    0
  );
}
```

---

## 6. Contraintes & règles pour Claude Code

### À FAIRE
- Utiliser **exclusivement** TypeScript strict (`"strict": true` dans tsconfig)
- Chaque composant dans **son propre fichier**, exporté en named export
- Utiliser **react-map-gl v7** (pas v6, pas Leaflet) — c'est un PoC production
- Les données GeoJSON doivent être **valides** (vérifiables sur geojson.io)
- Écrire du **CSS Tailwind** autant que possible, CSS custom seulement pour les animations et ce qui ne peut pas être fait en Tailwind
- Le build (`npm run build`) doit passer **sans erreur ni warning**
- Nommer les couleurs via les tokens Tailwind custom, pas de hex en dur dans les composants
- Commenter les fichiers complexes (scoring, store, layers Mapbox)

### À NE PAS FAIRE
- ❌ Ne PAS utiliser Leaflet (on utilise Mapbox GL)
- ❌ Ne PAS utiliser `any` en TypeScript
- ❌ Ne PAS utiliser `useEffect` pour des choses gérables par le store
- ❌ Ne PAS hardcoder le token Mapbox (toujours `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`)
- ❌ Ne PAS mettre les données dans les composants — elles viennent des GeoJSON ou du store
- ❌ Ne PAS utiliser Inter, Roboto, ou Arial comme font
- ❌ Ne PAS créer de fichier CSS séparé par composant (tout en Tailwind + un seul globals.css)

---

## 7. Commande d'initialisation Claude Code

Quand tu lances Claude Code, voici le prompt initial suggéré :

```
Lis le fichier PLAN.md dans ce dossier. C'est le plan complet du projet.
Exécute-le phase par phase, en commençant par la Phase 1 (Scaffolding).
Après chaque phase, fais un résumé de ce que tu as fait et attends
ma validation avant de passer à la suivante.
Respecte strictement les contraintes de la section 6.
```

---

## 8. Roadmap post-PoC (hors scope actuel)

Pour mémoire, les étapes suivantes après validation du PoC :

1. **Données réelles** : Remplacer les scores estimés par des données calculées (OSCAR, Sentinel-2, HydroSHEDS, OSM)
2. **Supabase** : Migrer les GeoJSON vers PostGIS, ajouter des vues matérialisées pour le scoring
3. **Crowdsourcing** : Formulaire de signalement de trouvailles (photo + géoloc), feedback loop sur les scores
4. **Extension géographique** : Vietnam, Philippines, Japon, côte californienne…
5. **API WDPA** : Remplacer les cercles approximatifs par les vrais polygones des zones protégées
6. **PWA** : Mode offline, géolocalisation, "spots près de moi"
7. **Données satellite temps réel** : Courants, hauteur de vagues via Stormglass ou CMEMS NRT
