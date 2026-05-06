import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { SubscriptionTier, UserRole } from "../backend";
import { mockBackend } from "../mocks/backend";
import { useAriaStore } from "../store/useAriaStore";
import type { UserProfile } from "../types";

function mapProfile(p: {
  id: { toText?: () => string } | string;
  name: string;
  email: string;
  role: UserRole;
  tier: SubscriptionTier;
}): UserProfile {
  const idStr =
    typeof p.id === "string"
      ? p.id
      : typeof (p.id as { toText?: () => string }).toText === "function"
        ? (p.id as { toText: () => string }).toText()
        : String(p.id);
  return {
    id: idStr,
    name: p.name,
    email: p.email,
    role: p.role as "user" | "admin",
    tier: p.tier as "free" | "pro" | "enterprise",
  };
}

export function useCurrentUser() {
  const { actor, isFetching } = useActor(createActor);
  const setUser = useAriaStore((s) => s.setUser);

  return useQuery<UserProfile | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const backend = actor ?? mockBackend;
      const profile = await backend.getUserProfile();
      if (!profile) {
        // Do NOT call setUser(null) — preserve zustand-persisted auth across page refreshes
        return null;
      }
      const mapped = mapProfile(profile);
      setUser(mapped);
      return mapped;
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLogin() {
  const { actor } = useActor(createActor);
  const login = useAriaStore((s) => s.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const backend = actor ?? mockBackend;
      const result = await backend.adminLogin(username, password);
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapProfile(result.ok);
    },
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(["currentUser"], user);
    },
  });
}

export function useDemoLogin() {
  const { actor } = useActor(createActor);
  const login = useAriaStore((s) => s.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      const result = await backend.demoLogin();
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapProfile(result.ok);
    },
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(["currentUser"], user);
    },
  });
}

export function useRegister() {
  const { actor } = useActor(createActor);
  const login = useAriaStore((s) => s.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password: _password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const backend = actor ?? mockBackend;
      // Internet Computer auth doesn't use password directly — identity handled by II
      const result = await backend.register(name, email);
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapProfile(result.ok);
    },
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(["currentUser"], user);
    },
  });
}

export function useLogout() {
  const { actor } = useActor(createActor);
  const logoutStore = useAriaStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      await backend.logout();
    },
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
    },
    onError: () => {
      // Always clear local state even if backend call fails
      logoutStore();
      queryClient.clear();
    },
  });
}
