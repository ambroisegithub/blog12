"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _blogController = require("../controllers/blogController");
var router = _express["default"].Router();
router.get("/getAllBlogs", _blogController.getAllBlogs);
router.post("/postBlog", _blogController.CreatePost);
router.post("/postBlog", _blogController.CreatePost);
router.patch("/update/:id", _blogController.updatePost);
// router.get("/getAllBlogs", getAllBlogs);
router.route("/blog/:id").get(_blogController.getSinglePost)["delete"](_blogController.deletePost);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=blogRoutes.js.map