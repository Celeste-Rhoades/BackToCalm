import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../utils/theme";
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
    fontFamily: fonts.header,
  },
  email: {
    fontSize: 16,
    color: colors.mediumGray,
    marginBottom: 40,
    fontFamily: fonts.body,
  },
  panicButton: {
    backgroundColor: colors.deepTeal, // Darker, more urgent color
    padding: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 20,
  },
  panicButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.header,
  },
  logoutButton: {
    backgroundColor: colors.mediumGray,
    padding: 15,
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: fonts.header,
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
