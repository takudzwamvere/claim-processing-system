import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from './src/utils/supabase';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('splash');

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Wait a bit to simulate splash or check onboarding status
      setTimeout(() => setIsLoading(false), 2000); 
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentScreen('dashboard');
      } else {
        // If logged out, maybe go to login or onboarding
        // We'll keep it simple for now
        if (currentScreen === 'dashboard') setCurrentScreen('login'); 
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderScreen = () => {
    // If we have a session, show dashboard immediately (unless explicit logout logic handled elsewhere)
    if (session) return <DashboardScreen session={session} />;

    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onFinish={() => setCurrentScreen('login')} />;
      case 'login':
        return (
          <LoginScreen 
            onRegister={() => setCurrentScreen('register')} 
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => setCurrentScreen('login')}
          />
        );
      default:
        // Fallback
        return <LoginScreen onRegister={() => setCurrentScreen('register')} />;
    }
  };

  if (isLoading && currentScreen === 'splash') {
    return (
        <View style={styles.container}>
             <SplashScreen />
             <StatusBar style="auto" />
        </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
