import createDebug from "debug";
import { type Express } from "express";
import type CustomError from "../customError/CustomError.js";

const debug = createDebug("dronezone-api:server");

const startServer = async (port: number, app: Express) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      const errorMessage = "Error on starting the server";

      if (error.code === "EADDRINUSE") {
        debug(errorMessage, `The port  ${port} is already in use`);
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
