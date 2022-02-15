import weather from "../weather.json";

import { apiHandler } from "../../../../utils/api";

import { getRandomInt, delay } from "../../..";

export default apiHandler((req, res) => {

  const { query: { coord } } = req;

  const results = (new Array(getRandomInt(200, 1))).fill({})

  const resultLength = results.length

  const trueResults = [];

  let i = 0

  results.forEach(async (_v, j) => {
    trueResults.push(Object.assign({}, weather, { dt: Date.now() + "---" + i }))
    i++

    if (j >= resultLength - 1) {
      res.status(200).json(trueResults)
    }
  })
});
