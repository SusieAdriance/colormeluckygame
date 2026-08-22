import { useEffect, useState } from "react";
import type { AnswerColor, PlayerName } from "@shared/gameData";
import type { PublicGameState } from "@shared/gameTypes";
import { answerGame, connectGameSocket, joinGame, readStoredPlayer } from "@/lib/gameSocket";

export function useLiveGame() {
  const [state, setState] = useState<PublicGameState | null>(null);
  const [connected, setConnected] = useState(false);
  const [player, setPlayer] = useState<PlayerName | null>(() => readStoredPlayer());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => connectGameSocket(setState, setConnected, () => setPlayer(null)), []);

  async function join(playerName: PlayerName) {
    setError(null);
    const result = await joinGame(playerName);
    if (result.ok) {
      setPlayer(playerName);
      setState(result.state);
      return true;
    }
    setError(result.error);
    return false;
  }

  async function answer(color: AnswerColor) {
    setError(null);
    const result = await answerGame(color);
    if (result.ok) {
      setState(result.state);
      return result.correct;
    }
    setError(result.error);
    return null;
  }

  return { state, connected, player, error, join, answer };
}
