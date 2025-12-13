import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import attendanceApi from "../api/attendanceApi";

export const useAttendance = () => {
  const queryClient = useQueryClient();

  const attendanceList = useQuery({
    queryKey: ["attendance"],
    queryFn: attendanceApi.getAll,
  });

  const markPresent = useMutation({
    mutationFn: attendanceApi.markPresent,
    onSuccess: () => queryClient.invalidateQueries(["attendance"]),
  });

  const markAbsent = useMutation({
    mutationFn: attendanceApi.markAbsent,
    onSuccess: () => queryClient.invalidateQueries(["attendance"]),
  });

  return { attendanceList, markPresent, markAbsent };
};
