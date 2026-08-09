/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@orgsites/block-schema", "@orgsites/db"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
