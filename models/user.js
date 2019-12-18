module.exports = {
  GetUserIdAndTypeById = function(){
    'SELECT userId, userType FROM Users WHERE userId = ?'
  }
}