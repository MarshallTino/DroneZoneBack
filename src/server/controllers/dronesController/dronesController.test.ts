import { type NextFunction, type Request, type Response } from "express";
import { Drone } from "../../../database/models/droneSchema";
import { mockDrones } from "../../../mocks/mocks";
import { getDrones, getUserDrones } from "./dronesController";
import { type CustomRequest } from "./types";

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockResolvedValue({}),
};

const next: NextFunction = jest.fn();

describe("Given a get drones on the dronesController ", () => {
  describe("When it receives a response", () => {
    test("Then it should call the status 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockDrones),
      };

      const expectedStatusCode = 200;

      Drone.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockDrones),
      }));

      await getDrones(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When the token or database or another error is thrown", () => {
    test("Then it should call its next method passing that error", async () => {
      const error = new Error("Hey");

      Drone.find = jest.fn().mockImplementationOnce(() => {
        throw new Error("Hey");
      });

      await getDrones(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a get at the getUserDrones controller", () => {
  describe("When it receives a response", () => {
    test("Then it shoul call its status method with the code 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockDrones),
      };

      req.body = { creator: "243423djjj2i2k3444" };
      const expectedStatus = 200;

      Drone.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({ creator: "243423djjj2i2k3444" }),
      }));

      await getUserDrones(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its status method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockDrones),
      };

      req.params = { creator: "243423djjj2i2k3444" };

      Drone.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockDrones),
      }));

      await getUserDrones(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ userDrones: mockDrones });
    });
  });

  describe("When the token or database or another error is thrown", () => {
    test("Then it should call its next method passing that error", async () => {
      const error = new Error("Bad request");

      Drone.find = jest.fn().mockImplementationOnce(() => {
        throw new Error("Bad request");
      });

      await getUserDrones(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
