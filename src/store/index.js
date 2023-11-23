import { configureStore } from '@reduxjs/toolkit'

import { categorySlice } from './category/categoryApi'
import orderReducer, { localStorageMiddleware } from './order/orderSlice'
import modalReducer from './modalDelivery/modalDeliverySlice'
import formReducer from './form/formSlice'
import { categoriesApi } from './category/categoryApi'
import { catalogApi } from './product/productApi'


export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    category: categorySlice.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    order: orderReducer,
    modal: modalReducer,
    form: formReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(catalogApi.middleware)
      .concat(localStorageMiddleware)
});