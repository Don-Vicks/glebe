import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { PaymentsController } from "./payments.controller";
import { PAYSTACK_PROVIDER, STRIPE_PROVIDER } from "./providers/tokens";
import { PaystackProvider } from "./providers/paystack.provider";
import { StripeProvider } from "./providers/stripe.provider";
import { PaymentsService } from "./payments.service";
import { PAYMENTS_QUEUE } from "../../queues/queue-names";

@Module({
  imports: [BullModule.registerQueue({ name: PAYMENTS_QUEUE })],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    { provide: PAYSTACK_PROVIDER, useClass: PaystackProvider },
    { provide: STRIPE_PROVIDER, useClass: StripeProvider },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
