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
    // TODO: POST https://api.paystack.co/transaction/initialize
    // with { email, amount: input.amountMinorUnits, currency: input.currency }
    // Authorization: `Bearer ${this.secretKey}`
    throw new Error(
      "PaystackProvider.createCharge is a stub — wire up the Paystack Transactions API before use."
    );
  }

  async verifyWebhook(rawBody: Buffer | string, signatureHeader: string | undefined): Promise<WebhookVerificationResult> {
    // Paystack signs webhooks with HMAC-SHA512 of the raw body using your
    // secret key; compare against the `x-paystack-signature` header.
    const expected = createHmac("sha512", this.secretKey).update(rawBody).digest("hex");
    const isValid = Boolean(signatureHeader) && expected === signatureHeader;

    // TODO: parse rawBody as JSON and map Paystack's event payload
    // (event === "charge.success") into the shared WebhookVerificationResult
    // shape below.
    return {
      isValid,
      providerRef: "",
      status: "PENDING",
      amountMinorUnits: 0,
      currency: "NGN",
    };
  }

  async refund(_providerRef: string): Promise<{ success: boolean }> {
    // TODO: POST https://api.paystack.co/refund
    throw new Error("PaystackProvider.refund is a stub.");
  }
}
