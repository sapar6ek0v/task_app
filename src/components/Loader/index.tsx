import { FC } from 'react';
import { Loader } from 'tabler-icons-react';
import styles from './styles.module.scss';

type Props = {
  size?: number;
  color?: string;
};

const IconLoader: FC<Props> = ({ size = 30, color = '#5e35b1' }) => {

  return (
    <div className={styles.loader_wrapper}>
      <Loader className={styles.loader_icon} size={size} strokeWidth={4} color={color} />
    </div>
  );
};

export default IconLoader;