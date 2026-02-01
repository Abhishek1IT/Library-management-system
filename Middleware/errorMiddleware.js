const errorMiddleware = (err, req, res, next) => {

  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Server Error";

  // invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // duplicate key (email, isbn etc)
if (err.code === 11000) {
  statusCode = 400;
  message = "Duplicate field value";
}

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }
  // Token Expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please login again";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorMiddleware;
