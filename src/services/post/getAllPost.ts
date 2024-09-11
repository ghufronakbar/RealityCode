import axiosInstance from "@/config/axios";
import { Limitation } from "@/models/Limitation";
import { Post } from "@/models/Post";
import { ResponseSuccess } from "@/models/Response";

interface PostSuccess extends ResponseSuccess {
  data: Post[];
  limitation: Limitation;
}

const getAllPost = async (limit: number): Promise<PostSuccess> => {
  try {
    const response = await axiosInstance.get("/post", { params: { limit } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getAllPost;
