// API configuration for Main.ipynb backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface IngredientResult {
    type: 'harmful' | 'safe' | 'neutral';
    name: string;
    description: string;
}

export interface AnalysisResponse {
    success: boolean;
    ingredients: IngredientResult[];
    summary: {
        total: number;
        harmful: number;
        safe: number;
        neutral: number;
    };
}

export interface ErrorResponse {
    error: string;
}

// Ingredient descriptions database (frontend side)
const INGREDIENT_DESCRIPTIONS: Record<string, string> = {
    "sodium lauryl sulfate": "Can cause skin irritation, strips natural oils, and may damage hair follicles. Commonly found in shampoos and cleansers.",
    "sodium laureth sulfate": "Similar to SLS, can dry out skin and hair, potentially contaminated with carcinogenic byproducts during manufacturing.",
    "dimethicone": "Silicone-based polymer that can clog pores, prevent skin from breathing, and cause buildup on hair and skin.",
    "parabens": "Endocrine disruptors that can mimic estrogen. Linked to hormonal imbalances and potential breast cancer risk.",
    "formaldehyde": "Known carcinogen that can cause allergic reactions, respiratory issues, and skin irritation.",
    "phthalates": "Endocrine disruptors linked to reproductive issues, developmental problems, and cancer.",
    "isopropyl alcohol": "Drying agent that strips natural oils, causing skin dryness, irritation, and premature aging."
};

/**
 * Check if the backend is healthy and running
 */
export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'GET',
        });
        return response.ok;
    } catch (error) {
        console.error('Health check failed:', error);
        return false;
    }
}

/**
 * Simple OCR simulation - extracts text from image
 * In production, you'd use a real OCR library or service
 */
async function extractTextFromImage(file: File): Promise<string> {
    // For now, return a mock text that contains some ingredients
    // Your friend can integrate real OCR later
    console.log('Extracting text from:', file.name);
    
    // This is a placeholder - your friend should implement real OCR
    // For now, we'll use a sample ingredient list for testing
    return `
        Ingredients: Water, Sodium Lauryl Sulfate, Cocamidopropyl Betaine, 
        Sodium Chloride, Fragrance, Dimethicone, Citric Acid, 
        Sodium Benzoate, Parabens, Polyquaternium-10
    `;
}

/**
 * Parse ingredients from text
 */
function parseIngredients(text: string): string[] {
    // Clean up text
    const cleanText = text.toLowerCase()
        .replace(/ingredients?:/gi, '')
        .replace(/contains?:/gi, '');
    
    // Split by common delimiters
    const ingredients = cleanText.split(/[,;.\n]/)
        .map(ing => ing.trim())
        .filter(ing => ing.length > 2);
    
    return ingredients;
}

/**
 * Analyze ingredients from an uploaded image
 * Uses your friend's /check_ingredients endpoint
 */
export async function analyzeImage(file: File): Promise<AnalysisResponse> {
    try {
        // Step 1: Extract text from image (OCR)
        const extractedText = await extractTextFromImage(file);
        
        // Step 2: Parse ingredients from text
        const ingredientsList = parseIngredients(extractedText);
        
        if (ingredientsList.length === 0) {
            throw new Error('No ingredients found in the image');
        }
        
        // Step 3: Call your friend's API to check ingredients
        const response = await fetch(`${API_BASE_URL}/check_ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsList }),
        });

        if (!response.ok) {
            throw new Error('Failed to analyze ingredients');
        }

        const data = await response.json();
        
        // Step 4: Transform response to match our frontend format
        const results: IngredientResult[] = ingredientsList.map(ingredient => {
            const ingredientLower = ingredient.toLowerCase();
            const isHarmful = data.harmful.some((h: string) => 
                ingredientLower.includes(h.toLowerCase()) || 
                h.toLowerCase().includes(ingredientLower)
            );
            
            if (isHarmful) {
                return {
                    type: 'harmful',
                    name: ingredient.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    description: INGREDIENT_DESCRIPTIONS[ingredientLower] || 
                        'This ingredient has been identified as potentially harmful. Consult with a dermatologist for more information.'
                };
            } else {
                return {
                    type: 'safe',
                    name: ingredient.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    description: 'This ingredient is considered safe based on current analysis.'
                };
            }
        });
        
        // Calculate summary
        const harmful = results.filter(r => r.type === 'harmful').length;
        const safe = results.filter(r => r.type === 'safe').length;
        
        return {
            success: true,
            ingredients: results,
            summary: {
                total: results.length,
                harmful,
                safe,
                neutral: 0
            }
        };
        
    } catch (error) {
        console.error('Error analyzing image:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to analyze image. Please try again.');
    }
}

/**
 * Check a list of ingredients (manual input)
 * Uses your friend's /check_ingredients endpoint directly
 */
export async function checkIngredients(ingredients: string[]): Promise<AnalysisResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/check_ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients }),
        });

        if (!response.ok) {
            throw new Error('Failed to check ingredients');
        }

        const data = await response.json();
        
        // Transform response
        const results: IngredientResult[] = ingredients.map(ingredient => {
            const ingredientLower = ingredient.toLowerCase();
            const isHarmful = data.harmful.some((h: string) => 
                ingredientLower.includes(h.toLowerCase()) || 
                h.toLowerCase().includes(ingredientLower)
            );
            
            if (isHarmful) {
                return {
                    type: 'harmful',
                    name: ingredient,
                    description: INGREDIENT_DESCRIPTIONS[ingredientLower] || 
                        'This ingredient has been identified as potentially harmful.'
                };
            } else {
                return {
                    type: 'safe',
                    name: ingredient,
                    description: 'This ingredient is considered safe based on current analysis.'
                };
            }
        });
        
        const harmful = results.filter(r => r.type === 'harmful').length;
        const safe = results.filter(r => r.type === 'safe').length;
        
        return {
            success: true,
            ingredients: results,
            summary: {
                total: results.length,
                harmful,
                safe,
                neutral: 0
            }
        };
        
    } catch (error) {
        console.error('Error checking ingredients:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to check ingredients. Please try again.');
    }
}
