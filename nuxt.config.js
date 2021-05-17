export default {
  target: 'static',

  head: {
    title: 'Todo App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Keep track of all your tasks.'
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#2d89ef'
      },
      {
        hid: 'msapplication-config',
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      },
      { name: 'theme-color', content: '#EC4899' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap'
      },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#EC4899',
        href: '/icons/safari-pinned-tab.svg'
      }
    ]
  },

  pwa: {
    icon: false,
    manifest: {
      name: 'Todo App',
      short_name: 'Todo App',
      start_url: '/',
      display: 'standalone',
      theme_color: '#EC4899',
      background_color: '#FFFFFF',
      description: 'Keep track of all your tasks.',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },

  loading: {
    color: '#EC4899',
    failedColor: '#e9413e'
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next'],

  build: {},

  axios: {
    baseURL: 'http://api.todoapp.test/api'
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          }
        },
        user: {
          property: 'data'
        }
      }
    }
  },

  server: {
    port: 8000,
    host: '0.0.0.0'
  }
};
