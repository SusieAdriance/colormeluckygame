/**
 * Studio Signal design: a broadcast-modern technical review using deep navy,
 * signal gold, functional answer colors, and an asymmetric production-rundown layout.
 */
import { useState } from "react";
import { reserveQuestions } from "@/lib/reserveQuestions";
import "./reserve.css";
import {
  Activity,
  ArrowDownRight,
  AudioLines,
  BadgeCheck,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Cpu,
  Globe2,
  LockKeyhole,
  Network,
  PauseCircle,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Decision = {
  id: string;
  priority: "Approved";
  cue: string;
  title: string;
  summary: string;
  detail: string;
};

const decisions: Decision[] = [
  {
    id: "pool",
    priority: "Approved",
    cue: "01 / GAMEPLAY",
    title: "Reserve questions load after Q13.",
    summary: "The 60-second round keeps moving without reusing a question.",
    detail:
      "After a player completes their 13 primary questions, the server automatically loads the next unused question from that player’s assigned five-question reserve pool. Reserve questions follow the same scoring, sound, feedback, and no-repeat rules as the primary bank.",
  },
  {
    id: "answering",
    priority: "Approved",
    cue: "02 / ACCESS",
    title: "The hot seat owns live answers.",
    summary: "Everyone sees the question; only the active player can influence it.",
    detail:
      "During a live round, answer controls should be enabled only for the active player and the server should reject all other submissions. The demo round is the deliberate exception: all registered players can answer to test the interface.",
  },
  {
    id: "tie",
    priority: "Approved",
    cue: "03 / FAIRNESS",
    title: "The server receipt time breaks a tie.",
    summary: "The first correct tiebreaker answer received by the server wins.",
    detail:
      "Tiebreaker questions remain a separate five-question pool. To make the rule clear across Florida, Puerto Rico, and the Philippines, the winner is the first player with a correct answer received by the authoritative server. The host displays this rule before the first tiebreaker begins.",
  },
  {
    id: "host",
    priority: "Approved",
    cue: "04 / CONTROL",
    title: "The host console stays private.",
    summary: "Easy player entry does not expose game-driving controls.",
    detail:
      "Keep player identity selection password-free, but require a private host passcode or a secret host invite link for starting, pausing, advancing, tiebreaking, and ending the session.",
  },
];

const readinessChecks = [
  "One server-authoritative game room",
  "Live state broadcast to six browsers",
  "Reconnect and state-sync behavior",
  "Sound enablement after user interaction",
];

const qualityNotes = [
  {
    label: "Single-answer integrity",
    detail: "Replace Player 3, Q32 before launch: the current options acknowledge more than one technically correct answer.",
  },
  {
    label: "Team-specific facts",
    detail: "Susie’s dog-breed answer is now confirmed as Shorkie Poo; confirm any remaining event-specific facts just before game night.",
  },
  {
    label: "Color contrast",
    detail: "Use near-black answer text rather than white; green and yellow fail the specified contrast threshold with white text.",
  },
  {
    label: "Audio permissions",
    detail: "Offer a clear “Join Game & Enable Sound” action because browsers may block audible autoplay.",
  },
];

const rehearsal = [
  ["Host control", "Only the private host path can drive the game."],
  ["Hot-seat lock", "Only the active player can submit an answer."],
  ["Deadline", "The server scores answers received before zero."],
  ["Reconnect", "A refresh restores the right identity and live state."],
  ["Tiebreaker", "The first correct answer received by the server wins."],
  ["Reserve pool", "After Q13, the next unused player-specific reserve question loads."],
  ["Audio", "The game stays usable with sound enabled or muted."],
];

export default function Home() {
  const [openDecision, setOpenDecision] = useState<string | null>("pool");
  const [selectedReservePlayer, setSelectedReservePlayer] = useState(1);
  const selectedReserveQuestions = reserveQuestions.filter(
    (question) => question.player === selectedReservePlayer,
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to review
      </a>

      <header className="site-header" aria-label="Color Me Lucky review navigation">
        <a className="brand-lockup" href="#top" aria-label="Color Me Lucky review home">
          <img
            src="/brand/signal-wheel.png"
            alt=""
            className="brand-mark"
          />
          <span className="brand-type">COLOR ME LUCKY</span>
          <span className="brand-slash">/</span>
          <span className="brand-subtype">TECHNICAL REVIEW</span>
        </a>
        <nav className="header-nav" aria-label="Review sections">
          <a href="#verdict">Verdict</a>
          <a href="#decisions">Rules</a>
          <a href="#reserve">Reserve bank</a>
          <a href="#rehearsal">Rehearsal</a>
        </nav>
        <a className="header-action" href="#decisions">
          Resolve before play <ArrowDownRight aria-hidden="true" />
        </a>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image-wrap" aria-hidden="true">
            <img
              src="/brand/hero.png"
              alt=""
              className="hero-image"
            />
            <div className="hero-image-vignette" />
          </div>
          <div className="hero-content">
            <div className="eyebrow-row">
              <span className="on-air-dot" />
              <span>TEAM EDITION / JUL 26 2026</span>
              <span className="eyebrow-rule" />
              <span>5 PLAYERS + 1 HOST</span>
            </div>
            <p className="hero-kicker">TECHNICAL REVIEW / READYNESS CHECK</p>
            <h1 id="hero-title">
              SIX BROWSERS.
              <br />
              <em>ONE LIVE ROOM.</em>
              <br />
              READY FOR AIR.
            </h1>
            <p className="hero-summary">
              Color Me Lucky is a low-compute, high-engagement team game. The build is feasible;
              the meaningful work is dependable shared state, clear operator controls, and a fair
              countdown for every player.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#verdict">
                Read the verdict <ArrowDownRight aria-hidden="true" />
              </a>
              <span className="hero-note">Prepared for Susie Adriance</span>
            </div>
          </div>
          <aside className="hero-signal-card" aria-label="Readiness signal">
            <div className="signal-card-topline">
              <Radio aria-hidden="true" />
              <span>LIVE READINESS</span>
            </div>
            <strong>READY</strong>
            <div className="signal-meter" aria-label="Four approved operating rules">
              <span className="meter-red" />
              <span className="meter-blue" />
              <span className="meter-green" />
              <span className="meter-yellow" />
            </div>
            <p>WITH 4 RULES APPROVED</p>
          </aside>
          <div className="hero-corner hero-corner-a" aria-hidden="true" />
          <div className="hero-corner hero-corner-b" aria-hidden="true" />
        </section>

        <section id="verdict" className="rundown-layout section-space" aria-labelledby="verdict-title">
          <aside className="rundown-rail" aria-label="Production rundown">
            <span className="rail-title">PRODUCTION RUNDOWN</span>
            <a href="#verdict" className="rail-current">01 / Verdict</a>
            <a href="#architecture">02 / Live room</a>
            <a href="#decisions">03 / Approved rules</a>
            <a href="#reserve">04 / Reserve bank</a>
            <a href="#quality">05 / Quality desk</a>
            <a href="#rehearsal">06 / Rehearsal</a>
          </aside>

          <div className="rundown-main">
            <div className="cue-line">
              <span>01</span>
              <span>THE EXECUTIVE VERDICT</span>
            </div>
            <div className="verdict-grid">
              <div className="verdict-copy">
                <h2 id="verdict-title">The game is not compute-intensive. It is state-intensive.</h2>
                <p>
                  There is no video processing, no runtime AI, no large question database, and no
                  specialist game engine required. One lightweight server needs to manage the
                  current phase, scores, timers, questions, and answer locks while every browser
                  receives the same state at the same time.
                </p>
                <p>
                  That distinction is the entire build strategy: use a polished web interface for
                  display, and let one server-authoritative live room make the final call on every
                  score and deadline.
                </p>
              </div>
              <div className="verdict-stamp">
                <BadgeCheck aria-hidden="true" />
                <span>BUILDABLE</span>
                <small>Bounded scope. Clear path.</small>
              </div>
            </div>

            <div className="capacity-strip" aria-label="Compute capacity assessment">
              <div className="capacity-lead">
                <Cpu aria-hidden="true" />
                <div>
                  <span>PLANNING ENVELOPE</span>
                  <strong>Small, persistent, realtime.</strong>
                </div>
              </div>
              <div className="capacity-stat">
                <strong>6</strong>
                <span>simultaneous browsers</span>
              </div>
              <div className="capacity-stat">
                <strong>1 ×</strong>
                <span>long-lived game room</span>
              </div>
              <div className="capacity-stat">
                <strong>1 vCPU</strong>
                <span>comfortable target</span>
              </div>
              <div className="capacity-stat capacity-stat-gold">
                <strong>512 MB</strong>
                <span>comfortable target</span>
              </div>
            </div>
            <p className="capacity-footnote">
              This is a technical capacity assessment, not a platform-usage, credit, or billing
              estimate.
            </p>
          </div>
        </section>

        <section id="architecture" className="architecture-section section-space" aria-labelledby="architecture-title">
          <div className="architecture-copy">
            <div className="cue-line cue-line-light">
              <span>02</span>
              <span>THE LIVE ROOM</span>
            </div>
            <h2 id="architecture-title">One source of truth. Six bright endpoints.</h2>
            <p>
              The host and the game server decide. Browsers display the result and request actions.
              That keeps scores, answer timing, question order, and tiebreaker results synchronized
              between Florida, Puerto Rico, and the Philippines.
            </p>
            <div className="architecture-rules">
              <div>
                <span className="rule-icon"><Clock3 aria-hidden="true" /></span>
                <div>
                  <strong>Server-timed</strong>
                  <p>The server issues a round deadline; each browser renders the countdown.</p>
                </div>
              </div>
              <div>
                <span className="rule-icon"><ShieldCheck aria-hidden="true" /></span>
                <div>
                  <strong>Server-validated</strong>
                  <p>The server accepts only an eligible, unexpired, unanswered submission.</p>
                </div>
              </div>
              <div>
                <span className="rule-icon"><Network aria-hidden="true" /></span>
                <div>
                  <strong>State-synced</strong>
                  <p>A refresh or reconnect returns a player to the correct live state.</p>
                </div>
              </div>
            </div>
          </div>
          <figure className="world-figure">
            <img
              src="/brand/world-signal.png"
              alt="Abstract globe with gold connection arcs and colored signal nodes"
            />
            <figcaption>
              <Globe2 aria-hidden="true" />
              <span>Realtime delivery is lightweight; consistency is the real product.</span>
            </figcaption>
          </figure>
          <div className="event-flow" aria-label="Shared game state events">
            <span>HOST COMMAND</span>
            <i />
            <span>AUTHORITATIVE STATE</span>
            <i />
            <span>LIVE DISPLAY</span>
          </div>
        </section>

        <section className="insight-mosaic section-space" aria-labelledby="flow-title">
          <div className="mosaic-visual">
            <img
              src="/brand/capacity.png"
              alt="Abstract gold core connecting to six colored signal points"
            />
            <div className="mosaic-visual-label">
              <Activity aria-hidden="true" />
              <span>LOW COMPUTE / HIGH COORDINATION</span>
            </div>
          </div>
          <div className="mosaic-copy">
            <div className="cue-line">
              <span>60s</span>
              <span>THE TIMEBOX IS THE PRODUCT</span>
            </div>
            <h2 id="flow-title">The server should own the buzzer.</h2>
            <p>
              A client clock can animate beautifully, but it cannot decide a close call fairly. Send
              a server-calculated <code>roundEndsAt</code> timestamp to all clients, then timestamp
              every answer as it reaches the live room. That directly handles the brief’s rule:
              count an answer only if it arrives before 0:00.
            </p>
            <div className="event-pills">
              <span>JOIN</span>
              <span>START</span>
              <span>ANSWER</span>
              <span>PAUSE</span>
              <span>SYNC</span>
              <span>RESULT</span>
            </div>
          </div>
          <div className="mosaic-stat-card">
            <span className="stat-cue">ILLUSTRATIVE MAX</span>
            <strong>≈ 1,380</strong>
            <p>small realtime state deliveries during a full game including all tiebreakers.</p>
            <div className="stat-divider" />
            <strong>≈ 2.695 MB</strong>
            <p>at an illustrative 2 KB per state delivery.</p>
          </div>
        </section>

        <section id="decisions" className="decisions-section section-space" aria-labelledby="decisions-title">
          <div className="section-heading">
            <div>
              <div className="cue-line">
                <span>03</span>
                <span>FOUR APPROVED OPERATING RULES</span>
              </div>
              <h2 id="decisions-title">The rules are set. The live room has a clear playbook.</h2>
            </div>
            <p>
              The specification now has an explicit operating rule for the reserve pool, hot-seat
              answers, tiebreaker timing, and host controls. These rules protect the shared
              experience on game night.
            </p>
          </div>

          <div className="decision-grid">
            {decisions.map((decision, index) => {
              const isOpen = openDecision === decision.id;
              return (
                <article className={`decision-card ${isOpen ? "decision-card-open" : ""}`} key={decision.id}>
                  <button
                    type="button"
                    onClick={() => setOpenDecision(isOpen ? null : decision.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${decision.id}-detail`}
                  >
                    <span className="decision-topline">
                      <span className={`priority-tag priority-${decision.priority.toLowerCase()}`}>{decision.priority}</span>
                      <span>{decision.cue}</span>
                      <ChevronDown className="decision-chevron" aria-hidden="true" />
                    </span>
                    <span className="decision-number">0{index + 1}</span>
                    <strong>{decision.title}</strong>
                    <span className="decision-summary">{decision.summary}</span>
                  </button>
                  <div id={`${decision.id}-detail`} className="decision-detail" hidden={!isOpen}>
                    <p>{decision.detail}</p>
                    <span className="decision-confirm"><Check aria-hidden="true" /> Rule approved</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="reserve" className="reserve-section" aria-labelledby="reserve-title">
          <div className="reserve-heading">
            <div>
              <div className="cue-line">
                <span>04</span>
                <span>APPROVED RESERVE QUESTION BANK</span>
              </div>
              <h2 id="reserve-title">A 25-question safety net keeps the round moving.</h2>
            </div>
            <p>
              The reserve bank is separate from the five tiebreakers. Each player receives five
              pre-assigned questions, loaded automatically only after their 13 primary questions
              are exhausted. No question is reused anywhere in the game.
            </p>
          </div>

          <div className="reserve-ledger">
            <aside className="reserve-logic">
              <span>AUTOMATIC HANDOFF</span>
              <strong>Q13 → R1</strong>
              <p>
                The server advances to the next unused reserve question without pausing the live
                countdown or changing the player’s scoring rules.
              </p>
            </aside>
            <div>
              <div className="reserve-stats" aria-label="Reserve bank summary">
                <div className="reserve-stat"><strong>25</strong><span>reserve questions</span></div>
                <div className="reserve-stat"><strong>5 × 5</strong><span>questions by player</span></div>
                <div className="reserve-stat"><strong>98</strong><span>total unique questions</span></div>
              </div>
              <div className="reserve-tab-row" role="group" aria-label="Choose a player reserve pool">
                {[1, 2, 3, 4, 5].map((player) => (
                  <button
                    type="button"
                    key={player}
                    aria-pressed={selectedReservePlayer === player}
                    onClick={() => setSelectedReservePlayer(player)}
                  >
                    PLAYER {player}
                  </button>
                ))}
              </div>
              <div className="reserve-panel">
                <div className="reserve-panel-title">
                  <strong>PLAYER {selectedReservePlayer} / ON DECK</strong>
                  <span>5 UNUSED RESERVES</span>
                </div>
                <div className="reserve-question-grid">
                  {selectedReserveQuestions.map((question) => (
                    <article className="reserve-question-card" key={question.id}>
                      <div className="reserve-card-meta">
                        <span>{question.id}</span>
                        <span>{question.category.toUpperCase()}</span>
                        {question.colorTrap && <span className="reserve-trap">COLOR TRAP</span>}
                      </div>
                      <h3>{question.prompt}</h3>
                      <ul className="reserve-options">
                        {question.options.map((option) => (
                          <li data-correct={option.correct} key={`${question.id}-${option.color}`}>
                            <span className={`answer-swatch answer-${option.color}`} />
                            <span>{option.label}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="reserve-answer">
                        <span className="reserve-answer-label">ANSWER</span>
                        <strong>{question.answer}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <p className="reserve-note"><Check aria-hidden="true" /> Reserve questions use the same display, scoring, checkmark/X feedback, and sound behavior as primary questions.</p>
            </div>
          </div>
        </section>

        <section id="quality" className="quality-section section-space" aria-labelledby="quality-title">
          <div className="quality-intro">
            <div className="cue-line cue-line-light">
              <span>05</span>
              <span>QUALITY DESK</span>
            </div>
            <h2 id="quality-title">A polished game still needs a fact check.</h2>
            <p>
              The question bank is generous and team-aware. These small editorial adjustments help
              keep the room laughing, moving, and trusting the scoreboard.
            </p>
            <figure className="host-console-figure">
              <img
                src="/brand/host-console.png"
                alt="Dark broadcast control console with a gold control and colored status lamps"
              />
              <figcaption>Operator clarity is part of the game design.</figcaption>
            </figure>
          </div>
          <div className="quality-list">
            {qualityNotes.map((note, index) => (
              <article className="quality-item" key={note.label}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{note.label}</h3>
                  <p>{note.detail}</p>
                </div>
                <CircleAlert aria-hidden="true" />
              </article>
            ))}
            <aside className="accessibility-note">
              <Sparkles aria-hidden="true" />
              <p>
                <strong>Design note:</strong> Color is part of the game, not the only signal. Pair
                every answer color with readable text, a visible focus state, and a clear answer
                label.
              </p>
            </aside>
          </div>
        </section>

        <section id="rehearsal" className="rehearsal-section section-space" aria-labelledby="rehearsal-title">
          <div className="rehearsal-heading">
            <div className="cue-line">
              <span>06</span>
              <span>FIVE-MINUTE REHEARSAL</span>
            </div>
            <h2 id="rehearsal-title">Run the edge cases before the prize money is on the line.</h2>
          </div>
          <div className="rehearsal-grid">
            <div className="rehearsal-brief">
              <span className="rehearsal-time"><PauseCircle aria-hidden="true" /> 05:00</span>
              <p>
                This is the most valuable final check. Test the host controls, one refresh, one
                ineligible answer, one tiebreaker, and the sound-enable step in Chrome before the
                team joins the call.
              </p>
              <div className="brief-actions">
                <span><LockKeyhole aria-hidden="true" /> Host path protected</span>
                <span><AudioLines aria-hidden="true" /> Sound toggle verified</span>
              </div>
            </div>
            <div className="rehearsal-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>TEST CUE</th>
                    <th>PASS CONDITION</th>
                  </tr>
                </thead>
                <tbody>
                  {rehearsal.map(([test, condition]) => (
                    <tr key={test}>
                      <td>{test}</td>
                      <td>{condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="final-callout" aria-label="Final recommendation">
          <div className="final-callout-mark" aria-hidden="true">
          <img src="/brand/signal-wheel.png" alt="" />
          </div>
          <div>
            <span>FINAL CALL</span>
            <h2>Proceed with the build.</h2>
            <p>
              Color Me Lucky is a low-runtime-compute, high-engagement game. Set the four rules,
              use the approved reserve bank, and move directly into build and rehearsal.
            </p>
          </div>
          <a href="#top" className="back-to-top">Back to top <ArrowDownRight aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <span>COLOR ME LUCKY</span>
          <p>Technical Review / Team Edition</p>
        </div>
        <p>Prepared from the approved game specification. Source review: July 26, 2026.</p>
        <div className="footer-signal" aria-label="Four game answer colors">
          <i className="footer-red" />
          <i className="footer-blue" />
          <i className="footer-green" />
          <i className="footer-yellow" />
        </div>
      </footer>
    </div>
  );
}
