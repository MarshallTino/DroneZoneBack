import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import CustomError from "../../../customError/CustomError.js";
const debug = createDebug("dronezone-api:middlewares");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);
  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};
