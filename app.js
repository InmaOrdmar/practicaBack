var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

//connect to db and register models
require('./lib/db-connection');
require('./models/Ad');

// API routers setup
app.use('/apiv1/ads', require('./routes/apiv1/ads'));

//webapp routers setup
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//local settings
app.locals.title = '✨Nodepop✨';

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // check if validation error
  if(err.array) {
    // handle validation error
    err.status = 422;
    const errorInfo = err.array({onlyFirstError: true})[0];
    err.message = `Query not valid: ${errorInfo.param} ${errorInfo.msg}`
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;