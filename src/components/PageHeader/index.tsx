import React, { memo, useCallback } from 'react';
import { Link } from 'umi';
import { isString } from 'common-screw';
import styles from './index.module.less';

export const PageHeader = memo((props: any) => {
  const { border, back = null, onBack = null, title, ...restProps } = props;

  return (
    <div className={border ? styles.header : styles.headerNoBorder}>
      <Link to={back}>返回</Link>

      {title}
      {restProps.extra}
    </div>
  );
});
