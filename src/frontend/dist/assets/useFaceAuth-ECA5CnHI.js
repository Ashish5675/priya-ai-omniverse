import { c as createLucideIcon, d as useActor, e as useQuery, f as useQueryClient, g as useMutation, t as mockBackend, u as useAriaStore, s as SubscriptionTier, E as UserRole, h as createActor } from "./index-Khuvrpqq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
];
const ScanFace = createLucideIcon("scan-face", __iconNode);
function useHasFaceEnrolled() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["hasFaceEnrolled"],
    queryFn: async () => {
      const backend = actor ?? mockBackend;
      return backend.hasFaceEnrolled();
    },
    enabled: !isFetching,
    staleTime: 1e3 * 30
  });
}
function useFaceEnroll() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ encoding }) => {
      const backend = actor ?? mockBackend;
      return backend.enrollFace(encoding);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["hasFaceEnrolled"] });
    }
  });
}
function useFaceVerify() {
  const { actor } = useActor(createActor);
  const login = useAriaStore((s) => s.login);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ encoding }) => {
      const backend = actor ?? mockBackend;
      const [verified, principalId] = await backend.verifyFaceLogin(encoding);
      if (!verified || !principalId) {
        throw new Error(
          "Face not recognized. Please try again or use password."
        );
      }
      const profile = {
        id: typeof principalId === "string" ? principalId : typeof principalId.toText === "function" ? principalId.toText() : String(principalId),
        name: "Demo User",
        email: "demo@priya.ai",
        role: UserRole.user,
        tier: SubscriptionTier.pro
      };
      return profile;
    },
    onSuccess: (user) => {
      login(user);
      queryClient.setQueryData(["currentUser"], user);
    }
  });
}
function useClearFaceData() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      return backend.clearMyFaceData();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["hasFaceEnrolled"] });
    }
  });
}
export {
  ScanFace as S,
  useHasFaceEnrolled as a,
  useFaceEnroll as b,
  useClearFaceData as c,
  useFaceVerify as u
};
