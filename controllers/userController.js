const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// GET sign up form
exports.createUserGet = (req, res, next) => {
  res.render('signUpForm', { title: 'Sign Up' });
};

// POST sign up form
exports.createUserPost = [
  body('firstName')
  .trim()
  .notEmpty()
  .withMessage('First name must be specified')
  .escape()
  .isAlpha()
  .withMessage('First name must be in alphabets'),

  body('lastName')
  .trim()
  .notEmpty()
  .withMessage('Last name must be specified.')
  .escape()
  .isAlpha()
  .withMessage('Last name must be in alphabets'),

  body('email')
  .trim()
  .notEmpty()
  .withMessage('Email must be specified')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please enter a valid email'),

  body('createPassword')
  .notEmpty()
  .withMessage('You must create a password'),

  body('confirmPassword')
  .custom((value, { req }) => value === req.body.createPassword)
  .withMessage('Password confirmation must match the password'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('signUpForm', { title: 'Sign Up', user: req.body, errors: errors.array() });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);

      if (user) {
        return res.render('signUpForm', { title: 'Sign Up', user: req.body, errors: {error: {msg: `An account already exists with ${req.body.email}`}} });
      }

      bcrypt.hash(req.body.createPassword, 10, (err, hashedPw) => {
        if (err) return next(err);
  
        const user = new User({
          name: {
            first: req.body.firstName,
            last: req.body.lastName
          },
          email: req.body.email,
          password: hashedPw,
          isAdmin: !req.body.isAdmin ? false : true
        })
    
        user.save((err) => {
          if (err) return next(err);
          res.redirect('/');
        })
      })
    })
  }
];

// GET log in form
exports.logInGet = (req, res, next) => {
  res.render('logInForm', { title: 'Log In' });
};

// POST log in form
exports.logInPost = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next);
};

// Logout
exports.logOut = (req, res) => {
  req.logout();
  res.redirect('/');
};