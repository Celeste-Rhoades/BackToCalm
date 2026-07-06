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

interface ResumeSessionModalProps {
  visible: boolean;
  savedAt: Date;
  onResume: () => void;
  onStartFresh: () => void;
}

const ResumeSessionModal = ({
  visible,
  savedAt,
  onResume,
  onStartFresh,
}: ResumeSessionModalProps) => {
  const formattedTime =
    "Today at " +
    savedAt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <Modal visible={visible} transparent={true}>
      <Pressable style={styles.overlay} onPress={onStartFresh}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <TouchableOpacity style={styles.closeButton} onPress={onStartFresh}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>{formattedTime}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={onStartFresh}
            >
              <Text style={styles.buttonText}>Start Fresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={onResume}
            >
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

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
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
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

export default ResumeSessionModal;
