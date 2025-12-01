import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onFinish={() => setCurrentScreen('login')} />;
      case 'login':
        return (
          <LoginScreen 
            onLogin={() => setCurrentScreen('dashboard')} 
            onRegister={() => setCurrentScreen('register')} 
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => setCurrentScreen('login')}
            onRegisterSuccess={() => setCurrentScreen('dashboard')}
          />
        );
      case 'dashboard':
        return <DashboardScreen />;
      default:
        return <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />;
    }
  };

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
