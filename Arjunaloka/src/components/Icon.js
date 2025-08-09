import { Text, View } from 'react-native';

// Simple icon component using emojis and symbols
// You can replace this with react-native-vector-icons later
export default function Icon({ 
  name, 
  size = 'large', 
  className = '' 
}) {
  
  const sizeStyles = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24', 
    large: 'w-32 h-32',
    xlarge: 'w-40 h-40'
  };
  
  const iconMap = {
    // Onboarding icons
    scan: '🔍',
    camera: '📸',
    shield: '🛡️',
    microscope: '🔬',
    leaf: '🌿',
    check: '✅',
    // Camera icons
    gallery: '🖼️',
    flash: '⚡',
    close: '✕',
  };
  
  const textSizeStyles = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl', 
    xlarge: 'text-6xl'
  };
  
  return (
    <View className={`${sizeStyles[size]} bg-background rounded-full items-center justify-center ${className}`}>
      <Text className={`${textSizeStyles[size]}`}>
        {iconMap[name] || '❓'}
      </Text>
    </View>
  );
}