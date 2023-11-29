import { configureStore } from '@reduxjs/toolkit'

import { categorySlice } from './category/categoryApi'
import orderReducer from './order/orderSlice'
import modalReducer from './modalDelivery/modalDeliverySlice'
import formReducer from './form/formSlice'
import { categoriesApi } from './category/categoryApi'
import { catalogApi } from './product/productApi'
import { orderApi } from './order/orderApi'


export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    category: categorySlice.reducer,
    order: orderReducer,
    modal: modalReducer,
    form: formReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(catalogApi.middleware)
      .concat(orderApi.middleware)
  // .concat(localStorageMiddleware)
});