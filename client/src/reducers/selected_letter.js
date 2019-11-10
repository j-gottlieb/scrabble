import {LETTER_IN_PLAY, GAME} from '../redux_types'

const initialState = {
  letter: '',
  index: null
}

export const selectedLetter = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case LETTER_IN_PLAY.SELECTED:
      return action.payload
    case LETTER_IN_PLAY.UNSELECTED:
    case GAME.UNPLAY_LETTER:
    case GAME.PLAY_LETTER:
      return {...initialState}
    default:
      return state
  }
}

export default selectedLetter
