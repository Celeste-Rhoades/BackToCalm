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

type Step2OwnershipProps = {
  ownershipPhrases: string[];
  setOwnershipPhrases: (phrases: string[]) => void;
  customOwnershipTexts: string[];
  setCustomOwnershipTexts: (texts: string[]) => void;
  customOwnership: string;
  setCustomOwnership: (text: string) => void;
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
  customOwnershipTexts,
  setCustomOwnershipTexts,
}: Step2OwnershipProps) => {
  const { isMobile } = useResponsive();

  const togglePhrase = (phrase: string) => {
    if (ownershipPhrases.includes(phrase)) {
      setOwnershipPhrases(ownershipPhrases.filter(p => p !== phrase));
    } else {
      setOwnershipPhrases([...ownershipPhrases, phrase]);
    }
  };

  const saveCustomStatement = () => {
    const trimmedText = customOwnership.trim();
    if (!trimmedText) {
      return;
    }

    if (customOwnershipTexts.includes(trimmedText)) {
      Alert.alert("Already Added", "You've already added this statement.");
      return;
    }

    setCustomOwnershipTexts([...customOwnershipTexts, trimmedText]);
    setCustomOwnership("");
    Alert.alert("Saved", "Your custom statement has been added.");
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
    },
    title: {
      fontSize: isMobile ? 18 : 20,
      fontWeight: "bold",
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "2%",
      ...textStyles.header,
    },
    phrasesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: "1%",
      maxWidth: 900,
      alignItems: "center",
      paddingHorizontal: "2%",
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
    phraseText: {
      fontSize: isMobile ? 16 : 14,
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
      textAlign: "center",
      fontSize: isMobile ? 16 : 14,
      color: colors.secondary,
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
    savedTextsContainer: {
      width: "100%",
      maxWidth: 700,
      marginTop: "3%",
    },
    savedText: {
      backgroundColor: colors.lightGray,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    savedTextContent: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      ...textStyles.body,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Step 2: I Take Ownership Of My Emotions Without Blaming Myself By Using
        phrases such as
      </Text>

      <View style={styles.phrasesContainer}>
        {phrases.map((phrase, index) => {
          const isSelected = ownershipPhrases.includes(phrase);

          return (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => togglePhrase(phrase)}
            >
              {isSelected ? (
                <View style={styles.checkboxChecked}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <View style={styles.checkboxUnchecked}></View>
              )}

              <Text style={styles.phraseText}>{phrase}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.textInput}
        value={customOwnership}
        onChangeText={setCustomOwnership}
        placeholder="Add your own ownership statement..."
        placeholderTextColor={colors.primary}
        multiline
        onSubmitEditing={saveCustomStatement}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveCustomStatement}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Display saved custom ownership texts */}
      {customOwnershipTexts.length > 0 && (
        <View style={styles.savedTextsContainer}>
          {customOwnershipTexts.map((text, index) => (
            <View key={index} style={styles.savedText}>
              <Text style={styles.savedTextContent}>{text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Step2Ownership;
