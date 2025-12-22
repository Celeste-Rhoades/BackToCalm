import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { colors, textStyles } from "../utils/theme";

// Get screen dimensions for responsive styling
const { width } = Dimensions.get("window");
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 768;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  },
  title: {
    fontSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 32,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: "2%",
    ...textStyles.body,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  ratingText: {
    fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
    color: colors.secondary,
    marginTop: "2%",
    ...textStyles.body,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    marginVertical: "2%",
  },
  subtitle: {
    fontSize: isSmallScreen ? 18 : isMediumScreen ? 22 : 28,
    color: colors.secondary,
    marginBottom: "3%",
    marginTop: "5%",
    textAlign: "center",
    ...textStyles.body,
  },
  emotions: {
    fontSize: isSmallScreen ? 12 : isMediumScreen ? 14 : 16,
    ...textStyles.header,
    paddingHorizontal: "3%",
    color: colors.secondary,
  },
});

const Step1Acknowledge = ({
  selectedEmotion,
  setSelectedEmotion,
  initialRating,
  setInitialRating,
}: any) => {
  return (
    <View style={styles.container}>
      {/* Step title */}
      <Text style={styles.title}>
        Step 1: Acknowledge my emotions non-judgmentally
      </Text>

      {/* Rating question */}
      <Text style={styles.subtitle}>At what level are your Emotions?</Text>

      {/* Slider with labels */}
      <View style={styles.sliderContainer}>
        <Text style={styles.emotions}>Calm</Text>
        <Slider
          value={initialRating}
          onValueChange={setInitialRating}
          minimumValue={0}
          maximumValue={10}
          step={1}
          style={styles.slider}
          minimumTrackTintColor={colors.secondary}
          maximumTrackTintColor={colors.primary}
          thumbTintColor={colors.mutedTeal}
        />
        <Text style={styles.emotions}>Unbearable</Text>
      </View>

      {/* Display current rating */}
      <Text style={styles.ratingText}>
        Rating: {Math.round(initialRating)}/10
      </Text>
    </View>
  );
};

export default Step1Acknowledge;
