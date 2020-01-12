import {socket} from '../constants'
import wretch from 'wretch';

export const getNewGame = (playerId, name) => {
  socket.emit('new-game', {playerId, name})
}

export const joinGame = (gameId, playerId) => {
  socket.emit('join-game', {gameId, playerId})
}

export const rejoinGame = (gameId, playerId) => {
  socket.emit('rejoin-game', {gameId, playerId});
}

export const beginGame = (gameId) => {
  socket.emit('begin-game', gameId);
}

export const submitMove = gameState => {
  socket.emit('submit-move', gameState)
}

export const getActiveGames = () =>
  wretch('http://localhost:5000/api/games')
    .get()
    .json();
