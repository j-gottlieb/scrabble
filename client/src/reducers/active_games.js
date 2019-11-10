import {SIGN_IN} from '../redux_types'

const activeGames = (
  state = [],
  action
) => {
  switch (action.type) {
    case SIGN_IN.SUCCESS:
      return action.payload.activeGames
    default:
      return state
  }
}

export default activeGames
