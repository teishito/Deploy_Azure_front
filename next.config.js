/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tech0-gen-8-step3-app-py-10.azurewebsites.net/api/:path*', // バックエンドのURL
      },
    ];
  },
};

module.exports = nextConfig;
