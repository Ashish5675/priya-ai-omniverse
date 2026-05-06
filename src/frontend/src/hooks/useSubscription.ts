import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubscriptionTier, createActor } from "../backend";
import { mockBackend } from "../mocks/backend";
import { useAriaStore } from "../store/useAriaStore";
import type { SubscriptionStatus } from "../types";

export function useSubscriptionStatus() {
  const { actor, isFetching } = useActor(createActor);
  const isAuthenticated = useAriaStore((s) => s.isAuthenticated);

  return useQuery<SubscriptionStatus | null>({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const backend = actor ?? mockBackend;
      const status = await backend.getSubscriptionStatus();
      return {
        active: status.active,
        tier: status.tier as "free" | "pro" | "enterprise",
        startDate: status.startDate,
      };
    },
    enabled: !isFetching && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpgradeSubscription() {
  const { actor } = useActor(createActor);
  const setSubscriptionTier = useAriaStore((s) => s.setSubscriptionTier);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tier: "free" | "pro" | "enterprise") => {
      const backend = actor ?? mockBackend;
      const tierEnum =
        tier === "pro"
          ? SubscriptionTier.pro
          : tier === "enterprise"
            ? SubscriptionTier.enterprise
            : SubscriptionTier.free;
      const success = await backend.upgradeSubscription(tierEnum);
      if (!success) throw new Error("Upgrade failed");
      return tier;
    },
    onSuccess: (tier) => {
      setSubscriptionTier(tier);
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useCancelSubscription() {
  const { actor } = useActor(createActor);
  const setSubscriptionTier = useAriaStore((s) => s.setSubscriptionTier);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      await backend.cancelSubscription();
    },
    onSuccess: () => {
      setSubscriptionTier("free");
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
