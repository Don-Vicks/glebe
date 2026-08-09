# OrgSites — Monorepo Scaffold

Working-name scaffold for the website-creation SaaS spec'd for NGOs, faith-based
orgs, schools, and civic institutions. This is a **scaffold, not a working
product** — see "What's stubbed vs. real" below before you start relying on
any of it.

## Stack

- **Builder app** (`apps/builder`) — Next.js editor UI, Puck-based block
  editor, tRPC client
- **Renderer app** (`apps/renderer`) — Next.js public site renderer, ISR,
  tenant resolution by hostname
- **API** (`apps/api`) — NestJS, external-facing REST, auth, payments,
  BullMQ queue processors
- **Shared packages** (`packages/`):
  - `db` — Prisma schema + client (Postgres)
  - `block-schema` — the block-type registry (Zod) shared by Puck, tRPC,
    and the renderer
  - `trpc` — tRPC routers used by the Builder app
  - `ui`, `config` — placeholders, not yet built out

Every architectural decision here maps back to a section of the Product &
Technical Specification document — section references are in code comments
throughout (e.g. "spec §8.5 step 3").

## Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io/installation) ≥ 9 (`corepack enable` is the
  easiest way to get the right version)
- Docker (for local Postgres/Redis/MinIO)

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/builder/.env.example apps/builder/.env
cp apps/renderer/.env.example apps/renderer/.env
cp packages/db/.env.example packages/db/.env

# 3. Start Postgres, Redis, MinIO
pnpm docker:up

# 4. Set up the database
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# 5. Run everything
pnpm dev
```

This starts:
- Builder app on **http://localhost:3000**
- Renderer app on **http://localhost:3001**
- API on **http://localhost:4000**

The seed script creates a sample organization ("Hope Foundation") with one
site and a homepage with real block content, so the Builder dashboard has
something to show immediately.

### Viewing the seeded site on the renderer

The renderer resolves tenants by hostname (`{subdomain}.{ORGSITES_ROOT_DOMAIN}`).
Locally, the easiest way to hit it is to add a hosts-file entry:

```
127.0.0.1 hope-foundation.orgsites.local
```

...and set `ORGSITES_ROOT_DOMAIN=orgsites.local` in `apps/renderer/.env`, then
visit `http://hope-foundation.orgsites.local:3001`. The seeded site starts in
`DRAFT` status though, so you'll need to publish it first — either flip
`status` to `PUBLISHED` directly in `pnpm db:studio`, or call the publish
endpoint once auth is wired up.

## What's real vs. stubbed

This scaffold prioritizes getting the **architecture and data flow right**
over completeness. Before treating any of this as production code:

| Area | Status |
|---|---|
| Prisma schema | Real — models the full spec §8.4 data model |
| Block-schema registry | Real — 9 block types with Zod validation |
| tRPC pages/sites routers | Real logic, but auth context is a dev-only header stub |
| Puck editor config | 3 of 9 block types wired (hero, mission, donate_cta) — copy the pattern for the rest |
| Renderer block registry | Same 3 block types — mirrors the Puck config |
| Auth (`apps/api/src/modules/auth`) | **Stub.** No password hashing, no real JWT. Do not ship this. |
| Payment providers (Paystack/Stripe) | **Stubs.** Interfaces + webhook signature verification pattern are real; actual API calls are `throw new Error(...)` placeholders |
| BullMQ queues | site-build, domain-verification, payments have working processors; media and email are registered but have no processor |
| Domain verification | DNS TXT polling logic is real; SSL provisioning at the edge is a TODO |
| `packages/ui`, `packages/config` | Empty — not yet built out |

## Suggested next steps (Phase 0, per spec §12)

1. Wire real auth (password hashing, JWT signing, session cookies) —
   currently the highest-priority gap, since almost everything else assumes
   a working session.
2. Get one payment provider (Paystack, per spec §14.1's recommended launch
   order) actually calling its real API instead of throwing.
3. Finish the remaining 6 block types in both the Puck config and the
   renderer registry, following the existing pattern.
4. Build the `/api/revalidate` route in `apps/renderer` that
   `SiteBuildProcessor` calls, so publishing actually updates the live site.
5. Validate Puck's field-config API against your more complex blocks
   (donate_cta with provider selection, event_list) — this was flagged as
   an open decision in spec §14.1 and is worth a focused spike before
   committing further.

## Monorepo commands

```bash
pnpm dev              # run all apps in parallel
pnpm dev:api          # just the API
pnpm dev:builder      # just the Builder app
pnpm dev:renderer     # just the Renderer app
pnpm build            # build all apps
pnpm typecheck        # typecheck all packages/apps
pnpm db:studio        # open Prisma Studio (visual DB browser)
pnpm docker:down      # stop Postgres/Redis/MinIO
```
