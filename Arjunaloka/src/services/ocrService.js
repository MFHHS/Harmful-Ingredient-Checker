// OCR Service for text extraction from images
// We'll use Tesseract.js for client-side OCR

import Tesseract from 'tesseract.js';

export class OCRService {
  
  // Extract text from image using Tesseract.js
  static async extractTextFromImage(imageUri, onProgress = null) {
    try {
      console.log('🔍 Starting OCR extraction...');
      
      const { data: { text } } = await Tesseract.recognize(
        imageUri,
        'eng', // English language
        {
          logger: onProgress ? (m) => {
            if (onProgress && m.status === 'recognizing text') {
              onProgress(Math.round(m.progress * 100));
            }
          } : undefined,
          // Optimize for ingredient lists
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,()-',
          tessedit_pageseg_mode: 6, // Uniform block of text
        }
      );

      console.log('✅ OCR Text extracted:', text);
      return text;
      
    } catch (error) {
      console.error('❌ OCR Error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  // Clean and parse ingredient text
  static parseIngredients(text) {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Common ingredient list patterns
    const cleanText = text
      .replace(/ingredients?:?/gi, '') // Remove "Ingredients:" labels
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Split by common delimiters
    const ingredients = cleanText
      .split(/[,;.]/) // Split by comma, semicolon, or period
      .map(ingredient => 
        ingredient
          .trim()
          .replace(/^\W+|\W+$/g, '') // Remove leading/trailing punctuation
          .replace(/\s+/g, ' ') // Normalize spaces
      )
      .filter(ingredient => 
        ingredient.length > 2 && // At least 3 characters
        !/^\d+$/.test(ingredient) && // Not just numbers
        ingredient.toLowerCase() !== 'ingredients' // Not the word "ingredients"
      )
      .slice(0, 20); // Limit to first 20 ingredients

    console.log('🧪 Parsed ingredients:', ingredients);
    return ingredients;
  }

  // Main method: Extract and parse in one go
  static async extractIngredients(imageUri, onProgress = null) {
    try {
      const text = await this.extractTextFromImage(imageUri, onProgress);
      const ingredients = this.parseIngredients(text);
      
      return {
        success: true,
        rawText: text,
        ingredients: ingredients,
        count: ingredients.length
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rawText: '',
        ingredients: [],
        count: 0
      };
    }
  }
}

// Alternative: Mock OCR for testing (when Tesseract is too slow)
export class MockOCRService {
  static async extractIngredients(imageUri, onProgress = null) {
    // Simulate progress
    if (onProgress) {
      for (let i = 0; i <= 100; i += 20) {
        onProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Return mock ingredients for testing
    return {
      success: true,
      rawText: "Ingredients: Water, Sodium Lauryl Sulfate, Glycerin, Parabens, Vitamin E, Dimethicone, Aloe Vera, Fragrance",
      ingredients: [
        "Water",
        "Sodium Lauryl Sulfate", 
        "Glycerin",
        "Parabens",
        "Vitamin E",
        "Dimethicone",
        "Aloe Vera",
        "Fragrance"
      ],
      count: 8
    };
  }
}