import React from "react";

import style from './Order.module.css/'
import { OrderGoods } from '../OrderGoods/OrderGoods'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/modalDelivery/modalDeliverySlice'
import classNames from 'classnames'


export const Order = () => {
  const dispatch = useDispatch()

  const {
    totalPrice,
    totalCount,
    orderList,
    orderGoods
  } = useSelector(state => state.order)

  const [openOrder, setOpentOrder] = React.useState(true)

  function renderOrderGoods() {
    return Array.isArray(orderGoods) ? (
      orderGoods.map((item) => {
        const itemInOrderList = orderList.find(
          itemAtOrderList => itemAtOrderList.id === item.id
        )
        return <OrderGoods
          key={item.id}
          {...item}
          count={itemInOrderList ? itemInOrderList.count : 0}
        />
      })
    ) : null
  }

  const renderTotal = () => {
    return (
      <div className={style.total}>
        <p>Итого</p>
        <p>
          <span className={style.amount}>{totalPrice}</span>
          <span className={style.currency}>&nbsp;₽</span>
        </p>
      </div>
    );
  };

  return (
    <div className={classNames(style.order, openOrder ? style.order_open : '')}>
      <section className={style.wrapper}>
        <div className={style.header}
          tabIndex="0"
          role="button"
          onClick={() => setOpentOrder(prevState => !prevState)}
        >
          <h2 className={style.title}>Корзина</h2>

          <span className={style.count}>{totalCount}</span>
        </div>

        <div className={style.wrap_list}>
          <ul className={style.list}>{renderOrderGoods()}</ul>

          {renderTotal()}

          <button className={style.submit}
            disabled={orderGoods.length === 0}
            onClick={() => dispatch(openModal())}
          >
            Оформить заказ
          </button>

          <div className={style.apeal}>
            <p className={style.text}>Стоимость доставки будет посчитана позже</p>
            <button
              className={style.close}
              onClick={() => setOpentOrder(prevState => !prevState)}
            >
              Свернуть
            </button>
          </div>
        </div>
      </section>
    </div>
  )

}