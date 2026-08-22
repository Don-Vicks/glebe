import { createContext as createBaseContext } from "@orgsites/trpc";
import { verifySessionToken, type AuthedSession } from "@orgsites/trpc";
import type { NextRequest } from "next/server";

/**
 * Resolves the tRPC context for an incoming Builder app request.
 *
 * Resolves the Builder app's tRPC session from the auth cookie.
 */
export async function createTrpcContext(req: NextRequest) {
  const session = await resolveSessionFromRequest(req);
  return createBaseContext(session);
}

async function resolveSessionFromRequest(req: NextRequest): Promise<AuthedSession | null> {
  const token = req.cookies.get("orgsites_session")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
