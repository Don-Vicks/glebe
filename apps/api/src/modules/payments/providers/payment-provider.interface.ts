/**
 * Internal PaymentProvider interface (spec §8.6). Every payment provider
 * (Paystack, Flutterwave, Stripe, PayPal) implements this so the Donate
 * block never needs to know which provider a given organization has
 * configured — it calls PaymentsService, which resolves the right
 * implementation via PaymentProviderConfig.
 *
 * Only Paystack and Stripe are stubbed below as reference implementations.
 * Add Flutterwave and PayPal the same way when you're ready to wire them.
 */
export interface CreateChargeInput {
  siteId: string;
  amountMinorUnits: number; // kobo/cents
  currency: string;
  donorEmail?: string;
  isRecurring: boolean;
}

export interface CreateChargeResult {
  providerRef: string;
  checkoutUrl: string; // where the donor is redirected to complete payment
}

export interface WebhookVerificationResult {
  isValid: boolean;
  providerRef: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  amountMinorUnits: number;
  currency: string;
  donorEmail?: string;
}

export interface PaymentProvider {
  createCharge(input: CreateChargeInput): Promise<CreateChargeResult>;
  verifyWebhook(rawBody: Buffer | string, signatureHeader: string | undefined): Promise<WebhookVerificationResult>;
  refund(providerRef: string): Promise<{ success: boolean }>;
}
