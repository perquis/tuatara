import { HttpExceptionError } from "@/libs/errors/http-exception-error";
import { NextFunction, Request, Response } from "express";

export const notFound = (_req: Request, _res: Response, _next: NextFunction) => {
  throw new HttpExceptionError("Not found", 404);
};
