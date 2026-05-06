import Principal "mo:core/Principal";
import Map "mo:core/Map";
import AuthTypes "../types/auth";
import AdminLib "../lib/admin";
import FaceLib "../lib/face";

mixin (
  users : Map.Map<Principal, AuthTypes.UserProfile>,
  faceEncodings : Map.Map<Principal, Text>,
) {
  /// Enroll the caller's face encoding
  public shared ({ caller }) func enrollFace(encoding : Text) : async Bool {
    FaceLib.storeFaceEncoding(faceEncodings, caller, encoding);
  };

  /// Verify a face encoding against all enrolled faces; returns (matched, ?matchedPrincipal)
  public shared func verifyFaceLogin(encoding : Text) : async (Bool, ?Principal) {
    FaceLib.verifyFace(faceEncodings, users, encoding);
  };

  /// Check whether the calling user has an enrolled face
  public query ({ caller }) func hasFaceEnrolled() : async Bool {
    FaceLib.hasFaceEnrolled(faceEncodings, caller);
  };

  /// Clear the calling user's face data
  public shared ({ caller }) func clearMyFaceData() : async Bool {
    FaceLib.clearFaceData(faceEncodings, caller);
  };

  /// List all principals with enrolled faces (admin only)
  public query ({ caller }) func listEnrolledFaces() : async [Principal] {
    AdminLib.requireAdmin(users, caller);
    FaceLib.listEnrolledUsers(faceEncodings);
  };
};
