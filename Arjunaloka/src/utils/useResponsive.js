import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

export default function useResponsive() {
  const [screenData, setScreenData] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isWeb: Platform.OS === 'web',
      orientation: width > height ? 'landscape' : 'portrait'
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({
        width: window.width,
        height: window.height,
        isMobile: window.width < 768,
        isTablet: window.width >= 768 && window.width < 1024,
        isDesktop: window.width >= 1024,
        isWeb: Platform.OS === 'web',
        orientation: window.width > window.height ? 'landscape' : 'portrait'
      });
    });

    return () => subscription?.remove();
  }, []);

  return screenData;
}