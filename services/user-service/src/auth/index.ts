import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import ENV from "../config";

const ROUTE_AUTH = (allowedRoles: string[]): RequestHandler => {
  return (req: any, res: any, next: any) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      // Verify the token using the secret key from environment
      const decoded = jwt.verify(token, ENV.JWT_SECRET || "");
      req.user = decoded; // Attach user data to request object

      // Check if the user has the required role(s)
      if (
        allowedRoles.length &&
        !allowedRoles.includes((decoded as any).role)
      ) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

export default ROUTE_AUTH;
