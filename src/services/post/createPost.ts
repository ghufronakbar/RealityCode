import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

export interface FormPost {
  title: string;
  content: string;
  images: File[];
}

const createPost = async (data: FormPost): Promise<ResponseSuccess> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);

  for (let i = 0; i < data.images.length; i++) {
    formData.append("image", data.images[i]);
  }

  const response = await axiosInstance.post("/post", formData);

  return response.data;
};

export default createPost;
