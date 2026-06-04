import ApiException from "../models/ApiException.js";

const globalErrorHandler = (err, req, res, next) => {
  console.log("Stack trace: ", err.stack);

  const status = err.status || 500;

  res.status(status).json({
    status: "error",
    message: err.message || "An unexpected error occurred"
  })
}

export default globalErrorHandler;