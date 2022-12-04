import { FC, useEffect, useState } from 'react';
import { X, AlertOctagon } from 'tabler-icons-react';
import styles from './styles.module.scss';

type Props = {
  autoDeleteTime?: number;
  message?: any;
  onClose: () => void;
};

const ErrorNotification: FC<Props> = ({ autoDeleteTime = 5000, message, onClose }) => {
  const [isShowTime, setIsShowTime] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowTime(false);
      onClose();
    }, autoDeleteTime);

    return () => {
      clearTimeout(timer);
    };
  }, [autoDeleteTime, onClose]);

  const handleClose = () => {
    setIsShowTime(false);
  };

  return (
    <div className={isShowTime ? styles.notification_wrapper : `${styles.notification_wrapper} ${styles.hidden}`}>
      <div className={styles.notification}>
        <button onClick={handleClose} className={styles.notification_button}>
          <X size={18} strokeWidth={3} color={'#7c0210'} />
        </button>
        <div className={styles.notification_group}>
          <AlertOctagon size={25} color={'#D2001A'} />
          <div className={styles.notification_stack}>
            <div className={styles.notification_title}>Error!</div>
            {message ? <div className={styles.notification_message}>{message}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;