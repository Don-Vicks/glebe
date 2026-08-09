import { prisma } from "@orgsites/db";

/**
 * Per-request tRPC context. In the real app this is populated from the
 * session/JWT (see apps/api auth module for the equivalent REST-side auth).
 * For the Builder app, the session is resolved in
 * apps/builder/src/server/context.ts, which calls createContext() below.
 */
export interface AuthedSession {
  userId: string;
  organizationId: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
}

export interface TrpcContext {
  db: typeof prisma;
  session: AuthedSession | null;
}

export function createContext(session: AuthedSession | null): TrpcContext {
  return {
    db: prisma,
    session,
  };
}
