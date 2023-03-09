import "../loadEnvironments.js";
import type cors from "cors";

const apiUrl = process.env.API_URL!;
const port = process.env.PORT!;
const netlifyUrl = process.env.NETLIFY_URL!;
const localHostUrl = process.env.LOCAL_HOST_URL!;

const allowedOrigins = [
  `http://localhost:${port}`,
  apiUrl,
  localHostUrl,
  netlifyUrl,
];

const option: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default option;
