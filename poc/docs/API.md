# API Documentation (PoC)

## Auth
- `POST /auth/login` → `{ email, password }` → `{ access_token, user }`

## Incidents
- `GET /incidents?userId=...` assigned list
- `GET /incidents?lat=..&lng=..` nearby list
- `POST /incidents` create incident
- `PUT /incidents/:id/status` body `{ status, userId }`

## Tracking
- `POST /tracking/ping` body `{ deviceId, lat, lng, speed?, heading? }`

## Panic
- `POST /panic` body `{ deviceId, userId, lat, lng }` triggers websocket `panic_alert`

## Analytics
- `GET /analytics/summary` hijacking metrics + predictions
- `GET /analytics/heatmap` hotspot grid payload

## WebSocket Channels
- `location_update` → `{ deviceId, lat, lng }`
- `incident_update` → incident payload
- `panic_alert` → panic payload
