import axiosInstance from "@/config/axios";
import { Message } from "@/models/Message";
import { ResponseSuccess } from "@/models/Response";

interface MessageSuccess extends ResponseSuccess {
  data: Message[];
}

const getMessage = async (): Promise<MessageSuccess> => {
  const response = await axiosInstance.get("/message");
  return response.data;
};

export default getMessage;
