import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors, textStyles } from "../utils/theme";
import Step1Acknowledge from "../components/Step1Acknowledge";

const PanicAttackWalkThroughScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [initialRating, setInitialRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState("");

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
    container: {},

    // Top section with close button
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: isMobile ? "3%" : isTablet ? "4%" : "5%",
      paddingHorizontal: isMobile ? "3%" : isTablet ? "4%" : "5%",
      paddingBottom: isMobile ? "2%" : "3%",
    },
    closeButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 6 : isTablet ? 8 : 11,
      borderRadius: 8,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
      minWidth: 44,
      minHeight: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      color: colors.white,
      fontSize: isMobile ? 18 : isTablet ? 20 : 16,
      fontWeight: "400",
    },
    // Middle section - scrollable content
    contentContainer: {
      flex: 1,
    },
    // Bottom section with step indicator and buttons
    footer: {
      paddingBottom: isMobile ? "3%" : isTablet ? "4%" : "5%",
      paddingHorizontal: isMobile ? "2%" : isTablet ? "1%" : "22%",
    },
    stepIndicator: {
      fontSize: isMobile ? 12 : isTablet ? 14 : 22,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginBottom: isMobile ? "3%" : "4%",
      ...textStyles.header,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: isMobile ? 6 : isTablet ? 8 : 10,
      justifyContent: "center",
    },
    backButton: {
      backgroundColor: colors.deeperTeal,
      padding: isMobile ? 8 : isTablet ? 10 : 11,
      borderRadius: 8,
      minWidth: isMobile ? 60 : isTablet ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 8 : isTablet ? 10 : 11,
      borderRadius: 8,
      minWidth: isMobile ? 60 : isTablet ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButtonText: {
      color: colors.white,
      fontSize: isMobile ? 12 : isTablet ? 14 : 16,
      fontWeight: "400",
      ...textStyles.header,
    },
  });

  return (
    <View style={styles.container}>
      {/* Top: Close button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Middle: Scrollable step content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && (
          <Step1Acknowledge
            selectedEmotion={selectedEmotion}
            setSelectedEmotion={setSelectedEmotion}
            initialRating={initialRating}
            setInitialRating={setInitialRating}
          />
        )}
      </ScrollView>

      {/* Bottom: Step indicator and navigation buttons */}
      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>Step {currentStep} of 4</Text>
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
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
