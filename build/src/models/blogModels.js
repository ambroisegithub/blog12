"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
// import validator from "validator"

var BlogShcema = new _mongoose["default"].Schema({
  image: {
    type: String,
    required: [true, "the image is required"]
  },
  title: {
    type: String,
    required: [true, "The title is required"]
  },
  description: {
    type: String,
    required: [true, "The description of image is required"]
  },
  comments: {
    type: Array
  }
});
var BlogModel = _mongoose["default"].model("Blog", BlogShcema);
var _default = BlogModel;
exports["default"] = _default;
//# sourceMappingURL=blogModels.js.map