import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { SitesController } from "./sites.controller";
import { SitesService } from "./sites.service";
import { SITE_BUILD_QUEUE, DOMAIN_VERIFICATION_QUEUE } from "../../queues/queue-names";

@Module({
  imports: [
    BullModule.registerQueue({ name: SITE_BUILD_QUEUE }, { name: DOMAIN_VERIFICATION_QUEUE }),
  ],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}
