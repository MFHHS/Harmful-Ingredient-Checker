import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const cameraRef = useRef(null);

  // Check permissions on mount
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // Toggle camera facing (front/back)
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Toggle flash
  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  // Take photo - THIS IS THE SNAP BUTTON!
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Navigate to photo preview with the photo data
        navigation.navigate('PhotoPreview', { photo });
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    }
  };

  // Pick image from gallery
  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Navigate to photo preview with the selected image
        navigation.navigate('PhotoPreview', { 
          photo: { uri: result.assets[0].uri }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access gallery. Please try again.');
    }
  };

  // Handle permission denied
  if (permission && !permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-textPrimary text-xl font-montserratBold text-center mb-4">
            Camera Permission Required
          </Text>
          <Text className="text-textPrimary text-base font-montserrat text-center mb-8 opacity-80">
            Please allow camera access to scan ingredient lists.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-primary px-6 py-3 rounded-lg"
          >
            <Text className="text-background font-montserratMedium">
              Grant Permission
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-12 left-0 right-0 z-10 flex-row justify-between items-center px-6 py-4">
        {/* Cancel button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center"
        >
          <Text className="text-white text-lg font-montserratMedium">✕</Text>
        </TouchableOpacity>

        {/* Flash toggle */}
        <TouchableOpacity 
          onPress={toggleFlash}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full items-center justify-center"
        >
          <Text className="text-white text-lg">
            {flash === 'on' ? '⚡' : '🔦'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera View */}
      <CameraView
        ref={cameraRef}
        className="flex-1"
        facing={facing}
        flash={flash}
      >
        {/* Camera overlay with guides */}
        <View className="flex-1 justify-center items-center">
          {/* Scanning guide overlay */}
          <View className="absolute inset-x-8 top-1/4 bottom-1/4 border-2 border-white border-dashed rounded-lg bg-transparent">
            <View className="absolute -top-8 left-0 right-0">
              <Text className="text-white text-center font-montserratMedium bg-black bg-opacity-50 py-1 rounded">
                Position ingredient list here
              </Text>
            </View>
          </View>
        </View>
      </CameraView>

      {/* Bottom Controls - HERE'S YOUR SNAP BUTTON! */}
      <View className="absolute bottom-12 left-0 right-0 flex-row justify-center items-center px-6">
        {/* Gallery button */}
        <TouchableOpacity 
          onPress={pickImageFromGallery}
          className="w-14 h-14 bg-background rounded-full items-center justify-center mr-8"
        >
          <Text className="text-2xl">🖼️</Text>
        </TouchableOpacity>

        {/* 📸 SNAP BUTTON - Big white circle button! */}
        <TouchableOpacity 
          onPress={takePhoto}
          className="w-20 h-20 bg-white rounded-full items-center justify-center border-4 border-gray-300"
        >
          <View className="w-16 h-16 bg-white rounded-full" />
        </TouchableOpacity>

        {/* Flip camera button */}
        <TouchableOpacity 
          onPress={toggleCameraFacing}
          className="w-14 h-14 bg-background rounded-full items-center justify-center ml-8"
        >
          <Text className="text-2xl">🔄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}