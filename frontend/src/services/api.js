import axios from "axios";

const api = axios.create({
  baseURL: "https://labfinders.onrender.com/api",
  timeout: 10000,
});

export const searchLabs = async ({ searchQuery, pincode }) => {
  const response = await api.get("/search", {
    params: {
      search_query: searchQuery,
      pincode,
    },
  });

  return response.data;
};