import { type Request, type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import CustomError from "../../../customError/CustomError.js";
import { type CreatorRequest, type CustomRequest } from "../../../types.js";
import auth from "./auth.js";

const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

describe("Given an auth middleware", () => {
  describe("When it receives a request with no authorization token", () => {
    test("Then it should throw a new error with status 401 and message 'No authorization header was provided'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue(undefined),
      };
      const expectedStatus = 401;
      const expectedError = new CustomError(
        "No authorization header was provided",
        expectedStatus,
        "Missing token"
      );

      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CreatorRequest, res as Response, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request that doesn't beggin with 'Bearer'", () => {
    test("Then it should throw a new error with status 401 and message 'No author'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue("marshallsito"),
      };
      const expectedStatus = 401;
      const expectedError = new CustomError(
        "No authorization bearer was provided",
        expectedStatus,
        "Missing token"
      );

      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CreatorRequest, res as Response, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with a valid authorization header and the bearer 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA3MjllMjMwNGM4NzI4ZGEwYTY3OWEiLCJlbWFpbCI6Im1hcmNlbG1hcnRpbm8yMDUzQGdtYWlsLmNvbSIsImlhdCI6MTY3ODg3OTIyMH0._plNH9CxxjPl3x7p-MHjPFvU2LPvBP7_O8FJRpX952o'", () => {
    test("Then it should add the property creator and the token to the request invokng next", () => {
      const req: Partial<CustomRequest> = {};
      req.header = jest
        .fn()
        .mockReturnValueOnce(
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA3MjllMjMwNGM4NzI4ZGEwYTY3OWEiLCJlbWFpbCI6Im1hcmNlbG1hcnRpbm8yMDUzQGdtYWlsLmNvbSIsImlhdCI6MTY3ODg3OTIyMH0._plNH9CxxjPl3x7p-MHjPFvU2LPvBP7_O8FJRpX952o"
        );

      const creator = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValueOnce({ sub: creator });

      auth(req as CreatorRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("creator", creator);
    });
  });
});
