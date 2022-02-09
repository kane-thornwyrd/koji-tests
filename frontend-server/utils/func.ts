import { createHash } from "crypto";
import { inspect } from "util";

export function asSingleton(target) {
  const hash = createHash("sha256");
  const globalName = "__" + target.name;
  return (...args) => {
    hash.update(
      args
        .map(
          inspect.bind(args, {
            showHidden: true,
          })
        )
        .join("-----")
    );

    const argsHashed = hash.digest("hex");

    if (!global[globalName + argsHashed]) {
      global[globalName + argsHashed] = target.bind(target, ...args);
    }

    return global[globalName + argsHashed];
  };
}
