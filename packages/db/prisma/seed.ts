import { PrismaClient, OrgType, UserRole, SiteStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding OrgSites dev database...");

  const org = await prisma.organization.upsert({
    where: { id: "seed-org-hope-foundation" },
    update: {},
    create: {
      id: "seed-org-hope-foundation",
      name: "Hope Foundation",
      type: OrgType.NGO,
    },
  });

  await prisma.user.upsert({
    where: { email: "founder@hopefoundation.example" },
    update: {},
    create: {
      email: "founder@hopefoundation.example",
      name: "Amaka Nwosu",
      role: UserRole.OWNER,
      organizationId: org.id,
    },
  });

  const site = await prisma.site.upsert({
    where: { subdomain: "hope-foundation" },
    update: {},
    create: {
      organizationId: org.id,
      subdomain: "hope-foundation",
      status: SiteStatus.DRAFT,
      logoUrl: null,
    },
  });

  await prisma.page.upsert({
    where: { siteId_slug: { siteId: site.id, slug: "/" } },
    update: {},
    create: {
      siteId: site.id,
      slug: "/",
      title: "Home",
      seoMeta: {
        title: "Hope Foundation — Building stronger communities",
        description: "We work with local communities to expand access to education and clean water.",
      },
      blocks: [
        {
          type: "hero",
          props: {
            heading: "Building stronger communities, together",
            subheading: "Hope Foundation partners with local communities to expand access to education and clean water.",
            ctaLabel: "Donate now",
            ctaHref: "/donate",
          },
        },
        {
          type: "mission",
          props: {
            heading: "Our mission",
            body: "We believe every community deserves the tools to build its own future.",
          },
        },
        {
          type: "impact_stats",
          props: {
            stats: [
              { label: "Communities served", value: "42" },
              { label: "Wells built", value: "118" },
              { label: "Scholarships awarded", value: "310" },
            ],
          },
        },
        {
          type: "donate_cta",
          props: {
            heading: "Support our work",
            body: "Your donation directly funds clean water and education programs.",
          },
        },
      ],
      isDraft: true,
    },
  });

  console.log(`Seeded organization "${org.name}" with site "${site.subdomain}".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
