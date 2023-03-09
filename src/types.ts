import { type Request } from "express";
import { type UserCredentials } from "./server/Controllers/userControllers/types";

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
