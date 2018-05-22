"use strict";
exports.__esModule = true;
var HomeController = require("./controller/home");
var express = require('express');
var router = express.Router();
router.use('/', HomeController.index);
exports["default"] = router;
