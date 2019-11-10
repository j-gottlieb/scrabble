import {SIGN_IN, SIGN_UP, AUTH_MODAL_TOGGLE} from '../redux_types'

export const showSignInModal = (state = false, action) => {
  switch (action.type) {
    case SIGN_IN.SUCCESS:
      return false
    case AUTH_MODAL_TOGGLE.SIGN_IN:
      return !state
    default:
      return state
  }
}

export const showSignUpModal = (state = false, action) => {
  switch (action.type) {
    case SIGN_UP.SUCCESS:
      return false
    case AUTH_MODAL_TOGGLE.SIGN_UP:
      return !state
    default:
      return state
  }
}
