import { type JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}
