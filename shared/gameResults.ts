import { PRIZES, type PlayerName } from "./gameData";
import type { PublicGameState } from "./gameTypes";

export type FinalPlacement = {
  name: PlayerName;
  rank: number;
  score: number;
  payout: number;
  isWinner: boolean;
  sharesPrize: boolean;
};

function payoutForRanks(startRank: number, count: number) {
  return Array.from({ length: count }, (_, index) => PRIZES[startRank + index] ?? 0)
    .reduce((total, payout) => total + payout, 0);
}

export function calculateFinalPlacements(state: PublicGameState): FinalPlacement[] {
  const roster = state.turnOrder;
  const tiebreakerWinner = state.tie?.winner ?? null;
  const ordered = [...roster].sort((left, right) => {
    if (tiebreakerWinner === left) return -1;
    if (tiebreakerWinner === right) return 1;
    return state.players[right].score - state.players[left].score;
  });

  if (tiebreakerWinner) {
    return ordered.map((name, index) => ({
      name,
      rank: index + 1,
      score: state.players[name].score,
      payout: PRIZES[index + 1] ?? 0,
      isWinner: name === tiebreakerWinner,
      sharesPrize: false,
    }));
  }

  const placements: FinalPlacement[] = [];
  let index = 0;
  while (index < ordered.length) {
    const score = state.players[ordered[index]!].score;
    const group = ordered.slice(index).filter(name => state.players[name].score === score);
    const rank = index + 1;
    const sharesPrize = group.length > 1;
    const payout = payoutForRanks(rank, group.length) / group.length;
    placements.push(...group.map(name => ({
      name,
      rank,
      score,
      payout,
      isWinner: rank === 1,
      sharesPrize,
    })));
    index += group.length;
  }

  return placements;
}
