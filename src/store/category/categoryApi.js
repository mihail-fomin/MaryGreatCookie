import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URI } from '../../const'


export const categoriesApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/api/categories`,
    })
  })
})

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    activeCategory: 0,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload.indexCategory;
    },
  },
});

export const { useGetCategoriesQuery } = categoriesApi;

export const { changeCategory } = categorySlice.actions;
export const selectActiveCategory = (state) => state.category.activeCategory;