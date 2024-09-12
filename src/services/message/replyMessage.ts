import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const replyMessage = async (
  email: string,
  name: string,
  message: string
): Promise<ResponseSuccess> => {
  const response = await axiosInstance.post(`/message/reply`, {
    email,
    name,
    message,
  });
  return response.data;
};

export default replyMessage;
