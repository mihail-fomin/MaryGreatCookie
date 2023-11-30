import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URI } from '../../const'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI,
    onError: (error) => {
      console.error('orderApi request error:', error)
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getProductsByIds: build.query({
      query: (ids) =>
        ids
          ? `/api/product/${ids}`
          : '',
    })
  })
})

export const { useGetProductsByIdsQuery } = orderApi;