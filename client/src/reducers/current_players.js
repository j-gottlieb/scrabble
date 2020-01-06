import {GAME} from '../redux_types'

const currentPlayers = (state = [], action) => {
    switch (action.type) {
        case GAME.PLAYER_JOINED:
            return action.payload.players;
        default:
            return state;
    }
}

export default currentPlayers