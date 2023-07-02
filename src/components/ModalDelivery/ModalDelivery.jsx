import classNames from 'classnames';
import style from './ModalDelivery.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalDelivery/modalDeliverySlice';
import { Formik, Form, Field } from 'formik';
import { validateDeliveryForm } from './validateDeliveryForm';
import { submitForm } from './response';
import { clearOrder } from '../../store/order/orderSlice';
import InputField from './InputField';
import RadioButton from './RadioButton';

export const ModalDelivery = () => {
	const { isOpen } = useSelector(state => state.modal)
	const { orderList } = useSelector(state => state.order)
	const dispatch = useDispatch()


	return isOpen && (
		<div
			className={style.modal}
			onClick={({ target, currentTarget }) => {
				if (target === currentTarget) {
					dispatch(closeModal())
				}
			}}>
			<div className={style.mdelivery}>
				<div className={style.container}>
					<h2 className={style.title}>Доставка</h2>
					<Formik
						initialValues={{
							name: '',
							phone: '',
							format: 'delivery',
							adress: '',
							floor: '',
							intercom: '',
							comments: '',
						}}
						validate={validateDeliveryForm}
						onSubmit={
							(values) => {
								submitForm(values)
								dispatch(clearOrder())
								dispatch(closeModal())
							}
						}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<Form
								className={style.form}
								onSubmit={handleSubmit}
							>
								<InputField
									label='Имя'
									type="text"
									name="name"
									handleChange={handleChange}
									handleBlur={handleBlur}
									value={values.name}
									errors={errors.name}
									touched={touched.name}
								/>
								<InputField
									label='Телефон'
									type="tel"
									name="phone"
									handleChange={handleChange}
									handleBlur={handleBlur}
									value={values.phone}
									errors={errors.phone}
									touched={touched.phone}
								/>
								<fieldset className={style.fieldset_radio}>
									<RadioButton
										label='Самовывоз'
										value='pickup'
										handleChange={handleChange}
									/>
									<RadioButton
										label='Доставка'
										value='delivery'
										handleChange={handleChange}
									/>
								</fieldset>
								{values.format === 'delivery' && (
									<>
										<InputField
											type="text"
											name="adress"
											placeholder='Улица, дом, квартира'
											handleChange={handleChange}
											handleBlur={handleBlur}
											value={values.adress}
											errors={errors.adress}
											touched={touched.adress}
										/>
										<InputField
											type="text"
											name="floor"
											placeholder='Этаж'
											handleChange={handleChange}
											value={values.floor}
										/>
										<InputField
											type="text"
											name="intercom"
											placeholder='Домофон'
											handleChange={handleChange}
											value={values.intercom}
										/>
									</>
								)}

								{/* <input
											className={classNames(style.input, style.input_half)}
											type='number'
											name='floor'
											value={form.floor}
											placeholder='Этаж'
											onChange={handleInputChange}
										/>
										<input
											className={classNames(style.input, style.input_half)}
											type='number'
											name='intercom'
											value={form.intercom}
											placeholder='Домофон'
											onChange={handleInputChange}
										/> */}



								<button
									className={style.submit}
									type='submit'
									disabled={!Object.keys(touched).length || Object.keys(errors).length}
								>
									Оформить
								</button>
							</Form>
						)}
					</Formik>
					{/* <form className={style.form} id='delivery' onSubmit={handleSubmit}>
						<fieldset className={style.fieldset}>
							<input
								className={style.input}
								type='text'
								name='name'
								value={form.name}
								placeholder='Ваше имя'
								onChange={handleInputChange}
							/>
							<input
								className={style.input}
								type='tel'
								name='phone'
								value={form.phone}
								placeholder='Телефон'
								onChange={handleInputChange}
							/>
						</fieldset>

						<fieldset className={style.fieldset_radio}>
							<label className={style.label}>
								<input
									className={style.radio}
									type='radio'
									name='format'
									value='pickup'
									checked={form.format === 'pickup'}
									onChange={handleInputChange}
								/>
								<span>Самовывоз</span>
							</label>

							<label className={style.label}>
								<input
									className={style.radio}
									type='radio'
									name='format'
									value='delivery'
									checked={form.format === 'delivery'}
									onChange={handleInputChange}
								/>
								<span>Доставка</span>
							</label>
						</fieldset>

						{form.format === 'delivery' && (
							<fieldset className={style.fieldset}>
								<input
									className={style.input}
									type='text'
									name='address'
									value={form.address}
									placeholder='Улица, дом, квартира'
									onChange={handleInputChange}
								/>
								<input
									className={classNames(style.input, style.input_half)}
									type='number'
									name='floor'
									value={form.floor}
									placeholder='Этаж'
									onChange={handleInputChange}
								/>
								<input
									className={classNames(style.input, style.input_half)}
									type='number'
									name='intercom'
									value={form.intercom}
									placeholder='Домофон'
									onChange={handleInputChange}
								/>
							</fieldset>
						)}
						<fieldset className={style.fieldset}>
							<textarea
								className={classNames(style.comments)}
								rows={3}
								type='text'
								name='comments'
								value={form.comments}
								placeholder='Комментарии к заказу'
								onChange={handleInputChange}
							/>
						</fieldset>
					</form> */}

				</div>

				<button
					className={style.modal__close}
					type='button'
					onClick={() => {
						dispatch(closeModal())
					}}
				>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							x='5.07422'
							y='5.28247'
							width='2'
							height='20'
							transform='rotate(-45 5.07422 5.28247)'
						/>
						<rect
							x='5.78125'
							y='19.4246'
							width='2'
							height='20'
							transform='rotate(-135 5.78125 19.4246)'
						/>
					</svg>
				</button>
			</div>
		</div >
	)
}