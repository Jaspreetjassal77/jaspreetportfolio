/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  eslint: {
    // Lint is run explicitly in CI / locally; don't fail the static export build on it.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
