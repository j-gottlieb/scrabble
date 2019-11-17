import socketIOClient from "socket.io-client";
import wretch from 'wretch';

export const getNewGame = playerId => {
  const socket = socketIOClient('localhost:5000');
  socket.emit('new-game', {playerId})
}

export const joinGame = (gameId, playerId) => {
  const socket = socketIOClient('http://localhost:5000');
  socket.emit('join-game', {gameId, playerId})
}

export const rejoinGame = (gameId, playerId) => {
  const socket = socketIOClient('localhost:5000');
  socket.emit('rejoin-game', {gameId, playerId})
}

export const submitMove = gameState => {
  const socket = socketIOClient('localhost:5000');
  socket.emit('submit-move', gameState)
}

export const getActiveGames = () =>
  wretch('http://localhost:5000/api/games')
    .get()
    .json();
