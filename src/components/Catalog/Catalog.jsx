import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../Container/Container"
import style from "./Catalog.module.css"
import { Order } from "../Order/Order"
import { useGetProductsByCategoryQuery } from "../../store/product/productApi";
import { selectActiveCategoryName, setActiveCategoryName, useGetCategoriesQuery, } from "../../store/category/categoryApi";
import { CatalogProduct } from "./CatalogProduct/CatalogProduct";


export const Catalog = () => {
  const [skip, setSkip] = React.useState(true)
  const dispatch = useDispatch()
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  // Загружаем первую категорию после загрузки списка категорий
  React.useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      dispatch(setActiveCategoryName({ categoryName: categoriesData[0] }));
      setSkip(prev => !prev)
    }
  }, [categoriesData, dispatch]);

  const activeCategory = useSelector(selectActiveCategoryName)
  const { data, isLoading } = useGetProductsByCategoryQuery(activeCategory, {
    skip
  })


  return (
    <section className={style.catalog}>
      <Container>
        <div className={style.container}>
          <Order />
          <div className={style.wrapper}>
            <h2 className={style.title}>{activeCategory}</h2>
            <div className={style.wrap_list}>
              <ul className={style.list}>
                {
                  data && data.map((item) => (
                    <li key={item.id} className={style.item} >
                      <CatalogProduct item={item} />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
