import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import productReducer from './product/productSlice'
import orderReducer from './order/orderSlice'
import modalReducer from './modalDelivery/modalDeliverySlice'
import formReducer from './form/formSlice'

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		order: orderReducer,
		modal: modalReducer,
		form: formReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch