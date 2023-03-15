import { Router } from "express";
import {
  getDrones,
  getUserDrones,
} from "../../controllers/dronesController/dronesController.js";
import auth from "../../middlewares/auth/auth.js";

const dronesRouter = Router();

dronesRouter.get("/", getDrones);
dronesRouter.get("/userDrones", auth, getUserDrones);

export default dronesRouter;
