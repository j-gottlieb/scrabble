import wretch from 'wretch';

const authURL = 'http://localhost:5000/api/';

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
