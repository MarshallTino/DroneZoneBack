import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/userSchema";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type UserCredentials } from "../../Controllers/userControllers/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../..";
import CustomError from "../../../customError/CustomError";
let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDatabase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST at the '/user/login' endpoint", () => {
  const loginRoute = "/user/login";
  const mockUser: UserCredentials = {
    email: "marcelmartino2053@gmail.com",
    password: "MarshallTino",
  };

  describe("When it receives a request with username 'marcelmartino2053@gmail.com' and password 'MarshallTino'", () => {
    test("Then it should respond with a status 200 and with an object in its body with a property 'token'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "ffiajdieinjggggggaaaawd",
      }));

      const expectedStatus = 200;
      const hashedPassword = await bcrypt.hash(mockUser.password, 10);

      await User.create({
        ...mockUser,
        password: hashedPassword,
        username: "Marshall",
        email: "marcelmartino2053@gmail.com",
      });

      const response = await request(app)
        .post(loginRoute)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with the email 'marshall@gmail.com' and password 'goodToKnow' that dont't exist in the database", () => {
    test("Then it should call its next method with a custom error", async () => {
      const expectedError = new CustomError(
        "The entered credentials are invalid",
        401,
        "The entered credentials are invalid"
      );
      const expectedStatus = 401;

      const response = await request(app)
        .post(loginRoute)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "error",
        expectedError.publicMessage
      );
    });
  });
});