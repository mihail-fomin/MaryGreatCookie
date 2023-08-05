import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { closeModal } from "../modalDelivery/modalDeliverySlice"
import { clearOrder } from "../order/orderSlice"


const initialState = {
	name: '',
	phone: '',
	format: 'delivery',
	adress: '',
	floor: '',
	intercom: '',
	comments: '',
}

// let formatBody = ({ name, phone, format }) => `
// <strong>Заявка с сайта</strong>n/
// <b>Отправитель:</b> ${name}n/
// <b>Телефон:</b> ${phone}n/
// <b>Способ передачи:</b> ${format === 'delivery' ? 'Доставка' : 'Самовывоз'} n/
// <b>Комментарии к заказу:</b> ${comments}
// `

// let body = formatBody({
// 	name: this.name.value,
// 	phone: this.phone.value,
// 	format: this.format.value,
// 	data:
// })

export const submitForm = createAsyncThunk(
	'form/submit',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch('https://api.telegram.org/bot5775183225:AAGUPuyf5PHRfSa5Zoux-zz5_KWIx1vHAPo/sendMessage',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						chat_id: "-1001759583869",
						text: data,
						parse_mode: "html",
					})
				}
			)
			if (!response.ok) {
				throw new Error(`Ошибка ${response.statusText}`)
			}

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