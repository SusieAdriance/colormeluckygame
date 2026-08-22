import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";

export const HOST_SESSION_COOKIE = "color_me_lucky_host";
export const HOST_SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 12;
export type HostSession = { name: "Host"; role: "admin" };

function password() {
  const value = process.env.HOST_PASSWORD;
  if (!value) throw new Error("HOST_PASSWORD must be configured before host sign-in is available.");
  return value;
}
function secret() { return new TextEncoder().encode(password()); }
export function verifyHostPassword(candidate: string) {
  const expected = Buffer.from(password());
  const received = Buffer.from(candidate);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
export async function createHostSession() {
  return new SignJWT({ role: "admin", name: "Host" })
    .setProtectedHeader({ alg: "HS256" }).setIssuedAt()
    .setExpirationTime(Math.floor((Date.now() + HOST_SESSION_MAX_AGE_MS) / 1000)).sign(secret());
}
export async function getHostSession(req: Request): Promise<HostSession | null> {
  const token = parseCookieHeader(req.headers.cookie ?? "")[HOST_SESSION_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin" && payload.name === "Host" ? { name: "Host", role: "admin" } : null;
  } catch { return null; }
}
