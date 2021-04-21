const isProd = process.env.NODE_ENV === 'production';

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  telemetry: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/jsonld'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    //'@nuxtjs/pwa',
    /*  [
       '@nuxtjs/component-cache',
       {
         max: 10000,
         maxAge: 1000 * 60 * 60
       }
     ] */
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: isProd ? 'https://api.peaku.co/api-v2/' : 'http://localhost:8000/api-v2'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCss: true,
    /* babel: {
      presets: ({ isServer }) => [
        [
          '@nuxt/babel-preset-app',
          {
            targets: isServer
              ? { node: '10.21.0' }
              : { browsers: ['defaults'] },
          },
        ],
      ],
    }, */
  },
}
