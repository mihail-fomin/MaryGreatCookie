import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { closeModal } from "../modalDelivery/modalDeliverySlice"
import { clearOrder } from "../order/orderSlice"
import { API_URI } from "../../const"

const initialState = {
  name: '',
  phone: '',
  format: 'delivery',
  adress: '',
  floor: '',
  intercom: '',
  comments: '',
}


export const submitForm = createAsyncThunk(
  'form/submit',
  async (userData, { dispatch, rejectWithValue }) => {
    try {

      let body = {
        name: userData.name,
        phone: userData.phone,
        format: userData.format,
        adress: userData.adress,
        floor: userData.floor,
        intercom: userData.intercom,
        comments: userData.comments,
        order,
      }

      const response = await fetch(`${API_URI}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body
      })

      dispatch(clearOrder())
      dispatch(closeModal())

      return await response.json()
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading'
        state.response = null
        state.error = null
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'success'
        state.response = action.payload
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { updateFormValue } = formSlice.actions
export default formSlice.reducer