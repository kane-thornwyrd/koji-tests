import { Request, Response } from "express"

import { ServerConfig } from "../config"
import { MiddlewareBuilder } from "."

const healthcheckBuilder: MiddlewareBuilder = ({ version, name }: ServerConfig) =>
  (_req: Request, res: Response) => {
    res.status(200).json({
      version,
      name,
      success: true,
      status: "OK",
      timestamp: Date.now(),
      uptime: process.uptime()
    })
  }

export const Healthcheck = {
  build: healthcheckBuilder,
  route: '/healthcheck'
}