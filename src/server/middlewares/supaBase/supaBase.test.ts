import { type NextFunction, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import { Drone } from "../../../database/models/droneSchema";
import { mockDroneCreate } from "../../../mocks/mocks";
import {
  type CustomRequest,
  type CustomRequestCreateDrone,
} from "../../../types";
import supaBase, { supabase } from "./supaBase";

afterEach(async () => {
  jest.clearAllMocks();
});

const droneImage: Partial<Express.Multer.File> = { filename: "droneImage.jpg" };
const schemaImage: Partial<Express.Multer.File> = {
  filename: "schemaImage.jpg",
};
const motorImage: Partial<Express.Multer.File> = { filename: "motorImage.jpg" };
const frameImage: Partial<Express.Multer.File> = { filename: "frameImage.jpg" };
const escImage: Partial<Express.Multer.File> = { filename: "escImage.jpg" };
const cameraImage: Partial<Express.Multer.File> = {
  filename: "cameraImage.jpg",
};
const vtxImage: Partial<Express.Multer.File> = { filename: "vtxImage.jpg" };
const propellerImage: Partial<Express.Multer.File> = {
  filename: "propellerImage.jpg",
};
const controllerImage: Partial<Express.Multer.File> = {
  filename: "controllerImage.jpg",
};
const batteryImage: Partial<Express.Multer.File> = {
  filename: "batteryImage.jpg",
};
const vtxAntennaImage: Partial<Express.Multer.File> = {
  filename: "vtxAntennaImage.jpg",
};
const receiverImage: Partial<Express.Multer.File> = {
  filename: "receiverImage.jpg",
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

const mockImagePath = "droneImages/droneImage.jpg";

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
