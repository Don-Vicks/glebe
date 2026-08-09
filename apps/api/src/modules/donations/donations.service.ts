import { Injectable } from "@nestjs/common";
import { prisma } from "@orgsites/db";

@Injectable()
export class DonationsService {
  /** Donation dashboard (spec §5.4): totals + donor list for a site. */
  async summaryForSite(siteId: string) {
    const [totalResult, recentDonations] = await Promise.all([
      prisma.donationTransaction.aggregate({
        where: { siteId, status: "SUCCESS" },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.donationTransaction.findMany({
        where: { siteId, status: "SUCCESS" },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    return {
      totalAmountMinorUnits: totalResult._sum.amount ?? 0,
      totalCount: totalResult._count,
      recentDonations,
    };
  }
}
