import {SIGN_IN, SIGN_UP} from '../redux_types'

const activeGames = (
  state = [],
  action
) => {
  switch (action.type) {
    case SIGN_IN.SUCCESS:
    case SIGN_UP.SUCCESS:
      return action.payload.activeGames
    default:
      return state
  }
}

export default activeGames
