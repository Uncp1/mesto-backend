import { NextFunction, Request, Response } from "express";
import getErrorData from "../helpers/get-error-data";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = getErrorData(err);
  const { statusCode = 500 } = res;
  res.status(statusCode).send({ message: errorMessage });

  next();
};

export default errorHandler;
