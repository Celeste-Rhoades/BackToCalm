import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, textStyles } from "../utils/theme";
import { Picker } from "@react-native-picker/picker";
import Step1Acknowledge from "../components/Step1Acknowledge";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    maxWidth: 200,
    textAlign: "center",
    position: "absolute",
    bottom: "8%",
    ...textStyles.header,
  },
  closeButton: {
    position: "absolute",
    top: " 13%",
    right: " 23%",
    backgroundColor: colors.slateBlue,
    padding: 11,
    borderRadius: 8,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    ...textStyles.header,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "15%",
    right: 0,
    left: 0,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: colors.deeperTeal,
    padding: 11,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  nextButton: {
    backgroundColor: colors.slateBlue,
    padding: 11,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    ...textStyles.header,
  },
});

const PanicAttackWalkThroughScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [initialRating, setInitialRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      {/* Button Container */}
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
      <Text style={styles.title}>Step {currentStep} of 4</Text>
      {currentStep === 1 && (
        <Step1Acknowledge
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
          initialRating={initialRating}
          setInitialRating={setInitialRating}
        />
      )}
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
