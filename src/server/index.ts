import cors from "cors";
import express from "express";
import morgan from "morgan";
import { option } from "yargs";

const app = express();

app.use(cors(option));
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

export default app;
