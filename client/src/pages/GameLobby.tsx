import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, ChevronRight, Headphones, Info, LockKeyhole, Sparkles } from "lucide-react";
import { PLAYERS, type PlayerName } from "@shared/gameData";
import { GameChrome } from "@/components/GameChrome";
import { LiveStage } from "@/components/LiveStage";
import { useLiveGame } from "@/hooks/useLiveGame";
import { armGameSound, isGameSoundEnabled, muteGameSound } from "@/lib/gameSound";

export default function GameLobby() {
  const { state, connected, player, error, join } = useLiveGame();
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState<PlayerName | null>(player);
  const [soundEnabled, setSoundEnabled] = useState(() => isGameSoundEnabled());
  const [joining, setJoining] = useState(false);
  const statuses = state?.players;

  useEffect(() => {
    if (!player) setSelected(null);
  }, [player]);

  async function enterRoom() {
    if (!selected) return;
    setJoining(true);
    const joined = await join(selected);
    setJoining(false);
    if (joined) navigate("/play");
  }

  function toggleSound() {
    if (soundEnabled) {
      muteGameSound();
      setSoundEnabled(false);
      return;
    }
    setSoundEnabled(armGameSound());
  }

  return (
    <div className="game-shell lobby-shell">
      <GameChrome connected={connected} />
      <main className="lobby-main">
        <section className="lobby-hero" aria-labelledby="lobby-title">
          <LiveStage />
          <div className="lobby-copy">
            <div className="live-kicker"><span /> LIVE TEAM ICEBREAKER <i>•</i> UP TO 5 PLAYERS + 1 HOST</div>
            <h1 id="lobby-title">TAKE THE<br /><em>HOT SEAT.</em></h1>
            <p>
              The color-coded trivia room is open. Pick your name, enable sound, and wait for the host to lock the joined roster. The game can start with one or more players.
            </p>
            <div className="lobby-rule-row">
              <span><Check aria-hidden="true" /> 60-second hot seat</span>
              <span><Check aria-hidden="true" /> No-repeat reserve pool</span>
              <span><Check aria-hidden="true" /> Server-timed scoring</span>
            </div>
          </div>
          <aside className="lobby-side-card">
            <span>GAME STATUS</span>
            <strong>{state?.phase === "lobby" ? "STANDING BY" : "IN SESSION"}</strong>
            <p>{state?.message ?? "Connecting to the host room…"}</p>
            <div className="signal-line"><i /><i /><i /><i /></div>
          </aside>
        </section>

        <section className="join-console" aria-labelledby="join-title">
          <div className="join-intro">
            <span className="console-label">01 / CHECK IN</span>
            <h2 id="join-title">WHO’S PLAYING?</h2>
            <p>Choose your own identity. A name can be active in only one browser at a time.</p>
          </div>
          <div className="player-grid" role="radiogroup" aria-label="Choose your player identity">
            {PLAYERS.map((name, index) => {
              const joined = statuses?.[name]?.connected;
              const chosen = selected === name;
              return (
                <button
                  type="button"
                  key={name}
                  role="radio"
                  aria-checked={chosen}
                  className={`player-select ${chosen ? "selected" : ""} ${joined && !chosen ? "occupied" : ""}`}
                  onClick={() => setSelected(name)}
                  disabled={Boolean(joined && !chosen)}
                >
                  <span>0{index + 1}</span>
                  <strong>{name}</strong>
                  <small>{chosen ? "SELECTED" : joined ? "IN ROOM" : "AVAILABLE"}</small>
                </button>
              );
            })}
          </div>
          <div className="join-actions">
            <button type="button" className={`sound-control ${soundEnabled ? "enabled" : ""}`} onClick={toggleSound}>
              <Headphones aria-hidden="true" /> {soundEnabled ? "SOUND ARMED" : "ENABLE SOUND"}
            </button>
            <button type="button" className="enter-game" disabled={!selected || joining} onClick={enterRoom}>
              {joining ? "CONNECTING…" : "JOIN LIVE ROOM"} <ChevronRight aria-hidden="true" />
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </section>

        <section className="lobby-notes" aria-label="How the game works">
          <article><Info aria-hidden="true" /><div><strong>ANSWER RULE</strong><p>During live rounds, only the player in the hot seat can answer. The demo is the exception.</p></div></article>
          <article><Sparkles aria-hidden="true" /><div><strong>RESERVE RULE</strong><p>If you finish 13 primary questions early, six non-repeating reserves take over automatically, including one Color Trap Special.</p></div></article>
          <article><LockKeyhole aria-hidden="true" /><div><strong>HOST RULE</strong><p>The host console is protected. Players enter without a passcode and never see control buttons.</p></div></article>
        </section>
      </main>
    </div>
  );
}
