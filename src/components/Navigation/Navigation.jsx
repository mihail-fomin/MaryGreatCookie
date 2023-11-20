import classNames from 'classnames'

import style from './Navigation.module.css'
import categoryTranslations from '../../assets/category.json'
import { Container } from '../Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCategoriesQuery, changeCategory, selectActiveCategory } from '../../store/category/categoryApi';

export const Navigation = () => {
  const { data = [], isLoading } = useGetCategoriesQuery()
  const activeCategory = useSelector(selectActiveCategory);
  const dispatch = useDispatch()

  if (isLoading) return <h1>Loading...</h1>

  function getCategoryTranslate(category) {
    const categoryObject = categoryTranslations.find(el => el.title === category)
    return categoryObject.rus
  }

  function getImageUrl(name) {
    return new URL(`../../assets/img/categories/${name}.png`, import.meta.url).href
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
                  activeCategory === i ? style.button_active : '')}
                style={{ backgroundImage: `url(${getImageUrl(item)})` }}
                onClick={() => dispatch(changeCategory({ indexCategory: i }))}
              >
                {getCategoryTranslate(item) || item}
              </button>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  )
}