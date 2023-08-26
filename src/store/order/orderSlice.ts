import { createSlice } from "@reduxjs/toolkit"
import { sumCount, sumPrice } from "../../utils/calcCountAndPrice";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

interface orderList {
  id: string,
  title: string,
  price: number,
  weight: number,
  description: string,
  category: string,
  image: string,
}

interface orderState {
  orderList: orderList[],
  totalPrice: number,
  totalCount: number,
}

const initialState: orderState = {
	orderList: JSON.parse(localStorage.getItem('order') || '[]'),
	totalPrice: 0,
	totalCount: 0,
};


const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
    loadFromLocalStorage: (state) => {
      const storedItems = localStorage.getItem('order');
      console.log('storedItems: ', storedItems);
      if (!!storedItems) {
        state.orderList = (JSON.parse(storedItems));
      }
    },
		addProduct: (state, action: PayloadAction<string>) => {
      console.log('state.orderList: ', typeof(state.orderList));
      const itemInOrderList = Array.isArray(state.orderList) ? 
			  state.orderList.find(
				  item => item.id === action.payload.id
			  ) : null

			if (!!itemInOrderList) {
        
        console.log('itemInOrderList.count: ', itemInOrderList.count);
				itemInOrderList.count += 1

				state.totalCount = sumCount(state.orderList)
				state.totalPrice = sumPrice(state.orderList)

			} else {
				state.orderList.push({ ...action.payload, count: 1 })
			}
		},
		removeProduct: (state, action) => {
			const itemInOrderList = state.orderList.find(
				item => item.id === action.payload.id
			)

			if (itemInOrderList.count > 1) {
				itemInOrderList.count -= 1

        state.totalCount = sumCount(state.orderList)
				state.totalPrice = sumPrice(state.orderList)
			} else {
				state.orderList = state.orderList.filter(item => item.id !== action.payload.id)
			}
		},
		clearOrder: (state) => {
			state.orderList = []
		}
	},
})

export const { loadFromLocalStorage, addProduct, removeProduct, clearOrder } = orderSlice.actions;
export default orderSlice.reducer