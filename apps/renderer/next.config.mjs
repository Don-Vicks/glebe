/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@orgsites/block-schema", "@orgsites/config", "@orgsites/db", "@orgsites/ui"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
