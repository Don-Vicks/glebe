import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import {
  SITE_BUILD_QUEUE,
  DOMAIN_VERIFICATION_QUEUE,
  PAYMENTS_QUEUE,
  MEDIA_QUEUE,
  EMAIL_QUEUE,
} from "./queue-names";
import { SiteBuildProcessor } from "./processors/site-build.processor";
import { DomainVerificationProcessor } from "./processors/domain-verification.processor";
import { PaymentsProcessor } from "./processors/payments.processor";

/**
 * Registers every queue from spec §8.7. Only site-build, domain-
 * verification, and payments have working processors below — media and
 * email are registered (so other modules can inject and .add() to them
 * without a "queue not found" error) but have no processor consuming them
 * yet. Add media.processor.ts / email.processor.ts the same way when
 * you're ready.
 */
@Module({
  imports: [
    BullModule.registerQueue(
      { name: SITE_BUILD_QUEUE },
      { name: DOMAIN_VERIFICATION_QUEUE },
      { name: PAYMENTS_QUEUE },
      { name: MEDIA_QUEUE },
      { name: EMAIL_QUEUE }
    ),
  ],
  providers: [SiteBuildProcessor, DomainVerificationProcessor, PaymentsProcessor],
})
export class QueuesModule {}
