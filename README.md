# Color Me Lucky

Color Me Lucky is a realtime multiplayer trivia game for up to five players and one host. The portable package uses **Express**, **Socket.IO**, **React**, and a MySQL-compatible database for durable room recovery.

## Run locally

Install with `pnpm install`. Configure the environment variables in `environment.template`, initialize an empty MySQL-compatible database with `database/schema.sql`, then run `pnpm dev`. For a production host, run `pnpm build` followed by `pnpm start`.

## Required environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `HOST_PASSWORD` | Yes | The sole credential for the private `/host` console. |
| `DATABASE_URL` | Yes | MySQL-compatible connection string for persistent room recovery. |
| `PORT` | Host supplied | HTTP and Socket.IO listener port. |
| `ROOM_CODE` | Optional | A shared code you may distribute with the room URL. |

Players join through the shared room link and choose a seat; they do not need individual accounts. The host visits `/host` and enters `HOST_PASSWORD`.

## Question bank and assets

The typed v2 runtime bank is in `shared/gameData.ts`; the complete supplied source bank is backed up in `data/Color_Me_Lucky_Question_Bank_v2.md`. Bundled review-page art is in `client/public/brand/`, so the export does not depend on managed storage URLs.

## Deployment

Use a Node host with WebSocket support, such as Railway, Render, Fly.io, or your own server. Set the build command to `pnpm install --frozen-lockfile && pnpm build`, the start command to `pnpm start`, the required environment variables above, and enable WebSockets. Run `database/schema.sql` once against the fresh database before starting the service.
