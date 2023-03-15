import { Router } from "express";
import { getDrones } from "../../controllers/dronesController/dronesController";

const dronesRouter = Router();

dronesRouter.get("/", getDrones);

export default dronesRouter;
