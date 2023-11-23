import { createSlice } from "@reduxjs/toolkit"
import db from "../../store/db";

const initialState = {
  products: db,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts(state) {
      const activeProducts = store.getState().category.activeCategory;
    },
    // extraReducers: builder => {
    // 	builder
    // 		.addCase(productRequestAsync.pending, state => {
    // 			state.error = ''
    // 		})
    // 		.addCase(productRequestAsync.fulfilled, (state, action) => {
    // 			state.error = ''
    // 			state.await = false
    // 			state.products = action.payload
    // 		})
    // 		.addCase(productRequestAsync.rejected, (state, action) => {
    // 			state.error = action.payload.error
    // 			state.await = false
    // 		})
    // }
  }
})

export const { getProducts } = productSlice.actions
export default productSlice.reducer