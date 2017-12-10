var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var morgan = require('morgan')

var index = require('./routes/index');
var agenda = require('./routes/agenda')
var logs = require('./routes/logs')
var users = require('./routes/users');

var app = express();

// database
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/amd', {useMongoClient: true})
mongoose.Promise = global.Promise
var dbglobal = mongoose.connection
dbglobal.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use((req, res, next)=>{
  req.db = dbglobal
  next()
})

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', logs);
app.use('/agenda', agenda)
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
