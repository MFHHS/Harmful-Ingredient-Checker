import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  className = '',
  disabled = false,
  ...props 
}) {
  // Base button styles
  const baseStyle = 'rounded-lg items-center justify-center';
  
  // Size variants
  const sizeStyles = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4',
  };
  
  // Color variants
  const variantStyles = {
    primary: disabled 
      ? 'bg-gray-400' 
      : 'bg-primary shadow-sm',
    secondary: disabled 
      ? 'bg-gray-300' 
      : 'bg-background border border-primary',
    outline: disabled 
      ? 'border border-gray-400' 
      : 'border border-primary bg-transparent',
  };
  
  // Text color variants
  const textStyles = {
    primary: disabled ? 'text-gray-600' : 'text-background font-semibold',
    secondary: disabled ? 'text-gray-500' : 'text-primary font-semibold',
    outline: disabled ? 'text-gray-400' : 'text-primary font-semibold',
  };
  
  const buttonClass = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  return (
    <TouchableOpacity
      className={buttonClass}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8} // Gives nice press feedback
      {...props}
    >
      <Text className={`${textStyles[variant]} text-base`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}