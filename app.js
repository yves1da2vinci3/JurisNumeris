var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dotenv = require('dotenv');
dotenv.config()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const store = new MongoDbStore ({
  uri: process.env.MONGO_URI,
  collection : 'sessions'
})
// initislaisation de la sesssion
app.use(session({  secret: "SecretSession", resave:false, saveUninitialized: false,store:store,

maxAge : 24*60*60
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



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
  res.render('error');
});

module.exports = app;
