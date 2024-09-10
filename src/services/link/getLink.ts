import axiosInstance from "@/config/axios";
import { LinkTree } from "@/models/LinkTree";
import { ResponseSuccess } from "@/models/Response";

interface LinkSuccess extends ResponseSuccess {
    data: LinkTree[];
}

const getLink = async (): Promise<LinkSuccess> => {
    const response = await axiosInstance.get("/link");
    return response.data;
}

export default getLink