const errorObject = (message, name) => {
  const error = new Error();
  error.message = message || 'some thing went wrong';
  error.name = name || '';
  return error;
};

export default errorObject;
