import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

//book
import bookReducer from './bookReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer