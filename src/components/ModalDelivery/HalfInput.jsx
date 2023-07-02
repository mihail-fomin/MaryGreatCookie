import { Field } from 'formik';
import classNames from 'classnames';
import style from './ModalDelivery.module.css';


export default function InputField({
	label,
	placeholder,
	type,
	name,
	value,
	handleChange,
}) {

	return (
		<>
			<label className={style.fieldset}>
				{label}
				<Field
					className={classNames(style.input, style.input_half)}
					placeholder={placeholder}
					type={type}
					name={name}
					onChange={handleChange}
					value={value}
				/>
			</label>
		</>
	)
}