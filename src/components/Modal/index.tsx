import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {

  return (
    <div
      onClick={onClose}
      className={
        isOpen
          ? styles.modal_wrapper
          : `${styles.modal_wrapper} ${styles.out}`
      }
    >
      <div className={styles.modal_background}>
        <div onClick={(event) => event.stopPropagation()} className={styles.modal_content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;