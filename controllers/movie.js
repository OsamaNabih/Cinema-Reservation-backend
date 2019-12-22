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

router.route('/add')
  .post(passportAdmin, urlencodedParser, async (req, res) => {
    try {
      console.log(req);
      let startDate = new Date(req.body.startDate);
      let endDate = new Date(req.body.endDate);
      let currentDate = startDate;
      const DB = new Database(DBconfig);
      let movieResult = await DB.query(MovieModel.InsertMovie(), req.body.movie);
      let screeningTimes = req.body.screeningTimes;
      //Enter the movie screenings
      while (currentDate <= endDate) {
        let screening = {movieId: movieResult.insertId, screenNumber: req.body.movie.screenNumber, 
          screeningDate: currentDate, screeningTime: 0};
        screeningTimes.forEach(async (screeningTime) => {
          screening['screeningTime'] = screeningTime;
          let screeningResult = await DB.query(MovieModel.InsertScreening(), screening);
        });
        let nextDate = currentDate.setDate(currentDate.getDate() + 1);
        currentDate = new Date(nextDate);
      }
      res.status(200).end();
    } catch(error) {
      console.log('An error occurred');
      console.log(error);
      res.status(400).json({msg: 'An error occurred'}).end();
    }
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
    const DB = new Database(DBconfig);
    let screeningSeats = await DB.query(MovieModel.GetReservedSeats(), req.params.screeningId);
    console.log(screeningSeats,req.params.screeningId)
    let screen = await DB.query(MovieModel.GetScreenCapacity(), req.params.screenId);
    let screenId = screen[0].screenId;
    let [rows, cols] = [screen[0].screenRows, screen[0].screenColumns];
    res.status(200).json({screenId: screenId, rows: rows, cols: cols, seats: screeningSeats}).end();
  })
  .post(passportUser, urlencodedParser, async (req, res) => {
    try {
      let userId = req.body.userId;
      let seats = req.body.seats;
      let idChain = "" + req.params.movieId + req.params.screenId + req.params.screeningId;
      seatsArray = [];
      seats.forEach((seat) => { 
        seat['ticketNumber'] = Number("" + userId + idChain + seat.rowNum + seat.colNum);
        seat['reserved'] = 1;
        seat['userId'] = userId;
        seat['screeningId'] = Number(req.params.screeningId);
      });
      const DB = new Database(DBconfig);
      let result = DB.query(MovieModel.InsertSeat(), 
                          [seats.map(seat => [seat.screeningId, seat.rowNum, seat.colNum, 
                            seat.reserved, seat.ticketNumber, seat.userId])]);
      var seatArray =[]
      seats.forEach((seat) => {
        seatArray.push(seat.ticketNumber);
      })
      res.send({seats:seatArray});
    } catch(error) {
      console.log(error);
      res.status(400).json({msg: 'An error has occurred'}).end();
    }
  });

router.route('/')
  .get(passportUser,async(req, res) => {
    console.log("S")
    const DB = new Database(DBconfig);
    let movies = await DB.query(MovieModel.GetMovies());
    res.status(200).json({movies:movies}).end();
  });

module.exports = router;