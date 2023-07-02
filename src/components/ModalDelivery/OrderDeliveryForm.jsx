import HalfInput from "./HalfInput";
import InputField from "./InputField";
import style from './ModalDelivery.module.css';


export default function OrderDeliveryForm({
	handleChange,
	handleBlur,
	values,
	errors,
	touched,
}) {

	return (
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
			<div className={style.fieldset}>
				<HalfInput
					type="text"
					name="floor"
					placeholder='Этаж'
					handleChange={handleChange}
					value={values.floor}
				/>
				<HalfInput
					type="text"
					name="intercom"
					placeholder='Домофон'
					handleChange={handleChange}
					value={values.intercom}
				/>
			</div>
		</>
	)
}