import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Define all stack screens and their params
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

// Define drawer screens
export type DrawerParamList = {
  Home: undefined;
  PanicAttackWalkthrough: undefined;
};

// Navigation prop types for each screen
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;
export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Home"
>;
