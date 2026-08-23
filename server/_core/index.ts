import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { attachGameRealtime } from "../game/realtime";

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  attachGameRealtime(server);
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  server.listen(port, "0.0.0.0", () => {
    console.log(
      `[server] listening on 0.0.0.0:${port} ` +
        `(NODE_ENV=${process.env.NODE_ENV ?? "unset"}, ` +
        `PORT env=${process.env.PORT ?? "unset"})`
    );
  });
}

startServer().catch(console.error);
