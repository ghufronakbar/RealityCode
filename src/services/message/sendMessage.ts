import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const sendMessage = async (
  name: string,
  email: string,
  message: string,
  file?: File
): Promise<ResponseSuccess> => {
  let data;

  if (file) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("image", file);
    data = formData;
  } else {
    data = { name, email, message };
  }
  const response = await axiosInstance.post("/message", data);
  return response.data;
};
export default sendMessage;
