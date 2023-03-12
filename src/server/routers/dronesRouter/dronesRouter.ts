import { Router } from "express";
import getDrones from "../../controllers/dronesController/dronesController.js";

const dronesRouter = Router();

dronesRouter.get("/", getDrones);

export default dronesRouter;
