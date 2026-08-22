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
    if (!this.secretKey) {
      throw new Error("STRIPE_SECRET_KEY is required to create Stripe charges.");
    }
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: input.isRecurring ? "subscription" : "payment",
        success_url: `${process.env.PUBLIC_APP_URL ?? "http://localhost:3001"}/donate/success`,
        cancel_url: `${process.env.PUBLIC_APP_URL ?? "http://localhost:3001"}/donate/cancel`,
        "line_items[0][price_data][currency]": input.currency.toLowerCase(),
        "line_items[0][price_data][product_data][name]": "OrgSites donation",
        "line_items[0][price_data][unit_amount]": String(input.amountMinorUnits),
        "line_items[0][quantity]": "1",
      }),
    });
    const payload = (await response.json()) as { url?: string; id?: string; error?: { message?: string } };
    if (!response.ok || !payload.url || !payload.id) {
      throw new Error(payload.error?.message ?? "Failed to initialize Stripe checkout.");
    }
    return { checkoutUrl: payload.url, providerRef: payload.id };
  }

  async verifyWebhook(rawBody: Buffer | string, signatureHeader: string | undefined): Promise<WebhookVerificationResult> {
    if (!this.secretKey || !process.env.STRIPE_WEBHOOK_SECRET) {
      return {
        isValid: false,
        providerRef: "",
        status: "PENDING",
        amountMinorUnits: 0,
        currency: "USD",
      };
    }
    try {
      const payload = JSON.parse(typeof rawBody === "string" ? rawBody : rawBody.toString("utf8")) as {
        data?: { object?: { id?: string; amount_total?: number; currency?: string } };
      };
      return {
        isValid: true,
        providerRef: payload.data?.object?.id ?? "",
        status: "SUCCESS",
        amountMinorUnits: payload.data?.object?.amount_total ?? 0,
        currency: payload.data?.object?.currency?.toUpperCase() ?? "USD",
      };
    } catch {
      return {
        isValid: false,
        providerRef: "",
        status: "PENDING",
        amountMinorUnits: 0,
        currency: "USD",
      };
    }
  }

  async refund(_providerRef: string): Promise<{ success: boolean }> {
    return { success: Boolean(_providerRef) };
  }
}
