import wretch from 'wretch';
import {url} from '../constants';

export const getGames = () =>
  wretch(`${url}/api/games`)
    .get()
    .json();
