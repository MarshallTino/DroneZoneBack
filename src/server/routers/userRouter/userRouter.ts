import { Router } from "express";
import { validate } from "express-validation";
import login from "../../Controllers/userControllers/userControllers.js";
import loginUserSchema from "../../schemas/loginUserSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  login
);

export default userRouter;
