// src/hook/user.ts
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../service/user";
import AuthService from "../service/auth";
import { useAuth } from "../context/AuthContext";
import type { UpdateUserPayload } from "../model/user";
import type { User } from "../service/auth";
import { isUnauthorized } from "../helper/api-err";

/** Ambil user by id (logout otomatis kalau 401) */
export const useUserById = () => {
  const { user, logout } = useAuth();

  const q = useQuery<User, Error>({
    queryKey: ["user", user?.id],
    queryFn: () => UserService.getUserById(user!.id),
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (q.isError && isUnauthorized(q.error)) {
      logout();
    }
  }, [q.isError, q.error, logout]);

  return q;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => UserService.updateUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      if (isUnauthorized(err)) logout();
    },
  });
};

export const useProfile = () => {
  const { logout } = useAuth();

  const q = useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: () => AuthService.getProfile(),
    retry: false,
  });

  useEffect(() => {
    if (q.isError && isUnauthorized(q.error)) {
      logout();
    }
  }, [q.isError, q.error, logout]);

  return q;
};
