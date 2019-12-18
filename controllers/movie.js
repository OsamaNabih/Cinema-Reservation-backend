const router = require('express').Router();
const passport = require('passport');
const DB = require('../config/DB');
const passportJWT = passport.authenticate('jwt', { session: false });
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const passportAdmin = require('../passport').passportAdmin;
const passportUser = require('../passport').passportUser;
const MovieModel = require('../models/movie');
const DBconfig = require('../config/keys').DBconfig;

router.route('/create')
  .post(passportUser, urlencodedParser, (req, res) => {
    //Do processing to get movie info
    let info = req.MovieInformation
    let showTimes = info.showTimes.split()
    const DB = new Database(DBconfig);
    let movieResult = await DB.query(MovieModel.CreateMovie(), req.MovieInformation);
    //Enter the movie screenings
  });
  