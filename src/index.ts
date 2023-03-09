import "./loadEnvironments.js";

import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";
import createDebug from "debug";
import app from "./server/index.js";

const debug = createDebug("dronezone-api:server");

const mongoDbUrl = process.env.MONGODB_URL!;
const port = process.env.PORT ?? 4000;
try {
  await connectDatabase(mongoDbUrl);

  await startServer(+port, app);
  debug(`Server listening on port ${port}`);
} catch (error) {
  debug(error.message);
}
