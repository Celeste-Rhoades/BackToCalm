import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors, fonts, textStyles } from "../utils/theme";
import { useAuthStore } from "../store/authStore";
import { TouchableOpacity, Alert } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  const isMobile = screenWidth < 375;
  const isTablet = screenWidth >= 375 && screenWidth < 768;
  const isDesktop = screenWidth >= 768;

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
      alignItems: "center",
      marginBottom: 40,
      textAlign: "center",
      ...textStyles.header,
    },

    panicButton: {
      backgroundColor: colors.deeperTeal,
      padding: 20,
      borderRadius: 12,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      marginBottom: 20,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5, // Android
    },
    panicButtonText: {
      fontSize: 20,
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
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    logButtonText: {
      fontSize: 18,
      fontWeight: "400",
      ...textStyles.header,
    },
    breathingButton: {
      backgroundColor: colors.slateBlue,
      padding: 20,
      borderRadius: 12,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      marginBottom: 20,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5, // Android
    },
    breathingButtonText: {
      fontSize: 18,
      fontWeight: "400",
      ...textStyles.header,
    },
    menuButton: {
      position: "absolute",
      top: isMobile ? "3%" : isTablet ? "3%" : "2%",
      left: isMobile ? "3%" : isTablet ? "3%" : "2%",
      padding: isMobile ? 8 : isTablet ? 10 : 12,
      width: isMobile ? 40 : isTablet ? 44 : 48,
      height: isMobile ? 40 : isTablet ? 44 : 48,
      backgroundColor: colors.primary,
      borderRadius: 8,
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    menuButtonText: {
      color: colors.white,
      fontSize: isMobile ? 20 : isTablet ? 22 : 24,
    },
  });

  const user = useAuthStore(state => state.user);

  return (
    <View style={styles.container}>
      {/* Hamburger menu button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      {/* Welcome Message */}
      <Text style={styles.title}>Welcome back, {user?.username}!</Text>

      {/* Main Panic Button */}
      <TouchableOpacity
        style={styles.panicButton}
        onPress={() => navigation.navigate("PanicAttackWalkthrough")}
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
    </View>
  );
};

export default HomeScreen;
