import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { DUMMY_TEXT } from '../constants';
import CustomButton from '../components/CustomButton';
import Icon from '../components/Icon';

export default function PermissionScreen({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  // Request camera and media library permissions
  const requestPermissions = async () => {
    setIsRequesting(true);
    
    try {
      // Request camera permission
      const cameraResult = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraResult.status);
      
      // Request media library permission (for saving photos)
      const mediaResult = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(mediaResult.status);
      
      if (cameraResult.status === 'granted') {
        // Navigate to camera if permission granted
        navigation.navigate('Camera');
      } else {
        Alert.alert(
          'Permission Required',
          'Camera access is required to scan ingredients. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request permissions. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  // Skip permissions (still go to camera, but user will see system prompt)
  const skipPermissions = () => {
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Camera Icon */}
        <View className="mb-12">
          <Icon 
            name="camera" 
            size="xlarge" 
            className="shadow-lg bg-white"
          />
        </View>

        {/* Title */}
        <Text className="text-textPrimary text-3xl font-montserratBold text-center mb-6 leading-9">
          {DUMMY_TEXT.permission.title}
        </Text>

        {/* Description */}
        <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80 mb-12 px-4">
          {DUMMY_TEXT.permission.description}
        </Text>

        {/* Permission Status (if any permissions were requested) */}
        {(cameraPermission || mediaPermission) && (
          <View className="w-full mb-8 p-4 bg-white rounded-xl">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-montserratMedium text-textPrimary">Camera</Text>
              <Text className={`font-montserrat ${
                cameraPermission === 'granted' ? 'text-safe' : 'text-harmful'
              }`}>
                {cameraPermission === 'granted' ? '✓ Granted' : '✗ Denied'}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserratMedium text-textPrimary">Media Library</Text>
              <Text className={`font-montserrat ${
                mediaPermission === 'granted' ? 'text-safe' : 'text-harmful'
              }`}>
                {mediaPermission === 'granted' ? '✓ Granted' : '✗ Denied'}
              </Text>
            </View>
          </View>
        )}

        {/* Buttons */}
        <View className="w-full space-y-4">
          <CustomButton
            title={isRequesting ? "Requesting..." : "Allow Camera Access"}
            onPress={requestPermissions}
            size="large"
            className="w-full"
            disabled={isRequesting}
          />
          
          <CustomButton
            title="Skip for Now"
            onPress={skipPermissions}
            variant="outline"
            size="large"
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}