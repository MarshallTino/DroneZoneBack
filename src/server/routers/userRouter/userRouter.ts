import { Router } from "express";
import login from "../../Controllers/userControllers/userControllers.js";

const userRouter = Router();

userRouter.post("/login", login);

export default userRouter;
