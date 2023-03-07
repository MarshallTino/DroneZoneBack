import type cors from "cors";
import "../loadEnv.js";

const apiUrl = process.env.API_URL!;
const port = process.env.PORT!;

const allowedOrigins = [`http://localhost:${port}`, apiUrl];

const option: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default option;
