import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../service/user";
import { useAuth } from "../context/AuthContext";
import AuthService from "../service/auth";
import type { UpdateUserPayload } from "../model/user";

export const useUserById = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cameras", user?.id],
    queryFn: () => {
      if (!user) throw new Error("No ID provided");
      return UserService.getUserById(user.id);
    },
    enabled: !!user,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => {
      return UserService.updateUser(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => AuthService.getProfile(),
  });
};
