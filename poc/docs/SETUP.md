# National Security Incident Response PoC Setup

## Repository Layout
- `backend/`: NestJS + Prisma API with WebSocket gateway.
- `mobile-fieldops/`: React Native/Expo prototype for officers.
- `web-commandhub/`: Next.js dashboard for command center.
- `analytics/`: Scripts for hotspot + predictive analytics and sample data generator.
- `infrastructure/`: docker-compose for PostgreSQL.
- `docs/`: Architecture notes and API docs.

## Prerequisites
- Node.js 18+
- npm or yarn
- Docker (for PostgreSQL)
- Expo CLI for mobile preview (`npm install -g expo-cli`)

## Environment Variables
Copy `.env.example` within each package and adjust secrets.

## Running PostgreSQL
```bash
cd poc/infrastructure
docker-compose up -d
```

## Backend (NestJS)
```bash
cd poc/backend
cp .env.example .env
npm install
npm run prisma:generate
npm run start:dev
```

## Web Dashboard (Next.js)
```bash
cd poc/web-commandhub
cp .env.example .env
npm install
npm run dev
```

## Mobile FieldOps (Expo)
```bash
cd poc/mobile-fieldops
cp .env.example .env
npm install
npm start
```
Use Expo Go / simulator to open the QR code. API URLs point to `http://localhost:4000` by default.

## Generating Simulated Data
```bash
cd poc/analytics
node sample-data-generator.ts > dataset.json
```

## Analytics Scripts
`hotspot.ts` exports `buildHeatmap` and `movingAverage` to compute hexbin/geohash heatmaps and rolling predictions.

## Architecture Overview
- **Authentication:** JWT bearer tokens with roles (FIELD_OPS, COMMAND, ANALYST).
- **Transport:** REST + WebSocket (Socket.IO) for incident, location, and panic updates.
- **Database:** PostgreSQL + Prisma schema includes users, devices, incidents, status history, location pings, assets, media, alerts, analytics snapshots.
- **Tracking Engine:** `/tracking/ping` persists GPS pings; websocket pushes `location_update` events.
- **Incident Lifecycle:** `/incidents/:id/status` drives Accept → En Route → On Scene → Closed transitions, with audit rows in `IncidentStatusHistory`.
- **Analytics:** `/analytics/summary` returns metrics; `/analytics/heatmap` returns hotspot grid.

## Map SDK Configuration
- Provide `MAPBOX_TOKEN` (or Google Maps key) in `.env` files for mobile/web. Components are wired with placeholders so the PoC runs without a key; drop in SDK configuration to enable live maps.

## Wireframes (Figma-ready outlines)
- **FieldOps home:** header with On-Duty toggle + panic button, list of assigned/nearby incidents, status pill per card.
- **Incident view:** map pane with marker, status progression buttons, note + single photo attachment row, timeline of updates.
- **Map dashboard:** dual-pane layout with large map, incident + unit overlays, right-side live feed, top panic banner.
- **Analytics dashboard:** cards for counts and KPIs plus time-series chart (incidents by hour) and predicted peak indicator.

## API Quick Reference
See `docs/API.md` for endpoints and payloads.
