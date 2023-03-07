import "./loadEnv.js";
import startServer from "./server/startServer.js";
import "./server/index.js";

const port = process.env.PORT ?? 4000;
startServer(+port);
