import React, { memo } from 'react';
import { useModel } from 'umi';
import { MidTable } from 'common-mid';
import styles from './index.module.less';

export const Table = memo((props: any) => {
  const { permissionList } = useModel('global');
  const {
    current,
    pageSize,
    total,
    selection,
    onHandleAll,
    showPage = true,
    ...restProps
  } = props;

  const btnProps = { type: 'link', size: 'small' };
  const tableBtnList: any = {
    detail: { type: 'detail', name: '详情' },
    info: { type: 'info', name: '详情' },
    edit: { type: 'edit', name: '编辑' },

    able: {
      type: 'able',
      key: 'state',
      ableValue: 1,
      ableName: '启用',
      disAbleName: '禁用',
    },
    del: { type: 'del', name: '删除' },
  };
  const pageProps = {
    showPage,
    current,
    pageSize,
    total,
  };
  const selectionProps = {
    name: '撤销',
    isShow: selection || false,
    onHandle: onHandleAll,
  };
  return (
    <MidTable
      className={styles.table}
      tableBtnList={tableBtnList}
      permissionList={permissionList}
      btnProps={btnProps}
      pageProps={pageProps}
      selectionProps={selectionProps}
      {...restProps}
    />
  );
});
