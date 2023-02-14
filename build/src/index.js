"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app.js"));
// import bodyParser from "body-parser"
_dotenv["default"].config();
_mongoose["default"].set("strictQuery", false);
_mongoose["default"].connect(process.env.DATABASE).then(function () {
  console.log("DB CONNECTED");
})["catch"](function (err) {
  console.log(err);
});
var PORT = process.env.PORT || 2222;
_app["default"].listen(PORT || 2222, function () {
  console.log("The server is running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map