import { STATUS_CODES } from "http";
class NotFoundError extends Error {
  statusCode = STATUS_CODES[404];

  constructor(message: string) {
    super(message);
    (this.message = message), (this.statusCode = STATUS_CODES[404]);
  }
}

export default NotFoundError;
