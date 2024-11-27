import { HttpExceptionError } from "@/libs/errors/http-exception-error";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();

  throw new HttpExceptionError("Unauthorized access", 401);
};
