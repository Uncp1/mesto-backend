import { JWT_SECRET } from "config";
import AuthenticationError from "errors/auth-err";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthenticationError("Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");
  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new AuthenticationError("Необходима авторизация");
  }

  req.user = payload;

  next();
};
