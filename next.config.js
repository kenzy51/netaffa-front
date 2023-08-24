/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: { domains: ['effafa.s3.amazonaws.com'] },
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ['ru', 'en', 'uz'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
}

module.exports = nextConfig
