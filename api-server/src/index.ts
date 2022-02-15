import helmet from "helmet"
import express, { Application } from "express"
import bodyParser from "body-parser"
import compression from "compression"

import config from "./config"
import createRoutes from "./routes"
import {middlewares, middlewaresConfigs} from "./middlewares"

const {
  port,
  host,
  apiVersion,
} = config

console.log(`${host}:${port}`);

const routes = createRoutes(config, middlewaresConfigs)

express()
  .use(bodyParser.urlencoded({ extended: false, limit: "12mb" }))
  .use(bodyParser.json({ limit: "12mb" }))
  .use(compression())
  .use(helmet())
  .use(`/${apiVersion}`, routes)
  .use("*", middlewares.UnsupportedEndpointHandler)
  .use("/", middlewares.UnsupportedEndpointHandler)
  .use(middlewares.GlobalErrorHandler)
  .listen(parseInt(port.toString()), host)
