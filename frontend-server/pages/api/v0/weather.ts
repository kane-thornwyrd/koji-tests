import type { NextApiRequest, NextApiResponse } from "next";
import weather from "./weather.json";

import { apiHandler } from "../../../utils/api";

export default apiHandler((req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    const delay: number = 10000 * Math.random();
    setTimeout(() => resolve(res.status(200).json(weather)), delay);
  })
});
