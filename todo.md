# Update Checklist

- [x] Record the approved reserve-pool rule for uninterrupted 60-second rounds.
- [x] Treat the supplied 25-question bank as reserve questions only; retain five tiebreakers as a separate pool.
- [x] Replace the four unresolved decision cards with the approved operating rules.
- [x] Publish the server-receipt tiebreaker rule in plain language.
- [x] Confirm the host console protection rule in the review.
- [x] Correct Susie’s dog-breed answer to Shorkie Poo.
- [x] Verify the revised site and save a new shareable checkpoint.

## Playable Game Build Checklist

- [x] Configure the selected always-on live room with durable session recovery.
- [x] Receive or approve the five dedicated tiebreaker questions; do not use reserve questions as tiebreakers.
- [x] Upgrade the static review into a full-stack, realtime multiplayer game foundation.
- [x] Build the protected host console, player lobby, and active-player answer lock.
- [x] Implement server-authoritative rounds, scoring, reserve-pool rotation, and tiebreaker resolution.
- [x] Test reconnect, countdown, sound, and cross-player synchronization behavior.
- [x] Publish the playable team game with launch instructions.
- [x] Install and validate the upgraded dependency set; resolve all runtime, type-check, test, and production-build errors.
- [x] Verify the persisted game-session migration and protected server behavior before marking gameplay work complete.
- [x] Publish and verify the current auto-published game version endpoint, rather than relying on the development preview.
- [x] Add and run a regression test proving non-admin users cannot invoke protected host controls.
- [x] Add and run a countdown validation proving the server deadline transitions countdown → live round → summary.
- [x] Verify the sound-enable flow only arms audio after a user interaction and remains usable with sound toggled on or off.
- [x] Verify that the auto-published production lobby establishes its Socket.IO room connection rather than remaining in reconnecting state.
- [x] Verify that the production Host route protects game-driving controls behind host sign-in.
- [x] Allow the host to start a standard game with any non-empty subset of joined players rather than requiring all five seats.
- [x] Make active-player order, player messaging, scoreboards, and tiebreaker eligibility respect the selected active roster.
- [x] Add regression coverage for single-player and partial-roster starts, then validate the updated lobby and host console.
- [x] Publish and verify the flexible-player launch update on the production game endpoint.
- [x] Replace the persisted legacy lobby message that still says all five players are required.
- [x] Clear stale player claim and connected-presence state when the host resets the room for a new game.
- [x] Invalidate already-connected socket claims on host reset so an old Lyka session cannot block a fresh join.
- [x] Ensure a browser holding an old claim cannot make an unoccupied player appear unavailable after reset.
- [ ] Add regression coverage for reset followed by a fresh player join, then republish and verify the production lobby.
- [ ] Show the final winner or tied winners, score totals, and winnings outcome on the end-of-game results screen.
- [ ] Add regression and browser verification that drives the game into the results phase and confirms winner, tie, score, and winnings labels render correctly.
- [ ] Republish and verify the production results screen after the final-results UI validation passes.
- [x] Replace all demo, primary, reserve, and tiebreaker questions with the approved 103-question v2 bank: 3 demo, 65 primary, 30 reserve, and 5 tiebreakers.
- [x] Validate the approved v2 counts, player assignments, answer colors, correct-answer uniqueness, and Color Trap Special placement.
- [x] Rebuild and test the game with the v2 question bank, then publish and verify the refreshed production lobby.
- [x] Confirm the production v2 game shell loads successfully after deployment propagation.
- [x] Update player-facing reserve-pool copy from five to six questions per player for the approved v2 bank.
- [x] Start a fresh room automatically when a persisted session was created with an older question-bank version.
- [ ] Keep all four answer choices visible and usable on the live play screen for ordinary and Color Trap questions.
- [ ] Remove player-facing Color Trap labels from question categories and inline prompt text while preserving server-side question metadata.
- [ ] Confirm the public custom domain serves the corrected client bundle rather than the prior Color Trap disclosure build.
- [ ] Add regression and live-browser validation for answer visibility and undisclosed Color Trap presentation before final release.
