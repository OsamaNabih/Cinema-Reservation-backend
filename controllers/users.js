const router = require('express').Router();
const passport = require('passport');
const passportConf = require('../passport');
//const { validateBody, schemas} = require('../helpers/routeHelpers');
//const passportAdmin = require('../passport').passportAdmin;
//const passportUser = passport.authenticate('user-local', { session: false })
//const passportSignIn = passport.authenticate('local', { session: false })
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

