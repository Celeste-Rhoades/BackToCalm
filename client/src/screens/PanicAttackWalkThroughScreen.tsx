import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, textStyles } from "../utils/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    ...textStyles.header,
  },
  closeButton: {
    backgroundColor: colors.slateBlue,
    padding: 11,
    borderRadius: 8,
    maxWidth: 400,
    marginBottom: 15,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    ...textStyles.header,
  },
  nextButton: {
    backgroundColor: colors.slateBlue,
    padding: 11,
    borderRadius: 8,
    maxWidth: 400,
    marginBottom: 15,
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Step {currentStep} of 4</Text>
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
  );
};

export default PanicAttackWalkThroughScreen;
