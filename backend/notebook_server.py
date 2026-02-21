"""
Adapter to run the Main.ipynb Flask app
This file extracts the code from your friend's notebook and runs it as a standalone server
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

# Your friend's Flask app setup
app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# Your friend's harmful ingredients list (lowercase for case-insensitive matching)
HARMFUL_INGREDIENTS = {
    "sodium lauryl sulfate", "sodium laureth sulfate", "dimethicone", 
    "parabens", "formaldehyde", "phthalates", "isopropyl alcohol"
}

# Your friend's check_ingredients endpoint
@app.route('/check_ingredients', methods=['POST'])
def check_ingredients():
    data = request.json
    # Convert all ingredients to lowercase for case-insensitive comparison
    ingredients_lower = [ing.lower().strip() for ing in data.get("ingredients", [])]
    
    # Find harmful ingredients
    harmful_found = []
    for ingredient in ingredients_lower:
        for harmful in HARMFUL_INGREDIENTS:
            # Check if harmful ingredient is contained in the ingredient string
            if harmful in ingredient or ingredient in harmful:
                harmful_found.append(ingredient)
                break
    
    return jsonify({
        "harmful": harmful_found,
        "safe": len(harmful_found) == 0
    })

# Health check endpoint for testing
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"}), 200

if __name__ == '__main__':
    print("🚀 Starting Flask Backend Server (from Main.ipynb)...")
    print("📍 Server running on http://localhost:5000")
    print("🔍 Health check: http://localhost:5000/api/health")
    print("📤 Check endpoint: http://localhost:5000/check_ingredients")
    app.run(debug=True, host='0.0.0.0', port=5000)
