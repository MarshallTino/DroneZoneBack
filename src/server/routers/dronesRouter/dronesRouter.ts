import { Router } from "express";
import {
  deleteDrones,
  getDrones,
  getUserDrones,
} from "../../controllers/dronesController/dronesController.js";
import auth from "../../middlewares/auth/auth.js";

const dronesRouter = Router();

dronesRouter.get("/", getDrones);
dronesRouter.get("/userDrones", auth, getUserDrones);
dronesRouter.delete("/delete/:droneId", auth, deleteDrones);

export default dronesRouter;
