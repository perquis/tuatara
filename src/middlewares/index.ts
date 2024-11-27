import { error } from "@/middlewares/error";
import { isAuthenticated } from "@/middlewares/is-authenticated";
import { notFound } from "@/middlewares/not-found";
import { zodValidations } from "@/middlewares/zod-validations";

const middlewares = {
  zodValidations,
  isAuthenticated,
  notFound,
  error,
};

export default middlewares;
