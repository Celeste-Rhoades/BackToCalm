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

interface Step4ReplaceProps {
  selectedMantras: string[];
  setSelectedMantras: (mantras: string[]) => void;
  customReplacement: string;
  setCustomReplacement: (text: string) => void;
  replacementTexts: string[];
  setReplacementTexts: (texts: string[]) => void;
}

const mantras = [
  "Things always work out",
  "Everything will work to my good",
  "Everything that happens is in my best interest",
  "Everything is working out perfectly",
  "Something good will come of this",
  "This will be easier than I think",
  "I am human. I make mistakes. This is how I learn and grow.",
  "Everthing works out perfectly fine",
];

const Step4Replace = ({
  selectedMantras,
  setSelectedMantras,
  customReplacement,
  setCustomReplacement,
  replacementTexts,
  setReplacementTexts,
}: Step4ReplaceProps) => {
  const { isMobile } = useResponsive();

  // Toggle mantra selection on/off
  const togglePhrase = (mantra: string) => {
    if (selectedMantras.includes(mantra)) {
      setSelectedMantras(selectedMantras.filter(m => m !== mantra));
    } else {
      setSelectedMantras([...selectedMantras, mantra]);
    }
  };

  // Save custom replacement thought to array
  const saveCustomStatement = () => {
    const trimmedText = customReplacement.trim();
    if (!trimmedText) {
      return;
    }

    if (replacementTexts.includes(trimmedText)) {
      Alert.alert("Already Added", "You've already added this statement.");
      return;
    }

    setReplacementTexts([...replacementTexts, trimmedText]);
    setCustomReplacement("");
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
    subTitle: {
      fontSize: isMobile ? 16 : 18,
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "2%",
      ...textStyles.header,
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
    paragraph: {
      fontSize: isMobile ? 14 : 16,
      color: colors.primary,
      maxWidth: 700,
      marginBottom: "1%",
      textAlign: "center",
      padding: 2,
      ...textStyles.body,
    },
    phrasesContainer: {
      width: "100%",
      maxWidth: 700,
      marginBottom: "2%",
      alignItems: "center",
      justifyContent: "center",
    },
    mantrasGrid: {
      flexDirection: isMobile ? "column" : "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "3%",
    },
    mantraItem: {
      flexDirection: "row",
      alignItems: "center",
      width: isMobile ? "100%" : "48%",
      marginBottom: "2%",
      padding: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.slateBlue,
      borderRadius: 4,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      backgroundColor: colors.slateBlue,
    },
    checkmark: {
      color: colors.white,
      fontSize: 14,
      fontWeight: "bold",
    },
    mantraText: {
      flex: 1,
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      ...textStyles.body,
    },
    examplesText: {
      fontSize: isMobile ? 12 : 14,
      color: colors.primary,
      maxWidth: 700,
      marginBottom: "3%",
      textAlign: "center",
      ...textStyles.body,
    },
    savedThoughtsContainer: {
      width: "100%",
      maxWidth: 700,
      marginTop: "3%",
    },
    savedThought: {
      backgroundColor: colors.lightGray,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderLeftWidth: 3,
      borderLeftColor: colors.slateBlue,
    },
    savedThoughtText: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      ...textStyles.body,
    },
    examplesContainer: {
      width: "100%",
      maxWidth: 700,
      marginBottom: "3%",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Step 4: Replace My Negative Thoughts With Mantras
      </Text>

      {/* Section 4A: Generic Mantras */}
      <Text style={styles.subTitle}>
        4A: Chant Generic Mindful Truthful Thoughts
      </Text>

      <View style={styles.phrasesContainer}>
        {/* Mantras grid with checkboxes */}
        <View style={styles.mantrasGrid}>
          {mantras.map((mantra, index) => {
            const isSelected = selectedMantras.includes(mantra);
            return (
              <TouchableOpacity
                key={index}
                style={styles.mantraItem}
                onPress={() => togglePhrase(mantra)}
              >
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxChecked,
                  ]}
                >
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.mantraText}>{mantra}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation paragraph */}
        <Text style={styles.paragraph}>
          Choose mantras that feel believable to you. Repeating these thoughts
          helps create new neural pathways, replacing old negative patterns with
          more helpful ones.
        </Text>
      </View>

      {/* Section 4B: Custom Replacement Thoughts */}
      <Text style={styles.subTitle}>
        4B: Practice New Thoughts Specific To This Situation
      </Text>

      {/* Examples */}
      <View style={styles.examplesContainer}>
        <Text style={styles.examplesText}>
          "I prefer...(something be more, better, different or the way I want
          it)"
        </Text>
        <Text style={styles.examplesText}>
          "I don't get to control that, what I get to do is...(breathe,
          assertively ask for what I want, distance myself, work around the
          situation, remind myself God/Universe is in charge)"
        </Text>
        <Text style={styles.examplesText}>
          "It's not my job to fix that / control that. My job is to (breathe,
          assertively say what I think, say what I want, forget about it, report
          it, remind myself God/Universe is in charge)..."
        </Text>
        <Text style={styles.examplesText}>
          "It's none of my business (Not my monkey, not my circus)"
        </Text>
        <Text style={styles.examplesText}>
          "It's not that important (in the grand scheme of things)"
        </Text>
        <Text style={styles.examplesText}>
          "They'll figure it out.. or not... it's up to them."
        </Text>
        <Text style={styles.examplesText}>
          "Either way, I'll be okay (acceptance of what is or that God/Universe
          is in charge.)"
        </Text>
      </View>
      {/* Text input for custom thought */}
      <TextInput
        style={styles.textInput}
        value={customReplacement}
        onChangeText={setCustomReplacement}
        placeholder="Type your replacement thought..."
        placeholderTextColor={colors.primary}
        multiline
        onSubmitEditing={saveCustomStatement}
      />

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveCustomStatement}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Display saved thoughts */}
      {replacementTexts.length > 0 && (
        <View style={styles.savedThoughtsContainer}>
          {replacementTexts.map((thought, index) => (
            <View key={index} style={styles.savedThought}>
              <Text style={styles.savedThoughtText}>{thought}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Step4Replace;
