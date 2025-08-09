import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import useResponsive from '../utils/useResponsive';

export default function ResultsScreen({ navigation, route }) {
  const { photo, ingredients = [], error } = route.params || {};
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const { isDesktop, isTablet, isWeb } = useResponsive();

  // Count ingredients by status
  const harmfulCount = ingredients.filter(ing => ing.status === 'harmful').length;
  const safeCount = ingredients.filter(ing => ing.status === 'safe').length;
  const neutralCount = ingredients.filter(ing => ing.status === 'neutral').length;

  // Handle ingredient tap to expand/collapse
  const toggleIngredient = (index) => {
    setExpandedIngredient(expandedIngredient === index ? null : index);
  };

  // Handle done button
  const handleDone = () => {
    Alert.alert(
      'Analysis Complete',
      'Would you like to scan another product?',
      [
        { text: 'Exit', onPress: () => navigation.navigate('Camera') },
        { text: 'Scan Again', onPress: () => navigation.navigate('Camera') },
      ]
    );
  };

  // Handle save results (placeholder)
  const handleSave = () => {
    Alert.alert(
      'Save Results',
      'Results saved to your device!',
      [{ text: 'OK' }]
    );
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-harmful text-xl font-montserratBold text-center mb-4">
            Analysis Failed
          </Text>
          <Text className="text-textPrimary text-base font-montserrat text-center mb-8">
            {error}
          </Text>
          <CustomButton
            title="Try Again"
            onPress={() => navigation.navigate('Camera')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white shadow-sm">
        <Text className={`text-textPrimary font-montserratBold ${
          isDesktop ? 'text-2xl' : 'text-xl'
        }`}>
          Ingredient Analysis
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Text className="text-textPrimary text-lg font-montserratMedium">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content - Responsive Layout */}
      <View className={`flex-1 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
        
        {/* Left Side: Summary (Desktop) / Top (Mobile) */}
        <View className={`${isDesktop ? 'w-1/3 p-6' : 'px-6 py-4'}`}>
          
          {/* Summary Cards */}
          <View className={`${
            isDesktop 
              ? 'space-y-4' 
              : isTablet 
                ? 'flex-row space-x-4' 
                : 'flex-row space-x-3'
          }`}>
            <SummaryCard 
              count={harmfulCount} 
              label="Harmful" 
              color="bg-harmful" 
              textColor="text-harmful"
              isDesktop={isDesktop}
            />
            <SummaryCard 
              count={safeCount} 
              label="Safe" 
              color="bg-safe" 
              textColor="text-safe"
              isDesktop={isDesktop}
            />
            <SummaryCard 
              count={neutralCount} 
              label="Neutral" 
              color="bg-gray-200" 
              textColor="text-gray-600"
              isDesktop={isDesktop}
            />
          </View>

          {/* Desktop: Additional Info */}
          {isDesktop && (
            <View className="mt-8 p-4 bg-white rounded-xl">
              <Text className="text-textPrimary font-montserratBold text-lg mb-3">
                Safety Overview
              </Text>
              <Text className="text-textPrimary font-montserrat mb-2">
                Total ingredients detected: {ingredients.length}
              </Text>
              <Text className={`font-montserrat ${
                harmfulCount > 0 ? 'text-harmful' : 'text-safe'
              }`}>
                {harmfulCount > 0 
                  ? `⚠️ ${harmfulCount} potentially harmful ingredients found`
                  : '✅ No harmful ingredients detected'
                }
              </Text>
            </View>
          )}
        </View>

        {/* Right Side: Ingredients List */}
        <View className={`${isDesktop ? 'flex-1 p-6' : 'flex-1 px-6'}`}>
          <Text className={`text-textPrimary font-montserratBold mb-4 ${
            isDesktop ? 'text-xl' : 'text-lg'
          }`}>
            Detected Ingredients ({ingredients.length})
          </Text>
          
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {ingredients.map((ingredient, index) => (
              <IngredientCard
                key={index}
                ingredient={ingredient}
                isExpanded={expandedIngredient === index}
                onPress={() => toggleIngredient(index)}
                isDesktop={isDesktop}
              />
            ))}

            {ingredients.length === 0 && (
              <View className="items-center py-12">
                <Text className="text-gray-500 font-montserrat text-center">
                  No ingredients detected. Try taking a clearer photo.
                </Text>
              </View>
            )}
            
            {/* Bottom spacing for mobile */}
            {!isDesktop && <View className="h-32" />}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Actions - Responsive */}
      <View className={`bg-white ${
        isDesktop 
          ? 'p-6 border-t border-gray-200' 
          : 'px-6 py-4 absolute bottom-0 left-0 right-0'
      }`}>
        <View className={`${
          isDesktop 
            ? 'flex-row justify-center space-x-4 max-w-md mx-auto' 
            : 'space-y-3'
        }`}>
          
          {!isDesktop && (
            <View className="flex-row space-x-3">
              <CustomButton
                title="Save Results"
                onPress={handleSave}
                variant="outline"
                size="medium"
                className="flex-1"
              />
              <CustomButton
                title="Share"
                onPress={() => Alert.alert('Share', 'Share functionality coming soon!')}
                variant="outline"
                size="medium"
                className="flex-1"
              />
            </View>
          )}
          
          <CustomButton
            title={isDesktop ? "Analyze Another Product" : "Done"}
            onPress={handleDone}
            size="large"
            className={isDesktop ? "px-8" : "w-full"}
          />
          
          {isDesktop && (
            <>
              <CustomButton
                title="Save Results"
                onPress={handleSave}
                variant="outline"
                size="large"
                className="px-8"
              />
              <CustomButton
                title="Share"
                onPress={() => Alert.alert('Share', 'Share functionality coming soon!')}
                variant="outline"
                size="large"
                className="px-8"
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Updated Summary card component
function SummaryCard({ count, label, color, textColor, isDesktop }) {
  return (
    <View className={`bg-white rounded-xl shadow-sm ${
      isDesktop 
        ? 'p-6 w-full' 
        : 'flex-1 p-4'
    }`}>
      <View className={`${
        isDesktop ? 'w-16 h-16 mb-4' : 'w-12 h-12 mb-2'
      } ${color} rounded-full items-center justify-center`}>
        <Text className={`text-white font-montserratBold ${
          isDesktop ? 'text-2xl' : 'text-lg'
        }`}>
          {count}
        </Text>
      </View>
      <Text className={`${textColor} font-montserratMedium ${
        isDesktop ? 'text-base' : 'text-sm'
      }`}>
        {label}
      </Text>
    </View>
  );
}

// Updated Ingredient card component
function IngredientCard({ ingredient, isExpanded, onPress, isDesktop }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'harmful': return 'bg-harmful bg-opacity-10 border-harmful';
      case 'safe': return 'bg-safe bg-opacity-10 border-safe';
      case 'neutral': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'harmful': return '⚠️';
      case 'safe': return '✅';
      case 'neutral': return 'ℹ️';
      default: return '❓';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-3 rounded-xl border ${getStatusColor(ingredient.status)} ${
        isDesktop ? 'p-6' : 'p-4'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className={`mr-2 ${isDesktop ? 'text-2xl' : 'text-lg'}`}>
              {getStatusIcon(ingredient.status)}
            </Text>
            <Text className={`text-textPrimary font-montserratBold flex-1 ${
              isDesktop ? 'text-xl' : 'text-lg'
            }`}>
              {ingredient.name}
            </Text>
          </View>
          
          {isExpanded && (
            <Text className={`text-textPrimary font-montserrat opacity-80 mt-2 ${
              isDesktop ? 'text-base' : 'text-sm'
            }`}>
              {ingredient.description}
            </Text>
          )}
        </View>
        
        <Text className={`text-textPrimary font-montserratMedium ml-2 ${
          isDesktop ? 'text-xl' : 'text-lg'
        }`}>
          {isExpanded ? '−' : '+'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}