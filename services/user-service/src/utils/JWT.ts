import jwt from "jsonwebtoken";
import ENV from "./../config/index";
import { JWT_TOKEN_PAYLOAD } from "../types/utils";
export default {
  generateToken: (info: any | JWT_TOKEN_PAYLOAD) => {
    return jwt.sign(info, ENV.JWT_SECRET);
  },
};
