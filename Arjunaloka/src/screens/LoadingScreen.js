import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DUMMY_TEXT } from '../constants';
import { FadeInView, ScaleInView, PulseView } from '../components/AnimatedComponents';
import { OCRService, MockOCRService } from '../services/ocrService';
import { ApiService, MockApiService } from '../services/apiService';

// Toggle between real and mock services for testing
const USE_MOCK_SERVICES = false; // Set to false when Flask server is ready

export default function LoadingScreen({ navigation, route }) {
  const { photo } = route.params || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing analysis...');
  
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();

    // Start the real analysis process
    performRealAnalysis();

    return () => {
      rotateAnimation.stop();
    };
  }, []);

  // Real analysis using OCR + Flask backend
  const performRealAnalysis = async () => {
    try {
      // Step 1: Extract text from image using OCR
      setCurrentStep(1);
      setStatusText('Scanning text from image...');
      
      const ocrService = USE_MOCK_SERVICES ? MockOCRService : OCRService;
      const ocrResult = await ocrService.extractIngredients(
        photo?.uri || '',
        (progress) => {
          setProgress(progress);
          setStatusText(`Scanning text... ${progress}%`);
        }
      );

      if (!ocrResult.success) {
        throw new Error(ocrResult.error || 'Failed to extract text from image');
      }

      // Step 2: Parse ingredients
      setCurrentStep(2);
      setStatusText('Identifying ingredients...');
      await new Promise(resolve => setTimeout(resolve, 800)); // UX delay

      // Step 3: Analyze with Flask backend
      setCurrentStep(3);
      setStatusText('Checking safety database...');
      
      const apiService = USE_MOCK_SERVICES ? MockApiService : ApiService;
      const analysisResult = await apiService.analyzeIngredients(ocrResult.ingredients);

      if (!analysisResult.success) {
        throw new Error(analysisResult.error || 'Failed to analyze ingredients');
      }

      // Step 4: Complete
      setCurrentStep(4);
      setStatusText('Generating report...');
      await new Promise(resolve => setTimeout(resolve, 500)); // UX delay

      // Navigate to results with real data
      navigation.replace('Results', { 
        photo,
        ingredients: analysisResult.ingredients,
        summary: analysisResult.summary,
        rawText: ocrResult.rawText,
        analysisComplete: true 
      });

    } catch (error) {
      console.error('❌ Analysis failed:', error);
      
      // Navigate to results with error
      navigation.replace('Results', { 
        photo,
        ingredients: [],
        error: `Analysis failed: ${error.message}. Please try again with a clearer photo.`
      });
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Update progress bar based on current step
  useEffect(() => {
    const targetProgress = (currentStep / 4) * 100;
    Animated.timing(progressAnim, {
      toValue: targetProgress / 100,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        {/* Animated App Logo */}
        <ScaleInView delay={200} className="mb-8">
          <Animated.View
            style={{
              transform: [{ rotate: spin }]
            }}
          >
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center shadow-xl shadow-primary/30">
              <Text className="text-background text-3xl font-montserratBold">A</Text>
            </View>
          </Animated.View>
        </ScaleInView>

        {/* Animated Loading Text */}
        <FadeInView delay={600}>
          <Text className="text-textPrimary text-2xl font-montserratBold text-center mb-4">
            Analyzing Ingredients
          </Text>
        </FadeInView>

        {/* Dynamic Status Text */}
        <FadeInView delay={900}>
          <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80 mb-12">
            {statusText}
          </Text>
        </FadeInView>

        {/* Animated Progress Bar */}
        <FadeInView delay={1200} className="w-full max-w-sm mb-8">
          <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View
              className="h-full bg-primary rounded-full"
              style={{
                width: progressWidth,
              }}
            />
          </View>
          <Text className="text-center text-textPrimary font-montserrat text-sm mt-2 opacity-60">
            Step {currentStep} of 4
          </Text>
        </FadeInView>

        {/* Enhanced Progress Steps */}
        <View className="w-full max-w-sm">
          <FadeInView delay={400}>
            <ProgressStep 
              step={1} 
              text="Scanning text from image" 
              completed={currentStep > 1} 
              loading={currentStep === 1} 
            />
          </FadeInView>
          <FadeInView delay={800}>
            <ProgressStep 
              step={2} 
              text="Identifying ingredients" 
              completed={currentStep > 2} 
              loading={currentStep === 2} 
            />
          </FadeInView>
          <FadeInView delay={1200}>
            <ProgressStep 
              step={3} 
              text="Checking safety database" 
              completed={currentStep > 3} 
              loading={currentStep === 3} 
            />
          </FadeInView>
          <FadeInView delay={1600}>
            <ProgressStep 
              step={4} 
              text="Generating report" 
              completed={currentStep > 4} 
              loading={currentStep === 4} 
            />
          </FadeInView>
        </View>

        {/* Service Mode Indicator (for development) */}
        {__DEV__ && (
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-xs text-gray-500 text-center">
              Mode: {USE_MOCK_SERVICES ? '🧪 Mock Services' : '🔗 Real Backend'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Enhanced Progress step component
function ProgressStep({ step, text, completed, loading }) {
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0,
            duration: 600,
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
      {/* Enhanced Step indicator */}
      <View className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${
        completed ? 'bg-safe shadow-lg shadow-safe/25' : loading ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-gray-300'
      }`}>
        {completed ? (
          <Text className="text-white text-sm font-montserratBold">✓</Text>
        ) : loading ? (
          <PulseView duration={1200}>
            <Animated.View
              style={{
                opacity: dotAnim,
              }}
            >
              <View className="w-3 h-3 bg-white rounded-full" />
            </Animated.View>
          </PulseView>
        ) : (
          <Text className="text-gray-500 text-sm font-montserratBold">{step}</Text>
        )}
      </View>
      
      {/* Enhanced Step text */}
      <Text className={`font-montserrat flex-1 ${
        completed ? 'text-textPrimary font-montserratMedium' : loading ? 'text-primary font-montserratMedium' : 'text-gray-500'
      }`}>
        {text}
      </Text>
    </View>
  );
}