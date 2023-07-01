import { Field } from 'formik';
import style from './ModalDelivery.module.css';


export default function InputField({
	label,
	type,
	name,
	value,
	errors,
	touched,
	handleChange,
	handleBlur,
}) {

	return (
		<>
			<label className={style.fieldset}>
				{label}
				<Field
					className={style.input}
					type={type}
					name={name}
					onChange={handleChange}
					onBlur={handleBlur}
					value={value}
				/>
			</label>
			{errors && touched ? <div>{errors}</div> : null}
			{errors && touched &&
				<div style={{ color: red }}>{errors}</div>
			}
		</>
	)
}