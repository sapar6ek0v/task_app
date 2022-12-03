import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, TodoFormValue, UpdateStatusTodoValue } from './types';

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

    getSingleTodo: builder.query<Todo, string>({
      query: (todoId) => `/todos/${todoId}`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    createTodo: builder.mutation<Todo, Omit<TodoFormValue, 'id'>>({
      query(value) {
        return {
          url: '/todos',
          method: 'POST',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    changeStatus: builder.mutation<Todo, UpdateStatusTodoValue>({
      query(value) {
        return {
          url: `/todos/${value.id}`,
          method: 'PATCH',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    deleteTodo: builder.mutation<Todo, string>({
      query(todoId) {
        return {
          url: `/todos/${todoId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    updateTodo: builder.mutation<Todo, TodoFormValue>({
      query(value) {
        return {
          url: `/todos/${value.id}`,
          method: 'PUT',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useChangeStatusMutation,
  useDeleteTodoMutation,
  useGetSingleTodoQuery,
  useUpdateTodoMutation,
} = todosApi;
