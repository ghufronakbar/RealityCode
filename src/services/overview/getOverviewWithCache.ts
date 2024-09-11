import axiosInstance from "@/config/axios";
import { Overview } from "@/models/Overview";
import { ResponseSuccess } from "@/models/Response";

interface OverviewSuccess extends ResponseSuccess {
  data: Overview;
}

const getOverviewWithCache = async (): Promise<OverviewSuccess> => {
  const response = await axiosInstance.get("/overview");
  return response.data;
};

export default getOverviewWithCache;
