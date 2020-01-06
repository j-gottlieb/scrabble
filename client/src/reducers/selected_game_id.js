import {GAME} from '../redux_types';

const selectedGameId = (state = '', action) => {
    switch (action.type) {
        case GAME.JOIN_GAME:
          return action.payload
        default:
          return state
      }
}

export default selectedGameId
