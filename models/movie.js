module.exports = {
  GetMovies: function(){
    return `SELECT movieId, name, genre, runtime FROM Movies`;
  },
  GetMovieInfo: function(){
    return `SELECT *  FROM Movies NATURAL JOIN Screens NATURAL JOIN Screenings`;
  },
  GetScreeningTimes: function(){
    return `SELECT DISTINCT screeningTime FROM Movies NATURAL JOIN Screenings`;
  },
  GetReservedSeats: function(){
    return `SELECT * FROM Seats WHERE movieId = ? screeningId = ? and reserved = 1`;
  },
  GetScreening: function(){
    return `SELECT * FROM Screenings WHERE screeningId = ?`;
  },
  GetMovieAndSeatsInfo: function(){
    return `SELECT * FROM Movies NATURAL JOIN Screens NATURAL JOIN Seats`;
  },
  GetScreenCapacity: function(){
    return `SELECT rows, columns FROM Screens where screenNumber = ?`;
  }
}