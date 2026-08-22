# Color Me Lucky — Question Bank v2 Validation

The approved v2 inventory contains **103 questions**: 3 demo questions, 65 primary questions, 30 reserves, and 5 tiebreakers. The 30 reserve questions are distributed as six per player: five standard reserve questions plus one Color Trap Special.

## Answer-button normalization

The source document contains six Color Trap entries where the option row conflicts with the explicit `Answer:` line’s declared button color. The generator treats the explicit answer line as authoritative and swaps only the two affected option labels so the stated correct answer appears on the stated button. No prompt, answer label, or game rule was changed.

| Question | Correct answer | Declared button | Source option on that button | Applied normalization |
| --- | --- | --- | --- | --- |
| 56 | Pale yellow | blue | Yellow | Moved Pale yellow to the blue button |
| 91 | Blue-black | red | Pink | Moved Blue-black to the red button |
| 92 | White | yellow | Purple | Moved White to the yellow button |
| 93 | Yellow | red | Green | Moved Yellow to the red button |
| 94 | Yellow | red | Blue | Moved Yellow to the red button |
| 95 | Red | yellow | Purple | Moved Red to the yellow button |
