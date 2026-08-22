import { io, type Socket } from "socket.io-client";
import type { AnswerColor, PlayerName } from "@shared/gameData";
import type { PublicGameState } from "@shared/gameTypes";

type JoinResult =
  | { ok: true; claimToken: string; state: PublicGameState }
  | { ok: false; error: string };
type AnswerResult = { ok: true; correct: boolean; state: PublicGameState } | { ok: false; error: string };

const PLAYER_KEY = "color-me-lucky:player";
const TOKEN_KEY = "color-me-lucky:claim-token";
const EPOCH_KEY = "color-me-lucky:claim-epoch";
let socket: Socket | null = null;

function gameSocket() {
  if (!socket) {
    socket = io({ path: "/api/socket.io", autoConnect: false, transports: ["websocket", "polling"] });
  }
  return socket;
}

function storedIdentity() {
  const player = window.localStorage.getItem(PLAYER_KEY) as PlayerName | null;
  const claimToken = window.localStorage.getItem(TOKEN_KEY);
  const claimEpoch = window.localStorage.getItem(EPOCH_KEY);
  return { player, claimToken, claimEpoch };
}

function clearStoredIdentity() {
  window.localStorage.removeItem(PLAYER_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EPOCH_KEY);
}

export function connectGameSocket(
  onState: (state: PublicGameState) => void,
  onStatus: (connected: boolean) => void,
  onClaimCleared: () => void,
) {
  const instance = gameSocket();
  const hydrate = () => {
    onStatus(true);
    const { player, claimToken, claimEpoch } = storedIdentity();
    if (player && claimToken) {
      instance.emit("player:join", { player, claimToken, claimEpoch }, (result: JoinResult) => {
        if (result.ok) {
          window.localStorage.setItem(TOKEN_KEY, result.claimToken);
          window.localStorage.setItem(EPOCH_KEY, result.state.claimEpoch);
          onState(result.state);
        } else {
          clearStoredIdentity();
          onClaimCleared();
        }
      });
    }
  };
  const handleState = (state: PublicGameState) => onState(state);
  const disconnect = () => onStatus(false);
  const handleReset = () => {
    clearStoredIdentity();
    onClaimCleared();
  };
  instance.on("connect", hydrate);
  instance.on("disconnect", disconnect);
  instance.on("game:state", handleState);
  instance.on("game:reset", handleReset);
  instance.connect();
  if (instance.connected) hydrate();
  return () => {
    instance.off("connect", hydrate);
    instance.off("disconnect", disconnect);
    instance.off("game:state", handleState);
    instance.off("game:reset", handleReset);
  };
}

export function joinGame(player: PlayerName): Promise<JoinResult> {
  const instance = gameSocket();
  return new Promise(resolve => {
    instance.emit("player:join", { player }, (result: JoinResult) => {
      if (result.ok) {
        window.localStorage.setItem(PLAYER_KEY, player);
        window.localStorage.setItem(TOKEN_KEY, result.claimToken);
        window.localStorage.setItem(EPOCH_KEY, result.state.claimEpoch);
      }
      resolve(result);
    });
  });
}

export function answerGame(color: AnswerColor): Promise<AnswerResult> {
  const instance = gameSocket();
  return new Promise(resolve => instance.emit("game:answer", { color }, (result: AnswerResult) => resolve(result)));
}

export function readStoredPlayer(): PlayerName | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PLAYER_KEY) as PlayerName | null;
}
