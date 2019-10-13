import wretch from 'wretch';

export const getGames = () =>
  wretch('http://localhost:5000/api/games')
    .get()
    .json();
