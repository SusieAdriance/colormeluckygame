import { Link, useLocation } from "wouter";
import { Radio, ShieldCheck } from "lucide-react";

export function GameChrome({ connected }: { connected?: boolean }) {
  const [location] = useLocation();
  return (
    <header className="game-header">
      <Link href="/" className="game-wordmark" aria-label="Color Me Lucky game lobby">
        <Radio aria-hidden="true" />
        <span>COLOR ME LUCKY</span>
        <i>/ LIVE ROOM</i>
      </Link>
      <nav aria-label="Game navigation">
        <Link href="/" className={location === "/" ? "active" : ""}>Lobby</Link>
        <Link href="/play" className={location === "/play" ? "active" : ""}>Play</Link>
        <Link href="/review">Brief</Link>
        <Link href="/host" className={location === "/host" ? "active" : ""}><ShieldCheck aria-hidden="true" /> Host</Link>
      </nav>
      <span className={`connection-chip ${connected ? "online" : ""}`}>
        <i aria-hidden="true" /> {connected ? "LIVE LINK" : "RECONNECTING"}
      </span>
    </header>
  );
}
