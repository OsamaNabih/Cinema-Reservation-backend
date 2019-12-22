const express = require('express');
const keys = require('./config/keys');
const passport = require('passport');
const http = require('http');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
//const passportUser = require('./passport').passportUser;
require('./config/DB');

const app = express();
const env = app.get('env')

// Setting view engine
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});
// Routes
app.use('/users', require('./controllers/user'));
app.use('/movies', require('./controllers/movie'));
//app.use('/meetups', require('./routes/meetups'));

app.listen(3000, ()=>
{
  console.log("Listening on port 3000");
});

module.exports = app;
