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

  const togglePhrase = (mantra: string) => {
    if (selectedMantras.includes(mantra)) {
      setSelectedMantras(selectedMantras.filter(m => m !== mantra));
    } else {
      setSelectedMantras([...selectedMantras, mantra]);
    }
  };
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
      fontSize: isMobile ? 16 : 18,
      fontWeight: "bold",
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "4%",
      ...textStyles.header,
    },
    subTitle: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "2%",
      ...textStyles.header,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Step 4: Replace My Negative Thoughts With Mantras
      </Text>
      <Text style={styles.subTitle}>4A: Choose Mindful Truthful Thoughts</Text>
      <Text style={styles.subTitle}>
        4B: Practice New Thoughts Specific To This Situation
      </Text>
    </View>
  );
};
