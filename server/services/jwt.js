import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/index.js";

export default class JwtService {
  static sign(payload, expiry = "1d", secret = JWT_ACCESS_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = JWT_ACCESS_SECRET) {
    return jwt.verify(token, secret);
  }
}
