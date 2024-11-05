import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Login from './app/Screens/Login';
import Home from './app/Screens/Home';
import Predictions from './app/Screens/Predictions';
import Results from './app/Screens/Results';

// Define the types for each screen in the stack
type RootStackParamList = {
  Inside: undefined;
  Login: undefined;
  Home: undefined;
  Predictions: undefined;
  Results: { dehydrationStatus: string; recommendation: string };
};

// Define stack navigators with types
const Stack = createNativeStackNavigator<RootStackParamList>();
const InsideStack = createNativeStackNavigator<RootStackParamList>();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <InsideStack.Screen name="Predictions" component={Predictions} options={{ headerShown: false }} />
      <InsideStack.Screen name="Results" component={Results} options={{ headerShown: false }} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('User', user);
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Inside">
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
