import { type RegisterUserCredentials, type UserCredentials } from "./types";
import { type NextFunction, type Request, type Response } from "express";
import User from "../../../database/models/userSchema";
import CustomError from "../../../customError/CustomError";
import bcrypt from "bcryptjs";
import { login, register } from "./userControllers";
import { type CustomRequest } from "../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

export const mockedUser: UserCredentials = {
  email: "marcelmartino2053@gmail.com",
  password: "MarshallTino",
};

describe("Given a login controller", () => {
  describe("When it receives a request with the email 'marcelmartino2053@gmail.com' and the password 'MarshallTino' and the email is not in the database", () => {
    test("Then it should call its next method with status 401 and the message 'No user found.'", async () => {
      const expectedError = new CustomError(
        "No user found.",
        401,
        "The entered credentials are invalid"
      );

      req.body = mockedUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await login(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When the token or database or another error is thrown", () => {
    test("Then it should call its next method passing that error", async () => {
      const error = new Error();

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error),
      }));

      await login(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a registerUser controller", () => {
  const req: Partial<Request> = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When it receives a request with email 'marshall@.com', username 'marshall and password 'marcha'", () => {
    test("Then it should call its status method with code 201 and its json method with the created user", async () => {
      const mockCreateUser: RegisterUserCredentials = {
        username: "aaaaa",
        email: "marshall@.com",
        password: "marcsdasdsdaha",
      };

      const expectedStatusCode = 201;
      const expectedBodyResponse = "The user has been created";

      User.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockReturnValue(undefined),
      }));

      req.body = mockCreateUser;

      bcrypt.hash = jest.fn().mockResolvedValue("asda123hjassdasdascasd123hjk");
      User.create = jest.fn().mockResolvedValue(mockCreateUser);

      await register(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });

  describe("When the token or database or another error is thrown", () => {
    test("Then it should call its next method passing that error", async () => {
      const mockCreateUser: RegisterUserCredentials = {
        username: "aaaaa",
        email: "marshall@.com",
        password: "marcsdasdsdaha",
      };

      const errorMessage = "Internal server error";
      req.body = mockCreateUser;
      User.findOne = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const expectedError = new CustomError(
        errorMessage,
        500,
        "Couldn't create the user"
      );
      await register(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
