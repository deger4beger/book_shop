import React from 'react'
import { useSelector } from "react-redux"

import s from './styles.module.css'
import BookCard from "./BookCard"
import storePreloaderDark from "assets/storePreloaderDark.svg"
import storePreloaderLight from "assets/storePreloaderLight.svg"
import { getIsLoadingBooks } from '../../../../redux/selectors/booksSelectors';

const BooksList = React.memo(({data, theme, getBooks}) => {

	const loading = useSelector(getIsLoadingBooks)
	const isLoading = loading.includes("store")

  	return (
    	<div className={s.elems}>
    		{isLoading ? <img src={theme === "dark" ? storePreloaderDark : storePreloaderLight}
				alt="#" className={s.preloader} /> : null}
			{!isLoading && data?.map(book => {
				const {id, name, author, image, price, rating, sale, discountPrice} = book
				return <BookCard name={name}
							key={id}
							id={id}
							author={author}
							image={image}
							price={price}
							getBooks={getBooks}
							rating={rating}
							sale={sale}
							discountPrice={discountPrice}
						/>
					}
				)
			}
    	</div>
  	)
})

export default BooksList
