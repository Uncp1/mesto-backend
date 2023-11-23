import { StatusCodes } from "http-status-codes";
class AuthenticationError extends Error {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: any) {
    super(message);
    (this.message = message), (this.statusCode = StatusCodes.UNAUTHORIZED);
  }
}

export default AuthenticationError;
