import {SIGN_IN} from '../redux_types'

const authMessage = (state = '', action) => {
  switch (action.type) {
    case SIGN_IN.FAILURE:
      return action.payload
    default:
      return ''
  }
}

export default authMessage;
