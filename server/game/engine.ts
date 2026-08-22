import {
  DEMO_QUESTIONS,
  PLAYERS,
  PRIMARY_QUESTIONS,
  QUESTION_BANK_VERSION,
  RESERVE_QUESTIONS,
  TIEBREAKER_QUESTIONS,
  type AnswerColor,
  type GameQuestion,
  type PlayerName,
} from "@shared/gameData";
import type { GamePlayer, GameState, PublicGameQuestion, PublicGameState } from "@shared/gameTypes";

export const GAME_SESSION_ID = "color-me-lucky-live";

const allQuestions = [
  ...DEMO_QUESTIONS,
  ...Object.values(PRIMARY_QUESTIONS).flat(),
  ...Object.values(RESERVE_QUESTIONS).flat(),
  ...TIEBREAKER_QUESTIONS,
];
const questionById = new Map(allQuestions.map(question => [question.id, question]));

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target]!, copy[index]!];
  }
  return copy;
}

function playerState(name: PlayerName): GamePlayer {
  return {
    name,
    score: 0,
    connected: false,
    completed: false,
    primaryOrder: shuffle(PRIMARY_QUESTIONS[name].map(question => question.id)),
    reserveOrder: shuffle(RESERVE_QUESTIONS[name].map(question => question.id)),
    primaryCursor: 0,
    reserveCursor: 0,
  };
}

export function createGameState(now = Date.now()): GameState {
  return {
    sessionId: GAME_SESSION_ID,
    questionBankVersion: QUESTION_BANK_VERSION,
    claimEpoch: crypto.randomUUID(),
    phase: "lobby",
    players: Object.fromEntries(PLAYERS.map(name => [name, playerState(name)])) as GameState["players"],
    turnOrder: [],
    turnIndex: 0,
    activePlayer: null,
    currentQuestionId: null,
    questionOrdinal: 0,
    demoIndex: 0,
    roundEndsAt: null,
    paused: false,
    pausedRemainingMs: null,
    feedback: null,
    tie: null,
    message: "Waiting for at least one player to join.",
    updatedAt: now,
  };
}

export function getQuestion(questionId: string | null): GameQuestion | null {
  return questionId ? questionById.get(questionId) ?? null : null;
}

export function currentQuestion(state: GameState): GameQuestion | null {
  return getQuestion(state.currentQuestionId);
}

const colorTrapMarker = /\*{0,2}\s*\[\s*color\s+trap\s*\]\s*\*{0,2}\s*/gi;

export function toPublicQuestion(question: GameQuestion): PublicGameQuestion {
  return {
    id: question.id,
    category: question.colorTrap ? "LIVE QUESTION" : question.category.replace(colorTrapMarker, "").trim() || "LIVE QUESTION",
    prompt: question.prompt.replace(colorTrapMarker, "").trim(),
    options: question.options,
  };
}

export function toPublicState(state: GameState): PublicGameState {
  const current = currentQuestion(state);
  const message = state.phase === "lobby" && state.message === "Waiting for all five players to join."
    ? "Waiting for at least one player to join."
    : state.message;
  const { currentQuestionId: _currentQuestionId, players: _privatePlayers, ...publicFields } = state;
  const players = Object.fromEntries(
    PLAYERS.map(name => {
      const player = state.players[name];
      return [name, {
        name: player.name,
        score: player.score,
        connected: player.connected,
        completed: player.completed,
        primaryCursor: player.primaryCursor,
        reserveCursor: player.reserveCursor,
      }];
    }),
  ) as PublicGameState["players"];

  return {
    ...publicFields,
    message,
    players,
    currentQuestion: current ? toPublicQuestion(current) : null,
  } as PublicGameState;
}

export function setCurrentQuestion(state: GameState, questionId: string | null) {
  state.currentQuestionId = questionId;
  state.feedback = null;
}

export function claimPlayer(state: GameState, playerName: PlayerName, token?: string, claimEpoch?: string) {
  const player = state.players[playerName];
  if (token && claimEpoch !== state.claimEpoch) {
    throw new Error("This player claim expired when the host reset the room. Choose your player again.");
  }
  if (player.claimToken && token !== player.claimToken && player.connected) {
    throw new Error(`${playerName} is already active in another browser.`);
  }
  if (!player.claimToken || token !== player.claimToken) {
    player.claimToken = crypto.randomUUID();
  }
  player.connected = true;
  state.updatedAt = Date.now();
  return player.claimToken;
}

export function disconnectPlayer(state: GameState, playerName: PlayerName, token?: string) {
  const player = state.players[playerName];
  if (token && player.claimToken !== token) return false;
  player.connected = false;
  state.updatedAt = Date.now();
  return true;
}

export function startDemo(state: GameState, now = Date.now()) {
  state.phase = "demo";
  state.demoIndex = 0;
  state.activePlayer = null;
  setCurrentQuestion(state, DEMO_QUESTIONS[0]?.id ?? null);
  state.roundEndsAt = null;
  state.paused = false;
  state.pausedRemainingMs = null;
  state.message = "Demo round: anyone may answer.";
  state.updatedAt = now;
}

export function advanceDemo(state: GameState, now = Date.now()) {
  state.demoIndex += 1;
  const next = DEMO_QUESTIONS[state.demoIndex];
  if (next) {
    setCurrentQuestion(state, next.id);
    state.message = "Demo round: anyone may answer.";
  } else {
    state.phase = "lobby";
    state.activePlayer = null;
    setCurrentQuestion(state, null);
    state.message = "Demo complete. Host may lock the joined roster.";
  }
  state.updatedAt = now;
}

export function revealOrder(state: GameState, now = Date.now()) {
  const joinedPlayers = PLAYERS.filter(name => state.players[name].connected);
  if (joinedPlayers.length === 0) throw new Error("At least one player must join before the host locks the roster.");
  state.turnOrder = shuffle(joinedPlayers);
  state.turnIndex = 0;
  state.activePlayer = null;
  state.phase = "orderReveal";
  state.message = `Turn order is locked for ${joinedPlayers.length} player${joinedPlayers.length === 1 ? "" : "s"}. Host may start the first round.`;
  state.updatedAt = now;
}

function nextQuestionForPlayer(state: GameState, playerName: PlayerName): string | null {
  const player = state.players[playerName];
  const primary = player.primaryOrder[player.primaryCursor];
  if (primary) {
    player.primaryCursor += 1;
    return primary;
  }
  const reserve = player.reserveOrder[player.reserveCursor];
  if (reserve) {
    player.reserveCursor += 1;
    return reserve;
  }
  return null;
}

export function beginCountdown(state: GameState, now = Date.now()) {
  const playerName = state.turnOrder[state.turnIndex];
  if (!playerName) throw new Error("No player is queued for this round.");
  const questionId = nextQuestionForPlayer(state, playerName);
  if (!questionId) throw new Error(`${playerName} has no remaining questions.`);
  state.activePlayer = playerName;
  state.phase = "countdown";
  state.roundEndsAt = now + 3_000;
  state.questionOrdinal = state.players[playerName].primaryCursor + state.players[playerName].reserveCursor;
  setCurrentQuestion(state, questionId);
  state.message = `It's ${playerName}'s turn.`;
  state.updatedAt = now;
}

export function activateRound(state: GameState, now = Date.now()) {
  if (state.phase !== "countdown") return;
  state.phase = "roundActive";
  state.roundEndsAt = now + 60_000;
  state.message = "Answer as many as possible before time expires.";
  state.updatedAt = now;
}

export function submitRoundAnswer(
  state: GameState,
  playerName: PlayerName,
  answerColor: AnswerColor,
  now = Date.now(),
) {
  if (state.phase !== "roundActive" || state.paused) throw new Error("The round is not accepting answers.");
  if (state.activePlayer !== playerName) throw new Error("Only the hot-seat player can answer this question.");
  if (!state.roundEndsAt || now > state.roundEndsAt) throw new Error("The round has ended.");
  if (state.feedback) throw new Error("An answer is already being processed.");
  const question = currentQuestion(state);
  if (!question) throw new Error("No active question.");
  const correct = question.correctColor === answerColor;
  if (correct) state.players[playerName].score += 1;
  state.feedback = { player: playerName, correct, correctColor: question.correctColor, answerColor, questionId: question.id };
  state.updatedAt = now;
  return correct;
}

export function advanceRoundQuestion(state: GameState, now = Date.now()) {
  if (state.phase !== "roundActive") return false;
  const playerName = state.activePlayer;
  if (!playerName) return false;
  if (!state.roundEndsAt || now >= state.roundEndsAt) {
    finishRound(state, now);
    return false;
  }
  const next = nextQuestionForPlayer(state, playerName);
  if (!next) {
    finishRound(state, now);
    return false;
  }
  state.questionOrdinal = state.players[playerName].primaryCursor + state.players[playerName].reserveCursor;
  setCurrentQuestion(state, next);
  state.updatedAt = now;
  return true;
}

export function finishRound(state: GameState, now = Date.now()) {
  const playerName = state.activePlayer;
  if (playerName) state.players[playerName].completed = true;
  state.phase = "roundSummary";
  state.roundEndsAt = null;
  state.feedback = null;
  state.message = playerName ? `${playerName} finished with ${state.players[playerName].score} points.` : "Round complete.";
  state.updatedAt = now;
}

export function nextPlayer(state: GameState, now = Date.now()) {
  if (state.phase !== "roundSummary") throw new Error("Finish the current round before advancing.");
  state.turnIndex += 1;
  state.activePlayer = null;
  setCurrentQuestion(state, null);
  if (state.turnIndex >= state.turnOrder.length) {
    state.phase = "results";
    state.message = "All rounds complete.";
  } else {
    state.phase = "roundReady";
    state.message = `${state.turnOrder[state.turnIndex]} is ready for the hot seat.`;
  }
  state.updatedAt = now;
}

export function findTiedPlayers(state: GameState): PlayerName[] {
  const roster = state.turnOrder;
  if (roster.length < 2) return [];
  const highScore = Math.max(...roster.map(name => state.players[name].score));
  const leaders = roster.filter(name => state.players[name].score === highScore);
  return leaders.length > 1 ? leaders : [];
}

export function startTiebreaker(state: GameState, now = Date.now()) {
  const eligible = findTiedPlayers(state);
  if (eligible.length < 2) throw new Error("There is no tied group to break.");
  state.phase = "tiebreaker";
  state.activePlayer = null;
  state.roundEndsAt = null;
  state.tie = { eligible, index: 0, answerers: [], winner: null, exhausted: false };
  setCurrentQuestion(state, TIEBREAKER_QUESTIONS[0]?.id ?? null);
  state.message = `Tiebreaker: ${eligible.join(" and ")}. First correct answer received by the server wins.`;
  state.updatedAt = now;
}

export function submitTiebreakerAnswer(
  state: GameState,
  playerName: PlayerName,
  answerColor: AnswerColor,
  now = Date.now(),
) {
  if (state.phase !== "tiebreaker" || !state.tie) throw new Error("No tiebreaker is active.");
  if (!state.tie.eligible.includes(playerName)) throw new Error("Only tied players may answer the tiebreaker.");
  if (state.tie.answerers.includes(playerName)) throw new Error("You have already answered this tiebreaker question.");
  const question = currentQuestion(state);
  if (!question) throw new Error("No tiebreaker question is active.");
  state.tie.answerers.push(playerName);
  if (question.correctColor === answerColor) {
    state.tie.winner = playerName;
    state.phase = "results";
    state.message = `${playerName} wins the tiebreaker — first correct answer received by the server.`;
  } else if (state.tie.answerers.length >= state.tie.eligible.length) {
    state.tie.index += 1;
    const next = TIEBREAKER_QUESTIONS[state.tie.index];
    if (next) {
      state.tie.answerers = [];
      setCurrentQuestion(state, next.id);
      state.message = "No correct answer. Next tiebreaker question.";
    } else {
      state.tie.exhausted = true;
      state.phase = "results";
      state.message = "All five tiebreakers were used. The tied prize positions split evenly.";
    }
  }
  state.updatedAt = now;
  return question.correctColor === answerColor;
}

export function pauseGame(state: GameState, now = Date.now()) {
  if (state.paused) return;
  if (state.phase !== "countdown" && state.phase !== "roundActive") throw new Error("Only a live countdown or round can be paused.");
  state.pausedRemainingMs = Math.max(0, (state.roundEndsAt ?? now) - now);
  state.roundEndsAt = null;
  state.paused = true;
  state.message = "Paused by host.";
  state.updatedAt = now;
}

export function resumeGame(state: GameState, now = Date.now()) {
  if (!state.paused) return;
  state.roundEndsAt = now + (state.pausedRemainingMs ?? 0);
  state.pausedRemainingMs = null;
  state.paused = false;
  state.message = "Game resumed.";
  state.updatedAt = now;
}
