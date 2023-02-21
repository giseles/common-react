import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes: [
    { path: '/login', component: 'Login' },
    {
      path: '/',
      routes: [
        { path: '/', component: 'Login' },
        { path: '/home', component: 'Login' },
        { path: '/home', component: '404' },
      ],
    },
    { path: '/*', component: '404' },
  ],
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  favicons: ['/assets/favicon.ico'],
  npmClient: 'pnpm',
});
