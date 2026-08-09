import { router } from "../trpc";
import { pagesRouter } from "./pages";
import { sitesRouter } from "./sites";

export const appRouter = router({
  pages: pagesRouter,
  sites: sitesRouter,
});

export type AppRouter = typeof appRouter;
