import React from "react";
import { Trophy } from "lucide-react";
import { calculateFinalPlacements } from "@shared/gameResults";
import type { PublicGameState } from "@shared/gameTypes";

export function formatWinnings(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function FinalResultsBoard({ state }: { state: PublicGameState }) {
  const finalPlacements = calculateFinalPlacements(state);
  const finalWinners = finalPlacements.filter(placement => placement.isWinner);
  const winningsHeadline = finalWinners.length === 1
    ? `${finalWinners[0]!.name} wins ${formatWinnings(finalWinners[0]!.payout)}.`
    : finalWinners.length > 1
      ? `${finalWinners.map(placement => placement.name).join(" and ")} split the top winnings.`
      : "Final winnings are being calculated.";

  return (
    <section className="result-board" aria-labelledby="results-title">
      <div>
        <span className="console-label">FINAL READOUT</span>
        <h2 id="results-title">THE LUCKY BOARD.</h2>
        <p>{state.message}</p>
        <div className="winnings-callout">
          <span>WINNINGS</span>
          <strong>{winningsHeadline}</strong>
          <small>{state.tie?.winner ? "The tiebreaker winner receives first-place winnings." : "Each payout is shown beside the final score."}</small>
        </div>
      </div>
      <ol>
        {finalPlacements.map(row => (
          <li key={row.name} className={row.isWinner ? "tie-winner" : ""}>
            <span>0{row.rank}</span>
            <strong>{row.name}</strong>
            <em>{row.score} pts</em>
            <div className="result-payout">
              <span>WINNINGS</span>
              <b>{formatWinnings(row.payout)}</b>
              {row.sharesPrize && <small>SPLIT</small>}
            </div>
            {row.isWinner && <Trophy aria-label="Final winner" />}
          </li>
        ))}
      </ol>
    </section>
  );
}
