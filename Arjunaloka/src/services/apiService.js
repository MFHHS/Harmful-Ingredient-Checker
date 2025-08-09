// API Service to connect with Hani's Flask backend

export class ApiService {
  // TODO: Replace with Hani's actual Flask server URL
  static BASE_URL = 'http://127.0.0.1:5000'; // Local development
  // static BASE_URL = 'https://your-flask-app.herokuapp.com'; // Production

  // Check ingredients with Hani's Flask API
  static async checkIngredients(ingredientsList) {
    try {
      console.log('🔗 Sending ingredients to Flask API:', ingredientsList);
      
      const response = await fetch(`${this.BASE_URL}/check_ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredientsList
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Flask API response:', data);
      
      return {
        success: true,
        data: data
      };

    } catch (error) {
      console.error('❌ API Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Convert Flask response to our app's format
  static formatIngredientsForUI(flaskResponse, originalIngredients) {
    const { harmful, safe } = flaskResponse;
    
    // Create ingredient objects for UI
    const formattedIngredients = originalIngredients.map(ingredient => {
      const isHarmful = harmful.includes(ingredient);
      
      return {
        name: ingredient,
        status: isHarmful ? 'harmful' : 'safe',
        description: isHarmful 
          ? 'This ingredient may cause irritation or health concerns'
          : 'This ingredient is generally safe for most people'
      };
    });

    console.log('🎨 Formatted ingredients for UI:', formattedIngredients);
    return formattedIngredients;
  }

  // Main analysis method
  static async analyzeIngredients(ingredientsList) {
    try {
      // Step 1: Check ingredients with Flask API
      const apiResult = await this.checkIngredients(ingredientsList);
      
      if (!apiResult.success) {
        throw new Error(apiResult.error);
      }

      // Step 2: Format for UI
      const formattedIngredients = this.formatIngredientsForUI(
        apiResult.data, 
        ingredientsList
      );

      return {
        success: true,
        ingredients: formattedIngredients,
        summary: {
          total: ingredientsList.length,
          harmful: apiResult.data.harmful.length,
          safe: ingredientsList.length - apiResult.data.harmful.length,
          isOverallSafe: apiResult.data.safe
        }
      };

    } catch (error) {
      console.error('❌ Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        ingredients: [],
        summary: { total: 0, harmful: 0, safe: 0, isOverallSafe: false }
      };
    }
  }
}

// Mock API Service for testing when Flask server is not running
export class MockApiService {
  static async analyzeIngredients(ingredientsList) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock harmful ingredients (same as Flask backend)
    const harmfulIngredients = [
      "Sodium Lauryl Sulfate", 
      "Sodium Laureth Sulfate", 
      "Dimethicone", 
      "Parabens", 
      "Formaldehyde", 
      "Phthalates", 
      "Isopropyl Alcohol"
    ];

    const formattedIngredients = ingredientsList.map(ingredient => {
      const isHarmful = harmfulIngredients.some(harmful => 
        ingredient.toLowerCase().includes(harmful.toLowerCase())
      );
      
      return {
        name: ingredient,
        status: isHarmful ? 'harmful' : 'safe',
        description: isHarmful 
          ? 'This ingredient may cause skin irritation or health concerns'
          : 'This ingredient is generally safe for most people'
      };
    });

    const harmfulCount = formattedIngredients.filter(ing => ing.status === 'harmful').length;

    return {
      success: true,
      ingredients: formattedIngredients,
      summary: {
        total: ingredientsList.length,
        harmful: harmfulCount,
        safe: ingredientsList.length - harmfulCount,
        isOverallSafe: harmfulCount === 0
      }
    };
  }
}