/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: ''
      }
    ]
  }
  // headers: () => [
  //   {
  //     source: '/',
  //     headers: [
  //       {
  //         key: 'Cache-Control',
  //         value: 'no-store'
  //       }
  //     ]
  //   }
  // ]
}

export default nextConfig
