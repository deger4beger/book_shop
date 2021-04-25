import store from "./store"
import { removeDataAC, setDataAC, toggleIsLoadingAC } from "./sagas/authSaga"


// for interceptors ONLY

export const getToken = () => store.getState().auth.userData?.access

export const logoutHelper = async () => {
	store.dispatch(removeDataAC())
	store.dispatch(toggleIsLoadingAC(false))
}

export const loginHelper = async (payload) => {
	store.dispatch(setDataAC(payload))
}

export const ratePainter = (rate) => {
	let ratingColor
    const rating = parseFloat(rate)
    if (isNaN(rating)) {
    	ratingColor = "var(--color)"
    } else if (rating >= 4) {
    	ratingColor = "var(--main)"
    } else if (rating < 4 && rating > 2.5) {
    	ratingColor = "#CCD060"
    } else {
    	ratingColor = "#B57171"
    }
    return ratingColor
}