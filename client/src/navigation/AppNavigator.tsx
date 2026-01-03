import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "../store/authStore";
import { RootStackParamList } from "../types/navigation";

import DisclaimerModal from "../components/DisclaimerModal";
import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const disclaimerAccepted = useAuthStore(state => state.disclaimerAccepted);
  const setDisclaimerAccepted = useAuthStore(
    state => state.setDisclaimerAccepted
  );

  const handleAcceptDisclaimer = () => {
    setDisclaimerAccepted(true);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide header bar
          }}
        >
          {!isAuthenticated ? (
            // not logged in
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            // Homescreen

            <>
              <Stack.Screen name="Main" component={DrawerNavigator} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <DisclaimerModal
        visible={isAuthenticated && !disclaimerAccepted}
        onAccept={handleAcceptDisclaimer}
      />
    </>
  );
}
