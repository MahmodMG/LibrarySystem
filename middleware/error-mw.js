module.exports = (error, req, res, next) => {
  const errorStatus = error.status || 500;
  const message = error + "" || "internal server error";
  res.status(errorStatus).json({ message });
};
