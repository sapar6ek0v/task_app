import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode
};

const categories = ['data', 'home']

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout_wrapper}>
      <nav className={styles.navbar__wrapper}>
        <ul className={styles.navbar__ul}>
          {categories.map((category) => (
            <li key={category} className={styles.navbar__li}>
              {category}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content_wrapper}>{children}</div>
    </div>
  );
};

export default Layout;