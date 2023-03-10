import { type Request } from "express";
import {
  type RegisterUserCredentials,
  type UserCredentials,
} from "./server/controllers/userControllers/types";

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type RegisterCustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  RegisterUserCredentials
>;
