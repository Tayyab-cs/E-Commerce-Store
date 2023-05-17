const errorHandling = (message, name) => {
  let error = new Error();
  error.message = message ? message : "some thing went wrong";
  error.name = name ? name : "";
  return error;
};
export { errorHandling };
