import { type NextFunction, type Response } from "express";
import path from "node:path";
import sharp from "sharp";
import CustomError from "../../../customError/CustomError.js";
import { type CreateDroneSharp } from "../../../types";
const optimizing = async (
  req: CreateDroneSharp,
  res: Response,
  next: NextFunction
) => {
  try {
    const optimizedFiles: Express.Multer.File[] = await Promise.all(
      req.files.map(async (file) => {
        const { originalname } = file;
        const { filename } = file;
        const basePath = `${path.basename(
          originalname,
          path.extname(originalname)
        )}`;
        await sharp(path.join("droneImages", filename))
          .resize(350, 200, { fit: "cover" })
          .webp({ quality: 100 })
          .toFormat("webp")
          .toFile(path.join("droneImages", `${filename}.webp`));

        file.originalname = `${basePath}.webp`;
        file.filename = `${filename}.webp`;

        return file;
      })
    );

    req.files = optimizedFiles;

    next();
  } catch (error) {
    const newError = new CustomError(
      "Error optimizing the provided images",
      400,
      "Error optimizing the provided images"
    );
    next(newError);
  }
};

export default optimizing;
