import { createContext as createBaseContext } from "@orgsites/trpc";
import type { AuthedSession } from "@orgsites/trpc";
import type { NextRequest } from "next/server";

/**
 * Resolves the tRPC context for an incoming Builder app request.
 *
 * Phase 0 stub: reads a dev-only header so you can exercise the editor
 * without wiring real auth yet. Replace `resolveSessionFromRequest` with
 * your actual session lookup (cookie/JWT verification against the
 * `users`/`organizations` tables) before this touches real data.
 */
export async function createTrpcContext(req: NextRequest) {
  const session = await resolveSessionFromRequest(req);
  return createBaseContext(session);
}

async function resolveSessionFromRequest(req: NextRequest): Promise<AuthedSession | null> {
  // DEV-ONLY: allows `x-dev-org-id` / `x-dev-user-id` headers to simulate a
  // logged-in session locally. Delete this branch once real auth lands.
  const devOrgId = req.headers.get("x-dev-org-id");
  const devUserId = req.headers.get("x-dev-user-id");
  if (process.env.NODE_ENV !== "production" && devOrgId && devUserId) {
    return { userId: devUserId, organizationId: devOrgId, role: "OWNER" };
  }

  // TODO: real session resolution, e.g.:
  // const token = req.cookies.get("orgsites_session")?.value;
  // return verifySessionToken(token);
  return null;
}
