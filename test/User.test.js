import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "../src/models/user";
import app from "../src/index1.js";
// import bcrypt from "bcrypt";
import { expect, jest, test } from "@jest/globals";
dotenv.config();
/* Connecting to the database before each test. */
jest.setTimeout(200000);
beforeAll(async () => {

  await mongoose.connect(process.env.DATABASE1, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await userModel.deleteMany({});
  await mongoose.connection.close();
});
describe("GET /api/v1/getAllBlogs", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/v1/blogs");
    expect(response.statusCode).toBe(200);
  });
});



describe("User API", () => {
  let authToken;
  let userId;

  describe("Models", () => {
    it("should signup a new user", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        role: "user",
      };
      const response = await request(app)
        .post("/api/v1/signup")
        .send(userData)
        .expect(201);
      // expect(response.body.token).toBeDefined();
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.role).toBe(userData.role);
      userId = response.body.user._id;
    });
    it("should login an existing user", async () => {
      const userData = {
        email: "jane.doe@example.com",
        password: "password123",
      };
      const response = await request(app)
        .post("/api/v1/signin")
        .send(userData)
        .expect(200);
      // authToken = response.body.token;
      // expect(authToken).toBeDefined();
    });
  });
  
});
