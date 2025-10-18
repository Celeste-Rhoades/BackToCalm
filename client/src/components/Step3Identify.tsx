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

// Dr. Rita's thought pattern categories with examples
const categories = [
  { name: "Self Criticism", example: 'such as "I\'m such a dope"' },
  {
    name: "Catastrophizing",
    example: 'such as "Something bad is going to happen"',
  },
  { name: "Generalizing", example: 'such as "I\'ll never get this right"' },
  {
    name: "Should or shouldn't",
    example: 'such as "They shouldn\'t say that or ask that"',
  },
  { name: "Why's", example: 'such as "Why can\'t they be kinder"' },
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

  // Toggle thought pattern category selection
  const togglePattern = (phrase: string) => {
    if (thoughtPatterns.includes(phrase)) {
      // Remove from array if already selected
      setThoughtPatterns(thoughtPatterns.filter(p => p !== phrase));
    } else {
      // Add to array if not selected
      setThoughtPatterns([...thoughtPatterns, phrase]);
    }
  };

  // Save custom thought text to array
  const saveCustomThought = () => {
    const trimmedText = customThought.trim();

    // Don't save if empty
    if (!trimmedText) {
      return;
    }

    // Check for duplicates
    if (thoughtTexts.includes(trimmedText)) {
      Alert.alert("Already Added", "You've already added this thought.");
      return;
    }

    // Add to array, clear input, show confirmation
    setThoughtTexts([...thoughtTexts, trimmedText]);
    setCustomThought("");
    Alert.alert("Saved", "Your thought has been added.");
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
      marginBottom: "1%",
      ...textStyles.header,
    },
    subTitle: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "2%",
      ...textStyles.header,
    },
    categoryText: {
      fontSize: isMobile ? 16 : 14,
      color: colors.secondary,
      flex: 1,
      padding: 2,
      ...textStyles.body,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
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
      maxWidth: 500,
      marginBottom: "2%",
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      backgroundColor: colors.lightGray,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      width: "100%",
      minHeight: 60,
      maxWidth: 700,
      fontSize: isMobile ? 16 : 14,
      color: colors.secondary,
      textAlignVertical: "top",
      textAlign: "center",
      ...textStyles.body,
    },
    saveButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 12 : 8,
      borderRadius: 8,
      minWidth: isMobile ? 80 : 60,
      alignItems: "center",
      marginTop: 10,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    saveButtonText: {
      color: colors.white,
      fontSize: isMobile ? 16 : 14,
      fontWeight: "600",
      ...textStyles.header,
    },
    hintText: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      marginBottom: "2%",
      textAlign: "center",
      ...textStyles.body,
    },
    paragraph: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      maxWidth: 700,
      marginBottom: "3%",
      textAlign: "center",
      padding: 2,
      ...textStyles.body,
    },
  });

  return (
    <View style={styles.container}>
      {/* Step title */}
      <Text style={styles.title}>Step 3: My Thoughts create my feelings</Text>

      {/* Reflective question */}
      <Text style={styles.subTitle}>
        Hmm... what thought or thoughts did I use to upset myself?
      </Text>

      {/* Hint text */}
      <Text style={styles.hintText}>Hint: Look for</Text>

      {/* Thought pattern categories with checkboxes */}
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => {
          // Check if this category is selected
          const isSelected = thoughtPatterns.includes(category.name);

          return (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => togglePattern(category.name)}
            >
              {/* Checkbox visual - checked or unchecked */}
              {isSelected ? (
                <View style={styles.checkboxChecked}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <View style={styles.checkboxUnchecked}></View>
              )}

              {/* Category name with example */}
              <Text style={styles.categoryText}>
                {category.name} {category.example}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation of thought distortions */}
      <Text style={styles.paragraph}>
        These thoughts block us because they are negative, over-generalizing,
        predicting the future, judgmental, and controlling. In an effort to feel
        safe, the brain wants to control all situations which never works
        because these thought distortions deny reality.
      </Text>

      {/* Text input for custom thought */}
      <TextInput
        style={styles.textInput}
        value={customThought}
        onChangeText={setCustomThought}
        placeholder="Describe your thought..."
        placeholderTextColor={colors.mediumGray}
        multiline
        onSubmitEditing={saveCustomThought}
      />

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveCustomThought}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step3Identify;
