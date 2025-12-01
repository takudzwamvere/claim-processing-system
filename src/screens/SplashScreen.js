import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <View style={styles.iconBackground}>
          <MaterialCommunityIcons name="heart-pulse" size={64} color={COLORS.white} />
        </View>
        <Text style={styles.title}>MedChain Claims</Text>
        <Text style={styles.subtitle}>Secure Medical Claims</Text>
        <Text style={styles.poweredBy}>Powered by blockchain</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.getStartedButton}>Get Started</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconBackground: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 10,
  },
  poweredBy: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  getStartedButton: {
    color: COLORS.white,
    backgroundColor: COLORS.primaryLight, // Using a lighter purple for the button text background effect shown in image
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden', // To clip the background
    fontWeight: 'bold',
    fontSize: 14,
    // Actually the image shows "Get Started" as a button or just text. 
    // Let's make it look like the button in the last screenshot (purple pill)
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  }
});
