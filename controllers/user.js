const router = require('express').Router();
const passport = require('passport');
const passportConf = require('../passport');
const passportAdmin = require('../passport').passportAdmin;
const passportUser = passport.authenticate('user-local', { session: false })
const passportSignIn = passport.authenticate('local', { session: false })
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const JWT = require('jsonwebtoken');
const UserModel = require('../models/user');
const Database = require('../config/DB');
const DBconfig = require('../config/keys').DBconfig;
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/keys')
signToken = (Id, type) => {
    return JWT.sign({
    iss: 'Tafrah',
    userId: Id,
    userType: type,
  }, 
  JWT_SECRET,{expiresIn:60});
}

router.route('signup')
  .post(urlencodedParser, (req, res) => {
    // Generate a salt
    try {
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(req.body.password, salt);
      req.body.password = passwordHash;
      req.body.userType = 3;
      const DB = new Database(DBconfig);
      let result = await DB.query(UserModel.InsertUser(), req.body);
      await DB.close();
      let id = result[0];
      let type = req.body.userType;
      let token = signToken(id, type);
      res.cookie('jwt', token); // add cookie here
      res.status(200);
    } catch(error){
      res.status(400).json(error);
    }
  }
);

router.route('/signin')
  .post(urlencodedParser, passportSignIn, (req, res) => {
    const token = signToken(req.user.userId, req.user.userType);
  })