"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use('/', function (req, res) { return res.send("sdf"); });
app.listen(5000);
exports["default"] = app;
