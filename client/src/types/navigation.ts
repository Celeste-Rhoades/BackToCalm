import { StackNavigationProp } from "@react-navigation/stack";
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

// Navigation prop types for each screen — matches createStackNavigator
// (@react-navigation/stack), the navigator actually used in AppNavigator.tsx
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;
export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Home"
>;
export type PanicAttackWalkthroughScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "PanicAttackWalkthrough"
>;
