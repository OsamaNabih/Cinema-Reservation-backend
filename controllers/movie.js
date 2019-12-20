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

router.route('/:movieId')
  .get(passportUser, async (req, res) => {
    const DB = new Database(DBconfig);
    let movieResult = await DB.query(MovieModel.GetMovieInfo(), req.params.movieId);
    let screenings = await DB.query(MovieModel.GetScreeningTimes(), req.params.movieId);
    res.status(200).json({movie: movieResult[0], screenings: screenings});
  });
  
router.route('/:movieId/:screenId/:screeningId/seats')
  .get(passportUser, async (req, res) => {
    let n = 5;
    let k = 10;
    console.log("" + n + k);
    const DB = new Database(DBconfig);
    let screeningSeats = await DB.query(MovieModel.GetReservedSeats(), [req.params.movieId, req.params.screeningId]);
    let screen = await DB.query(MovieModel.GetScreenCapacity(), req.params.screenId);
    let screenId = screen[0].screenId;
    let [rows, cols] = [screen[0].screenRows, screen[0].screenColumns];
    res.status(200).json({screenId: screenId, rows: rows, cols: cols, seats: screeningSeats}).end();
  })
  .post();

router.route('/')
  .get(passportUser, async(req, res) => {
    const DB = new Database(DBconfig);
    let movies = await DB.query(MovieModel.GetMovies());
    res.status(200).json({movies:movies}).end();
  });

module.exports = router;