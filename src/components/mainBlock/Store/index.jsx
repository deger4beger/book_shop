import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"
import { useHistory } from 'react-router-dom'
import * as queryString from "querystring"
import { getBooksAC } from "redux/sagas/booksSaga"
import BooksList from "./BooksList/"
import BookFilters from "./BookFilters"
import Paginator from "../../other/Paginator/Paginator"
import { useTheme } from "../../other/customHooks/useTheme"
import { getTotalBooksCount, getData, getFilter } from "redux/selectors/booksSelectors"
import { getIsAuth } from '../../../redux/selectors/authSelectors';
import { setBooksAC } from '../../../redux/sagas/booksSaga';

const Store = React.memo(props => {
	const totalBooksCount = useSelector(getTotalBooksCount)
	const data = useSelector(getData)
	const filter = useSelector(getFilter)
	const isAuth = useSelector(getIsAuth)

	const [theme, setTheme] = useTheme()
	const dispatch = useDispatch()
	const history = useHistory()
	const firstRender = useRef(true)

	useEffect( () => {
		scroll.scrollTo(0, {duration: 450})
		const parsed = queryString.parse(history.location.search.substr(1))
		let newFilter = {
			...filter,
			...parsed
		}
		if (data.length === 0) {
			dispatch(getBooksAC(newFilter, stringifier(newFilter)))
		} else {
			history.push({
				pathname: "/store",
				search: stringifier(filter)
			})
			dispatch(getBooksAC(filter, stringifier(filter)))
		}
		return () => {
			const payload = {
				results: [],
				count: 0
			}
			dispatch(setBooksAC(payload))
		}
	}, [])

	useEffect( () => {
		if (firstRender.current) {
			return
		}
		const parsed = queryString.parse(history.location.search.substr(1))
			// Если при перезагрузке запрос на рефреш
			// выполнится успешно до того как загрузятся книги
			// то новый запрос уйдет с еще не установленным фильтром после начального запроса на книги
			// поэтому из за этого случая берем всегда фильтр с uri
		let newFilter = {
			...filter,
			...parsed
		}
		dispatch(getBooksAC(newFilter, stringifier(newFilter)))
	}, [isAuth])

	useEffect( () => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		const newFilter = urlFilterCreator(filter)
		if (history.location.search.substr(1) !== queryString.stringify(newFilter)) {
			history.push({
				pathname: "/store",
				search: queryString.stringify(newFilter)
			})
		}

	}, [filter])
	const urlFilterCreator = (filter) => {
		const newFilter = {}
		Object.keys(filter).forEach(el => {
			if (filter[el].length !== 0) {
				newFilter[el] = filter[el]
			}
		})
		return newFilter
	}

	const onPageChanged = (page) => {
		const newFilter = {
			...filter,
			currentPage: page
		}
		dispatch(getBooksAC(newFilter, stringifier(newFilter)))
		scroll.scrollTo(0, {duration: 450})
	}

	const getBooks = (newFilter) => {
		const finalFilter = {
			...filter,
			...newFilter
		}
		dispatch(getBooksAC(finalFilter, stringifier(finalFilter)))
	}

	const stringifier = (filter) => {
		const newFilter = urlFilterCreator(filter)
		return queryString.stringify(newFilter)
	}
	return (
		<React.Fragment>
			<BookFilters
				getBooks={ getBooks }
				theme={theme}
				filter={filter}
				totalCount={totalBooksCount}
			/>
			<BooksList
				data={data}
				theme={theme}
				getBooks={getBooks}
			/>
	    	<Paginator
	    		totalCount={totalBooksCount}
	    		pageSize={21}
	    		currentPage={filter?.currentPage}
	    		onPageChanged={onPageChanged}
	    		portionSize={5}
	    	/>
    	</React.Fragment>
	)
})

export default Store
