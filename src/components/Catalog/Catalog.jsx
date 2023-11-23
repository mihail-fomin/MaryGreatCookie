import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../Container/Container"
import style from "./Catalog.module.css"
import { Order } from "../Order/Order"
import { useGetProductsQuery } from "../../store/product/productApi";
import { selectActiveCategoryName, setActiveCategoryName, useGetCategoriesQuery, } from "../../store/category/categoryApi";
import { getCategoryTranslate } from '../../utils/getTranslate'


export const Catalog = () => {
  const dispatch = useDispatch()
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const activeCategory = useSelector(selectActiveCategoryName)
  const { data, isLoading } = useGetProductsQuery(activeCategory)

  // Загружаем первую категорию после загрузки списка категорий
  React.useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      dispatch(setActiveCategoryName({ categoryName: categoriesData[0] }));
    }
  }, [categoriesData, dispatch]);

  console.log('activeCategory: ', activeCategory);

  console.log('Catalog data: ', data);

  return (
    <section className={style.catalog}>
      <Container>
        <div className={style.container}>
          {/* <Order /> */}
          <div className={style.wrapper}>
            {/* <h2 className={style.title}>{getCategoryTranslate(activeCategory)}</h2> */}
            <div className={style.wrap_list}>
              {/* <ul className={style.list}>
                {
                  data.map((item) => (
                    item.category == activeCategory.title &&
                    <li key={item.id} className={style.item} >
                      <CatalogProduct item={item} />
                    </li>
                  ))
                }
              </ul> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
