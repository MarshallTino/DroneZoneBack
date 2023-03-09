import option from "./cors.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  notFoundError,
  generalError,
} from "../middlewares/errorMiddleware/errorMiddleware.js";
import userRouter from "./routers/userRouter/userRouter.js";

const app = express();

app.use(cors(option));
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use(notFoundError);
app.use(generalError);

export default app;
