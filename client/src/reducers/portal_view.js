import {CHANGE_VIEW} from '../redux_types';
import {PORTAL_VIEW} from '../constants';

const portalView = (state = PORTAL_VIEW.AUTH, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return action.payload
    default:
      return state
  }
}

export default portalView;