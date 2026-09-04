import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

/** Root instance; superjson handles Date/Map/BigInt across the wire. */
const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

/**
 * Requires an authenticated session. Use for anything that touches a
 * specific organization's data.
 */
const isAuthed = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // Narrowed, non-null session from here on.
      session: ctx.session,
    },
  });
});

/** Authed-but-any-role procedure (reads). */
export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * Requires OWNER or EDITOR role — blocks VIEWER-role users from mutations.
 * Mirrors the Owner/Editor/Viewer roles from spec §5.7 / §8.3.
 */
const requiresEditAccess = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (ctx.session.role === "VIEWER") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Viewer-role users cannot make changes.",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

/** Owner/Editor-only procedure (writes). */
export const editorProcedure = t.procedure.use(requiresEditAccess);
