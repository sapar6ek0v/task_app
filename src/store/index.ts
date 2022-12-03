import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Category,
  CategoryFormValue,
  Todo,
  TodoFormValue,
  TodoIdsValue,
  UpdateStatusTodoValue,
} from './types';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MOCK_API_URL,
  }),
  tagTypes: ['Todos', 'Categories'],
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], string>({
      query: (categoryId) => `/categories/${categoryId}/todos?sortBy=createdAt&order=desc`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    getSingleTodo: builder.query<Todo, TodoIdsValue>({
      query: (value) => `/categories/${value.categoryId}/todos/${value.id}`,
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    createTodo: builder.mutation<Todo, Omit<TodoFormValue, 'id'>>({
      query(value) {
        return {
          url: `/categories/${value.categoryId}/todos`,
          method: 'POST',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    changeStatus: builder.mutation<Todo, UpdateStatusTodoValue>({
      query(value) {
        return {
          url: `/categories/${value.categoryId}/todos/${value.id}`,
          method: 'PATCH',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    deleteTodo: builder.mutation<Todo, TodoIdsValue>({
      query(value) {
        return {
          url: `/categories/${value.categoryId}/todos/${value.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    updateTodo: builder.mutation<Todo, TodoFormValue>({
      query(value) {
        return {
          url: `/categories/${value.categoryId}/todos/${value.id}`,
          method: 'PUT',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    createCategory: builder.mutation<Category, CategoryFormValue>({
      query(value) {
        return {
          url: `/categories`,
          method: 'POST',
          body: value,
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    getAllCategories: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    getSingleCategory: builder.query<Category, string>({
      query: (categoryId) => `/categories/${categoryId}`,
      providesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    deleteCategory: builder.mutation<Todo, string>({
      query(categoryId) {
        return {
          url: `/categories/${categoryId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
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
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
} = todosApi;
