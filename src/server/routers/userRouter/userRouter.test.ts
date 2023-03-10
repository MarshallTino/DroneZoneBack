import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/userSchema";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  type RegisterUserCredentials,
  type UserCredentials,
} from "../../Controllers/userControllers/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../..";
import CustomError from "../../../customError/CustomError";
import mongoose from "mongoose";
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

  describe("When it receives a request with email 'marcelmartino2053@gmail.com' and password 'MarshallTino'", () => {
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

  describe("When it receives a request with the email 'marcelmartino2053@gmail.com' and password 'goodToKnow' that dont't exist in the database", () => {
    test("Then it should call its next method with a custom error", async () => {
      const expectedError = new CustomError(
        "No user found.",
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

    describe("When it receives a request with the email 'marcelmartino2053@gmail.com' and password 'goodToKnow' that dont't exist in the database", () => {
      test("Then it should call its next method with a custom error", async () => {
        await User.create({
          ...mockUser,
          password: "goodToKnow",
          username: "Marshall",
          email: "marcelmartino2053@gmail.com",
        });

        const expectedError = new CustomError(
          "The password is incorrect.",
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
});

describe("Given a POST at the '/user/register' endpoint", () => {
  const loginRoute = "/user/register";
  const mockUser: RegisterUserCredentials = {
    email: "marcel@gmail.com",
    password: "marcelmartino",
    username: "Hellothere",
  };

  describe("When it receives a request with email 'marcel@gmail.com' and password 'marcelmartino' and the username 'Hellothere'", () => {
    test("Then it should respond with a status 201 and with an object in its body with a property 'user'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "ffiajdieinjggggggaaaawd",
      }));

      const expectedStatus = 201;

      const response = await request(app)
        .post(loginRoute)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toBe("The user has been created");
    });
  });

  describe("When it receives a request with email 'marcel@gmail.com' that already exists and password 'marcelmartino' and the username 'Hellothere'", () => {
    test("Then it should respond with a status 409 and with an object in its body with a property 'user'", async () => {
      await User.create({
        ...mockUser,
        password: "marcelmartino",
        username: "Hellothere",
        email: "marcel@gmail.com",
      });

      const expectedStatus = 409;

      const response = await request(app)
        .post(loginRoute)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("When it receives a request with email 'marcel@gmail.com' and password 'marcelmartino' and the username that already exists 'Hellothere'", () => {
    test("Then it should respond with a status 409 and with an object in its body with a property 'error'", async () => {
      await User.create({
        ...mockUser,
        password: "marcelmartino",
        username: "Hellothere",
        email: "marcelus@gmail.com",
      });

      const expectedStatus = 409;

      const response = await request(app)
        .post(loginRoute)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error");
    });
  });
});
