import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PhotoPreviewScreen({ navigation, route }) {
  const { photo } = route.params || {};

  // Handle retake photo
  const retakePhoto = () => {
    navigation.goBack(); // Go back to camera
  };

  // Handle analyze photo
  const analyzePhoto = () => {
    // Pass photo data to loading screen
    navigation.navigate('Loading', { photo });
  };

  if (!photo) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-textPrimary text-xl font-montserratBold text-center">
            No photo selected
          </Text>
          <CustomButton
            title="Go Back"
            onPress={() => navigation.goBack()}
            className="mt-4"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-12 left-0 right-0 z-10 flex-row justify-between items-center px-6 py-4">
        {/* Back button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center"
        >
          <Text className="text-white text-lg font-montserratMedium">←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-white font-montserratMedium text-lg">
          Review Photo
        </Text>

        {/* Placeholder for symmetry */}
        <View className="w-10 h-10" />
      </View>

      {/* Photo Preview */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={{ uri: photo.uri }}
          style={{ 
            width: screenWidth - 32, 
            height: screenHeight * 0.6,
          }}
          className="rounded-lg"
          resizeMode="contain"
        />
        
        {/* Preview overlay */}
        <View className="absolute inset-x-8 top-1/4 bottom-1/4 border-2 border-white border-dashed rounded-lg bg-transparent pointer-events-none">
          <View className="absolute -top-8 left-0 right-0">
            <Text className="text-white text-center font-montserratMedium bg-black bg-opacity-50 py-1 rounded">
              Ingredients detected in this area
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <View className="absolute bottom-12 left-0 right-0 px-6">
        <View className="flex-row space-x-4">
          {/* Retake button */}
          <CustomButton
            title="Retake Photo"
            onPress={retakePhoto}
            variant="outline"
            size="large"
            className="flex-1 bg-background"
          />
          
          {/* Analyze button */}
          <CustomButton
            title="Analyze"
            onPress={analyzePhoto}
            size="large"
            className="flex-1"
          />
        </View>
        
        {/* Tip text */}
        <Text className="text-white text-center font-montserrat text-sm mt-4 opacity-80">
          Make sure ingredient text is clear and readable
        </Text>
      </View>
    </SafeAreaView>
  );
}