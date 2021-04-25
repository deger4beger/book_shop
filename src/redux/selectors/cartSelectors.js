export const getIsLoading = (state) => {
	return state.cart.isLoading
}

export const getIsCartLoading = (state) => {
	return state.cart.isCartLoading
}

export const getProducts = (state) => {
	return state.cart.products
}

export const getTotalCount = (state) => {
	return state.cart.totalCount
}

export const getTotalPrice = (state) => {
	return state.cart.totalPrice
}

export const getCartMessage = (state) => {
	return state.cart.message
}

export const getCartId = (state) => {
	return state.cart.id
}

export const getTotalDiscountPrice = (state) => {
	return state.cart.totalDiscountPrice
}

export const getSelectedItems = (state) => {
	return state.cart.selectedItems
}

export const getOrderData = (state) => {
	return state.cart.orderData
}