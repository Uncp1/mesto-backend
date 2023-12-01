import { StatusCodes } from 'http-status-codes';

class NotFoundError extends Error {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
    (this.message = message), (this.statusCode = StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
