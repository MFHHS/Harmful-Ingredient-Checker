import { useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInView, ScaleInView } from '../components/AnimatedComponents';
import CustomButton from '../components/CustomButton';
import Icon from '../components/Icon';
import PageIndicator from '../components/PageIndicator';
import { DUMMY_TEXT } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  
  // Onboarding data
  const onboardingData = [
    {
      id: 1,
      icon: 'microscope',
      title: DUMMY_TEXT.intro1.title,
      description: DUMMY_TEXT.intro1.description,
    },
    {
      id: 2,
      icon: 'camera',
      title: DUMMY_TEXT.intro2.title,
      description: DUMMY_TEXT.intro2.description,
    },
    {
      id: 3,
      icon: 'shield',
      title: DUMMY_TEXT.intro3.title,
      description: DUMMY_TEXT.intro3.description,
    },
  ];

  // Handle page scroll
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / screenWidth);
    setCurrentPage(pageIndex);
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
      setCurrentPage(nextPage);
    } else {
      // Last page - go to permission screen
      navigation.navigate('Permission');
    }
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      flatListRef.current?.scrollToIndex({ index: prevPage, animated: true });
      setCurrentPage(prevPage);
    }
  };

  // Skip to permission screen
  const skipOnboarding = () => {
    navigation.navigate('Permission');
  };

  // Render each onboarding page with animations
  const renderOnboardingPage = ({ item, index }) => (
    <View style={{ width: screenWidth }} className="flex-1 items-center justify-center px-6">
      {/* Animated Icon/Illustration */}
      <ScaleInView delay={300} className="mb-12">
        <Icon 
          name={item.icon} 
          size="xlarge" 
          className="shadow-xl shadow-primary/20"
        />
      </ScaleInView>

      {/* Animated Title */}
      <FadeInView delay={600}>
        <Text className="text-textPrimary text-3xl font-montserratBold text-center mb-6 leading-9">
          {item.title}
        </Text>
      </FadeInView>

      {/* Animated Description */}
      <FadeInView delay={900}>
        <Text className="text-textPrimary text-base font-montserrat text-center leading-6 opacity-80 px-4">
          {item.description}
        </Text>
      </FadeInView>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Animated Header with Skip and Back buttons */}
      <FadeInView delay={100}>
        <View className="flex-row justify-between items-center px-6 py-4">
          {/* Back button - only show from page 2 onwards */}
          <TouchableOpacity
            onPress={goToPreviousPage}
            className={`w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm ${
              currentPage === 0 ? 'opacity-0' : 'opacity-100'
            }`}
            disabled={currentPage === 0}
          >
            <Text className="text-textPrimary text-lg font-montserratMedium">←</Text>
          </TouchableOpacity>

          {/* Skip button */}
          <TouchableOpacity 
            onPress={skipOnboarding}
            className="px-4 py-2 rounded-full bg-white shadow-sm"
          >
            <Text className="text-primary text-base font-montserratMedium">Skip</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>

      {/* Onboarding Content */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderOnboardingPage}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>

      {/* Animated Bottom Section */}
      <FadeInView delay={200}>
        <View className="px-6 pb-8">
          {/* Page Indicators */}
          <PageIndicator 
            currentPage={currentPage} 
            totalPages={onboardingData.length}
            className="mb-8"
          />

          {/* Next/Start Button */}
          <CustomButton
            title={currentPage === onboardingData.length - 1 ? 'Start Now' : 'Next'}
            onPress={goToNextPage}
            size="large"
            className="w-full shadow-xl shadow-primary/25"
          />
        </View>
      </FadeInView>
    </SafeAreaView>
  );
}