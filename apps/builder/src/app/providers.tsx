"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          // DEV-ONLY: injects the fake session headers read by
          // apps/builder/src/server/context.ts. Remove once real auth
          // (cookies/JWT) replaces this.
          headers() {
            if (process.env.NODE_ENV === "production") return {};
            return {
              "x-dev-org-id": "seed-org-hope-foundation",
              "x-dev-user-id": "seed-user-founder",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
