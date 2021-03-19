var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

// GET sign up form
router.get('/signup', userController.createUserGet);

// POST sign up form
router.post('/signup', userController.createUserPost);

// GET log in form
router.get('/login', userController.logInGet);

// POST log in form
router.post('/login', userController.logInPost);

module.exports = router;
