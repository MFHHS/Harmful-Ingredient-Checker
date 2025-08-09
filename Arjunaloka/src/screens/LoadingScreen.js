import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DUMMY_TEXT } from '../constants';
import Icon from '../components/Icon';

export default function LoadingScreen({ navigation, route }) {
  const { photo } = route.params || {};
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Start pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnimation.start();
    pulseAnimation.start();

    // Simulate analysis process
    const analysisTimer = setTimeout(() => {
      performAnalysis();
    }, 3000);

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
      clearTimeout(analysisTimer);
    };
  }, []);

  // Simulate ingredient analysis (we'll connect to real OCR + backend later)
  const performAnalysis = async () => {
    try {
      // For now, simulate with dummy data
      // In real implementation: OCR photo → extract text → send to your Flask API
      
      const mockIngredientResults = [
        { name: "Water", status: "safe", description: "Essential hydrating ingredient" },
        { name: "Sodium Lauryl Sulfate", status: "harmful", description: "Can cause skin irritation" },
        { name: "Glycerin", status: "safe", description: "Moisturizing and safe for most skin types" },
        { name: "Parabens", status: "harmful", description: "Preservatives linked to hormonal disruption" },
        { name: "Vitamin E", status: "safe", description: "Antioxidant that protects skin" },
        { name: "Dimethicone", status: "harmful", description: "Silicone that can clog pores" },
        { name: "Aloe Vera", status: "safe", description: "Soothing and healing properties" },
        { name: "Fragrance", status: "neutral", description: "May cause reactions in sensitive individuals" },
      ];

      // Navigate to results with mock data
      navigation.replace('Results', { 
        photo,
        ingredients: mockIngredientResults,
        analysisComplete: true 
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error - could show error screen or retry option
      navigation.replace('Results', { 
        photo,
        ingredients: [],
        error: "Analysis failed. Please try again." 
      });
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* App Logo */}
        <View className="mb-8">
          <Animated.View
            style={{
              transform: [
                { scale: scaleAnim },
                { rotate: spin }
              ]
            }}
          >
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center">
              <Text className="text-background text-3xl font-montserratBold">A</Text>
            </View>
          </Animated.View>
        </View>

        {/* Loading Text */}
        <Text className="text-textPrimary text-2xl font-montserratBold text-center mb-4">
          Analyzing Ingredients
        </Text>

        {/* Description */}
        <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80 mb-8">
          Please wait while we scan and analyze the ingredients in your photo...
        </Text>

        {/* Progress Steps */}
        <View className="w-full max-w-sm">
          <ProgressStep step={1} text="Scanning text from image" completed={true} />
          <ProgressStep step={2} text="Identifying ingredients" completed={true} />
          <ProgressStep step={3} text="Checking safety database" loading={true} />
          <ProgressStep step={4} text="Generating report" completed={false} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Progress step component
function ProgressStep({ step, text, completed, loading }) {
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [loading]);

  return (
    <View className="flex-row items-center mb-4">
      {/* Step indicator */}
      <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
        completed ? 'bg-safe' : loading ? 'bg-primary' : 'bg-gray-300'
      }`}>
        {completed ? (
          <Text className="text-white text-xs font-montserratBold">✓</Text>
        ) : loading ? (
          <Animated.View
            style={{
              opacity: dotAnim,
            }}
          >
            <View className="w-2 h-2 bg-white rounded-full" />
          </Animated.View>
        ) : (
          <Text className="text-gray-500 text-xs font-montserratBold">{step}</Text>
        )}
      </View>
      
      {/* Step text */}
      <Text className={`font-montserrat flex-1 ${
        completed ? 'text-textPrimary' : loading ? 'text-primary' : 'text-gray-500'
      }`}>
        {text}
      </Text>
    </View>
  );
}