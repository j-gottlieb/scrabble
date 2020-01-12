import {SIGN_IN, SIGN_UP, GAME} from '../redux_types'

const message = (state = '', action) => {
  switch (action.type) {
    case SIGN_IN.FAILURE:
    case SIGN_IN.SUCCESS:
    case SIGN_UP.FAILURE:
    case SIGN_UP.SUCCESS:
        return action.payload.message
    case GAME.UPDATE_BOARD:
        return action.payload.newWordsMessage
    default:
        return ''
  }
}

export default message;