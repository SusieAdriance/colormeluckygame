# 🎲 Color Me Lucky

A live trivia game show for remote teams.

Five players, one host, and a 60-second hot seat. Questions come one after another and
each one puts four answers on four colored buttons — red, blue, green, yellow. Most of
them play straight. Some are **color traps**, where the correct answer sits on a
deliberately mismatched button just to watch everyone second-guess themselves.

Built for a team split across Florida, Puerto Rico, and the Philippines, so it assumes
everyone is on a video call and nobody shares a room.

## How it plays

1. Players open the room link and pick their name — no accounts, no passwords
2. The host opens `/host` and runs a 3-question demo so everyone can test their buttons
3. A random draw sets the turn order
4. Each player takes the hot seat for 60 seconds, answering as many as they can
5. Ties trigger sudden-death questions
6. Final scoreboard, rankings, and prize amounts

**The server owns the clock.** The countdown you see is animated in the browser, but
every answer is timestamped when it reaches the server, so a close call at 0:01 is
judged the same for the player in Manila as the one in San Juan.

## Questions

98 unique questions, none repeated anywhere in a game:

| Set | Count |
| --- | --- |
| Player pools | 65 (13 each) |
| Reserve pool | 25 (auto-loads if a player burns through their 13) |
| Tiebreakers | 5 |
| Demo | 3 (unscored) |

Categories run across general knowledge, pop culture, geography, brain teasers, food,
science, and the team's own inside jokes. The typed runtime bank lives in
`shared/gameData.ts`; the readable source is `data/Color_Me_Lucky_Question_Bank_v2.md`.

## Running it locally

```bash
pnpm install
HOST_PASSWORD=anything pnpm dev
```

Then open http://localhost:3000. For a production build:

```bash
pnpm build
HOST_PASSWORD=your-password pnpm start
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `HOST_PASSWORD` | **Yes** | The only credential for the private `/host` console |
| `PORT` | Host supplied | HTTP and Socket.IO listener port |
| `DATABASE_URL` | No | MySQL-compatible connection string. Without it the game runs entirely in memory, which is fine — this only lets a game survive a server restart mid-session |
| `ROOM_CODE` | Optional | Reserved for a shared join code |

## Deploying

Any Node host that supports WebSockets and long-lived processes works — Railway,
Fly.io, Render, or your own server. Serverless platforms like Vercel and Netlify will
not, since the live room needs a process that stays running.

This repo ships with `nixpacks.toml` and `railway.json`, so Railway needs no
configuration beyond setting `HOST_PASSWORD`. Two things matter on any host:

- **Node 22 or newer.** Vite 7 requires it, and `vite.config.ts` uses
  `import.meta.dirname`, which is undefined on older versions.
- **Match the port.** The server listens on `process.env.PORT`. If your host routes
  the public domain to a different port, you get a 502 with a perfectly healthy app.

## A note on access

Players join by picking a name from a list — there is no player authentication. Anyone
with the URL can take a seat, so treat the room link as semi-private and don't post it
somewhere public.

## Stack

React 19 · TypeScript · Socket.IO · Express · tRPC · Vite · Babylon.js (the animated
stage) · Drizzle ORM (optional persistence)

```bash
pnpm test      # 26 tests
pnpm check     # typecheck
```
