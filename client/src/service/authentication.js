import wretch from 'wretch';
import {url} from '../constants';

const authURL = `${url}api/`;

export const signUp = (username, password) =>
  wretch(`${authURL}users`)
    .json({username, password})
    .post()
    .json()

export const signIn = (username, password) =>
  wretch(`${authURL}auth`)
    .json({username, password})
    .post()
    .json()
