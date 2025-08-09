// Colors - matching your design
export const COLORS = {
  background: '#F9F9F9',
  primary: '#355EA2',
  textPrimary: '#424242',
  harmful: '#FF8B94',
  safe: '#A8E6CF',
  white: '#FFFFFF',
  black: '#000000',
};

// Common styles
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // For Android
  },
};

// Screen dimensions breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

// Dummy content
export const DUMMY_TEXT = {
  appName: "IngredientChecker",
  appDescription: "Scan and analyze ingredients in your cosmetic products to know what's safe and what's not.",
  intro1: {
    title: "Smart Ingredient Analysis",
    description: "Take a photo of any cosmetic product and instantly know which ingredients are safe or harmful for your skin."
  },
  intro2: {
    title: "Easy to Use",
    description: "Simply point your camera at the ingredients list and let our AI do the rest. Get results in seconds!"
  },
  intro3: {
    title: "Stay Safe & Informed",
    description: "Make better choices for your skin health with our comprehensive ingredient database and safety ratings."
  },
  permission: {
    title: "Camera Access",
    description: "We need access to your camera to scan ingredient lists. Your photos are processed locally and never stored."
  }
};