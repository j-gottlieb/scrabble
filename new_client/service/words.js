import wretch from 'wretch';
import socketIOClient from "socket.io-client";

export const getGames = () =>
  wretch('http://localhost:3000/api/games')
    .get()
    .json()

export const getDictionary = () => {
  const socket = socketIOClient('localhost:3000');
  socket.emit('client-message', 'client-message')
}

export const getNewGame = () => {
  const socket = socketIOClient('localhost:3000');
  socket.emit('new-game', 'Creating new game')
}
