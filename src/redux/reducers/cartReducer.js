export const ADD_TO_CART = "cart/ADD_TO_CART"
export const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART"
export const GET_CART = "cart/GET_CART"
export const REMOVE_BOOK_IN_CART = "cart/REMOVE_BOOK_IN_CART"
export const PATCH_BOOK_IN_CART = "cart/PATCH_BOOK_IN_CART"
export const CLEAR_BOOKS_IN_CART = "cart/CLEAR_BOOKS_IN_CART"
export const GET_ORDER_DATA = "cart/GET_ORDER_DATA"
export const CONFIRM_ORDER = "cart/CONFIRM_ORDER"

export const TOGGLE_IS_LOADING = "cart/TOGGLE_IS_LOADING"
export const TOGGLE_IS_CART_LOADING = "cart/TOGGLE_IS_CART_LOADING"
export const SET_CART_DATA = "cart/SET_CART_DATA"
export const SET_MESSAGE = "cart/SET_MESSAGE"
export const REMOVE_BOOK = "cart/REMOVE_BOOK"
export const PATCH_ONE_COPY = "cart/PATCH_ONE_COPY"
export const REMOVE_ALL_COPIES = "cart/REMOVE_ALL_COPIES"
export const TOGGLE_SELECTED_ITEM = "cart/TOGGLE_SELECTED_ITEM"
export const SET_ORDER_DATA = "cart/SET_ORDER_DATA"



const initialState = {
	id: null,
	isLoading: [],
	isCartLoading: false,
	products: null,
	totalCount: null,
	totalPrice: null,
	totalDiscountPrice: null,
	message: null,
	selectedItems: [],
	orderData: null
}

const cartReducer = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_IS_LOADING:
			if (action.isLoading) {
				return {
					...state,
					isLoading: [
						...state.isLoading,
						action.id
					]
				}
			}
			return {
				...state,
				isLoading: state.isLoading.filter(el => el !== action.id)
			}
		case TOGGLE_SELECTED_ITEM:
			let ttlPrice = state.totalPrice, dscPrice = state.totalDiscountPrice, ttlCount = state.totalCount
			if (action.isSelected) {
				if (action.changeInfo) {
					state.products.forEach(product => {
						if (action.ids.includes(product.product.id)) {
							ttlPrice += product.copy_price
							if (product.copyDiscountPrice) {
								dscPrice += product.copyDiscountPrice
							} else {
								dscPrice += product.copy_price
							}
							ttlCount += product.copy_count
						}
					})
				}
				return {
					...state,
					selectedItems: [
						...state.selectedItems,
						...action.ids
					],
					totalPrice: ttlPrice,
					totalCount: ttlCount,
					totalDiscountPrice: dscPrice
				}
			}
			if (action.changeInfo) {
				state.products.forEach(product => {
					if (action.ids.includes(product.product.id)) {
						ttlPrice -= product.copy_price
						if (product.copyDiscountPrice) {
							dscPrice -= product.copyDiscountPrice
						} else {
							dscPrice -= product.copy_price
						}
						ttlCount -= product.copy_count
					}
				})
			}
			return {
				...state,
				selectedItems: state.selectedItems.filter(el => !action.ids.includes(el)),
				totalPrice: ttlPrice,
				totalCount: ttlCount,
				totalDiscountPrice: dscPrice
			}
		case TOGGLE_IS_CART_LOADING:
			return {
				...state,
				isCartLoading: action.isLoading
			}
		case SET_CART_DATA:
			return {
				...state,
				id: action.id,
				products: action.products,
				totalCount: action.totalCount,
				totalPrice: action.totalPrice,
				totalDiscountPrice: action.totalDiscountPrice,
				selectedItems: action.products ? state.selectedItems : []
			}
		case SET_MESSAGE:
			return {
				...state,
				message: action.message
			}
		case REMOVE_BOOK:
			let newTotalPrice = state.totalPrice
			let newTotalDiscountPrice = state.totalDiscountPrice
			let newTotalCount = state.totalCount
			return {
				...state,
				products: state.products.filter(el => {
					if (el.product.id === action.id && state.selectedItems.includes(action.id)) {
						newTotalPrice -= parseFloat(el.copy_price)
						if (el.copyDiscountPrice) {
							newTotalDiscountPrice -= parseFloat(el.copyDiscountPrice)
						} else {
							newTotalDiscountPrice -= parseFloat(el.copy_price)
						}
						newTotalCount -= el.copy_count
					}
					return el.product.id !== action.id
				}),
				totalCount: newTotalCount,
				totalPrice: newTotalPrice,
				totalDiscountPrice: newTotalDiscountPrice,
				selectedItems: state.selectedItems.filter(item => item !== action.id)
			}
		case PATCH_ONE_COPY:
			let updatedTotalPrice = state.totalPrice
			let updatedTotalDiscountPrice = state.totalDiscountPrice
			let updatedTotalCount = state.totalCount
			if (action.mode === "add" && state.selectedItems.includes(action.id)) {
				updatedTotalCount += 1
			} else if (action.mode !== "add" && state.selectedItems.includes(action.id)) {
				updatedTotalCount -= 1
			}
			return {
				...state,
				products: state.products.map(el => {
					if (el.product.id === action.id) {
						if (action.mode === "add" && state.selectedItems.includes(action.id)) {
							updatedTotalPrice += parseFloat(el.product.price)
							if (el.product.discountPrice) {
								updatedTotalDiscountPrice += parseFloat(el.product.discountPrice)
							} else {
								updatedTotalDiscountPrice += parseFloat(el.product.price)
							}
						} else if (action.mode !== "add" && state.selectedItems.includes(action.id)) {
							updatedTotalPrice -= parseFloat(el.product.price)
							if (el.product.discountPrice) {
								updatedTotalDiscountPrice -= parseFloat(el.product.discountPrice)
							} else {
								updatedTotalDiscountPrice -= parseFloat(el.product.price)
							}
						}
						return action.payload
					}
					return el
				}),
				totalCount: updatedTotalCount,
				totalPrice: updatedTotalPrice,
				totalDiscountPrice: updatedTotalDiscountPrice
			}
		case SET_ORDER_DATA:
			return {
				...state,
				orderData: action.data
			}
		case REMOVE_ALL_COPIES:
			return {
				...state,
				products: [],
				totalCount: 0,
				totalPrice: 0,
				totalDiscountPrice: 0,
				selectedItems: []
			}
		default:
			return state
	}
}

export default cartReducer

