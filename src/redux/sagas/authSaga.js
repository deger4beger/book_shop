import { take, call, put, takeLatest } from "redux-saga/effects"
import { authApi } from "../../api/api"
import { LOGIN, TOGGLE_IS_LOADING, SET_DATA, LOGOUT, REMOVE_DATA,
		INITIALIZE } from "../reducers/authReducer"


function* loginWorker(action) {
	try {
		yield put(toggleIsLoadingAC(true))
		const payload = yield call(authApi.login, action.id_token)
	 	yield put(setDataAC(payload))
	 	yield put(toggleIsLoadingAC(false))
	 	// action.history.push("/homepage")
	} catch (err) {
		yield put(toggleIsLoadingAC(false))
	}

}

function* logoutWorker({history}) {
	try {
		yield put(toggleIsLoadingAC(true))
		yield call(authApi.logout)
		yield put(removeDataAC())
		yield put(toggleIsLoadingAC(false))
		// history.push("/homepage")
	} catch (err) {
		yield put(toggleIsLoadingAC(false))
	}
}

function* initializeWorker() {
	try {
		const payload = yield call(authApi.refresh)
		yield put(setDataAC(payload))
		yield put(toggleIsLoadingAC(false))
	} catch (err) {
		yield put(toggleIsLoadingAC(false))
	}
}


export default function* loginWatcher() {
	yield take("auth/INITIALIZE")
	yield call(initializeWorker)
	yield takeLatest("auth/LOGIN", loginWorker)
	yield takeLatest("auth/LOGOUT", logoutWorker)
	// while (true) {
	// 	const { id_token } = yield take("LOGIN")
	// 	yield call(loginWorker, id_token)
	// 	yield take("LOGOUT")
	// 	yield call(logoutWorker)
	// }
}

export const initializeAC = () => ({type: INITIALIZE})
export const loginAC = (id_token, history) => ({type: LOGIN, id_token, history})
export const logoutAC = (history) => ({type: LOGOUT, history})

export const removeDataAC = () => ({type: REMOVE_DATA})
export const setDataAC = (payload) => ({type: SET_DATA, payload})
export const toggleIsLoadingAC = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})