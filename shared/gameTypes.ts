import type { AnswerColor, GameQuestion, PlayerName } from "./gameData";

export type GamePhase =
  | "lobby"
  | "demo"
  | "orderReveal"
  | "roundReady"
  | "countdown"
  | "roundActive"
  | "roundSummary"
  | "tiebreaker"
  | "results";

export type GamePlayer = {
  name: PlayerName;
  score: number;
  connected: boolean;
  completed: boolean;
  primaryOrder: string[];
  reserveOrder: string[];
  primaryCursor: number;
  reserveCursor: number;
  claimToken?: string;
};

export type Feedback = {
  player: PlayerName;
  correct: boolean;
  correctColor: AnswerColor;
  answerColor: AnswerColor;
  questionId: string;
};

export type TieState = {
  eligible: PlayerName[];
  index: number;
  answerers: PlayerName[];
  winner: PlayerName | null;
  exhausted: boolean;
};

export type GameState = {
  sessionId: string;
  questionBankVersion: string;
  claimEpoch: string;
  phase: GamePhase;
  players: Record<PlayerName, GamePlayer>;
  turnOrder: PlayerName[];
  turnIndex: number;
  activePlayer: PlayerName | null;
  currentQuestionId: string | null;
  questionOrdinal: number;
  demoIndex: number;
  roundEndsAt: number | null;
  paused: boolean;
  pausedRemainingMs: number | null;
  feedback: Feedback | null;
  tie: TieState | null;
  message: string | null;
  updatedAt: number;
};

export type PublicGameQuestion = Pick<GameQuestion, "id" | "category" | "prompt" | "options">;

export type PublicGameState = Omit<GameState, "players" | "currentQuestionId"> & {
  currentQuestion: PublicGameQuestion | null;
  players: Record<PlayerName, Pick<GamePlayer, "name" | "score" | "connected" | "completed" | "primaryCursor" | "reserveCursor">>;
};
