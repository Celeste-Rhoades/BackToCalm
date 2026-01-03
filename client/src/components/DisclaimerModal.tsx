import React, { useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);
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
          <Text style={styles.title}>Terms of Service {"\n"} & Disclaimer</Text>
          <ScrollView style={styles.scrollContent}>
            {/* Terms of Service */}
            <Text style={styles.sectionTitle}>Terms of Service</Text>
            <Text style={styles.termsText}>
              By using Back to Calm, you agree to these terms. You must be 18
              years or older, or have parental consent, to use this app. Your
              data is stored securely in Firebase and will never be sold or
              shared with third parties. You may delete your account and data at
              any time. This app is based on therapeutic methods developed by
              Dr. Rita Edmonds, Ed.D, and is protected by intellectual property
              rights. The app is provided 'as-is' without guarantees. We reserve
              the right to update these terms at any time.
            </Text>
            {/* Disclaimer Section*/}
            <Text style={styles.sectionTitle}>Disclaimer</Text>
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

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked ? (
              // Checked box with checkmark
              <View style={styles.checkboxChecked}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            ) : (
              // Unchecked empty box
              <View style={styles.checkboxUnchecked}></View>
            )}
            <Text style={styles.checkboxLabel}>
              I have read and agree to the Terms of Service and Disclaimer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={isChecked ? styles.button : styles.buttonDisabled}
            onPress={isChecked ? onAccept : () => {}}
          >
            <Text style={styles.buttonText}>I Agree</Text>
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
    maxWidth: 700,
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
    textAlign: "center",
    color: colors.text,
    lineHeight: 24,
    marginBottom: "5%",
    padding: 10,
    ...textStyles.header,
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
    textAlign: "center",
    color: colors.secondary,
    marginBottom: "3%",
    ...textStyles.header,
  },
  emergencyNumber: {
    fontSize: 14,
    textAlign: "center",
    color: colors.secondary,
    marginVertical: "2%",
    ...textStyles.header,
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

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4%",
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: colors.grayGreen,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.secondary,
    marginLeft: 8,
    textAlign: "center",
  },
  buttonDisabled: {
    backgroundColor: colors.blueGray,
    opacity: 0.5,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: "4%",
    marginBottom: "2%",
    ...textStyles.header,
  },
  termsText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
    lineHeight: 24,
    marginBottom: "5%",
    padding: 10,
    ...textStyles.header,
  },
});
export default DisclaimerModal;
