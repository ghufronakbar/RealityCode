import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";

export interface FormLink {
  title: string;
  url: string;
  desc: string;
  icon: string;
}

const addLink = async ({
  title,
  url,
  desc,
  icon,
}: FormLink): Promise<ResponseSuccess> => {
  const response = await axiosInstance.post("/link", {
    title,
    url,
    desc,
    icon,
  });
  return response.data;
};

export default addLink;
