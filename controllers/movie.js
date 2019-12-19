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
const Database = require('../config/DB');

router.route('/create')
  .post(passportUser, urlencodedParser, async (req, res) => {
    //Do processing to get movie info
    let info = req.MovieInformation
    let showTimes = info.showTimes.split()
    const DB = new Database(DBconfig);
    let movieResult = await DB.query(MovieModel.CreateMovie(), req.MovieInformation);
    //Enter the movie screenings
  });

router.route('/:id')
  .get(passportUser, async (req, res) => {
    const DB = new Database(DBconfig);
    let movieResult = await DB.query(MovieModel.GetMovieInfo(), req.params.id);
    res.status(200).json(movieResult);
  });
  
router.route('/:movieId/:screenid/:screeningId/seats')
  .get(passportUser, async (req, res) => {
    const DB = new Database(DBconfig);
    let screeningSeats = await DB.query(MovieModel.GetReservedSeats(), [req.params.movieId, req.params.screeningId]);
    let [rows, cols] = await DB.query(MovieModel.GetScreenCapacity(), req.params.screenId)[0];
    res.status(200).json({rows: rows, cols: cols, seats: screeningSeats}).end();
  })
  .post();

router.route('/')
  .get(passportUser, async(req, res) => {
    const DB = new Database(DBconfig);
    let movies = await DB.query(MovieModel.GetMovies());
    res.status(200).json({movies:movies}).end();
  });

module.exports = router;