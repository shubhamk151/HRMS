import axiosClient from "./axiosClient";

const leaveApi = {
  getAll: () => axiosClient.get("/leave/get"),

  apply: (data) => axiosClient.post("/leave/apply", data),

  approve: (id) =>
    axiosClient.put(`/leave/update/${id}`, { status: "approved" }),

  reject: (id) =>
    axiosClient.put(`/leave/update/${id}`, { status: "rejected" }),
};

export default leaveApi;
