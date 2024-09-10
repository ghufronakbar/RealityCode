import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

interface LoginSuccess extends ResponseSuccess {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

const login = async (
  email: string,
  password: string
): Promise<LoginSuccess> => {
  const response = await axiosInstance.post("/account/login", {
    email,
    password,
  });
  return response.data;
};

export default login;
