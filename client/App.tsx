import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { initializeDisclaimerState } from "./src/store/authStore";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
    PoiretOne: require("./assets/fonts/PoiretOne-Regular.ttf"),
  });

  useEffect(() => {
    const initialize = async () => {
      // Load disclaimer state from AsyncStorage
      await initializeDisclaimerState();

      // Hide splash screen after everything is loaded
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    };

    initialize();
  }, [fontsLoaded]);

  return <AppNavigator />;
}
