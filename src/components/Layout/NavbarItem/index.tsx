import { FC, MouseEvent } from 'react';
import { TrashX } from 'tabler-icons-react';
import { useCategories } from '../../../context/categories';
import { useDeleteCategoryMutation } from '../../../store';
import { Category } from '../../../store/types';
import ErrorNotification from '../../ErrorNotification';
import IconLoader from '../../Loader';
import styles from './styles.module.scss';

type Props = {
  category: Category;
};

const NavbarItem: FC<Props> = ({ category }) => {
  const { currentCategory: categoryId, setCurrentCategory } = useCategories();

  const [deleteCategory, { isLoading: isDeleteLoading }] = useDeleteCategoryMutation();

  const handleChangeCurrentCategory = (category: string) => {
    setCurrentCategory(category);
  };

  const handleDeleteCategory = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await deleteCategory(category.id);
    } catch (error) {
      return <ErrorNotification message={error} />;
    }
  };

  return (
    <li
      className={
        categoryId === category.id
          ? `${styles.navbar__li} ${styles.active}`
          : styles.navbar__li
      }
      onClick={() => handleChangeCurrentCategory(category.id)}
    >
      <span>{category.name}</span>
      {
        category.id !== '1'
          ?
          <button
            onClick={handleDeleteCategory}
            className={styles.navbar_deleteButton}
            disabled={isDeleteLoading}
          >
            {
              isDeleteLoading
                ? <IconLoader size={18} color={'#000'} />
                : <TrashX size={18} strokeWidth={2} color={'#000'} />
            }
          </button>
          : null
      }
    </li>
  );
};

export default NavbarItem;