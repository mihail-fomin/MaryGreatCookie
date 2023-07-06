import style from './ModalDelivery.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalDelivery/modalDeliverySlice';
import OrderForm from './Form/OrderForm'

export const ModalDelivery = () => {
	const { isOpen } = useSelector(state => state.modal)
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
					<OrderForm />
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
		</div>
	)
}