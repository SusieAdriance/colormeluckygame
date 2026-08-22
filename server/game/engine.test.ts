import { describe, expect, it } from "vitest";
import {
  activateRound,
  advanceRoundQuestion,
  beginCountdown,
  claimPlayer,
  createGameState,
  currentQuestion,
  disconnectPlayer,
  finishRound,
  findTiedPlayers,
  revealOrder,
  startTiebreaker,
  submitRoundAnswer,
  submitTiebreakerAnswer,
  toPublicQuestion,
  toPublicState,
} from "./engine";
import { RESERVE_QUESTIONS, type GameQuestion } from "@shared/gameData";

describe("Color Me Lucky game engine", () => {
  it("locks a live answer to the active hot-seat player", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny"];
    beginCountdown(state, 1_000);
    state.phase = "roundActive";
    state.roundEndsAt = 61_000;

    expect(() => submitRoundAnswer(state, "Giann", "red", 1_500)).toThrow(
      "Only the hot-seat player can answer this question.",
    );
  });

  it("moves to a player-specific reserve question after the primary pool is exhausted", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny"];
    beginCountdown(state, 1_000);
    state.phase = "roundActive";
    state.roundEndsAt = 61_000;
    state.players.Stephanny.primaryCursor = state.players.Stephanny.primaryOrder.length;
    state.players.Stephanny.reserveCursor = 0;

    expect(advanceRoundQuestion(state, 2_000)).toBe(true);
    expect(RESERVE_QUESTIONS.Stephanny.map(question => question.id)).toContain(currentQuestion(state)?.id);
    expect(state.players.Stephanny.reserveCursor).toBe(1);
  });

  it("locks a standard game to the joined roster, including a single-player game", () => {
    const state = createGameState(0);
    claimPlayer(state, "Stephanny");

    revealOrder(state, 1_000);

    expect(state.turnOrder).toEqual(["Stephanny"]);
    expect(state.message).toContain("1 player");
    expect(() => beginCountdown(state, 2_000)).not.toThrow();
    expect(state.activePlayer).toBe("Stephanny");
  });

  it("requires at least one joined seat before locking the roster", () => {
    const state = createGameState(0);
    expect(() => revealOrder(state, 1_000)).toThrow("At least one player must join");
  });

  it("normalizes a legacy all-five lobby message in the public payload", () => {
    const state = createGameState(0);
    state.message = "Waiting for all five players to join.";

    expect(toPublicState(state).message).toBe("Waiting for at least one player to join.");
  });

  it("transitions a server-issued deadline from countdown through the active round to its summary", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny"];

    beginCountdown(state, 1_000);
    expect(state.phase).toBe("countdown");
    expect(state.roundEndsAt).toBe(4_000);

    activateRound(state, 4_000);
    expect(state.phase).toBe("roundActive");
    expect(state.roundEndsAt).toBe(64_000);

    finishRound(state, 64_000);
    expect(state.phase).toBe("roundSummary");
    expect(state.roundEndsAt).toBeNull();
    expect(state.players.Stephanny.completed).toBe(true);
  });

  it("uses the dedicated tiebreaker bank and awards the first correct server-received response", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny", "Giann", "Francisco", "Lyka", "Jenny"];
    state.players.Stephanny.score = 8;
    state.players.Giann.score = 8;
    state.players.Francisco.score = 4;
    state.players.Lyka.score = 3;
    state.players.Jenny.score = 2;

    startTiebreaker(state, 1_000);
    expect(currentQuestion(state)?.id).toBe("TB1");
    expect(() => submitTiebreakerAnswer(state, "Francisco", "blue", 1_100)).toThrow(
      "Only tied players may answer the tiebreaker.",
    );

    const correctColor = currentQuestion(state)?.correctColor;
    expect(correctColor).toBeDefined();
    expect(submitTiebreakerAnswer(state, "Giann", correctColor!, 1_200)).toBe(true);
    expect(state.phase).toBe("results");
    expect(state.tie?.winner).toBe("Giann");
  });

  it("limits tiebreaker eligibility to tied leaders in the locked roster", () => {
    const state = createGameState(0);
    state.turnOrder = ["Stephanny", "Giann"];
    state.players.Stephanny.score = 4;
    state.players.Giann.score = 4;
    state.players.Francisco.score = 99;

    expect(findTiedPlayers(state)).toEqual(["Stephanny", "Giann"]);
    startTiebreaker(state, 1_000);
    expect(state.tie?.eligible).toEqual(["Stephanny", "Giann"]);
  });

  it("keeps claim tokens private and question answers redacted in public state", () => {
    const state = createGameState(0);
    const token = claimPlayer(state, "Stephanny");
    expect(() => claimPlayer(state, "Stephanny", "not-the-token", state.claimEpoch)).toThrow("already active");
    expect(token).toEqual(expect.any(String));

    state.turnOrder = ["Stephanny"];
    beginCountdown(state, 1_000);
    const publicState = toPublicState(state);
    expect(publicState.currentQuestion).not.toHaveProperty("correctColor");
    expect(publicState.currentQuestion).not.toHaveProperty("colorTrap");
    expect(publicState).not.toHaveProperty("currentQuestionId");
    expect(publicState.players.Stephanny).not.toHaveProperty("claimToken");
  });

  it("removes an inline Color Trap marker from the player-visible prompt", () => {
    const sourceQuestion: GameQuestion = {
      id: "Q-trap",
      category: "COLOR TRAP",
      prompt: "**[COLOR TRAP]** What color is a lobster's blood?",
      options: [
        { color: "red", label: "Red" },
        { color: "blue", label: "Green" },
        { color: "green", label: "Blue" },
        { color: "yellow", label: "Clear" },
      ],
      correctColor: "yellow",
      correctLabel: "Clear",
      colorTrap: true,
    };

    const publicQuestion = toPublicQuestion(sourceQuestion);
    expect(publicQuestion.category).toBe("LIVE QUESTION");
    expect(publicQuestion.prompt).toBe("What color is a lobster's blood?");
    expect(publicQuestion).not.toHaveProperty("colorTrap");
    expect(publicQuestion).not.toHaveProperty("correctColor");
  });

  it("expires old player claims after a host reset and ignores stale disconnects", () => {
    const priorGame = createGameState(0);
    const oldToken = claimPlayer(priorGame, "Lyka");
    const resetGame = createGameState(1_000);

    expect(() => claimPlayer(resetGame, "Lyka", oldToken, priorGame.claimEpoch)).toThrow("claim expired");
    const newToken = claimPlayer(resetGame, "Lyka");
    expect(disconnectPlayer(resetGame, "Lyka", oldToken)).toBe(false);
    expect(resetGame.players.Lyka.connected).toBe(true);
    expect(disconnectPlayer(resetGame, "Lyka", newToken)).toBe(true);
    expect(resetGame.players.Lyka.connected).toBe(false);
  });

  it("stamps each fresh room with the active question-bank version", async () => {
    const { QUESTION_BANK_VERSION } = await import("@shared/gameData");
    expect(createGameState(0).questionBankVersion).toBe(QUESTION_BANK_VERSION);
  });
});
