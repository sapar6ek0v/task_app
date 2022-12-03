import { FC, useState } from 'react';
import Layout from './components/Layout';
import { CategoriesContext } from './context/categories';
import Main from './pages/Main';
import { useGetAllCategoriesQuery } from './store';

const App: FC = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const [currentCategory, setCurrentCategory] = useState<string>(categories?.[0].id || '1');

  return (
    <CategoriesContext.Provider value={{ currentCategory, setCurrentCategory }}>
      <Layout>
        <Main />
      </Layout>
    </CategoriesContext.Provider>
  );
};

export default App;
