import { QUESTION_BANK_VERSION, type AnswerColor, type PlayerName } from "@shared/gameData";
import type { GameState, PublicGameState } from "@shared/gameTypes";
import { loadGameSession, saveGameSession } from "../db";
import {
  activateRound,
  advanceDemo,
  advanceRoundQuestion,
  beginCountdown,
  claimPlayer,
  createGameState,
  disconnectPlayer,
  finishRound,
  getQuestion,
  nextPlayer,
  pauseGame,
  revealOrder,
  resumeGame,
  startDemo,
  startTiebreaker,
  submitRoundAnswer,
  submitTiebreakerAnswer,
  toPublicState,
} from "./engine";

type Listener = (state: PublicGameState) => void;
type ResetListener = () => void;

export function shouldResetForQuestionBank(snapshot: Partial<GameState>) {
  return snapshot.questionBankVersion !== QUESTION_BANK_VERSION;
}

class LiveGameService {
  private state = createGameState();
  private loaded = false;
  private loading: Promise<void> | null = null;
  private listeners = new Set<Listener>();
  private resetListeners = new Set<ResetListener>();
  private deadlineTimer: ReturnType<typeof setTimeout> | null = null;
  private feedbackTimer: ReturnType<typeof setTimeout> | null = null;
  private demoTimer: ReturnType<typeof setTimeout> | null = null;

  async ensureLoaded() {
    if (this.loaded) return;
    if (!this.loading) {
      this.loading = (async () => {
        const snapshot = await loadGameSession();
        if (snapshot) {
          if (shouldResetForQuestionBank(snapshot)) {
            this.state = createGameState();
            await saveGameSession(this.state);
          } else {
            if (!snapshot.claimEpoch) snapshot.claimEpoch = crypto.randomUUID();
            this.state = snapshot;
          }
        }
        this.loaded = true;
        this.recoverTimers();
      })();
    }
    await this.loading;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  subscribeReset(listener: ResetListener) {
    this.resetListeners.add(listener);
    return () => this.resetListeners.delete(listener);
  }

  async getState() {
    await this.ensureLoaded();
    return toPublicState(this.state);
  }

  private clearDeadline() {
    if (this.deadlineTimer) clearTimeout(this.deadlineTimer);
    this.deadlineTimer = null;
  }

  private clearFeedback() {
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
    this.feedbackTimer = null;
  }

  private clearDemo() {
    if (this.demoTimer) clearTimeout(this.demoTimer);
    this.demoTimer = null;
  }

  private publish() {
    const publicState = toPublicState(this.state);
    this.listeners.forEach(listener => listener(publicState));
    void saveGameSession(this.state);
  }

  private recoverTimers() {
    if (this.state.paused) return;
    if (this.state.phase === "countdown" || this.state.phase === "roundActive") this.scheduleDeadline();
  }

  private scheduleDeadline() {
    this.clearDeadline();
    if (!this.state.roundEndsAt || this.state.paused) return;
    const delay = Math.max(0, this.state.roundEndsAt - Date.now());
    this.deadlineTimer = setTimeout(() => {
      if (this.state.phase === "countdown") {
        activateRound(this.state);
        this.publish();
        this.scheduleDeadline();
      } else if (this.state.phase === "roundActive") {
        finishRound(this.state);
        this.publish();
      }
    }, delay + 5);
  }

  private scheduleFeedbackAdvance() {
    this.clearFeedback();
    this.feedbackTimer = setTimeout(() => {
      advanceRoundQuestion(this.state);
      this.publish();
      this.scheduleDeadline();
    }, 800);
  }

  private scheduleDemoAdvance() {
    if (this.demoTimer) clearTimeout(this.demoTimer);
    this.demoTimer = setTimeout(() => {
      advanceDemo(this.state);
      this.publish();
    }, 800);
  }

  async reset() {
    await this.ensureLoaded();
    this.clearDeadline();
    this.clearFeedback();
    this.clearDemo();
    this.resetListeners.forEach(listener => listener());
    this.state = createGameState();
    this.publish();
    return toPublicState(this.state);
  }

  async claim(player: PlayerName, token?: string, claimEpoch?: string) {
    await this.ensureLoaded();
    const claimToken = claimPlayer(this.state, player, token, claimEpoch);
    this.publish();
    return { claimToken, state: toPublicState(this.state) };
  }

  async disconnect(player: PlayerName, token?: string) {
    await this.ensureLoaded();
    const disconnected = disconnectPlayer(this.state, player, token);
    if (disconnected && this.state.activePlayer === player && this.state.phase === "roundActive" && !this.state.paused) {
      pauseGame(this.state);
      this.clearDeadline();
    }
    this.publish();
  }

  async startDemo() {
    await this.ensureLoaded();
    startDemo(this.state);
    this.publish();
    return toPublicState(this.state);
  }

  async startGame() {
    await this.ensureLoaded();
    revealOrder(this.state);
    this.publish();
    return toPublicState(this.state);
  }

  async startRound() {
    await this.ensureLoaded();
    beginCountdown(this.state);
    this.publish();
    this.scheduleDeadline();
    return toPublicState(this.state);
  }

  async nextPlayer() {
    await this.ensureLoaded();
    nextPlayer(this.state);
    this.publish();
    return toPublicState(this.state);
  }

  async pause() {
    await this.ensureLoaded();
    pauseGame(this.state);
    this.clearDeadline();
    this.publish();
    return toPublicState(this.state);
  }

  async resume() {
    await this.ensureLoaded();
    resumeGame(this.state);
    this.publish();
    this.scheduleDeadline();
    return toPublicState(this.state);
  }

  async startTiebreaker() {
    await this.ensureLoaded();
    startTiebreaker(this.state);
    this.publish();
    return toPublicState(this.state);
  }

  async endGame() {
    await this.ensureLoaded();
    this.clearDeadline();
    this.state.phase = "results";
    this.state.roundEndsAt = null;
    this.state.message = "Game ended by host.";
    this.state.updatedAt = Date.now();
    this.publish();
    return toPublicState(this.state);
  }

  async answer(player: PlayerName, color: AnswerColor) {
    await this.ensureLoaded();
    const question = getQuestion(this.state.currentQuestionId);
    if (!question) throw new Error("No question is active.");
    if (this.state.phase === "demo") {
      const correct = question.correctColor === color;
      this.state.feedback = { player, correct, correctColor: question.correctColor, answerColor: color, questionId: question.id };
      this.state.updatedAt = Date.now();
      this.publish();
      this.scheduleDemoAdvance();
      return { correct, state: toPublicState(this.state) };
    }
    if (this.state.phase === "tiebreaker") {
      const correct = submitTiebreakerAnswer(this.state, player, color);
      this.publish();
      return { correct, state: toPublicState(this.state) };
    }
    const correct = submitRoundAnswer(this.state, player, color);
    this.publish();
    this.scheduleFeedbackAdvance();
    return { correct, state: toPublicState(this.state) };
  }
}

export const gameService = new LiveGameService();
