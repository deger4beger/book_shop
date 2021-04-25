export const getIsLoadingBooks = (state) => {
	return state.books.isLoading
}

export const getTotalBooksCount = (state) => {
	return state.books.totalBooksCount
}

export const getData = (state) => {
	return state.books.books
}

export const getFilter = (state) => {
	return state.books.filter
}

export const getOneBook = (state) => {
	return state.books.currentBook
}

export const getAlertMessage = (state) => {
	return state.books.alertMessage
}