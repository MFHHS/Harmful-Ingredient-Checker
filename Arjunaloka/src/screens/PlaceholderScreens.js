// Placeholder screens - we'll build these properly in later phases
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

// Onboarding Screen (Layouts 2-4)
export function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Onboarding Screen
        </Text>
        <Text className="text-textPrimary text-center mb-8">
          This will be your intro screens (layouts 2-4)
        </Text>
        <CustomButton 
          title="Go to Permission" 
          onPress={() => navigation.navigate('Permission')}
        />
      </View>
    </SafeAreaView>
  );
}

// Permission Screen (Layout 5)
export function PermissionScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Permission Screen
        </Text>
        <Text className="text-textPrimary text-center mb-8">
          Camera and gallery permission request
        </Text>
        <CustomButton 
          title="Allow & Continue" 
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </SafeAreaView>
  );
}

// Camera Screen (Layout 6)
export function CameraScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Camera Screen
        </Text>
        <Text className="text-textPrimary text-center mb-8">
          Camera interface will be here
        </Text>
        <CustomButton 
          title="Take Photo" 
          onPress={() => navigation.navigate('PhotoPreview')}
        />
      </View>
    </SafeAreaView>
  );
}

// Photo Preview Screen (Layout 7)
export function PhotoPreviewScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Photo Preview
        </Text>
        <Text className="text-textPrimary text-center mb-8">
          Review photo and retake if needed
        </Text>
        <View className="flex-row space-x-4">
          <CustomButton 
            title="Retake" 
            variant="outline"
            onPress={() => navigation.goBack()}
          />
          <CustomButton 
            title="Analyze" 
            onPress={() => navigation.navigate('Loading')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Loading Screen (Layout 8)
export function LoadingScreen({ navigation }) {
  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigation.navigate('Results');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Analyzing...
        </Text>
        <Text className="text-textPrimary text-center">
          Please wait while we analyze your ingredients
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Results Screen (Layout 9)
export function ResultsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-textPrimary text-2xl font-bold mb-4">
          Analysis Results
        </Text>
        <Text className="text-textPrimary text-center mb-8">
          Your ingredient analysis results will appear here
        </Text>
        <CustomButton 
          title="Done" 
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </SafeAreaView>
  );
}