import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors, textStyles } from "../utils/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../types/navigation";
import { useResponsive } from "../utils/useResponsive";
import { PanicAttackRound } from "../types/panicAttackRound";

import Step1Acknowledge from "../components/Step1Acknowledge";
import Step2Ownership from "../components/Step2Ownership";
import Step3Identify from "../components/Step3Identify";
import Step4Replace from "../components/Step4Replace";
import SessionSummary from "../components/SessionSummary";

type PanicAttackWalkthroughScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "PanicAttackWalkthrough"
>;

type PanicAttackWalkthroughScreenProps = {
  navigation: PanicAttackWalkthroughScreenNavigationProp;
};

const PanicAttackWalkThroughScreen = ({
  navigation,
}: PanicAttackWalkthroughScreenProps) => {
  // Track which step user is currently on
  const [currentStep, setCurrentStep] = useState(1);

  // Store all completed rounds from this panic attack session
  const [rounds, setRounds] = useState<PanicAttackRound[]>([]);

  // Current round user is actively filling out
  const [currentRound, setCurrentRound] = useState<PanicAttackRound>({
    roundNumber: 1,
    selectedEmotion: "",
    initialRating: 5,
    ownershipPhrases: [],
    customOwnershipTexts: [],
    thoughtPatterns: [],
    thoughtTexts: [],
    selectedMantras: [],
    replacementTexts: [],
    finalRating: 5,
    timestamp: new Date(),
  });

  // Temporary text inputs - not saved to round until user clicks Save
  const [customOwnership, setCustomOwnership] = useState("");
  const [customThought, setCustomThought] = useState("");
  const [customReplacement, setCustomReplacement] = useState("");

  const { isMobile, isTablet } = useResponsive();

  // Save current round and start a new round
  const handleStartOver = () => {
    // Add current round to rounds array
    setRounds([...rounds, { ...currentRound, roundNumber: rounds.length + 1 }]);

    // Reset current round to fresh state
    setCurrentRound({
      roundNumber: rounds.length + 2,
      selectedEmotion: "",
      initialRating: 5,
      ownershipPhrases: [],
      customOwnershipTexts: [],
      thoughtPatterns: [],
      thoughtTexts: [],
      selectedMantras: [],
      replacementTexts: [],
      finalRating: 5,
      timestamp: new Date(),
    });

    // Clear temporary inputs
    setCustomOwnership("");
    setCustomThought("");
    setCustomReplacement("");

    // Go back to step 1
    setCurrentStep(1);
  };

  // Save session to Firebase (placeholder for now)
  const handleComplete = () => {
    // Add current round to rounds array
    const allRounds = [
      ...rounds,
      { ...currentRound, roundNumber: rounds.length + 1 },
    ];

    // TODO: Save allRounds to Firebase
    console.log("Session complete! Rounds:", allRounds);

    // For now, just go back to home
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: isMobile ? "3%" : isTablet ? "4%" : "5%",
      paddingHorizontal: isMobile ? "5%" : isTablet ? "4%" : "5%",
      paddingBottom: isMobile ? "2%" : "3%",
    },
    closeButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 4 : isTablet ? 6 : 8,
      borderRadius: 8,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
      minWidth: isMobile ? 26 : 44,
      minHeight: isMobile ? 26 : 44,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      color: colors.white,
      fontSize: isMobile ? 18 : isTablet ? 20 : 16,
      fontWeight: "400",
    },
    contentContainer: {
      flex: 1,
    },
    footer: {
      paddingBottom: isMobile ? "7%" : isTablet ? "7%" : "5%",
      paddingHorizontal: isMobile ? "2%" : isTablet ? "1%" : "22%",
      paddingTop: isMobile ? ".5%" : isTablet ? "1%" : "1%",
    },
    stepIndicator: {
      fontSize: isMobile ? 12 : isTablet ? 14 : 22,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginBottom: isMobile ? "1%" : isTablet ? "1.5%" : "2%",
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
      {/* Header with close button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            // Reset to step 1 so next session starts fresh
            setCurrentStep(1);
            navigation.goBack();
          }}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Acknowledge emotion and rate intensity */}
        {currentStep === 1 && (
          <Step1Acknowledge
            selectedEmotion={currentRound.selectedEmotion}
            setSelectedEmotion={emotion =>
              setCurrentRound({ ...currentRound, selectedEmotion: emotion })
            }
            initialRating={currentRound.initialRating}
            setInitialRating={rating =>
              setCurrentRound({ ...currentRound, initialRating: rating })
            }
          />
        )}

        {/* Step 2: Take ownership with phrases and custom statements */}
        {currentStep === 2 && (
          <Step2Ownership
            ownershipPhrases={currentRound.ownershipPhrases}
            setOwnershipPhrases={phrases =>
              setCurrentRound({ ...currentRound, ownershipPhrases: phrases })
            }
            customOwnershipTexts={currentRound.customOwnershipTexts}
            setCustomOwnershipTexts={texts =>
              setCurrentRound({ ...currentRound, customOwnershipTexts: texts })
            }
            customOwnership={customOwnership}
            setCustomOwnership={setCustomOwnership}
          />
        )}

        {/* Step 3: Identify thought patterns and specific thoughts */}
        {currentStep === 3 && (
          <Step3Identify
            thoughtPatterns={currentRound.thoughtPatterns}
            setThoughtPatterns={patterns =>
              setCurrentRound({ ...currentRound, thoughtPatterns: patterns })
            }
            thoughtTexts={currentRound.thoughtTexts}
            setThoughtTexts={texts =>
              setCurrentRound({ ...currentRound, thoughtTexts: texts })
            }
            customThought={customThought}
            setCustomThought={setCustomThought}
          />
        )}

        {/* Step 4: Replace negative thoughts with mantras */}
        {currentStep === 4 && (
          <Step4Replace
            selectedMantras={currentRound.selectedMantras}
            setSelectedMantras={mantras =>
              setCurrentRound({ ...currentRound, selectedMantras: mantras })
            }
            customReplacement={customReplacement}
            setCustomReplacement={setCustomReplacement}
            replacementTexts={currentRound.replacementTexts}
            setReplacementTexts={texts =>
              setCurrentRound({ ...currentRound, replacementTexts: texts })
            }
          />
        )}
        {/* Step 5: Session Summary */}
        {currentStep === 5 && (
          <SessionSummary
            rounds={rounds}
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            onStartOver={handleStartOver}
            onComplete={handleComplete}
          />
        )}
      </ScrollView>

      {/* Footer with step indicator and navigation buttons */}
      <View style={styles.footer}>
        {/* Show "Session Summary" on step 5, otherwise show current step number */}
        <Text style={styles.stepIndicator}>
          {currentStep === 5 ? "Session Summary" : `Step ${currentStep} of 4`}
        </Text>
        <View style={styles.buttonContainer}>
          {/* Back button only shows after step 1 */}
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          {/* Next button only shows before step 5 */}
          {currentStep < 5 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                if (currentStep < 5) {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
