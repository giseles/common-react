import { Link, Outlet } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
export default () => {
  return (
    <div className={styles.navs}>
      <Button type="primary">Button</Button>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/404">Docs</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
