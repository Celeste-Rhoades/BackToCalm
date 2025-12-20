import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts, textStyles } from "../utils/theme";
import { useAuthStore } from "../store/authStore";
import { TouchableOpacity, Alert } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    ...textStyles.header,
  },
  email: {
    fontSize: 16,
    color: colors.mediumGray,
    marginBottom: 40,
    ...textStyles.body,
  },
  panicButton: {
    backgroundColor: colors.deeperTeal,
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 20,
    // Add shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android
  },
  panicButtonText: {
    fontSize: 20,
    fontWeight: "400",
    ...textStyles.header,
  },
  logoutButton: {
    backgroundColor: colors.blueGray,
    padding: 20,
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    // Shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    ...textStyles.header,
  },
  logButton: {
    backgroundColor: colors.slateBlue,
    padding: 20,
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 15,
    // Add shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logButtonText: {
    fontSize: 18,
    fontWeight: "400",
    ...textStyles.header,
  },
  breathingButton: {
    backgroundColor: colors.softBlue,
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 20,
    // Add shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android
  },
  breathingButtonText: {
    fontSize: 18,
    fontWeight: "400",
    ...textStyles.header,
  },
});

const HomeScreen = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => logout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.title}>Welcome back, {user?.username}!</Text>

      {/* Email */}
      <Text style={styles.email}>{user?.email}</Text>

      {/* Main Panic Button */}
      <TouchableOpacity
        style={styles.panicButton}
        onPress={() => Alert.alert("Feature Coming Soon")}
      >
        <Text style={styles.panicButtonText}>I'm Having a Panic Attack</Text>
      </TouchableOpacity>

      {/* Log Panic Attack Button - ADD THIS */}
      <TouchableOpacity
        style={styles.logButton}
        onPress={() => Alert.alert("Feature Coming Soon")}
      >
        <Text style={styles.logButtonText}>Log Panic Attack</Text>
      </TouchableOpacity>

      {/* Daily Breathing Practice Button */}
      <TouchableOpacity
        style={styles.breathingButton}
        onPress={() => Alert.alert("Feature Coming Soon")}
      >
        <Text style={styles.breathingButtonText}>Daily Breathing Practice</Text>
      </TouchableOpacity>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
