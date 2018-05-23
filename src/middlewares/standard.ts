const bodyParser = require("body-parser");
import { Middlewares } from "../config/interfaces";

export let jsonParser = bodyParser.json();
export let urlEncoder = bodyParser.urlencoded({ extended: true });
export let expressFlash = require('express-flash');

export let CORS: Middlewares = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  };