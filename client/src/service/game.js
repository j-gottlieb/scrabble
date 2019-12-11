import {socket} from '../constants'
import wretch from 'wretch';

export const getNewGame = playerId => {
  socket.emit('new-game', {playerId})
}

export const joinGame = (gameId, playerId) => {
  socket.emit('join-game', {gameId, playerId})
}

export const rejoinGame = (gameId, playerId) => {
  socket.emit('rejoin-game', {gameId, playerId})
}

export const submitMove = gameState => {
  socket.emit('submit-move', gameState)
}

export const getActiveGames = () =>
  wretch('http://localhost:5000/api/games')
    .get()
    .json();
