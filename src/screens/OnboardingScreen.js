import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const SLIDES = [
  {
    id: 1,
    title: 'Submit claims easily',
    description: 'Quick and simple claim submission process with document upload',
    icon: 'file-document-outline',
  },
  {
    id: 2,
    title: 'Track claim status',
    description: 'Monitor your claims in real-time from submission to approval',
    icon: 'chart-line-variant',
  },
  {
    id: 3,
    title: 'Reduce fraud, improve trust',
    description: 'Blockchain-secured claims ensure transparency and security',
    icon: 'shield-check-outline',
  },
];

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ onFinish }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={currentSlide.icon} size={80} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlideIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextText}>
              {currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F3E5F5', // Very light purple
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  skipText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  nextText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});
