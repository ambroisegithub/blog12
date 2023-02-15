"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.login = exports.getAllUsers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
var signToken = function signToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "4h"
  });
};
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user["default"].create(req.body);
        case 3:
          user = _context.sent;
          token = signToken(user._id);
          res.status(201).json({
            status: "success",
            token: token,
            user: user
          });
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            status: "failed",
            error: _context.t0.message
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.signup = signup;
var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, password, user, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: "failed",
            message: "please provide email and password"
          }));
        case 3:
          _context2.next = 5;
          return _user["default"].findOne({
            email: email
          }).select("+password");
        case 5:
          user = _context2.sent;
          _context2.t0 = !user;
          if (_context2.t0) {
            _context2.next = 11;
            break;
          }
          _context2.next = 10;
          return user.correctPassword(password, user.password);
        case 10:
          _context2.t0 = !_context2.sent;
        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            status: "failed",
            message: "incorrect email or password"
          }));
        case 13:
          token = signToken(user._id);
          res.status(200).json({
            status: "success",
            token: token,
            user: user
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.login = login;
var getAllUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var allUsers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _user["default"].find();
        case 3:
          allUsers = _context3.sent;
          res.status(200).json({
            status: "success",
            data: {
              users: allUsers
            }
          });
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            status: "failed",
            error: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.js.map