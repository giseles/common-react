import React, { memo } from 'react';
import { useModel } from 'umi';
import { Button } from 'antd';
import { PageHeader } from '@/components';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { MidSearch } from 'common-mid';
// import { MidSearch } from './ss'
import styles from './index.module.less';

export const Search = memo((props: any) => {
  const { permissionList } = useModel('global');
  const { title, children, ...restProps } = props;
  const addProps = {
    isShow: permissionList.add,
    onClick: props.addHandle ? props.addHandle : () => props.addClick('add'),
    icon: <PlusOutlined />,
    name: props.addBtn || props.add || '添加',
  };
  const searchIcon = (
    <SearchOutlined
      className="site-form-item-icon"
      style={{ color: '#3082F9' }}
    />
  );

  const addBtn = addProps.isShow && (
    <Button key="add" type="primary" onClick={addProps.onClick}>
      {addProps.name}
    </Button>
  );
  return (
    <div className={styles.section}>
      {title && (
        <PageHeader
          title={title}
          className={styles.header}
          extra={[children, addBtn]}
        />
      )}
      <MidSearch
        addProps={{ isShow: false }}
        searchIcon={searchIcon}
        {...restProps}
      />
    </div>
  );
});
