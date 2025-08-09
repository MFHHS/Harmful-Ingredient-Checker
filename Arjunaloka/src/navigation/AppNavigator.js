import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens (we'll create these next)
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PermissionScreen from '../screens/PermissionScreen';
import CameraScreen from '../screens/CameraScreen';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Hide default headers
          animation: 'slide_from_right', // Smooth transitions
        }}
      >
        {/* Layout 1: Splash/Landing */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* Layouts 2-4: Onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        
        {/* Layout 5: Permission */}
        <Stack.Screen name="Permission" component={PermissionScreen} />
        
        {/* Layout 6: Camera */}
        <Stack.Screen name="Camera" component={CameraScreen} />
        
        {/* Layout 7: Photo Preview */}
        <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
        
        {/* Layout 8: Loading/Analysis */}
        <Stack.Screen name="Loading" component={LoadingScreen} />
        
        {/* Layout 9: Results */}
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}