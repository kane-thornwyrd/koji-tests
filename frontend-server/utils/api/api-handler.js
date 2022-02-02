import { errorHandler, aclActivator } from ".";

function apiHandler(handler) {
  return async (req, res) => {
    try {
      // We check the ACL…
      await aclActivator(req, res);
      // Now that everything is okay, we can let the handler answer…
      await handler(req, res);
    } catch (err) {
      // Huh huh, something went wrong, no prob, we handle that too.
      errorHandler(err, res);
    }
  };
}

export { apiHandler };
