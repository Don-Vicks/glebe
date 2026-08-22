import { Injectable } from "@nestjs/common";
import { createHmac } from "crypto";
import type {
  CreateChargeInput,
  CreateChargeResult,
  PaymentProvider,
  WebhookVerificationResult,
} from "./payment-provider.interface";

/**
 * Paystack — first-priority provider per spec §10/§14.1 (fastest path to a
 * working Nigerian donation flow). Endpoints and payload shapes below
 * follow Paystack's Transactions API; replace the fetch stubs with real
 * calls once you have API keys and want to test against their sandbox.
 * Docs: https://paystack.com/docs/api/transaction/
 */
@Injectable()
export class PaystackProvider implements PaymentProvider {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY ?? "";

  async createCharge(input: CreateChargeInput): Promise<CreateChargeResult> {
    if (!this.secretKey) {
      throw new Error("PAYSTACK_SECRET_KEY is required to create Paystack charges.");
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.donorEmail ?? "donor@orgsites.local",
        amount: input.amountMinorUnits,
        currency: input.currency,
        metadata: {
          siteId: input.siteId,
          isRecurring: input.isRecurring,
        },
      }),
    });

    const payload = (await response.json()) as { status: boolean; message?: string; data?: { authorization_url: string; reference: string } };
    if (!response.ok || !payload.status || !payload.data) {
      throw new Error(payload.message ?? "Failed to initialize Paystack charge.");
    }

    return {
      checkoutUrl: payload.data.authorization_url,
      providerRef: payload.data.reference,
    };
  }

  async verifyWebhook(rawBody: Buffer | string, signatureHeader: string | undefined): Promise<WebhookVerificationResult> {
    // Paystack signs webhooks with HMAC-SHA512 of the raw body using your
    // secret key; compare against the `x-paystack-signature` header.
    const expected = createHmac("sha512", this.secretKey).update(rawBody).digest("hex");
    const isValid = Boolean(signatureHeader) && expected === signatureHeader;

    let payload: { event?: string; data?: { reference?: string; amount?: number; currency?: string } } = {};
    try {
      payload = JSON.parse(typeof rawBody === "string" ? rawBody : rawBody.toString("utf8"));
    } catch {
      return {
        isValid: false,
        providerRef: "",
        status: "PENDING",
        amountMinorUnits: 0,
        currency: "NGN",
      };
    }

    if (!isValid || payload.event !== "charge.success" || !payload.data?.reference) {
      return {
        isValid: false,
        providerRef: payload.data?.reference ?? "",
        status: "PENDING",
        amountMinorUnits: payload.data?.amount ?? 0,
        currency: payload.data?.currency ?? "NGN",
      };
    }

    return {
      isValid,
      providerRef: payload.data.reference,
      status: "SUCCESS",
      amountMinorUnits: payload.data.amount ?? 0,
      currency: payload.data.currency ?? "NGN",
    };
  }

  async refund(_providerRef: string): Promise<{ success: boolean }> {
    if (!this.secretKey) {
      throw new Error("PAYSTACK_SECRET_KEY is required to refund Paystack charges.");
    }
    const response = await fetch("https://api.paystack.co/refund", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction: _providerRef }),
    });
    return { success: response.ok };
  }
}
