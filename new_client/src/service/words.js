import wretch from 'wretch';
import socketIOClient from "socket.io-client";

export const getGames = () =>
  wretch('http://localhost:5000/api/games')
    .get()
    .json();
