import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/prisma";
import { ResponseSuccess, ResponseError } from "@/utils/helpers/response";
import { TypeMessage } from "@/type/TypeMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseSuccess | ResponseError>
) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body as TypeMessage;
      const send = await sendMessage(name, email, message);
      return res.status(200).json({
        status: 200,
        message: "Message Send",
        data: send,
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

const sendMessage = async (name: string, email: string, message: string) => {
  const send = await prisma.message.create({
    data: {
      name,
      email,
      message,
    },
  });

  return send;
};
