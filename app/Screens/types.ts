export type RootStackParamList = {
  Predictions: undefined; // No params expected
  Results: { 
    dehydrationStatus: string; 
    recommendations: string[];
  };
};
