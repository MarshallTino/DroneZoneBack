import "../../../loadEnvironments.js";
import { type Request, type NextFunction, type Response } from "express";
import User from "../../../database/models/userSchema.js";
import bcrypt from "bcryptjs";
import CustomError from "../../../customError/CustomError.js";
import jwt from "jsonwebtoken";
import { type RegisterUserCredentials, type UserCredentials } from "./types.js";
import { type CustomJwtPayload } from "../../middlewares/auth/types.js";

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
      throw customError;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "The password is incorrect.",
        401,
        "The entered credentials are invalid"
      );
      throw customError;
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user._id.toString(),
      email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    RegisterUserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email, username } = req.body;

    const emailToFind = await User.findOne({ email }).exec();
    const usernameToFind = await User.findOne({ username }).exec();
    if (emailToFind) {
      const customError = new CustomError(
        "The email already exists.",
        409,
        "The email already exists."
      );
      next(customError);
      return;
    }

    if (usernameToFind) {
      const customError = new CustomError(
        "The username already exists.",
        409,
        "The username already exists."
      );
      next(customError);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json("The user has been created");
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't create the user"
    );
    next(customError);
  }
};
