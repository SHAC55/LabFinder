const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
};

export default errorMiddleware;