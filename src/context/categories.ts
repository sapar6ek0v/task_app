import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type Category = {
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
};

export const CategoriesContext = createContext<Category>({
  currentCategory: '',
  setCurrentCategory: () => {},
});

export const useCategories = () => useContext(CategoriesContext);
