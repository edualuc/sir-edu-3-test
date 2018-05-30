//import router from 'helpers/router-helper'
import userService from 'services/users-service'

// ------------------------------------
// Constants
// ------------------------------------
const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
function request(type) {
  return {
    type,
    payload: {
        isFetching: true,
        showModal: false
    }
  }
}

function failure(type) {
  return {
    type,
    payload: {
        isFetching: false,
        success: false,
        showModal: true,
        message: 'Ocorreu algum erro, não foi possível cadastrar o usuário.'
    }
  }
}

function success(type) {
  return {
    type,
    payload: {
        isFetching: false,
        success: true,
        showModal: true,
        message: 'Usuário salvo com sucesso. Faça login para continuar na aplicação.'
    }
  }
}

function closemodal() {
    return {
        type: CLOSE_MODAL,
        payload: {
          isFetching: false,
          showModal: false
        }
    }
}

export function registerUser(user) {
    return dispatch => {
        dispatch(request(REGISTER_USER_REQUEST));
        return userService.register(user)
            .then((data) => {
                dispatch(success(REGISTER_USER_SUCCESS));
            }).catch((error) => {
                dispatch(failure(REGISTER_USER_FAILURE));
                console.log(error);
            })
  } 
}

export function closeModal() {
    return dispatch => { dispatch(closemodal()) };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_USER_REQUEST] : (state, action) => ({ ...action.payload }),
  [REGISTER_USER_SUCCESS] : (state, action) => ({ ...action.payload }),
  [REGISTER_USER_FAILURE] : (state, action) => ({ ...action.payload }),
  [CLOSE_MODAL] : (state, action) => ({ ...action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function UsersReducer (state = { isFetching: false, showModal: false }, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
