import "../../../loadEnvironments.js";
import { type Request, type NextFunction, type Response } from "express";
import User from "../../../database/models/userSchema";
import { type UserCredentials } from "./types";
import bcrypt from "bcryptjs";
import CustomError from "../../../customError/CustomError";
import jwt from "jsonwebtoken";

export const loginController = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userToFind = email.toString();

  try {
    const user = await User.findOne({ email: userToFind }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "The entered credentials are invalid",
        401,
        "The entered credentials are invalid"
      );
      next(customError);
    }

    const jwtPayload = {
      sub: user?._id,
      email: user?.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginController;
