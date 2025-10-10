const errorHandler = (err, req, res, next) => {
  console.error("Error caught by middleware:", err.stack);

  const statusCode = res.statusCode != 200 ? statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server fault.",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
