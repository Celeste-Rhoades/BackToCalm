import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { colors, textStyles } from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.secondary,
    ...textStyles.body,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  ratingText: {
    fontSize: 18,
    color: colors.secondary,
    marginTop: 10,
    ...textStyles.body,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 28,
    color: colors.secondary,
    marginBottom: 20,
    paddingTop: 40,
    ...textStyles.body,
  },
  emotions: {
    fontSize: 16,
    ...textStyles.header,
    padding: 20,
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
      <Text style={styles.title}>
        Step 1: Acknowledge my emotions non-judgmentally
      </Text>
      <Text style={styles.subtitle}>How are you feeling?</Text>
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
      <Text style={styles.ratingText}>
        Rating: {Math.round(initialRating)}/10
      </Text>
    </View>
  );
};

export default Step1Acknowledge;
