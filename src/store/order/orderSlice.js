import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URI, POSTFIX } from "../../const";
import { sumCount, sumPrice } from "../../utils/calcCountAndPrice";

const orderList = JSON.parse(localStorage.getItem('order') || '[]')


const initialState = {
  orderList,
  orderGoods: [],
  totalPrice: 0,
  totalCount: 0,
  error: [],
};

export const localStorageMiddleware = store => next => action => {
  const nextAction = next(action)
  if (nextAction.type.startsWith('order/')) {
    const orderList = store.getState().order.orderList
    localStorage.setItem('order', JSON.stringify(orderList))
  }
  return nextAction
}


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const itemInOrderList = state.orderList.find(
        item => item.id === action.payload.id
      )

      if (itemInOrderList) {
        itemInOrderList.count++
      }
      else {
        state.orderList.push({ ...action.payload, count: 1 })
      }
    },
    removeProduct: (state, action) => {
      const itemInOrderList = state.orderList.find(
        item => item.id === action.payload.id
      )
      if (itemInOrderList) {
        if (itemInOrderList.count > 1) {
          itemInOrderList.count--
        }
        else {
          state.orderList = state.orderList.filter(
            item => item.id !== action.payload.id
          )
        }
      }

    },
    clearOrder: (state) => {
    }
  },
})

export const { addProduct, removeProduct, clearOrder } = orderSlice.actions;
export default orderSlice.reducer