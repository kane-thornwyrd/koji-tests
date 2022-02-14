const pkg = require("../package.json")

const { env } = process

export interface ServerConfig {
  name: string,
  apiVersion: string,
  version: string,
  host: string,
  port: string | number,
  isProduction: boolean
}

const config: ServerConfig = {
  name: pkg.name,
  apiVersion: `v${pkg.version.split(".")[0]}${pkg.version.split(".")[1]}`,
  version: pkg.version,
  host: env.HOSTNAME ?? "localhost",
  port: env.PORT ?? 8080,
  isProduction: env.NODE_ENV === "production"
}

export default config
