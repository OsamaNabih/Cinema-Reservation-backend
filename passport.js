const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config/keys');
const UserModel = require('./models/user.js');
const Database = require('./config/DB');
const bcrypt = require('bcryptjs');
const config =require('./config/keys.js');
const DBconfig = require('./config/keys.js').DBconfig;

// JSON WEB TOKENS STRATEGY
var cookieExtractor = function(req) {
    var token = null;
    if (req) token = req.get("Authorization");
    if (token === undefined) {
      console.log('no cookie');
      throw 'Unauthorized';
    } 
    console.log(token)
    return token;
};

module.exports.passportUser = (req, res, next)=>{
  if(req.get("Authorization"))
  passport.authenticate('user-local', { session: false })(req, res, next);
}

passport.use('user-local', new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET
}, async (payload, done) =>{
  try{
      // Find the user specifided in token
      const DB = new Database(DBconfig);
      const user = await DB.query(UserModel.GetUserIdAndTypeById(), payload.userId);
      await DB.close();
      if (user.length === 0){
        throw('No user exists with this ID');
      }
      done(null, user[0]);
  } catch(error) {
    let user = {};
    user.userType = Number(0);
    console.log('Error inside passport user');
    done(error, user);
  }
}));

module.exports.passportAdmin = (req, res, next)=>{
  console.log(req.get("Authorization"))
  if(req.get("Authorization"))
    passport.authenticate('admin-local', { session: false })(req, res, next);
}

passport.use('admin-local', new JwtStrategy({
  //jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET
}, async (payload, done) =>{
  try{
      // Find the user specifided in token
      console.log("SDSD")
      const DB = new Database(DBconfig);
      const user = await DB.query(UserModel.GetUserIdAndTypeById(), payload.userId);
      console.log(user[0])
      await DB.close();
      if (user.length === 0){
        return done(null, false);
      }
      else if (user[0].userType !== 2){
        return done(null, false);
      }
      done(null, user[0]);
  } catch(error) {
    return done(error, false);
  }
}));



  // LOCAL STRATEGY
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    password: 'password'
  }, async (email, password, done) =>{
    try {
      // Find the user given the email
      const DB = new Database(DBconfig);
      let user = await DB.query(UserModel.GetUser(),email);
      await DB.close();
      if(user.length === 0){
        throw 'Invalid email or password';
      }
      const dbPassword = user[0].password;
      let isMatch = await bcrypt.compare(password,dbPassword);
      if (!isMatch){
        throw 'Invalid email or password';
      }
       // Otherwise, return the user
      done(null, user);
    } catch(error){
      let user = {};
      user.error = error;
      done(null, user);
    }
  }));
  