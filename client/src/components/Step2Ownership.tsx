import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colors, textStyles } from "../utils/theme";
import { Picker } from "@react-native-picker/picker";

type Step2OwnershipProps = {
  ownershipPhrases: string[];
  setOwnershipPhrases: (phrases: string[]) => void;
  customOwnership: string;
  setCustomOwnership: (phrases: string) => void;
};

const phrases = [
  "I scared myself.",
  "I anxioused myself.",
  "I worried myself.",
  "I saddened myself.",
  "I upset myself.",
  "I am scaring myself with my thoughts.",
  "I am anxiousing myself right now with my thoughts.",
  "I angered myself with my thoughts.",
  "I pissed myself off with my thoughts.",
  "I overwhelmed myself with my thoughts.",
];

const Step2Ownership = ({
  ownershipPhrases,
  setOwnershipPhrases,
  customOwnership,
  setCustomOwnership,
}: Step2OwnershipProps) => {
  // This function handles toggling a phrase on/off
  const togglePhrase = (phrase: string) => {
    // Check if this phrase is already in the selected phrases array
    if (ownershipPhrases.includes(phrase)) {
      // If it IS in the array, remove it (user is unchecking)
      // filter() creates a new array with only items that DON'T match this phrase
      setOwnershipPhrases(ownershipPhrases.filter(p => p !== phrase));
    } else {
      // If it's NOT in the array, add it (user is checking)
      // ...ownershipPhrases spreads the existing array, then we add the new phrase
      setOwnershipPhrases([...ownershipPhrases, phrase]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Step 2: I take ownership of my emotions without blaming myself by using
        phrases such as
      </Text>

      {/* Container for all checkboxes with flex wrap for 2-column layout */}
      <View style={styles.phrasesContainer}>
        {phrases.map((phrase, index) => {
          // For EACH phrase, check if it's in the selected array
          const isSelected = ownershipPhrases.includes(phrase);

          return (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => togglePhrase(phrase)}
            >
              {/* Checkbox visual - changes based on isSelected */}
              {isSelected ? (
                // If THIS phrase is selected, show filled checkbox with checkmark
                <View style={styles.checkboxChecked}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                // If THIS phrase is NOT selected, show empty checkbox
                <View style={styles.checkboxUnchecked}></View>
              )}

              {/* The phrase text next to the checkbox */}
              <Text style={styles.phraseText}>{phrase}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Text input for custom ownership statement */}
      <TextInput
        style={styles.textInput}
        value={customOwnership}
        onChangeText={setCustomOwnership}
        placeholder="Add your own ownership statement..."
        placeholderTextColor={colors.mediumGray}
        multiline
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: "4%",
    ...textStyles.header,
  },
  phrasesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "4%",
    maxWidth: 900,
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: "3%",
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    backgroundColor: "transparent",
    marginRight: 8,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  phraseText: {
    fontSize: 14,
    color: colors.secondary,
    flex: 1,
    ...textStyles.body,
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
    fontSize: 14,
    color: colors.secondary,
    textAlignVertical: "top",
    ...textStyles.body,
  },
});
export default Step2Ownership;
