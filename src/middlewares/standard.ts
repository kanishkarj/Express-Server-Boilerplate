const bodyParser = require("body-parser");
const passport = require('passport');

import { Middlewares } from "../config/interfaces";
import { check, validationResult} from 'express-validator/check';

export let jsonParser = bodyParser.json();
export let urlEncoder = bodyParser.urlencoded({ extended: true });
export let expressFlash = require('express-flash');
export const Auth = passport.authenticate('jwt', {session: false});

export let CORS: Middlewares = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  };

export let ValidationMiddleware: Middlewares = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  };
