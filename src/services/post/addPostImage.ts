import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const addPostImage = async (
  postId: number,
  images: File[]
): Promise<ResponseSuccess> => {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("image", images[i]);
  }
  const response = await axiosInstance.patch(`/post/${postId}`, formData);
  return response.data;
};

export default addPostImage;