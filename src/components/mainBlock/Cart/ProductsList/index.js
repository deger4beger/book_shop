import React from 'react'

import s from './styles.module.css'
import CartBookCard from "./CartBookCard"


const ProductsList = React.memo(({data}) => {
  	return (
    	<div className={s.elems}>
			{data?.map(book => {
				return <CartBookCard
							key={book.id}
							id={book.product.id}
							name={book.product.name}
							author={book.product.author}
							image={book.product.image}
							price={book.copy_price.toFixed(2)}
							count={book.copy_count}
							sale={book.product.sale}
							discountPrice={book.copyDiscountPrice?.toFixed(2)}
						/>
					}
				)
			}
    	</div>
  	)
})

export default ProductsList
