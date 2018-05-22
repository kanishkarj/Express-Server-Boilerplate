"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var routes_1 = require("./src/routes");
dotenv.config({ path: ".env.example" });
routes_1["default"].listen(5000);
exports["default"] = routes_1["default"];
