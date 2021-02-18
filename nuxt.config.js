// import { pa11y } from 'pa11y'
import { description } from './package.json'

// only add `router.base = '/landing/'` if `DEPLOY_ENV` is `CUSTOM` -- use this if you're deployig to a subfolder called /custom/
// you can run a custom npm script to generate a static site with this as the `<base href="">`
const routerBase = process.env.DEPLOY_ENV === 'CUSTOM' ? '/custom/' : '/'
const currentHostname = 'http://localhost:3000'
console.log('base', routerBase)

export default {
  router: {
    base: routerBase
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'msapplication-TileColor', content: '#FFFFFF' },
      { name: 'msapplication-TileImage', content: '/favicon-152.png' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    script: [
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.js'
      },
      {
        src:
          'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
        async: true,
        defer: true
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32.png' },
      { rel: 'icon', href: '/favicon-128.png', sizes: '128x128' },
      { rel: 'icon', href: '/favicon-196.png', sizes: '196x196' },
      { rel: 'shortcut icon', href: '/favicon-196.png', sizes: '196x196' },
      { rel: 'apple-touch-icon', href: '/favicon-120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/favicon-152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicon-180.png', sizes: '180x180' },
      // Google Fonts https://css-tricks.com/the-fastest-google-fonts/
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap', media: 'print', onload: 'this.media="all"' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff0' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/gtm.js', ssr: false },
    { src: '~plugins/gtm-event.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Global CSS
   */
  css: [
    // SCSS file in the project
    '~/assets/scss/style.scss'
    ],
  styleResources: {
    // your settings here
    scss: ['./assets/scss/_mixins.scss', './assets/scss/_functions.scss', './assets/scss/_colors.scss', './assets/scss/_variables.scss', './assets/scss/vendor/_index.scss'],
  },
  sitemap: {
    hostname: currentHostname,
    gzip: true,
    exclude: []
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // Add exception
    transpile: [
      'vee-validate/dist/rules'
    ],
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // the following makes the _nuxt path relative when deploying to production or generating a static site
      if (!ctx.isDev) {
        config.output.publicPath = './_nuxt/'
      }
      // SVG Loader
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      })
      // end svg loader
    }
  }
}
