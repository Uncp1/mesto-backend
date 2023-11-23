import { STATUS_CODES } from "http";
class BadRequestError extends Error {
  statusCode = STATUS_CODES[400];

  constructor(message: string) {
    super(message);
    (this.message = message), (this.statusCode = STATUS_CODES[400]);
  }
}

export default BadRequestError;
