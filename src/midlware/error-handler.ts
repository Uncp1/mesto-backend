import { NextFunction, Request, Response } from "express";
import getErrorData from "../helpers/get-error-data";
import { STATUS_CODES } from "http";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = getErrorData(err);
  const { statusCode = STATUS_CODES[500] } = res;
  res.status(Number(statusCode)).send({ message: errorMessage });

  next();
};

export default errorHandler;
