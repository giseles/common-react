import { useState, useCallback } from 'react';
import { useDeepCompareEffect } from 'common-hook';
import { Message } from '@/components';
import { isNil } from 'common-screw';

export default () => {
  const initState = {
    searchParams: {
      page: 1,
      pageSize: 10,
    },
    dataSource: [],
    apiList: {},
    loading: true,
  };
  const [state, setState] = useState<any>(initState);

  // 更新状态
  const toUpdate = useCallback(
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

  // 初始
  const toInit = useCallback((data) => {
    toUpdate(data);
  }, []);

  useDeepCompareEffect(() => {
    !isNil(state.apiList) && toList();
  }, [state.apiList]);

  // 获取列表
  const toList = useCallback(
    async (payload = {}) => {
      toUpdate({ loading: true });
      const { searchParams, apiList } = state;
      const search = { ...searchParams, ...payload };
      const { data } = await apiList.list(search);
      const pageInfo = data.page || data || {};
      const dataSource = pageInfo.records || pageInfo || [];
      toUpdate({
        dataSource,
        total: pageInfo.total,
        loading: false,
        searchParams: {
          ...search,
          page: pageInfo.current,
          pageSize: pageInfo.size,
        },
      });

      if (
        search.page !== 1 &&
        isNil(pageInfo) &&
        pageInfo.current > pageInfo.pages &&
        isNil(dataSource)
      ) {
        toList(pageInfo.pages);
      }
    },
    [state.apiList, state.searchParams],
  );

  // 删除
  const toDelete = useCallback(
    async (data) => {
      const { apiList } = state;
      const res = await apiList.del(data);
      Message(res);
      toList();
    },
    [state.apiList],
  );
  // 启用禁用
  const toAble = useCallback(
    async (data) => {
      const { apiList } = state;
      const res = await apiList.able(data);
      Message(res);
      toList();
    },
    [state.apiList],
  );

  return {
    ...state,
    toInit,
    toList,
    toDelete,
    toAble,
    toUpdate,
    toClear,
  };
};
