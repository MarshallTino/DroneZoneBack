import { Router } from "express";
import {
  deleteDrone,
  getDrones,
  getUserDrones,
} from "../../controllers/dronesController/dronesController.js";
import auth from "../../middlewares/auth/auth.js";

const dronesRouter = Router();

dronesRouter.get("/", getDrones);
dronesRouter.get("/user-drones", auth, getUserDrones);
dronesRouter.delete("/delete/:droneId", auth, deleteDrone);

export default dronesRouter;
