import { RequestHandler } from "express";
import { ZodObject } from "zod";

const validateRequest = (validationSchema: ZodObject<any>): RequestHandler => {
  return (req, res, next) => {
    try {
      validationSchema.parse(req.body);
      next()
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
