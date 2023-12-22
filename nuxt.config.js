export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HRS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/global.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    '@/node_modules/bootstrap-icons/font/bootstrap-icons.css',
    'vue-select/dist/vue-select.css',
    'vue-bootstrap-typeahead/dist/VueBootstrapTypeahead.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/bootstrap.js',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8000/hrsapp/api/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'HRS para gestores de casos',
      short_name: 'HRS',
      description:
        'Sitio web para que los gestores de caso puedan administrar la atención primaria de salud de pacientes adultos mayores y recibir recomendaciones sobre acciones a seguir en dicha atención.',
      lang: 'es',
      theme_color: '#112d4e',
      background_color: '#3f72af',
      start_url: '/',
    },
    //workbox: {
    //  dev: true, // Modo de desarrollo, establecer a false en producción
    //},
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'perfil-paciente',
        path: '/paciente/:id',
        component: resolve(__dirname, 'pages/paciente.vue'), // Ajusta la ruta de tu componente
      })
    },
  },
}
