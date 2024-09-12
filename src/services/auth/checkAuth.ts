import { ResponseSuccess } from "@/models/Response";
import axios from "axios";

const checkAuth = async (token: string):Promise<ResponseSuccess> => {
  try {
    const response = await axios.post("/api/checkAuth", {
      token,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default checkAuth;
