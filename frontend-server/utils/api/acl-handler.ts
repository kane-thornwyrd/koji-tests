import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next"

async function aclHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) throw new Error("UnauthorizedError");
};

export { aclHandler };
