import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { colors, fonts } from "../utils/theme";
import { signup } from "../services/authService";
import { useAuthStore } from "../store/authStore";

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const setAuth = useAuthStore(state => state.setAuth);

  const handleSignup = async () => {
    // Validate inputs
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    if (!/(?=.*\d)|(?=.*[@$!%*?&])/.test(password)) {
      Alert.alert(
        "Error",
        "Password must contain at least one number or special character"
      );
      return;
    }

    try {
      const response = await signup(username, email, password);
      const { user, token } = response;
      setAuth(user, token);

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Title */}
        <Text style={styles.title}>Back to Calm</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login text */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: colors.primary,
    fontFamily: fonts.header,
  },
  input: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    fontFamily: fonts.body,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: fonts.header,
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.body,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
});

export default SignupScreen;
