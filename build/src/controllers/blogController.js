"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.getSinglePost = exports.getAllBlogs = exports.deletePost = exports.createComment = exports.CreatePost = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _blogModels = _interopRequireDefault(require("../models/blogModels"));
var _commentModel = _interopRequireDefault(require("../models/commentModel"));
var _cloud = require("../helpers/cloud.js");
var getAllBlogs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var blog;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _blogModels["default"].find();
        case 3:
          blog = _context.sent;
          return _context.abrupt("return", res.status(300).json({
            status: "Get Success",
            number: blog.length,
            blog: blog
          }));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            status: "failed",
            error: _context.t0.message
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllBlogs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllBlogs = getAllBlogs;
var CreatePost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result, newPost;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _cloud.UploadToCloud)(req.file, res);
        case 3:
          result = _context2.sent;
          _context2.next = 6;
          return _blogModels["default"].create({
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url
          });
        case 6:
          newPost = _context2.sent;
          return _context2.abrupt("return", res.status(201).json({
            status: "posted Success",
            message: "blog created successfully",
            content: {
              newPost: newPost
            }
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).json({
            status: "failed To create Blogs",
            error: _context2.t0.message
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function CreatePost(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.CreatePost = CreatePost;
var updatePost = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, result, post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return (0, _cloud.UploadToCloud)(req.file, res);
        case 4:
          result = _context3.sent;
          _context3.next = 7;
          return _blogModels["default"].findById(id);
        case 7:
          post = _context3.sent;
          if (post) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            status: "failed",
            message: "Invalid Id can not uploads blog"
          }));
        case 10:
          _context3.next = 12;
          return _blogModels["default"].findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url
          });
        case 12:
          return _context3.abrupt("return", res.status(500).json({
            status: "success",
            message: "Post updated successfully"
          }));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(200).json({
            status: "failed",
            error: _context3.t0
          }));
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function updatePost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updatePost = updatePost;
var getSinglePost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, post;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _blogModels["default"].findById(id);
        case 4:
          post = _context4.sent;
          if (post) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            status: "failed",
            message: "Id of post not found"
          }));
        case 7:
          return _context4.abrupt("return", res.status(500).json({
            status: "success",
            post: post
          }));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(200).json({
            status: "failed",
            error: _context4.t0
          }));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function getSinglePost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getSinglePost = getSinglePost;
var deletePost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, post;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _blogModels["default"].findByIdAndDelete(id);
        case 4:
          post = _context5.sent;
          if (post) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            status: "failed",
            message: "Id of post not found"
          }));
        case 7:
          return _context5.abrupt("return", res.status(204).json({
            status: "success",
            message: "Post deleted successfully"
          }));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(400).json({
            status: "failed",
            error: _context5.t0
          }));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 10]]);
  }));
  return function deletePost(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deletePost = deletePost;
var createComment = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var post, comment;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _blogModels["default"].findById(req.params.id);
        case 3:
          post = _context6.sent;
          if (post) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            status: "failed",
            message: "The post not found"
          }));
        case 6:
          comment = new _commentModel["default"]({
            name: req.user.name,
            email: req.user.email,
            comment: req.body.comment
          });
          post.comments.push(comment);
          _context6.next = 10;
          return post.save();
        case 10:
          return _context6.abrupt("return", res.status(201).json({
            status: "success",
            message: "comment created successfully",
            comment: comment
          }));
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            status: "success",
            error: _context6.t0
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 13]]);
  }));
  return function createComment(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.createComment = createComment;
//# sourceMappingURL=blogController.js.map