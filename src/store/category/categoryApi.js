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
    activeCategoryIndex: 0,
    activeCategoryName: '',
  },
  reducers: {
    changeCategoryIndex: (state, action) => {
      state.activeCategoryIndex = action.payload.indexCategory;
    },
    setActiveCategoryName: (state, action) => {
      state.activeCategoryName = action.payload.categoryName;
    },
  },
});

export const { useGetCategoriesQuery } = categoriesApi;

export const { changeCategoryIndex, setActiveCategoryName } = categorySlice.actions;
export const selectActiveCategoryIndex = (state) => state.category.activeCategoryIndex;
export const selectActiveCategoryName = (state) => state.category.activeCategoryName;