/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@orgsites/ui", "@orgsites/block-schema", "@orgsites/trpc", "@orgsites/db"],
  experimental: {
    // Allows importing workspace packages that ship raw TS.
    externalDir: true,
  },
};

export default nextConfig;
