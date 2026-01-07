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

import Step1Acknowledge from "../components/Step1Acknowledge";
import Step2Ownership from "../components/Step2Ownership";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [initialRating, setInitialRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [ownershipPhrases, setOwnershipPhrases] = useState<string[]>([]);
  const [customOwnership, setCustomOwnership] = useState("");
  const [thoughtPatterns, setThoughtPatterns] = useState<string[]>([]);
  const [thoughtTexts, setThoughtTexts] = useState<string[]>([]);
  const [customThought, setCustomThought] = useState("");

  const { isMobile, isTablet } = useResponsive();

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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

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

        {currentStep === 2 && (
          <Step2Ownership
            ownershipPhrases={ownershipPhrases}
            setOwnershipPhrases={setOwnershipPhrases}
            customOwnership={customOwnership}
            setCustomOwnership={setCustomOwnership}
          />
        )}
      </ScrollView>

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
