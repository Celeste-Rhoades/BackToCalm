import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { colors, textStyles } from "../utils/theme";

const styles = StyleSheet.create({
  // Covers full screen, darkens background, centers the card
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // The white card centered on screen
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5, // Android shadow
  },

  // Puts buttons side by side with space between
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
    gap: 12,
  },

  // Shared base style for both buttons
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  // Start Fresh — secondary action
  buttonSecondary: {
    backgroundColor: "#4ABFBF",
  },

  // Resume — primary action
  buttonPrimary: {
    backgroundColor: "#3B7DD8",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  closeButton: {
    position: "absolute",
    top: 6,
    right: 10,
    backgroundColor: colors.slateBlue,
    padding: 4,
    borderRadius: 4,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
  },
});

interface IdleWarningProps {
  visible: boolean;
  onContinue: () => void;
  onStartOver: () => void;
}

const IdleWarningModal = ({
  visible,
  onContinue,
  onStartOver,
}: IdleWarningProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable style={styles.overlay} onPress={onStartOver}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <TouchableOpacity style={styles.closeButton} onPress={onStartOver}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Still There?</Text>
          <Text style={styles.subtitle}>
            Would you like to continue your session or start over?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={onStartOver}
            >
              <Text style={styles.buttonText}>Start Over</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={onContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default IdleWarningModal;
