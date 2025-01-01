import { NextFunction, Request, RequestHandler, Response } from "express";
import { z, ZodObject } from "zod";

export default (validateSchema: ZodObject<any>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validateSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
