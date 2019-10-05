import wretch from 'wretch';

export const signup = (username, password) =>
  wretch('http://localhost:3000/signup')
    .json({username, password})
    .post()
    .json()
