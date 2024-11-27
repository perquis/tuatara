import { Router } from "express";

const healthcheckRouter = Router();

healthcheckRouter.get("/", (_req, res) => {
  res.send("OK");
});

export { healthcheckRouter as healthcheck };
