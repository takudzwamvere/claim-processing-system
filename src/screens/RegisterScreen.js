import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar as RNStatusBar, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import { COLORS } from '../constants/colors';

export default function RegisterScreen({ onBack }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      if (!session) Alert.alert('Check your email', 'Please check your inbox for email verification!');
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Join MedChain</Text>
        <Text style={styles.subtitle}>Start your secure medical journey</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="member@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.registerButton} onPress={signUpWithEmail} disabled={loading}>
            {loading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
           <Text style={styles.footerText}>By registering, you agree to our Terms of Service and Privacy Policy.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
    marginRight: 24, // To offset the back button width
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    backgroundColor: '#FFF',
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#757575',
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 5, // Match Login button
    alignItems: 'center',
    marginBottom: 15,
    height: 48,
    justifyContent: 'center'
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
