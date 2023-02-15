"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _validator = _interopRequireDefault(require("validator"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var USerSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, "the name is required"]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validator: [_validator["default"].isEmail, "please provide the valid email"]
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 12,
    select: false,
    required: [true, "please the passsword field required"]
  },
  role: {
    type: String,
    "enum": ["user", "admin"],
    "default": "user"
  }
});
USerSchema.pre("save", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = this;
          if (user.isModified("password")) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", next());
        case 3:
          _context.next = 5;
          return _bcryptjs["default"].hash(user.password, 10);
        case 5:
          user.password = _context.sent;
          next();
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
USerSchema.methods.correctPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(cpassword, password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _bcryptjs["default"].compare(cpassword, password);
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var user = _mongoose["default"].model("User", USerSchema);
var _default = user;
exports["default"] = _default;
//# sourceMappingURL=user.js.map