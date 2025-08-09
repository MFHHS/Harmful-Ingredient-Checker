import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'; // Import Tailwind CSS

import AppNavigator from './src/navigation/AppNavigator';

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load Montserrat fonts
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show loading screen while fonts load
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* StatusBar configuration */}
      <StatusBar style="dark" backgroundColor="#F9F9F9" />
      
      {/* Main app navigation */}
      <AppNavigator />
    </SafeAreaProvider>
  );
}