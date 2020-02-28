var express = require('express');
var searchRouter = express.Router();
var mongoose = require('mongoose');

const Users = require('../models/users');

searchRouter.route('/')
.get((req, res, next) => {
    
    Users.find({$text: {$search: req.query.input}})
//   Users.find({fieldToSearch: req.body.query})
        .then(result => {
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
})

module.exports = searchRouter;
