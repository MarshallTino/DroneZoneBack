import "./loadEnv.js";
import startServer from "./server/startServer.js";
import "./server/index.js";
import connectDatabase from "./database/connectDatabase.js";

const mongoDbUrl = process.env.MONGODB_URL!;
const port = process.env.PORT ?? 4000;

await connectDatabase(mongoDbUrl);
startServer(+port);
