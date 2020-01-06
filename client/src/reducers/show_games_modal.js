import {GAMES_MODAL_TOGGLE, GAME} from '../redux_types'

const showGamesModal = (state = false, action) => {
  switch (action.type) {
    case GAMES_MODAL_TOGGLE.HIDE:
    case GAME.JOIN_GAME:
      return false
    case GAMES_MODAL_TOGGLE.SHOW:
      return true
    default:
      return state
  }
}

export default showGamesModal
