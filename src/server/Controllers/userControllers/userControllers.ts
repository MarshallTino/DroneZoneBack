import "../../../loadEnvironments.js";
import { type Request, type NextFunction, type Response } from "express";
import User from "../../../database/models/userSchema.js";
import { type UserCredentials } from "./types";
import bcrypt from "bcryptjs";
import CustomError from "../../../customError/CustomError.js";
import jwt from "jsonwebtoken";

export const login = async (
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

    if (!user) {
      const customError = new CustomError(
        "No user found.",
        401,
        "The entered credentials are invalid"
      );
      next(customError);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "The password is incorrect.",
        401,
        "The entered credentials are invalid"
      );
      next(customError);
      return;
    }

    const jwtPayload = {
      sub: user?._id,
      email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default login;
