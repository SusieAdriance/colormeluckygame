import { describe, expect, it } from "vitest";
import { calculateFinalPlacements } from "@shared/gameResults";
import { createGameState, toPublicState } from "./engine";

describe("final winnings", () => {
  it("shows a direct payout for each final placement", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny", "Giann", "Lyka"];
    state.players.Stephanny.score = 8;
    state.players.Giann.score = 5;
    state.players.Lyka.score = 3;

    expect(calculateFinalPlacements(toPublicState(state))).toMatchObject([
      { name: "Stephanny", rank: 1, payout: 50, isWinner: true },
      { name: "Giann", rank: 2, payout: 35, isWinner: false },
      { name: "Lyka", rank: 3, payout: 30, isWinner: false },
    ]);
  });

  it("awards the first-place payout to the server-confirmed tiebreaker winner", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny", "Giann"];
    state.players.Stephanny.score = 7;
    state.players.Giann.score = 7;
    state.tie = { eligible: ["Stephanny", "Giann"], index: 0, answerers: [], winner: "Giann", exhausted: false };

    expect(calculateFinalPlacements(toPublicState(state))).toMatchObject([
      { name: "Giann", rank: 1, payout: 50, isWinner: true },
      { name: "Stephanny", rank: 2, payout: 35, isWinner: false },
    ]);
  });

  it("splits the relevant prize positions when a final tie remains unresolved", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny", "Giann"];
    state.players.Stephanny.score = 7;
    state.players.Giann.score = 7;

    expect(calculateFinalPlacements(toPublicState(state))).toMatchObject([
      { name: "Stephanny", rank: 1, payout: 42.5, isWinner: true, sharesPrize: true },
      { name: "Giann", rank: 1, payout: 42.5, isWinner: true, sharesPrize: true },
    ]);
  });
});
