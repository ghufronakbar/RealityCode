import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/prisma";
import { ResponseSuccess, ResponseError } from "@/utils/helpers/response";
import { Message } from "@/models/Message";
// import uploadCloudinary from "@/utils/cloudinary/uploadCloudinary";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseSuccess | ResponseError>
) {
  if (req.method === "POST") {    
    // uploadCloudinary("message").single("file");
    // console.log(file)
    // const text = JSON.parse(req.body);
    console.log(req);
    try {
      const { name, email, message } = req.body as Message;
      if(!name || !email || !message) {
        return res.status(400).json({
          status: 400,
          message: "Field cannot be empty",
        });
      }
      // const file = uploadCloudinary("message");
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

const sendMessage = async (name: string, email: string, message: string, file?: string) => {
  const send = await prisma.message.create({
    data: {
      name,
      email,
      message,
      file,
    },
  });
  return send;
};
