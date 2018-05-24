"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var passport = require('passport');
var check_1 = require("express-validator/check");
exports.jsonParser = bodyParser.json();
exports.urlEncoder = bodyParser.urlencoded({ extended: true });
exports.expressFlash = require('express-flash');
exports.Auth = passport.authenticate('jwt', { session: false });
exports.CORS = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
};
exports.ValidationMiddleware = function (req, res, next) {
    var errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
