import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@orgsites/trpc";

/**
 * `trpc.pages.saveBlocks.useMutation()`, `trpc.sites.mine.useQuery()`, etc.
 * — fully typed end-to-end from the router definitions in
 * @orgsites/trpc, no manually maintained request/response types.
 */
export const trpc = createTRPCReact<AppRouter>();
