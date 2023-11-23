import { STATUS_CODES } from "http";
class AuthenticationError extends Error {
  statusCode = STATUS_CODES[401];

  constructor(message: any) {
    super(message);
    (this.message = message), (this.statusCode = STATUS_CODES[401]);
  }
}

export default AuthenticationError;
