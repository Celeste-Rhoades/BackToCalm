import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { colors, textStyles } from "../utils/theme";
import { Picker } from "@react-native-picker/picker";

const Step1Acknowledge = ({
  selectedEmotion,
  setSelectedEmotion,
  initialRating,
  setInitialRating,
}: any) => {
  // Screen dimensions with state for responsive updates
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  // Listen for screen size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Responsive breakpoints
  const isMobile = screenWidth < 375;
  const isTablet = screenWidth >= 375 && screenWidth < 768;
  const isDesktop = screenWidth >= 768;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isMobile ? "5%" : isTablet ? "8%" : "10%",
      paddingVertical: isMobile ? "22%" : isTablet ? "18%" : "5%",
    },
    title: {
      fontSize: isMobile ? 16 : isTablet ? 22 : 32,
      fontWeight: "bold",
      color: colors.secondary,
      textAlign: "center",
      marginBottom: isMobile ? "6%" : isTablet ? "3%" : "4%",
      ...textStyles.body,
    },
    subtitle: {
      fontSize: isMobile ? 14 : isTablet ? 18 : 28,
      color: colors.secondary,
      marginBottom: isMobile ? "4%" : isTablet ? "2%" : "2%",
      textAlign: "center",
      ...textStyles.body,
    },
    sliderContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      maxWidth: 500,
      marginVertical: isMobile ? "3%" : isTablet ? "3%" : ".25%",
    },
    emotions: {
      fontSize: isMobile ? 10 : isTablet ? 12 : 16,
      ...textStyles.header,
      paddingHorizontal: isMobile ? "2%" : "3%",
      color: colors.secondary,
    },
    slider: {
      flex: 1,
      height: 40,
    },
    ratingText: {
      fontSize: isMobile ? 12 : isTablet ? 14 : 18,
      color: colors.secondary,
      marginTop: isMobile ? "1%" : isTablet ? "2%" : "1%",
      ...textStyles.body,
    },
  });

  return (
    <View style={styles.container}>
      {/* Step title */}
      <Text style={styles.title}>
        Step 1: Acknowledge my emotions non-judgmentally
      </Text>

      {/* Rating question */}
      <Text style={styles.subtitle}>At what level are your Emotions?</Text>

      {/* Slider  */}
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
