import { Processor, WorkerHost } from "@nestjs/bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bullmq";
import { prisma } from "@orgsites/db";
import { PAYMENTS_QUEUE, EMAIL_QUEUE } from "../queue-names";

interface RecordDonationJobData {
  provider: "PAYSTACK" | "STRIPE";
  providerRef: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  amountMinorUnits: number;
  currency: string;
  donorEmail?: string;
  siteId: string; // NOTE: threading siteId through the webhook payload is a
  // Phase 0 TODO — Paystack/Stripe webhooks don't carry it natively, so it
  // needs to be recovered from `metadata` set at charge-creation time.
}

/**
 * Processes the `payments` queue (spec §8.6 / §8.7): turns a verified
 * webhook event into a DonationTransaction row, then enqueues a receipt
 * email — kept as two separate queue hops so a slow email provider never
 * blocks donation-record writes.
 */
@Processor(PAYMENTS_QUEUE)
export class PaymentsProcessor extends WorkerHost {
  private readonly logger = new Logger(PaymentsProcessor.name);

  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {
    super();
  }

  async process(job: Job<RecordDonationJobData>) {
    const { provider, providerRef, status, amountMinorUnits, currency, donorEmail, siteId } = job.data;

    const transaction = await prisma.donationTransaction.create({
      data: {
        siteId,
        provider,
        providerRef,
        amount: amountMinorUnits,
        currency,
        donorEmail,
        status,
      },
    });

    this.logger.log(`Recorded donation ${transaction.id} (${status}) for site ${siteId}`);

    if (status === "SUCCESS" && donorEmail) {
      await this.emailQueue.add("donation-receipt", {
        to: donorEmail,
        transactionId: transaction.id,
      });
    }
  }
}
