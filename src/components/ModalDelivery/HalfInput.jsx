import { Field } from 'formik';
import classNames from 'classnames';
import style from './ModalDelivery.module.css';


export default function HalfInput({
	placeholder,
	type,
	name,
	value,
	handleChange,
}) {

	return (
		<>
			<Field
				className={classNames(style.input, style.input_half)}
				placeholder={placeholder}
				type={type}
				name={name}
				onChange={handleChange}
				value={value}
			/>
		</>
	)
}