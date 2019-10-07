const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Games model
const User = require('../../models/User');

// @route post api/auth
// Login route
router.post('/', (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).send('Please provide both a username and password')
  }

  User.findOne({username})
    .then((user) => {
      if (!user) return res.status(400).send(`${username} does not exist`)

      // validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).send('Password is incorrect, please try again.')

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600},
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username
                }
              })
            }
          )
        })

    })
});

// @route get api/auth/user
// get user data
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      res.json(user);
    })
})

module.exports = router;
