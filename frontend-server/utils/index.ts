import type { NextApiResponse } from 'next'
import { serialize, CookieSerializeOptions } from 'cookie'
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

export const setCookieBuilder = (res: NextApiResponse) => (
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  if (!('sameSite' in options)) options["sameSite"] = "none";
  if (!('secure' in options)) options.secure = true;

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}