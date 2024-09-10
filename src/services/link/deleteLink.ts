import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const deleteLink = async (id: number): Promise<ResponseSuccess> => {
  const response = await axiosInstance.delete(`/link/${id}`);
  return response.data;
};

export default deleteLink;
