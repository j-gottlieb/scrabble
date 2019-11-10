import {createSelector} from 'reselect';

export const isAuthModalOpen = state =>  state.showSignUpModal || state.showSignInModal;
export const getAuthButtonText = state => state.showSignInModal ? 'Sign In' : 'Sign Up';

export const getBoard = state => state.game.board;

export const getSelectedLetter = ({playerHand, selectedLetter}) =>
  playerHand[selectedLetter]

export const getPlayerWords = state =>
    state.game.words.reduce((allWords, {word, playerId, score}) => {
      allWords[playerId] = allWords[playerId]
      ? [...allWords[playerId], {word, score}]
      : [{word, score}]
      return allWords
    },
  {});

export const activeGames = ({activeGames}) => activeGames
export const getPlayerId = ({playerInfo}) => playerInfo.id
export const getCurrentGame = ({game}) => game

export const getGamesToJoin = createSelector(
  activeGames,
  getPlayerId,
  (games, id) => games.filter(game => (
      game.isActive === true &&
      !game.players.some(({playerId}) => playerId === id)
    )
  )
);

export const getMyGames = createSelector(
  activeGames,
  getPlayerId,
  (games, id) => games.filter(game => (
      game.isActive === true &&
      game.players.some(({playerId}) => playerId === id)
    )
  )
);

export const getIsPlayerTurn = createSelector(
  getCurrentGame,
  getPlayerId,
  (game, id) => {
    const {turnNumber, players} = game;
    const numberOfPlayers = players.length
    if (numberOfPlayers === 0) {
      return false
    }
    const indexOfCurrentPlayer = turnNumber % numberOfPlayers;
    return players[indexOfCurrentPlayer].playerId === id
  }
)

export const getPlayerHand = createSelector(
  getPlayerId,
  getCurrentGame,
  (playerId, game) => {
    if (game._id != null) {
      const currentPlayer = game.hands.find(hand => hand.playerId == playerId)

      return currentPlayer.letters
    } else {
      return null
    }
  }
)
