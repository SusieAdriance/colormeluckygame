import { io } from "socket.io-client";

const baseUrl = process.env.GAME_SMOKE_URL ?? "http://127.0.0.1:3000";
const players = ["Stephanny", "Giann", "Francisco", "Lyka", "Jenny"];
const options = {
  path: "/api/socket.io",
  transports: ["websocket", "polling"],
  reconnection: false,
  forceNew: true,
  autoConnect: false,
};

function waitForEvent(socket, event, timeoutMs = 8_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.off(event, onEvent);
      reject(new Error(`Timed out waiting for ${event}.`));
    }, timeoutMs);
    const onEvent = payload => {
      clearTimeout(timer);
      resolve(payload);
    };
    socket.once(event, onEvent);
  });
}

function waitForPlayerPresence(socket, player, connected, timeoutMs = 8_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.off("game:state", onState);
      reject(new Error(`Observer did not receive the expected ${player} presence state.`));
    }, timeoutMs);
    const onState = state => {
      if (state?.players?.[player]?.connected === connected) {
        clearTimeout(timer);
        socket.off("game:state", onState);
        resolve(state);
      }
    };
    socket.on("game:state", onState);
  });
}

function join(socket, player, claimToken, claimEpoch) {
  return new Promise(resolve => {
    socket.emit("player:join", { player, claimToken, claimEpoch }, resolve);
  });
}

const playerSocket = io(baseUrl, options);
const observerSocket = io(baseUrl, options);
let reconnectSocket = null;

try {
  const initialPlayerState = waitForEvent(playerSocket, "game:state");
  const initialObserverState = waitForEvent(observerSocket, "game:state");
  const playerConnected = waitForEvent(playerSocket, "connect");
  const observerConnected = waitForEvent(observerSocket, "connect");
  playerSocket.connect();
  observerSocket.connect();
  const [initialState] = await Promise.all([initialPlayerState, initialObserverState, playerConnected, observerConnected]);

  const player = players.find(name => !initialState?.players?.[name]?.connected);
  if (!player) throw new Error("No unoccupied player seat is available for the realtime smoke test.");

  const observedJoin = waitForPlayerPresence(observerSocket, player, true);
  const result = await join(playerSocket, player);
  if (!result?.ok) throw new Error(result?.error ?? "Player join acknowledgement was rejected.");
  await observedJoin;

  playerSocket.disconnect();
  reconnectSocket = io(baseUrl, options);
  const reconnectState = waitForEvent(reconnectSocket, "game:state");
  const reconnectConnected = waitForEvent(reconnectSocket, "connect");
  reconnectSocket.connect();
  await Promise.all([reconnectState, reconnectConnected]);

  const observedReconnect = waitForPlayerPresence(observerSocket, player, true);
  const reconnectResult = await join(reconnectSocket, player, result.claimToken, result.state?.claimEpoch);
  if (!reconnectResult?.ok || reconnectResult.claimToken !== result.claimToken) {
    throw new Error(reconnectResult?.error ?? "Stored player claim token was not accepted on reconnect.");
  }
  await observedReconnect;

  console.log(`Realtime smoke test passed: ${player} synchronized across clients and restored their seat after reconnect.`);
} finally {
  playerSocket.disconnect();
  reconnectSocket?.disconnect();
  observerSocket.disconnect();
}
