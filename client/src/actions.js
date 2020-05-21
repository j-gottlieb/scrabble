import {signIn, signUp} from './service/authentication';
import {
  SIGN_IN,
  SIGN_UP,
  AUTH_MODAL_TOGGLE,
  GAMES_MODAL_TOGGLE,
  GAME,
  LETTER_IN_PLAY,
  CHANGE_VIEW
} from './redux_types';
import {PORTAL_VIEW} from './constants';
import {getPlayerHand, getCurrentGame, getPlayerId} from './selectors';
import {joinGame} from './service/game';

// AUTH

export const onSignIn = (username, password) =>
  dispatch => {
    signIn(username, password)
      .then(({token, user: {id, username}, activeGames, message}) => {
        dispatch(signInSuccess({token, id, username, activeGames, message}))
        dispatch(changePortalView(PORTAL_VIEW.GAME_SELECT))
      })
      .catch(({message}) => dispatch(signInFailure({message})))
  }

export const onSignUp = (username, password) =>
  dispatch => {
    signUp(username, password)
      .then(({token, user: {id, username}, activeGames, message}) => {
        dispatch(signUpSuccess({token, id, username, activeGames, message}))
        dispatch(changePortalView(PORTAL_VIEW.GAME_SELECT))
      })
      .catch(({message}) => dispatch(signUpFailure({message})))
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

// VIEW

export const changePortalView = payload => ({
  type: CHANGE_VIEW,
  payload
})

// GAME

export const showGamesModal = () => ({
  type: GAMES_MODAL_TOGGLE.SHOW
})

export const hideGamesModal = () => ({
  type: GAMES_MODAL_TOGGLE.HIDE
})

export const handleJoinGame = (gameId, playerId) => 
  (dispatch) => {
  joinGame(gameId, playerId)
  dispatch({
    type: GAME.JOIN_GAME,
    payload: gameId
  })
}

const parseBoard = board =>
  board.map(square => {
    if (square.letter === '') {
      return {...square, isValidPosition: true}
    } else {
      return {...square, isValidPosition: false}
    }
  })

export const gameWasJoined = ({game, players}) => 
(dispatch) => {
  const newBoard = parseBoard(game.board);
  dispatch({
    type: GAME.PLAYER_JOINED,
    payload: {
      game: {
        ...game,
        board: newBoard
      },
      players
    }
  })
  dispatch(changePortalView(PORTAL_VIEW.ACTIVE_GAME))
}

export const beginGame = game => ({
  type: GAME.BEGIN_GAME,
  payload: {game}
})

export const updateBoard = ({
  updatedGame, 
  newWords, 
  fakeAssWords = [], 
  validUnsavedWords = []
}) => {
  const newBoard = parseBoard(updatedGame.board)
  return {
    type: GAME.UPDATE_BOARD,
    payload: {
      game: {
        ...updatedGame,
        board: newBoard
      },
      newWordsMessage: {
        fakeAssWords,
        newWords,
        validUnsavedWords
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

export const unplayLetter = payload => ({
  type: GAME.UNPLAY_LETTER,
  payload
})

export const handleInputLetter = ({selectedLetterIndex, selectedLetter}, index) =>
  (dispatch, getState) => {
    // const {selectedLetter: {letter: selectedLetter, index: selectedLetterIndex}, game, playerInfo: {id}} = getState()
    const {game, playerInfo: {id}} = getState()
    const {isValidPosition, letter: playedLetter} = game.board[index];
    // position is invalid
    if (!isValidPosition ||
      (selectedLetter === '' && playedLetter === '')
    ) {
      return;
    }

    const newPlayerHand = [...getPlayerHand(getState())];

    // valid move
    if (selectedLetter !== '' && playedLetter === '') {
      newPlayerHand.splice(selectedLetterIndex, 1)
      const newGame = updateGameObject(game, id, newPlayerHand, index, selectedLetter);
      dispatch(playLetter({game: newGame}))
    }

    // withdraw letter
    if (selectedLetter === '' && playedLetter !== '') {
      newPlayerHand.push(playedLetter)
      const newGame = updateGameObject(game, id, newPlayerHand, index, selectedLetter);
      dispatch(unplayLetter({game: newGame}))
    }
  }

  const updateGameObject = (game, id, newPlayerHand, index, letter) => {
    const {hands} = game;
    const indexOfPlayer = hands.findIndex(({playerId}) => playerId === id);
    hands[indexOfPlayer].letters = newPlayerHand;

    return {
      ...game,
      board: [
        ...game.board.slice(0, index),
        {...game.board[index], letter},
        ...game.board.slice(index + 1)
      ],
    }
  }

  const shuffleLetters = letters => {
    for (let currentIndex = letters.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      [letters[currentIndex], letters[randomIndex]] = [letters[randomIndex], letters[currentIndex]];
    }
    return letters;
  }

  export const handleShuffleLetters = () =>
    (dispatch, getState) => {
      const state = getState();
      const playerHand = getPlayerHand(state);
      const playerId = getPlayerId(state);
      const currentGame = getCurrentGame(state);
      const indexOfHand = currentGame.hands.findIndex(hand => playerId === hand.playerId)
      const hands = currentGame.hands;
      hands[indexOfHand].letters = shuffleLetters(playerHand);
      const updatedGame = {
        ...currentGame,
        hands
      }
      dispatch({
        type: GAME.SHUFFLE_HAND,
        payload: {game: updatedGame}
      })
    }

  export const handleRetractPlayedLetters = () =>
    (dispatch, getState) => {
      const state = getState();
      const game = getCurrentGame(state);
      const {board, hands} = game;
      const playerHand = getPlayerHand(state);
      const id = getPlayerId(state);

      const lettersToRetract = [];
      const newBoard = [];
      for (let i = 0; i < board.length; i++) {
        const {isValidPosition, letter} = board[i];
        if (letter !== '' && isValidPosition) {
          lettersToRetract.push(letter)
          newBoard.push({...board[i], letter: ''})
        } else {
          newBoard.push(board[i])
        }
      }
      
      const indexOfPlayer = hands.findIndex(({playerId}) => playerId === id);
      const newHands = [
        ...hands.slice(0, indexOfPlayer),
        {
          ...hands[indexOfPlayer],
          letters: [...playerHand, ...lettersToRetract]
        },
        ...hands.slice(indexOfPlayer + 1)
      ];

      dispatch({
        type: GAME.RETRACT_LETTERS,
        payload: {
          game: {
            ...game,
            board: newBoard,
            hands: newHands
          }
        }
      })
    }