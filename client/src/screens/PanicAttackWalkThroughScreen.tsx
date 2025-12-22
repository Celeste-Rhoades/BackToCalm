import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { colors, textStyles } from "../utils/theme";
import Step1Acknowledge from "../components/Step1Acknowledge";

const PanicAttackWalkThroughScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [initialRating, setInitialRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState("");

  // screen dimensions for responsive styling
  const { width } = Dimensions.get("window");
  const isSmallScreen = width < 375;
  const isMediumScreen = width >= 375 && width < 768;
  const isTablet = width >= 768;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: isSmallScreen ? "3%" : "5%",
    },
    title: {
      fontSize: isSmallScreen ? 16 : isMediumScreen ? 18 : 22,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: "2%",
      maxWidth: 200,
      textAlign: "center",
      position: "absolute",
      bottom: "8%",
      ...textStyles.header,
    },
    closeButton: {
      position: "absolute",
      // Mobile: top-right corner, Desktop: custom position
      top: isTablet ? "13%" : "3%",
      right: isTablet ? "26%" : "3%",
      backgroundColor: colors.slateBlue,
      padding: isSmallScreen ? 8 : 11,
      borderRadius: 8,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
      minWidth: 44, // Minimum tap target
      minHeight: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      color: colors.white,
      fontSize: isSmallScreen ? 14 : 16,
      fontWeight: "400",
      ...textStyles.header,
    },
    buttonContainer: {
      position: "absolute",
      bottom: "15%",
      right: 0,
      left: 0,
      flexDirection: "row",
      gap: isSmallScreen ? 8 : 10,
      justifyContent: "center",
      paddingHorizontal: "5%",
    },
    backButton: {
      backgroundColor: colors.deeperTeal,
      padding: isSmallScreen ? 10 : 11,
      borderRadius: 8,
      minWidth: isSmallScreen ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButton: {
      backgroundColor: colors.slateBlue,
      padding: isSmallScreen ? 10 : 11,
      borderRadius: 8,
      minWidth: isSmallScreen ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButtonText: {
      color: colors.white,
      fontSize: isSmallScreen ? 14 : 16,
      fontWeight: "400",
      ...textStyles.header,
    },
  });
  return (
    <View style={styles.container}>
      {/* Close button - X icon on mobile, text on desktop */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        {isTablet ? (
          <Text style={styles.closeButtonText}>Close</Text>
        ) : (
          <Text style={styles.closeButtonText}>✕</Text>
        )}
      </TouchableOpacity>

      {/* Step indicator */}
      <Text style={styles.title}>Step {currentStep} of 4</Text>

      {/* Current step content */}
      {currentStep === 1 && (
        <Step1Acknowledge
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
          initialRating={initialRating}
          setInitialRating={setInitialRating}
        />
      )}

      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.nextButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (currentStep < 4) {
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
