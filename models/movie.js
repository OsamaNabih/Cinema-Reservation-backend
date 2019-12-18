module.exports = {
  GetMovieInfo: function(){
    `SELECT * FROM Movies NATURAL JOIN Screens NATURAL JOIN Screenings`
  },
  GetReservedSeats: function(){
    `SELECT * FROM Seats WHERE screeningId = ? and reserved = 1`
  },
  GetMovieAndSeatsInfo: function(){
    `SELECT * FROM Movies NATURAL JOIN Screens NATURAL JOIN Seats`
  }
}