import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, textStyles } from "../utils/theme";
import { useResponsive } from "../utils/useResponsive";

type Step3IdentifyProps = {
  thoughtPatterns: string[];
  setThoughtPatterns: (phrases: string[]) => void;
  thoughtTexts: string[];
  setThoughtTexts: (phrases: string[]) => void;
  customThought: string;
  setCustomThought: (phrases: string) => void;
};

const categories = [
  "Self Criticism",
  "Catastrophizing",
  "Generalizing",
  "Should or shouldn't",
  "Why's",
];

const Step3Identify = ({
  thoughtPatterns,
  setThoughtPatterns,
  thoughtTexts,
  setThoughtTexts,
  customThought,
  setCustomThought,
}: Step3IdentifyProps) => {
  const { isMobile } = useResponsive();

  const togglePattern = (phrase: string) => {
    if (thoughtPatterns.includes(phrase)) {
      setThoughtPatterns(thoughtPatterns.filter(p => p !== phrase));
    } else {
      setThoughtPatterns([...thoughtPatterns, phrase]);
    }
  };
  const saveCustomThought = () => {
    const trimmedText = customThought.trim();
    if (!trimmedText) {
      return;
    }

    if (thoughtTexts.includes(trimmedText)) {
      Alert.alert("Already Added", "You've already added this statement.");
      return;
    }

    setThoughtTexts([...thoughtTexts, trimmedText]);
    setCustomThought("");
    Alert.alert("Saved", "Your custom statement has been added.");
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
    },
    title: {
      fontSize: isMobile ? 16 : 18,
      fontWeight: "bold",
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "4%",
      ...textStyles.header,
    },
    categoryText: {
      fontSize: isMobile ? 16 : 14,
      color: colors.secondary,
      flex: 1,
      ...textStyles.body,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      width: isMobile ? "100%" : "48%",
      marginBottom: "3%",
    },
    checkboxUnchecked: {
      width: isMobile ? 24 : 20,
      height: isMobile ? 24 : 20,
      borderWidth: 2,
      borderColor: colors.secondary,
      borderRadius: 4,
      backgroundColor: "transparent",
      marginRight: isMobile ? 12 : 8,
    },
    checkboxChecked: {
      width: isMobile ? 24 : 20,
      height: isMobile ? 24 : 20,
      borderRadius: 4,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: isMobile ? 12 : 8,
    },
    checkmark: {
      color: colors.white,
      fontSize: isMobile ? 18 : 16,
      fontWeight: "bold",
    },
    categoriesContainer: {
      width: "100%",
      maxWidth: 700,
      marginBottom: "4%",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: My Thoughts create my feelings</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => {
          const isSelected = thoughtPatterns.includes(category);
          return (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => togglePattern(category)}
            >
              {isSelected ? (
                <View style={styles.checkboxChecked}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <View style={styles.checkboxUnchecked}></View>
              )}

              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Step3Identify;
