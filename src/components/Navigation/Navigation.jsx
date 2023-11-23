import classNames from 'classnames'

import style from './Navigation.module.css'
import { getCategoryTranslate } from '../../utils/getTranslate'
import { Container } from '../Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import {
  useGetCategoriesQuery,
  selectActiveCategoryIndex,
  changeCategoryIndex,
  setActiveCategoryName
} from '../../store/category/categoryApi';

export const Navigation = () => {
  const dispatch = useDispatch()

  const { data = [], isLoading } = useGetCategoriesQuery()

  const activeCategoryIndex = useSelector(selectActiveCategoryIndex);

  if (isLoading) return <h1>Loading...</h1>


  function getImageUrl(name) {
    return new URL(`../../assets/img/categories/${getCategoryTranslate(name)}`,
      import.meta.url).href
  }

  const handleCategoryChange = (index) => {
    dispatch(changeCategoryIndex({ indexCategory: index }));
    // dispatch(setActiveCategoryName({ categoryName: data[index] }));
  }

  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          {data.map((item, i) =>
            <li key={item} className={style.item}>
              <button
                className={classNames(
                  style.button,
                  activeCategoryIndex === i ? style.button_active : '')}
                style={{ backgroundImage: `url(${getImageUrl(item)})` }}
                onClick={() => handleCategoryChange(i)}
              >
                {item}
              </button>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  )
}