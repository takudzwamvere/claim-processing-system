import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function RegisterScreen({ onBack, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    mobile: '',
    medicalAid: '',
    policyNumber: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        {/* Title could go here if needed */}
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="lock-outline" size={24} color={COLORS.primary} style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Encrypted Registration</Text>
            <Text style={styles.infoDescription}>
              All your personal and policy details are encrypted on your device before being securely stored on the blockchain network.
            </Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Angelica Mpofu"
            value={formData.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
          />

          <Text style={styles.label}>ID Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="63-123456A63"
            value={formData.idNumber}
            onChangeText={(text) => handleChange('idNumber', text)}
          />

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="angelica.mpofu@example.com"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="+263 77 123 4567"
            value={formData.mobile}
            onChangeText={(text) => handleChange('mobile', text)}
            keyboardType="phone-pad"
          />
          <Text style={styles.helperText}>For claim status alerts and notifications</Text>

          <Text style={styles.label}>Medical Aid Society *</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerText}>Select medical aid society</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
          </View>

          <Text style={styles.label}>Member/Policy Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="PSM123456"
            value={formData.policyNumber}
            onChangeText={(text) => handleChange('policyNumber', text)}
          />
          <Text style={styles.helperText}>Your medical aid policy number</Text>

          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.registerButton} onPress={onRegisterSuccess}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
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
  headerBar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F3E5F5', // Light purple bg
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary, // Using purple for labels as seen in image (or dark blue/black, but image has purple tint on focus or generally)
    // Actually image shows "Full Name *" in dark text, but "Medical Aid Society *" in dark text. 
    // Let's stick to dark text for labels to be safe, maybe primary for focus? 
    // The image shows "Medical Aid Society *" in dark blue/black.
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
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
    paddingVertical: 15,
    borderRadius: 30, // Rounded pill shape
    alignItems: 'center',
    marginTop: 30,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
