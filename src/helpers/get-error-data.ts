import { StatusCodes } from 'http-status-codes';

const splitError = (error: Error, part: number): string =>
  error.toString().split(':')[part].trim();

const getErrorBody = (error: Error): string => {
  if (error.stack && process.env.NODE_ENV === 'development') {
    return error.stack;
  }
  return '';
};

const getErrorData = (error: Error, statusCode: number) => {
  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    return {
      name: 'Server Error',
      message: 'На сервере произошла ошибка',
      body: getErrorBody(error),
    };
  }

  return {
    name: splitError(error, 0),
    message: splitError(error, 1),
    body: getErrorBody(error),
  };
};

export default getErrorData;
