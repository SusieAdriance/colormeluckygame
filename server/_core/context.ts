import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getHostSession, type HostSession } from "./hostAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: HostSession | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  return { req: opts.req, res: opts.res, user: await getHostSession(opts.req) };
}
