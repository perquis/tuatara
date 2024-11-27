import { HttpExceptionError } from "@/libs/errors/http-exception-error";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const error = (err: HttpExceptionError | ZodError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: err.errors,
    });

    return;
  }

  if (err instanceof HttpExceptionError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
