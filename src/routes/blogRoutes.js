import express from "express";
import {
  getAllBlogs,
  CreatePost,
  updatePost,
  getSinglePost,
  deletePost,
  createComment,
} from "../controllers/blogController";

const router = express.Router();

router.get("/getAllBlogs", getAllBlogs);
router.post("/postBlog", CreatePost);
router.post("/comment/:id", createComment);
router.patch("/update/:id", updatePost);
// router.get("/getAllBlogs", getAllBlogs);
router.route("/blog/:id").get(getSinglePost).delete(deletePost);

export default router;
