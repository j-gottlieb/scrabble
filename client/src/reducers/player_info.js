import {SIGN_IN, SIGN_UP} from '../redux_types';

const playerInfo = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN.SUCCESS:
    case SIGN_UP.SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default playerInfo;
