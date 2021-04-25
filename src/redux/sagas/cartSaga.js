import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects"
import { ADD_TO_CART, CLEAR_BOOKS_IN_CART, CONFIRM_ORDER, GET_CART, GET_ORDER_DATA, PATCH_BOOK_IN_CART,
	PATCH_ONE_COPY, REMOVE_ALL_COPIES, REMOVE_BOOK, REMOVE_BOOK_IN_CART,
	SET_CART_DATA, SET_MESSAGE, SET_ORDER_DATA, TOGGLE_IS_CART_LOADING,
	TOGGLE_IS_LOADING, TOGGLE_SELECTED_ITEM } from '../reducers/cartReducer'
import { cartApi } from '../../api/api';
import { SET_ALERT_MESSAGE } from '../reducers/booksReducer';
import { getCartId } from '../selectors/cartSelectors';

// for store route

function* addToCartWorker({id}) {
	try {
		yield put(toggleIsLoadingAC(id, true))
		yield call(cartApi.addBook, id, true)
		yield put(setMessageAC(null))
		yield put(setAlertMessageAC({})) // для изменения объекта(ссылка) при каждом добавлении
	 	yield put(toggleIsLoadingAC(id, false))
	} catch (err) {
		yield put(toggleIsLoadingAC(id, false))
	}
}

// end

function* getCartWorker() {
	try {
		yield put(toggleIsCartLoadingAC(true))
		const data = yield call(cartApi.getBooks)
		if (!data) {
			yield put(setMessageAC("Your cart is empty"))
		} else {
			yield put(setMessageAC(null))
			let a = []
			data.products.forEach(el => a.push(el.product.id))
			yield put(toggleSelectedItemsAC(a, true, false))
			yield put(setCartDataAC(
				data.id,
				data.products,
				data.totalCount,
				data.total_price,
				data.totalDiscountPrice
			))
		}
	 	yield put(toggleIsCartLoadingAC(false))
	} catch (err) {
		yield put(toggleIsCartLoadingAC(false))
	}
}

function* removeBookInCartWorker({id}) {
	try {
		yield put(toggleIsLoadingAC(id, true))
		yield call(cartApi.removeBook, id)
		yield put(removeBookAC(id))
	 	yield put(toggleIsLoadingAC(id, false))
	} catch (err) {
		yield put(toggleIsLoadingAC(id, false))
	}
}

function* patchBookInCartWorker({id, mode}) {
	try {
		yield put(toggleIsLoadingAC(id, true))
		if (mode === "add") {
			const data = yield call(cartApi.addBook, id, true)
			yield put(patchOneCopy(data, mode, id))
		} else {
			const data = yield call(cartApi.removeCopy, id)
			yield put(patchOneCopy(data, mode, id))
		}
	 	yield put(toggleIsLoadingAC(id, false))
	} catch (err) {
		yield put(toggleIsLoadingAC(id, false))
	}
}

function* clearBooksInCartWorker() {
	try {
		yield put(toggleIsLoadingAC("cart", true))
		const id = yield select(getCartId)
		yield call(cartApi.removeAll, id)
		yield put(removeAllCopiesAC())
		yield put(toggleIsLoadingAC("cart", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("cart", false))
	}
}

function* getOrderDataWorker({ids}) {
	try {
		yield put(toggleIsLoadingAC("order", true))
		const response = yield call(cartApi.getOrderData, ids)
		yield put(setOrderDataAC(response))
		yield put(toggleIsLoadingAC("order", false))
	} catch (err) {
		yield put(toggleIsLoadingAC("order", false))
	}
}

function* confirmOrderWorker({ids, history}) {
	try {
		yield put(toggleIsLoadingAC("confirmOrder", true))
		const response = yield call(cartApi.getOrderData, ids, true)
		yield put(toggleIsLoadingAC("confirmOrder", false))
		history.push("/profile")
	} catch (err) {
		yield put(toggleIsLoadingAC("confirmOrder", false))
	}
}

export default function* cartWatcher() {
	yield takeEvery("cart/ADD_TO_CART", addToCartWorker)
	yield takeLatest("cart/GET_CART", getCartWorker)
	yield takeEvery("cart/REMOVE_BOOK_IN_CART", removeBookInCartWorker)
	yield takeEvery("cart/PATCH_BOOK_IN_CART", patchBookInCartWorker)
	yield takeLatest("cart/CLEAR_BOOKS_IN_CART", clearBooksInCartWorker)
	yield takeLatest("cart/GET_ORDER_DATA", getOrderDataWorker)
	yield takeLatest("cart/CONFIRM_ORDER", confirmOrderWorker)
}

export const addToCartAC = (id) => ({type: ADD_TO_CART, id})
export const getCartAC = () => ({type: GET_CART})
export const removeBookInCartAC = (id) => ({type: REMOVE_BOOK_IN_CART, id})
export const patchBookInCartAC = (id, mode) => ({type: PATCH_BOOK_IN_CART, id, mode})
export const clearBooksInCartAC = () => ({type: CLEAR_BOOKS_IN_CART})
export const getOrderDataAC = (ids) => ({type: GET_ORDER_DATA, ids})
export const confirmOrderAC = (ids, history) => ({type: CONFIRM_ORDER, ids, history})

const toggleIsLoadingAC = (id, isLoading) => ({type: TOGGLE_IS_LOADING, id, isLoading})
const toggleIsCartLoadingAC = (isLoading) => ({type: TOGGLE_IS_CART_LOADING, isLoading})
export const setCartDataAC = (id, products, totalCount, totalPrice, totalDiscountPrice) => ({
	type: SET_CART_DATA,
	id,
	products,
	totalCount,
	totalPrice,
	totalDiscountPrice
})
const setMessageAC = (message) => ({type: SET_MESSAGE, message})
const removeBookAC = (id) => ({type: REMOVE_BOOK, id})
const patchOneCopy = (payload, mode, id) => ({type: PATCH_ONE_COPY, payload, mode, id})
const removeAllCopiesAC = () => ({type: REMOVE_ALL_COPIES})
export const setAlertMessageAC = (message) => ({type: SET_ALERT_MESSAGE, message})
export const toggleSelectedItemsAC = (ids, isSelected, changeInfo) => ({type: TOGGLE_SELECTED_ITEM, ids, isSelected, changeInfo})
export const setOrderDataAC = (data) => ({type: SET_ORDER_DATA, data})