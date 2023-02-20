import request from "supertest";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import BlogModel from "../src/models/blogModels";
import app from "../src/index1.js";
// import bcrypt from "bcryptjs"
import { expect, jest, test } from "@jest/globals";
dotenv.config();
/* Connecting to the database before each test. */
jest.setTimeout(200000);
beforeAll(async () => {

//   await mongoose.connect(process.env.DATABASE1, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await userModel.deleteMany({});
//   await mongoose.connection.close();
});
describe("GET /api/v1/getAllBlogs", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/v1/getAllBlogs");
    expect(response.statusCode).toBe(200);
  });
});


const blogData = {
  title: "Test Blog",
  description: "This is a test blog",
};

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Blog API", () => {
  // it("should get all blogs", async () => {
  //   const response = await request(app).get("/api/v1/getAllBlogs");
  //   expect(response.status).toBe(200);
  //   expect(response.body.status).toBe("success");
  //   expect(Array.isArray(response.body.blogs)).toBe(true);
  // });

  it("should create a new blog post", async () => {
    const response = await request(app)
      .post("/apiv1/postBlog")
      .field("title", blogData.title)
      .field("description", blogData.description)
      .attach("image", "test/images/caton3.jpg");
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.content.newPost.title).toBe(blogData.title);
  });

  it("should update an existing blog post", async () => {
    const newTitle = "New Test Title";
    const post = await BlogModel.findOne();
    const response = await request(app)
      .put(`/api/v1/update/${post._id}`)
      .field("title", newTitle)
      .field("description", post.description)
      .attach("image", "tests/test_image.png");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Post updated successfully");
  });

  it("should get a single blog post", async () => {
    const post = await BlogModel.findOne();
    const response = await request(app).get(`/api/v1/blog/${post._id}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.post._id).toBe(post._id.toString());
  });

  it("should delete a blog post", async () => {
    const post = await BlogModel.findOne();
    const response = await request(app).delete(`/blogs/${post._id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should create a comment on a blog post", async () => {
    const post = await BlogModel.findOne();
    const commentData = {
      name: "Test User",
      email: "testuser@example.com",
      comment: "This is a test comment",
    };
    const response = await request(app)
      .post(`/api/v1/comment/${post._id}`)
      .send(commentData);
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.comment.name).toBe(commentData.name);
  });
});