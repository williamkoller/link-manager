import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxPromise from 'redux-promise'

import signInReducer from './Screens/SignIn/SignInReducer'
import signUpReducer from './Screens/SignUp/SignUpReducer'

const reducers = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer
})

const store = createStore(reducers, applyMiddleware(ReduxPromise))

export default store
