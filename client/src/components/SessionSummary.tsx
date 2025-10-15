import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useResponsive } from "../utils/useResponsive";
import { colors, textStyles } from "../utils/theme";
import { PanicAttackRound } from "../types/panicAttackRound";

interface SessionSummaryProps {
  rounds: PanicAttackRound[];
  currentRound: PanicAttackRound;
  setCurrentRound: (round: PanicAttackRound) => void;
  onStartOver: () => void;
  onComplete: () => void;
}

const SessionSummary = ({
  rounds,
  currentRound,
  setCurrentRound,
  onStartOver,
  onComplete,
}: SessionSummaryProps) => {
  const { isMobile } = useResponsive();

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
      marginBottom: "4%",
      ...textStyles.header,
    },
    sectionTitle: {
      fontSize: isMobile ? 16 : 18,
      fontWeight: "bold",
      color: colors.secondary,
      marginBottom: "2%",
      ...textStyles.header,
    },
    sliderContainer: {
      width: "100%",
      maxWidth: 500,
      marginBottom: "5%",
    },
    sliderLabel: {
      fontSize: isMobile ? 14 : 16,
      color: colors.secondary,
      textAlign: "center",
      marginBottom: "2%",
      ...textStyles.body,
    },
    ratingText: {
      fontSize: isMobile ? 24 : 28,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginTop: "2%",
      ...textStyles.header,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Summary</Text>

      {/* Final Rating Section */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sectionTitle}>How do you feel now?</Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={currentRound.finalRating}
          onValueChange={value =>
            setCurrentRound({ ...currentRound, finalRating: value })
          }
          minimumTrackTintColor={colors.slateBlue}
          maximumTrackTintColor={colors.lightGray}
          thumbTintColor={colors.slateBlue}
        />
        <Text style={styles.ratingText}>{currentRound.finalRating}</Text>
      </View>
    </View>
  );
};
