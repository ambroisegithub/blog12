"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));
var _multer = _interopRequireDefault(require("./helpers/multer"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _user = _interopRequireDefault(require("./routes/user"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
// import upload from "./helpers/multer"

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_multer["default"].single("image"));
app.use("/api/v1", _blogRoutes["default"]);
app.use("/api/v1", _user["default"]);
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
// app.use(upload.single("image"));
app.use("/", function (req, res) {
  res.status(200).json({
    code: 500,
    message: "welcome to my Api"
  });
});
app.use("*", function (req, res) {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL"
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map