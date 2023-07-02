import style from './ModalDelivery.module.css';
import { Field } from 'formik';

export default function RadioButton({
	label,
	value,
	handleChange
}) {

	return (
		<label className={style.label}>
			<Field
				className={style.radio}
				type='radio'
				name='format'
				value={value}
				onChange={handleChange}
			/>
			<span>{label}</span>
		</label>
	)
}
