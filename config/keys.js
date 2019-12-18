var databaseName = 'cinema';
var multipleStatements = false;

module.exports = {
  JWT_SECRET: 'ThisIsASecretForOurTokens',
  DBconfig: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : databaseName,
    multipleStatements: multipleStatements
  }
}
