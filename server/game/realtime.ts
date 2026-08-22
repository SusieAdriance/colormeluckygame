import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { PLAYERS, type AnswerColor, type PlayerName } from "@shared/gameData";
import { gameService } from "./service";

type Ack<T> = (payload: T) => void;
type SocketClaim = { player: PlayerName; claimToken: string };
let io: Server | null = null;
const socketClaims = new Map<string, SocketClaim>();

function isPlayerName(value: unknown): value is PlayerName {
  return typeof value === "string" && (PLAYERS as readonly string[]).includes(value);
}

function isAnswerColor(value: unknown): value is AnswerColor {
  return value === "red" || value === "blue" || value === "green" || value === "yellow";
}

export function attachGameRealtime(server: HttpServer) {
  io = new Server(server, {
    path: "/api/socket.io",
    cors: { origin: true, credentials: true },
  });
  gameService.subscribe(state => io?.emit("game:state", state));
  gameService.subscribeReset(() => {
    socketClaims.clear();
    io?.emit("game:reset");
  });

  io.on("connection", async socket => {
    socket.emit("game:state", await gameService.getState());

    socket.on("player:join", async (payload: { player?: unknown; claimToken?: unknown; claimEpoch?: unknown }, ack?: Ack<unknown>) => {
      try {
        if (!isPlayerName(payload?.player)) throw new Error("Choose one of the registered players.");
        const token = typeof payload.claimToken === "string" ? payload.claimToken : undefined;
        const claimEpoch = typeof payload.claimEpoch === "string" ? payload.claimEpoch : undefined;
        const result = await gameService.claim(payload.player, token, claimEpoch);
        socketClaims.set(socket.id, { player: payload.player, claimToken: result.claimToken });
        socket.emit("player:claimed", { player: payload.player, claimToken: result.claimToken });
        ack?.({ ok: true, claimToken: result.claimToken, state: result.state });
      } catch (error) {
        ack?.({ ok: false, error: error instanceof Error ? error.message : "Unable to join." });
      }
    });

    socket.on("game:answer", async (payload: { color?: unknown }, ack?: Ack<unknown>) => {
      try {
        const claim = socketClaims.get(socket.id);
        if (!claim) throw new Error("Choose your player identity before answering.");
        if (!isAnswerColor(payload?.color)) throw new Error("Invalid answer color.");
        const result = await gameService.answer(claim.player, payload.color);
        ack?.({ ok: true, ...result });
      } catch (error) {
        ack?.({ ok: false, error: error instanceof Error ? error.message : "Answer not accepted." });
      }
    });

    socket.on("disconnect", () => {
      const claim = socketClaims.get(socket.id);
      socketClaims.delete(socket.id);
      if (claim) void gameService.disconnect(claim.player, claim.claimToken);
    });
  });
}
