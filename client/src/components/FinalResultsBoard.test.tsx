import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { PlayerName } from "@shared/gameData";
import type { PublicGameState } from "@shared/gameTypes";
import { FinalResultsBoard } from "./FinalResultsBoard";
import { QUESTION_BANK_VERSION } from "@shared/gameData";

const roster: PlayerName[] = ["Stephanny", "Giann"];

function buildResultsState(scores: Record<PlayerName, number>): PublicGameState {
  return {
    sessionId: "test-session",
    questionBankVersion: QUESTION_BANK_VERSION,
    claimEpoch: "test-epoch",
    phase: "results",
    players: {
      Stephanny: { name: "Stephanny", score: scores.Stephanny, connected: true, completed: true, primaryCursor: 13, reserveCursor: 0 },
      Giann: { name: "Giann", score: scores.Giann, connected: true, completed: true, primaryCursor: 13, reserveCursor: 0 },
      Francisco: { name: "Francisco", score: scores.Francisco, connected: false, completed: false, primaryCursor: 0, reserveCursor: 0 },
      Lyka: { name: "Lyka", score: scores.Lyka, connected: false, completed: false, primaryCursor: 0, reserveCursor: 0 },
      Jenny: { name: "Jenny", score: scores.Jenny, connected: false, completed: false, primaryCursor: 0, reserveCursor: 0 },
    },
    turnOrder: roster,
    turnIndex: 0,
    activePlayer: null,
    questionOrdinal: 0,
    demoIndex: 0,
    roundEndsAt: null,
    paused: false,
    pausedRemainingMs: null,
    feedback: null,
    tie: null,
    message: "Game ended by host.",
    updatedAt: 0,
    currentQuestion: null,
  };
}

describe("FinalResultsBoard", () => {
  it("renders the winner, final score, and winnings for a non-tied game", () => {
    const markup = renderToStaticMarkup(<FinalResultsBoard state={buildResultsState({ Stephanny: 5, Giann: 3, Francisco: 0, Lyka: 0, Jenny: 0 })} />);

    expect(markup).toContain("Stephanny wins $50.");
    expect(markup).toContain("5 pts");
    expect(markup).toContain("$50");
    expect(markup).toContain("Giann");
    expect(markup).toContain("3 pts");
  });

  it("renders tied winners and split winnings for a first-place tie", () => {
    const markup = renderToStaticMarkup(<FinalResultsBoard state={buildResultsState({ Stephanny: 4, Giann: 4, Francisco: 0, Lyka: 0, Jenny: 0 })} />);

    expect(markup).toContain("Stephanny and Giann split the top winnings.");
    expect(markup).toContain("$42.50");
    expect(markup.match(/SPLIT/g)).toHaveLength(2);
  });
});
