import controllers from "@/controllers";
import { Router } from "express";
import "express-async-errors";

export const v1 = Router();

v1.use("/installments", controllers.installments);
