import { createContext, useContext } from 'react';

export type Category = {
  pathId: string;
};

export const CategoriesContext = createContext({});

export const useCategories = () => useContext(CategoriesContext);
