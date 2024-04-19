/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daimo.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
};
