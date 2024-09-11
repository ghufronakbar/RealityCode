import axiosInstance from "@/config/axios";
import { Post } from "@/models/Post";
import { ResponseSuccess } from "@/models/Response";

interface PostSuccess extends ResponseSuccess {
  data: Post[];
}

const getFavoritedPost = async (objectOfIds: string): Promise<PostSuccess> => {
  try {
    const response = await axiosInstance.get("/post/favorited", {
      params: { favorited: objectOfIds },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getFavoritedPost;
