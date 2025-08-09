import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DUMMY_TEXT } from '../constants';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Auto-navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Logo placeholder - we'll add proper logo later */}
        <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-6">
          <Text className="text-background text-2xl font-montserratBold">A</Text>
        </View>
        
        {/* App name */}
        <Text className="text-textPrimary text-3xl font-montserratBold mb-4 text-center">
          {DUMMY_TEXT.appName}
        </Text>
        
        {/* Description */}
        <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80">
          {DUMMY_TEXT.appDescription}
        </Text>
      </View>
    </SafeAreaView>
  );
}