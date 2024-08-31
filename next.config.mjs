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
  },
  webpack: (config, { isServer }) => {
    // Excluir `undici` del transpilado
    config.externals = config.externals || []
    config.externals.push('undici')

    return config
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
