import { profileApi } from '../../api/api';

const TOGGLE_IS_LOADING = "profile/TOGGLE_IS_LOADING"
const SET_ORDER_DATA = "profile/SET_ORDER_DATA"
const SET_PROFILE_DATA = "profile/SET_PROFILE_DATA"


const initialState = {
	isLoading: [],
	orderData: null,
	orderItems: null
}

const profileReducer = (state = initialState, action) => {
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
		case SET_PROFILE_DATA:
			return {
				...state,
				...action.data
			}
		case SET_ORDER_DATA:
			return {
				...state,
				orderData: action.data
			}
		default:
			return state
	}
}

export const getProfileTC = () => async (dispatch) => {
	try {
		dispatch(toggleIsLoadingAC("profile", true))
		const response = await profileApi.getProfile()
		console.log(response)
		if (response.orderData) {
			dispatch(setProfileDataAC(response))
		} else {
			dispatch(setProfileDataAC({
				orderData: {},
				orderItems: []
			}))
		}
		dispatch(toggleIsLoadingAC("profile", false))
	} catch (e) {
		dispatch(toggleIsLoadingAC("profile", false))
	}
}

export const updateOrderDataTC = (payload) => async (dispatch) => {
	try {
		dispatch(toggleIsLoadingAC("form", true))
		const response = await profileApi.updateOrderData(payload)
		dispatch(setOrderDataAC(payload))
		dispatch(toggleIsLoadingAC("form", false))
		return true
	} catch (e) {
		dispatch(toggleIsLoadingAC("form", false))
		return false
	}
}

const toggleIsLoadingAC = (id, isLoading) => ({type: TOGGLE_IS_LOADING, id, isLoading})
const setProfileDataAC = (data) => ({type: SET_PROFILE_DATA, data})
export const setOrderDataAC = (data) => ({type: SET_ORDER_DATA, data})

export default profileReducer
