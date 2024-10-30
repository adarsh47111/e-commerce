import { ZodError } from "zod";
import { NODE_ENV } from "../config/index.js";
import { CustomErrorHandler } from "../services/CustomErrorHandler.js";

export const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  const message =
    NODE_ENV === "development" ? error.message : "Internal Server Error";

  if (error instanceof ZodError) statusCode = 422;

  if (error instanceof CustomErrorHandler) statusCode = error.status;

  console.log("errorHandler", error.stack);

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
