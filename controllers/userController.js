const User = require('../models/user');

const { body, validationResult } = require('express-validator');

// Display sign up form
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
    console.log(req.body)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('signUpForm', { title: 'Sign Up', user: req.body, errors: errors.array() });
    }

    const user = new User({
      name: {
        first: req.body.firstName,
        last: req.body.lastName
      },
      email: req.body.email,
      password: req.body.createPassword,
      isAdmin: req.body.isAdmin
    })

    user.save((err) => {
      if (err) return next(err);
      res.redirect('/');
    })
  }
]