import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: string;
  highlight: string;
};

const Highlighter: FC<Props> = ({ text, highlight }) => {

  const escapeRegExp = (str: string) => {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  };

  if (!highlight.trim()) {
    return <span>{text}</span>;
  };

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {
        parts
          .filter((part) => part)
          .map((part, i) => (
            regex.test(part)
              ? <mark key={i} className={styles.marked}>{part}</mark>
              : <span key={i}>{part}</span>
          ))
      }
    </>
  );
};

export default Highlighter;