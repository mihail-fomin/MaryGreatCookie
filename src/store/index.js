import { configureStore } from '@reduxjs/toolkit'

import { categorySlice } from './category/categoryApi'
import productReducer from './product/productSlice'
import orderReducer, { localStorageMiddleware } from './order/orderSlice'
import modalReducer from './modalDelivery/modalDeliverySlice'
import formReducer from './form/formSlice'
import { categoriesApi } from './category/categoryApi'


export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    category: categorySlice.reducer,
    product: productReducer,
    order: orderReducer,
    modal: modalReducer,
    form: formReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(localStorageMiddleware)
});