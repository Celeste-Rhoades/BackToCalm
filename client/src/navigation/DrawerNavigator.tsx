import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, textStyles } from "../utils/theme";
import PanicAttackWalkThroughScreen from "../screens/PanicAttackWalkThroughScreen";
import HomeScreen from "../screens/HomeScreen";
import { useAuthStore } from "../store/authStore";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileSection: {
      padding: 20,
      backgroundColor: colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    profileName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.white,
      marginBottom: 4,
      ...textStyles.header,
    },
    profileEmail: {
      fontSize: 14,
      color: colors.lightGray,
      ...textStyles.body,
    },
    menuSection: {
      flex: 1,
      paddingTop: 20,
    },
    menuItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuText: {
      fontSize: 16,
      color: colors.secondary,
      ...textStyles.body,
    },
    logoutSection: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    logoutButton: {
      backgroundColor: colors.blueGray,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    logoutText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
      ...textStyles.header,
    },
  });
  return (
    <View style={styles.drawerContainer}>
      {/* Profile section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{user?.username || "User"}</Text>
        <Text style={styles.profileEmail}>{user?.email || ""}</Text>
      </View>
      {/* Menu items section */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to Logs")}
        >
          <Text style={styles.menuText}>My Logs/Charts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Toggle theme")}
        >
          <Text style={styles.menuText}>Light/Dark Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Emergency Resources")}
        >
          <Text style={styles.menuText}>Emergency Resources</Text>
        </TouchableOpacity>
      </View>

      {/* Logout section */}
      <View style={styles.logoutSection}>
        {/* Logout button will go here */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            navigation.closeDrawer();
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DrawerNavigator = ({ navigation }: any) => {
  const user = useAuthStore(state => state.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="PanicAttackWalkthrough"
        component={PanicAttackWalkThroughScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
