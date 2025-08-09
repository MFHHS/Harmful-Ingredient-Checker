import { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInView, PulseView, ScaleInView } from '../components/AnimatedComponents';

export default function LoadingScreen({ navigation, route }) {
  const { photo } = route.params || {};
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

    // Start progress animation
    const progressAnimation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });

    rotateAnimation.start();
    progressAnimation.start();

    // Simulate analysis process
    const analysisTimer = setTimeout(() => {
      performAnalysis();
    }, 3000);

    return () => {
      rotateAnimation.stop();
      progressAnimation.stop();
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

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

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

        {/* Animated Description */}
        <FadeInView delay={900}>
          <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80 mb-12">
            Please wait while we scan and analyze the ingredients in your photo...
          </Text>
        </FadeInView>

        {/* Animated Progress Bar */}
        <FadeInView delay={1200} className="w-full max-w-sm mb-8">
          <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View
              className="h-full bg-primary rounded-full"
              style={{
                width: progressWidth,
              }}
            />
          </View>
          <Text className="text-center text-textPrimary font-montserrat text-sm mt-2 opacity-60">
            Processing image...
          </Text>
        </FadeInView>

        {/* Enhanced Progress Steps */}
        <View className="w-full max-w-sm">
          <FadeInView delay={400}>
            <ProgressStep step={1} text="Scanning text from image" completed={true} />
          </FadeInView>
          <FadeInView delay={800}>
            <ProgressStep step={2} text="Identifying ingredients" completed={true} />
          </FadeInView>
          <FadeInView delay={1200}>
            <ProgressStep step={3} text="Checking safety database" loading={true} />
          </FadeInView>
          <FadeInView delay={1600}>
            <ProgressStep step={4} text="Generating report" completed={false} />
          </FadeInView>
        </View>
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