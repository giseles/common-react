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
        { path: '/', component: 'Home/list' },
        { path: '/home', component: 'Home/list' },
        { path: '/home/detail', component: 'Home/detail' },
      ],
    },
    { path: '/*', component: '404' },
  ],
  proxy: {
    '/api': {
      target: 'https://gateway-admin-travel.newtest.senthink.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  favicons: ['/assets/favicon.ico'],
  title: '贤芯 - 项目绩效管理平台',
  npmClient: 'pnpm',
});
