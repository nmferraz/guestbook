import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

module.exports = {
  i18n: {
    locales: ["en", "pt", "es"],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'guestbook.nmferraz.space',
        defaultLocale: 'en',
      },
      {
        domain: 'guestbook.nmferraz.space/pt',
        defaultLocale: 'pt',
      },
      {
        domain: 'guestbook.nmferraz.space/es',
        defaultLocale: 'es',
      },
    ]
  }
}

export default defineNextConfig({
  env: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n: true,
});
