import {GAME} from '../redux_types'

const game = (
  state = {
    _id: null,
    board: [],
    letterPool: [],
    words: [],
    players: []
  },
  action
) => {
  switch (action.type) {
    case GAME.UPDATE_BOARD:
    case GAME.PLAY_LETTER:
      return action.payload.game
    default:
      return state
  }
}

export default game
