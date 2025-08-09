import { Animated, View } from 'react-native';

export default function PageIndicator({ 
  currentPage, 
  totalPages, 
  className = '' 
}) {
  return (
    <View className={`flex-row items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Animated.View
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentPage 
              ? 'w-8 bg-primary' 
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </View>
  );
}