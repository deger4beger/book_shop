export const GET_BOOKS = "books/GET_BOOKS"
export const GET_ONE_BOOK = "books/GET_ONE_BOOK"
export const ADD_COMMENT = "books/ADD_COMMENT"
export const TOGGLE_LIKE = "books/TOGGLE_LIKE"

export const TOGGLE_IS_LOADING = "books/TOGGLE_IS_LOADING"
export const SET_BOOKS = "books/SET_BOOKS"
export const SET_FILTER = "books/SET_FILTER"
export const SET_ONE_BOOK = "books/SET_ONE_BOOK"
export const SET_ALERT_MESSAGE = "books/SET_ALERT_MESSAGE"
export const UPDATE_RATING = "books/UPDATE_RATING"
export const SET_RATING = "books/SET_RATING"
export const SET_COMMENT = "books/SET_COMMENT"
export const SET_LIKE_DISLIKE = "books/SET_LIKE_DISLIKE"


const initialState = {
	isLoading: [],
	totalBooksCount: null,
	books: [],
	currentBook: null,
	filter: {
		currentPage: "1",
		category: "",
		ordering: "",
		price_min: "",
		price_max: "",
		search: "",
		sale_min: ""
	},
	alertMessage: null
}

const booksReducer = (state = initialState, action) => {
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
		case SET_BOOKS:
			return {
				...state,
				books: action.payload.results,
				totalBooksCount: action.payload.count,
			}
		case SET_ONE_BOOK:
			return {
				...state,
				currentBook: action.payload
			}
		case SET_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					...action.filter
				}
			}
		case SET_ALERT_MESSAGE:
			return {
				...state,
				alertMessage: action.message
			}
		case SET_COMMENT:
			return {
				...state,
				currentBook: {
					...state.currentBook,
					comments: [
						...state.currentBook.comments,
						{
							...action.comment,
							likeCount: 0,
							dislikeCount: 0,
							isLiked: false,
							isDisliked: false
							// Here need is liked, liked count etc.
						}
					]
				}
			}
		case SET_RATING:
			return {
				...state,
				currentBook: {
					...state.currentBook,
					rating: action.rating,
					my_rate: action.myRating,
					reviewers_count: action.reviewersCount
				}
			}
		case SET_LIKE_DISLIKE:
			return {
				...state,
				currentBook: {
					...state.currentBook,
					comments: state.currentBook.comments.map(comment => {
						if (comment.id === action.id) {
							return {
								...comment,
								...action.data
							}
						}
						return comment
					})
				}
			}
		// case CHANGE_IN_CART:
		// 	let updatedBook
		// 	if (state.currentBook && state.currentBook.id === action.id) {
		// 		updatedBook = {
		// 			...state.currentBook,
		// 			in_cart: action.inCart
		// 		}
		// 	} else {
		// 		updatedBook = state.currentBook
		// 	}
		// 	return {
		// 		...state,
		// 		books: state.books.map(book => {
		// 			if (book.id === action.id) {
		// 				return {
		// 					...book,
		// 					in_cart: action.inCart
		// 				}
		// 			}
		// 			return book
		// 		}),
		// 		currentBook: updatedBook
		// 	}
		default:
			return state
	}
}

export default booksReducer

