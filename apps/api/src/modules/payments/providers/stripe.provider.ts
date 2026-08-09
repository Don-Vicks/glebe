import { Injectable } from "@nestjs/common";
import type {
  CreateChargeInput,
  CreateChargeResult,
  PaymentProvider,
  WebhookVerificationResult,
} from "./payment-provider.interface";

/**
 * Stripe — international/diaspora-donor path (spec §10/§14.1). Swap the
 * stubs below for real calls via the `stripe` npm package once you have
 * API keys: `npm install stripe --filter @orgsites/api`.
 * Docs: https://docs.stripe.com/api/checkout/sessions
 */
@Injectable()
export class StripeProvider implements PaymentProvider {
  private readonly secretKey = process.env.STRIPE_SECRET_KEY ?? "";

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    // TODO: use `stripe.checkout.sessions.create(...)` for one-time, or
    // `stripe.subscriptions.create(...)` when input.isRecurring is true.
    throw new Error(
      "StripeProvider.createCharge is a stub — wire up the Stripe SDK before use."
    );
  }

  async verifyWebhook(rawBody: Buffer | string, signatureHeader: string | undefined): Promise<WebhookVerificationResult> {
    // TODO: use `stripe.webhooks.constructEvent(rawBody, signatureHeader,
    // process.env.STRIPE_WEBHOOK_SECRET)` — this throws on an invalid
    // signature, so wrap in try/catch and return isValid: false on error.
    return {
      isValid: false,
      providerRef: "",
      status: "PENDING",
      amountMinorUnits: 0,
      currency: "USD",
    };
  }

  async refund(_providerRef: string): Promise<{ success: boolean }> {
    // TODO: `stripe.refunds.create({ payment_intent: providerRef })`
    throw new Error("StripeProvider.refund is a stub.");
  }
}
