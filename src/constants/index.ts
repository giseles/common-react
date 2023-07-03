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
        children: [
          { enName: 'tab1', name: '室分天线' },
          { enName: 'tab2', name: '告警记录' },
          { enName: 'tab3', name: '参数设置' },
          { enName: 'detail', name: '室分天线详情' },
          { enName: 'add', name: '添加' },
          { enName: 'edit', name: '编辑' },
          { enName: 'del', name: '删除' }
        ]
      },
      { enName: 'add', name: '添加' },
      { enName: 'edit', name: '编辑' },
      { enName: 'able', name: '启用禁用' },
      { enName: 'del', name: '删除' }
    ]
  },
  {
    icon: 'icon3',
    name: '监测管理',
    url: '/monitor',
    isMenu: true,
    children: [
      {
        name: '室分天线',
        url: '/monitor/antenna',
        isMenu: true,
        children: [
          {
            enName: 'detail',
            url: '/monitor/antenna/detail',
            name: '天线详情',
            children: [
              { enName: 'tab1', name: '告警记录' },
              { enName: 'tab2', name: '检测中断' },
              { enName: 'tab3', name: '参数设置' },
              { enName: 'edit', name: '更换终端' }
            ]
          },
          { enName: 'add', url: '/monitor/antenna/form', name: '添加' },
          { enName: 'edit', name: '编辑' },
          { enName: 'del', name: '删除' }
        ]
      },
      {
        name: '监测终端',
        url: '/monitor/imei',
        isMenu: true,
        children: [
          {
            enName: 'detail',
            url: '/monitor/imei/detail',
            name: '终端详情',
            children: [
              { enName: 'tab1', name: '室分天线' },
              { enName: 'tab2', name: '告警记录' },
              { enName: 'tab3', name: '参数设置' },
              { enName: 'detail', name: '室分天线详情' },
              { enName: 'add', name: '添加' },
              { enName: 'edit', name: '编辑' },
              { enName: 'del', name: '删除' }
            ]
          },
          { enName: 'exp', name: '导出' }
        ]
      }
    ]
  },
  {
    icon: 'icon4',
    name: '告警管理',
    url: '/alarm',
    isMenu: true,
    children: [
      {
        name: '告警配置',
        url: '/alarm/config',
        isMenu: true,
        children: [
          { enName: 'add', url: '/alarm/config/form', name: '添加' },
          { enName: 'edit', name: '编辑' },
          { enName: 'del', name: '删除' }
        ]
      },
      {
        name: '告警记录',
        url: '/alarm/log',
        isMenu: true,
        children: [{ enName: 'exp', name: '导出' }]
      }
    ]
  },
  {
    icon: 'icon5',
    name: '系统管理',
    url: '/system',
    isMenu: true,
    children: [
      {
        name: '角色管理',
        url: '/system/role',
        isMenu: true,
        children: [
          { enName: 'add', url: '/system/role/form', name: '添加' },
          { enName: 'edit', name: '编辑' },
          { enName: 'del', name: '删除' }
        ]
      },
      {
        name: '账号管理',
        url: '/system/account',
        isMenu: true,
        children: [
          { enName: 'add', url: '/system/account/form', name: '添加' },
          { enName: 'edit', name: '编辑' },
          { enName: 'able', name: '启用禁用' },
          { enName: 'del', name: '删除' }
        ]
      },
      {
        name: '操作日志',
        url: '/system/log',
        isMenu: true
      }
    ]
  }
]
export * from './pca'
