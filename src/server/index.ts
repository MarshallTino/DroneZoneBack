import option from "./cors.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import userRouter from "./routers/userRouter/userRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddleware/errorMiddleware.js";
import dronesRouter from "./routers/dronesRouter/dronesRouter.js";

const app = express();

app.use(cors(option));
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/drones", dronesRouter);
app.use(notFoundError);
app.use(generalError);

export default app;
