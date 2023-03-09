import "../loadEnvironments.js";
import type cors from "cors";

const apiUrl = process.env.API_URL!;
const port = process.env.PORT!;
const netlifyUrl = process.env.NETLIFY_URL!;

const allowedOrigins = [
  `http://localhost:${port}`,
  apiUrl,
  `http://localhost:3000`,
  netlifyUrl,
];

const option: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default option;
