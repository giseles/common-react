export const MENU_DATA = [
  {
    icon: 'icon1',
    name: '首页',
    url: '/home',
    isMenu: true
  },
  {
    icon: 'icon2',
    name: '站点管理',
    url: '/site',
    isMenu: true,
    children: [
      {
        enName: 'detail',
        url: '/site/detail',
        name: '站点详情', 
         
      },
      { enName: 'add', name: '添加' },
      { enName: 'edit', name: '编辑' },
      { enName: 'able', name: '启用禁用' },
      { enName: 'del', name: '删除' }
    ]
  },
 
]
export * from './pca'
