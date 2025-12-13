import axiosClient from "./axiosClient";

const employeeApi = {
  getAll: () => axiosClient.get("/employees"),

  getById: (id) => axiosClient.get(`/employees/${id}`),

  create: (data) => axiosClient.post("/employees", data),

  update: ({ id, data }) => axiosClient.put(`/employees/${id}`, data),

  remove: (id) => axiosClient.put(`/employees/terminate/${id}`),
};

export default employeeApi;
