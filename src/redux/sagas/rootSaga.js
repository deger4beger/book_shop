import { fork, all } from "redux-saga/effects"
import loginWatcher from "./authSaga"
import booksWatcher from "./booksSaga"
import cartWatcher from "./cartSaga"

function* rootSaga() {
	yield all([
		fork(loginWatcher),
		fork(booksWatcher),
		fork(cartWatcher)
	])
}

export default rootSaga

