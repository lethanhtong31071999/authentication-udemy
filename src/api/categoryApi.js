import axiosClient from "./axiosClient";

const categoryApi = {
  async getAll() {
    const url = "/categories";
    return await axiosClient.get(url);
  },

  async get(id) {
    if (Number.isNaN(id)) return;
    const url = `/categories/${id}`;
    return await axiosClient.get(url);
  },
};

export default categoryApi;
