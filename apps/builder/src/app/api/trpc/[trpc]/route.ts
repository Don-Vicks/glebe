import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@orgsites/trpc";
import { createTrpcContext } from "@/server/context";
import type { NextRequest } from "next/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTrpcContext(req),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`[tRPC] ${path ?? "<no-path>"}:`, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
