import { CustomErrorHandler, JwtService } from "../services/index.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(CustomErrorHandler.unAuthorized());

  const access_token = authHeader.split(" ")[1];

  try {
    const { _id } = JwtService.verify(access_token);

    req.user = { _id };
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};
