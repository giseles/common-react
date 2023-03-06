// 全局共享数据示例
import { menuData } from '@/constants';
import { useState, useCallback } from 'react';
import { history } from 'umi';
import { useMount, useUnmount } from 'common-hook';
import { storage as Storage, toMenuData } from 'common-screw';

export default () => {
  const initState = {
    menuList: [],
    pathHasPermissionList: {},
    breadcrumbList: {},
    ablePathList: [],
    permissionList: {}, // 当前页面权限
    baseEnums: {}, // 常用枚举
  };
  const [state, setState] = useState<any>(initState);

  // 首次进入时
  useMount(() => {
    const pathname = history.location.pathname;

    pathname !== '/login' && Storage.getItem('token') && getMenu(pathname);
    // 没有登录回到登录页
    !Storage.getItem('token') && history.push('/login');
  });

  // 卸载时 重置状态
  useUnmount(() => toClear());

  // 获取菜单
  const getMenu = useCallback((path) => {
    const baseConfig = {
      name: 'name',
      icon: 'icon',
      path: 'url',
      children: 'children',
      isHide: ({ url, isMenu }) => Boolean(url && !isMenu),
    };
    const {
      menuList, // 菜单数据
      pathHasPermissionList, // 路由所拥有功能权限
      breadcrumbList, // 面包屑数据
      ablePathList, // 可访问页面
      fistPath, // 第一个有效路由
    } = toMenuData(menuData, baseConfig);
    toUpdate({
      menuList,
      pathHasPermissionList,
      ablePathList,
      breadcrumbList,
    });
    history.push(path || fistPath);
  }, []);

  // 登录
  const toLogin = useCallback((data) => {
    console.log(data);
    getMenu();
  }, []);

  // 登出
  const toLoginOut = useCallback(() => {
    Storage.removeItem('token');
    Storage.removeItem('user');
    history.push('/login');
  }, []);

  // 更新状态
  const toUpdate = useCallback(
    (data) => {
      setState({
        ...state,
        ...data,
      });
      console.log('toUpdate');
      console.log(data);
    },
    [state],
  );

  // 重置状态
  const toClear = useCallback(() => {
    setState(initState);
  }, [initState]);

  return {
    ...state,
    toLogin,
    toLoginOut,
    toUpdate,
  };
};
