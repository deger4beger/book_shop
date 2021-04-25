import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import createSagaMiddleware from "redux-saga"
import thunkMiddleware from "redux-thunk"
import authReducer from "./reducers/authReducer"
import rootSaga from "./sagas/rootSaga"
import booksReducer from "./reducers/booksReducer"
import cartReducer from './reducers/cartReducer';
import profileReducer from './reducers/profileReducer';


const appReducer = combineReducers({
  	auth: authReducer,
	books: booksReducer,
	cart: cartReducer,
	profile: profileReducer
})

const rootReducer = (state, action) => {
  	if (action.type === "auth/REMOVE_DATA") {
   		state = undefined
  	}


    return appReducer(state, action)
}

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, thunkMiddleware)))
sagaMiddleware.run(rootSaga)

export default store