import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { createHostSession, HOST_SESSION_COOKIE, HOST_SESSION_MAX_AGE_MS, verifyHostPassword } from "./_core/hostAuth";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { gameService } from "./game/service";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure.input(z.object({ password: z.string().min(1) })).mutation(async ({ input, ctx }) => {
      if (!verifyHostPassword(input.password)) throw new Error("Incorrect host password.");
      ctx.res.cookie(HOST_SESSION_COOKIE, await createHostSession(), {
        ...getSessionCookieOptions(ctx.req), maxAge: HOST_SESSION_MAX_AGE_MS,
      });
      return { name: "Host", role: "admin" } as const;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(HOST_SESSION_COOKIE, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  game: router({
    state: publicProcedure.query(() => gameService.getState()),
    host: router({
      reset: adminProcedure.mutation(() => gameService.reset()),
      startDemo: adminProcedure.mutation(() => gameService.startDemo()),
      startGame: adminProcedure.mutation(() => gameService.startGame()),
      startRound: adminProcedure.mutation(() => gameService.startRound()),
      nextPlayer: adminProcedure.mutation(() => gameService.nextPlayer()),
      pause: adminProcedure.mutation(() => gameService.pause()),
      resume: adminProcedure.mutation(() => gameService.resume()),
      startTiebreaker: adminProcedure.mutation(() => gameService.startTiebreaker()),
      endGame: adminProcedure.mutation(() => gameService.endGame()),
    }),
  }),
});

export type AppRouter = typeof appRouter;
