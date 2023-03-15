import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../customError/CustomError.js";
import { type CustomRequest } from "../../controllers/dronesController/types.js";
import { type CustomJwtPayload } from "./types.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authoriation");

    if (!authHeader) {
      throw new Error("No authorization header was provided");
    }

    if (!authHeader.startsWith("Bearer")) {
      throw new Error("No authorization bearer was provided");
    }

    const token = authHeader.replace(/^Bearer\s*/, "");

    const { sub: creator } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.creator = creator;

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token"
    );
    next(tokenError);
  }
};

export default auth;
