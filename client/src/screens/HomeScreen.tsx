import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/theme";
import { useAuthStore } from "../store/authStore";
import { TouchableOpacity, Alert } from "react-native";

const HomeScreen = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen - You're logged in!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 20,
    color: colors.text,
  },
});

export default HomeScreen;
