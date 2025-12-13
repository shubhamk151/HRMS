import axiosClient from "./axiosClient";

const attendanceApi = {
  getAll: () => axiosClient.get("/attendance/get"),

  markPresent: (data) =>
    axiosClient.post("/attendance/mark", { ...data, status: "present" }),

  markAbsent: (data) =>
    axiosClient.post("/attendance/mark", { ...data, status: "absent" }),

  update: ({ id, data }) => axiosClient.put(`/attendance/update/${id}`, data),
};

export default attendanceApi;
