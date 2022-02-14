import { Request, Response } from "express"

import { ServerConfig } from "../config"
import { MiddlewareBuilder } from "."

const globalErrorHandlerBuilder: MiddlewareBuilder = (_conf: ServerConfig) =>
  (
    err: {
      extensions: { code: number },
      message: string,
      data: any,
    },
    _request: Request, res: Response
  ) =>
    res.status(err.extensions && err.extensions.code).json({
      success: false,
      message: err.message,
      data: err.extensions || err.data
    })

export const GlobalErrorHandler = {
  build: globalErrorHandlerBuilder,
  route: 'healthcheck'
}