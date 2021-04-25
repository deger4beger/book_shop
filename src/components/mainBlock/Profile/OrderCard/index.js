import React from 'react';
import cn from "classnames"

import s from './styles.module.css';
import OrderCartItem from "./OrderCartItem"


const OrderCard = ({id, totalCount, totalPrice, products, status, date}) => {
  	return (
   	 	<div className={s.wrapper}>
   	 		<div className={s.inner}>
   	 			<div className={s.title}>
	   	 			<div className={s.titleLeft}>
	   	 				Order №{id} <span className={s.date}>({date})</span>
	   	 			</div>
	   	 			<div className={cn(s.date, s.titleRight)}>
	   	 				<span className={s.status}>Processing</span>
	   	 				<span className={s.statusTitle}>status</span>
	   	 			</div>
	   	 		</div>
	   	 		<div className={s.totalInfo}>
	   	 			<div className={s.infoItem}>
	   	 			Total: {totalCount} {totalCount === 1 ? "book" : "books"} on {totalPrice}$</div>
	   	 		</div>
	   	 		<div className={s.orderItems}>
	   	 			{products.map((product, index) => {
	   	 				return <OrderCartItem
	   	 					key={product.id}
	   	 					id={product.id}
	   	 					price={product.copyPrice}
	   	 					count={product.copyCount}
	   	 					title={product.name}
	   	 					author={product.author}
	   	 					image={product.image}
	   	 					last={products.length === index + 1}
	   	 				/>
	   	 			})}
	   	 		</div>
   	 		</div>
   	 	</div>
  	)
}

export default OrderCard
