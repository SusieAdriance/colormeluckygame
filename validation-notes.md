# Release Validation Notes

## Visual checks — July 26, 2026

- Desktop lobby renders the Studio Signal game shell, five selectable seats, color-answer identity, visible sound-enable control, and the approved hot-seat, reserve, and host rules.
- Desktop play route correctly blocks unclaimed browsers with a player-selection guard.
- Mobile lobby preserves readable type, two-column seat selection, prominent join and enable-sound actions, and the three gameplay-rule notes without horizontal clipping.
- Mobile play route preserves the player-selection guard and its return-to-lobby path.
- Mobile host view renders the authenticated producer console, live phase, control panel, tiebreaker policy, reset control, and five-player roster.

These checks were performed against the running project preview after the final source changes. Functional checks are separately covered by the unit suite and realtime smoke test.

## Public-domain check — July 26, 2026

Both previously assigned public domains, `https://colormeluckyohd.manus.space` and `https://colormeluck-3fs7l3hp.manus.space`, still served the earlier technical-review page when checked after checkpoint `d8bcd1fc`. The playable release must therefore be verified on its current publication route before it is represented as the live game endpoint.

## Restart verification — July 26, 2026

After a clean server restart, the current project preview rendered the playable Lobby and authenticated Host console at desktop width. The restarted runtime initialized Manus OAuth and listened on the configured server port without a new dotenv module error. The only remaining publication concern is the mismatch between the saved playable-project version and the pre-existing custom public domains.

The current playable release is checkpoint `8f2d8670`, which is auto-published for access through the project-version link delivered with this task. The older custom domains remain documented as legacy review aliases rather than launch links for this game version.

## Production propagation recheck — July 26, 2026

After the latest release propagation interval, `https://colormeluckyohd.manus.space/?release=8f2d8670` served the playable Lobby rather than the earlier technical review. The first rendered state reported “RECONNECTING” and “Connecting to the host room,” so the production Socket.IO connection is being checked separately before describing the live room as fully verified.

The follow-up production view reached `LIVE LINK` and the `STANDING BY` room state with all five seats available, confirming that the deployed lobby established its Socket.IO connection. The deployed `/host` route correctly exposes only a host sign-in action to an unauthenticated browser; it does not reveal game-driving controls.

## Flexible-player validation — July 26, 2026

Desktop preview checks confirmed the Lobby now describes an “up to 5 players” format and the Host console now offers “Lock joined roster.” The persisted lobby snapshot still surfaced the legacy message “Waiting for all five players to join,” so that public-state copy is being normalized before release to avoid contradicting the new behavior.

The refreshed Lobby now displays “Waiting for at least one player to join.” Desktop and mobile checks confirmed that the revised player-count guidance, status card, and host `Lock joined roster` control render legibly. Automated validation passed for a single-player start, a zero-player rejection, active-roster tiebreaker eligibility, general unit coverage, TypeScript checking, production build, and realtime seat recovery.

## Flexible-player production propagation — July 26, 2026

Checkpoint `e55acaf2` was saved with the flexible-player update. Two cache-busted checks of the existing custom domain during the initial propagation window still returned the prior lobby copy requiring five players, so public-release verification remains open until the new release appears on that endpoint.

After republishing, `https://colormeluckyohd.manus.space` served the flexible-player release. The public lobby now states “UP TO 5 PLAYERS + 1 HOST,” explains that the game can start with one or more players, displays “Waiting for at least one player to join,” and reached `LIVE LINK` with the room in `STANDING BY` state.

## Reset claims and winnings repair — July 26, 2026

The reset repair introduces a fresh claim epoch each time the host resets, clears the server-side socket claim registry, and directs connected browsers to discard saved player identity. Unit coverage verifies that a claim from the prior epoch is rejected while the same player can join the new room with a fresh claim. The live Socket.IO smoke check confirms a valid current claim still restores the correct seat after a normal reconnect.

After the local server restart, the Lobby and Play guard rendered normally. The local development snapshot still showed Lyka as `IN ROOM` because it had been occupied before the new reset flow was invoked; this is expected until a host triggers the updated reset action. The final-results calculations are covered by unit tests and the visible player screen now renders explicit placement, score, and prize labels when the phase becomes `results`.

The final-results board is now directly server-rendered in the unit suite for both a single winner and a first-place tie. Those checks confirm the player names, final points, `WINNINGS` labels, payout values, and split indicators render in the actual component. The complete suite now has 19 passing tests, TypeScript validation passes, the realtime claim-recovery smoke test passes, and the production build completed successfully.

## Question bank v2 — August 17, 2026

The approved v2 bank has replaced all playable content. It contains 103 questions: 3 demo questions, 65 primary questions, 30 reserves, and 5 tiebreakers. Each player receives 13 primary questions and 6 reserves: five standard reserves plus one Color Trap Special. Structural validation confirms four unique answer colors, one declared correct option, unique IDs, and the intended player allocation; the regression suite passed with 25 tests, TypeScript checking passed, the realtime smoke test passed, and the production build completed successfully.

Six Color Trap entries had an option-row/button conflict with their own explicit `Answer:` lines. The generator treats those explicit answer lines as authoritative, swaps only the conflicting answer labels into the declared button positions, and records the six adjustments in `question-bank-v2-validation.md`. A question-bank version stamp makes any persisted pre-v2 session start as a fresh room, preventing old v1 question IDs or player claims from carrying forward.

The first public check for checkpoint `c4561a28` returned an empty game shell while the deployment was propagating. Production verification remains open until the public lobby completes loading and shows the v2 fresh-room state.

After propagation, the public v2 lobby loaded with all five seats available, confirming that no prior player claim carried into the new question-bank room. The refreshed lobby copy visibly states that six non-repeating reserves—including one Color Trap Special—take over after the 13 primary questions.

The latest custom-domain check for checkpoint `6e89eb96` reached `LIVE LINK` with every seat available, but it still displayed the older five-reserve wording. The public alias is therefore serving a prior client bundle or cache during propagation; the newest six-reserve copy and v2 results flow remain to be verified on that endpoint.

The subsequent production check completed successfully. The public lobby reached `LIVE LINK`, displayed the v2 six-reserve and Color Trap Special guidance, and showed the current room status. Stephanny and Giann were already marked `IN ROOM`, while Francisco, Lyka, and Jenny were available; this reflects active live-room claims, not an older deployment cache.

## Corrected Color Trap client release — August 21, 2026

Checkpoint `c8eaddfd` contains a public-question sanitizer that strips both category and inline `**[COLOR TRAP]**` markers before a question reaches any player browser. The public `/play` route reached `LIVE LINK` after propagation. It is presently at the player identity gate in the validation browser, so one safe host-led live question is still needed to observe the sanitized prompt and four-button grid end to end.
