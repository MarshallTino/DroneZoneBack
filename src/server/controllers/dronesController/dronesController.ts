import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../customError/CustomError.js";
import { Drone } from "../../../database/models/droneSchema.js";

export const getDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drones = await Drone.find().exec();

    res.status(200).json({ drones });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Internal server error"
    );
    next(customError);
  }
};

export default getDrones;
