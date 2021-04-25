import { call, put, takeLatest } from "redux-saga/effects"
import { booksApi } from "../../api/api"
import { ADD_COMMENT, TOGGLE_LIKE, GET_ONE_BOOK, SET_COMMENT, SET_LIKE_DISLIKE,
		SET_ONE_BOOK, SET_RATING, TOGGLE_IS_LOADING,
		SET_BOOKS, GET_BOOKS, SET_FILTER, UPDATE_RATING } from "../reducers/booksReducer"


function* booksWorker({filter, queryString}) {
	try {
		yield put(toggleIsLoadingAC("store", true))
		const payload = yield call(booksApi.getBooks, queryString)
	 	yield put(setBooksAC(payload))
	 	yield put(setFilter(filter))
	 	yield put(toggleIsLoadingAC("store", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("store", false))
	}
}

function* oneBookWorker({id}) {
	try {
		yield put(toggleIsLoadingAC("oneBook", true))
		const payload = yield call(booksApi.getOneBook, id)
		yield put(setOneBookAC(payload))
		yield put(toggleIsLoadingAC("oneBook", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("oneBook", false))
	}
}

function* updateRatingWorker({myRating, id}) {
	try {
		yield put(toggleIsLoadingAC("rating", true))
		const payload = yield call(booksApi.updateRating, myRating, id)
		yield put(setRatingAC(payload.rating, myRating, payload.reviewersCount))
		yield put(toggleIsLoadingAC("rating", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("rating", false))
	}
}

function* addCommentWorker({id, comment}) {
	try {
		yield put(toggleIsLoadingAC("comment", true))
		const data = yield call(booksApi.sendReview, id, comment)
		yield put(setCommentAC(data))
		yield put(toggleIsLoadingAC("comment", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("comment", false))
	}
}

function* likesWorker({id, mode}) {
	try {
		yield put(toggleIsLoadingAC("like", true))
		const data = yield call(booksApi.toggleLikeDislike, id, mode)
		yield put(setLikeDislikeAC(id, data))
		yield put(toggleIsLoadingAC("like", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("like", false))
	}
}

export default function* booksWatcher() {
	yield takeLatest("books/GET_BOOKS", booksWorker)
	yield takeLatest("books/GET_ONE_BOOK", oneBookWorker)
	yield takeLatest("books/UPDATE_RATING", updateRatingWorker)
	yield takeLatest("books/ADD_COMMENT", addCommentWorker)
	yield takeLatest("books/TOGGLE_LIKE", likesWorker)
}

export const getBooksAC = (filter, queryString) => ({type: GET_BOOKS, filter, queryString})
export const getOneBookAC = (id) => ({type: GET_ONE_BOOK, id})
export const updateRatingAC = (myRating, id) => ({type: UPDATE_RATING, myRating, id})
export const addCommentAC = (id, comment) => ({type: ADD_COMMENT, id, comment})
export const toggleLikeAC = (id, mode) => ({type: TOGGLE_LIKE, id, mode})

export const setBooksAC = (payload) => ({type: SET_BOOKS, payload})
export const setOneBookAC = (payload) => ({type: SET_ONE_BOOK, payload})
export const setFilter = (filter) => ({type: SET_FILTER, filter})
const toggleIsLoadingAC = (id, isLoading) => ({type: TOGGLE_IS_LOADING, id, isLoading})
const setRatingAC = (rating, myRating, reviewersCount) => ({type: SET_RATING, rating, myRating, reviewersCount})
const setCommentAC = (comment) => ({type: SET_COMMENT, comment})
const setLikeDislikeAC = (id, data) => ({type: SET_LIKE_DISLIKE, id, data})