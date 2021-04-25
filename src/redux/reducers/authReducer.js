export const INITIALIZE = "auth/INITIALIZE"
export const TOGGLE_IS_LOADING = "auth/TOGGLE_IS_LOADING"
export const SET_DATA = "auth/SET_DATA"
export const LOGIN = "auth/LOGIN"
export const LOGOUT = "auth/LOGOUT"
export const REMOVE_DATA = "auth/REMOVE_DATA"


const initialState = {
	isLoading: true,
	userData: null,
	isAuth: false
}

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case TOGGLE_IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading
			}
		case SET_DATA:
			return {
				...state,
				userData: action.payload,
				isAuth: true
			}
		case REMOVE_DATA:
			return {
				...state,
				userData: null,
				isAuth: false
			}
		default:
			return state
	}
}

export default authReducer

