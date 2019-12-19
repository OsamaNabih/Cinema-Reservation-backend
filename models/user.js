module.exports = {
  InsertUser:  function(){
    return "Insert Into Users set ?";
  },
  GetUserIdAndTypeById: function(){
    return 'SELECT userId, userType FROM Users WHERE userId = ?';
  },
  GetUser: function(){
    return `SELECT * FROM Users WHERE email = ?`;
  }
}