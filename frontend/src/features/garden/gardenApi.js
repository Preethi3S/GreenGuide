import axios from "axios";

export const createGarden = (data) => {
  const token = localStorage.getItem("token");
  return axios.post("/api/garden", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getGarden = () => {
  const token = localStorage.getItem("token");
  return axios.get("/api/garden", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateGardenLayout = (layout) => {
  const token = localStorage.getItem("token");
  return axios.put("/api/garden/layout", { layout }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
