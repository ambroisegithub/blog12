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
router.route("/blog/:id").get(getSinglePost).delete(deletePost);



/**
 * @swagger
 * /api/v1/getAllBlogs:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve all blog posts from the database.
 *     responses:
 *       200:
 *         description: A list of all blog posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 number:
 *                   type: number
 *                   description: The number of blog posts returned.
 *                 blogs:
 *                   type: array
 *       404:
 *         description: Failed to retrieve blog posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

/**
 * @swagger
 * /api/v1/blog/{id}:
 *   get:
 *     summary: Retrieve a single blog post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to retrieve.
 *     responses:
 *       200:
 *         description: The blog post with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: The specified ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Id of post not found
 */



/**
 * @swagger
 * /api/v1/postBlog:
 *   post:
 *     summary: Create a new blog post
 *     tags:
 *       - post blog 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Blog created successfully
 *                 content:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 error:
 *                   type: string
 *                   example: Error message
 */


/**
 * @swagger
 * /api/v1/update/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     description: Update a post's title, description, and image by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               description:
 *                 type: string
 *                 description: Description of the post
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload for the post
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   description: Message indicating the post was updated successfully
 *                   example: "Post updated successfully"
 *       '400':
 *         description: Invalid request parameters or image file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request
 *                   example: "failed"
 *                 error:
 *                   type: string
 *                   description: Error message indicating why the request failed
 */


/**
 * Delete a blog post by ID
 * 
 * @swagger
 * /api/v1/blog/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       400:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Id of post not found
 */

/**
 * Create a new comment on a blog post
 * 
 * @swagger
 * /api/v1/comment/{id}:
 *   post:
 *     summary: Create a new comment on a blog post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog post to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Comment details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *                 comment:
 *                   type: object
 *                   example: {
 *                     "_id": "1234567890",
 *                     "name": "John Doe",
 *                     "email": "johndoe@example.com",
 *                     "comment": "This is a great blog post!",
 *                     "createdAt": "2023-02-20T00:00:00.000Z"
 *                   }
 *       400:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: Comment could not be created - blog post not found
 */
export default router;
