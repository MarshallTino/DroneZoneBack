import { type NextFunction, type Response } from "express";
import fs from "fs/promises";
import { Drone } from "../../../database/models/droneSchema";
import {
  type CustomRequest,
  type CustomRequestCreateDrone,
} from "../../../types";
import supaBase, { supabase } from "./imageUpload";

afterEach(async () => {
  jest.clearAllMocks();
});

const droneImage: Partial<Express.Multer.File> = {
  filename: "droneImage.webp",
};
const schemaImage: Partial<Express.Multer.File> = {
  filename: "schemaImage.webp",
};
const motorImage: Partial<Express.Multer.File> = {
  filename: "motorImage.webp",
};
const frameImage: Partial<Express.Multer.File> = {
  filename: "frameImage.webp",
};
const escImage: Partial<Express.Multer.File> = { filename: "escImage.webp" };
const cameraImage: Partial<Express.Multer.File> = {
  filename: "cameraImage.webp",
};
const vtxImage: Partial<Express.Multer.File> = { filename: "vtxImage.webp" };
const propellerImage: Partial<Express.Multer.File> = {
  filename: "propellerImage.webp",
};
const controllerImage: Partial<Express.Multer.File> = {
  filename: "controllerImage.webp",
};
const batteryImage: Partial<Express.Multer.File> = {
  filename: "batteryImage.webp",
};
const vtxAntennaImage: Partial<Express.Multer.File> = {
  filename: "vtxAntennaImage.webp",
};
const receiverImage: Partial<Express.Multer.File> = {
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

const mockDrone = new Drone();

const req: Partial<CustomRequest> = {
  body: mockDrone,
  files: files as [Express.Multer.File],
};

const res: Partial<Response> = {};
const next: NextFunction = jest.fn();

const mockImagePath = "droneImages/droneImage.webp";

describe("Given a supaBase middleware function", () => {
  describe("When it receives a request with a 12 files", () => {
    test("Then it should rename the files, upload them to supabase and invoque next", async () => {
      fs.readFile = jest.fn().mockResolvedValueOnce(mockImagePath);

      supabase.storage.from("images").upload = jest.fn();

      supabase.storage.from("images").getPublicUrl = jest
        .fn()
        .mockReturnValueOnce({ data: { pulicUrl: mockImagePath } });

      await supaBase(req as CustomRequestCreateDrone, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it is called with an invalid request", () => {
    test("Then it should catch the error and call next", async () => {
      const req: Partial<CustomRequest> = {};

      await supaBase(req as CustomRequestCreateDrone, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
