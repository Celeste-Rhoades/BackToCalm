import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { colors, textStyles } from "../utils/theme";

type DisclaimerModalProps = {
  visible: boolean;
  onAccept: () => void;
};

const DisclaimerModal = ({ visible, onAccept }: DisclaimerModalProps) => {
  const handleCall = (number: string) => {
    if (Platform.OS === "web") {
      //Web Can't make calls
      return;
    }
    Linking.openURL(`tel:${number}`);
  };
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Important Disclaimer</Text>
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.disclaimerText}>
              Back to Calm is a supportive tool designed to help you manage
              panic attacks. However, it is NOT a substitute for professional
              medical or mental health care. I am not a licensed therapist,
              counselor, or medical professional. If you are experiencing a
              medical emergency, please call 911 immediately.
            </Text>
            <View style={styles.emergencySection}>
              <Text style={styles.emergencySectionTitle}>
                In case of emergency, contact:
              </Text>
              {Platform.OS === "web" ? (
                <Text style={styles.emergencyNumber}>
                  • 911 - Emergency Services
                </Text>
              ) : (
                <TouchableOpacity onPress={() => handleCall("911")}>
                  <Text style={styles.emergencyNumber}>
                    • 911 - Emergency Services
                  </Text>
                </TouchableOpacity>
              )}
              {Platform.OS === "web" ? (
                <Text style={styles.emergencyNumber}>
                  • 988 - Suicide and Crisis Lifeline
                </Text>
              ) : (
                <TouchableOpacity onPress={() => handleCall("988")}>
                  <Text style={styles.emergencyNumber}>
                    • 988 - Suicide and Crisis Lifeline
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={styles.emergencyNumber}>
                • 741741 - Crisis Text Line
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onAccept}>
            <Text style={styles.buttonText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: "90%",
    maxWidth: 500,
    maxHeight: "80%",
    padding: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginBottom: "4%",
    ...textStyles.header,
  },
  scrollContent: {
    flex: 1,
    marginBottom: "4%",
  },
  disclaimerText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: "5%",
    ...textStyles.body,
  },
  emergencySection: {
    marginTop: "3%",
    padding: "4%",
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  emergencySectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: "3%",
    ...textStyles.header,
  },
  emergencyNumber: {
    fontSize: 14,
    color: colors.secondary,
    marginVertical: "2%",
    ...textStyles.body,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    ...textStyles.header,
  },
});
export default DisclaimerModal;
