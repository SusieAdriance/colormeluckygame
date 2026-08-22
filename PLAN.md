# Game Plan: Color Me Lucky

## Risk Tasks

### 1. Server-authoritative round timing and answer acceptance
- **Why isolated:** Browser clocks and network arrival times differ across Florida, Puerto Rico, and the Philippines. A client-only timer can create disputed boundary answers.
- **Approach:** The server owns each phase, `roundEndsAt`, active player, question index, score mutations, pause state, and tiebreaker winner. Clients render a countdown from the issued UTC deadline and submit intent only. The server accepts an answer once, only from an eligible participant, and only before the authoritative deadline.
- **Verify:** A late answer is rejected, a duplicate tap yields one score change, an inactive player cannot score, and a reconnecting browser receives the active phase and deadline without resetting the round.

### 2. Realtime room recovery
- **Why isolated:** The live room must remain coherent after refreshes, temporary disconnects, and a process restart.
- **Approach:** Persist the canonical session snapshot and per-player score/identity in the database after each transition; broadcast mutations over a persistent Socket.IO channel; provide an HTTP/tRPC state snapshot fallback on reconnect.
- **Verify:** Refreshing a player returns them to their claimed identity, score, active question, and timer; reconnects do not create a second player claim; a paused session stays paused.

### 3. Simultaneous tiebreaker resolution
- **Why isolated:** Multiple tied players may answer within milliseconds of each other, and the original rules require a deterministic winner.
- **Approach:** Send a single shared tiebreaker question only to eligible tied players. The server records the first valid correct event by server receipt order, locks the question atomically, and advances to the next tiebreaker only if all eligible players answer incorrectly.
- **Verify:** An ineligible player cannot answer, only one winner can be recorded, both-wrong advances to the next question, and all clients display the same winner.

## Main Build

Create a desktop-first (1280px+) multiplayer trivia game with a Studio Signal game-show interface. The host uses a protected control console; five named players join through a password-free lobby selection. The game includes three demo questions, randomized player order, 60-second hot-seat rounds, server-owned timing, scoreboards, answer feedback, player-specific reserve questions, a dedicated five-question tiebreaker bank, pause/resume, reconnect behavior, results/prizes, and an accessible mute control.

- **Assets needed:** One in-game visual target; the existing Color Me Lucky broadcast art; CSS/3D stage treatment rather than character or world assets; synthesized Web Audio tones for ding, buzzer, countdown, and ticking.
- **Verify:**
  - The lobby, demo, draw, countdown, round, feedback, scoreboard, tiebreaker, and final-results transitions work without dead ends.
  - Only the active player can answer during a round; the demo accepts any named player.
  - Each player receives 13 primary questions followed by only their own five reserve questions with no repeats.
  - Desktop layouts have no overflow, answer buttons remain clear and keyboard-operable, and answer color is paired with text/shape labels.
  - Audio never starts before an explicit user gesture and mute remains available.
  - No browser console errors occur during an end-to-end simulated game flow.
  - The final screen matches the reference’s deep navy, gold broadcast, right-scoreboard, four-color answer layout.

