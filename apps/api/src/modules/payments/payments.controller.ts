import { Body, Controller, Headers, Post, RawBodyRequest, Req } from "@nestjs/common";
import type { Request } from "express";
import { PaymentsService } from "./payments.service";

class ChargeDto {
  siteId!: string;
  amountMinorUnits!: number;
  currency!: string;
  donorEmail?: string;
  isRecurring?: boolean;
}

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("charge")
  /** Create a charge against the configured provider. */
  charge(@Body() body: ChargeDto) {
    return this.paymentsService.initiateCharge(
      body.siteId,
      body.amountMinorUnits,
      body.currency,
      body.donorEmail,
      body.isRecurring ?? false
    );
  }

  // NOTE: webhook signature verification needs the *raw* request body, not
  // the JSON-parsed one. Enable `rawBody: true` in NestFactory.create() in
  // main.ts and configure a raw-body-preserving middleware for these two
  // routes before relying on this in anything beyond local testing.
  @Post("webhook/paystack")
  paystackWebhook(@Req() req: RawBodyRequest<Request>, @Headers("x-paystack-signature") signature: string) {
    return this.paymentsService.handleWebhook("PAYSTACK", req.rawBody ?? Buffer.from(""), signature);
  }

  @Post("webhook/stripe")
  stripeWebhook(@Req() req: RawBodyRequest<Request>, @Headers("stripe-signature") signature: string) {
    return this.paymentsService.handleWebhook("STRIPE", req.rawBody ?? Buffer.from(""), signature);
  }
}
