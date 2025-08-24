/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "images.unsplash.com",
      "cdn.muscleandstrength.com",
      "www.bodybuilding.com",
      "images.menshealth.com",
      "hips.hearstapps.com",
      "www.verywellfit.com",
      "encrypted-tbn0.gstatic.com", // Google images
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
    ],
  },
};

export default nextConfig;
