var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');

const usersModel = require('./models/users');
var url;
if(process.env.NODE_ENV === 'test') {
  url = 'mongodb://localhost:27017/userProfile-test';
} else {
  url = 'mongodb://localhost:27017/userProfile';
}
// const url = process.env.NODE_ENV == test ? 'mongodb://localhost:27017/userProfile' : 'mongodb://localhost:27017/userProfile';
mongoose.connect(url, { useNewUrlParser: true});


var db = mongoose.connection;
if(!db) {
  console.log("Error connectiong db");
} else {
  console.log("DB connected!")
}
// connect.then((db) => {
//     console.log("Connected correctly to server");
// }, (err) => { console.log(err); });

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
