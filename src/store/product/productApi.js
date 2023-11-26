import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URI } from '../../const'


export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI,
    onError: (error) => {
      console.error('API request error:', error);
    },
  }),
  endpoints: (build) => ({
    getProductsByCategory: build.query({
      query: (category) =>
        category
          ? `/api/productsByCategory/${category}`
          : `/api/product`
    })
  })
})



export const { useGetProductsByCategoryQuery } = catalogApi;