import postReducer from './postReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;