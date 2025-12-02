# National Security Incident Response & Analytics PoC

This repository contains a monorepo for a local end-to-end demonstration of a national security incident response stack.

## Structure
- `poc/backend` – NestJS + Prisma REST/WebSocket API with JWT auth, RBAC roles, incident lifecycle, tracking, panic alerts, and analytics endpoints.
- `poc/mobile-fieldops` – React Native/Expo FieldOps prototype with secure login, on-duty toggle, GPS pings, incident list/detail, status transitions, and panic button.
- `poc/web-commandhub` – Next.js CommandHub dashboard with live incident feed, panic banner, map placeholder, and analytics charting.
- `poc/analytics` – Hotspot detection utilities and sample data generator (200+ hijacking incidents and officer trails).
- `poc/infrastructure` – Docker compose for PostgreSQL.
- `poc/docs` – Setup guide, API documentation, and wireframe outlines.

See `poc/docs/SETUP.md` for setup, run instructions, and architecture notes.
