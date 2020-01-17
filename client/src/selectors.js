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

export const activeGames = ({activeGames}) => activeGames;
export const getPlayerId = ({playerInfo}) => playerInfo.id;
export const getCurrentGame = ({game}) => game;
export const getCurrentPlayers = ({currentPlayers}) => currentPlayers;

export const getGamesToJoin = createSelector(
  activeGames,
  getPlayerId,
  (games, id) => games.filter(game => !game.hasBegun)
);

export const getMyGames = createSelector(
  activeGames,
  getPlayerId,
  (games, id) => games.filter(game => (
      game.hasBegun &&
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
      const currentPlayer = game.hands.find(hand => hand.playerId === playerId)

      return currentPlayer.letters
    } else {
      return null
    }
  }
)

export const getActiveGameId = createSelector(
  getCurrentGame,
  ({_id}) => _id != null ? _id : null
)

export const getIsGameOwner = createSelector(
  getCurrentGame,
  getPlayerId,
  (game, id) => {
    const player = game.players.find(({playerId}) => id === playerId)
    return player.isOwner || false
  }
)

export const getGameOwner = createSelector(
  getCurrentGame,
  currentGame => {
    return currentGame.players.find(({isOwner}) => isOwner)
  }
)

export const getGameOwnerName = createSelector(
  getGameOwner,
  ({username}) => username
)

export const getIsGameOver = createSelector(
  getCurrentGame,
  ({letterPool, hands}) =>
    letterPool.length === 0
    && hands.some(({letters}) => letters.length === 0)
);

export const getVictor = createSelector(
  getCurrentGame,
  ({words, players}) => {
    // [{playerId: score}]
    const playerScores = words.reduce((scores, {playerId, score}) => {
      if (scores[playerId]) {
        scores[playerId].score += score
      } else {
        scores[playerId] = {
          playerId,
          score
        }
      }
      return scores
    }, {})
    let indexOfVictor = 0;
    for (let i = 1; i < playerScores.length; i++) {
      if (playerScores[i].score > playerScores[indexOfVictor].score) {
        indexOfVictor = i;
      }
    }

    const {username} = players.find(({playerId}) => playerId === playerScores[indexOfVictor].playerId)
    return {...playerScores[indexOfVictor], username}
  }
)