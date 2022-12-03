import { FC, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  isCompleted: boolean;
  toggle: () => void;
};

const CustomCheckbox: FC<Props> = ({ isCompleted, toggle }) => {

  return (
    <label className={styles.checkbox_label}>
      <input
        checked={isCompleted}
        onChange={toggle}
        type="checkbox"
        className={styles.checkbox_input}
      />
      <div
        className={isCompleted ? `${styles.checkbox_div} ${styles.checked}` : styles.checkbox_div}
      />
    </label>
  );
};

export default memo(CustomCheckbox);