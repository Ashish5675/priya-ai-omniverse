import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AuthTypes "../types/auth";

module {
  public type FaceMap = Map.Map<Principal, Text>;
  public type UserMap = Map.Map<Principal, AuthTypes.UserProfile>;

  /// Store a face encoding for the given user
  public func storeFaceEncoding(faceMap : FaceMap, userId : Principal, encoding : Text) : Bool {
    if (encoding.size() == 0) { return false };
    faceMap.add(userId, encoding);
    true;
  };

  /// Retrieve the stored face encoding for a user
  public func getFaceEncoding(faceMap : FaceMap, userId : Principal) : ?Text {
    faceMap.get(userId);
  };

  /// Verify a face encoding against all stored encodings.
  /// Demo mode: any encoding that contains "demo" matches demo@priya.ai.
  /// Returns (matched, ?matchedPrincipal).
  public func verifyFace(faceMap : FaceMap, users : UserMap, encoding : Text) : (Bool, ?Principal) {
    // Demo shortcut: encoding containing "demo" always matches the demo user
    if (encoding.contains(#text "demo")) {
      let demoUser = users.entries().find(func((_, u)) { u.email == "demo@priya.ai" });
      switch (demoUser) {
        case (?(id, _)) return (true, ?id);
        case null {};
      };
    };

    // Compare encoding against each stored value (simple equality for demo)
    var matched : ?(Bool, ?Principal) = null;
    faceMap.forEach(func(uid, stored) {
      if (matched == null and stored == encoding) {
        matched := ?(true, ?uid);
      };
    });
    switch (matched) {
      case (?(b, p)) (b, p);
      case null (false, null);
    };
  };

  /// Remove stored face data for a user
  public func clearFaceData(faceMap : FaceMap, userId : Principal) : Bool {
    switch (faceMap.get(userId)) {
      case null false;
      case (?_) {
        faceMap.remove(userId);
        true;
      };
    };
  };

  /// List all principals that have enrolled a face (admin only — caller validation done in mixin)
  public func listEnrolledUsers(faceMap : FaceMap) : [Principal] {
    faceMap.keys().toArray();
  };

  /// Check whether a user has a face encoding enrolled
  public func hasFaceEnrolled(faceMap : FaceMap, userId : Principal) : Bool {
    faceMap.containsKey(userId);
  };
};
