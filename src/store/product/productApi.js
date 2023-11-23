import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URI } from '../../const'


export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (category) => `/api/productsByCategory/${category}`
    })
  })
})


export const { useGetProductsQuery } = catalogApi;