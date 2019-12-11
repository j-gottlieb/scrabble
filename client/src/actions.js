import {signIn, signUp} from './service/authentication';
import {SIGN_IN, SIGN_UP, AUTH_MODAL_TOGGLE, GAME, LETTER_IN_PLAY} from './redux_types';
import {getPlayerHand} from './selectors';
import {joinGame} from './service/game';

// AUTH

export const onSignIn = (username, password) =>
  dispatch => {
    signIn(username, password)
      .then(({token, user: {id, username}, activeGames}) => {
        dispatch(signInSuccess({token, id, username, activeGames}))
      })
      .catch(({message}) => dispatch(signInFailure(message)))
  }

export const onSignUp = (username, password) =>
  dispatch => {
    signUp(username, password)
      .then(({token, user: {id, username}}) => {
        dispatch(signUpSuccess({token, id, username}))
      })
      .catch(({message}) => dispatch(signUpFailure(message)))
  }

const signInSuccess = payload => ({
  type: SIGN_IN.SUCCESS,
  payload
})

const signInFailure = payload => ({
  type: SIGN_IN.FAILURE,
  payload
})

const signUpSuccess = payload => ({
  type: SIGN_UP.SUCCESS,
  payload
})

const signUpFailure = payload => ({
  type: SIGN_UP.FAILURE,
  payload
})

export const onToggleSignInModal = () => ({
  type: AUTH_MODAL_TOGGLE.SIGN_IN,
})

export const onToggleSignUpModal = () => ({
  type: AUTH_MODAL_TOGGLE.SIGN_UP,
})

// GAME

export const handleJoinGame = (gameId, playerId) => {
  joinGame(gameId, playerId)
  return {
    type: GAME.PLAYER_JOINED,
    payload: gameId
  }
}

export const updateBoard = game => {
  const newBoard = game.board.map(square => {
    if (square.letter === '') {
      return {...square, isValidPosition: true}
    } else {
      return {...square, isValidPosition: false}
    }
  })
  return {
    type: GAME.UPDATE_BOARD,
    payload: {
      game: {
        ...game,
        board: newBoard
      }
    }
  }
}

export const selectLetter = payload => ({
  type: LETTER_IN_PLAY.SELECTED,
  payload
})

export const unselectLetter = () => ({
  type: LETTER_IN_PLAY.UNSELECTED
})

export const handleSelectLetter = newIndex =>
  (dispatch, getState) => {
    const {selectedLetter: {index}} = getState()
    const playerHand = getPlayerHand(getState())
    if (index === newIndex) {
      dispatch(unselectLetter())
    } else {
      const newLetter = playerHand[newIndex]
      dispatch(selectLetter({index: newIndex, letter: newLetter}))
    }
  }

export const playLetter = payload => ({
  type: GAME.PLAY_LETTER,
  payload
})

export const unplayLetter = () => ({
  type: GAME.UNPLAY_LETTER
})

export const handleInputLetter = (e, index) =>
  (dispatch, getState) => {
    const {selectedLetter: {letter, index: selectedLetterIndex}, game, playerInfo: {id}} = getState()

    if (!game.board[index].isValidPosition ||
      (letter == null && game.board[index].letter === '' && game.board[index].isValidPosition)
    ) {
      return;
    }
    if (letter == null && game.board[index].letter !== '' && game.board[index].isValidPosition) {
      dispatch(unplayLetter())
    } else {
      const newPlayerHand = [...getPlayerHand(getState())];
      if (game.board[index].letter === '') {
        newPlayerHand.splice(selectedLetterIndex, 1)
      } else {
        newPlayerHand.splice(selectedLetterIndex, 1, game.board[index].letter)
      }
      const {hands} = game;
      const indexOfPlayer = hands.findIndex(({playerId}) => playerId === id);
      hands[indexOfPlayer].letters = newPlayerHand;

      const newGame = {
        ...game,
        board: [
          ...game.board.slice(0, index),
          {...game.board[index], letter},
          ...game.board.slice(index + 1)
        ],
      }
      dispatch(playLetter({game: newGame}))
    }
  }
