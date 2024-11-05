import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
        } catch (error) {
            console.error("Logout failed: ", error);
            Alert.alert("Error", "Failed to log out. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>kidHydra</Text>
            <Text style={styles.subtitle}>An Artificial Intelligence powered application</Text>
            <Text style={styles.description}>
                Seamlessly check if your child under the age of 5 is hydrated or dehydrated based on key health metrics.
            </Text>
            
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button 
                        onPress={() => navigation.navigate('Predictions')} 
                        title='Check Hydration Status' 
                        color="#2196F3" // Blue color for "Check Hydration"
                    />
                </View>
                
                <View style={styles.button}>
                    <Button 
                        onPress={handleLogout} 
                        title='Logout' 
                        color="#F44336" // Red color for "Logout"
                    />
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4CAF50',
    },
    subtitle: {
        fontSize: 28,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        width: '80%',
    },
});
