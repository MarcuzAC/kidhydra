import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface ResultsProps {
  route: ResultsScreenRouteProp;
  navigation: NavigationProp<RootStackParamList, 'Results'>;
}

const Results: React.FC<ResultsProps> = ({ route, navigation }) => {
  const { dehydrationStatus, recommendations } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediction Results</Text>
      <View style={styles.resultCard}>
        <Text style={styles.resultText}>Dehydration Status:</Text>
        <Text style={styles.statusText}>{dehydrationStatus}</Text>
        <Text style={styles.resultText}>Recommendations:</Text>
        {recommendations.map((rec, index) => (
          <Text key={index} style={styles.recommendationText}>• {rec}</Text>
        ))}
      </View>
      <Button title="Go Back" onPress={() => navigation.goBack()} color="#4CAF50" />
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f5e9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#388E3C',
  },
  resultCard: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 15,
  },
  recommendationText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
});
