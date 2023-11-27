import { useDispatch } from 'react-redux'
import { addProduct } from '../../../store/order/orderSlice'
import style from './CatalogProduct.module.css'

export const CatalogProduct = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <article className={style.product}>
      <div className={style.scale}>
        <img src={`${item.imageurl}`} alt={item.title} className={style.image} />
      </div>

      <p className={style.price}>{item.price}<span className="currency">&nbsp;₽</span></p>

      <h3 className={style.title}>
        <button className={style.detail}>{item.title}</button>
      </h3>

      <p className={style.weight}>{item.weight}&nbsp;г</p>

      <button
        className={style.add}
        type="button"
        onClick={() => {
          dispatch(addProduct({ id: item.id }))
        }}
      >
        Добавить
      </button>
    </article>
  )
}



