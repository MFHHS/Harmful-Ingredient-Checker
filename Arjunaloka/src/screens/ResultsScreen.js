import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

export default function ResultsScreen({ navigation, route }) {
  const { photo, ingredients = [], error } = route.params || {};
  const [expandedIngredient, setExpandedIngredient] = useState(null);

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
        <Text className="text-textPrimary text-xl font-montserratBold">
          Ingredient Analysis
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Text className="text-textPrimary text-lg font-montserratMedium">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View className="px-6 py-4">
        <View className="flex-row space-x-3">
          <SummaryCard 
            count={harmfulCount} 
            label="Harmful" 
            color="bg-harmful" 
            textColor="text-harmful"
          />
          <SummaryCard 
            count={safeCount} 
            label="Safe" 
            color="bg-safe" 
            textColor="text-safe"
          />
          <SummaryCard 
            count={neutralCount} 
            label="Neutral" 
            color="bg-gray-200" 
            textColor="text-gray-600"
          />
        </View>
      </View>

      {/* Ingredients List */}
      <ScrollView className="flex-1 px-6">
        <Text className="text-textPrimary text-lg font-montserratBold mb-4">
          Detected Ingredients ({ingredients.length})
        </Text>
        
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={index}
            ingredient={ingredient}
            isExpanded={expandedIngredient === index}
            onPress={() => toggleIngredient(index)}
          />
        ))}

        {ingredients.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-gray-500 font-montserrat text-center">
              No ingredients detected. Try taking a clearer photo.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View className="px-6 py-4 bg-white">
        <View className="flex-row space-x-3 mb-3">
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
        
        <CustomButton
          title="Done"
          onPress={handleDone}
          size="large"
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}

// Summary card component
function SummaryCard({ count, label, color, textColor }) {
  return (
    <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
      <View className={`w-12 h-12 ${color} rounded-full items-center justify-center mb-2`}>
        <Text className="text-white font-montserratBold text-lg">{count}</Text>
      </View>
      <Text className={`${textColor} font-montserratMedium text-sm`}>{label}</Text>
    </View>
  );
}

// Ingredient card component
function IngredientCard({ ingredient, isExpanded, onPress }) {
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
      className={`mb-3 p-4 rounded-xl border ${getStatusColor(ingredient.status)}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg mr-2">{getStatusIcon(ingredient.status)}</Text>
            <Text className="text-textPrimary font-montserratBold flex-1">
              {ingredient.name}
            </Text>
          </View>
          
          {isExpanded && (
            <Text className="text-textPrimary font-montserrat text-sm opacity-80 mt-2">
              {ingredient.description}
            </Text>
          )}
        </View>
        
        <Text className="text-textPrimary text-lg font-montserratMedium ml-2">
          {isExpanded ? '−' : '+'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}