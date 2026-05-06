import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { SubscriptionTier, UserRole } from "../backend";
import { mockBackend } from "../mocks/backend";
import { useAriaStore } from "../store/useAriaStore";
import type { UserProfile } from "../types";

/** Check if current user has a face enrolled */
export function useHasFaceEnrolled() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["hasFaceEnrolled"],
    queryFn: async () => {
      const backend = actor ?? mockBackend;
      return backend.hasFaceEnrolled();
    },
    enabled: !isFetching,
    staleTime: 1000 * 30,
  });
}

/** Enroll a face with a base64 encoding string */
export function useFaceEnroll() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { encoding: string }>({
    mutationFn: async ({ encoding }) => {
      const backend = actor ?? mockBackend;
      return backend.enrollFace(encoding);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["hasFaceEnrolled"] });
    },
  });
}

/** Verify a face encoding and log in if matched */
export function useFaceVerify() {
  const { actor } = useActor(createActor);
  const login = useAriaStore((s) => s.login);
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, { encoding: string }>({
    mutationFn: async ({ encoding }) => {
      const backend = actor ?? mockBackend;
      const [verified, principalId] = await backend.verifyFaceLogin(encoding);
      if (!verified || !principalId) {
        throw new Error(
          "Face not recognized. Please try again or use password.",
        );
      }
      // Return a demo profile on successful face verification
      const profile: UserProfile = {
        id:
          typeof principalId === "string"
            ? principalId
            : typeof (principalId as { toText?: () => string }).toText ===
                "function"
              ? (principalId as { toText: () => string }).toText()
              : String(principalId),
        name: "Demo User",
        email: "demo@priya.ai",
        role: UserRole.user as "user" | "admin",
        tier: SubscriptionTier.pro as "free" | "pro" | "enterprise",
      };
      return profile;
    },
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(["currentUser"], user);
    },
  });
}

/** Clear enrolled face data */
export function useClearFaceData() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, void>({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      return backend.clearMyFaceData();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["hasFaceEnrolled"] });
    },
  });
}
