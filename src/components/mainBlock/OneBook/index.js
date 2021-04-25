import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"

import s from './styles.module.css'
import { getOneBookAC, setOneBookAC } from '../../../redux/sagas/booksSaga';
import { getIsLoadingBooks, getOneBook } from '../../../redux/selectors/booksSelectors';
import { Preloader } from '../../other/Preloader/Preloader';
import { getIsAuth } from '../../../redux/selectors/authSelectors';
import { addToCartAC } from '../../../redux/sagas/cartSaga';
import { getIsLoading } from '../../../redux/selectors/cartSelectors';
import { useTheme } from '../../other/customHooks/useTheme';
import { ratePainter } from '../../../redux/helpers';
import BookInfo from "./BookInfo"
import Comments from "./Comments"


const OneBook = React.memo(props => {
	const [theme, setTheme] = useTheme()
	const { bookId } = useParams()
	const dispatch = useDispatch()
	const firstRender = useRef(true)

	const book = useSelector(getOneBook)
	const loadings = useSelector(getIsLoadingBooks)
	const loading = useSelector(getIsLoading)
	const isAuth = useSelector(getIsAuth)

	const isLoading = loading.includes(book?.id)
	const isRatingLoading = loadings.includes("rating")
	const isBookLoading = loadings.includes("oneBook")
	const isCommentLoading = loadings.includes("comment") || !isAuth

	const ratingColor = ratePainter(book?.rating)
	const myRateColor = ratePainter(book?.my_rate)

	useEffect(() => {
		scroll.scrollTo(0, {duration: 450})
		dispatch(getOneBookAC(bookId))
		return () => {
			dispatch(setOneBookAC(null))
		}
	}, [])
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}
		dispatch(getOneBookAC(bookId))
	}, [isAuth])

	const toggleCart = () => {
        dispatch(addToCartAC(book.id))
    }


	if (isBookLoading || !book) {
		return <Preloader />
	}
  	return (
  		<div className={s.wrapper}>
  			<BookInfo
  				ratingColor={ratingColor}
  				book={book}
  				isAuth={isAuth}
  				isRatingLoading={isRatingLoading}
  				myRateColor={myRateColor}
  				dispatch={dispatch}
  				toggleCart={toggleCart}
  				isLoading={isLoading}
  				theme={theme}
  			/>
  			<Comments
  				theme={theme}
  				isLoading={isCommentLoading}
  				isAuth={isAuth}
  				dispatch={dispatch}
  				bookId={book.id}
  				comments={book.comments}
  			/>
   		</div>
    )
})

export default OneBook
