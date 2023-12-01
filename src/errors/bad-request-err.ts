import { StatusCodes } from 'http-status-codes';

class BadRequestError extends Error {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    (this.message = message), (this.statusCode = StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
