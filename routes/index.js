var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

// GET sign up form
router.get('/sign-up', userController.createUserGet);

// POST sign up form
router.post('/sign-up', userController.createUserPost);

// GET log in form
router.get('/log-in', userController.logInGet);

module.exports = router;
