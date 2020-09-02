import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

//book
import bookReducer from './bookReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    book: bookReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer