module.exports = {
  GetMovies: function(){
    return `SELECT movieId, name, genre, runtime FROM Movies`;
  },
  GetMovieInfo: function(){
    return `SELECT * FROM Movies WHERE movieId = ?`;
  },
  GetScreeningTimes: function(){
    return `SELECT DISTINCT screeningId, DATE_FORMAT(screeningDate,'%y%y-%m-%d') as screeningDate, screeningTime FROM Screenings WHERE movieId = ?`;
  },
  GetReservedSeats: function(){
    return `SELECT rowNum, colNum, reserved, ticketNumber FROM Seats WHERE screeningId = ? and reserved = 1`;
  },
  GetScreening: function(){
    return `SELECT * FROM Screenings WHERE screeningId = ?`;
  },
  GetMovieAndSeatsInfo: function(){
    return `SELECT * FROM Movies NATURAL JOIN Screens NATURAL JOIN Seats`;
  },
  GetScreenCapacity: function(){
    return `SELECT screenRows, screenColumns FROM Screens WHERE screenNumber = ?`;
  },
  InsertSeat: function(){
    return `INSERT INTO  Seats VALUES ?`;
  },
  InsertMovie: function(){
    return `INSERT INTO Movies set ?`;
  },
  InsertScreening: function(){
    return `INSERT INTO Screenings set ?`;
  }
}
