/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  CHANGE_FORM,
  SET_AUTH,
  SET_USER,
  GET_USER,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR
} from '../actions/constants'
import auth from '../auth'

// The initial application state
let initialState = {
  formState: {
    username: 'ssc',
    password: 'p@ssw0rd'
  },
  error: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  user: '',
  client : {
    name : "",
    email: "",
    tel: "",
    department: ""
  },
  client_type : [
    "new gc employee",
    "new department employee (transfer, secondment)",
    "student",
    "old employee",
  ]
  
}

// Takes care of changing the application state
function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return {...state, formState: action.newFormState}
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState}
    case SET_USER:
      return {...state, user: action.user}
    case GET_USER:
      return {...state}
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    default:
      return state
  }
}

export default reducer
