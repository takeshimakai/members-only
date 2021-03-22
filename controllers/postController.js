const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

exports.getMessages = (req, res, next) => {
  Post
  .find()
  .populate('author')
  .exec((err, posts) => {
    if (err) return next(err);
    res.render('index', { title: 'Members Only', posts });
  });
};

exports.createNewGet = (req, res, next) => {
  res.render('messageForm', { title: 'New Post'});
};

exports.createNewPost = [
  body('title')
  .trim()
  .notEmpty()
  .withMessage('Title must be specified'),

  body('message')
  .notEmpty()
  .withMessage('Message must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('messageForm', { title: 'New Post', post: req.body, errors: errors.array() });
    }

    new Post({
      author: req.user._id,
      title: req.body.title,
      message: req.body.message
    }).save((err) => {
      if (err) return next(err);
      res.redirect('/');
    })
  }
];

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.body.postId, (err) => {
    if (err) return next(err);
    res.redirect('/');
  })
}