const playerInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export default playerInfo;
