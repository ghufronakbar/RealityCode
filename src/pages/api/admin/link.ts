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
  } else if (req.method === "POST") {
    try {
      const { title, url, desc, icon } = req.body;
      if (!title || !url || !desc || !icon) {
        return res.status(400).json({
          status: 400,
          message: "All fields are required",
        });
      }
      const link = await createLink(title, url, desc, icon);
      return res.status(200).json({
        status: 200,
        message: "Create Successfully",
        data: link,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, title, url, desc, icon } = req.body;
      if (!id || !title || !url || !desc || !icon) {
        return res.status(400).json({
          status: 400,
          message: "All fields are required",
        });
      }
      const link = await editLink(id, title, url, desc, icon);
      return res.status(200).json({
        status: 200,
        message: "Update Successfully",
        data: link,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          status: 400,
          message: "All fields are required",
        });
      }
      const link = await deleteLink(id);
      return res.status(200).json({
        status: 200,
        message: "Delete Successfully",
        data: link,
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
      updatedAt: "desc",
    },
    take: limit,
  });
  return links;
};

const getTotalLinks = async () => {
  const totalLinks = await prisma.link.count();
  return totalLinks;
};

const createLink = async (
  title: string,
  url: string,
  desc: string,
  icon: string
) => {
  const link = await prisma.link.create({
    data: {
      title,
      url,
      desc,
      icon,
    },
  });
  return link;
};

const editLink = async (
  id: number,
  title: string,
  url: string,
  desc: string,
  icon: string
) => {
  const link = await prisma.link.update({
    where: {
      id,
    },
    data: {
      title,
      url,
      desc,
      icon,
    },
  });
  return link;
};

const deleteLink = async (id: number) => {
  const link = await prisma.link.delete({
    where: {
      id,
    },
  });
  return link;
};
