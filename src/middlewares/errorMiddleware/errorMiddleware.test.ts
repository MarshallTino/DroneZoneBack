import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../customError/CustomError";
import { type CustomRequest } from "../../types";
import { generalError, notFoundError } from "./errorMiddleware";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();
describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req as Request, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and a customError", () => {
    test("Then it should call its status method with 500", async () => {
      const expectedStatus = 500;

      const error = new CustomError(
        "Something went wrong",
        expectedStatus,
        "Something went wrong"
      );

      generalError(error, req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a response and an error", () => {
    test("Then it should call its status method with 500", async () => {
      const expectedStatus = 500;

      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
