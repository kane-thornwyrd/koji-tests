const responses = {
  UnauthorizedError: (err, res) =>
    res.status(401).json({ message: "Invalid Token" }),
};

const errorHandler = (err, res) =>
// Why loving JS ? Because the language evolve and allow such tricks, I LOVE IT !
  responses[err.name]?.(err, res) ??
  res.status(500).json({ message: err.message });

export { errorHandler };
