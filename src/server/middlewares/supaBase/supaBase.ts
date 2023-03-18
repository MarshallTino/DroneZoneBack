import "../../../loadEnvironments.js";
import { createClient } from "@supabase/supabase-js";
import {
  type DroneImages,
  type UploadedFile,
  type CustomRequestCreateDrone,
} from "../../../types.js";
import path from "path";
import fs from "fs/promises";
import { type Response, type NextFunction } from "express";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

const supaBase = async (
  req: CustomRequestCreateDrone,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadFile = async (
      file: Express.Multer.File
    ): Promise<UploadedFile> => {
      await supabase.storage
        .from("drones")
        .upload(
          file.filename,
          await fs.readFile(path.join("droneImages", file.filename))
        );
      const { data: publicUrl } = supabase.storage
        .from("drones")
        .getPublicUrl(file.filename);
      return publicUrl;
    };

    const uploadFiles = async (files: Express.Multer.File[]) => {
      const uploadPromises = files.map(async (file) => uploadFile(file));
      return Promise.all(uploadPromises);
    };

    const files = Object.values(req.files);
    const uploadedFileUrls = await uploadFiles(req.files);
    const droneImages: DroneImages = {};

    files.forEach((file, i) => {
      droneImages[file.fieldname] = uploadedFileUrls[i].publicUrl;
    });

    req.body.droneImage = droneImages.droneImage;
    req.body.schemaImage = droneImages.schemaImage;
    req.body.motorImage = droneImages.motorImage;
    req.body.frameImage = droneImages.frameImage;
    req.body.escImage = droneImages.escImage;
    req.body.cameraImage = droneImages.cameraImage;
    req.body.vtxImage = droneImages.vtxImage;
    req.body.propellerImage = droneImages.propellerImage;
    req.body.controllerImage = droneImages.controllerImage;
    req.body.batteryImage = droneImages.batteryImage;
    req.body.vtxAntennaImage = droneImages.vtxAntennaImage;
    req.body.receiverImage = droneImages.receiverImage;

    next();
  } catch (error) {
    const customError = new Error("Failed to upload the images");

    next(customError);
  }
};

export default supaBase;
