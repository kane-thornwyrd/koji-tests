import { Request, Response, Router, ErrorRequestHandler } from "express"
import serverConfig, { ServerConfig } from "../config"

export type LesserMiddleware = (req: Request, res: Response) => void;

export type Middlewares = {
  [key: string]: Router | ErrorRequestHandler | LesserMiddleware;
};

export type MiddlewareBuilder = (config: ServerConfig) => Router | ErrorRequestHandler | LesserMiddleware

export type MiddlewareConfig = {
  build: MiddlewareBuilder,
  route?: string | RegExp,
  methods?: Array<string>
}

export type MiddlewaresConfigs = {
  [key: string]: MiddlewareConfig;
};

import { Healthcheck as HealthcheckConfig } from "./healthcheck";
import { GlobalErrorHandler as GlobalErrorHandlerConfig } from "./globalErrorHandler";
import { UnsupportedEndpointHandler as UnsupportedEndpointHandlerConfig } from "./unsupportedEndpointHandler";
import { Geocoding as GeocodingConfig } from "./geocoding";

export const middlewares = {
  Healthcheck: HealthcheckConfig.build(serverConfig),
  GlobalErrorHandler: GlobalErrorHandlerConfig.build(serverConfig),
  UnsupportedEndpointHandler: UnsupportedEndpointHandlerConfig.build(serverConfig),
  Geocoding: GeocodingConfig.build(serverConfig),
};

export const middlewaresConfigs = {
  Healthcheck: HealthcheckConfig,
  GlobalErrorHandler: GlobalErrorHandlerConfig,
  UnsupportedEndpointHandler: UnsupportedEndpointHandlerConfig,
  Geocoding: GeocodingConfig,
};