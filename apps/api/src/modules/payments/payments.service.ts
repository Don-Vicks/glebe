import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { prisma } from "@orgsites/db";
import { PAYSTACK_PROVIDER, STRIPE_PROVIDER } from "./providers/tokens";
import type { PaymentProvider } from "./providers/payment-provider.interface";
import { PAYMENTS_QUEUE } from "../../queues/queue-names";

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYSTACK_PROVIDER) private readonly paystack: PaymentProvider,
    @Inject(STRIPE_PROVIDER) private readonly stripe: PaymentProvider,
    @InjectQueue(PAYMENTS_QUEUE) private readonly paymentsQueue: Queue
  ) {}

  /**
   * Provider resolution (spec §8.6): the Donate block never talks to
   * Paystack/Stripe/etc. directly. It calls this, keyed off which
   * PaymentProviderConfig is active for the site.
   */
  private resolveProvider(providerName: "PAYSTACK" | "STRIPE"): PaymentProvider {
    switch (providerName) {
      case "PAYSTACK":
        return this.paystack;
      case "STRIPE":
        return this.stripe;
    }
  }

  async initiateCharge(siteId: string, amountMinorUnits: number, currency: string, donorEmail?: string, isRecurring = false) {
    const config = await prisma.paymentProviderConfig.findFirst({
      where: { siteId, isActive: true },
    });
    if (!config) throw new NotFoundException("No active payment provider configured for this site");

    const provider = this.resolveProvider(config.provider as "PAYSTACK" | "STRIPE");
    return provider.createCharge({ siteId, amountMinorUnits, currency, donorEmail, isRecurring });
  }

  /**
   * Webhook entrypoint (spec §8.6): verify signature, then hand off to the
   * `payments` BullMQ queue so the request can return fast and the actual
   * DonationTransaction write + receipt email happen asynchronously,
   * resilient to provider retries.
   */
  async handleWebhook(providerName: "PAYSTACK" | "STRIPE", rawBody: Buffer, signature: string | undefined) {
    const provider = this.resolveProvider(providerName);
    const result = await provider.verifyWebhook(rawBody, signature);

    if (!result.isValid) {
      throw new NotFoundException("Invalid webhook signature");
    }

    await this.paymentsQueue.add("record-donation", {
      provider: providerName,
      ...result,
    });

    return { received: true };
  }
}
