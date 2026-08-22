import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, CircleAlert, Clock3, Crown, Headphones, LockKeyhole, Radio, RotateCcw, UsersRound, X } from "lucide-react";
import { PLAYERS, type AnswerColor } from "@shared/gameData";
import { FinalResultsBoard } from "@/components/FinalResultsBoard";
import { GameChrome } from "@/components/GameChrome";
import { LiveStage } from "@/components/LiveStage";
import { useLiveGame } from "@/hooks/useLiveGame";
import { armGameSound, isGameSoundEnabled, muteGameSound, playGameFeedbackTone } from "@/lib/gameSound";

const answerLabels: Record<AnswerColor, string> = { red: "RED", blue: "BLUE", green: "GREEN", yellow: "YELLOW" };

function useCountdown(endsAt: number | null, paused: boolean, pausedRemainingMs: number | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 125);
    return () => window.clearInterval(interval);
  }, []);
  if (paused) return Math.ceil((pausedRemainingMs ?? 0) / 1_000);
  return Math.max(0, Math.ceil(((endsAt ?? now) - now) / 1_000));
}

function phaseTitle(phase?: string) {
  const titles: Record<string, string> = {
    lobby: "WAITING FOR THE HOST",
    demo: "DEMO ROUND",
    orderReveal: "TURN ORDER LOCKED",
    roundReady: "NEXT HOT SEAT",
    countdown: "GET READY",
    roundActive: "COLOR ME LUCKY",
    roundSummary: "ROUND COMPLETE",
    tiebreaker: "TIEBREAKER",
    results: "FINAL BOARD",
  };
  return titles[phase ?? ""] ?? "LIVE ROOM";
}

export default function PlayGame() {
  const { state, connected, player, error, answer } = useLiveGame();
  const [soundEnabled, setSoundEnabled] = useState(() => isGameSoundEnabled());
  const seconds = useCountdown(state?.roundEndsAt ?? null, Boolean(state?.paused), state?.pausedRemainingMs ?? null);
  const question = state?.currentQuestion;
  const isHotSeat = Boolean(state && player && state.activePlayer === player && state.phase === "roundActive");
  const isDemo = Boolean(state?.phase === "demo" && player);
  const isTieEligible = Boolean(state && player && state.phase === "tiebreaker" && state.tie?.eligible.includes(player));
  const canAnswer = Boolean(question && (isHotSeat || isDemo || isTieEligible) && !state?.feedback && !state?.paused);
  const activeRoster = useMemo(() => {
    if (!state) return [];
    return state.turnOrder.length > 0 ? state.turnOrder : PLAYERS.filter(name => state.players[name].connected);
  }, [state]);
  const isInGame = Boolean(player && state?.turnOrder.includes(player));

  async function selectAnswer(color: AnswerColor) {
    if (!canAnswer) return;
    const result = await answer(color);
    if (result !== null && soundEnabled) playGameFeedbackTone(result);
  }

  function toggleSound() {
    if (soundEnabled) {
      muteGameSound();
      setSoundEnabled(false);
      return;
    }
    setSoundEnabled(armGameSound());
  }

  if (!player) {
    return (
      <div className="game-shell play-shell">
        <GameChrome connected={connected} />
        <main className="identity-gate"><LockKeyhole aria-hidden="true" /><h1>CHOOSE YOUR PLAYER FIRST.</h1><p>Your player identity keeps the hot-seat answer lock fair.</p><Link href="/" className="enter-game">GO TO LOBBY</Link></main>
      </div>
    );
  }

  return (
    <div className="game-shell play-shell">
      <GameChrome connected={connected} />
      <main className="game-main">
        <section className="live-topbar" aria-label="Live game status">
          <div><span className="console-label"><Radio aria-hidden="true" /> {state?.phase === "roundActive" ? "ON AIR" : "LIVE ROOM"}</span><strong>{phaseTitle(state?.phase)}</strong></div>
          <div className="hot-seat-display"><span>HOT SEAT</span><strong>{state?.activePlayer ?? "HOST CONTROL"}</strong></div>
          <button type="button" className={`sound-control ${soundEnabled ? "enabled" : ""}`} onClick={toggleSound}><Headphones aria-hidden="true" /> {soundEnabled ? "SOUND ON" : "ENABLE SOUND"}</button>
        </section>

        <section className="game-stage" aria-labelledby="game-title">
          <LiveStage />
          <div className="timer-wheel" data-phase={state?.phase}>
            <span><Clock3 aria-hidden="true" /> TIMER</span>
            <strong>{state?.phase === "roundActive" || state?.phase === "countdown" ? `00:${String(seconds).padStart(2, "0")}` : "—"}</strong>
            {state?.paused && <small>PAUSED</small>}
          </div>
          <div className="question-deck">
            <div className="question-meta"><span>{question?.category ?? "ROOM STATUS"}</span><span>{state?.phase === "tiebreaker" ? "FIRST CORRECT RECEIPT WINS" : `QUESTION ${state?.questionOrdinal ?? 0}`}</span></div>
            <h1 id="game-title">{question?.prompt ?? state?.message ?? "Waiting for the host to start."}</h1>
            {state?.phase === "countdown" && <div className="countdown-number">{seconds || "GO"}</div>}
            {state?.phase === "roundReady" && <div className="instruction-plate"><UsersRound aria-hidden="true" /><span>Waiting for the host to open {state.activePlayer ?? "the"} hot seat.</span></div>}
            {state?.phase === "orderReveal" && <div className="instruction-plate"><Crown aria-hidden="true" /><span>{state?.turnOrder.join(" → ")}</span></div>}
            {state && state.phase !== "lobby" && state.phase !== "demo" && !isInGame && <div className="instruction-plate"><UsersRound aria-hidden="true" /><span>This game started without your seat. You can watch this round and join the next game.</span></div>}
            {state?.phase === "demo" && <div className="demo-banner">DEMO MODE / EVERYONE MAY ANSWER</div>}
            {state?.phase === "tiebreaker" && <div className="tie-banner">TIED PLAYERS: {state.tie?.eligible.join(" · ")} / FIRST CORRECT ANSWER RECEIVED BY THE SERVER WINS</div>}
          </div>
        </section>

        {question && (
          <section className="answer-grid" aria-label="Answer choices">
            {question.options.map(option => {
              const feedback = state?.feedback;
              const isCorrect = feedback?.correctColor === option.color;
              const isSelected = feedback?.answerColor === option.color;
              return (
                <button
                  type="button"
                  key={option.color}
                  className={`answer-button answer-${option.color} ${isCorrect && feedback ? "answer-correct" : ""} ${isSelected && !feedback?.correct ? "answer-wrong" : ""}`}
                  onClick={() => selectAnswer(option.color)}
                  disabled={!canAnswer}
                >
                  <span className="answer-index">{answerLabels[option.color]}</span>
                  <strong>{option.label}</strong>
                  {feedback && isCorrect && <Check aria-label="Correct answer" />}
                  {feedback && isSelected && !feedback.correct && <X aria-label="Incorrect answer" />}
                </button>
              );
            })}
          </section>
        )}

        {state?.phase === "results" && <FinalResultsBoard state={state} />}

        {state?.feedback && <div className={`feedback-flash ${state.feedback.correct ? "correct" : "wrong"}`} role="status">{state.feedback.correct ? <><Check /> CORRECT</> : <><X /> CORRECT ANSWER REVEALED</>}</div>}
        {error && <div className="game-error" role="alert"><CircleAlert aria-hidden="true" /> {error}</div>}

        <section className="score-ribbon" aria-label="Live scores">
          {activeRoster.map((name, index) => <div key={name} className={state?.activePlayer === name ? "active-player" : ""}><span>0{index + 1}</span><strong>{name}</strong><em>{state?.players[name].score ?? 0}</em></div>)}
        </section>
      </main>
    </div>
  );
}
