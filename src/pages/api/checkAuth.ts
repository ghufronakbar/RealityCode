import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return res.status(200).json({ message: "Authenticated", user: decoded });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
