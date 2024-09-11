import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

interface FormPost {
  title: string;
  content: string;
}

const editPost = async (
  id: number,
  data: FormPost
): Promise<ResponseSuccess> => {
  const response = await axiosInstance.put(`/post/${id}`, data);
  return response.data;
};

export default editPost;
