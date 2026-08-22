import { describe, expect, it } from "vitest";
import { NOT_ADMIN_ERR_MSG } from "@shared/const";
import type { TrpcContext } from "../_core/context";
import { appRouter } from "../routers";

function createNonAdminContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "regular-player",
      email: "player@example.com",
      name: "Regular Player",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("game.host authorization", () => {
  it("rejects a signed-in non-admin before it can mutate the live game", async () => {
    const caller = appRouter.createCaller(createNonAdminContext());

    await expect(caller.game.host.reset()).rejects.toMatchObject({
      code: "FORBIDDEN",
      message: NOT_ADMIN_ERR_MSG,
    });
  });
});
