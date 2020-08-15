import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxPromise from 'redux-promise'

const reducers = combineReducers({})

const store = createStore(reducers, applyMiddleware(ReduxPromise))

export default store
