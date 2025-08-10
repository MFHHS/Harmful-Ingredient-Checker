import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInView, FloatingView, ScaleInView, SlideInView } from '../components/AnimatedComponents';
import CustomButton from '../components/CustomButton';
import { DUMMY_TEXT } from '../constants';
import useResponsive from '../utils/useResponsive';

export default function SplashScreen({ navigation }) {
  const { isWeb, isDesktop, isMobile } = useResponsive();

  useEffect(() => {
    // On mobile: auto-navigate after 3 seconds
    // On web: let user control when to start
    if (!isWeb) {
      const timer = setTimeout(() => {
        navigation.replace('Onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigation, isWeb]);

  const handleStartNow = () => {
    // On web: skip onboarding, go straight to permission/camera
    if (isWeb) {
      navigation.navigate('Permission');
    } else {
      navigation.replace('Onboarding');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={`flex-1 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
        
        {/* Main Content */}
        <View className={`${
          isDesktop 
            ? 'flex-1 items-center justify-center px-12' 
            : 'flex-1 items-center justify-center px-6'
        }`}>
          
          {/* Web: Show Start Now button immediately */}
          {isWeb && (
            <FadeInView delay={1200} className="mt-4">
              {isDesktop && (
                <FadeInView delay={1500}>
                  <Text className="text-textPrimary font-montserrat text-center mt-4 opacity-60 items-center">
                    Analyze cosmetic ingredients instantly with AI
                  </Text>
                </FadeInView>
              )}
            </FadeInView>
          )}

          {/* Mobile: Show loading indicator */}
          {!isWeb && (
            <FadeInView delay={1200} className="mt-6">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse" />
                <View className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse delay-100" />
                <View className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                <Text className="text-textPrimary font-montserrat ml-3 opacity-60">
                  Loading...
                </Text>
              </View>
            </FadeInView>
          )}
        </View>

        {/* Desktop: Side illustration/info */}
        {isDesktop && (
          <View className="flex-1 bg-white items-center justify-center px-12">
            <View className="max-w-md">
              
              {/* Feature list for desktop */}
              <FadeInView delay={800}>
                <Text className="text-textPrimary text-2xl font-montserratBold mb-6">
                  Scan or upload your product label — our AI instantly spots harmful or irritating ingredients and suggests safer options.
                </Text>
              </FadeInView>
              
              <SlideInView direction="right" delay={1000}>
                <FeatureItem 
                 //letak gambaq
                />
              </SlideInView>
              
              <SlideInView direction="right" delay={1200}>
                <FeatureItem 
                //letak gambaq
                />
              </SlideInView>

              <CustomButton
                title="Start Now"
                onPress={handleStartNow}
                size="large"
                className={isDesktop ? 'px-12 py-4' : 'px-8 py-3'}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Enhanced Feature item component for desktop
function FeatureItem({ icon, title, description }) {
  return (
    <View className="flex-row items-start mb-6 p-4 bg-background rounded-xl shadow-sm">
      <View className="w-12 h-12 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
        <Text className="text-2xl">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-textPrimary font-montserratBold text-lg mb-1">
          {title}
        </Text>
        <Text className="text-textPrimary font-montserrat opacity-80 text-sm">
          {description}
        </Text>
      </View>
    </View>
  );
}