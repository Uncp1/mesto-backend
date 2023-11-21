class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    (this.message = message), (this.statusCode = 404);
  }
}

export default BadRequestError;
