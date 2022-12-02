import { ChangeEvent, FC, FormEvent, KeyboardEvent, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import styles from './styles.module.scss';

const Form: FC = () => {
  const [todo, setTodo] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTodo = event.target.value;
    setTodo(newTodo);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_wrapper}>
      <input
        value={todo}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        className={styles.form__input}
        type='text'
        placeholder='Создать...'
      />
      <button type='submit' className={styles.form__button}>
        <Plus size={20} strokeWidth={2} color={'#5e35b1'} />
      </button>
    </form>
  );
};

export default Form;