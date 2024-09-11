import axiosInstance from "@/config/axios";
import { ResponseSuccess } from "@/models/Response";
import { FormLink } from "./addLink";

const editLink = async (
  id: number,
  { title, url, desc, icon }: FormLink
): Promise<ResponseSuccess> => {
  const response = await axiosInstance.put(`/link/${id}`, {
    title,
    url,
    desc,
    icon,
  });
  return response.data;
};

export default editLink;
