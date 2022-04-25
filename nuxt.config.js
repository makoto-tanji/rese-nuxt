export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rese-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // 以下追加
    { src: '~/plugins/localStorage.js', ssr: false }, //vuex-persistedstate
    { src: '~/plugins/constants.js' },  // グローバル変数
    { src: '~/plugins/vuetify.js'}
    // 追加終了
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 以下追加
    // Simple usage
    // '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
    // 追加終了
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //以下1文追加
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    baseURL: 'https://guarded-meadow-23334.herokuapp.com/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // 以下auth追加
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        // url: 'http://localhost:8000',
        url: 'https://guarded-meadow-23334.herokuapp.com',
        token: {
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      },
    },
  },

  // 以下env追加
  env: {
    // apiURL: process.env.API_URL || 'http://localhost:8000/api/'
    apiURL: process.env.API_URL || 'https://guarded-meadow-23334.herokuapp.com/api/'
  }
}
