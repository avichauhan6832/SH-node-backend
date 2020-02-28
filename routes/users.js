var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');

const Users = require('../models/users');

/* GET users listing. */
userRouter.route('/')
.get((req, res, next) => {
   Users.find({})
   .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
   })
   .catch((err) => next(err))
})
.post((req, res, next) => {
  req.body.mobileNumber = Number(req.body.mobileNumber);
  req.body.postalCode = Number(req.body.postalCode);
  console.log(req.body);
  Users.create(req.body)
    .then((user) => {
        console.log('User Created ', user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => {
        next(err)
    });
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /users');
})
.delete((req, res, next) => {
  Users.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});

userRouter.route('/:userId')
.get((req,res,next) => {
  Users.findById(req.params.userId)
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /users');
})
.put((req, res, next) => {
  Users.findByIdAndUpdate(req.params.userId, {
      $set: req.body
  }, { new: true })
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Users.findByIdAndRemove(req.params.userId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = userRouter;
