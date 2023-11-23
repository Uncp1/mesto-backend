import { isCelebrateError } from "celebrate";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

type getStatusCodeOptions = {
  err: Error & { status?: string; statusCode?: string };
  res: Response;
};
const isErrorStatusCode = (statusCode: number): boolean =>
  statusCode >= 400 && statusCode < 600;
const getStatusCode = (options: getStatusCodeOptions): number => {
  const { err, res } = options;
  const statusCodeFromError = err.status || err.statusCode;

  if (isCelebrateError(err)) {
    return StatusCodes.BAD_REQUEST;
  }

  if (statusCodeFromError && isErrorStatusCode(+statusCodeFromError)) {
    return +statusCodeFromError;
  }

  const statusCodeFromResponse = res.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }

  return StatusCodes.INTERNAL_SERVER_ERROR;
};

export default getStatusCode;
