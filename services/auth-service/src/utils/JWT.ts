import jwt from "jsonwebtoken";
import ENV from "../config/ENV";

export default {
  getToken: <T extends string | object | Buffer>(data: T, expiresIn = "1h") => {
    const token = jwt.sign(data, ENV.JWT_SECRET, {
      expiresIn,
    });
    return token;
  },
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, ENV.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },
};
