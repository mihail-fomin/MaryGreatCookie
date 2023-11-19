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

  // const { category, activeCategory } = useSelector((state) => state.category)

  function getCategoryTranslate(categories) {
    for (const category of categories) {
      const categoryObject = categoryTranslations.find(el => el.title === category)
      return categoryObject.rus
    }
  }


  console.log(getCategoryTranslate(data));

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
                {item}
              </button>
            </li>
          )}
        </ul>

        {/* <ul className={style.list}>
          {category.map((item, i) =>
            <li key={item.title} className={style.item}>
              <button className={classNames(
                style.button,
                activeCategory === i ? style.button_active : '')}
                style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
                onClick={() => {
                  dispatch(changeCategory({ indexCategory: i }))
                }}
              >
                {item.rus}
              </button>
            </li>
          )}
        </ul> */}
      </Container>
    </nav>
  )
}