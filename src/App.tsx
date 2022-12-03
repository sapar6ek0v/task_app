import { FC } from 'react';
import Form from './components/Form';
import Layout from './components/Layout';
import IconLoader from './components/Loader';
import TodoList from './components/TodoList';
import { useGetAllTodosQuery } from './store';
import './index.scss';

const App: FC = () => {
  const { data: todos, isLoading } = useGetAllTodosQuery();

  return (
    <Layout>
      <Form />
      <div className='appLoader_wrapper'>
        {
          (!isLoading && !!todos)
            ? <TodoList todos={todos} />
            : <IconLoader />
        }
      </div>
    </Layout>
  );
};

export default App;
