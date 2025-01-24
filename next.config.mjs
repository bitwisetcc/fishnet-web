/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "aquaticarts.com" },
      { protocol: "https", hostname: "fishnet-api-py.onrender.com" },
      { protocol: "https", hostname: "pixfeeds.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "github.githubassets.com" },
      { protocol: "https", hostname: "f.i.bol.com.br" },
      { protocol: "https", hostname: "images-americanas.b2w.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
