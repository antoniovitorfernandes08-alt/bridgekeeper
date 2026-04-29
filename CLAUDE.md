# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**bridgekeeper** — Monorepo for a practical Information Security Management course lab. A deliberately vulnerable Node.js/TypeScript API sits behind an NGINX reverse proxy, both running in Docker. Two student groups work on separate branches: Red Team (Hardening) and Blue Team (Monitoring + Incident Response).

## Stack

- Runtime: Node.js + TypeScript (API)
- Proxy: NGINX
- Containers: Docker Compose
- Package manager: pnpm

## Commands

```bash
# Start all services
docker compose up --build

# Stop and remove containers
docker compose down

# View live logs
docker compose logs -f

# API only (without rebuilding NGINX)
docker compose up api

# Install dependencies (inside api/)
pnpm install

# Type-check
pnpm tsc --noEmit

# Run a single test file
pnpm test -- <path>
```

## Architecture

```
bridgekeeper/
├── api/              # Node.js/TypeScript vulnerable API
├── proxy/            # NGINX config and Dockerfile
├── logs/             # Shared volume: NGINX access logs (mounted by both containers)
├── redteam/
│   └── evidence/     # Red Team scripts and deliverables
├── blueteam/
│   └── evidence/     # Blue Team scripts, reports and deliverables
├── docs/             # Group activity guides, IRP templates, dashboard specs
└── docker-compose.yml
```

### Key design decisions

- **Shared log volume** (`./logs`): NGINX writes structured JSON access logs here; Blue Team reads them for monitoring/dashboards without direct container access.
- **BOLA vulnerability** (`GET /orders/:id`): Uses sequential integer IDs with no ownership check — intentional, for Red Team exploitation exercises. Do not fix unless explicitly asked.
- **Rate limiting** (`proxy/nginx.conf`): `limit_req_zone` is Red Team's hardening target; leave it commented out in the base branch.
- **Branch convention**: `main` = base vulnerable state; `redteam/hardening` = Red Team fixes; `blueteam/monitoring` = dashboards and IRP.

## Intentional vulnerabilities

The following are **kept deliberately insecure** for instructional purposes:
- Sequential order IDs with no authorization check (`api/src/routes/orders.ts`)
- No rate limiting on NGINX (base branch)
- No authentication middleware on the vulnerable route

Do not add auth, fix BOLA, or enable rate limiting on `main` unless a prompt explicitly says so.
