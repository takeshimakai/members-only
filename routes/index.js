var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

/* GET home page. */
router.get('/', postController.getMessages);

// GET sign up form
router.get('/signup', userController.createUserGet);

// POST sign up form
router.post('/signup', userController.createUserPost);

// GET log in form
router.get('/login', userController.logInGet);

// POST log in form
router.post('/login', userController.logInPost);

// Logout
router.get('/logout', userController.logOut);

// GET new post form
router.get('/new-post', postController.createNewGet);

// POST new post form
router.post('/new-post', postController.createNewPost);

module.exports = router;
