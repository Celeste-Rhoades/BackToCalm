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
});

const PanicAttackWalkThroughScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step {currentStep} of 4</Text>
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
