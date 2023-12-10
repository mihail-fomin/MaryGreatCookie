import React from "react"
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalDelivery/modalDeliverySlice";
import { clearOrder } from "../../store/order/orderSlice";
import style from './AlertModal.module.css'


export default function AlertModal({ active, setActive }) {
  const dispatch = useDispatch()

  const modalClasses = `${style.modal} ${active ? style.active : ''}`;
  const modalContentClasses = `${style.modal__content} ${active ? style.active : ''}`;

  const closeAlertModal = () => {
    setActive(false)
    dispatch(clearOrder())
    dispatch(closeModal())
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeAlertModal()
    }, 3000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timeoutId);
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только после монтирования

  return (
    <div
      className={modalClasses}
      onClick={closeAlertModal}
    >
      <div className={modalContentClasses}
        onClick={e => e.stopPropagation()}
      >
        <p>Спасибо за заказ!</p>
        <p>Мы обработаем его в ближайшее время и обязательно с Вами свяжемся.</p>
        <button
          className={style.submit}
          onClick={closeAlertModal}
        >ОК</button>
      </div>
    </div>
  )
}