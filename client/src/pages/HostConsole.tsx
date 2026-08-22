import { useState } from "react";
import { Link } from "wouter";
import { CircleAlert, FastForward, LockKeyhole, Pause, Play, RotateCcw, ShieldCheck, SkipForward, Trophy, UsersRound } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { GameChrome } from "@/components/GameChrome";
import { useLiveGame } from "@/hooks/useLiveGame";
import { trpc } from "@/lib/trpc";

export default function HostConsole() {
  const { state, connected } = useLiveGame();
  const { user, loading, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();
  const hostLogin = trpc.auth.login.useMutation({
    onSuccess: host => { utils.auth.me.setData(undefined, host); setPassword(""); setError(null); },
    onError: loginError => setError(loginError.message),
  });
  const onSuccess = () => void utils.game.state.invalidate();
  const reset = trpc.game.host.reset.useMutation({ onSuccess, onError: error => setError(error.message) });
  const startDemo = trpc.game.host.startDemo.useMutation({ onSuccess, onError: error => setError(error.message) });
  const startGame = trpc.game.host.startGame.useMutation({ onSuccess, onError: error => setError(error.message) });
  const startRound = trpc.game.host.startRound.useMutation({ onSuccess, onError: error => setError(error.message) });
  const nextPlayer = trpc.game.host.nextPlayer.useMutation({ onSuccess, onError: error => setError(error.message) });
  const pause = trpc.game.host.pause.useMutation({ onSuccess, onError: error => setError(error.message) });
  const resume = trpc.game.host.resume.useMutation({ onSuccess, onError: error => setError(error.message) });
  const startTiebreaker = trpc.game.host.startTiebreaker.useMutation({ onSuccess, onError: error => setError(error.message) });
  const endGame = trpc.game.host.endGame.useMutation({ onSuccess, onError: error => setError(error.message) });
  const busy = reset.isPending || startDemo.isPending || startGame.isPending || startRound.isPending || nextPlayer.isPending || pause.isPending || resume.isPending || startTiebreaker.isPending || endGame.isPending;
  const joinedPlayers = Object.values(state?.players ?? {}).filter(player => player.connected);
  const rosterCount = state?.turnOrder.length ?? 0;

  if (loading) return <div className="game-shell"><GameChrome connected={connected} /><main className="identity-gate"><ShieldCheck /><h1>CHECKING HOST CLEARANCE…</h1></main></div>;
  if (!isAuthenticated) {
    return <div className="game-shell"><GameChrome connected={connected} /><main className="identity-gate"><LockKeyhole /><h1>HOST CONSOLE IS PRIVATE.</h1><p>Enter the host password to start, pause, advance, and end the live room.</p><form className="host-password-form" onSubmit={event => { event.preventDefault(); hostLogin.mutate({ password }); }}><label htmlFor="host-password">Host password</label><input id="host-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /><button type="submit" className="enter-game" disabled={hostLogin.isPending}>{hostLogin.isPending ? "CHECKING…" : "UNLOCK HOST CONSOLE"}</button></form>{error && <p className="form-error"><CircleAlert /> {error}</p>}<Link href="/" className="minor-link">Return to lobby</Link></main></div>;
  }
  if (user?.role !== "admin") {
    return <div className="game-shell"><GameChrome connected={connected} /><main className="identity-gate"><LockKeyhole /><h1>HOST CLEARANCE REQUIRED.</h1><p>This account is signed in but is not the protected host account for this room.</p><Link href="/" className="enter-game">RETURN TO LOBBY</Link></main></div>;
  }

  return (
    <div className="game-shell host-shell">
      <GameChrome connected={connected} />
      <main className="host-main">
        <section className="host-heading"><div><span className="console-label"><ShieldCheck aria-hidden="true" /> HOST CONTROL / {user.name ?? "ADMIN"}</span><h1>PRODUCER CONSOLE.</h1><p>Every command is server-authoritative and broadcasts to the entire room.</p></div><div className="host-state"><span>LIVE PHASE</span><strong>{state?.phase?.toUpperCase().replace(/([A-Z])/g, " $1") ?? "CONNECTING"}</strong><p>{state?.message}</p></div></section>
        <section className="host-grid">
          <article className="control-stack">
            <span className="console-label">GAME RUN</span>
            <div className="control-grid">
              <button type="button" disabled={busy} onClick={() => startDemo.mutate()}><UsersRound /> Start demo</button>
              <button type="button" disabled={busy || joinedPlayers.length === 0} onClick={() => startGame.mutate()}><Play /> Lock joined roster</button>
              <button type="button" className="control-primary" disabled={busy} onClick={() => startRound.mutate()}><FastForward /> Start hot seat</button>
              <button type="button" disabled={busy} onClick={() => nextPlayer.mutate()}><SkipForward /> Next player</button>
              <button type="button" disabled={busy} onClick={() => state?.paused ? resume.mutate() : pause.mutate()}>{state?.paused ? <Play /> : <Pause />}{state?.paused ? "Resume" : "Pause"}</button>
              <button type="button" disabled={busy} onClick={() => endGame.mutate()}><Trophy /> Final board</button>
            </div>
          </article>
          <article className="control-stack tie-control">
            <span className="console-label">TIEBREAK POLICY</span>
            <h2>FIRST CORRECT RECEIPT WINS.</h2>
            <p>Eligible players receive one attempt per question. If all miss, the next dedicated tiebreaker loads. The winner is determined by the server receipt time.</p>
            <button type="button" className="enter-game" disabled={busy} onClick={() => startTiebreaker.mutate()}><Trophy /> START TIEBREAKER</button>
          </article>
          <article className="control-stack session-control">
            <span className="console-label">SESSION SAFETY</span>
            <p>Reset clears the scores, order, and player claims for a new rehearsal or live game.</p>
            <button type="button" className="danger-control" disabled={busy} onClick={() => reset.mutate()}><RotateCcw /> RESET ROOM</button>
          </article>
        </section>
        {error && <p className="form-error"><CircleAlert /> {error}</p>}
        <section className="host-player-table"><div className="table-title"><strong>ROOM ROSTER</strong><span>{joinedPlayers.length}/5 CONNECTED{rosterCount > 0 ? ` • ${rosterCount} IN GAME` : ""}</span></div>{state && Object.values(state.players).map(player => <div key={player.name}><span className={player.connected ? "presence online" : "presence"} /><strong>{player.name}</strong><em>{player.score} pts</em><small>{player.completed ? "ROUND COMPLETE" : state.turnOrder.includes(player.name) ? "IN GAME" : player.connected ? "CONNECTED" : "AWAITING"}</small></div>)}</section>
      </main>
    </div>
  );
}
