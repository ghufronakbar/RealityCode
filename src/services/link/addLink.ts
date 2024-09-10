import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

const addLink = async (
  title: string,
  url: string,
  desc: string,
  icon: string
): Promise<ResponseSuccess> => {
  const response = await axiosInstance.post("/link", {
    title,
    url,
    desc,
    icon,
  });
  return response.data;
};

export default addLink;
