"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app1.js"));
_dotenv["default"].config();
_mongoose["default"].set("strictQuery", false);
_mongoose["default"].connect(process.env.DATABASE1).then(function () {
  console.log("DB CONNECTED");
})["catch"](function (err) {
  console.log(err);
});
var PORT1 = process.env.PORT1 || 2222;
_app["default"].listen(PORT1 || 2222, function () {
  console.log("The server is running on port ".concat(PORT1));
});
var _default = _app["default"];
exports["default"] = _default;
//# sourceMappingURL=index1.js.map