import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'; // Import Tailwind CSS

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* StatusBar configuration */}
      <StatusBar style="dark" backgroundColor="#F9F9F9" />
      
      {/* Main app navigation */}
      <AppNavigator />
    </SafeAreaProvider>
  );
}