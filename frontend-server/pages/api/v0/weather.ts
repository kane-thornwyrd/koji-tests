import type { NextApiRequest, NextApiResponse } from "next";
import weather from "./weather.json";
import { getSession } from "next-auth/react";

import { apiHandler } from "../../../utils/api";

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const delay: number = 10000 * Math.random();
    setTimeout(() => res.status(200).json(weather), delay);
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
});
