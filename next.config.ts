import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    domains: ['res.cloudinary.com','assets.aceternity.com'],  // Add Cloudinary's domain here
  },
}

export default nextConfig;
