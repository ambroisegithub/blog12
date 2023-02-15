"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _validator = _interopRequireDefault(require("validator"));
var CommentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    require: [true, "The name field must Have value"]
  },
  email: {
    type: String,
    required: [true, "Title field is required"],
    validator: [_validator["default"].isEmail, "The email you provide is incorrect"]
  },
  comment: {
    type: String,
    required: [true, "The comment field oes not be empty"]
  }
});
var commentModel = _mongoose["default"].model("Comment", CommentSchema);
var _default = commentModel;
exports["default"] = _default;
//# sourceMappingURL=commentModel.js.map