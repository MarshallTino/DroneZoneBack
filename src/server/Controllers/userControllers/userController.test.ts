import { type UserCredentials } from "./types";
import { type NextFunction, type Request, type Response } from "express";
import login from "./userControllers";
import User from "../../../database/models/userSchema";
import CustomError from "../../../customError/CustomError";
import { type CustomRequest } from "../../../types";

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
    test("Then it should call its next method with status 401 and the message 'The entered credentials are invalid'", async () => {
      const expectedError = new CustomError(
        "The entered credentials are invalid",
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
