export const DEFAULT_NAME = 'Umi Max';
export const menuData = [
  {
    icon: 'iconshouye',
    name: '项目总览',
    url: '/home',
    children: [{ enName: 'detail', url: '/home/detail' }],
  },
  {
    icon: 'iconshebei',
    name: '我的团队',
    url: '/team',
    children: [
      {
        enName: 'detail',
        url: '/team/manage',
        children: [{ enName: 'add' }, { enName: 'del' }],
      },
    ],
  },
  {
    icon: 'iconyunying',
    name: '我的项目',
    url: '/project',
    children: [
      {
        enName: 'detail',
        url: '/project/detail',
        children: [{ enName: 'edit' }],
      },
    ],
  },
  {
    icon: 'iconxitong',
    name: '我的任务',
    url: '/task',
    children: null,
  },
  {
    icon: 'iconshouye',
    name: '报表统计',
    url: '/report',
    children: [
      {
        name: '项目工时统计报表',
        url: '/report/project',
        children: [{ enName: 'exp' }],
      },
      {
        name: '成员工时统计报表',
        url: '/report/staff',
        children: [{ enName: 'exp' }],
      },
    ],
  },
  {
    icon: 'iconshouye',
    name: '系统维护',
    url: '/system',
    children: [
      {
        name: '系统内容维护',
        url: '/system/content',
        children: [{ enName: 'add' }, { enName: 'edit' }, { enName: 'del' }],
      },
      {
        name: '员工账号管理',
        url: '/system/staff',
        children: [{ enName: 'edit' }],
      },
    ],
  },
];
