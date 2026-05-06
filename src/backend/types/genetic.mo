module {
  public type UserPreference = {
    userId : Text;
    key : Text;
    value : Text;
    weight : Float;
    updatedAt : Int;
  };

  public type GeneticProfile = {
    userId : Text;
    preferences : [UserPreference];
    dominantLanguage : Text;
    dominantDomain : Text;
    technicalDepth : Float;
    formalityLevel : Float;
    lastAdapted : Int;
  };
}
