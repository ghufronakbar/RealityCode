import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const deleteMessage = async (id: number): Promise<ResponseSuccess> => {
  const response = await axiosInstance.delete(`/message/${id}`);
  return response.data;
};

export default deleteMessage;
