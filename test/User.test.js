import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "../src/models/user";
import app from "../src/index1.js";
import bcrypt from "bcryptjs"
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

describe("User API", () => {
  
  describe("POST /api/v1/signup", () => {
    it("should create a new user with hashed password", async () => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      };

     
      const response = await request(app)
        .post("/api/v1/signup")
        .send(userData)
        .expect(201);
        const createdUser = await userModel.findById(response.body.user._id);
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.email).toBe(userData.email);
        expect(createdUser.role).toBe(userData.role);
        expect(bcrypt.compareSync(userData.password, createdUser.password)).toBe(true);
    })

    // test("returns an error if required fields are missing", async () => {
    //   const response = await request(app).post("/api/v1/signup").send({});

    //   expect(response.status).toBe(400);
    //   expect(response.body.status).toBe("failed");
    //   expect(response.body.error).toBeDefined();
    // });
  });


  describe("GET /api/v1/users", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/v1/users");
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe("POST /api/v1/login", () => {
    test("logs in a user with valid credentials", async () => {
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        
      };
      const user = await userModel.create(userData);

      const response = await request(app)
        .post("/api/v1/login")
        .send({ email: userData.email, password: userData.password });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.token).toBeDefined();
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.email).toBe(userData.email);
    });

    test("returns an error if email or password is incorrect", async () => {
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };
      await userModel.create(userData);

      const response = await request(app)
        .post("/api/v1/login")
        .send({ email: userData.email, password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("failed");
      expect(response.body.message).toBeDefined();
    });
  });

  describe("GET /api/v1/users", () => {
    test("returns a list of all users", async () => {
      // const userData1 = {
      //   name: "John Doe",
      //   email: "johndoe@example.com",
      //   password: "password123",
      // };
      // const userData2 = {
      //   name: "Jane Doe",
      //   email: "janedoe@example.com",
      //   password: "password123",
      // };
      // await userModel.create(userData1);
      // await userModel.create(userData2);

      const response = await request(app).get("/api/v1/users");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.users).toBeDefined();
      expect(response.body.data.users.length).toBe(2);
    });
  });



});


