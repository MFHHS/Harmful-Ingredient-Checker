"# Backend" 

# Frontend
📌 Arjunaloka – Phase 1 Setup

Create Project & Navigate
npx create-expo-app Arjunaloka --template blank
cd Arjunaloka

Install Packages
# Styling
npm install nativewind && npm install --save-dev tailwindcss
# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
# Camera & utilities
npx expo install expo-camera expo-media-library expo-image-picker
npm install expo-linear-gradient

Config Files
tailwind.config.js → setup Tailwind
metro.config.js → enable NativeWind
global.css → Tailwind imports

Structure
Arjunaloka/
├── src/
│   ├── components/           # Reusable components
│   ├── screens/             # All your layouts/screens
│   ├── navigation/          # Navigation setup
│   ├── constants/           # Colors, sizes, etc.
│   └── utils/               # Helper functions
├── assets/                  # Images, icons
├── App.js                   # Main app entry
└── global.css              # Tailwind CSS

Run App
npx expo start
OR
npx expo start -c (to clear cache) 