import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db/prisma";
import { ResponseSuccess, ResponseError } from "@/utils/helpers/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type SetCookie = {
  name: string;
  value: string;
  options: {
    httpOnly: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseSuccess | ResponseError | SetCookie>
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const login = await loginAdmin(email, password);
      if (login instanceof Error) {
        return res.status(401).json({
          status: 401,
          message: login.message,
        });
      }
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        `token=${login}; Path=/; HttpOnly; Expires=${new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toUTCString()}`
      );

      return res.status(200).json({
        status: 200,
        message: "Login Success",
        data: login,
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

const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (!admin) {
    return new Error("Admin not found");
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return new Error("Password not match");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return token;
};
