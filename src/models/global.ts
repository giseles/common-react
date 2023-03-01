// 全局共享数据示例
import { menuData } from '@/constants';
import { useState, useCallback } from 'react';
import { history } from 'umi';
import { useMount, useUnmount } from 'common-hook';
import { toMenuData } from 'common-screw';

export default () => {
  const initState = { menuList: [] };
  const [state, setState] = useState<any>(initState);

  // 首次进入时
  useMount(() => getMenu());

  // 卸载时 重置状态
  useUnmount(() => toClear());

  // 获取菜单
  const getMenu = useCallback(() => {
    console.log('获取菜单');
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
    updateState({
      menuList,
      pathHasPermissionList,
      ablePathList,
      breadcrumbList,
      fistPath,
    });
  }, []);

  // 登录
  const toLogin = useCallback((data) => {
    console.log(data);
    getMenu();
    console.log('toLogintoLogintoLogintoLogin');
    history.push('/home');
  }, []);

  // 更新状态
  const updateState = useCallback(
    (data) => {
      setState({
        ...state,
        ...data,
      });
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
  };
};
