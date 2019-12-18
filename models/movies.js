module.exports = {
  GetMovieInfo: function(){
    `SELECT * FROM Movies NATURAL JOIN Screens`
  },
  GetReservedSeats: function(){
    `SELECT * FROM Seats WHERE movieId = ? and screenId = ? and reserved = 1`
  },
  GetMovieAndSeatsInfo: function(){
    `SELECT * FROM Movies NATURAL JOIN Screens NATURAL JOIN Seats`
  }
}