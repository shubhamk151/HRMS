import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import employeeApi from "../api/employeeApi";

export const useEmployee = () => {
  const queryClient = useQueryClient();

  // Fetch all employees
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await employeeApi.getAll();
      // Backend returns array directly, wrap it
      return Array.isArray(res.data) ? res.data : res.data?.employees || [];
    },
  });

  // Create employee
  const createEmployee = useMutation({
    mutationFn: employeeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Update employee
  const updateEmployee = useMutation({
    mutationFn: employeeApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Delete
  const deleteEmployee = useMutation({
    mutationFn: employeeApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
