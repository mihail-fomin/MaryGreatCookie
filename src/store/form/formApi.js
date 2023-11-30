import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { build } from 'vite'

import { API_URI } from '../../const'

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI,
    sendOrder: build.mutation({
      query: (orderData) => ({
        url: `${API_URI}/api/message`,
        method: 'POST',
        body: orderData
      })
    })
  })
})

export const { useSendOrderQuery } = formApi;