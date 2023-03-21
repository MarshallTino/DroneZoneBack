import { type NextFunction, type Response } from "express";
import CustomError from "../../../customError/CustomError";
import { mockDroneCreate } from "../../../mocks/mocks";
import { type CreateDroneSharp, type CustomRequest } from "../../../types";
import optimizing from "./imageOptimizing";

beforeEach(() => jest.clearAllMocks());

let mockImageFile = jest.fn();

jest.mock("path");

jest.mock("sharp", () => () => ({
  resize: jest.fn().mockReturnValue({
    webp: jest.fn().mockReturnValue({
      toFormat: jest.fn().mockReturnValue({ toFile: mockImageFile }),
    }),
  }),
}));

const next = jest.fn() as NextFunction;

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const res = {} as Response;

const droneImage: Partial<Express.Multer.File> = {
  filename: "droneImage.webp",
  originalname: "droneImages",
};
const schemaImage: Partial<Express.Multer.File> = {
  filename: "schemaImage.webp",
  originalname: "droneImages",
};
const motorImage: Partial<Express.Multer.File> = {
  filename: "motorImage.webp",
  originalname: "droneImages",
};
const frameImage: Partial<Express.Multer.File> = {
  filename: "frameImage.webp",
  originalname: "droneImages",
};
const escImage: Partial<Express.Multer.File> = {
  filename: "escImage.webp",
  originalname: "droneImages",
};
const cameraImage: Partial<Express.Multer.File> = {
  filename: "cameraImage.webp",
  originalname: "droneImages",
};
const vtxImage: Partial<Express.Multer.File> = {
  filename: "vtxImage.webp",
  originalname: "droneImages",
};
const propellerImage: Partial<Express.Multer.File> = {
  filename: "propellerImage.webp",
  originalname: "droneImages",
};
const controllerImage: Partial<Express.Multer.File> = {
  filename: "controllerImage.webp",
  originalname: "droneImages",
};
const batteryImage: Partial<Express.Multer.File> = {
  originalname: "droneImages",
  filename: "batteryImage.webp",
};
const vtxAntennaImage: Partial<Express.Multer.File> = {
  originalname: "droneImages",
  filename: "vtxAntennaImage.webp",
};
const receiverImage: Partial<Express.Multer.File> = {
  originalname: "droneImages",
  filename: "receiverImage.webp",
};

const files = [
  droneImage,
  schemaImage,
  motorImage,
  frameImage,
  escImage,
  cameraImage,
  vtxImage,
  propellerImage,
  controllerImage,
  batteryImage,
  vtxAntennaImage,
  receiverImage,
];

const req: Partial<CreateDroneSharp> = {
  files: files as Express.Multer.File[],
};

describe("Given an optimizing middleware", () => {
  describe("When it receives a request with images", () => {
    test("Then it should call its next method and put the optimized images to the request", async () => {
      const expectedImageNames = ["droneImage.webp.webp", "image2.webp"];

      await optimizing(req as CreateDroneSharp, res, next);

      expect(req.files![0].filename).toBe(expectedImageNames[0]);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request without images", () => {
    test("Then it should call its next method with an error", async () => {
      const newError = new CustomError(
        "Error optimizing the provided images",
        400,
        "Error optimizing the provided images"
      );

      mockImageFile = jest.fn().mockRejectedValue(undefined);

      await optimizing(req as CreateDroneSharp, res, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
