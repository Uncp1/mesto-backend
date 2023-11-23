import { NextFunction, Request, Response } from "express";
import getErrorData from "../helpers/get-error-data";
import getStatusCode from "../helpers/get-error-code";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = getStatusCode({ err, res });
  const errorMessage = getErrorData(err);
  res.status(statusCode).send({ message: errorMessage });

  next();
};

export default errorHandler;
