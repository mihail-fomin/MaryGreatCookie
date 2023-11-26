import { Count } from "../Count/Count"
import style from './OrderGoods.module.css'

export const OrderGoods = ({ title, price, imageurl, count, id, weight }) => (
  <li className={style.item}>
    <div className={style.image_wrapper}>
      <img className={style.image} src={`${imageurl}`} alt={title} />
    </div>

    <div className={style.goods}>
      <h3 className={style.title}>{title}</h3>

      <p className={style.weight}>{weight}г</p>

      <p className={style.price}>{price}
        <span>&nbsp;₽</span>
      </p>
    </div>

    <Count count={count} id={id} />
  </li>

)