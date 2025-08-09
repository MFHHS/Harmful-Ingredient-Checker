# Test Flask Server - Based on Hani's backend
from flask import Flask, request, jsonify
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# Harmful ingredients list (same as Hani's)
HARMFUL_INGREDIENTS = {
    "Sodium Lauryl Sulfate", 
    "Sodium Laureth Sulfate", 
    "Dimethicone", 
    "Parabens", 
    "Formaldehyde", 
    "Phthalates", 
    "Isopropyl Alcohol"
}

@app.route('/check_ingredients', methods=['POST'])
def check_ingredients():
    """
    API endpoint to check ingredients safety
    Expected input: {"ingredients": ["ingredient1", "ingredient2", ...]}
    Returns: {"harmful": [...], "safe": true/false}
    """
    try:
        data = request.json
        print(f"📝 Received request: {data}")
        
        # Get ingredients from request
        ingredients = set(data.get("ingredients", []))
        print(f"🧪 Checking ingredients: {ingredients}")
        
        # Find harmful ingredients
        harmful_found = list(ingredients.intersection(HARMFUL_INGREDIENTS))
        print(f"⚠️  Harmful ingredients found: {harmful_found}")
        
        # Prepare response
        response = {
            "harmful": harmful_found,
            "safe": len(harmful_found) == 0,
            "total_checked": len(ingredients),
            "message": "Analysis complete"
        }
        
        print(f"✅ Sending response: {response}")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "harmful": [],
            "safe": False
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "Flask server is running!",
        "harmful_ingredients_count": len(HARMFUL_INGREDIENTS)
    })

@app.route('/', methods=['GET'])
def home():
    """Home endpoint with API info"""
    return jsonify({
        "app": "Arjunaloka Ingredient Checker API",
        "version": "1.0.0",
        "endpoints": {
            "/": "API information",
            "/health": "Health check",
            "/check_ingredients": "POST - Check ingredients safety"
        },
        "harmful_ingredients": list(HARMFUL_INGREDIENTS)
    })

if __name__ == '__main__':
    print("🚀 Starting Arjunaloka Flask Server...")
    print("📋 Harmful ingredients loaded:", len(HARMFUL_INGREDIENTS))
    print("🌐 Server will be available at: http://127.0.0.1:5000")
    print("🔗 API endpoint: http://127.0.0.1:5000/check_ingredients")
    print("💻 Access from your app or test in browser!")
    
    app.run(
        debug=True,      # Enable debug mode
        host='0.0.0.0',  # Allow network access
        port=5000        # Standard Flask port
    )