import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import leaveApi from "../api/leaveApi";

export const useLeave = () => {
  const queryClient = useQueryClient();

  const leaveList = useQuery({
    queryKey: ["leaves"],
    queryFn: leaveApi.getAll,
  });

  const applyLeave = useMutation({
    mutationFn: leaveApi.apply,
    onSuccess: () => queryClient.invalidateQueries(["leaves"]),
  });

  const approveLeave = useMutation({
    mutationFn: leaveApi.approve,
    onSuccess: () => queryClient.invalidateQueries(["leaves"]),
  });

  const rejectLeave = useMutation({
    mutationFn: leaveApi.reject,
    onSuccess: () => queryClient.invalidateQueries(["leaves"]),
  });

  return { leaveList, applyLeave, approveLeave, rejectLeave };
};
