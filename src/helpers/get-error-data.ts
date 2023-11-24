const splitError = (error: Error, part: number): string =>
  error.toString().split(":")[part].trim();

const getErrorBody = (error: Error): string => {
  if (error.stack) {
    return error.stack;
  }
  return "";
};

const getErrorData = (error: Error, statusCode: number) => {
  if (statusCode === 500) {
    return {
      name: "Server Error",
      message: "На сервере произошла ошибка",
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
