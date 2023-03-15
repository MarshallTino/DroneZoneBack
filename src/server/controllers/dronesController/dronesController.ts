import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../customError/CustomError.js";
import { Drone } from "../../../database/models/droneSchema.js";
import { type CustomRequest } from "./types.js";

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

export const getUserDrones = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDrones = await Drone.find({ creator: req.creator }).exec();

    res.status(200).json({ userDrones });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      400,
      "Couldn't retrieve user's Drones"
    );

    next(customError);
  }
};
