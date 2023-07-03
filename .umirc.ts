import { defineConfig } from '@umijs/max'
import { routes } from './src/routes'
import { AMAP_KEY } from './src/config'

const prodConfig = {}
const devConfig = {} 
switch (process.env.NODE_ENV) {
  case 'development': // 测试环境 后台地址
    devConfig.proxy = {
      '/API_BASE': {
        target: 'common-react',//后台地址
        changeOrigin: true,
        pathRewrite: { '^/API_BASE': '' }
      }
    }
    break
  case 'production': // 正式环境
    prodConfig.extraBabelPlugins = ['transform-remove-console']
    break
}
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  dva: {},
  initialState: {},
  request: {},
  outputPath: 'build',
  npmClient: 'pnpm',
  title: 'common-react 平台',
  locale: {
    default: 'zh-CN'
  },
  routes,
  scripts: [
    'https://webapi.amap.com/maps?v=1.4.15&key=' +
      AMAP_KEY +
      '&plugin=AMap.Autocomplete,AMap.PlaceSearch'
  ],
  ...devConfig,
  ...prodConfig
})
