import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const zodValidations =
  (schema: ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
