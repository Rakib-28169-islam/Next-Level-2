import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodError } from "../utils/ErrorFormatter";

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      
      return res.status(400).json(formatZodError(result.error));
    } 
    else {
      req.body = result.data;
      next();
    }
  };
};
