import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// Fade In Animation Component
export function FadeInView({ children, delay = 0, duration = 800, className = '' }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateY, delay, duration]);

  return (
    <Animated.View
      className={className}
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// Scale In Animation
export function ScaleInView({ children, delay = 0, duration = 600, className = '' }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: duration * 0.8,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim, delay, duration]);

  return (
    <Animated.View
      className={className}
      style={{
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// Slide In Animation
export function SlideInView({ children, direction = 'left', delay = 0, duration = 700, className = '' }) {
  const translateX = useRef(new Animated.Value(direction === 'left' ? -100 : 100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: duration * 0.8,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [translateX, opacityAnim, delay, duration, direction]);

  return (
    <Animated.View
      className={className}
      style={{
        opacity: opacityAnim,
        transform: [{ translateX }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// Pulse Animation
export function PulseView({ children, duration = 2000, className = '' }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [scaleAnim, duration]);

  return (
    <Animated.View
      className={className}
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// Floating Animation
export function FloatingView({ children, duration = 3000, className = '' }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [translateY, duration]);

  return (
    <Animated.View
      className={className}
      style={{
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}