import { errorHandler, aclHandler } from ".";

function apiHandler(handler) {
  return async (req, res) => {
    try {
      await aclHandler(req, res);
      await handler(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}

export { apiHandler };
