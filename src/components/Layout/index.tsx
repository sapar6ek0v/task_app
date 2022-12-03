import { ChangeEvent, FC, KeyboardEvent, ReactNode, useState } from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '../../store';
import NavbarItem from './NavbarItem';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode
};

const Layout: FC<Props> = ({ children }) => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCategoryLoading }] = useCreateCategoryMutation();

  const [category, setCategory] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCategory(newValue);
  };

  const handleOnKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (!category) return;

    if (event.key === 'Enter') {
      await createCategory({ name: category });
      setCategory('');
    }
  };

  return (
    <div className={styles.layout_wrapper}>
      <nav className={styles.navbar__wrapper}>
        <ul className={styles.navbar__ul}>
          {
            (!isLoading && !!categories)
              ? categories.map((category) => (
                <NavbarItem key={category.id} category={category} />
              ))
              : null
          }

          <div className={styles.navbar__form}>
            <input
              value={isCategoryLoading ? 'Создание...' : category}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className={styles.navbar__input}
              type='text'
              placeholder='Создать категорию...'
            />
            <span className={styles.navbar__inputPlus}>+</span>
          </div>
        </ul>
      </nav>
      <div className={styles.content_wrapper}>{children}</div>
    </div>
  );
};

export default Layout;