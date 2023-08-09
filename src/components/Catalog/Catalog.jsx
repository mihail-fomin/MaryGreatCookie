import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Container/Container"
import style from "./Catalog.module.css"
import { Order } from "../Order/Order"
import { CatalogProduct } from "./CatalogProduct/CatalogProduct";
import db from "../../assets/db";

export const Catalog = () => {
	const { category, activeCategory } = useSelector(state => state.category)

	return (
		<section className={style.catalog}>
			<Container>
				<div className={style.container}>
					<Order />
					<div className={style.wrapper}>
						<h2 className={style.title}>{category[activeCategory]?.rus}</h2>
						<div className={style.wrap_list}>
							<ul className={style.list}>
								{
									db.map((item) => (
										item.category == category[activeCategory].title &&
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
