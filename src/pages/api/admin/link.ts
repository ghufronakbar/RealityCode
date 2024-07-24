import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/prisma";
import { ResponseSuccess, ResponseError } from "@/utils/helpers/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseSuccess | ResponseError>
) {
  if (req.method === "GET") {
    try {
      const limit = req.query.limit;
      let queryLimit = 3;
      if (limit) {
        queryLimit = parseInt(limit as string);
      }
      const links = await getLinks(queryLimit);
      const totalLinks = await getTotalLinks();
      return res.status(200).json({
        status: 200,
        message: "Data Links",
        data: links,
        limitation: { limit: queryLimit, totalData: totalLinks },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}

const getLinks = async (limit: number) => {
  const links = await prisma.link.findMany({
    orderBy: {
      id: "desc",
    },
    take: limit,
  });
  return links;
};

const getTotalLinks = async () => {
  const totalLinks = await prisma.link.count();
  return totalLinks;
};
