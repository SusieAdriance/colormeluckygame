# Color Me Lucky Structure

## Ownership

| Layer | Responsibility |
|---|---|
| `server/game/engine.ts` | Pure authoritative state transitions, answer validation, scoring, reserve rotation, and ranking logic. |
| `server/game/realtime.ts` | Socket.IO room registration, broadcast, reconnect synchronization, and host/player command routing. |
| `server/game/questions.ts` | Demo, primary, reserve, and tiebreaker data with a single correct answer per record. |
| `server/db.ts` and `drizzle/schema.ts` | Durable game-session snapshots, player claims, and audit-safe event records. |
| `client/src/game/GameApp.tsx` | Route-aware UI shell and state synchronization. |
| `client/src/game/components/` | Lobby, stage, answer grid, scoreboard, feedback, host console, results, and audio control. |
| `client/src/game/ShowStage.ts` | Lightweight Babylon.js show-stage background; React owns accessible interactive controls above it. |
| `client/src/game/audio.ts` | Browser-safe Web Audio effects unlocked after a user gesture. |

## Runtime State Machine

```text
LOBBY → DEMO → ORDER_REVEAL → ROUND_READY → COUNTDOWN → ROUND_ACTIVE
     → ROUND_SUMMARY → NEXT_PLAYER → ... → TIEBREAKER → RESULTS
```

`PAUSED` is an overlay state for `COUNTDOWN`, `ROUND_ACTIVE`, and `TIEBREAKER`. The server holds the remaining duration during a pause, then issues a new authoritative deadline on resume.

## Permissions

| Actor | Allowed actions |
|---|---|
| Host | Create/reset session, start demo, start game, start/pause/resume/end a round, advance player, trigger tiebreaker, mute shared audio guidance. |
| Player | Claim one registered identity, enable local sound, submit an answer only when eligible, reconnect to their claimed identity. |
| Spectator | Read-only display of public game state. |

