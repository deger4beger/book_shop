import React, { useEffect, useState } from 'react';
import cn from "classnames"
import { animateScroll as scroll } from "react-scroll"
import darkIcon from "assets/navArrow.png"
import lightIcon from "assets/navArrowLight.png"
import preloaderLight from "assets/preloaderLight.svg"
import preloaderDark from "assets/preloaderDark.svg"

import s from './styles.module.css';
import { booksApi } from '../../../../api/api';
import BookCard from "../../../mainBlock/Store/BooksList/BookCard"
import { Preloader } from '../../../other/Preloader/Preloader';
import { useTheme } from '../../../other/customHooks/useTheme';


const HomePageMiddle = props => {
	const [theme, setTheme] = useTheme()
	const [part, setPart] = useState(0)
	const [books, setBooks] = useState(null)
	useEffect(() => {
		scroll.scrollTo(0, {duration: 450})
		async function getDiscountBooks() {
			const data = await booksApi.getDiscountBooks()
			setBooks(data)
		}
		getDiscountBooks()
	}, [])
  	return (
    	<React.Fragment>
	    	<div className={s.sales}>
	    		{!books && <img src={theme === "light" ? preloaderLight : preloaderDark} alt="#" className={s.preloader}/>}
		    	{
		    		books && <div>
			    		<div className={s.title}>
							Hot sales
						</div>
						<div
							className={part===0 ? (
									cn(s.arrow2, s.leftArrow, s.disabled)
								) : (
									cn(s.arrow2, s.leftArrow)
								)
							}
							onClick={() => setPart(part-3)}>
						    <img src={theme==="light" ? lightIcon : darkIcon} alt="" />
						</div>
						<div
							className={books?.length <= part + 3 ? (
									cn(s.arrow2, s.rightArrow, s.disabled)
								) : (
									cn(s.arrow2, s.rightArrow)
								)
							}
							onClick={() => setPart(part+3)}>
						    <img src={theme==="light" ? lightIcon : darkIcon} alt="" />
						</div>
					</div>
				}
				<div className={s.inner}>
					{books?.slice(part, part + 3).map(book => {
						const {id, name, author, image, price, rating, sale, discountPrice} = book
						return <BookCard name={name}
							key={id}
							id={id}
							author={author}
							image={image}
							price={price}
							getBooks={null}
							rating={rating}
							sale={sale}
							discountPrice={discountPrice}
						/>
					})}
				</div>
			</div>
    	</React.Fragment>
  	)
}

export default HomePageMiddle;
