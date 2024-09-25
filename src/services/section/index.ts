import axiosInstance from "@/config/axios";
import { Section } from "@/models/Section";
import { ResponseSuccess } from "@/models/Response";

interface SectionSuccess extends ResponseSuccess {
  data: Section[];
}

export const getAllSection = async (): Promise<SectionSuccess> => {
  try {
    const { data } = await axiosInstance.get("/section");
    return data;
  } catch (error) {
    throw error;
  }
};
