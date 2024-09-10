import axiosInstance from "@/config/axios";
import { Post } from "@/models/Post";
import { ResponseSuccess } from "@/models/Response";

interface PostSuccess extends ResponseSuccess {
  data: Post[];
}

const getAllPost = async (limit: number): Promise<PostSuccess> => {
  const response = await axiosInstance.get("/post", { params: { limit } });
  return response.data;
};

export default getAllPost;
