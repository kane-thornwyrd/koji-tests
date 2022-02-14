import { Request, Response } from "express"

import { ServerConfig } from "../config"
import { MiddlewareBuilder } from "."

const geocodingBuilder: MiddlewareBuilder = ({ version, name }: ServerConfig) =>
  (req: Request, res: Response) => {
    const callURL = new URL(`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`)

    res.status(200).json({
      "okok": req.params
    })
  }

export const Geocoding = {
  build: geocodingBuilder,
  route: /^\/geocoding(\/(\w+))?$/
}