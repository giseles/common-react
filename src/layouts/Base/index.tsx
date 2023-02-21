import { Link, Outlet } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
import LayoutHeader from '@/components/LayoutHeader';
import LayoutSider from '@/components/LayoutSider';
export default () => {
  return (
    <div className={styles.layout}>
      <LayoutSider collapsed={true} toggle={true} pathname={'/home'} />
      <div className={styles.right}>
        <LayoutHeader collapsed={true} toggle={true} pathname={'/home'} />
        <div className={styles.scroll}>
          <div className={styles.content}>
            <Button type="primary">Button</Button>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/404">Docs</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <var>
                {' '}
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/404">Docs</Link>
                </li>
                <li>
                  <Link to="/login">login</Link>
                </li>
                v
              </var>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
