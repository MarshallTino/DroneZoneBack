import { Router } from "express";
import { validate } from "express-validation";
import {
  login,
  register,
} from "../../controllers/userControllers/userControllers.js";
import loginUserSchema from "../../schemas/loginUserSchema.js";
import registerUserSchema from "../../schemas/registerUserSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  login
);

userRouter.post(
  "/register",
  validate(registerUserSchema, {}, { abortEarly: false }),
  register
);

export default userRouter;
