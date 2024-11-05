import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

interface PredictionsProps {
  navigation: NavigationProp<RootStackParamList, 'Predictions'>;
}

const Predictions: React.FC<PredictionsProps> = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [muac, setMuac] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [thirstLevel, setThirstLevel] = useState('');
  const [sunkenEyes, setSunkenEyes] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePrediction = () => {
    if (!age || !weight || !height || !muac || !heartRate || !thirstLevel || !sunkenEyes) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const parsedThirstLevel = parseFloat(thirstLevel);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseInt(age, 10);

    if (isNaN(parsedThirstLevel) || parsedThirstLevel < 1 || parsedThirstLevel > 10) {
      Alert.alert('Error', 'Please enter a thirst level between 1 and 10.');
      return;
    }

    const formattedSunkenEyes = sunkenEyes.toLowerCase();
    if (formattedSunkenEyes !== 'yes' && formattedSunkenEyes !== 'no') {
      Alert.alert('Error', 'Please enter "Yes" or "No" for Sunken Eyes.');
      return;
    }

    setLoading(true);

    // Initialize dehydration status and recommendations
    let dehydrationStatus = 'Mildly Hydrated';
    let recommendations: string[] = [];
    let fluidRecommendation: string = ""; // Initialize the variable here

    // Calculate fluid requirements based on thirst level and weight
    if (parsedThirstLevel > 7 || formattedSunkenEyes === 'yes') {
      dehydrationStatus = 'Severely Dehydrated';

      // Calculate IV fluid administration
      const fluidVolume = parsedWeight * 30; // 30 mL/kg for 30 minutes
      const timeInMinutes = 30;
      const dropsPerMinute = 60; // Assuming 60 drops/mL for a microdrip
      const totalDrops = fluidVolume * dropsPerMinute;
      const dripRate = totalDrops / timeInMinutes;

      recommendations = [
        `Administer ${fluidVolume} mL of IV fluids over ${timeInMinutes} minutes.`,
        `Set drip rate to ${Math.round(dripRate)} drops per minute.`,
        "Monitor hydration status and repeat if radial pulse is weak.",
        "Consult a healthcare provider for further assessment."
      ];
    } else if (parsedThirstLevel >= 5) {
      dehydrationStatus = 'Moderately Dehydrated';

      if (parsedAge < 1) {
        fluidRecommendation = parsedWeight < 6 ? "200 to 400 mL" : "400 to 700 mL";
      } else if (parsedAge >= 1 && parsedWeight >= 6) {
        fluidRecommendation = parsedWeight <= 12 ? "700 to 900 mL" : "900 to 1400 mL";
      } else {
        fluidRecommendation = "Fluid amount cannot be determined based on age and weight."; // Default message
      }

      recommendations = [
        `Administer ${fluidRecommendation} of oral fluids.`,
        "Monitor symptoms and ensure regular hydration.",
        "Observe for signs of improvement or deterioration."
      ];
    } else {
      dehydrationStatus = 'Mildly Hydrated';
      recommendations = [
        "Keep monitoring hydration levels.",
        "Give 50-100 mL of fluids.",
        "Educate caregivers on signs of dehydration to watch for."
      ];
    }

    setLoading(false);

    // Navigate to Results screen with dehydration status and recommendations
    navigation.navigate('Results', { dehydrationStatus, recommendations });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Hydration Predictor</Text>
        <Text style={styles.description}>Please enter the details of the child to predict dehydration status.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Age (in years)"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (in kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (in cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="MUAC (in cm)"
          value={muac}
          onChangeText={setMuac}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Heart Rate (bpm)"
          value={heartRate}
          onChangeText={setHeartRate}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Thirst Level (1-10)"
          value={thirstLevel}
          onChangeText={setThirstLevel}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sunken Eyes (Yes/No)"
          value={sunkenEyes}
          onChangeText={setSunkenEyes}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <Button title="Submit" onPress={handlePrediction} color="#2196F3" />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Predictions;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
});
