import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, textStyles } from "../utils/theme";
import PanicAttackWalkThroughScreen from "../screens/PanicAttackWalkThroughScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAuthStore } from "../store/authStore";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="PanicAttackWalkthrough"
        component={PanicAttackWalkThroughScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
