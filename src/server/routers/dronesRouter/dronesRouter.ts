import multer from "multer";
import { Router } from "express";
import crypto from "crypto";
import {
  createDrone,
  deleteDrone,
  getDrones,
  getUserDrones,
} from "../../controllers/dronesController/dronesController.js";
import auth from "../../middlewares/auth/auth.js";
import supaBase from "../../middlewares/imageUpload/imageUpload.js";
import optimizing from "../../middlewares/imageoptimizing/imageOptimizing.js";

const dronesRouter = Router();

const storage = multer.diskStorage({
  destination: "droneImages/",
  filename(req, file, callback) {
    const separatedNameExtension = file.mimetype.split("/");
    const extension = separatedNameExtension[separatedNameExtension.length - 1];
    const uniqueSuffix = crypto.randomUUID();
    callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 6000000,
  },
});

dronesRouter.get("/", getDrones);
dronesRouter.get("/user-drones", auth, getUserDrones);
dronesRouter.delete("/delete/:droneId", auth, deleteDrone);
dronesRouter.post(
  "/create-drone",
  auth,
  upload.any(),
  optimizing,
  supaBase,
  createDrone
);

export default dronesRouter;
