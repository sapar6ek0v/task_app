import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, TodoFormValue } from './types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MOCK_API_URL,
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => `/todos?sortBy=createdAt&order=desc`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    createTodo: builder.mutation<Todo, TodoFormValue>({
      query(value) {
        return {
          url: '/todos',
          method: 'POST',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),

  // updateTodo: builder.mutation<Todo, Omit<Todo, 'createdAt'>>({
  //   query(value) {
  //     return {
  //       url: '/todos',
  //       method: 'PUT',
  //       body: value,
  //     };
  //   },
  //   invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
  // }),

  // deleteTodo: builder.mutation<Todo, string>({
  //   query: (id) => `/todos/${id}`,
  //   providesTags: [{ type: 'Todos', id: 'LIST' }],
  // }),
});

export const { useGetAllTodosQuery, useCreateTodoMutation } = todosApi;
