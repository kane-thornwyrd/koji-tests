import { Request, Response } from "express"
import axios from "axios"

import { ServerConfig } from "../config"
import { MiddlewareBuilder } from "."

const geocodingBuilder: MiddlewareBuilder = ({ version, name }: ServerConfig) =>
  (req: Request, res: Response) => {
    // const [cityName,codePostal] = (req.params as unknown as Array<string>).slice(1)
    // const dataPromise = axios.get(
      // `api.openweathermap.org/data/2.5/weather?lat=47.6434103501&lon=2.3340789354&appid=${process.env.OPENWEATHERMAP}`)
//47.6434103501, 2.3340789354
    // dataPromise
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
    res.status(200).json(req.params)
  }

export const Geocoding = {
  build: geocodingBuilder,
  route: /^\/geocoding(\/(\d+\.?\d*)\/(\d+\.?\d*))?$/
}