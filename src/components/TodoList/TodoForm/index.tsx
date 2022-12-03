import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Asterisk } from 'tabler-icons-react';
import { TodoFormValue } from '../../../store/types';
import CustomCheckbox from '../../CustomCheckbox';
import IconLoader from '../../Loader';
import styles from './styles.module.scss';

type Props = {
  defaultValues?: TodoFormValue;
  isLoading: boolean;
  onSubmit: (value: TodoFormValue) => Promise<void>;
};

const TodoForm: FC<Props> = ({ onSubmit, defaultValues, isLoading }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(defaultValues?.isCompleted || false);
  const [todo, setTodo] = useState<string>(defaultValues?.todo || '');

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTodo(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!defaultValues?.id || !todo) return;
    try {
      const value: TodoFormValue = {
        id: defaultValues.id,
        todo,
        isCompleted,
        categoryId: defaultValues.categoryId,
      };

      await onSubmit(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_wrapper}>
      <h5 className={styles.form_title}>Обновить Todo</h5>
      <div>
        <label className={styles.form_label} htmlFor='todo'>
          <span>Todo</span>
          <Asterisk size={10} strokeWidth={2} color={'red'} />
        </label>
        <input
          value={todo}
          onChange={handleOnChange}
          type='text'
          className={styles.form_input}
          id='todo'
        />
      </div>
      <div className={styles.form_checkbox_group}>
        <CustomCheckbox isCompleted={isCompleted} toggle={toggleCompleted} />
        <p className={styles.form_checkbox_title}>{isCompleted ? 'Сделано' : 'Не сделано'}</p>
      </div>
      <button
        type='submit'
        disabled={isLoading || !todo}
        className={styles.form_button}
      >
        {
          isLoading
            ? <IconLoader size={20} color={'#fff'} />
            : 'Обновить'
        }
      </button>
    </form>
  );
};

export default TodoForm;