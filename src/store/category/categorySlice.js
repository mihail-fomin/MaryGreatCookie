import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from '../../const'
import category from '../../assets/category'

const initialState = {
	category: category,
	error: '',
	activeCategory: 0,
};


const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		changeCategory(state, action) {
			state.activeCategory = action.payload.indexCategory
		}
	},
	// extraReducers: builder => {
	// 	builder
	// 		.addCase(categoryRequestAsync.pending, state => {
	// 			state.error = ''
	// 		})
	// 		.addCase(categoryRequestAsync.fulfilled, (state, action) => {
	// 			state.error = '';
	// 			state.category = action.payload;
	// 		})
	// 		.addCase(categoryRequestAsync.rejected, (state, action) => {
	// 			state.error = action.payload.error;
	// 		})
	// }
})

export const { changeCategory } = categorySlice.actions
export default categorySlice.reducer