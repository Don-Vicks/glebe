import { Module } from "@nestjs/common";
import { PagesController } from "./pages.controller";
import { PagesService } from "./pages.service";

/**
 * Deliberately thin. Per spec §8.3a, page/block CRUD for the Builder app
 * goes through the tRPC `pages` router (packages/trpc/src/routers/pages.ts)
 * for the type-safety payoff described there. This REST module exists for
 * anything that needs page data OUTSIDE the TypeScript Builder client —
 * e.g. a future public API (§6 Phase 2+), an internal admin tool, or a
 * webhook consumer that isn't itself a tRPC client.
 */
@Module({
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
