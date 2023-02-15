"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user");
var router = _express["default"].Router();
router.post("/signup", _user.signup);
router.post("/signin", _user.login);
router.get("/users", _user.getAllUsers);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.js.map