import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
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
});

export default ResumeSessionModal;
