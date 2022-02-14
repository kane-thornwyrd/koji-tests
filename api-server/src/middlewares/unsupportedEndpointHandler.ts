import { Request, Response } from "express"

import { ServerConfig } from "../config"
import { MiddlewareBuilder } from "."

const unsupportedEndpointHandlerBuilder: MiddlewareBuilder = (_conf: ServerConfig) =>
  (req: Request, res: Response) =>
    res.status(404).json({
      success: false,
      message: `The endpoint '${req.originalUrl
        }' is not supported by this application (or isn't supported for ${req.method.toUpperCase()
        } requests like these)`
    })


export const UnsupportedEndpointHandler = {
  build: unsupportedEndpointHandlerBuilder,
}