import axios from "axios";

const getLinks = async (limit: number) => {
  try {
    const { data } = await axios.get("/api/admin/link", {
      params: {
        limit,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getLinks;
