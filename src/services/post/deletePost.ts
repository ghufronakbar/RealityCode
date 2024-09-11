import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const deletePost = async (id: number): Promise<ResponseSuccess> => {
  const response = await axiosInstance.delete(`/post/${id}`);
  return response.data;
};

export default deletePost;
